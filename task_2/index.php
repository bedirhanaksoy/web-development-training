
<html>
    <body>

        <h2>Form Handling</h1>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
            Your age:               <input type="number" name="age" 
                                           pattern="^[0-9]*$"
                                           placeholder="Enter your age" 
                                           oninvalid="this.setCustomValidity('Age can include only positive integers')"  
                                           oninput="this.setCustomValidity('')"><br>

            Your email:             <input type="text"
                                           placeholder="Enter your email" 
                                           pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                           oninvalid="this.setCustomValidity('Enter a valid email address (ex: test@info.me)')"  
                                           oninput="this.setCustomValidity('')"><br>

            Your name:              <input type="text" name="name" required 
                                           placeholder="Enter your name" 
                                           pattern = "[a-zA-Z-]+"
                                           oninvalid="this.setCustomValidity('Name field is required and enter only alphabetic characters')"  
                                           oninput="this.setCustomValidity('')"><br>
                                    <input type="submit" >
        </form>
        



        <h2>Cookies</h1>
        <form action="" method="post">
                                    <input type="radio" name="theme" value="dark">Dark
                                    <input type="radio" name="theme" value="light">Light
                                    <input type="submit" name ="theme_submit" >
        </form>

        <?php
            if(isset($_POST["theme_submit"])){

                $theme_value = $_POST["theme"];
                setcookie('theme', $theme_value, time()+10000, '/');

                echo $_COOKIE["theme"] . "<br/>";
            }
        ?>
        


        <h2>Sessions</h1>
        <form action="" method="post">
                                    <input type="test" name="session_name" placeholder="Enter your name"><br>
                                    <input type="submit" name ="session_submit" ><br>
        </form>

        <?php
            session_start();
            $_SESSION["name"] = $_POST["session_name"];

            echo "Name variable in this session is ". $_SESSION["name"];

            session_unset();
            session_destroy();
        ?>
        



        <h2>File Operations</h1>
        <form action="" method="post">
        Enter a file name to open:        <input type="text" name="file_name_input" placeholder= "Enter File Name"><br>
        Enter an input to write file:     <input type="text" name="file_write_input" placeholder= "Enter Input to Write File"><br>
                                          <input type="submit" name="name_submit"><br>

        </form>

        <?php
            // exception handling with try catch mechanism
            if(isset($_POST["name_submit"])){
                try 
                {
                    $user_fileName_input = $_POST["file_name_input"];
                    $path = "/var/www/html/" . $user_fileName_input;
                    $fp = fopen($path, "a+");
                    if($fp === false){
                        throw new Exception('File cannot opened, please try again. <br>');
                    }
                    else{
                        $file_size = filesize( $path ); 
                        $file_data = fread( $fp, $file_size ); 
                        echo "File data is : ". $file_data;

                        fwrite($fp, $_POST["file_write_input"]); 
                        $file_data = fread( $fp, $file_size ); 
                        echo "Updated file data is : ". $file_data;

                    }
                    fclose($fp);
                }
                catch (Exception $exception){
                    echo "$exception"."<br>";
                }
    
            }


        ?>




    </body>


</html>