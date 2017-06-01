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
	'db.masteraccounts' => 'skeleton\\Repositories\\MasteraccountRepository',
	'db.subaccounts' => 'skeleton\\Repositories\\SubAccountRepository',
	'db.tasks' => 'skeleton\\Repositories\\TaskRepository',
	'db.Favorite_Parks_MasterAccount' => 'skeleton\\Repositories\\FavPlaygroundRepository',
	'db.playgrounds_has_subaccounts'  => 'skeleton\\Repositories\\SubaccPlaygroundRepository',
	'db.achievements' => 'skeleton\\Repositories\\AchievementRepository',
	'db.achievements_has_subaccounts' => 'skeleton\\Repositories\\AchievementSubaccRepository',

	'db.examples' => 'skeleton\\Repositories\\ExampleRepository'
);
