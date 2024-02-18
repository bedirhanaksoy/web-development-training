<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="App.js"></script>
    </head>

    <h1>Users List</h1>
    <ul id="userList"></ul>
    <script>getData();</script>

    
    <h1>Create User</h1>
    <form id="create" action="" method="post" onsubmit="return validateCreateUser()">
        <label for="username">Username:</label><br>
        <input type="text" name="username" id="create_username"><br><br>
        <label for="email">Email:</label><br>
        <input type="text" name="email" id="create_email"><br><br>
        <label for="password">Password:</label><br>
        <input type="text" name="password" id="create_password"><br><br>
        <input type="submit" value="submit">
    </form>

    <h1>Update User</h1>
    <form id="update" action="" method="post" onsubmit="return validateUpdateUser()">

        <label for="id">User's ID to update:</label><br>
        <input type="number" name="ID" id="update_id"><br><br>
        <label for="new_username">New Username:</label><br>
        <input type="text" name="username" id="update_username"><br><br>
        <label for="new_email"> New Email:</label><br>
        <input type="text" name="email" id="update_email"><br><br>
        <label for="new_password">New Password:</label><br>
        <input type="text" name="password" id="update_password"><br><br>
        <input type="submit" value="submit">
    </form>

    <h1>Delete User</h1>
    <form id="delete" action="" method="post" onsubmit="return validateDeleteUser()">
        <label for="user_delete_id">User ID to delete:</label><br>
        <input type="number" name="delete_id" id="delete_id"><br><br>
        <input type="submit" value="submit"">
    </form>

</html>