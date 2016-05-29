<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class AccountController implements ControllerProviderInterface {
	
	/**
	 * Returns routes to connect to the given application.
	 * @param Application $app 			An Application instance
	 * @return ControllerCollection 	A ControllerCollection instance
	 */
	public function connect(Application $app) 
	{
		// Create new ControllerCollection
		$controllers = $app['controllers_factory'];

		// Example routes
		$controllers
			->get('/', array($this, 'getMasterAccount'))
			->assert('masteraccId','\d+');

		$controllers
			->post('/changepwd', array($this, 'changePwdMasterAccount'))
			->assert('masteraccId','\d+');


		return $controllers;
	}

	/**
	 * Returns the action's response
	 * @param  Application 	$app 	An Application instance
	 * @return string           	A html string rendered by twig
	 */
	public function getMasterAccount(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$user = $app['db.masteraccounts']->findMasteraccountOnId($masteraccId);
		unset($user['Password']);
		return new JsonResponse($user);
	}

	public function changePwdMasterAccount(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$password = $request->get('password');
		$user = $app['db.masteraccounts']->findMasteraccountOnId($masteraccId);
		
		$user['Password'] = password_hash($request->get('password'),PASSWORD_DEFAULT);

		$data = $app['db.masteraccounts']->update($user, array('id' => $masteraccId));
		return new JsonResponse($data);
	}

}