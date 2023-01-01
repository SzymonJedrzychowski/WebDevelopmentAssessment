<?php

use FirebaseJWT\JWT;

/**
 * Responsible for handling /authenticate endpoint.
 *
 * This class reads and validates received parameters
 * and find if an account in database matches the credentials.
 * If yes, the JWT is returned.
 * Else, an Exception will be thrown.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Authenticate extends Endpoint
{
    /**
     * Override the __construct method to match the requirements of the /authenticate endpoint.
     *
     * @throws BadRequest               If request method is incorrect.
     * @throws ClientErrorException     If there are problems with login process.
     */
    public function __construct()
    {
        // Connect to the database.
        $db = new Database("db/chiplay.sqlite");

        // Check if correct request method was used.
        $this->validateRequestMethod("POST");

        // Check if authentication parameters are provided.
        $this->validateAuthParameters();

        // Initialise the SQL command and parameters and get the data from the database.
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQLCommand(), $this->getSQLParams());

        // Check if credentials correspond to account in database.
        $this->validateCredentials($queryResult);

        // Create the token and append it to data array.
        $data['token'] = $this->createJWT($queryResult);

        // Append the name of username to data array.
        $data['name'] = $queryResult[0]["name"];

        $this->setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }


    /**
     * Validate if auth parameters are provided.
     *
     * @throws ClientErrorException If parameters are not provided.
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException("Parameters username and password should be provided.", 401);
        }
    }

    /**
     * Set SQL command to get the user data from database.
     */
    protected function initialiseSQL()
    {
        // Create SQL command to get users data.
        $sql = "SELECT account_id, name, username, password FROM account WHERE username = :username";
        $this->setSQLCommand($sql);
        $this->setSQLParams(['username' => $_SERVER['PHP_AUTH_USER']]);
    }

    /**
     * Validate if auth parameters correspond to account in database.
     *
     * @param array $data Entry of username from database.
     *
     * @throws ClientErrorException If username and password do not correspond to accounts in the database.
     */
    private function validateCredentials($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException("Incorrect credentials.", 401);
        } elseif (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException("Incorrect credentials.", 401);
        }
    }

    /**
     * Create the JWT for authorized user.
     *
     * @param array $queryResult Entry of username from database.
     *
     * @return string JWT for authorized user.
     */
    private function createJWT($queryResult)
    {
        // Get the global secret key.
        $secretKey = SECRET;

        // Get the time for 'iat' and 'exp' claims.
        $time = time();

        // Set the claims for the token.
        $tokenPayload = [
            'iat' => $time,
            'exp' => strtotime('+60 minutes', $time),
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $queryResult[0]['account_id']
        ];

        // Encode the token.
        return JWT::encode($tokenPayload, $secretKey, 'HS256');
    }
}
