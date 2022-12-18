<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * Responsible for handling /verify endpoint.
 *
 * This class is responsible for checking the token and if it is still valid.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Verify extends Endpoint
{

    /**
     * Override the __construct method to match the requirements of the /verify endpoint.
     *
     * @throws BadRequest           If request method is incorrect.
     * @throws ClientErrorException If token format is wrong, decoding of token threw an Exception
     *                              or issuer does not agree with the host.
     */
    public function __construct()
    {
        // Check if correct request method was used.
        $this->validateRequestMethod("POST");

        // Validate the JWT.
        $this->validateToken();

        $this->setData(array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }


    /**
     * Check if the token is valid.
     *
     * @throws ClientErrorException If token format is wrong, decoding of token threw an Exception
     *                              or issuer does not agree with the host.
     */
    protected function validateToken()
    {
        $key = SECRET;

        $allHeaders = getallheaders();
        $authorizationHeader = "";

        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }

        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientErrorException("Bearer token required", 401);
        }

        $jwt = trim(substr($authorizationHeader, 7));

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        } catch (Exception $e) {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if ($decoded->iss != $_SERVER['HTTP_HOST']) {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }
}
