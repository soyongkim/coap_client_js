var http = require('http');
var shortid = require('shortid');

const options = {
    hostname: '155.230.105.148',
    port: '7599',
    path: '/GW-1F-101',
    method: 'GET',
    headers: {
        'X-M2M-RI': shortid.generate(),
        'Accept': `application/json`,
        'X-M2M-Origin': '<origin>',
        'Locale': 'en'
    }
};


let res_body = [];
const req = http.request(options, (res) => {
    res.on('data', (chunk) => res_body.push(chunk));

    res.on('end', () => {
        res_body = Buffer.concat(res_body).toString();
        const json_body = JSON.parse(res_body);

        console.log(res_body);
    });
});

req.on('error', (e) => {
    return reject(e);
});

//console.log(path);

req.write('');
req.end();