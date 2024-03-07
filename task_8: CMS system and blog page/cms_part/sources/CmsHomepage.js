
  
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

    const url = "../api/createNewCategory.php";
    
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

    const url = "../api/createNewTopic.php";
    
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


function validateDeleteCategory(id, name){

    
    if(categoryDeleteConfirmation(name)){
        performDeleteCategory(id);
    }
    return false;
}

function performDeleteCategory(id){

    const url = "../api/deleteCategory.php";
    
    const data = {
        CategoryID: id
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


function validateDeleteTopic(id, title){

    
    if(topicDeleteConfirmation(title)){
        performDeleteTopic(id);
    }
    return false;

}

function performDeleteTopic(id){

    const url = "../api/deleteTopic.php";
    
    const data = {
        TopicID: id
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

    const url = "../api/updateCategory.php";
    
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

    const url = "../api/updateTopic.php";

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
    const url = "../api/getTopicsByPageNumber.php";

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
                        <th></th>
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
                                        </div>
                                    <td>
                                        <button onclick="editTopic('${topic.Title}', ${topic.TopicID}, ${topic.CategoryID}, '${topic.Content}')">Update</button>
                                        <button onclick="validateDeleteTopic(${topic.TopicID}, '${topic.Title}')">Delete</button>
                                    </td>
                                </tr>
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
    const url = "../api/readTotalTopicPage.php";
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
    const url = "../api/getCategoriesByPageNumber.php";

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
                    <th></th>
                </tr>`;

                if (categories.length > 0) {
                    categories.forEach(category => {
                        categoryList.innerHTML += `
                        <tr>
                            <td>${category.CategoryID}</td>
                            <td>${category.CategoryName}</td>
                            <td>
                                <button class="edit_button" onclick="editCategory(${category.CategoryID}, '${category.CategoryName}')">Edit</button>
                                <button class="delete_button" onclick="validateDeleteCategory(${category.CategoryID}, '${category.CategoryName}')">Delete</button>
                            </td>

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
    const url = "../api/readTotalCategoryPage.php";
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
    const url = "../api/getUsersByPageNumber.php";

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
                    <th></th>
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
                                    <td><button onclick="validateBanUser(${user.is_banned}, ${user.user_id})">Ban/Unban</button>
                                        <button onclick="validateDeleteUser(${user.user_id})">Delete</button>
                                    </td>
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
    const url = "../api/readTotalUserPage.php";
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

function validateDeleteUser(id){
    
    if(UserDeleteConfirmation(id)){
        performDeleteUser(id);
    }
    return false;
}

function performDeleteUser(id){

    const url = "../api/deleteUser.php";
    
    const data = {
        user_id: id
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

function validateBanUser(operation, user_id) {

    // username validation 
    var userIdRegex = /^[0-9]+$/;
    if (!userIdRegex.test(user_id)) {
        alert('User ID must contain only numbers');
        return false;
    }
    var switchBanStatus;

    if(operation == 1){
        switchBanStatus = 0;
    }
    else{
        switchBanStatus = 1;
    }
    // if validation done and user confirm operation, it posts data
    if(banUserConfirmation(user_id))
    {
        performBanUser(switchBanStatus, user_id);
    }
    return false;
}

function performBanUser(operation, userId) {

    const url = "../api/banUser.php";
    

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

    const url = "../api/deleteComment.php";

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

function selectImage() {
    document.getElementById('imageInput').click();
}

function handleImageSelection() {

    var formData = new FormData();
    var fileInput = document.getElementById('imageInput');

    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../api/postImage.php', true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            } else {
                console.error('Error uploading image');
            }
        };

        xhr.send(formData);
    } else {
        console.error('Please select an image to upload');
    }
}

function updateImageFailAlert(){
    var message = 'Profile image update is failed.';
    alert(message);
}
function updateImageSuccessAlert(){
    var message = 'Profile image updated successfully.';
    alert(message);
}

function getProfilePicture(){
    const url = "../api/getImage.php";

    const fetchOptions = {
        method: "GET"
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);

        if (data.status === 'success'){
            console.log(data.path);
            document.getElementById("profile_picture").src = data.path;
        } 
        else {
            updateImageFailAlert();
        }
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });

}

function editCategory(categoryID, categoryName) {
    var encodedCategoryID = encodeURIComponent(categoryID);
    var encodedCategoryName = encodeURIComponent(categoryName);

    var url = "./updateCategory.php?categoryID=" + encodedCategoryID + "&categoryName=" + encodedCategoryName;

    window.location.href = url;
}

function editTopic(title, topicID, categoryID, content) {
    var encodedTitle = encodeURIComponent(title);
    var encodedTopicID = encodeURIComponent(topicID);
    var encodedCategoryID = encodeURIComponent(categoryID);
    var encodedContent = encodeURIComponent(content);

    var url = "./updateTopic.php?categoryID=" + encodedCategoryID + "&title=" + encodedTitle + "&topicID=" + encodedTopicID + "&content=" + encodedContent;

    window.location.href = url;
}

function openCreateTopic(){
    window.location.href = './createTopic.php';
}

function openCreateCategory(){
    window.location.href = './createCategory.php';
}
