<?php

class userBody {

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'my_blog');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function deleteUser($user_id){
  
        $stmt = $this->api->prepare("DELETE FROM users WHERE user_id=?");
    
        if ($stmt === false) {
            return false; 
        }
    
        $stmt->bind_param("i", $user_id);
        $result = $stmt->execute();
        $stmt->close();
    
        return $result;
    }

    public function banUser($user_id, $status){
        $stmt = $this->api->prepare("UPDATE users SET is_banned=? WHERE user_id=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("ii", $status, $user_id);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function getPageNumber(){
        $stmt = $this->api->prepare("SELECT COUNT(*) FROM users");
        
        $result = $stmt->execute();

        if ($stmt === false) {
            $stmt->close();
            return false; 
        }

        $stmt->bind_result($totalCount);
        $stmt->fetch();
        $stmt->close();
    
        $usersPerPage = 10;
        $pageCount = ceil($totalCount/$usersPerPage);
        
        return $pageCount;
    }

    public function getUsernameById($user_id){
        $stmt = $this->api->prepare("SELECT username FROM users WHERE user_id=?");
        
        $stmt->bind_param("i", $user_id);
        $result = $stmt->execute();
    
        if ($result === false) {
            $stmt->close();
            return false; 
        }
    
        $stmt->bind_result($username);
        $stmt->fetch();
        $stmt->close();
    
        return $username;
    }
    

    public function getUsersByPage($page) {
        $stmt = $this->api->prepare("SELECT * FROM users LIMIT ? OFFSET ?");
        
        if ($stmt === false) {
            return false;
        }

        $pageLimit = 10;
        $firstIndex = ($page - 1) * $pageLimit;

        $stmt->bind_param("ii", $pageLimit, $firstIndex);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result) {
            $users = array();
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            return $users;
        } 
        else {
            return false;
        }
    }


}

?>