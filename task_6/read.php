<?php
class Read {
    private $api;

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'web_dev_crud');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function getUsers(){
        $result = $this->api->query("SELECT * FROM users");
    
        if ($result) {
            $users = array();
    
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
    
            return $users;

        } else {

            return false;
            
        }
    }
    }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $reader = new Read();
        $result = $reader->getUsers();

        if ($result) {
            echo json_encode(array('status' => 'success', 'users' => $result));
        } else {
            http_response_code(500);
            echo json_encode(array('error' => 'Failed to create user'));
        }
    } else {
        http_response_code(400);
    }
?>
