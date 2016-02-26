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
	this.id;
	this.model = new Model();
	this.lastModel = new Model();
	this._shouldQuery;

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

Object.defineProperty(Row.prototype, 'shouldQuery', {
	get: function() {
		if (this.model.modelName !== this.lastModel.modelName) {
			this._shouldQuery = true;
		} else if(this.model.a1 !== this.lastModel.a1) {
			this._shouldQuery = true;
		} else if(this.model.a2 !== this.lastModel.a2) {
			this._shouldQuery = true;
		} else if(this.model.b !== this.lastModel.b) {
			this._shouldQuery = true;
		} else if(this.model.H !== this.lastModel.H) {
			this._shouldQuery = true;
		} else {
			this._shouldQuery = false;
		}
		return this._shouldQuery;
	},
	set: function(value) {
		this._shouldQuery = value;
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
      <td><button type="button" class="btn btn-danger ok" id="ok-{id}" style="display: inline"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></td>\
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

  function collectRawDataForRow(row) {
  	var model = row.model;
		model.modelName = $(row.idFor(HTMLId.model)).val();
    model.a1 = $(row.idFor(HTMLId.a1)).val();
    model.a2 = $(row.idFor(HTMLId.a2)).val();
    model.b = $(row.idFor(HTMLId.b)).val();
    model.H = $(row.idFor(HTMLId.H)).val();
  }

	function fillWith(data) {
		var row = pageState.getRowById(parseInt(data.rowId));
		var model = data.model;

		row.lastModel = row.model;
		row.model = data.model;

		array = ['L', 'c', 'd', 'd1', 'bar1', 'bar2', 'bar3', 'bar4', 'bar5'];

		array.forEach(function(e) {
			if (row.model[e] !== row.lastModel[e]) {
				blinkElement($(row.idFor(HTMLId[e])));
				$(row.idFor(HTMLId[e])).val(model[e]);
			} else {
				console.log(e + ' does not change');
			}
		});
	}

	function rotateElementOfRow(element, row) {
		element.css('borderSpacing', 0);
		if (!row.shouldQuery) {
			element.css('transform', 'rotate(0deg)');
			return;
		} else {
			element.animate({borderSpacing: 360}, {
				step: function(now) {
					if (!row.shouldQuery) {
						/**  下面这两句有问题。

							但是 `element.stop(true, true)` 会导致单元格值变化时无法提示。暂且如此。

						**/
						element.stop(); 
						rotateElementOfRow(element, row);
						
					} else {
						$(this).css('transform', 'rotate('+ now + 'deg)');
					}
	    	},
	    	easing: 'linear',
	    	duration: 1000,
	    	complete: function() {rotateElementOfRow(element, row);}
			});
		}
	}

	function query(row) {
		console.log('*** query ***');

		$(row.idFor(HTMLId.okButton)).attr('class','btn btn-warning');
		$(row.idFor(HTMLId.okButton)).children().attr('class', 'glyphicon glyphicon-refresh');

		rotateElementOfRow($(row.idFor(HTMLId.okButton)).children(), row);
		
		// $(row.idFor(HTMLId.okButton)).children().css('transform', 'rotate(90deg)');

		var model = row.model;

    var url = '/rf?modelName=' + model.modelName;
    url += '&a1=' + model.a1;
    url += '&a2=' + model.a2;
    url += '&b=' + model.b;
    url += '&H=' + model.H;
    url += '&rowId=' + pageState.currentRow.id;

    $.get(url, function(data, status) {
    	fillWith(data);
    	collectRawDataForRow(row);
    	console.log('finished')
    	// $(row.idFor(HTMLId.okButton)).children().stop(true, true);
    	$(row.idFor(HTMLId.okButton)).attr('class', 'btn btn-success');
			$(row.idFor(HTMLId.okButton)).children().attr('class', 'glyphicon glyphicon-ok');
    });
	}

	function blinkElement(element) {
		console.log('blinkElement')
		element.animate({backgroundColor: 'rgba(0, 100, 0, 0.6)'}, 'fast');
  	element.animate({backgroundColor: 'rgba(0, 100, 0, 0)'}, 'slow', function() {
  		element.css('backgroundColor', '');
  	});
	}

	function alertElement(element) {
		element.animate({backgroundColor: 'rgba(250, 128, 10, 1)'}, 'fast');
  	element.animate({backgroundColor: 'rgba(250, 128, 10, 0.8)'}, 'normal');
	}

	function resetElementState(element) {
		element.animate({backgroundColor: 'white'}, 'fast', function() {
			element.css('backgroundColor', '');
		});
	}

	$("table").on('focus', 'input', function() {
		console.log('detect ' + $(this).attr('class'));
		pageState.currentRow = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));
		collectRawDataForRow(pageState.currentRow);
	});

  // 1. 查询门框墙元信息
  $("table").on('blur', 'input', function() {
    console.log('detect ' + $(this).attr('class'));
    var row = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));
		collectRawDataForRow(row);
    if (row.shouldQuery) {
    	query(row);
    }
  });

  $('table').on('keydown', 'input', function(e) {
  	if(e.keyCode === 13 || e.keyCode === 108) {
  		pageState.currentRow = pageState.getRowById(parseInt($(this).attr("id").split('-')[1]));
			collectRawDataForRow(pageState.currentRow);
  		if(pageState.currentRow.shouldQuery) {
  			query(pageState.currentRow);
  		}
  	}
  });
});