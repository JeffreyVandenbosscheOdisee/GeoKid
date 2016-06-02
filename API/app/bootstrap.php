<?php

// Require Composer Autoloader
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

// Create new Silex App
$app = new Silex\Application();

// Set debug
$app['debug'] = $config['debug'];

// Doctrine setup
// @note: Install Doctrine via Composer first!
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
	'db.options' => array(
		'dbname' => $config['db.dbname'],
    	'user' => $config['db.user'],
    	'password' => $config['db.password'],
    	'host' => $config['db.host'],
    	'driver' => 'pdo_mysql',
    	'charset' => 'utf8mb4'
	)
));

// Repository Service Provider Setup
// @note: Install KNP RSP via Composer first!
$app->register(new Knp\Provider\RepositoryServiceProvider(), array(
	'repository.repositories' => $config['repositories']
	)
);

$app['photoSubaccount.base_path'] = __DIR__ . DIRECTORY_SEPARATOR . '../public_html/assets/public/img/subaccounts';
$app['photoSubaccount.base_url'] = '/assets/public/img/subaccounts';
$app['photoPlayground.base_path'] = __DIR__ . DIRECTORY_SEPARATOR . '../public_html/assets/public/img/playgrounds';
$app['photoPlayground.base_url'] = '/assets/public/img/playgrounds';

$app['achievements.base_path'] = __DIR__ . DIRECTORY_SEPARATOR . '../public_html/assets/public/img/achievements';
$app['achievements.base_url'] = '/assets/public/img/achievements';
