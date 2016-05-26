<?php

// == Load production config
require __DIR__ . DIRECTORY_SEPARATOR . 'config.php';

// == Override values
// Debug
$config['debug'] = true;

// Database
$config['db.host'] = 'localhost';