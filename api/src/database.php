<?php

/**
 * Class responsible for connecting to database and fetching the data.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Database
{
    /**
     * @var PDO $dbConnection Connection with database.
     */
    private $dbConnection;

    /**
     * __construct method that prepares the name of database and connects to it.
     *
     * @param string $dbName Path to the database file.
     */
    public function __construct($dbName)
    {
        // Prepare the database location and name.
        $dbName = str_replace("\\", DIRECTORY_SEPARATOR, $dbName);

        // Connect to the database.
        $this->setDbConnection($dbName);
    }

    /**
     * Method responsible for connecting to the database.
     *
     * @param string $dbName Database location and name.
     */
    private function setDbConnection($dbName)
    {
        $this->dbConnection = new PDO('sqlite:' . $dbName);
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Method responsible for executing the SQL query and fetching data.
     *
     * @param string    $sql    SQL command.
     * @param array     $params Parameters for the SQL query.
     *
     * @return array Data fetched from the database.
     */
    public function executeSQL($sql, $params)
    {
        // Prepare the SQL query and then execute it.
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        // Return the fetched data.
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
