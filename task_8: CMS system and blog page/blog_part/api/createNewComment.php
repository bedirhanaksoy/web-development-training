<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['id']) ) {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_comment_content($data['content'])){

            $publish_time = commentPublishTime();
            $commentCreator = new topicBody();
            $result = $commentCreator->createComment($data['owner_id'], $data['topic_id'], $data['content'], $publish_time);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to create comment'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid comment'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_if_category_exists($categoryID){
    /*

    */
    return 1;
}

function check_if_user_exists($userID){
    /*

    */
    return 1;
}

function check_comment_content($topicContent){
    if(preg_match('/^(?!\s+$)[a-zA-Z0-9\s]{10,1000}$/', $topicContent)===1) { 
        return 1;
    }
    else return 0;
}

function commentPublishTime(){
    return date('Y-m-d H:i:s');
}



?>