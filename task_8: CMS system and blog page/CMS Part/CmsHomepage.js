
  
  $(document).ready(function() {
    $('#categoriesLink').trigger('click');

    $('nav a').click(function() {
        if ($(this).attr('id') !== 'my_blog') {
            $('nav a').removeClass('active');
            
            $(this).addClass('active');
        }
    });
  });


// create category

function validateCreateCategory() {
    var category_name = document.getElementById('create_categoryname').value;

    // username validation 
    var categoryNameRegex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;
    if (!categoryNameRegex.test(category_name)) {
        alert('Category name must contain only alphanumeric characters');
        return false;
    }
    // if validation done and user confirm operation, it posts data
    if(categoryConfirmation(category_name))
    {
        performCreateCategory();
    }
    return false;
}

function performCreateCategory() {

    const url = "createNewCategory.php";
    
    const categoryNameValue = document.getElementById('create_categoryname').value;

    const data = {
        categoryName: categoryNameValue
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
            createCategorySuccessAlert()
        } 
        else {
            createCategoryFailAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function createCategoryFailAlert(){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function categoryConfirmation(categoryName){
    var message = 'Are you sure you want to create category named: ' + categoryName;
    var result = window.confirm(message);

    return result;
}
function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function createCategorySuccessAlert(){
    var message = 'New user successfully created, redirecting to log in page';
    alert(message);
}


// create topic


function validateCreateTopic() {
    var topic_title = document.getElementById('create_topic_title').value;
    var topic_category_id = document.getElementById('create_topic_category_id').value;
    var topic_content = document.getElementById('create_topic_content').value;

    // username validation 
    var topicTitleRegex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;

    if (!topicTitleRegex.test(topic_title)) {
        alert('Topic title must contain only alphanumeric characters');
        return false;
    }

    if (topic_content.lenght>1000) {
        alert('Content length can be maximum 1000 chars long!');
        return false;
    }

    if(topic_category_id>1000 || topic_category_id<0){
        alert('No such categories exists');
        return false;
    }

    // if validation done and user confirm operation, it posts data
    if(topicCreateConfirmation(topic_title))
    {
        performCreateTopic();
    }
    return false;
}

function performCreateTopic() {

    const url = "createNewTopic.php";
    
    var topic_title = document.getElementById('create_topic_title').value;
    var topic_category_id = document.getElementById('create_topic_category_id').value;
    var topic_content = document.getElementById('create_topic_content').value;

    const data = {
        CategoryID: topic_category_id,
        Title: topic_title,
        Content: topic_content
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

function topicCreateConfirmation(categoryName){
    var message = 'Are you sure you want to create category named: ' + categoryName;
    var result = window.confirm(message);

    return result;
}

function createTopicSuccessAlert(){
    var message = 'New user successfully created, redirecting to log in page';
    alert(message);
}

function categoryDeleteConfirmation(categoryName){
    var message = 'Are you sure you want to delete category named: ' + categoryName;
    var result = window.confirm(message);

    return result;
}


// delete category


function validateDeleteCategory(){
    var deleteCategoryId = document.getElementById('delete_category_id').value;
    var deleteCategoryName = document.getElementById('delete_category_name').value;

    var categoryIdRegex = /^[0-9]+$/;


    if (!categoryIdRegex.test(deleteCategoryId)) {
        alert('Category ID must contain only numbers');
        return false;
    }
    
    if(categoryDeleteConfirmation(deleteCategoryName)){
        performDeleteCategory();
    }
    return false;
}

function performDeleteCategory(){

    const url = "deleteCategory.php";

    var deleteCategoryId = document.getElementById('delete_category_id').value;
    
    const data = {
        CategoryID: deleteCategoryId
    };

    const fetchOptions = {
        method: "DELETE",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            deleteCategorySuccessAlert()
        } 
        else {
            deleteCategoryFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function deleteCategorySuccessAlert(){
    var message = 'Category removed successfully!';
    alert(message);
}

function deleteCategoryFailedAlert(){
    var message = 'Something went wrong, category cannot be removed.';
    alert(message);
}

function categoryDeleteConfirmation(categoryName){
    var message = 'Are you sure you want to delete category named: ' + categoryName;
    var result = window.confirm(message);

    return result;
}


// delete topic


function validateDeleteTopic(){
    var deleteTopicId = document.getElementById('delete_topic_id').value;
    var deleteTopicName = document.getElementById('delete_topic_name').value;

    var topicIdRegex = /^[0-9]+$/;


    if (!topicIdRegex.test(deleteTopicId)) {
        alert('Topic ID must contain only numbers');
        return false;
    }
    
    if(topicDeleteConfirmation(deleteTopicName)){
        performDeleteTopic();
    }
    return false;

}

function performDeleteTopic(){

    const url = "deleteTopic.php";

    var deleteTopicId = document.getElementById('delete_topic_id').value;
    
    const data = {
        TopicID: deleteTopicId
    };

    const fetchOptions = {
        method: "DELETE",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            deleteTopicSuccessAlert();
        } 
        else {
            deleteTopicFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function deleteTopicSuccessAlert(){
    var message = 'Topic removed successfully!';
    alert(message);
}

function deleteTopicFailedAlert(){
    var message = 'Something went wrong, topic cannot be removed.';
    alert(message);
}

function topicDeleteConfirmation(topicName){
    var message = 'Are you sure you want to delete topic named: ' + topicName;
    var result = window.confirm(message);

    return result;
}


// update category


function validateUpdateCategory() {
    var category_name = document.getElementById('update_category_name').value;

    // username validation 
    var categoryNameRegex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;
    if (!categoryNameRegex.test(category_name)) {
        alert('Category name must contain only alphanumeric characters');
        return false;
    }
    // if validation done and user confirm operation, it posts data
    if(updateCategoryConfirmation(category_name))
    {
        performUpdateCategory();
    }
    return false;
}

function performUpdateCategory() {

    const url = "updateCategory.php";
    
    const categoryNameValue = document.getElementById('update_category_name').value;
    const categoryIdValue = document.getElementById('update_category_id').value;


    const data = {
        categoryName: categoryNameValue,
        categoryID: categoryIdValue
    };

    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            updateCategorySuccessAlert()
        } 
        else {
            updateCategoryFailAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function updateCategoryFailAlert(){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function updateCategoryConfirmation(categoryName){
    var message = 'Are you sure you want to update category name to: ' + categoryName;
    var result = window.confirm(message);

    return result;
}
function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function updateCategorySuccessAlert(){
    var message = 'Category successfully updated';
    alert(message);
}


// update topic

function validateUpdateTopic() {
    var topic_title = document.getElementById('update_topic_title').value;
    var topic_id = document.getElementById('update_topic_id').value;
    var topic_category_id = document.getElementById('update_topic_category_id').value;
    var topic_content = document.getElementById('update_topic_content').value;

    // username validation 
    var topicTitleRegex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;
    var topicIdRegex = /^[0-9]+$/;

    if (!topicTitleRegex.test(topic_title)) {
        alert('Topic title must contain only alphanumeric characters');
        return false;
    }

    if (!topicIdRegex.test(topic_id)) {
        alert('Invalid topic id');
        return false;
    }

    if (topic_content.lenght>1000) {
        alert('Content length can be maximum 1000 chars long!');
        return false;
    }

    if(topic_category_id>1000 || topic_category_id<0){
        alert('No such categories exists');
        return false;
    }

    // username validation 
    // if validation done and user confirm operation, it posts data
    if(updateTopicConfirmation(topic_title))
    {
        performUpdateTopic();
    }
    return false;
}

function performUpdateTopic() {
    var topic_title = document.getElementById('update_topic_title').value;
    var topic_id = document.getElementById('update_topic_id').value;
    var topic_category_id = document.getElementById('update_topic_category_id').value;
    var topic_content = document.getElementById('update_topic_content').value;

    const url = "updateTopic.php";

    const data = {
        topicTitle: topic_title,
        topicID: topic_id,
        topicCategoryId: topic_category_id,
        topicContent: topic_content
    };

    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            updateTopicSuccessAlert();
        } 
        else {
            updateTopicFailAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function updateTopicFailAlert(){
    var message = 'Update topic failed.';
    alert(message);
}

function updateTopicConfirmation(categoryName){
    var message = 'Are you sure you want to update category name to: ' + categoryName;
    var result = window.confirm(message);

    return result;
}

function updateTopicSuccessAlert(){
    var message = 'Topic successfully updated';
    alert(message);
}

function getTopicsAndPageBar(){
    document.addEventListener("DOMContentLoaded", function () {
        const pageBarDiv = document.getElementById("topic-page-bar");

        let totalPages;
        getTotalTopicPages().then(totalPageNumber => {
            totalPages = totalPageNumber;
            updatePageBar();
        });
        
        let currentPage = 1;
        updateTopicContentDiv(currentPage);

        function updatePageBar() {
            pageBarDiv.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.classList.add("mx-2", "px-4", "py-2", "text-black", "rounded");
                if (i === currentPage) {
                    button.classList.add("bg-gray-700"); 
                }
                button.addEventListener("click", function () {
                    currentPage = i;
                    updateTopicContentDiv(currentPage);
                    updatePageBar();
                });
                pageBarDiv.appendChild(button);
            }
        }
        updatePageBar();
    });
}

function updateTopicContentDiv(currentPage){
    const url = "getTopicsByPageNumber.php";

    const data = {
        pageNumber: currentPage
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

                // Log the topics array to the console for debugging
                console.log('topics:', topics);

                // Display topics on the screen
                document.getElementById('topic-bar').innerHTML = ""; 
                const topicList = document.getElementById('topic-bar');
                topicList.innerHTML += `
                    <tr>
                        <th>Topic ID</th>
                        <th>Title</th>
                        <th>Category ID</th>
                        <th>Publish Time</th>
                        <th>Update Time</th>
                        <th>User ID</th>
                        <th>Content</th>
                    </tr>`;

                if (topics.length > 0) {
                    topics.forEach(topic => {
                        topicList.innerHTML += `
                                <tr>
                                    <td>${topic.TopicID}</td>
                                    <td>${topic.Title}</td>
                                    <td>${topic.CategoryID}</td>
                                    <td>${topic.publish_time}</td>
                                    <td>${topic.update_time}</td>
                                    <td>${topic.user_id}</td>
                                    <td><div class=scrollable>${topic.Content}</td>
                                </div></tr>
                                    `;
                    });
                } 
                else {
                    topicList.innerHTML = "<p>No topics found.</p>";
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

function getTotalTopicPages() {
    const url = "readTotalTopicPage.php";
    const fetchOptions = {
        method: "GET",
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
  function getCategoriesAndPageBar(){
    document.addEventListener("DOMContentLoaded", function () {
        const pageBarDiv = document.getElementById("page-bar");

        let totalPages;
        getTotalCategoryPages().then(totalPageNumber => {
            totalPages = totalPageNumber;
            updatePageBar();
        });
        
        let currentPage = 1;
        updateCategoryContentDiv(currentPage);

        function updatePageBar() {
            pageBarDiv.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.classList.add("mx-2", "px-4", "py-2", "text-black", "rounded");
                if (i === currentPage) {
                    button.classList.add("bg-blue-700"); 
                }
                button.addEventListener("click", function () {
                    currentPage = i;
                    updateCategoryContentDiv(currentPage);
                    updatePageBar();
                });
                pageBarDiv.appendChild(button);
            }
        }
        updatePageBar();
    });
}

function updateCategoryContentDiv(currentPage){
    const url = "getCategoriesByPageNumber.php";

    const data = {
        pageNumber: currentPage
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

                document.getElementById('content-bar').innerHTML = ""; 
                const categoryList = document.getElementById('content-bar');
                categoryList.innerHTML += `
                <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                </tr>`;

                if (categories.length > 0) {
                    categories.forEach(category => {
                        categoryList.innerHTML += `
                        <tr>
                            <td>${category.CategoryID}</td>
                            <td>${category.CategoryName}</td>
                        </tr>`;
                    });
                } 
                else {
                    categoryList.innerHTML = "<p>No topics found.</p>";
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

function getTotalCategoryPages() {
    const url = "readTotalCategoryPage.php";
    const fetchOptions = {
        method: "GET",
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

function showContent(divId) {
    var contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function(div) {
      div.style.display = 'none';
    });

    var selectedDiv = document.getElementById(divId);
    if (selectedDiv) {
      selectedDiv.style.display = 'block flex';
    }
  }

  function performLogout(){
    const url = "logout.php";
    const fetchOptions = {
        method: "POST",
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {

        if (data.status === 'success') {
            logoutAlert()
            window.location.href = "index.php";
        } 
        else {
            errorAlert();
            window.location.href = "index.php";
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


// user page


function getUsersAndPageBar(){
    document.addEventListener("DOMContentLoaded", function () {
        const pageBarDiv = document.getElementById("user-page-bar");

        let totalPages;
        getTotalUserPages().then(totalPageNumber => {
            totalPages = totalPageNumber;
            updatePageBar();
        });
        
        let currentPage = 1;
        updateUserContentDiv(currentPage);

        function updatePageBar() {
            pageBarDiv.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.classList.add("mx-2", "px-4", "py-2", "text-black", "rounded");
                if (i === currentPage) {
                    button.classList.add("bg-blue-700"); 
                }
                button.addEventListener("click", function () {
                    currentPage = i;
                    updateUserContentDiv(currentPage);
                    updatePageBar();
                });
                pageBarDiv.appendChild(button);
            }
        }
        updatePageBar();
    });
}

function updateUserContentDiv(currentPage){
    const url = "getUsersByPageNumber.php";

    const data = {
        pageNumber: currentPage
    }

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const users = data.users;

                console.log('users:', users);

                document.getElementById('user-table').innerHTML = ""; 
                const userList = document.getElementById('user-table');
                userList.innerHTML += `

                <tr>
                    <th>Username</th>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Sign Up Date</th>
                    <th>Ban Status</th>
                </tr>`;

                if (users.length > 0) {
                    users.forEach(user => {
                        userList.innerHTML += `
                            <tr>
                                    <td>${user.username}</td>
                                    <td>${user.user_id}</td>
                                    <td>${user.email}</td>
                                    <td>${user.sign_up_date}</td>
                                    <td>${user.is_banned}</td>
                            </tr>
                        `;
                    });
                } 
                else {
                    userList.innerHTML = "<p>No topics found.</p>";
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

function getTotalUserPages() {
    const url = "readTotalUserPage.php";
    const fetchOptions = {
        method: "GET",
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

function validateDeleteUser(){
    var deleteUserId = document.getElementById('delete_user_id').value;

    var userIdRegex = /^[0-9]+$/;


    if (!userIdRegex.test(deleteUserId)) {
        alert('User ID must contain only numbers');
        return false;
    }
    
    if(UserDeleteConfirmation(deleteUserId)){
        performDeleteUser();
    }
    return false;
}

function performDeleteUser(){

    const url = "deleteUser.php";

    var deleteUserId = document.getElementById('delete_user_id').value;
    
    const data = {
        user_id: deleteUserId
    };

    const fetchOptions = {
        method: "DELETE",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            deleteUserSuccessAlert()
        } 
        else {
            deleteUserFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function deleteUserSuccessAlert(){
    var message = 'User removed successfully!';
    alert(message);
}

function deleteUserFailedAlert(){
    var message = 'Something went wrong, user cannot be removed.';
    alert(message);
}

function UserDeleteConfirmation(userId){
    var message = 'Are you sure you want to delete user with id: ' + userId;
    var result = window.confirm(message);

    return result;
}

// ban user operations

function validateBanUser(operation) {
    var user_id

    if(operation===1){
        user_id = document.getElementById('ban_user_id').value;
    }
    else if(operation===0){
        user_id = document.getElementById('remove_ban_user_id').value;
    }

    // username validation 
    var userIdRegex = /^[0-9]+$/;
    if (!userIdRegex.test(user_id)) {
        alert('User ID must contain only numbers');
        return false;
    }
    // if validation done and user confirm operation, it posts data
    if(banUserConfirmation(user_id))
    {
        performBanUser(operation, user_id);
    }
    return false;
}

function performBanUser(operation, userId) {

    const url = "banUser.php";
    

    var status = operation; // status = 1 for ban user, 0 for remove ban from user
    
    const data = {
        user_id: userId,
        ban_status: status
    };

    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success') {
            banUserSuccessAlert()
        } 
        else {
            banUserFailAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function banUserFailAlert(){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function banUserConfirmation(user_id){
    var message = 'Are you sure you want to ban user with id: ' + user_id;
    var result = window.confirm(message);

    return result;
}
function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function banUserSuccessAlert(){
    var message = 'User successfully banned';
    alert(message);
}


function validateDeleteComment(){
    var deleteCommentId = document.getElementById('delete_comment_id').value;

    var commentIdRegex = /^[0-9]+$/;


    if (!commentIdRegex.test(deleteCommentId)) {
        alert('Comment ID must contain only numbers');
        return false;
    }
    
    if(CommentDeleteConfirmation(deleteCommentId)){
        performDeleteComment();
    }
    return false;
}

function performDeleteComment(){

    const url = "deleteComment.php";

    var deleteCommentId = document.getElementById('delete_comment_id').value;
    
    const data = {
        comment_id: deleteCommentId
    };

    const fetchOptions = {
        method: "DELETE",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
    console.log('Response data:', data);

        if (data.status === 'success'){
            deleteCommentSuccessAlert();
        } 
        else {
            deleteCommentFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}
function deleteCommentFailedAlert(){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function CommentDeleteConfirmation(user_id){
    var message = 'Are you sure you want to ban user with id: ' + user_id;
    var result = window.confirm(message);

    return result;
}
function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function deleteCommentSuccessAlert(){
    var message = 'User successfully banned';
    alert(message);
}
