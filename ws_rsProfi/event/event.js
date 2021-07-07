const { rejects } = require("assert")
let events = require("events")
let fs = require("fs")
let ee = new events.EventEmitter()

ee.on("helloSuccess",(evenMsg)=>{
  console.log("吃宵夜")
  console.log('eventMsg',evenMsg)
})
ee.on("helloSuccess",()=>{
  console.log("唱k")
})
ee.on("helloSuccess",()=>{
  console.log("打王者")
})
ee.on("helloSuccess",()=>{
  console.log("打dota")
})

let lcReadFile = (patch)=>{
  return new Promise((resolve,reject)=>{
      fs.readFile(patch,{encoding:"utf-8"},(err,data)=>{
        if(err){
          // console.log('err',err)
          reject(err)
        }else{
          resolve(data)
          // ee.emit('helloSuccess',data)
        }
      })
  })
}

let shWriteFile = (path)=>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(path,'add',{flag:'a',encoding:"utf-8"},(err)=>{
      console.log('写入成功')
      resolve(true)
    })
    
  })
}

lcReadFile('hello.txt').then((data)=>{
  ee.emit('helloSuccess',data)
})

let test = async ()=>{
 let data = await lcReadFile('hello.txt')
 ee.emit("helloSuccess",data)
}
test()
shWriteFile('hello.txt')