let fs = require("fs")
//文件流
//创建写入流 -- fs.createWriterStream(文件路径,配置[可选的])
let ws = fs.createWriteStream('hello.txt',{flags:"w",encoding:"utf-8"});
console.log('ws',ws)
//监听文件打开 on 是监听
ws.on("open",()=>{
  console.log('文件打开了')
})

//监听准备事件
ws.on("ready",()=>{
  console.log("文件写入准备")
})

ws.on("close",()=>{
  console.log("文件写入完成，关闭")
})
//文件 流式写入
ws.write("helloworld1",(err)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('suc','内容1流入完成')
  }
})

ws.write("helloworld2",(err)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('suc','内容2流入完成')
  }
})

ws.write("helloworld3",(err)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('suc','内容3流入完成')
  }
})

ws.write("helloworld4",(err)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('suc','内容4流入完成')
  }
})

ws.end(()=>{
    console.log('文件写入关闭')
})


