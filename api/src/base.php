<?php

/**
 * Responsible for handling / (base) endpoint.
 * 
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
        // Student data array
        $student = array(
            "first_name" => "Szymon",
            "last_name" => "Jedrzychowski",
            "id" => "w20020581"
        );

        // Module information array
        $module = array(
            "code" => "KF6012",
            "name" => "Web Application Integration",
        );

        // Data array
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
