<?php
$recepient = "palladium-00@mail.ru";


$name = trim($_POST["name"]);
$phone  = trim($_POST["phone"]);
$email  = trim($_POST["mail"]);

$message = "Имя: $name \nТелефон: $phone \nЭлектронная почта: $email";

$pagetitle = "Заявка с сайта deepsees-ekb.ru";

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");