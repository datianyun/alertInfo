/**
 * @author tianyun
 */
(function(g, dojo) {

	var e = {
		defaults : {
			container : "body",
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
			maxHeight : 160,
			draggable : true,
			callback : g.noop,
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
	var m = g([]);
	var b = g([]);
	function i() {
		var o = ["close.png", "info.png", "confirm.png", "warning.png", "error.png"];
		var p = window.devicePixelRatio && devicePixelRatio == 2;
		o = g.map(o, function(s) {
			return ( p ? "x2" : "img") + "/" + s
		});
		var q = g('link[href*="alert/themes/"]');
		if(!q.length) {
			return
		}
		var r = q.attr("href");
		r = r.substr(0, r.lastIndexOf("/") + 1);
		g.each(o, function(u, t) {
			var s = g("<img />").attr("src", r + t)
		})
	}

	function n() {
		var p = {};
		if(arguments.length) {
			if(g.isPlainObject(arguments[0])) {
				p = arguments[0]
			} else {
				var o = Array.prototype.slice.call(arguments);
				if(g.isFunction(o[o.length - 1])) {
					p.callback = o.pop()
				}
				if(g.isPlainObject(o[o.length - 1])) {
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
		p = g.extend({}, e.defaults, e.types[p.type], p);
		if(!p.active || !p.buttons[p.active]) {
			for(var q in p.buttons) {
				p.active = q;
				break
			}
		}
		if( typeof g.fn.draggable == "undefined") {
			p.draggable = false
		}
		p.title = g.trim(p.title) || e.types[p.type].title;
		if(p.type == "prompt") {
			p.content += ["<input", '    id="smartAlertPrompt"', p.content ? '    class="smartAlertMargin"' : "", '    type="text"', "/>"].join("")
		}
		return p
	}

	function c() {
		var p = [];
		g.each(d.buttons, function(s, r) {
			var q = s == d.active ? " smartAlertActive" : "";
			p.push(["<div", '    class="smartAlertButton' + q + '"', '    data-id="' + s + '"', ">", r, "</div>"].join(""))
		});
		var o = parseInt(g.browser.version);
		g(["<div", '    id="smartAlert"', '    data-type="' + d.type + '"', '    data-cancel="' + d.cancel + '"', '    data-icon="' + d.icon + '"', '    data-align="' + d.align + '"', '    data-draggable="' + d.draggable + '"', '    data-pie="' + d.pie + '"', g.browser.chrome ? 'data-chrome="' + o + '"' : "", g.browser.webkit ? 'data-webkit="' + o + '"' : "", g.browser.mozilla ? 'data-mozilla="' + o + '"' : "", g.browser.opera ? 'data-opera="' + o + '"' : "", g.browser.msie ? 'data-ie="' + o + '"' : "", ">", '    <div id="smartAlertBox">', '        <div id="smartAlertHeader">', '            <div id="smartAlertTitle">', d.title, "            </div>", '            <div id="smartAlertClose"></div>', "        </div>", g.browser.msie && o == 7 ? ['        <table id="smartAlertBody">', "            <tbody>", "                <tr>", '                    <td id="smartAlertIcon"></td>', "                    <td>", '                        <div id="smartAlertContent">', '                            <div id="smartAlertScroll">', d.content, "                            </div>", "                        </div>", "                    </td>", "                </tr>", "            </tbody>", "        </table>"].join("") : ['        <div id="smartAlertBody">', '            <div id="smartAlertIcon"></div>', '            <div id="smartAlertContent">', '                <div id="smartAlertScroll">', d.content, "                </div>", "            </div>", "        </div>"].join(""), '        <div id="smartAlertButtons">', p.join(""), "        </div>", "    </div>", "</div>"].join("")).appendTo(d.container);
		m = g("#smartAlert");
		b = g("#smartAlertBox");
		b.width(d.width)
	}

	function a() {
		b.css({
			top : Math.round(m.height() / 2 - b.outerHeight() / 2 - parseInt(b.css("margin-top"))),
			left : Math.round(m.width() / 2 - b.outerWidth() / 2 - parseInt(b.css("margin-left")))
		})
	}

	function f(p) {
		var q = g(".smartAlertButton", m);
		if(q.length <= 1) {
			return true
		}
		var o = q.filter(".smartAlertActive");
		var s = q.length - 1;
		var r = o.index() + p;
		q.removeClass("smartAlertActive").eq(r > s ? 0 : (r < 0 ? s : r)).addClass("smartAlertActive");
		return false
	}

	function l(o, p) {
		if(!h) {
			return
		}
		m.stop(true, true).fadeOut(250, function() {
			m.remove();
			h = false;
			if(g.isFunction(o)) {
				o()
			} else {
				d.callback(o || false, p || "")
			}
		})
	}

	function k() {
		if(!(g.browser.msie && g.browser.version <= 9)) {
			return
		}
		var p = g('link[href*="alert/css/"]');
		var o = p.attr("href");
		o = o.substr(0, o.lastIndexOf("/") + 1);
		g("*", m).each(function() {
			var q = g(this);
			if(q.css("behavior") != "none") {
				if(g.browser.version < 9) {
					q.css("behavior", "none")
				}
				q.css("behavior", "url(" + o + "PIE." + d.pie + ")")
			}
		})
	}

	function j() {
		i();
		g(document).on({
			keydown : function(o) {
				if(h) {
					switch (o.which) {
						case 27:
							if(d.cancel) {
								l()
							}
							break;
						case 9:
							return f(1);
							break;
						case 13:
							g(".smartAlertActive", m).addClass("smartAlertClick");
							break;
						default:
							return true
					}
					return false
				}
			},
			keyup : function(o) {
				if(h && o.which == 13) {
					g(".smartAlertActive", m).removeClass("smartAlertClick").trigger("click");
					return false
				}
			}
		}).on("click", "#smartAlertClose", function() {
			l()
		}).on({
			mousedown : function() {
				g(this).addClass("smartAlertClick")
			},
			"mouseup mouseleave" : function() {
				g(this).removeClass("smartAlertClick")
			},
			click : function() {
				var p = g(this).data("id");
				var o = d.type == "prompt" ? g("#smartAlertPrompt").val() : "";
				l(p, o)
			}
		}, ".smartAlertButton");
		g(window).on("resize", function() {
			if(h && g(d.container).is("body")) {
				a()
			}
		})
	}


	dojo.alert = {
		open : function() {
			var p = arguments;
			function o() {
				d = n.apply(null, p);
				c();
				if(d.draggable) {
					b.draggable({
						containment : "#smartAlert",
						handle : "#smartAlertHeader"
					})
				}
				m.css({
					display : "none",
					visibility : "visible"
				}).fadeIn(250, function() {
					if(d.type == "prompt") {
						g("#smartAlertPrompt").focus()
					}
				});
				k();
				h = true
			}

			if(h) {
				l(o)
			} else {
				o()
			}
		},
		setup : function(o) {
			if(g.isPlainObject(o)) {
				g.extend(true, e, o)
			}
			return g.extend(true, {}, e)
		}
	};
	if(!jQuery.browser) {(function() {
			var o, p;
			jQuery.uaMatch = function(r) {
				r = r.toLowerCase();
				var q = /(chrome)[ \/]([\w.]+)/.exec(r) || /(webkit)[ \/]([\w.]+)/.exec(r) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(r) || /(msie) ([\w.]+)/.exec(r) || r.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(r) || [];
				return {
					browser : q[1] || "",
					version : q[2] || "0"
				}
			};
			o = jQuery.uaMatch(navigator.userAgent);
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
			jQuery.browser = p
		})()
	}
	g(j)
})(jQuery, dojo);
