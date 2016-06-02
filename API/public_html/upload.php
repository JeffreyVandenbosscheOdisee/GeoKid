<?php
echo "fqfsdosfdsdmfufsd";
if(isset($_FILES['photo'])){
 
    if(!file_exists("upload")){
        mkdir("upload", 0777);
    }
 
    $filename = $_FILES['photo']['name'];
    // $description = $_POST['description'];
    move_uploaded_file($_FILES['photo']['tmp_name'], 'upload/'.$filename);
 
   
}else{
    echo "No File!";
}
?>