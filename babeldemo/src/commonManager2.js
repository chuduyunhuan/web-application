var commonManager = {
	folderType: {},
	initFolderData: [],
	menuNameData: [],
	menuName2Id: {},
	neverClose: '菜单搜索',
	tree: $('#tree'),
	init: function() {
		commonManager.ajaxQuery();
		commonManager.initEvent();
	},
	initEvent: function() {
		//字符串自动提示
		var nameArr = commonManager.menuNameData;
		var autoComplete = new AutoComplete('seekMenuName','smartAuto',nameArr);
		var callback = function(){
			autoComplete.start(event);
		};
		commonManager.customEvent('seekMenuName', 'keyup', callback);
		//回车查询
		commonManager.customEvent('seekMenuName', 'keydown', commonManager.enterPress);
		//单击查询
		var clickCallback = function() {
			var menuName = $('#seekMenuName').val();
			commonManager.setMenuSelected(menuName);
		};
		commonManager.customEvent('searchMenuNameOk', 'click', clickCallback);
		//重置文本框
		var resetCallback = function() {
			$('#seekMenuName').val('');
		};
		commonManager.customEvent('clearTextContent', 'click', resetCallback);
	},
	enterPress: function(e) {
		var curKey = e.which;
		if(curKey !== 13) return;
		var menuName = $(this).val();
		if (!menuName) return;
		commonManager.setMenuSelected(menuName);
	},
	customEvent: function(id,evtType,fn) {
		$('#'+id)[evtType](fn);
	},
	setMenuSelected: function(name) {
		var node = commonManager.menuName2Id[name];
		if(!node) {
			alert('请输入正确的菜单名称!');
			return;
		}
		var target = $('#tree').tree('find', node).target;
		$('#tree').tree('select',target);
	},
	loadTree: function() {
		var data = commonManager.initFolderData;
		$('#tree').tree({
			data: data,
			onDblClick: commonManager.onDblClick
		});
	},
	getAllTypes: function(data) {
		data.map(function(obj) {
			var type = obj.attribute;
			commonManager.folderType[type] = [];
		});
	},	
	ajaxQuery: function() {
		var jqDeferred = commonManager.getMenuData('commonManager');
		jqDeferred.then(response => {
			if(!response.length) return;
			var data = response[0].children[0].children[0].children;
			if(!data.length) return;
			commonManager.getAllTypes(data);
			return data;
		}).then(data => {
			//构造子菜单
			data.map(function(obj) {
				var type = obj.attribute;
				commonManager.menuNameData.push(obj.label);
				commonManager.menuName2Id[obj.label] = obj.id;
				commonManager.folderType[type].push({
					text: obj.label,
					id: obj.id,
					attributes: {
						ishasChilds: false,
						type: type,
						value: obj.value,
						name: obj.name
					}
				});
			});
		}).then(() => {
			commonManager.initParentNodes();
		});
	},
	initParentNodes: function() {
		var tarObj = commonManager.folderType;
		//构造一级菜单
		var keysArr = Object.keys(tarObj);
		commonManager.initFolderData = keysArr.map(val => {
			return {
				"id": val,
				"text": val,
				"state": "open",
				"attributes": {"ishasChilds": true}
			};
		});
		commonManager.loadTree();
		commonManager.appendTree();
	},
	appendTree: function() {
		commonManager.initFolderData.map(function(obj,i) {
			$('#tree').tree('append', {
				parent: $('#tree').tree('find',obj.id).target,
				data: commonManager.folderType[obj.text]
			});
		});
	},
	onDblClick: function(node) {
		var type = node.attributes.ishasChilds;
		if (type) return;
		var text = node.text,
			value = node.attributes.value,
			type = node.attributes.type;
		commonManager.addTabsContent(text, value, type);
	},
	addTabsContent: function(name, url, type) {
		var baseUrl = eastcom.baseURL;
		if(type !== 'INAS') {
			baseUrl = baseUrl.replace('/INAS', '');
		}
		if(!$('#tabs').tabs('exists', name)){
			$('#tabs').tabs('add', {
				title: name,
				content: commonManager.createFrame(baseUrl + url),
				closable: true,
				iconCls: 'icontabstitle'
			});
			commonManager.tabClose(); 
			commonManager.tabCloseEven();
		}else{
			$('#tabs').tabs('select', name);
		};
	},
	tabClose: function() {
		/*双击关闭TAB选项卡*/
		// $(".tabs-inner").dblclick(function(){
		// 	var subtitle = $(this).children(".tabs-closable").text();
		// 	$('#tabs').tabs('close',subtitle);
		// });
		/*为选项卡绑定右键*/
		$(".tabs-inner").bind('contextmenu',function(e){
			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});

			var subtitle =$(this).children(".tabs-closable").text();

			$('#mm').data("currtab",subtitle);
			$('#tabs').tabs('select',subtitle);
			return false;
		});
	},
	tabCloseEven: function() {
		//刷新
		$('#mm-tabupdate').click(function(){
			var currTab = $('#tabs').tabs('getSelected');
			var url = $(currTab.panel('options').content).attr('src');
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url)
				}
			});
		});
		//关闭当前
		$('#mm-tabclose').click(function(){
			var currtab_title = $('#mm').data("currtab");
			$('#tabs').tabs('close',currtab_title);
		});
		//全部关闭
		$('#mm-tabcloseall').click(function(){
			$('.tabs-inner span').each(function(i,n){
				var t = $(n).text();
				if(t === commonManager.neverClose) return;
				$('#tabs').tabs('close',t);
			});
		});
		//关闭除当前之外的TAB
		$('#mm-tabcloseother').click(function(){
			$('#mm-tabcloseright').click();
			$('#mm-tabcloseleft').click();
		});
		//关闭当前右侧的TAB
		$('#mm-tabcloseright').click(function(){
			var nextall = $('.tabs-selected').nextAll();
			if(nextall.length==0){
				//msgShow('系统提示','后边没有啦~~','error');
				return false;
			}
			nextall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				$('#tabs').tabs('close',t);
			});
			return false;
		});
		//关闭当前左侧的TAB
		$('#mm-tabcloseleft').click(function(){
			var prevall = $('.tabs-selected').prevAll();
			if(prevall.length==0){
				return 	false;
			}
			prevall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t === commonManager.neverClose) return;
				$('#tabs').tabs('close',t);
			});
			return false;
		});

		//退出
		$("#mm-exit").click(function(){
			$('#mm').menu('hide');
		});
	},
	createFrame: function(url) {
		var k = document.body.offsetHeight;
		var h = k - 65;
		var s = '<iframe id="mainframe" name="mainframe" src=' + url +' width="100%" height="'+h+'"  frameborder="0" scrolling="auto" ></iframe>';
		return s;
	}
};
commonManager.getMenuData = async function(name) {
	var url = "/sysmng/asynchronizeGetSysCommon?name=" + name + "&node=root&sort=%5B%7B%22property%22%3A%22order%22%2C%22direction%22%3A%22ASC%22%7D%5D";
	var result = await $.ajax({
		url: eastcom.baseURL + url,
		type: "POST",
		async: false,
		dataType: "json",
		contentType: "application/json",
		data: "",
	});
	return result;
};