<?php

date_default_timezone_set('America/Recife');

$filename = md5(date("Y-m-d-G-i-s.U")) . ".json";
if (isset( $_POST['nome']) && isset($_POST['email']) { 
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $hora = date("r");
  
  $arr = array ('nome' => $nome, 'email' => $email, 'hora' => $hora);
  $json = json_encode($arr);
  
  $fh = fopen($filename,'w+');
  fwrite($fh, $json);
  fclose($fh);
} 

http_redirect("obrigado.html");
