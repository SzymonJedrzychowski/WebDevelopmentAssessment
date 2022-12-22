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

        // Check if correct params were provided.
        $this->checkAvailableParams($this->getAvailableParams());

        // Check for specific params clashes and connections.
        if (filter_has_var(INPUT_GET, 'track') and filter_has_var(INPUT_GET, 'author_id')) {
            throw new BadRequest("Parameters track and author_id cannot be used together.");
        }

        // Modify the sqlCommand according to provided params.
        if (filter_has_var(INPUT_GET, 'track')) {
            $sql .= " WHERE track.short_name = :track";
            $params[':track'] = $_GET['track'];
        } elseif (filter_has_var(INPUT_GET, 'author_id')) {
            $sql .= " JOIN paper_has_author ON paper_has_author.paper_id = paper.paper_id WHERE paper_has_author.authorId = :author_id";
            $params[':author_id'] = $_GET['author_id'];
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
