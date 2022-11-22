<?php

/**
 * Class responsible for connecting to database and fetching the data.
 * 
 * Code base written by
 * @author John Rooksby
 * Modified by
 * @author Szymon Jedrzychowski
 */
class Database{
    private $dbConnection;

    /**
     * Method responsible for preparing the name of the database.
     * 
     * @param string $dbName path of the database file
     */
    public function __construct($dbName){
        $dbName = str_replace("\\", DIRECTORY_SEPARATOR, $dbName);
        $this->setDbConnection($dbName);
    }

    /**
     * Method responsible for connecting to database.
     * 
     * @param string $dbName prepared path of the database file
     */
    private function setDbConnection($dbName){
        $this->dbConnection = new PDO('sqlite:' . $dbName);
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Method responsible for executing the SQL querry and fetching data.
     * 
     * @param string $sql SQL querry
     * @param array $params array of params for SQL querry
     * 
     * @return array data fetched from database 
     */
    public function executeSQL($sql, $params = []){
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
