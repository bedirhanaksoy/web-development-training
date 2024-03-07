<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_SESSION['id'])) {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_topic_title($data['topicTitle'])  && check_topic_content($data['topicContent']) && check_if_category_exists($data['topicCategoryId'])) {

            $updateTime = topicUpdateTime();
            $topicUpdater = new topicBody();
            $result = $topicUpdater->updateTopic($data['topicID'], $data['topicCategoryId'], $data['topicTitle'], $data['topicContent'], $updateTime);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to create topic'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid topic name'));
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

function check_if_topic_exists($topicID){
    /*

    */
    return 1;
}

function check_if_user_exists($userID){
    /*

    */
    return 1;
}

function check_topic_title($topicTitle){
    if(preg_match('/^(?!\s+$)[a-zA-Z0-9\s]{1,20}$/', $topicTitle)===1) { 
        return 1;
    }
    else return 0;
}

function check_topic_content($topicContent){
    if(preg_match('/^(?!\s+$)[a-zA-Z0-9\s]{50,1000}$/', $topicContent)===1) { 
        return 1;
    }
    else return 0;
}

function topicUpdateTime(){
    return date('Y-m-d H:i:s');
}



?>