var request = require('request');

request({
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'key=AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw'
    },
    uri: 'https://jmt17.google.com/gcm/demo-webpush-00/APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
    body: 'asfdasefasg'

}, function (err, resService, resBody) {
    console.log(err, resBody)
});