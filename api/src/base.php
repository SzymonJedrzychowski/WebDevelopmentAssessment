<?php

/**
 * Responsible for handling / (base) endpoint.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
class Base extends Endpoint
{
    /**
     * Override the __construct method of parent as base endpoint
     * contains fixed data and does not require connection to the database.
     */
    public function __construct()
    {
        $student = array(
            "first_name" => "Szymon",
            "last_name" => "Jedrzychowski",
            "id" => "w20020581"
        );

        $module = array(
            "code" => "KF6012",
            "name" => "Web Application Integration",
        );

        $data = array(
            "student" => $student,
            "module" => $module,
            "documentation" => "http://unn-w20020581.newnumyspace.co.uk/assessment/api/documentation/",
            "conference_name" => "CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play"
        );

        $this->setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }
}
