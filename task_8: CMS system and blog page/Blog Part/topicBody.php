
<?php

class topicBody {

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'my_blog');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function createTopic($categoryID, $title, $content, $publishTime, $updateTime, $userID){
        $stmt = $this->api->prepare("INSERT INTO topics (CategoryID, Title, Content, publish_time, update_time, user_id) VALUES (?, ?, ?, ?, ?, ?)");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("issssi", $categoryID, $title, $content, $publishTime, $updateTime, $userID);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function createComment($ownerID, $topicID, $content, $publishTime){
        $stmt = $this->api->prepare("INSERT INTO comments (owner_id, topic_id, publish_date, content) VALUES (?, ?, ?, ?)");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("iiss", $ownerID, $topicID, $publishTime, $content);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function getComments($topicID) {
        $stmt = $this->api->prepare("SELECT * FROM comments WHERE topic_id=?");
        
        if ($stmt === false) {
            return false;
        }

        $stmt->bind_param("i", $topicID);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result!=null) {
            $comments = array();
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
            return $comments;
        } 
        else {
            return false;
        }
    }



    public function deleteTopic($topicID){
        $stmt = $this->api->prepare("DELETE FROM topics WHERE TopicID=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("i", $topicID);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function updateTopic($topicID, $categoryID, $title, $content, $updateTime){
        $stmt = $this->api->prepare("UPDATE topics SET CategoryID=?, Title=?, Content=?, update_time=? WHERE TopicID=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("isssi", $categoryID, $title, $content, $updateTime, $topicID);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }



    public function getPageNumber(){
        $stmt = $this->api->prepare("SELECT COUNT(*) FROM topics");
        
        $result = $stmt->execute();

        if ($stmt === false) {
            $stmt->close();
            return false; 
        }

        $stmt->bind_result($totalCount);
        $stmt->fetch();
        $stmt->close();
    
        $topicPerPage = 10;
        $pageCount = ceil($totalCount/$topicPerPage);
        
        return $pageCount;
    }

    public function getFilteredPageNumber($categoryID){
        $stmt = $this->api->prepare("SELECT COUNT(*) FROM topics WHERE CategoryID=?");
        
        $stmt->bind_param("i", $categoryID);
        $result = $stmt->execute();

        if ($stmt === false) {
            $stmt->close();
            return false; 
        }

        $stmt->bind_result($totalCount);
        $stmt->fetch();
        $stmt->close();
    
        $topicPerPage = 10;
        $pageCount = ceil($totalCount/$topicPerPage);

        if($totalCount===0){
            $pageCount=1;
        }
        
        return $pageCount;
    }


    public function getTopicsByPage($page) {
        $stmt = $this->api->prepare("SELECT * FROM topics LIMIT ? OFFSET ?");
        
        if ($stmt === false) {
            return false;
        }

        $pageLimit = 10;
        $firstIndex = ($page - 1) * $pageLimit;

        $stmt->bind_param("ii", $pageLimit, $firstIndex);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result!=null) {
            $topics = array();
            while ($row = $result->fetch_assoc()) {
                $topics[] = $row;
            }
            return $topics;
        } 
        else {
            return false;
        }
    }

    public function getFilteredTopicsByPage($page, $categoryID) {
        $stmt = $this->api->prepare("SELECT * FROM topics WHERE CategoryID = ? LIMIT ? OFFSET ?");
        
        if ($stmt === false) {
            return false;
        }

        $pageLimit = 10;
        $firstIndex = ($page - 1) * $pageLimit;

        $stmt->bind_param("iii", $categoryID, $pageLimit, $firstIndex);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result!=null) {
            $topics = array();
            while ($row = $result->fetch_assoc()) {
                $topics[] = $row;
            }
            return $topics;
        } 
        else {
            $res = -1;
            return $res;
        }
    }


    public function deleteComment($comment_id){
        $stmt = $this->api->prepare("DELETE FROM comments WHERE comment_id=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("i", $comment_id);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

}


?>