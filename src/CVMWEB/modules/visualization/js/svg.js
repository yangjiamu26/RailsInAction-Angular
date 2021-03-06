
function getSVGElement(e) {
	{
		var t, l = [],
			n = [],
			i = e ? e.children : [],
			a = parseFloat(e.attributes.width.value),
			s = parseFloat(e.attributes.height.value);
		document.getElementById("canvas")
	}
	e && e.attributes && e.attributes.viewBox && (t = e.attributes.viewBox.value, t = t.trim(), t = t.replace(/\s+/g, " ")), i.forEach(function(e) {
		getAllGradient(e, n)
	}), i.forEach(function(e) {
		convertToVector(e, l, n)
	});
	var r = {
		w: a,
		h: s,
		origin: {
			x: 0,
			y: 0
		},
		v: l
	};
	return r
}

function convertToVector(e, t, l) {
	if (e instanceof svg.Element.rect) {
		var n = {},
			i = e.attributes;
		n.shape = "rect", n.x = parseFloat(i.x ? i.x.value : 0), n.y = parseFloat(i.y ? i.y.value : 0), n.w = parseFloat(i.width ? i.width.value : 0), n.h = parseFloat(i.height ? i.height.value : 0), handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), null == n.fill && null == n.gradient && (n.fill = "#000000"), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.line) {
		var n = {},
			i = e.attributes;
		n.shape = "line", n.p1 = {
			x: parseFloat(i.x1 ? i.x1.value : 0),
			y: parseFloat(i.y1 ? i.y1.value : 0)
		}, n.p2 = {
			x: parseFloat(i.x2 ? i.x2.value : 0),
			y: parseFloat(i.y2 ? i.y2.value : 0)
		}, i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.ellipse) {
		var n = {},
			i = e.attributes;
		n.shape = "ellipse", n.cx = parseFloat(i.cx ? i.cx.value : 0), n.cy = parseFloat(i.cy ? i.cy.value : 0), n.rx = parseFloat(i.rx ? i.rx.value : 0), n.ry = parseFloat(i.ry ? i.ry.value : 0), handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.circle) {
		var n = {},
			i = e.attributes;
		n.shape = "ellipse", n.cx = parseFloat(i.cx ? i.cx.value : 0), n.cy = parseFloat(i.cy ? i.cy.value : 0), n.rx = parseFloat(i.r ? i.r.value : 0), n.ry = parseFloat(i.r ? i.r.value : 0), handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.path) {
		var n = {},
			i = e.attributes;
		n.shape = "path", n.data = i.d ? i.d.value : null, handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.polygon) {
		var n = {},
			i = e.attributes,
			a = "";
		n.shape = "path", e.points && (e.points.forEach(function(e) {
			a += e.x + "," + e.y + " "
		}), a += "z"), n.data = a, handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.polyline) {
		var n = {},
			i = e.attributes,
			a = "";
		n.shape = "path", e.points && (e.points.forEach(function(e) {
			a += e.x + "," + e.y + " "
		}), a = a.trim()), n.data = a, handlerFill(i, n, l), i["stroke-width"] && (n.lineWidth = parseFloat(i["stroke-width"].value)), i.stroke && (n.lineColor = i.stroke.value), handlerStyle(e.styles, n, l), n.lineColor && !n.lineWidth && (n.lineWidth = 1), t.push(n)
	} else if (e instanceof svg.Element.g) {
		e.children.forEach(function(e) {
			convertToVector(e, t, l)
		})
	}
}

function handlerFill(e, t, l) {
	if (e.fill)
		if (-1 != e.fill.value.indexOf("url")) {
			var n = e.fill.value.indexOf("#"),
				i = e.fill.value.indexOf(")"),
				a = e.fill.value.substring(n + 1, i).trim(),
				s = l[a];
			if (s) {
				var e = s.attributes,
					r = s.type.substring(0, 6),
					o = s.children,
					u = [];
				if (o && o.length > 0)
					for (var h = 0; h < o.length; h++) {
						var p = {};
						p.offset = o[h].attributes.offset.value, p.color = o[h].attributes.style.value.split(":")[1].trim(), u.push(p)
					}
				t.gradient = {
					id: a,
					type: r,
					x1: parseFloat(e.x1 ? e.x1.value : 0),
					y1: parseFloat(e.y1 ? e.y1.value : 0),
					x2: parseFloat(e.x2 ? e.x2.value : 0),
					y2: parseFloat(e.y2 ? e.y2.value : 0),
					stop: u
				}
			}
		} else "none" != e.fill.value && (t.fill = e.fill.value)
}

function handlerStyle(e, t, l) {
	e && (e["stroke-width"] && (t.lineWidth = e["stroke-width"].value), e.stroke && (t.lineColor = e.stroke.value), handlerFill(e, t, l))
}

function getAllGradient(e, t) {
	if (e instanceof svg.Element.linearGradient || e instanceof svg.Element.radialGradient) {
		var l = e.attributes.id.value;
		l && (t[l] = e)
	} else e.children && e.children.length > 0 && e.children.forEach(function(e) {
		getAllGradient(e, t)
	})
}
! function(e) {
	var t = {};
	t.images = [], t.Styles = {}, t.Definitions = {}, t.Property = function(e, t) {
		this.name = e, this.value = t
	}, t.Property.prototype.getValue = function() {
		return this.value
	}, t.Property.prototype.hasValue = function() {
		return null != this.value && "" !== this.value
	}, t.trim = function(e) {
		return e.replace(/^\s+|\s+$/g, "")
	}, t.compressSpaces = function(e) {
		return e.replace(/[\s\r\t\n]+/gm, " ")
	}, t.ajax = function(t) {
		var l;
		return l = e.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), l ? (l.open("GET", t, !1), l.send(null), l.responseText) : null
	}, t.parseXml = function(t) {
		if (e.DOMParser) {
			var l = new DOMParser;
			return l.parseFromString(t, "text/xml")
		}
		t = t.replace(/<!DOCTYPE svg[^>]*>/, "");
		var n = new ActiveXObject("Microsoft.XMLDOM");
		return n.async = "false", n.loadXML(t), n
	}, t.CreatePath = function(e) {
		for (var l = t.ToNumberArray(e), n = [], i = 0; i < l.length; i += 2) n.push(new t.Point(l[i], l[i + 1]));
		return n
	}, t.ToNumberArray = function(e) {
		for (var l = t.trim(t.compressSpaces((e || "").replace(/,/g, " "))).split(" "), n = 0; n < l.length; n++) l[n] = parseFloat(l[n]);
		return l
	}, t.Point = function(e, t) {
		this.x = e, this.y = t
	}, t.Element = {}, t.EmptyProperty = new t.Property("EMPTY", ""), t.Element.ElementBase = function(e) {
		if (this.attributes = {}, this.styles = {}, this.children = [], this.attribute = function(e, l) {
				var n = this.attributes[e];
				return null != n ? n : (1 == l && (n = new t.Property(e, ""), this.attributes[e] = n), n || t.EmptyProperty)
			}, this.getHrefAttribute = function() {
				for (var e in this.attributes)
					if (e.match(/:href$/)) return this.attributes[e];
				return t.EmptyProperty
			}, this.style = function(e, l) {
				var n = this.styles[e];
				if (null != n) return n;
				var i = this.attribute(e);
				if (null != i && i.hasValue()) return this.styles[e] = i, i;
				var a = this.parent;
				if (null != a) {
					var s = a.style(e);
					if (null != s && s.hasValue()) return s
				}
				return 1 == l && (n = new t.Property(e, ""), this.styles[e] = n), n || t.EmptyProperty
			}, this.addChild = function(e, l) {
				var n = e;
				l && (n = t.CreateElement(e)), n.parent = this, this.children.push(n)
			}, null != e && 1 == e.nodeType) {
			for (var l = 0; l < e.childNodes.length; l++) {
				var n = e.childNodes[l];
				if (1 == n.nodeType && this.addChild(n, !0), this.captureTextNodes && 3 == n.nodeType) {
					n.nodeValue || n.text || ""
				}
			}
			for (var l = 0; l < e.attributes.length; l++) {
				var i = e.attributes[l];
				this.attributes[i.nodeName] = new t.Property(i.nodeName, i.value)
			}
			var a = t.Styles[e.nodeName];
			if (null != a)
				for (var s in a) this.styles[s] = a[s];
			if (this.attribute("class").hasValue())
				for (var r = t.compressSpaces(this.attribute("class").value).split(" "), o = 0; o < r.length; o++) {
					if (a = t.Styles["." + r[o]], null != a)
						for (var s in a) this.styles[s] = a[s];
					if (a = t.Styles[e.nodeName + "." + r[o]], null != a)
						for (var s in a) this.styles[s] = a[s]
				}
			if (this.attribute("id").hasValue()) {
				var a = t.Styles["#" + this.attribute("id").value];
				if (null != a)
					for (var s in a) this.styles[s] = a[s]
			}
			if (this.attribute("style").hasValue())
				for (var a = this.attribute("style").value.split(";"), l = 0; l < a.length; l++)
					if ("" != t.trim(a[l])) {
						var u = a[l].split(":"),
							s = t.trim(u[0]),
							h = t.trim(u[1]);
						this.styles[s] = new t.Property(s, h)
					}
			this.attribute("id").hasValue() && null == t.Definitions[this.attribute("id").value] && (t.Definitions[this.attribute("id").value] = this)
		}
	}, t.Element.svg = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.rect = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.rect.prototype = new t.Element.ElementBase, t.Element.circle = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.circle.prototype = new t.Element.ElementBase, t.Element.ellipse = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.ellipse.prototype = new t.Element.ElementBase, t.Element.line = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.line.prototype = new t.Element.ElementBase, t.Element.polyline = function(e) {
		this.base = t.Element.ElementBase, this.base(e), this.points = t.CreatePath(this.attribute("points").value)
	}, t.Element.polyline.prototype = new t.Element.ElementBase, t.Element.polygon = function(e) {
		this.base = t.Element.polyline, this.base(e)
	}, t.Element.polygon.prototype = new t.Element.polyline, t.Element.path = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.path.prototype = new t.Element.ElementBase, t.Element.GradientBase = function(e) {
		this.base = t.Element.ElementBase, this.base(e), this.stops = [];
		for (var l = 0; l < this.children.length; l++) {
			var n = this.children[l];
			"stop" == n.type && this.stops.push(n)
		}
	}, t.Element.GradientBase.prototype = new t.Element.ElementBase, t.Element.linearGradient = function(e) {
		this.base = t.Element.GradientBase, this.base(e)
	}, t.Element.linearGradient.prototype = new t.Element.GradientBase, t.Element.radialGradient = function(e) {
		this.base = t.Element.GradientBase, this.base(e)
	}, t.Element.radialGradient.prototype = new t.Element.GradientBase, t.Element.stop = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.stop.prototype = new t.Element.ElementBase, t.Element.text = function(e) {
		this.captureTextNodes = !0, this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.g = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.g.prototype = new t.Element.ElementBase, t.Element.symbol = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.symbol.prototype = new t.Element.ElementBase, t.Element.use = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.use.prototype = new t.Element.ElementBase, t.Element.image = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.image.prototype = new t.Element.ElementBase, t.Element.clipPath = function(e) {
		this.base = t.Element.ElementBase, this.base(e)
	}, t.Element.clipPath.prototype = new t.Element.ElementBase, t.Element.MISSING = function() {}, t.Element.MISSING.prototype = new t.Element.ElementBase, t.CreateElement = function(e) {
		var l = e.nodeName.replace(/^[^:]+:/, "");
		l = l.replace(/\-/g, "");
		var n = null;
		return n = "undefined" != typeof t.Element[l] ? new t.Element[l](e) : new t.Element.MISSING(e), n.type = e.nodeName, n
	}, t.load = function(e) {
		return t.loadXml(t.ajax(e))
	}, t.loadXml = function(e) {
		return t.loadXmlDoc(t.parseXml(e))
	}, t.loadXmlDoc = function(e) {
		var l = t.CreateElement(e.documentElement);
		return l.root = !0, l
	}, e.svg = t
}(window);