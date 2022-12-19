<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * Responsible for handling /verify endpoint.
 *
 * This class is responsible for checking if the token is still valid and returning name of current user.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Verify extends Endpoint
{

    /**
     * @var array $decoded Array containing data from JWT.
     */
    protected $decoded;
    /**
     * @var int $accountId value of account_id column for current user.
     */
    protected $accountId;

    /**
     * Override the __construct method to match the requirements of the /verify endpoint.
     *
     * @throws BadRequest           If request method is incorrect.
     * @throws ClientErrorException If token format is wrong, decoding of token threw an Exception
     *                              or issuer does not agree with the host.
     */
    public function __construct()
    {
        // Connect to the database.
        $db = new Database("db/chiplay.sqlite");

        // Check if correct request method was used.
        $this->validateRequestMethod("POST");

        // Validate the JWT.
        $this->validateToken();

        // Set the accountId based on the JWT.
        $this->setAccountId($this->getDecoded()->sub);

        // Initialise the SQL command and parameters and get the data from the database.
        $this->initialiseSQL();
        $data = $db->executeSQL($this->getSQLCommand(), $this->getSQLParams());

        $this->setData(array(
            "length" => 0,
            "message" => "Success",
            "data" => $data
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
            $this->setDecoded(JWT::decode($jwt, new Key($key, 'HS256')));
        } catch (Exception $e) {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if ($this->getDecoded()->iss != $_SERVER['HTTP_HOST']) {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }

    /**
     * Set SQL command to get the name of current user from database.
     */
    protected function initialiseSQL()
    {
        // Create SQL command to get name of the user.
        $sql = "SELECT name FROM account WHERE account_id = :account_id";
        $this->setSQLCommand($sql);
        $this->setSQLParams(['account_id' => $this->getAccountId()]);
    }

    /**
     * Getter for $decoded.
     *
     * @return array Data read from token.
     */
    public function getDecoded()
    {
        return $this->decoded;
    }

    /**
     * Setter for $decoded.
     *
     * @param array $decoded Data read from token.
     */
    public function setDecoded($decoded)
    {
        $this->decoded = $decoded;
    }

    /**
     * Getter for $accountId.
     *
     * @return int AccountId of current user.
     */
    public function getAccountId()
    {
        return $this->accountId;
    }

    /**
     * Setter for $accountId.
     *
     * @param int $accountId AccountId of current user.
     */
    public function setAccountId($accountId)
    {
        $this->accountId = $accountId;
    }
}
