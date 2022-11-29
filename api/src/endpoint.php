<?php

/**
 * Endpoint class
 * 
 * Endpoint class is responsible for handling all endpoints of the api.
 * Other endpoints extend this class.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */

abstract class Endpoint
{
    private $sqlCommand;
    private $sqlParams;
    private $data;

    /**
     * During construction of the object, it connects to database,
     * creates and executes the sqlCommand and modifies the data array.
     * 
     * @throws BadRequest if incorrect param was provided or wrong request method was used
     */
    public function __construct()
    {
        // Connect to the database.
        $db = new Database("db/chiplay.sqlite");

        // Update $sqlCommand and $sqlParams.
        $this->initialiseSQL();

        // Execute the $sqlCommand.
        $data = $db->executeSQL($this->sqlCommand, $this->sqlParams);

        // Modify the data to array format.
        $this->setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }

    /**
     * Initialise the $sqlCommand and $sqlParams variables.
     */
    protected function initialiseSQL()
    {
        $this->setSQLCommand("");
        $this->setSQLParams([]);
    }

    /**
     * Validate if request method is allowed for specific endpoint.
     * 
     * @param string $method - method allowed for the endpoint
     * 
     * @throws BadRequest if wrong request method was used
     */
    protected function validateRequestMethod($method)
    {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new BadRequest("Incorrect request method for the endpoint.", 405);
        }
    }

    /**
     * Return params that are available for specific endpoint.
     * 
     * @return array array of available params
     */
    protected function getAvailableParams()
    {
        return [];
    }

    /**
     * Check if correct params were provided for specific endpoint.
     * 
     * @throws BadRequest if incorrect param was provided
     */
    protected function checkAvailableParams($availableParams)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $availableParams)) {
                throw new BadRequest("Invalid parameter " . $key);
            }
        }
    }

    /**
     * Setter method for $data.
     * 
     * @param array $array - array with data in specified format 
     */
    protected function setData($array)
    {
        $this->data = $array;
    }

    /**
     * Getter method for $data.
     * 
     * @return array $data - array with endpoint data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Setter method for $sqlCommand.
     * 
     * @param string $sqlCommand - SQL command that is to be executed
     */
    protected function setSQLCommand($sqlCommand)
    {
        $this->sqlCommand = $sqlCommand;
    }

    /**
     * Getter method for $sqlCommand.
     * 
     * @return string $sqlCommand - string with command to be executed
     */
    protected function getSQLCommand()
    {
        return $this->sqlCommand;
    }

    /**
     * Setter method for $sqlParams.
     * 
     * @param array $params - array of params for SQL command
     */
    protected function setSQLParams($params)
    {
        $this->sqlParams = $params;
    }

    /**
     * Getter method for $sqlCommand.
     * 
     * @return array $sqlParams - array with params for SQL command
     */
    protected function getSQLParams()
    {
        return $this->sqlParams;
    }
}
