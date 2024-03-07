<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>my_blog</title>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="../sources/categories.js"></script> 


  <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .my-10 {
            margin-top: 2.5rem;
            margin-bottom: 2.5rem;
        }

        .flex {
            display: flex;
        }

        .flex-col {
            flex-direction: column;
        }

        .items-center {
            align-items: center;
        }

        .justify-center {
            justify-content: center;
        }

        .text-xl {
            font-size: 1.25rem;
        }

        .font-bold {
            font-weight: bold;
        }

        .leading-tight {
            line-height: 1.25;
        }

        .tracking-tight {
            letter-spacing: -0.01em;
        }

        .text-blue-500 {
            color: #4299e1;
        }

        .md\\:text-2xl {
            font-size: 1.5rem;
        }

        .text-center {
            text-align: center;
        }

        .py-6 {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }

        form {
            margin: 0;
            padding: 0;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
        }

        input {
            border: 1px solid #cbd5e0;
            border-radius: 0.25rem;
            padding: 0.5rem;
            margin-bottom: 1rem;
        }

        button {
            background-color: transparent;
            color: #4299e1;
            font-weight: bold;
            padding: 0.5rem 1rem;
            border: 1px solid #4299e1;
            border-radius: 0.25rem;
            cursor: pointer;
        }

        button:hover {
            background-color: #4299e1;
            color: #ffffff;
            border-color: transparent;
        }

        .container {
            margin-left: auto;
            margin-right: auto;
        }

        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }

        .mt-8 {
            margin-top: 2rem;
        }

        .mb-8 {
            margin-bottom: 2rem;
        }

        #content-bar {
            margin-bottom: 2rem;
        }

        #page-bar {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .flex-container {
            display: flex;
            margin: auto;
            margin-top: 8px;
        }

        .left {
            width: 50%;
        }

        .right {
            width: 50%;
        }

        </style></head>
<body>

  <div class="flex-container">
        <div class="left">
            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Create Category
                    </h1>
                    <form id="createCategory" action="" method="post" onsubmit="return validateCreateCategory()">
                        <label for="create_categoryname">New Category Name:</label><br>
                        <input type="text" name="category_name" id="create_categoryname" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>

            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Delete Category
                    </h1>
                    <form id="deleteCategory" action="" method="post" onsubmit="return validateDeleteCategory()">
                        <label for="delete_category_name">Delete Category Name:</label><br>
                        <input type="text" name="delete_category_name" id="delete_category_name" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="delete_category_id">Delete Category ID:</label><br>
                        <input type="text" name="delete_category_id" id="delete_category_id" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>

            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Update Category
                    </h1>
                    <form id="updateCategory" action="" method="post" onsubmit="return validateUpdateCategory()">
                        <label for="update_category_name">Update Category Name:</label><br>
                        <input type="text" name="update_category_name" id="update_category_name" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="update_category_id">Update Category ID:</label><br>
                        <input type="text" name="update_category_id" id="update_category_id" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="right">

            <div id="content-bar">

            </div>

            <div id="page-bar" class="flex justify-center items-center">

            </div>

        </div>

        <script>
            getCategoriesAndPageBar();
        </script>
    </div>

</body>
</html>

