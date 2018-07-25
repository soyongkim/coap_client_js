var coap = require("coap");

var options = {
    host: '155.230.105.148',
    port: 7599,
    pathname: "/GW-1F-101/CNT-GW-DATA",
    method: 'get',
    confirmable : 'true',
    options: {
        'Accept': 'application/json'
    }
}

var bodystring = '';
var responseBody = '';




var req = coap.request(options);
req.setOption("256", new Buffer("<origin>"));
req.setOption("257", new Buffer('123456-ri'));

req.on('response', function(res) {
    res.on('data', function() {
        responseBody += res.payload.toString();
    });
    res.on('end', function(){
        if(res.code == '2.05') {
            console.log('[coap] coap ready, request OK');
            var obj = JSON.parse(responseBody);
            var content = responseBody['m2m:cb'];
            console.log('[coap] responseBody\n', obj);
            //console.log('[coap] responseBody', responseBody);
        } else {
            console.log('[coap] coap res.code=' + res.code);
        }
    });
});
req.write(bodystring);
req.end();