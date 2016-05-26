<?php

// Debug
$config['debug'] = false;

// API
$config['api.version'] = '1';
$config['api.prefix'] = 'api';

// Database Credentials
$config['db.dbname'] = 'geokid';
$config['db.user'] = 'root';
$config['db.password'] = '';
$config['db.host'] = 'localhost';

// Repositories
$config['repositories'] = array(
	'db.playgrounds' => 'skeleton\\Repositories\\PlaygroundRepository',
	'db.examples' => 'skeleton\\Repositories\\ExampleRepository'
);