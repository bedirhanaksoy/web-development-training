<?php
session_start();
require('topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);


    $topicCreator = new topicBody();
    $result = $topicCreator->getFilteredPageNumber($data['CategoryID']);

    if ($result!=null) {
        echo json_encode(array('status' => 'success' , 'pageNumber' => $result));
    } 
    else 
    {
        http_response_code(500);
        echo json_encode(array('error' => 'Failed to get page number'));
    }
}

?>
