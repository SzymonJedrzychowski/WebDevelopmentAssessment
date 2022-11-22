<?php

/**
 * Responsible for handling /papers endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Papers extends Endpoint
{   
    /**
     * Override parent method to get the Papers data.
     * 
     * @throws BadRequest if incorrect param was provided
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT paper.paper_id, title, award, abstract, track.name, track.short_name FROM paper JOIN track ON paper.track_id=track.track_id";
        $params = array();

        // Check if correct params were provided
        $this->checkAvailableParams($this->getAvailableParams());

        // Check for specific params clashes and connections
        if (filter_has_var(INPUT_GET, 'track') and filter_has_var(INPUT_GET, 'author_id')) {
            throw new BadRequest("Parameters track and author_id cannot be used together.");
        }

        // Modify the sqlCommand according to provided params
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
     * Override parent method to return arguments correct for Papers endpoint.
     * 
     * @return array array of available params
     */
    protected function getAvailableParams()
    {
        return ['track', 'author_id'];
    }
}
