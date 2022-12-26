<?php

/**
 * Responsible for handling /papers endpoint.
 *
 * This class reads and validates received parameters and returns the data of papers from the database.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Papers extends Endpoint
{
    /**
     * Override parent method to get prepare SQL command and variables to get the papers data from database.
     *
     * @throws BadRequest If incorrect request method was used or incorrect parameter was provided.
     */
    protected function initialiseSQL()
    {
        // Check if correct request method was used.
        $this->validateRequestMethod("GET");

        // Create SQL command to get papers data.
        $sql = "SELECT paper.paper_id, title, award, abstract, track.name, track.short_name FROM paper JOIN track ON paper.track_id=track.track_id";
        $params = array();
        $where = false;

        // Check if correct params were provided.
        $this->checkAvailableParams($this->getAvailableParams());

        // Modify the sqlCommand according to provided params.
        if (filter_has_var(INPUT_GET, 'author_id')) {
            $sql .= " JOIN paper_has_author ON paper_has_author.paper_id = paper.paper_id WHERE paper_has_author.authorId = :author_id";
            $where = true;
            $params[':author_id'] = $_GET['author_id'];
        }
        if (filter_has_var(INPUT_GET, 'track')) {
            if($where){
                $sql .= " AND track.short_name = :track";
            }else{
                $sql .= " WHERE track.short_name = :track";
                $where = true;
            }
            $params[':track'] = $_GET['track'];
        } 

        $this->setSQLCommand($sql);
        $this->setSQLParams($params);
    }

    /**
     * Set the array of available parameters for /papers endpoint.
     *
     * @return string[] Array of available params.
     */
    protected function getAvailableParams()
    {
        return ['track'=>'string', 'author_id'=>'int'];
    }
}
