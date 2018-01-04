const fs = require('fs');

const rootPath = './downLoadFolder'

let getFileType = (isDir,fileName) => {
    if(isDir){
        return 'folder'
    } else {
        let tempIndex = fileName.lastIndexOf('.')
        return fileName.substr(tempIndex+1)
    }
}


let dirs = []

try {
    dirs = fs.readdirSync(`${rootPath}/`);
} catch (error) {
    
}


let fileList = [];
dirs.map((elem, index) => {
    
    let tempStat = fs.statSync(`${rootPath}/${elem}`)
    dirs.map((elem, index) => {
        let tempStat = fs.statSync(`${rootPath}/${elem}`);
        fileList.push({
            fileName: elem,
            type: getFileType(tempStat.isDirectory(),elem)
        })
    })
})

console.log(fileList)

