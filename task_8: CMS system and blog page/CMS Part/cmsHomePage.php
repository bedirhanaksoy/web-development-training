<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>my_blog</title>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="CmsHomepage.js"></script> 

  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    header {
      background-color: #333;
      color: #fff;
      padding: 10px;
      text-align: center;
    }

    nav {
      background-color: #555;
      overflow: hidden;
    }

    nav a {
      float: left;
      display: block;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    nav a:hover {
      background-color: #ddd;
      color: black;
    }

    .logout {
      float: right; 
    }

    .content {
      padding: 20px;
    }

    nav a.active {
      background-color: #ddd;
      color: black;
    }

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

        .round-border {

            border-style: solid;
            border-radius: 25px;
            border: 2px solid #2196F3;
            padding: 20px;
            width: 100%; 
            max-width: 600px;
            height: 150px;
            box-sizing: border-box;

        }

        .page-box {
            text-align: right;
        }

        th, td{
            width: 100px;
            height: 50px;
            border: 1px solid #dddddd;
            text-align: left;
            
            table-layout:fixed;
            overflow: hidden;
        }

        table {
            display:block;
            align-items:center;
            width: 100%;
            border-collapse: collapse;

        }
        
        .fixed{
            table-layout:fixed; 
            overflow: hidden;
        }

        h1,
        h3 {
            text-align: center;
        }

        .scrollable{
            display:flex;
            min-width: 150px;
            max-height:60px; 
            overflow:auto        
        }

  </style>
</head>
<body>

  <nav>
    <a id="my_blog">my_blog</a>
    <a href="#" id="categoriesLink" class="active" onclick="showContent('categories')">Categories</a>
    <a href="#" id="topicsLink" onclick="showContent('topics')">Topics</a>
    <a href="#" id="usersLink" onclick="showContent('users')">Users</a>
    <a href="#" id="commentsLink" onclick="showContent('comments')">Comments</a>
    <a href="#" onclick="performLogout()" class="logout">Logout</a>
  </nav>
  
  <div class="flex-container content" id="categories">
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
        <div>
            <table class="container right mx-auto mt-8 " id="content-bar">
                    <script>
                        getCategoriesAndPageBar();
                    </script>
            </table>
            <div id="page-bar" class=" page-box justify-center items-center">

            </div>
        </div>
    </div>

    <div class="flex-container content" id="topics">
        <div class="left">
            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Create Topic
                    </h1>
                    <form id="createTopic" action="" method="post" onsubmit="return validateCreateTopic()">
                        <label for="create_topic_title">New Topic Title:</label>
                        <input type="text" name="topic_title" id="create_topic_title" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="create_categoryname">New Topic Category ID:</label>
                        <input type="text" name="topic_category_id" id="create_topic_category_id" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="create_categoryname">New Topic Content:</label>
                        <input type="text" name="topic_content" id="create_topic_content" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>

            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Delete Topic
                    </h1>
                    <form id="deleteTopic" action="" method="post" onsubmit="return validateDeleteTopic()">
                        <label for="delete_topic_id">Delete Topic ID:</label>
                        <input type="text" name="delete_topic_id" id="delete_topic_id" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>

            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Update Topic
                    </h1>
                    <form id="updateTopic" action="" method="post" onsubmit="return validateUpdateTopic()">
                        <label for="update_topic_title">Update Topic Title:</label>
                        <input type="text" name="update_topic_title" id="update_topic_title" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="update_topic_category_id">Update Topic Category ID:</label>
                        <input type="text" name="update_topic_category_id" id="update_topic_category_id" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="update_topic_id">Topic ID to Update:</label>
                        <input type="text" name="update_topic_id" id="update_topic_id" class="border rounded-md border-gray-300 p-2" ><br><br>
                        <label for="update_topic_content">Update Topic Content:</label>
                        <input type="text" name="update_topic_content" id="update_topic_content" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div>
            <table class="container" id="topic-bar">
                <script>
                    getTopicsAndPageBar();
                </script>
            </table>
            <div id="topic-page-bar" class=" page-box justify-center items-center">

            </div>
        </div>
    </div>

    <div class="flex-container content" id="comments">
        <div class="left">
            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Delete Comment
                    </h1>
                    <form id="deleteComment" action="" method="post" onsubmit="return validateDeleteComment()">
                        <label for="delete_comment_id">Delete Comment ID:</label>
                        <input type="number" name="delete_comment_id" id="delete_comment_id" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div>
            <table class="container" id="comment-bar">
                <script>
                    //getCommentsAndPageBar();
                </script>
            </table>
            <div id="comment-page-bar" class=" page-box justify-center items-center">
            </div>
        </div>
    </div>


    <div class="flex-container content" id="users">
        <div class="left">
            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Ban User
                    </h1>
                    <form id="banUser" action="" method="post" onsubmit="return validateBanUser(1)">
                        <label for="ban_user_id">Ban User ID:</label>
                        <input type="number" name="ban_user_id" id="ban_user_id" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>

            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Remove User Ban
                    </h1>
                    <form id="removeBanUser" action="" method="post" onsubmit="return validateBanUser(0)">
                        <label for="remove_ban_user_id">Remove Ban User ID:</label>
                        <input type="number" name="remove_ban_user_id" id="remove_ban_user_id" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>


            <div classname="my-10 ">
                <div class="flex flex-col items-center justify-center my-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                        Delete User
                    </h1>
                    <form id="deleteUser" action="" method="post" onsubmit="return validateDeleteUser()">
                        <label for="delete_user_id">Delete User ID:</label>
                        <input type="number" name="delete_user_id" id="delete_user_id" class="border rounded-md border-gray-300 p-2" ><br>
                        <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div>
            <table class="container mx-auto mt-8 " id="user-table">
                <script>
                    getUsersAndPageBar();
                </script>
            </table>
            <div id="user-page-bar" class=" page-box justify-center items-center">

            </div>
        </div>

    </div>


</body>
</html>
