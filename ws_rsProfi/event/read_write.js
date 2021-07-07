let fs = require("fs")

let read1 = (path)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(path,{flag:'r',encoding:'utf-8'},(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
        console.log('读取成功')
      }
    })
  })
}

let write1 = (path,content)=>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(path,content,{flag:'a',encoding:'utf-8'},(err)=>{
      console.log('写入成功')
      resolve(err)
    })
  })
}

let raw_ = async ()=>{
 let innerText = await read1('../nodeFileUtils/all.txt')
 await write1('hello.txt',innerText)
}

raw_()

// let rs = fs.createReadStream('../steam/501A9337.JPG',{flags:'r'})
// let ws = fs.createWriteStream('ka.JPG',{flags:'w'})


// rs.on('open',()=>{
//   console.log('文件正在被打开')
// })

// rs.on('close',()=>{
//   console.log('读取完成')
//   ws.end()
// })
// rs.on('data',(chunk)=>{
//   console.log('文件写入中')
//   ws.write(chunk)
// })

fs.readdir('../nodeFileUtils',{encoding:'utf-8'},(err,file)=>{//文件名数组
  if(err){
    console.log('读取失败')
  }else{
    file.forEach(async _=>{
     let content = await new Promise((resolve,reject)=>{
        fs.readFile(`../nodeFileUtils/${_}`,{flag:'r',encoding:'utf-8'},(err,data)=>{
            if(err){
              reject(err)
              console.log('读取失败')
            }else{
              return resolve(data)
            }
        })
      })
       fs.writeFile('hello0.txt',content,{flag:'a',encoding:'utf-8'},(err)=>{
         if(err){
           console.log('写入失败')
         }else{
           console.log('写入成功')
         }
       })
    })
  }
})