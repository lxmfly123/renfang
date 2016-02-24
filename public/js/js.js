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

// PageState 构造方法 
function PageState() {
	this._currentRow = undefined;
	// this._latestRow = undefined;
	this.latestId;

  this.rows = [];
}

Object.defineProperty(PageState.prototype, 'currentRow', {
	set: function(row) {
		this._currentRow = row;
	},
	get: function() {
		return this._currentRow;
	}
});

// Object.defineProperty(PageState.prototype, 'latestRow', {
// 	set: function(row) {
// 		this._latestRow = row;
// 	},
// 	get: function() {
// 		return this._latestRow;
// 	}
// });

PageState.prototype.init = function() {
  if (this.currentRow === undefined) {
    new Row();
  }
}

PageState.prototype.getRowById = function(id) {
	return this.rows[pageState.rows.map(function(e) { return e.id; }).indexOf(id)];
}

// Row 构造方法
function Row() {
	this.shouldQuery = true;
	this.id;
	this.model = new Model();

	if (pageState.latestId === undefined) {
		this.id = 1;
	} else {
		this.id = pageState.latestId + 1;
	}

	pageState.latestId = this.id;

	this.createRowHtml();

	pageState.rows.push(this);
}

Object.defineProperty(Row.prototype, 'index', {
	get: function() {
		return pageState.rows.map(function(e) { return e.id; }).indexOf(this.id);
	}
});

Row.prototype.idFor = function(HTMLId) {
  return '#' + HTMLId + '-' + this.id;
}

Row.prototype.createRowHtml = function() {
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
  });

  if (this.id === 1) {
    $('#' + 't-head').after(newTr);
  } else {
    $(pageState.currentRow.idFor('row')).after(newTr);
  }
}

Row.prototype.remove = function() {
  if (pageState.rows.length > 1) {
    $(this.idFor('row')).remove();
    pageState.rows.splice(this.index, 1);
  } else {
    alert("至少要有一行");
  }
}

// Model

function Model() {
	this.modelName;
	this.modelSize;
	this.loadGrade;
	this.modelType;

	this.a1;
	this.a2;
	this.b;
	this.H;

	this.L;
	this.c;
	this.d;
	this.d1;

	this.bar1;
	this.bar2;
	this.bar3;
	this.bar4;
	this.bar5;
}

var pageState = new PageState();

$(document).ready(function() {
	pageState.init();

  // 点击添加行
  $("table").on('click', '.' + HTMLClass.addButton, function() {
    pageState.currentRow = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));
    new Row();
  });

  // 点击删除行
  $("table").on('click', '.' + HTMLClass.removeButton, function() {
    console.log('delete');
    pageState.currentRow = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));
    pageState.currentRow.remove();
  });

  /*** 改为 nodejs 后台后的分割线 ***/

	var url;

	function fillWith(data) {
		var row = pageState.getRowById(parseInt(data.rowId));
		console.log(data.rowId)

		$(row.idFor(HTMLId.L)).val(data.L);
		$(row.idFor(HTMLId.c)).val(data.c);
		$(row.idFor(HTMLId.d)).val(data.d);
		$(row.idFor(HTMLId.d1)).val(data.d1);
		$(row.idFor(HTMLId.bar1)).val(data.bar1);
		$(row.idFor(HTMLId.bar2)).val(data.bar2);
		$(row.idFor(HTMLId.bar3)).val(data.bar3);
		$(row.idFor(HTMLId.bar4)).val(data.bar4);
		$(row.idFor(HTMLId.bar5)).val(data.bar5);
	}

  // 1. 查询门框墙元信息
  $("table").on('blur', 'input', function() {
    console.log('detect ' + $(this).attr('class'));

    pageState.currentRow = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));

    var model = pageState.currentRow.model;
    model.modelName = $(pageState.currentRow.idFor(HTMLId.model)).val();
    model.a1 = $(pageState.currentRow.idFor(HTMLId.a1)).val();
    model.a2 = $(pageState.currentRow.idFor(HTMLId.a2)).val();
    model.b = $(pageState.currentRow.idFor(HTMLId.b)).val();
    model.H = $(pageState.currentRow.idFor(HTMLId.H)).val();

    var url = '/rf?modelName=' + model.modelName;
    url += '&a1=' + model.a1;
    url += '&a2=' + model.a2;
    url += '&b=' + model.b;
    url += '&H=' + model.H;
    url += '&rowId=' + pageState.currentRow.id;

    $.get(url, function(data, status) {
    	fillWith(data);
    });
    // 当修改了门框墙尺寸和荷载级别后，应当立即更新其余信息
  });
});