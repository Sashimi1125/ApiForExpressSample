let fs = require("fs")

//创建读取流fs.createReadStream(路径，可选配置项)
//let rs = fs.createReadStream('hello.txt',{flags:'r',encoding:'utf-8'})

fs.readFile("hello.txt",{flag:"r",encoding:"utf-8"},(err,data)=>{
  if(err){
    console.log('err',err)
  }else{
    console.log('data',data)
    lcEvent.emit('helloSuccess',data)
    //q数据查看所有用户的详细信息
    //统计年龄比例
    //查看所有用户学习的详细信息
  }
})
let observe = (data)=>{
  if(!data||Object.prototype.toString.call(data)!='[object Object]'){
    return
  }
  Object.keys(data).forEach((key)=>{
    observe(data[key])
    let a = data[key]
    Object.defineProperty(data,key,{
      configurable:true,
      enumerable:false,
      get:(value)=>{
        console.log('得到了数据',value)
      },
      set:(newValue)=>{
        console.log('修改了数据',a,newValue)
      }
    })
  })
}
let sObj = {
  num:0
}
observe(sObj)
sObj.num = 1


let lcEvent = {
  event:{
    // fileSuccess:[fn,fn,fn]
  },
  on:function(eventName,eventFn){
    if(this.event[eventName]){
      this.event[eventName].push(eventFn)
    }else{
      this.event[eventName] = []
      this.event[eventName].push(eventFn)
    }
  },
  emit:function(eventName,eventMsg){
    if(this.event[eventName]){ 
      this.event[eventName].forEach(itemFn=>{
        itemFn(eventMsg)
      })
    }
  }
}

lcEvent.on('helloSuccess',(EventMsg)=>{
  console.log('1数据库查看所有用户的详细信息')
})

lcEvent.on('helloSuccess',(EventMsg)=>{
  console.log('2统计年龄')
})

lcEvent.on('helloSuccess',(EventMsg)=>{
  console.log('3学习详细信息')
})


