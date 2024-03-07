<?php
session_start();
require('../body/userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);

    if ($file['error'] === UPLOAD_ERR_OK) {
        
        $uploadDir = '/var/www/html/cms_part/uploads/';
        $uploadPath = $uploadDir . basename($file['name']);

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            
            $pictureUploader = new userBody();
            $result = $pictureUploader->setProfilePicture($_SESSION['id'], $uploadPath);

            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'File uploaded successfully.']);
            } 
            else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update profile picture.']);
            }
        } 
        else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
        }
    } 
}
?>
