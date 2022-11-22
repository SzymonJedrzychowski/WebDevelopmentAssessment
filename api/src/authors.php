<?php

/**
 * Authours class
 *
 * Responsible for handling /api/authors endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Authors extends Endpoint
{
    protected function initialiseSQL()
    {
        $sql = "SELECT author_id, first_name, middle_initial, last_name FROM author";
        $params = array();

        $this->checkAvailableParams($this->getAvailableParams());

        if (filter_has_var(INPUT_GET, 'affiliation') and !filter_has_var(INPUT_GET, 'paper_id')) {
            throw new BadRequest("Parameter affiliation cannot be used without parameter paper_id.");
        } elseif (filter_has_var(INPUT_GET, 'author_id') and (filter_has_var(INPUT_GET, 'affiliation') or filter_has_var(INPUT_GET, 'paper_id'))) {
            throw new BadRequest("Parameter author_id cannot be used with parameters affiliation or paper_id");
        }

        if (filter_has_var(INPUT_GET, 'author_id')) {
            $sql .= " WHERE author_id = :author_id";
            $params[':author_id'] = $_GET['author_id'];
        } elseif (filter_has_var(INPUT_GET, 'paper_id') and filter_has_var(INPUT_GET, 'affiliation')) {
            $sql = "SELECT DISTINCT author_id, first_name, middle_initial, last_name, affiliation.country, affiliation.state, affiliation.city, affiliation.institution, affiliation.department
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

    protected function getAvailableParams()
    {
        return ['author_id', 'paper_id', 'affiliation'];
    }
}
