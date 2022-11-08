<?php

/**
 * Papers class
 *
 * Responsible for handling /api/papers endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Papers
{
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
    public function __construct()
    {
        try {
            $db = new Database("db\\chiplay.sqlite");

            $sql = "SELECT paper.paper_id, title, award, abstract, track.name, track.short_name FROM paper JOIN track ON paper.track_id=track.track_id";
            $params = array();

            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('track', 'author_id'))) {
                    throw new BadRequest("Invalid parameter " . $key);
                }
            }

            if (filter_has_var(INPUT_GET, 'track') and filter_has_var(INPUT_GET, 'author_id')) {
                throw new BadRequest("Parameters track and author_id cannot be used together.");
            }

            if (filter_has_var(INPUT_GET, 'track')) {
                $sql .= " WHERE track.short_name = :track";
                $params = array(":track" => $_GET['track']);
            } elseif (filter_has_var(INPUT_GET, 'author_id')) {
                $sql .= " JOIN paper_has_author ON paper_has_author.paper_id = paper.paper_id WHERE paper_has_author.authorId = :author_id";
                $params = array(":author_id" => $_GET['author_id']);
            }

            $this->data = $db->executeSQL($sql, $params);
        } catch (BadRequest $e) {
            $this->data = ["message" => $e->badRequestMessage()];
        }
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
        if (sizeof($this->data) == 0) {
            http_response_code(204);
        }
        return json_encode($this->data);
    }
}
