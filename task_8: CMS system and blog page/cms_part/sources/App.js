
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


function validateDeleteCategory(){
    var deleteCategoryId = document.getElementById('delete_category_id').value;
    var deleteCategoryName = document.getElementById('delete_category_name').value;

    var categoryIdRegex = /^(?!\s+$)[a-zA-Z0-9\s]+$/;


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

    const url = "../api/deleteCategory.php";

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

    const url = "../api/deleteTopic.php";

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
        const pageBarDiv = document.getElementById("page-bar");

        let totalPages;
        getTotalTopicPages().then(totalPageNumber => {
            totalPages = totalPageNumber;
            updatePageBar();
        });
        
        let currentPage = 1;

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
                const categories = data.categories;

                // Log the topics array to the console for debugging
                console.log('categories:', categories);

                // Display topics on the screen
                document.getElementById('content-bar').innerHTML = ""; 
                const categoryList = document.getElementById('content-bar');
                if (categories.length > 0) {
                    categories.forEach(category => {
                        categoryList.innerHTML += `
                            <p>
                                Category Name: ${category.CategoryName}<br>
                                Category ID: ${category.CategoryID}<br>
                            </p><br>
                        `;
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

function getTotalTopicPages() {
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