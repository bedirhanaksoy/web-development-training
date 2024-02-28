<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="Login.js"></script>
        <link href="/src/output.css" rel="stylesheet" />
    </head>

    <div classname="my-10 ">
        <div class="flex flex-col items-center justify-center my-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl text-center py-6">
                Log In
            </h1>
            <form id="create" action="" method="post" onsubmit="return validateLogin()">
                <label for="username">Username:</label><br>
                <input type="text" name="username" id="login_username" class="border rounded-md border-gray-300 p-2" ><br><br>
                <label for="email">Email:</label><br>
                <input type="text" name="email" id="login_email" class="border rounded-md border-gray-300 p-2" ><br><br>
                <label for="password">Password:</label><br>
                <input type="text" name="password" id="login_password" class="border rounded-md border-gray-300 p-2" ><br><br>
                <button type="submit" value="submit" class="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">Log In</button>
            </form>
            <label for="myLink">Don't have an account, <a href="signin.html" class="text-blue-500">Sign In</a>:</label>
        </div>
    </div>
</html>