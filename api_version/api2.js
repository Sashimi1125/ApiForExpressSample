var express = require("express");
var api = express.Router();
var multiparty = require("multiparty");

var mysql = require('mysql')
var connection = mysql.createConnection({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'1234',
  database:'websites'
})
// connection.connect()
// let sql = `SELECT * FROM websites`;
// let resDataSome = ''
// connection.query(sql,function(error,result){
// if(error){
//   console.log('[SELECT ERROR]:',err.message)
// }
//   console.log('resule',result)
//   resDataSome = result
// })
// connection.end()
let sql = `SELECT * FROM websites`;
//登录接口
api.post("/userLogin",function(req,res){
  connection = mysql.createConnection(connection.config);
  connection.connect()
  console.log('Login req1',req.body)
  let username = req.body.username
  let password = req.body.password
  if(!username){
    res.json({code:500,msg:'登录失败，用户名不能为空'})
    return
  }
  if(!password){
    res.json({code:500,msg:'登录失败，密码不能为空'})
    return
  }
  sql = `SELECT * FROM u_info_t WHERE name = '${username}'`;

  connection.query(sql,function(error,result){
    if(error){
      console.log('[SELECT ERROR]:',error.message)
    }
      console.log('resule',result)
      if(result.length===0){
        res.json({code:500,msg:'用户名不存在'})
        return
      }
      if(password == result[0].password){
        res.json({code:200,msg:`登录成功,欢迎回来${result[0].userName}`,loginName:result[0].userName})
      }else{
        res.json({code:500,msg:'登录失败，密码不正确'})
      }
      
    })
    connection.end()
})

//模糊查询
api.post("/websitePagelist",function(req,res){
    connection = mysql.createConnection(connection.config);
    connection.connect()
    console.log('req1',req.body)
    if(req.body.userName){
      sql = `SELECT * FROM websites WHERE name LIKE '%${req.body.userName}%'`
    }else{
      sql = `SELECT * FROM websites`;
    }
    connection.query(sql,function(error,result){
      if(error){
        console.log('[SELECT ERROR]:',error.message)
      }
        console.log('resule',result)
        res.json({code:200,msg:'成功',rows:result})
      })
      connection.end()
})
//修改用户名称
api.post("/EditUserName",function(req,res){
  connection = mysql.createConnection(connection.config);
  connection.connect()
  console.log('req1e',req.body)
  if(req.body.userName){
    sql =   `UPDATE websites SET 
              name='${req.body.userName}',
                url='${req.body.url}',
                  alexa='${req.body.alexa}',
                    country='${req.body.country}'
                      WHERE id=${req.body.id}`
  }
  connection.query(sql,function(error,result){
    if(error){
      console.log('[SELECT ERROR]:',error.message)
    }
      console.log('resule',result)
      res.json({code:200,msg:'成功',rows:result})
    })
    connection.end()
})
//删除用户名
api.post("/delectedUser",function(req,res){
  connection = mysql.createConnection(connection.config);
  connection.connect()
  console.log('req1e',req.body)
  if(req.body.id){
    sql =   `DELETE FROM websites WHERE id='${req.body.id}'`
  }
  connection.query(sql,function(error,result){
    if(error){
      console.log('[SELECT ERROR]:',error.message)
    }
      console.log('resule',result)
      res.json({code:200,msg:'成功',rows:result})
    })
    connection.end()
})

//新增
api.post("/AddUser",function(req,res){
  connection = mysql.createConnection(connection.config);
  connection.connect()
  console.log('req1a',req.body)
  if(req.body.userName){
    sql =   `INSERT INTO websites(name,url,alexa,country) 
    VALUES('${req.body.userName}',
    '${req.body.url}',
    '${req.body.alexa}',
    '${req.body.country}'
    )`
  }
  connection.query(sql,function(error,result){
    if(error){
      console.log('[SELECT ERROR]:',error.message)
    }
      console.log('resule',result)
      res.json({code:200,msg:'成功',rows:result})
    })
    connection.end()
})

api.get("/timezone", function(req, res) {
    res.send("API 2: super cool new response for /timezone");
});



api.get("/random/:min/:max", function(req, res) {
  var min = parseInt(req.params.min);
  var max = parseInt(req.params.max);
  if (isNaN(min) || isNaN(max)) {
      res.status(400);
      res.json({ error: "Bad request." });
      return;
  }
 
  var result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result: result,code:200 });
});

// react demo 模拟api 数据接口
api.get("/someDataPagelist",function(req,res){
  let userList = []
  for (let i = 1; i < 20; i++) {
      userList.push({
            id: i,
            name: '用户' + i
        })
      }
    res.json({msg:'请求成功',code:200,rows:userList})
})

api.post("/someDataPostPagelist", function(req, res) {
  let jsonParam = req.body
  console.log('req',req.body)
  
  res.json({msg:'请求成功',code:200,data:jsonParam})
});

api.post('/someDataFom', function(req, res, next) {
  console.log("body",req.body,)
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/images' });
  form.parse(req, function(err, fields, files) {
      console.log(' fields2',fields, files)
      if (err) {
      } else {
          // .image[0].path 
          res.json({ imgSrc: files})
      }
  });
});

module.exports = api;