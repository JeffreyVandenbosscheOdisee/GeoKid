<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class SubAccountController implements ControllerProviderInterface {
	
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
			->get('/', array($this, 'getSubAccounts'))
			->assert('masteraccId','\d+');

		$controllers
			->post('/create', array($this, 'createSubAccount'))
			->assert('masteraccId','\d+');

		$controllers
			->get('/{id}', array($this, 'getSubAccount'))
			->assert('masteraccId','\d+')
			->assert('id','\d+');

		$controllers
			->post('/{id}/change', array($this, 'changeSubAccount'))
			->assert('masteraccId','\d+')
			->assert('id','\d+');

		$controllers
			->match('/{id}/delete', array($this, 'deletesubAccount'))
			->method('GET|POST')
			->assert('masteraccId','\d+')
			->assert('id','\d+');


		return $controllers;
	}

	public function getSubAccounts(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$user = $app['db.masteraccounts']->findMasteraccountOnId($masteraccId);
		if($user != false){
			$subaccounts = $app['db.subaccounts']->findAllSubAccounts($masteraccId);
			return new JsonResponse($subaccounts);
		}
		return new JsonResponse(null);
		
	}

	public function createSubAccount(Request $request, Application $app) 
	{
		$masteraccId = $request->get('masteraccId');

		$name = $request->get('name');

		$user = $app['db.masteraccounts']->findMasteraccountOnId($masteraccId);
		if($user != false){
			$data['Name']= $name;
			$data['MasterAccounts_Id']= $masteraccId;
			$subaccount = $app['db.subaccounts']->insert($data);
			return new JsonResponse($subaccount);
		}
		return new JsonResponse(null);
		
	}

	public function getSubAccount(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$subaccId = $request->get('id');

		$subaccount = $app['db.subaccounts']->findSubAccount($masteraccId, $subaccId);
		if($subaccount != false){
			return new JsonResponse($subaccount);
		}
		return new JsonResponse(null);
		
	}

	public function changeSubAccount(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$subaccId = $request->get('id');
		$name = $request->get('name');

		$subaccount = $app['db.subaccounts']->findSubAccount($masteraccId, $subaccId);
		$subaccount['Name'] = $name;

		$data = $app['db.subaccounts']->update($subaccount, array('id' => $subaccId));
		return new JsonResponse($data);
	}

	public function deletesubAccount(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$subaccId = $request->get('id');

		$subaccount = $app['db.subaccounts']->findSubAccount($masteraccId, $subaccId);

		$data = $app['db.subaccounts']->delete( array('id' => $subaccId));
		return new JsonResponse($data);
	}
}