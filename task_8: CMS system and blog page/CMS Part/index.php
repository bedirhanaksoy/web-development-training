
<?php
    session_start();
    
    if(isset($_SESSION['id'])){
    header('Location: cmsHomePage.php');
    }
?>

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="Login.js"></script>
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

  </style>

    </head>

    <div classname="my-10 ">
        <div class="flex flex-col items-center justify-center my-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                Log In
            </h1>
            <form id="create" action="" method="post" onsubmit="return validateLogin()">
                <label for="username">Username:</label>
                <input type="text" name="username" id="login_username" class="border rounded-md border-gray-300 p-2" ><br><br>
                <label for="email">Email:</label>
                <input type="text" name="email" id="login_email" class="border rounded-md border-gray-300 p-2" ><br><br>
                <label for="password">Password:</label>
                <input type="text" name="password" id="login_password" class="border rounded-md border-gray-300 p-2" ><br><br>
                <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Log In</button>
            </form>
            <label for="myLink">Don't have an account, <a href="signin.html" class="text-blue-500">Sign In</a></label>
        </div>
    </div>
</html>