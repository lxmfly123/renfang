var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
// var Todo = AV.Object.extend('Todo');

function queryModel(size, callback) {
  var query = new AV.Query('DoorFrame');
  query.equalTo('size', size);
  query.find().then(
    function(results) {
      if (results.length == 1) {
        console.log('查找成功1');
        return results[0];
      } else if (results.length > 1) {
        console.log('结果不唯一');
      } else {
        console.log('无匹配结果');
      }
    },
    function(error) {
      console.log('Error: ' + error.code + ' ' + error.message);
    }
  )
  .then(function(results) {
    callback(results);
  });
}


router.use('/', function(req, res, next) {
  if (Object.keys(req.query).length == 0) {
    res.render('test');
  } else {
    next();
  }
});

router.use('/', function(req, res, next) {
  if(req.query.model !== '') {
    console.log('b');
    queryModel(req.model, function(results) {
      console.log(results.get('size'));
      res.send(results.get('size'));
    })
  }
});

module.exports = router;
