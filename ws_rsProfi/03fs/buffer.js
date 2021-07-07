//buffer 数组 不能进行二进制数据的操作
//数组不像其他语言 效率高
//为了提高操作数组的性能 缓存数据
//未内存空间 开一个 固定大小的内存

//将字符串转成buffer 对象

var str = "helloworld"
let buf = Buffer.from(str)
// console.log('buf',buf)


//outbuffer
console.log(buf.toString())

//开辟一个空的buffer 缓存区
let buf1 = Buffer.alloc(10)
// buf1[0] = 256
console.log('b1',buf1)

let buf2 = Buffer.allocUnsafe(10)
console.log('buf2',buf2)