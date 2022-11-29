<?php

/**
 * Class that is used as alternative exception.
 * 
 * This class is used to throw the exception
 * whenever incorrect param was provided for specific endpoint.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
class BadRequest extends Exception
{
    /**
     * Override the Exception constructor to always set code to 400 by default.
     * 
     * @param string $message - a message explaining the error
     * @param int $code - the relevant http status code (value 400 by default)
     */
    public function __construct($message, $code = 400)
    {
        parent::__construct($message, $code);
    }
}
