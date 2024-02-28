<?php
    class Update {
        private $api;

        public function __construct(){
            $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'web_dev_crud');

            if($this->api->connect_error){
                echo "Connection Failed";
            }
        }

        public function updateUser($username, $email, $password, $id){
            $stmt = $this->api->prepare("UPDATE users SET username=?, email=?, password=? WHERE id=?");

            if ($stmt === false) {
                return false; 
            }

            $stmt->bind_param("sssi", $username, $email, $password, $id);
            $result = $stmt->execute();
            $stmt->close();

            return $result;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $putData = file_get_contents('php://input');
        $data = json_decode($putData, true);

        if ($data !== null) {
            if (check_email($data['email']) && check_username($data['username'])) {
                
                // password hashing
                $hashed_pw = (string)password_hash($data['password'], PASSWORD_BCRYPT);

                $updator = new Update();
                $result = $updator->updateUser($data['username'], $data['email'], $hashed_pw, $data['id']);

                if ($result) {
                    echo json_encode(array('status' => 'success'));
                } else {
                    http_response_code(500);
                    echo json_encode(array('error' => 'Failed to update user'));
                }
            }
        } 
        else {
            http_response_code(400);
        }
    }

    function check_username($username){
        if(preg_match('/^[a-zA-Z0-9]{5,20}$/', $username)===1) { 
            return 1;
        }
        else return 0;
    }
    
    function check_email($email){
        if(filter_var($email, FILTER_VALIDATE_EMAIL) !== false){
            return 1;
        }
        else return 0;
    }
    
?>
