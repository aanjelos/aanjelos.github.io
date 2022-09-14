<?php
require_once('geoplugin.class.php');
$geoplugin = new geoPlugin();
$geoplugin->locate();
// create a variable for the country code
$var_country_code = $geoplugin->countryCode;
// redirect based on country code:
if ($var_country_code == "AU") {
header('Location: https://shift.ink/au/index');
}
//else if ($var_country_code == "ZZ") {
//header('Location: http://nl.wikipedia.org/');
//}
else {
header('Location: https://shift.ink/index');
}
?>
