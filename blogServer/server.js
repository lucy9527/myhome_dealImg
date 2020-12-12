/*
 * @Description: 
 * @Author: Do not edit
 * @Date: 2020-11-25 20:44:15
 * @LastEditTime: 2020-12-12 00:37:58
 * @LastEditors: HongXuan.Lu
 */
const express = require('express')
const app =  express();
const bodyParser = require('body-parser')
const fs = require('fs')
//--------------图片处理-------------------
// const {dealImg,readDict} = require('./dealPaper/dealImg')
const {getId} = require('./tools.js')
//---------------数据库--------------------
const dbUser = require('./dealUser/dbUser.js')
const dbArticle = require('./dealPaper/dbArticle.js');
//---------------Tree处理--------------
const {  getLifeTree,addLifeNode, deleteLifeNode} = require('./timeTree/dealTimeTree.js')
const {  getTaskTree,addTaskNode,deleteTaskNode} = require('./taskTree/dealTaskTree.js')
//------------------处理所有请求-------------------------
// 解析body
// parse application/json  
app.use(bodyParser.json({limit:'2100000kb'}));
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({limit:'2100000kb',extended:false}));

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
   //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  res.header('Access-Control-Allow-Methods','POST,GET'); //允许的请求方式
  next()
})

app.post("*",function(req,res,next){
  console.log(req.path);
  next()
})
//-------------------具体接口-----------------------
app.post('/login',function(req,res){
  //登录
  // res.set('charset','utf-8')
  console.log('login');
  new Promise(function(resolve,reject){
    dbUser('search', req.body ,resolve)
  }).then(data=>res.end(data))
  // res.end(ret)
})

app.post('/register',function(req,res){
  console.log('register');
  new Promise(function(resolve,reject){
    dbUser('insert', req.body ,resolve)
  }).then(data=>res.end(data))
})

app.post('/edit',function(req,res){
  console.log('edit');
  // var id = dealImg(req.body.img)
  var reqData = req.body
  // reqData.articleId = id
  reqData.articleId = getId()
  new Promise(function(resolve,reject){
    dbArticle('insert', reqData ,resolve)
  }).then(data=>res.end(data))
})

app.post('/allpaper',function(req,res){
  new Promise(function(resolve,reject){
    dbArticle('searchAll', req.body ,resolve)
    //网络只能传输字符串或buffer二进制流，所以客园先处理成json字符串
  }).then(data=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // Array 的type 为object
    // data.push({'img':readDict()})
    res.send(data)
    res.end()})
})

//-------------------id获取单篇文章------------------------
app.post('/paper',function(req,res){
  new Promise(function(resolve,reject){
    dbArticle('searchid', req.body.articleId ,resolve)
  }).then(data=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(data)
    res.end()})
})
// --------------------更新评论--------------------------
app.post('/myview',function(req,res){  
  new Promise(function(resolve,reject){
    dbArticle('update', req.body.data ,resolve)
  }).then(data=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(data)})
})

// -----------------------个人文章----------------------------
app.post('/userpaper',function(req,res){  
  new Promise(function(resolve,reject){
    dbArticle('userpaper', req.body.username ,resolve)
  }).then(data=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(JSON.stringify(data))})
})
//--------------------------------------------------------------
app.post('/deleteLife/:lifenodeId',deleteLifeNode)
app.post('/addLife',addLifeNode)
app.post('/allLife/:username',getLifeTree)

app.post('/deleteTask/:tasknodeId',deleteTaskNode)
app.post('/addTask',addTaskNode)
app.post('/allTask/:username',getTaskTree)

app.listen(3000)