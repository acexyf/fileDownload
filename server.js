const express = require('express');
const path = require('path');
const fs = require('fs');
const getIPAdress = require('./build/getIPAdress');
const port = 8096;
const app = express();
const ipaddress = getIPAdress();
const rootPath = './downLoadFolder'


let getFileType = (isDir,fileName) => {
    if(isDir){
        return 'folder'
    } else {
        let tempIndex = fileName.lastIndexOf('.')
        return fileName.substr(tempIndex+1)
    }
}

app.use('/dist',express.static(path.resolve(__dirname,'./dist/')));

app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.get('/api/getFileList', function(req,res){

    console.log(req.query)
    const { path } = req.query;

    if(!path){
        return  res.json({
            status: '0001',
            msg: 'error',
            data: []
        })
    }
        
    let dirs = [];
    try {
        dirs = fs.readdirSync(`${rootPath}${path}`)
    } catch (error) {
        
    }

    let fileList = [];
    dirs.map((elem, index) => {

        let tempStat = fs.statSync(`${rootPath}${path}${elem}`);

        fileList.push({
            fileName: elem,
            type: getFileType(tempStat.isDirectory(),elem),
            isDir: tempStat.isDirectory(),
        })
    })

    return  res.json({
        status: '0000',
        msg: 'ok',
        data: fileList
    })
})

app.get('/api/download', function(req,res){
    console.log(req.params)

    res.download(`${rootPath}/ceshi.jpg`, 'ceshi.jpg')

    // let filePath = `${rootPath}/ceshi.jpg`;
    // res.setHeader('Content-disposition', 'attachment; filename=ceshi.jpg');
    // res.setHeader('Content-type', 'video/quicktime');
    // var filestream = fs.createReadStream(filePath);
    // filestream.pipe(res);


})

let server = app.listen(port, function(){
    if (ipaddress) {
        console.log('please open ' + ipaddress + ':' + port + ' in browser');
    } else {
        console.log('no networking, please open ' + ipaddress + ':' + port + ' in browser')
    }
})