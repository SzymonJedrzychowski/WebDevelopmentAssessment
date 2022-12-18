<?php

/**
 * Responsible for handling /authors endpoint.
 *
 * This class reads and validates received parameters and returns the data of authors from the database.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Authors extends Endpoint
{
    /**
     * Override parent method to get prepare SQL command and variables to get the authors data from database.
     *
     * @throws BadRequest If incorrect request method was used or incorrect parameter was provided.
     */
    protected function initialiseSQL()
    {
        // Check if correct request method was used.
        $this->validateRequestMethod("GET");

        // Create SQL command to get authors data.
        $sql = "SELECT author_id, first_name, middle_initial, last_name FROM author";
        $params = array();

        // Check if correct params were provided.
        $this->checkAvailableParams($this->getAvailableParams());

        // Check for specific params clashes and connections.
        if (filter_has_var(INPUT_GET, 'affiliation')
            and !filter_has_var(INPUT_GET, 'paper_id')
        ) {
            throw new BadRequest("Parameter affiliation cannot be used without parameter paper_id.");
        } elseif (filter_has_var(INPUT_GET, 'author_id')
            and (filter_has_var(INPUT_GET, 'affiliation')
                or filter_has_var(INPUT_GET, 'paper_id')
            )
        ) {
            throw new BadRequest("Parameter author_id cannot be used with parameters affiliation or paper_id");
        }

        // Modify the sqlCommand according to provided params.
        if (filter_has_var(INPUT_GET, 'author_id')) {
            $sql .= " WHERE author_id = :author_id";
            $params[':author_id'] = $_GET['author_id'];
        } elseif (filter_has_var(INPUT_GET, 'paper_id')
            and filter_has_var(INPUT_GET, 'affiliation')
        ) {
            $sql = "SELECT author_id, first_name, middle_initial, last_name, affiliation.country, affiliation.state,
                affiliation.city, affiliation.institution, affiliation.department
                FROM author
                JOIN paper_has_author ON paper_has_author.authorId = author.author_id
                JOIN paper ON paper_has_author.paper_id = paper.paper_id
                JOIN affiliation on affiliation.person_id = author.author_id and paper.paper_id = affiliation.paper_id
                WHERE paper.paper_id = :paper_id";
            $params[':paper_id'] = $_GET['paper_id'];
        } elseif (filter_has_var(INPUT_GET, 'paper_id')) {
            $sql .= " JOIN paper_has_author ON paper_has_author.authorId = author.author_id
                JOIN paper ON paper_has_author.paper_id = paper.paper_id
                WHERE paper.paper_id = :paper_id";
            $params[':paper_id'] = $_GET['paper_id'];
        }

        $this->setSQLCommand($sql);
        $this->setSQLParams($params);
    }

    /**
     * Set the array of available parameters for /authors endpoint.
     *
     * @return string[] Array of available params.
     */
    protected function getAvailableParams()
    {
        return ['author_id', 'paper_id', 'affiliation'];
    }
}
