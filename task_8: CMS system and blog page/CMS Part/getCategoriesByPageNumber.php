<?php
session_start();
require('categoryBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if(isPageExists($data['pageNumber'])===1){
            $topicReader = new categoryBody();
            $result = $topicReader->getCategoriesByPage($data['pageNumber']);

            if ($result) {
                echo json_encode(array('status' => 'success' , 'categories' => $result));
            } 
            else 
            {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to get page number'));
            }
        }
        else{
            http_response_code(400);
            echo json_encode(array('error' => 'Invalid range'));    
        }
    } 
    else{
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function isPageExists($page){
    /*

    */
    return 1;
}

?>
