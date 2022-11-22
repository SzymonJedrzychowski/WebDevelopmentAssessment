<?php

/**
 * Class that is used as alternative exception.
 * 
 * This class is used to throw the exception
 * whenever incorrect param was provided for specific endpoint.
 * 
 * Base code written by
 * @author John Rooksby
 * Modified by
 * @author Szymon Jedrzychowski
 */
class BadRequest extends Exception
{

    /**
     * Method that sets the response code to 400 and returns error message
     * as output in array format the same as the Endpoint class $data variable
     * 
     * @return array error message in array format
     */
    public function badRequestMessage()
    {
        http_response_code(400);
        $output = array(
            "length" => 0,
            "message" => $this->message,
            "data" => []
        );
        return $output;
    }
}
