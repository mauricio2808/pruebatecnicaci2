<?php

require_once 'vendor/autoload.php';

$app = new \Slim\Slim();

$db = new mysqli('localhost', 'root', '', 'prueba_ci2');

// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


// LISTAR TODASS LAS TAREAS
	$app->get('/tareas', function() use($db, $app){
	$sql = 'SELECT * FROM tareas ORDER BY id DESC;';
	$query = $db->query($sql);

	$tareas = array();
	while ($tarea = $query->fetch_assoc()) {
		$tareas[] = $tarea;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $tareas
		);

	echo json_encode($result);
});

// DEVOLVER UNA SOLA TAREA
$app->get('/tarea/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM tareas WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'la tarea no está disponible disponible'
	);

	if($query->num_rows == 1){
		$tarea = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $tarea
		);
	}

	echo json_encode($result);
});

// ELIMINAR UNA TAREA
$app->get('/delete-tarea/:id', function($id) use($db, $app){
	$sql = 'DELETE FROM tareas WHERE id = '.$id;
	$query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'La tarea se ha eliminado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'La tarea no se ha eliminado!!'
		);
	}

	echo json_encode($result);
});

// ACTUALIZAR UNA TAREA
$app->post('/update-tarea/:id', function($id) use($db, $app){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

	$sql = "UPDATE tareas SET ".
		   "nombre = '{$data["nombre"]}', ".
		   "descripcion = '{$data["descripcion"]}', ";

	if(isset($data['imagen'])){
 		$sql .= "imagen = '{$data["imagen"]}', ";
	}

	$sql .=	"fecha = '{$data["fecha"]}' WHERE id = {$id}";


	$query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'La tarea se ha actualizado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'La tarea no se ha actualizado!!'
		);
	}

	echo json_encode($result);

});

// SUBIR UN ARCHIVO EN UNA TAREA
$app->post('/upload-file', function() use($db, $app){
	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'La imagen no ha podido subirse'
	);

	if(isset($_FILES['uploads'])){
		$piramideUploader = new PiramideUploader();

		$upload = $piramideUploader->upload('image', "uploads", "uploads",
		 array('image/jpeg', 'image/png', 'image/gif'));
		$file = $piramideUploader->getInfoFile();
		$file_name = $file['complete_name'];

		if(isset($upload) && $upload["uploaded"] == false){
			$result = array(
				'status' 	=> 'error',
				'code'		=> 404,
				'message' 	=> 'El archivo no ha podido subirse'
			);
		}else{
			$result = array(
				'status' 	=> 'success',
				'code'		=> 200,
				'message' 	=> 'El archivo se ha subido',
				'filename'  => $file_name
			);
		}
	}

	echo json_encode($result);
});

// GUARDAR TAREAS
$app->post('/tareas', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);


	if(!isset($data['nombre'])){	
		$data['nombre']=null;
	}

	if(!isset($data['descripcion'])){
		$data['descripcion']=null;
	}

	if(!isset($data['fecha'])){
		$data['fecha']=null;
	}

	if(!isset($data['imagen'])){
		$data['imagen']=null;
	}

	$query = "INSERT INTO tareas VALUES(NULL,".
			 "'{$data['nombre']}',".
			 "'{$data['descripcion']}',".
			 "'{$data['fecha']}',".
			 "'{$data['imagen']}'".
			 ");";

	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'La tarea NO se ha creado'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'La tarea se ha creado correctamente'
		);
	}

	echo json_encode($result);
});


// METODO PARA EL BUSCADOR
 
$app->get('/searchp/:name', function($name) use($app, $db){
    
    $sql    = 'SELECT * FROM tareas WHERE id LIKE "%'.$name.'%";';
    
    $query  = $db->query($sql);
 
    if($query->num_rows >= 1){
 
        $tareas = array();
        while($tarea = $query->fetch_assoc()){
            $tareas[] = $tarea;
        }
    
        $result = array(
            'status' => 'success',
            'code'   => 200,
            'data'   => $tareas
        );
 
 
    }else{
 
        $result = array(
            'status' => 'error',
            'code'   => 400,
            'data'   => 'No se encontro resultado'
        );  
 
    }
 
    echo json_encode($result);
    
    
});


$app->run();

