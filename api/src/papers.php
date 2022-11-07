<?php

/**
 * Papers class
 *
 * Responsible for handling /api/papers endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Papers{
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

        $sql = "SELECT paper_id, title, award, abstract, track.name, track.short_name FROM paper JOIN track ON paper.track_id=track.track_id";
        $params = array();

        try{
            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('track') )) {
                    throw new BadRequest("Invalid parameter " . $key);
                }
            }
        }catch(BadRequest $e){
            $this->data = ["message" => $e->badRequestMessage()];
            return;
        }
                
        if (filter_has_var(INPUT_GET, 'track')) {
            $sql .= " WHERE track.short_name = :track";
            $params = array(":track" => $_GET['track']);
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
    public function getData()
    {
        return json_encode($this->data);
    }
}
