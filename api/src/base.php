<?php

/**
 * Responsible for handling / (base) endpoint.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Base extends Endpoint
{
    /**
     * Override the __construct method to match the requirements of the / (base) endpoint.
     * 
     * @throws BadRequest If incorrect request method was used.
     */
    public function __construct()
    {
        // Check if correct request method was used.
        $this->validateRequestMethod("GET");
        
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
            "documentation" => "http://unn-w20020581.newnumyspace.co.uk/assessment/app/documentation",
            "conference_name" => "CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play"
        );

        $this->setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }
}
