var fs = require('fs')
//导入文件模块
//node ,读写文件 同步异步
// 示例 讲课
let { fsRead,writeFile,fsDelete } = require('../04fsdir/lcfs') //读写操作方法 公共类

let ReadList = async ()=>{
  var file2 = await fsRead('hello.txt')
  var file3 = await fsRead(`${file2}.txt`)
  var file3Content = await fsRead(`${file3}.txt`)
  console.log('file3Content',file3Content)
}
ReadList()

let writeList = async ()=>{
  await writeFile('lc.html',"<h1>1今天吃烧烤</h1>")
  await writeFile('lc.html',"<h1>2今天吃烧烤</h1>")
  await writeFile('lc.html',"<h1>3今天吃烧烤</h1>")
  await writeFile('lc.html',"<h1>4今天吃烧烤</h1>")
}
writeList()

let delList = (file)=>{
  fsDelete(file)
}
delList('lc.html')

//读取文件夹03fs下所有文件 写入 all.txt //读取文件夹
const txtPath = "all.txt"
fs.readdir('../04fsdir',(err,files)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('files',files)
    files.forEach(async (fileName,i)=>{
       let content = await fsRead(`../04fsdir/${fileName}`)
       await writeFile(txtPath,content)
    })
  }
})

//删除文件夹
let fs = require("fs")
fs.rmdir('abc',()=>{
  console.log("删除成功")
})

let readline = require("readline")
//导入realine 包
//实例化接口
let r1 = readline.createInterface({
  output:process.stdout,
  input:process.stdin
})
//设置r1 提问事件
let lcQuestion = (title)=>{
  return new Promise((resolve,reject)=>{
    r1.question(title,(answer)=>{
      resolve(answer)
    })
  })
}


let createPackgage = async ()=>{
  let name = await lcQuestion("您的包名叫什么？")
  let description = await lcQuestion("您的包名如何描述？")
  let main = await lcQuestion("您的主程序是什么")
  let author = await lcQuestion("您的包的作者是谁")
  let content = `{
    "description": "${description}",
    "keywords": [
      "jquery",
      "javascript",
      "browser",
      "library"
    ],
    "author":"${author}",
    "license": "MIT",
    "main": "${main}",
    "name": "${name}",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/jquery/jquery.git"
    },
    "scripts": {},
    "title": "jQuery",
    "version": "3.6.0"
  }`
  await writeFile('package.json',content)
  r1.close()
}

createPackgage()
r1.on('close',()=>{
  process.exit(0)
})