let fs = require("fs")
//读取文件
let fsRead = (path)=>{
  return new Promise((resolve,reject) => {
    fs.readFile(path,{flag:'r',encoding:"utf-8"},function(err,data){
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}
//写入文件
let  writeFile = (path,content)=>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(path,content,{flag:"a",encoding:"utf-8"},(err)=>{
      if(err){
        reject(err)
      }else{
        resolve(err)
      }
    })
  })
}
//删除文件
let fsDelete = (file)=>{
  fs.unlink(file,()=>{
    console.log("成功删除")
  })
}




module.exports = {fsRead,writeFile,fsDelete}