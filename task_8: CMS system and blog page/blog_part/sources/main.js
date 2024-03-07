
function ShowHideTopics(divId) { 
    if(divId.style.display=='block'){
        divId.style.display='none';
    }
    else if(divId.style.display=='none'){
        divId.style.display='block';
    }
}

// get categories and set on navbar

function updateNavbarWithCategories(){
    const url = "../api/getCategoriesByPageNumber.php";

    const data = {
        pageNumber: 1   // set temporarily to 1 to display less categories on navbar
    }

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const categories = data.categories;

                console.log('categories:', categories);

                const categoryList = document.getElementById('nav');

                let index=0;
                if (categories.length > 0) {
                    categories.forEach(category => {
                        categoryList.innerHTML += `
                        <a href="#" onclick="filterTopicsAndUpdatePageBar(${category.CategoryID})">${category.CategoryName}</a>
                        `;                        
                        index++;
                    });
                }
            } 
            else {
                console.error('Failed to fetch topics:', data.error);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

}




// filtered topics 

function filterTopicsAndUpdatePageBar(category_id){
    console.log(31);

        const pageBarDiv = document.getElementById("page-bar");

        let totalPages;
        getFilteredTopicPages(category_id).then(totalPageNumber => {
            totalPages = totalPageNumber;
            updatePageBar();
        });
        
        let currentPage = 1;
        updateFilteredContentDiv(currentPage,category_id);

        function updatePageBar() {
            pageBarDiv.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.classList.add("page-item");
                if (i === currentPage) {
                    button.classList.add("page-selected"); 
                }
                button.addEventListener("click", function () {
                    currentPage = i;
                    updateFilteredContentDiv(currentPage,category_id);
                    updatePageBar();
                });
                pageBarDiv.appendChild(button);
            }
        }
        updatePageBar();
}

function updateFilteredContentDiv(currentPage, category_id){
    const url = "../api/getFilteredTopicsByPageNumber.php";

    const data = {
        pageNumber: currentPage,
        categoryID: category_id
    }

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const topics = data.topics;

                console.log('topics:', topics);

                document.getElementById('content-bar').innerHTML = ""; 
                const topicList = document.getElementById('content-bar');

                let currentElement=0;
                if (topics.length > 0 && topics != -1) {
                    topics.forEach(topic => {
                        let content = convertNewlinesToHtml(topic.Content)
                        topicList.innerHTML += `
                        <div class="top-div">
                            <div class="content-border">
                                <div class="topic-title-box" onclick="ShowHideTopics(${"Div"+currentElement})">
                                    <h2 class="topic-title">${topic.Title}</h2>
                                </div>
                            </div>
                            <div class="topic-content" id="${"Div"+currentElement}" style="display:block">
                                <div class="publish-box">     ${topic.publish_time}
                                </div><br>
                                <article class"content-self-box">${content}</article><br>
                                <div class="topic-comment-top>
                                    <div class="space-for-comment>
                                    </div>
                                    <div class="topic-comments" id="comment-box-${topic.TopicID}">
                                    </div>
                                </div>
                                <div>
                                    <form action="" method="post" onsubmit="return verifyComment(${topic.TopicID})">
                                        <textarea id="comment_area_id_${topic.TopicID}" type="text" class="custom-placeholder comment_field topic-content" name="comment_field" id="comment_field" placeholder="Enter a comment" ></textarea><br>
                                        <button type="submit" class="comment_button" value="submit">Comment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        `;
                        currentElement++;
                        getCommentsAndFillCommentFields(topic.TopicID);
                    });
                } 
                else {
                    topicList.innerHTML = "<p>No entries found.</p>";
                }
            } 
            else {
                console.error('Failed to fetch topics:', data.error);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function getFilteredTopicPages(category_id) {
    const url = "../api/readFilteredTopicsPageNumber.php";

    const data = {
        CategoryID: category_id
    }

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.pageNumber);
                return data.pageNumber;
            } else {
                return 1; 
            }
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            return 1; 
        });
}

function convertNewlinesToHtml(text) {
    return text.replace(/\n/g, '<br>');
}

function performLogout(){
    const url = "../api/logout.php";
    const fetchOptions = {
        method: "POST",
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {

        if (data.status === 'success') {
            logoutAlert()
            window.location.href = "../index.php";
        } 
        else {
            errorAlert();
            window.location.href = "../index.php";
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });

}

function logoutAlert(){
    var message = 'Logout successfull, redirecting to log in page';
    alert(message);
}

function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function verifyComment(topic_id){
    if(users_id==-1){
        window.location.href = "../index.php"; // will be fixed
    } 
    else {
       checkAndPostComment(users_id, topic_id);
    }
}

// create comment

function checkAndPostComment(users_id, topic_id) {
    var comment_content = document.getElementById('comment_area_id_'+topic_id).value;

    // username validation 
    var comment_regex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;

    if (!comment_regex.test(comment_content)) {
        alert('Comment must contain only alphanumeric characters');
        return false;
    }

    if (comment_content.lenght>400) {
        alert('Content length can be maximum 400 chars long!');
        return false;
    }

    // if validation done and user confirm operation, it posts data
    if(commentCreateConfirmation(comment_content))
    {
        performCreateComment(users_id, topic_id);
    }
    return false;
}

function performCreateComment(usersID, topicID) {

    const url = "../api/createNewComment.php";
    
    var comment_content = document.getElementById('comment_area_id_'+topicID).value;

    const data = {
        owner_id: usersID,
        topic_id: topicID,
        content: comment_content
    };

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            createTopicSuccessAlert()
        } 
        else {
            createTopicFailAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function createTopicFailAlert(){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function commentCreateConfirmation(comment){
    var message = 'Are you sure you want to create comment: ' + comment;
    var result = window.confirm(message);

    return result;
}

function createTopicSuccessAlert(){
    var message = 'New user successfully created, redirecting to log in page';
    alert(message);
}

async function getCommentsAndFillCommentFields(topicID) {
    const url = "../api/getComments.php";

    const data = {
        topic_id: topicID
    };

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (data.status === 'success') {
            const comments = data.comments;

            if (comments.length > 0 && comments != -1) {
                const commentBox = document.getElementById('comment-box-' + topicID);
                commentBox.innerHTML = "";

                for (const comment of comments) {
                    const comment_owner = await getCommentOwner(comment.owner_id);

                    commentBox.innerHTML += `
                        <div class="comment-content">
                            <div class="publish-box">${comment_owner}</div><br>
                            <div class="publish-box">${comment.publish_date}</div><br>
                            <article class="comment-article">${comment.content}</article><br>
                        </div><br>
                    `;
                }
            }
        } else {
            const commentBox = document.getElementById('comment-box-' + topicID);
            commentBox.innerHTML = "<p>No comments posted yet.</p>";
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function getCommentOwner(owner_id) {
    const url = "../api/getUsernameById.php";

    const data = {
        user_id: owner_id
    };

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.username);
            return data.username;
        } else {
            return 3;
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
        return 4;
    }
}
