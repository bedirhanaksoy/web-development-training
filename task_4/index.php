
<html>
    <body>


        <?php
                $mysqli = new mysqli("localhost","bedirhan","Qweqwe123*","company");
                if ($mysqli -> connect_errno) {
                    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
                    exit();
                }
        ?>

        <h2>All To Do's</h1>

        <?php
            $sql = "SELECT * FROM TODO";
            $result = $mysqli->query($sql);
            
            if ($result) {
                if ($result->num_rows > 0) {
                    echo "<ul>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<li>TODO_id: " . $row['TODO_id'] . ", TODO: " . $row['TODO'] . ", Employee ID: " . $row['employee_id'] . "</li>";
                    }
                    echo "</ul>";
                } else {
                    echo "No TODOs found.";
                }
                $result->free_result();
            } else {
                echo "Error: " . $sql . "<br>" . $mysqli->error;
            }
        ?>

        <h2>Add New To Do</h1>
        <form action="" method="post">
                                    Enter New To Do:                 <input type="text" name="new_todo"><br>
                                    Enter Assigned Employee ID:      <input type="number" name="emp_id"><br>
                                                                     <input type="submit" name ="todo_add_submit" ><br>
        </form>

        <?php
            if(isset($_POST["todo_add_submit"])){

                $todoText = $_POST['new_todo'];
                $employeeId = $_POST['emp_id'];
                $sql = "INSERT INTO TODO (TODO, employee_id) VALUES ('$todoText', $employeeId);";

                if ($mysqli->query($sql) === TRUE) {
                    echo "TODO added successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $mysqli->error;
                }
                
            }
        ?>


        <h2>Update To Do</h1>
        <form action="" method="post">
                                    Enter a To Do id to update:      <input type="number" name="todo_id"><br>
                                    Enter the Updated To Do:         <input type="text" name="updated_todo"><br>
                                                                     <input type="submit" name ="todo_update_submit" ><br>
        </form>

        <?php
            if(isset($_POST["todo_update_submit"])){
                
                $updatedTodo = $_POST['updated_todo'];
                $todoId = $_POST['todo_id'];

                $sql = "UPDATE TODO SET TODO = '$updatedTodo' WHERE TODO_id=$todoId;";

                if ($mysqli->query($sql) === TRUE) {
                    echo "TODO updated successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $mysqli->error;
                }
                
            }
        ?>

        <h2>Delete To Do</h1>
        <form action="" method="post">
                                    Enter a To Do id to Delete:      <input type="number" name="delete_todo_id"><br>
                                                                     <input type="submit" name ="todo_delete_submit" ><br>
        </form>

        <?php
            if(isset($_POST["todo_delete_submit"])){
                
                $delete_todoId = $_POST['delete_todo_id'];

                $sql = "DELETE FROM TODO WHERE TODO_id=$delete_todoId;";

                if ($mysqli->query($sql) === TRUE) {
                    echo "TODO deleted successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $mysqli->error;
                }
                
            }
        ?>




    </body>


</html>