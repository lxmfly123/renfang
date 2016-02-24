var router = require('express').Router();
var AV = require('leanengine');
var Model = require('model');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
// var Todo = AV.Object.extend('Todo');

var model = new Model();

// 按尺寸查找元信息
function queryModel(callback) {
  var query = new AV.Query('DoorFrame');
  query.equalTo('size', model.modelSize);
  query.find().then(
    function(results) {
      if (results.length === 1) {
        console.log('model 查找成功');
        return results[0];
      } else if (results.length > 1) {
        console.log('model 结果不唯一');
      } else { 
        console.log('model 无匹配结果');
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

// 根据已知参数查找对应项
function queryAccordingTo(param, callback) {
  console.log('query ' + param.name);

  if (param.name === 'b' && param.roundedValue === 'over') {
    queryCount += 1;
    model._bar3.value = model.modelClass.get('bar3');
    return;
  }

  param.targets.forEach(function(target) {
    var query = new AV.Query(target.leancloudClass);
    query.equalTo('size', model.modelSize);
    query.equalTo('loadGrade', model.loadGrade);
    query.equalTo(param.leancloudName, param.roundedValue);

    query.find().then(function(results) {
      queryCount += 1;
      if (results.length == 1) {
        console.log(target.name + '查找成功');
        target.value = results[0].get('value');
      } else if (results.length > 1) {
        console.log('***' + target.name +'结果不唯一');
      } else {
        console.log('***' + target.name + '无匹配结果');
      }
    },
    function(error) {
      console.log('Error: ' + error.code + ' ' + error.message);
    })
    .then(function(results) {
      if (queryCount === 8) {
        queryCount = 0;
        callback();
      }
    });
  });
}

/***** middleware *****/

var queryCount = 0 // 完成一次完整的查询应该需要 8 次

// 渲染页面
router.use('/', function(req, res, next) {
  if (Object.keys(req.query).length === 0) {
    res.render('test');
  } else {
    next();
  }
});

// 根据 modelName （门框编号）查询元信息
router.use('/', function(req, res, next) {
  if(req.query.modelName !== '') {
    model.modelName = req.query.modelName;
    queryModel(function(result) {
      model.modelClass = result;
      next();
    });
  } else {
    // 无法确定 modelClass，应返回错误信息。
  }
});

router.use('/', function(req, res, next) {
  console.log('\n------------------查询开始---------------------\n');

  if(req.query.a1 !== '') {
    model.a1 = parseInt(req.query.a1);
    queryAccordingTo(model._a1, next);
  }
  if(req.query.a2 !== '') {
    model.a2 = parseInt(req.query.a2);
    queryAccordingTo(model._a2, next);
  }

  if(req.query.a1 !== '' && req.query.a2 !== '') {
    model.L = model.a1 + model.a2 + parseInt(model.modelSize.substr(0,2)) * 100;
    queryAccordingTo(model._L, next);
  }

  if(req.query.b !== '') {
    model.b = parseInt(req.query.b);
    queryAccordingTo(model._b, next);
  }

  if(req.query.H !== '') {
    model.H = parseInt(req.query.H);
    queryAccordingTo(model._H, next);
  }
});

router.use('/', function(req, res, next) {
  console.log('\n------------------查询结束---------------------\n');

  var result = {
    a1: model.a1,
    a2: model.a2,
    c: model.c,
    H: model.H,
    L: model.L,
    c: model.c,
    d: model.d,
    d1: model.d1,
    bar1: model.bar1,
    bar2: model.bar2,
    bar3: model.bar3,
    bar4: model.bar4,
    bar5: model.bar5,
    rowId: parseInt(req.query.rowId)
  }
  res.send(result);
});

module.exports = router;