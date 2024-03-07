<?php
session_start();
require('../body/userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['id'])) {
    $imageData = file_get_contents($_FILES["image"]["tmp_name"]);

    if ($imageData !== false) {
        if (check_if_user_exists($_SESSION['id']) && check_image_size($imageData)) {

            $pictureUploader = new userBody();
            $result = $pictureUploader->setProfilePicture($_SESSION["id"], $imageData);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to upload image'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid user id or too big picture'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid data'));
    }
}

function check_if_user_exists($user_id){
    /*
    
    */
    return 1;
}    

function check_image_size($image){
    /*
    
    */
    return 1;
}
?>
