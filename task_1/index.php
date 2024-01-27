
<html>
    <body>

        <h2>Credit Card Limit Calculator</h1>

        <form action="" method="post">
            Your age:              <input type="number" name="customers_age"><br>
            Your monthly income:   <input type="number" name="customers_income"><br>
            Your net worth:        <input type="number" name="customers_net_worth"><br>
            Your credit note:      <input type="number" name="customers_credit_note"><br><br>
                                   <input type="submit">
        </form>
        
        <?php

            $age = $_POST["customers_age"];
            $income = $_POST["customers_income"];
            $net_worth = $_POST["customers_net_worth"];
            $credit_note = $_POST["customers_credit_note"];


            // credit card limit calculator (dummy logic that i provided)
            if ($income < 0 || $net_worth < 0 || $credit_note < 0) {
                echo "Inputs cannot be negative, please try again.";
            }
            // income coefficient is 0.5
            $coe_1 = $income * 0.5;

            // net worth coefficient is 0.2
            $coe_2 = $net_worth * 0.2;

            // credit note coefficient is 0.3;
            $coe_3 = $credit_note * 0.3;

            $limit = $coe_1 + $coe_2 + $coe_3;

            echo "Your expected credit card limit is $limit"."<br>"."<br>";

        ?>

        <h2>Variable Types</h1>
        <?php
            $name = "Bedirhan ";
            $name .= "Ömer ";       // concatenated strings
            $name .= "Aksoy ";
            $float = 3.14;                          
            $char = 'a';
            $int = 5;
            $bool = true;
            $toys = array("car", "lego","toy_gun");

            $sum = $float + $int;                        

            // echo statements
            echo "Welcome $name!" ."<br>";
            echo "Float value: $float"."<br>";      
            echo "Char value: $char"."<br>";
            echo "Int value: $int"."<br>";
            echo "Bool value: $bool"."<br>";
            echo "Sum value: $sum"."<br>";

        ?>


        <h2>Conditions and Loops</h1>
        <?php
            // conditional clauses
            if($int > $float){
                echo "$int is greater than $float"."<br>";
            }
            else if($int == $float){
                echo "$int is equal to $float"."<br>";
            }
            else {
                echo "$float is greater than $int"."<br>";
            }


            // loops
            $i = 5;
            $factorial = 1;
            $holder = $i;

            while($i > 0){                          
                $factorial = $factorial * $i;
                $i--;
            }
            echo"!$holder is equal to $factorial" ."<br>"."<br>";


            for ($i = 1; $i<$holder; $i++){
                $mult_res = $holder * $i;
                echo "$holder * $i = $mult_res"."<br>";
            }

            echo "<br>";

            foreach ($toys as $dummy){
                echo "$dummy <br>";
            }
            echo "<br>";
        ?>

        <h2>String Manipulation</h1>

        <form action="" method="post">
            Enter a String: <input type="text" name="input_string"><br>
                            <input type="submit" name="submitted">
        </form>

        <?php

            function stringManipulation($input_str){
                $reversed = strrev($input_str);
                $len = strlen($input_str);
                $upper = strtoupper($input_str);
                $lower = strtolower($input_str);
                $vowels = 0;
                    
                    for($i=0; $i < $len; $i++){
                        if($lower[$i] == 'e' || $lower[$i] == 'i' || $lower[$i] == 'a' || $lower[$i] == 'o' || $lower[$i] == 'u'){
                            $vowels++;
                        }
                    }
                    
                    echo "Reversed string: $reversed"."<br>";
                    echo "Lenght of the string: $len"."<br>";
                    echo "Uppercased string: $upper"."<br>";
                    echo "Count of the vowels: $vowels"."<br>";
                    echo "<br>";

            }

            if(isset($_POST["submitted"])){
                stringManipulation($_POST["input_string"]);    
            }

        ?>

        <h2>Array Functions</h1>
        <?php

            function is_input_int($input){
                return is_int($input);
            }

            $test_array = array("These", "are","the", "elements",11, "of", "my", 3, "test", "array");
            
            $sorted = $test_array;
            sort($sorted);

            $filtered = array_filter($test_array, 'is_input_int');


            echo "Elements of the array: <br>";
            foreach ($test_array as $arr_element){
                echo "$arr_element <br>";
            }
            echo "<br>";


            echo "Sorted elements in ascending order: <br>";
            foreach ($sorted as $sorted_element){
                echo "$sorted_element <br>";
            }
            echo "<br>";


            print_r($filtered);
        ?>


        <h2>Area Calculation Functions</h1>

        <form action="" method="post">
        Enter the height of the rectangle: <input type="text" name="height"><br>
        Enter the base lenght of the rectangle: <input type="text" name="base"><br>
                            <input type="submit" name="rectangle_submit">
        </form>

        <?php

            function rectangle($height, $base){
                $area = ($base * $height)/2;

                echo "Area of the rectangle is $area <br>";
            }

            if(isset($_POST["rectangle_submit"])){
                rectangle($_POST["height"], $_POST["base"]);    
            }

        ?>

        <h2>OOP Features</h1>
        
        <form action="" method="post">
        Enter the title of the book:                                 <input type="text" name="title_input"><br>
        Enter the author:                                            <input type="text" name="auth_input"><br>
        Enter the publish date:                                      <input type="number" name="date_input"><br>
        Enter the file size if it is an E-book (zero if not ebook):  <input type="number" name="size_input"><br>
                                                                     <input type="submit" name="book_submit">
        </form>


        <?php
            Class Book 
            {
                
                function get_title(){
                    return $this->title;
                }

                function get_author(){
                    return $this->author;
                }

                function get_publish_date(){
                    return $this->publish_date;
                }
                function set_title($new_title){
                    $this->title = $new_title;
                }
                function set_author($new_author){
                    $this->author = $new_author;
                }
                function set_publish_date($new_publish_date){
                    $this->publish_date = $new_publish_date;
                }


                private $title;
                private $author;
                private $publish_date;


            }

            Class Ebook extends Book {

                function get_fileSize(){
                    return $this->fileSize;
                }
                function set_fileSize($new_size){
                    $this->fileSize = $new_size;
                }
                private $fileSize;

            }

            if(isset($_POST["book_submit"])){
                if($_POST["size_input"]>0){
                    $E_book_object = new Ebook;

                    $E_book_object->set_title($_POST["title_input"]);
                    $E_book_object->set_author($_POST["auth_input"]);
                    $E_book_object->set_publish_date($_POST["date_input"]);
                    $E_book_object->set_fileSize($_POST["size_input"]);
    
                    
                    $title_info = $E_book_object->get_title();
                    $auth_info = $E_book_object->get_author();
                    $date_info = $E_book_object->get_publish_date();
                    $size_info = $E_book_object->get_fileSize();
    
                    echo "Title of the book: $title_info"."<br>";
                    echo "Author of the book: $auth_info"."<br>";
                    echo "Publish date of the book: $date_info"."<br>";
                    echo "Size of the book: $size_info"."<br>";
        
                }
                else if($_POST["size_input"]==0){
                    $E_book_object = new Book;

                    $E_book_object->set_title($_POST["title_input"]);
                    $E_book_object->set_author($_POST["auth_input"]);
                    $E_book_object->set_publish_date($_POST["date_input"]);
    
                    
                    $title_info = $E_book_object->get_title();
                    $auth_info = $E_book_object->get_author();
                    $date_info = $E_book_object->get_publish_date();
    
                    echo "Title of the book: $title_info"."<br>";
                    echo "Author of the book: $auth_info"."<br>";
                    echo "Publish date of the book: $date_info"."<br>";
                }
            }
        ?>

        <h2>Exception Handling</h1>
        <form action="" method="post">
        Enter a file name to open:                                  <input type="text" name="file_name_input"><br>
                                                                     <input type="submit" name="name_submit">

        </form>

        <?php
            if(isset($_POST["name_submit"])){
                try 
                {
                    $user_fileName_input = $_POST["file_name_input"];
    
                    $fp = fopen($user_fileName_input, "r");
                    if(!$fp){
                        throw new Exception('File cannot opened, please try again. <br>');
                    }
                }
                catch (Exception $exception){
                    echo "$exception"."<br>";
                }
    
            }
        ?>




    </body>


</html>