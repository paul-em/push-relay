<?php
$url = 'http://localhost:4000';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_exec($curl);
    $status = curl_getinfo($curl)['http_code'];
    curl_close($curl);
    if($status !== 200){
        http_response_code(503);
        echo 'Service unavailable';
    } else {
        http_response_code(200);
        echo $status;
    }
} else {
    http_response_code(501);
    echo 'Not implemented';
}
?>
