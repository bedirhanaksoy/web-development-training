<?php
session_start();
require('../body/userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if(isUserExists($data['user_id'])===1){
            $usernameGetter = new userBody();
            $result = $usernameGetter->getUsernameById($data['user_id']);

            if ($result) {
                echo json_encode(array('status' => 'success' , 'username' => $result));
            } 
            else 
            {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to get username'));
            }
        }
        else{
            http_response_code(400);
            echo json_encode(array('error' => 'Invalid user id'));    
        }
    } 
    else{
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function isUserExists($page){
    /*

    */
    return 1;
}

?>
