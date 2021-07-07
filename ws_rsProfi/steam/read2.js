let fs = require("fs")

//创建读取流fs.createReadStream(路径，可选配置项)
//let rs = fs.createReadStream('hello.txt',{flags:'r',encoding:'utf-8'})

let rs = fs.createReadStream('501A9337.JPG',{flags:'r'})
// console.log('rs',rs)
let ws = fs.createWriteStream('b.JPG',{flags:"w"})

rs.on('open',()=>{
  console.log('读取的文件打开')
})

rs.on("close",()=>{
   console.log("读取流结束")

})

rs.pipe(ws)