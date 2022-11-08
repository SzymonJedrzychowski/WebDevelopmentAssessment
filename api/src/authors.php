<?php

/**
 * Authours class
 *
 * Responsible for handling /api/authors endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Authors
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

            $sql = "SELECT author_id, first_name, middle_initial, last_name FROM author";
            $params = array();

            foreach ($_GET as $key => $value) {
                if (!in_array($key, array('paper_id', 'affiliation'))) {
                    throw new BadRequest("Invalid parameter " . $key);
                }
            }

            if (filter_has_var(INPUT_GET, 'affiliation') and !filter_has_var(INPUT_GET, 'paper_id')) {
                throw new BadRequest("Parameter affiliation cannot be used without parameter paper_id.");
            }

            if (filter_has_var(INPUT_GET, 'paper_id') and filter_has_var(INPUT_GET, 'affiliation')) {
                $sql = "SELECT DISTINCT author_id, first_name, middle_initial, last_name, affiliation.country, affiliation.state, affiliation.city, affiliation.institution, affiliation.department
                FROM author
                JOIN paper_has_author ON paper_has_author.authorId = author.author_id
                JOIN paper ON paper_has_author.paper_id = paper.paper_id
                JOIN affiliation on affiliation.person_id = author.author_id and paper.paper_id = affiliation.paper_id
                WHERE paper.paper_id = :paper_id";
                $params = array(":paper_id" => $_GET['paper_id']);
            } elseif (filter_has_var(INPUT_GET, 'paper_id')) {
                $sql .= " JOIN paper_has_author ON paper_has_author.authorId = author.author_id
                JOIN paper ON paper_has_author.paper_id = paper.paper_id
                WHERE paper.paper_id = :paper_id";
                $params = array(":paper_id" => $_GET['paper_id']);
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
