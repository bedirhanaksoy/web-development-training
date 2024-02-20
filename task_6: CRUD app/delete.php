<?php
class Delete {
    private $api;

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'web_dev_crud');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function deleteUser($id){
        $stmt = $this->api->prepare("DELETE FROM users WHERE id=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("i", $id);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $deleteData = file_get_contents('php://input');
    $data = json_decode($deleteData, true);

    if ($data !== null) {
        $deleter = new Delete();
        $result = $deleter->deleteUser($data['id']);

        if ($result) {
            echo json_encode(array('status' => 'success'));
        } else {
            http_response_code(500);
            echo json_encode(array('error' => 'Failed to delete user'));
        }
    } else {
        http_response_code(400);
    }
}
?>
