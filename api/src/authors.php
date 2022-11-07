<?php

/**
 * Authours class
 *
 * Responsible for handling /api/authors endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Authors{
    private $data;

    /**
     * __consctruct method
     * 
     * Function that is responsible for reading the data from the database.
     * Loads additional parameters of URL and uses them in SQL querry if possible.
     * It modifies the $data class variable. 
     * 
     * @throws BadRequest
     */
    public function __construct(){
        $db = new Database("db\\chiplay.sqlite");
        
        $sql = "SELECT author_id, first_name, middle_initial, last_name FROM author";
        $params = array();
        
        try{
            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('paper_id') )) {
                    throw new BadRequest("Invalid parameter " . $key);
                }
            }
        }catch(BadRequest $e){
            $this->data = ["message" => $e->badRequestMessage()];
            return;
        }

        if (filter_has_var(INPUT_GET, 'paper_id')) {
            $sql .= " JOIN paper_has_author ON paper_has_author.authorId = author.author_id JOIN paper ON paper_has_author.paper_id = paper.paper_id WHERE paper.paper_id = :paper_id";
            $params = array(":paper_id" => $_GET['paper_id']);
        }

        $this->data = $db->executeSQL($sql, $params);
    }

    /**
     * getData method
     * 
     * Function responsible for encoding and returning the data from database.
     * 
     * @return string data
     */
    public function getData(){
        return json_encode($this->data);
    }
}
