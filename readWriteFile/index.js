const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
const url = require('url');
const { parse } = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on("writeOnFile", writeOnFile);
    const parseUrl = url.parse(req.url, true);
    const splitedUrl =  req.url.split("?")
    if(splitedUrl[0] == "/write"){
        fs.readFile("./file1.txt","utf8",(err, data)=>{
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            eventEmitter.emit("writeOnFile", data);
        })
        res.end('file writing completed\n');
    }
    if(splitedUrl[0] == "/postWrite"){
        const parameters = parseUrl.query;
        console.log(parameters, "====parameters===")
        eventEmitter.emit("writeOnFile", parameters.txt);
        res.end('file writing completed\n');
    }
    
    function writeOnFile(data){
        
            fs.writeFile("./file2.txt", data, (err)=>{
                console.log("writen successfully");
                
            })

    }
});
server.listen(PORT);