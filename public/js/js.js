// AV.initialize('rrd20hvn22fatz4q9f2887xh9caut9jag23m7bdqk7k0hy2p', 'axi8b3pjbqy013m7pvi156f8fw9ks9tqfz46khjsz6pp1ygf');

// 字符串格式化定义
/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
	return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function(args) {
	var result = this;
	if (arguments.length < 1) {
		return result;
	}

	var data = arguments; // 如果模板参数是数组
	if (arguments.length == 1 && typeof (args) == "object") {
		// 如果模板参数是对象
		data = args;
	}
	for (var key in data) {
		var value = data[key];
		if (undefined != value) {
			result = result.replaceAll("\\{" + key + "\\}", value);
		}
	}
	return result;
}

// 定义 html 元素 class 前缀
if(typeof HTMLClass == "undefined"){
	var HTMLClass = {}
	HTMLClass.checkbox = 'mark'
	HTMLClass.addButton = 'add'
	HTMLClass.model = 'model-cell'
	HTMLClass.a = 'a-cell'
	HTMLClass.b = 'b-cell'
	HTMLClass.H = 'H-cell'
	HTMLClass.okButton = 'ok'
	HTMLClass.L = 'L-cell'
	HTMLClass.c = 'c-cell'
	HTMLClass.d = 'd-cell'
	HTMLClass.d1 = 'd1-cell'
	HTMLClass.bar1 = 'bar-type1-cell'
	HTMLClass.bar2 = 'bar-type1-cell'
	HTMLClass.bar3 = 'bar-type1-cell'
	HTMLClass.bar4 = 'bar-type2-cell'
	HTMLClass.bar5 = 'bar-type2-cell'
	HTMLClass.removeButton = 'remove'
}

// 定义 html 元素 id 前缀
if(typeof HTMLId == "undefined"){
	var HTMLId = {}
	HTMLId.checkbox = 'mark'
	HTMLId.addButton = 'add'
	HTMLId.model = 'model'
	HTMLId.a1 = 'a1'
	HTMLId.a2 = 'a2'
	HTMLId.b = 'b'
	HTMLId.H = 'H'
	HTMLId.okButton = 'ok'
	HTMLId.L = 'L'
	HTMLId.c = 'c'
	HTMLId.d = 'd'
	HTMLId.d1 = 'd1'
	HTMLId.bar1 = 'bar1'
	HTMLId.bar2 = 'bar2'
	HTMLId.bar3 = 'bar3'
	HTMLId.bar4 = 'bar4'
	HTMLId.bar5 = 'bar5'
	HTMLId.removeButton = 'remove'
}

// 定义新建 Row 对象模式的枚举
if(typeof RowInitType == "undefined"){
	var RowInitType = {}
	RowInitType.add = 0
	RowInitType.edit = 1
}

// 定义查询所需参数枚举 server?
if(typeof RequriedParams == "undefined"){
	var RequriedParams = {}
	RequriedParams.model = 'model-cell'
	RequriedParams.a1 = 'a1'
	RequriedParams.a2 = 'a2'
	RequriedParams.b = 'b'
	RequriedParams.H = 'H'
}

// 定义查询结果枚举 server?
if(typeof QueryResultParams == "undefined"){
	var QueryResultParams = {}
	QueryResultParams.L = 'L'
	QueryResultParams.c = 'c'
	QueryResultParams.d = 'd'
	QueryResultParams.d1 = 'd1'
	QueryResultParams.bar1 = 'bar1'
	QueryResultParams.bar2 = 'bar2'
	QueryResultParams.bar3 = 'bar3'
	QueryResultParams.bar4 = 'bar4'
	QueryResultParams.bar5 = 'bar5'
}

// 定义运算参数枚举 server?
if(typeof otherParams == "undefined"){
	var otherParams = {}
	otherParams.modelSize = 'size'
	otherParams.loadGrade = 'loadGrade'
	otherParams.modelType = 'modelType'
}

// PageState 构造方法 
function PageState() {
	this.currentRowId = 0
	this.lastRowId = 0
	this.numberOfRows = 0
	this.isInputting = false
}

PageState.prototype.currentRow = function() {
	return new Row(this.currentRowId, RowInitType.edit)
}

PageState.prototype.init = function() {
	if (this.currentRowId == 0) {
		this.currentRowId = 0
		this.lastRowId = 1
		var firstRow = new Row(this.lastRowId, RowInitType.add)
	}
}

// Row 构造方法
function Row(id, rowInitType) {
	this.id = id
	if (rowInitType == RowInitType.add) {
		this.createRowHtml()
	} else {
		// some initialize work
	}
}

Row.prototype.idFor = function(param) {
	return '#' + param + '-' + this.id
}

Row.prototype.createRowHtml = function() {
	console.log('add')
	pageState.numberOfRows += 1
	pageState.lastRowId += 1
	var newTr = '\
		<tr id="row-{id}">\
		<td><div class="checkbox"><label><input type="checkbox" class="{checkboxClass}" id="{checkboxId}-{id}"></label></div></td>\
		<td><button type="button" class="btn btn-default add" id="add-{id}"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></td>\
		<td><input class="form-control {modelClass}" id="{modelId}-{id}" type="text" placeholder="HFM1320(5)-E1" value="HFM1320(5)-E1"></td>\
		<td><input class="form-control {a1Class}" id="{a1Id}-{id}" type="text" placeholder="400" value="400"></td>\
		<td><input class="form-control {a2Class}" id="{a2Id}-{id}" type="text" placeholder="400" value="500"></td>\
	  	<td><input class="form-control {bClass}" id="{bId}-{id}" type="text" placeholder="400" value="400"></td>\
	  	<td><input class="form-control {HClass}" id="{HId}-{id}" type="text" placeholder="3150" value="3150"></td>\
	  	<td><button type="button" class="btn btn-success ok" id="ok-{id}" style="display: inline"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></td>\
	  	<td><input class="form-control L-cell" id="L-{id}" type="text" placeholder="-" readonly></td>\
	  	<td><input class="form-control c-cell" id="c-{id}" type="text" placeholder="300" readonly></td>\
	  	<td><input class="form-control d-cell" id="d-{id}" type="text" placeholder="550" readonly></td>\
	  	<td><input class="form-control d1-cell" id="d1-{id}" type="text" placeholder="500" readonly></td>\
	  	<td><input class="form-control bar-type1-cell" id="bar1-{id}" type="text" placeholder="-" readonly></td>\
	  	<td><input class="form-control bar-type1-cell" id="bar2-{id}" type="text" placeholder="-" readonly></td>\
	  	<td><input class="form-control bar-type1-cell" id="bar3-{id}" type="text" placeholder="E12@150" readonly></td>\
	  	<td><input class="form-control bar-type2-cell" id="bar4-{id}" type="text" placeholder="3E16" readonly></td>\
	  	<td><input class="form-control bar-type2-cell" id="bar5-{id}" type="text" placeholder="6E25" readonly></td>\
	  	<td><button type="button" class="btn btn-danger remove" id="remove-{id}"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>\
	</tr>'.format({
		id: this.id,
		checkboxClass: HTMLClass.checkbox,
		checkboxId: HTMLId.checkbox,
		addClass: HTMLClass.addButton,
		addId: HTMLId.addButton,
		modelClass: HTMLClass.model,
		modelId: HTMLId.model,
		a1Class: HTMLClass.a,
		a1Id: HTMLId.a1,
		a2Class: HTMLClass.a,
		a2Id: HTMLId.a2,
		bClass: HTMLClass.b,
		bId: HTMLId.b,
		HClass: HTMLClass.H,
		HId: HTMLId.H,
		// unfinished ...
	})
	if (this.id == 1) {
		$('#' + 't-head').after(newTr)
	} else {
		$(pageState.currentRow().idFor('row')).after(newTr)
	}
}

Row.prototype.deleteHtml = function() {
	if (pageState.numberOfRows > 1) {
		$(this.idFor('row')).remove()
		pageState.numberOfRows -= 1
		pageState.currentRowId = 0
	} else {
		alert("至少要有一行")
	}
}

// Model 构造函数
function Model() {
	this.modelName,

	this.modelSize,
	this.loadGrade,
	this.frameType,

	this.a1
	this.a2
	this.b,
	this.H,

	this.L
	this.c,
	this.d,
	this.d1,
	this.bar1,
	this.bar2,
	this.bar3,
	this.bar4,
	this.bar5

	this.ModelClass
}

Model.prototype.reloadData = function() {
	this.parseName()
	this.L = this.a1 + this.a2 + parseInt(this.modelSize.substr(0,2)) * 100
}

Model.prototype.parseName = function() {
	// get size, name & frameType
	var sizeRe = /[0-9]{4}/
	var loadGradeRe = /-[A-F]{1}/

	this.modelSize = sizeRe.exec(this.modelName)[0]
	this.loadGrade = loadGradeRe.exec(this.modelName)[0].substr(1,1)
	this.frameType = this.modelName.substr(this.modelName.length - 1, 1)

	console.log(this.loadGrade)
}

/******* 分割线  以下为函数 *******/

// var model = new Object()

// var keyword = ''

// var model
// var size = ''
// var loadGrade = ''
// var frameType = 1

// var a1 = 0
// var a2 = 0
// var b = 0
// var H = 0

// var L = 0
// var c = 0
// var d = 0
// var d1 = 0
// var bar1 = ''
// var bar2 = ''
// var bar3 = ''
// var bar4 = ''
// var bar5 = ''

// function parseKeyword(keyword) {
// 	var sizeRe = /[0-9]{4}/
// 	size = sizeRe.exec(keyword)[0]

// 	var loadGradeRe = /[A-E]{1}/
// 	loadGrade = loadGradeRe.exec(keyword)[0]

// 	var frameType = keyword.substr(keyword.length - 1, 1)
// }

function reloadDataFromRow(row) {
	currentModel.modelName = $(row.idFor(HTMLId.model)).val()
	currentModel.a1 = Number($(row.idFor(HTMLId.a1)).val())
	currentModel.a2 = Number($(row.idFor(HTMLId.a2)).val())
	console.log('a2=' + currentModel.a2)
	currentModel.b = Number($(row.idFor(HTMLId.b)).val())
	currentModel.H = Number($(row.idFor(HTMLId.H)).val())

	currentModel.reloadData()
}

// function calcParam() {
// 	if(a1 == '-') {
// 		a1 = 0
// 	} else {
// 		a1 = Number(a1)
// 	}

// 	if(a2 == '-') {
// 		a2 = 0
// 	} else {
// 		a2 = Number(a2)
// 	}

// 	L =  a1 + a2 + parseInt(size.substr(0,2)) * 100
// }


// function queryC(size, loadGrade, L) {
// 	var query = new AV.Query('C')

// 	query.equalTo('size',size)
// 	query.equalTo('loadGrade', loadGrade)
// 	query.equalTo('L', L)

// 	query.find({
// 		success: function (results) {
// 			console.log(results.length)

// 			for(var i = 0; i < results.length; i++) {
// 				var object = results[i]
// 				console.log(object.get('c'))
// 			}
// 		},
// 		error: function(error) {
// 			console.log('Error: ' + error.code + ' ' + error.message)
// 		}
// 	})
// }

// function queryC(size, loadGrade, L) {
// 	console.log('query c')
// 	var query = new AV.Query('C')
// 	query.equalTo('size', size)
// 	query.equalTo('loadGrade', loadGrade)
// 	query.equalTo('L', L)
// 	query.find().then(
// 		function(results) {
// 			if (results.length == 1) {
// 				console.log('c查找成功')
// 				currentModel.c = results[0].get('c')
// 				$(pageState.currentRow().idFor(HTMLId.c)).attr('placeholder', currentModel.c)
// 			} else if (results.length > 1) {
// 				console.log('c结果不唯一')
// 			} else {
// 				console.log('c无匹配结果')
// 			}
// 		},
// 		function(error) {
// 			console.log('Error: ' + error.code + ' ' + error.message)
// 		}
// 	)
// }

// 查找参数
function query(size, loadGrade, wrapedParam) {
	console.log('query' + wrapedParam.colName)
	var query = new AV.Query(wrapedParam.className)
	query.equalTo('size', size)
	query.equalTo('loadGrade', loadGrade)
	console.log('loadGrade', currentModel.loadGrade)
	if (wrapedParam.factorColName == 'a1' || wrapedParam.factorColName == 'a2') {
		query.equalTo('a', wrapedParam.factorValue)
	} else {
		query.equalTo(wrapedParam.factorColName, wrapedParam.factorValue)
	}
	
	query.find().then(
		function(results) {
			if (results.length == 1) {
				console.log(wrapedParam.colName + '查找成功')
				currentModel[wrapedParam.colName] = results[0].get('value')
				$(pageState.currentRow().idFor(HTMLId[wrapedParam.colName])).attr('placeholder', currentModel[wrapedParam.colName])
			} else if (results.length > 1) {
				console.log(wrapedParam.colName +'结果不唯一')
			} else {
				console.log(wrapedParam.colName + '无匹配结果')
			}
		},
		function(error) {
			console.log('Error: ' + error.code + ' ' + error.message)
		}
	)
}

// 查找门框墙元信息


function wrapParam(paramClassName, paramName, paramFactorColName, paramFactorColValue) {
	var wrapedParam = {
		className: paramClassName,
		colName: paramName,
		factorColName: paramFactorColName,
		factorValue: paramFactorColValue
	}

	roundFactorParam(wrapedParam)

	return wrapedParam
}

function roundFactorParam(wrapedParam) {
	// var roundedParam = wrapedParam
	var allowedParam = currentModel.modelClass.get(wrapedParam.factorColName)

	if (wrapedParam.factorColName == 'a1' || wrapedParam.factorColName == 'a2') {
		allowedParam = currentModel.modelClass.get('a')
	}

	var queriableParam
	if (currentModel[wrapedParam.factorColName] > allowedParam[allowedParam.length - 1]) {
		alert(wrapedParam.factorValue + '超出范围')
	} else if (currentModel[wrapedParam.factorColName] <= allowedParam[0]) {
		queriableParam = allowedParam[0]
	} else {
		for(var key in allowedParam) {
			if ((currentModel[wrapedParam.factorColName] <= allowedParam[key]) && (currentModel[wrapedParam.factorColName] > allowedParam[key - 1])) {
				queriableParam = allowedParam[key]
			}
		}
	}
	wrapedParam.factorValue = queriableParam
}


// function query(param, size, loadGrade) {
// 	var wrapedParam = wrapParam(param)

// 	var query = new AV.Query(wrapedParam[0])

// 	query.equalTo('size',size)
// 	query.equalTo('loadGrade', loadGrade)
// 	query.equalTo(wrapedParam[1], wrapedParam[2])

// 	query.find({
// 		success: function (results) {
// 			console.log('查询结果数量' + results.length)

// 			for(var i = 0; i < results.length; i++) {
// 				var object = results[i]
// 				console.log(object.get(param))
// 			}
// 		},
// 		error: function(error) {
// 			console.log('Error: ' + error.code + ' ' + error.message)
// 		}
// 	})
// }

// var dict1 = {
// 	'a1':'a1',
// 	'a2':'a2',
// 	'b':'b',
// 	'H':'H'
// }
// var dict2 = {
// 	'L':'L',
// 	'c':'c',
// 	'd':'d',
// 	'd1':'d1',
// 	'bar1':'bar1',
// 	'bar2':'bar2',
// 	'bar3':'bar3',
// 	'bar4':'bar4',
// 	'bar5':'bar5',
// }

var pageState = new PageState()
var currentModel = new Model()

$(document).ready(function() {
	pageState.init()

	// 点击添加行
	$("table").on('click', '.' + HTMLClass.addButton, function() {
		console.log('add')
		pageState.currentRowId = $(this).attr("id").split('-')[1]
		var newRow = new Row(pageState.lastRowId, RowInitType.add)
	})

	// 点击删除行
	$("table").on('click', '.' + HTMLClass.removeButton, function() {
		console.log('delete')
		pageState.currentRowId = $(this).attr("id").split('-')[1]
		pageState.currentRow().deleteHtml()
		pageState.currentRowId = 0
	})

	// 点击查询 *** 该功能有问题，暂不能使用
	// $("table").on('click', '.' + HTMLClass.okButton, function() {
	// 	console.log('query')

	// 	pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 	reloadDataFromRow(pageState.currentRow())
	// 	console.log(currentModel.L)
	// 	queryModel()
	// })

	// 切换输入行后重新查找 门框编号
	// $('table').on('focus', 'input', function() {
	// 	if ($(this).attr("id").split('-')[1] != pageState.currentRowId) {
	// 		console.log('reset line')
	// 		pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 		reloadDataFromRow(pageState.currentRow())
	// 		queryModel()
	// 	}
	// })

	// 输入 门框编号 后查询相关
	// $("table").on('blur', '.' + HTMLClass.model, function() {
	// 	console.log('detect model')
	// 	pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 	reloadDataFromRow(pageState.currentRow())
	// 	queryModel()
	// 	// 当修改了门框墙尺寸和荷载级别后，应当立即更新其余信息
	// })

	// 输入 a1/a2 后立即计算 L、c、bar1/2/4 并显示
	// $("table").on('blur', '.' + HTMLClass.a, function() {
	// 	console.log('detect a')
	// 	pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 	reloadDataFromRow(pageState.currentRow())
	// 	$(pageState.currentRow().idFor(HTMLId.L)).attr('placeholder', currentModel.L)

	// 	var cToQuery = wrapParam('C', 'c', 'L', currentModel.L)
	// 	var bar1ToQuery = wrapParam('Bar1Or2', 'bar1', 'a1', currentModel.a1)
	// 	var bar2ToQuery = wrapParam('Bar1Or2', 'bar2', 'a2', currentModel.a2)
	// 	var bar4ToQuery = wrapParam('Bar4', 'bar4', 'L', currentModel.L)
	// 	query(currentModel.modelSize, currentModel.loadGrade, cToQuery)
	// 	query(currentModel.modelSize, currentModel.loadGrade, bar1ToQuery)
	// 	query(currentModel.modelSize, currentModel.loadGrade, bar2ToQuery)
	// 	query(currentModel.modelSize, currentModel.loadGrade, bar4ToQuery)
	// })

	// 输入 b 后立即查询 bar3 并显示，临时注释
	// $("table").on('blur', '.' + HTMLClass.b, function() {
	// 	console.log('detect b')
	// 	pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 	reloadDataFromRow(pageState.currentRow())

	// 	// $(pageState.currentRow().idFor(HTMLId.bar3)).attr('placeholder', currentModel.bar3)

	// 	var bar3ToQuery = wrapParam('Bar3', 'bar3', 'b', currentModel.b) 
	// 	query(currentModel.modelSize, currentModel.loadGrade, bar3ToQuery)

	// });

	// 输入 H 后立即查询 bar5 并显示，临时注释
	// $("table").on('blur', '.' + HTMLClass.H, function() {
	// 	console.log('detect H')
	// 	pageState.currentRowId = $(this).attr("id").split('-')[1]
	// 	reloadDataFromRow(pageState.currentRow())

	// 	// $(pageState.currentRow().idFor(HTMLId.bar3)).attr('placeholder', currentModel.bar3)

	// 	var bar5ToQuery = wrapParam('Bar5', 'bar5', 'H', currentModel.H)
	// 	console.log(bar5ToQuery.factorValue)
	// 	query(currentModel.modelSize, currentModel.loadGrade, bar5ToQuery)
	// })


	/*** 改为 nodejs 后台后的分割线 ***/

	// 1. 查询门框墙元信息
	$("table").on('blur', '.' + HTMLClass.model, function() {
		console.log('detect model')
		pageState.currentRowId = $(this).attr("id").split('-')[1]
		// reloadDataFromRow(pageState.currentRow())
		$.get('/rf?model=1320', function(data, status) {
			alert(data)
		})
		// 当修改了门框墙尺寸和荷载级别后，应当立即更新其余信息
	})
})



// keyword = 'HFM1320(6)-E1'

// a1 = 400
// a2 = 400

// parseKeyword(keyword)
// calcParam()



// query('c', size, loadGrade)