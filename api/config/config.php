<?php

/**
 * Load the configuration for the api.
 * 
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'exceptionhandler.php';
set_exception_handler('exceptionHandler');

include 'errorhandler.php';
set_error_handler('errorHandler');

include 'autoloader.php';
spl_autoload_register('autoloader');
