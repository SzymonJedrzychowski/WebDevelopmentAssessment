<?php

/**
 * Endpoint for handling incorrect endpoint calls (wrong parameters, paths etc.).
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
class ClientError extends Endpoint
{
    /**
     * Override constructor as database connection is not needed.
     * 
     * @param string $message - a message explaining the error
     * @param int $code - the relevant http status code
     */
    public function __construct($message = "", $code = 400)
    {
        // Set the relevant response code.
        http_response_code($code);

        $this->setData(array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}
