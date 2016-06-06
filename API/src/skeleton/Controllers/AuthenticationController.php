<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AuthenticationController implements ControllerProviderInterface {
	
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
			->post('/login/', array($this, 'login'));

		$controllers
			->match('/register/', array($this, 'register'))
			->method('GET|POST');

		return $controllers;
	}

	public function generateRandomString($length){
		$chars="AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn1234567890_-+-*/";
		$charlength = strlen($chars);
		$result ='';
		for($i=0; $i< $length; $i++){
			$result .= $chars[rand(0,$charlength -1)];
		}
		return $result;
	}

	/**
	 * Returns the action's response
	 * @param  Application 	$app 	An Application instance
	 * @return string           	A html string rendered by twig
	 */
	public function login(Application $app, Request $request) 
	{
		$email = $request->get('email');
		$password = $request->get('password');
		$user = $app['db.masteraccounts']->findMasteraccount($email);

		$login['succesLogin'] = false;
		if (password_verify($password, $user['Password'])) {

				$login['succesLogin'] = true;
				$login['MasteraccountId'] = $user['Id'];
				$login['AuthKey'] = $user['AuthKey'];		

		}
		return new JsonResponse($login);
		
	}

	public function register(Request $request, Application $app) 
	{
		$email = $request->get('email');
		$password = password_hash($request->get('password'),PASSWORD_DEFAULT);
		$familyname = $request->get('familyname');
		$streetnr = $request->get('streetnr');
		$zipcode = $request->get('zipcode');
		$city = $request->get('city');

		$user = $app['db.masteraccounts']->findMasteraccount($email);	
		if($user == false){
			$data['AuthKey'] = $this->generateRandomString(13);
			$data['Email']= $email;
			$data['Password']= $password;
			$data['FamilyName']= $familyname;
			$data['Street_And_Nr'] = $streetnr;
			$data['ZipCode'] = $zipcode;
			$data['City'] = $city;

			$userid = $app['db.masteraccounts']->insert($data);
			if($userid != null){
				$userData['Id'] = $userid;
				$userData['AuthKey'] = $data['AuthKey'];
				return new JsonResponse($userData);
			}
			else{
			return new JsonResponse(null);

			}
		}
		return new JsonResponse(false);
		
	}



}