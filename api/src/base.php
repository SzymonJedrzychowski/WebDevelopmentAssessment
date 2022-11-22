<?php

class Base extends Endpoint
{
    public function __construct()
    {
        $name = array(
            "first_name" => "Szymon",
            "last_name" => "Jedrzychowski",
        );
        $module = array(
            "code" => "KF6012",
            "name" => "Web Application Integration",
            "level" => 6,
        );
        $data = array(
            "name" => $name,
            "id" => "w20020581",
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
