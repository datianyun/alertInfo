(function($) {

	//继承父类，创建对象
	function obj(o) {
		function F() {
		};


		F.prototype = o;
		return new F();
	}

	var e = {
		defaults : {
			container : document.body,
			type : "info",
			title : "&nbsp;",
			cancel : true,
			icon : "info",
			content : "&nbsp;",
			align : "left",
			buttons : {
				ok : "Ok"
			},
			active : null,
			width : "auto",
			draggable : true,
			callback : function() {
			},
			pie : "htc"
		},
		types : {
			info : {
				title : "Info",
				icon : "info",
				buttons : {
					ok : "Ok"
				}
			},
			confirm : {
				title : "Confirm",
				icon : "confirm",
				buttons : {
					yes : "Yes",
					no : "No"
				}
			},
			warning : {
				title : "Warning",
				icon : "warning",
				buttons : {
					ok : "Ok"
				}
			},
			error : {
				title : "Error",
				icon : "error",
				buttons : {
					ok : "Ok"
				}
			},
			prompt : {
				title : "Prompt",
				icon : "prompt",
				buttons : {
					ok : "Ok",
					cancel : "Cancel"
				}
			}
		}
	};

	var d = {};
	var h = false;
	var m;
	var b;

	function i() {
		var o = ["close.png", "info.png", "confirm.png", "warning.png", "error.png"];
		var p = window.devicePixelRatio && devicePixelRatio == 2;
		o = $.map(o, function(item) {
			return ( p ? "x2" : "img") + "/" + item
		});
		var q = $.query('link[href*="theme"]');
		if(!q.length) {
			return
		}
		var r = q.attr("href").toString();
		r = r.substr(0, r.lastIndexOf("/css") + 1);

		$.forEach($.query("img"), function(item) {
			var s = $.attr(item,"src");
			$.attr(item,"src",r+s)
		});
	}

	function n() {
		var p = {};
		if(arguments.length) {
			if($.isObject(arguments[0])) {
				p = arguments[0]
			} else {
				var o = Array.prototype.slice.call(arguments);
				if($.isFunction(o[o.length - 1])) {
					p.callback = o.pop()
				}
				if($.isObject(o[o.length - 1])) {
					p.buttons = o.pop()
				}
				if(o.length == 3) {
					p.type = o[0];
					p.title = o[1];
					p.content = o[2]
				} else {
					if(o.length == 2) {
						if(e.types[o[0]]) {
							p.type = o[0]
						} else {
							p.title = o[0]
						}
						p.content = o[1]
					} else {
						p.content = o[0]
					}
				}
			}
		}

		if(!e.types[p.type]) {
			p.type = e.defaults.type
		}
		//p = g.extend({}, e.defaults, e.types[p.type], p);
		p = $.mixin({}, e.defaults, e.types[p.type], p);
		if(!p.active || !p.buttons[p.active]) {
			for(var q in p.buttons) {
				p.active = q;
				break
			}
		}

		if( typeof $.dnd.Moveable == "undefined") {
			p.draggable = false
		}

		p.title = $.trim(p.title) || e.types[p.type].title;

		if(p.type == "prompt") {
			p.content += ["<input", '    id="smartAlertPrompt"', p.content ? '    class="smartAlertMargin"' : "", '    type="text"', "/>"].join("")
		}

		return p
	}

	function c() {
		var p = [];
		for(var s in d.buttons) {
			var q = s == d.active ? " smartAlertActive" : "";
			p.push(["<div", '    class="smartAlertButton' + q + '"', '    data-id="' + s + '"', ">", d.buttons[s], "</div>"].join(""));

		};
		var o = parseInt($.browser.version);
		var node = ["<div", ' id="smartAlert"', ' data-type="' + d.type + '"', ' data-cancel="' + d.cancel + '"', ' data-icon="' + d.icon + '"', ' data-align="' + d.align + '"', ' data-draggable="' + d.draggable + '"', ' data-pie="' + d.pie + '"', $.browser.chrome ? 'data-chrome="' + o + '"' : "", $.browser.webkit ? 'data-webkit="' + o + '"' : "", $.browser.mozilla ? 'data-mozilla="' + o + '"' : "", $.browser.opera ? 'data-opera="' + o + '"' : "", $.browser.msie ? 'data-ie="' + o + '"' : "", ">", '<div id="smartAlertBox">', '<div id="smartAlertHeader">', '<div id="smartAlertTitle">', d.title, "</div>", ' <div id="smartAlertClose"></div>', "</div>", $.browser.msie && o == 7 ? ['<table id="smartAlertBody">', "<tbody>", "<tr>", ' <td id="smartAlertIcon"></td>', " <td>", '<div id="smartAlertContent">', d.content, "</div>", " </td>", "</tr>", "</tbody>", "</table>"].join("") : ['<div id="smartAlertBody">', ' <div id="smartAlertIcon"></div>', '<div id="smartAlertContent">', d.content, "</div>", "</div>"].join(""), '<div id="smartAlertButtons">', p.join(""), "</div>", "</div>", "</div>"].join("");
		$.place(node, d.container);
		m = $.query("#smartAlert")[0];
		b = $.query("#smartAlertBox")[0];
		b.style.width = d.width+"px";
	}

	function a() {
		var h = ($.marginBox(b).h - parseInt($.style(b, "margin-top")) - parseInt($.style(b, "margin-bottom"))) / 2;
		var w = ($.marginBox(b).w - parseInt($.style(b, "margin-left")) - parseInt($.style(b, "margin-right"))) / 2;
		$.style(b, {
			"top" : Math.round($.marginBox(m).h / 2 - h - parseInt($.style(b, "margin-top"))) + "px",
			"left" : Math.round($.marginBox(m).w / 2 - w - parseInt($.style(b, "margin-top"))) + "px"
		});

	}


	function l(o, p) {
		if(!h) {
			return
		}
		$.destroy(m);
		h=false;
		if($.isFunction(o)) {
				o()
		} else {
				d.callback(o || false, p || "")
		}

	}

	function j() {
		i();
		dojo.connect(document.body,"onclick",function(){
			$.query("#smartAlertClose").connect("onclick", function(evt) {

				$.stopEvent(evt);
				l();
			});
			$.query(".smartAlertButton").connect("onclick", function(evt) {

				$.stopEvent(evt);
				var p = $.attr(this,"data-id");
				var o = d.type == "prompt" ? $.byId(smartAlertPrompt).value : "";
				l(p, o)
			});
			$.query(".smartAlertButton").connect("mousedown", function(evt) {

				$.stopEvent(evt);
				var target = evt.target;
				$.addClass(target,"smartAlertClick");
			});
			$.query(".smartAlertButton").connect("mouseup", function(evt) {

				$.stopEvent(evt);
				var target = evt.target;
				$.removeClass(target,"smartAlertClick");
			});	

			
			
		})
			
		

	}


	$.alert = {
		open : function() {

			var p = arguments;
			function o() {
				d = n.apply(null, p);
				c();
				a();
				if(d.draggable) {
					var dnd = new $.dnd.Moveable(b, {
						mover : $.dnd.StepMover
					});

				}
				m.style.visibility = "visible";
				h = true;
			}

			if(h) {
				l(o)
			} else {
				o()
			}
		},
		
		//p = g.extend({}, e.defaults, e.types[p.type], p);
	
		setup : function(o) {
			if($.isObject(o)) {
				$.mixin(e,o);
				//g.extend(true, e, o)
			}
			return $.mixin({},e) ;
		}
	};
	if(!$.browser) {(function() {
			var o, p;
			$.uaMatch = function(r) {
				r = r.toLowerCase();
				var q = /(chrome)[ \/]([\w.]+)/.exec(r) || /(webkit)[ \/]([\w.]+)/.exec(r) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(r) || /(msie) ([\w.]+)/.exec(r) || r.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(r) || [];
				return {
					browser : q[1] || "",
					version : q[2] || "0"
				}
			};
			o = $.uaMatch(navigator.userAgent);
			p = {};
			if(o.browser) {
				p[o.browser] = true;
				p.version = o.version
			}
			if(p.chrome) {
				p.webkit = true
			} else {
				if(p.webkit) {
					p.safari = true
				}
			}
			$.browser = p
		})()
	}(function() {
		j();
	})();
})(dojo);
