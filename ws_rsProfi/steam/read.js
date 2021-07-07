let fs = require("fs")

//创建读取流fs.createReadStream(路径，可选配置项)
//let rs = fs.createReadStream('hello.txt',{flags:'r',encoding:'utf-8'})

let rs = fs.createReadStream('501A9337.JPG',{flags:'r'})
// console.log('rs',rs)
let ws = fs.createWriteStream('a.JPG',{flags:"w"})

rs.on('open',()=>{
  console.log('读取的文件打开')
})

rs.on("close",()=>{
   console.log("读取流结束")
   ws.end()//肯定是读取完才停止写入啦
})
//每次数据流入完成 每一批
rs.on("data",(chunk)=>{
  console.log(`单批数据的流入${chunk.length}`)
  console.log('chunk',chunk)
  ws.write(chunk,()=>{
    // end 放这里 还没读取完 就终止写入 会导致数据buwanz
    console.log('单次数据流入完成')
  })
})

