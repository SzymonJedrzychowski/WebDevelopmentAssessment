<?php

/**
 * Responsible for handling /authenticate endpoint.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
class Authenticate extends Endpoint
{
    /**
     * Authenticate endpoint requires different __construct method.
     * 
     * @throws ClientErrorException if auth parameters are not provided or do not correspond to any account in database 
     */
    public function __construct()
    {
        // Connect to the database.
        $db = new Database("db/chiplay.sqlite");

        // Check if correct request method was used.
        $this->validateRequestMethod("POST");

        // Check if authentication parameters are provided.
        $this->validateAuthParameters();

        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQLCommand(), $this->getSQLParams());

        // Check if credentials correspond to account in database.
        $this->validateCredentials($queryResult);

        $this->setData(array(
            "length" => count($queryResult),
            "message" => "Success",
            "data" => $queryResult
        ));
    }

    /**
     * Override parent method to get the accounts data.
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT account_id, name, username, password FROM account WHERE username = :username";
        $this->setSQLCommand($sql);
        $this->setSQLParams(['username' => $_SERVER['PHP_AUTH_USER']]);
    }

    /**
     * Validate if auth parameters are provided.
     * 
     * @throws ClientErrorException if username and password were not provided
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException("Parameters username and password should be provided.", 401);
        }
    }

    /**
     * Validate if auth parameters correspond to account in database.
     * 
     * @param array $data - data from select querry from database
     * 
     * @throws ClientErrorException if username and password do not correspond to any account in database
     */
    private function validateCredentials($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException("Incorrect credentials.", 401);
        } elseif (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException("Incorrect credentials.", 401);
        }
    }
}
