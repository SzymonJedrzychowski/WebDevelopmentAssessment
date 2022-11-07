<?php

/**
 * BadRequest class
 *
 * Class that is used as alternative exception.
 * 
 * @author John Rooksby
 */
class BadRequest extends Exception{
    
    /**
     * badRequestMessage method
     * 
     * Function that sets the response code to 400 and returns error message as output
     * 
     * @return string error message
     */
    public function badRequestMessage(){
        http_response_code(400);
        $output["message"] = $this->message;
        return $output;
    }
}
