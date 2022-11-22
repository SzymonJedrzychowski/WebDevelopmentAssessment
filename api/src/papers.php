<?php

/**
 * Papers class
 *
 * Responsible for handling /api/papers endpoint.
 * 
 * @author Szymon Jedrzychowski
 */
class Papers extends Endpoint
{
    protected function initialiseSQL()
    {
        $sql = "SELECT paper.paper_id, title, award, abstract, track.name, track.short_name FROM paper JOIN track ON paper.track_id=track.track_id";
        $params = array();

        $this->checkAvailableParams($this->getAvailableParams());

        if (filter_has_var(INPUT_GET, 'track') and filter_has_var(INPUT_GET, 'author_id')) {
            throw new BadRequest("Parameters track and author_id cannot be used together.");
        }

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

    protected function getAvailableParams()
    {
        return ['track', 'author_id'];
    }
}
