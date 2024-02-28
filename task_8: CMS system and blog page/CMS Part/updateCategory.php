<?php
session_start();
require('categoryBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_SESSION['id'])) {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_category_name($data['categoryName']) && check_if_category_id_exists($data['categoryID'])) {

            $categoryUpdater = new categoryBody();
            $result = $categoryUpdater->updateCategory($data['categoryName'], $data['categoryID']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to update category'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid category name'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_category_name($category){
    if(preg_match('/^(?!\s+$)[a-zA-Z0-9\s]{1,20}$/', $category)===1) { 
        return 1;
    }
    else return 0;
}

function check_if_category_id_exists($category_id){
    /*
    
    */
    return 1;
}    

?>