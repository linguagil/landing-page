<?php

date_default_timezone_set('America/Recife');

$filename = '../jsons/' . md5(date('Y-m-d-G-i-s.U')) . '.json';
$stringReturn = '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><p>Ops! Ocorreu um erro ao cadastrar seu email. Tente novamente mais tarde =).</p></div>';
if ( (isset($_POST['nome']) && !empty($_POST['nome'])) && (isset($_POST['email']) && !empty($_POST['email'])) ) {
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $hora = date('r');

  $arr = array (
    'nome' => $nome,
    'email' => $email,
    'hora' => $hora
  );
  $json = json_encode($arr);

  $fh = fopen($filename,'w+');
  fwrite($fh, $json);
  fclose($fh);

  $stringReturn = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button><p>Obrigado! Em breve você receberá nossas novidades.</p></div>';
}
die($stringReturn);
