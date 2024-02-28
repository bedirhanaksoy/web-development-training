<?php

class categoryBody {

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'my_blog');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function createCategory($categoryName){
        $stmt = $this->api->prepare("INSERT INTO categories (CategoryName) VALUES (?)");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("s", $categoryName);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function deleteCategory($categoryID){
  
        $stmt = $this->api->prepare("DELETE FROM categories WHERE CategoryID=?");
    
        if ($stmt === false) {
            return false; 
        }
    
        $stmt->bind_param("i", $categoryID);
        $result = $stmt->execute();
        $stmt->close();
    
        return $result;
    }

    public function updateCategory($categoryID, $categoryName){
        $stmt = $this->api->prepare("UPDATE categories SET CategoryName=? WHERE CategoryID=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("si", $categoryID, $categoryName);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function getPageNumber(){
        $stmt = $this->api->prepare("SELECT COUNT(*) FROM categories");
        
        $result = $stmt->execute();

        if ($stmt === false) {
            $stmt->close();
            return false; 
        }

        $stmt->bind_result($totalCount);
        $stmt->fetch();
        $stmt->close();
    
        $categoriesPerPage = 10;
        $pageCount = ceil($totalCount/$categoriesPerPage);
        
        return $pageCount;
    }

    public function getCategoriesByPage($page) {
        $stmt = $this->api->prepare("SELECT * FROM categories LIMIT ? OFFSET ?");
        
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
            $categories = array();
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
            return $categories;
        } 
        else {
            return false;
        }
    }


}

?>