<?php
	
    $servername = "localhost";
	$username = "root";
	$password = "";

	$dbname = "geokid";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}
	$jsondata = file_get_contents('playgrounds.json');

    $data = json_decode($jsondata, true);

    foreach ($data["playgrounds"] as $playground) {
	    $name =  utf8_decode(($playground['name']));
	    // var_dump($name);
	    $functions = $playground['functions'];
	    $lat = $playground['latitude'];
	    $long = $playground['longitude'];
	    $sql = "INSERT INTO playfields( Name, Longitude, Latitude)
		VALUES('$name', '$long', '$lat')";
	    if (!mysqli_query($conn, $sql)) {
		    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		$playgroundId = $conn->insert_id;
	    // var_dump($functions);
	    foreach($functions as $function){
	    	$id;
	    	var_dump($function);
	    	if($function != ''){
    			switch ($function) {
				    case "petanque":
				        $id = 1;
				        break;
				    case "skate":
				        $id = 2;
				        break;
				    case "zandbak":
				        $id = 3;
				        break;
				    case "voetbal":
				        $id = 4;
				        break;
				    case "speeltoestellen":
				        $id = 5;
				        break;
				    case "avontuurlijk spelen":
				        $id = 6;
				        break;
				    case "basketbal":
				        $id = 7;
				        break;
				    default:
				        // code to be executed if n is different from all labels;
				}
			

				$sql2 = "INSERT INTO Functions_has_Playfields( Functions_Id, Playfields_Id)
				VALUES('$id','$playgroundId')";
			    if (!mysqli_query($conn, $sql2)) {
				    echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
				}
	    	}
	  
	    }

		

	}
	
	
	mysqli_close($conn);

?>