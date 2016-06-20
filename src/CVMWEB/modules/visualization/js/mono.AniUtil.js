mono.AniUtil = {};
mono.AniUtil.Easing = TWEEN.Easing;
mono.AniUtil.DefaultEasing = mono.AniUtil.Easing.Linear.None;
mono.AniUtil.AllEasings = {
	"Linear.None": mono.AniUtil.Easing.Linear.None,
	"Quadratic.In": mono.AniUtil.Easing.Quadratic.In,
	"Quadratic.Out": mono.AniUtil.Easing.Quadratic.Out,
	"Quadratic.InOut": mono.AniUtil.Easing.Quadratic.InOut,
	"Cubic.In": mono.AniUtil.Easing.Cubic.In,
	"Cubic.Out": mono.AniUtil.Easing.Cubic.Out,
	"Cubic.InOut": mono.AniUtil.Easing.Cubic.InOut,
	"Quartic.In": mono.AniUtil.Easing.Quartic.In,
	"Quartic.Out": mono.AniUtil.Easing.Quartic.Out,
	"Quartic.InOut": mono.AniUtil.Easing.Quartic.InOut,
	"Quintic.In": mono.AniUtil.Easing.Quintic.In,
	"Quintic.Out": mono.AniUtil.Easing.Quintic.Out,
	"Quintic.InOut": mono.AniUtil.Easing.Quintic.InOut,
	"Sinusoidal.In": mono.AniUtil.Easing.Sinusoidal.In,
	"Sinusoidal.Out": mono.AniUtil.Easing.Sinusoidal.Out,
	"Sinusoidal.InOut": mono.AniUtil.Easing.Sinusoidal.InOut,
	"Exponential.In": mono.AniUtil.Easing.Exponential.In,
	"Exponential.Out": mono.AniUtil.Easing.Exponential.Out,
	"Exponential.InOut": mono.AniUtil.Easing.Exponential.InOut,
	"Circular.In": mono.AniUtil.Easing.Circular.In,
	"Circular.Out": mono.AniUtil.Easing.Circular.Out,
	"Circular.InOut": mono.AniUtil.Easing.Circular.InOut,
	"Elastic.In": mono.AniUtil.Easing.Elastic.In,
	"Elastic.Out": mono.AniUtil.Easing.Elastic.Out,
	"Elastic.InOut": mono.AniUtil.Easing.Elastic.InOut,
	"Back.In": mono.AniUtil.Easing.Back.In,
	"Back.Out": mono.AniUtil.Easing.Back.Out,
	"Back.InOut": mono.AniUtil.Easing.Back.InOut,
	"Bounce.In": mono.AniUtil.Easing.Bounce.In,
	"Bounce.Out": mono.AniUtil.Easing.Bounce.Out,
	"Bounce.InOut": mono.AniUtil.Easing.Bounce.InOut
};

mono.AniUtil.AllEasingNames = [];
for (name in mono.AniUtil.AllEasings) {
	mono.AniUtil.AllEasingNames.push(name);
}
mono.AniUtil.getAllActions = function() {
	return ["", "rotation", "move", "scale"]
};

mono.AniUtil.getAllAnchors = function() {
	return ["", "left", "right", "top", "bottom", "front", "back", "center-x", "center-y", "center-z"]
};

mono.AniUtil.getAllValues = function(e) {
	return [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1, 1.25, 1.5, 1.75, 2, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, -30, -60, -90, -120, -150, -180, -210, -240, -270, -300, -330, -360]
};

mono.AniUtil.oldAnimationTypes = ["LeftMove", "RightMove", "FrontMove", "BackMove", "LeftRotationClockwise90", "LeftRotationAnticlockwise90", "LeftRotationClockwise120", "LeftRotationAnticlockwise120", "CenterRotationClockwise270", "CenterRotationAnticlockwise270"], mono.AniUtil.animate = function(e) {
	requestAnimationFrame(mono.AniUtil.animate), TWEEN.update(e)
};

mono.AniUtil.animate(), mono.AniUtil.createAxisByName = function(e) {
	var t = new mono.XiangliangThree(0, 1, 0);
	return "y" === e && (t = new mono.XiangliangThree(0, 1, 0)), "x" === e && (t = new mono.XiangliangThree(1, 0, 0)), "z" === e && (t = new mono.XiangliangThree(0, 0, 1)), t
};

mono.AniUtil.createAnchorPosition = function(e, t) {
	var i = e.getBoundingBox(),
		n = i.size(),
		o = 0,
		a = 0,
		s = 0;
	return "center" === t.substring(0, 6) || ("left" === t ? o = -n.x / 2 : "right" === t ? o = n.x / 2 : "front" === t ? s = n.z / 2 : "back" === t ? s = -n.z / 2 : "top" === t ? a = n.y / 2 : "bottom" === t && (a = -n.y / 2)), new mono.XiangliangThree(o, a, s)
};

mono.AniUtil.playRotate = function(e, t, i, n, o, a, s, r) {
	var l = mono.AniUtil.createAxisByName(t),
		d = mono.AniUtil.createAnchorPosition(e, i);
	if (!e.__tween) {
		var h = 0,
			c = e.__animated ? n : -n;
		return e.__tweenLastRotation = h, e.__tweenDestRotation = c, e.__animated = !e.__animated, o = o || 1e3, a = a || 0, s = s || mono.AniUtil.DefaultEasing, e.__tween = new TWEEN.Tween({
			v: h
		}).to({
			v: c
		}, o).easing(s).delay(a).onUpdate(function() {
			e.rotateFromAxis(l, d, this.v - e.__tweenLastRotation), e.__tweenLastRotation = this.v
		}).onComplete(function() {
			delete e.__tween, delete e.__tweenLastRotation, delete e.__tweenDestRotation, r && r.apply(e)
		}).start(), e.__tween
	}
};

mono.AniUtil.playScale = function(e, t, i, n, o, a, s) {
	if (!e.__tween) {
		var r = 0,
			l = i || 1;
		1 > i && (r = 1, l = i || 0), n = n || 1e3, o = o || 0, a = a || mono.AniUtil.DefaultEasing, e.__fromPosition = e.getPosition().clone(), e.__fromScale = e.getScale().clone();
		var d, h;
		"top" === t || "bottom" === t ? (d = e.getHeight() / 2, h = "y", "bottom" === t && (d = -1 * d)) : "front" === t || "back" === t ? (d = e.getDepth() / 2, h = "z", "back" === t && (d = -1 * d)) : "left" === t || "right" === t ? (d = e.getWidth() / 2, h = "x", "left" === t && (d = -1 * d)) : "center-x" === t ? h = "x" : "center-y" === t ? h = "y" : "center-z" === t ? h = "z" : (d = e.getHeight() / 2, h = "y");
		var c = e.getPosition()[h] - d * e.getScale()[h],
			g = e.getPosition()[h] / e.getScale()[h] * i;
		return 1 > i && (c = e.getPosition()[h], g = e.getPosition()[h] / e.getScale()[h] * i - d * e.getScale()[h]), console.log(c, g), e.__tween = new TWEEN.Tween({
			scale: r,
			v: c
		}).to({
			scale: l,
			v: g
		}, n).easing(a).delay(o).onUpdate(function() {
			if (d) {
				var t = e.__fromPosition.clone();
				t[h] = this.v, e.setPosition(t)
			}
			var i = e.__fromScale.clone();
			i[h] = this.scale, e.setScale(i)
		}).onComplete(function() {
			delete e.__tween, delete e.__fromPosition, delete e.__fromScale, s && s.apply(e)
		}).start(), e.__tween
	}
};

mono.AniUtil.playMove = function(e, t, i, n, o, a, s) {
	var r;
	("left" === t || "right" === t) && (r = "x", "left" === t && (i = -1 * i)), ("top" === t || "bottom" === t) && (r = "y", "bottom" === t && (i = -1 * i)), ("front" === t || "back" === t) && (r = "z", "back" === t && (i = -1 * i));
	var l = e.getBoundingBox(),
		d = l.max.x - l.min.x,
		h = l.max.y - l.min.y,
		c = l.max.z - l.min.z;
	if ("x" === r && (i *= d), "y" === r && (i *= h), "z" === r && (i *= c), !e.__tween) {
		var g = e.getPosition()[r],
			m = e.__animated ? e.getPosition()[r] - i : e.getPosition()[r] + i;
		return e.__animated = !e.__animated, e.__fromPosition = e.getPosition().clone(), n = n || 1e3, o = o || 0, a = a || mono.AniUtil.DefaultEasing, e.__tween = new TWEEN.Tween({
			v: g
		}).to({
			v: m
		}, n).easing(a).delay(o).onUpdate(function() {
			var t = e.__fromPosition.clone();
			t[r] = this.v, e.setPosition(t)
		}).onComplete(function() {
			delete e.__tween, s && s.apply(e), console.log("complete", g, m, e)
		}).start(), e.__tween
	}
};

mono.AniUtil.getAxisByAnchor = function(e) {
	if ("top" === e || "bottom" === e) return "x";
	if ("left" === e || "right" === e) return "y";
	if ("front" === e || "back" === e) return "y";
	if ("center" === e.substring(0, 6)) {
		var t = e.split("-");
		return t[1]
	}
};

mono.AniUtil.playAnimation = function(e, t, i, n, o, a) {
	if (e && t) {
		if (-1 != mono.AniUtil.oldAnimationTypes.indexOf(t)) switch (t) {
			case "LeftMove":
				t = "move:left:0.9";
				break;
			case "RightMove":
				t = "move:right:0.9";
				break;
			case "FrontMove":
				t = "move:front:0.9";
				break;
			case "BackMove":
				t = "move:back:0.9";
				break;
			case "LeftRotationClockwise90":
				t = "rotation:left:90";
				break;
			case "LeftRotationAnticlockwise90":
				t = "rotation:left:-90";
				break;
			case "LeftRotationClockwise120":
				t = "rotation:left:120";
				break;
			case "LeftRotationAnticlockwise120":
				t = "rotation:left:-120";
				break;
			case "CenterRotationClockwise270":
				t = "rotation:center-y:270";
				break;
			case "CenterRotationAnticlockwise270":
				t = "rotation:center-y:-270"
		}
		i = i || 1e3, n = n || 0, o = o || mono.AniUtil.DefaultEasing;
		var s = t.split(":"),
			r = s[0],
			l = s[1],
			d = parseFloat(s[2]);
		if (s.length > 3 && (i = parseInt(s[3])), s.length > 4 && (n = parseInt(s[4])), s.length > 5 && (o = mono.AniUtil.AllEasings[s[5]]), "rotation" === r) {
			var h = mono.AniUtil.getAxisByAnchor(l);
			return d = d / 180 * Math.PI, mono.AniUtil.playRotate(e, h, l, d, i, n, o, a)
		}
		return "move" === r ? mono.AniUtil.playMove(e, l, d, i, n, o, a) : "scale" === r ? mono.AniUtil.playScale(e, l, d, i, n, o, a) : void 0
	}
};

mono.AniUtil.getAnimationString = function(e, t, i, n, o, a) {
	if (!e || !t || !i) return "";
	var s = e + ":" + t + ":" + i;
	return n && (s += ":" + n), s += o ? ":" + o : ":0", a && (s += ":" + a), s
};

mono.AniUtil.findAnimationAgent = function(e) {
	for (var t = e.getClient("animation"); !t && e.getParent();) t = e.getParent().getClient("animation"), e = e.getParent();
	return t ? e : null
};

mono.AniUtil.playAlarmAnimation = function(e, t, i, n, o, a) {
	if (!e.__tween) {
		var s = 0,
			r = 60;
		return i = i || 1500, n = n || 0, o = o || TWEEN.Easing.Elastic.Out, e.__tween = new TWEEN.Tween({
			scale: s
		}).to({
			scale: r
		}, i).easing(o).delay(n).onUpdate(function() {
			t.setScale(this.scale, this.scale, 1)
		}).onComplete(function() {
			delete e.__tween, a && a.apply()
		}).start()
	}
};

mono.AniUtil.playInspection = function(e, t, i) {
	return t.unshift({
		px: e.getGleye().getPosition().x,
		py: e.getGleye().getPosition().y,
		pz: e.getGleye().getPosition().z,
		tx: e.getGleye().getTarget().x,
		ty: e.getGleye().getTarget().y,
		tz: e.getGleye().getTarget().z
	}), t.__cursor || (t.__cursor = 1), mono.AniUtil._doPlayInspection(e, t, i)
};

mono.AniUtil._doPlayInspection = function(e, t, i) {
	if (t.__cursor < t.length) {
		var n = t[t.__cursor - 1],
			o = t[t.__cursor],
			a = mono.AniUtil._createInspectionTween(e, n, o);
		return a.onComplete(function() {
			t.__cursor++, mono.AniUtil._doPlayInspection(e, t, i)
		}), a.start(), a
	}
	i && i.apply()
};

mono.AniUtil._fixStopMissingValues = function(e, t) {
	null == t.px && (t.px = e.getGleye().getPosition().x), null == t.py && (t.py = e.getGleye().getPosition().y), null == t.pz && (t.pz = e.getGleye().getPosition().z), null == t.tx && (t.tx = e.getGleye().getTarget().x), null == t.ty && (t.ty = e.getGleye().getTarget().y), null == t.tz && (t.tz = e.getGleye().getTarget().z)
};

mono.AniUtil._createInspectionTween = function(e, t, i) {
	var n = i.time ? i.time : 2e3,
		o = i.delay ? i.delay : 0,
		a = i.easing ? i.easing : mono.AniUtil.DefaultEasing;
	return mono.AniUtil._fixStopMissingValues(e, t), mono.AniUtil._fixStopMissingValues(e, i), new TWEEN.Tween(t).to(i, n).easing(a).delay(o).onUpdate(function() {
		e.getGleye().look(new mono.XiangliangThree(this.tx, this.ty, this.tz)), e.getGleye().setPosition(this.px, this.py, this.pz)
	})
};

mono.AniUtil.playTransform = function(e, t, i, n, o, a) {
	i = i || 2e3, n = n || 0, o = o || TWEEN.Easing.Linear.None, mono.AniUtil._fixTransformMissingValues(e, t);
	var s = mono.AniUtil.createElementTransform(e);
	return new TWEEN.Tween(s).to(t, i).easing(o).delay(n).onUpdate(function() {
		e.setPosition(this.px, this.py, this.pz), e.setRotation(this.rx, this.ry, this.rz), e.setScale(this.sx, this.sy, this.sz)
	}).onComplete(function() {
		a && a.apply()
	}).start()
};

mono.AniUtil._fixTransformMissingValues = function(e, t) {
	null == t.px && (t.px = t.getPosition().x), null == t.py && (t.py = t.getPosition().y), null == t.pz && (t.pz = t.getPosition().z), null == t.rx && (t.rx = t.getRotation().x), null == t.ry && (t.ry = t.getRotation().y), null == t.rz && (t.rz = t.getRotation().z), null == t.sx && (t.sx = t.getScale().x), null == t.sy && (t.sy = t.getScale().y), null == t.sz && (t.sz = t.getScale().z)
};

mono.AniUtil.createElementTransform = function(e) {
	return {
		px: e.getPosition().x,
		py: e.getPosition().y,
		pz: e.getPosition().z,
		rx: e.getRotation().x,
		ry: e.getRotation().y,
		rz: e.getRotation().z,
		sx: e.getScale().x,
		sy: e.getScale().y,
		sz: e.getScale().z
	}
};

mono.AniUtil.createTransform = function(e, t, i, n, o, a, s, r, l) {
	return {
		px: e,
		py: t,
		pz: i,
		rx: n,
		ry: o,
		rz: a,
		sx: s,
		sy: r,
		sz: l
	}
};

mono.AniUtil.isAnimated = function(e) {
	return e && null != e.__animated && e.__animated === !0
};

mono.AniUtil.resetAnimation = function(e) {
	if (e) {
		var t = e.getNodes().toArray();
		if (t)
			for (var i = 0; i < t.length; i++) {
				var n = t[i];
				mono.AniUtil.isAnimated(n) && mono.AniUtil.playAnimation(n, n.getClient("animation"))
			}
	}
};

mono.AniUtil.resetAnimatedFlag = function(e) {
	e && (delete e.__animated, delete e.__played)
};

mono.AniUtil.playCameraAnimation = function(e, t, i, n, o, a) {
	if (e && t) {
		i = i || 1e3, n = n || 0, o = o || mono.AniUtil.DefaultEasing;
		var s = t.split(":"),
			r = (s[0], parseFloat(s[1]));
		r = r / 180 * Math.PI;
		var l = mono.AniUtil.createAxisByName("y"),
			d = e.getTarget();
		if (!e.__tween) {
			var h = 0,
				c = r;
			return e.__tweenLastRotation = h, e.__tweenDestRotation = c, e.__tween = new TWEEN.Tween({
				v: h
			}).to({
				v: c
			}, i).easing(o).delay(n).onUpdate(function() {
				var t = v(l, e.getPosition(), d, this.v - e.__tweenLastRotation);
				e.setPosition(t), e.__tweenLastRotation = this.v
			}).onComplete(function() {
				delete e.__tween, delete e.__tweenLastRotation, delete e.__tweenDestRotation, a && a.apply(e)
			}).start(), e.__tween
		}
	}
};