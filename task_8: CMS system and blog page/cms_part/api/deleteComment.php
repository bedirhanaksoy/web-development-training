<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_SESSION['id'])) {
    $deleteData = file_get_contents('php://input');
    $data = json_decode($deleteData, true);

    if ($data !== null) {
        if (check_if_comment_id_exists($data['comment_id'])) {

            $commentDeleter = new topicBody();
            $result = $commentDeleter->deleteComment($data['comment_id']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to delete comment'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid comment ID'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_if_comment_id_exists($comment_id){
/*

*/
return 1;
}




?>