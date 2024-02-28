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

// get categories and page bar


function getCategoriesAndPageBar(){
    document.addEventListener("DOMContentLoaded", function () {
        const pageBarDiv = document.getElementById("page-bar");

        let totalPages;
        getTotalPages().then(totalPageNumber => {
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
                    updateContentDiv(currentPage);
                    updatePageBar();
                });
                pageBarDiv.appendChild(button);
            }
        }
        updatePageBar();
    });
}

function updateContentDiv(currentPage){
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

function getTotalPages() {
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