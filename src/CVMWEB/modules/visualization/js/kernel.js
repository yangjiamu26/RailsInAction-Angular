!function(t, e) {
	function r(t, e, i, r, a, n) {
		var s = a.realSize ? a.realSize : a;
		e = e || "", e = String(e), t.font = i, t.fillStyle = r, t.strokeStyle = "gray", t.textBaseline = "middle", t.textAlign = "center";
		for (var o = e.split("\n"), l = o.length, h = s.height / l, c = (a.height - s.height) / 2, u = 0; l > u; u++) {
			var f = ni.getTextSize(i, o[u]).width,
				p = (a.height, f / 2);
			"right" == n ? (p = a.width - f / 2, t.textAlign = "center") : "left" == n ? (p = f / 2, t.textAlign = "center", t.textBaseline = "middle") : "center" == n && (p = a.width / 2), t.strokeText(o[u], p, h / 2 + u * h + c), t.fillText(o[u], p, h / 2 + u * h + c)
		}
	}

	function n(t, e) {
		var i = 0;
		if (t.shadowMatrix)
			for (var r = 0, a = e.size(); a > r; r++) {
				var n = e.get(r);
				n.refreshShadowUniforms(t, i) && i++
			}
	}

	function s(t, e) {
		var i = 0;
		if (t.pShadowMap)
			for (var r = 0, a = e.size(); a > r; r++) {
				var n = e.get(r);
				n.refreshUniformsPointShadow(t, i) && i++
			}
	}

	function o(t, e, i) {
		e._modelViewMatrix || (e._modelViewMatrix = new ti), i.uniformMatrix4fv(t.modelViewMatrix, !1, e._modelViewMatrix.elements), t.normalMatrix && i.uniformMatrix3fv(t.normalMatrix, !1, e._normalMatrix.elements)
	}

	function l(t, e, i) {
		var r;
		return "fragment" === t ? r = i.createShader(i.FRAGMENT_SHADER) : "vertex" === t && (r = i.createShader(i.VERTEX_SHADER)), i.shaderSource(r, e), i.compileShader(r), i.getShaderParameter(r, i.COMPILE_STATUS) ? r : (console.log(i.getShaderInfoLog(r)), console.error(e), null)
	}

	function h(t, e) {
		t.ambientLightColor.value = e.ambient, t.directionalLightColor.value = e.directional.colors, t.directionalLightDirection.value = e.directional.positions, t.pointLightColor.value = e.point.colors, t.pointLightPosition.value = e.point.positions, t.pointLightDistance.value = e.point.distances, t.spotLightColor.value = e.spot.colors, t.spotLightPosition.value = e.spot.positions, t.spotLightDistance.value = e.spot.distances, t.spotLightDirection.value = e.spot.directions, t.spotLightAngleCos.value = e.spot.anglesCos, t.spotLightExponent.value = e.spot.exponents, t.hemisphereLightSkyColor.value = e.hemi.skyColors, t.hemisphereLightGroundColor.value = e.hemi.groundColors, t.hemisphereLightDirection.value = e.hemi.positions
	}

	function f(t, e, i, r) {
		t[e] = i.r * r, t[e + 1] = i.g * r, t[e + 2] = i.b * r
	}

	function p(t, e, i, r) {
		t[e] = i.r * i.r * r, t[e + 1] = i.g * i.g * r, t[e + 2] = i.b * i.b * r
	}

	function d(t) {
		var e = t;
		xi.isNaN(e._renderInterval) && (e._renderInterval = 10), e.__timeOutFunc || (e.__timeOutFunc = function() {
			requestAnimationFrame(e.__timeOutFunc), e.render()
		}), setTimeout(e.__timeOutFunc, e._renderInterval)
	}

	function m(t, e, i) {
		null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
	}

	function g() {
		return new m(null)
	}

	function y(t, e, i, r, a, n) {
		for (; --n >= 0;) {
			var s = e * this[t++] + i[r] + a;
			a = Math.floor(s / 67108864), i[r++] = 67108863 & s
		}
		return a
	}

	function v(t, e, i, r, a, n) {
		for (var s = 32767 & e, o = e >> 15; --n >= 0;) {
			var l = 32767 & this[t],
				h = this[t++] >> 15,
				c = o * l + h * s;
			l = s * l + ((32767 & c) << 15) + i[r] + (1073741823 & a), a = (l >>> 30) + (c >>> 15) + o * h + (a >>> 30), i[r++] = 1073741823 & l
		}
		return a
	}

	function x(t, e, i, r, a, n) {
		for (var s = 16383 & e, o = e >> 14; --n >= 0;) {
			var l = 16383 & this[t],
				h = this[t++] >> 14,
				c = o * l + h * s;
			l = s * l + ((16383 & c) << 14) + i[r] + a, a = (l >> 28) + (c >> 14) + o * h, i[r++] = 268435455 & l
		}
		return a
	}

	function A(t) {
		return Bi.charAt(t)
	}

	function w(t, e) {
		var i = Ni[t.charCodeAt(e)];
		return null == i ? -1 : i
	}

	function _(t) {
		for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
		t.t = this.t, t.s = this.s
	}

	function S(t) {
		this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
	}

	function M(t) {
		var e = g();
		return e.fromInt(t), e
	}

	function C(t, e) {
		var i;
		if (16 == e) i = 4;
		else if (8 == e) i = 3;
		else if (256 == e) i = 8;
		else if (2 == e) i = 1;
		else if (32 == e) i = 5;
		else {
			if (4 != e) return void this.fromRadix(t, e);
			i = 2
		}
		this.t = 0, this.s = 0;
		for (var r = t.length, a = !1, n = 0; --r >= 0;) {
			var s = 8 == i ? 255 & t[r] : w(t, r);
			0 > s ? "-" == t.charAt(r) && (a = !0) : (a = !1, 0 == n ? this[this.t++] = s : n + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - n) - 1) << n, this[this.t++] = s >> this.DB - n) : this[this.t - 1] |= s << n, n += i, n >= this.DB && (n -= this.DB))
		}
		8 == i && 0 != (128 & t[0]) && (this.s = -1, n > 0 && (this[this.t - 1] |= (1 << this.DB - n) - 1 << n)), this.clamp(), a && m.ZERO.subTo(this, this)
	}

	function P() {
		for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
	}

	function T(t) {
		if (this.s < 0) return "-" + this.negate().toString(t);
		var e;
		if (16 == t) e = 4;
		else if (8 == t) e = 3;
		else if (2 == t) e = 1;
		else if (32 == t) e = 5;
		else {
			if (4 != t) return this.toRadix(t);
			e = 2
		}
		var i, r = (1 << e) - 1,
			a = !1,
			n = "",
			s = this.t,
			o = this.DB - s * this.DB % e;
		if (s-- > 0)
			for (o < this.DB && (i = this[s] >> o) > 0 && (a = !0, n = A(i)); s >= 0;) e > o ? (i = (this[s] & (1 << o) - 1) << e - o, i |= this[--s] >> (o += this.DB - e)) : (i = this[s] >> (o -= e) & r, 0 >= o && (o += this.DB, --s)), i > 0 && (a = !0), a && (n += A(i));
		return a ? n : "0"
	}

	function z() {
		var t = g();
		return m.ZERO.subTo(this, t), t
	}

	function L() {
		return this.s < 0 ? this.negate() : this
	}

	function E(t) {
		var e = this.s - t.s;
		if (0 != e) return e;
		var i = this.t;
		if (e = i - t.t, 0 != e) return e;
		for (; --i >= 0;)
			if (0 != (e = this[i] - t[i])) return e;
		return 0
	}

	function D(t) {
		var e, i = 1;
		return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i
	}

	function B() {
		return this.t <= 0 ? 0 : this.DB * (this.t - 1) + D(this[this.t - 1] ^ this.s & this.DM)
	}

	function N(t, e) {
		var i;
		for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
		for (i = t - 1; i >= 0; --i) e[i] = 0;
		e.t = this.t + t, e.s = this.s
	}

	function R(t, e) {
		for (var i = t; i < this.t; ++i) e[i - t] = this[i];
		e.t = Math.max(this.t - t, 0), e.s = this.s
	}

	function I(t, e) {
		var i, r = t % this.DB,
			a = this.DB - r,
			n = (1 << a) - 1,
			s = Math.floor(t / this.DB),
			o = this.s << r & this.DM;
		for (i = this.t - 1; i >= 0; --i) e[i + s + 1] = this[i] >> a | o, o = (this[i] & n) << r;
		for (i = s - 1; i >= 0; --i) e[i] = 0;
		e[s] = o, e.t = this.t + s + 1, e.s = this.s, e.clamp()
	}

	function F(t, e) {
		e.s = this.s;
		var i = Math.floor(t / this.DB);
		if (i >= this.t) return void(e.t = 0);
		var r = t % this.DB,
			a = this.DB - r,
			n = (1 << r) - 1;
		e[0] = this[i] >> r;
		for (var s = i + 1; s < this.t; ++s) e[s - i - 1] |= (this[s] & n) << a, e[s - i] = this[s] >> r;
		r > 0 && (e[this.t - i - 1] |= (this.s & n) << a), e.t = this.t - i, e.clamp()
	}

	function V(t, e) {
		for (var i = 0, r = 0, a = Math.min(t.t, this.t); a > i;) r += this[i] - t[i], e[i++] = r & this.DM, r >>= this.DB;
		if (t.t < this.t) {
			for (r -= t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
			r += this.s
		} else {
			for (r += this.s; i < t.t;) r -= t[i], e[i++] = r & this.DM, r >>= this.DB;
			r -= t.s
		}
		e.s = 0 > r ? -1 : 0, -1 > r ? e[i++] = this.DV + r : r > 0 && (e[i++] = r), e.t = i, e.clamp()
	}

	function U(t, e) {
		var i = this.abs(),
			r = t.abs(),
			a = i.t;
		for (e.t = a + r.t; --a >= 0;) e[a] = 0;
		for (a = 0; a < r.t; ++a) e[a + i.t] = i.am(0, r[a], e, a, 0, i.t);
		e.s = 0, e.clamp(), this.s != t.s && m.ZERO.subTo(e, e)
	}

	function k(t) {
		for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
		for (i = 0; i < e.t - 1; ++i) {
			var r = e.am(i, e[i], t, 2 * i, 0, 1);
			(t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
		}
		t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp()
	}

	function O(t, e, i) {
		var r = t.abs();
		if (!(r.t <= 0)) {
			var a = this.abs();
			if (a.t < r.t) return null != e && e.fromInt(0), void(null != i && this.copyTo(i));
			null == i && (i = g());
			var n = g(),
				s = this.s,
				o = t.s,
				l = this.DB - D(r[r.t - 1]);
			l > 0 ? (r.lShiftTo(l, n), a.lShiftTo(l, i)) : (r.copyTo(n), a.copyTo(i));
			var h = n.t,
				c = n[h - 1];
			if (0 != c) {
				var u = c * (1 << this.F1) + (h > 1 ? n[h - 2] >> this.F2 : 0),
					f = this.FV / u,
					p = (1 << this.F1) / u,
					d = 1 << this.F2,
					y = i.t,
					v = y - h,
					x = null == e ? g() : e;
				for (n.dlShiftTo(v, x), i.compareTo(x) >= 0 && (i[i.t++] = 1, i.subTo(x, i)), m.ONE.dlShiftTo(h, x), x.subTo(n, n); n.t < h;) n[n.t++] = 0;
				for (; --v >= 0;) {
					var A = i[--y] == c ? this.DM : Math.floor(i[y] * f + (i[y - 1] + d) * p);
					if ((i[y] += n.am(0, A, i, v, 0, h)) < A)
						for (n.dlShiftTo(v, x), i.subTo(x, i); i[y] < --A;) i.subTo(x, i)
				}
				null != e && (i.drShiftTo(h, e), s != o && m.ZERO.subTo(e, e)), i.t = h, i.clamp(), l > 0 && i.rShiftTo(l, i), 0 > s && m.ZERO.subTo(i, i)
			}
		}
	}

	function X(t) {
		var e = g();
		return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(m.ZERO) > 0 && t.subTo(e, e), e
	}

	function G(t) {
		this.m = t
	}

	function W(t) {
		return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
	}

	function H(t) {
		return t
	}

	function q(t) {
		t.divRemTo(this.m, null, t)
	}

	function Y(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i)
	}

	function Z(t, e) {
		t.squareTo(e), this.reduce(e)
	}

	function Q() {
		if (this.t < 1) return 0;
		var t = this[0];
		if (0 == (1 & t)) return 0;
		var e = 3 & t;
		return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e
	}

	function K(t) {
		this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
	}

	function J(t) {
		var e = g();
		return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(m.ZERO) > 0 && this.m.subTo(e, e), e
	}

	function $(t) {
		var e = g();
		return t.copyTo(e), this.reduce(e), e
	}

	function tt(t) {
		for (; t.t <= this.mt2;) t[t.t++] = 0;
		for (var e = 0; e < this.m.t; ++e) {
			var i = 32767 & t[e],
				r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
			for (i = e + this.m.t, t[i] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++
		}
		t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
	}

	function et(t, e) {
		t.squareTo(e), this.reduce(e)
	}

	function it(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i)
	}

	function rt() {
		return 0 == (this.t > 0 ? 1 & this[0] : this.s)
	}

	function at(t, e) {
		if (t > 4294967295 || 1 > t) return m.ONE;
		var i = g(),
			r = g(),
			a = e.convert(this),
			n = D(t) - 1;
		for (a.copyTo(i); --n >= 0;)
			if (e.sqrTo(i, r), (t & 1 << n) > 0) e.mulTo(r, a, i);
			else {
				var s = i;
				i = r, r = s
			}
		return e.revert(i)
	}

	function nt(t, e) {
		var i;
		return i = 256 > t || e.isEven() ? new G(e) : new K(e), this.exp(t, i)
	}

	function st() {
		var t = g();
		return this.copyTo(t), t
	}

	function ot() {
		if (this.s < 0) {
			if (1 == this.t) return this[0] - this.DV;
			if (0 == this.t) return -1
		} else {
			if (1 == this.t) return this[0];
			if (0 == this.t) return 0
		}
		return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
	}

	function lt() {
		return 0 == this.t ? this.s : this[0] << 24 >> 24
	}

	function ht() {
		return 0 == this.t ? this.s : this[0] << 16 >> 16
	}

	function ct(t) {
		return Math.floor(Math.LN2 * this.DB / Math.log(t))
	}

	function ut() {
		return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
	}

	function ft(t) {
		if (null == t && (t = 10), 0 == this.signum() || 2 > t || t > 36) return "0";
		var e = this.chunkSize(t),
			i = Math.pow(t, e),
			r = M(i),
			a = g(),
			n = g(),
			s = "";
		for (this.divRemTo(r, a, n); a.signum() > 0;) s = (i + n.intValue()).toString(t).substr(1) + s, a.divRemTo(r, a, n);
		return n.intValue().toString(t) + s
	}

	function pt(t, e) {
		this.fromInt(0), null == e && (e = 10);
		for (var i = this.chunkSize(e), r = Math.pow(e, i), a = !1, n = 0, s = 0, o = 0; o < t.length; ++o) {
			var l = w(t, o);
			0 > l ? "-" == t.charAt(o) && 0 == this.signum() && (a = !0) : (s = e * s + l, ++n >= i && (this.dMultiply(r), this.dAddOffset(s, 0), n = 0, s = 0))
		}
		n > 0 && (this.dMultiply(Math.pow(e, n)), this.dAddOffset(s, 0)), a && m.ZERO.subTo(this, this)
	}

	function dt(t, e, i) {
		if ("number" == typeof e)
			if (2 > t) this.fromInt(1);
			else
				for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(m.ONE.shiftLeft(t - 1), _t, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(m.ONE.shiftLeft(t - 1), this);
		else {
			var r = new Array,
				a = 7 & t;
			r.length = (t >> 3) + 1, e.nextBytes(r), a > 0 ? r[0] &= (1 << a) - 1 : r[0] = 0, this.fromString(r, 256)
		}
	}

	function mt() {
		var t = this.t,
			e = new Array;
		e[0] = this.s;
		var i, r = this.DB - t * this.DB % 8,
			a = 0;
		if (t-- > 0)
			for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[a++] = i | this.s << this.DB - r); t >= 0;) 8 > r ? (i = (this[t] & (1 << r) - 1) << 8 - r, i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255, 0 >= r && (r += this.DB, --t)), 0 != (128 & i) && (i |= -256), 0 == a && (128 & this.s) != (128 & i) && ++a, (a > 0 || i != this.s) && (e[a++] = i);
		return e
	}

	function gt(t) {
		return 0 == this.compareTo(t)
	}

	function yt(t) {
		return this.compareTo(t) < 0 ? this : t
	}

	function vt(t) {
		return this.compareTo(t) > 0 ? this : t
	}

	function xt(t, e, i) {
		var r, a, n = Math.min(t.t, this.t);
		for (r = 0; n > r; ++r) i[r] = e(this[r], t[r]);
		if (t.t < this.t) {
			for (a = t.s & this.DM, r = n; r < this.t; ++r) i[r] = e(this[r], a);
			i.t = this.t
		} else {
			for (a = this.s & this.DM, r = n; r < t.t; ++r) i[r] = e(a, t[r]);
			i.t = t.t
		}
		i.s = e(this.s, t.s), i.clamp()
	}

	function At(t, e) {
		return t & e
	}

	function wt(t) {
		var e = g();
		return this.bitwiseTo(t, At, e), e
	}

	function _t(t, e) {
		return t | e
	}

	function St(t) {
		var e = g();
		return this.bitwiseTo(t, _t, e), e
	}

	function bt(t, e) {
		return t ^ e
	}

	function Mt(t) {
		var e = g();
		return this.bitwiseTo(t, bt, e), e
	}

	function Ct(t, e) {
		return t & ~e
	}

	function Pt(t) {
		var e = g();
		return this.bitwiseTo(t, Ct, e), e
	}

	function Tt() {
		for (var t = g(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
		return t.t = this.t, t.s = ~this.s, t
	}

	function zt(t) {
		var e = g();
		return 0 > t ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
	}

	function Lt(t) {
		var e = g();
		return 0 > t ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
	}

	function Et(t) {
		if (0 == t) return -1;
		var e = 0;
		return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
	}

	function Dt() {
		for (var t = 0; t < this.t; ++t)
			if (0 != this[t]) return t * this.DB + Et(this[t]);
		return this.s < 0 ? this.t * this.DB : -1
	}

	function Bt(t) {
		for (var e = 0; 0 != t;) t &= t - 1, ++e;
		return e
	}

	function Nt() {
		for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += Bt(this[i] ^ e);
		return t
	}

	function Rt(t) {
		var e = Math.floor(t / this.DB);
		return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
	}

	function It(t, e) {
		var i = m.ONE.shiftLeft(t);
		return this.bitwiseTo(i, e, i), i
	}

	function Ft(t) {
		return this.changeBit(t, _t)
	}

	function Vt(t) {
		return this.changeBit(t, Ct)
	}

	function Ut(t) {
		return this.changeBit(t, bt)
	}

	function kt(t, e) {
		for (var i = 0, r = 0, a = Math.min(t.t, this.t); a > i;) r += this[i] + t[i], e[i++] = r & this.DM, r >>= this.DB;
		if (t.t < this.t) {
			for (r += t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
			r += this.s
		} else {
			for (r += this.s; i < t.t;) r += t[i], e[i++] = r & this.DM, r >>= this.DB;
			r += t.s
		}
		e.s = 0 > r ? -1 : 0, r > 0 ? e[i++] = r : -1 > r && (e[i++] = this.DV + r), e.t = i, e.clamp()
	}

	function Ot(t) {
		var e = g();
		return this.addTo(t, e), e
	}

	function Xt(t) {
		var e = g();
		return this.subTo(t, e), e
	}

	function Gt(t) {
		var e = g();
		return this.multiplyTo(t, e), e
	}

	function Wt() {
		var t = g();
		return this.squareTo(t), t
	}

	function Ht(t) {
		var e = g();
		return this.divRemTo(t, e, null), e
	}

	function jt(t) {
		var e = g();
		return this.divRemTo(t, null, e), e
	}

	function qt(t) {
		var e = g(),
			i = g();
		return this.divRemTo(t, e, i), new Array(e, i)
	}

	function Yt(t) {
		this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
	}

	function Zt(t, e) {
		if (0 != t) {
			for (; this.t <= e;) this[this.t++] = 0;
			for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
		}
	}

	function Qt() {}

	function Kt(t) {
		return t
	}

	function Jt(t, e, i) {
		t.multiplyTo(e, i)
	}

	function $t(t, e) {
		t.squareTo(e)
	}

	function te(t) {
		return this.exp(t, new Qt)
	}

	function ee(t, e, i) {
		var r = Math.min(this.t + t.t, e);
		for (i.s = 0, i.t = r; r > 0;) i[--r] = 0;
		var a;
		for (a = i.t - this.t; a > r; ++r) i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
		for (a = Math.min(t.t, e); a > r; ++r) this.am(0, t[r], i, r, 0, e - r);
		i.clamp()
	}

	function ie(t, e, i) {
		--e;
		var r = i.t = this.t + t.t - e;
		for (i.s = 0; --r >= 0;) i[r] = 0;
		for (r = Math.max(e - this.t, 0); r < t.t; ++r) i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
		i.clamp(), i.drShiftTo(1, i)
	}

	function re(t) {
		this.r2 = g(), this.q3 = g(), m.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
	}

	function ae(t) {
		if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
		if (t.compareTo(this.m) < 0) return t;
		var e = g();
		return t.copyTo(e), this.reduce(e), e
	}

	function ne(t) {
		return t
	}

	function se(t) {
		for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
		for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
	}

	function oe(t, e) {
		t.squareTo(e), this.reduce(e)
	}

	function le(t, e, i) {
		t.multiplyTo(e, i), this.reduce(i)
	}

	function he(t, e) {
		var i, r, a = t.bitLength(),
			n = M(1);
		if (0 >= a) return n;
		i = 18 > a ? 1 : 48 > a ? 3 : 144 > a ? 4 : 768 > a ? 5 : 6, r = 8 > a ? new G(e) : e.isEven() ? new re(e) : new K(e);
		var s = new Array,
			o = 3,
			l = i - 1,
			h = (1 << i) - 1;
		if (s[1] = r.convert(this), i > 1) {
			var c = g();
			for (r.sqrTo(s[1], c); h >= o;) s[o] = g(), r.mulTo(c, s[o - 2], s[o]), o += 2
		}
		var u, f, p = t.t - 1,
			d = !0,
			m = g();
		for (a = D(t[p]) - 1; p >= 0;) {
			for (a >= l ? u = t[p] >> a - l & h : (u = (t[p] & (1 << a + 1) - 1) << l - a, p > 0 && (u |= t[p - 1] >> this.DB + a - l)), o = i; 0 == (1 & u);) u >>= 1, --o;
			if ((a -= o) < 0 && (a += this.DB, --p), d) s[u].copyTo(n), d = !1;
			else {
				for (; o > 1;) r.sqrTo(n, m), r.sqrTo(m, n), o -= 2;
				o > 0 ? r.sqrTo(n, m) : (f = n, n = m, m = f), r.mulTo(m, s[u], n)
			}
			for (; p >= 0 && 0 == (t[p] & 1 << a);) r.sqrTo(n, m), f = n, n = m, m = f, --a < 0 && (a = this.DB - 1, --p)
		}
		return r.revert(n)
	}

	function ce(t) {
		var e = this.s < 0 ? this.negate() : this.clone(),
			i = t.s < 0 ? t.negate() : t.clone();
		if (e.compareTo(i) < 0) {
			var r = e;
			e = i, i = r
		}
		var a = e.getLowestSetBit(),
			n = i.getLowestSetBit();
		if (0 > n) return e;
		for (n > a && (n = a), n > 0 && (e.rShiftTo(n, e), i.rShiftTo(n, i)); e.signum() > 0;)(a = e.getLowestSetBit()) > 0 && e.rShiftTo(a, e), (a = i.getLowestSetBit()) > 0 && i.rShiftTo(a, i), e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
		return n > 0 && i.lShiftTo(n, i), i
	}

	function ue(t) {
		if (0 >= t) return 0;
		var e = this.DV % t,
			i = this.s < 0 ? t - 1 : 0;
		if (this.t > 0)
			if (0 == e) i = this[0] % t;
			else
				for (var r = this.t - 1; r >= 0; --r) i = (e * i + this[r]) % t;
		return i
	}

	function fe(t) {
		var e = t.isEven();
		if (this.isEven() && e || 0 == t.signum()) return m.ZERO;
		for (var i = t.clone(), r = this.clone(), a = M(1), n = M(0), s = M(0), o = M(1); 0 != i.signum();) {
			for (; i.isEven();) i.rShiftTo(1, i), e ? (a.isEven() && n.isEven() || (a.addTo(this, a), n.subTo(t, n)), a.rShiftTo(1, a)) : n.isEven() || n.subTo(t, n), n.rShiftTo(1, n);
			for (; r.isEven();) r.rShiftTo(1, r), e ? (s.isEven() && o.isEven() || (s.addTo(this, s), o.subTo(t, o)), s.rShiftTo(1, s)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
			i.compareTo(r) >= 0 ? (i.subTo(r, i), e && a.subTo(s, a), n.subTo(o, n)) : (r.subTo(i, r), e && s.subTo(a, s), o.subTo(n, o))
		}
		return 0 != r.compareTo(m.ONE) ? m.ZERO : o.compareTo(t) >= 0 ? o.subtract(t) : o.signum() < 0 ? (o.addTo(t, o), o.signum() < 0 ? o.add(t) : o) : o
	}

	function pe(t) {
		var e, i = this.abs();
		if (1 == i.t && i[0] <= Ri[Ri.length - 1]) {
			for (e = 0; e < Ri.length; ++e)
				if (i[0] == Ri[e]) return !0;
			return !1
		}
		if (i.isEven()) return !1;
		for (e = 1; e < Ri.length;) {
			for (var r = Ri[e], a = e + 1; a < Ri.length && Ii > r;) r *= Ri[a++];
			for (r = i.modInt(r); a > e;)
				if (r % Ri[e++] == 0) return !1
		}
		return i.millerRabin(t)
	}

	function de(t) {
		var e = this.subtract(m.ONE),
			i = e.getLowestSetBit();
		if (0 >= i) return !1;
		var r = e.shiftRight(i);
		t = t + 1 >> 1, t > Ri.length && (t = Ri.length);
		for (var a = g(), n = 0; t > n; ++n) {
			a.fromInt(Ri[Math.floor(Math.random() * Ri.length)]);
			var s = a.modPow(r, this);
			if (0 != s.compareTo(m.ONE) && 0 != s.compareTo(e)) {
				for (var o = 1; o++ < i && 0 != s.compareTo(e);)
					if (s = s.modPowInt(2, this), 0 == s.compareTo(m.ONE)) return !1;
				if (0 != s.compareTo(e)) return !1
			}
		}
		return !0
	}

	function me() {
		this.i = 0, this.j = 0, this.S = new Array
	}

	function ge(t) {
		var e, i, r;
		for (e = 0; 256 > e; ++e) this.S[e] = e;
		for (i = 0, e = 0; 256 > e; ++e) i = i + this.S[e] + t[e % t.length] & 255, r = this.S[e], this.S[e] = this.S[i], this.S[i] = r;
		this.i = 0, this.j = 0
	}

	function ye() {
		var t;
		return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
	}

	function ve() {
		return new me
	}

	function xe(t) {
		Vi[Ui++] ^= 255 & t, Vi[Ui++] ^= t >> 8 & 255, Vi[Ui++] ^= t >> 16 & 255, Vi[Ui++] ^= t >> 24 & 255, Ui >= ki && (Ui -= ki)
	}

	function Ae() {
		xe((new Date).getTime())
	}

	function we() {
		if (null == Fi) {
			for (Ae(), Fi = ve(), Fi.init(Vi), Ui = 0; Ui < Vi.length; ++Ui) Vi[Ui] = 0;
			Ui = 0
		}
		return Fi.next()
	}

	function _e(t) {
		var e;
		for (e = 0; e < t.length; ++e) t[e] = we()
	}

	function Se() {}

	function be(t, e) {
		return new m(t, e)
	}

	function Me(t, e) {
		if (e < t.length + 11) return null;
		for (var i = new Array, r = t.length - 1; r >= 0 && e > 0;) {
			var a = t.charCodeAt(r--);
			128 > a ? i[--e] = a : a > 127 && 2048 > a ? (i[--e] = 63 & a | 128, i[--e] = a >> 6 | 192) : (i[--e] = 63 & a | 128, i[--e] = a >> 6 & 63 | 128, i[--e] = a >> 12 | 224)
		}
		i[--e] = 0;
		for (var n = new Se, s = new Array; e > 2;) {
			for (s[0] = 0; 0 == s[0];) n.nextBytes(s);
			i[--e] = s[0]
		}
		return i[--e] = 2, i[--e] = 0, new m(i)
	}

	function Ce() {
		this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
	}

	function Pe(t, e) {
		this.n = be(t, 16), this.e = parseInt(e, 16)
	}

	function Te(t) {
		return t.modPowInt(this.e, this.n)
	}

	function ze(t) {
		var e = Me(t, this.n.bitLength() + 7 >> 3);
		if (null == e) return null;
		var i = this.doPrivate(e);
		if (null == i) return null;
		var r = i.toString(16);
		return 0 == (1 & r.length) ? r : "0" + r
	}

	function Le(t, e) {
		for (var i = t.toByteArray(), r = 0; r < i.length && 0 == i[r];) ++r;
		if (i.length - r != e - 1 || 2 != i[r]) return null;
		for (++r; 0 != i[r];)
			if (++r >= i.length) return null;
		for (var a = ""; ++r < i.length;) {
			var n = 255 & i[r];
			128 > n ? a += String.fromCharCode(n) : n > 191 && 224 > n ? (a += String.fromCharCode((31 & n) << 6 | 63 & i[r + 1]), ++r) : (a += String.fromCharCode((15 & n) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]), r += 2)
		}
		return a
	}

	function Ee(t, e, i) {
		this.n = be(t, 16), this.e = parseInt(e, 16), this.d = be(i, 16)
	}

	function De(t, e, i, r, a, n, s, o) {
		this.n = be(t, 16), this.e = parseInt(e, 16), this.d = be(i, 16), this.p = be(r, 16), this.q = be(a, 16), this.dmp1 = be(n, 16), this.dmq1 = be(s, 16), this.coeff = be(o, 16)
	}

	function Be(t) {
		if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
		for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;) e = e.add(this.p);
		return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
	}

	function Ne(t) {
		var e = be(t, 16),
			i = this.doPublic(e);
		return null == i ? null : Le(i, this.n.bitLength() + 7 >> 3)
	}

	function Re(t, e) {
		t.diffuse.value = e.color, t.opacity.value = e.opacity
	}

	function Ie(t, e) {
		t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
	}

	function Fe(t, e) {
		t.psColor.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size, t.map.value = e.map
	}

	function Ve(t, e) {
		return t.distance - e.distance
	}

	function Ue(t, e, i, r, a) {
		(t instanceof Qe.Node || t instanceof Qe.Billboard) && Oe(t, e, i, r, a)
	}

	function ke(t, i, r, a, n) {
		if (t !== e)
			for (var s = t.getDescendants(), o = 0, l = s.length; l > o; o++) Ue(s[o], i, r, a, n)
	}

	function Oe(t, i, r, a, n) {
		if (a || 0 != n.isVisible(t)) {
			if (t instanceof Qe.Billboard) {
				var s = i.matrixPosition;
				s.setFromMatrixPosition(t.worldMatrix);
				var o = i.ray.distanceToPoint(s),
					l = t.material.alignment,
					h = new Qe.Plane(1, 1);
				(l.x || l.y) && (h.setPosition(l.x, l.y, 0), h = Qe.Utils.transformElement(h, !0)), h.setPosition(s);
				var c = (new Je).getScaleFromMatrix(t.worldMatrix);
				h.setScale(c.x, c.y, 1);
				var u = i.direction.clone(),
					f = h.getPosition().clone(),
					p = t.material;
				p && p.vertical && (u.y = 0), f.sub(u), h.lookAt(f), h.updateWorldMatrix(!0);
				var d = [];
				return Oe(h, i, d, !0, n), 0 === d.length ? r : (r.push({
					distance: d[0].distance,
					point: t._position,
					face: null,
					object: t,
					element: t
				}), r)
			}
			if (t instanceof Qe.Line) {
				var m = 1;
				m -= 1;
				var g = Math.sqrt(i.linePrecision + m),
					y = g * g,
					v = t;
				if (null == v.boundingSphere && v.computeBoundingSphere(), nr.copy(v.boundingSphere), nr.applyMatrix4(t.worldMatrix), i.ray.isIntersectionSphere(nr) === !1) return r;
				ir.getInverse(t.worldMatrix), er.copy(i.ray).transform(ir);
				for (var x = v.vertices, A = x.length, w = new Je, _ = new Je, S = t.type === Qe.LineStrip ? 1 : 2, b = 0; A - 1 > b; b += S) {
					var M = er.distanceSqToSegment(x[b], x[b + 1], _, w);
					if (!(M > y)) {
						var o = er.origin.distanceTo(_);
						o < i.near || o > i.far || r.push({
							distance: o,
							point: w.clone().applyMatrix4(t.worldMatrix),
							face: null,
							faceIndex: null,
							element: t,
							object: t
						})
					}
				}
				return r
			}
			if (null === t.boundingSphere && t.computeBoundingSphere(), nr.set(t.worldMatrix.getPosition(), t.boundingSphere.radius * t.worldMatrix.getMaxScaleOnAxis()), !i.ray.isIntersectionSphere(nr)) return r;
			var C, P, T, z, v = t,
				x = v.vertices,
				L = t.material instanceof Qe.ArrayMaterial,
				E = L === !0 ? t.material.materials : null,
				D = t.material.side,
				g = i.precision;
			t.rotationWorldMatrix.extractRotation(t.worldMatrix), ir.getInverse(t.worldMatrix), er.copy(i.ray).transform(ir);
			for (var B = 0, N = v.faces.length; N > B; B++) {
				var R = v.faces[B],
					I = L === !0 ? E[R.materialIndex] : t.material;
				if (I !== e && I.visible !== !1 && (v.visible !== !1 || a)) {
					rr.setFromNormalAndCoplanarPoint(R.normal, x[R.a]);
					var F = er.distanceToPlane(rr);
					if (!(Math.abs(F) < g || 0 > F)) {
						D = I.side;
						var V = er.direction.dot(rr.normal);
						if ((D === Qe.DoubleSide || (D === Qe.FrontSide ? 0 > V : V > 0)) && !(F < i.near || F > i.far)) {
							ar = er.at(F, ar);
							var U, k = new Je,
								O = (R.materialIndex, !1);
							if (n && n._selectTransparencyThreshold > 0 && (O = 1 == I.transparent || I.alphaTest > 0), R instanceof Qe.Face3) {
								if (C = x[R.a], P = x[R.b], T = x[R.c], !Qe.Triangle.containsPoint(ar, C, P, T)) continue;
								k = Qe.Triangle.barycoordFromPoint(ar, C, P, T)
							} else {
								if (!(R instanceof Qe.Face4)) throw Error("face type not supported");
								C = x[R.a], P = x[R.b], T = x[R.c], z = x[R.d];
								var X = Qe.Triangle.containsPoint(ar, C, P, z),
									G = Qe.Triangle.containsPoint(ar, P, T, z);
								if (!X && !G) continue;
								X ? k = Qe.Triangle.barycoordFromPoint(ar, C, P, z) : (k = Qe.Triangle.barycoordFromPoint(ar, P, T, z), U = !0)
							}
							var W = new Ke,
								H = k.z,
								j = k.x,
								q = k.y;
							if (v.uvs && v.uvs[B]) {
								var Y = v.uvs[B];
								R instanceof Qe.Face3 ? (W.x = Y[0].x * j + Y[1].x * q + Y[2].x * H, W.y = Y[0].y * j + Y[1].y * q + Y[2].y * H) : U ? (W.x = Y[1].x * j + Y[2].x * q + Y[3].x * H, W.y = Y[1].y * j + Y[2].y * q + Y[3].y * H) : (W.x = Y[0].x * j + Y[1].x * q + Y[3].x * H, W.y = Y[0].y * j + Y[1].y * q + Y[3].y * H)
							}
							var Z, Q = 1;
							if (W = n.debugUV || W, O) {
								if (null == I.map) Q = I.opacity;
								else {
									Z = I.map._image;
									var K = xi.getPixelFromImage(Z, W.x, W.y);
									Q = K[3] / 255 * (null == I.opacity ? 1 : I.opacity)
								}
								Q < I.alphaTest ? Q = 0 : 0 == I.transparent && (Q = 1)
							}
							Q < n._selectTransparencyThreshold || r.push({
								distance: F,
								point: i.ray.at(F),
								face: R,
								uv: W,
								faceIndex: B,
								element: t,
								object: t,
								side: V > 0 ? 1 : -1
							})
						}
					}
				}
			}
		}
	}

	function Xe(t) {
		if (!gr[t.id]) {
			if (vr = !0, gr[t.id] = t, t.finish = null == t.finish ? t.delay + t.dur + t.interval : t.finish, null == t.from && t.attr && t.source) {
				var e;
				(e = t.attr.match(/^S[:@](.*)/i)) ? t.from = t.source.getStyle(e[1]): (e = t.attr.match(/^C[:@](.*)/i)) ? t.from = t.source.getClient(e[1]) : t.from = twaver.Util.getValue(t.source, t.attr)
			}
			Ge(t), We(t)
		}
		return t
	}

	function Ge(t) {
		var e = t.type,
			i = t.from,
			r = t.to;
		"number" === e ? (t.from = i || 0, t.to = r || 0) : "point" === e ? (i ? i.length && (t.from = {
			x: i[0],
			y: i[1]
		}) : t.from = "scale" === t.attr ? {
			x: 1,
			y: 1
		} : {
			x: 0,
			y: 0
		}, r ? r.length && (t.to = {
			x: r[0],
			y: r[1]
		}) : t.to = "scale" === t.attr ? {
			x: 1,
			y: 1
		} : {
			x: 0,
			y: 0
		}) : "rect" === e ? (i ? i.length && (t.from = {
			x: i[0],
			y: i[1],
			w: i[2],
			h: i[3]
		}) : t.from = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		}, r ? r.length && (t.to = {
			x: r[0],
			y: r[1],
			w: r[2],
			h: r[3]
		}) : t.to = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		}) : "color" === e ? (t.from = getColorValue(i), t.to = getColorValue(r)) : "set" !== e && "group_set" === e, t.current = t.from
	}

	function We(t) {
		var e = t.type,
			i = t.from,
			r = t.to;
		"number" === e ? t.delta = r - i : "point" === e ? t.delta = {
			x: r.x - i.x,
			y: r.y - i.y
		} : "rect" === e ? t.delta = {
			x: r.x - i.x,
			y: r.y - i.y,
			w: r.w - i.w,
			h: r.h - i.h
		} : "color" === e ? t.delta = {
			r: r.r - i.r,
			g: r.g - i.g,
			b: r.b - i.b,
			a: r.a - i.a
		} : "set" !== e && "group_set" === e
	}

	function He(t, e) {
		return gr[t.id] && (null == e && (e = !0), e && Ze(t, t.to), t.onStop && t.onStop(), t.time = 0, t.total = 0, t.start = null, t.count = 0, t.started = !1, t.stopped = !1, delete gr[t.id]), t
	}

	function je(t) {
		null == t && (t = !0), Object.keys(gr).forEach(function(e) {
			var i = gr[e];
			t && Ze(i, i.to), i.onStop && i.onStop()
		}), gr = {}
	}

	function qe(t) {
		Object.keys(gr).forEach(function(e) {
			var i = gr[e];
			if (i) {
				if (null == i.start && (i.start = t), i.total = t - i.start, i.total > i.delay) {
					i.time = i.total - i.delay;
					var r = !1;
					if (i.time >= i.dur && (i.time = i.dur, r = !0), !i.stopped && Ze(i, Ye(i)), i.stopped = r, i.total >= i.finish)
						if (i.count++, i.count >= i.repeat) He(i, !1), i.onDone && i.onDone();
						else if (i.time = 0, i.total = 0, i.start = null, i.stopped = !1, i.reverse) {
						var a = i.from;
						i.from = i.to, i.to = a, We(i)
					}
				}!vr && (vr = !0)
			}
		})
	}

	function Ye(t, e) {
		var i = t.type,
			r = t.delta,
			a = t.from,
			n = t.time,
			s = t.dur,
			o = hi[t.easing || "easeNone"];
		return o || (o = hi.easeNone), "number" === i ? e = o(n, a, r, s) : "point" === i ? e = {
			x: o(n, a.x, r.x, s),
			y: o(n, a.y, r.y, s)
		} : "rect" === i ? e = {
			x: o(n, a.x, r.x, s),
			y: o(n, a.y, r.y, s),
			w: o(n, a.w, r.w, s),
			h: o(n, a.h, r.h, s)
		} : "color" === i ? e = "rgba(" + Math.floor(o(n, a.r, r.r, s)) + "," + Math.floor(o(n, a.g, r.g, s)) + "," + Math.floor(o(n, a.b, r.b, s)) + "," + Math.floor(o(n, a.a, r.a, s)) + ")" : "set" === i ? t.time && (e = t.to) : "group_set" === i && (e = t.to[t.groupIndex]), t.current = e, e
	}

	function Ze(t, e) {
		if (t.started || (t.started = !0, t.onPlay && t.onPlay()), t.filter && (e = t.filter(e)), t.attr && t.source) {
			var i;
			(i = t.attr.match(/^S[:@](.*)/i)) ? t.source.setStyle(i[1], e): (i = t.attr.match(/^C[:@](.*)/i)) ? t.source.setClient(i[1], e) : twaver.Util.setValue(t.source, t.attr, e)
		}
		t.onUpdate && t.onUpdate(e)
	}
	self.Int32Array = self.Int32Array || Array, self.Float32Array = self.Float32Array || Array, Object.create = Object.create || function(t) {
		var e = function() {};
		return e.prototype = t, new e
	};
	var Qe = {
		version: "2.0.5",
		_id: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
		id: function(t) {
			t = null == t ? "" : t;
			for (var e = [], i = 0; 32 > i; i++) e[i] = this._id[Math.floor(16 * Math.random())];
			return e[12] = "4", e[16] = this._id[3 & e[16] | 8], t + e.join("")
		},
		ip: function(t, e, i, r) {
			var a = i + e;
			t[Qe.getter(e, r)] = function() {
				return this[a]
			}, t[Qe.setter(e)] = function(t) {
				if (this.setPropertyValue) this.setPropertyValue(a, t) && (this.onPropertyChange(e, i, t), this.firePropertyChange(e, i, t));
				else {
					var i = this[a];
					if (i === t) return;
					this[a] = t, this.onPropertyChange(e, i, t), this.firePropertyChange(e, i, t)
				}
			}
		},
		getter: function(t, e) {
			var i = t.charAt(0).toUpperCase() + t.slice(1),
				r = /ble$/.test(t) || /ed$/.test(t) ? "is" : "get";
			return e && -1 != e.indexOf(t) && (r = "is"), r + i
		},
		setter: function(t) {
			var e = t.charAt(0).toUpperCase() + t.slice(1);
			return "set" + e
		},
		getValue: function(t, e, i) {
			var r = e.charAt(0).toUpperCase() + e.slice(1),
				a = "get" + r,
				n = "is" + r;
			return i ? "boolean" === i ? t[n]() : (null == t[a] && console.log("get Function " + a + " not exist"), t[a]()) : t[a] ? t[a]() : t[n] ? t[n]() : t[e]
		},
		setValue: function(t, e, i) {
			t["set" + e.charAt(0).toUpperCase() + e.slice(1)](i)
		},
		clone: function(t) {
			if (!t) return null;
			var e = {};
			for (var i in t) e[i] = t[i];
			return e
		},
		addMethod: function(t, e) {
			var i = t.prototype;
			for (var r in e) i[r] = e[r]
		},
		classCache: {},
		getClass: function(e) {
			var i = Qe.classCache[e];
			if (!i) {
				var r = e.split("."),
					a = r.length;
				i = t;
				for (var n = 0; a > n; n++) i = i[r[n]];
				Qe.classCache[e] = i
			}
			return i
		},
		newInstance: function(t) {
			"string" == typeof t && (t = Qe.getClass(t), t = t.prototype);
			var e = t.constructor;
			if (!e) return null;
			var i = arguments.length,
				r = arguments;
			if (1 === i) return new e;
			if (2 === i) return new e(r[1]);
			if (3 === i) return new e(r[1], r[2]);
			if (4 === i) return new e(r[1], r[2], r[3]);
			if (5 === i) return new e(r[1], r[2], r[3], r[4]);
			if (6 === i) return new e(r[1], r[2], r[3], r[4], r[5]);
			if (7 === i) return new e(r[1], r[2], r[3], r[4], r[5], r[6]);
			if (8 === i) return new e(r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
			throw "don't support args more than 7"
		},
		xml: function(e) {
			if (t.DOMParser) return (new DOMParser).parseFromString(e, "text/xml");
			var i = new ActiveXObject("Microsoft.XmlDOM");
			return i.async = !1, i.loadXml(e), i
		}
	};
	t.TGL = Qe, t.mono = Qe;
	Qe.extend = function(t, e, i) {
			if (e) {
				var r = function() {};
				r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t, t.superClass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e)
			}
			var a = t.prototype;
			if (i) {
				a.getClassName = function() {
					return i.className
				};
				for (var n in i) {
					if ("__accessor" === n)
						for (var s = i.__accessor, o = i.__bool, l = 0; l < s.length; l++) {
							var h = s[l];
							Qe.ip(a, h, "", o)
						} else if ("___accessor" === n)
							for (var s = i.___accessor, l = 0; l < s.length; l++) {
								var h = s[l];
								Qe.ip(a, h, "_", o)
							}
						a[n] = i[n]
				}
				i.constructor && (a.newInstance = function() {
					return Qe.newInstance(this)
				})
			}
		}, Qe.defaultEulerOrder = "XYZ", String.prototype.startsWith = String.prototype.startsWith || function(t) {
			return this.slice(0, t.length) === t
		}, String.prototype.endsWith = String.prototype.endsWith || function(t) {
			var e = String(t),
				i = this.lastIndexOf(e);
			return (i > -1 && i) === this.length - e.length
		}, String.prototype.trim = String.prototype.trim || function() {
			return this.replace(/^\s+|\s+$/g, "")
		},
		function() {
			for (var i = 0, r = ["ms", "moz", "webkit", "o"], a = 0; a < r.length && !t.requestAnimationFrame; ++a) t.requestAnimationFrame = t[r[a] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[r[a] + "CancelAnimationFrame"] || t[r[a] + "CancelRequestAnimationFrame"];
			t.requestAnimationFrame === e && (t.requestAnimationFrame = function(e, r) {
				var a = Date.now(),
					n = Math.max(0, 16 - (a - i)),
					s = t.setTimeout(function() {
						e(a + n)
					}, n);
				return i = a + n, s
			}), t.cancelAnimationFrame = t.cancelAnimationFrame || function(e) {
				t.clearTimeout(e)
			}
		}(), Qe.CullFaceNone = 0, Qe.CullFaceBack = 1, Qe.CullFaceFront = 2, Qe.CullFaceFrontBack = 3, Qe.FrontFaceDirectionCW = 0, Qe.FrontFaceDirectionCCW = 1, Qe.BasicShadowMap = 0, Qe.PCFShadowMap = 1, Qe.PCFSoftShadowMap = 2, Qe.FrontSide = "front", Qe.BackSide = "back", Qe.DoubleSide = "both", Qe.BothSide = "both", Qe.NoShading = 0, Qe.FlatShading = 1, Qe.SmoothShading = 2, Qe.NormalTypeFlat = "flat", Qe.NormalTypeSmooth = "smooth", Qe.NoColors = 0, Qe.FaceColors = 1, Qe.VertexColors = 2, Qe.NoBlending = 0, Qe.NormalBlending = 1, Qe.AdditiveBlending = 2, Qe.SubtractiveBlending = 3, Qe.MultiplyBlending = 4, Qe.CustomBlending = 5, Qe.AddEquation = 100, Qe.SubtractEquation = 101, Qe.ReverseSubtractEquation = 102, Qe.ZeroFactor = 200, Qe.OneFactor = 201, Qe.SrcColorFactor = 202, Qe.OneMinusSrcColorFactor = 203, Qe.SrcAlphaFactor = 204, Qe.OneMinusSrcAlphaFactor = 205, Qe.DstAlphaFactor = 206, Qe.OneMinusDstAlphaFactor = 207, Qe.DstColorFactor = 208, Qe.OneMinusDstColorFactor = 209, Qe.SrcAlphaSaturateFactor = 210, Qe.MultiplyOperation = 0, Qe.MixOperation = 1, Qe.AddOperation = 2, Qe.UVMapping = function() {}, Qe.CubeReflectionMapping = function() {}, Qe.CubeRefractionMapping = function() {}, Qe.SphericalReflectionMapping = function() {}, Qe.SphericalRefractionMapping = function() {}, Qe.RepeatWrapping = "repeat", Qe.ClampToEdgeWrapping = "clamp", Qe.MirroredRepeatWrapping = "mirrored", Qe.NearestFilter = 1003, Qe.NearestMipMapNearestFilter = 1004, Qe.NearestMipMapLinearFilter = 1005, Qe.LinearFilter = 1006, Qe.LinearMipMapNearestFilter = 1007, Qe.LinearMipMapLinearFilter = 1008, Qe.UnsignedByteType = 1009, Qe.ByteType = 1010, Qe.ShortType = 1011, Qe.UnsignedShortType = 1012, Qe.IntType = 1013, Qe.UnsignedIntType = 1014, Qe.FloatType = 1015, Qe.UnsignedShort4444Type = 1016, Qe.UnsignedShort5551Type = 1017, Qe.UnsignedShort565Type = 1018, Qe.AlphaFormat = 1019, Qe.RGBFormat = 1020, Qe.RGBAFormat = 1021, Qe.LuminanceFormat = 1022, Qe.LuminanceAlphaFormat = 1023, Qe.RGB_S3TC_DXT1_Format = 2001, Qe.RGBA_S3TC_DXT1_Format = 2002, Qe.RGBA_S3TC_DXT3_Format = 2003, Qe.RGBA_S3TC_DXT5_Format = 2004, Qe.Gradient_Linear_U = 1, Qe.Gradient_Linear_V = 2, Qe.Gradient_Linear_UV = 3, Qe.Gradient_Linear_NUV = 4, Qe.Gradient_Linear_Radial = 5, Qe.Gradient_Linear_Sweep = 6, Qe.Math = {
			clamp: function(t, e, i) {
				return e > t ? e : t > i ? i : t
			},
			isConcave: function(t, e, i) {
				var r = i ? 1 : -1;
				return (t.x * e.y - e.x * t.y) * r < 0 ? !0 : !1
			},
			area: function(t, i, r, a) {
				var n = a ? 1 : -1;
				if (!t || !i || !r) return e;
				var s = -t.x * i.y - i.x * r.y - r.x * t.y + r.x * i.y + i.x * t.y + t.x * r.y;
				return s * n
			},
			isClockwise: function(t, e, i) {
				e = e || "x", i = i || "y";
				for (var r = 0, a = t.length, n = 0; a > n; n++) {
					var s = t[n],
						o = t[n + 1 === a ? 0 : n + 1];
					r += (o[e] - s[e]) * (o[i] + s[i])
				}
				return 0 > r
			},
			clampBottom: function(t, e) {
				return e > t ? e : t
			},
			mapLinear: function(t, e, i, r, a) {
				return r + (t - e) * (a - r) / (i - e)
			},
			random16: function() {
				return (65280 * Math.random() + 255 * Math.random()) / 65535
			},
			randInt: function(t, e) {
				return t + Math.floor(Math.random() * (e - t + 1))
			},
			randFloat: function(t, e) {
				return t + Math.random() * (e - t)
			},
			randFloatSpread: function(t) {
				return t * (.5 - Math.random())
			},
			sign: function(t) {
				return 0 > t ? -1 : t > 0 ? 1 : 0
			},
			degToRad: function(t) {
				return t * Qe.Math.__d2r
			},
			radToDeg: function(t) {
				return t * Qe.Math.__r2d
			},
			smoothstep: function(t, e, i) {
				return e >= t ? 0 : t >= i ? 1 : (t = (t - e) / (i - e), t * t * (3 - 2 * t))
			},
			smootherstep: function(t, e, i) {
				return e >= t ? 0 : t >= i ? 1 : (t = (t - e) / (i - e), t * t * t * (t * (6 * t - 15) + 10))
			},
			PI2: 2 * Math.PI,
			generateUUID: function() {
				var t, e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
					i = new Array(36),
					r = 0;
				return function() {
					for (var a = 0; 36 > a; a++) 8 == a || 13 == a || 18 == a || 23 == a ? i[a] = "-" : 14 == a ? i[a] = "4" : (2 >= r && (r = 33554432 + 16777216 * Math.random() | 0), t = 15 & r, r >>= 4, i[a] = e[19 == a ? 3 & t | 8 : t]);
					return i.join("")
				}
			}()
		}, Qe.Math.__d2r = Math.PI / 180, Qe.Math.__r2d = 180 / Math.PI, Qe.Quat = function(t, i, r, a) {
			this.x = t || 0, this.y = i || 0, this.z = r || 0, this.w = a !== e ? a : 1
		}, Qe.Quat.prototype = {
			constructor: Qe.Quat,
			set: function(t, e, i, r) {
				return this.x = t, this.y = e, this.z = i, this.w = r, this
			},
			copy: function(t) {
				return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this
			},
			setFromEuler: function(t, i) {
				var r = Math.cos(t.x / 2),
					a = Math.cos(t.y / 2),
					n = Math.cos(t.z / 2),
					s = Math.sin(t.x / 2),
					o = Math.sin(t.y / 2),
					l = Math.sin(t.z / 2);
				return i === e || "XYZ" === i ? (this.x = s * a * n + r * o * l, this.y = r * o * n - s * a * l, this.z = r * a * l + s * o * n, this.w = r * a * n - s * o * l) : "YXZ" === i ? (this.x = s * a * n + r * o * l, this.y = r * o * n - s * a * l, this.z = r * a * l - s * o * n, this.w = r * a * n + s * o * l) : "ZXY" === i ? (this.x = s * a * n - r * o * l, this.y = r * o * n + s * a * l, this.z = r * a * l + s * o * n, this.w = r * a * n - s * o * l) : "ZYX" === i ? (this.x = s * a * n - r * o * l, this.y = r * o * n + s * a * l, this.z = r * a * l - s * o * n, this.w = r * a * n + s * o * l) : "YZX" === i ? (this.x = s * a * n + r * o * l, this.y = r * o * n + s * a * l, this.z = r * a * l - s * o * n, this.w = r * a * n - s * o * l) : "XZY" === i && (this.x = s * a * n - r * o * l, this.y = r * o * n - s * a * l, this.z = r * a * l + s * o * n, this.w = r * a * n + s * o * l), this
			},
			setFromAxisAngle: function(t, e) {
				var i = e / 2,
					r = Math.sin(i);
				return this.x = t.x * r, this.y = t.y * r, this.z = t.z * r, this.w = Math.cos(i), this
			},
			setFromRotationMatrix: function(t) {
				var e, i = t.elements,
					r = i[0],
					a = i[4],
					n = i[8],
					s = i[1],
					o = i[5],
					l = i[9],
					h = i[2],
					c = i[6],
					u = i[10],
					f = r + o + u;
				return f > 0 ? (e = .5 / Math.sqrt(f + 1), this.w = .25 / e, this.x = (c - l) * e, this.y = (n - h) * e, this.z = (s - a) * e) : r > o && r > u ? (e = 2 * Math.sqrt(1 + r - o - u), this.w = (c - l) / e, this.x = .25 * e, this.y = (a + s) / e, this.z = (n + h) / e) : o > u ? (e = 2 * Math.sqrt(1 + o - r - u), this.w = (n - h) / e, this.x = (a + s) / e, this.y = .25 * e, this.z = (l + c) / e) : (e = 2 * Math.sqrt(1 + u - r - o), this.w = (s - a) / e, this.x = (n + h) / e, this.y = (l + c) / e, this.z = .25 * e), this
			},
			inverse: function() {
				return this.conjugate().normalize(), this
			},
			conjugate: function() {
				return this.x *= -1, this.y *= -1, this.z *= -1, this
			},
			lengthSq: function() {
				return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
			},
			length: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
			},
			normalize: function() {
				var t = this.length();
				return 0 === t ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (t = 1 / t, this.x = this.x * t, this.y = this.y * t, this.z = this.z * t, this.w = this.w * t), this
			},
			multiply: function(t, i) {
				return i !== e ? (console.warn("DEPRECATED: Quat's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, i)) : this.multiplyQuaternions(this, t)
			},
			multiplyQuaternions: function(t, e) {
				var i = t.x,
					r = t.y,
					a = t.z,
					n = t.w,
					s = e.x,
					o = e.y,
					l = e.z,
					h = e.w;
				return this.x = i * h + n * s + r * l - a * o, this.y = r * h + n * o + a * s - i * l, this.z = a * h + n * l + i * o - r * s, this.w = n * h - i * s - r * o - a * l, this
			},
			multiplyVector3: function(t) {
				return console.warn("DEPRECATED: Quat's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( Quat ) instead."), t.applyQuaternion(this)
			},
			slerp: function(t, e) {
				var i = this.x,
					r = this.y,
					a = this.z,
					n = this.w,
					s = n * t.w + i * t.x + r * t.y + a * t.z;
				if (0 > s ? (this.w = -t.w, this.x = -t.x, this.y = -t.y, this.z = -t.z, s = -s) : this.copy(t), s >= 1) return this.w = n, this.x = i, this.y = r, this.z = a, this;
				var o = Math.acos(s),
					l = Math.sqrt(1 - s * s);
				if (Math.abs(l) < .001) return this.w = .5 * (n + this.w), this.x = .5 * (i + this.x), this.y = .5 * (r + this.y), this.z = .5 * (a + this.z), this;
				var h = Math.sin((1 - e) * o) / l,
					c = Math.sin(e * o) / l;
				return this.w = n * h + this.w * c, this.x = i * h + this.x * c, this.y = r * h + this.y * c, this.z = a * h + this.z * c, this
			},
			toEuler: function() {
				var t = this.w * this.w,
					e = this.x * this.x,
					i = this.y * this.y,
					r = this.z * this.z,
					a = 180 / Math.PI * Math.atan2(2 * (this.y * this.z + this.x * this.w), -e - i + r + t),
					n = 180 / Math.PI * Math.asin(-2 * (this.x * this.z - this.y * this.w)),
					s = 180 / Math.PI * Math.atan2(2 * (this.x * this.y + this.z * this.w), e - i - r + t);
				return [a, n, s]
			},
			equals: function(t) {
				return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
			},
			clone: function() {
				return new Qe.Quat(this.x, this.y, this.z, this.w)
			}
		}, Qe.Quat.slerp = function(t, e, i, r) {
			return i.copy(t).slerp(e, r)
		};
	var Ke = function(t, e) {
		this.x = t || 0, this.y = e || 0
	};
	Ke.prototype = {
		constructor: Ke,
		set: function(t, e) {
			return this.x = t, this.y = e, this
		},
		setX: function(t) {
			return this.x = t, this
		},
		setY: function(t) {
			return this.y = t, this
		},
		setComponent: function(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		getComponent: function(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		copy: function(t) {
			return this.x = t.x, this.y = t.y, this
		},
		add: function(t, i) {
			return i !== e ? (console.warn("DEPRECATED: XiangliangTwo's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, i)) : (this.x += t.x, this.y += t.y, this)
		},
		addVectors: function(t, e) {
			return this.x = t.x + e.x, this.y = t.y + e.y, this
		},
		addScalar: function(t) {
			return this.x += t, this.y += t, this
		},
		sub: function(t, i) {
			return i !== e ? (console.warn("DEPRECATED: XiangliangTwo's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, i)) : (this.x -= t.x, this.y -= t.y, this)
		},
		subVectors: function(t, e) {
			return this.x = t.x - e.x, this.y = t.y - e.y, this
		},
		multiplyScalar: function(t) {
			return this.x *= t, this.y *= t, this
		},
		multiply: function(t) {
			return this.x *= t.x, this.y *= t.y, this
		},
		divideScalar: function(t) {
			return 0 !== t ? (this.x /= t, this.y /= t) : this.set(0, 0), this
		},
		min: function(t) {
			return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this
		},
		max: function(t) {
			return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this
		},
		clamp: function(t, e) {
			return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(t) {
			return this.x * t.x + this.y * t.y
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y
		},
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y)
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		distanceTo: function(t) {
			return Math.sqrt(this.distanceToSquared(t))
		},
		distanceToSquared: function(t) {
			var e = this.x - t.x,
				i = this.y - t.y;
			return e * e + i * i
		},
		setLength: function(t) {
			var e = this.length();
			return 0 !== e && t !== e && this.multiplyScalar(t / e), this
		},
		lerp: function(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
		},
		equals: function(t) {
			return null == t ? !1 : t.x === this.x && t.y === this.y
		},
		clone: function() {
			return new Ke(this.x, this.y)
		}
	}, Qe.XiangliangTwo = Ke;
	var Je = function(t, e, i) {
		this.x = t || 0, this.y = e || 0, this.z = i || 0
	};
	Qe.XiangliangThree = Je, Je.prototype = {
		set: function(t, e, i) {
			return this.x = t, this.y = e, this.z = i, this
		},
		setX: function(t) {
			return this.x = t, this
		},
		setY: function(t) {
			return this.y = t, this
		},
		setZ: function(t) {
			return this.z = t, this
		},
		setComponent: function(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				case 2:
					this.z = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		getComponent: function(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		center: function(t, e) {
			return this.x = (t.x + e.x) / 2, this.y = (t.y + e.y) / 2, this.z = (t.z + e.z) / 2, this
		},
		copy: function(t) {
			return (null == this || null == t) && console.log("TGL.XiangliangThree.copy this : " + this + " v : " + t), this.x = t.x, this.y = t.y, this.z = t.z, this
		},
		add: function(t) {
			return (!this || !t) && console.log("TGL.XiangliangThree.add this : " + this + " v : " + t), this.x += t.x, this.y += t.y, this.z += t.z, this
		},
		addScalar: function(t) {
			return this.x += t, this.y += t, this.z += t, this
		},
		addVectors: function(t, e) {
			return (!t || !e) && console.log("TGL.XiangliangThree.addVectors a : " + t + " b : " + e), this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
		},
		sub: function(t) {
			return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
		},
		subVectors: function(t, e) {
			return (null == t || null == e) && console.log("null"), this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
		},
		multiply: function(t) {
			return this.x *= t.x, this.y *= t.y, this.z *= t.z, this
		},
		multiplyScalar: function(t) {
			return this.x *= t, this.y *= t, this.z *= t, this
		},
		multiplyVectors: function(t, e) {
			return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
		},
		applyMatrix3: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z,
				a = t.elements;
			return this.x = a[0] * e + a[3] * i + a[6] * r, this.y = a[1] * e + a[4] * i + a[7] * r, this.z = a[2] * e + a[5] * i + a[8] * r, this
		},
		applyMatrix4: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z,
				a = t.elements;
			return this.x = a[0] * e + a[4] * i + a[8] * r + a[12], this.y = a[1] * e + a[5] * i + a[9] * r + a[13], this.z = a[2] * e + a[6] * i + a[10] * r + a[14], this
		},
		applyProjection: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z,
				a = t.elements,
				n = 1 / (a[3] * e + a[7] * i + a[11] * r + a[15]);
			return this.x = (a[0] * e + a[4] * i + a[8] * r + a[12]) * n, this.y = (a[1] * e + a[5] * i + a[9] * r + a[13]) * n, this.z = (a[2] * e + a[6] * i + a[10] * r + a[14]) * n, this
		},
		applyQuaternion: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z,
				a = t.x,
				n = t.y,
				s = t.z,
				o = t.w,
				l = o * e + n * r - s * i,
				h = o * i + s * e - a * r,
				c = o * r + a * i - n * e,
				u = -a * e - n * i - s * r;
			return this.x = l * o + u * -a + h * -s - c * -n, this.y = h * o + u * -n + c * -a - l * -s, this.z = c * o + u * -s + l * -n - h * -a, this
		},
		applyEuler: function(t, e) {
			var i = Je.__q1.setFromEuler(t, e);
			return this.applyQuaternion(i), this
		},
		applyAxisAngle: function(t, e) {
			var i = Je.__q1.setFromAxisAngle(t, e);
			return this.applyQuaternion(i), this
		},
		divide: function(t) {
			return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
		},
		divideScalar: function(t) {
			return 0 !== t ? (this.x /= t, this.y /= t, this.z /= t) : (this.x = 0, this.y = 0, this.z = 0), this
		},
		min: function(t) {
			return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this.z > t.z && (this.z = t.z), this
		},
		max: function(t) {
			return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this.z < t.z && (this.z = t.z), this
		},
		clamp: function(t, e) {
			return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z), this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(t) {
			return this.x * t.x + this.y * t.y + this.z * t.z
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y + this.z * this.z
		},
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		},
		lengthManhattan: function() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		setLength: function(t) {
			var e = this.length();
			return 0 !== e && t !== e && this.multiplyScalar(t / e), this
		},
		lerp: function(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
		},
		lerpVectors: function(t, e, i) {
			return this.x = t.x + (e.x - t.x) * i, this.y = t.y + (e.y - t.y) * i, this.z = t.z + (e.z - t.z) * i, this
		},
		cross: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z;
			return this.x = i * t.z - r * t.y, this.y = r * t.x - e * t.z, this.z = e * t.y - i * t.x, this
		},
		crossVectors: function(t, e) {
			return this.x = t.y * e.z - t.z * e.y, this.y = t.z * e.x - t.x * e.z, this.z = t.x * e.y - t.y * e.x, this
		},
		angleTo: function(t) {
			return Math.acos(this.dot(t) / this.length() / t.length())
		},
		distanceTo: function(t) {
			return Math.sqrt(this.distanceToSquared(t))
		},
		distanceToSquared: function(t) {
			var e = this.x - t.x,
				i = this.y - t.y,
				r = this.z - t.z;
			return e * e + i * i + r * r
		},
		getPositionFromMatrix: function(t) {
			return this.x = t.elements[12], this.y = t.elements[13], this.z = t.elements[14], this
		},
		setEulerFromRotationMatrix: function(t, i) {
			function r(t) {
				return Math.min(Math.max(t, -1), 1)
			}
			var a = t.elements,
				n = a[0],
				s = a[4],
				o = a[8],
				l = a[1],
				h = a[5],
				c = a[9],
				u = a[2],
				f = a[6],
				p = a[10];
			return i === e || "XYZ" === i ? (this.y = Math.asin(r(o)), Math.abs(o) < .99999 ? (this.x = Math.atan2(-c, p), this.z = Math.atan2(-s, n)) : (this.x = Math.atan2(f, h), this.z = 0)) : "YXZ" === i ? (this.x = Math.asin(-r(c)), Math.abs(c) < .99999 ? (this.y = Math.atan2(o, p), this.z = Math.atan2(l, h)) : (this.y = Math.atan2(-u, n), this.z = 0)) : "ZXY" === i ? (this.x = Math.asin(r(f)), Math.abs(f) < .99999 ? (this.y = Math.atan2(-u, p), this.z = Math.atan2(-s, h)) : (this.y = 0, this.z = Math.atan2(l, n))) : "ZYX" === i ? (this.y = Math.asin(-r(u)), Math.abs(u) < .99999 ? (this.x = Math.atan2(f, p), this.z = Math.atan2(l, n)) : (this.x = 0, this.z = Math.atan2(-s, h))) : "YZX" === i ? (this.z = Math.asin(r(l)), Math.abs(l) < .99999 ? (this.x = Math.atan2(-c, h), this.y = Math.atan2(-u, n)) : (this.x = 0, this.y = Math.atan2(o, p))) : "XZY" === i && (this.z = Math.asin(-r(s)), Math.abs(s) < .99999 ? (this.x = Math.atan2(f, h), this.y = Math.atan2(o, n)) : (this.x = Math.atan2(-c, p), this.y = 0)), this
		},
		setEulerFromQuaternion: function(t, i) {
			function r(t) {
				return Math.min(Math.max(t, -1), 1)
			}
			var a = t.x * t.x,
				n = t.y * t.y,
				s = t.z * t.z,
				o = t.w * t.w;
			return i === e || "XYZ" === i ? (this.x = Math.atan2(2 * (t.x * t.w - t.y * t.z), o - a - n + s), this.y = Math.asin(r(2 * (t.x * t.z + t.y * t.w))), this.z = Math.atan2(2 * (t.z * t.w - t.x * t.y), o + a - n - s)) : "YXZ" === i ? (this.x = Math.asin(r(2 * (t.x * t.w - t.y * t.z))), this.y = Math.atan2(2 * (t.x * t.z + t.y * t.w), o - a - n + s), this.z = Math.atan2(2 * (t.x * t.y + t.z * t.w), o - a + n - s)) : "ZXY" === i ? (this.x = Math.asin(r(2 * (t.x * t.w + t.y * t.z))), this.y = Math.atan2(2 * (t.y * t.w - t.z * t.x), o - a - n + s), this.z = Math.atan2(2 * (t.z * t.w - t.x * t.y), o - a + n - s)) : "ZYX" === i ? (this.x = Math.atan2(2 * (t.x * t.w + t.z * t.y), o - a - n + s), this.y = Math.asin(r(2 * (t.y * t.w - t.x * t.z))), this.z = Math.atan2(2 * (t.x * t.y + t.z * t.w), o + a - n - s)) : "YZX" === i ? (this.x = Math.atan2(2 * (t.x * t.w - t.z * t.y), o - a + n - s), this.y = Math.atan2(2 * (t.y * t.w - t.x * t.z), o + a - n - s), this.z = Math.asin(r(2 * (t.x * t.y + t.z * t.w)))) : "XZY" === i && (this.x = Math.atan2(2 * (t.x * t.w + t.y * t.z), o - a + n - s), this.y = Math.atan2(2 * (t.x * t.z + t.y * t.w), o + a - n - s), this.z = Math.asin(r(2 * (t.z * t.w - t.x * t.y)))), this
		},
		getScaleFromMatrix: function(t) {
			var e = this.set(t.elements[0], t.elements[1], t.elements[2]).length(),
				i = this.set(t.elements[4], t.elements[5], t.elements[6]).length(),
				r = this.set(t.elements[8], t.elements[9], t.elements[10]).length();
			return this.x = e, this.y = i, this.z = r, this
		},
		toString: function() {
			return this.x + "_" + this.y + "_" + this.z
		},
		equals: function(t) {
			return null == t ? !1 : t.x === this.x && t.y === this.y && t.z === this.z
		},
		clone: function() {
			return new Je(this.x, this.y, this.z)
		},
		setFromMatrixPosition: function(t) {
			return this.x = t.elements[12], this.y = t.elements[13], this.z = t.elements[14], this
		},
		rotateFromAxisAndCenter: function(t, e, i) {
			var r = (new Qe.Mat4).makeRotationAxisAndCenter(t, e, i);
			return this.applyMatrix4(r), this
		},
		rotationTowards: function(t, e) {
			var i = (new Qe.Mat4).rotationTowards(t, e);
			return this.setEulerFromRotationMatrix(i), this
		},
		constructor: Qe.XiangliangThree
	}, Je.__q1 = new Qe.Quat, Qe.Vec4 = function(t, i, r, a) {
		this.x = t || 0, this.y = i || 0, this.z = r || 0, this.w = a !== e ? a : 1
	}, Qe.Vec4.prototype = {
		constructor: Qe.Vec4,
		set: function(t, e, i, r) {
			return this.x = t, this.y = e, this.z = i, this.w = r, this
		},
		setX: function(t) {
			return this.x = t, this
		},
		setY: function(t) {
			return this.y = t, this
		},
		setZ: function(t) {
			return this.z = t, this
		},
		setW: function(t) {
			return this.w = t, this
		},
		setComponent: function(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				case 2:
					this.z = e;
					break;
				case 3:
					this.w = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		getComponent: function(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				case 3:
					return this.w;
				default:
					throw new Error("index is out of range: " + t)
			}
		},
		copy: function(t) {
			return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== e ? t.w : 1, this
		},
		add: function(t, i) {
			return i !== e ? (console.warn("DEPRECATED: Vec4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, i)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
		},
		addScalar: function(t) {
			return this.x += t, this.y += t, this.z += t, this.w += t, this
		},
		addVectors: function(t, e) {
			return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
		},
		sub: function(t, i) {
			return i !== e ? (console.warn("DEPRECATED: Vec4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, i)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
		},
		subVectors: function(t, e) {
			return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
		},
		multiplyScalar: function(t) {
			return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
		},
		applyMatrix4: function(t) {
			var e = this.x,
				i = this.y,
				r = this.z,
				a = this.w,
				n = t.elements;
			return this.x = n[0] * e + n[4] * i + n[8] * r + n[12] * a, this.y = n[1] * e + n[5] * i + n[9] * r + n[13] * a, this.z = n[2] * e + n[6] * i + n[10] * r + n[14] * a, this.w = n[3] * e + n[7] * i + n[11] * r + n[15] * a, this
		},
		divideScalar: function(t) {
			return 0 !== t ? (this.x /= t, this.y /= t, this.z /= t, this.w /= t) : (this.x = 0, this.y = 0, this.z = 0, this.w = 1), this
		},
		min: function(t) {
			return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this.z > t.z && (this.z = t.z), this.w > t.w && (this.w = t.w), this
		},
		max: function(t) {
			return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this.z < t.z && (this.z = t.z), this.w < t.w && (this.w = t.w), this
		},
		clamp: function(t, e) {
			return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z), this.w < t.w ? this.w = t.w : this.w > e.w && (this.w = e.w), this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(t) {
			return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		},
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		},
		lengthManhattan: function() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		setLength: function(t) {
			var e = this.length();
			return 0 !== e && t !== e && this.multiplyScalar(t / e), this
		},
		lerp: function(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
		},
		equals: function(t) {
			return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
		},
		clone: function() {
			return new Qe.Vec4(this.x, this.y, this.z, this.w)
		},
		setAxisAngleFromQuaternion: function(t) {
			this.w = 2 * Math.acos(t.w);
			var e = Math.sqrt(1 - t.w * t.w);
			return 1e-4 > e ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
		},
		setAxisAngleFromRotationMatrix: function(t) {
			var e, i, r, a, n = .01,
				s = .1,
				o = t.elements,
				l = o[0],
				h = o[4],
				c = o[8],
				u = o[1],
				f = o[5],
				p = o[9],
				d = o[2],
				m = o[6],
				g = o[10];
			if (Math.abs(h - u) < n && Math.abs(c - d) < n && Math.abs(p - m) < n) {
				if (Math.abs(h + u) < s && Math.abs(c + d) < s && Math.abs(p + m) < s && Math.abs(l + f + g - 3) < s) return this.set(1, 0, 0, 0), this;
				e = Math.PI;
				var y = (l + 1) / 2,
					v = (f + 1) / 2,
					x = (g + 1) / 2,
					A = (h + u) / 4,
					w = (c + d) / 4,
					_ = (p + m) / 4;
				return y > v && y > x ? n > y ? (i = 0, r = .707106781, a = .707106781) : (i = Math.sqrt(y), r = A / i, a = w / i) : v > x ? n > v ? (i = .707106781, r = 0, a = .707106781) : (r = Math.sqrt(v), i = A / r, a = _ / r) : n > x ? (i = .707106781, r = .707106781, a = 0) : (a = Math.sqrt(x), i = w / a, r = _ / a), this.set(i, r, a, e), this
			}
			var S = Math.sqrt((m - p) * (m - p) + (c - d) * (c - d) + (u - h) * (u - h));
			return Math.abs(S) < .001 && (S = 1), this.x = (m - p) / S, this.y = (c - d) / S, this.z = (u - h) / S, this.w = Math.acos((l + f + g - 1) / 2), this
		}
	};
	var $e = function(t, i, r, a, n, s, o, l, h) {
		this.elements = new Float32Array(9), this.set(t !== e ? t : 1, i || 0, r || 0, a || 0, n !== e ? n : 1, s || 0, o || 0, l || 0, h !== e ? h : 1)
	};
	$e.prototype = {
		constructor: $e,
		set: function(t, e, i, r, a, n, s, o, l) {
			var h = this.elements;
			return h[0] = t, h[3] = e, h[6] = i, h[1] = r, h[4] = a, h[7] = n, h[2] = s, h[5] = o, h[8] = l, this
		},
		identity: function() {
			return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
		},
		copy: function(t) {
			var e = t.elements;
			return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
		},
		multiplyVector3: function(t) {
			return console.warn("DEPRECATED: Mat3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
		},
		multiplyVector3Array: function() {
			var t = new Je;
			return function(e) {
				for (var i = 0, r = e.length; r > i; i += 3) t.x = e[i], t.y = e[i + 1], t.z = e[i + 2], t.applyMatrix3(this), e[i] = t.x, e[i + 1] = t.y, e[i + 2] = t.z;
				return e
			}
		}(),
		multiplyScalar: function(t) {
			var e = this.elements;
			return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
		},
		determinant: function() {
			var t = this.elements,
				e = t[0],
				i = t[1],
				r = t[2],
				a = t[3],
				n = t[4],
				s = t[5],
				o = t[6],
				l = t[7],
				h = t[8];
			return e * n * h - e * s * l - i * a * h + i * s * o + r * a * l - r * n * o
		},
		getInverse: function(t, e) {
			var i = t.elements,
				r = this.elements;
			r[0] = i[10] * i[5] - i[6] * i[9], r[1] = -i[10] * i[1] + i[2] * i[9], r[2] = i[6] * i[1] - i[2] * i[5], r[3] = -i[10] * i[4] + i[6] * i[8], r[4] = i[10] * i[0] - i[2] * i[8], r[5] = -i[6] * i[0] + i[2] * i[4], r[6] = i[9] * i[4] - i[5] * i[8], r[7] = -i[9] * i[0] + i[1] * i[8], r[8] = i[5] * i[0] - i[1] * i[4];
			var a = i[0] * r[0] + i[1] * r[3] + i[2] * r[6];
			if (0 === a) {
				var n = "Mat3.getInverse(): can't invert matrix, determinant is 0";
				if (e) throw new Error(n);
				return console.warn(n), this.identity(), this
			}
			return this.multiplyScalar(1 / a), this
		},
		transpose: function() {
			var t, e = this.elements;
			return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
		},
		getNormalMatrix: function(t) {
			return this.getInverse(t).transpose(), this
		},
		transposeIntoArray: function(t) {
			var e = this.elements;
			return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
		},
		clone: function() {
			var t = this.elements;
			return new $e(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8])
		}
	}, Qe.Mat3 = $e;
	var ti = function(t, i, r, a, n, s, o, l, h, c, u, f, p, d, m, g) {
		this.elements = new Float32Array(16), this.set(t !== e ? t : 1, i || 0, r || 0, a || 0, n || 0, s !== e ? s : 1, o || 0, l || 0, h || 0, c || 0, u !== e ? u : 1, f || 0, p || 0, d || 0, m || 0, g !== e ? g : 1)
	};
	ti.prototype = {
		constructor: ti,
		set: function(t, e, i, r, a, n, s, o, l, h, c, u, f, p, d, m) {
			var g = this.elements;
			return g[0] = t, g[4] = e, g[8] = i, g[12] = r, g[1] = a, g[5] = n, g[9] = s, g[13] = o, g[2] = l, g[6] = h, g[10] = c, g[14] = u, g[3] = f, g[7] = p, g[11] = d, g[15] = m, this
		},
		identity: function() {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		copy: function(t) {
			var e = t.elements;
			return this.set(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]), this
		},
		setRotationFromEuler: function(t, i) {
			var r = this.elements,
				a = t.x,
				n = t.y,
				s = t.z,
				o = Math.cos(a),
				l = Math.sin(a),
				h = Math.cos(n),
				c = Math.sin(n),
				u = Math.cos(s),
				f = Math.sin(s);
			if (i === e || "XYZ" === i) {
				var p = o * u,
					d = o * f,
					m = l * u,
					g = l * f;
				r[0] = h * u, r[4] = -h * f, r[8] = c, r[1] = d + m * c, r[5] = p - g * c, r[9] = -l * h, r[2] = g - p * c, r[6] = m + d * c, r[10] = o * h
			} else if ("YXZ" === i) {
				var y = h * u,
					v = h * f,
					x = c * u,
					A = c * f;
				r[0] = y + A * l, r[4] = x * l - v, r[8] = o * c, r[1] = o * f, r[5] = o * u, r[9] = -l, r[2] = v * l - x, r[6] = A + y * l, r[10] = o * h
			} else if ("ZXY" === i) {
				var y = h * u,
					v = h * f,
					x = c * u,
					A = c * f;
				r[0] = y - A * l, r[4] = -o * f, r[8] = x + v * l, r[1] = v + x * l, r[5] = o * u, r[9] = A - y * l, r[2] = -o * c, r[6] = l, r[10] = o * h
			} else if ("ZYX" === i) {
				var p = o * u,
					d = o * f,
					m = l * u,
					g = l * f;
				r[0] = h * u, r[4] = m * c - d, r[8] = p * c + g, r[1] = h * f, r[5] = g * c + p, r[9] = d * c - m, r[2] = -c, r[6] = l * h, r[10] = o * h
			} else if ("YZX" === i) {
				var w = o * h,
					_ = o * c,
					S = l * h,
					b = l * c;
				r[0] = h * u, r[4] = b - w * f, r[8] = S * f + _, r[1] = f, r[5] = o * u, r[9] = -l * u, r[2] = -c * u, r[6] = _ * f + S, r[10] = w - b * f
			} else if ("XZY" === i) {
				var w = o * h,
					_ = o * c,
					S = l * h,
					b = l * c;
				r[0] = h * u, r[4] = -f, r[8] = c * u, r[1] = w * f + b, r[5] = o * u, r[9] = _ * f - S, r[2] = S * f - _, r[6] = l * u, r[10] = b * f + w
			}
			return this
		},
		setRotationFromQuaternion: function(t) {
			var e = this.elements,
				i = t.x,
				r = t.y,
				a = t.z,
				n = t.w,
				s = i + i,
				o = r + r,
				l = a + a,
				h = i * s,
				c = i * o,
				u = i * l,
				f = r * o,
				p = r * l,
				d = a * l,
				m = n * s,
				g = n * o,
				y = n * l;
			return e[0] = 1 - (f + d), e[4] = c - y, e[8] = u + g, e[1] = c + y, e[5] = 1 - (h + d), e[9] = p - m, e[2] = u - g, e[6] = p + m, e[10] = 1 - (h + f), this
		},
		lookAt: function(t, e, i) {
			var r = this.elements,
				a = ti.__v1,
				n = ti.__v2,
				s = ti.__v3;
			return s.subVectors(t, e).normalize(), 0 === s.length() && (s.z = 1), a.crossVectors(i, s).normalize(), 0 === a.length() && (s.x += 1e-4, a.crossVectors(i, s).normalize()), n.crossVectors(s, a), r[0] = a.x, r[1] = a.y, r[2] = a.z, r[4] = n.x, r[5] = n.y, r[6] = n.z, r[8] = s.x, r[9] = s.y, r[10] = s.z, this
		},
		multiply: function(t, i) {
			return i !== e ? this.multiplyMatrices(t, i) : this.multiplyMatrices(this, t)
		},
		multiplyMatrices: function(t, e) {
			var i = t.elements,
				r = e.elements,
				a = this.elements,
				n = i[0],
				s = i[4],
				o = i[8],
				l = i[12],
				h = i[1],
				c = i[5],
				u = i[9],
				f = i[13],
				p = i[2],
				d = i[6],
				m = i[10],
				g = i[14],
				y = i[3],
				v = i[7],
				x = i[11],
				A = i[15],
				w = r[0],
				_ = r[4],
				S = r[8],
				b = r[12],
				M = r[1],
				C = r[5],
				P = r[9],
				T = r[13],
				z = r[2],
				L = r[6],
				E = r[10],
				D = r[14],
				B = r[3],
				N = r[7],
				R = r[11],
				I = r[15];
			return a[0] = n * w + s * M + o * z + l * B, a[4] = n * _ + s * C + o * L + l * N, a[8] = n * S + s * P + o * E + l * R, a[12] = n * b + s * T + o * D + l * I, a[1] = h * w + c * M + u * z + f * B, a[5] = h * _ + c * C + u * L + f * N, a[9] = h * S + c * P + u * E + f * R, a[13] = h * b + c * T + u * D + f * I, a[2] = p * w + d * M + m * z + g * B, a[6] = p * _ + d * C + m * L + g * N, a[10] = p * S + d * P + m * E + g * R, a[14] = p * b + d * T + m * D + g * I, a[3] = y * w + v * M + x * z + A * B, a[7] = y * _ + v * C + x * L + A * N, a[11] = y * S + v * P + x * E + A * R, a[15] = y * b + v * T + x * D + A * I, this
		},
		multiplyToArray: function(t, e, i) {
			var r = this.elements;
			return this.multiplyMatrices(t, e), i[0] = r[0], i[1] = r[1], i[2] = r[2], i[3] = r[3], i[4] = r[4], i[5] = r[5], i[6] = r[6], i[7] = r[7], i[8] = r[8], i[9] = r[9], i[10] = r[10], i[11] = r[11], i[12] = r[12], i[13] = r[13], i[14] = r[14], i[15] = r[15], this
		},
		multiplyScalar: function(t) {
			var e = this.elements;
			return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
		},
		multiplyVector3: function(t) {
			return t.applyProjection(this)
		},
		multiplyVector4: function(t) {
			return t.applyMatrix4(this)
		},
		multiplyVector3Array: function(t) {
			for (var e = ti.__v1, i = 0, r = t.length; r > i; i += 3) e.x = t[i], e.y = t[i + 1], e.z = t[i + 2], e.applyProjection(this), t[i] = e.x, t[i + 1] = e.y, t[i + 2] = e.z;
			return t
		},
		rotateAxis: function(t) {
			var e = this.elements,
				i = t.x,
				r = t.y,
				a = t.z;
			return t.x = i * e[0] + r * e[4] + a * e[8], t.y = i * e[1] + r * e[5] + a * e[9], t.z = i * e[2] + r * e[6] + a * e[10], t.normalize(), t
		},
		crossVector: function(t) {
			var e = this.elements,
				i = new Qe.Vector4;
			return i.x = e[0] * t.x + e[4] * t.y + e[8] * t.z + e[12] * t.w, i.y = e[1] * t.x + e[5] * t.y + e[9] * t.z + e[13] * t.w, i.z = e[2] * t.x + e[6] * t.y + e[10] * t.z + e[14] * t.w, i.w = t.w ? e[3] * t.x + e[7] * t.y + e[11] * t.z + e[15] * t.w : 1, i
		},
		determinant: function() {
			var t = this.elements,
				e = t[0],
				i = t[4],
				r = t[8],
				a = t[12],
				n = t[1],
				s = t[5],
				o = t[9],
				l = t[13],
				h = t[2],
				c = t[6],
				u = t[10],
				f = t[14],
				p = t[3],
				d = t[7],
				m = t[11],
				g = t[15];
			return p * (+a * o * c - r * l * c - a * s * u + i * l * u + r * s * f - i * o * f) + d * (+e * o * f - e * l * u + a * n * u - r * n * f + r * l * h - a * o * h) + m * (+e * l * c - e * s * f - a * n * c + i * n * f + a * s * h - i * l * h) + g * (-r * s * h - e * o * c + e * s * u + r * n * c - i * n * u + i * o * h)
		},
		transpose: function() {
			var t, e = this.elements;
			return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
		},
		flattenToArray: function(t) {
			var e = this.elements;
			return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
		},
		flattenToArrayOffset: function(t, e) {
			var i = this.elements;
			return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t[e + 9] = i[9], t[e + 10] = i[10], t[e + 11] = i[11], t[e + 12] = i[12], t[e + 13] = i[13], t[e + 14] = i[14], t[e + 15] = i[15], t
		},
		getPosition: function() {
			var t = this.elements;
			return (new Je).set(t[12], t[13], t[14])
		},
		setPosition: function(t) {
			var e = this.elements;
			return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
		},
		getColumnX: function() {
			var t = this.elements;
			return ti.__v1.set(t[0], t[1], t[2])
		},
		getColumnY: function() {
			var t = this.elements;
			return ti.__v1.set(t[4], t[5], t[6])
		},
		getColumnZ: function() {
			var t = this.elements;
			return ti.__v1.set(t[8], t[9], t[10])
		},
		getInverse: function(t, e) {
			var i = this.elements,
				r = t.elements,
				a = r[0],
				n = r[4],
				s = r[8],
				o = r[12],
				l = r[1],
				h = r[5],
				c = r[9],
				u = r[13],
				f = r[2],
				p = r[6],
				d = r[10],
				m = r[14],
				g = r[3],
				y = r[7],
				v = r[11],
				x = r[15];
			i[0] = c * m * y - u * d * y + u * p * v - h * m * v - c * p * x + h * d * x, i[4] = o * d * y - s * m * y - o * p * v + n * m * v + s * p * x - n * d * x, i[8] = s * u * y - o * c * y + o * h * v - n * u * v - s * h * x + n * c * x, i[12] = o * c * p - s * u * p - o * h * d + n * u * d + s * h * m - n * c * m, i[1] = u * d * g - c * m * g - u * f * v + l * m * v + c * f * x - l * d * x, i[5] = s * m * g - o * d * g + o * f * v - a * m * v - s * f * x + a * d * x, i[9] = o * c * g - s * u * g - o * l * v + a * u * v + s * l * x - a * c * x, i[13] = s * u * f - o * c * f + o * l * d - a * u * d - s * l * m + a * c * m, i[2] = h * m * g - u * p * g + u * f * y - l * m * y - h * f * x + l * p * x, i[6] = o * p * g - n * m * g - o * f * y + a * m * y + n * f * x - a * p * x, i[10] = n * u * g - o * h * g + o * l * y - a * u * y - n * l * x + a * h * x, i[14] = o * h * f - n * u * f - o * l * p + a * u * p + n * l * m - a * h * m, i[3] = c * p * g - h * d * g - c * f * y + l * d * y + h * f * v - l * p * v, i[7] = n * d * g - s * p * g + s * f * y - a * d * y - n * f * v + a * p * v, i[11] = s * h * g - n * c * g - s * l * y + a * c * y + n * l * v - a * h * v, i[15] = n * c * f - s * h * f + s * l * p - a * c * p - n * l * d + a * h * d;
			var A = r[0] * i[0] + r[1] * i[4] + r[2] * i[8] + r[3] * i[12];
			if (0 == A) {
				var w = "Mat4.getInverse(): can't invert matrix, determinant is 0";
				if (e) throw new Error(w);
				return console.warn(w), this.identity(), this
			}
			return this.multiplyScalar(1 / A), this
		},
		compose: function(t, e, i) {
			var r = this.elements,
				a = ti.__m1,
				n = ti.__m2;
			return a.identity(), a.setRotationFromQuaternion(e), n.makeScale(i.x, i.y, i.z), this.multiplyMatrices(a, n), r[12] = t.x, r[13] = t.y, r[14] = t.z, this
		},
		decompose: function(t, e, i) {
			var r = this.elements,
				a = ti.__v1,
				n = ti.__v2,
				s = ti.__v3;
			a.set(r[0], r[1], r[2]), n.set(r[4], r[5], r[6]), s.set(r[8], r[9], r[10]), t = t instanceof Je ? t : new Je, e = e instanceof Qe.Quat ? e : new Qe.Quat, i = i instanceof Je ? i : new Je, i.x = a.length(), i.y = n.length(), i.z = s.length(), t.x = r[12], t.y = r[13], t.z = r[14];
			var o = ti.__m1;
			return o.copy(this), o.elements[0] /= i.x, o.elements[1] /= i.x, o.elements[2] /= i.x, o.elements[4] /= i.y, o.elements[5] /= i.y, o.elements[6] /= i.y, o.elements[8] /= i.z, o.elements[9] /= i.z, o.elements[10] /= i.z, e.setFromRotationMatrix(o), [t, e, i]
		},
		extractPosition: function(t) {
			var e = this.elements,
				i = t.elements;
			return e[12] = i[12], e[13] = i[13], e[14] = i[14], this
		},
		extractRotation: function(t) {
			var e = this.elements,
				i = t.elements,
				r = ti.__v1,
				a = 1 / r.set(i[0], i[1], i[2]).length(),
				n = 1 / r.set(i[4], i[5], i[6]).length(),
				s = 1 / r.set(i[8], i[9], i[10]).length();
			return e[0] = i[0] * a, e[1] = i[1] * a, e[2] = i[2] * a, e[4] = i[4] * n, e[5] = i[5] * n, e[6] = i[6] * n, e[8] = i[8] * s, e[9] = i[9] * s, e[10] = i[10] * s, this
		},
		translate: function(t) {
			var e = this.elements,
				i = t.x,
				r = t.y,
				a = t.z;
			return e[12] = e[0] * i + e[4] * r + e[8] * a + e[12], e[13] = e[1] * i + e[5] * r + e[9] * a + e[13], e[14] = e[2] * i + e[6] * r + e[10] * a + e[14], e[15] = e[3] * i + e[7] * r + e[11] * a + e[15], this
		},
		rotateX: function(t) {
			var e = this.elements,
				i = e[4],
				r = e[5],
				a = e[6],
				n = e[7],
				s = e[8],
				o = e[9],
				l = e[10],
				h = e[11],
				c = Math.cos(t),
				u = Math.sin(t);
			return e[4] = c * i + u * s, e[5] = c * r + u * o, e[6] = c * a + u * l, e[7] = c * n + u * h, e[8] = c * s - u * i, e[9] = c * o - u * r, e[10] = c * l - u * a, e[11] = c * h - u * n, this
		},
		rotateY: function(t) {
			var e = this.elements,
				i = e[0],
				r = e[1],
				a = e[2],
				n = e[3],
				s = e[8],
				o = e[9],
				l = e[10],
				h = e[11],
				c = Math.cos(t),
				u = Math.sin(t);
			return e[0] = c * i - u * s, e[1] = c * r - u * o, e[2] = c * a - u * l, e[3] = c * n - u * h, e[8] = c * s + u * i, e[9] = c * o + u * r, e[10] = c * l + u * a, e[11] = c * h + u * n, this
		},
		rotateZ: function(t) {
			var e = this.elements,
				i = e[0],
				r = e[1],
				a = e[2],
				n = e[3],
				s = e[4],
				o = e[5],
				l = e[6],
				h = e[7],
				c = Math.cos(t),
				u = Math.sin(t);
			return e[0] = c * i + u * s, e[1] = c * r + u * o, e[2] = c * a + u * l, e[3] = c * n + u * h, e[4] = c * s - u * i, e[5] = c * o - u * r, e[6] = c * l - u * a, e[7] = c * h - u * n, this
		},
		rotateByAxis: function(t, e) {
			var i = this.elements;
			if (1 === t.x && 0 === t.y && 0 === t.z) return this.rotateX(e);
			if (0 === t.x && 1 === t.y && 0 === t.z) return this.rotateY(e);
			if (0 === t.x && 0 === t.y && 1 === t.z) return this.rotateZ(e);
			var r = t.x,
				a = t.y,
				n = t.z,
				s = Math.sqrt(r * r + a * a + n * n);
			r /= s, a /= s, n /= s;
			var o = r * r,
				l = a * a,
				h = n * n,
				c = Math.cos(e),
				u = Math.sin(e),
				f = 1 - c,
				p = r * a * f,
				d = r * n * f,
				m = a * n * f,
				g = r * u,
				y = a * u,
				v = n * u,
				x = o + (1 - o) * c,
				A = p + v,
				w = d - y,
				_ = p - v,
				S = l + (1 - l) * c,
				b = m + g,
				M = d + y,
				C = m - g,
				P = h + (1 - h) * c,
				T = i[0],
				z = i[1],
				L = i[2],
				E = i[3],
				D = i[4],
				B = i[5],
				N = i[6],
				R = i[7],
				I = i[8],
				F = i[9],
				V = i[10],
				U = i[11];
			i[12], i[13], i[14], i[15];
			return i[0] = x * T + A * D + w * I, i[1] = x * z + A * B + w * F, i[2] = x * L + A * N + w * V, i[3] = x * E + A * R + w * U, i[4] = _ * T + S * D + b * I, i[5] = _ * z + S * B + b * F, i[6] = _ * L + S * N + b * V, i[7] = _ * E + S * R + b * U, i[8] = M * T + C * D + P * I, i[9] = M * z + C * B + P * F, i[10] = M * L + C * N + P * V, i[11] = M * E + C * R + P * U, this
		},
		scale: function(t) {
			var e = this.elements,
				i = t.x,
				r = t.y,
				a = t.z;
			return e[0] *= i, e[4] *= r, e[8] *= a, e[1] *= i, e[5] *= r, e[9] *= a, e[2] *= i, e[6] *= r, e[10] *= a, e[3] *= i, e[7] *= r, e[11] *= a, this
		},
		getMaxScaleOnAxis: function() {
			var t = this.elements,
				e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
				i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
				r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
			return Math.sqrt(Math.max(e, Math.max(i, r)))
		},
		makeTranslation: function(t, e, i) {
			return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1), this
		},
		makeRotationX: function(t) {
			var e = Math.cos(t),
				i = Math.sin(t);
			return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this
		},
		makeRotationY: function(t) {
			var e = Math.cos(t),
				i = Math.sin(t);
			return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this
		},
		makeRotationZ: function(t) {
			var e = Math.cos(t),
				i = Math.sin(t);
			return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		makeRotationAxis: function(t, e) {
			var i = Math.cos(e),
				r = Math.sin(e),
				a = 1 - i,
				n = t.x,
				s = t.y,
				o = t.z,
				l = a * n,
				h = a * s;
			return this.set(l * n + i, l * s - r * o, l * o + r * s, 0, l * s + r * o, h * s + i, h * o - r * n, 0, l * o - r * s, h * o + r * n, a * o * o + i, 0, 0, 0, 0, 1), this
		},
		makeScale: function(t, e, i) {
			return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
		},
		makeFrustum: function(t, e, i, r, a, n) {
			var s = this.elements,
				o = 2 * a / (e - t),
				l = 2 * a / (r - i),
				h = (e + t) / (e - t),
				c = (r + i) / (r - i),
				u = -(n + a) / (n - a),
				f = -2 * n * a / (n - a);
			return s[0] = o, s[4] = 0, s[8] = h, s[12] = 0, s[1] = 0, s[5] = l, s[9] = c, s[13] = 0, s[2] = 0, s[6] = 0, s[10] = u, s[14] = f, s[3] = 0, s[7] = 0, s[11] = -1, s[15] = 0, this
		},
		makePerspective: function(t, e, i, r) {
			var a = i * Math.tan(Qe.Math.degToRad(.5 * t)),
				n = -a,
				s = n * e,
				o = a * e;
			return this.makeFrustum(s, o, n, a, i, r)
		},
		makeOrthographic: function(t, e, i, r, a, n) {
			var s = this.elements,
				o = e - t,
				l = i - r,
				h = n - a,
				c = (e + t) / o,
				u = (i + r) / l,
				f = (n + a) / h;
			return s[0] = 2 / o, s[4] = 0, s[8] = 0, s[12] = -c, s[1] = 0, s[5] = 2 / l, s[9] = 0, s[13] = -u, s[2] = 0, s[6] = 0, s[10] = -2 / h, s[14] = -f, s[3] = 0, s[7] = 0, s[11] = 0, s[15] = 1, this
		},
		clone: function() {
			var t = this.elements;
			return new ti(t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15])
		},
		makeRotationFromQuaternion: function(t) {
			var e = this.elements,
				i = t.x,
				r = t.y,
				a = t.z,
				n = t.w,
				s = i + i,
				o = r + r,
				l = a + a,
				h = i * s,
				c = i * o,
				u = i * l,
				f = r * o,
				p = r * l,
				d = a * l,
				m = n * s,
				g = n * o,
				y = n * l;
			return e[0] = 1 - (f + d), e[4] = c - y, e[8] = u + g, e[1] = c + y, e[5] = 1 - (h + d), e[9] = p - m, e[2] = u - g, e[6] = p + m, e[10] = 1 - (h + f), e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
		},
		getEulerAngles: function() {
			var t = (new ti).extractRotation(this).elements,
				e = t[0],
				i = t[1],
				r = t[2],
				a = t[5],
				n = t[6],
				s = t[10],
				o = Math.atan2(n, s),
				l = Math.atan2(-r, Math.sqrt(e * e + i * i)),
				h = Math.sin(o),
				c = Math.cos(o),
				u = Math.atan2(h * t[8] - c * t[4], c * a - h * t[9]);
			return new Je(o, l, u)
		},
		makeRotationAxisAndCenter: function(t, e, i) {
			var r = Math.cos(e),
				a = Math.sin(e),
				n = 1 - r,
				s = t.x,
				o = t.y,
				l = t.z,
				h = n * s,
				c = n * o,
				u = i.x,
				f = i.y,
				p = i.z,
				d = this,
				m = new Float32Array(16);
			return m[0] = h * s + r, m[4] = h * o - a * l, m[8] = h * l + a * o, m[12] = u - u * (h * s + r) - f * (h * o - a * l) - p * (h * l + a * o), m[1] = h * o + a * l, m[5] = c * o + r, m[9] = c * l - a * s, m[13] = f - u * (h * o + a * l) - f * (c * o + r) - p * (c * l - a * s), m[2] = h * l - a * o, m[6] = c * l + a * s, m[10] = n * l * l + r, m[14] = p - u * (h * l - a * o) - f * (c * l + a * s) - p * (n * l * l + r), m[3] = 0, m[7] = 0, m[11] = 0, m[15] = 1, d.elements = m, d
		},
		rotationTowards: function(t, e) {
			var i = Math.acos(e.dot(t) / e.length() / t.length()),
				r = (new Qe.XiangliangThree).crossVectors(e, t).normalize();
			return this.makeRotationAxis(r, -i), this
		},
		equals: function(t) {
			if (t instanceof ti) {
				for (var e = 0; e < this.elements.length; e++)
					if (Math.abs(this.elements[e] - t.elements[e]) > 1e-4) return !1;
				return !0
			}
		}
	}, ti.__v1 = new Je, ti.__v2 = new Je, ti.__v3 = new Je, ti.__m1 = new ti, ti.__m2 = new ti, Qe.Mat4 = ti, Qe.Euler = function(t, e, i, r) {
		this._x = t || 0, this._y = e || 0, this._z = i || 0, this._order = r || Qe.Euler.DefaultOrder
	}, Qe.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], Qe.Euler.DefaultOrder = "XYZ", Qe.Euler.prototype = {
		constructor: Qe.Euler,
		_x: 0,
		_y: 0,
		_z: 0,
		_order: Qe.Euler.DefaultOrder,
		_quaternion: e,
		_updateQuaternion: function() {
			this._quaternion !== e && this._quaternion.setFromEuler(this, !1)
		},
		get x() {
			return this._x
		},
		set x(t) {
			this._x = t, this._updateQuaternion()
		},
		get y() {
			return this._y
		},
		set y(t) {
			this._y = t, this._updateQuaternion()
		},
		get z() {
			return this._z
		},
		set z(t) {
			this._z = t, this._updateQuaternion()
		},
		get order() {
			return this._order
		},
		set order(t) {
			this._order = t, this._updateQuaternion()
		},
		set: function(t, e, i, r) {
			return this._x = t, this._y = e, this._z = i, this._order = r || this._order, this._updateQuaternion(), this
		},
		copy: function(t) {
			return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._updateQuaternion(), this
		},
		setFromRotationMatrix: function(t, e) {
			function i(t) {
				return Math.min(Math.max(t, -1), 1)
			}
			var r = t.elements,
				a = r[0],
				n = r[4],
				s = r[8],
				o = r[1],
				l = r[5],
				h = r[9],
				c = r[2],
				u = r[6],
				f = r[10];
			return e = e || this._order, "XYZ" === e ? (this._y = Math.asin(i(s)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-n, a)) : (this._x = Math.atan2(u, l), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-i(h)), Math.abs(h) < .99999 ? (this._y = Math.atan2(s, f), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-c, a), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(i(u)), Math.abs(u) < .99999 ? (this._y = Math.atan2(-c, f), this._z = Math.atan2(-n, l)) : (this._y = 0, this._z = Math.atan2(o, a))) : "ZYX" === e ? (this._y = Math.asin(-i(c)), Math.abs(c) < .99999 ? (this._x = Math.atan2(u, f), this._z = Math.atan2(o, a)) : (this._x = 0, this._z = Math.atan2(-n, l))) : "YZX" === e ? (this._z = Math.asin(i(o)), Math.abs(o) < .99999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-c, a)) : (this._x = 0, this._y = Math.atan2(s, f))) : "XZY" === e ? (this._z = Math.asin(-i(n)), Math.abs(n) < .99999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-h, f), this._y = 0)) : console.warn("WARNING: Euler.setFromRotationMatrix() given unsupported order: " + e), this._order = e, this._updateQuaternion(), this
		},
		setFromQuaternion: function(t, e, i) {
			function r(t) {
				return Math.min(Math.max(t, -1), 1)
			}
			var a = t.x * t.x,
				n = t.y * t.y,
				s = t.z * t.z,
				o = t.w * t.w;
			return e = e || this._order, "XYZ" === e ? (this._x = Math.atan2(2 * (t.x * t.w - t.y * t.z), o - a - n + s), this._y = Math.asin(r(2 * (t.x * t.z + t.y * t.w))), this._z = Math.atan2(2 * (t.z * t.w - t.x * t.y), o + a - n - s)) : "YXZ" === e ? (this._x = Math.asin(r(2 * (t.x * t.w - t.y * t.z))), this._y = Math.atan2(2 * (t.x * t.z + t.y * t.w), o - a - n + s), this._z = Math.atan2(2 * (t.x * t.y + t.z * t.w), o - a + n - s)) : "ZXY" === e ? (this._x = Math.asin(r(2 * (t.x * t.w + t.y * t.z))), this._y = Math.atan2(2 * (t.y * t.w - t.z * t.x), o - a - n + s), this._z = Math.atan2(2 * (t.z * t.w - t.x * t.y), o - a + n - s)) : "ZYX" === e ? (this._x = Math.atan2(2 * (t.x * t.w + t.z * t.y), o - a - n + s), this._y = Math.asin(r(2 * (t.y * t.w - t.x * t.z))), this._z = Math.atan2(2 * (t.x * t.y + t.z * t.w), o + a - n - s)) : "YZX" === e ? (this._x = Math.atan2(2 * (t.x * t.w - t.z * t.y), o - a + n - s), this._y = Math.atan2(2 * (t.y * t.w - t.x * t.z), o + a - n - s), this._z = Math.asin(r(2 * (t.x * t.y + t.z * t.w)))) : "XZY" === e ? (this._x = Math.atan2(2 * (t.x * t.w + t.y * t.z), o - a + n - s), this._y = Math.atan2(2 * (t.x * t.z + t.y * t.w), o + a - n - s), this._z = Math.asin(r(2 * (t.z * t.w - t.x * t.y)))) : console.warn("WARNING: Euler.setFromQuaternion() given unsupported order: " + e), this._order = e, i !== !1 && this._updateQuaternion(), this
		},
		reorder: function() {
			var t = new Qe.Quat;
			return function(e) {
				t.setFromEuler(this), this.setFromQuaternion(t, e)
			}
		}(),
		fromArray: function(t) {
			return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== e && (this._order = t[3]), this._updateQuaternion(), this
		},
		toArray: function() {
			return [this._x, this._y, this._z, this._order]
		},
		equals: function(t) {
			return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
		},
		clone: function() {
			return new Qe.Euler(this._x, this._y, this._z, this._order)
		}
	}, Qe.math = {}, Qe.math.Plane = function(t, i) {
		this.normal = t !== e ? t : new Je(1, 0, 0), this.constant = i !== e ? i : 0
	}, Qe.math.Plane.prototype = {
		constructor: Qe.math.Plane,
		set: function(t, e) {
			return this.normal.copy(t), this.constant = e, this
		},
		setComponents: function(t, e, i, r) {
			return this.normal.set(t, e, i), this.constant = r, this
		},
		setFromNormalAndCoplanarPoint: function(t, e) {
			return this.normal.copy(t), this.constant = -e.dot(this.normal), this
		},
		setFromCoplanarPoints: function(t, e, i) {
			var r = Qe.math.Plane.__v1.subVectors(i, e).cross(Qe.math.Plane.__v2.subVectors(t, e)).normalize();
			return this.setFromNormalAndCoplanarPoint(r, t), this
		},
		copy: function(t) {
			return this.normal.copy(t.normal), this.constant = t.constant, this
		},
		normalize: function() {
			var t = 1 / this.normal.length();
			return this.normal.multiplyScalar(t), this.constant *= t, this
		},
		negate: function() {
			return this.constant *= -1, this.normal.negate(), this
		},
		distanceToPoint: function(t) {
			return this.normal.dot(t) + this.constant
		},
		distanceToSphere: function(t) {
			return this.distanceToPoint(t.center) - t.radius
		},
		projectPoint: function(t, e) {
			return this.orthoPoint(t, e).sub(t).negate()
		},
		orthoPoint: function(t, e) {
			var i = this.distanceToPoint(t),
				r = e || new Je;
			return r.copy(this.normal).multiplyScalar(i)
		},
		isIntersectionLine: function(t, e) {
			var i = this.distanceToPoint(t),
				r = this.distanceToPoint(e);
			return 0 > i && r > 0 || 0 > r && i > 0
		},
		isIntersectionFace: function(t, e) {
			var i = [];
			i.push(e[t.a]), i.push(e[t.b]), i.push(e[t.c]), null != t.d && i.push(e[t.d]);
			var r, a, n, s = [];
			for (r = 0; r < i.length; r++) s.push(this.distanceToPoint(i[r]));
			for (r = 0; r < s.length; r++)
				if (0 == r) a = n = s[r];
				else {
					if (n = s[r], 0 > a && n > 0 || 0 > n && a > 0) return "intersect";
					a = n
				}
			return n > 0 ? "in" : "out"
		},
		intersectLine: function(t, i, r) {
			var a = r || new Je,
				n = Qe.math.Plane.__v1.subVectors(i, t),
				s = this.normal.dot(n);
			if (0 == s) return 0 == this.distanceToPoint(t) ? a.copy(t) : e;
			var o = -(t.dot(this.normal) + this.constant) / s;
			return 0 > o || o > 1 ? e : a.copy(n).multiplyScalar(o).add(t)
		},
		coplanarPoint: function(t) {
			var e = t || new Je;
			return e.copy(this.normal).multiplyScalar(-this.constant)
		},
		transform: function(t, e) {
			e = e || (new Qe.Mat3).getInverse(t).transpose();
			var i = Qe.math.Plane.__v1.copy(this.normal).applyMatrix3(e),
				r = this.coplanarPoint(Qe.math.Plane.__v2);
			return r.applyMatrix4(t), this.setFromNormalAndCoplanarPoint(i, r), this
		},
		translate: function(t) {
			return this.constant = this.constant - t.dot(this.normal), this
		},
		equals: function(t) {
			return t.normal.equals(this.normal) && t.constant == this.constant
		},
		clone: function() {
			return (new Qe.math.Plane).copy(this)
		}
	}, Qe.math.Plane.__vZero = new Je(0, 0, 0), Qe.math.Plane.__v1 = new Je, Qe.math.Plane.__v2 = new Je, Qe.Frustum = function(t, i, r, a, n, s) {
		this.planes = [t !== e ? t : new Qe.math.Plane, i !== e ? i : new Qe.math.Plane, r !== e ? r : new Qe.math.Plane, a !== e ? a : new Qe.math.Plane, n !== e ? n : new Qe.math.Plane, s !== e ? s : new Qe.math.Plane]
	}, Qe.Frustum.prototype = {
		set: function(t, e, i, r, a, n) {
			var s = this.planes;
			return s[0].copy(t), s[1].copy(e), s[2].copy(i), s[3].copy(r), s[4].copy(a), s[5].copy(n), this
		},
		setPoints: function(t) {
			this.points = t
		},
		copy: function(t) {
			for (var e = this.planes, i = 0; 6 > i; i++) e[i].copy(t.planes[i]);
			return this
		},
		setFromMatrix: function(t) {
			var e = this.planes,
				i = t.elements,
				r = i[0],
				a = i[1],
				n = i[2],
				s = i[3],
				o = i[4],
				l = i[5],
				h = i[6],
				c = i[7],
				u = i[8],
				f = i[9],
				p = i[10],
				d = i[11],
				m = i[12],
				g = i[13],
				y = i[14],
				v = i[15];
			return e[0].setComponents(s - r, c - o, d - u, v - m).normalize(), e[1].setComponents(s + r, c + o, d + u, v + m).normalize(), e[2].setComponents(s + a, c + l, d + f, v + g).normalize(), e[3].setComponents(s - a, c - l, d - f, v - g).normalize(), e[4].setComponents(s - n, c - h, d - p, v - y).normalize(), e[5].setComponents(s + n, c + h, d + p, v + y).normalize(), this
		},
		intersectsObjectAccurate: function(t, e) {
			if (0 == e) return this.intersectsObject(t);
			var i, r, a = t.worldMatrix,
				n = (this.planes, t.vertices),
				s = [],
				o = n.length;
			for (r = 0; o > r; r++)
				if (i = n[r].clone(), i.applyMatrix4(a), s.push(i), this.containsPoint(i)) return !0;
			if (2 == e)
				if (t instanceof Qe.Line)
					for (r = 0, o = s.length; o - 1 > r; r++) {
						var l = s[r],
							h = s[r + 1];
						if (this.containsLine(l, h)) return !0
					} else {
						var c, u = t.faces;
						for (r = 0, o = u.length; o > r; r++) {
							if (c = u[r], this.containsLine(s[c.a], s[c.b])) return !0;
							if (this.containsLine(s[c.b], s[c.c])) return !0;
							if (null != c.d) {
								if (this.containsLine(s[c.c], s[c.d])) return !0;
								if (this.containsLine(s[c.d], s[c.a])) return !0
							} else if (this.containsLine(s[c.a], s[c.c])) return !0
						}
					}
				return !1
		},
		intersectsObject: function(t) {
			var e = t.worldMatrix,
				i = this.planes,
				r = e.getPosition();
			if (!t.computeBoundingSphere) return !1;
			t.boundingSphere || t.computeBoundingSphere();
			for (var a = -t.boundingSphere.radius * e.getMaxScaleOnAxis(), n = 0; 6 > n; n++) {
				var s = i[n].distanceToPoint(r);
				if (a > s) return !1
			}
			return !0
		},
		intersectsSphere: function(t) {
			for (var e = this.planes, i = t.center, r = -t.radius, a = 0; 6 > a; a++) {
				var n = e[a].distanceToPoint(i);
				if (r > n) return !1
			}
			return !0
		},
		intersectsBox: function(t) {
			for (var e = new Je, i = new Je, r = this.planes, a = 0; 6 > a; a++) {
				var n = r[a];
				e.x = n.normal.x > 0 ? t.min.x : t.max.x, i.x = n.normal.x > 0 ? t.max.x : t.min.x, e.y = n.normal.y > 0 ? t.min.y : t.max.y, i.y = n.normal.y > 0 ? t.max.y : t.min.y, e.z = n.normal.z > 0 ? t.min.z : t.max.z, i.z = n.normal.z > 0 ? t.max.z : t.min.z;
				var s = n.distanceToPoint(e),
					o = n.distanceToPoint(i);
				if (0 > s && 0 > o) return !1
			}
			return !0
		},
		containsLine: function(t, e) {
			for (var i = this.planes, r = new Je, a = 0; 6 > a; a++)
				if (r = i[a].intersectLine(t, e, r), r && this.containsPoint(r)) return !0;
			return !1
		},
		containsPoint: function(t) {
			for (var e = this.planes, i = 0; 6 > i; i++)
				if (e[i].distanceToPoint(t) < 0) return !1;
			return !0
		},
		clone: function() {
			return (new Qe.Frustum).copy(this)
		}
	}, Qe.Ray = function(t, i) {
		this.origin = t !== e ? t : new Je, this.direction = i !== e ? i : new Je
	}, Qe.Ray.prototype = {
		constructor: Qe.Ray,
		set: function(t, e) {
			return this.origin.copy(t), this.direction.copy(e), this
		},
		copy: function(t) {
			return this.origin.copy(t.origin), this.direction.copy(t.direction), this
		},
		at: function(t, e) {
			var i = e || new Je;
			return i.copy(this.direction).multiplyScalar(t).add(this.origin)
		},
		recast: function(t) {
			return this.origin.copy(this.at(t, Qe.Ray.__v1)), this
		},
		closestPointToPoint: function(t, e) {
			var i = e || new Je;
			i.subVectors(t, this.origin);
			var r = i.dot(this.direction);
			return i.copy(this.direction).multiplyScalar(r).add(this.origin)
		},
		distanceToPoint: function(t) {
			var e = Qe.Ray.__v1.subVectors(t, this.origin).dot(this.direction);
			return Qe.Ray.__v1.copy(this.direction).multiplyScalar(e).add(this.origin), Qe.Ray.__v1.distanceTo(t)
		},
		isIntersectionSphere: function(t) {
			return this.distanceToPoint(t.center) <= t.radius
		},
		isIntersectionPlane: function(t) {
			var e = t.normal.dot(this.direction);
			return 0 != e ? !0 : 0 == t.distanceToPoint(this.origin) ? !0 : !1
		},
		distanceToPlane: function(t) {
			var i = t.normal.dot(this.direction);
			if (0 == i) return 0 == t.distanceToPoint(this.origin) ? 0 : e;
			var r = -(this.origin.dot(t.normal) + t.constant) / i;
			return r
		},
		intersectPlane: function(t, i) {
			var r = this.distanceToPlane(t);
			return r === e ? e : this.at(r, i)
		},
		transform: function(t) {
			return this.direction.add(this.origin).applyMatrix4(t), this.origin.applyMatrix4(t), this.direction.sub(this.origin), this
		},
		distanceSqToSegment: function(t, e, i, r) {
			var a, n, s, o, l = t.clone().add(e).multiplyScalar(.5),
				h = e.clone().sub(t).normalize(),
				c = .5 * t.distanceTo(e),
				u = this.origin.clone().sub(l),
				f = -this.direction.dot(h),
				p = u.dot(this.direction),
				d = -u.dot(h),
				m = u.lengthSq(),
				g = Math.abs(1 - f * f);
			if (g >= 0)
				if (a = f * d - p, n = f * p - d, o = c * g, a >= 0)
					if (n >= -o)
						if (o >= n) {
							var y = 1 / g;
							a *= y, n *= y, s = a * (a + f * n + 2 * p) + n * (f * a + n + 2 * d) + m
						} else n = c, a = Math.max(0, -(f * n + p)), s = -a * a + n * (n + 2 * d) + m;
			else n = -c, a = Math.max(0, -(f * n + p)), s = -a * a + n * (n + 2 * d) + m;
			else -o >= n ? (a = Math.max(0, -(-f * c + p)), n = a > 0 ? -c : Math.min(Math.max(-c, -d), c), s = -a * a + n * (n + 2 * d) + m) : o >= n ? (a = 0, n = Math.min(Math.max(-c, -d), c), s = n * (n + 2 * d) + m) : (a = Math.max(0, -(f * c + p)), n = a > 0 ? c : Math.min(Math.max(-c, -d), c), s = -a * a + n * (n + 2 * d) + m);
			else n = f > 0 ? -c : c, a = Math.max(0, -(f * n + p)), s = -a * a + n * (n + 2 * d) + m;
			return i && i.copy(this.direction.clone().multiplyScalar(a).add(this.origin)), r && r.copy(h.clone().multiplyScalar(n).add(l)), s
		},
		equals: function(t) {
			return t.origin.equals(this.origin) && t.direction.equals(this.direction)
		},
		clone: function() {
			return (new Qe.Ray).copy(this)
		}
	}, Qe.Ray.__v1 = new Je, Qe.Ray.__v2 = new Je, Qe.Triangle = function(t, i, r) {
		this.a = t !== e ? t : new Je, this.b = i !== e ? i : new Je, this.c = r !== e ? r : new Je
	}, Qe.Triangle.normal = function(t, e, i, r) {
		var a = r || new Je;
		a.subVectors(i, e), Qe.Triangle.__v0.subVectors(t, e), a.cross(Qe.Triangle.__v0);
		var n = a.lengthSq();
		return n > 0 ? a.multiplyScalar(1 / Math.sqrt(n)) : a.set(0, 0, 0)
	}, Qe.Triangle.barycoordFromPoint = function(t, e, i, r, a) {
		Qe.Triangle.__v0.subVectors(r, e), Qe.Triangle.__v1.subVectors(i, e), Qe.Triangle.__v2.subVectors(t, e);
		var n = Qe.Triangle.__v0.dot(Qe.Triangle.__v0),
			s = Qe.Triangle.__v0.dot(Qe.Triangle.__v1),
			o = Qe.Triangle.__v0.dot(Qe.Triangle.__v2),
			l = Qe.Triangle.__v1.dot(Qe.Triangle.__v1),
			h = Qe.Triangle.__v1.dot(Qe.Triangle.__v2),
			c = n * l - s * s,
			u = a || new Je;
		if (0 == c) return u.set(-2, -1, -1);
		var f = 1 / c,
			p = (l * o - s * h) * f,
			d = (n * h - s * o) * f;
		return u.set(1 - p - d, d, p)
	}, Qe.Triangle.containsPoint = function(t, e, i, r) {
		var a = Qe.Triangle.barycoordFromPoint(t, e, i, r, Qe.Triangle.__v3);
		return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1
	}, Qe.Triangle.prototype = {
		constructor: Qe.Triangle,
		set: function(t, e, i) {
			return this.a.copy(t), this.b.copy(e), this.c.copy(i), this
		},
		setFromPointsAndIndices: function(t, e, i, r) {
			return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[r]), this
		},
		copy: function(t) {
			return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
		},
		area: function() {
			return Qe.Triangle.__v0.subVectors(this.c, this.b), Qe.Triangle.__v1.subVectors(this.a, this.b), .5 * Qe.Triangle.__v0.cross(Qe.Triangle.__v1).length()
		},
		midpoint: function(t) {
			var e = t || new Je;
			return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
		},
		normal: function(t) {
			return Qe.Triangle.normal(this.a, this.b, this.c, t)
		},
		plane: function(t) {
			var e = t || new Qe.math.Plane;
			return e.setFromCoplanarPoints(this.a, this.b, this.c)
		},
		barycoordFromPoint: function(t, e) {
			return Qe.Triangle.barycoordFromPoint(t, this.a, this.b, this.c, e)
		},
		containsPoint: function(t) {
			return Qe.Triangle.containsPoint(t, this.a, this.b, this.c)
		},
		equals: function(t) {
			return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
		},
		clone: function() {
			return (new Qe.Triangle).copy(this)
		},
		intersectLine: function(t, e) {
			var i = this.plane(),
				r = i.intersectLine(t, e);
			return null != r && this.containsPoint(r)
		}
	}, Qe.Triangle.__v0 = new Je, Qe.Triangle.__v1 = new Je, Qe.Triangle.__v2 = new Je, Qe.Triangle.__v3 = new Je;
	var ei = {
		getLogicalPoint: function(t, e) {
			var i, r = t.getBoundingClientRect();
			if (ii.isTouchable && e.changedTouches && e.changedTouches.length > 0) {
				var a = e.changedTouches[0],
					n = ii.isAndroid ? 0 : $touch.scrollLeft(),
					s = ii.isAndroid ? 0 : $touch.scrollTop();
				i = {
					x: a.clientX + t.scrollLeft - r.left - n,
					y: a.clientY + t.scrollTop - r.top - s
				}
			} else {
				if (!ei.isValidEvent(t, e)) return null;
				i = {
					x: e.clientX - r.left + t.scrollLeft,
					y: e.clientY - r.top + t.scrollTop
				}
			}
			return i
		},
		isValidEvent: function(t, e) {
			if (!e) return !1;
			if (e.target === t)
				if (ii.isFirefox) {
					if (t.clientHeight < t.scrollHeight && e.layerX < 25) return !1;
					if (t.clientWidth < t.scrollWidth && e.layerY < 25) return !1
				} else if (e.offsetX > t.clientWidth || e.offsetY > t.clientHeight) return !1;
			return !0
		},
		isImage: function(t) {
			return t && t.nodeName && "img" === t.nodeName.toLowerCase()
		},
		isCanvas: function(t) {
			return t && t.nodeName && "canvas" === t.nodeName.toLowerCase()
		},
		createView: function(t, e) {
			var i = document.createElement("div");
			return i.style.position = vi.VIEW_POSITION, i.style.fontSize = vi.VIEW_FONT_SIZE, i.style.fontFamily = vi.VIEW_FONT_FAMILY, i.style.cursor = "default", i.style.outline = "none", i.style.textAlign = "left", i.style.msTouchAction = "none", i.tabIndex = 0, e || (i.onmousedown = ei.preventDefault), i.style.setProperty && (i.style.setProperty("-khtml-user-select", "none", null), i.style.setProperty("-webkit-user-select", "none", null), i.style.setProperty("-moz-user-select", "none", null), i.style.setProperty("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)", null)), t && (i.style.overflow = t), i
		},
		preventDefault: function(t) {
			vi.KEEP_DEFAULT_FUNCTION(t) || (t.preventDefault ? t.preventDefault() : t.preventManipulation ? t.preventManipulation() : t.returnValue = !1)
		},
		createCanvas: function(t) {
			var e = document.createElement("canvas"),
				i = t.getView();
			return e.width = i.width, e.height = i.height, e.style.msTouchAction = "none", e.style.position = "absolute", e
		},
		isCtrlDown: function(t) {
			return t.ctrlKey || t.metaKey
		},
		getScrollTop: function(t) {
			if (!t) return 0;
			var e = t.scrollTop,
				i = t.parentElement;
			return e + this.getScrollTop(i)
		},
		getScrollLeft: function(t) {
			if (!t) return 0;
			var e = t.scrollLeft,
				i = t.parentElement;
			return e + this.getScrollLeft(i)
		},
		debug: function(t, e) {
			try {
				t.call(e)
			} catch (i) {
				alert(i)
			}
		},
		setFocus: function(t) {
			if (document.activeElement !== t) {
				var e, i, r, a = document.documentElement;
				document.body;
				a && (ii.isIE || ii.isOpera || a.scrollLeft || a.scrollTop) && (e = a.scrollLeft, i = a.scrollTop, r = a), t.focus(), r && (r.scrollLeft = e, r.scrollTop = i)
			}
		},
		isRightClick: function(e) {
			var i;
			if (!e) var e = t.event;
			return e.which ? i = 3 == e.which : e.button && (i = 2 == e.button), i
		}
	};
	Qe.html = ei;
	var ii = function() {
		var t = {},
			e = navigator.userAgent.toLowerCase();
		return t.isOpera = /opera/.test(e), t.isIE = /msie/.test(e) || /trident/.test(e), t.isFirefox = /firefox/i.test(e), t.isChrome = /chrome/i.test(e), t.isSafari = !t.isChrome && /safari/i.test(e), t.isIPhone = /iphone/.test(e), t.isIPod = /ipod/.test(e), t.isIPad = /ipad/.test(e), t.isAndroid = /android/i.test(e), t.isWebOS = /webos/i.test(e), t.isMSToucheable = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, t.isTouchable = "ontouchend" in document || t.isMSToucheable, t.isIOS = t.isIPhone || t.isIPod || t.isIPad, t
	}();
	Qe.ua = ii,
		function() {
			function e(t) {
				var e, i, a, n, s, o;
				for (a = t.length, i = 0, e = ""; a > i;) {
					if (n = 255 & t.charCodeAt(i++), i == a) {
						e += r.charAt(n >> 2), e += r.charAt((3 & n) << 4), e += "==";
						break
					}
					if (s = t.charCodeAt(i++), i == a) {
						e += r.charAt(n >> 2), e += r.charAt((3 & n) << 4 | (240 & s) >> 4), e += r.charAt((15 & s) << 2), e += "=";
						break
					}
					o = t.charCodeAt(i++), e += r.charAt(n >> 2), e += r.charAt((3 & n) << 4 | (240 & s) >> 4), e += r.charAt((15 & s) << 2 | (192 & o) >> 6), e += r.charAt(63 & o)
				}
				return e
			}

			function i(t) {
				var e, i, r, n, s, o, l;
				for (o = t.length, s = 0, l = ""; o > s;) {
					do e = a[255 & t.charCodeAt(s++)]; while (o > s && -1 == e);
					if (-1 == e) break;
					do i = a[255 & t.charCodeAt(s++)]; while (o > s && -1 == i);
					if (-1 == i) break;
					l += String.fromCharCode(e << 2 | (48 & i) >> 4);
					do {
						if (r = 255 & t.charCodeAt(s++), 61 == r) return l;
						r = a[r]
					} while (o > s && -1 == r);
					if (-1 == r) break;
					l += String.fromCharCode((15 & i) << 4 | (60 & r) >> 2);
					do {
						if (n = 255 & t.charCodeAt(s++), 61 == n) return l;
						n = a[n]
					} while (o > s && -1 == n);
					if (-1 == n) break;
					l += String.fromCharCode((3 & r) << 6 | n)
				}
				return l
			}
			var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				a = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
			t.btoa || (t.btoa = e), t.atob || (t.atob = i)
		}();
	var ri = function() {
			var e = !1,
				i = document.createElement("canvas");
			if (i.getContext("2d") && (e = !0), !e) return {
				saveAsBMP: function() {},
				saveAsPNG: function() {},
				saveAsJPEG: function() {}
			};
			var r = !!i.getContext("2d").getImageData,
				a = !!i.toDataURL,
				n = !!t.btoa,
				s = function(t) {
					var e = parseInt(t.width),
						i = parseInt(t.height);
					return t.getContext("2d").getImageData(0, 0, e, i)
				},
				o = function(t) {
					var e = "";
					if ("string" == typeof t) e = t;
					else
						for (var i = t, r = 0; r < i.length; r++) e += String.fromCharCode(i[r]);
					return btoa(e)
				},
				l = function(t) {
					var e = [],
						i = t.width,
						r = t.height;
					e.push(66), e.push(77);
					var a = i * r * 3 + 54;
					e.push(a % 256), a = Math.floor(a / 256), e.push(a % 256), a = Math.floor(a / 256), e.push(a % 256), a = Math.floor(a / 256), e.push(a % 256), e.push(0), e.push(0), e.push(0), e.push(0), e.push(54), e.push(0), e.push(0), e.push(0);
					var n = [];
					n.push(40), n.push(0), n.push(0), n.push(0);
					var s = i;
					n.push(s % 256), s = Math.floor(s / 256), n.push(s % 256), s = Math.floor(s / 256), n.push(s % 256), s = Math.floor(s / 256), n.push(s % 256);
					var l = r;
					n.push(l % 256), l = Math.floor(l / 256), n.push(l % 256), l = Math.floor(l / 256), n.push(l % 256), l = Math.floor(l / 256), n.push(l % 256), n.push(1), n.push(0), n.push(24), n.push(0), n.push(0), n.push(0), n.push(0), n.push(0);
					var h = i * r * 3;
					n.push(h % 256), h = Math.floor(h / 256), n.push(h % 256), h = Math.floor(h / 256), n.push(h % 256), h = Math.floor(h / 256), n.push(h % 256);
					for (var c = 0; 16 > c; c++) n.push(0);
					var u = (4 - 3 * i % 4) % 4,
						f = t.data,
						p = "",
						d = r;
					do {
						for (var m = i * (d - 1) * 4, g = "", y = 0; i > y; y++) {
							var v = 4 * y;
							g += String.fromCharCode(f[m + v + 2]), g += String.fromCharCode(f[m + v + 1]), g += String.fromCharCode(f[m + v])
						}
						for (var x = 0; u > x; x++) g += String.fromCharCode(0);
						p += g
					} while (--d);
					var A = o(e.concat(n)) + o(p);
					return A
				},
				h = function(t, e) {
					return "data:" + e + ";base64," + t
				},
				c = function(t) {
					var e = document.createElement("img");
					return e.src = t, e
				},
				u = function(t, e, i, r, a) {
					i = i || (e ? e.w : t.width), r = r || (e ? e.h : t.height);
					var n = document.createElement("canvas");
					n.width = i, n.height = r, n.style.width = i + "px", n.style.height = r + "px";
					var s = n.getContext("2d"),
						s = n.getContext("2d"),
						o = t.style.backgroundColor;
					return o || (o = "PNG" === a ? "rgba(255,255,255,0.0)" : "BMP" === a ? "rgba(255,255,255,0.01)" : "#FFFFFF"), s.fillStyle = o, s.fillRect(0, 0, i, r), e = e ? e : {
						x: 0,
						y: 0,
						w: t.width,
						h: t.height
					}, s.drawImage(t, e.x, e.y, e.w, e.h, 0, 0, i, r), n
				};
			return {
				saveAsPNG: function(t, e, i, r, n) {
					if (!a) return !1;
					var s = u(t, e, r, n, "PNG"),
						o = s.toDataURL("image/png");
					return i ? c(o) : o
				},
				saveAsJPEG: function(t, e, i, r, n) {
					if (!a) return !1;
					var s = u(t, e, r, n, "JPEG"),
						o = "image/jpeg",
						l = s.toDataURL(o);
					return 5 != l.indexOf(o) ? !1 : i ? c(l) : l;
				},
				saveAsBMP: function(t, e, i, a, o) {
					if (!r || !n) return !1;
					var f = u(t, e, a, o, "BMP"),
						p = s(f),
						d = l(p);
					return i ? c(h(d, "image/bmp")) : h(d, "image/bmp")
				}
			}
		}(),
		ai = {},
		ni = {
			cache: {},
			g: document.createElement("canvas").getContext("2d"),
			getTextSize: function(t, e) {
				ni.g.font = t ? t : vi.FONT;
				var i = ni.cache[ni.g.font];
				return i || (i = 2 * ni.g.measureText("e").width + 4, ni.cache[ni.g.font] = i), {
					width: ni.g.measureText(e).width + 4,
					height: i
				}
			}
		};
	ai.g = ni, Qe.g = ni;
	var si = {};
	setTimeout;
	si.bcld = function(t, e, i, r, a, n, s, o, l) {
		var h, c, u = t / 2,
			f = [],
			p = [],
			d = {
				vertices: [],
				faces: [],
				uvs: [],
				uv2s: []
			};
		for (c = 0; e >= c; c++) {
			var m = [],
				g = [],
				y = c / e,
				v = y * (i - r) + r;
			for (h = 0; a >= h; h++) {
				var x = h / a,
					A = new Je;
				A.x = v * Math.sin(x * o + l), A.y = -y * t + u, A.z = v * Math.cos(x * o + l), d.vertices.push(A), m.push(d.vertices.length - 1), g.push(new Ke(x, 1 - y))
			}
			f.push(m), p.push(g)
		}
		var w, _, S = (i - r) / t;
		for (h = 0; a > h; h++)
			for (0 !== r ? (w = d.vertices[f[0][h]].clone(), _ = d.vertices[f[0][h + 1]].clone()) : (w = d.vertices[f[1][h]].clone(), _ = d.vertices[f[1][h + 1]].clone()), w.setY(Math.sqrt(w.x * w.x + w.z * w.z) * S).normalize(), _.setY(Math.sqrt(_.x * _.x + _.z * _.z) * S).normalize(), c = 0; e > c; c++) {
				var b = f[c][h],
					M = f[c + 1][h],
					C = f[c + 1][h + 1],
					P = f[c][h + 1],
					T = w.clone(),
					z = w.clone(),
					L = _.clone(),
					E = _.clone(),
					D = p[c][h].clone(),
					B = p[c + 1][h].clone(),
					N = p[c + 1][h + 1].clone(),
					R = p[c][h + 1].clone();
				d.faces.push(new mi(b, M, P, [T, z, E], null, 0)), d.uvs.push([D, B, R]), d.uv2s.push([D.clone(), B.clone(), R.clone()]), d.faces.push(new mi(M, C, P, [z, L, E], null, 0)), d.uvs.push([B, N, R]), d.uv2s.push([B.clone(), N.clone(), R.clone()])
			}
		var I = !1;
		if (n === !1 && r > 0)
			for (d.vertices.push(new Je(0, u, 0)), I = !0, h = 0; a > h; h++) {
				var b = f[0][h],
					M = f[0][h + 1],
					C = d.vertices.length - 1,
					T = new Je(0, 1, 0),
					z = new Je(0, 1, 0),
					L = new Je(0, 1, 0),
					F = d.vertices[b],
					V = d.vertices[M],
					D = new Ke((F.x / r + 1) / 2, 1 - (F.z / r + 1) / 2),
					B = new Ke((V.x / r + 1) / 2, 1 - (V.z / r + 1) / 2),
					N = new Ke(.5, .5);
				d.faces.push(new mi(b, M, C, [T, z, L], null, 1)), d.uvs.push([D, B, N]), d.uv2s.push([D.clone(), B.clone(), N.clone()])
			}
		var U = !1;
		if (s === !1 && i > 0)
			for (d.vertices.push(new Je(0, -u, 0)), U = !0, h = 0; a > h; h++) {
				var b = f[c][h + 1],
					M = f[c][h],
					C = d.vertices.length - 1,
					T = new Je(0, -1, 0),
					z = new Je(0, -1, 0),
					L = new Je(0, -1, 0),
					F = d.vertices[b],
					V = d.vertices[M],
					D = new Ke((F.x / i + 1) / 2, (F.z / i + 1) / 2),
					B = new Ke((V.x / i + 1) / 2, (V.z / i + 1) / 2),
					N = new Ke(.5, .5);
				d.faces.push(new mi(b, M, C, [T, z, L], null, 2)), d.uvs.push([D, B, N]), d.uv2s.push([D.clone(), B.clone(), N.clone()])
			}
		if (o !== 2 * Math.PI) {
			!I && d.vertices.push(new Je(0, u, 0)), !U && d.vertices.push(new Je(0, -u, 0));
			var b = f[0][0],
				M = f[e][0],
				C = d.vertices.length - 1,
				P = d.vertices.length - 2,
				D = new Ke(0, 0),
				B = new Ke(0, 1),
				N = new Ke(1, 1),
				R = new Ke(1, 0);
			d.faces.push(new mi(b, C, M)), d.uvs.push([D, N, B]), d.uv2s.push([D.clone(), N.clone(), B.clone()]), d.faces.push(new mi(P, C, b)), d.uvs.push([R, N, D]), d.uv2s.push([R.clone(), N.clone(), D.clone()]), b = f[0][a], M = f[e][a];
			var D = new Ke(0, 0),
				B = new Ke(0, 1),
				N = new Ke(1, 1),
				R = new Ke(1, 0);
			d.faces.push(new mi(b, M, P)), d.uvs.push([D, B, R]), d.uv2s.push([D.clone(), B.clone(), R.clone()]), d.faces.push(new mi(M, C, P)), d.uvs.push([B, N, R]), d.uv2s.push([B.clone(), N.clone(), R.clone()])
		}
		return d
	}, si.buildCubeData = function(t, e, i, r, a, n, s, o) {
		function l(l) {
			var d, m, g, y, v, x, A, w, _, S;
			h = c.length;
			var b, M = "six-each" == s || "front-other" == s || "back-other" == s || "left-other" == s || "right-other" == s || "top-other" == s || "bottom-other" == s,
				C = new Ke(0, 0),
				P = M ? new Ke(1 / 3, .5) : new Ke(1, 1),
				T = s.split("-")[0];
			"six" == T ? T = null : P = new Ke(.5, 1), "right" == l ? (d = "z", m = "y", g = "x", y = -1, v = -1, x = t / 2, A = i, w = e, _ = n, S = a, b = 0, C = new Ke(2 / 3, 0)) : "left" == l ? (d = "z", m = "y", g = "x", y = 1, v = -1, x = -t / 2, A = i, w = e, _ = n, S = a, b = 1) : "top" == l ? (d = "x", m = "z", g = "y", y = 1, v = 1, x = e / 2, A = t, w = i, _ = r, S = n, b = 2, C = new Ke(1 / 3, .5)) : "bottom" == l ? (d = "x", m = "z", g = "y", y = 1, v = -1, x = -e / 2, A = t, w = i, _ = r, S = n, b = 3, C = new Ke(0, .5)) : "front" == l ? (d = "x", m = "y", g = "z", y = 1, v = -1, x = i / 2, A = t, w = e, _ = r, S = a, b = 4, C = new Ke(1 / 3, 0)) : "back" == l && (d = "x", m = "y", g = "z", y = -1, v = -1, x = -i / 2, A = t, w = e, _ = r, S = a, b = 5, C = new Ke(2 / 3, .5)), T && (C = T == l ? new Ke(0, 0) : new Ke(.5, 0));
			var z, L, E = _ + 1,
				D = S + 1;
			for (L = 0; D > L; L++)
				for (z = 0; E > z; z++) {
					var B = new Je;
					B[d] = (z / _ * A - A / 2) * y + o[d], B[m] = (L / S * w - w / 2) * v + o[m], B[g] = x + o[g], c.push(B)
				}
			M && (b = 0);
			var N = new Je;
			for (N[g] = x > 0 ? 1 : -1, L = 0; S > L; L++)
				for (z = 0; _ > z; z++) {
					var R = z + E * L,
						I = z + E * (L + 1),
						F = z + 1 + E * (L + 1),
						V = z + 1 + E * L,
						U = [new Ke(z / _, 1 - L / S), new Ke(z / _, 1 - (L + 1) / S), new Ke((z + 1) / _, 1 - (L + 1) / S), new Ke((z + 1) / _, 1 - L / S)];
					if (M)
						for (var k = 0; k < U.length; k++) U[k].multiply(P).add(C);
					var O = new gi(R + h, I + h, F + h, V + h);
					O.normal.copy(N), O.vertexNormals.push(N.clone(), N.clone(), N.clone(), N.clone()), O.materialIndex = b, u.push(O), f.push([U[0], U[1], U[2], U[3]]), p.push([U[0].clone(), U[1].clone(), U[2].clone(), U[3].clone()])
				}
		}
		var h, c = [],
			u = [],
			f = [],
			p = [];
		l("right"), l("left"), l("top"), l("bottom"), l("front"), l("back");
		var d = {
			vertices: c,
			faces: u,
			uvs: f,
			uv2s: p
		};
		return d
	}, si.bsd = function(t, e, i, r, a, n, s) {
		var o, l, h = [],
			c = [],
			u = [],
			f = [],
			p = [],
			d = [];
		for (l = 0; i >= l; l++) {
			var m = [],
				g = [];
			for (o = 0; e >= o; o++) {
				var y = o / e,
					v = l / i,
					x = new Je;
				x.x = -t * Math.cos(r + y * a) * Math.sin(n + v * s), x.y = t * Math.cos(n + v * s), x.z = t * Math.sin(r + y * a) * Math.sin(n + v * s), h.push(x), m.push(h.length - 1), g.push(new Ke(y, 1 - v))
			}
			p.push(m), d.push(g)
		}
		for (l = 0; i > l; l++)
			for (o = 0; e > o; o++) {
				var A = p[l][o + 1],
					w = p[l][o],
					_ = p[l + 1][o],
					S = p[l + 1][o + 1],
					b = h[A].clone().normalize(),
					M = h[w].clone().normalize(),
					C = h[_].clone().normalize(),
					P = h[S].clone().normalize(),
					T = d[l][o + 1].clone(),
					z = d[l][o].clone(),
					L = d[l + 1][o].clone(),
					E = d[l + 1][o + 1].clone();
				Math.abs(h[A].y) === t ? (u.push(new mi(A, _, S, [b, C, P])), c.push([T, L, E]), f.push([T.clone(), L.clone(), E.clone()])) : Math.abs(h[_].y) === t ? (u.push(new mi(A, w, _, [b, M, C])), c.push([T, z, L]), f.push([T.clone(), z.clone(), L.clone()])) : (u.push(new mi(A, w, S, [b, M, P])), c.push([T, z, E]), f.push([T.clone(), z.clone(), E.clone()]), u.push(new mi(w, _, S, [M.clone(), C, P.clone()])), c.push([z.clone(), L, E.clone()]), f.push([z.clone(), L.clone(), E.clone()]))
			}
		return {
			vertices: h,
			faces: u,
			uvs: c,
			uv2s: f
		}
	};
	var oi = function(t) {
			var i, r, a, n, s, o, l, h = {},
				c = t.primitive;
			if (c.groups) return t.groups = c.groups, void(t.groupList = c.groupList);
			c.groups = {};
			var u = t.material,
				f = t.getMaterialMapping();
			for (i = 0, r = c.faces.length; r > i; i++) a = c.faces[i], n = u instanceof Qe.ArrayMaterial ? a.materialIndex : 0, n = f[n], o = n !== e ? n : -1, h[o] === e && (h[o] = {
				hash: o,
				counter: 0
			}), l = h[o].hash + "_" + h[o].counter, c.groups[l] === e && (c.groups[l] = {
				faces3: [],
				faces4: [],
				materialIndex: n,
				vertices: 0
			}), s = a instanceof mi ? 3 : 4, c.groups[l].vertices + s > 65535 && (h[o].counter += 1, l = h[o].hash + "_" + h[o].counter, c.groups[l] === e && (c.groups[l] = {
				faces3: [],
				faces4: [],
				materialIndex: n,
				vertices: 0
			})), a instanceof mi ? c.groups[l].faces3.push(i) : c.groups[l].faces4.push(i), c.groups[l].vertices += s;
			c.groupsList = [];
			for (var p in t.groups) c.groupsList.push(t.groups[p]);
			t.groups = c.groups, t.groupList = c.groupsList
		},
		li = function(t, i, r, a) {
			var n, s, o, l, h, c, u, f, p, d, m, g, y = t,
				v = y,
				x = v.vertices,
				A = x.length,
				w = v.colors,
				_ = w.length,
				S = a.__vertexArray,
				b = a.__colorArray,
				M = a.__sortArray,
				C = v.verticesNeedUpdate,
				P = (v.elementsNeedUpdate, v.colorsNeedUpdate),
				T = v.__webglCustomAttributesList;
			if (y.sortParticles) {
				for (_projScreenMatrixPS.copy(_projScreenMatrix), _projScreenMatrixPS.multiply(y.matrixWorld), n = 0; A > n; n++) o = x[n], _vector3.copy(o), _vector3.applyProjection(_projScreenMatrixPS), M[n] = [_vector3.z, n];
				for (M.sort(numericalSort), n = 0; A > n; n++) o = x[M[n][1]], l = 3 * n, S[l] = o.x, S[l + 1] = o.y, S[l + 2] = o.z;
				for (s = 0; _ > s; s++) l = 3 * s, c = w[M[s][1]], b[l] = c.r, b[l + 1] = c.g, b[l + 2] = c.b;
				if (T)
					for (u = 0, f = T.length; f > u; u++)
						if (g = T[u], g.boundTo === e || "vertices" === g.boundTo)
							if (l = 0, d = g.value.length, 1 === g.size)
								for (p = 0; d > p; p++) h = M[p][1], g.array[p] = g.value[h];
							else if (2 === g.size)
					for (p = 0; d > p; p++) h = M[p][1], m = g.value[h], g.array[l] = m.x, g.array[l + 1] = m.y, l += 2;
				else if (3 === g.size)
					if ("c" === g.type)
						for (p = 0; d > p; p++) h = M[p][1], m = g.value[h], g.array[l] = m.r, g.array[l + 1] = m.g, g.array[l + 2] = m.b, l += 3;
					else
						for (p = 0; d > p; p++) h = M[p][1], m = g.value[h], g.array[l] = m.x, g.array[l + 1] = m.y, g.array[l + 2] = m.z, l += 3;
				else if (4 === g.size)
					for (p = 0; d > p; p++) h = M[p][1], m = g.value[h], g.array[l] = m.x, g.array[l + 1] = m.y, g.array[l + 2] = m.z, g.array[l + 3] = m.w, l += 4
			} else {
				if (C)
					for (n = 0; A > n; n++) o = x[n], l = 3 * n, S[l] = o.x, S[l + 1] = o.y, S[l + 2] = o.z;
				if (P)
					for (s = 0; _ > s; s++) c = w[s], l = 3 * s, b[l] = c.r, b[l + 1] = c.g, b[l + 2] = c.b;
				if (T)
					for (u = 0, f = T.length; f > u; u++)
						if (g = T[u], g.needsUpdate && (g.boundTo === e || "vertices" === g.boundTo))
							if (d = g.value.length, l = 0, 1 === g.size)
								for (p = 0; d > p; p++) g.array[p] = g.value[p];
							else if (2 === g.size)
					for (p = 0; d > p; p++) m = g.value[p], g.array[l] = m.x, g.array[l + 1] = m.y, l += 2;
				else if (3 === g.size)
					if ("c" === g.type)
						for (p = 0; d > p; p++) m = g.value[p], g.array[l] = m.r, g.array[l + 1] = m.g, g.array[l + 2] = m.b, l += 3;
					else
						for (p = 0; d > p; p++) m = g.value[p], g.array[l] = m.x, g.array[l + 1] = m.y, g.array[l + 2] = m.z, l += 3;
				else if (4 === g.size)
					for (p = 0; d > p; p++) m = g.value[p], g.array[l] = m.x, g.array[l + 1] = m.y, g.array[l + 2] = m.z, g.array[l + 3] = m.w, l += 4
			}
			if ((C || y.sortParticles) && (r.bindBuffer(r.ARRAY_BUFFER, a.__webglVertexBuffer), r.bufferData(r.ARRAY_BUFFER, S, i)), (P || y.sortParticles) && (r.bindBuffer(r.ARRAY_BUFFER, a.__webglColorBuffer), r.bufferData(r.ARRAY_BUFFER, b, i)), T)
				for (u = 0, f = T.length; f > u; u++) g = T[u], (g.needsUpdate || y.sortParticles) && (r.bindBuffer(r.ARRAY_BUFFER, g.buffer), r.bufferData(r.ARRAY_BUFFER, g.array, i))
		};
	si.buildGroupBufferData = function(t, i, r, a, n, s, o, l) {
			var h, c, u, f, p, d, m, g, y, v, x, A, w, _, S, b, M, C, P, T, z, L, E, D, B, N = "basic" == n._type ? !1 : !0,
				R = n.isVertexColor(),
				I = n.needUV(),
				F = l.needSmoothNormal(i, n),
				V = 0,
				U = 0,
				k = 0,
				O = 0,
				X = 0,
				G = 0,
				W = 0,
				H = 0,
				j = 0,
				q = 0,
				Y = o.__vertexArray,
				Z = o.__uvArray,
				Q = o.__uv2Array,
				K = o.__normalArray,
				J = o.__colorArray,
				$ = o.__webglCustomAttributesList,
				tt = o.__faceArray,
				et = o.__lineArray,
				it = i,
				rt = it.verticesNeedUpdate,
				at = it.elementsNeedUpdate,
				nt = it.uvsNeedUpdate,
				st = it.normalsNeedUpdate,
				ot = (it.tangentsNeedUpdate, it.colorsNeedUpdate),
				lt = (it.morphTargetsNeedUpdate, it.vertices),
				ht = t.faces3,
				ct = t.faces4,
				ut = it.faces,
				ft = it.uvs,
				pt = it.uv2s;
			it.colors, it.skinIndices, it.skinWeights, it.morphTargets, it.morphNormals;
			if (rt) {
				for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], x = lt[f.a], A = lt[f.b], w = lt[f.c], Y[U] = x.x, Y[U + 1] = x.y, Y[U + 2] = x.z, Y[U + 3] = A.x, Y[U + 4] = A.y, Y[U + 5] = A.z, Y[U + 6] = w.x, Y[U + 7] = w.y, Y[U + 8] = w.z, U += 9;
				for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], x = lt[f.a], A = lt[f.b], w = lt[f.c], _ = lt[f.d], Y[U] = x.x, Y[U + 1] = x.y, Y[U + 2] = x.z, Y[U + 3] = A.x, Y[U + 4] = A.y, Y[U + 5] = A.z, Y[U + 6] = w.x, Y[U + 7] = w.y, Y[U + 8] = w.z, Y[U + 9] = _.x, Y[U + 10] = _.y, Y[U + 11] = _.z, U += 12;
				s.bindBuffer(s.ARRAY_BUFFER, o.__webglVertexBuffer), s.bufferData(s.ARRAY_BUFFER, Y, r), o.__vertexArray = Y
			}
			if (ot && R) {
				for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], m = f.vertexColors, g = f.color, 3 === m.length && R === Qe.VertexColors ? (S = m[0], b = m[1], M = m[2]) : (S = g, b = g, M = g), J[H] = S.r, J[H + 1] = S.g, J[H + 2] = S.b, J[H + 3] = b.r, J[H + 4] = b.g, J[H + 5] = b.b, J[H + 6] = M.r, J[H + 7] = M.g, J[H + 8] = M.b, H += 9;
				for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], m = f.vertexColors, g = f.color, 4 === m.length && R === Qe.VertexColors ? (S = m[0], b = m[1], M = m[2], C = m[3]) : (S = g, b = g, M = g, C = g), J[H] = S.r, J[H + 1] = S.g, J[H + 2] = S.b, J[H + 3] = b.r, J[H + 4] = b.g, J[H + 5] = b.b, J[H + 6] = M.r, J[H + 7] = M.g, J[H + 8] = M.b, J[H + 9] = C.r, J[H + 10] = C.g, J[H + 11] = C.b, H += 12;
				H > 0 && (s.bindBuffer(s.ARRAY_BUFFER, o.__webglColorBuffer), s.bufferData(s.ARRAY_BUFFER, J, r))
			}
			if (st && N) {
				for (h = 0, c = ht.length; c > h; h++)
					if (f = ut[ht[h]], p = f.vertexNormals, d = f.normal, 3 === p.length && F)
						for (P = 0; 3 > P; P++) z = p[P], K[G] = z.x, K[G + 1] = z.y, K[G + 2] = z.z, G += 3;
					else
						for (P = 0; 3 > P; P++) K[G] = d.x, K[G + 1] = d.y, K[G + 2] = d.z, G += 3;
				for (h = 0, c = ct.length; c > h; h++)
					if (f = ut[ct[h]], p = f.vertexNormals, d = f.normal, 4 === p.length && F)
						for (P = 0; 4 > P; P++) z = p[P], null == K && console.log("normal array is null"), K[G] = z.x, K[G + 1] = z.y, K[G + 2] = z.z, G += 3;
					else
						for (P = 0; 4 > P; P++) K[G] = d.x, K[G + 1] = d.y, K[G + 2] = d.z, G += 3;
				s.bindBuffer(s.ARRAY_BUFFER, o.__webglNormalBuffer), s.bufferData(s.ARRAY_BUFFER, K, r), o.__normalArray = K
			}
			if (nt && ft && I) {
				for (h = 0, c = ht.length; c > h; h++)
					if (u = ht[h], y = ft[u], y !== e)
						for (P = 0; 3 > P; P++) L = y[P], Z[k] = L.x, Z[k + 1] = L.y, k += 2;
				for (h = 0, c = ct.length; c > h; h++)
					if (u = ct[h], y = ft[u], y !== e)
						for (P = 0; 4 > P; P++) L = y[P], Z[k] = L.x, Z[k + 1] = L.y, k += 2;
				k > 0 && (s.bindBuffer(s.ARRAY_BUFFER, o.__webglUVBuffer), s.bufferData(s.ARRAY_BUFFER, Z, r), o.uvArray = Z)
			}
			if (nt && pt && I) {
				for (h = 0, c = ht.length; c > h; h++)
					if (u = ht[h], v = pt[u], v !== e)
						for (P = 0; 3 > P; P++) E = v[P], Q[O] = E.x, Q[O + 1] = E.y, O += 2;
				for (h = 0, c = ct.length; c > h; h++)
					if (u = ct[h], v = pt[u], v !== e)
						for (P = 0; 4 > P; P++) E = v[P], Q[O] = E.x, Q[O + 1] = E.y, O += 2;
				O > 0 && (s.bindBuffer(s.ARRAY_BUFFER, o.__webglUV2Buffer), s.bufferData(s.ARRAY_BUFFER, Q, r))
			}
			if (at) {
				for (h = 0, c = ht.length; c > h; h++) tt[X] = V, tt[X + 1] = V + 1, tt[X + 2] = V + 2, X += 3, et[W] = V, et[W + 1] = V + 1, et[W + 2] = V, et[W + 3] = V + 2, et[W + 4] = V + 1, et[W + 5] = V + 2, W += 6, V += 3;
				for (h = 0, c = ct.length; c > h; h++) tt[X] = V, tt[X + 1] = V + 1, tt[X + 2] = V + 3, tt[X + 3] = V + 1, tt[X + 4] = V + 2, tt[X + 5] = V + 3, X += 6, et[W] = V, et[W + 1] = V + 1, et[W + 2] = V, et[W + 3] = V + 3, et[W + 4] = V + 1, et[W + 5] = V + 2, et[W + 6] = V + 2, et[W + 7] = V + 3, W += 8, V += 4;
				s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), s.bufferData(s.ELEMENT_ARRAY_BUFFER, tt, r), s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), s.bufferData(s.ELEMENT_ARRAY_BUFFER, et, r), o.__lineArray = et
			}
			if ($)
				for (P = 0, T = $.length; T > P; P++)
					if (B = $[P], B.__original.needsUpdate) {
						if (j = 0, q = 0, 1 === B.size) {
							if (B.boundTo === e || "vertices" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], B.array[j] = B.value[f.a], B.array[j + 1] = B.value[f.b], B.array[j + 2] = B.value[f.c], j += 3;
								for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], B.array[j] = B.value[f.a], B.array[j + 1] = B.value[f.b], B.array[j + 2] = B.value[f.c], B.array[j + 3] = B.value[f.d], j += 4
							} else if ("faces" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], B.array[j] = D, B.array[j + 1] = D, B.array[j + 2] = D, j += 3;
								for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], B.array[j] = D, B.array[j + 1] = D, B.array[j + 2] = D, B.array[j + 3] = D, j += 4
							}
						} else if (2 === B.size) {
							if (B.boundTo === e || "vertices" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = A.x, B.array[j + 3] = A.y, B.array[j + 4] = w.x, B.array[j + 5] = w.y, j += 6;
								for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], _ = B.value[f.d], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = A.x, B.array[j + 3] = A.y, B.array[j + 4] = w.x, B.array[j + 5] = w.y, B.array[j + 6] = _.x, B.array[j + 7] = _.y, j += 8
							} else if ("faces" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], x = D, A = D, w = D, B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = A.x, B.array[j + 3] = A.y, B.array[j + 4] = w.x, B.array[j + 5] = w.y, j += 6;
								for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], x = D, A = D, w = D, _ = D, B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = A.x, B.array[j + 3] = A.y, B.array[j + 4] = w.x, B.array[j + 5] = w.y, B.array[j + 6] = _.x, B.array[j + 7] = _.y, j += 8
							}
						} else if (3 === B.size) {
							var dt;
							if (dt = "c" === B.type ? ["r", "g", "b"] : ["x", "y", "z"], B.boundTo === e || "vertices" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], j += 9;
								for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], _ = B.value[f.d], B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], B.array[j + 9] = _[dt[0]], B.array[j + 10] = _[dt[1]], B.array[j + 11] = _[dt[2]], j += 12
							} else if ("faces" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], x = D, A = D, w = D, B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], j += 9;
								for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], x = D, A = D, w = D, _ = D, B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], B.array[j + 9] = _[dt[0]], B.array[j + 10] = _[dt[1]], B.array[j + 11] = _[dt[2]], j += 12
							} else if ("faceVertices" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], x = D[0], A = D[1], w = D[2], B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], j += 9;
								for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], x = D[0], A = D[1], w = D[2], _ = D[3], B.array[j] = x[dt[0]], B.array[j + 1] = x[dt[1]], B.array[j + 2] = x[dt[2]], B.array[j + 3] = A[dt[0]], B.array[j + 4] = A[dt[1]], B.array[j + 5] = A[dt[2]], B.array[j + 6] = w[dt[0]], B.array[j + 7] = w[dt[1]], B.array[j + 8] = w[dt[2]], B.array[j + 9] = _[dt[0]], B.array[j + 10] = _[dt[1]], B.array[j + 11] = _[dt[2]], j += 12
							}
						} else if (4 === B.size)
							if (B.boundTo === e || "vertices" === B.boundTo) {
								for (h = 0, c = ht.length; c > h; h++) f = ut[ht[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, j += 12;
								for (h = 0, c = ct.length; c > h; h++) f = ut[ct[h]], x = B.value[f.a], A = B.value[f.b], w = B.value[f.c], _ = B.value[f.d], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, B.array[j + 12] = _.x, B.array[j + 13] = _.y, B.array[j + 14] = _.z, B.array[j + 15] = _.w, j += 16
							} else if ("faces" === B.boundTo) {
							for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], x = D, A = D, w = D, B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, j += 12;
							for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], x = D, A = D, w = D, _ = D, B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, B.array[j + 12] = _.x, B.array[j + 13] = _.y, B.array[j + 14] = _.z, B.array[j + 15] = _.w, j += 16
						} else if ("faceVertices" === B.boundTo) {
							for (h = 0, c = ht.length; c > h; h++) D = B.value[ht[h]], x = D[0], A = D[1], w = D[2], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, j += 12;
							for (h = 0, c = ct.length; c > h; h++) D = B.value[ct[h]], x = D[0], A = D[1], w = D[2], _ = D[3], B.array[j] = x.x, B.array[j + 1] = x.y, B.array[j + 2] = x.z, B.array[j + 3] = x.w, B.array[j + 4] = A.x, B.array[j + 5] = A.y, B.array[j + 6] = A.z, B.array[j + 7] = A.w, B.array[j + 8] = w.x, B.array[j + 9] = w.y, B.array[j + 10] = w.z, B.array[j + 11] = w.w, B.array[j + 12] = _.x, B.array[j + 13] = _.y, B.array[j + 14] = _.z, B.array[j + 15] = _.w, j += 16
						}
						s.bindBuffer(s.ARRAY_BUFFER, B.buffer), s.bufferData(s.ARRAY_BUFFER, B.array, r)
					}
			a && si.deleteGroupBufferData(t)
		}, si.buildLineBufferData = function(t, i, r, a) {
			var n, s, o, l, h, c, u, f, p, d, m, g, y = t,
				v = y.vertices,
				x = y.colors,
				A = y.lineDistances,
				w = v.length,
				_ = x.length,
				S = A.length,
				b = a.__vertexArray,
				M = a.__colorArray,
				C = a.__lineDistanceArray,
				P = y.verticesNeedUpdate,
				T = y.colorsNeedUpdate,
				z = y.lineDistancesNeedUpdate,
				L = y.__webglCustomAttributesList;
			if (P) {
				for (n = 0; w > n; n++) l = v[n], h = 3 * n, b[h] = l.x, b[h + 1] = l.y, b[h + 2] = l.z;
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglVertexBuffer), r.bufferData(r.ARRAY_BUFFER, b, i)
			}
			if (T) {
				for (s = 0; _ > s; s++) c = x[s], h = 3 * s, M[h] = c.r, M[h + 1] = c.g, M[h + 2] = c.b;
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglColorBuffer), r.bufferData(r.ARRAY_BUFFER, M, i)
			}
			if (z) {
				for (o = 0; S > o; o++) C[o] = A[o];
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglLineDistanceBuffer), r.bufferData(r.ARRAY_BUFFER, C, i)
			}
			if (L)
				for (u = 0, f = L.length; f > u; u++)
					if (g = L[u], g.needsUpdate && (g.boundTo === e || "vertices" === g.boundTo)) {
						if (h = 0, d = g.value.length, 1 === g.size)
							for (p = 0; d > p; p++) g.array[p] = g.value[p];
						else if (2 === g.size)
							for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, h += 2;
						else if (3 === g.size)
							if ("c" === g.type)
								for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.r, g.array[h + 1] = m.g, g.array[h + 2] = m.b, h += 3;
							else
								for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, g.array[h + 2] = m.z, h += 3;
						else if (4 === g.size)
							for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, g.array[h + 2] = m.z, g.array[h + 3] = m.w, h += 4;
						r.bindBuffer(r.ARRAY_BUFFER, g.buffer), r.bufferData(r.ARRAY_BUFFER, g.array, i)
					}
		}, si.buildLineBufferData = function(t, i, r, a) {
			var n, s, o, l, h, c, u, f, p, d, m, g, y = t,
				v = y.vertices,
				x = y.colors,
				A = y.lineDistances,
				w = v.length,
				_ = x.length,
				S = A.length,
				b = a.__vertexArray,
				M = a.__colorArray,
				C = a.__lineDistanceArray,
				P = y.verticesNeedUpdate,
				T = y.colorsNeedUpdate,
				z = y.lineDistancesNeedUpdate,
				L = y.__webglCustomAttributesList;
			if (P) {
				for (n = 0; w > n; n++) l = v[n], h = 3 * n, b[h] = l.x, b[h + 1] = l.y, b[h + 2] = l.z;
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglVertexBuffer), r.bufferData(r.ARRAY_BUFFER, b, i)
			}
			if (T) {
				for (s = 0; _ > s; s++) c = x[s], h = 3 * s, M[h] = c.r, M[h + 1] = c.g, M[h + 2] = c.b;
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglColorBuffer), r.bufferData(r.ARRAY_BUFFER, M, i)
			}
			if (z) {
				for (o = 0; S > o; o++) C[o] = A[o];
				r.bindBuffer(r.ARRAY_BUFFER, a.__webglLineDistanceBuffer), r.bufferData(r.ARRAY_BUFFER, C, i)
			}
			if (L)
				for (u = 0, f = L.length; f > u; u++)
					if (g = L[u], g.needsUpdate && (g.boundTo === e || "vertices" === g.boundTo)) {
						if (h = 0, d = g.value.length, 1 === g.size)
							for (p = 0; d > p; p++) g.array[p] = g.value[p];
						else if (2 === g.size)
							for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, h += 2;
						else if (3 === g.size)
							if ("c" === g.type)
								for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.r, g.array[h + 1] = m.g, g.array[h + 2] = m.b, h += 3;
							else
								for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, g.array[h + 2] = m.z, h += 3;
						else if (4 === g.size)
							for (p = 0; d > p; p++) m = g.value[p], g.array[h] = m.x, g.array[h + 1] = m.y, g.array[h + 2] = m.z, g.array[h + 3] = m.w, h += 4;
						r.bindBuffer(r.ARRAY_BUFFER, g.buffer), r.bufferData(r.ARRAY_BUFFER, g.array, i)
					}
		}, si.deleteGroupBufferData = function(t) {
			delete t.__inittedArrays, delete t.__colorArray, delete t.__normalArray, delete t.__tangentArray, delete t.__uvArray, delete t.__uv2Array, delete t.__faceArray, delete t.__vertexArray, delete t.__lineArray, delete t.__skinIndexArray, delete t.__skinWeightArray
		}, si.getMaterial = function(t, e) {
			var i = t.material;
			return i instanceof Qe.ArrayMaterial ? (e > i.materials.length - 1 && (e = i.materials.length - 1), i.materials[e]) : i
		}, Qe.FontUtils = {
			faces: {},
			face: "helvetiker",
			weight: "normal",
			style: "normal",
			size: 150,
			divisions: 10,
			getFace: function() {
				return this.faces[this.face][this.weight][this.style]
			},
			loadFace: function(t) {
				var e = t.familyName.toLowerCase(),
					i = this;
				i.faces[e] = i.faces[e] || {}, i.faces[e][t.cssFontWeight] = i.faces[e][t.cssFontWeight] || {}, i.faces[e][t.cssFontWeight][t.cssFontStyle] = t;
				i.faces[e][t.cssFontWeight][t.cssFontStyle] = t;
				return t
			},
			drawText: function(t) {
				var e, i = this.getFace(),
					r = this.size / i.resolution,
					a = 0,
					n = String(t).split(""),
					s = n.length,
					o = [];
				for (e = 0; s > e; e++) {
					var l = new Qe.Path,
						h = this.extractGlyphPoints(n[e], i, r, a, l);
					a += h.offset, o.push(h.path)
				}
				var c, u, f, p = a / 2;
				for (e = 0; s > e; e++) {
					var l = o[e];
					for (f = 0; f < l.actions.length; f++) {
						var c = l.actions[f].args;
						for (u = 0; u < c.length; u++) u % 3 === 0 && (c[u] -= p)
					}
				}
				return {
					paths: o,
					offset: p
				}
			},
			extractGlyphPoints: function(t, e, i, r, a, n) {
				var s, o, l, h, c, u, f, p, d, m, g, y, v, x, A, w, _, S, b, M = [],
					C = e.glyphs[t] || e.glyphs["?"],
					P = 0;
				if (C) {
					if (C.o)
						for (h = C._cachedOutline || (C._cachedOutline = C.o.split(" ")), u = h.length, f = i, p = i, s = 0; u > s;) switch (c = h[s++]) {
							case "m":
								d = h[s++] * f + r, m = h[s++] * p - P, a.moveTo(d, m, 0);
								break;
							case "l":
								d = h[s++] * f + r, m = h[s++] * p - P, a.lineTo(d, m, 0);
								break;
							case "q":
								if (g = h[s++] * f + r, y = h[s++] * p - P, A = h[s++] * f + r, w = h[s++] * p - P, a.quadraticCurveTo(A, w, 0, g, y, 0), b = M[M.length - 1], b)
									for (v = b.x, x = b.y, o = 1, l = this.divisions; l >= o; o++) {
										var T = o / l;
										Qe.Shape.Utils.b2(T, v, A, g), Qe.Shape.Utils.b2(T, x, w, y)
									}
								break;
							case "b":
								if (g = h[s++] * f + r, y = h[s++] * p - P, A = h[s++] * f + r, w = h[s++] * -p - P, _ = h[s++] * f + r, S = h[s++] * -p - P, a.bezierCurveTo(g, y, 0, A, w, 0, _, S, 0), b = M[M.length - 1], b)
									for (v = b.x, x = b.y, o = 1, l = this.divisions; l >= o; o++) {
										var T = o / l;
										Qe.Shape.Utils.b3(T, v, A, _, g), Qe.Shape.Utils.b3(T, x, w, S, y)
									}
						}
					return {
						offset: C.ha * i,
						path: a
					}
				}
			}
		}, Qe.FontUtils.generateShapes = function(t, i) {
			i = i || {};
			var r = i.size !== e ? i.size : 100,
				a = i.curveSegments !== e ? i.curveSegments : 4,
				n = i.font !== e ? i.font : "helvetiker",
				s = i.weight !== e ? i.weight : "normal",
				o = i.style !== e ? i.style : "normal";
			Qe.FontUtils.size = r, Qe.FontUtils.divisions = a, Qe.FontUtils.face = n, Qe.FontUtils.weight = s, Qe.FontUtils.style = o;
			for (var l = Qe.FontUtils.drawText(t), h = l.paths, c = [], u = 0, f = h.length; f > u; u++) Array.prototype.push.apply(c, h[u].toShapes());
			return c
		},
		function(t) {
			var e = 1e-10,
				i = function(t, e) {
					var i = t.length;
					if (3 > i) return null;
					var n, s, o, l = [],
						h = [],
						c = [];
					if (r(t) > 0)
						for (s = 0; i > s; s++) h[s] = s;
					else
						for (s = 0; i > s; s++) h[s] = i - 1 - s;
					var u = i,
						f = 2 * u;
					for (s = u - 1; u > 2;) {
						if (f-- <= 0) return console.log("Warning, unable to triangulate polygon!"), e ? c : l;
						if (n = s, n >= u && (n = 0), s = n + 1, s >= u && (s = 0), o = s + 1, o >= u && (o = 0), a(t, n, s, o, u, h)) {
							var p, d, m, g, y;
							for (p = h[n], d = h[s], m = h[o], l.push([t[p], t[d], t[m]]), c.push([h[n], h[s], h[o]]), g = s, y = s + 1; u > y; g++, y++) h[g] = h[y];
							u--, f = 2 * u
						}
					}
					return e ? c : l
				},
				r = function(t) {
					for (var e = t.length, i = 0, r = e - 1, a = 0; e > a; r = a++) i += t[r].x * t[a].y - t[a].x * t[r].y;
					return .5 * i
				},
				a = function(t, i, r, a, n, s) {
					var o, l, h, c, u, f, p, d, m;
					if (l = t[s[i]].x, h = t[s[i]].y, c = t[s[r]].x, u = t[s[r]].y, f = t[s[a]].x, p = t[s[a]].y, e > (c - l) * (p - h) - (u - h) * (f - l)) return !1;
					var g, y, v, x, A, w, _, S, b, M, C, P, T, z, L;
					for (g = f - c, y = p - u, v = l - f, x = h - p, A = c - l, w = u - h, o = 0; n > o; o++)
						if (o !== i && o !== r && o !== a && (d = t[s[o]].x, m = t[s[o]].y, _ = d - l, S = m - h, b = d - c, M = m - u, C = d - f, P = m - p, L = g * M - y * b, T = A * S - w * _, z = v * P - x * C, L >= -e && z >= -e && T >= -e)) return !1;
					return !0
				};
			return t.Triangulate = i, t.Triangulate.area = r, t
		}(Qe.FontUtils), self._typeface_js = {
			faces: Qe.FontUtils.faces,
			loadFace: Qe.FontUtils.loadFace
		}, Qe.typeface_js = self._typeface_js;
	var hi = {
			easeNone: function(t, e, i, r) {
				return i * t / r + e
			},
			easeIn: function(t, e, i, r) {
				return i * (t /= r) * t + e
			},
			easeOut: function(t, e, i, r) {
				return -i * (t /= r) * (t - 2) + e
			},
			easeBoth: function(t, e, i, r) {
				return (t /= r / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
			},
			easeInStrong: function(t, e, i, r) {
				return i * (t /= r) * t * t * t + e
			},
			easeOutStrong: function(t, e, i, r) {
				return -i * ((t = t / r - 1) * t * t * t - 1) + e
			},
			easeBothStrong: function(t, e, i, r) {
				return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
			},
			elasticIn: function(t, e, i, r, a, n) {
				var s;
				return 0 === t ? e : 1 === (t /= r) ? e + i : (n || (n = .3 * r), !a || a < Math.abs(i) ? (a = i, s = n / 4) : s = n / (2 * Math.PI) * Math.asin(i / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / n)) + e)
			},
			elasticOut: function(t, e, i, r, a, n) {
				var s;
				return 0 === t ? e : 1 === (t /= r) ? e + i : (n || (n = .3 * r), !a || a < Math.abs(i) ? (a = i, s = n / 4) : s = n / (2 * Math.PI) * Math.asin(i / a), a * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - s) * Math.PI / n) + i + e)
			},
			elasticBoth: function(t, e, i, r, a, n) {
				var s;
				return 0 === t ? e : 2 === (t /= r / 2) ? e + i : (n || (n = .3 * r * 1.5), !a || a < Math.abs(i) ? (a = i, s = n / 4) : s = n / (2 * Math.PI) * Math.asin(i / a), 1 > t ? -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / n) + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / n) * .5 + i + e)
			},
			backIn: function(t, i, r, a, n) {
				return n === e && (n = 1.70158), t === a && (t -= .001), r * (t /= a) * t * ((n + 1) * t - n) + i
			},
			backOut: function(t, e, i, r, a) {
				return "undefined" == typeof a && (a = 1.70158), i * ((t = t / r - 1) * t * ((a + 1) * t + a) + 1) + e
			},
			backBoth: function(t, e, i, r, a) {
				return "undefined" == typeof a && (a = 5.70158), (t /= r / 2) < 1 ? i / 2 * t * t * (((a *= 1.525) + 1) * t - a) + e : i / 2 * ((t -= 2) * t * (((a *= 1.525) + 1) * t + a) + 2) + e
			},
			bounceIn: function(t, e, i, r) {
				return i - hi.bounceOut(r - t, 0, i, r) + e
			},
			bounceOut: function(t, e, i, r) {
				return (t /= r) < 1 / 2.75 ? 7.5625 * i * t * t + e : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
			},
			bounceBoth: function(t, e, i, r) {
				return r / 2 > t ? .5 * hi.bounceIn(2 * t, 0, i, r) + e : .5 * hi.bounceOut(2 * t - r, 0, i, r) + .5 * i + e
			}
		},
		ci = function() {
			if (this._as = [], 1 === arguments.length) {
				var t = arguments[0];
				if (t instanceof ci && (t = t._as), t instanceof Array)
					for (var e = t.length, i = 0; e > i; i++) this._as.push(t[i]);
				else null != t && this._as.push(t)
			} else if (arguments.length > 1)
				for (e = arguments.length, i = 0; e > i; i++) this._as.push(arguments[i])
		};
	Qe.List = ci, Qe.extend(Qe.List, Object, {
		size: function() {
			return this._as.length
		},
		isEmpty: function() {
			return 0 === this._as.length
		},
		add: function(t, i) {
			return i === e ? this._as.push(t) : this._as.splice(i, 0, t)
		},
		addAll: function(t) {
			if (t instanceof ci && (t = t._as), t instanceof Array)
				for (var e = t.length, i = 0; e > i; i++) this._as.push(t[i]);
			else this._as.push(t)
		},
		get: function(t) {
			return this._as[t]
		},
		remove: function(t) {
			var e = this._as.indexOf(t);
			return e >= 0 && e < this._as.length && this.removeAt(e), e
		},
		removeAt: function(t) {
			return this._as.splice(t, 1)[0]
		},
		set: function(t, e) {
			return this._as[t] = e
		},
		clear: function() {
			return this._as.splice(0, this._as.length)
		},
		contains: function(t) {
			return this.indexOf(t) >= 0
		},
		indexOf: function(t) {
			return this._as.indexOf(t)
		},
		forEach: function(t, e) {
			for (var i = this._as.length, r = 0; i > r; r++) {
				var a = this._as[r];
				e ? t.call(e, a) : t(a)
			}
		},
		forEachReverse: function(t, e) {
			for (var i = this._as.length, r = i - 1; r >= 0; r--) {
				var a = this._as[r];
				e ? t.call(e, a) : t(a)
			}
		},
		toArray: function(t, e) {
			if (t) {
				for (var i = [], r = this._as.length, a = 0; r > a; a++) {
					var n = this._as[a];
					e ? t.call(e, n) && i.push(n) : t(n) && i.push(n)
				}
				return i
			}
			return this._as.concat()
		},
		toList: function(t, e) {
			if (t) {
				for (var i = new ci, r = this._as.length, a = 0; r > a; a++) {
					var n = this._as[a];
					e ? t.call(e, n) && i.add(n) : t(n) && i.add(n)
				}
				return i
			}
			return new ci(this)
		},
		sort: function(t) {
			return t ? this._as.sort(t) : this._as.sort(), this
		},
		toString: function() {
			return this._as.toString()
		}
	}), Qe.ImageCache = function() {};
	var ui = Qe.ImageCache;
	ui.AlarmBillboardImage = new Image, ui.AlarmBillboardImage.src = "data:image/png;base64,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",
		ui.Logo = new Image, ui.Logo.src = "data:image/png;base64,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",
		Qe.ImageUtils = {}, Qe.ImageUtils.registerDefaultImage = function(t) {
			null != t.src ? ui.Logo.src = t.src : ui.Logo.src = t
		}, Qe.ImageUtils.registerAlarmImage = function(t) {
			null != t.src ? ui.AlarmBillboardImage.src = t.src : ui.AlarmBillboardImage.src = t
		}, ui.ssaoNormalImage = new Image, ui.ssaoNormalImage.src = "data:image/png;base64,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", ui.ssaoNormalImage.loaded = !0, Qe.EventDispatcher = function() {
			this.listeners = {}
		}, Qe.extend(Qe.EventDispatcher, null, {
			constructor: Qe.EventDispatcher,
			addEventListener: function(t, i) {
				this.listeners[t] === e && (this.listeners[t] = []), -1 === this.listeners[t].indexOf(i) && this.listeners[t].push(i)
			},
			removeEventListener: function(t, e) {
				var i = this.listeners[t].indexOf(e); - 1 !== i && this.listeners[t].splice(i, 1)
			},
			dispatchEvent: function(t) {
				var i = this.listenters[t.type];
				if (i != e) {
					t.target = this;
					for (var r = 0; r < i.length; r++) {
						var a = i[r];
						a.call(this, t)
					}
				}
			},
			contains: function(t, e) {
				if (this._ls)
					for (var i, r = 0, a = this._ls.size(); a > r; r++)
						if (i = this._ls.get(r), t === i.l && e === i.s) return !0;
				return !1
			},
			add: function(t, e, i) {
				if (null == t) return void console.error("TGL.EventDispatcher#add:listener is null");
				var r = {
					l: t,
					s: e,
					a: i
				};
				this._ls || (this._ls = new ci), this._f ? (this._addPendings || (this._addPendings = new ci), this._addPendings.add(r)) : r.a ? this._ls.add(r, 0) : this._ls.add(r)
			},
			remove: function(t, e) {
				this._ls && (this._f ? (this._removePendings || (this._removePendings = new ci), this._removePendings.add({
					l: t,
					s: e
				})) : this._remove(t, e))
			},
			_remove: function(t, e) {
				for (var i, r = 0, a = this._ls.size(); a > r; r++)
					if (i = this._ls.get(r), i.l === t && i.s === e) return void this._ls.removeAt(r)
			},
			fire: function(t) {
				if (this._ls) {
					var e, i, r = this._ls.size();
					for (this._f = !0, e = 0; r > e; e++) i = this._ls.get(e), i.s ? i.l.call(i.s, t) : i.l(t);
					if (this._f = !1, this._removePendings) {
						for (r = this._removePendings.size(), e = 0; r > e; e++) i = this._removePendings.get(e), this._remove(i.l, i.s);
						delete this._removePendings
					}
					if (this._addPendings) {
						for (r = this._addPendings.size(), e = 0; r > e; e++) i = this._addPendings.get(e), i.a ? this._ls.add(i, 0) : this._ls.add(i);
						delete this._addPendings
					}
				}
			}
		}), Qe.PropertyChangeDispatcher = function() {
			this._dispatcher = new Qe.EventDispatcher
		}, Qe.extend(Qe.PropertyChangeDispatcher, Object, {
			addPropertyChangeListener: function(t, e, i) {
				this._dispatcher.add(t, e, i)
			},
			removePropertyChangeListener: function(t, e) {
				this._dispatcher.remove(t, e)
			},
			firePropertyChange: function(t, e, i) {
				if (e == i) return !1;
				var r = {
					property: t,
					oldValue: e,
					newValue: i,
					source: this
				};
				return this._dispatcher.fire(r), this.onPropertyChanged(r), !0
			},
			onPropertyChanged: function(t) {}
		}), Qe.Texture = function(t, i, r, a, n, s, o, l, h) {
			Qe.PropertyChangeDispatcher.call(this), this.id = Qe.TextureIdCount++, this.name = "", null != t && this.setImage(t), this.mipmaps = [], this.mapping = i !== e ? i : new Qe.UVMapping, this.wrapS = r !== e ? r : Qe.RepeatWrapping, this.wrapT = a !== e ? a : Qe.RepeatWrapping, this.magFilter = n !== e ? n : Qe.LinearFilter, this.minFilter = s !== e ? s : Qe.LinearMipMapLinearFilter, this.anisotropy = h !== e ? h : 1, this.format = o !== e ? o : Qe.RGBAFormat, this.type = l !== e ? l : Qe.UnsignedByteType, this.repeatX = 1, this.repeatY = 1, this.offsetX = 0, this.offsetY = 0, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !1, this.flipX = !1, this.unpackAlignment = 4, this.needsUpdate = !1, this.onUpdate = null
		}, Qe.extend(Qe.Texture, Qe.PropertyChangeDispatcher, {
			getUniqueCode: function() {
				if (ei.isImage(this._image) || "string" == typeof this._image || xi.isArray(this._image)) return this._imageSrc + " " + this.format + " " + this.type + "  " + this.wrapS + " " + this.wrapT + " " + this.magFilter + " " + this.minFilter + " " + this.flipY + " " + this.flipX + this.anisotropy;
				if (ei.isCanvas(this._image)) {
					var t = this._image;
					return t.__uniqueCode || (t.__uniqueCode = Qe.id("texture")), t.__uniqueCode + " " + this.format + " " + this.type + " " + this.wrapS + " " + this.wrapT + " " + this.magFilter + " " + this.minFilter + " " + this.flipY + " " + this.flipX + this.anisotropy
				}
			},
			resetValue: function() {
				this.name = "", this._image = null, this.mipmaps = [], this.mapping = new Qe.UVMapping, this.wrapS = Qe.RepeatWrapping, this.wrapT = Qe.RepeatWrapping, this.magFilter = Qe.LinearFilter, this.minFilter = Qe.LinearMipMapLinearFilter, this.anisotropy = 1, this.format = Qe.RGBAFormat, this.type = Qe.UnsignedByteType, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !1, this.flipX = !1, this.unpackAlignment = 4, this.needsUpdate = !1, this.onUpdate = null
			},
			clone: function(t, i) {
				return t === e && (t = new Qe.Texture), null == i || i ? t.setImage(this._image) : t._image = this._image, t._imageSrc = this._imageSrc, t.mipmaps = this.mipmaps.slice(0), t.mapping = this.mapping, t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.anisotropy = this.anisotropy, t.format = this.format, t.type = this.type, t.generateMipmaps = this.generateMipmaps, t.premultiplyAlpha = this.premultiplyAlpha, t.flipY = this.flipY, t.flipX = this.flipX, t.unpackAlignment = this.unpackAlignment, t
			},
			onloadTexture: function() {},
			setImageSrc: function(t) {
				if ("string" == typeof t) this._imageSrc = t;
				else if (xi.isArray(t)) {
					for (var e = "", i = 0; i < t.length; i++) e += "string" == typeof t[i] ? t : t[i].src;
					this._imageSrc = e
				} else this._imageSrc = t.src
			},
			loadAllImages: function(t, e) {
				function i(i) {
					i.onload = function() {
						i.loaded = !0, i.onload = null, a++, a == r && (n.onloadTexture(), n.firePropertyChange("image", e, n._image), t.loaded = !0)
					}
				}
				for (var r = t.length, a = 0, n = this, s = 0; r > s; s++) i(t[s])
			},
			setImage: function(t) {
				var e = this._image;
				if (xi.isArray(t)) {
					for (var i, r = "", a = [], n = 0; n < t.length; n++) "string" == typeof t[n] ? (r += t, i = new Image, t[n].startsWith("data:image") || (i.crossOrigin = "use-credentials"), i.src = t[n], a.push(i)) : (r += t[n].src, a.push(t[n]));
					this._imageSrc = r, this.loadAllImages(a, e), this._image = a
				} else if ("string" == typeof t) {
					if (this._image && this._image.src === t) return;
					this._imageSrc = t;
					var s = new Image;
					t.startsWith("data:image") || (s.crossOrigin = "use-credentials"), s.src = t;
					var o = this;
					o._image = s, s.onload = function(t) {
						s.loaded = !0, s.onload = null, o.onloadTexture(), o.firePropertyChange("image", e, s)
					}
				} else {
					if (this._image === t) return;
					this._imageSrc = t.src;
					var e = this._image;
					if (ei.isCanvas(t) && (t.loaded = !0), t && !t.loaded) {
						var o = this;
						o._image = t;
						var l = t.onload;
						t.onload = function(i) {
							l && l.call(null, i), t.loaded = !0, t.onload = null, o.onloadTexture(), o.firePropertyChange("image", e, t)
						}
					} else this._image = t, this.firePropertyChange("image", e, t)
				}
			},
			getImage: function() {
				return this._image
			},
			dispose: function() {
				this.firePropertyChange("disposed", !1, !0)
			}
		}), Qe.TextureIdCount = 0, Qe.PixelsTexture = function(t, e, i, r, a, n, s, o, l, h, c) {
			Qe.Texture.call(this, null, n, s, o, l, h, r, a, c), this.image = {
				data: t,
				width: e,
				height: i
			}
		}, Qe.PixelsTexture.prototype = Object.create(Qe.Texture.prototype), Qe.PixelsTexture.prototype.clone = function() {
			var t = new Qe.PixelsTexture;
			return Qe.Texture.prototype.clone.call(this, t), t
		}, Qe.CompressedTexture = function(t, e, i, r, a, n, s, o, l, h, c) {
			Qe.Texture.call(this, null, n, s, o, l, h, r, a, c), this.image = {
				width: e,
				height: i
			}, this.mipmaps = t, this.generateMipmaps = !1
		}, Qe.CompressedTexture.prototype = Object.create(Qe.Texture.prototype), Qe.CompressedTexture.prototype.clone = function() {
			var t = new Qe.CompressedTexture;
			return Qe.Texture.prototype.clone.call(this, t), t
		};
	var fi = {
		pools: {},
		useTimes: {},
		size: 0,
		setTexture: function(t, e) {
			fi.size++, fi.pools[t] = e
		},
		getTexture: function(t) {
			return fi.pools[t]
		},
		useTexture: function(t) {
			if (t) {
				var e = t.id,
					i = fi.useTimes[e] || 0;
				i++, fi.useTimes[e] = i
			}
		},
		unUseTexture: function(t) {
			if (t) {
				var e = t.id,
					i = fi.useTimes[e] || 0;
				if (i--, fi.useTimes[e] = i, 0 >= i) {
					var r = t.getUniqueCode();
					delete fi.pools[r], fi.size--, t.dispose()
				}
			}
		}
	};
	Qe.TexturePool = fi, Qe.TexturePool.TestTexture = new Qe.Texture, Qe.SerializationSettings = function() {
			var t = Qe.SerializationSettings;
			this.isServaSerializable = t.isServaSerializable, this.isStyleSerializable = t.isStyleSerializable, this.isClientSerializable = t.isClientSerializable, this.encodeURI = t.encodeURI, this._pm = Qe.clone(t._pm), this._sm = Qe.clone(t._sm), this._cm = Qe.clone(t._cm)
		},
		function() {
			var t = Qe.SerializationSettings;
			t.isServaSerializable = !0, t.isStyleSerializable = !0, t.isClientSerializable = !0, t.encodeURI = !0, t._pm = {}, t._sm = {}, t._cm = {}, t.setPropertyType = function(e, i) {
				t._pm[e] = i
			}, t.getPropertyType = function(e) {
				return t._pm[e]
			}, t.setStyleType = function(e, i) {
				t._sm[e] = i
			}, t.getStyleType = function(e) {
				return t._sm[e]
			}, t.setClientType = function(e, i) {
				t._cm[e] = i
			}, t.getClientType = function(e) {
				return t._cm[e]
			}
		}(), Qe.extend(Qe.SerializationSettings, Object, {
			setPropertyType: function(t, e) {
				this._pm[t] = e
			},
			getPropertyType: function(t) {
				return this._pm[t]
			},
			setStyleType: function(t, e) {
				this._sm[t] = e
			},
			getStyleType: function(t) {
				return this._sm[t]
			},
			setClientType: function(t, e) {
				this._cm[t] = e
			},
			getClientType: function(t) {
				return this._cm[t]
			}
		}), Qe.Styles = {
			_m: {},
			setStyle: function(t, e) {
				return null == e ? delete Qe.Styles._m[t] : Qe.Styles._m[t] = e, Qe.Styles
			},
			getStyle: function(t) {
				return Qe.Styles._m[t]
			}
		}, Qe.Styles.MaterailType = "S:m.type", Qe.Styles.NormalType = "S:m.normalType", Qe.Styles.PREFIX_STYLE = "S:",
		function() {
			var t = function(t, e) {
				Qe.SerializationSettings.setPropertyType(t, e)
			};
			t("combos", "data.list"), t("name", "cdata"), t("toolTip", "cdata"), t("parent", "data"), t("fromNode", "data"), t("toNode", "data"), t("alarmState", "alarmstate"), t("vertices", "list.vec3"), t("faces", "serializeabe.list"), t("uvs", "list.vec2"), t("position", "vec3"), t("rotation", "vec3"), t("scale", "vec3"), t("location", "point"), t("materialSize", "number"), t("color", "color"), t("ambient", "color"), t("diffuse", "color"), t("specular", "color"), t("intensity", "number"), t("distance", "number"), t("type", "number"), t("startClosed", "boolean"), t("endClosed", "boolean"), t("curveSegments", "number"), t("amount", "number"), t("vertical", "boolean"), t("repeat", "number"), t("centralized", "boolean"), t("visible", "boolean"), t = function(t, e, i) {
				null == i && (i = null != e ? e instanceof Qe.XiangliangTwo ? "vec2" : e instanceof Qe.XiangliangThree ? "vec3" : typeof e : "string"), Qe.Styles.setStyle(t, e), Qe.SerializationSettings.setStyleType(t, i)
			}, t("select.style", "border"), t("select.width", 1), t("select.color", 65280), t("select.offset", 0), t("outer.width", 1), t("outer.offset", 0), t("outer.color", null, "color"), t("m.type", "basic"), t("m.color", 16777215, "color"), t("m.side", "front"), t("m.alphaTest", 0), t("m.polygonOffset", !1), t("m.polygonOffsetFactor", 0), t("m.polygonOffsetUnits", 0), t("m.wireframe", !1), t("m.wireframeLinewidth", 1), t("m.gradient", {}), t("m.gradientType", 1), t("m.transparent", !1), t("m.opacity", 1), t("m.visible", !0), t("m.depthTest", !0), t("m.depthMask", !0), t("m.alignment", new Qe.XiangliangTwo(0, 0)), t("m.linewidth", 1), t("m.texture.image", null), t("m.texture.offset", new Qe.XiangliangTwo(0, 0)), t("m.texture.repeat", new Qe.XiangliangTwo(1, 1)), t("m.texture.wrapS", Qe.RepeatWrapping), t("m.texture.wrapT", Qe.RepeatWrapping), t("m.texture.flipX", !1), t("m.texture.flipY", !1), t("m.normalmap.image", null), t("m.envmap.image", null), t("m.specularmap.image", null), t("right.m.type", "basic"), t("left.m.type", "basic"), t("top.m.type", "basic"), t("bottom.m.type", "basic"), t("front.m.type", "basic"), t("back.m.type", "basic"), t("side.m.type", "basic"), t("alarm.billboard.scale", null), t("alarm.billboard.position", "top"), t("alarm.billboard.vertical", !1), t("annotation.class", "tgl_annotation")
		}(), Qe.extend(Qe.Styles, Object, {});
	var pi = function(t, i) {
		this.min = t !== e ? t : new Ke(1 / 0, 1 / 0), this.max = i !== e ? i : new Ke(-(1 / 0), -(1 / 0))
	};
	Qe.Box2 = pi, pi.prototype = {
		constructor: Qe.Box2,
		set: function(t, e) {
			return this.min.copy(t), this.max.copy(e), this
		},
		setFromPoints: function(t) {
			if (t.length > 0) {
				var e = t[0];
				this.min.copy(e), this.max.copy(e);
				for (var i = 1, r = t.length; r > i; i++) e = t[i], e.x < this.min.x ? this.min.x = e.x : e.x > this.max.x && (this.max.x = e.x), e.y < this.min.y ? this.min.y = e.y : e.y > this.max.y && (this.max.y = e.y)
			} else this.makeEmpty();
			return this
		},
		setFromCenterAndSize: function() {
			var t = new Ke;
			return function(e, i) {
				var r = t.copy(i).multiplyScalar(.5);
				return this.min.copy(e).sub(r), this.max.copy(e).add(r), this
			}
		}(),
		copy: function(t) {
			return this.min.copy(t.min), this.max.copy(t.max), this
		},
		makeEmpty: function() {
			return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
		},
		empty: function() {
			return this.max.x < this.min.x || this.max.y < this.min.y
		},
		center: function(t) {
			var e = t || new Ke;
			return e.addVectors(this.min, this.max).multiplyScalar(.5)
		},
		size: function(t) {
			var e = t || new Ke;
			return e.subVectors(this.max, this.min)
		},
		expandByPoint: function(t) {
			return this.min.min(t), this.max.max(t), this
		},
		expandByVector: function(t) {
			return this.min.sub(t), this.max.add(t), this
		},
		expandByScalar: function(t) {
			return this.min.addScalar(-t), this.max.addScalar(t), this
		},
		containsPoint: function(t) {
			return t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y ? !1 : !0
		},
		containsBox: function(t) {
			return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y ? !0 : !1
		},
		getParameter: function(t, e) {
			var i = e || new Ke;
			return i.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
		},
		isIntersectionBox: function(t) {
			return t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y ? !1 : !0
		},
		clampPoint: function(t, e) {
			var i = e || new Ke;
			return i.copy(t).clamp(this.min, this.max)
		},
		distanceToPoint: function() {
			var t = new Ke;
			return function(e) {
				var i = t.copy(e).clamp(this.min, this.max);
				return i.sub(e).length()
			}
		}(),
		intersect: function(t) {
			return this.min.max(t.min), this.max.min(t.max), this
		},
		union: function(t) {
			return this.min.min(t.min), this.max.max(t.max), this
		},
		translate: function(t) {
			return this.min.add(t), this.max.add(t), this
		},
		equals: function(t) {
			return t.min.equals(this.min) && t.max.equals(this.max)
		},
		clone: function() {
			return (new pi).copy(this)
		}
	}, Qe.BizBox = function(t, i) {
		this.min = t !== e ? t : new Je(1 / 0, 1 / 0, 1 / 0), this.max = i !== e ? i : new Je(-(1 / 0), -(1 / 0), -(1 / 0))
	}, Qe.BizBox.prototype = {
		constructor: Qe.BizBox,
		set: function(t, e) {
			return this.min.copy(t), this.max.copy(e), this
		},
		setFromPoints: function(t) {
			if (t.length > 0) {
				var e = t[0];
				this.min.copy(e), this.max.copy(e);
				for (var i = 1, r = t.length; r > i; i++) e = t[i], e.x < this.min.x ? this.min.x = e.x : e.x > this.max.x && (this.max.x = e.x), e.y < this.min.y ? this.min.y = e.y : e.y > this.max.y && (this.max.y = e.y), e.z < this.min.z ? this.min.z = e.z : e.z > this.max.z && (this.max.z = e.z)
			} else this.makeEmpty();
			return this
		},
		setFromCenterAndSize: function(t, e) {
			var i = Qe.BizBox.__v1.copy(e).multiplyScalar(.5);
			return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
		},
		copy: function(t) {
			return this.min.copy(t.min), this.max.copy(t.max), this
		},
		makeEmpty: function() {
			return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
		},
		empty: function() {
			return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
		},
		center: function(t) {
			var e = t || new Je;
			return e.addVectors(this.min, this.max).multiplyScalar(.5)
		},
		size: function(t) {
			var e = t || new Je;
			return e.subVectors(this.max, this.min)
		},
		expandByPoint: function(t) {
			return this.min.min(t), this.max.max(t), this
		},
		expandByVector: function(t) {
			return this.min.sub(t), this.max.add(t), this
		},
		expandByScalar: function(t) {
			return this.min.addScalar(-t), this.max.addScalar(t), this
		},
		containsPoint: function(t) {
			return t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z ? !1 : !0
		},
		containsBox: function(t) {
			return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z ? !0 : !1
		},
		getParameter: function(t) {
			return new Je((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
		},
		isIntersectionBox: function(t) {
			return t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z ? !1 : !0
		},
		clampPoint: function(t, e) {
			e || new Je;
			return (new Je).copy(t).clamp(this.min, this.max)
		},
		distanceToPoint: function(t) {
			var e = Qe.BizBox.__v1.copy(t).clamp(this.min, this.max);
			return e.sub(t).length()
		},
		getBoundingSphere: function(t) {
			var e = t || new Qe.Sphere;
			return e.center = this.center(), e.radius = .5 * this.size(Qe.BizBox.__v0).length(), e
		},
		intersect: function(t) {
			return this.min.max(t.min), this.max.min(t.max), this
		},
		union: function(t) {
			return this.min.min(t.min), this.max.max(t.max), this
		},
		transform: function(t) {
			var e = [Qe.BizBox.__v0.set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Qe.BizBox.__v0.set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Qe.BizBox.__v1.set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Qe.BizBox.__v2.set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Qe.BizBox.__v3.set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Qe.BizBox.__v4.set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Qe.BizBox.__v5.set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Qe.BizBox.__v6.set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Qe.BizBox.__v7.set(this.max.x, this.max.y, this.max.z).applyMatrix4(t)];
			return this.makeEmpty(), this.setFromPoints(e), this
		},
		translate: function(t) {
			return this.min.add(t), this.max.add(t), this
		},
		equals: function(t) {
			return t.min.equals(this.min) && t.max.equals(this.max)
		},
		clone: function() {
			return (new Qe.BizBox).copy(this)
		}
	}, Qe.BizBox.__v0 = new Je, Qe.BizBox.__v1 = new Je, Qe.BizBox.__v2 = new Je, Qe.BizBox.__v3 = new Je, Qe.BizBox.__v4 = new Je, Qe.BizBox.__v5 = new Je, Qe.BizBox.__v6 = new Je, Qe.BizBox.__v7 = new Je, Qe.BoundingSphere = function(t, i) {
		this.center = t !== e ? t : new Je, this.radius = i !== e ? i : 0
	}, Qe.BoundingSphere.prototype = {
		constructor: Qe.BoundingSphere,
		set: function(t, e) {
			return this.center.copy(t), this.radius = e, this
		},
		setFromCenterAndPoints: function(t, e) {
			for (var i = 0, r = 0, a = e.length; a > r; r++) {
				var n = t.distanceToSquared(e[r]);
				i = Math.max(i, n)
			}
			return this.center = t, this.radius = Math.sqrt(i), this
		},
		copy: function(t) {
			return this.center.copy(t.center), this.radius = t.radius, this
		},
		empty: function() {
			return this.radius <= 0
		},
		containsPoint: function(t) {
			return t.distanceToSquared(this.center) <= this.radius * this.radius
		},
		distanceToPoint: function(t) {
			return t.distanceTo(this.center) - this.radius
		},
		intersectsBoundingSphere: function(t) {
			var e = this.radius + t.radius;
			return t.center.distanceToSquared(this.center) <= e * e
		},
		clampPoint: function(t, e) {
			var i = this.center.distanceToSquared(t),
				r = e || new Je;
			return r.copy(t), i > this.radius * this.radius && (r.sub(this.center).normalize(), r.multiplyScalar(this.radius).add(this.center)), r
		},
		getBizBox: function(t) {
			var e = t || new Qe.Box3;
			return e.set(this.center, this.center), e.expandByScalar(this.radius), e
		},
		transform: function(t) {
			return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
		},
		applyMatrix4: function(t) {
			return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
		},
		translate: function(t) {
			return this.center.add(t), this
		},
		equals: function(t) {
			return t.center.equals(this.center) && t.radius === this.radius
		},
		clone: function() {
			return (new Qe.BoundingSphere).copy(this)
		}
	}, Qe.Primitive = function(t, e) {
		t = t || {}, this.data = t, this.vertices = t.vertices, this.faces = t.faces, this.uvs = t.uvs, this.uv2s = t.uv2s, this.uniqueCode = e
	}, Qe.extend(Qe.Primitive, Object, {
		clone: function(t) {
			if (t) {
				var e, i = {};
				for (i.vertices = [], e = 0; e < this.vertices.length; e++) i.vertices.push(this.vertices[e].clone());
				for (i.faces = [], e = 0; e < this.faces.length; e++) i.faces.push(this.faces[e].clone());
				for (i.uvs = [], e = 0; e < this.uvs.length; e++) {
					for (var r = this.uvs[e], a = [], n = 0; n < r.length; n++) a.push(r[n].clone);
					i.uvs.push(a)
				}
				for (i.uv2s = [], e = 0; e < this.uv2s.length; e++) i.uv2s.push(this.uv2s[e].clone());
				return new Qe.Primitive(i)
			}
			return new Qe.Primitvie(this.data)
		}
	}), Qe.PrimitiveCache = {
		_cache: {},
		_useCount: {},
		getPrimitive: function(t) {
			return t ? Qe.PrimitiveCache._cache[t] : null
		},
		setPrimitive: function(t, e) {
			t && (Qe.PrimitiveCache._cache[t] = e)
		},
		usePrimitive: function(t) {
			var e = Qe.PrimitiveCache._useCount[t] || 0;
			e++, Qe.PrimitiveCache._useCount[t] = e
		},
		unUsePrimitive: function(t) {
			var e = Qe.PrimitiveCache._useCount[t] || 0;
			e--, 0 >= e && delete Qe.PrimitiveCache._useCount[t]
		}
	}, Qe.PrimitiveGroupCache = {}, Qe.Color = function(t) {
		return t !== e && this.set(t), this
	}, Qe.extend(Qe.Color, Object, {
		r: 1,
		g: 1,
		b: 1,
		getUniqueCode: function() {
			return "" + this.r + this.g + this.b
		},
		set: function(t) {
			switch (typeof t) {
				case "number":
					this.setHex(t);
					break;
				case "string":
					this.setStyle(t)
			}
		},
		setHex: function(t) {
			return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
		},
		setRGB: function(t, e, i) {
			return this.r = t, this.g = e, this.b = i, this
		},
		setHSV: function(t, e, i) {
			var r, a, n, s, o;
			return 0 === i ? this.r = this.g = this.b = 0 : (r = Math.floor(6 * t), a = 6 * t - r, n = i * (1 - e), s = i * (1 - e * a), o = i * (1 - e * (1 - a)), 0 === r ? (this.r = i, this.g = o, this.b = n) : 1 === r ? (this.r = s, this.g = i, this.b = n) : 2 === r ? (this.r = n, this.g = i, this.b = o) : 3 === r ? (this.r = n, this.g = s, this.b = i) : 4 === r ? (this.r = o, this.g = n, this.b = i) : 5 === r && (this.r = i, this.g = n, this.b = s)), this
		},
		setStyle: function(t) {
			if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(t)) {
				var e = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(t);
				return this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, this
			}
			if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(t)) {
				var e = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(t);
				return this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, this
			}
			if (/^\#([0-9a-f]{6})$/i.test(t)) {
				var e = /^\#([0-9a-f]{6})$/i.exec(t);
				return this.setHex(parseInt(e[1], 16)),
					this
			}
			if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(t)) {
				var e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t);
				return this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)), this
			}
			return /^(\w+)$/i.test(t) ? (this.setHex(Qe.ColorKeywords[t]), this) : void 0
		},
		copy: function(t) {
			return this.r = t.r, this.g = t.g, this.b = t.b, this
		},
		copyGammaToLinear: function(t) {
			return this.r = t.r * t.r, this.g = t.g * t.g, this.b = t.b * t.b, this
		},
		copyLinearToGamma: function(t) {
			return this.r = Math.sqrt(t.r), this.g = Math.sqrt(t.g), this.b = Math.sqrt(t.b), this
		},
		convertGammaToLinear: function() {
			var t = this.r,
				e = this.g,
				i = this.b;
			return this.r = t * t, this.g = e * e, this.b = i * i, this
		},
		convertLinearToGamma: function() {
			return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
		},
		getHex: function() {
			return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
		},
		getHexString: function() {
			return ("000000" + this.getHex().toString(16)).slice(-6)
		},
		getStyle: function() {
			return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
		},
		getHSV: function(t) {
			var i, r, a = this.r,
				n = this.g,
				s = this.b,
				o = Math.max(Math.max(a, n), s),
				l = Math.min(Math.min(a, n), s),
				h = o;
			if (l === o) i = 0, r = 0;
			else {
				var c = o - l;
				r = c / o, i = a === o ? (n - s) / c : n === o ? 2 + (s - a) / c : 4 + (a - n) / c, i /= 6, 0 > i && (i += 1), i > 1 && (i -= 1)
			}
			return t === e && (t = {
				h: 0,
				s: 0,
				v: 0
			}), t.h = i, t.s = r, t.v = h, t
		},
		add: function(t) {
			return this.r += t.r, this.g += t.g, this.b += t.b, this
		},
		addColors: function(t, e) {
			return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
		},
		addScalar: function(t) {
			return this.r += t, this.g += t, this.b += t, this
		},
		multiply: function(t) {
			return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
		},
		multiplyScalar: function(t) {
			return this.r *= t, this.g *= t, this.b *= t, this
		},
		lerp: function(t, e) {
			return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
		},
		clone: function() {
			return (new Qe.Color).setRGB(this.r, this.g, this.b)
		}
	}), Qe.ColorKeywords = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	}, Qe.Data = function(t) {
		Qe.PropertyChangeDispatcher.call(this), this._childList = new ci, this._childMap = {}, this._clientMap = {}, this._id = t
	}, Qe.extend(Qe.Data, Qe.PropertyChangeDispatcher, {
		___accessor: ["name"],
		constructor: Qe.Data,
		getId: function() {
			return this._id
		},
		onAlarmChange: function() {},
		onPropertyChange: function(t, e, i) {},
		setGroupId: function(t) {
			if (this._groupId !== t) {
				var e = this._groupId;
				this._groupId = t, this.firePropertyChange("groupId", e, t)
			}
		},
		getGroupId: function() {
			return this._groupId
		},
		hasChildren: function() {
			return this._childList.size() > 0
		},
		getChildren: function() {
			return this._childList
		},
		isDescendantOf: function(t) {
			if (!t) return !1;
			if (!t.hasChildren()) return !1;
			for (var e = this._parent; e;) {
				if (t === e) return !0;
				e = e.getParent()
			}
			return !1
		},
		getParent: function() {
			return this._parent
		},
		getRoot: function() {
			var t = this._parent;
			return t && null == t._parent ? t : t && null != t._parent ? t.getRoot(t) : arguments[0]
		},
		setParent: function(t) {
			if (!(this._isUpdatingParent || this._parent === t || this === t || t && t.isDescendantOf(this))) {
				var e = this._parent;
				this._parent = t, this._isUpdatingParent = !0, e && e.removeChild(this), t && t.addChild(this), delete this._isUpdatingParent, this.firePropertyChange("parent", e, t), this.onParentChanged(e, t)
			}
		},
		onParentChanged: function(t, e) {},
		addChild: function(t, i) {
			return i === e && (i = this._childList.size()), t && t !== this ? this._childMap[t.getId()] ? !1 : this.isDescendantOf(t) ? !1 : (t.getParent() && t.getParent().removeChild(t), (0 > i || i > this._childList.size()) && (i = this._childList.size()), this._childList.add(t, i), this._childMap[t._id] = t, t.setParent(this), this.firePropertyChange("children", null, t), this.onChildAdded(t, i), !0) : !1
		},
		onChildAdded: function(t, e) {},
		clearChildren: function() {
			if (null != this._childList && this._childList.size() > 0) {
				var t = this._childList.toList(),
					e = this;
				t.forEach(function(t) {
					e.removeChild(t)
				})
			}
		},
		removeChild: function(t) {
			if (!t) return !1;
			if (!this._childMap[t._id]) return !1;
			var e = this._childList.remove(t);
			return delete this._childMap[t._id], this.firePropertyChange("children", t, null), t.setParent(null), this.onChildRemoved(t, e), !0
		},
		onChildRemoved: function(t, e) {},
		c: function(t) {
			if (t)
				for (var e in t) this.setClient(e, t[e])
		},
		setClient: function(t, e) {
			if (null == t) return this;
			null == this._clientMap && (this._clientMap = new Object);
			var i = this._clientMap[t];
			if (i !== e) return null == e ? delete this._clientMap[t] : this._clientMap[t] = e, this._clientMap[t] = e, this.firePropertyChange("C:" + t, i, e), this.onClientChanged(t, i, e), this
		},
		getClient: function(t) {
			return this._clientMap[t]
		},
		onClientChanged: function(t, e, i) {},
		setPropertyValue: function(t, e) {
			if (this[t] === e) return !1;
			var i = this[t];
			return i instanceof Qe.Color && null != e ? (i = i.clone(), e instanceof Qe.Color ? this[t].copy(e) : this[t].set(e)) : this[t] = e, !0
		}
	}), Qe.Element = function(t) {
		Qe.Data.call(this, t), this._id = t || Qe.id("E"), this.styleMap = {}, this._visible = !0, this._selected = !1, this._selectable = !0, this._editable = !0, this.editing = !1, this.up = new Je(0, 1, 0), this._position = new Je(0, 0, 0), this._rotation = new Je(0, 0, 0), this._scale = new Je(1, 1, 1), this.eulerOrder = Qe.defaultEulerOrder, this.rotationAutoUpdate = !0, this.matrix = new ti, this.worldMatrix = new ti, this.rotationWorldMatrix = new ti, this.matrixAutoUpdate = !1, this.worldMatrixNeedsUpdate = !0, this.quaternion = new Qe.Quat, this.useQuaternion = !1, this._sizeFixed = !1, this._fixedSize = 108, this.castShadow = !0, this.receiveShadow = !0, this.frustumCulled = !0, this._vector = new Je, this.renderDepth = null, this._attachId = "", this._groupId = null, this.editTransformToParent = !1, this._alarmState = new Qe.AlarmState(this), this.colors = []
	}, Qe.Element.__m1 = new ti, Qe.ElementIdCount = 0, Qe.extend(Qe.Element, Qe.Data, {
		IStyle: !0,
		___accessor: ["visible", "selected", "selectable", "editable", "sizeFixed"],
		constructor: Qe.Element,
		getAlarmState: function() {
			return this._alarmState
		},
		onAlarmChange: function(t, e) {
			var i = this._alarmState.getHighestNativeAlarmSeverity();
			i ? this.setStyle("m.alarmColor", new Qe.Color(i.color)) : this.setStyle("m.alarmColor", null)
		},
		getDefaultInstance: function() {
			return this.constructor.defaultInstance === e && (this.constructor.defaultInstance = new this.constructor), this.constructor.defaultInstance
		},
		onParentChanged: function(t, e) {
			this.updateWorldMatrix(!0, !1)
		},
		onChildAdded: function(t, e) {
			t.updateWorldMatrix(!0, !1)
		},
		onChildRemoved: function(t, e) {
			t.updateWorldMatrix(!0, !1)
		},
		generatePrimitiveKey: function() {
			return null
		},
		serializeProperty: function() {},
		clear: function(t) {},
		getSelectStyle: function() {
			return this.getStyle("select.style")
		},
		isSpaceChangedProperty: function(t) {
			return "scale" === t || "position" === t || "rotation" === t
		},
		isStyleEquals: function(t, e, i) {
			return null == e && null == i ? !0 : e === i
		},
		setStyle: function(t, e) {
			if (null == t) return this;
			null == this.styleMap && (this.styleMap = {});
			var i = this.styleMap[t];
			return this.isStyleEquals(t, i, e) ? this : (null == e ? delete this.styleMap[t] : this.styleMap[t] = e, this.onStyleChanged(t, i, e), this.firePropertyChange(Qe.Styles.PREFIX_STYLE + t, i, e), this)
		},
		s: function(t) {
			if (null != t) {
				null == this.styleMap && (this.styleMap = {});
				var e, i, r, a = {};
				for (e in t) i = t[e], r = this.styleMap[e], this.isStyleEquals(e, r, i) || (null == i ? delete this.styleMap[e] : this.styleMap[e] = i, this.firePropertyChange(Qe.Styles.PREFIX_STYLE + e, r, i), this.isMaterialStyle(e) && (a[e] = [i, r]));
				return this.onMaterialStylesChanged(a), this
			}
		},
		getStyle: function(t, e, i) {
			null == i && (i = !0);
			var r;
			return null != this.styleMap && (r = this.styleMap[t]), e && (r = this.getCloneObject(r)), null == r && i && (r = this.getDefaultStyle(t, e)), r
		},
		getCloneObject: function(t) {
			if (null == t) return null;
			if (Qe.Utils.isArray(t)) {
				for (var e = [], i = 0; i < t.length; i++) e.push(this.getCloneObject(t[i]));
				return e
			}
			return t.clone ? t.clone() : t
		},
		getSideIndexMapping: function() {},
		setMaterialStyle: function(t, e) {},
		setMaterialStyles: function(t) {
			var e, r, a, n;
			for (var s in t) {
				if (s.startsWith("m.")) e = s.substr(s.indexOf(".") + 1);
				else if (this.getSideIndexMapping() && this.isSideStyle(a)) {
					var o = a.substr(0, a.indexOf(".")),
						l = this.getSideMaterialIndex(o);
					if (l != i) continue;
					a = a.substr(a.indexOf(".") + 1), e = a.substr(s.indexOf(".") + 1)
				} else s.startsWith("alarm.billboard.") && (n = !0);
				var h = t[s];
				r = h[0], null == r ? r = Qe.Styles.getStyle(s) : xi.isArray(r) && (r = r[i]), this._A97(this.material, e, r)
			}
			n && this._alarmBillboard && this._setAlarmBillboardPositionAndSize(this._alarmBillboard)
		},
		onMaterialStylesChanged: function(t) {
			this.setMaterialStyles(t)
		},
		isMaterialStyle: function(t) {
			return t.startsWith("m.") ? !0 : this.getSideIndexMapping() && this.isSideStyle(t) ? !0 : !1
		},
		onStyleChanged: function(t, e, i) {
			if (t.startsWith("m.")) this.setMaterialStyle(t, i);
			else if (this.getSideIndexMapping() && this.isSideStyle(t)) {
				var r = t.substr(0, t.indexOf("."));
				t = t.substr(t.indexOf(".") + 1);
				var a = this.getSideMaterialIndex(r);
				this.setMaterialStyle(t, i, a)
			} else t.startsWith("alarm.billboard.") && this._alarmBillboard && this._setAlarmBillboardPositionAndSize(this._alarmBillboard)
		},
		textureMapping: {
			texture: "map",
			texture1: "map1",
			texture2: "map2",
			textureb: "blendMap",
			texturebp: "bumpMap",
			lightMap: "lightMap",
			lightmap: "lightMap",
			normalmap: "normalMap",
			envmap: "envMap",
			specularmap: "specularMap"
		},
		_A97: function(t, e, i) {
			if (e.startsWith("texture.") || e.startsWith("texture1.") || e.startsWith("texture2.") || e.startsWith("textureb.") || e.startsWith("texturen.") || e.startsWith("texturebp.") || e.startsWith("lightmap") || e.startsWith("envmap") || e.startsWith("normalmap") || e.startsWith("specularmap")) {
				var r = e.substr(0, e.indexOf(".")),
					a = e.substr(e.indexOf(".") + 1);
				if ("offset" === a || "repeat" === a) return void t.setPropertyValue(a, this.getCloneObject(i));
				var n = this.textureMapping[r],
					s = t[n],
					o = Qe.TexturePool.TestTexture;
				if ("image" === a) {
					var l = i;
					if (e.startsWith("envmap") && xi.isArray(l))
						for (var h = 0; h < l.length; h++)
							if (null == l[h]) {
								l = null;
								break
							}
					if (null == s && null != l) {
						o.resetValue(), o._image = l, o.setImageSrc(l);
						var c = o.getUniqueCode(),
							u = Qe.TexturePool.getTexture(c);
						null == u && (u = new Qe.Texture(l), Qe.TexturePool.setTexture(c, u)), t.setMap(u, n)
					} else if (null == l) t.setMap(null, n);
					else {
						s.clone(o, !1), o._image = l, o.setImageSrc(l);
						var c = o.getUniqueCode(),
							u = Qe.TexturePool.getTexture(c);
						u !== s && (null == u && (u = new Qe.Texture, s.clone(u, !1), u.setImage(l), Qe.TexturePool.setTexture(c, u)), t.setMap(u, n))
					}
				} else if (null != s) {
					s.clone(o, !1), o[a] = this.getCloneObject(i);
					var c = o.getUniqueCode(),
						u = Qe.TexturePool.getTexture(c);
					u != s && (null == u && (u = new Qe.Texture, s.clone(u), u[a] = i), t.setMap(u, n))
				}
			} else "type" === e && t.setType ? t.setType(i) : t.setPropertyValue(e, this.getCloneObject(i))
		},
		getDefaultStyle: function(t, e) {
			if (null == t) return null;
			if (t.startsWith("m.")) {
				var i = [],
					r = t.substr(t.indexOf(".") + 1);
				if (this.material.materials) {
					var a = this.material.materials;
					a = a || [this.material];
					for (var n = 0; n < a.length; n++) {
						var s = a[n];
						if (r.startsWith("texture.") || r.startsWith("texture1.") || r.startsWith("texture2.") || r.startsWith("textureb.") || r.startsWith("texturen.") || r.startsWith("texturebp.") || r.startsWith("lightmap") || r.startsWith("envmap") || r.startsWith("normalmap") || r.startsWith("specularmap")) {
							var o = r.substr(0, r.indexOf(".")),
								l = r.substr(r.indexOf(".") + 1),
								h = (r.substr(r.indexOf(".") + 1), this.textureMapping[o]),
								c = s[h];
							if (c)
								if ("image" === l)
									if (xi.isArray(c._image)) {
										var u = [];
										i.push(u);
										for (var f = 0; f < c._image.length; f++) u.push(c._image[f].src)
									} else i.push(c._image.src);
							else "offset" === l || "repeat" === l ? i.push(s[l]) : i.push(s.map[l]);
							else i.push(Qe.Styles.getStyle(t))
						} else i.push(s[r])
					}
				}
				e && (i = this.getCloneObject(i));
				for (var p = !0, n = 0; n < i.length; n++)
					if (0 != i.indexOf(i[n])) {
						p = !1;
						break
					}
				return p ? i[0] : i
			}
			if (this.isSideStyle(t)) {
				var d = t.substr(0, t.indexOf("."));
				t = t.substr(t.indexOf(".") + 1);
				var r = t.substr(t.indexOf(".") + 1),
					m = this.getSideMaterialIndex(d);
				if (null != m) {
					var g, s = this.material.materials[m];
					return r.startsWith("texture.") ? s.map && (g = "texture.image" === r ? s.map._image.src : s.map[r]) : g = s[r], e && (g = this.getCloneObject(g)), g
				}
			}
			return Qe.Styles.getStyle(t)
		},
		isSideStyle: function(t) {
			if (-1 === t.indexOf(".")) return !1;
			var i = this.getSideIndexMapping();
			if (!i) return !1;
			var r = t.substr(0, t.indexOf("."));
			return i[r] !== e ? !0 : !1
		},
		setUp: function(t, e, i) {
			var r;
			if (3 === arguments.length) {
				if (this.up.x === t && this.up.y === e && this.up.z === i) return;
				r = new Je(t, e, i)
			} else {
				if (this.up.x === t.x && this.up.y === t.y && this.up.z === t.z) return;
				r = t
			}
			var a = this.up;
			this.up = r, this.onUpChanged(a, newValue), this.firePropertyChange("up", a, r)
		},
		getUp: function() {
			return this.up
		},
		onUpChanged: function(t, e) {},
		checkNumber: function(t, e, i, r) {
			xi.isNaN(t) && console.error(r + ",x is not a number"), xi.isNaN(e) && console.error(r + ",y is not a number"), xi.isNaN(i) && console.error(r + ",z is not a number")
		},
		invalidateTexture: function(t) {
			var e, i, r, a = this.material;
			if (null != t) {
				if ("string" == typeof t) {
					var n = this.getSideIndexMapping();
					if (null != n && (t = n[t]), null == t) return
				}
				if ("number" != typeof t) return;
				r = a instanceof Qe.ArrayMaterial ? a.materials[t] : materail, this._dirtyMaterialTexture(r)
			} else if (a instanceof Qe.ArrayMaterial)
				for (i = a.materials, e = 0; e < i.length; e++) r = i[e], this._dirtyMaterialTexture(r)
		},
		_dirtyMaterialTexture: function(t) {
			null != t && t.map && t.map instanceof Qe.Texture && this._dirtyTexture(t.map)
		},
		_dirtyTexture: function(t) {
			var e = t._image;
			t.firePropertyChange("image", null, e)
		},
		p: function(t, e, i) {
			return 0 === arguments.length ? this.getPosition() : void(3 === arguments.length ? this.setPosition(t, e, i) : this.setPosition(t))
		},
		setPosition: function(t, e, i) {
			var r;
			if (3 === arguments.length) {
				if (this._position.x === t && this._position.y === e && this._position.z === i) return;
				this.checkNumber(t, e, i, "setPosition"), r = new Je(t, e, i)
			} else {
				if (this._position.x === t.x && this._position.y === t.y && this._position.z === t.z) return;
				if (!(t instanceof Je)) throw "Element.setPosition : position is not instanceof TGL.XiangliangThree";
				r = t
			}
			var a = this._position;
			this._position = r, this.updateWorldMatrix(!0, !1), this.firePropertyChange("position", a, r)
		},
		getPosition: function(t) {
			return t == e && (t = !0), t ? this._position.clone() : this._position
		},
		setPositionX: function(t) {
			if (this._position.x !== t) {
				this.checkNumber(t, 0, 0, "setPositionX");
				var e = this._position.x;
				this._position.x = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("positionX", e, t)
			}
		},
		setX: function(t) {
			this.setPositionX(t)
		},
		getPositionX: function() {
			return this._position.x
		},
		getX: function() {
			return this.getPositionX()
		},
		setPositionY: function(t) {
			if (this._position.y !== t) {
				this.checkNumber(0, t, 0, "setPositionY");
				var e = this._position.y;
				this._position.y = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("positionY", e, t)
			}
		},
		setY: function(t) {
			this.setPositionY(t)
		},
		getPositionY: function() {
			return this._position.y
		},
		getY: function() {
			return this.getPositionY()
		},
		setPositionZ: function(t) {
			if (this._position.z !== t) {
				this.checkNumber(0, 0, t, "setPositionZ");
				var e = this._position.z;
				this._position.z = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("positionZ", e, t)
			}
		},
		setZ: function(t) {
			this.setPositionZ(t)
		},
		getPositionZ: function() {
			return this._position.z
		},
		getZ: function() {
			return this.getPositionZ()
		},
		setScale: function(t, e, i) {
			var r;
			if (3 === arguments.length) {
				if (this._scale.x === t && this._scale.y === e && this._scale.z === i) return;
				this.checkNumber(t, e, i, "setScale"), r = new Je(t, e, i)
			} else {
				if (this._scale.x === t.x && this._scale.y === t.y && this._scale.z === t.z) return;
				if (!(t instanceof Je)) throw "Element.setScale : scale is not instanceof TGL.XiangliangThree";
				r = t
			}
			var a = this._scale;
			r.x = r.x || 1, r.y = r.y || 1, r.z = r.z || 1, this._scale = r, this.updateWorldMatrix(!0, !1), this.firePropertyChange("scale", a, r)
		},
		getScale: function(t) {
			return t == e && (t = !0), t ? this._scale.clone() : this._scale
		},
		setScaleX: function(t) {
			if (this._scale.x !== t) {
				this.checkNumber(t, 0, 0, "setScalX");
				var e = this._scale.x;
				this._scale.x = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("scaleX", e, t)
			}
		},
		getScaleX: function() {
			return this._scale.x
		},
		setScaleY: function(t) {
			if (this._scale.y !== t) {
				this.checkNumber(0, t, 0, "setScaleY");
				var e = this._scale.y;
				this._scale.y = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("scaleY", e, t)
			}
		},
		getScaleY: function() {
			return this._scale.y
		},
		setScaleZ: function(t) {
			if (this._scale.z !== t) {
				this.checkNumber(0, 0, t, "setScaleZ");
				var e = this._scale.z;
				this._scale.z = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("scaleZ", e, t)
			}
		},
		getScaleZ: function() {
			return this._scale.z
		},
		setRotation: function(t, e, i) {
			var r;
			if (3 === arguments.length) {
				if (this._rotation.x === t && this._rotation.y === e && this._rotation.z === i) return;
				this.checkNumber(t, e, i, "setRotation"), r = new Je(t, e, i)
			} else {
				if (this._rotation.x === t.x && this._rotation.y === t.y && this._rotation.z === t.z) return;
				if (!(t instanceof Je)) throw "Element.setRotation : rotation is not instanceof TGL.XiangliangThree";
				r = t
			}
			var a = this._rotation;
			this._rotation = r, this.updateWorldMatrix(!0, !1), this.firePropertyChange("rotation", a, r)
		},
		getRotation: function(t) {
			return t == e && (t = !0), t ? this._rotation.clone() : this._rotation
		},
		setRotationX: function(t) {
			if (this._rotation.x !== t) {
				this.checkNumber(t, 0, 0, "setRotationX");
				var e = this._rotation.x;
				this._rotation.x = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("rotationX", e, t)
			}
		},
		getRotationX: function() {
			return this._rotation.x
		},
		setRotationY: function(t) {
			if (this._rotation.y !== t) {
				this.checkNumber(0, t, 0, "setRotationY");
				var e = this._rotation.y;
				this._rotation.y = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("rotationY", e, t)
			}
		},
		getRotationY: function() {
			return this._rotation.y
		},
		setRotationZ: function(t) {
			if (this._rotation.z !== t) {
				this.checkNumber(0, 0, t, "setRotationZ");
				var e = this._rotation.z;
				this._rotation.z = t, this.updateWorldMatrix(!0, !1), this.firePropertyChange("rotationZ", e, t)
			}
		},
		getRotationZ: function() {
			return this._rotation.z
		},
		applyMatrix: function(t) {
			var e = this.matrix.clone();
			this.matrix.multiplyMatrices(t, this.matrix), this._scale.getScaleFromMatrix(this.matrix);
			var i = (new ti).extractRotation(this.matrix);
			this._rotation.setEulerFromRotationMatrix(i, this.eulerOrder), this._position.getPositionFromMatrix(this.matrix), this.updateWorldMatrix(!0, !1), this.firePropertyChange("matrix", e, this.matrix)
		},
		translate: function(t, e) {
			this.matrix.rotateAxis(e), this.setPosition(this._position.clone().add(e.multiplyScalar(t)))
		},
		translateX: function(t) {
			this.translate(t, this._vector.set(1, 0, 0))
		},
		translateY: function(t) {
			this.translate(t, this._vector.set(0, 1, 0))
		},
		translateZ: function(t) {
			this.translate(t, this._vector.set(0, 0, 1))
		},
		rotateFromAxis: function(t, e, i) {
			e = e.clone().applyMatrix4(this.matrix), t = t.clone().applyMatrix4((new ti).extractRotation(this.matrix));
			var r = (new ti).makeRotationAxisAndCenter(t, i, e);
			this.applyMatrix(r)
		},
		rotateFromWorldAxis: function(t, e) {
			var i = new ti;
			i.makeRotationAxis(t.normalize(), e), i.multiply(this.matrix), this.matrix = i;
			var r = (new ti).extractRotation(this.matrix),
				a = new Je;
			a.setEulerFromRotationMatrix(r, this.eulerOrder), this.setRotation(a)
		},
		getEulerAngles: function() {
			return this.matrix.getEulerAngles()
		},
		rotateFromWorldXAxis: function(t) {
			this.rotateFromWorldAxis(new Je(1, 0, 0), t)
		},
		rotateFromWorldYAxis: function(t) {
			this.rotateFromWorldAxis(new Je(0, 1, 0), t)
		},
		rotateFromWorldZAxis: function(t) {
			this.rotateFromWorldAxis(new Je(0, 0, 1), t)
		},
		getRelativeTransform: function(t) {
			if (t instanceof Qe.Element) {
				var e = (new ti).getInverse(t.matrix.clone()),
					i = (new ti).multiplyMatrices(e, this.matrix.clone()),
					r = (new Je).getPositionFromMatrix(i),
					a = (new Je).setEulerFromRotationMatrix(i),
					n = (new Je).getScaleFromMatrix(i),
					s = {
						position: r,
						rotation: a,
						scale: n,
						matrix: i
					};
				return s
			}
			return null
		},
		localToWorld: function(t) {
			return null == this._parent ? t : t.clone().applyMatrix4(this._parent.worldMatrix)
		},
		localToWorld2: function(t) {
			return t.clone().applyMatrix4(this.worldMatrix)
		},
		getWorldPosition: function() {
			return this.worldMatrix.getPosition()
		},
		direction: function(t) {
			var e = t.applyMatrix4((new ti).extractRotation(this.worldMatrix));
			return e.normalize(), e
		},
		frontDirection: function() {
			var t = new Je(0, 0, 1);
			return t = t.applyMatrix4((new ti).extractRotation(this.worldMatrix)), t.normalize(), t
		},
		worldPosition: function(t, e) {
			e = e > 0 ? e : t.length();
			var i = this.worldMatrix.getPosition();
			return i.add(this.direction(t).multiplyScalar(e))
		},
		frontWorldPosition: function(t) {
			t = t > 0 ? t : 1;
			var e = this.worldMatrix.getPosition();
			return e.add(this.frontDirection().multiplyScalar(t))
		},
		worldToLocal: function(t) {
			return t.clone().applyMatrix4(Qe.Element.__m1.getInverse(this.worldMatrix))
		},
		lookAt: function(t, e) {
			this.matrix.lookAt(t, this._position, e ? e : this.up), this.rotationAutoUpdate && (this.useQuaternion === !1 ? this._rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1])), this.worldMatrixNeedsUpdate = !0
		},
		iterator: function(t) {
			t(this), this._childList && this._childList.forEach(function(e) {
				e.iterator(t)
			})
		},
		getChildByName: function(t, i) {
			for (var r = 0, a = this.children.length; a > r; r++) {
				var n = this.children[r];
				if (n.name === t) return n;
				if (i === !0 && (n = n.getChildByName(t, i), n !== e)) return n
			}
			return e
		},
		getDescendants: function(t) {
			t === e && (t = []);
			var i = this.getChildren().toArray();
			Array.prototype.push.apply(t, i);
			for (var r = 0, a = i.length; a > r; r++) i[r].getDescendants(t);
			return t
		},
		fixSize: function(t) {
			if (this._sizeFixed) {
				this.updateWorldMatrix();
				var e = new Je,
					i = new Je;
				e.getPositionFromMatrix(this.worldMatrix), t.updateWorldMatrix(), i.getPositionFromMatrix(t.worldMatrix), scale = e.distanceTo(i) / this._fixedSize, 0 === scale && (scale = 1e-5), this.setScale(scale, scale, scale)
			}
		},
		updateMatrix: function() {
			this.matrix.setPosition(this._position), this.useQuaternion === !1 ? this.matrix.setRotationFromEuler(this._rotation, this.eulerOrder) : this.matrix.setRotationFromQuaternion(this.quaternion), (1 !== this._scale.x || 1 !== this._scale.y || 1 !== this._scale.z) && this.matrix.scale(this._scale), this.worldMatrixNeedsUpdate = !0
		},
		updateWorldMatrix: function(t, i) {
			if (i = i == e ? !0 : i, this.matrixAutoUpdate === !0 && this.updateMatrix(), this.worldMatrixNeedsUpdate === !0 || t === !0) {
				this.matrixAutoUpdate === !1 && this.updateMatrix();
				var r = this.worldMatrix.clone();
				this._parent == e ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiplyMatrices(this._parent.worldMatrix, this.matrix), this.worldMatrixNeedsUpdate = !1, t = !0, r.equals(this.worldMatrix) || (i && this.firePropertyChange("worldMatrix", r, this.worldMatrix), this.updateGleyeMatrix && this.updateGleyeMatrix(!1))
			}
			this._childList.forEach(function(e) {
				e.updateWorldMatrix(t)
			})
		},
		cloneCallback: function(t) {},
		clone: function(t, i, r) {
			if ("boolean" == typeof t && (r = i, i = t, t = e), t == e && (t = this.constructor ? new this.constructor : new Qe.Element), r === e && (r = !0), t.name = this.name, null == t.up && (t.up = new Je(0, 1, 0)), t.up.copy(this.up), t._position.copy(this._position), t._rotation.copy(this._rotation), t.eulerOrder = this.eulerOrder, t._scale.copy(this._scale), t.renderDepth = this.renderDepth, t.rotationAutoUpdate = this.rotationAutoUpdate, t.matrix.copy(this.matrix), t.worldMatrix.copy(this.worldMatrix), t.rotationWorldMatrix.copy(this.rotationWorldMatrix), t.matrixAutoUpdate = this.matrixAutoUpdate, t.worldMatrixNeedsUpdate = this.worldMatrixNeedsUpdate, t.quaternion.copy(this.quaternion), t.useQuaternion = this.useQuaternion, t._visible = this._visible, t.castShadow = this.castShadow, t.receiveShadow = this.receiveShadow, t.frustumCulled = this.frustumCulled, t.styleMap = t.styleMap || {}, r && this._childList && this._childList.forEach(function(e) {
					t.addChild(e.clone(i, r))
				}), this.constructor) {
				var a = this.constructor.prototype.__accessor,
					n = this.constructor.prototype.__bool;
				if (a && a.length > 0)
					for (var s = 0; s < a.length; s++) {
						var o = a[s],
							l = Qe.getter(o, n),
							h = Qe.setter(o);
						t[h] && t[h](this[l]())
					}
			}
			if (i && this.vertices) {
				var c = t,
					u = this.vertices;
				c.vertices = [], c.faces = [], c.uvs = [];
				for (var s = 0, f = u.length; f > s; s++) c.vertices.push(u[s].clone());
				for (var p = this.faces, s = 0, f = p.length; f > s; s++) c.faces.push(p[s].clone());
				for (var d = this.uvs, s = 0, f = d.length; f > s; s++) {
					for (var m = d[s], g = [], y = 0, v = m.length; v > y; y++) g.push(new Qe.XiangliangTwo(m[y].x, m[y].y));
					c.uvs.push(g)
				}
			}
			for (var x in this.styleMap) t.setStyle(x, this.getCloneObject(this.styleMap[x]));
			if (null != this._clientMap)
				for (var A in this._clientMap) t.setClient(A, this._clientMap[A]);
			return this.material && this.material.clone && (t.material = this.material.clone()), t.cloneCallback(i), t
		}
	}), Qe.Annotation = function(t, e, i) {
		Qe.Element.call(this, i), this._label = t, this._text = e, this._gleyePosition = null
	}, Qe.extend(Qe.Annotation, Qe.Element, {
		___accessor: ["label", "text", "gleyePosition"]
	}), Qe.Node = function(t) {
		Qe.Element.call(this, t), this.name = "", this.computed = !1, this.selectionData = null, this.stylesMap = new Object, this.renderGroup = [], this.primitive = null, this.vertices = [], this.faces = [], this.uvs = [], this.uv2s = [], this.colors = [], this.normals = [], this.faces = [], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.morphTargetsNeedUpdate = !1, this.elementsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.buffersNeedUpdate = !1, this.computeNodeData(), this._alarmBillboard = null
	}, Qe.extend(Qe.Node, Qe.Element, {
		__accessor: ["vertices", "faces", "uvs", "linkAgent"],
		__SizePropeties: [],
		setUpdateFlags: function(t) {
			this.verticesNeedUpdate = t, this.morphTargetsNeedUpdate = t, this.elementsNeedUpdate = t, this.uvsNeedUpdate = t, this.normalsNeedUpdate = t, this.tangentsNeedUpdate = t, this.colorsNeedUpdate = t
		},
		getLinks: function() {
			return this._links
		},
		getFromLinks: function() {
			return this._fromLinks
		},
		getToLinks: function() {
			return this._toLinks
		},
		_addFromLink: function(t) {
			this._allLinks || (this._allLinks = new ci), this._fromLinks || (this._fromLinks = new ci), this._allLinks.add(t), this._fromLinks.add(t), this._resetLinkSet()
		},
		_addToLink: function(t) {
			this._allLinks || (this._allLinks = new ci), this._toLinks || (this._toLinks = new ci), this._allLinks.add(t), this._toLinks.add(t), this._resetLinkSet()
		},
		_removeFromLink: function(t) {
			this._allLinks.remove(t), this._fromLinks.remove(t), 0 === this._allLinks.size() && delete this._allLinks, 0 === this._fromLinks.size() && delete this._fromLinks, this._resetLinkSet()
		},
		_removeToLink: function(t) {
			this._allLinks.remove(t), this._toLinks.remove(t), 0 === this._allLinks.size() && delete this._allLinks, 0 === this._toLinks.size() && delete this._toLinks, this._resetLinkSet()
		},
		_resetLinkSet: function() {
			if (delete this._loopedLinks, !this._allLinks || 0 === this._allLinks.size()) return void delete this._links;
			var t;
			this._allLinks.forEach(function(e) {
				e.isLooped() && (t || (t = {}), t[e._id] || (this._loopedLinks || (this._loopedLinks = new ci), this._loopedLinks.add(e), t[e._id] = e))
			}, this), t ? (this._links = new ci, this._allLinks.forEach(function(e) {
				t[e._id] ? t[e._id] !== !1 && (t[e._id] = !1, this._links.add(e)) : this._links.add(e)
			}, this)) : this._links = this._allLinks
		},
		onAlarmChange: function(t, e) {
			Qe.Element.prototype.onAlarmChange.call(this, t, e);
			var i = this._alarmState.getPropagateSeverity();
			i || (i = this._alarmState.getHighestNativeAlarmSeverity()), i && null == this._parent ? (null == this._alarmBillboard && this.setAlarmBillboard(new Qe.Billboard), this._alarmBillboard.setStyle("m.texture.image", Qe.ImageCache.AlarmBillboardImage), this._alarmBillboard.setStyle("m.color", i.color), this._alarmBillboard.setStyle("m.alignment", Qe.BillboardAlignment.bottomCenter)) : this.setAlarmBillboard(null)
		},
		_setAlarmBillboardPositionAndSize: function(t) {
			var e = this.getStyle("alarm.billboard.position"),
				i = this.getBizBox(),
				r = i.min,
				a = i.max,
				n = i.center(),
				s = i.size();
			"topLeft" === e ? t._position.set(r.x, a.y, n.z + 1) : "topRight" === e ? t._position.set(a.x, a.y, n.z + 1) : "topBack" === e ? t._position.set(n.x, a.y, r.z - 1) : "topFront" === e ? t._position.set(n.x, a.y, a.z + 1) : t._position.set(n.x, a.y, n.z + 1);
			var o = this.getStyle("alarm.billboard.scale");
			o instanceof Je ? t._scale.copy(o) : t._scale.set(s.x / 2, s.x / 2, 1);
			var l = this.getStyle("alarm.billboard.vertical");
			t.setStyle("m.vertical", l)
		},
		getLinkOffset: function(t) {
			return new mono.XiangliangThree(0, 0, 0)
		},
		getLinkExtend: function(t) {
			return new mono.XiangliangThree(0, 0, 0)
		},
		clearLinkOrthogonal: function(t, e) {
			return !1
		},
		clearLinkExtend: function(t, e) {
			return !1
		},
		setAlarmBillboard: function(t) {
			if (this._alarmBillboard !== t) {
				var e = this._alarmBillboard;
				t ? (this._alarmBillboard = t, t.setParent(this), this._setAlarmBillboardPositionAndSize(t)) : delete this._alarmBillboard, this.firePropertyChange("alarmBillboard", e, t)
			}
		},
		needUpdate: function() {
			return this.verticesNeedUpdate || this.morphTargetsNeedUpdate || this.elementsNeedUpdate || this.uvsNeedUpdate || this.normalsNeedUpdate || this.tangentsNeedUpdate || this.colorsNeedUpdate
		},
		getVerticesWithChildren: function(t, e) {
			function i(i) {
				i.applyMatrix4(t), e.push(i)
			}
			null == e && (e = []), null == t && (t = new ti);
			var r;
			if (this instanceof Qe.Node) {
				if (null != this.vertices && 0 != this.vertices.length) {
					var a = this.getBizBox(),
						n = a.min,
						s = a.max;
					i(n.clone()), i(s.clone()), i(new Je(n.x, n.y, s.z)), i(new Je(n.x, s.y, n.z)), i(new Je(s.x, n.y, n.z)), i(new Je(s.x, s.y, n.z)), i(new Je(s.x, n.y, s.z)), i(new Je(n.x, s.y, s.z))
				}
				for (var r = 0; r < (this._childList ? this._childList.size() : 0); r++) {
					var o = this._childList.get(r),
						l = new ti;
					l.multiplyMatrices(t, o.matrix.clone()), o.getVerticesWithChildren && o.getVerticesWithChildren(l, e)
				}
			}
			return e
		},
		getBizBoxWithChildren: function(t) {
			var e = this.getVerticesWithChildren();
			if (t)
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					if (r.getParent() === this.getParent() && r !== this) {
						var a = (new ti).getInverse(this.matrix.clone()),
							n = (new ti).multiplyMatrices(a, r.matrix.clone());
						e = e.concat(r.getVerticesWithChildren(n))
					}
				}
			var s = new Qe.BizBox;
			return s.setFromPoints(e), s
		},
		getWorldBizBox: function() {
			for (var t = [], e = 0; e < this.vertices.length; e++) {
				var i = this.vertices[e].clone();
				i.applyMatrix4(this.worldMatrix), t.push(i)
			}
			var r = new Qe.BizBox;
			return r.setFromPoints(t), r
		},
		getBizBox: function() {
			return null == this.boundingBox && this.computeBizBox(), this.boundingBox
		},
		computeBizBox: function() {
			null === this.boundingBox && (this.boundingBox = new Qe.BizBox), this.boundingBox.setFromPoints(this.vertices)
		},
		computeBoundingSphere: function() {
			null === this.boundingSphere && (this.boundingSphere = new Qe.BoundingSphere), this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices)
		},
		createPropagateAlarmCube: function(t) {
			if (null == this.boundingBox && this.computeBizBox(), t._attachId = this._id, null == this.propagateAlarmData) {
				var e = this.getStyle("outer.offset"),
					i = this.boundingBox.min,
					r = this.boundingBox.max;
				t.width = r.x - i.x + e, t.height = r.y - i.y + e, t.depth = r.z - i.z + e,
					t.computed = !1, t.computeNodeData(), this.propagateAlarmData = t.data, oi(t, !0), this.propagateAlarmData.primitive = t.primitive, this.propagateAlarmData.groups = t.groups;
				for (var a = (new Je).center(i, r), n = 0; n < t.vertices.length; n++) {
					var s = t.vertices[n];
					s.add(a)
				}
				this.propagateAlarmData.vertices = t.vertices
			} else {
				var o = this.propagateAlarmData;
				t.primitive = o.primitive, t.data = o, t.vertices = o.vertices, t.uvs = o.uvs, t.faces = o.faces, t.groups = o.groups
			}
			this.updateMatrix(!0), t._position.copy(this._position), t._scale.copy(this._scale), t._rotation.copy(this._rotation), t.useQuaternion = this.useQuaternion, t.quaternion = this.quaternion, t.worldMatrix = this.worldMatrix, t._parent = this.getParent(), t.updateMatrix(!0);
			var l = t.material;
			l.wireframeLinewidth = this.getStyle("outer.width");
			var h = this.getAlarmState().getPropagateSeverity();
			return l.color.set(h.color), t
		},
		createCanvasSelectionCube: function() {
			return null == this._csc && (this._csc = new yi, this._csc.material = new Qe.EntityMaterial, this._csc.material.wireframe = !0), this.createSelectionCube(this._csc), this._csc
		},
		createSelectionCube: function(t) {
			if (null == this.boundingBox && this.computeBizBox(), t._attachId = this._id + "_selection", null == this.selectionData) {
				var e = this.getStyle("select.offset"),
					i = this.boundingBox.min,
					r = this.boundingBox.max,
					a = (new Je).center(i, r);
				t.width = r.x - i.x + e, t.height = r.y - i.y + e, t.depth = r.z - i.z + e, t.offset = a, t.computed = !1;
				t.computeNodeData();
				this.selectionData = t.data, oi(t, !0), this.selectionData.primitive = t.primitive, this.selectionData.groups = t.groups, this.selectionData.vertices = t.vertices
			} else {
				var n = this.selectionData;
				t.primitive = n.primitive, t.data = n, t.vertices = n.vertices, t.uvs = n.uvs, t.faces = n.faces, t.groups = n.groups
			}
			this.updateMatrix(!0), t._position.copy(this._position), t._scale.copy(this._scale), t._rotation.copy(this._rotation), t.useQuaternion = this.useQuaternion, t.quaternion = this.quaternion, t.worldMatrix = this.worldMatrix, t._parent = this.getParent(), t.updateMatrix(!0);
			var s = t.material;
			return s.wireframeLinewidth = this.getStyle("select.width"), s.color.set(this.getStyle("select.color")), t
		},
		mergeVertices: function() {
			var t, i, r, a, n, s, o, l = {},
				h = [],
				c = [],
				u = 4,
				f = Math.pow(10, u);
			for (this.__tmpVertices = e, null == this.vertices && console.log("vertices is null"), r = 0, a = this.vertices.length; a > r; r++) t = this.vertices[r], i = [Math.round(t.x * f), Math.round(t.y * f), Math.round(t.z * f)].join("_"), l[i] === e ? (l[i] = r, h.push(this.vertices[r]), c[r] = h.length - 1) : c[r] = c[l[i]];
			var p = [];
			for (r = 0, a = this.faces.length; a > r; r++)
				if (n = this.faces[r], n instanceof mi) {
					n.a = c[n.a], n.b = c[n.b], n.c = c[n.c], s = [n.a, n.b, n.c];
					for (var d = -1, m = 0; 3 > m; m++)
						if (s[m] == s[(m + 1) % 3]) {
							d = m, p.push(r);
							break
						}
				} else if (n instanceof gi) {
				n.a = c[n.a], n.b = c[n.b], n.c = c[n.c], n.d = c[n.d], s = [n.a, n.b, n.c, n.d];
				for (var d = -1, m = 0; 4 > m; m++) s[m] == s[(m + 1) % 4] && (d >= 0 && p.push(r), d = m);
				if (d >= 0) {
					s.splice(d, 1);
					var g = new mi(s[0], s[1], s[2], n.normal, n.color, n.materialIndex);
					o = this.uvs[r], o && o.splice(d, 1), n.vertexNormals && n.vertexNormals.length > 0 && (g.vertexNormals = n.vertexNormals, g.vertexNormals.splice(d, 1)), n.vertexColors && n.vertexColors.length > 0 && (g.vertexColors = n.vertexColors, g.vertexColors.splice(d, 1)), this.faces[r] = g
				}
			}
			for (r = p.length - 1; r >= 0; r--);
			var y = this.vertices.length - h.length;
			return this.vertices = h, y
		},
		computeVertexNormals: function(t) {
			var i, r, a, n, s, o;
			if (this.__tmpVertices === e) {
				for (this.__tmpVertices = new Array(this.vertices.length), o = this.__tmpVertices, i = 0, r = this.vertices.length; r > i; i++) o[i] = new Qe.XiangliangThree;
				for (a = 0, n = this.faces.length; n > a; a++) s = this.faces[a], s.vertexNormals = [new Qe.XiangliangThree, new Qe.XiangliangThree, new Qe.XiangliangThree]
			} else
				for (o = this.__tmpVertices, i = 0, r = this.vertices.length; r > i; i++) o[i].set(0, 0, 0);
			if (t) {
				var l, h, c, u = new Qe.XiangliangThree,
					f = new Qe.XiangliangThree;
				new Qe.XiangliangThree, new Qe.XiangliangThree, new Qe.XiangliangThree;
				for (a = 0, n = this.faces.length; n > a; a++) s = this.faces[a], l = this.vertices[s.a], h = this.vertices[s.b], c = this.vertices[s.c], u.subVectors(c, h), f.subVectors(l, h), u.cross(f), o[s.a].add(u), o[s.b].add(u), o[s.c].add(u), s.d != e && o[s.d].add(u)
			} else
				for (a = 0, n = this.faces.length; n > a; a++) s = this.faces[a], o[s.a].add(s.normal), o[s.b].add(s.normal), o[s.c].add(s.normal);
			for (i = 0, r = this.vertices.length; r > i; i++) o[i].normalize();
			for (a = 0, n = this.faces.length; n > a; a++) s = this.faces[a], s.vertexNormals[0].copy(o[s.a]), s.vertexNormals[1].copy(o[s.b]), s.vertexNormals[2].copy(o[s.c]), s.d != e && (s.vertexNormals[3] = o[s.d].clone())
		},
		computeCentroids: function() {
			var t, e, i;
			for (t = 0, e = this.faces.length; e > t; t++) i = this.faces[t], i.centroid = i.centroid || new Je, null == i.centroid && console.log("fdasfdsa"), i.centroid.set || (i.centroid = new Je), i.centroid.set(0, 0, 0), i instanceof mi ? (i.centroid.add(this.vertices[i.a]), i.centroid.add(this.vertices[i.b]), i.centroid.add(this.vertices[i.c]), i.centroid.divideScalar(3)) : i instanceof gi && (i.centroid.add(this.vertices[i.a]), i.centroid.add(this.vertices[i.b]), i.centroid.add(this.vertices[i.c]), i.centroid.add(this.vertices[i.d]), i.centroid.divideScalar(4))
		},
		computeFaceNormals: function() {
			var t, e, i, r, a, n, s = new Je,
				o = new Je;
			for (t = 0, e = this.faces.length; e > t; t++) i = this.faces[t], r = this.vertices[i.a], a = this.vertices[i.b], n = this.vertices[i.c], s.subVectors(n, a), o.subVectors(r, a), s.cross(o), s.normalize(), i.normal.copy || (i.normal = new Je), i.normal.copy(s)
		},
		computeVertex: function() {},
		computePrimitive: function() {},
		generalteGroup: function() {},
		getMatetial: function() {
			return this.material
		},
		computeNodeMaterial: function(t) {},
		cacheNodeMaterial: function(t) {},
		needComputeVertexNormal: function() {
			return !0
		},
		computeNodeData: function(t) {
			if (this.computed === !1) {
				var e = this.generatePrimitiveKey();
				this._attachId && (e += "_" + this._attachId);
				var i = Qe.PrimitiveCache.getPrimitive(e),
					r = !1;
				if (i) this.primitive && Qe.PrimitiveCache.unUsePrimitive(i), this.computeNodeMaterial(i);
				else {
					var a = this.computeData();
					if (this.needComputeVertexNormal() && (Qe.Node.prototype.mergeVertices.call(a), Qe.Node.prototype.computeFaceNormals.call(a), Qe.Node.prototype.computeVertexNormals.call(a, !0)), (null == a.uv2s || 0 == a.uv2s.length) && (a.uv2s = [], null != a.uvs && a.uvs.length > 0))
						for (var n = 0; n < a.uvs.length; n++) {
							for (var s = [], o = a.uvs[n], l = 0; l < o.length; l++) s.push(o[l].clone());
							a.uv2s.push(s)
						}
					i = new Qe.Primitive(a, e), Qe.PrimitiveCache.setPrimitive(e, i), this.cacheNodeMaterial(i), r = !0
				}
				return Qe.PrimitiveCache.usePrimitive(i), this.primitive = i, this.data = i.data, this.vertices = i.vertices, this.faces = i.faces, this.uvs = i.uvs, this.uv2s = i.uv2s, this.computed = !0, r
			}
		},
		computeData: function() {
			var t = {
				vertices: [],
				faces: [],
				uv2s: [],
				uvs: []
			};
			return this.vertices = t.vertices, this.uvs = t.uvs, this.faces = t.faces, this.data = t, t
		},
		setMaterial: function(t, e, i) {
			var r = e.getUniqueCode ? e.getUniqueCode() : null,
				a = Ji.getMaterial(r);
			a ? (this.material.materials[t] = a, Ji.useMaterial(a)) : (this.material.materials[t] = e, Ji.setMaterial(r, e), Ji.useMaterial(e)), Ji.unUseMaterial(i)
		},
		onMaterialMapping: function() {
			this.groups = e
		},
		getMaterialSize: function() {
			return this.materialSize || 1
		},
		startBatch: function() {
			this.batch = !0
		},
		endBatch: function() {
			this.materialMappingChanges !== e && (this.onSizeChanged(), this.onMaterialMapping(), this.firePropertyChange("materialMapping", this.materialMappingChanges[0], this.materialMappingChanges[1]), this.materialMappingChanges = e), this.batch = !1
		},
		compareAndSetMaterial: function(t, e, i) {
			this.setMaterial(i, e, t)
		},
		cloneStyle: function(t) {
			if (this.getClassName() != t.getClassName()) return void console.warn("ApplyStyle fail, the source with not the same class");
			for (var e = this.getMaterialMapping(), i = 0; i < this.getMaterialSize(); i++) {
				var r = this.material.materials[i],
					a = t.material.materials[i];
				this.compareAndSetMaterial(r, a, i)
			}
			var n = this.getMaterialMapping();
			Qe.Utils.isSame(e, n) || (this.batch ? this.materialMappingChanges = [e, n] : (this.onSizeChanged(), this.onMaterialMapping(), this.firePropertyChange("materialMapping", e, n)))
		},
		_considerArray: function(t, e) {
			if (!t.startsWith("envmap.image")) return xi.isArray(e);
			var i = !1;
			if (xi.isArray(e))
				for (var r = 0; r < e.length; r++)
					if (xi.isArray(e[r])) {
						i = !0;
						break
					}
			return i
		},
		setMaterialStyles: function(t) {
			var e, i, r, a, n, s, o = this.getMaterialMapping(),
				o = this.getMaterialMapping();
			for (var l in t) var h = t[l];
			for (var c = 0; c < this.getMaterialSize(); c++) {
				i = this.material.materials[c], r = i.clone();
				var u = !1;
				for (var l in t) {
					var f = !1;
					if (l.startsWith("m.")) a = l.substr(l.indexOf(".") + 1);
					else if (this.getSideIndexMapping() && this.isSideStyle(l)) {
						var p = l.substr(0, l.indexOf(".")),
							n = this.getSideMaterialIndex(p);
						if (n != c) continue;
						f = !0, s = l.substr(l.indexOf(".") + 1), a = s.substr(s.indexOf(".") + 1)
					}
					var h = t[l];
					e = h[0], null == e ? e = Qe.Styles.getStyle(l) : this._considerArray(a, e) && (e = e[c]), this._A97(r, a, e), u = !0
				}
				u && this.compareAndSetMaterial(i, r, c)
			}
			this.changeMapping(o)
		},
		setMaterialStyle: function(t, e, i) {
			var e, r, a, n, s, o = t;
			if (t.startsWith("m.") && (o = t.substr(t.indexOf(".") + 1)), null == i && !Qe.Utils.isArray(e)) {
				var l = [];
				for (c = 0; c < this.getMaterialSize(); c++) l.push(e);
				this.styleMap[t] = l, e = l
			}
			var h = !1;
			if (o.startsWith("envmap.image") && e && xi.isArray(e))
				for (var c = 0; c < e.length; c++) {
					if (xi.isArray(e[c])) {
						h = !1;
						break
					}
					h = !0
				}
			var u = this.getMaterialMapping();
			if (null != i || Qe.Utils.isArray(e) && !h) {
				if (Qe.Utils.isArray(e)) {
					r = e;
					for (var c = 0; c < this.getMaterialSize(); c++) a = r[c], n = this.material.materials[c], s = n.clone(), null == a && (a = Qe.Styles.getStyle(t)), this._A97(s, o, a), this.compareAndSetMaterial(n, s, c)
				} else if (null != i) {
					var u = this.getMaterialMapping();
					n = this.material.materials[i], s = n.clone(), this._A97(s, o, e), this.compareAndSetMaterial(n, s, i), this.synchronizeIndexStyle(t, i, e)
				}
			} else
				for (var f = [], c = 0; c < this.getMaterialSize(); c++) f[c] !== !0 && (a = e, n = this.material.materials[c], s = n.clone(), null == a && (a = Qe.Styles.getStyle(t)), this._A97(s, o, a), this.compareAndSetMaterial(n, s, c));
			this.changeMapping(u)
		},
		changeMapping: function(t) {
			var e = this.getMaterialMapping();
			Qe.Utils.isSame(t, e) || (this.batch ? this.materialMappingChanges = [t, e] : (this.onSizeChanged(), this.onMaterialMapping(), this.firePropertyChange("materialMapping", t, e)))
		},
		synchronizeSideStyle: function(t, e, i) {
			var r = this.getMaterialIndexSide(e);
			r && null != this.styleMap[r + "." + t] && (this.styleMap[r + "." + t] = i)
		},
		synchronizeIndexStyle: function(t, e, r) {
			var a = this.styleMap[t];
			if (null == a && (a = this.getStyle(t), this.styleMap[t] = a), Qe.Utils.isArray(a)) a[e] = r;
			else {
				var n = [];
				for (i = 0; i < this.getMaterialSize(); i++) n.push(a);
				n[e] = r, this.styleMap[t] = n
			}
		},
		getDefaultMaterial: function(t, e) {
			return t ? t instanceof Qe.ArrayMaterial ? 0 === t.materials.length ? Ji.DefaultMaterial : (e >= t.materials.length && (e = t.materials.length - 1), t.materials[e]) : t : Ji.DefaultMaterial
		},
		createMaterial: function(t) {
			var e = new Qe.ArrayMaterial;
			this.material = e;
			for (var i = this.getMaterialSize(), r = 0; i > r; r++) this.setMaterial(r, this.getDefaultMaterial(t, r))
		},
		onPropertyChange: function(t, e, i) {
			this.changeProperty = t, this.oldGroups = this.groups;
			var r = this.isSizeChangedProperty(t);
			r && this.onSizeChanged(), r && this.onMaterialMapping(), r && this.firePropertyChange("materialMapping", 0, 1)
		},
		onSizeChanged: function() {
			this.computed = !1, this.computeNodeData(), this.computeCentroids(), this.computeFaceNormals(), this.computeBizBox(), this.selectionData = null, this.boundingSphere = null, this.changeProperty = null
		},
		isSizeChangedProperty: function(t) {
			return -1 !== this.__SizePropeties.indexOf(t) || "vertices" == t || "faces" == t || "uvs" == t
		},
		isGroupChangedProperty: function(t) {},
		getMaterialMapping: function() {
			var t = {},
				e = this.material.materials;
			for (var i in e) t[i] = e.indexOf(e[i]);
			return t
		},
		getSideMaterialIndex: function(t) {
			var e = this.getSideIndexMapping();
			return e ? e[t] : void 0
		},
		getMaterialIndexSide: function(t) {
			var e = this.getIndexSideMapping();
			return e ? e[t] : void 0
		},
		getIndexSideMapping: function() {
			var t = this.getSideIndexMapping();
			if (t && !this.IndexSideMapping) {
				this.IndexSideMapping = {};
				var e, i;
				for (e in t) i = t[e], this.IndexSideMapping[i] = e
			}
			return this.IndexSideMapping
		},
		getSideIndexMapping: function() {},
		disposeMaterial: function() {},
		getMaterial: function() {
			return this.material
		}
	});
	var di = function(t, e, i) {
		this.normal = t instanceof Qe.XiangliangThree ? t : new Qe.XiangliangThree, this.vertexNormals = t instanceof Array ? t : [], this.color = e instanceof Qe.Color ? e : new Qe.Color, this.vertexColors = e instanceof Array ? e : [], this.materialIndex = i ? i : 0, this.centroid = new Qe.XiangliangThree
	};
	Qe.Face = di, di.prototype = {
		constructor: Qe.Face,
		subClone: function() {},
		clone: function() {
			var t = this.subClone();
			t.normal.copy(this.normal), t.color.copy(this.color), t.centroid.copy(this.centroid), t.materialIndex = this.materialIndex;
			var e, i;
			for (e = 0, i = this.vertexNormals.length; i > e; e++) t.vertexNormals.push(this.vertexNormals[e]);
			for (e = 0, i = this.vertexColors.length; i > e; e++) t.vertexColors.push(this.vertexColors[e]);
			return t
		}
	};
	var mi = function(t, e, i, r, a, n) {
		Qe.Face.call(this, r, a, n), this.a = t, this.b = e, this.c = i
	};
	Qe.Face3 = mi, mi.prototype = Object.create(Qe.Face.prototype), mi.prototype.constructor = Qe.Face3, mi.prototype.subClone = function() {
		var t = new mi(this.a, this.b, this.c);
		return t
	}, mi.prototype.vertexCount = 3, mi.prototype.serializeJsonValue = function() {
		return {
			a: this.a,
			b: this.b,
			c: this.c
		}
	};
	var gi = function(t, e, i, r, a, n, s) {
		Qe.Face.call(this, a, n, s), this.a = t, this.b = e, this.c = i, this.d = r
	};
	Qe.Face4 = gi, gi.prototype = Object.create(Qe.Face.prototype), gi.prototype.constructor = Qe.Face4, gi.prototype.subClone = function() {
		var t = new gi(this.a, this.b, this.c, this.d);
		return t
	}, gi.prototype.splitToFace3s = function() {
		var t = new mi(this.a, this.b, this.d, this.normal, this.color, this.materialIndex),
			e = new mi(this.d, this.b, this.c, this.normal, this.color, this.materialIndex);
		return [t, e]
	}, gi.prototype.vertexCount = 4, gi.prototype.serializeJsonValue = function() {
		return {
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d
		}
	}, Qe.Entity = function(t, i) {
		t instanceof Qe.ArrayMaterial ? (this.material = t, this.materialSize = this.material.materials.length || 1) : t instanceof Qe.Material ? (this.material = t, this.materialSize = 1) : t && (this.materialSize = t), this.materialSize = this.materialSize || 1, this.createMaterial(this.material), i != e && null == this._id && (this._id = i), Qe.Node.call(this, this._id), this.groups = null
	}, Qe.extend(Qe.Entity, Qe.Node, {
		constructor: Qe.Entity,
		className: "TGL.Entity",
		setUpdateFlags: function(t) {
			this.verticesNeedUpdate = t, this.morphTargetsNeedUpdate = t, this.elementsNeedUpdate = t, this.uvsNeedUpdate = t, this.normalsNeedUpdate = t, this.colorsNeedUpdate = t, this.tangentsNeedUpdate = t, this.buffersNeedUpdate = t
		},
		cloneCallback: function(t) {
			t && "TGL.Entity" === this.className && (this.computed = !1, this.computeNodeData())
		},
		computeData: function() {
			var t = {
				vertices: this.vertices,
				faces: this.faces,
				uvs: this.uvs,
				uv2s: this.uv2s
			};
			return t
		},
		getMaterialSize: function() {
			return this.materialSize
		},
		setMaterialSize: function(t) {
			"number" == typeof t && (this.materialSize = t, this.createMaterial(this.material))
		}
	});
	var yi = function() {
		var t, e, i, r, a, n, s, o;
		1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0]) ? (s = arguments[0], t = s.width, e = s.height, i = s.depth, r = s.segmentsW, a = s.segmentsH, n = s.segmentsD, o = s.wrapMode, this._id = s.id) : arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], e = arguments[2], i = arguments[3], r = arguments[4], a = arguments[5], n = arguments[6], o = arguments[7]) : (t = arguments[0], e = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4], n = arguments[5], o = arguments[6]), this.width = t || 1, this.height = e || 1, this.depth = i || 1, this.segmentsW = r || 1, this.segmentsH = a || 1, this.segmentsD = n || 1, this.wrapMode = (o || "").toLowerCase(), this.materialSize = null == this.wrapMode || "" == this.wrapMode ? 6 : 1, this.offset = new Je(0, 0, 0), Qe.Entity.call(this)
	};
	Qe.Cube = yi, Qe.extend(Qe.Cube, Qe.Entity, {
			__accessor: ["width", "height", "depth", "wrapMode"],
			__SizePropeties: ["width", "height", "depth", "wrapMode"],
			className: "TGL.Cube",
			getUVs: function() {
				return this.uvs
			},
			setPropertyValue: function(t, e) {
				var i = this[t];
				if (i === e) return !1;
				if (this[t] = e, "wrapMode" === t) {
					var r = this.wrapMode,
						a = "six-each" == r || "front-other" == r || "back-other" == r || "left-other" == r || "right-other" == r || "top-other" == r || "bottom-other" == r;
					this.materialSize = null == this.wrapMode || "" == this.wrapMode ? 6 : 1, a || (this[t] = "")
				}
				return !0
			},
			getLinkOffset: function(t) {
				t.length();
				t.normalize();
				var e = t.x / this.getWidth(),
					i = t.y / this.getHeight(),
					r = t.z / this.getDepth(),
					a = Math.max(Math.abs(e), Math.abs(i), Math.abs(r));
				return a == Math.abs(e) ? new Je(this.getWidth() / 2 * (0 > e ? -1 : 1), 0, 0) : a == Math.abs(i) ? new Je(0, this.getHeight() / 2 * (0 > i ? -1 : 1), 0) : new Je(0, 0, this.getDepth() / 2 * (0 > r ? -1 : 1))
			},
			getLinkExtend: function(t) {
				var e = this.worldMatrix.clone();
				return e = (new mono.Mat4).extractRotation(e), this.getLinkOffset(t.applyMatrix4((new ti).getInverse(e)))
			},
			computeData: function() {
				var t = si.buildCubeData(this.width, this.height, this.depth, this.segmentsW, this.segmentsH, this.segmentsD, this.wrapMode, this.offset || new Je(0, 0, 0));
				return this.vertices = t.vertices, this.uvs = t.uvs, this.faces = t.faces, this.data = t, t
			},
			getSideIndexMapping: function() {
				return this.wrapMap ? null : Qe.Cube.SideIndexMapping
			},
			generatePrimitiveKey: function() {
				return "cube_" + this.width + "_" + this.height + "_" + this.depth + "_" + this.segmentsW + "_" + this.segmentsH + "_" + this.segmentsD + "_" + (this.material instanceof Qe.ArrayMaterial ? 1 : 0) + "_" + this.wrapMode + "_" + this.offset.x + "_" + this.offset.y + "_ " + this.offset.z + "_" + Qe.Utils.toString(this.getMaterialMapping())
			},
			serialize: function(t) {
				var e = t;
				1 !== this.width && e.serializeSimple("p", "width", this.width, "number"), 1 !== this.height && e.serializeSimple("p", "height", this.height, "number"), 1 !== this.depth && e.serializeSimple("p", "depth", this.depth, "number"), 1 !== this.widthSegemtns && e.serializeSimple("p", "widthSegemtns", this.widthSegemtns, "number"), 1 !== this.heightSegments && e.serializeSimple("p", "heightSegments", this.heightSegments, "number"), 1 !== this.depthSegments && e.serializeSimple("p", "depthSegments", this.depthSegments, "number"), Qe.Element.serialize.call(this, e)
			}
		}), yi.SideIndexMapping = {
			right: 0,
			left: 1,
			top: 2,
			bottom: 3,
			front: 4,
			back: 5
		}, Qe.Sphere = function() {
			var t, i, r, a, n, s, o;
			if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
				var l = arguments[0];
				t = l.radius, i = l.segmentsW, r = l.segmentsH, a = l.longitudeStart, n = l.longitudeLength, s = l.latitudeStart, this._id = l.id
			} else arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4], n = arguments[5], s = arguments[6], o = arguments[7]) : (t = arguments[0], i = arguments[1], r = arguments[2], a = arguments[3], n = arguments[4], s = arguments[5], o = arguments[6]);
			this.radius = t || 50, this.segmentsW = Math.max(3, Math.floor(i) || 22), this.segmentsH = Math.max(2, Math.floor(r) || 15), this.longitudeStart = a !== e ? a : 0, this.longitudeLength = n !== e ? n : 2 * Math.PI, this.latitudeStart = s !== e ? s : 0, this.latitudeLength = o !== e ? o : Math.PI, this.materialSize = 1, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.Sphere, Qe.Entity, {
			constructor: Qe.Sphere,
			__accessor: ["radius", "segmentsW", "segmentsH", "latitudeStart", "latitudeLength", "longitudeStart", "longitudeLength"],
			__SizePropeties: ["radius", "segmentsW", "segmentsH", "latitudeStart", "latitudeLength", "longitudeStart", "longitudeLength"],
			className: "TGL.Sphere",
			computeData: function() {
				var t = si.bsd(this.radius, this.segmentsW, this.segmentsH, this.longitudeStart, this.longitudeLength, this.latitudeStart, this.latitudeLength);
				return this.vertices = t.vertices, this.uvs = t.uvs, this.faces = t.faces, this.data = t, t
			},
			setWidthSegments: function(t) {
				console.log("TGL.Sphere.setWidthSegments has deprecated,please use setSegmentsW"), this.setSegmentsW(t)
			},
			setHeightSegments: function(t) {
				console.log("TGL.Sphere.setHeightSegments has deprecated,please use setSegmentsW"), this.setSegmentsH(t)
			},
			generatePrimitiveKey: function() {
				return "sphere_" + this.radius + "_" + this.segmentsW + "_" + this.segmentsH + "_" + this.longitudeStart + "_" + this.longitudeLength + "_" + this.latitudeStart + "_" + this.latitudeLength
			},
			computeBoundingSphere: function() {
				null === this.boundingSphere && (this.boundingSphere = new Qe.BoundingSphere(new Qe.XiangliangThree, this.radius))
			},
			getLinkOffset: function(t) {
				t.length();
				return t.normalize(), t.multiplyScalar(this.radius)
			},
			serialize: function(t) {
				var e = t;
				50 !== this.radius && e.serializeSimple(Yi, "radius", this.radius, "number"), 24 !== this.widthSegments && e.serializeSimple(Yi, "widthSegments", this.widthSegments, "number"), 18 !== this.heightSegments && e.serializeSimple(Yi, "heightSegments", this.heightSegments, "number"), 0 !== this.phiStart && e.serializeSimple(Yi, "phiStart", this.phiStart, "number"), this.phiLength !== 2 * Math.PI && e.serializeSimple(Yi, "phiLength", this.phiLength, "number"), 0 !== this.thetaStart && e.serializeSimple(Yi, "thetaStart", this.thetaStart, "number"), this.thetaLength !== Math.PI && e.serializeSimple(Yi, "thetaLength", this.thetaLength, "number")
			}
		}), Qe.Plane = function() {
			var t, e, i, r;
			arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], e = arguments[2], i = arguments[3], r = arguments[4]) : (t = arguments[0], e = arguments[1], i = arguments[2], r = arguments[3]), this.width = t || 5, this.height = e || 5, this.segmentsW = i || 1, this.segmentsH = r || 1, this.vertices = [], this.faces = [], this.uvs = [], this.uv2s = [], this.materialSize = 1, this.computeData = function() {
				var t, e, i = this.width / 2,
					r = this.height / 2,
					a = this.segmentsW,
					n = this.segmentsH,
					s = a + 1,
					o = n + 1,
					l = this.width / a,
					h = this.height / n,
					c = new Qe.XiangliangThree(0, 0, 1),
					u = {
						vertices: [],
						faces: [],
						uvs: []
					};
				for (e = 0; o > e; e++)
					for (t = 0; s > t; t++) {
						var f = t * l - i,
							p = e * h - r;
						u.vertices.push(new Qe.XiangliangThree(f, -p, 0))
					}
				for (e = 0; n > e; e++)
					for (t = 0; a > t; t++) {
						var d = t + s * e,
							m = t + s * (e + 1),
							g = t + 1 + s * (e + 1),
							y = t + 1 + s * e,
							v = new Qe.XiangliangTwo(t / a, 1 - e / n),
							x = new Qe.XiangliangTwo(t / a, 1 - (e + 1) / n),
							A = new Qe.XiangliangTwo((t + 1) / a, 1 - (e + 1) / n),
							w = new Qe.XiangliangTwo((t + 1) / a, 1 - e / n),
							_ = new Qe.Face4(d, m, g, y);
						_.normal.copy(c), _.vertexNormals.push(c.clone(), c.clone(), c.clone(), c.clone()), u.faces.push(_), u.uvs.push([v, x, A, w])
					}
				return u
			}, Qe.Entity.call(this), this.computeCentroids()
		}, Qe.extend(Qe.Plane, Qe.Entity, {
			constructor: Qe.Plane,
			className: "TGL.Plane",
			__accessor: ["width", "height", "segmentsW", "segmentsH"],
			__SizePropeties: ["width", "height", "segmentsW", "segmentsH"],
			clone: function() {
				var t = new Qe.Plane(this.material, this.width, this.height, this.segmentsW, this.segmentsH);
				return this.superClass.clone.call(this, t), t
			},
			getSelectStyle: function() {
				var t = this.getStyle("select.style");
				return ("outline.normal" == t || "outline" == t) && (t = "outline.wireframe"), t
			}
		}), Qe.Cylinder = function() {
			var t, i, r, a, n, s, o, l, h;
			1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0]) ? (options = arguments[0], t = options.radiusTop, i = options.radiusBottom, r = options.height, a = options.segmentsR, n = options.segmentsH, s = options.openTop, o = options.openBottom, l = options.arcLength, h = options.arcStart, this._id = options.id) : arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4], n = arguments[5], s = arguments[6], o = arguments[7], l = arguments[8], h = arguments[9]) : (t = arguments[0], i = arguments[1], r = arguments[2], a = arguments[3], n = arguments[4], s = arguments[5], o = arguments[6], l = arguments[7], h = arguments[8]), this.radiusTop = t = t !== e ? t : 20, this.radiusBottom = i = i !== e ? i : 20, this.height = r = r !== e ? r : 100, this.segmentsR = a = a || 20, this.segmentsH = n = n || 1, this.openTop = s !== e ? s : !1, this.openBottom = o != e ? o : !1, this.arcLength = l !== e ? l : 2 * Math.PI, this.arcStart = h !== e ? h : 0, this.materialSize = 3, Qe.Entity.call(this), this.computeNodeData(), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.Cylinder, Qe.Entity, {
			constructor: Qe.Cylinder,
			__accessor: ["radiusTop", "radiusBottom", "height", "segmentsR", "segmentsH", "openTop", "openBottom", "arcLength", "arcStart"],
			__bool: ["openTop", "openBottom"],
			__SizePropeties: ["radiusTop", "radiusBottom", "height", "segmentsR", "segmentsH", "openTop", "openBottom", "arcLength", "arcStart"],
			className: "TGL.Cylinder",
			computeData: function() {
				return si.bcld(this.height, this.segmentsH, this.radiusBottom, this.radiusTop, this.segmentsR, this.openTop, this.openBottom, this.arcLength, this.arcStart)
			},
			getLinkOffset: function(t) {
				var e = t.length();
				t.normalize();
				var i = t.x,
					r = t.y,
					a = t.z,
					n = Math.sqrt(i * i + a * a),
					s = r > 0 ? this.radiusTop : this.radiusBottom;
				if (Math.abs(r / n) > this.height / 2 / s && e > 0) {
					var o = new Je(0, this.height / 2 * (r > 0 ? 1 : -1), 0);
					return o
				}
				return new Je(i, 0, a).normalize().multiplyScalar((this.radiusTop + this.radiusBottom) / 2)
			},
			getLinkExtend: function(t) {
				var e = this.worldMatrix.clone();
				return e = (new mono.Mat4).extractRotation(e), this.getLinkOffset(t.applyMatrix4((new ti).getInverse(e)))
			},
			clearLinkOrthogonal: function(t, e, i, r) {
				r = r || 0;
				var a = this.getHeight() / 2 + r,
					n = (this.radiusTop + this.radiusBottom) / 2 + r;
				return "orthogonal.x" == i || "orthogonal.x.n" == i ? !(Math.abs(t.y - e.y) > a || Math.abs(t.z - e.z) > n) : "orthogonal.y" == i || "orthogonal.y.n" == i ? !(Math.abs(t.x - e.x) > n || Math.abs(t.z - e.z) > n) : "orthogonal.z" == i || "orthogonal.z.n" == i ? !(Math.abs(t.y - e.y) > a || Math.abs(t.z - e.z) > n) : !1
			},
			clearLinkExtend: function(t, e) {
				return "extend.x" !== e && "extend.y" === e && t > this.getHeight() / 2 ? !0 : !1
			},
			getSideIndexMapping: function() {
				return Qe.Cylinder.SideIndexMapping
			},
			generatePrimitiveKey: function() {
				return "cylinder_" + this.height + "_" + this.segmentsH + "_" + this.radiusTop + "_" + this.radiusBottom + "_" + this.segmentsR + "_" + this.openTop + "_" + this.openBottom + "_" + this.arcLength + "_" + this.arcStart + Qe.Utils.toString(this.getMaterialMapping())
			},
			needComputeVertexNormal: function() {
				return !1
			}
		}), Qe.Cylinder.SideIndexMapping = {
			side: 0,
			top: 1,
			bottom: 2
		}, Qe.Circle = function() {
			var t, i, r, a;
			4 === arguments.length ? (t = arguments[0], i = arguments[1], r = arguments[2], a = arguments[3]) : (this.material = arguments[0], t = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4]), this.radius = t = t || 50, this.segments = i = i !== e ? Math.max(3, i) : 8, this.thetaStart = r = r !== e ? r : 0, this.thetaLength = a = a !== e ? a : 2 * Math.PI, this.materialSize = 1, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new Qe.BoundingSphere(new Qe.XiangliangThree, t)
		}, Qe.extend(Qe.Circle, Qe.Entity, {
			clone: function() {
				var t = new Qe.Circle(this.material, this.radius, this.segments, this.thetaStart, this.thetaLength);
				return this.constructor.superClass.clone.call(this, t), t
			},
			computeData: function() {
				var t, e = this.segments,
					i = [],
					r = new Qe.XiangliangThree,
					a = new Qe.XiangliangTwo(.5, .5),
					n = {
						vertices: [],
						faces: [],
						uvs: [],
						uv2s: []
					};
				for (n.vertices.push(r), i.push(a), t = 0; e >= t; t++) {
					var s = new Qe.XiangliangThree,
						o = this.thetaStart + t / e * this.thetaLength;
					s.x = this.radius * Math.cos(o), s.y = this.radius * Math.sin(o), n.vertices.push(s), i.push(new Qe.XiangliangTwo((s.x / this.radius + 1) / 2, (s.y / this.radius + 1) / 2))
				}
				var l = new Qe.XiangliangThree(0, 0, 1);
				for (t = 1; e >= t; t++) {
					var h = t,
						c = t + 1,
						u = 0;
					n.faces.push(new Qe.Face3(h, c, u, [l, l, l])), n.uvs.push([i[t], i[t + 1], a])
				}
				return n
			}
		}), Qe.Torus = function() {
			var t, e, i, r, a;
			1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0]) ? (options = arguments[0], t = options.radius, e = options.tube, i = options.segmentsR, r = options.segmentsT, a = options.arc, this._id = options.id) : arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], e = arguments[2], i = arguments[3], r = arguments[4], a = arguments[5]) : (t = arguments[0], e = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4]), this.materialSize = 1, this.radius = t || 100, this.tube = e || 40, this.segmentsR = i || 8, this.segmentsT = r || 6, this.arc = a || 2 * Math.PI, Qe.Entity.call(this), this.computeNodeData(), this.computeCentroids()
		}, Qe.extend(Qe.Torus, Qe.Entity, {
			__accessor: ["radius", "tube", "segmentsR", "segmentsT", "arc"],
			__SizePropeties: ["radius", "tube", "segmentsR", "segmentsT", "arc"],
			className: "TGL.Torus",
			generatePrimitiveKey: function() {
				return "torus_" + this.radius + "_" + this.tube + "_" + this.segmentsR + "_" + this.segmentsT + "_" + this.arc
			},
			computeData: function() {
				for (var t = new Qe.XiangliangThree, e = [], i = [], r = {
						vertices: [],
						faces: [],
						uvs: [],
						uv2s: []
					}, a = 0; a <= this.segmentsR; a++)
					for (var n = 0; n <= this.segmentsT; n++) {
						var s = n / this.segmentsT * this.arc,
							o = a / this.segmentsR * Math.PI * 2;
						t.x = this.radius * Math.cos(s), t.y = this.radius * Math.sin(s);
						var l = new Qe.XiangliangThree;
						l.x = (this.radius + this.tube * Math.cos(o)) * Math.cos(s), l.y = (this.radius + this.tube * Math.cos(o)) * Math.sin(s), l.z = this.tube * Math.sin(o), r.vertices.push(l), e.push(new Qe.XiangliangTwo(n / this.segmentsT, a / this.segmentsR)), i.push(l.clone().sub(t).normalize())
					}
				for (var a = 1; a <= this.segmentsR; a++)
					for (var n = 1; n <= this.segmentsT; n++) {
						var h = (this.segmentsT + 1) * a + n - 1,
							c = (this.segmentsT + 1) * (a - 1) + n - 1,
							u = (this.segmentsT + 1) * (a - 1) + n,
							f = (this.segmentsT + 1) * a + n,
							p = new Qe.Face3(h, c, f, [i[h], i[c], i[f]]);
						p.normal.add(i[h]), p.normal.add(i[c]), p.normal.add(i[f]), p.normal.normalize(), r.faces.push(p), r.uvs.push([e[h].clone(), e[c].clone(), e[f].clone()]), p = new Qe.Face3(c, u, f, [i[c], i[u], i[f]]), p.normal.add(i[c]), p.normal.add(i[u]), p.normal.add(i[f]), p.normal.normalize(), r.faces.push(p), r.uvs.push([e[c].clone(), e[u].clone(), e[f].clone()])
					}
				return r
			}
		}), Qe.Arrow = function() {
			var t, e, i, r, a;
			arguments[0] instanceof Qe.Material ? (this.material = arguments[0], t = arguments[1], e = arguments[2], i = arguments[3], r = arguments[4], a = arguments[5]) : (t = arguments[0], e = arguments[1], i = arguments[2], r = arguments[3], a = arguments[4]), this.materialSize = 1, this.tailHeight = t || 100, this.tailRadius = e || 20, this.headHeight = i || 20, this.headRadius = r || 30, this.radiusSegments = a || 30, this.computeData = function() {
				var n = 2;
				this.headRadius < this.tailRadius && (this.headRadius = this.tailRadius);
				var s, o, l = t + i,
					h = l / 2,
					c = [],
					u = [],
					f = [],
					p = [];
				for (o = 0; n >= o; o++) {
					var d = [],
						m = [],
						g = o / n,
						y = g * r;
					for (s = 0; a >= s; s++) {
						var v = s / a,
							x = new Qe.XiangliangThree;
						x.x = y * Math.sin(v * Math.PI * 2), x.y = -g * i + h, x.z = y * Math.cos(v * Math.PI * 2), this.vertices.push(x), d.push(this.vertices.length - 1), m.push(new Qe.XiangliangTwo(v, 1 - g))
					}
					c.push(d), f.push(m)
				}
				for (this.vertices.push(new Qe.XiangliangThree(0, h - i, 0)), o = 0; n >= o; o++) {
					var d = [],
						m = [],
						g = o / n,
						y = e;
					for (s = 0; a >= s; s++) {
						var v = s / a,
							x = new Qe.XiangliangThree;
						x.x = y * Math.sin(v * Math.PI * 2), x.y = -g * t + h - i, x.z = y * Math.cos(v * Math.PI * 2), this.vertices.push(x), d.push(this.vertices.length - 1), m.push(new Qe.XiangliangTwo(v, 1 - g))
					}
					u.push(d), p.push(m)
				}
				this.vertices.push(new Qe.XiangliangThree(0, -h, 0));
				var A, w, _ = this.headRadius / l;
				for (s = 0; a > s; s++)
					for (A = this.vertices[c[0][s]].clone(), w = this.vertices[c[0][s + 1]].clone(), A.setY(Math.sqrt(A.x * A.x + A.z * A.z) * _).normalize(), w.setY(Math.sqrt(w.x * w.x + w.z * w.z) * _).normalize(), o = 0; n > o; o++) {
						var S = c[o][s],
							b = c[o + 1][s],
							M = c[o + 1][s + 1],
							C = c[o][s + 1],
							P = A.clone(),
							T = A.clone(),
							z = w.clone(),
							L = w.clone(),
							E = f[o][s].clone(),
							D = f[o + 1][s].clone(),
							B = f[o + 1][s + 1].clone(),
							N = f[o][s + 1].clone();
						this.faces.push(new Qe.Face3(S, b, C, [P, T, L])), this.uvs.push([E, D, N]), this.faces.push(new Qe.Face3(b, M, C, [T, z, L])), this.uvs.push([D, B, N])
					}
				for (s = 0; a > s; s++) {
					var S = c[o][s + 1],
						b = c[o][s],
						M = c.length - 1,
						P = new Qe.XiangliangThree(0, -1, 0),
						T = new Qe.XiangliangThree(0, -1, 0),
						z = new Qe.XiangliangThree(0, -1, 0),
						E = f[o][s + 1].clone(),
						D = f[o][s].clone(),
						B = new Qe.XiangliangTwo(D.u, 1);
					this.faces.push(new Qe.Face3(S, b, M, [P, T, z])), this.uvs.push([E, D, B])
				}
				var A, w, _ = 0;
				for (s = 0; a > s; s++)
					for (A = this.vertices[u[1][s]].clone(), w = this.vertices[u[1][s + 1]].clone(), A.setY(Math.sqrt(A.x * A.x + A.z * A.z) * _).normalize(), w.setY(Math.sqrt(w.x * w.x + w.z * w.z) * _).normalize(), o = 0; n > o; o++) {
						var S = u[o][s],
							b = u[o + 1][s],
							M = u[o + 1][s + 1],
							C = u[o][s + 1],
							P = A.clone(),
							T = A.clone(),
							z = w.clone(),
							L = w.clone(),
							E = f[o][s].clone(),
							D = f[o + 1][s].clone(),
							B = f[o + 1][s + 1].clone(),
							N = f[o][s + 1].clone();
						this.faces.push(new Qe.Face3(S, b, C, [P, T, L])), this.uvs.push([E, D, N]), this.faces.push(new Qe.Face3(b, M, C, [T, z, L])), this.uvs.push([D, B, N])
					}
				for (s = 0; a > s; s++) {
					var S = u[o][s + 1],
						b = u[o][s],
						M = u.length - 1,
						P = new Qe.XiangliangThree(0, -1, 0),
						T = new Qe.XiangliangThree(0, -1, 0),
						z = new Qe.XiangliangThree(0, -1, 0),
						E = p[o][s + 1].clone(),
						D = p[o][s].clone(),
						B = new Qe.XiangliangTwo(D.u, 1);
					this.faces.push(new Qe.Face3(S, b, M, [P, T, z])), this.uvs.push([E, D, B])
				}
				return this
			}, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.Arrow, Qe.Entity, {}), Qe.BufferNode = function() {
			this.uuid = Qe.Math.generateUUID(), this.name = "", this.attributes = {}, this.dynamic = !0, this.offsets = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.morphTargets = [], this.materialSize = 1, this.createMaterial(), Qe.Node.call(this)
		}, Qe.extend(Qe.BufferNode, Qe.Node, {
			constructor: Qe.BufferNode,
			compuateBufferData: function() {
				if (!this.computed) {
					var t = this.attributes.position;
					t && t.array && (t.itemSize = 3, t.numItems = t.array.length, this.verticesNeedUpdate = !0);
					var e = this.attributes.uv;
					e && e.array && (e.itemSize = 2, e.numItems = e.array.length, this.uvsNeedUpdate = !0);
					var i = this.attributes.index;
					i && i.array && (this.offsets = [{
						index: 0,
						start: 0,
						count: i.array.length
					}]), this.computed = !0
				}
			},
			applyMatrix: function(t) {
				var i, r;
				if (this.attributes.position && (i = this.attributes.position.array), this.attributes.normal && (r = this.attributes.normal.array), i !== e && (t.multiplyXiangliangThreeArray(i), this.verticesNeedUpdate = !0), r !== e) {
					var a = (new Qe.Matrix3).getNormalMatrix(t);
					a.multiplyXiangliangThreeArray(r), this.normalizeNormals(), this.normalsNeedUpdate = !0
				}
			},
			computeBizBox: function() {
				null === this.boundingBox && (this.boundingBox = new Qe.BizBox);
				var t = this.attributes.position.array;
				if (t) {
					var i, r, a, n = this.boundingBox;
					t.length >= 3 && (n.min.x = n.max.x = t[0], n.min.y = n.max.y = t[1], n.min.z = n.max.z = t[2]);
					for (var s = 3, o = t.length; o > s; s += 3) i = t[s], r = t[s + 1], a = t[s + 2], i < n.min.x ? n.min.x = i : i > n.max.x && (n.max.x = i), r < n.min.y ? n.min.y = r : r > n.max.y && (n.max.y = r), a < n.min.z ? n.min.z = a : a > n.max.z && (n.max.z = a)
				}(t === e || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0));
			},
			computeBoundingSphere: function() {
				var t = new Qe.BizBox,
					e = new Qe.XiangliangThree;
				return function() {
					null === this.boundingSphere && (this.boundingSphere = new Qe.BoundingSphere);
					var i = this.attributes.position.array;
					if (i) {
						for (var r = this.boundingSphere.center, a = [], n = 0, s = i.length; s > n; n += 3) e.set(i[n], i[n + 1], i[n + 2]), a.push(e);
						t.setFromPoints(a), t.center(r);
						for (var o = 0, n = 0, s = i.length; s > n; n += 3) e.set(i[n], i[n + 1], i[n + 2]), o = Math.max(o, r.distanceToSquared(e));
						this.boundingSphere.radius = Math.sqrt(o)
					}
				}
			}(),
			computeVertexNormals: function() {
				if (this.attributes.position) {
					var t, i, r, a, n = this.attributes.position.array.length;
					if (this.attributes.normal === e) this.attributes.normal = {
						itemSize: 3,
						array: new Float32Array(n)
					};
					else
						for (t = 0, i = this.attributes.normal.array.length; i > t; t++) this.attributes.normal.array[t] = 0;
					var s, o, l, h, c, u, f = this.attributes.position.array,
						p = this.attributes.normal.array,
						d = new Qe.XiangliangThree,
						m = new Qe.XiangliangThree,
						g = new Qe.XiangliangThree,
						y = new Qe.XiangliangThree,
						v = new Qe.XiangliangThree;
					if (this.attributes.index) {
						var x = this.attributes.index.array,
							A = this.offsets;
						for (r = 0, a = A.length; a > r; ++r) {
							var w = A[r].start,
								_ = A[r].count,
								S = A[r].index;
							for (t = w, i = w + _; i > t; t += 3) s = S + x[t], o = S + x[t + 1], l = S + x[t + 2], h = f[3 * s], c = f[3 * s + 1], u = f[3 * s + 2], d.set(h, c, u), h = f[3 * o], c = f[3 * o + 1], u = f[3 * o + 2], m.set(h, c, u), h = f[3 * l], c = f[3 * l + 1], u = f[3 * l + 2], g.set(h, c, u), y.subVectors(g, m), v.subVectors(d, m), y.cross(v), p[3 * s] += y.x, p[3 * s + 1] += y.y, p[3 * s + 2] += y.z, p[3 * o] += y.x, p[3 * o + 1] += y.y, p[3 * o + 2] += y.z, p[3 * l] += y.x, p[3 * l + 1] += y.y, p[3 * l + 2] += y.z
						}
					} else
						for (t = 0, i = f.length; i > t; t += 9) h = f[t], c = f[t + 1], u = f[t + 2], d.set(h, c, u), h = f[t + 3], c = f[t + 4], u = f[t + 5], m.set(h, c, u), h = f[t + 6], c = f[t + 7], u = f[t + 8], g.set(h, c, u), y.subVectors(g, m), v.subVectors(d, m), y.cross(v), p[t] = y.x, p[t + 1] = y.y, p[t + 2] = y.z, p[t + 3] = y.x, p[t + 4] = y.y, p[t + 5] = y.z, p[t + 6] = y.x, p[t + 7] = y.y, p[t + 8] = y.z;
					this.normalizeNormals(), this.normalsNeedUpdate = !0
				}
			},
			normalizeNormals: function() {
				for (var t, e, i, r, a = this.attributes.normal.array, n = 0, s = a.length; s > n; n += 3) t = a[n], e = a[n + 1], i = a[n + 2], r = 1 / Math.sqrt(t * t + e * e + i * i), a[n] *= r, a[n + 1] *= r, a[n + 2] *= r
			},
			computeTangents: function() {
				function t(t, e, i) {
					p = a[3 * t], d = a[3 * t + 1], m = a[3 * t + 2], g = a[3 * e], y = a[3 * e + 1], v = a[3 * e + 2], x = a[3 * i], A = a[3 * i + 1], w = a[3 * i + 2], _ = s[2 * t], S = s[2 * t + 1], b = s[2 * e], M = s[2 * e + 1], C = s[2 * i], P = s[2 * i + 1], T = g - p, z = x - p, L = y - d, E = A - d, D = v - m, B = w - m, N = b - _, R = C - _, I = M - S, F = P - S, V = 1 / (N * F - R * I), j.set((F * T - I * z) * V, (F * L - I * E) * V, (F * D - I * B) * V), q.set((N * z - R * T) * V, (N * E - R * L) * V, (N * B - R * D) * V), c[t].add(j), c[e].add(j), c[i].add(j), u[t].add(q), u[e].add(q), u[i].add(q)
				}

				function i(t) {
					rt.x = n[3 * t], rt.y = n[3 * t + 1], rt.z = n[3 * t + 2], at.copy(rt), $ = c[t], et.copy($), et.sub(rt.multiplyScalar(rt.dot($))).normalize(), it.crossVectors(at, $), tt = it.dot(u[t]), J = 0 > tt ? -1 : 1, h[4 * t] = et.x, h[4 * t + 1] = et.y, h[4 * t + 2] = et.z, h[4 * t + 3] = J
				}
				if (this.attributes.index === e || this.attributes.position === e || this.attributes.normal === e || this.attributes.uv === e) return void console.warn("Missing required attributes (index, position, normal or uv) in BufferNode.computeTangents()");
				var r = this.attributes.index.array,
					a = this.attributes.position.array,
					n = this.attributes.normal.array,
					s = this.attributes.uv.array,
					o = a.length / 3;
				if (this.attributes.tangent === e) {
					var l = 4 * o;
					this.attributes.tangent = {
						itemSize: 4,
						array: new Float32Array(l)
					}
				}
				for (var h = this.attributes.tangent.array, c = [], u = [], f = 0; o > f; f++) c[f] = new Qe.XiangliangThree, u[f] = new Qe.XiangliangThree;
				var p, d, m, g, y, v, x, A, w, _, S, b, M, C, P, T, z, L, E, D, B, N, R, I, F, V, U, k, O, X, G, W, H, j = new Qe.XiangliangThree,
					q = new Qe.XiangliangThree,
					Y = this.offsets;
				for (O = 0, X = Y.length; X > O; ++O) {
					var Z = Y[O].start,
						Q = Y[O].count,
						K = Y[O].index;
					for (U = Z, k = Z + Q; k > U; U += 3) G = K + r[U], W = K + r[U + 1], H = K + r[U + 2], t(G, W, H)
				}
				var J, $, tt, et = new Qe.XiangliangThree,
					it = new Qe.XiangliangThree,
					rt = new Qe.XiangliangThree,
					at = new Qe.XiangliangThree;
				for (O = 0, X = Y.length; X > O; ++O) {
					var Z = Y[O].start,
						Q = Y[O].count,
						K = Y[O].index;
					for (U = Z, k = Z + Q; k > U; U += 3) G = K + r[U], W = K + r[U + 1], H = K + r[U + 2], i(G), i(W), i(H)
				}
				this.hasTangents = !0, this.tangentsNeedUpdate = !0
			},
			clone: function() {
				var t = new Qe.BufferNode,
					e = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
				for (var i in this.attributes) {
					for (var r = this.attributes[i], a = r.array, n = {
							itemSize: r.itemSize,
							numItems: r.numItems,
							array: null
						}, s = 0, o = e.length; o > s; s++) {
						var l = e[s];
						if (a instanceof l) {
							n.array = new l(a);
							break
						}
					}
					t.attributes[i] = n
				}
				for (var s = 0, o = this.offsets.length; o > s; s++) {
					var h = this.offsets[s];
					t.offsets.push({
						start: h.start,
						index: h.index,
						count: h.count
					})
				}
				return t
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		}), Qe.Particle = function(t, e) {
			var i;
			1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0]) && (i = arguments[0], this._id = i.id), Qe.Node.call(this, this._id), this.material = new Qe.ParticleMaterial({
				color: 16777215 * Math.random()
			}), this.sortParticles = !1, this.frustumCulled = !1, this.vertices = (i ? i.vertices : t) || [], this.colors = (i ? i.colors : e) || []
		}, Qe.extend(Qe.Particle, Qe.Node, {
			clone: function(t) {
				return t === e && (t = new Qe.Particle(this.material)), t.sortParticles = this.sortParticles, t.frustumCulled = this.frustumCulled, Qe.Element.prototype.clone.call(this, t), t
			},
			needUpdate: function() {
				return !1
			},
			setUpdateFlags: function(t) {
				this.verticesNeedUpdate = t
			},
			setMaterialStyle: function(t, e) {
				t = t.substr(t.indexOf(".") + 1), this._A97(this.material, t, e)
			}
		}), Qe.Line = function() {
			var t, i, r;
			if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
				var a = arguments[0];
				t = a.vertices, i = a.colors, r = a.type, this._id = a.id || this._id
			} else t = arguments[0], i = arguments[1], r = arguments[2];
			Qe.Node.call(this, this._id), this.material = new Qe.LineMaterial({
				color: 16777215
			}), this.type = r !== e ? r : Qe.LineStrip, this.vertices = t || [], this.colors = i || []
		}, Qe.LineStrip = 0, Qe.LinePieces = 1, Qe.extend(Qe.Line, Qe.Node, {
			className: "TGL.Line",
			__accessor: ["vertices", "type"],
			__SizePropeties: ["vertices", "type"],
			clone: function(t) {
				return t === e && (t = new Qe.Line(this.material, this.type)), Qe.Element.prototype.clone.call(this, t, !0), t
			},
			onPropertyChange: function() {},
			setMaterialStyle: function(t, e) {
				t = t.substr(t.indexOf(".") + 1), this._A97(this.material, t, e)
			},
			setMaterialStyles: function(t) {
				Qe.Element.prototype.setMaterialStyles.call(this, t)
			}
		}), Qe.Line.createEllipse = function(t, e, i, r, a, n, s) {
			"number" == typeof t ? (s = n, n = a, a = r, r = i, i = e, e = t, t = new Qe.Line) : null == t && (t = new Qe.Line);
			for (var o = new Qe.EllipseCurve(0, 0, e, i, a, n, s), l = [], h = r || 50, c = 0; h >= c; c++) {
				var u = o.getPoint(c / h);
				l.push(u)
			}
			return t.setVertices(l), t
		}, Qe.Line.createHelix = function(t, e, i, r, a, n) {
			"number" == typeof t ? (n = a, a = r, r = i, i = e, e = t, t = new Qe.Line) : null == t && (t = new Qe.Line);
			var s = [],
				o = n || 50;
			a = a || 1;
			for (var l, h, c, u, f = 0; o >= f; f++) l = (i * f + e * (o - f)) / o, c = a * Math.PI * 2 * f / o, h = r * (.5 - f / o), u = new Je(l * Math.sin(c), h, l * Math.cos(c)), s.push(u);
			return t.setVertices(s), t
		}, Qe.Line.createRectangle = function(t, e, i, r) {
			"number" == typeof t ? (r = i, i = e, e = t, t = new Qe.Line) : null == t && (t = new Qe.Line);
			var a = r || 50,
				n = 2 * (e + i) / a,
				s = [];
			if (n > Math.min(e, i)) s.push(new Je(-e / 2, -i / 2, 0)), s.push(new Je(-e / 2, i / 2, 0)), s.push(new Je(e / 2, i / 2, 0)), s.push(new Je(e / 2, -i / 2, 0)), s.push(new Je(-e / 2, -i / 2, 0));
			else
				for (var o, l = -e / 2, h = -i / 2, c = 0; a >= c; c++) l == -e / 2 && i / 2 > h ? i / 2 >= h + n ? h += n : (s.push(new Je(-e / 2, i / 2, 0)), s.push(new Je(-e / 2, i / 2, 0)), l += h + n - i / 2, h = i / 2) : h == i / 2 && e / 2 >= l ? e / 2 >= l + n ? l += n : (s.push(new Je(e / 2, i / 2, 0)), s.push(new Je(e / 2, i / 2, 0)), h -= l + n - e / 2, l = e / 2) : l == e / 2 && h > -i / 2 ? h - n >= -i / 2 ? h -= n : (s.push(new Je(e / 2, -i / 2, 0)), s.push(new Je(e / 2, -i / 2, 0)), l -= -i / 2 - h + n, h = -i / 2) : h == -i / 2 && l >= -e / 2 && (l - n >= -e / 2 ? l -= n : (h += -e / 2 - l + n, l = -e / 2)), o = new Je(l, h, 0), s.push(o);
			return t.setVertices(s), t
		}, Qe.Polyhedron = function() {
			function t(t) {
				var e = t.normalize().clone();
				e.index = c.vertices.push(e) - 1;
				var i = r(t) / 2 / Math.PI + .5,
					n = a(t) / Math.PI + .5;
				return e.uv = new Qe.XiangliangThree(i, 1 - n), e
			}

			function e(t, e, i) {
				var a = new Qe.Face3(t.index, e.index, i.index, [t.clone(), e.clone(), i.clone()]);
				a.centroid.add(t).add(e).add(i).divideScalar(3), c.faces.push(a);
				var s = r(a.centroid);
				c.uvs.push([n(t.uv, t, s), n(e.uv, e, s), n(i.uv, i, s)])
			}

			function i(i, r) {
				for (var a = Math.pow(2, r), n = (Math.pow(4, r), t(c.vertices[i.a])), s = t(c.vertices[i.b]), o = t(c.vertices[i.c]), l = [], h = 0; a >= h; h++) {
					l[h] = [];
					for (var u = t(n.clone().lerp(o, h / a)), f = t(s.clone().lerp(o, h / a)), p = a - h, d = 0; p >= d; d++) 0 == d && h == a ? l[h][d] = u : l[h][d] = t(u.clone().lerp(f, d / p))
				}
				for (var h = 0; a > h; h++)
					for (var d = 0; 2 * (a - h) - 1 > d; d++) {
						var m = Math.floor(d / 2);
						d % 2 == 0 ? e(l[h][m + 1], l[h + 1][m], l[h][m]) : e(l[h][m + 1], l[h + 1][m + 1], l[h + 1][m])
					}
			}

			function r(t) {
				return Math.atan2(t.z, -t.x)
			}

			function a(t) {
				return Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z))
			}

			function n(t, e, i) {
				return 0 > i && 1 === t.x && (t = new Qe.XiangliangThree(t.x - 1, t.y)), 0 === e.x && 0 === e.z && (t = new Qe.XiangliangThree(i / 2 / Math.PI + .5, t.y)), t.clone()
			}
			var s, o, l, h;
			arguments[0] instanceof Qe.Material ? (this.material = arguments[0], s = arguments[1], o = arguments[2], l = arguments[3], h = arguments[4]) : (s = arguments[0], o = arguments[1], l = arguments[2], h = arguments[3]), this.materialSize = 1, Qe.Entity.call(this), l = l || 1, h = h || 0;
			for (var c = this, u = 0, f = s.length; f > u; u++) t(new Qe.XiangliangThree(s[u][0], s[u][1], s[u][2]));
			for (var p = this.vertices, d = [], u = 0, f = o.length; f > u; u++) {
				var m = p[o[u][0]],
					g = p[o[u][1]],
					y = p[o[u][2]];
				d[u] = new Qe.Face3(m.index, g.index, y.index, [m.clone(), g.clone(), y.clone()])
			}
			for (var u = 0, f = d.length; f > u; u++) i(d[u], h);
			for (var u = 0, f = this.uvs.length; f > u; u++) {
				var v = this.uvs[u],
					x = v[0].x,
					A = v[1].x,
					w = v[2].x,
					_ = Math.max(x, Math.max(A, w)),
					S = Math.min(x, Math.min(A, w));
				_ > .9 && .1 > S && (.2 > x && (v[0].x += 1), .2 > A && (v[1].x += 1), .2 > w && (v[2].x += 1))
			}
			for (var u = 0, f = this.vertices.length; f > u; u++) this.vertices[u].multiplyScalar(l);
			this.mergeVertices(), this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new Qe.BoundingSphere(new Qe.XiangliangThree, l)
		}, Qe.extend(Qe.Polyhedron, Qe.Entity, {}), Qe.Octahedron = function(t, e, i) {
			var r = [
					[1, 0, 0],
					[-1, 0, 0],
					[0, 1, 0],
					[0, -1, 0],
					[0, 0, 1],
					[0, 0, -1]
				],
				a = [
					[0, 2, 4],
					[0, 4, 3],
					[0, 3, 5],
					[0, 5, 2],
					[1, 2, 5],
					[1, 5, 3],
					[1, 3, 4],
					[1, 4, 2]
				];
			Qe.Polyhedron.call(this, t, r, a, e, i)
		}, Qe.extend(Qe.Octahedron, Qe.Polyhedron, {
			clone: function() {
				return new Qe.Octahedron(this.material, this.radius, this.detail)
			}
		}), Qe.Axis = function(t) {
			t = t || 1;
			var e = [],
				i = [];
			e.push(new Qe.XiangliangThree, new Qe.XiangliangThree(t, 0, 0), new Qe.XiangliangThree, new Qe.XiangliangThree(0, t, 0), new Qe.XiangliangThree, new Qe.XiangliangThree(0, 0, t)), i.push(new Qe.Color(16711680), new Qe.Color(16711680), new Qe.Color(65280), new Qe.Color(65280), new Qe.Color(255), new Qe.Color(255));
			var r = new Qe.LineMaterial({
				vertexColors: Qe.VertexColors,
				depthTest: !1,
				depthMask: !1
			});
			Qe.Line.call(this, e, i, Qe.LinePieces), this.material = r, this.xAxisText = this.makeAxisText("X", 16711680), this.yAxisText = this.makeAxisText("Y", 65280), this.zAxisText = this.makeAxisText("Z", 255), this.xAxisText.setParent(this), this.yAxisText.setParent(this), this.zAxisText.setParent(this), this.setSize(t), this._sizeFixed = !0
		}, Qe.extend(Qe.Axis, Qe.Line, {
			showAxisText: function(t) {
				this.xAxisText._visible = t, this.yAxisText._visible = t, this.zAxisText._visible = t
			},
			setSize: function(t) {
				this.vertices[1].x = t, this.vertices[3].y = t, this.vertices[5].z = t, this.xAxisText.setPosition(t, 0, 0), this.yAxisText.setPosition(0, t, 0), this.zAxisText.setPosition(0, 0, t)
			},
			fixSize: function(t) {
				Qe.Element.prototype.fixSize.call(this, t);
				this._scale.x, this._scale.y, this._scale.z;
				this.xAxisText.setScale(3, 3, 1), this.yAxisText.setScale(3, 3, 1), this.zAxisText.setScale(3, 3, 1)
			},
			makeAxisText: function(t, e) {
				var i = "Arial",
					r = 36,
					a = Qe.BillboardAlignment.topLeft,
					n = document.createElement("canvas"),
					s = n.getContext("2d");
				s.font = "Bold " + r + "px " + i, e instanceof Qe.Color || (e = new Qe.Color(e));
				var o = s.measureText(t),
					l = o.width;
				n.width = l, n.height = 2 * s.measureText("e").width + 4, s.fillStyle = "rgba(" + 255 * e.r + ", " + 255 * e.g + ", " + 255 * e.b + ", 1.0)", s.fillText(t, 0, 10);
				var h = new Qe.Texture(n),
					c = new Qe.BillboardMaterial({
						map: h,
						useScreenCoordinates: !1,
						alignment: a,
						depthTest: !1,
						depthMask: !1
					}),
					u = new Qe.Billboard;
				return u.material = c, u
			}
		}), Qe.Curve = function() {}, Qe.Curve.prototype.getPoint = function(t) {
			return console.log("Warning, getPoint() not implemented!"), null
		}, Qe.Curve.prototype.getPointAt = function(t) {
			var e = this.getUtoTmapping(t);
			return this.getPoint(e)
		}, Qe.Curve.prototype.getPoints = function(t) {
			t || (t = 5);
			var e, i = [];
			for (e = 0; t >= e; e++) i.push(this.getPoint(e / t));
			return i
		}, Qe.Curve.prototype.getSpacedPoints = function(t) {
			t || (t = 5);
			var e, i = [];
			for (e = 0; t >= e; e++) i.push(this.getPointAt(e / t));
			return i
		}, Qe.Curve.prototype.getLength = function() {
			var t = this.getLengths();
			return t[t.length - 1]
		}, Qe.Curve.prototype.getLengths = function(t) {
			if (t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == t + 1 && !this.needsUpdate) return this.cacheArcLengths;
			this.needsUpdate = !1;
			var e, i, r = [],
				a = this.getPoint(0),
				n = 0;
			for (r.push(0), i = 1; t >= i; i++) e = this.getPoint(i / t), n += e.distanceTo(a), r.push(n), a = e;
			return this.cacheArcLengths = r, r
		}, Qe.Curve.prototype.updateArcLengths = function() {
			this.needsUpdate = !0, this.getLengths()
		}, Qe.Curve.prototype.getUtoTmapping = function(t, e) {
			var i, r = this.getLengths(),
				a = 0,
				n = r.length;
			i = e ? e : t * r[n - 1];
			for (var s, o = 0, l = n - 1; l >= o;)
				if (a = Math.floor(o + (l - o) / 2), s = r[a] - i, 0 > s) o = a + 1;
				else {
					if (!(s > 0)) {
						l = a;
						break
					}
					l = a - 1
				}
			if (a = l, r[a] == i) {
				var h = a / (n - 1);
				return h
			}
			var c = r[a],
				u = r[a + 1],
				f = u - c,
				p = (i - c) / f,
				h = (a + p) / (n - 1);
			return h
		}, Qe.Curve.prototype.getTangent = function(t) {
			var e = 1e-4,
				i = t - e,
				r = t + e;
			0 > i && (i = 0), r > 1 && (r = 1);
			var a = this.getPoint(i),
				n = this.getPoint(r),
				s = n.clone().sub(a);
			return s.normalize()
		}, Qe.Curve.prototype.getTangentAt = function(t) {
			var e = this.getUtoTmapping(t);
			return this.getTangent(e)
		}, Qe.Curve.Utils = {
			tangentQuadraticBezier: function(t, e, i, r) {
				return 2 * (1 - t) * (i - e) + 2 * t * (r - i)
			},
			tangentCubicBezier: function(t, e, i, r, a) {
				return -3 * e * (1 - t) * (1 - t) + 3 * i * (1 - t) * (1 - t) - 6 * t * i * (1 - t) + 6 * t * r * (1 - t) - 3 * t * t * r + 3 * t * t * a
			},
			tangentSpline: function(t, e, i, r, a) {
				var n = 6 * t * t - 6 * t,
					s = 3 * t * t - 4 * t + 1,
					o = -6 * t * t + 6 * t,
					l = 3 * t * t - 2 * t;
				return n + s + o + l
			},
			interpolate: function(t, e, i, r, a) {
				var n = .5 * (i - t),
					s = .5 * (r - e),
					o = a * a,
					l = a * o;
				return (2 * e - 2 * i + n + s) * l + (-3 * e + 3 * i - 2 * n - s) * o + n * a + e
			}
		}, Qe.Curve.create = function(t, e) {
			return t.prototype = Object.create(Qe.Curve.prototype), t.prototype.getPoint = e, t
		}, Qe.LineCurve = function(t, e) {
			this.v1 = t, this.v2 = e
		}, Qe.LineCurve.prototype = Object.create(Qe.Curve.prototype), Qe.LineCurve.prototype.getPoint = function(t) {
			var e = this.v2.clone().sub(this.v1);
			return e.multiplyScalar(t).add(this.v1), e
		}, Qe.LineCurve.prototype.getPointAt = function(t) {
			return this.getPoint(t)
		}, Qe.LineCurve.prototype.getTangent = function(t) {
			var e = this.v2.clone().sub(this.v1);
			return e.normalize()
		}, Qe.LineCurve3 = function(t, e) {
			this.v1 = t, this.v2 = e, this.getPoint = function(t) {
				var e = new Qe.XiangliangThree;
				return e.subVectors(this.v2, this.v1), e.multiplyScalar(t), e.add(this.v1), e
			}
		}, Qe.extend(Qe.LineCurve3, Qe.Curve, {}), Qe.CurvePath = function() {
			this.curves = [], this.bends = [], this.autoClose = !1
		}, Qe.CurvePath.prototype = Object.create(Qe.Curve.prototype), Qe.CurvePath.prototype.add = function(t) {
			this.curves.push(t)
		}, Qe.CurvePath.prototype.checkConnection = function() {}, Qe.CurvePath.prototype.closePath = function() {
			var t = this.curves[0].getPoint(0),
				e = this.curves[this.curves.length - 1].getPoint(1);
			t.equals(e) || this.curves.push(new Qe.LineCurve3(e, t))
		}, Qe.CurvePath.prototype.getPoint = function(t) {
			for (var e, i, r = t * this.getLength(), a = this.getCurveLengths(), n = 0; n < a.length;) {
				if (a[n] >= r) {
					e = a[n] - r, i = this.curves[n];
					var s = 1 - e / i.getLength();
					return i.getPointAt(s)
				}
				n++
			}
			return null
		}, Qe.CurvePath.prototype.getLength = function() {
			var t = this.getCurveLengths();
			return t[t.length - 1]
		}, Qe.CurvePath.prototype.getCurveLengths = function() {
			if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
			var t, e = [],
				i = 0,
				r = this.curves.length;
			for (t = 0; r > t; t++) i += this.curves[t].getLength(), e.push(i);
			return this.cacheLengths = e, e
		}, Qe.CurvePath.prototype.getBizBox = function() {
			var t, e, i, r, a, n, s = this.getPoints();
			t = e = Number.NEGATIVE_INFINITY, r = a = Number.POSITIVE_INFINITY;
			var o, l, h, c, u = s[0] instanceof Qe.XiangliangThree;
			for (c = u ? new Qe.XiangliangThree : new Qe.XiangliangTwo, l = 0, h = s.length; h > l; l++) o = s[l], o.x > t ? t = o.x : o.x < r && (r = o.x), o.y > e ? e = o.y : o.y < a && (a = o.y), u && (o.z > i ? i = o.z : o.z < n && (n = o.z)), c.add(o);
			var f = {
				minX: r,
				minY: a,
				maxX: t,
				maxY: e,
				centroid: c.divideScalar(h)
			};
			return u && (f.maxZ = i, f.minZ = n), f
		}, Qe.CurvePath.prototype.createPointsGeometry = function(t) {
			var e = this.getPoints(t, !0);
			return this.createGeometry(e)
		}, Qe.CurvePath.prototype.createSpacedPointsGeometry = function(t) {
			var e = this.getSpacedPoints(t, !0);
			return this.createGeometry(e)
		}, Qe.CurvePath.prototype.createGeometry = function(t) {
			for (var e = new Qe.Geometry, i = 0; i < t.length; i++) e.vertices.push(new Qe.XiangliangThree(t[i].x, t[i].y, t[i].z || 0));
			return e
		}, Qe.CurvePath.prototype.addWrapPath = function(t) {
			this.bends.push(t)
		}, Qe.CurvePath.prototype.getTransformedPoints = function(t, e) {
			var i, r, a = this.getPoints(t);
			for (e || (e = this.bends), i = 0, r = e.length; r > i; i++) a = this.getWrapPoints(a, e[i]);
			return a
		}, Qe.CurvePath.prototype.getTransformedSpacedPoints = function(t, e) {
			var i, r, a = this.getSpacedPoints(t);
			for (e || (e = this.bends), i = 0, r = e.length; r > i; i++) a = this.getWrapPoints(a, e[i]);
			return a
		}, Qe.CurvePath.prototype.getWrapPoints = function(t, e) {
			var i, r, a, n, s, o, l = this.getBizBox();
			for (i = 0, r = t.length; r > i; i++) {
				a = t[i], n = a.x, s = a.y, o = n / l.maxX, o = e.getUtoTmapping(o, n);
				var h = e.getPoint(o),
					c = e.getTangent(o);
				c.set(-c.y, c.x).multiplyScalar(s), a.x = h.x + c.x, a.y = h.y + c.y
			}
			return t
		}, Qe.EllipseCurve = function(t, e, i, r, a, n, s) {
			this.aX = t, this.aY = e, this.xRadius = i, this.yRadius = r, this.aStartAngle = a || 0, this.aEndAngle = n || 2 * Math.PI, this.aClockwise = s
		}, Qe.EllipseCurve.prototype = Object.create(Qe.Curve.prototype), Qe.EllipseCurve.prototype.getPoint = function(t) {
			var e, i = this.aEndAngle - this.aStartAngle;
			0 > i && (i += 2 * Math.PI), i > 2 * Math.PI && (i -= 2 * Math.PI), e = this.aClockwise === !0 ? this.aEndAngle + (1 - t) * (2 * Math.PI - i) : this.aStartAngle + t * i;
			var r = this.aX + this.xRadius * Math.cos(e),
				a = this.aY + this.yRadius * Math.sin(e);
			return new Qe.XiangliangThree(r, a, 0)
		}, Qe.ArcCurve = function(t, e, i, r, a, n) {
			Qe.EllipseCurve.call(this, t, e, i, i, r, a, n)
		}, Qe.ArcCurve.prototype = Object.create(Qe.EllipseCurve.prototype), Qe.Path = function(t) {
			Qe.CurvePath.call(this), this.actions = [], this.points = [], t && this.fromPoints(t)
		}, Qe.extend(Qe.Path, Qe.CurvePath, {
			constructor: Qe.Path,
			className: "TGL.Path",
			serializeJsonValue: function() {
				return {
					actions: this.actions,
					"class": "TGL.Path"
				}
			},
			deserializeJsonValue: function(t) {
				var e, i, r, a;
				for (a = 0; a < t.actions.length; a++) i = t.actions[a], e = i.action, r = i.args, this[e].apply(this, r)
			}
		}), Qe.PathActions = {
			MOVE_TO: "moveTo",
			LINE_TO: "lineTo",
			QUADRATIC_CURVE_TO: "curveTo",
			BEZIER_CURVE_TO: "bCurveTo",
			CSPLINE_THRU: "splineThru",
			ARC: "arc",
			ELLIPSE: "ellipse"
		}, Qe.Path.prototype.fromPoints = function(t) {
			this.moveTo(t[0].x, t[0].y, t[0].z);
			for (var e = 1, i = t.length; i > e; e++) this.lineTo(t[e].x, t[e].y, t[e].z)
		}, Qe.Path.prototype.closePath = function() {
			var t = this.curves[0].getPoint(0),
				e = this.curves[this.curves.length - 1].getPoint(1);
			t.equals(e) || this.lineTo(t.x, t.y, t.z)
		}, Qe.Path.prototype.reverse = function() {
			var t, e, i, r, a, n = new Qe.Path,
				s = this.actions.length;
			for (t = s - 1; t >= 0; t--) {
				if (e = this.actions[t].args, i = e.length, t === s - 1 && n.moveTo(e[i - 3], e[i - 2], e[i - 1]), null != r) switch (a) {
					case Qe.PathActions.MOVE_TO:
						n.moveTo(e[i - 3], e[i - 2], e[i - 1]);
						break;
					case Qe.PathActions.LINE_TO:
						n.lineTo(e[i - 3], e[i - 2], e[i - 1]);
						break;
					case Qe.PathActions.QUADRATIC_CURVE_TO:
						n.quadraticCurveTo(r[0], r[1], r[2], e[i - 3], e[i - 2], e[i - 1]);
						break;
					case Qe.PathActions.BEZIER_CURVE_TO:
						n.bezierCurveTo(r[3], r[4], r[5], r[0], r[1], r[2], e[i - 3], e[i - 2], e[i - 1])
				}
				r = e, a = this.actions[t].action
			}
			return n
		}, Qe.Path.prototype.moveTo = function(t, e, i) {
			t = t || 0, e = e || 0, i = i || 0;
			var r = Array.prototype.slice.call(arguments);
			this.actions.push({
				action: Qe.PathActions.MOVE_TO,
				args: r
			}), this.points.push(new Je(t, e, i))
		}, Qe.Path.prototype.lineTo = function(t, e, i) {
			if (t = t || 0, e = e || 0, i = i || 0, this.actions && 1 === this.actions.length) {
				var r = this.actions[0].args;
				r[0] === t && r[1] === e && r[2] === i && (console.log("TGL.Path:lineTo the same point of moveTo"), t += .01)
			}
			var r = Array.prototype.slice.call(arguments),
				a = this.actions[this.actions.length - 1].args,
				n = a[a.length - 3],
				s = a[a.length - 2],
				o = a[a.length - 1],
				l = new Qe.LineCurve3(new Qe.XiangliangThree(n, s, o), new Qe.XiangliangThree(t, e, i));
			this.curves.push(l), this.actions.push({
				action: Qe.PathActions.LINE_TO,
				args: r
			}), this.points.push(new Je(t, e, i))
		}, Qe.Path.prototype.quadraticCurveTo = function(t, e, i, r, a, n) {
			if (t = t || 0, e = e || 0, i = i || 0, r = r || 0, a = a || 0, n = n || 0, this.actions && 1 === this.actions.length) {
				var s = this.actions[0].args;
				s[0] === r && s[1] === a && s[2] === n && (console.log("TGL.Path:quadraticCurveTo the same point of moveTo"), r = .01)
			}
			var s = Array.prototype.slice.call(arguments),
				o = this.actions[this.actions.length - 1].args,
				l = o[o.length - 3],
				h = o[o.length - 2],
				c = o[o.length - 1],
				u = new Qe.QuadraticBezierCurve3(new Qe.XiangliangThree(l, h, c), new Qe.XiangliangThree(t, e, i), new Qe.XiangliangThree(r, a, n));
			this.curves.push(u), this.actions.push({
				action: Qe.PathActions.QUADRATIC_CURVE_TO,
				args: s
			}), this.points.push(new Je(r, a, n))
		}, Qe.Path.prototype.curveTo = Qe.Path.prototype.quadraticCurveTo, Qe.Path.prototype.bezierCurveTo = function(t, e, i, r, a, n, s, o, l) {
			var h = Array.prototype.slice.call(arguments),
				c = this.actions[this.actions.length - 1].args,
				u = c[c.length - 3],
				f = c[c.length - 2],
				p = c[c.length - 1],
				d = new Qe.CubicBezierCurve3(new Qe.XiangliangThree(u, f, p), new Qe.XiangliangThree(t, e, i), new Qe.XiangliangThree(r, a, n), new Qe.XiangliangThree(s, o, l));
			this.curves.push(d), this.actions.push({
				action: Qe.PathActions.BEZIER_CURVE_TO,
				args: h
			}), this.points.push(new Je(s, o, l))
		}, Qe.Path.prototype.isClockwise = function() {
			if (this.points.length < 2) return e;
			if (this.points.length < 3) {
				var t = this.points[0],
					i = this.points[1];
				return i.x > t.x
			}
			return Qe.Math.isClockwise(this.points)
		}, Qe.Path.prototype.bCurveTo = Qe.Path.prototype.bezierCurveTo, Qe.Path.prototype.splineThru = function(t) {
			var e = Array.prototype.slice.call(arguments),
				i = this.actions[this.actions.length - 1].args,
				r = i[i.length - 2],
				a = i[i.length - 1],
				n = [new Qe.XiangliangTwo(r, a)];
			Array.prototype.push.apply(n, t);
			var s = new Qe.SplineCurve(n);
			this.curves.push(s), this.actions.push({
				action: Qe.PathActions.CSPLINE_THRU,
				args: e
			})
		}, Qe.Path.prototype.arc = function(t, e, i, r, a, n) {
			var s = this.actions[this.actions.length - 1].args,
				o = s[s.length - 2],
				l = s[s.length - 1];
			this.absarc(t + o, e + l, i, r, a, n)
		}, Qe.Path.prototype.absarc = function(t, e, i, r, a, n) {
			this.absellipse(t, e, i, i, r, a, n)
		}, Qe.Path.prototype.ellipse = function(t, e, i, r, a, n, s) {
			var o = this.actions[this.actions.length - 1].args,
				l = o[o.length - 2],
				h = o[o.length - 1];
			this.absellipse(t + l, e + h, i, r, a, n, s)
		}, Qe.Path.prototype.absellipse = function(t, e, i, r, a, n, s) {
			var o = Array.prototype.slice.call(arguments),
				l = new Qe.EllipseCurve(t, e, i, r, a, n, s);
			this.curves.push(l);
			var h = l.getPoint(1);
			o.push(h.x), o.push(h.y), this.actions.push({
				action: Qe.PathActions.ELLIPSE,
				args: o
			})
		}, Qe.Path.prototype.toArray = function() {
			var t, e = this.actions.length,
				i = [];
			for (t = 0; e > t; t++) {
				var r = this.actions[t];
				"moveTo" === r.action ? (i.push("m"), i.push(r.args[0]), i.push(r.args[1]), i.push(r.args[2])) : "lineTo" === r.action ? (i.push("l"), i.push(r.args[0]), i.push(r.args[1]), i.push(r.args[2])) : "curveTo" === r.action && (i.push("c"), i.push(r.args[0]), i.push(r.args[1]), i.push(r.args[2]), i.push(r.args[3]), i.push(r.args[4]), i.push(r.args[5]))
			}
			return i
		}, Qe.Path.prototype.getSpacedPoints = function(t, e) {
			t || (t = 40);
			for (var i = [], r = 0; t > r; r++) i.push(this.getPoint(r / t));
			return i
		}, Qe.Path.prototype.getPoints = function(t, e) {
			if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(t, e);
			t = t || 12;
			var i, r, a, n, s, o, l, h, c, u, f, p, d, m, g, y, v, x, A, w, _, S, b = [];
			for (i = 0, r = this.actions.length; r > i; i++) switch (a = this.actions[i], n = a.action, s = a.args, n) {
				case Qe.PathActions.MOVE_TO:
					b.push(new Qe.XiangliangThree(s[0], s[1], s[2]));
					break;
				case Qe.PathActions.LINE_TO:
					b.push(new Qe.XiangliangThree(s[0], s[1], s[2]));
					break;
				case Qe.PathActions.QUADRATIC_CURVE_TO:
					for (o = s[3], l = s[4], h = s[5], p = s[0], d = s[1], m = s[2], b.length > 0 ? (x = b[b.length - 1], g = x.x, y = x.y, v = x.z) : (x = this.actions[i - 1].args, g = x[x.length - 3], y = x[x.length - 2], v = x[x.length - 1]), A = 1; t >= A; A++) w = A / t, _ = Qe.Shape.Utils.b2(w, g, p, o), S = Qe.Shape.Utils.b2(w, y, d, l), tz = Qe.Shape.Utils.b2(w, v, m, h), b.push(new Qe.XiangliangThree(_, S, tz));
					break;
				case Qe.PathActions.BEZIER_CURVE_TO:
					for (o = s[6], l = s[7], h = s[8], p = s[0], d = s[1], m = s[2], c = s[3], u = s[4], f = s[5], b.length > 0 ? (x = b[b.length - 1], g = x.x, y = x.y, v = x.z) : (x = this.actions[i - 1].args, g = x[x.length - 3], y = x[x.length - 2], v = x[x.length - 1]), A = 1; t >= A; A++) w = A / t, _ = Qe.Shape.Utils.b3(w, g, p, c, o), S = Qe.Shape.Utils.b3(w, y, d, u, l), tz = Qe.Shape.Utils.b3(w, v, m, f, h), b.push(new Qe.XiangliangThree(_, S, tz));
					break;
				case Qe.PathActions.CSPLINE_THRU:
					x = this.actions[i - 1].args;
					var M = new Qe.XiangliangTwo(x[x.length - 2], x[x.length - 1]),
						C = [M],
						P = t * s[0].length;
					C = C.concat(s[0]);
					var T = new Qe.SplineCurve(C);
					for (A = 1; P >= A; A++) b.push(T.getPointAt(A / P));
					break;
				case Qe.PathActions.ARC:
					var z, L = s[0],
						E = s[1],
						D = s[2],
						B = s[3],
						N = s[4],
						R = !!s[5],
						I = N - B,
						F = 2 * t;
					for (A = 1; F >= A; A++) w = A / F, R || (w = 1 - w), z = B + w * I, _ = L + D * Math.cos(z), S = E + D * Math.sin(z), b.push(new Qe.XiangliangThree(_, S));
					break;
				case Qe.PathActions.ELLIPSE:
					var z, L = s[0],
						E = s[1],
						V = s[2],
						U = s[3],
						B = s[4],
						N = s[5],
						R = !!s[6],
						I = N - B,
						F = 2 * t;
					for (A = 1; F >= A; A++) w = A / F, R || (w = 1 - w), z = B + w * I, _ = L + V * Math.cos(z), S = E + U * Math.sin(z), b.push(new Qe.XiangliangThree(_, S))
			}
			var k = b[b.length - 1],
				O = 1e-10;
			return Math.abs(k.x - b[0].x) < O && Math.abs(k.y - b[0].y) < O && b.splice(b.length - 1, 1), e && b.push(b[0]), b
		}, Qe.Path.prototype.toShapes = function(t) {
			var i, r, a, n, s, o = [],
				l = new Qe.Path;
			for (i = 0, r = this.actions.length; r > i; i++) a = this.actions[i], s = a.args, n = a.action, n == Qe.PathActions.MOVE_TO && 0 != l.actions.length && (o.push(l), l = new Qe.Path), l[n].apply(l, s);
			if (0 != l.actions.length && o.push(l), 0 == o.length) return [];
			var h, c, u, f = [];
			if (1 == o.length) return c = o[0], u = new Qe.Shape, u.actions = c.actions, u.curves = c.curves, f.push(u), f;
			var p = !Qe.Shape.Utils.isClockWise(o[0].getPoints());
			if (p = t ? !p : p)
				for (u = new Qe.Shape, i = 0, r = o.length; r > i; i++) c = o[i], h = Qe.Shape.Utils.isClockWise(c.getPoints()), h = t ? !h : h, h ? (u.actions = c.actions, u.curves = c.curves, f.push(u), u = new Qe.Shape) : u.holes.push(c);
			else {
				for (u = e, i = 0, r = o.length; r > i; i++) c = o[i], h = Qe.Shape.Utils.isClockWise(c.getPoints()), h = t ? !h : h, h ? (u && f.push(u), u = new Qe.Shape, u.actions = c.actions, u.curves = c.curves) : u.holes.push(c);
				f.push(u)
			}
			return f
		}, Qe.Shape = function() {
			Qe.Path.apply(this, arguments), this.holes = []
		}, Qe.Shape.prototype = Object.create(Qe.Path.prototype), Qe.Shape.prototype.extrude = function(t) {
			var e = new Qe.ShapeNode(this, t);
			return e
		}, Qe.Shape.prototype.makeGeometry = function(t) {
			var e = new Qe.ShapeGeometry(this, t);
			return e
		}, Qe.Shape.prototype.getPointsHoles = function(t) {
			var e, i = this.holes.length,
				r = [];
			for (e = 0; i > e; e++) r[e] = this.holes[e].getTransformedPoints(t, this.bends);
			return r
		}, Qe.Shape.prototype.getSpacedPointsHoles = function(t) {
			var e, i = this.holes.length,
				r = [];
			for (e = 0; i > e; e++) r[e] = this.holes[e].getTransformedSpacedPoints(t, this.bends);
			return r
		}, Qe.Shape.prototype.extractAllPoints = function(t) {
			return {
				shape: this.getTransformedPoints(t),
				holes: this.getPointsHoles(t)
			}
		}, Qe.Shape.prototype.extractPoints = function(t) {
			return this.useSpacedPoints ? this.extractAllSpacedPoints(t) : this.extractAllPoints(t)
		}, Qe.Shape.prototype.extractAllSpacedPoints = function(t) {
			return {
				shape: this.getTransformedSpacedPoints(t),
				holes: this.getSpacedPointsHoles(t)
			}
		}, Qe.Shape.Utils = {
			removeHoles: function(t, e) {
				var i, r, a, n, s, o, l, h, c, u, f, p, d, m, g, y, v = t.concat(),
					x = v.concat(),
					A = [];
				for (s = 0; s < e.length; s++) {
					for (l = e[s], Array.prototype.push.apply(x, l), h = Number.POSITIVE_INFINITY, o = 0; o < l.length; o++) {
						f = l[o];
						var w = [];
						for (u = 0; u < v.length; u++) p = v[u], c = f.distanceToSquared(p), w.push(c), h > c && (h = c, a = o, n = u)
					}
					i = n - 1 >= 0 ? n - 1 : v.length - 1, r = a - 1 >= 0 ? a - 1 : l.length - 1;
					var _ = [l[a], v[n], v[i]],
						S = Qe.FontUtils.Triangulate.area(_),
						b = [l[a], l[r], v[n]],
						M = Qe.FontUtils.Triangulate.area(b),
						C = 1,
						P = -1,
						T = n,
						z = a;
					n += C, a += P, 0 > n && (n += v.length), n %= v.length, 0 > a && (a += l.length), a %= l.length, i = n - 1 >= 0 ? n - 1 : v.length - 1, r = a - 1 >= 0 ? a - 1 : l.length - 1, _ = [l[a], v[n], v[i]];
					var L = Qe.FontUtils.Triangulate.area(_);
					b = [l[a], l[r], v[n]];
					var E = Qe.FontUtils.Triangulate.area(b);
					S + M > L + E && (n = T, a = z, 0 > n && (n += v.length), n %= v.length, 0 > a && (a += l.length), a %= l.length, i = n - 1 >= 0 ? n - 1 : v.length - 1, r = a - 1 >= 0 ? a - 1 : l.length - 1), d = v.slice(0, n), m = v.slice(n), g = l.slice(a), y = l.slice(0, a);
					var D = [l[a], v[n], v[i]],
						B = [l[a], l[r], v[n]];
					A.push(D), A.push(B), v = d.concat(g).concat(y).concat(m)
				}
				return {
					shape: v,
					isolatedPts: A,
					allpoints: x
				}
			},
			triangulateShape: function(t, i) {
				var r, a, n, s, o, l, h = Qe.Shape.Utils.removeHoles(t, i),
					c = h.shape,
					u = h.allpoints,
					f = h.isolatedPts,
					p = Qe.FontUtils.Triangulate(c, !1),
					d = {};
				for (r = 0, a = u.length; a > r; r++) o = u[r].x + ":" + u[r].y, d[o] !== e && console.log("Duplicate point", o), d[o] = r;
				for (r = 0, a = p.length; a > r; r++)
					for (s = p[r], n = 0; 3 > n; n++) o = s[n].x + ":" + s[n].y, l = d[o], l !== e && (s[n] = l);
				for (r = 0, a = f.length; a > r; r++)
					for (s = f[r], n = 0; 3 > n; n++) o = s[n].x + ":" + s[n].y, l = d[o], l !== e && (s[n] = l);
				return p.concat(f)
			},
			isClockWise: function(t) {
				return Qe.FontUtils.Triangulate.area(t) < 0
			},
			b2p0: function(t, e) {
				var i = 1 - t;
				return i * i * e
			},
			b2p1: function(t, e) {
				return 2 * (1 - t) * t * e
			},
			b2p2: function(t, e) {
				return t * t * e
			},
			b2: function(t, e, i, r) {
				return this.b2p0(t, e) + this.b2p1(t, i) + this.b2p2(t, r)
			},
			b3p0: function(t, e) {
				var i = 1 - t;
				return i * i * i * e
			},
			b3p1: function(t, e) {
				var i = 1 - t;
				return 3 * i * i * t * e
			},
			b3p2: function(t, e) {
				var i = 1 - t;
				return 3 * i * t * t * e
			},
			b3p3: function(t, e) {
				return t * t * t * e
			},
			b3: function(t, e, i, r, a) {
				return this.b3p0(t, e) + this.b3p1(t, i) + this.b3p2(t, r) + this.b3p3(t, a)
			}
		}, Qe.CubicBezierCurve3 = Qe.Curve.create(function(t, e, i, r) {
			this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = r
		}, function(t) {
			var e, i, r;
			return e = Qe.Shape.Utils.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), i = Qe.Shape.Utils.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y), r = Qe.Shape.Utils.b3(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new Qe.Vector3(e, i, r)
		}), Qe.QuadraticBezierCurve3 = Qe.Curve.create(function(t, e, i) {
			this.v0 = t, this.v1 = e, this.v2 = i
		}, function(t) {
			var e, i, r;
			return e = Qe.Shape.Utils.b2(t, this.v0.x, this.v1.x, this.v2.x), i = Qe.Shape.Utils.b2(t, this.v0.y, this.v1.y, this.v2.y), r = Qe.Shape.Utils.b2(t, this.v0.z, this.v1.z, this.v2.z), new Qe.XiangliangThree(e, i, r)
		}), Qe.PathNode = function(t, i, r, a, n, s, o, l, h, c) {
			this.materialSize = 1, this.closed = !1;
			var u;
			1 === arguments.length && arguments[0] instanceof Object && !(arguments[0] instanceof Qe.Path) ? (u = arguments[0], this.path = u.path, this.segments = u.segments || 20, this.radius = u.radius || 1, this.segmentsR = u.segmentsR || 8, this.shape = u.shape, this.startCap = u.startCap || "plain", this.endCap = u.endCap || "plain", this.arc = u.arc != e ? u.arc : 2 * Math.PI, this.arcStart = u.arcStart != e ? u.arcStart : 0, this.cutSurface = u.cutSurface || "none", this.startCapR = u.startCapR, this.endCapR = u.endCapR, this.startCapSize = u.startCapSize, this.endCapSize = u.endCapSize, this.startCapExtend = u.startCapExtend === e ? 1 : u.startCapExtend, this.endCapExtend = u.endCapExtend === e ? 1 : u.endCapExtend, this._id = u.id) : (this.path = t, this.segments = i || 20, this.radius = r || 1, this.segmentsR = a || 8, this.shape = o, this.startCap = n || "plain", this.endCap = s || "plain", this.arc = l != e ? l : 2 * Math.PI, this.arcStart = h != e ? h : 0, this.cutSurface = c || "none"), this.startCapSize = this.startCapSize || 1, this.endCapSize = this.endCapSize || 1, this.segmentsCap = 20, this.arc === 2 * Math.PI && (this.cutSurface = "none"), Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.PathNode, Qe.Entity, {
			constructor: Qe.PathNode,
			className: "TGL.PathNode",
			__accessor: ["path", "segments", "radius", "segmentsR", "startCap", "endCap", "shape", "startCapSize", "endCapSize", "segmentsCap", "arc", "arcStart", "cutSurface", "startCapR", "endCapR", "startCapExtend", "endCapExtend"],
			__SizePropeties: ["path", "segments", "radius", "segmentsR", "startCap", "endCap", "shape", "startCapSize", "endCapSize", "segmentsCap", "arc", "arcStart", "cutSurface", "startCapR", "endCapR", "startCapExtend", "endCapExtend"],
			getCrossSectionPoint: function() {},
			adjustPath: function(t, e, i) {
				e = e || this.radius, i = i || 1;
				var r, a, n, s, o, l, h, c, u, f, p, d, m = new Qe.Path,
					g = new Je,
					y = new Je,
					v = new Je,
					x = new Je,
					A = t.actions.length;
				for (d = 0; A > d; d++) n = t.actions[d], o = d + 1 === A ? null : t.actions[d + 1], s = n.args, "moveTo" === n.action ? m.moveTo(s[0], s[1], s[2]) : "lineTo" === n.action ? o && "lineTo" === o.action ? (r = t.actions[d - 1], a = r.args, l = o.args, h = new Je(a[0], a[1], a[2]), c = new Je(s[0], s[1], s[2]), u = new Je(l[0], l[1], l[2]), g.subVectors(c, h), y.subVectors(c, u), f = g.angleTo(y), p = Math.min(g.length() / 2, y.length() / 2), p = Math.min(e * i, p), v.addVectors(c, g.normalize().multiplyScalar(-p)), x.addVectors(c, y.normalize().multiplyScalar(-p)), m.lineTo(v.x, v.y, v.z), m.curveTo(c.x, c.y, c.z, x.x, x.y, x.z)) : m.lineTo(s[0], s[1], s[2]) : "quadraticCurveTo" === n.action && m.curveTo(s[0], s[1], s[2], s[3], s[4], s[5]);
				return m
			},
			_resetPath: function() {
				return this.path
			},
			getPointAt: function(t) {
				return this._realPath ? this._realPath.getPoint(t) : null
			},
			getTangentAt: function(t) {
				if (this._realPath) {
					var e = this._realPath.getPoint(t),
						i = this._realPath.getPoint(t - .001);
					return e.sub(i).normalize()
				}
				return null
			},
			computeData: function() {
				function t(t, e, i, r) {
					return r.vertices.push(new Qe.XiangliangThree(t, e, i)) - 1
				}
				this.grid = [], this.startGrid = [], this.endGrid = [];
				var e, i, r, a, n, s, o, l, h, c, u, f, p, d, m, g, y, v, x, A, w = this.segmentsCap,
					_ = new Qe.XiangliangThree,
					S = {};
				if (S.faces = [], S.uvs = [], S.vertices = [], null == this.path) return S;
				var b = this._resetPath(),
					M = this.startCap,
					C = this.endCap,
					P = this.cutSurface;
				this._realPath = b, 1 == this._autoAjust && (b = this.adjustPath(b));
				var m, T, c, z = b.curves.length,
					L = b.curves,
					E = [],
					D = b.getLength(),
					B = 0,
					N = this.segments;
				for (h = 0; z > h; h++) {
					if (m = L[h], T = m.getLength(), m instanceof Qe.LineCurve3) {
						var R = (.001 * T + B) / D,
							I = (.999 * T + B) / D;
						E.push(R), E.push(I);
					} else {
						var F = .998 * T;
						for (c = 0; N >= c; c++) {
							var V = (.001 * T + F * c / N + B) / D;
							E.push(V)
						}
					}
					B += T
				}
				var U = this.frenetFrames(b, E, this.closed),
					k = U.tangents,
					O = U.normals,
					X = U.binormals;
				this.tangents = k, this.normals = O, this.binormals = X;
				var G, W = 0,
					H = E.length - 1,
					j = H + 1,
					q = 0,
					Y = 0;
				for (h = 0; j > h; h++) {
					if (this.grid[h] = [], a = E[h], l = b.getPointAt(a), e = k[h], i = O[h], r = X[h], "none" !== M && 0 === h)
						if ("round" === M || "arrow" === M) {
							var Z, Q;
							q += this.radius * this.startCapSize;
							for (var K = l.clone().add(e.clone().multiplyScalar(-this.radius * this.startCapSize)), J = 0; w >= J; J++) {
								this.startGrid[J] = [];
								var $ = J / w * Math.PI / 2;
								Z = "round" === M ? K.clone().add(e.clone().multiplyScalar(this.radius * this.startCapSize * (1 - Math.cos($)))) : K.clone().add(e.clone().multiplyScalar(this.radius * this.startCapSize * J / w));
								for (var c = 0; c < this.segmentsR; c++) n = c / this.segmentsR * this.arc + this.arcStart, "round" === M ? (s = -this.radius * Math.cos(n) * Math.sin($), o = this.radius * Math.sin(n) * Math.sin($)) : (s = -this.radius * Math.cos(n) * J / w, o = this.radius * Math.sin(n) * J / w, s *= this.startCapR || 1.3, o *= this.startCapR || 1.3), Q = Z.clone(), Q.x += s * i.x + o * r.x, Q.y += s * i.y + o * r.y, Q.z += s * i.z + o * r.z, this.startGrid[J][c] = S.vertices.push(Q) - 1;
								"center" === P && (this.startGrid[J][this.segmentsR] = S.vertices.push(Z.clone()) - 1)
							}
						} else W = S.vertices.push(l);
					for (c = 0; c < this.segmentsR; c++) {
						if (G = c / (this.segmentsR - 1), this.shape instanceof Array) s = -this.shape[c].x, o = this.shape[c].y;
						else if (this.shape instanceof Qe.Path) {
							var tt = this.shape.getPointAt(G);
							s = -tt.x, o = -tt.y
						} else n = c / this.segmentsR * this.arc + this.arcStart, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
						_.copy(l), _.x += s * i.x + o * r.x, _.y += s * i.y + o * r.y, _.z += s * i.z + o * r.z, this.grid[h][c] = t(_.x, _.y, _.z, S)
					}
					if ("center" === P && (this.grid[h][this.segmentsR] = S.vertices.push(l.clone()) - 1), "none" !== C && h === j - 1)
						if ("round" === C || "arrow" === C) {
							Y += this.radius * this.endCapSize;
							for (var Z, Q, K = l.clone().add(e.clone().multiplyScalar(this.radius * this.endCapSize)), J = 0; w >= J; J++) {
								this.endGrid[J] = [];
								var $ = (1 - J / w) * Math.PI / 2;
								Z = "round" === C ? K.clone().add(e.clone().multiplyScalar(-this.radius * this.endCapSize * (1 - Math.cos($)))) : K.clone().add(e.clone().multiplyScalar(-this.radius * this.endCapSize * (1 - J / w)));
								for (var c = 0; c < this.segmentsR; c++) n = c / this.segmentsR * this.arc + this.arcStart, "round" === C ? (s = -this.radius * Math.cos(n) * Math.sin($), o = this.radius * Math.sin(n) * Math.sin($)) : (s = -this.radius * Math.cos(n) * (1 - J / w), o = this.radius * Math.sin(n) * (1 - J / w), s *= this.endCapR || 1.3, o *= this.endCapR || 1.3), Q = Z.clone(), Q.x += s * i.x + o * r.x, Q.y += s * i.y + o * r.y, Q.z += s * i.z + o * r.z, this.endGrid[J][c] = S.vertices.push(Q) - 1;
								"center" === P && (this.endGrid[J][this.segmentsR] = S.vertices.push(Z) - 1)
							}
						} else S.vertices.push(l)
				}
				var et = this.segmentsR,
					it = this.segmentsR;
				this.arc !== 2 * Math.PI && ("center" === P ? (et++, it++) : "none" === P && et--);
				var rt = this.arc / Math.PI / 2,
					at = b.getLength(),
					nt = at + q + Y,
					st = 0,
					ot = q / nt,
					lt = ot,
					ht = at / nt,
					ct = ot + ht,
					ut = Y / nt;
				if ("none" !== M)
					if ("plain" === M)
						for (p = 0, c = 0; c < this.segmentsR; c++) {
							f = (c + 1) % this.segmentsR, d = this.grid[0][c], m = this.grid[0][f], S.faces.push(new Qe.Face3(p, d, m)), n = c / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
							var y = new Ke(.5, .5);
							n = c / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
							var v = new Ke((s / this.radius + 1) / 2, (o / this.radius + 1) / 2);
							n = f / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
							var x = new Ke((s / this.radius + 1) / 2, (o / this.radius + 1) / 2);
							S.uvs.push([y, v, x])
						} else
							for (h = 0; w >= h; h++)
								for (c = 0; et > c; c++) {
									if (u = h + 1, f = (c + 1) % it, p = this.startGrid[h][c], u === w + 1 ? (d = this.grid[0][c], m = this.grid[0][f]) : (d = this.startGrid[u][c], m = this.startGrid[u][f]), g = this.startGrid[h][f], c >= this.segmentsR - 1) {
										var J = this.segmentsR - 1,
											a = J / this.segmentsR * rt;
										et === this.segmentsR ? (y = new Qe.XiangliangTwo(h / w * ot + st, a), v = new Qe.XiangliangTwo((h + 1) / w * ot + st, a), x = new Qe.XiangliangTwo((h + 1) / w * ot + st, 1), A = new Qe.XiangliangTwo(h / w * ot + st, 1)) : c > this.segmentsR - 1 ? (y = new Qe.XiangliangTwo(h / w * ot + st, (1 + a) / 2), v = new Qe.XiangliangTwo((h + 1) / w * ot + st, (1 + a) / 2), x = new Qe.XiangliangTwo((h + 1) / w * ot + st, 1), A = new Qe.XiangliangTwo(h / w * ot + st, 1)) : (y = new Qe.XiangliangTwo(h / w * ot + st, a), v = new Qe.XiangliangTwo((h + 1) / w * ot + st, a), x = new Qe.XiangliangTwo((h + 1) / w * ot + st, (1 + a) / 2), A = new Qe.XiangliangTwo(h / w * ot + st, (1 + a) / 2))
									} else y = new Qe.XiangliangTwo(h / w * ot + st, c / this.segmentsR * rt), v = new Qe.XiangliangTwo((h + 1) / w * ot + st, c / this.segmentsR * rt), x = new Qe.XiangliangTwo((h + 1) / w * ot + st, (c + 1) / this.segmentsR * rt), A = new Qe.XiangliangTwo(h / w * ot + st, (c + 1) / this.segmentsR * rt);
									0 !== h && (S.faces.push(new Qe.Face3(p, d, g, W - 1)), S.uvs.push([y, v, A])), S.faces.push(new Qe.Face3(d, m, g, W - 1)), S.uvs.push([v.clone(), x, A.clone()])
								}
					for (h = 0; H > h; h++)
						for (c = 0; et > c; c++) {
							if (u = this.closed ? (h + 1) % H : h + 1, f = (c + 1) % it, p = this.grid[h][c], d = this.grid[u][c], m = this.grid[u][f], g = this.grid[h][f], c >= this.segmentsR - 1) {
								var J = this.segmentsR - 1,
									a = J / this.segmentsR * rt;
								et === this.segmentsR ? (y = new Qe.XiangliangTwo(E[h] * ht + lt, a), v = new Qe.XiangliangTwo(E[h + 1] * ht + lt, a), x = new Qe.XiangliangTwo(E[h + 1] * ht + lt, 1), A = new Qe.XiangliangTwo(E[h] * ht + lt, 1)) : c > this.segmentsR - 1 ? (y = new Qe.XiangliangTwo(E[h] * ht + lt, (a + 1) / 2), v = new Qe.XiangliangTwo(E[h + 1] * ht + lt, (a + 1) / 2), x = new Qe.XiangliangTwo(E[h + 1] * ht + lt, 1), A = new Qe.XiangliangTwo(E[h] * ht + lt, 1)) : (y = new Qe.XiangliangTwo(E[h] * ht + lt, a), v = new Qe.XiangliangTwo(E[h + 1] * ht + lt, a), x = new Qe.XiangliangTwo(E[h + 1] * ht + lt, (a + 1) / 2), A = new Qe.XiangliangTwo(E[h] * ht + lt, (a + 1) / 2))
							} else y = new Qe.XiangliangTwo(E[h] * ht + lt, c / this.segmentsR * rt), v = new Qe.XiangliangTwo(E[h + 1] * ht + lt, c / this.segmentsR * rt), x = new Qe.XiangliangTwo(E[h + 1] * ht + lt, (c + 1) / this.segmentsR * rt), A = new Qe.XiangliangTwo(E[h] * ht + lt, (c + 1) / this.segmentsR * rt);
							S.faces.push(new Qe.Face3(p, d, g)), S.uvs.push([y, v, A]), S.faces.push(new Qe.Face3(d, m, g)), S.uvs.push([v.clone(), x, A.clone()])
						}
					if ("none" !== C) {
						p = S.vertices.length - 1;
						var z = this.grid.length;
						if ("plain" === C)
							for (c = 0; c < this.segmentsR; c++) {
								f = (c + 1) % this.segmentsR, d = this.grid[z - 1][c], m = this.grid[z - 1][f], S.faces.push(new Qe.Face3(p, m, d)), n = c / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
								var y = new Ke(.5, .5);
								n = c / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
								var v = new Ke((s / this.radius + 1) / 2, (o / this.radius + 1) / 2);
								n = f / this.segmentsR * 2 * Math.PI, s = -this.radius * Math.cos(n), o = this.radius * Math.sin(n);
								var x = new Ke((s / this.radius + 1) / 2, (o / this.radius + 1) / 2);
								S.uvs.push([y, x, v])
							} else
								for (h = -1; w > h; h++)
									for (c = 0; et > c; c++) {
										if (u = h + 1, f = (c + 1) % it, -1 === h ? (p = this.grid[z - 1][c], g = this.grid[z - 1][f]) : (p = this.endGrid[h][c], g = this.endGrid[h][f]), d = this.endGrid[u][c], m = this.endGrid[u][f], c >= this.segmentsR - 1) {
											var J = this.segmentsR - 1,
												a = J / this.segmentsR * rt;
											et === this.segmentsR ? (y = new Qe.XiangliangTwo(h / w * ut + ct, a), v = new Qe.XiangliangTwo((h + 1) / w * ut + ct, a), x = new Qe.XiangliangTwo((h + 1) / w * ut + ct, 1), A = new Qe.XiangliangTwo(h / w * ut + ct, 1)) : c > this.segmentsR - 1 ? (y = new Qe.XiangliangTwo(h / w * ut + ct, (1 + a) / 2), v = new Qe.XiangliangTwo((h + 1) / w * ut + ct, (1 + a) / 2), x = new Qe.XiangliangTwo((h + 1) / w * ut + ct, 1), A = new Qe.XiangliangTwo(h / w * ut + ct, 1)) : (y = new Qe.XiangliangTwo(h / w * ut + ct, a), v = new Qe.XiangliangTwo((h + 1) / w * ut + ct, a), x = new Qe.XiangliangTwo((h + 1) / w * ut + ct, (1 + a) / 2), A = new Qe.XiangliangTwo(h / w * ut + ct, (1 + a) / 2))
										} else y = new Qe.XiangliangTwo(h / w * ut + ct, c / this.segmentsR * rt), v = new Qe.XiangliangTwo((h + 1) / w * ut + ct, c / this.segmentsR * rt), x = new Qe.XiangliangTwo((h + 1) / w * ut + ct, (c + 1) / this.segmentsR * rt), A = new Qe.XiangliangTwo(h / w * ut + ct, (c + 1) / this.segmentsR * rt);
										S.faces.push(new Qe.Face3(p, d, g)), S.uvs.push([y, v, A]), S.faces.push(new Qe.Face3(d, m, g)), S.uvs.push([v.clone(), x, A.clone()])
									}
					}
				return S
			},
			frenetFrames: function(t, e, i) {
				function r() {
					d[0] = new Qe.XiangliangThree, m[0] = new Qe.XiangliangThree, n = Number.MAX_VALUE, s = Math.abs(p[0].x), o = Math.abs(p[0].y), l = Math.abs(p[0].z), n >= s && (n = s, f.set(1, 0, 0)), n >= o && (n = o, f.set(0, 1, 0)), n >= l && f.set(0, 0, 1), g.crossVectors(p[0], f).normalize(), d[0].crossVectors(p[0], g), m[0].crossVectors(p[0], d[0])
				}
				var a, n, s, o, l, h, c, u, f = (new Qe.XiangliangThree, new Qe.XiangliangThree),
					p = (new Qe.XiangliangThree, []),
					d = [],
					m = [],
					g = new Qe.XiangliangThree,
					y = new Qe.Mat4,
					v = e.length - 1,
					x = v + 1,
					A = 1e-4,
					w = [];
				for (w.tangents = p, w.normals = d, w.binormals = m, h = 0; x > h; h++) {
					c = e[h];
					var u = t.getTangentAt(c);
					p[h] = new Qe.XiangliangThree(u.x, u.y, u.z ? u.z : 0), p[h].normalize()
				}
				for (r(), h = 1; x > h; h++) d[h] = d[h - 1].clone(), m[h] = m[h - 1].clone(), g.crossVectors(p[h - 1], p[h]), g.length() > A && (g.normalize(), a = Math.acos(Qe.Math.clamp(p[h - 1].dot(p[h]), -1, 1)), d[h].applyMatrix4(y.makeRotationAxis(g, a))), m[h].crossVectors(p[h], d[h]);
				if (i)
					for (a = Math.acos(Qe.Math.clamp(d[0].dot(d[x - 1]), -1, 1)), a /= x - 1, p[0].dot(g.crossVectors(d[0], d[x - 1])) > 0 && (a = -a), h = 1; x > h; h++) d[h].applyMatrix4(y.makeRotationAxis(p[h], a * h)), m[h].crossVectors(p[h], d[h]);
				return w
			}
		}), Qe.PathCube = function(t, e, i, r, a) {
			var n;
			1 === arguments.length && arguments[0] instanceof Object && !(arguments[0] instanceof Qe.Path) ? (n = arguments[0], this.path = n.path, this.width = n.width || 50, this.height = n.height || 100, this.curveSegements = n.curveSegements || 32, this.repeat = n.repeat || 20, this._id = n.id) : (this.path = t, this.width = e || 50, this.height = i || 100, this.curveSegements = r || 32, this.repeat = a || 20), this.materialSize = 6, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.PathCube.SideIndexMapping = {
			bottom: 0,
			outside: 1,
			inside: 2,
			top: 3,
			aside: 4,
			zside: 5
		}, Qe.extend(Qe.PathCube, Qe.Entity, {
			__accessor: ["path", "width", "height", "curveSegements", "repeat"],
			__SizePropeties: ["path", "width", "height", "curveSegements", "repeat"],
			constructor: Qe.PathCube,
			className: "TGL.PathCube",
			getSideIndexMapping: function() {
				return Qe.PathCube.SideIndexMapping
			},
			computeData: function() {
				var t = {};
				if (t.vertices = [], t.faces = [], t.uvs = [], t.uv2s = [], null == this.path) return t;
				var e, i = this.computePoints(this.path, this.width, this.curveSegements),
					r = i[0],
					a = i[1],
					n = r.length,
					s = i[2],
					o = this.height,
					l = this.repeat,
					h = [],
					c = [],
					u = [],
					f = [],
					p = this.path.isClockwise();
				for (this.innerPoints = this.clonePoints(r), this.outerPoints = this.clonePoints(a), e = 0; n > e; e++) this.exchangeYZ(r[e]), this.exchangeYZ(a[e]), h[e] = t.vertices.push(r[e]) - 1, c[e] = t.vertices.push(a[e]) - 1, u[e] = t.vertices.push(r[e].clone().setY(o)) - 1, f[e] = t.vertices.push(a[e].clone().setY(o)) - 1;
				var d = s ? n : n - 1;
				for (e = 0; d > e; e++) this.generateTop(t, e, n, u, f, !0, l), this.generateBottom(t, e, n, h, c, l), this.generateSideWall(t, e, n, f, c, !0, l, p), this.generateSideWall(t, e, n, u, h, !1, l, p);
				return s || (this.generateEnd(t, u, h, c, f, l, !0), this.generateEnd(t, u, h, c, f, l, !1)), this.clockwise = p, t
			},
			clonePoints: function(t) {
				for (var e = [], i = 0; i < t.length; i++) e.push(t[i].clone());
				return e
			},
			getInsidePoints: function() {
				var t = [];
				return t = this.clockwise ? this.innerPoints : this.outerPoints
			},
			generateEnd: function(t, e, i, r, a, n, s) {
				var o, l, h, c, u, f, p, d, m, g, y, v, x, A, w, x, _, S, b, M, C = s ? 0 : i.length - 1;
				o = e[C], l = i[C], h = r[C], c = a[C], _ = t.vertices[o], S = t.vertices[l], b = t.vertices[h], M = t.vertices[c], u = _.x, f = _.y, p = _.z, d = S.x, m = S.y, g = S.z, y = b.x, v = b.y, x = b.z, A = M.x, w = M.y, dz = M.z;
				var P = Math.abs(p - x),
					T = Math.abs(u - y);
				s ? (t.faces.push(new Qe.Face3(o, l, c, null, null, 4)), T > P ? t.uvs.push([new Qe.XiangliangTwo(u / n, f / n), new Qe.XiangliangTwo(d / n, m / n), new Qe.XiangliangTwo(A / n, w / n)]) : t.uvs.push([new Qe.XiangliangTwo(p / n, f / n), new Qe.XiangliangTwo(g / n, m / n), new Qe.XiangliangTwo(dz / n, w / n)]), t.uv2s.push([new Ke(0, 1), new Ke(0, 0), new Ke(1, 1)]), t.faces.push(new Qe.Face3(l, h, c, null, null, 4)), T > P ? t.uvs.push([new Qe.XiangliangTwo(d / n, m / n), new Qe.XiangliangTwo(y / n, v / n), new Qe.XiangliangTwo(A / n, w / n)]) : t.uvs.push([new Qe.XiangliangTwo(g / n, m / n), new Qe.XiangliangTwo(x / n, v / n), new Qe.XiangliangTwo(dz / n, w / n)]), t.uv2s.push([new Ke(0, 0), new Ke(1, 0), new Ke(1, 1)])) : (t.faces.push(new Qe.Face3(l, o, c, null, null, 5)), T > P ? t.uvs.push([new Qe.XiangliangTwo(d / n, m / n), new Qe.XiangliangTwo(u / n, f / n), new Qe.XiangliangTwo(A / n, w / n)]) : t.uvs.push([new Qe.XiangliangTwo(g / n, m / n), new Qe.XiangliangTwo(p / n, f / n), new Qe.XiangliangTwo(dz / n, w / n)]), t.uv2s.push([new Ke(0, 0), new Ke(0, 1), new Ke(1, 1)]), t.faces.push(new Qe.Face3(h, l, c, null, null, 5)), T > P ? t.uvs.push([new Qe.XiangliangTwo(y / n, v / n), new Qe.XiangliangTwo(d / n, m / n), new Qe.XiangliangTwo(A / n, w / n)]) : t.uvs.push([new Qe.XiangliangTwo(x / n, v / n), new Qe.XiangliangTwo(g / n, m / n), new Qe.XiangliangTwo(dz / n, w / n)]), t.uv2s.push([new Ke(1, 0), new Ke(0, 0), new Ke(1, 1)]))
			},
			generateSideWall: function(t, e, i, r, a, n, s, o) {
				var l, h, c, u, f, p, d, m, g, y, v, x, A, w, _, A, S, b, M, C, P;
				S = (e + 1) % i, l = r[e], h = a[e], c = a[S], u = r[S], b = t.vertices[l], M = t.vertices[h], C = t.vertices[c], P = t.vertices[u], f = b.x, p = b.y, d = b.z, m = M.x, g = M.y, y = M.z, v = C.x, x = C.y, A = C.z, w = P.x, _ = P.y, dz = P.z;
				var T, z = Math.abs(d - A),
					L = Math.abs(f - v);
				n ? (T = o ? 1 : 2, t.faces.push(new Qe.Face3(l, h, u, null, null, T)), L > z ? t.uvs.push([new Qe.XiangliangTwo(f / s, p / s), new Qe.XiangliangTwo(m / s, g / s), new Qe.XiangliangTwo(w / s, _ / s)]) : t.uvs.push([new Qe.XiangliangTwo(d / s, p / s), new Qe.XiangliangTwo(y / s, g / s), new Qe.XiangliangTwo(dz / s, _ / s)]), t.uv2s.push([new Ke(0, 1), new Ke(0, 0), new Ke(1, 1)]), t.faces.push(new Qe.Face3(h, c, u, null, null, T)), L > z ? t.uvs.push([new Qe.XiangliangTwo(m / s, g / s), new Qe.XiangliangTwo(v / s, x / s), new Qe.XiangliangTwo(w / s, _ / s)]) : t.uvs.push([new Qe.XiangliangTwo(y / s, g / s), new Qe.XiangliangTwo(A / s, x / s), new Qe.XiangliangTwo(dz / s, _ / s)]), t.uv2s.push([new Ke(0, 0), new Ke(1, 0), new Ke(1, 1)])) : (T = o ? 2 : 1, t.faces.push(new Qe.Face3(h, l, u, null, null, T)), L > z ? t.uvs.push([new Qe.XiangliangTwo(m / s, g / s), new Qe.XiangliangTwo(f / s, p / s), new Qe.XiangliangTwo(w / s, _ / s)]) : t.uvs.push([new Qe.XiangliangTwo(y / s, g / s), new Qe.XiangliangTwo(d / s, p / s), new Qe.XiangliangTwo(dz / s, _ / s)]), t.uv2s.push([new Ke(0, 0), new Ke(0, 1), new Ke(1, 1)]), t.faces.push(new Qe.Face3(c, h, u, null, null, T)), L > z ? t.uvs.push([new Qe.XiangliangTwo(v / s, x / s), new Qe.XiangliangTwo(m / s, g / s), new Qe.XiangliangTwo(w / s, _ / s)]) : t.uvs.push([new Qe.XiangliangTwo(A / s, x / s), new Qe.XiangliangTwo(y / s, g / s), new Qe.XiangliangTwo(dz / s, _ / s)]), t.uv2s.push([new Ke(1, 0), new Ke(0, 0), new Ke(1, 1)]))
			},
			generateBottom: function(t, e, i, r, a, n) {
				this.generateTop(t, e, i, r, a, !1, n)
			},
			generateTop: function(t, e, i, r, a, n, s) {
				var o, l, h, c, u, f, p, d, m, g, y, v, x, A, w, x, _, S, b, M, C;
				_ = (e + 1) % i, o = r[e], l = a[e], h = a[_], c = r[_], S = t.vertices[o], b = t.vertices[l], M = t.vertices[h], C = t.vertices[c], u = S.x, f = S.y, p = S.z, d = b.x, m = b.y, g = b.z, y = M.x, v = M.y, x = M.z, A = C.x, w = C.y, dz = C.z, n ? (t.faces.push(new Qe.Face3(o, l, c, null, null, 3)), t.uvs.push([new Qe.XiangliangTwo(u / s, p / s), new Qe.XiangliangTwo(d / s, g / s), new Qe.XiangliangTwo(A / s, dz / s)]), t.uv2s.push([new Ke(0, 1), new Ke(0, 0), new Ke(1, 1)]), t.faces.push(new Qe.Face3(l, h, c, null, null, 3)), t.uvs.push([new Qe.XiangliangTwo(d / s, g / s), new Qe.XiangliangTwo(y / s, x / s), new Qe.XiangliangTwo(A / s, dz / s)]), t.uv2s.push([new Ke(0, 0), new Ke(1, 0), new Ke(1, 1)])) : (t.faces.push(new Qe.Face3(l, o, c, null, null, 0)), t.uvs.push([new Qe.XiangliangTwo(d / s, g / s), new Qe.XiangliangTwo(u / s, p / s), new Qe.XiangliangTwo(A / s, dz / s)]), t.uv2s.push([new Ke(0, 0), new Ke(0, 1), new Ke(1, 1)]), t.faces.push(new Qe.Face3(h, l, c, null, null, 0)), t.uvs.push([new Qe.XiangliangTwo(y / s, x / s), new Qe.XiangliangTwo(d / s, g / s), new Qe.XiangliangTwo(A / s, dz / s)]), t.uv2s.push([new Ke(1, 0), new Ke(0, 0), new Ke(1, 1)]))
			},
			exchangeYZ: function(t) {
				var e = t.y;
				t.y = t.z, t.z = -e
			},
			addPoints: function(t, e, i, r, a) {
				e.multiplyScalar(.5), i.push((new Qe.XiangliangThree).subVectors(t, e)), r.push((new Qe.XiangliangThree).addVectors(t, e))
			},
			computeCurvePoint: function(t, e, i, r, a, n, s, o, l) {
				var h, c, f, p, d = r ? 0 : 1,
					m = new Qe.XiangliangThree,
					g = o;
				if (t) {
					c = t.getTangentAt(1), f = e.getTangentAt(0), concave = Qe.Math.isConcave(c, f, !1), f.multiplyScalar(-1), angle = c.angleTo(f), p = Math.sin(angle / 2), h = e.getPoint(0), p = 0 == p ? .1 : p;
					var y = concave ? i / p : -i / p;
					1 == p ? m.crossVectors(f, new Je(0, 0, 1)).normalize().multiplyScalar(y) : m.addVectors(c, f).normalize().multiplyScalar(y), this.addPoints(h, m, n, s, l)
				} else f = e.getTangentAt(d), h = e.getPoint(d), m.crossVectors(f, new Qe.XiangliangThree(0, 0, 1)).normalize().multiplyScalar(i), this.addPoints(h, m, n, s, l);
				if (!(e instanceof Qe.LineCurve3) && a) {
					var v = g + 1;
					for (j = 0; j < v - 2; j++) u = j / (v - 1), f = e.getTangentAt(u), h = e.getPointAt(u), m.crossVectors(f, new Qe.XiangliangThree(0, 0, 1)).normalize().multiplyScalar(i), j * e.getLength() / g > i / Math.abs(p) && this.addPoints(h, m, n, s, l)
				}
			},
			computePoints: function(t, e, i) {
				var r, a, n, s = (new Qe.XiangliangThree, t.isClockwise()),
					o = t.curves[0].getPoint(0),
					l = t.curves[t.curves.length - 1].getPoint(1);
				n = o.equals(l), a = t.curves.length;
				var h = [],
					c = [];
				new Qe.Path, t.getLength();
				for (r = 0; a > r; r++) {
					var u = r - 1;
					n && -1 === u && (u = a - 1);
					var f = t.curves[u],
						p = t.curves[r];
					this.computeCurvePoint(f, p, e, !0, !0, h, c, i, s), r === a - 1 && !n && this.computeCurvePoint(null, p, e, !1, !1, h, c, i, s)
				}
				return [h, c, n]
			}
		}), Qe.ShapeNode = function(t, e, i, r, a) {
			if (null == t) return t = [], this.materialSize = 3, Qe.Entity.call(this), void 0;
			var n;
			if (!(1 === arguments.length && arguments[0] instanceof Object) || arguments[0] instanceof Qe.Shape || arguments[0] instanceof Qe.Path && !Array.isArray(arguments[0])) this.options = {
				curveSegments: e,
				amount: i,
				vertical: r,
				zMinusHalfAmount: this.zMinusHalfAmount,
				repeat: a || 20
			};
			else {
				if (n = arguments[0], t = n.path, null == t) return t = [], this.materialSize = 3, Qe.Entity.call(this), void 0;
				e = n.curveSegments, i = n.amount, r = n.vertical, a = n.repeat, this.options = {
					curveSegments: n.curveSegments,
					amount: n.amount,
					vertical: n.vertical,
					zMinusHalfAmount: this.zMinusHalfAmount,
					repeat: n.repeat || 20
				}, this._id = n.id
			}
			var s = [];
			t instanceof Qe.Path ? (s = t.toShapes(), this.path = t) : s = t, this.curveSegments = e, this.amount = i, this.vertical = r, this.repeat = a, s = s instanceof Array ? s : [s], this.shapes = s, this.shapebb = s[s.length - 1].getBizBox(), this.materialSize = 3, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.ShapeNode, Qe.Entity, {
			constructor: Qe.ShapeNode,
			className: "TGL.ShapeNode",
			__accessor: ["path", "curveSegments", "amount", "vertical", "repeat"],
			__bool: ["vertical"],
			__SizePropeties: ["path", "curveSegments", "amount", "vertical", "repeat"],
			computeData: function() {
				return this.options = {
					curveSegments: this.curveSegments,
					amount: this.amount,
					vertical: this.vertical,
					zMinusHalfAmount: this.zMinusHalfAmount,
					repeat: this.repeat || 20
				}, this.addShapes(this.path, this.options)
			},
			addShapes: function(t, e) {
				var i = [];
				i = t instanceof Qe.Path ? t.toShapes() : t;
				var r = {};
				if (r.vertices = [], r.uvs = [], r.faces = [], !i) return r;
				for (var a = i.length, n = 0; a > n; n++) {
					var s = i[n];
					this.addShape(s, e, r)
				}
				var o = new Qe.BizBox;
				o.setFromPoints(r.vertices);
				var l = (o.max.y - o.min.y) / 2;
				if (e.zMinusHalfAmount)
					for (var h = 0; h < r.vertices.length; h++) r.vertices[h].y -= l;
				if (e.vertical)
					for (var h = 0; h < r.vertices.length; h++) {
						var c = r.vertices[h].y;
						r.vertices[h].y = r.vertices[h].z, r.vertices[h].z = -c
					}
				return r
			}
		}), Qe.ShapeNode.prototype.addShape = function(t, i, r) {
			function a(t, e, i) {
				return e || console.log("die"), e.clone().multiplyScalar(i).add(t)
			}

			function n(t, e, i) {
				return o(t, e, i)
			}

			function s(t, e, i) {
				var r = Math.atan2(e.y - t.y, e.x - t.x),
					a = Math.atan2(i.y - t.y, i.x - t.x);
				r > a && (a += 2 * Math.PI);
				var n = (r + a) / 2,
					s = -Math.cos(n),
					o = -Math.sin(n),
					l = new Qe.XiangliangTwo(s, o);
				return l
			}

			function o(t, e, i) {
				var r, a, n, o, l, h, c = Qe.ShapeNode.__v1,
					u = Qe.ShapeNode.__v2,
					f = Qe.ShapeNode.__v3,
					p = Qe.ShapeNode.__v4,
					d = Qe.ShapeNode.__v5,
					m = Qe.ShapeNode.__v6;
				return c.set(t.x - e.x, t.y - e.y), u.set(t.x - i.x, t.y - i.y), r = c.normalize(), a = u.normalize(), f.set(-r.y, r.x), p.set(a.y, -a.x), d.copy(t).add(f), m.copy(t).add(p), d.equals(m) ? p.clone() : (d.copy(e).add(f), m.copy(i).add(p), n = r.dot(p), o = m.sub(d).dot(p), 0 === n && (console.log("Either infinite or no solutions!"), 0 === o ? console.log("Its finite solutions.") : console.log("Too bad, no solutions.")), l = o / n, 0 > l ? s(t, e, i) : (h = r.multiplyScalar(l).add(d), h.sub(t).clone()))
			}

			function l() {
				if (A) {
					var t = 0,
						e = Y * t;
					for (K = 0; Z > K; K++) q = k[K], f(q[2] + e, q[1] + e, q[0] + e, !0);
					for (t = _ + 2 * x, e = Y * t, K = 0; Z > K; K++) q = k[K], f(q[0] + e, q[1] + e, q[2] + e, !1)
				} else {
					for (K = 0; Z > K; K++) q = k[K], f(q[2], q[1], q[0], !0);
					for (K = 0; Z > K; K++) q = k[K], f(q[0] + Y * _, q[1] + Y * _, q[2] + Y * _, !1)
				}
			}

			function h() {
				var t = 0;
				for (c(O, t), t += O.length, B = 0, N = V.length; N > B; B++) D = V[B], c(D, t), t += D.length
			}

			function c(t, e) {
				var i, r;
				for (K = t.length; --K >= 0;) {
					i = K, r = K - 1, 0 > r && (r = t.length - 1);
					var a = 0,
						n = _ + 2 * x;
					for (a = 0; n > a; a++) {
						var s = Y * a,
							o = Y * (a + 1),
							l = e + i + s,
							h = e + r + s,
							c = e + r + o,
							u = e + i + o;
						p(l, h, c, u, t, a, n, i, r)
					}
				}
			}

			function u(t, e, i) {
				r.vertices.push(new Qe.XiangliangThree(t, e, i - (g ? m / 2 : 0)))
			}

			function f(e, a, n, s) {
				if (e += R, a += R, n += R, Qe.Math.isClockwise([r.vertices[e], r.vertices[a], r.vertices[n]]), "z") {
					r.faces.push(new Qe.Face3(e, a, n, null, null, M));
					var o = s ? P.generateBottomUV(r, t, i, e, a, n) : P.generateTopUV(r, t, i, e, a, n);
					r.uvs.push(o)
				} else {
					r.faces.push(new Qe.Face3(e, n, a, null, null, M));
					var o = s ? P.generateBottomUV(r, t, i, e, n, a) : P.generateTopUV(r, t, i, e, n, a);
					r.uvs.push(o)
				}
			}

			function p(e, a, n, s, o, l, h, c, u) {
				if (e += R, a += R, n += R, s += R, Qe.Math.isClockwise([r.vertices[e], r.vertices[a], r.vertices[s]]), "z") {
					r.faces.push(new Qe.Face3(e, a, s, null, null, C)), r.faces.push(new Qe.Face3(a, n, s, null, null, C));
					var f = P.generateSideWallUV(r, t, o, i, e, a, n, s, l, h, c, u);
					r.uvs.push([f[0], f[1], f[3]]), r.uvs.push([f[1], f[2], f[3]])
				} else {
					r.faces.push(new Qe.Face3(e, s, a, null, null, C)), r.faces.push(new Qe.Face3(a, s, n, null, null, C));
					var f = P.generateSideWallUV(r, t, o, i, e, a, n, s, l, h, c, u);
					r.uvs.push([f[0], f[3], f[1]]), r.uvs.push([f[1], f[3], f[2]])
				}
			}
			var d, m = i.amount !== e ? i.amount : 100,
				g = i.zMinusHalfAmount !== e ? i.zMinusHalfAmount : !1,
				y = i.bevelThickness !== e ? i.bevelThickness : 6,
				v = i.bevelSize !== e ? i.bevelSize : y - 2,
				x = i.bevelSegments !== e ? i.bevelSegments : 3,
				A = i.bevelEnabled !== e ? i.bevelEnabled : !1,
				w = i.curveSegments !== e ? i.curveSegments : 12,
				_ = i.steps !== e ? i.steps : 1,
				S = i.extrudePath,
				b = !1,
				M = i.material || 0,
				C = i.extrudeMaterial || 1,
				P = i.UVGenerator !== e ? i.UVGenerator : Qe.ShapeNode.WorldUVGenerator;
			P.repeat = i.repeat;
			var T, z, L, E;
			this.shapebb;
			S && (d = S.getSpacedPoints(_), b = !0, A = !1, T = i.frames !== e ? i.frames : Qe.PathNode.prototype.frenetFrames(S, _, !1), z = new Qe.XiangliangThree, L = new Qe.XiangliangThree, E = new Qe.XiangliangThree), A || (x = 0, y = 0, v = 0);
			var D, B, N, R = r.vertices.length,
				I = t.extractPoints(w),
				F = I.shape,
				V = I.holes,
				U = !Qe.Shape.Utils.isClockWise(F);
			if (U) {
				for (F = F.reverse(), B = 0, N = V.length; N > B; B++) D = V[B], Qe.Shape.Utils.isClockWise(D) && (V[B] = D.reverse());
				U = !1
			}
			var k = Qe.Shape.Utils.triangulateShape(F, V),
				O = F;
			for (B = 0, N = V.length; N > B; B++) D = V[B], F = F.concat(D);
			for (var X, G, W, H, j, q, Y = F.length, Z = k.length, Q = (O.length, 180 / Math.PI, []), K = 0, J = O.length, $ = J - 1, tt = K + 1; J > K; K++, $++, tt++) {
				$ === J && ($ = 0), tt === J && (tt = 0);
				O[K], O[$], O[tt];
				Q[K] = n(O[K], O[$], O[tt])
			}
			var et, it = [],
				rt = Q.concat();
			for (B = 0, N = V.length; N > B; B++) {
				for (D = V[B], et = [], K = 0, J = D.length, $ = J - 1, tt = K + 1; J > K; K++, $++, tt++) $ === J && ($ = 0), tt === J && (tt = 0), et[K] = n(D[K], D[$], D[tt]);
				it.push(et), rt = rt.concat(et)
			}
			for (X = 0; x > X; X++) {
				for (W = X / x, H = y * (1 - W), G = v * Math.sin(W * Math.PI / 2), K = 0, J = O.length; J > K; K++) j = a(O[K], Q[K], G), u(j.x, j.y, -H);
				for (B = 0, N = V.length; N > B; B++)
					for (D = V[B], et = it[B], K = 0, J = D.length; J > K; K++) j = a(D[K], et[K], G), u(j.x, j.y, -H)
			}
			for (G = v, K = 0; Y > K; K++) j = A ? a(F[K], rt[K], G) : F[K], b ? (L.copy(T.normals[0]).multiplyScalar(j.x), z.copy(T.binormals[0]).multiplyScalar(j.y), E.copy(d[0]).add(L).add(z), u(E.x, E.y, E.z)) : u(j.x, j.y, 0);
			var at;
			for (at = 1; _ >= at; at++)
				for (K = 0; Y > K; K++) j = A ? a(F[K], rt[K], G) : F[K], b ? (L.copy(T.normals[at]).multiplyScalar(j.x), z.copy(T.binormals[at]).multiplyScalar(j.y), E.copy(d[at]).add(L).add(z), u(E.x, E.y, E.z)) : u(j.x, j.y, m / _ * at);
			for (X = x - 1; X >= 0; X--) {
				for (W = X / x, H = y * (1 - W), G = v * Math.sin(W * Math.PI / 2), K = 0, J = O.length; J > K; K++) j = a(O[K], Q[K], G), u(j.x, j.y, m + H);
				for (B = 0, N = V.length; N > B; B++)
					for (D = V[B], et = it[B], K = 0, J = D.length; J > K; K++) j = a(D[K], et[K], G), b ? u(j.x, j.y + d[_ - 1].y, d[_ - 1].x + H) : u(j.x, j.y, m + H)
			}
			l(), h()
		}, Qe.ShapeNode.WorldUVGenerator = {
			generateTopUV: function(t, e, i, r, a, n) {
				var s = t.vertices[r].x,
					o = t.vertices[r].y,
					l = t.vertices[a].x,
					h = t.vertices[a].y,
					c = t.vertices[n].x,
					u = t.vertices[n].y;
				return [new Qe.XiangliangTwo(s / this.repeat, o / this.repeat), new Qe.XiangliangTwo(l / this.repeat, h / this.repeat), new Qe.XiangliangTwo(c / this.repeat, u / this.repeat)]
			},
			generateBottomUV: function(t, e, i, r, a, n) {
				return this.generateTopUV(t, e, i, r, a, n)
			},
			uv: function(t, e, i) {
				return new Ke(Math.sqrt(t * t + e * e) / this.repeat, (1 - i) / this.repeat)
			},
			generateSideWallUV: function(t, e, i, r, a, n, s, o, l, h, c, u) {
				var f = t.vertices[a].x,
					p = t.vertices[a].y,
					d = t.vertices[a].z,
					m = t.vertices[n].x,
					g = t.vertices[n].y,
					y = t.vertices[n].z,
					v = t.vertices[s].x,
					x = t.vertices[s].y,
					A = t.vertices[s].z,
					w = t.vertices[o].x,
					_ = t.vertices[o].y,
					S = t.vertices[o].z,
					b = Math.abs(p - g),
					M = Math.abs(f - m);
				return M > b ? [new Qe.XiangliangTwo(f / this.repeat, (1 - d) / this.repeat), new Qe.XiangliangTwo(m / this.repeat, (1 - y) / this.repeat), new Qe.XiangliangTwo(v / this.repeat, (1 - A) / this.repeat), new Qe.XiangliangTwo(w / this.repeat, (1 - S) / this.repeat)] : [new Qe.XiangliangTwo(p / this.repeat, (1 - d) / this.repeat), new Qe.XiangliangTwo(g / this.repeat, (1 - y) / this.repeat), new Qe.XiangliangTwo(x / this.repeat, (1 - A) / this.repeat), new Qe.XiangliangTwo(_ / this.repeat, (1 - S) / this.repeat)]
			}
		}, Qe.ShapeNode.__v1 = new Qe.XiangliangTwo, Qe.ShapeNode.__v2 = new Qe.XiangliangTwo, Qe.ShapeNode.__v3 = new Qe.XiangliangTwo, Qe.ShapeNode.__v4 = new Qe.XiangliangTwo, Qe.ShapeNode.__v5 = new Qe.XiangliangTwo, Qe.ShapeNode.__v6 = new Qe.XiangliangTwo, Qe.TextNode = function(t, i, r, a, n, s, o) {
			var l;
			1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0]) ? (l = arguments[0], t = l.text, this.font = l.font || "helvetiker", this.size = l.size || 150, this.weight = l.weight || "normal", this.fontStyle = l.fontStyle || "normal", this.height = l.height || 50, this._id = l.id, this.curveSegments = l.curveSegments) : (this.font = a || "helvetiker", this.size = i || 150, this.weight = n || "normal", this.fontStyle = s || "normal", this.height = r || 50, this.curveSegments = o);
			var h = {
				size: this.size,
				height: this.height,
				font: this.font,
				weight: this.weight,
				style: this.fontStyle,
				curveSegments: this.curveSegments || 30,
				bevelEnabled: !1,
				zMinusHalfAmount: !0
			};
			this.text = t;
			var c = Qe.FontUtils.generateShapes(t, h);
			h.amount = h.height !== e ? h.height : 50, h.bevelThickness === e && (h.bevelThickness = 10), h.bevelSize === e && (h.bevelSize = 8), h.bevelEnabled === e && (h.bevelEnabled = !1), Qe.ShapeNode.call(this, c, h.curveSegments, this.height, !1, 50, !0)
		}, Qe.extend(Qe.TextNode, Qe.ShapeNode, {
			constructor: Qe.TextNode,
			className: "TGL.TextNode",
			__accessor: ["text", "size", "height", "font", "weight", "fontStyle"],
			__SizePropeties: ["text", "size", "height", "font", "weight", "fontStyle"],
			computeData: function() {
				var t = {
						size: this.size,
						height: this.height,
						font: this.font,
						weight: this.weight,
						style: this.fontStyle,
						curveSegments: this.curveSegments || 30,
						bevelEnabled: !1,
						zMinusHalfAmount: !0
					},
					e = {
						curveSegments: this.curveSegments,
						amount: this.height,
						vertical: !1,
						zMinusHalfAmount: !0,
						repeat: 20
					},
					i = Qe.FontUtils.generateShapes(this.text, t);
				return Qe.ShapeNode.prototype.addShapes.call(this, i, e)
			}
		}), Qe.LatheNode = function(t, i, r, a, n, s) {
			this.materialSize = 3;
			var o;
			1 === arguments.length && arguments[0] instanceof Object && !(arguments[0] instanceof Qe.Path) ? (o = arguments[0], this.path = o.path, this.segmentsH = o.segmentsH || 64, this.segmentsR = o.segmentsR || 20, this.arc = o.arc != e ? o.arc : 2 * Math.PI, this.startClosed = o.startClosed, this.endClosed = o.endClosed, this._id = o.id) : (this.path = t, this.segmentsH = i || 64, this.segmentsR = r || 20, this.arc = a != e ? a : 2 * Math.PI, this.startClosed = n, this.endClosed = s), Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.LatheNode, Qe.Entity, {
			constructor: Qe.LatheNode,
			className: "TGL.LatheNode",
			__accessor: ["path", "segmentsH", "segmentsR", "arc", "startClosed", "endClosed"],
			__SizePropeties: ["path", "segmentsH", "segmentsR", "arc", "startClosed", "endClosed"],
			computeData: function() {
				function t(t) {
					var e = t.x,
						i = t.z,
						r = ((0 === i ? e / Math.abs(e) : e / Math.abs(i)) + 1) / 2;
					r = Qe.Math.clamp(r, 0, 1);
					var a = ((0 === e ? i / Math.abs(i) : i / Math.abs(e)) + 1) / 2;
					return a = Qe.Math.clamp(a, 0, 1), new Qe.XiangliangTwo(r, a)
				}
				var e = {},
					e = {};
				if (e.faces = [], e.uvs = [], e.vertices = [], null == this.path) return e;
				var i, r, n, s, o, l, h, u = [],
					f = this.path,
					p = this.segmentsH,
					d = this.segmentsR;
				for (Qe.Shape.Utils.isClockWise(f.getPoints()) || (f = f.reverse()), r = 0; p >= r; r++) {
					for (i = f.getPoint(r / p), u[r] = [], s = Math.abs(i.x), o = i.y, this.startClosed && 0 === r && e.vertices.push(new Qe.XiangliangThree(0, o, 0)), n = 0; d > n; n++) h = n / d * this.arc, l = new Qe.XiangliangThree(s * Math.cos(h), o, s * Math.sin(h)), u[r][n] = e.vertices.push(l) - 1;
					this.endClosed && r === p && e.vertices.push(new Qe.XiangliangThree(0, o, 0))
				}
				var m = this.arc == 2 * Math.PI;
				if (this.startClosed)
					for (a = 0, n = 0;
						(m ? d : d - 1) > n; n++) jp = (n + 1) % d, b = u[0][n], c = u[0][jp], uva = new Qe.XiangliangTwo(.5, .5), uvb = t(e.vertices[b]), uvc = t(e.vertices[c]), e.faces.push(new Qe.Face3(a, b, c)), e.uvs.push([uva, uvb, uvc]);
				for (r = 0; p > r; r++)
					for (n = 0;
						(m ? d : d - 1) > n; n++) ip = r + 1, jp = (n + 1) % d, a = u[r][n], b = u[ip][n], c = u[ip][jp], qi = u[r][jp], uva = new Qe.XiangliangTwo(r / p, n / d), uvb = new Qe.XiangliangTwo((r + 1) / p, n / d), uvc = new Qe.XiangliangTwo((r + 1) / p, (n + 1) / d), uvd = new Qe.XiangliangTwo(r / p, (n + 1) / d), e.faces.push(new Qe.Face3(a, b, qi)), e.uvs.push([uva, uvb, uvd]), e.faces.push(new Qe.Face3(b, c, qi)), e.uvs.push([uvb.clone(), uvc, uvd.clone()]);
				if (this.endClosed)
					for (a = e.vertices.length - 1, n = 0;
						(m ? d : d - 1) > n; n++) jp = (n + 1) % d, b = u[u.length - 1][n], c = u[u.length - 1][jp], uva = new Qe.XiangliangTwo(0, 0), uvb = new Qe.XiangliangTwo(1, n / d), uvc = new Qe.XiangliangTwo(1, (n + 1) / d), e.faces.push(new Qe.Face3(a, b, c)), e.uvs.push([uva, uvb, uvc]);
				return e
			}
		}), Qe.CurvePlane = function(t, e, i, r) {
			this.pathH = t, this.pathV = e, this.segmentsH = i || 20, this.segmentsV = r || 20, Qe.Entity.call(this)
		}, Qe.extend(Qe.CurvePlane, Qe.Entity, {
			constructor: Qe.CurvePlane,
			className: "TGL.CurvePlane",
			computeData: function() {
				var t = {};
				if (t.faces = [], t.uvs = [], t.vertices = [], null == this.pathV || null == this.pathH) return t;
				var e, i, r, a, n, s, o, l, h, c = this.pathV,
					u = this.pathH,
					f = this.segmentsV,
					p = this.segmentsH,
					d = f + 1,
					m = p + 1;
				for (this.grid = [], e = 0; m > e; e++) {
					this.grid[e] = [];
					var g = u.getPointAt(e / m);
					for (i = 0; d > i; i++) {
						var y = c.getPointAt(i / d);
						this.grid[e][i] = t.vertices.push(new Je(g.x, y.y, g.z + y.z)) - 1
					}
				}
				for (e = 0; p > e; e++)
					for (i = 0; f > i; i++) r = this.grid[e][i], a = this.grid[e][i + 1], n = this.grid[e + 1][i + 1], s = this.grid[e + 1][i], o = new Ke(e / m, i / d), l = new Ke(e / m, (i + 1) / d), uvc = new Ke((e + 1) / m, (i + 1) / d), h = new Ke((e + 1) / m, i / d), t.faces.push(new mi(r, n, a)), t.uvs.push([o, uvc, l]), t.faces.push(new mi(r, s, n)), t.uvs.push([o.clone(), h.clone(), uvc]);
				return t
			}
		}), Qe.ComboNode = function(t, e, i, r, a) {
			if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
				var n = t;
				this.combos = n.combos || [], this.operators = n.operators, this.centralized = i, this.names = a, this._id = n.id
			} else this.combos = t || [], this.operators = e, this.centralized = i, this._id = r, this.names = a;
			this.csgs = [], Qe.Entity.call(this)
		}, Qe.extend(Qe.ComboNode, Qe.Entity, {
			constructor: Qe.ComboNode,
			className: "TGL.ComboNode",
			__accessor: ["combos", "operators", "centralized", "names"],
			__SizePropeties: ["combos", "operators", "centralized"],
			getOffsetPosition: function() {
				return this._offsetPosition
			},
			getSideIndexMapping: function() {
				var t, e, i, r, a = this.combos,
					n = this.names || [],
					s = {},
					o = 0;
				if (a && a.length)
					for (i = 0; i < a.length; i++) {
						t = a[i], e = n[i], e || (r = t.getClassName(), r && r.indexOf(".") > 0 && (r = r.substr(r.lastIndexOf(".") + 1)), e = r + "" + i, e = e.toLowerCase());
						var l = t.getSideIndexMapping();
						if (l)
							for (var h in l) s[e + "-" + h] = o++;
						else s[e] = o++
					}
				return s
			},
			computeData: function() {
				this.csgs = [];
				var t = {
					vertices: [],
					faces: [],
					uvs: [],
					uv2s: []
				};
				if (!this.combos) return t;
				if (null == this.operators || 0 == this.operators.length) {
					var i = xi.mergeElements(this.combos);
					if (this.materialSize = i.material.materials.length, this.material = i.material, this.orgMaterial = i.material, t = {
							vertices: i.vertices,
							faces: i.faces,
							uvs: i.uvs,
							uv2s: i.uv2s || []
						}, this.centralized && t.vertices) {
						var r = new Qe.BizBox;
						r.setFromPoints(t.vertices);
						var a = r.center();
						for (s = 0; s < t.vertices.length; s++) {
							var n = t.vertices[s];
							n.sub(a)
						}
						this._offsetPosition = a
					}
					return t
				}
				this.operators = this.operators || [];
				var s, o, l, h, c = this.combos.length;
				for (s = 0; c > s; s++) this.csgs.push(new Qe.CSG(this.combos[s]));
				for (s = 0; c > s; s++) null == o ? o = this.csgs[s] : (l = this.operators[s - 1], "+" === l || l == e ? o = o.union(this.csgs[s]) : "-" === l ? o = o.substract(this.csgs[s]) : "^" === l && (o = o.intersect(this.csgs[s])));
				if (!o) return t;
				if (h = o.toMesh(), ("centralized" != this.changeProperty || null == this.material) && (this.materialSize = h.material.materials.length, this.material = h.material, this.orgMaterial = h.material), t = {
						vertices: h.vertices,
						faces: h.faces,
						uvs: h.uvs,
						uv2s: h.uv2s
					}, this.centralized && t.vertices) {
					var r = new Qe.BizBox;
					r.setFromPoints(t.vertices);
					var a = r.center();
					for (s = 0; s < t.vertices.length; s++) {
						var n = t.vertices[s];
						n.sub(a)
					}
					this._offsetPosition = a
				}
				return h = e, t
			},
			computeNodeMaterial: function(t) {
				this.material = t.material, this.materialSize = t.materialSize
			},
			cacheNodeMaterial: function(t) {
				t.material = this.material, t.materialSize = this.materialSize
			},
			needComputeVertexNormal: function() {
				return !0
			},
			generatePrimitiveKey: function() {
				return null
			},
			changeMapping: function(t) {
				var e = this.getMaterialMapping();
				Qe.Utils.isSame(t, e) || (this.batch ? this.materialMappingChanges = [t, e] : (this.onMaterialMapping(), this.firePropertyChange("materialMapping", t, e)))
			},
			isStyleEquals: function(t, e, i) {
				return !1
			},
			getSelectStyle: function() {
				var t = this.getStyle("select.style");
				return ("outline.normal" == t || "outline" == t) && (t = "outline.wireframe"), t
			},
			onMaterialMapping: function() {
				this.groups = e, this.primitive.groups = e
			}
		}), Qe.Terrain = function(t) {
			if (t = t || {}, this._id = t.id, this.width = t.width, this.depth = t.depth, this.segmentsW = t.segmentsW || 30, this.segmentsD = t.segmentsD || 30, this.heightMap = t.heightMap, this.heightUnit = t.heightUnit || 1, this.maxHeight = t.maxHeight || 255, this.minHeight = t.minHeight || 0, this.baseLayerHeight = t.baseLayerHeight || 0, "string" == typeof this.heightMap ? (this.image = new Image, this.image.src = this.heightMap) : ei.isCanvas(this.heightMap) ? this.canvas = this.heightMap : ei.isImage(this.heightMap) && (this.image = this.heightMap), this.image) {
				var e = this;
				this.image.onload = function(t) {
					var i = document.createElement("canvas");
					i.width = e.image.width, i.height = e.image.height;
					var r = i.getContext("2d");
					r.drawImage(e.image, 0, 0), e.canvas = i, e.computed = !1, e.computeNodeData(), e.firePropertyChange("width", 0, 1)
				}
			}
			this.materialSize = 2, Qe.Entity.call(this), this.computeCentroids(), this.computeFaceNormals()
		}, Qe.extend(Qe.Terrain, Qe.Entity, {
			constructor: Qe.Terrain,
			className: "TGL.Terrain",
			__accessor: ["width", "heightUnit", "depth", " segmentsW", "segmentsD", " heightMap", "heightUnit", "maxHeight", " minHeight", "baseLayerHeight", "smooth"],
			__SizePropeties: ["width", "heightUnit", "depth", " segmentsW", "segmentsD", " heightMap", "heightUnit", "maxHeight", " minHeight", "baseLayerHeight", "smooth"],
			__bool: ["smooth"],
			computeLayerData: function(t, e, i) {
				var r, a, n = this.width / 2,
					s = this.depth / 2,
					o = i ? this.segmentsW : 1,
					l = i ? this.segmentsD : 1,
					h = o + 1,
					c = l + 1,
					u = this.width / o,
					f = this.depth / l,
					p = new Qe.XiangliangThree(0, 0, 1),
					d = t.vertices.length;
				for (a = 0; c > a; a++)
					for (r = 0; h > r; r++) {
						var m = r * u - n,
							g = a * f - s,
							y = 0;
						y = i ? i.call(this, r / h, a / c) : this.baseLayerHeight * this.heightUnit, t.vertices.push(new Qe.XiangliangThree(m, y, g))
					}
				for (a = 0; l > a; a++)
					for (r = 0; o > r; r++) {
						var v = r + h * a + d,
							x = r + h * (a + 1) + d,
							A = r + 1 + h * (a + 1) + d,
							w = r + 1 + h * a + d,
							_ = new Qe.XiangliangTwo(r / o, 1 - a / l),
							S = new Qe.XiangliangTwo(r / o, 1 - (a + 1) / l),
							b = new Qe.XiangliangTwo((r + 1) / o, 1 - (a + 1) / l),
							M = new Qe.XiangliangTwo((r + 1) / o, 1 - a / l);
						if (i) {
							var C = new Qe.Face3(v, x, w);
							C.materialIndex = e, t.faces.push(C), t.uvs.push([_, S, M]), C = new Qe.Face3(x, A, w), C.materialIndex = e, t.faces.push(C), t.uvs.push([S.clone(), b, M.clone()])
						} else {
							var C = new Qe.Face4(v, x, A, w);
							C.normal.copy(p), C.vertexNormals.push(p.clone(), p.clone(), p.clone(), p.clone()), C.materialIndex = e, t.faces.push(C), t.uvs.push([_, S, b, M])
						}
					}
			},
			computeData: function() {
				var t = {};
				return t.vertices = [], t.faces = [], t.uvs = [], this.computeLayerData(t, 0), this.computeLayerData(t, 1, this.getHeight), t
			},
			getFaceNormal: function(t, e) {
				this.computeFaceNormals();
				var i = this.segmentsW * t,
					r = this.segmentsD * e,
					a = Math.floor(i),
					n = Math.floor(r),
					s = n * this.segmentsW + a;
				s = 2 * s + 1, a != Math.round(i) && n != Math.round(r) && s++;
				var o = this.faces[s];
				this.vertices[o.a], this.vertices[o.b], this.vertices[o.c];
				return o.normal.clone()
			},
			getHeight: function(t, e) {
				if (null == this.canvas) return 0;
				var i = this.canvas;
				if (null == this.heightData) {
					for (var r = i.width * i.height, a = new Float32Array(r), n = 0; r > n; n++) a[n] = 0;
					for (var s = i.getContext("2d"), o = s.getImageData(0, 0, i.width, i.height), l = o.data, h = 0, n = 0, c = l.length; c > n; n += 4) {
						var u = l[n] + l[n + 1] + l[n + 2];
						a[h++] = u / 3
					}
					this.heightData = a
				}
				var f = t * i.width,
					p = e * i.height,
					d = Math.floor(f),
					m = Math.floor(p),
					g = [],
					y = [];
				g.push(d), f != d && g.push(d + 1), y.push(m), p != m && y.push(m + 1);
				var n, h, v, x = g.length * y.length,
					A = 0;
				for (n = 0; n < g.length; n++)
					for (h = 0; h < y.length; h++) v = y[h] * i.width + g[n], A += this.heightData[v];
				return A /= x, A = Qe.Math.clamp(A, this.minHeight, this.maxHeight), A *= this.heightUnit
			},
			getSideIndexMapping: function() {
				return Qe.Terrain.SideIndexMapping
			},
			refreshUniforms: function(t) {
				t.heightUnit && (t.heightUnit.value = this.heightUnit)
			}
		}), Qe.Terrain.SideIndexMapping = {
			layer0: 0,
			layer1: 1
		}, Qe.Link = function(t, e, i) {
			if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
				var r = arguments[0];
				t = r.fromNode, e = r.toNode, this._id = r.id
			} else this._id = i;
			Qe.Line.call(this), this.setFromNode(t), this.setToNode(e), this._editable = !1
		}, Qe.extend(Qe.Link, Qe.Line, {
			className: "TGL.Link",
			___accessor: ["linkType", "extend", "controls"],
			__SizePropeties: ["fromNode", "toNode", "linkType", "extend", "controls"],
			setFromNode: function(t) {
				if (this._fromNode != t) {
					var e = this._fromNode;
					this._fromNode = t, this.onPropertyChange(), this.firePropertyChange("fromNode", e, t), this._fromNode = t, e && (e._removeFromLink(this), e.removePropertyChangeListener(this.handleNodePropertyChange)), this._fromNode && (this._fromNode._addFromLink(this), this._fromNode.addPropertyChangeListener(this.handleNodePropertyChange, this))
				}
			},
			getFromNode: function() {
				return this._fromNode
			},
			setToNode: function(t) {
				if (this._toNode != t) {
					var e = this._toNode;
					this._toNode = t, this.onPropertyChange(), this.firePropertyChange("toNode", e, t), e && (e.removePropertyChangeListener(this.handleNodePropertyChange), e._removeToLink(this)), this._toNode && (this._toNode._addToLink(this), this._toNode.addPropertyChangeListener(this.handleNodePropertyChange, this))
				}
			},
			getToNode: function() {
				return this._toNode
			},
			isLooped: function() {
				return this._fromNode === this._toNode && null != this._fromNode && null != this._toNode
			},
			handleNodePropertyChange: function(t) {
				if (t.property.startsWith("position") || "worldMatrix" == t.property) {
					var e = this.vertices;
					this.onPropertyChange(), this.firePropertyChange("vertices", e, this.vertices)
				}
			},
			computeNodeData: function() {
				this.computeData()
			},
			updateMatrix: function() {},
			updateWorldMatrix: function() {},
			computeData: function() {
				if (null != this._fromNode && null != this._toNode) {
					null == this._extend && (this._extend = 0);
					var t = this._fromNode.worldMatrix.getPosition(),
						e = this._toNode.worldMatrix.getPosition(),
						i = [];
					if (i.push(t.clone()), "orthogonal.x" == this._linkType) {
						var r = Math.max(t.x, e.x),
							a = new Je(r + this._extend, t.y, t.z);
						i.push(a), a = new Je(r + this._extend, e.y, e.z), i.push(a)
					} else if ("orthogonal.x.n" == this._linkType) {
						var n = Math.min(t.x, e.x),
							a = new Je(n - this._extend, t.y, t.z);
						i.push(a), a = new Je(n - this._extend, e.y, e.z), i.push(a)
					} else if ("orthogonal.y" == this._linkType) {
						var s = Math.max(t.y, e.y),
							a = new Je(t.x, s + this._extend, t.z);
						i.push(a), a = new Je(e.x, s + this._extend, e.z), i.push(a)
					} else if ("orthogonal.y.n" == this._linkType) {
						var o = Math.min(t.y, e.y),
							a = new Je(t.x, o - this._extend, t.z);
						i.push(a), a = new Je(e.x, o - this._extend, e.z), i.push(a)
					} else if ("orthogonal.z" == this._linkType) {
						var l = Math.max(t.z, e.z),
							a = new Je(t.x, t.y, l + this._extend);
						i.push(a), a = new Je(e.x, e.y, l + this._extend), i.push(a)
					} else if ("orthogonal.z.n" == this._linkType) {
						var h = Math.min(t.z, e.z),
							a = new Je(t.x, t.y, h - this._extend);
						i.push(a), a = new Je(e.x, e.y, h - this._extend), i.push(a)
					} else if ("control" == this._linkType) {
						var c = this._controls;
						if (c && c.length > 0)
							for (var u = 0; u < c.length; u++) c[u] instanceof Je && i.push(c[u].clone())
					}
					i.push(e.clone()), this.vertices = i
				}
			},
			onPropertyChange: function() {
				this.vertices = this.vertices || [], this.computeData(), this.computeBizBox(), this.selectionData = null, this.boundingSphere = null
			}
		}), Qe.PathLink = function(t, e, i) {
			if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
				var r = arguments[0];
				t = r.fromNode, e = r.toNode, this._id = r.id
			} else this._id = i;
			Qe.PathNode.call(this), this._autoAjust = !0, this.setFromNode(t), this.setToNode(e)
		}, Qe.PathLink.allLinkTypes = ["extend.x", "extend.y", "extend.z", "extend.x.n", "extend.y.n", "extend.z.n", "orthogonal.x", "orthogonal.y", "orthogonal.z", "orthogonal.x.n", "orthogonal.y.n", "orthogonal.z.n", "flex.x", "flex.y", "flex.z", "flex.yz", "flex.xz", "flex.xy"], Qe.extend(Qe.PathLink, Qe.PathNode, {
			className: "TGL.PathLink",
			___accessor: ["linkType", "extend", "controls", "fromOffset", "toOffset"],
			__SizePropeties: ["fromOffset", "toOffset", "path", "segments", "radius", "segmentsR", "startCap", "endCap", "shape", "startCapSize", "endCapSize", "segmentsCap", "arc", "arcStart", "cutSurface", "startCapR", "endCapR", "startCapExtend", "endCapExtend", "fromNode", "toNode", "linkType", "extend", "controls"],
			setFromNode: function(t) {
				if (this._fromNode != t) {
					var e = this._fromNode;
					this._fromNode = t, this._dirtyPath = !0, this.onPropertyChange("fromNode", e, t), this.firePropertyChange("fromNode", e, t), this._fromNode = t, e && (e._removeFromLink(this), e.removePropertyChangeListener(this.handleNodePropertyChange)), this._fromNode && (this._fromNode._addFromLink(this), this._fromNode.addPropertyChangeListener(this.handleNodePropertyChange, this))
				}
			},
			getFromNode: function() {
				return this._fromNode
			},
			setToNode: function(t) {
				if (this._toNode != t) {
					var e = this._toNode;
					this._toNode = t, this.onPropertyChange("toNode", e, t), this.firePropertyChange("toNode", e, t), e && (e.removePropertyChangeListener(this.handleNodePropertyChange), e._removeToLink(this)), this._toNode && (this._toNode._addToLink(this), this._toNode.addPropertyChangeListener(this.handleNodePropertyChange, this))
				}
			},
			getToNode: function() {
				return this._toNode
			},
			isLooped: function() {
				return this._fromNode === this._toNode && null != this._fromNode && null != this._toNode
			},
			handleNodePropertyChange: function(t) {
				var e = t.source,
					i = t.property;
				if (i.startsWith("position") || i.startsWith("rotation") || i.startsWith("scale") || "worldMatrix" == i || "linkAgent" === i || e.isSizeChangedProperty(i) || "parent" === i) {
					this.vertices;
					this._dirtyPath = !0;
					var r = this;
					vi.PATH_LINK_COMPUTE_DELAY ? setTimeout(function() {
						r._computePath()
					}, 10) : r._computePath()
				}
			},
			_resetPath: function() {
				if (this.path) {
					var t = !1;
					if ("arrow" !== this.endCap) return this.path;
					if (this.endCapExtend * this.endCapR > 1) return this.path;
					t = !0;
					var e, i, r, a = this.path,
						n = new Qe.Path,
						s = a.actions.length,
						o = null;
					for (i = 0; s - 1 > i; i++) e = a.actions[i], r = e.args, o = new Qe.XiangliangThree(r[0], r[1], r[2]), "moveTo" === e.action ? n.moveTo(r[0], r[1], r[2]) : "lineTo" === e.action ? n.lineTo(r[0], r[1], r[2]) : "quadraticCurveTo" === e.action && (n.curveTo(r[0], r[1], r[2], r[3], r[4], r[5]), o = new Qe.XiangliangThree(r[3], r[4], r[5]));
					if (i = s - 1, e = a.actions[i], r = e.args, "lineTo" === e.action) {
						var l = new Qe.XiangliangThree(r[0], r[1], r[2]),
							h = (new Je).subVectors(l, o).normalize(),
							s = this.radius * this.endCapSize,
							c = null;
						c = (new Je).subVectors(l, o).length() < s ? o.add(h.multiplyScalar(.1)) : l.clone().sub(h.multiplyScalar(s)), n.lineTo(c.x, c.y, c.z)
					}
					return n
				}
			},
			_getNodeOffset: function(t, e, i) {
				e = t.worldToLocal(e.clone()), i = t.worldToLocal(i.clone());
				var r = (new Je).subVectors(i, e),
					a = r.length(),
					n = t.getLinkOffset(r);
				return n && n.length() > a && n.normalize().multiplyScalar(a - .1), n || new Je(0, 0, 0)
			},
			updateMatrix: function() {},
			updateWorldMatrix: function(t, e) {},
			onPropertyChange: function(t, e, i) {
				("fromNode" === t || "toNode" === t || "linkType" === t || "extend" === t || "controls" === t || "fromOffset" === t || "toOffset" === t) && (this._dirtyPath = !0), Qe.Node.prototype.onPropertyChange.call(this, t, e, i)
			},
			computeData: function() {
				return this._computePath(), Qe.PathNode.prototype.computeData.call(this)
			},
			_clearFromNodeExtend: function(t, e, i) {},
			_flex: function(t, e, i, r, a) {
				t = t.substr(t.indexOf(".") + 1);
				for (var n, s = ["x", "y", "z"], o = new Je, l = new Je, h = 0; 3 > h; h++) n = s[h], o[n] = n === t ? r[n] : e[n], l[n] = n === t ? r[n] : i[n];
				a.push(o, l)
			},
			_flex2: function(t, e, i, r) {
				t = t.substr(t.indexOf(".") + 1);
				var a = ["x", "y", "z"],
					n = t[0],
					s = t[1];
				if (e[n] != i[n]) {
					for (var o = new mono.XiangliangThree, l = 0; l < a.length; l++) o[a[l]] = a[l] == n ? i[a[l]] : e[a[l]];
					r.push(o)
				}
				if (e[s] != i[s]) {
					for (var h = new mono.XiangliangThree, l = 0; l < a.length; l++) h[a[l]] = a[l] == n || a[l] == s ? i[a[l]] : e[a[l]];
					r.push(h)
				}
			},
			_orthogonal: function(t, e, i, r) {
				t = t.substr(t.indexOf(".") + 1);
				var a, n = !1,
					s = ["x", "y", "z"],
					o = new Je,
					l = 0;
				t.endsWith(".n") && (n = !0, t = t[0]);
				for (var h = n ? e[t] : i[t], c = 0; c < s.length; c++) a = s[c], a !== t && e[a] == i[a] && l++;
				if (2 !== l) {
					for (var c = 0; c < s.length; c++) a = s[c], a !== t ? o[a] = h : o[a] = n ? i[a] : e[a];
					r.push(o)
				}
			},
			_removeSamePoint: function(t) {},
			_computePath: function() {
				if (this._dirtyPath && (this._dirtyPath = !1, null != this._fromNode && null != this._toNode)) {
					null == this._extend && (this._extend = 0);
					var t = this._fromNode.getLinkAgent() || this._fromNode,
						e = this._toNode.getLinkAgent() || this._toNode,
						i = t.localToWorld2(new Je(0, 0, 0)),
						r = e.localToWorld2(new Je(0, 0, 0));
					if (t == e) {
						var a = new mono.Path;
						return a.moveTo(i.x, i.y, i.z), a.lineTo(i.x, i.y + 200, i.z), a.lineTo(i.x + 200, i.y + 200, i.z), a.lineTo(i.x + 200, i.y, i.z), a.lineTo(i.x, i.y, i.z), this.setPath(a), a
					}
					if (i.equals(r)) return void this.setPath(null);
					var a, n, s = [],
						o = this.radius * this.endCapSize;
					if (this._linkType && this._linkType.startsWith("extend")) {
						var i, r, l, h, c, u, f;
						if ("extend.x" === this._linkType) {
							l = new Je(1, 0, 0);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.max(i.x, r.x), u = f + this._extend + o + .1, h = new Je(u, i.y, i.z), c = new Je(u, r.y, r.z)
						} else if ("extend.y" === this._linkType) {
							l = new Je(0, 1, 0);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.max(i.y, r.y), u = f + this._extend + o + .1, h = new Je(i.x, u, i.z), c = new Je(r.x, u, r.z)
						} else if ("extend.z" === this._linkType) {
							l = new Je(0, 0, 1);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.max(i.z, r.z), u = f + this._extend + o + .1, h = new Je(i.x, i.y, u), c = new Je(r.x, r.y, u)
						} else if ("extend.x.n" === this._linkType) {
							l = new Je(-1, 0, 0);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.min(i.x, r.x), u = f - this._extend - o - .1, h = new Je(u, i.y, i.z), c = new Je(u, r.y, r.z)
						} else if ("extend.y.n" === this._linkType) {
							l = new Je(0, -1, 0);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.min(i.y, r.y), u = f - this._extend - o - .1, h = new Je(i.x, u, i.z), c = new Je(r.x, u, r.z)
						} else if ("extend.z.n" === this._linkType) {
							l = new Je(0, 0, -1);
							var i = t.localToWorld2(t.getLinkExtend(l.clone())),
								r = e.localToWorld2(e.getLinkExtend(l));
							f = Math.min(i.z, r.z), u = f - this._extend - o - .1, h = new Je(i.x, i.y, u), c = new Je(r.x, r.y, u)
						}
						h ? s.push(i, h, c, r) : s.push(i, r)
					} else {
						if (s.push(i), "orthogonal.x" === this._linkType) {
							if (i.y != r.y || i.z != r.z) {
								var p = r.x,
									d = new Je(p, i.y, i.z);
								s.push(d)
							}
						} else if ("orthogonal.x.n" === this._linkType) {
							var p = i.x,
								d = new Je(p, r.y, r.z);
							s.push(d)
						} else if ("orthogonal.y" === this._linkType) {
							var m = r.y,
								d = new Je(i.x, m, i.z);
							s.push(d)
						} else if ("orthogonal.y.n" === this._linkType) {
							var m = i.y,
								d = new Je(r.x, m, r.z);
							s.push(d)
						} else if ("orthogonal.z" === this._linkType) {
							var d = new Je(i.x, i.y, r.z);
							s.push(d)
						} else if ("orthogonal.z.n" === this._linkType) {
							var d = new Je(r.x, r.y, i.z);
							s.push(d)
						}
						var g = new Je(i.x + r.x, i.y + r.y, i.z + r.z).multiplyScalar(.5);
						if (("flex.x" === this._linkType || "flex.y" === this._linkType || "flex.z" === this._linkType) && this._flex(this._linkType, i, r, g, s), ("flex.yz" === this._linkType || "flex.zy" === this._linkType || "flex.xy" === this._linkType || "flex.yx" === this._linkType || "flex.xz" === this._linkType || "flex.zx" === this._linkType) && this._flex2(this._linkType, i, r, s), "control" === this._linkType) {
							var y = this.getControls();
							xi.isArray(y) && (s = s.concat(y))
						}
						s.push(r), n = s.length;
						var v = this._getNodeOffset(t, s[0].clone(), s[1].clone()),
							x = this._getNodeOffset(e, s[n - 1].clone(), s[n - 2].clone());
						i = t.localToWorld2(v), r = e.localToWorld2(x), s[0] = i, s[n - 1] = r
					}
					var n = s.length,
						A = this.getFromOffset(),
						w = this.getToOffset();
					A && s[0].add(A), w && s[n - 1].add(w);
					for (var _, a = new Qe.Path, S = 0; n > S; S++) _ = s[S], 0 === S ? a.moveTo(_.x, _.y, _.z) : a.lineTo(_.x, _.y, _.z);
					return this.setPath(a), a
				}
			}
		}), Qe.Serva = function(t) {
			Qe.Serva.superClass.constructor.apply(this, arguments), 1 === arguments.length && (this._name = t), this._dataList = new ci, this._dataMap = {}, this._rootList = new ci, this._rootMap = {}, this._clientMap = {}, this._lightList = new ci, this._billboardList = new ci, this._nodeList = new ci, this._annotationList = new ci, this._particleList = new ci, this.nodes = [], this.particles = [], this.billboards = [], this._dataBoxChangeDispatcher = new Qe.EventDispatcher, this._dataPropertyChangeDispatcher = new Qe.EventDispatcher, this._groupLists = {}, this.selection = new ci, this instanceof Qe.AlarmBox || (this._selectionContainer = new Qe.SelectionContainer(this), this._alarmBox = new Qe.AlarmBox(this), this._alarmStatePropagator = new Qe.AlarmStatePropagator(this), this._alarmStatePropagator.setEnable(!0)), this.batch = !1, this._clientMap = {}
		}, Qe.extend(Qe.Serva, Qe.PropertyChangeDispatcher, {
			constructor: Qe.Serva,
			className: "TGL.Serva",
			___accessor: ["name"],
			add: function(t, e) {
				if (t) {
					1 === arguments.length && (e = -1);
					var i = t.getId();
					if (this._dataMap.hasOwnProperty(i)) throw "Data with ID '" + i + "' already exists";
					this._dataMap[i] = t, this._dataList.add(t), t.getParent() || (this._rootMap[i] = t, e >= 0 ? this._rootList.add(t, e) : this._rootList.add(t)), t instanceof Qe.Billboard ? this._billboardList.add(t) : t instanceof Qe.Node ? this._nodeList.add(t) : t instanceof Qe.Particle ? this._particleList.add(t) : t instanceof Qe.Annotation ? this._annotationList.add(t) : t instanceof Qe.Light && this._lightList.add(t), this._dataBoxChangeDispatcher.fire({
						kind: "add",
						data: t,
						source: this
					}), t.getGroupId() && this.groupElements(t, null, t.getGroupId()), t.addPropertyChangeListener(this.handleDataPropertyChange, this)
				}
			},
			addByDescendant: function(t) {
				this.add(t), t.getChildren().size() > 0 && t.getChildren().forEach(function(t) {
					this.addByDescendant(t)
				}, this)
			},
			getAlarmBox: function() {
				return this._alarmBox
			},
			removeById: function(t, e) {
				var i = this.getDataById(t);
				this.remove(i, e)
			},
			remove: function(t, e) {
				if (t) {
					t instanceof Qe.Link && (t.setFromNode(null), t.setToNode(null)), t instanceof Qe.Node && t.getLinks() && t.getLinks().toList().forEach(function(t) {
						this.remove(t)
					}, this), e && (t.getChildren().forEach(function(e) {
						t.removeChild(e)
					}, this), t.getParent() && t.getParent().removeChild(t)), this._dataList.remove(t);
					var i = t._id;
					delete this._dataMap[i], this._rootMap[i] && (delete this._rootMap[i], this._rootList.remove(t)), t instanceof Qe.Billboard ? this._billboardList.remove(t) : t instanceof Qe.Node ? this._nodeList.remove(t) : t instanceof Qe.Particle ? this._particleList.remove(t) : t instanceof Qe.Annotation ? this._annotationList.remove(t) : t instanceof Qe.Light && this._lightList.remove(t), t.getGroupId() && this.groupElements(t, t.getGroupId(), null), t.removePropertyChangeListener(this.handleDataPropertyChange, this), this._dataBoxChangeDispatcher.fire({
						kind: "remove",
						data: t,
						source: this
					})
				}
			},
			removeByDescendant: function(t, e) {
				if (t) {
					var i = this;
					t.hasChildren() && t.getChildren().forEachReverse(function(t) {
						i.removeByDescendant(t, e)
					}), this.remove(t, e)
				}
			},
			containsById: function(t) {
				return this._dataMap.hasOwnProperty(t)
			},
			contains: function(t) {
				return t ? this._dataMap[t._id] === t : !1
			},
			lightsSize: function() {
				return this._lightList.size()
			},
			getLights: function() {
				return this._lightList
			},
			getLightsArray: function() {
				return this._lightList.toArray()
			},
			getAnnotations: function() {
				return this._annotationList
			},
			clear: function(t) {
				if (this._dataList.size() > 0) {
					var e = this._dataList.toList(function(e) {
						return !this._lightList.contains(e) || t
					}, this);
					if (e.forEach(function(t) {
							t.removePropertyChangeListener(this.handleDataPropertyChange, this)
						}, this), this._dataList.clear(), this._dataMap = {}, this._rootList.clear(), this._rootMap = {}, this._nodeList.clear(), this._billboardList.clear(), t) this._lightList.clear();
					else {
						var i = this;
						this._lightList.forEach(function(t) {
							i._dataList.add(t);
							var e = t.getId();
							i._dataMap[e] = t, null == t.getParent() && (i._rootList.add(t), i._rootMap[e] = t)
						})
					}
					this._dataBoxChangeDispatcher.fire({
						kind: "clear",
						datas: e
					})
				}
			},
			startBatch: function() {
				this.batch = !0
			},
			endBatch: function() {
				this.batch = !1, this._dataBoxChangeDispatcher.fire({
					kind: "batchEnd"
				})
			},
			removeSelection: function() {
				var t = this._selectionContainer.toSelection();
				t.forEach(function(t) {
					this.remove(t)
				}, this)
			},
			clearSelection: function() {
				this._nodeList.forEach(function(t) {
					t.selected = !1
				}), this._billboardList.forEach(function(t) {
					t.selected = !1
				}), this._selectionContainer.clearSelection()
			},
			clearEditing: function() {
				this._nodeList.forEach(function(t) {
					t.editing = !1
				}), this._billboardList.forEach(function(t) {
					t.editing = !1
				})
			},
			getDataById: function(t) {
				return this._dataMap[t]
			},
			groupElements: function(t, e, i) {
				var r;
				e && (r = this._groupLists[e], r && (r.remove(t), r.isEmpty() && delete this._groupLists[e])), i && (r = this._groupLists[i], null == r && (r = new ci, this._groupLists[i] = r), r.contains(t) || r.add(t))
			},
			synchronizeGroup: function(t, e, i, r) {
				if (!this.isAdjustingGroup) {
					this.isAdjustingGroup = !0;
					var a = t.getGroupId(),
						n = new Qe.XiangliangThree;
					if (a) {
						var s = this._groupLists[a];
						s && s.size() > 1 && s.forEach(function(a) {
							a !== t && !a.isDescendantOf(t) && !t.isDescendantOf(a) && (n.subVectors(i, e), a[Qe.setter(r)](a[Qe.getter(r)]().clone().add(n)))
						})
					}
					this.isAdjustingGroup = !1
				}
			},
			handleDataPropertyChange: function(t) {
				var e = t.source;
				if ("parent" === t.property) {
					var i = e.getId();
					e.getParent() ? this._rootMap[i] && (delete this._rootMap[i], this._rootList.remove(e)) : this._rootMap[i] || (this._rootMap[i] = e, this._rootList.add(e))
				} else if ("groupId" === t.property) {
					var r = t.oldValue,
						a = t.newValue;
					this.groupElements(e, r, a)
				} else "position" === t.property || "scale" === t.property || "rotation" === t.property ? this.synchronizeGroup(e, t.oldValue, t.newValue, t.property) : "selected" === t.property && (e.isSelected ? this._selectionContainer.appendSelection(e) : this._selectionContainer.removeSelection(e));
				this.onDataPropertyChanged(e, t), this._dataPropertyChangeDispatcher.fire(t)
			},
			onDataPropertyChanged: function(t, e) {},
			addServaChangeListener: function(t, e, i) {
				this._dataBoxChangeDispatcher.add(t, e, i)
			},
			removeServaChangeListener: function(t, e) {
				this._dataBoxChangeDispatcher.remove(t, e)
			},
			addDataPropertyChangeListener: function(t, e, i) {
				this._dataPropertyChangeDispatcher.add(t, e, i)
			},
			removeDataPropertyChangeListener: function(t, e) {
				this._dataPropertyChangeDispatcher.remove(t, e)
			},
			allocateLights: function() {
				var t, e, i, r, a, n, s, i;
				r = a = n = s = 0;
				var o = this._lightList;
				for (t = 0, e = o.size(); e > t; t++) i = o.get(t), i.onlyShadow || (i instanceof Qe.DirectionalLight && r++, i instanceof Qe.PointLight && a++, i instanceof Qe.SpotLight && n++);
				return {
					directional: r,
					point: a,
					spot: n,
					hemi: s
				}
			},
			allocateShadows: function() {
				var t, e, i, r = 0,
					a = this._lightList;
				for (t = 0, e = a.size(); e > t; t++) i = a.get(t), i.castShadow && (i instanceof Qe.SpotLight && r++, i instanceof Qe.DirectionalLight && !i.shadowCascade && r++);
				return r
			},
			allocatePointShadows: function() {
				var t, e, i, r = 0,
					a = this._lightList;
				for (t = 0, e = a.size(); e > t; t++) i = a.get(t), i.castShadow && i instanceof Qe.PointLight && r++;
				return r
			},
			getSelectionContainer: function() {
				return this._selectionContainer
			},
			size: function() {
				return this._dataList.size()
			},
			isEmpty: function() {
				return this._dataList.isEmpty()
			},
			getLimit: function() {
				return this._limit
			},
			setLimit: function(t) {
				var e = this._limit;
				this._limit = t, this.firePropertyChange("limit", e, t), this._checkLimit()
			},
			_checkLimit: function() {
				this._limit >= 0 && this.size() > this._limit && this.removeFirst(this.size() - this._limit)
			},
			removeFirst: function(t) {
				for (0 === arguments.length && (t = 1); t > 0 && this._dataList.size() > 0;) {
					var e = this._dataList.get(0);
					this.remove(e), t--
				}
			},
			getSiblings: function(t) {
				if (!this.contains(t)) throw t + " dosen't belong to this dataBox";
				var e = t.getParent();
				return e ? e.getChildren() : this._rootList
			},
			getRoots: function() {
				return this._rootList
			},
			getSiblingIndex: function(t) {
				return t.getParent() ? t.getParent().getChildren().indexOf(t) : this._rootList.indexOf(t)
			},
			getNodes: function() {
				return this._nodeList
			},
			getBillboards: function() {
				return this._billboardList
			},
			getDatas: function() {
				return this._dataList
			},
			getDataAt: function(t) {
				return this._dataList.get(t)
			},
			toDatas: function(t, e) {
				return this._dataList.toList(t, e)
			},
			forEach: function(t, e) {
				this._dataList.forEach(t, e)
			},
			forEachReverse: function(t, e) {
				this._dataList.forEachReverse(t, e)
			},
			forEachByDepthFirst: function(t, e, i) {
				if (e) this._depthFirst(t, e, i);
				else
					for (var r = this._rootList.size(), a = 0; r > a; a++) {
						var n = this._rootList.get(a);
						if (this._depthFirst(t, n, i) === !1) return
					}
			},
			_depthFirst: function(t, e, i) {
				for (var r = e.getChildrenSize(), a = 0; r > a; a++) {
					var n = e.getChildAt(a);
					if (this._depthFirst(t, n, i) === !1) return !1
				}
				if (i) {
					if (t.call(i, e) === !1) return !1
				} else if (t(e) === !1) return !1
			},
			forEachByBreadthFirst: function(t, e, i) {
				var r = new ci;
				for (e ? r.add(e) : this._rootList.forEach(r.add, r); r.size() > 0;)
					if (e = r.removeAt(0), e.getChildren().forEach(r.add, r), i) {
						if (t.call(i, e) === !1) return
					} else if (t(e) === !1) return
			},
			setClient: function(t, e) {
				if (null == t) return this;
				null == this._clientMap && (this._clientMap = new Object);
				var i = this._clientMap[t];
				if (i !== e) return null == e ? delete this._clientMap[t] : this._clientMap[t] = e, this._clientMap[t] = e, this.firePropertyChange("C:" + t, i, e), this
			},
			getClient: function(t) {
				return this._clientMap[t]
			}
		}), Qe.QuickFinder = function(t, e, i, r, a) {
			if (this._map = {}, !t) throw "dataBox can not be null";
			if (!e) throw "propertyName can not be null";
			this._dataBox = t, this._propertyName = e, this._propertyType = i || "accessor", "accessor" === this._propertyType && (this._getter = Qe.getter(e)), this._valueFunction = r || this.getValue, this._filterFunction = a || this.isInterested, this._dataBox.forEach(this._addData, this), this._dataBox.addServaChangeListener(this.handleServaChange, this, !0), this._dataBox.addDataPropertyChangeListener(this.handleDataPropertyChange, this, !0)
		}, Qe.extend(Qe.QuickFinder, Object, {
			_NULL_: "mono-null-key",
			getValueFunction: function() {
				return this._valueFunction
			},
			getFilterFunction: function() {
				return this._filterFunction
			},
			handleServaChange: function(t) {
				"add" === t.kind ? this._addData(t.data) : "remove" === t.kind ? this._removeData(t.data) : "clear" === t.kind && (this._map = {})
			},
			handleDataPropertyChange: function(t) {
				if (this._filterFunction.call(this, t.source) && ("accessor" === this._propertyType && this._propertyName === t.property || "style" === this._propertyType && t.source.IStyle && "S:" + this._propertyName === t.property || "client" === this._propertyType && "C:" + this._propertyName === t.property)) {
					var e = this._getMap(t.oldValue);
					e && e.remove(t.source), this._addData(t.source)
				}
			},
			_getMap: function(t) {
				return t = null == t ? this._NULL_ : t, this._map[t]
			},
			find: function(t) {
				var e = this._getMap(t);
				return e ? e.toList() : new ci
			},
			findFirst: function(t) {
				var e = this._getMap(t);
				return !e || e.isEmpty() ? null : e.get(0)
			},
			_addData: function(t) {
				if (this._filterFunction.call(this, t)) {
					var e = this._valueFunction.call(this, t),
						i = this._getMap(e);
					i || (i = new ci, e = null == e ? this._NULL_ : e, this._map[e] = i), i.add(t)
				}
			},
			_removeData: function(t) {
				if (this._filterFunction.call(this, t)) {
					var e = this._valueFunction.call(this, t),
						i = this._getMap(e);
					i && (i.remove(t), i.isEmpty() && (e = null == e ? this._NULL_ : e, delete this._map[e]))
				}
			},
			dispose: function() {
				this._dataBox.removeServaChangeListener(this.handleServaChange, this), this._dataBox.removeDataPropertyChangeListener(this.handleDataPropertyChange, this), delete this._dataBox
			},
			getServa: function() {
				return this._dataBox
			},
			getPropertyType: function() {
				return this._propertyType
			},
			getPropertyName: function() {
				return this._propertyName
			},
			isInterested: function(t) {
				return ("style" !== this._propertyType || t.IStyle) && ("accessor" !== this._propertyType || this._valueFunction !== this.getValue || t[this._getter]) ? !0 : !1
			},
			getValue: function(t) {
				return "accessor" === this._propertyType ? t[this._getter]() : "style" === this._propertyType && t.getStyle ? t.getStyle(this._propertyName) : "client" === this._propertyType && t.getClient ? t.getClient(this._propertyName) : null
			}
		}), Qe.SelectionContainer = function(t) {
			Qe.SelectionContainer.superClass.constructor.apply(this, arguments), this._selectionMode = "multipleSelection", this._selectionList = new ci, this._selectionChangeDispatcher = new Qe.EventDispatcher, this._selectionMap = {}, this._setServa(t)
		}, Qe.extend(Qe.SelectionContainer, Qe.PropertyChangeDispatcher, {
			getSelectionMode: function() {
				return this._selectionMode
			},
			setSelectionMode: function(t) {
				if (this._selectionMode !== t && ("noneSelection" === t || "singleSelection" === t || "multipleSelection" === t)) {
					this.clearSelection();
					var e = this._selectionMode;
					this._selectionMode = t, this.firePropertyChange("selectionMode", e, this._selectionMode)
				}
			},
			getServa: function() {
				return this._dataBox
			},
			_setServa: function(t) {
				if (!t) throw "dataBox can not be null";
				if (this._dataBox !== t) {
					this._dataBox && (this.clearSelection(), this._dataBox.removeServaChangeListener(this.handleServaChange, this));
					var e = this._dataBox;
					this._dataBox = t, this._dataBox.addServaChangeListener(this.handleServaChange, this, !0), this.firePropertyChange("dataBox", e, this._dataBox)
				}
			},
			dispose: function() {
				this.clearSelection(), this._dataBox.removeServaChangeListener(this.handleServaChange, this)
			},
			handleServaChange: function(t) {
				if ("remove" === t.kind) {
					var e = t.data;
					this.contains(e) && (this._selectionList.remove(e), delete this._selectionMap[e.getId()], this.fireSelectionChange("remove", new ci(e))), e._selected = !1
				} else "clear" === t.kind && this.clearSelection()
			},
			getFilterFunction: function() {
				return this._filterFunction
			},
			setFilterFunction: function(t) {
				if (this._filterFunction !== t) {
					this.clearSelection();
					var e = this._filterFunction;
					this._filterFunction = t, this.firePropertyChange("filterFunction", e, this._filterFunction)
				}
			},
			fireSelectionChange: function(t, e, i) {
				i && (this._selectionList.forEach(function(t) {
					i.contains(t) ? i.remove(t) : i.add(t)
				}), e = i.toList()), this._selectionChangeDispatcher.fire({
					kind: t,
					datas: new ci(e)
				})
			},
			addSelectionChangeListener: function(t, e, i) {
				this._selectionChangeDispatcher.add(t, e, i)
			},
			removeSelectionChangeListener: function(t, e) {
				this._selectionChangeDispatcher.remove(t, e)
			},
			_filterList: function(t, e) {
				for (var i = new ci(t), r = 0; r < i.size(); r++) {
					var a = i.get(r);
					(this._filterFunction && !this._filterFunction(a) || e && this.contains(a) || !e && !this.contains(a) || !this._dataBox.contains(a)) && (i.removeAt(r), r--)
				}
				return i
			},
			appendSelection: function(t) {
				if ("noneSelection" !== this._selectionMode) {
					var e = this._filterList(t, !0);
					if (!e.isEmpty()) {
						var i = null;
						"singleSelection" === this._selectionMode && (i = new ci(this._selectionList), this._selectionList.forEach(function(t) {
							t._selected = !1
						}), this._selectionList.clear(), this._selectionMap = {}, e = new ci(e.get(e.size() - 1)));
						for (var r = 0; r < e.size(); r++) {
							var a = e.get(r);
							a._selected = !0, this._selectionList.add(a), this._selectionMap[a._id] = a
						}
						this.fireSelectionChange("append", e, i)
					}
				}
			},
			removeSelection: function(t) {
				var e = this._filterList(t);
				if (0 !== e.size()) {
					for (var i = 0; i < e.size(); i++) {
						var r = e.get(i);
						r._selected = !1, this._selectionList.remove(r), delete this._selectionMap[r.getId()]
					}
					this.fireSelectionChange("remove", e)
				}
			},
			toSelection: function(t, e) {
				return this._selectionList.toList(t, e)
			},
			getSelection: function() {
				return this._selectionList
			},
			setSelection: function(t) {
				if ("noneSelection" !== this._selectionMode && (0 !== this._selectionList.size() || null != t)) {
					var e = new ci(this._selectionList);
					this._selectionList.clear(), this._selectionMap = {};
					var i = this._filterList(t, !0);
					"singleSelection" === this._selectionMode && i.size() > 1 && (i = new ci(i.get(i.size() - 1)));
					for (var r = 0; r < i.size(); r++) {
						var a = i.get(r);
						a._selected = !0, this._selectionList.add(a), this._selectionMap[a.getId()] = a
					}
					this.fireSelectionChange("set", null, e)
				}
			},
			clearSelection: function() {
				if (this._selectionList.size() > 0) {
					var t = this._selectionList.toList();
					this._selectionList.forEach(function(t) {
						t._selected = !1
					}), this._selectionList.clear(), this._selectionMap = {}, this.fireSelectionChange("clear", t)
				}
			},
			selectAll: function() {
				if ("noneSelection" !== this._selectionMode) {
					var t = this._dataBox.toDatas(),
						e = 0,
						i = null;
					if (this._filterFunction)
						for (e = 0; e < t.size(); e++) i = t.get(e), this._filterFunction(i) || (t.removeAt(e), e--);
					var r = new ci(this._selectionList);
					for (this._selectionList.clear(), this._selectionMap = {}, "singleSelection" === this._selectionMode && t.size() > 1 && (t = new ci(t.get(t.size() - 1))), e = 0; e < t.size(); e++) i = t.get(e), this._selectionList.add(i), this._selectionMap[i.getId()] = i;
					this.fireSelectionChange("all", null, r)
				}
			},
			size: function() {
				return this._selectionList.size()
			},
			contains: function(t) {
				return t ? null != this._selectionMap[t._id] : !1
			},
			getLastData: function() {
				return this._selectionList.size() > 0 ? this._selectionList.get(this._selectionList.size() - 1) : null
			},
			getFirstData: function() {
				return this._selectionList.size() > 0 ? this._selectionList.get(0) : null
			},
			isSelectable: function(t) {
				return t ? "noneSelection" === this._selectionMode ? !1 : this._filterFunction && !this._filterFunction(t) ? !1 : !0 : !1
			}
		}), Qe.AlarmSeverity = function(t, e, i, r, a) {
			this.value = t, this.name = e, this.nickName = i, this.color = r, this.displayName = a
		}, Qe.extend(Qe.AlarmSeverity, Object, {
			toString: function() {
				return this.displayName ? this.displayName : this.name
			}
		}),
		function() {
			var t = Qe.AlarmSeverity;
			t.severities = new ci, t._vm = {}, t._nm = {}, t._cp = function(t, e) {
				if (t && e) {
					var i = t.value - e.value;
					return i > 0 ? 1 : 0 > i ? -1 : 0
				}
				return t && !e ? 1 : !t && e ? -1 : 0
			}, t.forEach = function(e, i) {
				t.severities.forEach(e, i)
			}, t.getSortFunction = function() {
				return t._cp
			}, t.setSortFunction = function(e) {
				t._cp = e, t.severities.sort(e)
			}, t.add = function(e, i, r, a, n) {
				var s = new t(e, i, r, a, n);
				return t._vm[e] = s, t._nm[i] = s, t.severities.add(s), t.severities.sort(t._cp), s
			}, t.remove = function(e) {
				var i = t._nm[e];
				return i && (delete t._nm[e], delete t._vm[i.value], t.severities.remove(i)), i
			}, t.CRITICAL = t.add(500, "Critical", "C", "#FF0000"), t.MAJOR = t.add(400, "Major", "M", "#FFA000"), t.MINOR = t.add(300, "Minor", "m", "#FFFF00"), t.WARNING = t.add(200, "Warning", "W", "#00FFFF"), t.INDETERMINATE = t.add(100, "Indeterminate", "N", "#C800FF"), t.CLEARED = t.add(0, "Cleared", "R", "#00FF00"), t.isClearedAlarmSeverity = function(t) {
				return t ? 0 === t.value : !1
			}, t.getByName = function(e) {
				return t._nm[e]
			}, t.getByValue = function(e) {
				return t._vm[e]
			}, t.clear = function() {
				t.severities.clear(), t._vm = {}, t._nm = {}
			}, t.compare = function(e, i) {
				return t._cp(e, i)
			}
		}(), Qe.AlarmState = function(t) {
			this._e = t, this._nm = {}, this._am = {}, this._ps = null, this._haa = null, this._hna = null, this._hoa = null, this._hta = null, this._hls = !1, this._aac = 0, this._nac = 0
		}, Qe.extend(Qe.AlarmState, Object, {
			_ep: !0,
			_f: function() {
				this._c1(), this._c2(), this._c3(), this._c4(), this._c5(), this._c6(), this._c7(), this._e.firePropertyChange("alarmState", null, this)
			},
			getHighestAcknowledgedAlarmSeverity: function() {
				return this._haa
			},
			getHighestNewAlarmSeverity: function() {
				return this._hna
			},
			getHighestOverallAlarmSeverity: function() {
				return this._hoa
			},
			getHighestNativeAlarmSeverity: function() {
				return this._hta
			},
			hasLessSevereNewAlarms: function() {
				return this._hls
			},
			_c1: function() {
				var t = null;
				for (var e in this._am) e = Qe.AlarmSeverity.getByName(e), Qe.AlarmSeverity.isClearedAlarmSeverity(e) || 0 !== this.getAcknowledgedAlarmCount(e) && (t = t && Qe.AlarmSeverity.compare(t, e) > 0 ? t : e);
				this._haa = t
			},
			_c2: function() {
				var t = null;
				for (var e in this._nm) e = Qe.AlarmSeverity.getByName(e), Qe.AlarmSeverity.isClearedAlarmSeverity(e) || 0 !== this.getNewAlarmCount(e) && (t = t && Qe.AlarmSeverity.compare(t, e) > 0 ? t : e);
				this._hna = t
			},
			_c3: function() {
				if (!this._hna) return void(this._hls = !1);
				for (var t in this._nm)
					if (t = Qe.AlarmSeverity.getByName(t), !Qe.AlarmSeverity.isClearedAlarmSeverity(t) && 0 !== this.getNewAlarmCount(t) && Qe.AlarmSeverity.compare(this._hna, t) > 0) return void(this._hls = !0);
				this._hls = !1
			},
			_c4: function() {
				var t = this._haa,
					e = this._hna,
					i = this._ps;
				this._hoa = t, Qe.AlarmSeverity.compare(e, this._hoa) > 0 && (this._hoa = e), Qe.AlarmSeverity.compare(i, this._hoa) > 0 && (this._hoa = i)
			},
			_c5: function() {
				var t = this._haa,
					e = this._hna;
				this._hta = t, Qe.AlarmSeverity.compare(e, this._hta) > 0 && (this._hta = e)
			},
			increaseAcknowledgedAlarm: function(t, e) {
				if (null == e && (e = 1), 0 !== e) {
					var i = this._am[t.name];
					null == i && (i = 0), i += e, this._am[t.name] = i, this._f(), this._e.onAlarmChange()
				}
			},
			increaseNewAlarm: function(t, e) {
				if (null == e && (e = 1), 0 !== e) {
					var i = this._nm[t.name];
					null == i && (i = 0), i += e, this._nm[t.name] = i, this._f(), this._e.onAlarmChange()
				}
			},
			decreaseAcknowledgedAlarm: function(t, e) {
				if (null == e && (e = 1), 0 !== e) {
					var i = this._am[t.name];
					if (null == i && (i = 0), i -= e, 0 > i) throw "Alarm count can not be negative";
					this._am[t.name] = i, this._f(), this._e.onAlarmChange()
				}
			},
			decreaseNewAlarm: function(t, e) {
				if (null == e && (e = 1), 0 !== e) {
					var i = this._nm[t.name];
					if (null == i && (i = 0), i -= e, 0 > i) throw "Alarm count can not be negative";
					this._nm[t.name] = i, this._f(), this._e.onAlarmChange()
				}
			},
			acknowledgeAlarm: function(t) {
				this.decreaseNewAlarm(t, 1), this.increaseAcknowledgedAlarm(t, 1)
			},
			acknowledgeAllAlarms: function(t) {
				if (t) {
					var e = this.getNewAlarmCount(t);
					this.decreaseNewAlarm(t, e), this.increaseAcknowledgedAlarm(t, e)
				} else
					for (var i in this._nm) this.acknowledgeAllAlarms(Qe.AlarmSeverity.getByName(i))
			},
			_c6: function() {
				this._aac = 0;
				for (var t in this._am) t = Qe.AlarmSeverity.getByName(t), this._aac += this.getAcknowledgedAlarmCount(t)
			},
			getAcknowledgedAlarmCount: function(t) {
				if (t) {
					var e = this._am[t.name];
					return null == e ? 0 : e
				}
				return this._aac
			},
			getAlarmCount: function(t) {
				return this.getAcknowledgedAlarmCount(t) + this.getNewAlarmCount(t)
			},
			_c7: function() {
				this._nac = 0;
				for (var t in this._nm) t = Qe.AlarmSeverity.getByName(t), this._nac += this.getNewAlarmCount(t)
			},
			getNewAlarmCount: function(t) {
				if (t) {
					var e = this._nm[t.name];
					return null == e ? 0 : e
				}
				return this._nac
			},
			setNewAlarmCount: function(t, e) {
				this._nm[t.name] = e, this._f()
			},
			removeAllNewAlarms: function(t) {
				t ? delete this._nm[t] : this._nm = {}, this._f()
			},
			setAcknowledgedAlarmCount: function(t, e) {
				this._am[t.name] = e, this._f()
			},
			removeAllAcknowledgedAlarms: function(t) {
				t ? delete this._am[t.name] : this._am = {}, this._f()
			},
			isEmpty: function() {
				return null == this._hoa
			},
			clear: function() {
				this._am = {}, this._nm = {}, this._f()
			},
			getPropagateSeverity: function() {
				return this._ps
			},
			setPropagateSeverity: function(t) {
				if (this._ep || (t = null), this._ps !== t) {
					var e = this._ps;
					this._ps = t, this._f(), this._e.onAlarmChange(), this._e.firePropertyChange("propagateSeverity", e, t)
				}
			},
			isEnablePropagation: function() {
				return this._ep
			},
			setEnablePropagation: function(t) {
				var e = this._ep;
				this._ep = t, this._e.firePropertyChange("enablePropagation", e, t) && (t || this.setPropagateSeverity(null))
			}
		}), Qe.Alarm = function(t, e, i, r, a) {
			Qe.Data.call(this, t), this._id = null != t ? t : Qe.id("A"), this._elementId = e, this._alarmSeverity = i, this._acked = r || !1, this._cleared = a || !1
		}, Qe.extend(Qe.Alarm, Qe.Data, {
			IAlarm: !0,
			getElementId: function() {
				return this._elementId
			},
			___accessor: ["acked", "cleared", "alarmSeverity"]
		}), Qe.AlarmBox = function(t) {
			if (!t) throw "elementBox can not be null.";
			Qe.AlarmBox.superClass.constructor.call(this), this._elementBox = t, this._alarmElementMapping = new Qe.AlarmElementMapping(this, t), this._elementBox.addServaChangeListener(this.handleElementBoxChange, this, !0), this.addServaChangeListener(this.handleAlarmBoxChange, this, !0), this.addDataPropertyChangeListener(this.handleAlarmPropertyChange, this, !0)
		}, Qe.extend(Qe.AlarmBox, Qe.Serva, {
			__accessor: ["removeAlarmWhenElementIsRemoved"],
			_name: "AlarmBox",
			_removeAlarmWhenAlarmIsCleared: !1,
			_removeAlarmWhenElementIsRemoved: !0,
			getElementBox: function() {
				return this._elementBox
			},
			isRemoveAlarmWhenAlarmIsCleared: function() {
				return this._removeAlarmWhenAlarmIsCleared
			},
			setRemoveAlarmWhenAlarmIsCleared: function(t) {
				var e = this._removeAlarmWhenAlarmIsCleared;
				if (this._removeAlarmWhenAlarmIsCleared = t, this.firePropertyChange("removeAlarmWhenAlarmIsCleared", e, t), t)
					for (var i in this.datas) {
						var r = this.datas[i];
						r.isCleard() && this.remove(r)
					}
			},
			getAlarmElementMapping: function() {
				return this._alarmElementMapping
			},
			setAlarmElementMapping: function(t) {
				if (!t) throw "alarmElementMapping can not be null";
				if (this._alarmElementMapping !== t) {
					var e = this._alarmElementMapping;
					this.getDatas().forEach(this._decreaseAlarmState, this), this._alarmElementMapping = t, this.getDatas().forEach(this._increaseAlarmState, this), this.firePropertyChange("alarmElementMapping", e, t)
				}
			},
			handleElementBoxChange: function(t) {
				"add" === t.kind ? this.handleElementAdded(t.data) : "remove" === t.kind ? (this.handleElementRemoved(t.data), this._removeAlarmWhenElementIsRemoved && this.removeAlarmsByElement(t.data)) : "clear" === t.kind && (t.datas.forEach(this.handleElementRemoved, this), this._removeAlarmWhenElementIsRemoved && this.clear())
			},
			handleAlarmBoxChange: function(t) {
				"add" === t.kind ? this._increaseAlarmState(t.data) : "remove" === t.kind ? this._decreaseAlarmState(t.data) : "clear" === t.kind && t.datas.forEach(this._decreaseAlarmState, this)
			},
			handleAlarmPropertyChange: function(t) {
				var e = t.source;
				e.isCleared() || ("alarmSeverity" === t.property ? this.handleAlarmSeverityChange(e, t) : "acked" === t.property && this.handleAckedChange(e, t)), "cleared" === t.property && (e.isCleared() ? (this._decreaseAlarmState(e, !0), this._removeAlarmWhenAlarmIsCleared && this.remove(e)) : this._increaseAlarmState(e, !0))
			},
			handleAckedChange: function(t, e) {
				if (t.getAlarmSeverity()) {
					var i = this.getCorrespondingElements(t);
					if (i)
						for (var r = 0; r < i.size(); r++) {
							var a = i.get(r);
							e.oldValue ? a.getAlarmState().decreaseAcknowledgedAlarm(t.getAlarmSeverity()) : a.getAlarmState().decreaseNewAlarm(t.getAlarmSeverity()), e.newValue ? a.getAlarmState().increaseAcknowledgedAlarm(t.getAlarmSeverity()) : a.getAlarmState().increaseNewAlarm(t.getAlarmSeverity())
						}
				}
			},
			handleAlarmSeverityChange: function(t, e) {
				var i = e.oldValue,
					r = e.newValue,
					a = this.getCorrespondingElements(t);
				if (a)
					for (var n = 0; n < a.size(); n++) {
						var s = a.get(n);
						i && (t.isAcked() ? s.getAlarmState().decreaseAcknowledgedAlarm(i) : s.getAlarmState().decreaseNewAlarm(i)), r && (t.isAcked() ? s.getAlarmState().increaseAcknowledgedAlarm(r) : s.getAlarmState().increaseNewAlarm(r))
					}
			},
			getCorrespondingAlarms: function(t) {
				return this._alarmElementMapping.getCorrespondingAlarms(t)
			},
			getCorrespondingElements: function(t) {
				return this._alarmElementMapping.getCorrespondingElements(t)
			},
			handleElementAdded: function(t) {
				var e = this.getCorrespondingAlarms(t);
				if (e)
					for (var i = 0; i < e.size(); i++) {
						var r = e.get(i);
						if (!r.isCleared()) {
							var a = r.getAlarmSeverity();
							a && (r.isAcked() ? t.getAlarmState().increaseAcknowledgedAlarm(a) : t.getAlarmState().increaseNewAlarm(a))
						}
					}
			},
			_increaseAlarmState: function(t, e) {
				if (!t.isCleared() || e) {
					var i = t.getAlarmSeverity();
					if (i) {
						var r = this.getCorrespondingElements(t);
						if (r)
							for (var a = 0; a < r.size(); a++) {
								var n = r.get(a);
								t.isAcked() ? n.getAlarmState().increaseAcknowledgedAlarm(i) : n.getAlarmState().increaseNewAlarm(i)
							}
					}
				}
			},
			_decreaseAlarmState: function(t, e) {
				if (t.isCleared || console.log(), !t.isCleared() || e) {
					var i = t.getAlarmSeverity();
					if (i) {
						var r = this.getCorrespondingElements(t);
						if (r)
							for (var a = 0; a < r.size(); a++) {
								var n = r.get(a);
								t.isAcked() ? n.getAlarmState().decreaseAcknowledgedAlarm(i) : n.getAlarmState().decreaseNewAlarm(i)
							}
					}
				}
			},
			handleElementRemoved: function(t) {
				var e = this.getCorrespondingAlarms(t);
				e && e.forEach(function(e) {
					!e.isCleared() && e.getAlarmSeverity() && (e.isAcked() ? t.getAlarmState().decreaseAcknowledgedAlarm(e.getAlarmSeverity()) : t.getAlarmState().decreaseNewAlarm(e.getAlarmSeverity()))
				})
			},
			removeAlarmsByElement: function(t) {
				var e = this.getCorrespondingAlarms(t);
				e && e.forEach(this.remove, this)
			},
			add: function(t, e) {
				if (!t.IAlarm) throw "Only IAlarm can be added into AlarmBox";
				this._removeAlarmWhenAlarmIsCleared && t.isCleared() || Qe.AlarmBox.superClass.add.apply(this, arguments)
			}
		}), Qe.AlarmElementMapping = function(t, e) {
			if (!e) throw "ElementBox can not be null";
			if (!t) throw "AlarmBox can not be null";
			this._elementBox = e, this._alarmBox = t, this._alarmsFinder = new Qe.QuickFinder(t, "elementId")
		}, Qe.extend(Qe.AlarmElementMapping, Object, {
			getCorrespondingAlarms: function(t) {
				return this._alarmsFinder.find(t.getId())
			},
			getCorrespondingElements: function(t) {
				var e = this._elementBox.getDataById(t.getElementId());
				return new ci(e)
			},
			dispose: function() {
				delete this._elementBox, delete this._alarmBox, delete this._alarmsFinder
			}
		}), Qe.PropertyPropagator = function(t, e, i) {
			if (!t) throw "dataBox can not be null";
			if (!e) throw "propertyName can not be null";
			this._dataBox = t, this._propertyName = e, this._propertyType = i || "accessor", "accessor" === this._propertyType && (this._getter = Qe.getter(e), this._setter = Qe.setter(e)), this._enable = !1, this._isPropagating = !1
		}, Qe.extend(Qe.PropertyPropagator, Object, {
			getServa: function() {
				return this._dataBox
			},
			getPropertyType: function() {
				return this._propertyType
			},
			getPropertyName: function() {
				return this._propertyName
			},
			isEnable: function() {
				return this._enable
			},
			setEnable: function(t) {
				if (this._enable !== t)
					if (this._enable = t, this._enable) {
						this._dataBox.addServaChangeListener(this.handleServaChange, this), this._dataBox.addDataPropertyChangeListener(this.handleDataPropertyChange, this);
						for (var e in this._dataBox.datas) this.propagate(this._dataBox.datas[e])
					} else this._dataBox.removeServaChangeListener(this.handleServaChange, this), this._dataBox.removeDataPropertyChangeListener(this.handleDataPropertyChange, this)
			},
			handleServaChange: function(t) {
				t.data && this.propagate(t.data)
			},
			handleDataPropertyChange: function(t) {
				if (this.isInterestedProperty(t)) this.propagate(t.source);
				else if ("parent" === t.property) {
					var e = t.oldValue;
					e && this.propagate(e), this.propagate(t.source)
				}
			},
			isInterestedProperty: function(t) {
				return "accessor" === this._propertyType && this._propertyName === t.property ? !0 : "style" === this._propertyType && t.IElement && "S:" + this._propertyName === t.property ? !0 : "client" === this._propertyType && "C:" + this._propertyName === t.property ? !0 : !1
			},
			propagate: function(t) {
				t && !this._isPropagating && (this._isPropagating = !0, this.propagateToTop(t), this._isPropagating = !1)
			},
			propagateToTop: function(t) {
				for (this.propagateToParent(null, t); t && t.getParent();) this.propagateToParent(t, t.getParent()), t = t.getParent()
			},
			propagateToParent: function(t, e) {}
		}), Qe.AlarmStatePropagator = function(t) {
			Qe.AlarmStatePropagator.superClass.constructor.call(this, t, "alarmState")
		}, Qe.extend(Qe.AlarmStatePropagator, Qe.PropertyPropagator, {
			handleDataPropertyChange: function(t) {
				"enablePropagation" === t.property ? this.propagate(t.source) : Qe.AlarmStatePropagator.superClass.handleDataPropertyChange.call(this, t)
			},
			propagateToParent: function(t, e) {
				var i = null;
				e.getChildren().forEach(function(t) {
					var e = t.getAlarmState().getHighestOverallAlarmSeverity();
					Qe.AlarmSeverity.compare(e, i) > 0 && (i = e)
				}), e.getAlarmState && e.getAlarmState().setPropagateSeverity(i)
			}
		});
	var vi = {
		KEEP_DEFAULT_FUNCTION: function(t) {
			return t.target.keepDefault || t.target.getAttribute("keepDefault") ? !0 : t.target.parentNode && (t.target.parentNode.keepDefault || t.target.parentNode.getAttribute("keepDefault")) ? !0 : t.shiftKey ? !0 : !1
		}
	};
	vi.paintSortFunction = function(t, e) {
		return t.z !== e.z ? t.z - e.z : 0
	}, vi.doubleClickToLookAtFunction = function(t) {
		return !0
	}, vi.needSmoothNormalFunction = function(t) {
		var e = t instanceof yi || t instanceof Qe.TextNode || t instanceof Qe.PathCube || t instanceof Qe.ShapeNode || t instanceof Qe.ComboNode || "TGL.Entity" == t.getClassName();
		return !e
	}, vi.PATH_LINK_COMPUTE_DELAY = !1, Qe.Defaults = vi, Qe.BasicShader = {
		vertex_shader: "",
		fragment_shader: ""
	}, Qe.ShaderUtil = {}, Qe.ShaderUtil.getShader = function(t) {}, Qe.ShaderChunk = {
		gradient_parts_fragment: ["#ifdef MAX_GRADIENT", "uniform vec3 gradientColor[MAX_GRADIENT];", "uniform float gradientStop[MAX_GRADIENT];", "uniform int gradientType;", "#endif"].join("\n"),
		gradient_basic_fragment: ["#ifdef MAX_GRADIENT", "float gradientUV = 1.0;", "float PI = 3.14;", "if(gradientType == 1){", "gradientUV = vUv.x;", "} else if(gradientType == 2){", "gradientUV = vUv.y;", "} else if(gradientType == 3){", "gradientUV = (vUv.x + vUv.y)/2.0;", "} else if(gradientType == 4){", "gradientUV = (vUv.x + 1.0 - vUv.y)/2.0;", "} else if(gradientType == 5){", "gradientUV = 1.414 * sqrt((vUv.x - 0.5) * (vUv.x - 0.5) + (vUv.y - 0.5) * (vUv.y - 0.5));", "} else if(gradientType == 6){", "gradientUV = (atan(vUv.y - 0.5,vUv.x - 0.5)) / (2.0 * PI);", "if(gradientUV < 0.0){", "gradientUV = 1.0 + gradientUV;", "}", "}", "for( int i = 1; i < MAX_GRADIENT; i ++ ){", "if(gradientStop[i - 1] <= gradientUV){", "if((gradientStop[i] >= gradientUV)){", "vec3 color1 = gradientColor[i-1];", "vec3 color2 = gradientColor[i];", "float stop1 = gradientStop[i-1];", "float stop2 =gradientStop[i]; ", "gl_FragColor = vec4( (color1 * (stop2 - gradientUV )  + color2 * (gradientUV - stop1))/(stop2 - stop1),opacity);", "break;", "}", "}", "}", "#endif"].join("\n"),
		gradient_phong_fragment: ["#ifdef MAX_GRADIENT", "float gradientUV = 1.0;", "float PI = 3.14;", "if(gradientType == 1){", "gradientUV = vUv.x;", "} else if(gradientType == 2){", "gradientUV = vUv.y;", "} else if(gradientType == 3){", "gradientUV = (vUv.x + vUv.y)/2.0;", "} else if(gradientType == 4){", "gradientUV = (vUv.x + 1.0 - vUv.y)/2.0;", "} else if(gradientType == 5){", "gradientUV = 1.414 * sqrt((vUv.x - 0.5) * (vUv.x - 0.5) + (vUv.y - 0.5) * (vUv.y - 0.5));", "} else if(gradientType == 6){", "gradientUV = (atan(vUv.y - 0.5,vUv.x - 0.5)) / (2.0 * PI);", "if(gradientUV < 0.0){", "gradientUV = 1.0 + gradientUV;", "}", "}", "for( int i = 1; i < MAX_GRADIENT; i ++ ){", "if(gradientStop[i - 1] < gradientUV){", "if((gradientStop[i] > gradientUV)){", "vec3 color1 = gradientColor[i-1];", "vec3 color2 = gradientColor[i];", "float stop1 = gradientStop[i-1];", "float stop2 = gradientStop[i]; ", "tempDiffuse = (color1 * (stop2 - gradientUV )  + color2 * (gradientUV - stop1))/(stop2 - stop1);", "break;", "}", "}", "}", "#endif"].join("\n"),
		fog_pars_fragment: ["#ifdef USE_FOG", "uniform vec3 fogColor;", "#ifdef FOG_EXP2", "uniform float fogDensity;", "#else", "uniform float fogNear;", "uniform float fogFar;", "#endif", "#endif"].join("\n"),
		fog_fragment: ["#ifdef USE_FOG", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "#ifdef FOG_EXP2", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "#else", "float fogFactor = smoothstep( fogNear, fogFar, depth );", "#endif", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "#endif"].join("\n"),
		envmap_pars_fragment: ["#ifdef USE_ENVMAP", "uniform float reflectivity;", "uniform samplerCube envMap;", "uniform float flipEnvMap;", "uniform int combine;", "#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "uniform bool useRefract;", "uniform float refractionRatio;", "#else", "varying vec3 vReflect;", "#endif", "#endif"].join("\n"),
		envmap_fragment: ["#ifdef USE_ENVMAP", "vec3 reflectVec;", "#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "vec3 gleyeToVertex = normalize( vWorldPosition - gleyePosition );", "if ( useRefract ) {", "reflectVec = refract( gleyeToVertex, normal, refractionRatio );", "} else { ", "reflectVec = reflect( gleyeToVertex, normal );", "}", "#else", "reflectVec = vReflect;", "#endif", "#ifdef DOUBLE_SIDED", "float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );", "vec4 cubeColor = textureCube( envMap, flipNormal * vec3( reflectVec.x*flipEnvMap,  reflectVec.y,reflectVec.z) );", "#else", "vec4 cubeColor = textureCube( envMap, vec3(reflectVec.x*flipEnvMap,  reflectVec.y,reflectVec.z) );", "#endif", "#ifdef GAMMA_INPUT", "cubeColor.xyz *= cubeColor.xyz;", "#endif", "#ifdef PHONG", "#else", "float specularStrength = 1.0;", "#endif", "if ( combine == 1 ) {", "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );", "} else if ( combine == 2 ) {", "gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;", "} else {", "gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );", "}", "#endif"].join("\n"),
		envmap_pars_vertex: ["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )", "varying vec3 vReflect;", "uniform float refractionRatio;", "uniform bool useRefract;", "#endif"].join("\n"),
		worldpos_vertex: ["#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP ) ", "#ifdef USE_SKINNING", "vec4 worldPosition = modelMatrix * skinned;", "#endif", "#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )", "vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );", "#endif", "#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "#endif", "#endif"].join("\n"),
		envmap_vertex: ["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )", "vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;", "worldNormal = normalize( worldNormal );", "vec3 gleyeToVertex = normalize( worldPosition.xyz - gleyePosition );", "if ( useRefract ) {", "vReflect = refract( gleyeToVertex, worldNormal, refractionRatio );", "} else {", "vReflect = reflect( gleyeToVertex, worldNormal );", "}", "#endif"].join("\n"),
		map_particle_pars_fragment: ["#ifdef USE_MAP", "uniform sampler2D map;", "#endif"].join("\n"),
		map_particle_fragment: ["#ifdef USE_MAP", "gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );", "#endif"].join("\n"),
		map_pars_vertex: ["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined(MAX_GRADIENT)", "varying vec2 vUv;", "uniform vec4 offsetRepeat;", "uniform bool flipX; ", "#endif"].join("\n"),
		map_pars_fragment: ["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined(MAX_GRADIENT)", "varying vec2 vUv;", "#endif", "#ifdef USE_MAP", "uniform bool mapLoaded;", "uniform sampler2D map;", "#endif"].join("\n"),
		map_vertex: ["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined(MAX_GRADIENT)", "if(flipX){", "vUv.x = uv.x * offsetRepeat.z * (-1.0) + offsetRepeat.x + offsetRepeat.z;", "vUv.y = uv.y * offsetRepeat.w  + offsetRepeat.y;", "}else{", "vUv = uv * offsetRepeat.zw  + offsetRepeat.xy;", "}", "#endif"].join("\n"),
		map_fragment: ["#ifdef USE_MAP", "if(mapLoaded){", "vec4 texelColor = texture2D( map, vUv );", "#ifdef GAMMA_INPUT", "texelColor.xyz *= texelColor.xyz;", "#endif", "gl_FragColor = texelColor * gl_FragColor;", "}", "#endif"].join("\n"),
		lightmap_pars_fragment: ["#ifdef USE_LIGHTMAP", "varying vec2 vUv2;", "uniform sampler2D lightMap;", "#endif"].join("\n"),
		lightmap_pars_vertex: ["#ifdef USE_LIGHTMAP", "varying vec2 vUv2;", "#endif"].join("\n"),
		lightmap_fragment: ["#ifdef USE_LIGHTMAP", "gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );", "#endif"].join("\n"),
		lightmap_vertex: ["#ifdef USE_LIGHTMAP", "vUv2 = uv2;", "#endif"].join("\n"),
		bumpmap_pars_fragment: ["#ifdef USE_BUMPMAP", "uniform sampler2D bumpMap;", "uniform float bumpScale;", "vec2 dHdxy_fwd() {", "vec2 dSTdx = dFdx( vUv );", "vec2 dSTdy = dFdy( vUv );", "float Hll = bumpScale * texture2D( bumpMap, vUv ).x;", "float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;", "float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;", "return vec2( dBx, dBy );", "}", "vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {", "vec3 vSigmaX = dFdx( surf_pos );", "vec3 vSigmaY = dFdy( surf_pos );", "vec3 vN = surf_norm;", "vec3 R1 = cross( vSigmaY, vN );", "vec3 R2 = cross( vN, vSigmaX );", "float fDet = dot( vSigmaX, R1 );", "vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );", "return normalize( abs( fDet ) * surf_norm - vGrad );", "}", "#endif"].join("\n"),
		normalmap_pars_fragment: ["#ifdef USE_NORMALMAP", "uniform sampler2D normalMap;", "uniform vec2 normalScale;", "vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {", "vec3 q0 = dFdx( eye_pos.xyz );", "vec3 q1 = dFdy( eye_pos.xyz );", "vec2 st0 = dFdx( vUv.st );", "vec2 st1 = dFdy( vUv.st );", "vec3 S = normalize(  q0 * st1.t - q1 * st0.t );", "vec3 T = normalize( -q0 * st1.s + q1 * st0.s );", "vec3 N = normalize( surf_norm );", "vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;", "mapN.xy = normalScale * mapN.xy;", "mat3 tsn = mat3( S, T, N );", "return normalize( tsn * mapN );", "}", "#endif"].join("\n"),
		specularmap_pars_fragment: ["#ifdef USE_SPECULARMAP", "uniform sampler2D specularMap;", "#endif"].join("\n"),
		specularmap_fragment: ["float specularStrength;", "#ifdef USE_SPECULARMAP", "vec4 texelSpecular = texture2D( specularMap, vUv );", "specularStrength = texelSpecular.r;", "#else", "specularStrength = uspecularStrength;", "#endif"].join("\n"),
		lights_lambert_pars_vertex: ["uniform vec3 ambient;", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif"].join("\n"),
		lights_lambert_vertex: ["vLightFront = vec3( 0.0 );", "#ifdef DOUBLE_SIDED", "vLightBack = vec3( 0.0 );", "#endif", "transformedNormal = normalize( transformedNormal );", "#if MAX_DIR_LIGHTS > 0", "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "float dotProduct = dot( transformedNormal, dirVector );", "vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += directionalLightColor[ i ] * directionalLightWeighting;", "#ifdef DOUBLE_SIDED", "vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;", "#endif", "}", "#endif", "#if MAX_POINT_LIGHTS > 0 ", "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "float dotProduct = dot( transformedNormal, lVector );", "vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;", "#ifdef DOUBLE_SIDED", "vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );", "if ( spotEffect > spotLightAngleCos[ i ] ) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "float dotProduct = dot( transformedNormal, lVector );", "vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;", "#ifdef DOUBLE_SIDED", "vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( transformedNormal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;", "vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "#ifdef DOUBLE_SIDED", "vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );", "#endif", "}", "#endif", "vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;", "#ifdef DOUBLE_SIDED", "vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;", "#endif"].join("\n"),
		lights_phong_pars_vertex: ["#ifndef PHONG_PER_PIXEL", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "varying vec3 vWorldPosition;", "#endif"].join("\n"),
		lights_phong_vertex: ["#ifndef PHONG_PER_PIXEL", "#if MAX_POINT_LIGHTS > 0", "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "vPointLight[ i ] = vec4( lVector, lDistance );", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "vSpotLight[ i ] = vec4( lVector, lDistance );", "}", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ", "vWorldPosition = worldPosition.xyz;", "#endif"].join("\n"),
		lights_phong_pars_fragment: ["uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "#ifdef PHONG_PER_PIXEL", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#else", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "#ifdef PHONG_PER_PIXEL", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#else", "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "varying vec3 vWorldPosition;", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif", "varying vec3 vViewPosition;", "varying vec3 vNormal;"].join("\n"),
		lights_phong_fragment: ["vec3 normal = normalize( vNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#ifdef DOUBLE_SIDED", "normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );", "#endif", "#ifdef USE_NORMALMAP", "normal = perturbNormal2Arb( -viewPosition, normal );", "#elif defined( USE_BUMPMAP )", "normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );", "#endif", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse  = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "#ifdef PHONG_PER_PIXEL", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz + vViewPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "#else", "vec3 lVector = normalize( vPointLight[ i ].xyz );", "float lDistance = vPointLight[ i ].w;", "#endif", "float dotProduct = dot( normal, lVector );", "#ifdef WRAP_AROUND", "float pointDiffuseWeightFull = max( dotProduct, 0.0 );", "float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "#else", "float pointDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "pointDiffuse  += tempDiffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;", "vec3 pointHalfVector = normalize( lVector + viewPosition );", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );", "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;", "#else", "pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "vec3 spotDiffuse  = vec3( 0.0 );", "vec3 spotSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "#ifdef PHONG_PER_PIXEL", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz + vViewPosition.xyz;", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "#else", "vec3 lVector = normalize( vSpotLight[ i ].xyz );", "float lDistance = vSpotLight[ i ].w;", "#endif", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "if ( spotEffect > spotLightAngleCos[ i ]) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "float dotProduct = dot( normal, lVector );", "#ifdef WRAP_AROUND", "float spotDiffuseWeightFull = max( dotProduct, 0.0 );", "float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "#else", "float spotDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "spotDiffuse += tempDiffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;", "vec3 spotHalfVector = normalize( lVector + viewPosition );", "float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );", "spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;", "#else", "spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse  = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, dirVector );", "#ifdef WRAP_AROUND", "float dirDiffuseWeightFull = max( dotProduct, 0.0 );", "float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );", "#else", "float dirDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "dirDiffuse  += tempDiffuse * directionalLightColor[ i ] * dirDiffuseWeight;", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );", "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "#else", "dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "vec3 hemiDiffuse  = vec3( 0.0 );", "vec3 hemiSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "hemiDiffuse += tempDiffuse * hemiColor;", "vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );", "vec3 lVectorGround = -lVector;", "vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float dotProductGround = dot( normal, lVectorGround );", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );", "vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );", "hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "#else", "hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;", "#endif", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_HEMI_LIGHTS > 0", "totalDiffuse += hemiDiffuse;", "totalSpecular += hemiSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", "#if MAX_SPOT_LIGHTS > 0", "totalDiffuse += spotDiffuse;", "totalSpecular += spotSpecular;", "#endif", "float ssao = 1.0;", "#ifdef USE_SSAO", "ssao = clamp(1.0 - texture2D(mapSSAO, (finalPosition.xy / finalPosition.w / 2.0 + vec2(0.5,0.5))).x,0.0,1.0);", "#endif", "#ifdef METAL", "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + (ambientLightColor * ambient * ssao) + totalSpecular );", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + (ambientLightColor * ambient) * ssao ) + totalSpecular;", "#endif"].join("\n"),
		color_pars_fragment: ["#ifdef USE_COLOR", "varying vec3 vColor;", "#endif"].join("\n"),
		color_fragment: ["#ifdef USE_COLOR", "gl_FragColor = gl_FragColor * vec4( vColor, opacity );", "#endif"].join("\n"),
		color_pars_vertex: ["#ifdef USE_COLOR", "varying vec3 vColor;", "#endif"].join("\n"),
		color_vertex: ["#ifdef USE_COLOR", "#ifdef GAMMA_INPUT", "vColor = color * color;", "#else", "vColor = color;", "#endif", "#endif"].join("\n"),
		skinning_pars_vertex: ["#ifdef USE_SKINNING", "#ifdef BONE_TEXTURE", "uniform sampler2D boneTexture;", "mat4 getBoneMatrix( const in float i ) {", "float j = i * 4.0;", "float x = mod( j, N_BONE_PIXEL_X );", "float y = floor( j / N_BONE_PIXEL_X );", "const float dx = 1.0 / N_BONE_PIXEL_X;", "const float dy = 1.0 / N_BONE_PIXEL_Y;", "y = dy * ( y + 0.5 );", "vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );", "vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );", "vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );", "vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );", "mat4 bone = mat4( v1, v2, v3, v4 );", "return bone;", "}", "#else", "uniform mat4 boneGlobalMatrices[ MAX_BONES ];", "mat4 getBoneMatrix( const in float i ) {", "mat4 bone = boneGlobalMatrices[ int(i) ];", "return bone;", "}", "#endif", "#endif"].join("\n"),
		skinbase_vertex: ["#ifdef USE_SKINNING", "mat4 boneMatX = getBoneMatrix( skinIndex.x );", "mat4 boneMatY = getBoneMatrix( skinIndex.y );", "#endif"].join("\n"),
		skinning_vertex: ["#ifdef USE_SKINNING", "#ifdef USE_MORPHTARGETS", "vec4 skinVertex = vec4( morphed, 1.0 );", "#else", "vec4 skinVertex = vec4( position, 1.0 );", "#endif", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "#endif"].join("\n"),
		morphtarget_pars_vertex: ["#ifdef USE_MORPHTARGETS", "#ifndef USE_MORPHNORMALS", "uniform float morphTargetInfluences[ 8 ];", "#else", "uniform float morphTargetInfluences[ 4 ];", "#endif", "#endif"].join("\n"),
		morphtarget_vertex: ["#ifdef USE_MORPHTARGETS", "vec3 morphed = vec3( 0.0 );", "morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];", "morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];", "morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];", "morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];", "#ifndef USE_MORPHNORMALS", "morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];", "morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];", "morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];", "morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];", "#endif", "morphed += position;", "#endif"].join("\n"),
		default_vertex: ["vec4 mvPosition;", "#ifdef USE_SKINNING", "mvPosition = modelViewMatrix * skinned;", "#endif", "#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )", "mvPosition = modelViewMatrix * vec4( morphed, 1.0 );", "#endif", "#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )", "mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#endif", "gl_Position = projectionMatrix * mvPosition;"].join("\n"),
		morphnormal_vertex: ["#ifdef USE_MORPHNORMALS", "vec3 morphedNormal = vec3( 0.0 );", "morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];", "morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];", "morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];", "morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];", "morphedNormal += normal;", "#endif"].join("\n"),
		skinnormal_vertex: ["#ifdef USE_SKINNING", "mat4 skinMatrix = skinWeight.x * boneMatX;", "skinMatrix 	+= skinWeight.y * boneMatY;", "#ifdef USE_MORPHNORMALS", "vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );", "#else", "vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );", "#endif", "#endif"].join("\n"),
		defaultnormal_vertex: ["vec3 objectNormal;", "#ifdef USE_SKINNING", "objectNormal = skinnedNormal.xyz;", "#endif", "#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )", "objectNormal = morphedNormal;", "#endif", "#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )", "objectNormal = normal;", "#endif", "#ifdef FLIP_SIDED", "objectNormal = -objectNormal;", "#endif", "vec3 transformedNormal = normalMatrix * objectNormal;"].join("\n"),
		shadowmap_pars_fragment: ["#ifdef USE_SHADOWMAP", "uniform sampler2D shadowMap[ MAX_SHADOWS ];", "uniform vec2 shadowMapSize[ MAX_SHADOWS ];", "uniform float shadowDarkness[ MAX_SHADOWS ];", "uniform float shadowBias[ MAX_SHADOWS ];", "varying vec4 vShadowCoord[ MAX_SHADOWS ];", "#endif", "#ifdef USE_POINT_SHADOWMAP", "uniform samplerCube pShadowMap[MAX_POINT_SHADOWS];", "uniform float pShadowDarkness[MAX_POINT_SHADOWS];", "uniform vec3 pPosition[MAX_POINT_SHADOWS];", "varying vec4 pWorldPosition;", "#endif", "#if defined(USE_SHADOWMAP) || defined(USE_POINT_SHADOWMAP)", "float unpackDepth( const in vec4 rgba_depth ) {", "const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );", "float depth = dot( rgba_depth, bit_shift );", "return depth;", "}", "float unpack (vec4 colour){", "const vec4 bitShifts = vec4(1.0,1.0 / 255.0,1.0 / (255.0 * 255.0),1.0 / (255.0 * 255.0 * 255.0));", "return dot(colour, bitShifts) * 100000.0;", "}", "#endif"].join("\n"),
		shadowmap_fragment: ["#ifdef USE_SHADOWMAP", "#ifdef SHADOWMAP_DEBUG", "vec3 frustumColors[3];", "frustumColors[0] = vec3( 1.0, 0.5, 0.0 );", "frustumColors[1] = vec3( 0.0, 1.0, 0.8 );", "frustumColors[2] = vec3( 0.0, 0.5, 1.0 );", "#endif", "#ifdef SHADOWMAP_CASCADE", "int inFrustumCount = 0;", "#endif", "float fDepth;", "vec3 shadowColor = vec3( 1.0 );", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;", "bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );", "bool inFrustum = all( inFrustumVec );", "#ifdef SHADOWMAP_CASCADE", "inFrustumCount += int( inFrustum );", "bvec3 frustumTestVec = bvec3(inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );", "#else", "bvec2 frustumTestVec = bvec2(inFrustum, shadowCoord.z <= 1.0 );", "#endif", "bool frustumTest = all( frustumTestVec );", "if ( frustumTest) {", "shadowCoord.z += shadowBias[ i ];", "#if defined( SHADOWMAP_TYPE_PCF )", "float shadow = 0.0;", "const float shadowDelta = 1.0 / 9.0;", "float xPixelOffset = 1.0 / shadowMapSize[ i ].x;", "float yPixelOffset = 1.0 / shadowMapSize[ i ].y;", "float dx0 = -1.25 * xPixelOffset;", "float dy0 = -1.25 * yPixelOffset;", "float dx1 = 1.25 * xPixelOffset;", "float dy1 = 1.25 * yPixelOffset;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );", "#elif defined( SHADOWMAP_TYPE_PCF_SOFT )", "float shadow = 0.0;", "float xPixelOffset = 1.0 / shadowMapSize[ i ].x;", "float yPixelOffset = 1.0 / shadowMapSize[ i ].y;", "float dx0 = -1.0 * xPixelOffset;", "float dy0 = -1.0 * yPixelOffset;", "float dx1 = 1.0 * xPixelOffset;", "float dy1 = 1.0 * yPixelOffset;", "mat3 shadowKernel;", "mat3 depthKernel;", "depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );", "if ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;", "else shadowKernel[0][0] = 0.0;", "depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );", "if ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;", "else shadowKernel[0][1] = 0.0;", "depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );", "if ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;", "else shadowKernel[0][2] = 0.0;", "depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );", "if ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;", "else shadowKernel[1][0] = 0.0;", "depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );", "if ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;", "else shadowKernel[1][1] = 0.0;", "depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );", "if ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;", "else shadowKernel[1][2] = 0.0;", "depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );", "if ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;", "else shadowKernel[2][0] = 0.0;", "depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );", "if ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;", "else shadowKernel[2][1] = 0.0;", "depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );", "if ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;", "else shadowKernel[2][2] = 0.0;", "vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );", "shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );", "shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );", "vec4 shadowValues;", "shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );", "shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );", "shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );", "shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );", "shadow = dot( shadowValues, vec4( 1.0 ) );", "shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );", "#else", "vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );", "float fDepth = unpackDepth( rgbaDepth );", "if ( fDepth < shadowCoord.z )", "shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );", "#endif", "}", "#ifdef SHADOWMAP_DEBUG", "#ifdef SHADOWMAP_CASCADE", "if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];", "#else", "if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];", "#endif", "#endif", "}", "#ifdef GAMMA_OUTPUT", "shadowColor *= shadowColor;", "#endif", "gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;", "#endif", "#ifdef USE_POINT_SHADOWMAP", "for( int i = 0; i < MAX_POINT_SHADOWS; i ++ ) {", "vec3 lightVec = normalize(pWorldPosition.xyz - pPosition[i]);", "float depth = length(pWorldPosition.xyz - pPosition[i]);", "float shadowDepth = unpack (textureCube(pShadowMap[i], lightVec));", "depth = depth * 0.95;", "if ( depth > shadowDepth){", "gl_FragColor.xyz *= 0.8;", "}", "}", "#endif"].join("\n"),
		shadowmap_pars_vertex: ["#ifdef USE_SHADOWMAP", "varying vec4 vShadowCoord[ MAX_SHADOWS ];", "uniform mat4 shadowMatrix[ MAX_SHADOWS ];", "#endif", "#ifdef USE_POINT_SHADOWMAP", "varying vec4 pWorldPosition;", "#endif"].join("\n"),
		shadowmap_vertex: ["#ifdef USE_SHADOWMAP", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "}", "#endif", "#ifdef USE_POINT_SHADOWMAP", "pWorldPosition = modelMatrix * vec4(position,1.0);", "#endif"].join("\n"),
		alphatest_fragment: ["#ifdef ALPHATEST", "if ( gl_FragColor.a < ALPHATEST ) discard;", "#endif"].join("\n"),
		linear_to_gamma_fragment: ["#ifdef GAMMA_OUTPUT", "gl_FragColor.xyz = sqrt( gl_FragColor.xyz );", "#endif"].join("\n")
	}, Qe.UniformsUtils = {
		merge: function(t) {
			var e, i, r, a = {};
			for (e = 0; e < t.length; e++) {
				r = this.clone(t[e]);
				for (i in r) a[i] = r[i]
			}
			return a
		},
		clone: function(t) {
			var e, i, r, a = {};
			for (e in t) {
				a[e] = {};
				for (i in t[e]) r = t[e][i], r instanceof Qe.Color || r instanceof Qe.XiangliangTwo || r instanceof Qe.XiangliangThree || r instanceof Qe.Vec4 || r instanceof Qe.Mat4 || r instanceof Qe.Texture ? a[e][i] = r.clone() : r instanceof Array ? a[e][i] = r.slice() : a[e][i] = r
			}
			return a
		}
	}, Qe.UniformsLib = {
		outline: {
			diffuse: {
				type: "c",
				value: new Qe.Color(15658734)
			},
			outline_offset: {
				type: "f",
				value: 0
			}
		},
		glow: {
			map: {
				type: "t",
				value: null
			}
		},
		blur: {
			orientation: {
				type: "i",
				value: 0
			},
			texelSize: {
				type: "v2",
				value: new Qe.XiangliangTwo(512, 512)
			},
			blurAmount: {
				type: "i",
				value: 10
			},
			blurScale: {
				type: "f",
				value: 1
			},
			blurStrength: {
				type: "f",
				value: .2
			},
			map: {
				type: "t",
				value: null
			},
			useBlur: {
				type: "i",
				value: 1
			},
			blurGlobalAlpha: {
				type: "f",
				value: 1
			}
		},
		deferred: {
			linearDepth: {
				type: "f",
				value: 9e3
			},
			isNormal: {
				type: "i",
				value: 1
			}
		},
		ssao: {
			map0: {
				type: "t",
				value: null
			},
			map1: {
				type: "t",
				value: null
			},
			map2: {
				type: "t",
				value: null
			},
			occluderBias: {
				type: "f",
				value: .05
			},
			samplingRadius: {
				type: "f",
				value: 20
			},
			attenuation: {
				type: "v2",
				value: new Ke(1, 0)
			},
			texelSize: {
				type: "v2",
				value: new Ke(1 / 512, 1 / 512)
			}
		},
		common: {
			diffuse: {
				type: "c",
				value: new Qe.Color(15658734)
			},
			opacity: {
				type: "f",
				value: 1
			},
			map: {
				type: "t",
				value: null
			},
			mapLoaded: {
				type: "i",
				value: 0
			},
			offsetRepeat: {
				type: "v4",
				value: new Qe.Vec4(0, 0, 1, 1)
			},
			flipX: {
				type: "i",
				value: 0
			},
			lightMap: {
				type: "t",
				value: null
			},
			specularMap: {
				type: "t",
				value: null
			},
			envMap: {
				type: "t",
				value: null
			},
			flipEnvMap: {
				type: "f",
				value: -1
			},
			useRefract: {
				type: "i",
				value: 0
			},
			reflectivity: {
				type: "f",
				value: 1
			},
			refractionRatio: {
				type: "f",
				value: .98
			},
			combine: {
				type: "i",
				value: 0
			},
			morphTargetInfluences: {
				type: "f",
				value: 0
			}
		},
		gradient: {
			gradientColor: {
				type: "v3v",
				value: []
			},
			gradientStop: {
				type: "fv1",
				value: []
			},
			gradientType: {
				type: "i",
				value: 0
			}
		},
		bump: {
			bumpMap: {
				type: "t",
				value: null
			},
			bumpScale: {
				type: "f",
				value: 1
			}
		},
		normalmap: {
			normalMap: {
				type: "t",
				value: null
			},
			normalScale: {
				type: "v2",
				value: new Qe.XiangliangTwo(1, 1)
			}
		},
		fog: {
			fogDensity: {
				type: "f",
				value: 25e-5
			},
			fogNear: {
				type: "f",
				value: 1
			},
			fogFar: {
				type: "f",
				value: 2e3
			},
			fogColor: {
				type: "c",
				value: new Qe.Color(16777215)
			}
		},
		lights: {
			ambientLightColor: {
				type: "fv",
				value: []
			},
			directionalLightDirection: {
				type: "fv",
				value: []
			},
			directionalLightColor: {
				type: "fv",
				value: []
			},
			hemisphereLightDirection: {
				type: "fv",
				value: []
			},
			hemisphereLightSkyColor: {
				type: "fv",
				value: []
			},
			hemisphereLightGroundColor: {
				type: "fv",
				value: []
			},
			pointLightColor: {
				type: "fv",
				value: []
			},
			pointLightPosition: {
				type: "fv",
				value: []
			},
			pointLightDistance: {
				type: "fv1",
				value: []
			},
			spotLightColor: {
				type: "fv",
				value: []
			},
			spotLightPosition: {
				type: "fv",
				value: []
			},
			spotLightDirection: {
				type: "fv",
				value: []
			},
			spotLightDistance: {
				type: "fv1",
				value: []
			},
			spotLightAngleCos: {
				type: "fv1",
				value: []
			},
			spotLightExponent: {
				type: "fv1",
				value: []
			}
		},
		particle: {
			psColor: {
				type: "c",
				value: new Qe.Color(15658734)
			},
			opacity: {
				type: "f",
				value: 1
			},
			size: {
				type: "f",
				value: 1
			},
			scale: {
				type: "f",
				value: 1
			},
			map: {
				type: "t",
				value: null
			},
			fogDensity: {
				type: "f",
				value: 25e-5
			},
			fogNear: {
				type: "f",
				value: 1
			},
			fogFar: {
				type: "f",
				value: 2e3
			},
			fogColor: {
				type: "c",
				value: new Qe.Color(16777215)
			}
		},
		shadowmap: {
			shadowMap: {
				type: "tv",
				value: []
			},
			shadowMapSize: {
				type: "v2v",
				value: []
			},
			shadowBias: {
				type: "fv1",
				value: []
			},
			shadowDarkness: {
				type: "fv1",
				value: []
			},
			shadowMatrix: {
				type: "m4v",
				value: []
			},
			pShadowMap: {
				type: "tv",
				value: []
			},
			pShadowMapSize: {
				type: "v2v",
				value: []
			},
			pShadowDarkness: {
				type: "fv1",
				value: []
			},
			pPosition: {
				type: "v3v",
				value: []
			}
		}
	}, Qe.ShaderLib = {
		outline: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.outline]),
			vertexShader: ["uniform float outline_offset;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position + normal  * outline_offset, 1.0 );", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
			fragmentShader: ["uniform vec3 diffuse;", "void main() {", "gl_FragColor = vec4(diffuse, 1.0 );", "}"].join("\n")
		},
		blur: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.blur]),
			vertexShader: ["varying vec2 vUv;", "void main (){", "gl_Position = vec4(position, 1.0);", "vUv = uv;", "}"].join("\n"),
			fragmentShader: ["uniform vec2 texelSize;", "uniform sampler2D map;", "uniform int orientation;", "uniform int blurAmount;", "uniform float blurScale;", "uniform float blurStrength;", "uniform int useBlur;", "uniform float blurGlobalAlpha;", "uniform sampler2D depthMap;", "varying vec2 vUv;", "float Gaussian (float x, float deviation){", "return (1.0 / sqrt(2.0 * 3.141592 * deviation)) * exp(-((x * x) / (2.0 * deviation)));", "}", "void main (){", "float halfBlur = float(blurAmount) * 0.5;", "vec4 colour = vec4(0.0);", "if(useBlur == 0){", "colour = texture2D(map,vUv);", "}else {", "vec4 texColour = vec4(0.0);", "float deviation = halfBlur * 0.35;", "deviation *= deviation;", "float strength = 1.0 - blurStrength;", "if ( orientation == 0 ){", "for (int i = 0; i < 20; ++i){", "if ( i >= blurAmount ){", "break;", "}", "float offset = float(i) - halfBlur;", "texColour = texture2D(map, vUv + vec2(offset / texelSize.x * blurScale, 0.0)) * Gaussian(offset * strength, deviation);", "colour += texColour;", "}", "}else{", "for (int i = 0; i < 20; ++i){", "if ( i >= blurAmount )", "break;", "float offset = float(i) - halfBlur;", "texColour = texture2D(map, vUv + vec2(0.0, offset / texelSize.y * blurScale)) * Gaussian(offset * strength, deviation);", "colour += texColour;", "}", "}", "}", "gl_FragColor = clamp(colour, 0.0, 1.0);", "if(useBlur == 0){", "gl_FragColor.w *=  gl_FragColor.w * gl_FragColor.w * gl_FragColor.w * blurGlobalAlpha;", "}", "}"].join("\n")
		},
		deferred: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.deferred]),
			vertexShader: ["varying vec4 vPosition;", "varying vec3 vNormal;", "void main (){", "vNormal = mat3(modelViewMatrix) * normal;", "vPosition = modelViewMatrix * vec4(position, 1.0);", "gl_Position = projectionMatrix * vPosition;", "}"].join("\n"),
			fragmentShader: ["uniform float linearDepth;", "uniform int isNormal;", "varying vec4 vPosition;", "varying vec3 vNormal;", "void main (){", "float linear_depth = length(vPosition) / linearDepth;", "if(isNormal == 1){", "vec3 normal = normalize(vNormal);", "gl_FragColor = vec4(normal.x, normal.y, normal.z, 1.0);", "}else{", "gl_FragColor = vec4(vPosition.x, vPosition.y, vPosition.z, linear_depth);", "}", "}"].join("\n")
		},
		ssao: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.ssao]),
			vertexShader: ["varying vec2 vUv;", "void main (){", "gl_Position = vec4(position, 1.0);", "vUv = uv;", "}"].join("\n"),
			fragmentShader: ["uniform sampler2D map0;", "uniform sampler2D map1;", "uniform sampler2D map2;", "uniform vec2 texelSize;", "uniform float occluderBias;", "uniform float samplingRadius;", "uniform vec2 attenuation;", "varying vec2 vUv;", "float samplePixels (vec3 srcPosition, vec3 srcNormal, vec2 uv){", "vec3 dstPosition = texture2D(map0, uv).xyz;", "vec3 positionVec = dstPosition - srcPosition;", "float intensity = max(dot(normalize(positionVec), srcNormal) - occluderBias, 0.0);", "float dist = length(positionVec);", "float attenuationValue = 1.0 / (attenuation.x + (attenuation.y * dist));", "return intensity * attenuationValue;", "}", "void main (){", "vec3 srcPosition = texture2D(map0, vUv).xyz;", "vec3 srcNormal = texture2D(map1, vUv).xyz;", "vec2 randVec = normalize(texture2D(map2, vUv).xy * 2.0 - 1.0);", "float srcDepth = texture2D(map0, vUv).w;", "float kernelRadius = samplingRadius * (1.0 - srcDepth);", "vec2 kernel[4];", "kernel[0] = vec2(0.0, 1.0);", "kernel[1] = vec2(1.0, 0.0);", "kernel[2] = vec2(0.0, -1.0);", "kernel[3] = vec2(-1.0, 0.0);", "const float sin45 = 0.707107;", "float occlusion = 0.0;", "for (int i = 0; i < 4; ++i){", "vec2 k1 = reflect(kernel[i], randVec);", "vec2 k2 = vec2(k1.x * sin45 - k1.y * sin45,k1.x * sin45 + k1.y * sin45);", "k1 *= texelSize;", "k2 *= texelSize;", "occlusion += samplePixels(srcPosition, srcNormal, vUv + k1 * kernelRadius);", "occlusion += samplePixels(srcPosition, srcNormal, vUv + k2 * kernelRadius * 0.75);", "occlusion += samplePixels(srcPosition, srcNormal, vUv + k1 * kernelRadius * 0.5);", "occlusion += samplePixels(srcPosition, srcNormal, vUv + k2 * kernelRadius * 0.25);", "}", "occlusion /= 16.0;", "occlusion = clamp(occlusion, 0.0, 1.0);", "gl_FragColor =  vec4(occlusion,0.0,0.0,1.0);", "}"].join("\n")
		},
		basic: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.common, Qe.UniformsLib.gradient, Qe.UniformsLib.fog]),
			vertexShader: [Qe.ShaderChunk.map_pars_vertex, Qe.ShaderChunk.lightmap_pars_vertex, Qe.ShaderChunk.envmap_pars_vertex, Qe.ShaderChunk.color_pars_vertex, Qe.ShaderChunk.morphtarget_pars_vertex, Qe.ShaderChunk.skinning_pars_vertex, "void main() {", Qe.ShaderChunk.map_vertex, Qe.ShaderChunk.lightmap_vertex, Qe.ShaderChunk.color_vertex, Qe.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", Qe.ShaderChunk.morphnormal_vertex, Qe.ShaderChunk.skinnormal_vertex, Qe.ShaderChunk.defaultnormal_vertex, "#endif", Qe.ShaderChunk.morphtarget_vertex, Qe.ShaderChunk.skinning_vertex, Qe.ShaderChunk.default_vertex, Qe.ShaderChunk.worldpos_vertex, Qe.ShaderChunk.envmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", Qe.ShaderChunk.color_pars_fragment, Qe.ShaderChunk.map_pars_fragment, Qe.ShaderChunk.gradient_parts_fragment, Qe.ShaderChunk.lightmap_pars_fragment, Qe.ShaderChunk.envmap_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, Qe.ShaderChunk.specularmap_pars_fragment, "void main() {", "gl_FragColor = vec4( diffuse, opacity );", Qe.ShaderChunk.gradient_basic_fragment, Qe.ShaderChunk.map_fragment, Qe.ShaderChunk.alphatest_fragment, Qe.ShaderChunk.lightmap_fragment, Qe.ShaderChunk.color_fragment, Qe.ShaderChunk.envmap_fragment, Qe.ShaderChunk.linear_to_gamma_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		lambert: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.common, Qe.UniformsLib.fog, Qe.UniformsLib.lights, Qe.UniformsLib.shadowmap, {
				ambient: {
					type: "c",
					value: new Qe.Color(16777215)
				},
				emissive: {
					type: "c",
					value: new Qe.Color(0)
				},
				wrapRGB: {
					type: "v3",
					value: new Qe.XiangliangThree(1, 1, 1)
				}
			}]),
			vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", Qe.ShaderChunk.map_pars_vertex, Qe.ShaderChunk.lightmap_pars_vertex, Qe.ShaderChunk.envmap_pars_vertex, Qe.ShaderChunk.lights_lambert_pars_vertex, Qe.ShaderChunk.color_pars_vertex, Qe.ShaderChunk.morphtarget_pars_vertex, Qe.ShaderChunk.skinning_pars_vertex, Qe.ShaderChunk.shadowmap_pars_vertex, "void main() {", Qe.ShaderChunk.map_vertex, Qe.ShaderChunk.lightmap_vertex, Qe.ShaderChunk.color_vertex, Qe.ShaderChunk.morphnormal_vertex, Qe.ShaderChunk.skinbase_vertex, Qe.ShaderChunk.skinnormal_vertex, Qe.ShaderChunk.defaultnormal_vertex, Qe.ShaderChunk.morphtarget_vertex, Qe.ShaderChunk.skinning_vertex, Qe.ShaderChunk.default_vertex, Qe.ShaderChunk.worldpos_vertex, Qe.ShaderChunk.envmap_vertex, Qe.ShaderChunk.lights_lambert_vertex, Qe.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", Qe.ShaderChunk.color_pars_fragment, Qe.ShaderChunk.map_pars_fragment, Qe.ShaderChunk.lightmap_pars_fragment, Qe.ShaderChunk.envmap_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, Qe.ShaderChunk.shadowmap_pars_fragment, Qe.ShaderChunk.specularmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", Qe.ShaderChunk.map_fragment, Qe.ShaderChunk.alphatest_fragment, Qe.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED", "if ( gl_FrontFacing )", "gl_FragColor.xyz *= vLightFront;", "else", "gl_FragColor.xyz *= vLightBack;", "#else", "gl_FragColor.xyz *= vLightFront;", "#endif", Qe.ShaderChunk.lightmap_fragment, Qe.ShaderChunk.color_fragment, Qe.ShaderChunk.envmap_fragment, Qe.ShaderChunk.shadowmap_fragment, Qe.ShaderChunk.linear_to_gamma_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		phong: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.common, Qe.UniformsLib.gradient, Qe.UniformsLib.bump, Qe.UniformsLib.normalmap, Qe.UniformsLib.fog, Qe.UniformsLib.lights, Qe.UniformsLib.shadowmap, {
				ambient: {
					type: "c",
					value: new Qe.Color(16777215)
				},
				emissive: {
					type: "c",
					value: new Qe.Color(0)
				},
				specular: {
					type: "c",
					value: new Qe.Color(1118481)
				},
				uspecularStrength: {
					type: "f",
					value: 1
				},
				shininess: {
					type: "f",
					value: 30
				},
				wrapRGB: {
					type: "v3",
					value: new Qe.XiangliangThree(1, 1, 1)
				},
				mapSSAO: {
					type: "t",
					value: null
				}
			}]),
			vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", "varying vec4 finalPosition;", Qe.ShaderChunk.map_pars_vertex, Qe.ShaderChunk.lightmap_pars_vertex, Qe.ShaderChunk.envmap_pars_vertex, Qe.ShaderChunk.lights_phong_pars_vertex, Qe.ShaderChunk.color_pars_vertex, Qe.ShaderChunk.morphtarget_pars_vertex, Qe.ShaderChunk.skinning_pars_vertex, Qe.ShaderChunk.shadowmap_pars_vertex, "void main() {", Qe.ShaderChunk.map_vertex, Qe.ShaderChunk.lightmap_vertex, Qe.ShaderChunk.color_vertex, Qe.ShaderChunk.morphnormal_vertex, Qe.ShaderChunk.skinbase_vertex, Qe.ShaderChunk.skinnormal_vertex, Qe.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", Qe.ShaderChunk.morphtarget_vertex, Qe.ShaderChunk.skinning_vertex, Qe.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", Qe.ShaderChunk.worldpos_vertex, Qe.ShaderChunk.envmap_vertex, Qe.ShaderChunk.lights_phong_vertex, Qe.ShaderChunk.shadowmap_vertex, "finalPosition = gl_Position;", "}"].join("\n"),
			fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float uspecularStrength;", "uniform float shininess;", "varying vec4 finalPosition;", Qe.ShaderChunk.color_pars_fragment, Qe.ShaderChunk.gradient_parts_fragment, Qe.ShaderChunk.map_pars_fragment, Qe.ShaderChunk.lightmap_pars_fragment, Qe.ShaderChunk.envmap_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, Qe.ShaderChunk.lights_phong_pars_fragment, Qe.ShaderChunk.shadowmap_pars_fragment, Qe.ShaderChunk.bumpmap_pars_fragment, Qe.ShaderChunk.normalmap_pars_fragment, Qe.ShaderChunk.specularmap_pars_fragment, "#ifdef USE_SSAO", "uniform sampler2D mapSSAO;", "#endif", "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", "vec3 tempDiffuse = diffuse;", Qe.ShaderChunk.gradient_phong_fragment, Qe.ShaderChunk.map_fragment, Qe.ShaderChunk.alphatest_fragment, Qe.ShaderChunk.specularmap_fragment, Qe.ShaderChunk.lights_phong_fragment, Qe.ShaderChunk.lightmap_fragment, Qe.ShaderChunk.color_fragment, Qe.ShaderChunk.envmap_fragment, Qe.ShaderChunk.shadowmap_fragment, Qe.ShaderChunk.linear_to_gamma_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		particle_basic: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.particle, Qe.UniformsLib.shadowmap]),
			vertexShader: ["uniform float size;", "uniform float scale;", Qe.ShaderChunk.color_pars_vertex, Qe.ShaderChunk.shadowmap_pars_vertex, "void main() {", Qe.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#ifdef USE_SIZEATTENUATION", "gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "#else", "gl_PointSize = size;", "#endif", "gl_Position = projectionMatrix * mvPosition;", Qe.ShaderChunk.worldpos_vertex, Qe.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
			fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", Qe.ShaderChunk.color_pars_fragment, Qe.ShaderChunk.map_particle_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, Qe.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( psColor, opacity );", Qe.ShaderChunk.map_particle_fragment, Qe.ShaderChunk.alphatest_fragment, Qe.ShaderChunk.color_fragment, Qe.ShaderChunk.shadowmap_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		billboard: {
			vertexShader: ["uniform int useScreenCoordinates;", "uniform int sizeAttenuation;", "uniform vec3 screenPosition;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 alignment;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position + alignment;", "vec2 rotatedPosition;", "rotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;", "rotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;", "vec4 finalPosition;", "if( useScreenCoordinates != 0 ) {", "finalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );", "} else {", "finalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );", "}", "gl_Position = finalPosition;", "}"].join("\n"),
			fragmentShader: ["uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")
		},
		dashed: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.common, Qe.UniformsLib.fog, {
				scale: {
					type: "f",
					value: 1
				},
				dashSize: {
					type: "f",
					value: 1
				},
				totalSize: {
					type: "f",
					value: 2
				}
			}]),
			vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", Qe.ShaderChunk.color_pars_vertex, "void main() {", Qe.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
			fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", Qe.ShaderChunk.color_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, "void main() {", "if ( mod( vLineDistance, totalSize ) > dashSize ) {", "discard;", "}", "gl_FragColor = vec4( diffuse, opacity );", Qe.ShaderChunk.color_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n")
		},
		depth: {
			uniforms: {
				mNear: {
					type: "f",
					value: 1
				},
				mFar: {
					type: "f",
					value: 2e3
				},
				opacity: {
					type: "f",
					value: 1
				}
			},
			vertexShader: ["void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
			fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", "void main() {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float color = 1.0 - smoothstep( mNear, mFar, depth );", "gl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
		},
		normal: {
			uniforms: {
				opacity: {
					type: "f",
					value: 1
				}
			},
			vertexShader: ["varying vec3 vNormal;", "void main() {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vNormal = normalize( normalMatrix * normal );", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
			fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", "void main() {", "gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", "}"].join("\n")
		},
		normalmap: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.fog, Qe.UniformsLib.lights, Qe.UniformsLib.shadowmap, {
				enableAO: {
					type: "i",
					value: 0
				},
				enableDiffuse: {
					type: "i",
					value: 0
				},
				enableSpecular: {
					type: "i",
					value: 0
				},
				enableReflection: {
					type: "i",
					value: 0
				},
				enableDisplacement: {
					type: "i",
					value: 0
				},
				tDisplacement: {
					type: "t",
					value: null
				},
				tDiffuse: {
					type: "t",
					value: null
				},
				tCube: {
					type: "t",
					value: null
				},
				tNormal: {
					type: "t",
					value: null
				},
				tSpecular: {
					type: "t",
					value: null
				},
				tAO: {
					type: "t",
					value: null
				},
				uNormalScale: {
					type: "v2",
					value: new Qe.XiangliangTwo(1, 1)
				},
				uDisplacementBias: {
					type: "f",
					value: 0
				},
				uDisplacementScale: {
					type: "f",
					value: 1
				},
				uDiffuseColor: {
					type: "c",
					value: new Qe.Color(16777215)
				},
				uSpecularColor: {
					type: "c",
					value: new Qe.Color(1118481)
				},
				uSpecualarStrength: {
					type: "f",
					value: 1
				},
				uAmbientColor: {
					type: "c",
					value: new Qe.Color(16777215)
				},
				uShininess: {
					type: "f",
					value: 30
				},
				uOpacity: {
					type: "f",
					value: 1
				},
				useRefract: {
					type: "i",
					value: 0
				},
				uRefractionRatio: {
					type: "f",
					value: .98
				},
				uReflectivity: {
					type: "f",
					value: .5
				},
				uOffset: {
					type: "v2",
					value: new Qe.XiangliangTwo(0, 0)
				},
				uRepeat: {
					type: "v2",
					value: new Qe.XiangliangTwo(1, 1)
				},
				wrapRGB: {
					type: "v3",
					value: new Qe.XiangliangThree(1, 1, 1)
				}
			}]),
			fragmentShader: ["uniform vec3 uAmbientColor;", "uniform vec3 uDiffuseColor;", "uniform vec3 uSpecularColor;", "uniform vec3 uSpecularStrength;", "uniform float uShininess;", "uniform float uOpacity;", "uniform bool enableDiffuse;", "uniform bool enableSpecular;", "uniform bool enableAO;", "uniform bool enableReflection;", "uniform sampler2D tDiffuse;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tAO;", "uniform samplerCube tCube;", "uniform vec2 uNormalScale;", "uniform bool useRefract;", "uniform float uRefractionRatio;", "uniform float uReflectivity;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", Qe.ShaderChunk.shadowmap_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3( 1.0 ), uOpacity );", "vec3 specularTex = vec3( 1.0 );", "vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;", "normalTex.xy *= uNormalScale;", "normalTex = normalize( normalTex );", "if( enableDiffuse ) {", "#ifdef GAMMA_INPUT", "vec4 texelColor = texture2D( tDiffuse, vUv );", "texelColor.xyz *= texelColor.xyz;", "gl_FragColor = gl_FragColor * texelColor;", "#else", "gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );", "#endif", "}", "if( enableAO ) {", "#ifdef GAMMA_INPUT", "vec4 aoColor = texture2D( tAO, vUv );", "aoColor.xyz *= aoColor.xyz;", "gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;", "#endif", "}", "if( enableSpecular )", "specularTex = texture2D( tSpecular, vUv ).xyz;", "mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );", "vec3 finalNormal = tsb * normalTex;", "#ifdef FLIP_SIDED", "finalNormal = -finalNormal;", "#endif", "vec3 normal = normalize( finalNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 pointVector = lPosition.xyz + vViewPosition.xyz;", "float pointDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );", "pointVector = normalize( pointVector );", "#ifdef WRAP_AROUND", "float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );", "float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );", "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "#else", "float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );", "#endif", "pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;", "vec3 pointHalfVector = normalize( pointVector + viewPosition );", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );", "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;", "#else", "pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "vec3 spotDiffuse = vec3( 0.0 );", "vec3 spotSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 spotVector = lPosition.xyz + vViewPosition.xyz;", "float spotDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );", "spotVector = normalize( spotVector );", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "if ( spotEffect > spotLightAngleCos[ i ] ) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "#ifdef WRAP_AROUND", "float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );", "float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );", "vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "#else", "float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );", "#endif", "spotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;", "vec3 spotHalfVector = normalize( spotVector + viewPosition );", "float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );", "spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;", "#else", "spotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "#ifdef WRAP_AROUND", "float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );", "float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );", "vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );", "#else", "float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "#endif", "dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );", "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "#else", "dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "vec3 hemiDiffuse  = vec3( 0.0 );", "vec3 hemiSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "hemiDiffuse += uDiffuseColor * hemiColor;", "vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "float hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );", "vec3 lVectorGround = -lVector;", "vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "float hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float dotProductGround = dot( normal, lVectorGround );", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );", "vec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );", "hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "#else", "hemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;", "#endif", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_HEMI_LIGHTS > 0", "totalDiffuse += hemiDiffuse;", "totalSpecular += hemiSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", "#if MAX_SPOT_LIGHTS > 0", "totalDiffuse += spotDiffuse;", "totalSpecular += spotSpecular;", "#endif", "#ifdef METAL", "gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;", "#endif", "if ( enableReflection ) {", "vec3 vReflect;", "vec3 gleyeToVertex = normalize( vWorldPosition - gleyePosition );", "if ( useRefract ) {", "vReflect = refract( gleyeToVertex, normal, uRefractionRatio );", "} else {", "vReflect = reflect( gleyeToVertex, normal );", "}", "vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );", "#ifdef GAMMA_INPUT", "cubeColor.xyz *= cubeColor.xyz;", "#endif", "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );", "}", Qe.ShaderChunk.shadowmap_fragment, Qe.ShaderChunk.linear_to_gamma_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n"),
			vertexShader: ["attribute vec4 tangent;", "uniform vec2 uOffset;", "uniform vec2 uRepeat;", "uniform bool enableDisplacement;", "#ifdef VERTEX_TEXTURES", "uniform sampler2D tDisplacement;", "uniform float uDisplacementScale;", "uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", Qe.ShaderChunk.skinning_pars_vertex, Qe.ShaderChunk.shadowmap_pars_vertex, "void main() {", Qe.ShaderChunk.skinbase_vertex, Qe.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING", "vNormal = normalize( normalMatrix * skinnedNormal.xyz );", "vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );", "vTangent = normalize( normalMatrix * skinnedTangent.xyz );", "#else", "vNormal = normalize( normalMatrix * normal );", "vTangent = normalize( normalMatrix * tangent.xyz );", "#endif", "vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );", "vUv = uv * uRepeat + uOffset;", "vec3 displacedPosition;", "#ifdef VERTEX_TEXTURES", "if ( enableDisplacement ) {", "vec3 dv = texture2D( tDisplacement, uv ).xyz;", "float df = uDisplacementScale * dv.x + uDisplacementBias;", "displacedPosition = position + normalize( normal ) * df;", "} else {", "#ifdef USE_SKINNING", "vec4 skinVertex = vec4( position, 1.0 );", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "displacedPosition  = skinned.xyz;", "#else", "displacedPosition = position;", "#endif", "}", "#else", "#ifdef USE_SKINNING", "vec4 skinVertex = vec4( position, 1.0 );", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "displacedPosition  = skinned.xyz;", "#else", "displacedPosition = position;", "#endif", "#endif", "vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );", "vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );", "gl_Position = projectionMatrix * mvPosition;", "vWorldPosition = worldPosition.xyz;", "vViewPosition = -mvPosition.xyz;", "#ifdef USE_SHADOWMAP", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "}", "#endif", "}"].join("\n")
		},
		cube: {
			uniforms: {
				tCube: {
					type: "t",
					value: null
				},
				tFlip: {
					type: "f",
					value: -1
				}
			},
			vertexShader: ["varying vec3 vWorldPosition;", "void main() {", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "vWorldPosition = worldPosition.xyz;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
			fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", "void main() {", "gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", "}"].join("\n")
		},
		depthRGBA: {
			uniforms: {
				isCube: {
					type: "i",
					value: 0
				}
			},
			vertexShader: [Qe.ShaderChunk.morphtarget_pars_vertex, Qe.ShaderChunk.skinning_pars_vertex, "varying vec4 vPosition1;", "void main() {", Qe.ShaderChunk.skinbase_vertex, Qe.ShaderChunk.morphtarget_vertex, Qe.ShaderChunk.skinning_vertex, Qe.ShaderChunk.default_vertex, "vPosition1 = modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
			fragmentShader: ["uniform int isCube;", "varying vec4 vPosition1;", "varying vec3 vPosition2;", "vec4 pack_depth( const in float depth ) {", "const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "vec4 res = fract( depth * bit_shift );", "res -= res.xxyz * bit_mask;", "return res;", "}", "vec4 pack (float depth){", "const vec4 bias = vec4(1.0 / 255.0,1.0 / 255.0,1.0 / 255.0, 0.0);", "float r = depth;", "float g = fract(r * 255.0);", "float b = fract(g * 255.0);", "float a = fract(b * 255.0);", "vec4 colour = vec4(r, g, b, a);", "return colour - (colour.yzww * bias);", "}", "void main() {", "if(isCube == 1){", "gl_FragData[ 0 ] = pack(length(vPosition1) / 100000.0);", "}else{", "gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "}", "}"].join("\n")
		}
	}, Qe.ShaderTerrain = {
		terrain: {
			uniforms: Qe.UniformsUtils.merge([Qe.UniformsLib.fog, Qe.UniformsLib.lights, Qe.UniformsLib.shadowmap, {
				enableDiffuse1: {
					type: "i",
					value: 0
				},
				enableDiffuse2: {
					type: "i",
					value: 0
				},
				enableDiffuse3: {
					type: "i",
					value: 0
				},
				enableDisplacement: {
					type: "i",
					value: 0
				},
				enableSpecular: {
					type: "i",
					value: 0
				},
				enableReflection: {
					type: "i",
					value: 0
				},
				tDiffuse1: {
					type: "t",
					value: null
				},
				tDiffuse2: {
					type: "t",
					value: null
				},
				tDiffuse3: {
					type: "t",
					value: null
				},
				tDetail: {
					type: "t",
					value: null
				},
				tNormal: {
					type: "t",
					value: null
				},
				tSpecular: {
					type: "t",
					value: null
				},
				tDisplacement: {
					type: "t",
					value: null
				},
				heightUnit: {
					type: "f",
					value: 1
				},
				blendRange: {
					type: "fv1",
					value: null
				},
				uNormalScale: {
					type: "f",
					value: 1
				},
				uDisplacementBias: {
					type: "f",
					value: 0
				},
				uDisplacementScale: {
					type: "f",
					value: 1
				},
				uDiffuseColor: {
					type: "c",
					value: new Qe.Color(15658734)
				},
				uSpecularColor: {
					type: "c",
					value: new Qe.Color(1118481)
				},
				uAmbientColor: {
					type: "c",
					value: new Qe.Color(328965)
				},
				uShininess: {
					type: "f",
					value: 30
				},
				uOpacity: {
					type: "f",
					value: 1
				},
				uRepeatBase: {
					type: "v2",
					value: new Qe.XiangliangTwo(1, 1)
				},
				uRepeatOverlay: {
					type: "v2",
					value: new Qe.XiangliangTwo(1, 1)
				},
				uOffset: {
					type: "v2",
					value: new Qe.XiangliangTwo(0, 0)
				}
			}]),
			fragmentShader: ["uniform vec3 uAmbientColor;", "uniform vec3 uDiffuseColor;", "uniform vec3 uSpecularColor;", "uniform float uShininess;", "uniform float uOpacity;", "uniform bool enableDiffuse1;", "uniform bool enableDiffuse2;", "uniform bool enableDiffuse3;", "uniform bool enableSpecular;", "uniform bool enableDisplacement;", "uniform float blendRange[2];", "uniform float heightUnit;", "uniform sampler2D tDiffuse1;", "uniform sampler2D tDiffuse2;", "uniform sampler2D tDiffuse3;", "uniform sampler2D tDetail;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tDisplacement;", "uniform float uNormalScale;", "uniform vec2 uRepeatOverlay;", "uniform vec2 uRepeatBase;", "uniform vec2 uOffset;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec4 vPosition;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "varying vec3 vViewPosition;", Qe.ShaderChunk.shadowmap_pars_fragment, Qe.ShaderChunk.fog_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3( 1.0 ), uOpacity );", "vec3 specularTex = vec3( 1.0 );", "vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;", "vec2 uvBase = uRepeatBase * vUv;", "vec3 normalTex = texture2D( tDetail, uvOverlay ).xyz * 2.0 - 1.0;", "normalTex.xy *= uNormalScale;", "normalTex = normalize( normalTex );", "if( (enableDiffuse1 && enableDiffuse2)  || (enableDiffuse1 && enableDiffuse3) || (enableDiffuse2 && enableDiffuse3) ){", "vec4 colDiffuse1 = texture2D( tDiffuse1, uvOverlay );", "vec4 colDiffuse2 = texture2D( tDiffuse2, uvOverlay );", "vec4 colDiffuse3 = texture2D( tDiffuse3, uvOverlay );", "vec4 allDefiuuses[3];", "allDefiuuses[0] = colDiffuse1;", "allDefiuuses[1] = colDiffuse2;", "allDefiuuses[2] = colDiffuse3;", "#ifdef GAMMA_INPUT", "colDiffuse1.xyz *= colDiffuse1.xyz;", "colDiffuse2.xyz *= colDiffuse2.xyz;", "colDiffuse3.xyz *= colDiffuse3.xyz;", "#endif", "vec4 mixColor;", "if(enableDisplacement){", "vec4 dis = texture2D( tDisplacement, uvBase );", "if(enableDiffuse1 && enableDiffuse2 && enableDiffuse3){", "float total = dis.r + dis.g + dis.b;", "if(total == 0.0){", "mixColor = colDiffuse1 * 1.0/3.0 + colDiffuse2 * 1.0/3.0 + colDiffuse3 * 1.0/3.0;", "}else{", "mixColor = colDiffuse1 * dis.r/total + colDiffuse2 * dis.g/total + colDiffuse3 * dis.b/total;", "}", "}", "}else {", "mixColor = colDiffuse2;", "float y = vPosition.y;", "float blend2Bottom = blendRange[1] * heightUnit * 255.0;", "float percent = 0.0;", "if(y < blendRange[0] * heightUnit * 255.0){", "mixColor = colDiffuse1;", "percent = y / (blendRange[0] * heightUnit * 255.0);", "if(percent >=0.8){", "mixColor = mix(colDiffuse1,colDiffuse2,(percent - 0.8) / 0.2);", "}", "} else if(y > blend2Bottom){", "mixColor = colDiffuse3;", "percent = (y - blend2Bottom) / (heightUnit * 255.0 - blend2Bottom);", "if(percent <= 0.2){", "mixColor = mix(colDiffuse2,colDiffuse3,percent/0.2);", "}", "}", "}", "gl_FragColor = gl_FragColor * mixColor;", " } else if( enableDiffuse1 ) {", "gl_FragColor = gl_FragColor * texture2D( tDiffuse1, uvOverlay );", "} else if( enableDiffuse2 ) {", "gl_FragColor = gl_FragColor * texture2D( tDiffuse2, uvOverlay );", "}", "if( enableSpecular )", "specularTex = texture2D( tSpecular, uvOverlay ).xyz;", "mat3 tsb = mat3( vTangent, vBinormal, vNormal );", "vec3 finalNormal = tsb * normalTex;", "vec3 normal = normalize( finalNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz + vViewPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "vec3 pointHalfVector = normalize( lVector + viewPosition );", "float pointDistance = lDistance;", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointDiffuseWeight = max( dot( normal, lVector ), 0.0 );", "float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );", "pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;", "pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );", "dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;", "dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "vec3 hemiDiffuse  = vec3( 0.0 );", "vec3 hemiSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "hemiDiffuse += uDiffuseColor * mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "float hemiSpecularWeight = 0.0;", "vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "hemiSpecularWeight += specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );", "vec3 lVectorGround = -lVector;", "vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "hemiSpecularWeight += specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );", "hemiSpecular += uSpecularColor * mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight ) * hemiSpecularWeight * hemiDiffuseWeight;", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_HEMI_LIGHTS > 0", "totalDiffuse += hemiDiffuse;", "totalSpecular += hemiSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", Qe.ShaderChunk.shadowmap_fragment, Qe.ShaderChunk.linear_to_gamma_fragment, Qe.ShaderChunk.fog_fragment, "}"].join("\n"),
			vertexShader: ["attribute vec4 tangent;", "uniform vec2 uRepeatBase;", "uniform sampler2D tNormal;", "#ifdef VERTEX_TEXTURES", "uniform sampler2D tDisplacement;", "uniform float uDisplacementScale;", "uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec4 vPosition;", "varying vec3 vViewPosition;", Qe.ShaderChunk.shadowmap_pars_vertex, "void main() {", "vNormal = normalize( normalMatrix * normal );", "vTangent = normalize( normalMatrix * tangent.xyz );", "vBinormal = cross( vNormal, vTangent ) * tangent.w;", "vBinormal = normalize( vBinormal );", "vUv = uv;", "vec2 uvBase = uv * uRepeatBase;", "#ifdef VERTEX_TEXTURES", "vec3 dv = texture2D( tDisplacement, uvBase ).xyz;", "float df = uDisplacementScale * dv.x + uDisplacementBias;", "vec3 displacedPosition = normal * df + position;", "vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );", "vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );", "#else", "vPosition = vec4(position,1.0);", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#endif", "gl_Position = projectionMatrix * mvPosition;", "vViewPosition = -mvPosition.xyz;", "vec3 normalTex = texture2D( tNormal, uvBase ).xyz * 2.0 - 1.0;", "vNormal = normalMatrix * normalTex;", Qe.ShaderChunk.shadowmap_vertex, "}"].join("\n")
		}
	}, Qe.ShaderLib.terrain = Qe.ShaderTerrain.terrain, Qe.Fog = function(t, i, r) {
		this.name = "", this.color = new Qe.Color(t), this.near = i !== e ? i : 1, this.far = r !== e ? r : 1e3
	}, Qe.Fog.prototype = {
		constructor: Qe.Fog,
		clone: function() {
			return new Qe.Flog(this.color.getHex(), this.near, this.far)
		},
		refreshUniforms: function(t) {
			t.fogNear.value = this.near, t.fogFar.value = this.far, t.fogColor.value = this.color
		}
	}, Qe.FogExp2 = function(t, i) {
		this.name = "", this.color = new Qe.Color(t), this.density = i !== e ? i : 1
	}, Qe.FogExp2.prototype = {
		DensityFactor: 25e-5,
		constructor: Qe.FogExp2,
		clone: function() {
			return new Qe.FogExp2(this.color.getHex(), this.density)
		},
		refreshUniforms: function(t) {
			t.fogDensity.value = this.density * this.DensityFactor, t.fogColor.value = this.color
		}
	};
	var xi = {},
		Ai = xi.RADIANS_TO_DEGREES = 180 / Math.PI,
		wi = xi.DEGREES_TO_RADIANS = Math.PI / 180;
	xi.isPowerOfTwo = function(t) {
		return 0 === (t & t - 1)
	}, xi.clone = function(t, i) {
		i == e && (i = new t.prototype.constructor);
		for (var r in t)
			if ("id" !== r) {
				var a = t[r];
				if (a.copy && "function" == typeof a.copy) i[r].copy(a);
				else if (a instanceof Array) {
					var n = a,
						s = i[r];
					null == s && (s = []);
					for (var o = 0; o < n.length; o++) {
						var l = n[o];
						s.push(l.clone())
					}
				} else cloneObjet[r] = a
			}
	}, xi.paramToGL = function(t, e) {
		if (!e) return void console.error("No webgl context");
		switch (t) {
			case Qe.RepeatWrapping:
				return e.REPEAT;
			case Qe.ClampToEdgeWrapping:
				return e.CLAMP_TO_EDGE;
			case Qe.MirroredRepeatWrapping:
				return e.MIRRORED_REPEAT;
			case Qe.NearestFilter:
				return e.NEAREST;
			case Qe.NearestMipMapNearestFilter:
				return e.NEAREST_MIPMAP_NEAREST;
			case Qe.NearestMipMapLinearFilter:
				return e.NEAREST_MIPMAP_LINEAR;
			case Qe.LinearFilter:
				return e.LINEAR;
			case Qe.LinearMipMapNearestFilter:
				return e.LINEAR_MIPMAP_NEAREST;
			case Qe.LinearMipMapLinearFilter:
				return e.LINEAR_MIPMAP_LINEAR;
			case Qe.ByteType:
				return e.BYTE;
			case Qe.UnsignedByteType:
				return e.UNSIGNED_BYTE;
			case Qe.ShortType:
				return e.SHORT;
			case Qe.UnsignedShortType:
				return e.UNSIGNED_SHORT;
			case Qe.IntType:
				return e.INT;
			case Qe.UnsignedIntType:
				return e.UNSIGNED_INT;
			case Qe.FloatType:
				return e.FLOAT;
			case Qe.AlphaFormat:
				return e.ALPHA;
			case Qe.RGBFormat:
				return e.RGB;
			case Qe.RGBAFormat:
				return e.RGBA;
			case Qe.LuminanceFormat:
				return e.LUMINANCE;
			case Qe.LuminanceAlphaFormat:
				return e.LUMINANCE_ALPHA;
			case Qe.AddEquation:
				return e.FUNC_ADD;
			case Qe.SubtractEquation:
				return e.FUNC_SUBTRACT;
			case Qe.ReverseSubtractEquation:
				return e.FUNC_REVERSE_SUBTRACT;
			case Qe.ZeroFactor:
				return e.ZERO;
			case Qe.OneFactor:
				return e.ONE;
			case Qe.SrcColorFactor:
				return e.SRC_COLOR;
			case Qe.OneMinusSrcColorFactor:
				return e.ONE_MINUS_SRC_COLOR;
			case Qe.SrcAlphaFactor:
				return e.SRC_ALPHA;
			case Qe.OneMinusSrcAlphaFactor:
				return e.ONE_MINUS_SRC_ALPHA;
			case Qe.DstAlphaFactor:
				return e.DST_ALPHA;
			case Qe.OneMinusDstAlphaFactor:
				return e.ONE_MINUS_DST_ALPHA;
			case Qe.DstColorFactor:
				return e.DST_COLOR;
			case Qe.OneMinusDstColorFactor:
				return e.ONE_MINUS_DST_COLOR;
			case Qe.SrcAlphaSaturateFactor:
				return e.SRC_ALPHA_SATURATE
		}
		return 0
	}, xi.createElement = function(t, i, r, a) {
		var n, s, o, l, h = t.vertices.length,
			c = (t.uvs.length, t.vertices),
			u = i.vertices,
			f = t.faces,
			p = i.faces,
			d = t.uvs,
			m = i.uvs,
			g = [],
			y = [],
			v = [];
		a === e && (a = 0), t instanceof Qe.Element && (t.matrixAutoUpdate && t.updateMatrix(), n = t.matrix, s = (new $e).getNormalMatrix(n)), i instanceof Qe.Element && (i.matrixAutoUpdate && i.updateMatrix(), o = i.matrix, l = (new $e).getNormalMatrix(o));
		for (var x = 0, A = c.length; A > x; x++) {
			var w = c[x],
				_ = w.clone();
			n && _.applyMatrix4(n), y.push(_)
		}
		for (var x = 0, A = u.length; A > x; x++) {
			var w = u[x],
				_ = w.clone();
			o && _.applyMatrix4(o), y.push(_)
		}
		for (x = 0, A = f.length; A > x; x++) {
			var S, b, M, C = f[x],
				P = C.vertexNormals,
				T = C.vertexColors;
			S = C instanceof mi ? new mi(C.a, C.b, C.c) : new gi(C.a, C.b, C.c, C.d), S.normal.copy(C.normal), s && S.normal.applyMatrix3(s).normalize();
			for (var z = 0, L = P.length; L > z; z++) b = P[z].clone(), s && b.applyMatrix3(s).normalize(), S.vertexNormals.push(b);
			S.color.copy(C.color);
			for (var z = 0, L = T.length; L > z; z++) M = T[z], S.vertexColors.push(M.clone());
			S.materialIndex = C.materialIndex, S.centroid.copy(C.centroid), n && S.centroid.applyMatrix4(n), g.push(S)
		}
		for (x = 0, A = p.length; A > x; x++) {
			var S, b, M, C = p[x],
				P = C.vertexNormals,
				T = C.vertexColors;
			S = C instanceof mi ? new mi(C.a + h, C.b + h, C.c + h) : new gi(C.a + h, C.b + h, C.c + h, C.d + h), S.normal.copy(C.normal), l && S.normal.applyMatrix3(l).normalize();
			for (var z = 0, L = P.length; L > z; z++) b = P[z].clone(), l && b.applyMatrix3(l).normalize(), S.vertexNormals.push(b);
			S.color.copy(C.color);
			for (var z = 0, L = T.length; L > z; z++) M = T[z], S.vertexColors.push(M.clone());
			S.materialIndex = C.materialIndex + a, S.centroid.copy(C.centroid), o && S.centroid.applyMatrix4(o), g.push(S)
		}
		for (x = 0, A = d.length; A > x; x++) {
			for (var E = d[x], D = [], z = 0, L = E.length; L > z; z++) D.push(new Ke(E[z].x, E[z].y));
			v.push(D)
		}
		for (x = 0, A = m.length; A > x; x++) {
			for (var E = m[x], D = [], z = 0, L = E.length; L > z; z++) D.push(new Ke(E[z].x, E[z].y));
			v.push(D)
		}
		var B = new Qe.Entity;
		return B.vertices = y, B.faces = g, B.uvs = v, B.material = r === e ? t.material : r, B
	}, xi.transformElement = function(t, e) {
		var i, r, a = t.vertices,
			n = t.faces,
			s = t.uvs,
			o = [],
			l = [],
			h = [];
		t instanceof Qe.Element && (t.matrixAutoUpdate && t.updateMatrix(), i = t.matrix, r = (new $e).getNormalMatrix(i));
		for (var c = 0, u = a.length; u > c; c++) {
			var f = a[c],
				p = f.clone();
			i && p.applyMatrix4(i), l.push(p)
		}
		for (c = 0, u = n.length; u > c; c++) {
			var d, m, g, y = n[c],
				v = y.vertexNormals,
				x = y.vertexColors;
			d = y instanceof mi ? new mi(y.a, y.b, y.c) : new gi(y.a, y.b, y.c, y.d), d.normal.copy(y.normal), r && d.normal.applyMatrix3(r).normalize();
			for (var A = 0, w = v.length; w > A; A++) m = v[A].clone(), r && m.applyMatrix3(r).normalize(), d.vertexNormals.push(m);
			d.color.copy(y.color);
			for (var A = 0, w = x.length; w > A; A++) g = x[A], d.vertexColors.push(g.clone());
			d.materialIndex = y.materialIndex, d.centroid.copy(y.centroid), i && d.centroid.applyMatrix4(i), o.push(d)
		}
		for (c = 0, u = s.length; u > c; c++) {
			for (var _ = s[c], S = [], A = 0, w = _.length; w > A; A++) S.push(new Ke(_[A].x, _[A].y));
			h.push(S)
		}
		if (e) {
			var b = new Qe.Entity(t.material);
			b.vertices = l, b.faces = o, b.uvs = h, b.setPosition(0, 0, 0), b.setRotation(0, 0, 0), b.setScale(1, 1, 1);
			var M = {};
			return M.vertices = l, M.faces = o, M.uvs = h, b.primitive = new Qe.Primitive(M), b
		}
		t.vertices = l, t.faces = o, t.uvs = h, t.setPosition(0, 0, 0), t.setRotation(0, 0, 0), t.setScale(1, 1, 1);
		var M = {};
		M.vertices = l, M.faces = o, M.uvs = h, t.primitive = new Qe.Primitive(M);
		for (var c in i.elements) t._attachId += i.elements[c];
		return t
	}, xi.mergeElements = function(t) {
		var e, i, r, a, n, s, o = 0,
			l = 0,
			h = 0;
		for (e = 0; e < t.length; e++) r = t[e], o += r.materialSize;
		var c = new Qe.Entity(o),
			u = {},
			f = {},
			p = (new Je(0, 0, 0), []),
			d = [],
			m = [],
			g = [],
			y = new Qe.ArrayMaterial;
		for (e = 0; e < t.length; e++) {
			for (r = t[e], r.matrixAutoUpdate && r.updateWorldMatrix(), a = r.worldMatrix.clone(), n = (new $e).getNormalMatrix(a), i = 0; i < r.vertices.length; i++) s = r.vertices[i], p.push(s.clone().applyMatrix4(a));
			for (i = 0; i < r.faces.length; i++) {
				var v, x = r.faces[i];
				x.vertexNormals, x.vertexColors;
				v = x instanceof mi ? new mi(x.a + l, x.b + l, x.c + l) : new gi(x.a + l, x.b + l, x.c + l, x.d + l),
					v.normal.copy(x.normal), n && v.normal.applyMatrix3(n).normalize(), v.materialIndex = x.materialIndex + h, v.centroid.copy(x.centroid), a && v.centroid.applyMatrix4(a), d.push(v)
			}
			for (i = 0, len = r.uvs.length; i < len; i++) {
				for (var A = r.uvs[i], w = [], _ = 0, S = A.length; S > _; _++) w.push(new Ke(A[_].x, A[_].y));
				m.push(w)
			}
			if (r.uv2s && r.uv2s.length > 0)
				for (i = 0, len = r.uv2s.length; i < len; i++) {
					for (var b = r.uv2s[i], M = [], _ = 0, S = b.length; S > _; _++) M.push(new Ke(b[_].x, b[_].y));
					g.push(M)
				}
			y.materials = y.materials.concat(r.material.materials), l += r.vertices.length, h += r.materialSize;
			for (var C in r.styleMap) {
				var P = u[C];
				null == P && (P = []);
				var T = r.styleMap[C],
					z = !0;
				if (xi.isArray(T))
					for (var _ = 0; _ < T.length; _++) P.push(T[e]), _ > 0 && T[_] != T[_ - 1] && (z = !1);
				else
					for (var _ = 0; _ < r.materialSize; _++) P.push(T);
				(1 == f[C] || null == f[C]) && (f[C] = z), u[C] = P
			}
		}
		for (var C in f) 1 == f[C] && (u[C] = u[C][0]);
		return c.styleMap = u, c.material = y, c.vertices = p, c.faces = d, c.setUvs(m), c.uv2s = g, c.setUpdateFlags(!0), c
	}, xi.mergeElement = function(t, i, r) {
		var a, n, s, o, l = t.vertices.length,
			h = (t.uvs.length, t.vertices),
			c = i.vertices,
			u = t.faces,
			f = i.faces,
			p = t.uvs,
			d = i.uvs,
			m = [],
			g = [],
			y = [];
		r === e && (r = 0), t instanceof Qe.Element && (t.matrixAutoUpdate && t.updateMatrix(), a = t.matrix, n = (new $e).getNormalMatrix(a)), i instanceof Qe.Element && (i.matrixAutoUpdate && i.updateMatrix(), s = i.matrix, o = (new $e).getNormalMatrix(s));
		for (var v = 0, x = h.length; x > v; v++) {
			var A = h[v],
				w = A.clone();
			a && w.applyMatrix4(a), g.push(w)
		}
		for (var v = 0, x = c.length; x > v; v++) {
			var A = c[v],
				w = A.clone();
			s && w.applyMatrix4(s), g.push(w)
		}
		for (v = 0, x = u.length; x > v; v++) {
			var _, S, b, M = u[v],
				C = M.vertexNormals,
				P = M.vertexColors;
			_ = M instanceof mi ? new mi(M.a, M.b, M.c) : new gi(M.a, M.b, M.c, M.d), _.normal.copy(M.normal), n && _.normal.applyMatrix3(n).normalize();
			for (var T = 0, z = C.length; z > T; T++) S = C[T].clone(), n && S.applyMatrix3(n).normalize(), _.vertexNormals.push(S);
			_.color.copy(M.color);
			for (var T = 0, z = P.length; z > T; T++) b = P[T], _.vertexColors.push(b.clone());
			_.materialIndex = M.materialIndex, _.centroid.copy(M.centroid), a && _.centroid.applyMatrix4(a), m.push(_)
		}
		for (v = 0, x = f.length; x > v; v++) {
			var _, S, b, M = f[v],
				C = M.vertexNormals,
				P = M.vertexColors;
			_ = M instanceof mi ? new mi(M.a + l, M.b + l, M.c + l) : new gi(M.a + l, M.b + l, M.c + l, M.d + l), _.normal.copy(M.normal), o && _.normal.applyMatrix3(o).normalize();
			for (var T = 0, z = C.length; z > T; T++) S = C[T].clone(), o && S.applyMatrix3(o).normalize(), _.vertexNormals.push(S);
			_.color.copy(M.color);
			for (var T = 0, z = P.length; z > T; T++) b = P[T], _.vertexColors.push(b.clone());
			_.materialIndex = M.materialIndex + r, _.centroid.copy(M.centroid), s && _.centroid.applyMatrix4(s), m.push(_)
		}
		for (v = 0, x = p.length; x > v; v++) {
			for (var L = p[v], E = [], T = 0, z = L.length; z > T; T++) E.push(new Ke(L[T].x, L[T].y));
			y.push(E)
		}
		for (v = 0, x = d.length; x > v; v++) {
			for (var L = d[v], E = [], T = 0, z = L.length; z > T; T++) E.push(new Ke(L[T].x, L[T].y));
			y.push(E)
		}
		return t.vertices = g, t.faces = m, t.uvs = y, t._position.set(0, 0, 0), t._rotation.set(0, 0, 0), t._scale.set(1, 1, 1), t
	}, xi.autoAdjustGl3dviewBounds = function(e, i, r, a, n, s) {
		n = n || 0, s = s || 0, e.adjustBounds(i[r] - n, i[a] - s), t.addEventListener ? t.addEventListener("resize", function() {
			e.adjustBounds(i[r] - n, i[a] - s, s, n)
		}, !0) : t.attachEvent ? t.attachEvent("onresize", function() {
			e.adjustBounds(i[r] - n, i[a] - s, s, n)
		}) : t.onresize = function() {
			e.adjustBounds(i[r] - n, i[a] - s, s, n)
		}
	}, xi.isEmptyObject = function(t) {
		for (var e in t) return !1;
		return !0
	}, xi.isArray = function(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	}, xi.isSame = function(t, e) {
		if (t == e) return !0;
		if (null == t && null != e) return !1;
		if (null != t && null == e) return !1;
		for (var i in t)
			if (t[i] != e[i]) return !1;
		return !0
	}, xi.toString = function(t) {
		if (t) {
			var e = "";
			for (var i in t) e += i + ":" + t[i];
			return e
		}
	}, xi.validateLicense = function(t) {
		Pi = t, Gi()
	}, xi.getLicense = function() {
		return Pi
	}, xi.getObjectCount = function(t) {
		if (!t) return 0;
		var e = 0;
		for (var i in t) e++;
		return e
	}, xi.isNaN = function(t) {
		return "" === t || null === t || isNaN(t)
	}, xi.getTransformVertices = function(t, e, i) {
		null == i && (i = []);
		var r, a;
		if (t instanceof Qe.Node || t instanceof Qe.Billboard) {
			for (r = 0; r < t.vertices.length; r++) a = t.vertices[r].clone(), t instanceof Qe.Billboard ? (a.x *= t.rotation3d.x, a.y *= t.rotation3d.y, a.add(t.getPosition())) : a.applyMatrix4(t.worldMatrix), i.push(a);
			for (var r = 0; r < (t._childList ? t._childList.size() : 0); r++) {
				var n = t._childList.get(r);
				xi.getTransformVertices(n, e, i)
			}
		}
		return i
	}, xi.getBizBox = function(t, e) {
		var i, r, a;
		if (null == t) return null;
		i = t instanceof ci ? t._as : xi.isArray(t) ? t : [t];
		var n = [];
		for (r = 0; r < i.length; r++) a = i[r], xi.getTransformVertices(a, e, n);
		var s = new Qe.BizBox;
		return s.setFromPoints(n), s
	}, xi.mergeWrapMap = function(t) {
		if (t instanceof yi && !t.getWrapMap()) {
			for (var e, i = [], r = (t.getMaterialMapping(), t.material.materials), a = 0; a < r.length; a++) e = r[a], e.map && -1 == i.indexOf(e.map._image) && i.push(e.map._image);
			t.setWrapMap(!0)
		}
	}, xi.setWrapMap = function(t, e, i, r) {
		xi.loadImages(e, function(a) {
			var n = mono.Utils.createWrapMapFromImages(a, i, r);
			n.__uniqueCode = "";
			for (var s = 0; s < e.length; s++) n.__uniqueCode += e[s].src;
			for (var s in i) n.__uniqueCode += s + ":" + i[s];
			if (xi.isArray(t))
				for (var s = 0; s < t.length; s++) t[s].setStyle("m.texture.image", n), t[s].setClient("_originalImage", e), t[s].setClient("_wrapMapping", i);
			else t.setStyle("m.texture.image", n), t.setClient("_wrapMapping", i)
		})
	}, xi.loadImages = function(t, e) {
		function i(t) {
			t.onload = function() {
				t.loaded = !0, r(), t.onload = null
			}
		}

		function r() {
			for (var i = 0; i < t.length; i++)
				if (!t[i].loaded) return;
			e(t)
		}
		if (null != t && 0 != t.length && null != e)
			for (var a = 0; a < t.length; a++) {
				var n = t[a];
				"string" == typeof n && (t[a] = new Image, t[a].crossOrigin = "", t[a].src = n), n = t[a], i(n)
			}
	}, xi.createWrapMapFromImages = function(t, e, i, r, a) {
		if (null == t || 0 == t.length) return null;
		i = (i || "six-each").toLowerCase();
		var n = "six-each" == i || "front-other" == i || "back-other" == i || "left-other" == i || "right-other" == i || "top-other" == i || "bottom-other" == i;
		if (n) {
			null == e && (e = {
				0: "bottom",
				1: "top",
				2: "back",
				3: "left",
				4: "front",
				5: "right"
			});
			var s = document.createElement("canvas"),
				o = s.getContext("2d"),
				l = 0,
				h = 0;
			if ("six-each" == i) {
				var c = {
					bottom: [0, 0],
					top: [1 / 3, 0],
					back: [2 / 3, 0],
					left: [0, .5],
					front: [1 / 3, .5],
					right: [2 / 3, .5]
				};
				if (null == r || null == a)
					for (var u = 0; u < t.length; u++) l = Math.max(t[u].width, l), h = Math.max(t[u].height, h);
				l *= 3, h *= 2, l > 1024 && (l = 1024), h > 1024 && (h = 1024);
				var f, p = ["front", "back", "right", "left", "top", "bottom"],
					d = [];
				for (var u in e) {
					var m = e[u];
					"other" !== m ? (d.push(m), p.splice(p.indexOf(m), 1)) : f = u
				}
				null != f && (e[f] = p), r = r || l, a = a || h, s.setAttribute("width", r), s.setAttribute("height", a);
				for (var u = (Math.min(t.length, 6), 0); 6 > u; u++) {
					var g = e[u];
					if (g) {
						var y = g;
						y = xi.isArray(g) ? g : -1 != g.indexOf(",") ? g.split(",") : [g];
						for (var v = 0; v < y.length; v++) {
							var m = y[v],
								x = c[m][0],
								A = c[m][1];
							o.drawImage(t[u], x * r, A * a, r / 3, a / 2)
						}
					}
				}
			} else {
				var w = i.split("-")[0];
				if (null == r || null == a)
					for (var u = 0; u < t.length; u++) l += t[u].width, h = Math.max(t[u].height, h);
				r = r || l, a = a || h, s.setAttribute("width", r), s.setAttribute("height", a);
				for (var u = (e[w], Math.min(t.length, 2), 0); 2 > u; u++) {
					var g = e[u];
					g && (g == w ? o.drawImage(t[u], 0, 0, r / 2, a) : o.drawImage(t[u], r / 2, 0, r / 2, a))
				}
			}
			return s
		}
	}, xi.getVectorAngles = function(t, e) {
		var i = t;
		e && (i = e.clone().sub(t)), i = i.normalize();
		var r = Math.asin(i.y) * Ai,
			a = Math.atan2(i.x, i.z) * Ai;
		return [a, r]
	}, xi.getPixelFromImage = function(t, e, i) {
		var r;
		ei.isCanvas(t) ? r = t : (r = document.createElement("canvas"), r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0, t.width, t.height)), e -= Math.floor(e), i -= Math.floor(i), i = 1 - i;
		var a = r.getContext("2d").getImageData(t.width * e, t.height * i, 1, 1).data;
		return a
	}, xi.nextPowerOfTwo = function(t) {
		return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, t++, t
	}, xi.createTextBillboard = function(t, e) {
		var i = new mono.Billboard;
		t = t || "", e = e || {};
		var r = xi.createTextImage(t, e);
		return i.setStyle("m.texture.image", r), i.setScale(r.width, r.height, 1), i
	}, xi.createTextImage = function(t, i) {
		t = t || "";
		var r = i.font,
			a = i.color,
			n = i.background,
			s = i.powerOfTwo,
			o = i.canvas,
			l = i.drawFunction;
		o = o || document.createElement("canvas"), r = r || '20px "Dialog"', a = a || "white", n = n === e ? "#0F90C4" : n, s = s || !1;
		var h, c = i.textAlign || "center";
		h = xi.isArray(t) ? t : t.split("\n");
		var u = mono.Utils.getMaxTextSize(h, r),
			f = i.ratio || u.width / u.height,
			p = o.realSize = {
				width: u.width,
				height: u.height
			};
		s && (u.width = mono.Utils.nextPowerOfTwo(u.width), u.height = mono.Utils.nextPowerOfTwo(u.height));
		var d = o.drawRect = {
			width: p.width / p.height > f ? p.width : p.height * f,
			height: p.width / p.height > f ? p.width / f : p.height
		};
		Number.isNaN(d.width) && console.log("debug -- b", p.width, p.height, f), d.width = Math.min(d.width, u.width), d.height = Math.min(d.height, u.height), o.width = u.width, o.height = u.height, Number.isNaN(d.width) && console.log("debug -- a");
		var m = o.getContext("2d");
		if (n && (m.fillStyle = n), l) l(m, o.width, o.height);
		else {
			n && m.fillRect(0, 0, o.width, o.height), m.font = r, m.fillStyle = a, m.strokeStyle = "gray", m.textBaseline = "middle", m.textAlign = c;
			for (var g, y = h.length, v = p.height / y, x = 0; y > x; x++) {
				xi.isArray(a) && (g = a[x], g && (m.fillStyle = g));
				var A = mono.Utils.getTextSize(r, h[x]),
					w = (A.width, A.height, o.height, (d.width - p.width) / 2);
				"center" === c ? w = d.width / 2 : "right" === c && (w = d.width);
				var _ = (d.height - p.height) / 2 + v / 2 + x * v + (o.height - d.height);
				m.strokeText(h[x], w, _), m.fillText(h[x], w, _)
			}
		}
		return o
	}, xi.createTextImage2 = function(t, i) {
		t = t || "", t = String(t);
		var a = i.font,
			n = i.color,
			s = i.background,
			o = i.powerOfTwo,
			l = i.canvas,
			h = i.drawFunction;
		l = l || document.createElement("canvas"), a = a || '20px "Dialog"', n = n || "white", s = s === e ? "#0F90C4" : s, o = o || !1;
		var c = (i.align || "center", i.sizeScale || 1),
			u = xi.getMaxTextSize(t.split("\n"), a);
		l.realSize = {
			width: u.width,
			height: u.height
		}, u.width *= c, u.height *= c, o && (u.width = xi.nextPowerOfTwo(u.width), u.height = xi.nextPowerOfTwo(u.height)), l.width = u.width, l.height = u.height;
		var f = l.getContext("2d");
		return s && (f.fillStyle = s), h ? h(f, l.width, l.height) : (s && f.fillRect(0, 0, l.width, l.height), r(f, t, a, n, l, "center")), l
	}, xi.getMaxTextSize = function(t, e) {
		if (t && t.length > 0) {
			for (var i = t.length, r = ni.getTextSize(e, t[0]), a = r.width, n = r.height * i, s = 0; i > s; s++) {
				var o = ni.getTextSize(e, t[s]).width;
				o > a && (a = o)
			}
			return {
				width: a,
				height: n
			}
		}
		return null
	}, xi.getTextSize = function(t, e) {
		return ni.getTextSize(t, e)
	}, xi.playGleyeAnimation = function(t, e, i, r, a) {
		e = e || t.p(), i = i || t.getTarget(), r = r || 2e3;
		var n = mono.Utils.getVectorAngles(t.getTarget(), t.p()),
			s = mono.Utils.getVectorAngles(i, e),
			o = t.getTarget(),
			l = i,
			h = t.getDistance(),
			c = (new mono.XiangliangThree).subVectors(e, i).length();
		new mono.Animate({
			from: 0,
			to: 1,
			repeat: 1,
			dur: r,
			onPlay: function() {},
			onUpdate: function(e) {
				var i = n[0] + (s[0] - n[0]) * e,
					r = n[1] + (s[1] - n[1]) * e,
					a = (new mono.XiangliangThree).lerpVectors(o, l, e),
					u = h + (c - h) * e,
					f = new mono.XiangliangThree;
				f.x = a.x + u * Math.sin(i * wi) * Math.cos(r * wi), f.z = a.z + u * Math.cos(i * wi) * Math.cos(r * wi), f.y = a.y + u * Math.sin(r * wi), t.lookAt(a), t.p(f)
			},
			onDone: function() {
				a && a()
			}
		}).play()
	}, xi.stopAnimate = function(t, e) {
		He(t, e)
	}, xi.stopAllAnimates = function(t) {
		je(t)
	}, Qe.Utils = xi, Qe.GLParameters = function(t, e, i) {
		this.material = t, this.gl3dview = e, this.precision = e._precision, this.map = !!t.map, this.mapLoaded = !0, this.envMap = !!t.envMap, this.lightMap = !!t.lightMap, this.bumpMap = !!t.bumpMap && "phong" === t._type, this.normalMap = !!t.normalMap && "phong" === t._type, this.specularMap = !!t.specularMap, this.vertexColors = t.vertexColors, this.fog = e._fog, this.useFog = t.fog, this.fogExp = this.fog instanceof Qe.FogExp2, this.sizeAttenuation = t.sizeAttenuation, this.skinning = t.skinning, this.maxBones = e.maxBones, this.useVertexTexture = e._supportsBoneTextures && i && i.useVertexTexture, this.boneTextureWidth = i && i.boneTextureWidth, this.boneTextureHeight = i && i.boneTextureHeight, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.maxMorphTargets = e.maxMorphTargets, this.maxMorphNormals = e.maxMorphNormals, this.maxDirLights = e.maxLightCount.directional, this.maxPointLights = e.maxLightCount.point, this.maxSpotLights = e.maxLightCount.spot, this.maxHemiLights = e.maxLightCount.hemi, this.maxShadows = e.maxShadows, this.maxPointShadows = e.maxPointShadows, this.shadowMapEnable = e._shadowMapEnable && i.receiveShadow && this.maxShadows > 0, this.pointShadowMapEnable = e._shadowMapEnable && i.receiveShadow && this.maxPointShadows > 0, this.shadowMapType = e.shadowMapType, this.shadowMapDebug = e.shadowMapDebug, this.shadowMapCascade = e.shadowMapCascade, this.alphaTest = t.alphaTest, this.metal = t.metal, this.perPixel = t.perPixel, this.wrapAround = t.wrapAround, this.doubleSided = t.side === Qe.DoubleSide && !ii.isIE, this.flipSided = t.side === Qe.BackSide, this.useSSAO = e.isSSAOEnable() && e.pm.isLightMaterial(t), this.gammaInput = e.gammaInput, this.gammaOutput = e.gammaOutput, this.physicallyBasedShading = e.physicallyBasedShading, this.supportsVertexTextures = !1, this.shadowMapTypeDefine = "SHADOWMAP_TYPE_BASIC", this.shadowMapType === Qe.PCFShadowMap ? this.shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF" : this.shadowMapType === Qe.PCFSoftShadowMap && (this.shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF_SOFT"), this.maxGrandient = xi.getObjectCount(t.gradient)
	}, Qe.GLParameters.prototype.getShaders = function(t) {
		t = t === e ? "" : t;
		var i = this,
			r = ["precision " + i.precision + " float;", t, this.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", i.gammaInput ? "#define GAMMA_INPUT" : "", i.gammaOutput ? "#define GAMMA_OUTPUT" : "", i.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + i.maxDirLights, "#define MAX_POINT_LIGHTS " + i.maxPointLights, "#define MAX_SPOT_LIGHTS " + i.maxSpotLights, "#define MAX_HEMI_LIGHTS " + i.maxHemiLights, "#define MAX_SHADOWS " + i.maxShadows, "#define MAX_POINT_SHADOWS " + i.maxPointShadows, "#define MAX_BONES " + i.maxBones, i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.maxGrandient > 0 ? "#define MAX_GRADIENT " + i.maxGrandient : "", i.skinning ? "#define USE_SKINNING" : "", i.useVertexTexture ? "#define BONE_TEXTURE" : "", i.boneTextureWidth ? "#define N_BONE_PIXEL_X " + i.boneTextureWidth.toFixed(1) : "", i.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + i.boneTextureHeight.toFixed(1) : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals ? "#define USE_MORPHNORMALS" : "", i.perPixel ? "#define PHONG_PER_PIXEL" : "", i.wrapAround ? "#define WRAP_AROUND" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnable ? "#define USE_SHADOWMAP" : "", i.shadowMapEnable ? "#define " + i.shadowMapTypeDefine : "", i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", i.pointShadowMapEnable ? "#define USE_POINT_SHADOWMAP" : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 gleyePosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "attribute vec3 morphTarget0;", "attribute vec3 morphTarget1;", "attribute vec3 morphTarget2;", "attribute vec3 morphTarget3;", "#ifdef USE_MORPHNORMALS", "attribute vec3 morphNormal0;", "attribute vec3 morphNormal1;", "attribute vec3 morphNormal2;", "attribute vec3 morphNormal3;", "#else", "attribute vec3 morphTarget4;", "attribute vec3 morphTarget5;", "attribute vec3 morphTarget6;", "attribute vec3 morphTarget7;", "#endif", "#endif", "#ifdef USE_SKINNING", "attribute vec4 skinIndex;", "attribute vec4 skinWeight;", "#endif", ""].join("\n"),
			a = ["precision " + this.precision + " float;", i.bumpMap || i.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", t, "#define MAX_DIR_LIGHTS " + i.maxDirLights, "#define MAX_POINT_LIGHTS " + i.maxPointLights, "#define MAX_SPOT_LIGHTS " + i.maxSpotLights, "#define MAX_HEMI_LIGHTS " + i.maxHemiLights, "#define MAX_SHADOWS " + i.maxShadows, "#define MAX_POINT_SHADOWS " + i.maxPointShadows, i.useSSAO ? "#define USE_SSAO" : "", i.alphaTest ? "#define ALPHATEST " + i.alphaTest : "", this.gammaInput ? "#define GAMMA_INPUT" : "", this.gammaOutput ? "#define GAMMA_OUTPUT" : "", this.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.maxGrandient > 0 ? "#define MAX_GRADIENT " + i.maxGrandient : "", i.vertexColors ? "#define USE_COLOR" : "", i.metal ? "#define METAL" : "", i.perPixel ? "#define PHONG_PER_PIXEL" : "", i.wrapAround ? "#define WRAP_AROUND" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnable ? "#define USE_SHADOWMAP" : "", i.shadowMapEnable ? "#define " + i.shadowMapTypeDefine : "", i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", i.pointShadowMapEnable ? "#define USE_POINT_SHADOWMAP" : "", "uniform mat4 viewMatrix;", "uniform vec3 gleyePosition;", ""].join("\n");
		return [r, a]
	};
	var _i = {};
	_i.setDepthTest = function(t, e) {
		var i = e._gl;
		e._oldDepthTest !== t && (t ? i.enable(i.DEPTH_TEST) : i.disable(i.DEPTH_TEST), e._oldDepthTest = t)
	}, _i.setSmapleAlphaToCoverage = function(t, e) {
		var i = e._gl;
		e._oldSmapleAlphaToCoverage !== t && (t ? i.enable(i.SAMPLE_ALPHA_TO_COVERAGE) : i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), e._oldSmapleAlphaToCoverage = t)
	}, _i.setDepthWrite = function(t, e) {
		var i = e._gl;
		e._oldDepthWrite !== t && (i.depthMask(t), e._oldDepthWrite = t)
	}, _i.clear = function(t, i, r, a) {
		var n = a._gl,
			s = 0;
		(t === e || t) && (s |= n.COLOR_BUFFER_BIT), (i === e || i) && (s |= n.DEPTH_BUFFER_BIT), (r === e || r) && (s |= n.STENCIL_BUFFER_BIT), a._gl.clear(s)
	}, _i.setPolygonOffset = function(t, e, i, r) {
		var a = r._gl;
		r._oldPolygonOffset !== t && (t ? a.enable(a.POLYGON_OFFSET_FILL) : a.disable(a.POLYGON_OFFSET_FILL), r._oldPolygonOffset = t), t && (r._oldPolygonOffsetFactor !== e || r._oldPolygonOffsetUnits !== i) && (a.polygonOffset(e, i), r._oldPolygonOffsetFactor = e, r._oldPolygonOffsetUnits = i)
	}, _i.setBlending = function(t, e, i, r, a) {
		var n = a._gl;
		t !== a._oldBlending && (t === Qe.NoBlending ? n.disable(n.BLEND) : t === Qe.AdditiveBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.SRC_ALPHA, n.ONE)) : t === Qe.SubtractiveBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR)) : t === Qe.MultiplyBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.SRC_COLOR)) : t === Qe.CustomBlending ? n.enable(n.BLEND) : (n.enable(n.BLEND), n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)), a._oldBlending = t), t === Qe.CustomBlending ? (e !== this._oldBlendEquation && (n.blendEquation(paramThreeToGL(e)), a._oldBlendEquation = e), (i !== _oldBlendSrc || r !== _oldBlendDst) && (n.blendFunc(paramToGL(i), paramToGL(r)), a._oldBlendSrc = i, a._oldBlendDst = r)) : (a._oldBlendEquation = null, a._oldBlendSrc = null, a._oldBlendDst = null)
	}, _i.enableStencil = function(t) {
		t.enable(t.STENCIL_TEST), t.stencilFunc(t.ALWAYS, 1, 1), t.stencilOp(t.KEEP, t.KEEP, t.REPLACE), t.stencilMask(1), t.clearStencil(0), t.clear(t.STENCIL_BUFFER_BIT)
	}, _i.stencilTest = function(t) {
		t.enable(t.STENCIL_TEST), t.stencilFunc(t.EQUAL, 0, 1), t.stencilOp(t.KEEP, t.KEEP, t.KEEP), t.stencilMask(0)
	}, _i.disableStencil = function(t) {
		t.disable(t.STENCIL_TEST)
	}, _i.r = function(t, e, i, r, a, n, s) {
		t._AK47(e, i, r, a, n, s)
	}, _i.g = function(t, e, i, r, a, n) {
		t.renderGroup(e, i, r, a, n)
	}, Qe.GLUtils = _i, Qe.GPU = function(t) {
		var e = t._gl;
		this._glExtensionTextureFloat = e.getExtension("OES_texture_float"), this._glExtensionStandardDerivatives = e.getExtension("OES_standard_derivatives"), this._glExtensionTextureFilterAnisotropic = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), this._glExtensionCompressedTextureS3TC = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), this._glExtensionTextureFloat || console.log("Float textures not supported."), this._glExtensionStandardDerivatives || console.log("Standard derivatives not supported."), this._glExtensionTextureFilterAnisotropic || console.log("Anisotropic texture filtering not supported."), this._glExtensionCompressedTextureS3TC || console.log("S3TC compressed textures not supported."), this._maxTextures = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), this._maxVertexTextures = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), this._maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE), this._maxCubemapSize = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), this._maxAnisotropy = this._glExtensionTextureFilterAnisotropic ? e.getParameter(this._glExtensionTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0, this._supportsVertexTextures = this._maxVertexTextures > 0, this._supportsBoneTextures = this._supportsVertexTextures && this._glExtensionTextureFloat, this._compressedTextureFormats = this._glExtensionCompressedTextureS3TC ? e.getParameter(e.COMPRESSED_TEXTURE_FORMATS) : [], this._vertexShaderPrecisionHighpFloat = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT), this._vertexShaderPrecisionMediumpFloat = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT), this._vertexShaderPrecisionLowpFloat = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT), this._fragmentShaderPrecisionHighpFloat = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT), this._fragmentShaderPrecisionMediumpFloat = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT), this._fragmentShaderPrecisionLowpFloat = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT), this._vertexShaderPrecisionHighpInt = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT), this._vertexShaderPrecisionMediumpInt = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT), this._vertexShaderPrecisionLowpInt = e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT), this._fragmentShaderPrecisionHighpInt = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT), this._fragmentShaderPrecisionMediumpInt = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT), this._fragmentShaderPrecisionLowpInt = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT);
		var i = this._vertexShaderPrecisionHighpFloat.precision > 0 && this._fragmentShaderPrecisionHighpFloat.precision > 0,
			r = this._vertexShaderPrecisionMediumpFloat.precision > 0 && this._fragmentShaderPrecisionMediumpFloat.precision > 0,
			a = t._precision;
		"highp" === a && !i && (r ? (a = "mediump", console.log("highp not supported, using mediump")) : (a = "lowp", console.log("highp and mediump not supported, using lowp"))), "mediump" === a && !r && (a = "lowp", console.log("mediump not supported, using lowp")), t._precision = a
	}, Qe.Program = function(t, e, i, r) {
		this.entity = t, this.group = e, this.material = i, this.gl3dview = r
	}, Qe.Program.prototype.setEntity = function() {
		this.entity
	}, Qe.Program.prototype.buildGLProgram = function() {}, Qe.Uniform = function(t, i, r) {
		this.id = t, this.type = i, this.value = r, this.location = e
	}, Qe.Uniform.prototype = {
		constructor: Qe.Uniform,
		setValue: function(t) {
			this.value = t
		},
		getUniformLocation: function(t, e) {
			return t.getUniformLocation(this.id)
		}
	}, Qe.Uniform.loadUniform = function(t, r, a) {
		if (type = r.type, value = r.value, "i" === type) a.uniform1i(t, value);
		else if ("f" === type) a.uniform1f(t, value);
		else if ("v2" === type) a.uniform2f(t, value.x, value.y);
		else if ("v3" === type) a.uniform3f(t, value.x, value.y, value.z);
		else if ("v4" === type) a.uniform4f(t, value.x, value.y, value.z, value.w);
		else if ("c" === type) a.uniform3f(t, value.r, value.g, value.b);
		else if ("iv1" === type) a.uniform1iv(t, value);
		else if ("iv" === type) a.uniform3iv(t, value);
		else if ("fv1" === type) a.uniform1fv(t, value);
		else if ("fv" === type) a.uniform3fv(t, value);
		else if ("v2v" === type) {
			for (r._array === e && (r._array = new Float32Array(2 * value.length)), i = 0, il = value.length; i < il; i++) offset = 2 * i, r._array[offset] = value[i].x, r._array[offset + 1] = value[i].y;
			a.uniform2fv(t, r._array)
		} else if ("v3v" === type) {
			for (r._array === e && (r._array = new Float32Array(3 * value.length)), i = 0, il = value.length; i < il; i++) offset = 3 * i, r._array[offset] = value[i].x, r._array[offset + 1] = value[i].y, r._array[offset + 2] = value[i].z;
			a.uniform3fv(t, r._array)
		} else if ("v4v" === type) {
			for (r._array === e && (r._array = new Float32Array(4 * value.length)), i = 0, il = value.length; i < il; i++) offset = 4 * i, r._array[offset] = value[i].x, r._array[offset + 1] = value[i].y, r._array[offset + 2] = value[i].z, r._array[offset + 3] = value[i].w;
			a.uniform4fv(t, r._array)
		} else if ("m4" === type) r._array === e && (r._array = new Float32Array(16)), value.flattenToArray(r._array), a.uniformMatrix4fv(t, !1, r._array);
		else if ("m4v" === type) {
			for (r._array === e && (r._array = new Float32Array(16 * value.length)), i = 0, il = value.length; i < il; i++) value[i].flattenToArrayOffset(r._array, 16 * i);
			a.uniformMatrix4fv(t, !1, r._array)
		} else if ("t" === type) texture = value, textureUnit = getTextureUnit(), a.uniform1i(t, textureUnit), !texture || (texture.image instanceof Array && 6 === texture.image.length ? setCubeTexture(texture, textureUnit) : texture instanceof $CubeRenderTargetCube ? setCubeTextureDynamic(texture, textureUnit) : _this.setTexture(texture, textureUnit));
		else if ("tv" === type) {
			for (r._array === e && (r._array = []), i = 0, il = r.value.length; i < il; i++) r._array[i] = getTextureUnit();
			for (a.uniform1iv(t, r._array), i = 0, il = r.value.length; i < il; i++) texture = r.value[i], textureUnit = r._array[i], texture && _this.setTexture(texture, textureUnit)
		}
	}, Qe.Uniform.loadGeneralUniforms = function(t, e, i) {
		var r, a, n, s;
		for (n = 0, s = e.length; s > n; n++) a = t.uniforms[e[n][1]], a && (r = e[n][0], Qe.Uniform.loadUniform(r, i))
	}, Qe.ProgramManager = function(t) {
		this.id = Qe.ProgramManagerId++, Qe.ProgramManagerCache.count++, this.gl3dview = t, this.gl = this.gl3dview._gl, this.gpu = this.gl3dview.gpu, this.programs = [], this.currentProgram = null, this.currentEntity = null, this.currentGroup = null, this.currentMaterial = null, this.info = {
			memory: {
				programs: 0,
				geometries: 0,
				textures: 0
			},
			render: {
				calls: 0,
				vertices: 0,
				faces: 0,
				points: 0
			},
			currentMaterialId: -1
		}, this.textures = [], this.textureCount = 0, this._lightNeedsUpdate = !0, this._lights = {
			ambient: [0, 0, 0],
			directional: {
				length: 0,
				colors: new Array,
				positions: new Array
			},
			point: {
				length: 0,
				colors: new Array,
				positions: new Array,
				distances: new Array
			},
			spot: {
				length: 0,
				colors: new Array,
				positions: new Array,
				distances: new Array,
				directions: new Array,
				anglesCos: new Array,
				exponents: new Array
			},
			hemi: {
				length: 0,
				skyColors: new Array,
				groundColors: new Array,
				positions: new Array
			}
		}, this.gammaInput = !1, this.textureCount = 0, this.programMap = {}, this.textureMap = {}, this.textureUpdateFlags = {}, this.glTextureMap = {}, this.textureMaterialMap = {}, this.unLoadedImage = {}, this.materialMap = {}, this.materialUpdateFlags = {}, this.handleTextureChange = function(t) {
			if ("image" === t.property || "loaded" === t.property) {
				var e = t.source;
				this.changeTextureUpdateFlags(e, !0), delete this.unLoadedImage[e._image]
			} else if ("disposed" === t.property) {
				var e = t.source;
				this.deallocateTexture(e), e.removePropertyChangeListener(this.handleTextureChange), delete this.textureUpdateFlags[e.id], delete this.textureMap[e.id]
			}
			xi.getObjectCount(this.unLoadedImage) <= 0 && this.gl3dview.dirtyGl3dview()
		}, this.handleMaterialChange = function(t) {
			if ("map" == t.property || t.property.endsWith("Map") || "needsUpdate" === t.property) {
				var e = t.source;
				this.materialUpdateFlags[e.id] = !0
			} else if ("disposed" === t.property) {
				var e = t.source;
				this.deallocateMaterial(e), e.removePropertyChangeListener(this.handleMaterialChange), delete this.materialUpdateFlags[e.id], delete this.materialMap[e.id]
			}
			xi.getObjectCount(this.unLoadedImage) <= 0 && this.gl3dview.dirtyGl3dview()
		}
	}, Qe.ProgramManager.prototype.addMaterial = function(t) {
		null == this.materialMap[t.id] && (this.materialMap[t.id] = t, t.addPropertyChangeListener(this.handleMaterialChange, this))
	}, Qe.ProgramManager.prototype.needsUpdateMaterial = function(t) {
		return this.materialUpdateFlags[t.id] === e || this.materialUpdateFlags[t.id] === !0 ? !0 : t.map instanceof Si || t.map instanceof bi ? !0 : !1
	}, Qe.ProgramManager.prototype.changeMaterialUpdateFlags = function(t, e) {
		this.materialUpdateFlags[t.id] = e
	}, Qe.ProgramManager.prototype.isLightMaterial = function(t) {
		return t instanceof Qe.LambertMaterial || t instanceof Qe.PhongMaterial || t.lights || "lambert" === t._type || "phong" === t._type || "terrain" === t._type
	}, Qe.ProgramManager.prototype.changeAllMaterialUpdateFlags = function(t, e, i) {
		for (var r in this.materialMap) {
			var a = this.materialMap[r];
			(null == e || e.call(i, a)) && (this.materialUpdateFlags[a.id] = t)
		}
	}, Qe.ProgramManager.prototype.changeAllLightMaterialUpdateFlags = function(t) {
		this.changeAllMaterialUpdateFlags(t, this.isLightMaterial, this)
	}, Qe.ProgramManager.prototype.addTexture = function(t) {
		null != t.id && this.textureMap[t.id] === e && (this.textureMap[t.id] = t, t.addPropertyChangeListener(this.handleTextureChange, this), t._image.loaded || (this.unLoadedImage[t._image] = 1))
	}, Qe.ProgramManager.prototype.needsUpdateTexture = function(t) {
		return this.textureUpdateFlags[t.id] === e || this.textureUpdateFlags[t.id] === !0 ? !0 : !1
	}, Qe.ProgramManager.prototype.changeTextureUpdateFlags = function(t, e) {
		this.textureUpdateFlags[t.id] = e;
		for (var i in this.materialMap) {
			var r = this.materialMap[i];
			(r.map === t || r.lightMap === t || r.envMap === t || r.normalMap === t || r.specularMap === t) && this.changeMaterialUpdateFlags(r, !0)
		}
	}, Qe.ProgramManager.prototype.buildProgram = function(t, e, i) {
		this.currentEntity = t, this.currentGroup = e, this.currentMaterial = i, i.shaderID || i.setupMaterialShader();
		var r, a, n, s, o = new Qe.GLParameters(this.currentMaterial, this.gl3dview, t),
			h = [];
		i.shaderID ? h.push(i.shaderID) : (h.push(i.vertexShader), h.push(i.fragmentShader));
		for (Yi in o) "material" !== Yi && "gl3dview" !== Yi && "node" !== Yi && (h.push(Yi), h.push(o[Yi]));
		for (s = h.join(), r = 0, a = this.programs.length; a > r; r++)
			if (this.programs[r].code === s) {
				i.program = this.programs[r].program, i.uniformsList = [];
				for (d in i.uniforms) i.uniformsList.push([i.uniforms[d], d]);
				return this.programs[r].usedTimes++, this.programs[r].program
			}
		n = this.gl.createProgram();
		var c = o.getShaders(),
			u = c[1],
			f = c[0];
		this.gl.attachShader(n, l("fragment", u + i.fragmentShader, this.gl)), this.gl.attachShader(n, l("vertex", f + i.vertexShader, this.gl)), this.gl.linkProgram(n), this.gl.getProgramParameter(n, this.gl.LINK_STATUS) || console.log("Could not initialise shader\nVALIDATE_STATUS: " + this.gl.getProgramParameter(n, this.gl.VALIDATE_STATUS) + ", gl error [" + this.gl.getError() + "]"), n.uniforms = {}, n.attributes = {};
		var p, d, m, r;
		p = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "gleyePosition", "boneGlobalMatrices", "morphTargetInfluences"];
		for (d in i.uniforms) p.push(d);
		for (this.attachGLLocations(n, p, "uniform"), p = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"], r = 0; r < o.maxMorphTargets; r++) p.push("morphTarget" + r);
		for (r = 0; r < o.maxMorphNormals; r++) p.push("morphNormal" + r);
		for (m in i.attributes) p.push(m);
		this.attachGLLocations(n, p, "attribute"), n.id = this.programs.length, this.programs.push({
			program: n,
			code: s,
			usedTimes: 1
		}), this.info.memory.programCount = this.programs.length, i.program = n, i.uniformsList = [];
		for (d in i.uniforms) i.uniformsList.push([i.uniforms[d], d]);
		return n
	}, Qe.ProgramManager.prototype.enableAttribute = function(t, i) {
		var r = i.program.attributes;
		if (r.position >= 0 && _gl.enableVertexAttribArray(r.position), r.color >= 0 && _gl.enableVertexAttribArray(r.color), r.normal >= 0 && _gl.enableVertexAttribArray(r.normal), i.attributes)
			for (a in i.attributes) r[a] !== e && r[a] >= 0 && _gl.enableVertexAttribArray(r[a])
	}, Qe.ProgramManager.prototype.attachGLLocations = function(t, e, i) {
		var r, a, n, s = this.gl;
		if ("uniform" === i)
			for (r = 0, a = e.length; a > r; r++) n = e[r], t.uniforms[n] = s.getUniformLocation(t, n);
		else if ("attribute" === i)
			for (r = 0, a = e.length; a > r; r++) n = e[r], t.attributes[n] = s.getAttribLocation(t, n)
	}, Qe.ProgramManager.prototype.getGLShaders = function(t, e) {
		var i;
		return "fragment" === t ? i = this.gl.createShader(this.gl.FRAGMENT_SHADER) : "vertex" === tpye && (i = this.gl.createShader(this.gl.VERTEX_SHADER)), this.gl.shaderSource(i, string), this.gl.compileShader(i), gl.getShaderParameter(i, gl.COMPILE_STATUS) ? i : (console.log(gl.getShaderInfoLog(i)), console.log(string), null)
	}, Qe.ProgramManager.prototype.setProgram = function(t, e, i, r, a, l) {
		if (this.textureCount = 0, this.addMaterial(r), this.needsUpdateMaterial(r)) {
			r.setupMaterialShader(), this.programMap[r.id] && this.deallocateMaterial(r);
			var c = this.buildProgram(l, a, r);
			this.programMap[r.id] = c, this.changeMaterialUpdateFlags(r, !1)
		}
		var u = !1,
			f = this.programMap[r.id],
			p = f.uniforms,
			d = r.uniforms;
		return f != this.currentProgram && (this.gl.useProgram(f), this.currentProgram = f, u = !0), r.id !== this.currentMaterialId && (this.currentMaterialId = r.id, u = !0), (u || t !== this.gl3dview._currentGleye) && (this.gl.uniformMatrix4fv(p.projectionMatrix, !1, t.projectionMatrix.elements), t !== this.gl3dview._currentGleye && (this.gl3dview._currentGleye = t)), i && r.fog && i.refreshUniforms(d), (r instanceof Qe.PhongMaterial || r instanceof Qe.LambertMaterial || r.lights || "phong" === r._type || "lambert" === r._type || "terrain" === r._type) && (this._lightNeedsUpdate && (this.setupLights(f, e),
			this._lightNeedsUpdate = !1), h(d, this._lights)), u && r.refreshUniforms(!1, {
			gleye: this.gl3dview._gleye
		}), l.receiveShadow && !r._shadowPass && this.gl3dview.isShadowable() && (n(d, e), s(d, e)), u && this.loadUniformsGeneric(f, r.uniformsList, r), r.loadGleyePosition(p, t, this.gl), (r instanceof Qe.PhongMaterial || r instanceof Qe.LambertMaterial || r.skinning || "phong" === r._type || "lambert" === r._type || "terrain" === r._type || r instanceof Qe.ShaderMaterial) && null !== p.viewMatrix && this.gl.uniformMatrix4fv(p.viewMatrix, !1, t.worldMatrixInverse.elements), o(p, l, this.gl), null != p.modelMatrix && this.gl.uniformMatrix4fv(p.modelMatrix, !1, l.worldMatrix.elements), this.gl3dview._baseRender && this.loadSSAOUniforms(p, r, u), f
	}, Qe.ProgramManager.prototype.loadSSAOUniforms = function(t, e, i) {
		if (null != t.mapSSAO && this.gl3dview._sSAOEnable) {
			var r = t.mapSSAO,
				a = i ? this.getTextureUnit() : e._ssaoSlot;
			this.gl.uniform1i(r, a), this.setTexture(this.gl3dview.finalSSAOTarget, a), e._ssaoSlot = a
		}
	}, Qe.ProgramManager.prototype.onTextureDispose = function(t) {
		var e = t.target;
		e.removeEventListener("dispose", onTextureDispose), deallocateTexture(e), this.info.memory.textures--
	}, Qe.ProgramManager.prototype.deallocateTexture = function(t) {
		var e = this.gl;
		if (t._image && t._image.__webglTextureCube) e.deleteTexture(t._image.__webglTextureCube);
		else {
			if (!t.__webglInit) return;
			t.__webglInit = !1, e.deleteTexture(t.__webglTexture)
		}
	}, Qe.ProgramManager.prototype.setTextureParameters = function(t, e, i, r) {
		var a = this.gl,
			n = this.gpu,
			s = Qe.Utils.paramToGL;
		i && !r ? (a.texParameteri(t, a.TEXTURE_WRAP_S, s(e.wrapS, a)), a.texParameteri(t, a.TEXTURE_WRAP_T, s(e.wrapT, a)), a.texParameteri(t, a.TEXTURE_MAG_FILTER, s(e.magFilter, a)), a.texParameteri(t, a.TEXTURE_MIN_FILTER, s(e.minFilter, a))) : (a.texParameteri(t, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(t, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(t, a.TEXTURE_MAG_FILTER, this.filterFallback(e.magFilter)), a.texParameteri(t, a.TEXTURE_MIN_FILTER, this.filterFallback(e.minFilter))), n._glExtensionTextureFilterAnisotropic && e.type !== Qe.FloatType && (e.anisotropy > 1 || e.__oldAnisotropy) && (a.texParameterf(t, n._glExtensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(e.anisotropy, n._maxAnisotropy)), e.__oldAnisotropy = e.anisotropy)
	}, Qe.ProgramManager.prototype.setCubeTexture = function(t, e) {
		var i = this.gl;
		if (this.addTexture(t), 6 === t._image.length) {
			if (!t._image.loaded) return;
			var r = Qe.Utils.isPowerOfTwo,
				a = Qe.Utils.paramToGL;
			if (this.needsUpdateTexture(t)) {
				t._image.__webglTextureCube || (t._image.__webglTextureCube = i.createTexture(), this.info.memory.textures++), this.changeTextureUpdateFlags(t, !1), i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_CUBE_MAP, t._image.__webglTextureCube), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, t.flipY);
				for (var n = t instanceof Qe.CompressedTexture, s = [], o = 0; 6 > o; o++) this.autoScaleCubemaps && !n ? s[o] = clampToMaxSize(t._image[o], _maxCubemapSize) : s[o] = t._image[o];
				var l = s[0],
					h = r(l.width) && r(l.height),
					c = a(t.format, i),
					u = a(t.type, i);
				this.setTextureParameters(i.TEXTURE_CUBE_MAP, t, h);
				for (var o = 0; 6 > o; o++)
					if (n)
						for (var f, p = s[o].mipmaps, d = 0, m = p.length; m > d; d++) f = p[d], i.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + o, d, c, f.width, f.height, 0, f.data);
					else i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, c, c, u, s[o]);
				t.generateMipmaps && h && i.generateMipmap(i.TEXTURE_CUBE_MAP), t.needsUpdate = !1, t.onUpdate && t.onUpdate()
			} else i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_CUBE_MAP, t._image.__webglTextureCube)
		}
	}, Qe.ProgramManager.prototype.setCubeTextureDynamic = function(t, e) {
		var i = this.gl;
		i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_CUBE_MAP, t.__webglTexture)
	}, Qe.ProgramManager.prototype.loadUniformsGeneric = function(t, i, r) {
		var a, n, s, o, l, h, c, u, f, p, d, m = this.gl;
		for (f = 0, p = i.length; p > f; f++)
			if (o = t.uniforms[i[f][1]])
				if (a = i[f][0], s = a.type, n = a.value, "i" === s) m.uniform1i(o, n);
				else if ("f" === s) m.uniform1f(o, n);
		else if ("v2" === s) m.uniform2f(o, n.x, n.y);
		else if ("v3" === s) m.uniform3f(o, n.x, n.y, n.z);
		else if ("v4" === s) m.uniform4f(o, n.x, n.y, n.z, n.w);
		else if ("c" === s) m.uniform3f(o, n.r, n.g, n.b);
		else if ("iv1" === s) m.uniform1iv(o, n);
		else if ("iv" === s) m.uniform3iv(o, n);
		else if ("fv1" === s) m.uniform1fv(o, n);
		else if ("fv" === s) m.uniform3fv(o, n);
		else if ("v2v" === s) {
			for (a._array === e && (a._array = new Float32Array(2 * n.length)), c = 0, u = n.length; u > c; c++) d = 2 * c, a._array[d] = n[c].x, a._array[d + 1] = n[c].y;
			m.uniform2fv(o, a._array)
		} else if ("v3v" === s) {
			for (a._array === e && (a._array = new Float32Array(3 * n.length)), c = 0, u = n.length; u > c; c++) d = 3 * c, n[c] instanceof Qe.Color ? (a._array[d] = n[c].r, a._array[d + 1] = n[c].g, a._array[d + 2] = n[c].b) : (a._array[d] = n[c].x, a._array[d + 1] = n[c].y, a._array[d + 2] = n[c].z);
			m.uniform3fv(o, a._array)
		} else if ("v4v" === s) {
			for (a._array === e && (a._array = new Float32Array(4 * n.length)), c = 0, u = n.length; u > c; c++) d = 4 * c, a._array[d] = n[c].x, a._array[d + 1] = n[c].y, a._array[d + 2] = n[c].z, a._array[d + 3] = n[c].w;
			m.uniform4fv(o, a._array)
		} else if ("m4" === s) a._array === e && (a._array = new Float32Array(16)), n.flattenToArray(a._array), m.uniformMatrix4fv(o, !1, a._array);
		else if ("m4v" === s) {
			for (a._array === e && (a._array = new Float32Array(16 * n.length)), c = 0, u = n.length; u > c; c++) n[c].flattenToArrayOffset(a._array, 16 * c);
			m.uniformMatrix4fv(o, !1, a._array)
		} else if ("t" === s) {
			if (l = n, h = this.getTextureUnit(), m.uniform1i(o, h), !l) continue;
			if (l._image instanceof Array && 6 === l._image.length) this.setCubeTexture(l, h);
			else {
				var g = l._image;
				this.setTexture(l, h, g ? !g.loaded : !0)
			}
		} else if ("tv" === s) {
			for (a._array === e && (a._array = []), c = 0, u = a.value.length; u > c; c++) a._array[c] = this.getTextureUnit();
			for (m.uniform1iv(o, a._array), c = 0, u = a.value.length; u > c; c++)
				if (l = a.value[c], h = a._array[c], l) {
					var g = l._image;
					l instanceof bi ? this.setCubeTextureDynamic(l, h) : this.setTexture(l, h, g ? !g.loaded : !0)
				}
		}
	}, Qe.ProgramManager.prototype.setTexture = function(t, i, r) {
		var a = this.gl,
			n = Qe.Utils.isPowerOfTwo,
			s = t.id;
		if (this.addTexture(t), !this.needsUpdateTexture(t) || t instanceof Si) a.activeTexture(a.TEXTURE0 + i), t instanceof Si ? a.bindTexture(a.TEXTURE_2D, t.__webglTexture) : a.bindTexture(a.TEXTURE_2D, this.glTextureMap[s]);
		else {
			if (!t._image) return;
			delete this.glTextureMap[s], this.glTextureMap[s] === e && (this.glTextureMap[s] = a.createTexture(), this.info.memory.textures++), this.changeTextureUpdateFlags(t, !1), a.activeTexture(a.TEXTURE0 + i), a.bindTexture(a.TEXTURE_2D, this.glTextureMap[s]), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !t.flipY), a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), a.pixelStorei(a.UNPACK_ALIGNMENT, t.unpackAlignment);
			var o = Qe.Utils.paramToGL,
				l = r ? Qe.ImageCache.Logo : t._image,
				h = n(l.width) && n(l.height),
				c = o(t.format, a),
				u = o(t.type, a);
			this.setTextureParameters(a.TEXTURE_2D, t, h, r);
			var f, p = t.mipmaps;
			if (t instanceof Qe.PixelsTexture)
				if (p.length > 0 && h) {
					for (var d = 0, m = p.length; m > d; d++) f = p[d], a.texImage2D(a.TEXTURE_2D, d, c, f.width, f.height, 0, c, u, f.data);
					t.generateMipmaps = !1
				} else a.texImage2D(a.TEXTURE_2D, 0, c, l.width, l.height, 0, c, u, l.data);
			else if (t instanceof Qe.CompressedTexture)
				for (var d = 0, m = p.length; m > d; d++) f = p[d], a.compressedTexImage2D(a.TEXTURE_2D, d, c, f.width, f.height, 0, f.data);
			else if (p.length > 0 && h) {
				for (var d = 0, m = p.length; m > d; d++) f = p[d], a.texImage2D(a.TEXTURE_2D, d, c, c, u, f);
				t.generateMipmaps = !1
			} else try {
				a.texImage2D(a.TEXTURE_2D, 0, c, c, u, l)
			} catch (g) {
				console.log(g)
			}
			t.generateMipmaps && h && a.generateMipmap(a.TEXTURE_2D), t.onUpdate && t.onUpdate()
		}
	}, Qe.ProgramManager.prototype.getTextureUnit = function() {
		var t = this.textureCount;
		return t >= this.gpu._maxTextures && console.warn("Gl3dview3D: trying to use " + t + " texture units while this GPU supports only " + this.gpu._maxTextures), this.textureCount++, t
	}, Qe.ProgramManager.prototype.deallocateMaterial = function(t) {
		var i = t.program;
		if (i !== e) {
			t.program = e;
			var r, a, n, s = !1;
			for (r = 0, a = this.programs.length; a > r; r++)
				if (n = this.programs[r], n.program === i) {
					n.usedTimes--, 0 === n.usedTimes && (s = !0);
					break
				}
			if (s === !0) {
				var o = [];
				for (r = 0, a = this.programs.length; a > r; r++) n = this.programs[r], n.program !== i && o.push(n);
				this.programs = o, this.gl.deleteProgram(i), this.info.memory.programs--
			}
		}
	}, Qe.ProgramManager.prototype.filterFallback = function(t) {
		return t === Qe.NearestFilter || t === Qe.NearestMipMapNearestFilter || t === Qe.NearestMipMapLinearFilter ? this.gl.NEAREST : this.gl.LINEAR
	}, Qe.ProgramManager.prototype.setupLights = function(t, e) {
		var i, r, a, n, s, o, l, h, c, u, d = 0,
			m = 0,
			g = 0,
			y = this._lights,
			v = y.directional.colors,
			x = y.directional.positions,
			A = y.point.colors,
			w = y.point.positions,
			_ = y.point.distances,
			S = y.spot.colors,
			b = y.spot.positions,
			M = y.spot.distances,
			C = y.spot.directions,
			P = y.spot.anglesCos,
			T = y.spot.exponents,
			z = y.hemi.skyColors,
			L = y.hemi.groundColors,
			E = y.hemi.positions,
			D = 0,
			B = 0,
			N = 0,
			R = 0,
			I = 0,
			F = 0,
			V = 0,
			U = 0,
			k = 0,
			O = 0,
			X = 0,
			G = 0,
			W = new Qe.XiangliangThree;
		for (i = 0, r = e.size(); r > i; i++)
			if (a = e.get(i), !a.onlyShadow)
				if (n = a.color, l = a.intensity, u = a.distance, a.updateWorldMatrix(!0), a instanceof Qe.AmbientLight) {
					if (!a._visible) continue;
					this.gammaInput ? (d += n.r * n.r, m += n.g * n.g, g += n.b * n.b) : (d += n.r, m += n.g, g += n.b)
				} else if (a instanceof Qe.DirectionalLight) {
			if (I += 1, !a._visible) continue;
			if (a.direction ? W.copy(a.direction) : (W.copy(a.worldMatrix.getPosition()), W.sub(a.target.worldMatrix.getPosition())), W.normalize(), 0 === W.x && 0 === W.y && 0 === W.z) continue;
			k = 3 * D, x[k] = W.x, x[k + 1] = W.y, x[k + 2] = W.z, this.gammaInput ? p(v, k, n, l * l) : f(v, k, n, l), D += 1
		} else if (a instanceof Qe.PointLight) {
			if (F += 1, !a._visible) continue;
			O = 3 * B, this.gammaInput ? p(A, O, n, l * l) : f(A, O, n, l), c = a.worldMatrix.getPosition(), w[O] = c.x, w[O + 1] = c.y, w[O + 2] = c.z, _[B] = u, B += 1
		} else if (a instanceof Qe.SpotLight) {
			if (V += 1, !a._visible) continue;
			X = 3 * N, this.gammaInput ? p(S, X, n, l * l) : f(S, X, n, l), c = a.worldMatrix.getPosition(), b[X] = c.x, b[X + 1] = c.y, b[X + 2] = c.z, M[N] = u, W.copy(c), W.sub(a.target.worldMatrix.getPosition()), W.normalize(), C[X] = W.x, C[X + 1] = W.y, C[X + 2] = W.z, P[N] = Math.cos(a.angle), T[N] = a.exponent, N += 1
		} else if (a instanceof Qe.HemisphereLight) {
			if (U += 1, !a._visible) continue;
			if (W.copy(a.worldMatrix.getPosition()), W.normalize(), 0 === W.x && 0 === W.y && 0 === W.z) continue;
			G = 3 * R, E[G] = W.x, E[G + 1] = W.y, E[G + 2] = W.z, s = a.color, o = a.groundColor, this.gammaInput ? (h = l * l, p(z, G, s, h), p(L, G, o, h)) : (f(z, G, s, l), f(L, G, o, l)), R += 1
		}
		for (i = 3 * D, r = Math.max(v.length, 3 * I); r > i; i++) v[i] = 0;
		for (i = 3 * B, r = Math.max(A.length, 3 * F); r > i; i++) A[i] = 0;
		for (i = 3 * N, r = Math.max(S.length, 3 * V); r > i; i++) S[i] = 0;
		for (i = 3 * R, r = Math.max(z.length, 3 * U); r > i; i++) z[i] = 0;
		for (i = 3 * R, r = Math.max(L.length, 3 * U); r > i; i++) L[i] = 0;
		y.directional.length = D, y.point.length = B, y.spot.length = N, y.hemi.length = R, y.ambient[0] = d, y.ambient[1] = m, y.ambient[2] = g
	}, Qe.ProgramManagerId = 0, Qe.ProgramManagerCache = {
		count: 0
	};
	var Si = function(t, i, r) {
		this.width = t, this.height = i, r = r || {}, this.wrapS = r.wrapS !== e ? r.wrapS : Qe.ClampToEdgeWrapping, this.wrapT = r.wrapT !== e ? r.wrapT : Qe.ClampToEdgeWrapping, this.magFilter = r.magFilter !== e ? r.magFilter : Qe.LinearFilter, this.minFilter = r.minFilter !== e ? r.minFilter : Qe.LinearMipMapLinearFilter, this.anisotropy = r.anisotropy !== e ? r.anisotropy : 1, this.offset = new Qe.XiangliangTwo(0, 0), this.repeat = new Qe.XiangliangTwo(1, 1), this.format = r.format !== e ? r.format : Qe.RGBAFormat, this.type = r.type !== e ? r.type : Qe.UnsignedByteType, this.depthBuffer = r.depthBuffer !== e ? r.depthBuffer : !0, this.stencilBuffer = r.stencilBuffer !== e ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
	};
	Si.prototype = {
		constructor: Si,
		clone: function() {
			var t = new Si(this.width, this.height);
			return t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.anisotropy = this.anisotropy, t.offset.copy(this.offset), t.repeat.copy(this.repeat), t.format = this.format, t.type = this.type, t.depthBuffer = this.depthBuffer, t.stencilBuffer = this.stencilBuffer, t.generateMipmaps = this.generateMipmaps, t.shareDepthFrom = this.shareDepthFrom, t
		},
		getUniqueCode: function() {
			return this._id
		},
		dispose: function() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	};
	var bi = function(t, e, i) {
		Si.call(this, t, e, i), this.activeCubeFace = 0
	};
	Qe.extend(bi, Si, {}), Qe.Gl3dview3D = function(i, r, a, n) {
		Qe.Element.call(this), this.id = Qe.Gl3dview3DId++, this._interactionDispatcher = new Qe.EventDispatcher, n = n || {}, this.helperBox = new Qe.Serva, this.helperBox.addServaChangeListener(this.handleServaChange, this), this._rootView = ei.createView("hidden"), this._canvas = this.initCanvas(a), this._topCanvas = ei.createCanvas(this), this._bottomCanvas = ei.createCanvas(this);
		var s = this._canvas.parentNode;
		s && (s.removeChild(this._canvas), s.appendChild(this._rootView), this.adjustRootViewBounds(0, 0, this._canvas.width, this._canvas.height)), this._rootView.appendChild(this._bottomCanvas), this._rootView.appendChild(this._canvas), this._rootView.appendChild(this._topCanvas), this.setCanvasPropety(), this._gleye = r || new Qe.PerspectiveGleye, this._gleye.addPropertyChangeListener(this.dirtyGl3dview, this), this._clearColor = n.clearColor !== e ? n.clearColor : new Qe.Color(16777215), this._clearAlpha = n.clearAlpha != e ? n.clearAlpha : 1, this._precision = n.precision !== e ? n.precision : "mediump", this.__fog = new Qe.FogExp2, this.devicePixelRatio = n.devicePixelRatio !== e ? n.devicePixelRatio : t.devicePixelRatio !== e ? t.devicePixelRatio : 1, this._premultipliedAlpha = null == n.premultipliedAlpha ? !0 : n.premultipliedAlpha, ii.isIOS || ii.isAndroid ? (this._antialias = !1, this._preserveDrawingBuffer = !1) : (this._preserveDrawingBuffer = null == n.preserveDrawingBuffer ? !0 : n.preserveDrawingBuffer, this._antialias = n.antialias == e ? !0 : n.antialias), this._gl = this.initGL(), this._programs = [], this._currentProgram = null, this.overrideMaterial = null, this._maxLights = n.maxLights !== e ? n.maxLights : 4, this._projScreenMatrix = new ti, this._projScreenMatrixPS = new ti, this._frustum = new Qe.Frustum, this._vector3 = new Je, this._oldDoubleSided = -1, this._oldFlipSided = -1, this._oldBlending = null, this._oldBlendEquation = null, this._oldBlendSrc = null, this._oldBlendDst = null, this._currentGleye = null, this._enabledAttributes = {}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.gpu = new Qe.GPU(this), this.pm = new Qe.ProgramManager(this), this.setDefaultGLState(), this.paintSortFunction = Qe.Defaults.paintSortFunction, this.sortNodes = !0, this.sortOpaqueOrderByMaterial = !0, this.glNodeList = [], this.helperGLNodeList = [], this.info = {
			memory: {
				programs: 0,
				geometries: 0,
				textures: 0
			},
			render: {
				calls: 0,
				vertices: 0,
				faces: 0,
				points: 0
			},
			currentMaterialId: -1
		}, this.projector = new Qe.Projector, this.up = new Qe.XiangliangThree(0, 1, 0), this.position = new Qe.XiangliangThree(0, 0, 0), this.seletionMaterial = new Qe.BasicMaterial, this.seletionMaterial.wireframe = !0, this.seletionMaterial.wireframeLinewidth = 1, this.seletionMaterial.color = new Qe.Color(65280), this.selectionCube = new yi, this.selectionCube.material = this.seletionMaterial, this.outlineMaterialMap = {}, this.selectionCube._modelViewMatrix = new ti, this.selectionCube._normalMatrix = new $e, this.selectionCube.name = "select", this.alarmMaterial = new Qe.BasicMaterial, this.alarmMaterial.wireframe = !0, this.alarmMaterial.wireframeLinewidth = 1, this.alarmMaterial.color = new Qe.Color(16711680), this.alarmCube = new yi, this.alarmCube.material = this.alarmMaterial, this.alarmCube._modelViewMatrix = new ti, this.alarmCube._normalMatrix = new $e, this.alarmCube.name = "alarm";
		var o = 512;
		this._glowSurface = new Qe.Plane(2, 2), this._glowSurface2 = new Qe.Plane(o, o), this._glowSurface.target = new Si(o, o, {
			type: Qe.UnsignedByteType
		}), this._glowSurface.target1 = new Si(o, o, {
			type: Qe.UnsignedByteType
		}), this._glowSurface.target2 = new Si(o, o, {
			type: Qe.UnsignedByteType
		}), this._glowSurfaceMaterial = new Qe.BlurMaterial, this._blurMaterialH = new Qe.BlurMaterial, this._blurMaterialH.orientation = 1, this._blurMaterialV = new Qe.BlurMaterial, this.deferredPostionMaterial = new Qe.DeferredMaterial, this.deferredNormalMaterial = new Qe.DeferredMaterial({
			isNormal: 1
		}), this.ssaoMaterial = new Qe.SSAOMaterial, this.ssaoMaterial.map2 = new Qe.Texture(ui.ssaoNormalImage);
		var l = 1024;
		this.deferredPostionTarget = new Si(l, l, {
			type: Qe.FloatType,
			magFilter: Qe.NearestFilter,
			minFilter: Qe.NearestFilter
		}), this.deferredNormalTarget = new Si(l, l, {
			type: Qe.FloatType,
			magFilter: Qe.NearestFilter,
			minFilter: Qe.NearestFilter,
			format: Qe.RGBFormat
		}), this.ssaoTarget = new Si(l, l, {
			type: Qe.FloatType,
			magFilter: Qe.NearestFilter,
			minFilter: Qe.NearestFilter
		}), this.ssaoTarget1 = new Si(o, o, {
			type: Qe.UnsignedByteType
		}), this.ssaoTarget2 = new Si(o, o, {
			type: Qe.UnsignedByteType
		}), this.finalSSAOTarget = null, this._interactions = null, this.billboardRenderer = null, this._groupCounter = 0, this.groupMap = {}, this.groupCountMap = {}, this.bufferNodeMap = {}, this.lineMap = {}, this.particleMap = {}, this.glInited = {}, this.glNodeMap = {}, this.normalNodeMap = {}, this.showAxis = !1, this.axisSize = 20, this.axisPosition = new Qe.XiangliangThree(0, 0, 0), this.axis = new Qe.Axis(this.axisSize), this.alarmBillboards = [], this.areaPickingRect = {}, this.setServa(i === e ? new Qe.Serva : i), this.renderCallback = null, this.beforeRenderFunction = null, this.dirtyGl3dview(), this.prepareData(), this.autoUpdateGleyeAspect = !0, this.shadowMapRenderer = null, this.shadowMapType = Qe.PCFSoftShadowMap, this.shadowMapCullFace = Qe.CullFaceFront, this.adjustBounds(this._canvas.width, this._canvas.height, 0, 0);
		var h = new Qe.DefaultInteraction(this);
		h.panSpeed = 3, h.zoomSpeed = 10;
		var c = this;
		this.getRootView().addEventListener("mousedown", function(t) {
			c.handleMouseDown(t)
		}), this.getRootView().addEventListener("mouseup", function(t) {
			c.handleClick(t)
		});
		var u = [h, new Qe.SelectionInteraction(this)];
		this.setInteractions(u), this.doubleClickToLookAtFunction = vi.doubleClickToLookAtFunction, d(this), this.initSurfaceGroup(), this.materialRenderListMap = {}, this._selectTransparencyThreshold = 0, this._dynamicBatchDraw = !1, this._dynamicBatchDrawCountLimit = 1024, this.needSmoothNormalFunction = vi.needSmoothNormalFunction, this._annotationMap = {}, this._activeAnnotation = null
	}, Qe.extend(Qe.Gl3dview3D, Qe.Data, {
		___accessor: ["shadowMapEnable", "editableFunction", "keyboardRemoveEnabled", "selectTransparencyThreshold", "dynamicBatchDraw", "showFps"],
		setUseFog: function(t) {
			this._useFog = t, this._useFog ? this._fog = this.__fog : this._fog = null
		},
		setOverloadMaterial: function(t) {
			this._overloadMaterial = t
		},
		setFogColor: function(t) {
			this.__fog.color = t
		},
		setFogDensity: function(t) {
			this.__fog.density = t
		},
		setServa: function(t) {
			if (!t) throw "Serva can not be null";
			if (this.dataBox !== t) {
				var e = this.dataBox;
				e && (this._clearServa(e), e.removeServaChangeListener(this.handleServaChange, this), e.removeDataPropertyChangeListener(this.handleDataPropertyChange, this), e.getAlarmBox().removeServaChangeListener(this.dirtyGl3dview, this), e.getSelectionContainer().removeSelectionChangeListener(this.dirtyGl3dview, this)), this.dataBox = t, this.dataBox.addServaChangeListener(this.handleServaChange, this), this.dataBox.addDataPropertyChangeListener(this.handleDataPropertyChange, this), this.dataBox.getAlarmBox().addServaChangeListener(this.dirtyGl3dview, this), this.dataBox.getSelectionContainer().addSelectionChangeListener(this.dirtyGl3dview, this), this.firePropertyChange("dataBox", e, this._box), this.glNodeList = [], this.dirtyGl3dview(), this._clearNodeCache()
			}
		},
		setRenderCallback: function(t) {
			this.renderCallback = t
		},
		setBeforeRenderFunction: function(t) {
			this.beforeRenderFunction = t
		},
		getServa: function() {
			return this.dataBox
		},
		getClearColor: function() {
			return this._clearColor
		},
		setClearColor: function(t) {
			3 == arguments.length ? (this._clearColor = new Qe.Color, this._clearColor.setRGB(arguments[0], arguments[1], arguments[2])) : (this._clearColor = t, this._clearColor instanceof Qe.Color || (this._clearColor = new Qe.Color(t))), this._gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha), this.dirtyGl3dview()
		},
		setClearAlpha: function(t) {
			this._clearAlpha = t, this._gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha), this.dirtyGl3dview()
		},
		getClearAlpha: function() {
			return this._clearAlpha
		},
		getPrecision: function() {
			return this._precision
		},
		setPrecision: function(t) {
			this._precesion = t
		},
		setSSAOBlur: function(t) {
			this._ssaoBlur = t
		},
		setSSAOEnable: function(t) {
			return t && !this.isFloatTextureSupport() ? !1 : (this._sSAOEnable = t, this._dirty = !0, !0)
		},
		isSSAOEnable: function() {
			return this._sSAOEnable && this._baseRender
		},
		setSSAOOccluderBias: function(t) {
			this._occluderBias = t, this._dirty = !0
		},
		setSSAOSamplingRadius: function(t) {
			this._samplingRadius = t, this._dirty = !0
		},
		setSSAOAttenuation: function(t) {
			this._attenuation = t, this._dirty = !0
		},
		isFloatTextureSupport: function() {
			return null != this._glExtensionTextureFloat
		},
		getGleye: function() {
			return this._gleye
		},
		setGleye: function(t, e) {
			if (this._gleye != t) {
				var i = this._gleye;
				if (i.removePropertyChangeListener(this.dirtyGl3dview), this._gleye = t, this._gleye.addPropertyChangeListener(this.dirtyGl3dview, this), this.autoUpdateGleyeAspect) {
					this._gleye.setAspect(i.aspect);
					var r = this.getDefaultInteraction();
					r && (r.object = this._gleye)
				}
				e && (this._gleye.p(i.p()), this._gleye.lookAt(i.getTarget())), this.dirtyGl3dview()
			}
		},
		isVisible: function(t) {
			if (t) {
				if (t instanceof Qe.Link || t instanceof Qe.PathLink) {
					if (!t.isVisible()) return !1;
					if (!this.isVisible(t._fromNode)) return !1;
					if (!this.isVisible(t._toNode)) return !1
				}
				if (!t.isVisible()) return !1;
				if (t._parent) return this.isVisible(t._parent);
				if (this.visibleFunction) return this.visibleFunction(t)
			}
			return !0
		},
		setCanvasPropety: function() {
			this._canvas && (this._canvas.setAttribute("tabindex", this.id), this._canvas.style.outline = "none", this._canvas.style.position = "absolute")
		},
		initCanvas: function(t) {
			return t === e ? document.createElement("canvas") : ("string" == typeof t && (t = document.getElementById(t)), t)
		},
		initGL: function() {
			var t;
			try {
				t = this._canvas.getContext("webgl", {
					preserveDrawingBuffer: this._preserveDrawingBuffer,
					premultipliedAlpha: this._premultipliedAlpha,
					antialias: this._antialias,
					stencil: !0
				}) || this._canvas.getContext("experimental-webgl", {
					preserveDrawingBuffer: this._preserveDrawingBuffer,
					premultipliedAlpha: this._premultipliedAlpha,
					antialias: this._antialias,
					stencil: !0
				})
			} catch (e) {
				console.log(e)
			}
			return t || console.error("Can not init webgl context"), this._glExtensionTextureFloat = t.getExtension("OES_texture_float"), this._glExtensionStandardDerivatives = t.getExtension("OES_standard_derivatives"), this._glExtensionTextureFilterAnisotropic = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), this._glExtensionCompressedTextureS3TC = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), this._glExtensionTextureFloat || console.log("TGL.Gl3dview3D: Float textures not supported."), this._glExtensionStandardDerivatives || console.log("TGL.Gl3dview3D: Standard derivatives not supported."), this._glExtensionTextureFilterAnisotropic || console.log("TGL.Gl3dview3D: Anisotropic texture filtering not supported."), this._glExtensionCompressedTextureS3TC || console.log("TGL.Gl3dview3D: S3TC compressed textures not supported."), t ? t : void console.log("Error: Your browser does not support WebGL.")
		},
		resetRenderInfo: function() {
			this.info.render.calls = 0, this.info.render.vertices = 0, this.info.render.faces = 0, this.info.render.points = 0, this.info.currentMaterialId = -1
		},
		_clearServa: function(t) {
			var e = null;
			e = t === this.helperBox ? this.helperGLNodeList : this.glNodeList;
			for (var i = e.length - 1; i >= 0; i--) {
				e[i];
				e.splice(i, 1)
			}
			e = [], this.prepareData(), this.pm._lightNeedsUpdate = !0, this.pm.changeAllLightMaterialUpdateFlags(!0), this._clearNodeCache(), this.deleteCloneNode()
		},
		handleServaChange: function(t) {
			var e = t.kind,
				i = t.data,
				r = t.source,
				a = null;
			a = r === this.helperBox ? this.helperGLNodeList : this.glNodeList, "add" === e ? i instanceof Qe.Light ? (this.pm._lightNeedsUpdate = !0, this.pm.changeAllLightMaterialUpdateFlags(!0), this.prepareData()) : i instanceof Qe.Annotation ? this._createAnnotationDiv(i) : (this.addNodeMaterials(i), 0 === a.length ? this.initWebGLNodes(r, a) : this.addNode(i, a), i._alarmBillboard && this.alarmBillboards.push(i._alarmBillboard)) : "remove" === e ? i instanceof Qe.Light ? (this.pm._lightNeedsUpdate = !0, this.pm.changeAllLightMaterialUpdateFlags(!0), this.prepareData()) : i instanceof Qe.Annotation ? this._removeAnnotationDiv(i) : (this.removeNode(i, a), this.deleteCloneNode(i)) : "clear" === e && this._clearServa(), this.boundingBox = null, this.dirtyGl3dview()
		},
		removeNode: function(t, e) {
			for (var i = e.length - 1; i >= 0; i--) {
				var r = e[i];
				r.node === t && e.splice(i, 1)
			}
			this._clearNodeCache(t)
		},
		_clearNodeCache: function(t) {
			if (t) {
				if (null != t.oldGroups)
					for (var e in t.oldGroups) {
						var i = t.oldGroups[e],
							r = this.groupCountMap[i.id];
						null != r && (r--, 0 >= r ? (delete this.groupCountMap[i.id], delete this.groupMap[i.id]) : this.groupCountMap[i.id] = r)
					}
				if (t._alarmBillboard) {
					var a = this.alarmBillboards.indexOf(t._alarmBillboard); - 1 !== a && this.alarmBillboards.splice(a, 1)
				} else t instanceof Qe.Annotation && this._removeAnnotationDiv(t)
			} else {
				for (var n in this.groupMap) {
					var s = this.groupMap[n],
						o = s._nodeId;
					this.helperBox.containsById(o) || delete this.groupMap[n]
				}
				this.glInited = new Object, this.alarmBillboards.splice(0), this.glNodeList = []
			}
			for (var n in this._annotationMap) this._removeAnnotationDiv(n)
		},
		addNode: function(t, e) {
			for (var i = this.addWebGLNode(e, t), r = 0; r < i.length; r++) {
				var a = i[r];
				this.updateWebGLNode(a)
			}
		},
		addNodeMaterials: function(t) {
			var e, i = t.material;
			if (i instanceof Qe.Material) this.addMaterial(i);
			else if (i instanceof Qe.ArrayMaterial) {
				var r = i.materials,
					a = r.length;
				for (e = 0; a > e; e++) this.addMaterial(r[e])
			}
		},
		addMaterial: function(t) {
			this.pm.addMaterial(t), t.map && this.pm.addTexture(t.map)
		},
		handleDataPropertyChange: function(t) {
			var e = t.source;
			if (e instanceof Qe.Node) {
				var i = t.property;
				if (e.isSizeChangedProperty(i) || i === Qe.Styles.MaterailType || i === Qe.Styles.NormalType) {
					if (e instanceof Qe.Line) {
						e.verticesNeedUpdate = !0;
						var r = this.lineMap[e._id];
						this.initLineBuffers(e), si.buildLineBufferData(e, this._gl.DYNAMIC_DRAW, this._gl, r)
					} else if (e.groups) {
						e.verticesNeedUpdate = !0, (i === Qe.Styles.MaterailType || i === Qe.Styles.NormalType) && (e.normalsNeedUpdate = !0);
						for (var a in e.groups) {
							var n = e.groups[a],
								r = this.groupMap[n.id],
								s = si.getMaterial(e, n.materialIndex);
							e.normalsNeedUpdate && this.initGroupBuffer(e, n, r, !0), si.buildGroupBufferData(n, e, this._gl.DYNAMIC_DRAW, !e.dynamic, s, this._gl, r, this)
						}
					}
				} else if ("materialMapping" === i) this._currentGroupHash = null, this.glInited[e.getId()] = !1, this.removeNode(e, this.glNodeList), this.addNode(e, this.glNodeList);
				else if ("alarmBillboard" === i) {
					var o = t.oldValue,
						l = t.newValue;
					this._addNodeAlarmBillboard(e, o, l)
				}
				this.addNodeMaterials(e)
			} else e instanceof Qe.Light && (this.pm._lightNeedsUpdate = !0);
			(e.isSizeChangedProperty && e.isSizeChangedProperty(i) || "parent" == i || e.isSpaceChangedProperty(i)) && (this.deleteCloneNode(e), this.boundingBox = null), this.dirtyGl3dview()
		},
		deleteCloneNode: function(t) {
			if (t) {
				var e = t.getId ? t.getId() : t,
					i = this.normalNodeMap[e];
				if (null != i) {
					i.setParent(null);
					for (var r in i.groups) {
						var a = i.groups[r];
						delete this.groupMap[a.id]
					}
				}
				delete this.normalNodeMap[e]
			} else
				for (var e in this.normalNodeMap) this.deleteCloneNode(e)
		},
		setBlurAmount: function(t) {
			this._blurAmount = t
		},
		setBlurScale: function(t) {
			this._blurScale = t
		},
		setBlurStrength: function(t) {
			this._blurStrength = t
		},
		setBlurGlobalAlpha: function(t) {
			this._blurGlobalAlpha = t
		},
		dirtyGl3dview: function(t) {
			this.dataBox.batch || (this._dirty = !0)
		},
		_addNodeAlarmBillboard: function(t, i, r) {
			if (r === e && (r = t._alarmBillboard), null != i && -1 !== this.alarmBillboards.indexOf(i)) {
				var a = this.alarmBillboards.indexOf(i);
				this.alarmBillboards.splice(a, 1), i.removePropertyChangeListener(this.dirtyGl3dview, this)
			}
			r && -1 === this.alarmBillboards.indexOf(r) && (this.alarmBillboards.push(r), r.addPropertyChangeListener(this.dirtyGl3dview, this))
		},
		initWebGLNodes: function(t, e) {
			var i, r, a = t.getNodes();
			for (i = 0, r = a.size(); r > i; i++) {
				var n = a.get(i);
				n.renderSelected = !1, this.addWebGLNode(e, n), this.glNodeMap[n.id] = n
			}
			for (i = 0, r = e.length; r > i; i++) this.updateWebGLNode(e[i])
		},
		updateWebGLNode: function(t) {
			var e, i, r = t.node;
			if (r instanceof Qe.Entity) {
				for (var a in r.groups)
					if (e = r.groups[a], i = si.getMaterial(r, e.materialIndex), r.buffersNeedUpdate) {
						var n = this.groupMap[e.id];
						this.initGroupBuffer(r, e, n), si.buildGroupBufferData(e, r, this._gl.DYNAMIC_DRAW, !r.dynamic, i, this._gl, n, this)
					}
				r.setUpdateFlags(!1), r.buffersNeedUpdate = !1
			} else if (r instanceof Qe.BufferNode) this.setBufferNodeData(r, this._gl.DYNAMIC_DRAW, !r.dynamic);
			else if (r instanceof Qe.Line) {
				var n = this.lineMap[r._id];
				si.buildLineBufferData(r, this._gl.DYNAMIC_DRAW, this._gl, n)
			} else if (r instanceof Qe.Particle) {
				var n = this.particleMap[r._id];
				li(r, this._gl.DYNAMIC_DRAW, this._gl, n)
			}
		},
		addWebGLNode: function(t, i) {
			var r, a, n, s, o = [];
			if (this.glInited[i.getId()] || this._addNodeAlarmBillboard(i), !this.glInited[i.getId()])
				if (this.glInited[i.id] = !0, i._modelViewMatrix = new ti, i._normalMatrix = new $e, i instanceof Qe.Entity) {
					i.groups == e && oi(i);
					for (r in i.groups) {
						a = i.groups[r], a.id = a.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : a.id;
						var l = this.groupCountMap[a.id] || 0;
						l++, this.groupCountMap[a.id] = l, this.groupMap[a.id] === e && (this.groupMap[a.id] = {});
						var h = this.groupMap[a.id];
						h._nodeId = i.getId(), h.__webglVertexBuffer || (this.createGroupBuffer(a, h), this.initGroupBuffer(i, a, h), i.setUpdateFlags(!0))
					}
				} else if (i instanceof Qe.Line) {
				null == this.lineMap[i._id] && (this.lineMap[i._id] = {});
				var h = this.lineMap[i._id];
				h._nodeId = i.getId(), h.__webglVertexBuffer || (this.createLineBuffers(i), this.initLineBuffers(i), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0, i.lineDistancesNeedUpdate = !0)
			} else if (i instanceof Qe.Particle) {
				null == this.lineMap[i._id] && (this.lineMap[i._id] = {});
				var h = this.lineMap[i._id];
				h._nodeId = i.getId(), h.__webglVertexBuffer || (this.createParticleBuffers(i), this.initParticleBuffers(i), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0)
			} else i instanceof Qe.BufferNode ? this.initBufferNode(i) : i instanceof Qe.Annotation && this._createAnnotationDiv(i);
			if (i instanceof Qe.Entity) {
				for (r in i.groups) a = i.groups[r], n = si.getMaterial(i, a.materialIndex), s = {
					group: a,
					node: i,
					opaque: n.transparent ? null : n,
					transparent: n.transparent ? n : null
				}, t.push(s), o.push(s);
				null === i.groups
			} else i instanceof Qe.Line ? (n = i.material, s = {
				group: i,
				node: i,
				opaque: n.transparent ? null : n,
				transparent: n.transparent ? n : null
			}, t.push(s), o.push(s)) : i instanceof Qe.Particle ? (n = i.material, s = {
				group: i,
				node: i,
				opaque: n.transparent ? null : n,
				transparent: n.transparent ? n : null
			}, t.push(s), o.push(s)) : i instanceof Qe.BufferNode && (n = i.material instanceof Qe.ArrayMaterial ? i.material.materials[0] : i.material, s = {
				group: i,
				node: i,
				opaque: n.transparent ? null : n,
				transparent: n.transparent ? n : null
			}, t.push(s), o.push(s));
			return i.glActive = !0, o
		},
		onElementDispose: function(t) {
			var e = t.target;
			e.removeEventListener("dispose", this.onElementDispose), deallocateElement(e), this.info.memory.geometries--
		},
		deallocateElement: function(t) {},
		_AK47: function(t, i, r, a, n, s) {
			this._fog;
			t.parent === e && t.updateWorldMatrix(!0, !1), t.worldMatrixInverse.getInverse(t.worldMatrix), this._projScreenMatrix.multiply(t.projectionMatrix, t.worldMatrixInverse), this._frustum.setFromMatrix(this._projScreenMatrix), 0 === r.length && (this.initWebGLNodes(i, r), this.prepareData()), this.resetRenderInfo();
			var o, l, h, c;
			if (!s)
				for (o = 0, l = r.length; l > o; o++) h = r[o], c = h.node, c.renderSelected = !1, h.render = !1, this.isVisible(c) && (this.unrollBufferMaterial(h), this.setupMatrices(c, t), (c instanceof Qe.Entity || c instanceof Qe.Particle) && c.frustumCulled && !this._frustum.intersectsObject(c) || (h.render = !0, this.sortNodes && (this._vector3.copy(c.worldMatrix.getPosition()), this._vector3.applyProjection(this._projScreenMatrix), null != c.renderDepth ? h.z = c.renderDepth + this._vector3.z : h.z = this._vector3.z)));
			var u = new ci;
			u.addAll(a), !n && !s && u.addAll(this.alarmBillboards);
			var f = this;
			!s && u.forEach(function(t) {
				t.renderDepth ? t.z = t.renderDepth : (f._vector3.copy(t.worldMatrix.getPosition()), f._vector3.applyProjection(f._projScreenMatrix), t.z = f._vector3.z)
			}), u.size() > 0 && !s && null == this.billboardRenderer && (this.billboardRenderer = new Qe.BillboardRenderer, this.billboardRenderer.init(this));
			var p = r.concat(u._as),
				d = this.sortNodesFunc(p);
			this.setBlending(Qe.NoBlending), this.renderNodes(d, !1, "opaque", t, i.getLights(), !1, null, s, this.sortOpaqueOrderByMaterial), this.renderNodes(d, !0, "transparent", t, i.getLights(), !0, null, s), this.setDepthTest(!0), this.setDepthWrite(!0)
		},
		unrollBufferMaterial: function(t) {
			var e, i, r, a = t.node,
				n = t.group;
			r = a.material, r instanceof Qe.ArrayMaterial ? (i = n.materialIndex || 0, e = r.materials[i], e.transparent ? (t.transparent = e, t.opaque = null) : (t.opaque = e, t.transparent = null)) : (e = r, e && (e.transparent ? (t.transparent = e, t.opaque = null) : (t.opaque = e, t.transparent = null)))
		},
		renderLicense: function() {},
		isShadowable: function() {
			return this.isShadowMapEnable() && (this.maxShadows > 0 || this.maxPointShadows > 0)
		},
		render: function() {
			if (this._dirty && (this._dirty = !1, null != this.beforeRenderFunction && this.beforeRenderFunction.call(this), !this.isShadowable() || (this.shadowMapRender(), this.setRenderTarget(e), !this.debugPointLight))) {
				if (Wi.twm(this), this.paintBottom(this._bottomCanvas),
					this.getShowFps() && (this.__time = (new Date).getTime()), this.innerRender(this._gleye, !0), this.renderAnnotations(this._gleye), this.extendRender(this._gleye), this.paintTopCanvas(), this.getShowFps()) {
					this._tpf = (new Date).getTime() - this.__time;
					var t = this._topCanvas.getContext("2d"),
						i = (1e3 / this._tpf).toFixed(0);
					i > 500 && (i = "> 500");
					var r = "FPS:" + i + ",TPF:" + this._tpf + " ms";
					t.font = "20px Arial sans-serif", t.fontWeight = "bold", t.lineWith = 2, t.fillStyle = "rgba(0, 0, 0, 1)", t.fillText(r, 10, 25)
				}
				/*if (this._xyz != e) {
					var a, n = this._xyz,
						s = n.markText,
						o = n.type,
						r = (n.expired, n.innerHTML),
						l = 0,
						h = 0,
						t = (this._topCanvas.getBoundingClientRect(), this._topCanvas.getContext("2d"));
					s != e && null != s && "" != s || "2" == o ? (t.font = "24px Arial sans-serif", a = ni.getTextSize(t.font, r), t.fillStyle = "red", l = this._canvas.width - a.width - 20, h = this._canvas.height - a.height - 10) : (t.font = "15px Arial sans-serif", t.fillStyle = "rgba(240, 120, 25, 0.6)", a = ni.getTextSize(t.font, r), l = this._canvas.width - a.width - 20, h = this._canvas.height - a.height - 10), t.fillText(r, l, h)
				}*/
				null != this.renderCallback && this.renderCallback.call(this)
			}
		},
		getTextSize: function(t, e) {
			return ni.getTextSize(t, e)
		},
		shadowMapRender: function() {
			null == this.shadowMapRenderer && (this.shadowMapRenderer = new tr, this.shadowMapRenderer.init(this)), 0 === this.glNodeList.length && (this.initWebGLNodes(this.dataBox, this.glNodeList), this.prepareData()), this.shadowMapRenderer.render(this.dataBox, this._gleye)
		},
		handleMouseDown: function(t) {
			var e = t.target;
			this.lastX = t.clientX, this.lastY = t.clientY, "tgl_annotation" == e.getAttribute("class") && "1" == e.style.opacity && (t.stop = !0, t.stopPropagation())
		},
		handleClick: function(t) {
			var e = t.clientX - this.lastX,
				i = t.clientY - this.lastY;
			if (Math.abs(e) < .1 && Math.abs(i) < .1) {
				var r = t.target;
				if ("tgl_annotation" != r.getAttribute("clazz")) this._activeAnnotation && (this._activeAnnotation = null, this.dirtyGl3dview());
				else if ("1" == r.style.opacity) {
					var a = r.getAttribute("id"),
						n = this.getServa().getDataById(a),
						s = this._annotationMap[a];
					this.handleDefaultAnnotationClick(n, s), this.handleAnnotationClick(n, s), this.dirtyGl3dview()
				}
			}
		},
		handleDefaultAnnotationClick: function(t, e) {
			this._activeAnnotation != t && (this._activeAnnotation = t)
		},
		handleAnnotationClick: function(t, e) {},
		renderAnnotations: function(t) {
			var e = this.dataBox.getAnnotations(),
				i = this;
			if (e && (e.forEach(function(e) {
					i.renderAnnotation(t, e)
				}), this._createAnnotationStyle()), this._activeAnnotation) {
				this._createAnnotationToolTipDiv();
				var r = this._annotationToolTipDiv;
				r.innerHTML = this._activeAnnotation.getText();
				var a = this._annotationMap[this._activeAnnotation.getId()];
				r.parentNode != a && a.appendChild(r), r.style.opacity = a.style.opacity
			}
		},
		renderAnnotation: function(t, e) {
			var i = this._annotationMap[e.getId()];
			null == i && (i = this._createAnnotationDiv(e)), i.innerHTML = e._label, e.updateWorldMatrix();
			var r = e.worldMatrix.getPosition(),
				a = this.getViewPosition(r);
			this._annotationToolTipDiv;
			i.style.left = a.x + "px", i.style.top = a.y + "px", i.style.opacity = "1";
			var n = r.distanceTo(t.getPosition()),
				s = this.getElementByScreenPoint(a, !1);
			if (s && s.length > 0) {
				var o = s[0];
				o.distance < n && (i.style.opacity = "0.03")
			}
		},
		_addCSSRule: function(t, e, i, r) {
			r = r || (t.cssRules || t.rules).length, t.insertRule ? t.insertRule(e + "{" + i + "}", r) : t.addRule && t.addRule(e, i, r)
		},
		_createAnnotationStyle: function() {
			if (!this._annotationStyle) {
				var t = document.createElement("style");
				t.appendChild(document.createTextNode("")), document.head.appendChild(t);
				var e = t.sheet;
				this._addCSSRule(e, ".tgl_annotation", "position:absolute;width:16px;height:16px;border-radius:10px;text-align:center;border : 2px solid gray;"), this._addCSSRule(e, ".tgl_annotation:hover", "border : 2px solid black;"), this._annotationStyle = t
			}
		},
		_removeAnnotationDiv: function(t) {
			var e = t.getId ? t.getId() : t,
				i = this._annotationMap[e];
			null != i && this.getRootView().removeChild(i)
		},
		_createAnnotationDiv: function(t) {
			var e = document.createElement("div"),
				i = t.getStyle("annotation.class");
			return e.setAttribute("id", t.getId()), e.setAttribute("class", i), e.setAttribute("clazz", "tgl_annotation"), this._annotationMap[t.getId()] = e, this.getRootView().appendChild(e), e
		},
		_createAnnotationToolTipDiv: function() {
			if (null == this._annotationToolTipDiv) {
				var t = document.createElement("div");
				t.setAttribute("class", "tgl_annotation_tooltip");
				var e = document.createElement("style");
				e.appendChild(document.createTextNode("")), document.head.appendChild(e);
				var i = e.sheet,
					r = "position: absolute;border: 3px solid #333; background-color: #ccd; padding: 3px;text-align: left;width: 220px;height: 'auto';border-radius: 10px;bottom:35px;left:-13px;";
				this._addCSSRule(i, ".tgl_annotation_tooltip", r), r = "content: ' ';position: absolute;top: 100%; border: 1px solid;", this._addCSSRule(i, ".tgl_annotation_tooltip:after, .tgl_annotation_tooltip:before", r), r = "border-color: #333 transparent transparent transparent;border-width: 16px 17px 0 7px;left: 10px;", this._addCSSRule(i, ".tgl_annotation_tooltip:before", r), r = "border-color: #ccd transparent transparent transparent;border-width: 12px 11px 0 4px;left: 14px;", this._addCSSRule(i, ".tgl_annotation_tooltip:after", r), this._annotationToolTipDiv = t
			}
		},
		extendRender: function(t) {},
		innerRender: function(t, i) {
			if (t === e && (t = this._gleye), null === t) return void console.log(" no gleye");
			if (this.debug && console.log("inner Render"), this.autoClear) {
				var r = this._clearColor;
				this._gl.clearColor(r.r, r.g, r.b, this._clearAlpha), _i.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil, this)
			}
			if (i)
				for (var a = 0; a < this._interactions.length; a++) {
					var n = this._interactions[a];
					n.update && n.update()
				}
			if (this.billboardRenderer && this.billboardRenderer.disable(), this._gl.viewport(0, 0, this._canvas.width, this._canvas.height), this._sSAOEnable) {
				this.linearDepth = t.far - t.near, this.ssaoing = !0, this._renderDeferredTarget(t, this.deferredPostionMaterial, this.deferredPostionTarget), this._renderDeferredTarget(t, this.deferredNormalMaterial, this.deferredNormalTarget), this._setSSAOMaterial(), this._overloadMaterial = null, this._renderSurface(t, this.ssaoTarget, this.ssaoMaterial);
				var s = this._canvas.width / this._canvas.height;
				this._ssaoBlur ? (this._renderBlurTarget(t, this._blurMaterialH, this.ssaoTarget, this.ssaoTarget1, s), this._renderBlurTarget(t, this._blurMaterialV, this.ssaoTarget1, this.ssaoTarget2, s), this.finalSSAOTarget = this.ssaoTarget2) : this.finalSSAOTarget = this.ssaoTarget, this.setRenderTarget(e), this.ssaoing = !1
			}
			if (this.renderOutline = !1, this.renderOutlineGlow = !1, _i.enableStencil(this._gl), this._baseRender = !0, _i.r(this, t, this.dataBox, this.glNodeList, this.dataBox.getBillboards()), this._baseRender = !1, _i.stencilTest(this._gl), this.renderOutline && _i.r(this, t, this.dataBox, this.glNodeList, this.dataBox.getBillboards(), !1, "stencil"), this.renderOutlineGlow) {
				var o = this._glowSurface.target,
					l = this._glowSurface.target1,
					h = this._glowSurface.target2;
				_i.disableStencil(this._gl), this.setRenderTarget(o), o._id = o._id || (new Date).getTime() + "0", l._id = l._id || (new Date).getTime() + "1", h._id = h._id || (new Date).getTime() + "2", this._gl.viewport(0, 0, o.width, o.height), this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._gl.colorMask(!1, !1, !1, !1), _i.r(this, t, this.dataBox, this.glNodeList, this.dataBox.getBillboards(), !1, "glow.unselect"), this._gl.colorMask(!0, !0, !0, !0), _i.r(this, t, this.dataBox, this.glNodeList, this.dataBox.getBillboards(), !1, "glow.select");
				var c, u;
				this.setRenderTarget(l), this._gl.viewport(0, 0, l.width, l.height), this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._blurMaterialH.setMap(o);
				var s = this._canvas.width / this._canvas.height;
				this._blurMaterialH.texelSize = new Ke(o.width, o.height / s), this._blurMaterialH.blurAmount = this._blurAmount || 5, this._blurMaterialH.blurScale = this._blurScale || 1, this._blurMaterialH.blurStrength = this._blurStrength || 1, this._blurMaterialH.orientation = 1;
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._blurMaterialH, u, this._glowSurface2);
				this.setRenderTarget(h), this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._blurMaterialV.setMap(l), this._blurMaterialV.texelSize = new Ke(l.width, l.height / s), this._blurMaterialV.blurAmount = this._blurAmount || 5, this._blurMaterialV.blurScale = this._blurScale || 1, this._blurMaterialV.blurStrength = this._blurStrength || 1, this._blurMaterialV.orientation = 0;
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._blurMaterialV, u, this._glowSurface2);
				this.setRenderTarget(e), this._glowSurface._modelViewMatrix = new ti, this._glowSurface._normalMatrix = new $e, this.setupMatrices(this._glowSurface, t), this._glowSurfaceMaterial.setMap(h), this._glowSurfaceMaterial.useBlur = 0, this._glowSurfaceMaterial.blurGlobalAlpha = this._blurGlobalAlpha || 1, _i.setBlending(this._glowSurfaceMaterial.blendMode, this._glowSurfaceMaterial.blendEquation, this._glowSurfaceMaterial.blendSrc, this._glowSurfaceMaterial.blendDst, this), this._gl.enable(this._gl.STENCIL_TEST);
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._glowSurfaceMaterial, u, this._glowSurface);
				this.setRenderTarget(l), this._gl.viewport(0, 0, l.width, l.height), this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._blurMaterialH.setMap(o);
				var s = this._canvas.width / this._canvas.height;
				this._blurMaterialH.texelSize = new Ke(o.width, o.height / s), this._blurMaterialH.blurAmount = this._blurAmount || 10, this._blurMaterialH.blurScale = this._blurScale || 1, this._blurMaterialH.blurStrength = this._blurStrength || 1, this._blurMaterialH.orientation = 0;
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._blurMaterialH, u, this._glowSurface2);
				this.setRenderTarget(h), this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._blurMaterialV.setMap(l), this._blurMaterialV.texelSize = new Ke(l.width, l.height / s), this._blurMaterialV.blurAmount = this._blurAmount || 10, this._blurMaterialV.blurScale = this._blurScale || 1, this._blurMaterialV.blurStrength = this._blurStrength || 1, this._blurMaterialV.orientation = 1;
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._blurMaterialV, u, this._glowSurface2);
				this.setRenderTarget(e), this._glowSurface._modelViewMatrix = new ti, this._glowSurface._normalMatrix = new $e, this.setupMatrices(this._glowSurface, t), this._glowSurfaceMaterial.setMap(h), this._glowSurfaceMaterial.useBlur = 0, this._glowSurfaceMaterial.blurGlobalAlpha = this._blurGlobalAlpha || 1, _i.setBlending(this._glowSurfaceMaterial.blendMode, this._glowSurfaceMaterial.blendEquation, this._glowSurfaceMaterial.blendSrc, this._glowSurfaceMaterial.blendDst, this), this._gl.enable(this._gl.STENCIL_TEST);
				for (c in this._glowSurface.groups) u = this._glowSurface.groups[c], this.renderGroup(t, [], this._glowSurfaceMaterial, u, this._glowSurface);
				this._gl.clearColor(0, 0, 0, 0)
			}
			_i.disableStencil(this._gl), this.renderHelper(t)
		},
		_renderDeferredTarget: function(t, e, i, r) {
			r = r || new Qe.Vec4(0, 0, 0, 0, 0), e.linearDepth = this.linearDepth, this.setRenderTarget(i), this._overloadMaterial = e, this._gl.clearColor(r.x, r.y, r.z, r.w), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), _i.r(this, t, this.dataBox, this.glNodeList, this.dataBox.getBillboards())
		},
		_renderBlurTarget: function(t, e, i, r, a) {
			clearColor = clearColor || new Qe.Vec4(0, 0, 0, 0, 0), this.setRenderTarget(r), this._gl.viewport(0, 0, r.width, r.height), this._gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), e.setMap(i), e.texelSize = new Ke(i.width, i.height / a), e.blurAmount = this._blurAmount || 5, e.blurScale = this._blurScale || 1, e.blurStrength = this._blurStrength || 1;
			var n, s;
			for (n in this._glowSurface.groups) s = this._glowSurface.groups[n], this.renderGroup(t, [], e, s, this._glowSurface2)
		},
		_setSSAOMaterial: function() {
			this.ssaoMaterial.map = this.deferredPostionTarget, this.ssaoMaterial.map1 = this.deferredNormalTarget, this.ssaoMaterial.attenuation = this._attenuation || new Ke(1, .02), this.ssaoMaterial.occluderBias = this._occluderBias || .5, this.ssaoMaterial.samplingRadius = this._samplingRadius || 20, this.ssaoMaterial.texelSize = new Ke(1 / this.deferredPostionTarget.width, 1 / this.deferredPostionTarget.height)
		},
		_renderSurface: function(t, e, i, r) {
			r = r || new Qe.Vec4(1, 1, 1, 1), this.setRenderTarget(e), this._gl.clearColor(r.x, r.y, r.z, r.w), this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT), this._glowSurface._modelViewMatrix = new ti, this._glowSurface._normalMatrix = new $e, this.setupMatrices(this._glowSurface, t);
			var a, n;
			for (n in this._glowSurface.groups) a = this._glowSurface.groups[n], this.renderGroup(t, [], i, a, this._glowSurface)
		},
		renderHelper: function(t) {
			_i.r(this, t, this.helperBox, this.helperGLNodeList, this.helperBox.getBillboards(), "stencil")
		},
		initSurfaceGroup: function() {
			this._glowSurface.setUpdateFlags(!0), oi(this._glowSurface);
			for (var t in this._glowSurface.groups) {
				var i = this._glowSurface.groups[t];
				i.id = i.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : i.id, this.groupMap[i.id] === e && (this.groupMap[i.id] = {});
				var r = this.groupMap[i.id];
				this.createGroupBuffer(i, r), this.initGroupBuffer(this._glowSurface, i, r), si.buildGroupBufferData(i, this._glowSurface, this._gl.DYNAMIC_DRAW, !1, this._glowSurfaceMaterial, this._gl, r, this)
			}
			this._glowSurface2.setUpdateFlags(!0), oi(this._glowSurface2);
			for (var t in this._glowSurface2.groups) {
				var i = this._glowSurface2.groups[t];
				i.id = i.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : i.id, this.groupMap[i.id] === e && (this.groupMap[i.id] = {});
				var r = this.groupMap[i.id];
				this.createGroupBuffer(i, r), this.initGroupBuffer(this._glowSurface2, i, r), si.buildGroupBufferData(i, this._glowSurface2, this._gl.DYNAMIC_DRAW, !1, this._glowSurfaceMaterial, this._gl, r, this)
			}
		},
		getOutlineMaterial: function(t, e) {
			var i = (e.getStyle("select.width") || 1) + 1 + " " + new Qe.Color(e.getStyle("select.color")).getUniqueCode() + t,
				r = this.outlineMaterialMap[i];
			return null == r && (r = new Qe.EntityMaterial, "outline.normal" == t ? (r._type = "outline", r.outline = e.getStyle("select.width") || 1) : "outline.glow" == t ? r._type = "basic" : (r.wireframe = !0, r.wireframeLinewidth = (e.getStyle("select.width") || 1) + 1), r.color = new Qe.Color(e.getStyle("select.color")), this.outlineMaterialMap[i] = r), r
		},
		renderNodes: function(t, e, i, r, a, n, s, o, l) {
			var h, c, u, f, p, d, m;
			e ? (p = t.length - 1, d = -1, m = -1) : (p = 0, d = t.length, m = 1);
			for (var g = p; g !== d; g += m)
				if (h = t[g], f = h.node ? h[i] : h.material) {
					if (n ? (_i.setBlending(f.blendMode, f.blendEquation, f.blendSrc, f.blendDst, this), _i.setDepthWrite(!1, this)) : _i.setDepthWrite(f.depthMask, this), h instanceof Qe.Billboard) {
						var y = h.material.transparent ? "transparent" : "opaque";
						i == y && this.billboardRenderer.render(this, [h], r, 2 * this._canvas.width, 2 * this._canvas.height)
					} else if (h.render) {
						if (this.billboardRenderer && this.billboardRenderer.disable(), c = h.node, u = h.group, _i.setDepthTest(f.depthTest, this), _i.setPolygonOffset(f.polygonOffset, f.polygonOffsetFactor, f.polygonOffsetUnits, this), this.setGLFaces(f), c instanceof Qe.Particle) {
							if (c.verticesNeedUpdate || c.colorsNeedUpdate || c.sortParticles) {
								var v = this.particleMap[c._id];
								li(c, this._gl.DYNAMIC_DRAW, this._gl, v)
							}
							c.verticesNeedUpdate = !1, c.colorsNeedUpdate = !1
						}
						var x = c.getSelectStyle();
						if ("outline" == x && (x = "outline.normal"), o ? "glow.unselect" === o && (c.isSelected() || (c instanceof Qe.BufferNode ? this.renderBufferNode(r, a, f, u, c) : _i.g(this, r, a, f, u, c))) : (!c.isSelected() || "outline.normal" !== x && "outline.wireframe" !== x && "outline.glow" !== x ? this._gl.disable(this._gl.STENCIL_TEST) : (this._gl.enable(this._gl.STENCIL_TEST), "outline.glow" === x ? this.renderOutlineGlow = !0 : this.renderOutline = !0), c instanceof Qe.BufferNode ? this.renderBufferNode(r, a, f, u, c) : _i.g(this, r, a, f, u, c)), c.isSelected() && this.renderSelect(c))
							if ("outline.normal" === x || "outline.wireframe" === x || "outline.glow" === x) {
								if (null != o && "glow.unselect" != o)
									if ("outline.normal" === x) {
										if (c.renderSelected === !1) {
											var A = this.getOutlineMaterial(x, c),
												w = this.normalNodeMap[c.getId()];
											if (null == w) {
												var w = this.cloneNode(c, A);
												this.normalNodeMap[c.getId()] = w
											}
											this.setupMatrices(w, r);
											for (var _ in w.groups) _i.g(this, r, a, A, w.groups[_], w);
											c.renderSelected = !0
										}
									} else if ("outline.normal" !== x) {
									var A = this.getOutlineMaterial(x, c);
									_i.g(this, r, a, A, u, c)
								}
							} else c.renderSelected === !1 && (this.renderNodeSelection(r, a, c), c.renderSelected = !0);
						c.getAlarmState().getPropagateSeverity() && this.renderAlarmBorder(c) && this.renderNodeAlarm(r, a, c)
					}
					c && c.setUpdateFlags(!1)
				}
		},
		cloneNode: function(t, e) {
			var i, r, a = new Qe.Entity,
				n = {
					vertices: [],
					uvs: [],
					faces: []
				};
			for (i = 0, r = t.vertices.length; r > i; i++) n.vertices.push(t.vertices[i].clone());
			for (i = 0, r = t.faces.length; r > i; i++) n.faces.push(t.faces[i].clone());
			for (i = 0, r = t.uvs.lenght; r > i; i++) {
				for (var s = uvs[i], o = [], l = 0; s > l; l++) o.push(s[l].clone());
				n.uvs.push(o)
			}
			return Qe.Node.prototype.mergeVertices.call(n), Qe.Node.prototype.computeFaceNormals.call(n), Qe.Node.prototype.computeVertexNormals.call(n, !0), a.setPosition(t.getPosition()), a.setScale(t.getScale()), a.setRotation(t.getRotation()), a.setParent(t.getParent()), a._modelViewMatrix = new ti, a._normalMatrix = new $e, a.data = n, a.vertices = n.vertices, a.uvs = n.uvs, a.faces = n.faces, a.material = e, a.primitive = new Qe.Primitive(n), a.setUpdateFlags(!0), oi(a), this.buildNodeBufferData(a), a
		},
		buildNodeBufferData: function(t) {
			for (var i in t.groups) {
				var r = t.groups[i];
				r.id = r.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : r.id, this.groupMap[r.id] === e && (this.groupMap[r.id] = {});
				var a = this.groupMap[r.id];
				this.createGroupBuffer(r, a), this.initGroupBuffer(t, r, a), si.buildGroupBufferData(r, t, this._gl.DYNAMIC_DRAW, !1, t.material, this._gl, a, this)
			}
		},
		needSmoothNormal: function(t, i) {
			var r = i.normalType;
			return r != e ? r === Qe.NormalTypeSmooth : this.needSmoothNormalFunction ? this.needSmoothNormalFunction(t) : !1
		},
		renderNodeSelection: function(t, i, r) {
			r.createSelectionCube(this.selectionCube), this.setupMatrices(this.selectionCube, t);
			var a = this.selectionCube.groups;
			this.selectionCube.material.needsUpdate = !0;
			for (var n in a) {
				var s = a[n];
				s.id = s.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : s.id, this.groupMap[s.id] === e && (this.groupMap[s.id] = {});
				var o = this.groupMap[s.id];
				o.__webglVertexBuffer || (this.createGroupBuffer(s, o), this.initGroupBuffer(r, s, o)), this.selectionCube.setUpdateFlags(!0), si.buildGroupBufferData(s, this.selectionCube, this._gl.DYNAMIC_DRAW, !1, this.selectionCube.material, this._gl, o, this), this.renderGroup(t, [], this.selectionCube.material, s, this.selectionCube)
			}
		},
		renderNodeAlarm: function(t, i, r) {
			r.createPropagateAlarmCube(this.alarmCube), this.setupMatrices(this.alarmCube, t);
			var a = this.alarmCube.groups;
			this.alarmCube.material.needsUpdate = !0;
			for (var n in a) {
				var s = a[n];
				s.id = s.id === e ? Qe.Gl3dview3D.GroupCache._groupCounter++ : s.id, this.groupMap[s.id] === e && (this.groupMap[s.id] = {});
				var o = this.groupMap[s.id];
				o.__webglVertexBuffer || (this.createGroupBuffer(s, o), this.initGroupBuffer(r, s, o)), this.alarmCube.setUpdateFlags(!0), si.buildGroupBufferData(s, this.alarmCube, this._gl.DYNAMIC_DRAW, !1, this.alarmCube.material, this._gl, o, this), this.renderGroup(t, [], this.alarmCube.material, s, this.alarmCube)
			}
		},
		renderBufferNode: function(t, e, i, r, a, n) {
			if (i.visible !== !1) {
				var s, o;
				s = this.pm.setProgram(t, e, this._fog, i, r, a), o = s.attributes;
				var l = a,
					h = !1,
					c = i.wireframe ? 1 : 0,
					u = 16777215 * r._id + 2 * s.id + c;
				(u !== this._currentGroupHash || n) && (this._currentGroupHash = u, h = !0), h && this.disableAttributes();
				var f = this._gl,
					p = l.attributes.index,
					d = this.bufferNodeMap[a._id];
				if (p) {
					var m = l.offsets;
					m.length > 1 && (h = !0);
					for (var g = 0, y = m.length; y > g; g++) {
						var v = m[g].index;
						if (h) {
							var x = l.attributes.position,
								A = x.itemSize;
							f.bindBuffer(f.ARRAY_BUFFER, d.position), this.enableAttribute(o.position), f.vertexAttribPointer(o.position, A, f.FLOAT, !1, 0, v * A * 4);
							var w = l.attributes.normal;
							if (o.normal >= 0 && w) {
								var _ = w.itemSize;
								f.bindBuffer(f.ARRAY_BUFFER, d.normal), this.enableAttribute(o.normal), f.vertexAttribPointer(o.normal, _, f.FLOAT, !1, 0, v * _ * 4)
							}
							var S = l.attributes.uv;
							if (o.uv >= 0 && S) {
								var b = S.itemSize;
								f.bindBuffer(f.ARRAY_BUFFER, d.uv), this.enableAttribute(o.uv), f.vertexAttribPointer(o.uv, b, f.FLOAT, !1, 0, v * b * 4)
							}
							var M = l.attributes.color;
							if (o.color >= 0 && M) {
								var C = M.itemSize;
								f.bindBuffer(f.ARRAY_BUFFER, d.color), this.enableAttribute(o.color), f.vertexAttribPointer(o.color, C, f.FLOAT, !1, 0, v * C * 4)
							}
							f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, d.index)
						}
						f.drawElements(f.TRIANGLES, m[g].count, f.UNSIGNED_SHORT, 2 * m[g].start), this.info.render.calls++, this.info.render.vertices += m[g].count, this.info.render.faces += m[g].count / 3
					}
				} else {
					if (h) {
						var x = l.attributes.position,
							A = x.itemSize;
						f.bindBuffer(f.ARRAY_BUFFER, x.buffer), this.enableAttribute(o.position), f.vertexAttribPointer(o.position, A, f.FLOAT, !1, 0, 0);
						var w = l.attributes.normal;
						if (o.normal >= 0 && w) {
							var _ = w.itemSize;
							f.bindBuffer(f.ARRAY_BUFFER, w.buffer), this.enableAttribute(o.normal), f.vertexAttribPointer(o.normal, _, f.FLOAT, !1, 0, 0)
						}
						var S = l.attributes.uv;
						if (o.uv >= 0 && S) {
							var b = S.itemSize;
							f.bindBuffer(f.ARRAY_BUFFER, S.buffer), this.enableAttribute(o.uv), f.vertexAttribPointer(o.uv, b, f.FLOAT, !1, 0, 0)
						}
						var M = l.attributes.color;
						if (o.color >= 0 && M) {
							var C = M.itemSize;
							f.bindBuffer(f.ARRAY_BUFFER, M.buffer), this.enableAttribute(o.color), f.vertexAttribPointer(o.color, C, f.FLOAT, !1, 0, 0)
						}
					}
					var x = l.attributes.position;
					f.drawArrays(f.TRIANGLES, 0, x.numItems / 3), this.info.render.calls++, this.info.render.vertices += x.numItems / 3, this.info.render.faces += x.numItems / 3 / 3
				}
			}
		},
		getOverLoadMaterial: function(t, e) {
			return null
		},
		renderGroup: function(t, e, i, r, a) {
			if (null == i && console.log("material is null"), i.visible !== !1) {
				this._overloadMaterial && (i = this._overloadMaterial);
				var n, s = this._gl;
				a instanceof Qe.Entity ? n = this.groupMap[r.id] : a instanceof Qe.Line ? n = this.lineMap[r._id] : a instanceof Qe.Particle && (n = this.particleMap[r._id]);
				var o, l, h, c, u, f;
				o = this.pm.setProgram(t, e, this._fog, i, r, a), l = o.attributes;
				var p, d = !1,
					m = i.wireframe ? 1 : 0;
				if (p = null != r.id ? 16777215 * r.id + 2 * o.id + m : r._id + "" + (2 * o.id + m), p !== this._currentGroupHash && (this._currentGroupHash = p, d = !0), d && this.disableAttributes(), l.position >= 0 && d && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglVertexBuffer), this.enableAttribute(l.position), s.vertexAttribPointer(l.position, 3, s.FLOAT, !1, 0, 0)), d) {
					if (r.__webglCustomAttributesList)
						for (u = 0, f = r.__webglCustomAttributesList.length; f > u; u++) c = r.__webglCustomAttributesList[u], l[c.buffer.belongsToAttribute] >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, c.buffer), this.enableAttribute(l[c.buffer.belongsToAttribute]), s.vertexAttribPointer(l[c.buffer.belongsToAttribute], c.size, s.FLOAT, !1, 0, 0));
					l.color >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglColorBuffer), this.enableAttribute(l.color), s.vertexAttribPointer(l.color, 3, s.FLOAT, !1, 0, 0)), l.normal >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglNormalBuffer), this.enableAttribute(l.normal), s.vertexAttribPointer(l.normal, 3, s.FLOAT, !1, 0, 0)), l.uv >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglUVBuffer), this.enableAttribute(l.uv), s.vertexAttribPointer(l.uv, 2, s.FLOAT, !1, 0, 0)), l.uv2 >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglUV2Buffer), this.enableAttribute(l.uv2), s.vertexAttribPointer(l.uv2, 2, s.FLOAT, !1, 0, 0)), l.lineDistance >= 0 && (s.bindBuffer(s.ARRAY_BUFFER, n.__webglLineDistanceBuffer), this.enableAttribute(l.lineDistance), s.vertexAttribPointer(l.lineDistance, 1, s.FLOAT, !1, 0, 0))
				}
				a instanceof Qe.Entity ? (i.wireframe ? (this.setLineWidth(i.wireframeLinewidth), this._gl.lineJoin = "round", d && s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, n.__webglLineBuffer), s.drawElements(s.LINES, n.__webglLineCount, s.UNSIGNED_SHORT, 0)) : (d && s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, n.__webglFaceBuffer), s.drawElements(s.TRIANGLES, n.__webglFaceCount, s.UNSIGNED_SHORT, 0)), this.info.render.calls++, this.info.render.vertices += r.__webglFaceCount, this.info.render.faces += r.__webglFaceCount / 3) : a instanceof Qe.Line ? (h = a.type === Qe.LineStrip ? s.LINE_STRIP : s.LINES, this.setLineWidth(i.linewidth), s.drawArrays(h, 0, n.__webglLineCount), this.info.render.calls++) : a instanceof Qe.Particle ? (s.drawArrays(s.POINTS, 0, n.__webglParticleCount), this.info.render.calls++, this.info.render.points += n.__webglParticleCount) : a instanceof Qe.Ribbon && (s.drawArrays(s.TRIANGLE_STRIP, 0, r.__webglVertexCount), this.info.render.calls++)
			}
		},
		prepareData: function() {
			this.maxLightCount = this.dataBox.allocateLights(this._maxLights), this.maxShadows = this.dataBox.allocateShadows(), this.maxPointShadows = this.dataBox.allocatePointShadows()
		},
		wrapBillboardMaterial: function(t) {
			t instanceof Qe.Billboard && t.material && (t.opaque = t.material.transparent ? null : t.material, t.transparent = t.material.transparent ? t.material : null)
		},
		sortNodesFunc: function(t) {
			if (this.sortNodes && (null !== this.paintSortFunction || this.sortOpaqueOrderByMaterial)) {
				var e = this;
				this.sortOpaqueOrderByMaterial ? null == this.__st && (this.__st = function(t, i) {
					e.wrapBillboardMaterial(t), e.wrapBillboardMaterial(t);
					var r = "opaque";
					if (t[r] && i[r]) return t[r].id - i[r].id;
					if (!t[r] && i[r]) return -1;
					if (t[r] && !i[r]) return 1;
					var a = t.node ? t.node : t,
						n = i.node ? i.node : i;
					return a.z = t.z, n.z = i.z, e.paintSortFunction ? e.paintSortFunction(a, n) : void 0
				}) : null == this.__st && (this.__st = function(t, i) {
					var r = t.node ? t.node : t,
						a = i.node ? i.node : i;
					return r.z = t.z, a.z = i.z, e.paintSortFunction ? e.paintSortFunction(r, a) : void 0
				}), t.sort(this.__st)
			}
			return t
		},
		renderNode: function(t, e) {
			this.setupMatrices(t), t instanceof Qe.Entity && renderEntity(t)
		},
		paintTopCanvas: function() {
			var t = this._topCanvas.getContext("2d");
			t.clearRect(0, 0, this._topCanvas.width, this._topCanvas.height);
			var e = this.areaPickingRect;
			e && (t.beginPath(), t.lineStyle = "#FFffff", t.rect(e.x, e.y, e.w, e.h), t.stroke()), this.renderLicense()
		},
		setBackgroundImage: function(t) {
			if ("string" == typeof t) {
				var e = new Image;
				t.startsWith("data:image") || (e.crossOrigin = "use-credentials"), e.src = t, this._backgroundImage = e;
				var i = this;
				e.onload = function() {
					i.dirtyGl3dview()
				}
			} else this._backgroundImage = t, this.dirtyGl3dview()
		},
		paintBottom: function(t) {
			var e = t.getContext("2d");
			e.clearRect(0, 0, t.width, t.height);
			var i = this._backgroundImage;
			i instanceof Image && e.drawImage(i, 0, 0, t.width, t.height)
		},
		initBufferNode: function(t) {
			if (!this.bufferNodeMap[t._id]) {
				var e = {};
				this.bufferNodeMap[t._id] = e;
				var i, r, a, n = this._gl;
				for (i in t.attributes) a = "index" === i ? n.ELEMENT_ARRAY_BUFFER : n.ARRAY_BUFFER, r = t.attributes[i], e[i] = n.createBuffer(), n.bindBuffer(a, e[i]), n.bufferData(a, r.array, n.STATIC_DRAW)
			}
		},
		setBufferNodeData: function(t, i, r) {
			var a = this.bufferNodeMap[t._id],
				n = t.attributes,
				s = n.index,
				o = n.position,
				l = n.normal,
				h = n.uv,
				c = n.color,
				u = n.tangent,
				f = this._gl;
			if (t.elementsNeedUpdate && s !== e && (f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, a.index), f.bufferData(f.ELEMENT_ARRAY_BUFFER, s.array, i)), t.verticesNeedUpdate && o !== e && (f.bindBuffer(f.ARRAY_BUFFER, a.position), f.bufferData(f.ARRAY_BUFFER, o.array, i)), t.normalsNeedUpdate && l !== e && (f.bindBuffer(f.ARRAY_BUFFER, a.normal), f.bufferData(f.ARRAY_BUFFER, l.array, i)), t.uvsNeedUpdate && h !== e && (f.bindBuffer(f.ARRAY_BUFFER, a.uv), f.bufferData(f.ARRAY_BUFFER, h.array, i)), t.colorsNeedUpdate && c !== e && (f.bindBuffer(f.ARRAY_BUFFER, a.color), f.bufferData(f.ARRAY_BUFFER, c.array, i)), t.tangentsNeedUpdate && u !== e && (f.bindBuffer(f.ARRAY_BUFFER, a.tangent), f.bufferData(f.ARRAY_BUFFER, u.array, i)), r)
				for (var p in t.attributes);
		},
		initGroupBuffer: function(t, i, r, a) {
			var n = i.faces3,
				s = i.faces4,
				o = 3 * n.length + 4 * s.length,
				l = 1 * n.length + 2 * s.length,
				h = 3 * n.length + 4 * s.length,
				c = si.getMaterial(t, i.materialIndex ? i.materialIndex : 0),
				u = c.needUV(),
				f = c.getNormalType(),
				p = c.isVertexColor();
			if (r.__vertexArray = new Float32Array(3 * o), f && (r.__normalArray = new Float32Array(3 * o)), !a) {
				p && (r.__colorArray = new Float32Array(3 * o)), u && (r.__uvArray = new Float32Array(2 * o), t.uv2s && (r.__uv2Array = new Float32Array(2 * o))), r.__faceArray = new Uint16Array(3 * l), r.__lineArray = new Uint16Array(2 * h);
				var d, m;
				if (i.numMorphTargets)
					for (r.__morphTargetsArrays = [], d = 0, m = i.numMorphTargets; m > d; d++) r.__morphTargetsArrays.push(new Float32Array(3 * o));
				if (i.numMorphNormals)
					for (r.__morphNormalsArrays = [], d = 0, m = i.numMorphNormals; m > d; d++) r.__morphNormalsArrays.push(new Float32Array(3 * o));
				if (r.__webglFaceCount = 3 * l, r.__webglLineCount = 2 * h, c.attributes) {
					r.__webglCustomAttributesList === e && (r.__webglCustomAttributesList = []);
					for (var g in c.attributes) {
						var y = c.attributes[g],
							v = {};
						for (var x in y) v[x] = y[x];
						if (!v.__webglInitialized || v.createUniqueBuffers) {
							v.__webglInitialized = !0;
							var A = 1;
							"v2" === v.type ? A = 2 : "v3" === v.type ? A = 3 : "v4" === v.type ? A = 4 : "c" === v.type && (A = 3), v.size = A, v.array = new Float32Array(o * A), v.buffer = _gl.createBuffer(), v.buffer.belongsToAttribute = g, y.needsUpdate = !0, v.__original = y
						}
						r.__webglCustomAttributesList.push(v)
					}
				}
				r.__inittedArrays = !0
			}
		},
		createLineBuffers: function(t) {
			null == this.lineMap[t._id] && (this.lineMap[t._id] = {});
			var e = this.lineMap[t._id],
				i = this._gl;
			e.__webglVertexBuffer = i.createBuffer(), e.__webglColorBuffer = i.createBuffer(), e.__webglLineDistanceBuffer = i.createBuffer(), this.info.memory.geometries++
		},
		initLineBuffers: function(t) {
			null == this.lineMap[t._id] && (this.lineMap[t._id] = {});
			var e = this.lineMap[t._id],
				i = t.vertices.length;
			e.__vertexArray = new Float32Array(3 * i), e.__colorArray = new Float32Array(3 * i), e.__lineDistanceArray = new Float32Array(1 * i), e.__webglLineCount = i
		},
		createParticleBuffers: function(t) {
			null == this.particleMap[t._id] && (this.particleMap[t._id] = {});
			var e = this.particleMap[t._id],
				i = this._gl;
			e.__webglVertexBuffer = i.createBuffer(), e.__webglColorBuffer = i.createBuffer(), this.info.memory.geometries++
		},
		initParticleBuffers: function(t) {
			null == this.particleMap[t._id] && (this.particleMap[t._id] = {});
			var e = this.particleMap[t._id],
				i = t.vertices.length;
			e.__vertexArray = new Float32Array(3 * i), e.__colorArray = new Float32Array(3 * i), e.__sortArray = [], e.__webglParticleCount = i
		},
		createGroupBuffer: function(t, e) {
			var i = this._gl;
			e.__webglVertexBuffer = i.createBuffer(), e.__webglNormalBuffer = i.createBuffer(), e.__webglTangentBuffer = i.createBuffer(), e.__webglColorBuffer = i.createBuffer(), e.__webglUVBuffer = i.createBuffer(), e.__webglUV2Buffer = i.createBuffer(), e.__webglSkinIndicesBuffer = i.createBuffer(), e.__webglSkinWeightsBuffer = i.createBuffer(), e.__webglFaceBuffer = i.createBuffer(), e.__webglLineBuffer = i.createBuffer(), this.info.memory.geometries++
		},
		setRenderTarget: function(t) {
			var i = t instanceof bi,
				r = this._gl;
			if (t && !t.__webglFramebuffer) {
				t.depthBuffer === e && (t.depthBuffer = !0), t.stencilBuffer === e && (t.stencilBuffer = !0), t.__webglTexture = r.createTexture(), this.info.memory.textures++;
				var a = xi.isPowerOfTwo,
					n = a(t.width) && a(t.height),
					s = xi.paramToGL(t.format, r),
					o = xi.paramToGL(t.type, r);
				t.type == Qe.FloatType;
				var l = s;
				if (i) {
					t.__webglFramebuffer = [], t.__webglRenderbuffer = [], r.bindTexture(r.TEXTURE_CUBE_MAP, t.__webglTexture), this.pm.setTextureParameters(r.TEXTURE_CUBE_MAP, t, n);
					for (var h = 0; 6 > h; h++) t.__webglFramebuffer[h] = r.createFramebuffer(), t.__webglRenderbuffer[h] = r.createRenderbuffer(), r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, l, t.width, t.height, 0, s, o, null), this.setupFrameBuffer(t.__webglFramebuffer[h], t, r.TEXTURE_CUBE_MAP_POSITIVE_X + h), this.setupRenderBuffer(t.__webglRenderbuffer[h], t);
					n && r.generateMipmap(r.TEXTURE_CUBE_MAP)
				} else t.__webglFramebuffer = r.createFramebuffer(), t.shareDepthFrom ? t.__webglRenderbuffer = t.shareDepthFrom.__webglRenderbuffer : t.__webglRenderbuffer = r.createRenderbuffer(), r.bindTexture(r.TEXTURE_2D, t.__webglTexture), this.pm.setTextureParameters(r.TEXTURE_2D, t, n), r.texImage2D(r.TEXTURE_2D, 0, l, t.width, t.height, 0, s, o, null), this.setupFrameBuffer(t.__webglFramebuffer, t, r.TEXTURE_2D), t.shareDepthFrom ? t.depthBuffer && !t.stencilBuffer ? r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, t.__webglRenderbuffer) : t.depthBuffer && t.stencilBuffer && r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, t.__webglRenderbuffer) : this.setupRenderBuffer(t.__webglRenderbuffer, t), n && r.generateMipmap(r.TEXTURE_2D);
				i ? r.bindTexture(r.TEXTURE_CUBE_MAP, null) : r.bindTexture(r.TEXTURE_2D, null), r.bindRenderbuffer(r.RENDERBUFFER, null), r.bindFramebuffer(r.FRAMEBUFFER, null)
			}
			var c, u, f, p, d;
			t ? (c = i ? t.__webglFramebuffer[t.activeCubeFace] : t.__webglFramebuffer, u = t.width, f = t.height, p = 0, d = 0) : (c = null, u = this._viewportWidth, f = this._viewportHeight, p = this._viewportX, d = this._viewportY), c !== this._currentFramebuffer && (r.bindFramebuffer(r.FRAMEBUFFER, c), r.viewport(p, d, u, f), this._currentFramebuffer = c), this._currentWidth = u, this._currentHeight = f
		},
		setupFrameBuffer: function(t, e, i) {
			var r = this._gl;
			r.bindFramebuffer(r.FRAMEBUFFER, t), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, i, e.__webglTexture, 0)
		},
		setupRenderBuffer: function(t, e) {
			var i = this._gl;
			i.bindRenderbuffer(i.RENDERBUFFER, t), e.depthBuffer && !e.stencilBuffer ? (i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT16, e.width, e.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, t)) : e.depthBuffer && e.stencilBuffer ? (i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, e.width, e.height),
				i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, t)) : i.renderbufferStorage(i.RENDERBUFFER, i.RGBA4, e.width, e.height)
		},
		setLineWidth: function(t) {
			t !== this._oldLineWidth && (this._gl.lineWidth && this._gl.lineWidth(t), this._oldLineWidth = t)
		},
		setupMatrices: function(t, e) {
			t.fixSize(e), t.updateWorldMatrix(), t._modelViewMatrix.multiplyMatrices(e.worldMatrixInverse, t.worldMatrix), t._normalMatrix.getNormalMatrix(t._modelViewMatrix)
		},
		setDefaultGLState: function() {
			var t = this._gl,
				e = new Qe.Color(this._clearColor);
			t.clearColor(e.r, e.g, e.b, this._clearAlpha), t.clearDepth(1), ii.isIE || t.clearStencil(0), t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.frontFace(t.CCW), t.cullFace(t.BACK), t.enable(t.CULL_FACE), t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA)
		},
		clear: function(t, i, r) {
			var a = this._gl,
				n = 0;
			(t === e || t) && (n |= a.COLOR_BUFFER_BIT), (i === e || i) && (n |= a.DEPTH_BUFFER_BIT), (r === e || r) && (n |= a.STENCIL_BUFFER_BIT), a.clear(n)
		},
		setGLFaces: function(t) {
			var e = this._gl,
				i = t.side === Qe.DoubleSide,
				r = t.side === Qe.BackSide;
			this._oldDoubleSided !== i && (i ? e.disable(e.CULL_FACE) : e.enable(e.CULL_FACE), this._oldDoubleSided = i), this._oldFlipSided !== r && (r ? e.frontFace(e.CW) : e.frontFace(e.CCW), this._oldFlipSided = r)
		},
		getView: function() {
			return this._canvas
		},
		getRootView: function() {
			return this._rootView
		},
		setBlending: function(t, e, i, r) {
			_i.setBlending(t, e, i, r, this)
		},
		setDepthTest: function(t) {
			_i.setDepthTest(t, this)
		},
		setDepthWrite: function(t) {
			_i.setDepthWrite(t, this)
		},
		setTexture: function(t, e) {
			this.pm.setTexture(t, e)
		},
		disableAttributes: function() {
			for (var t in this._enabledAttributes) this._enabledAttributes[t] && (this._gl.disableVertexAttribArray(t), this._enabledAttributes[t] = !1)
		},
		enableAttribute: function(t) {
			this._enabledAttributes[t] || (this._gl.enableVertexAttribArray(t), this._enabledAttributes[t] = !0)
		},
		adjustRootViewBounds: function(t, e) {
			var i = this._rootView;
			i.style.width = t + "px", i.style.height = e + "px"
		},
		adjustCanvasBounds: function(t, e, i, r, a) {
			t.width = e * this.devicePixelRatio, t.height = i * this.devicePixelRatio, t.style.margin = "0px", t.style.padding = "0px", t.style.width = e + "px", t.style.height = i + "px"
		},
		adjustBounds: function(t, e, i, r) {
			var a = this.getView();
			if (this.adjustRootViewBounds(t, e, i, r), this.adjustCanvasBounds(a, t, e, i, r), this.adjustCanvasBounds(this._topCanvas, t, e, i, r), this.adjustCanvasBounds(this._bottomCanvas, t, e, i, r), this.adjustCallback(t, e, i, r), this.setViewport(0, 0, a.width, a.height), this.autoUpdateGleyeAspect && 0 !== e) {
				var n = this._gleye;
				n.aspect = t / e, n.updateProjectionMatrix(), this._currentGleye = null
			}
			this.dirtyGl3dview()
		},
		adjustCallback: function() {},
		setViewport: function(t, i, r, a) {
			this._viewportX = t !== e ? t : 0, this._viewportY = i !== e ? i : 0, this._viewportWidth = r !== e ? r : _canvas.width, this._viewportHeight = a !== e ? a : _canvas.height, this._gl.viewport(this._viewportX, this._viewportY, this._viewportWidth, this._viewportHeight)
		},
		setShowAxis: function(t) {
			this.showAxis !== t && (this.showAxis = t, this.showAxis && (this.helperBox.contains(this.axis) || this.helperBox.addByDescendant(this.axis)), this.axis._visible = t, this.dirtyGl3dview())
		},
		setShowAxisText: function(t) {
			this.axis.showAxisText(t), this.dirtyGl3dview()
		},
		setAxisSize: function(t) {
			this.axis.setSize(t)
		},
		onSelect: function(t) {
			null != this.onSelectFunction && this.onSelectFunction(t)
		},
		setOnSelectFunction: function(t) {
			this.onSelectFunction = t
		},
		isSelectable: function(t) {
			return t.isSelectable() ? this.selectableFunction ? this.selectableFunction(t) : !0 : !1
		},
		setSelectableFunction: function(t) {
			this.selectableFunction = t
		},
		setRenderSelectFunction: function(t) {
			this.renderSelectFunction = t
		},
		renderSelect: function(t) {
			return this.renderSelectFunction ? this.renderSelectFunction(t) : !0
		},
		renderAlarmBorder: function(t) {
			return this.renderAlarmBorderFunction ? this.renderAlarmBorderFunction(t) : !0
		},
		selectable: function(t) {
			return t.element.isVisible() && this.isSelectable(t.element) && this.getServa().getSelectionContainer().isSelectable(t.element)
		},
		editable: function(t) {
			var e = this.selectable(t);
			return e && null != this.editableFunction ? this.editableFunction(t.element) : e
		},
		getFirstSelectElement: function(t) {
			if (null == t) return null;
			for (var e, i = 0; i < t.length;) {
				var r = t[i];
				if (this.selectable(r)) {
					e = r.element;
					break
				}
				i++
			}
			return e
		},
		getFirstEditElement: function(t) {
			if (null == t) return null;
			for (var e, i = 0; i < t.length;) {
				var r = t[i];
				if (this.editable(r)) {
					e = r.element;
					break
				}
				i++
			}
			return e
		},
		toImageData: function(t, e, i, r) {
			return this.dirtyGl3dview(), this.render(), t = t || "PNG", t.toUpperCase(), "PNG" === t ? ri.saveAsPNG(this.getView(), e, !1, i, r) : "JPEG" === t ? ri.saveAsJPEG(this.getView(), e, !1, i, r) : "BMP" === t ? ri.saveAsBMP(this.getView(), e, !1, i, r) : void console.log("Not surport type " + t)
		},
		getPickingByEvent: function(t) {
			var e = this._gleye,
				i = {},
				r = this.getView(),
				a = r.getBoundingClientRect(),
				n = t.clientX,
				s = t.clientY;
			t.touches && t.touches.length && (n = t.touches[0].pageX, s = t.touches[0].pageY);
			var o = (n - a.left) / a.width,
				l = (s - a.top) / a.height;
			i.x = 2 * o - 1, i.y = 2 * -l + 1;
			var h = new Qe.XiangliangThree(i.x, i.y, .5);
			this.projector.unprojectVector(h, e);
			var c = null;
			if (e instanceof Qe.PerspectiveGleye) c = new Qe.Picking(e._position, h.sub(e._position).normalize(), e.up, null, null, this);
			else {
				var u = h.clone().sub(e._position),
					f = e.getTarget().clone().sub(e.p()).normalize(),
					p = f.multiplyScalar(u.clone().dot(f)),
					d = u.sub(p),
					m = (new Je).addVectors(e._position, d);
				c = new Qe.Picking(m, h.sub(m).normalize(), e.up, null, null, this)
			}
			return c
		},
		getElementsByMouseEvent: function(t, e) {
			var i = this.getPickingByEvent(t),
				r = new ci;
			r.addAll(this.dataBox.getNodes()), r.addAll(this.dataBox.getBillboards());
			var a = i.intersectObjects(r.toArray(), !1, e);
			return a
		},
		getElementByScreenPoint: function(t, e, i) {
			var r = {},
				a = this.getView(),
				n = this._gleye,
				s = a.getBoundingClientRect();
			t.x && (i = e, e = t.y, t = t.x), t /= s.width, e /= s.height, r.x = 2 * t - 1, r.y = 2 * -e + 1;
			var o = new Qe.XiangliangThree(r.x, r.y, .5);
			this.projector.unprojectVector(o, n);
			var l = new Qe.Picking(n._position, o.sub(n._position).normalize(), n.up, null, null, this),
				h = new ci;
			h.addAll(this.dataBox.getNodes()), h.addAll(this.dataBox.getBillboards());
			var c = l.intersectObjects(h.toArray(), !1, i);
			return c
		},
		getFirstElementByMouseEvent: function(t, e, i) {
			var r = this.getElementsByMouseEvent(t, e);
			if (r.length)
				for (var a = 0; a < r.length; a++) {
					var n = r[a],
						s = n.element;
					if (null == i || i.call(null, s)) return n
				}
			return null
		},
		getUnProjectVector: function(t) {
			var e = {},
				i = this.getView().getBoundingClientRect(),
				r = t.x / i.width,
				a = t.y / i.height;
			e.x = 2 * r - 1, e.y = 2 * -a + 1;
			var n = new Qe.XiangliangThree(e.x, e.y, .5);
			return this.projector.unprojectVector(n, this._gleye), n
		},
		getFrustumByBounding: function(t) {
			var e = t,
				i = this.getUnProjectVector(new Ke(e.x, e.y)),
				r = this.getUnProjectVector(new Ke(e.x + e.w, e.y)),
				a = this.getUnProjectVector(new Ke(e.x, e.y + e.h)),
				n = this.getUnProjectVector(new Ke(e.x + e.w, e.y + e.h)),
				s = this.getNearFarPoints(i),
				o = this.getNearFarPoints(r),
				l = this.getNearFarPoints(a),
				h = this.getNearFarPoints(n),
				c = new Qe.math.Plane,
				u = new Qe.math.Plane,
				f = new Qe.math.Plane,
				p = new Qe.math.Plane,
				d = new Qe.math.Plane,
				m = new Qe.math.Plane;
			c.setFromCoplanarPoints(s[0], o[0], l[0]), u.setFromCoplanarPoints(s[0], s[1], o[0]), f.setFromCoplanarPoints(s[0], l[0], s[1]), p.setFromCoplanarPoints(o[0], o[1], h[0]), d.setFromCoplanarPoints(l[0], h[0], l[1]), m.setFromCoplanarPoints(s[1], l[1], o[1]);
			var g = new Qe.Frustum(c, u, f, p, d, m);
			return g.setPoints([s[0], o[0], l[0], h[0], s[1], o[1], l[1], h[1]]), g
		},
		getNearFarPoints: function(t) {
			var e = this._gleye,
				i = t.sub(e._position).normalize(),
				r = e.target.clone().sub(e._position),
				a = i.angleTo(r),
				n = e.getNear() / Math.acos(a),
				s = e.getFar() / Math.acos(a),
				o = e._position.clone().add(i.clone().multiplyScalar(n)),
				l = e._position.clone().add(i.clone().multiplyScalar(s));
			return [o, l]
		},
		getSpacePointOnPlane: function(t, e) {
			var i = {},
				r = this.getView(),
				a = this._gleye,
				n = r.getBoundingClientRect(),
				s = t.clientX,
				o = t.clientY;
			t.touches && t.touches.length && (s = t.touches[0].pageX, o = t.touches[0].pageY);
			var l = (s - n.left) / n.width,
				h = (o - n.top) / n.height;
			i.x = 2 * l - 1, i.y = 2 * -h + 1;
			var c = new Qe.XiangliangThree(i.x, i.y, .5);
			this.projector.unprojectVector(c, a);
			var u = a._position,
				f = c.sub(a._position).normalize(),
				p = new Qe.Ray(u, f),
				d = p.distanceToPlane(e);
			if (0 > d || Math.abs(d) < Qe.Picking.prototype.precision) return null;
			var m = p.at(d);
			return m
		},
		getElementsByBounding: function(t, e, i) {
			var r = new ci;
			r.addAll(this.dataBox.getNodes()), r.addAll(this.dataBox.getBillboards());
			var a, n = this.getFrustumByBounding(t),
				s = [],
				o = new Je,
				l = this._gleye;
			return r.forEach(function(t) {
				if (t instanceof Qe.Billboard) {
					o.setFromMatrixPosition(t.worldMatrix);
					var e = t.material,
						r = e.alignment;
					a = new Qe.Plane(1, 1), (r.x || r.y) && (a.setPosition(r.x, r.y, 0), a = Qe.Utils.transformElement(a, !0)), a.setPosition(o);
					var h = (new Je).getScaleFromMatrix(t.worldMatrix);
					a.setScale(h.x, h.y, 1);
					var c = l.getTarget().clone(),
						u = l.getPosition();
					c.sub(u);
					var f = a.getPosition().clone();
					e && e.vertical && (c.y = 0), f.sub(c), a.lookAt(f), a.updateWorldMatrix(!0), n.intersectsObjectAccurate(a, i) && s.push({
						element: t
					})
				} else t instanceof Qe.Line ? n.intersectsObjectAccurate(t, i) && s.push({
					element: t
				}) : n.intersectsObjectAccurate(t, i) && s.push({
					element: t
				})
			}), s
		},
		getViewPosition: function(t) {
			var e = new Je;
			e = this.projector.projectVector(t, this._gleye, e), e.x = e.x / 2 + .5, e.y = -e.y / 2 + .5;
			var i = {
				x: this._canvas.width * e.x / this.devicePixelRatio,
				y: this._canvas.height * e.y / this.devicePixelRatio,
				h: this._canvas.height
			};
			return i
		},
		setInteractions: function(t) {
			var e, i, r = this._interactions;
			if (r)
				for (e = 0; e < r.length; e++) i = r[e], i.tearDown();
			if (this._interactions = t, t)
				for (e = 0; e < t.length; e++) i = t[e], i.setUp()
		},
		getDefaultInteraction: function() {
			if (this._interactions && this._interactions.length > 0)
				for (var t = 0; t < this._interactions.length; t++) {
					var e = this._interactions[t];
					if (e instanceof Qe.DefaultInteraction) return e
				}
			return null
		},
		getInteractions: function() {
			return this._interactions
		},
		fireInteractionEvent: function(t) {
			this._interactionDispatcher.fire(t)
		},
		addInteractionListener: function(t, e, i) {
			this._interactionDispatcher.add(t, e, i)
		},
		removeInteractionListener: function(t, e) {
			this._interactionDispatcher.remove(t, e)
		},
		dispose: function() {},
		setRenderInterval: function(t) {
			(xi.isNaN(t) || 5 >= t) && (t = 5), this._renderInterval = t
		},
		_computeGl3dviewBizBox: function() {
			function t(t, e) {
				t.applyMatrix4(e), o.push(t)
			}
			var e, i, r, a, n = this.getServa().size(),
				s = this.getServa().getDatas(),
				o = [];
			for (e = 0; n > e; e++)
				if (i = s.get(e), i instanceof Qe.Node) {
					r = i.getBizBox(), a = i.worldMatrix;
					var l = r.min,
						h = r.max;
					t(l.clone(), a), t(h.clone(), a), t(new Je(l.x, l.y, h.z), a), t(new Je(l.x, h.y, l.z), a), t(new Je(h.x, l.y, l.z), a), t(new Je(h.x, h.y, l.z), a), t(new Je(h.x, l.y, h.z), a), t(new Je(l.x, h.y, h.z), a)
				}
			var c = new Qe.BizBox;
			return c.setFromPoints(o), c
		},
		getGl3dviewBizBox: function() {
			return null == this.boundingBox && (this.boundingBox = this._computeGl3dviewBizBox()), this.boundingBox
		},
		zoomEstimateOverview: function() {
			var t = this.getGl3dviewBizBox(),
				e = t.center(),
				i = new Je(0, t.max.y - t.min.y, t.max.z - t.min.z),
				r = new Je(t.max.x - t.min.x, 0, 0, 0),
				a = i.clone();
			a.length() < r.length() && (a = r.clone());
			var n = (new Je).addVectors(e, i.multiplyScalar(.5)),
				s = this._gleye.fov,
				o = (this._gleye.aspect, a.length() / 2 / Math.tan(s * Math.PI / 180));
			n.add(i.normalize().multiplyScalar(o)), this._gleye.setPosition(n), this._gleye.lookAt(e)
		}
	}), Qe.Gl3dview3DId = 0, Qe.Gl3dview3D.GroupCache = {
		_groupCounter: 0
	};
	var Mi = function() {
		function t() {
			if (c === _) {
				var t = new $RenderObject;
				return w.push(t), _++, c++, t
			}
			return w[c++]
		}

		function i() {
			if (f === b) {
				var t = new $RenderVertex;
				return S.push(t), b++, f++, t
			}
			return S[f++]
		}

		function r() {
			if (d === C) {
				var t = new Qe.RenderFace3;
				return M.push(t), C++, d++, t
			}
			return M[d++]
		}

		function a() {
			if (m === T) {
				var t = new Qe.RenderFace4;
				return P.push(t), T++, m++, t
			}
			return P[m++]
		}

		function n() {
			if (y === L) {
				var t = new Qe.RenderLine;
				return z.push(t), L++, y++, t
			}
			return z[y++]
		}

		function s() {
			if (x === D) {
				var t = new Qe.RenderableParticle;
				return E.push(t), D++, x++, t
			}
			return E[x++]
		}

		function o(t, e) {
			return e.z - t.z
		}

		function l(t, e) {
			var i = 0,
				r = 1,
				a = t.z + t.w,
				n = e.z + e.w,
				s = -t.z + t.w,
				o = -e.z + e.w;
			return a >= 0 && n >= 0 && s >= 0 && o >= 0 ? !0 : 0 > a && 0 > n || 0 > s && 0 > o ? !1 : (0 > a ? i = Math.max(i, a / (a - n)) : 0 > n && (r = Math.min(r, a / (a - n))), 0 > s ? i = Math.max(i, s / (s - o)) : 0 > o && (r = Math.min(r, s / (s - o))), i > r ? !1 : (t.lerp(e, i), e.lerp(t, 1 - r), !0))
		}
		var h, c, u, f, p, d, m, g, y, v, x, A, w = [],
			_ = 0,
			S = [],
			b = 0,
			M = [],
			C = 0,
			P = [],
			T = 0,
			z = [],
			L = 0,
			E = [],
			D = 0,
			B = {
				objects: [],
				sprites: [],
				lights: [],
				elements: []
			},
			N = new Qe.XiangliangThree,
			R = new Qe.Vec4,
			I = new Qe.BizBox(new Qe.XiangliangThree(-1, -1, -1), new Qe.XiangliangThree(1, 1, 1)),
			F = new Qe.BizBox,
			V = new Array(3),
			U = new Array(4),
			k = new Qe.Mat4,
			O = new Qe.Mat4,
			X = new Qe.Mat4,
			G = new Qe.Mat3,
			W = new Qe.Mat3,
			H = new Qe.XiangliangThree,
			j = new Qe.Frustum,
			q = new Qe.Vec4,
			Y = new Qe.Vec4;
		this.projectVector = function(t, i, r) {
			return i.worldMatrixInverse.getInverse(i.worldMatrix), O.multiplyMatrices(i.projectionMatrix, i.worldMatrixInverse), r === e ? t.applyProjection(O) : (r.copy(t), r.applyProjection(O))
		}, this.unprojectVector = function(t, e) {
			return e.projectionMatrixInverse.getInverse(e.projectionMatrix), O.multiplyMatrices(e.worldMatrix, e.projectionMatrixInverse), t.applyProjection(O)
		}, this.pickingRay = function(t, e) {
			t.z = -1;
			var i = new Qe.XiangliangThree(t.x, t.y, 1);
			return this.unprojectVector(t, e), this.unprojectVector(i, e), i.sub(t).normalize(), new Qe.Picking(t, i)
		};
		var Z = function(e, i) {
			c = 0, B.objects.length = 0, B.sprites.length = 0, B.lights.length = 0;
			var r = function(e) {
				var i;
				i = e instanceof Qe.Serva ? e.getRoots() : e.getChildren(), i = i.toList();
				for (var a = 0, n = i.size(); n > a; a++) {
					var s = i.get(a);
					s.isSelected() && s instanceof Qe.Node && (i.add(s.createCanvasSelectionCube(), a), a++)
				}
				for (var a = 0, n = i.size(); n > a; a++) {
					var s = i.get(a);
					s._visible !== !1 && (s instanceof Qe.Light ? B.lights.push(s) : s instanceof Qe.Entity || s instanceof Qe.Line ? (s.frustumCulled === !1 || j.intersectsObject(s) === !0) && (h = t(), h.object = s, null !== s.renderDepth ? h.z = s.renderDepth : (N.copy(s.worldMatrix.getPosition()), N.applyProjection(O), h.z = N.z), B.objects.push(h)) : s instanceof Qe.Billboard || s instanceof Qe.Particle ? (h = t(), h.object = s, null !== s.renderDepth ? h.z = s.renderDepth : (N.copy(s.worldMatrix.getPosition()), N.applyProjection(O), h.z = N.z), B.sprites.push(h)) : (h = t(), h.object = s, null !== s.renderDepth ? h.z = s.renderDepth : (N.copy(s.worldMatrix.getPosition()), N.applyProjection(O), h.z = N.z), B.objects.push(h)), r(s))
				}
			};
			return r(e), i === !0 && B.objects.sort(o), B
		};
		this.projectServa = function(t, h, c, w) {
			var _, b, M, C, P, T, z, L, E, D, N, Q, K, J, $, tt, et, it, rt, at, nt, st, ot, lt = !1;
			d = 0, m = 0, y = 0, x = 0, B.elements.length = 0;
			for (var ht = 0; ht < t.getRoots().size(); ht++) {
				var ct = t.getRoots().get(ht);
				ct.updateWorldMatrix()
			}
			for (h.parent === e && h.updateWorldMatrix(!0, !1), k.copy(h.worldMatrixInverse.getInverse(h.worldMatrix)), O.multiplyMatrices(h.projectionMatrix, k), W.getInverse(k), W.transpose(), j.setFromMatrix(O), B = Z(t, c), _ = 0, b = B.objects.length; b > _; _++)
				if (N = B.objects[_].object, A = N.worldMatrix, f = 0, N instanceof Qe.Entity) {
					for (Q = N, K = Q.vertices, J = Q.faces, et = Q.uvs, G.getInverse(A), G.transpose(), st = N.material instanceof Qe.ArrayMaterial, ot = st === !0 ? N.material : null, M = 0, C = K.length; C > M; M++) u = i(), u.positionWorld.copy(K[M]).applyMatrix4(A), u.positionScreen.copy(u.positionWorld).applyMatrix4(O), u.positionScreen.x /= u.positionScreen.w, u.positionScreen.y /= u.positionScreen.w, u.positionScreen.z /= u.positionScreen.w, u.visible = !(u.positionScreen.x < -1 || u.positionScreen.x > 1 || u.positionScreen.y < -1 || u.positionScreen.y > 1 || u.positionScreen.z < -1 || u.positionScreen.z > 1);
					for (P = 0, T = J.length; T > P; P++) {
						$ = J[P];
						var ut = st === !0 ? ot.materials[$.materialIndex] : N.material;
						if (ut !== e) {
							var ft = ut.side;
							if ($ instanceof Qe.Face3) {
								if (it = S[$.a], rt = S[$.b], at = S[$.c], V[0] = it.positionScreen, V[1] = rt.positionScreen, V[2] = at.positionScreen, it.visible !== !0 && rt.visible !== !0 && at.visible !== !0 && !I.isIntersectionBox(F.setFromPoints(V))) continue;
								if (lt = (at.positionScreen.x - it.positionScreen.x) * (rt.positionScreen.y - it.positionScreen.y) - (at.positionScreen.y - it.positionScreen.y) * (rt.positionScreen.x - it.positionScreen.x) < 0, ft !== Qe.DoubleSide && lt !== (ft === Qe.FrontSide)) continue;
								p = r(), p.v1.copy(it), p.v2.copy(rt), p.v3.copy(at)
							} else if ($ instanceof Qe.Face4) {
								if (it = S[$.a], rt = S[$.b], at = S[$.c], nt = S[$.d], U[0] = it.positionScreen, U[1] = rt.positionScreen, U[2] = at.positionScreen, U[3] = nt.positionScreen, it.visible !== !0 && rt.visible !== !0 && at.visible !== !0 && nt.visible !== !0 && !I.isIntersectionBox(F.setFromPoints(U))) continue;
								if (lt = (nt.positionScreen.x - it.positionScreen.x) * (rt.positionScreen.y - it.positionScreen.y) - (nt.positionScreen.y - it.positionScreen.y) * (rt.positionScreen.x - it.positionScreen.x) < 0 || (rt.positionScreen.x - at.positionScreen.x) * (nt.positionScreen.y - at.positionScreen.y) - (rt.positionScreen.y - at.positionScreen.y) * (nt.positionScreen.x - at.positionScreen.x) < 0, ft !== Qe.DoubleSide && lt !== (ft === Qe.FrontSide)) continue;
								p = a(), p.v1.copy(it), p.v2.copy(rt), p.v3.copy(at), p.v4.copy(nt)
							}
							for (p.normalContainer.copy($.normal), lt === !1 && (ft === Qe.BackSide || ft === Qe.DoubleSide) && p.normalContainer.negate(), p.normalContainer.applyMatrix3(G).normalize(), p.normalContainerView.copy(p.normalContainer).applyMatrix3(W), p.centroidContainer.copy($.centroid).applyMatrix4(A), tt = $.vertexNormals, z = 0, L = tt.length; L > z; z++) {
								var pt = p.vertexNormalsContainer[z];
								pt.copy(tt[z]), lt === !1 && (ft === Qe.BackSide || ft === Qe.DoubleSide) && pt.negate(), pt.applyMatrix3(G).normalize();
								var dt = p.vertexNormalsContainerView[z];
								dt.copy(pt).applyMatrix3(W)
							}
							p.vertexNormalsLength = tt.length;
							var mt = et[P];
							for (E = 0, D = mt.length; D > E; E++) p.uvs[0][E] = mt[E];
							p.color = $.color, p.material = ut, H.copy(p.centroidContainer).applyProjection(O), p.z = H.z, B.elements.push(p)
						}
					}
				} else if (N instanceof Qe.Line) {
				X.multiplyMatrices(O, A), K = N.vertices, it = i(), it.positionScreen.copy(K[0]).applyMatrix4(X);
				var gt = N.type === Qe.LinePieces ? 2 : 1;
				for (M = 1, C = K.length; C > M; M++) it = i(), it.positionScreen.copy(K[M]).applyMatrix4(X), (M + 1) % gt > 0 || (rt = S[f - 2], q.copy(it.positionScreen), Y.copy(rt.positionScreen), l(q, Y) === !0 && (q.multiplyScalar(1 / q.w), Y.multiplyScalar(1 / Y.w), g = n(), g.v1.positionScreen.copy(q), g.v2.positionScreen.copy(Y), g.z = Math.max(q.z, Y.z), g.material = N.material, B.elements.push(g)))
			}
			for (_ = 0, b = B.sprites.length; b > _; _++) N = B.sprites[_].object, A = N.worldMatrix, N instanceof Qe.Particle && (R.set(A.elements[12], A.elements[13], A.elements[14], 1), R.applyMatrix4(O), R.z /= R.w, R.z > 0 && R.z < 1 && (v = s(), v.object = N, v.x = R.x / R.w, v.y = R.y / R.w, v.z = R.z, v.rotation = N.rotation.z, v.scale.x = N.scale.x * Math.abs(v.x - (R.x + h.projectionMatrix.elements[0]) / (R.w + h.projectionMatrix.elements[12])), v.scale.y = N.scale.y * Math.abs(v.y - (R.y + h.projectionMatrix.elements[5]) / (R.w + h.projectionMatrix.elements[13])), v.material = N.material, B.elements.push(v)));
			return w === !0 && B.elements.sort(o), B
		}
	};
	Qe.Projector = Mi, Qe.Billboard = function(t) {
		null != t && null != t.id ? this._id = t.id : this._id = t, Qe.Element.call(this, this._id), this.material = new Qe.BillboardMaterial, this.rotation3d = this._rotation, this.rotation = 0, this.vertices = [new Je(-.5, -.5, 0), new Je(.5, -.5, 0), new Je(.5, .5, 0), new Je(-.5, .5, 0)]
	}, Qe.extend(Qe.Billboard, Qe.Element, {
		constructor: Qe.Billboard,
		className: "TGL.Billboard",
		updateMatrix: function() {
			this.matrix.setPosition(this._position), this.rotation = this._rotation.z, this.rotation3d.set(0, 0, this.rotation), this.matrix.setRotationFromEuler(this.rotation3d), (1 !== this._scale.x || 1 !== this._scale.y) && this.matrix.scale(this._scale), this.matrixWorldNeedsUpdate = !0
		},
		clone: function(t) {
			return t === e && (t = new Qe.Billboard(this.material)), Qe.Element.prototype.clone.call(this, t), t
		},
		setMaterialStyle: function(t, e) {
			var i = this.material.clone();
			t = t.substr(t.indexOf(".") + 1), this._A97(i, t, e);
			var r = i.getUniqueCode(),
				a = Ji.getMaterial(r);
			null != a ? (Ji.unUseMaterial(this.material), this.material = a, Ji.useMaterial(a)) : (Ji.unUseMaterial(this.material), Ji.setMaterial(r, i), this.material = i)
		}
	}), Qe.ShaderSprite = {
		sprite: {
			vertexShader: ["uniform int useScreenCoordinates;", "uniform int sizeAttenuation;", "uniform vec3 screenPosition;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 alignment;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "uniform bool vertical;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = (position + alignment) * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "vec4 upPosition;", "vec4 rightPosition = vec4(scale.x,0.0,0.0,1.0);", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "if(vertical){", "upPosition =  modelViewMatrix * vec4( 0.0, 1.0, 0.0, 1.0 ) - finalPosition;", "normalize(upPosition);", "}", "if(vertical){", "finalPosition.xyz += (rotatedPosition.x * rightPosition.xyz / scale.x) + (rotatedPosition.y * upPosition.xyz / scale.y);", "}else{", "finalPosition.xy += rotatedPosition;", "}", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n"),
			fragmentShader: ["uniform vec3 color;", "uniform int useMap;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "if(useMap > 0){", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "} else {", "gl_FragColor = vec4( color, 1.0);", "}", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")
		}
	}, Qe.BillboardRenderer = function() {
		function t(t, i) {
			var r = e.createProgram(),
				a = e.createShader(e.FRAGMENT_SHADER),
				n = e.createShader(e.VERTEX_SHADER),
				s = "precision " + i + " float;\n";
			return e.shaderSource(a, s + t.fragmentShader), e.shaderSource(n, s + t.vertexShader), e.compileShader(a), e.compileShader(n), e.attachShader(r, a), e.attachShader(r, n), e.linkProgram(r), r
		}
		var e, i, r, a = {},
			n = (new Qe.Billboard, new Qe.BillboardMaterial({
				color: 255
			}));
		this.init = function(n) {
			e = n._gl, i = n, r = n.getPrecision(), a.vertices = new Float32Array(16), a.faces = new Uint16Array(6), a.lines = new Uint16Array(8);
			var s = 0;
			a.vertices[s++] = -.5, a.vertices[s++] = -.5, a.vertices[s++] = 0, a.vertices[s++] = 0, a.vertices[s++] = .5, a.vertices[s++] = -.5, a.vertices[s++] = 1, a.vertices[s++] = 0, a.vertices[s++] = .5, a.vertices[s++] = .5, a.vertices[s++] = 1, a.vertices[s++] = 1, a.vertices[s++] = -.5, a.vertices[s++] = .5, a.vertices[s++] = 0, a.vertices[s++] = 1, s = 0, a.faces[s++] = 0, a.faces[s++] = 1, a.faces[s++] = 2, a.faces[s++] = 0, a.faces[s++] = 2, a.faces[s++] = 3, s = 0, a.lines[s++] = 0, a.lines[s++] = 1, a.lines[s++] = 0, a.lines[s++] = 3, a.lines[s++] = 1, a.lines[s++] = 2, a.lines[s++] = 2, a.lines[s++] = 3, a.vertexBuffer = e.createBuffer(), a.elementBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, a.vertexBuffer), e.bufferData(e.ARRAY_BUFFER, a.vertices, e.STATIC_DRAW), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, a.faces, e.STATIC_DRAW), a.program = t(Qe.ShaderSprite.sprite, r), a.attributes = {}, a.uniforms = {}, a.attributes.position = e.getAttribLocation(a.program, "position"), a.attributes.uv = e.getAttribLocation(a.program, "uv"), a.uniforms.uvOffset = e.getUniformLocation(a.program, "uvOffset"), a.uniforms.uvScale = e.getUniformLocation(a.program, "uvScale"), a.uniforms.rotation = e.getUniformLocation(a.program, "rotation"), a.uniforms.scale = e.getUniformLocation(a.program, "scale"), a.uniforms.alignment = e.getUniformLocation(a.program, "alignment"), a.uniforms.color = e.getUniformLocation(a.program, "color"), a.uniforms.useMap = e.getUniformLocation(a.program, "useMap"), a.uniforms.map = e.getUniformLocation(a.program, "map"), a.uniforms.opacity = e.getUniformLocation(a.program, "opacity"), a.uniforms.vertical = e.getUniformLocation(a.program, "vertical"), a.uniforms.useScreenCoordinates = e.getUniformLocation(a.program, "useScreenCoordinates"), a.uniforms.sizeAttenuation = e.getUniformLocation(a.program, "sizeAttenuation"), a.uniforms.screenPosition = e.getUniformLocation(a.program, "screenPosition"), a.uniforms.modelViewMatrix = e.getUniformLocation(a.program, "modelViewMatrix"), a.uniforms.projectionMatrix = e.getUniformLocation(a.program, "projectionMatrix"), a.uniforms.fogType = e.getUniformLocation(a.program, "fogType"), a.uniforms.fogDensity = e.getUniformLocation(a.program, "fogDensity"), a.uniforms.fogNear = e.getUniformLocation(a.program, "fogNear"), a.uniforms.fogFar = e.getUniformLocation(a.program, "fogFar"), a.uniforms.fogColor = e.getUniformLocation(a.program, "fogColor"), a.uniforms.alphaTest = e.getUniformLocation(a.program, "alphaTest")
		}, this.render = function(t, r, s, o, l) {
			var h = new ci(r),
				c = h.size();
			if (c) {
				var u = a.attributes,
					f = a.uniforms,
					p = !1;
				t.pm.currentProgram != a.program && (e.useProgram(a.program), t.pm.currentProgram = a.program, t._currentGroupHash = null, e.enableVertexAttribArray(u.position), e.enableVertexAttribArray(u.uv), e.disable(e.CULL_FACE), e.bindBuffer(e.ARRAY_BUFFER, a.vertexBuffer), e.vertexAttribPointer(u.position, 2, e.FLOAT, !1, 16, 0), e.vertexAttribPointer(u.uv, 2, e.FLOAT, !1, 16, 8), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), this.enable = !0, p = !0), e.uniformMatrix4fv(f.projectionMatrix, !1, s.projectionMatrix.elements), p && e.activeTexture(e.TEXTURE0), p && e.uniform1i(f.map, 0);
				var d = 0,
					m = 0,
					g = t.fog;
				g ? (e.uniform3f(f.fogColor, g.color.r, g.color.g, g.color.b), g instanceof Qe.Fog ? (e.uniform1f(f.fogNear, g.near), e.uniform1f(f.fogFar, g.far), e.uniform1i(f.fogType, 1), d = 1, m = 1) : g instanceof Qe.FogExp2 && (e.uniform1f(f.fogDensity, g.density), e.uniform1i(f.fogType, 2), d = 2, m = 2)) : (d = 0, m = 0);
				var y, v, x;
				for (y = 0; c > y; y++) v = h.get(y), x = v.material, i.isVisible(v) && 0 !== x.opacity && (v.updateWorldMatrix(!0, !1), x.useScreenCoordinates ? v.z = -v.position.z : (v._modelViewMatrix = new Qe.Mat4, v._modelViewMatrix.multiplyMatrices(s.worldMatrixInverse, v.worldMatrix), v.z = -v._modelViewMatrix.elements[14]));
				for (y = 0; c > y; y++) v = h.get(y), this.renderBillboard(v, f, t, d, m), v._selected && (v._scale.x = 1.01 * v._scale.x, v._scale.y = 1.01 * v._scale.y, v.material.clone(n), n.map = null, n.color.set(65280), this.renderBillboard(v, f, t, d, m, n), v._scale.x = v._scale.x / 1.01, v._scale.y = v._scale.y / 1.01)
			}
		}, this.disable = function() {
			if (this.enable) {
				var t = a.attributes;
				a.uniforms;
				e.disableVertexAttribArray(t.position), e.disableVertexAttribArray(t.uv), i._oldDoubleSided || e.enable(e.CULL_FACE), i._oldBlending === Qe.NoBlending && e.disable(e.BLEND), _i.setDepthWrite(!0, i), this.enable = !1, this.lastMaterialId = null, i.pm.currentProgram = null
			}
		}, this.renderBillboard = function(t, r, n, s, o, l) {
			var h, c, u, f = [],
				p = new Je;
			if (h = l ? l : t.material, i.isVisible(t) && 0 !== h.opacity) {
				var d = h.id,
					m = d != this.lastMaterialId;
				m && e.uniform1f(r.alphaTest, h.alphaTest), m && (h.useScreenCoordinates === !0 ? (e.uniform1i(r.useScreenCoordinates, 1), e.uniform3f(r.screenPosition, (t.position.x * i.devicePixelRatio - halfViewportWidth) / halfViewportWidth, (halfViewportHeight - t.position.y * i.devicePixelRatio) / halfViewportHeight, Math.max(0, Math.min(1, t.position.z)))) : (e.uniform1i(r.useScreenCoordinates, 0), e.uniform1i(r.sizeAttenuation, h.sizeAttenuation ? 1 : 0))), h.useScreenCoordinates === !0 ? (f[0] = i.devicePixelRatio, f[1] = i.devicePixelRatio) : (e.uniformMatrix4fv(r.modelViewMatrix, !1, t._modelViewMatrix.elements), f[0] = 1, f[1] = 1), u = n.fog && h.fog ? o : 0, s !== u && (e.uniform1i(r.fogType, u), s = u), c = 1 / (h.scaleByViewport ? viewportHeight : 1), p.getScaleFromMatrix(t.worldMatrix), f[0] *= c * p.x, f[1] *= c * p.y, m && (e.uniform2f(r.uvScale, h.uvScale.x, h.uvScale.y), e.uniform2f(r.uvOffset, h.uvOffset.x, h.uvOffset.y), e.uniform2f(r.alignment, h.alignment.x, h.alignment.y), e.uniform1f(r.opacity, h.opacity), e.uniform1i(r.vertical, h.vertical), e.uniform3f(r.color, h.color.r, h.color.g, h.color.b), e.uniform1f(r.rotation, t.rotation)), e.uniform2fv(r.scale, f), m && (i.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst), i.setDepthTest(h.depthTest), i.setDepthWrite(h.depthMask)), h.map && h.map._image && i.pm.addTexture(h.map), m = m || h.map && i.pm.needsUpdateTexture(h.map), h.map && h.map._image && h.map._image.width ? (m && i.setTexture(h.map, 0), m && e.uniform1i(r.useMap, 1)) : m && e.uniform1i(r.useMap, 0), l ? (m && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), m && e.bufferData(e.ELEMENT_ARRAY_BUFFER, a.lines, e.STATIC_DRAW), m && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), e.drawElements(e.LINES, 8, e.UNSIGNED_SHORT, 0)) : (m && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), m && e.bufferData(e.ELEMENT_ARRAY_BUFFER, a.faces, e.STATIC_DRAW), m && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, a.elementBuffer), e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0)), this.lastMaterialId = h.id
			}
		}
	};
	var Si = function(t, i, r) {
		this.width = t, this.height = i, r = r || {}, this.wrapS = r.wrapS !== e ? r.wrapS : Qe.ClampToEdgeWrapping, this.wrapT = r.wrapT !== e ? r.wrapT : Qe.ClampToEdgeWrapping, this.magFilter = r.magFilter !== e ? r.magFilter : Qe.LinearFilter, this.minFilter = r.minFilter !== e ? r.minFilter : Qe.LinearMipMapLinearFilter, this.anisotropy = r.anisotropy !== e ? r.anisotropy : 1, this.offset = new Qe.XiangliangTwo(0, 0), this.repeat = new Qe.XiangliangTwo(1, 1), this.format = r.format !== e ? r.format : Qe.RGBAFormat, this.type = r.type !== e ? r.type : Qe.UnsignedByteType, this.depthBuffer = r.depthBuffer !== e ? r.depthBuffer : !0, this.stencilBuffer = r.stencilBuffer !== e ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
	};
	Si.prototype = {
		constructor: Si,
		clone: function() {
			var t = new Si(this.width, this.height);
			return t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.anisotropy = this.anisotropy, t.offset.copy(this.offset), t.repeat.copy(this.repeat), t.format = this.format, t.type = this.type, t.depthBuffer = this.depthBuffer, t.stencilBuffer = this.stencilBuffer, t.generateMipmaps = this.generateMipmaps, t.shareDepthFrom = this.shareDepthFrom, t
		},
		getUniqueCode: function() {
			return this._id
		},
		dispose: function() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	};
	var bi = function(t, e, i) {
		Si.call(this, t, e, i), this.activeCubeFace = 0
	};
	Qe.extend(bi, Si, {});
	var Ci, Pi = "l=1.0\ntype=1\ngis=0\n3d=1\nstart=2015-03-27\nend=2015-06-30\nnote=This license applies to the evaluation version of TWaver. The License is limited to noncommercial use. Noncommercial use relates only to educational, research, personal or evaluation purposes. Any other use is commercial use. You may not use the Software in connection with any business activities.And You are not permitted to modify the software or attempt to decipher, decompile, disassemble or reverse engineer this Software.\nsignature=52d6ff61ec50368d6cda1ac26938255048ed26af51abc61bcb14028cf97b1245090fb53bb1e84ab9e5ef9a8d5ab6dab9ce3304f31c33a785d9c19f4265c0277d51dd358ed48d12a6e7cf64534ac8626ddc8d147dcb9ed7921fce4a61547ec6ae8b61660384c7c335b7ae0cafa46a7d58b3b57932f940c6130cb78f53d53b19ed5496acfc8802d4b66172b5495fa5524c5cf7f4e3ae19c848cb68f225882114e7ff409d92e32ce9356f843cf18e36b8d17f6a49e632e5a5831ff091113a6c1e319e371fb1d05425053a04e00179d4ccdf644f70c1b51b0a1e115a22f8b6972207805c8cb55229964772718f69282ec2ced7bfd2c19d4fa5f12b8a09ff3025af0338f6ac823a57e954b6099ec1c26aaca032116843c07136cdcd40c4f2d6ab5af6742123dc8f0bbe22df2e139432f9c509ea857febcff317e2a2eadb4ecb14901d75e5fc749180e16c8168f181fc06f8d2f405b2a37e2b449f574d505a4d589144dbd24a826e8190bce02d3087e14c38325318296bdbb53bc5114481af968add81607da7a23947dbbd9bdff51dc36196f9626a1446565675aa11424ec1153181fcbd227f4b271b6b7fea26ec40741b8781669ce06564cbce17c2c9d050ecd85833c9e85cb31ddf24755b43312088d0f1f5d2c750e22c3933e38100dd686b2ad52e109265cfbb248981c25e2f2ccc2525cb41d8078d0c191dd2bd4e62d5996ab972548188cd12c885c8929ce32edea2740f3eed33c8a553b6db04255e76adb3a14b2a611b98c0c798c02875c39b9b65e4e16132845614205fb22a2675ac5047105241114b7efa0126e9926e1e05ff65e25191a4bd5c6c04b1fa40fbfe21e9930ae00786ef38d240dceb4479742cd6008722d2f0358870f5fe9d1fd7530a1de73606",
		Ti = 0xdeadbeefcafe,
		zi = 15715070 == (16777215 & Ti);
	zi && "Microsoft Internet Explorer" == navigator.appName ? (m.prototype.am = v, Ci = 30) : zi && "Netscape" != navigator.appName ? (m.prototype.am = y, Ci = 26) : (m.prototype.am = x, Ci = 28), m.prototype.DB = Ci, m.prototype.DM = (1 << Ci) - 1, m.prototype.DV = 1 << Ci;
	var Li = 52;
	m.prototype.FV = Math.pow(2, Li), m.prototype.F1 = Li - Ci, m.prototype.F2 = 2 * Ci - Li;
	var Ei, Di, Bi = "0123456789abcdefghijklmnopqrstuvwxyz",
		Ni = new Array;
	for (Ei = "0".charCodeAt(0), Di = 0; 9 >= Di; ++Di) Ni[Ei++] = Di;
	for (Ei = "a".charCodeAt(0), Di = 10; 36 > Di; ++Di) Ni[Ei++] = Di;
	for (Ei = "A".charCodeAt(0), Di = 10; 36 > Di; ++Di) Ni[Ei++] = Di;
	G.prototype.convert = W, G.prototype.revert = H, G.prototype.reduce = q, G.prototype.mulTo = Y, G.prototype.sqrTo = Z, K.prototype.convert = J, K.prototype.revert = $, K.prototype.reduce = tt, K.prototype.mulTo = it, K.prototype.sqrTo = et,
		m.prototype.copyTo = _, m.prototype.fromInt = S, m.prototype.fromString = C, m.prototype.clamp = P, m.prototype.dlShiftTo = N, m.prototype.drShiftTo = R, m.prototype.lShiftTo = I, m.prototype.rShiftTo = F, m.prototype.subTo = V, m.prototype.multiplyTo = U, m.prototype.squareTo = k, m.prototype.divRemTo = O, m.prototype.invDigit = Q, m.prototype.isEven = rt, m.prototype.exp = at, m.prototype.toString = T, m.prototype.negate = z, m.prototype.abs = L, m.prototype.compareTo = E, m.prototype.bitLength = B, m.prototype.mod = X, m.prototype.modPowInt = nt, m.ZERO = M(0), m.ONE = M(1), Qt.prototype.convert = Kt, Qt.prototype.revert = Kt, Qt.prototype.mulTo = Jt, Qt.prototype.sqrTo = $t, re.prototype.convert = ae, re.prototype.revert = ne, re.prototype.reduce = se, re.prototype.mulTo = le, re.prototype.sqrTo = oe;
	var Ri = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
		Ii = (1 << 26) / Ri[Ri.length - 1];
	m.prototype.chunkSize = ct, m.prototype.toRadix = ft, m.prototype.fromRadix = pt, m.prototype.fromNumber = dt, m.prototype.bitwiseTo = xt, m.prototype.changeBit = It, m.prototype.addTo = kt, m.prototype.dMultiply = Yt, m.prototype.dAddOffset = Zt, m.prototype.multiplyLowerTo = ee, m.prototype.multiplyUpperTo = ie, m.prototype.modInt = ue, m.prototype.millerRabin = de, m.prototype.clone = st, m.prototype.intValue = ot, m.prototype.byteValue = lt, m.prototype.shortValue = ht, m.prototype.signum = ut, m.prototype.toByteArray = mt, m.prototype.equals = gt, m.prototype.min = yt, m.prototype.max = vt, m.prototype.and = wt, m.prototype.or = St, m.prototype.xor = Mt, m.prototype.andNot = Pt, m.prototype.not = Tt, m.prototype.shiftLeft = zt, m.prototype.shiftRight = Lt, m.prototype.getLowestSetBit = Dt, m.prototype.bitCount = Nt, m.prototype.testBit = Rt, m.prototype.setBit = Ft, m.prototype.clearBit = Vt, m.prototype.flipBit = Ut, m.prototype.add = Ot, m.prototype.subtract = Xt, m.prototype.multiply = Gt, m.prototype.divide = Ht, m.prototype.remainder = jt, m.prototype.divideAndRemainder = qt, m.prototype.modPow = he, m.prototype.modInverse = fe, m.prototype.pow = te, m.prototype.gcd = ce, m.prototype.isProbablePrime = pe, m.prototype.square = Wt, me.prototype.init = ge, me.prototype.next = ye;
	var Fi, Vi, Ui, ki = 256;
	if (null == Vi) {
		Vi = new Array, Ui = 0;
		var Oi;
		if ("Netscape" == navigator.appName && navigator.appVersion < "5" && t.crypto) {
			var Xi = t.crypto.random(32);
			for (Oi = 0; Oi < Xi.length; ++Oi) Vi[Ui++] = 255 & Xi.charCodeAt(Oi)
		}
		for (; ki > Ui;) Oi = Math.floor(65536 * Math.random()), Vi[Ui++] = Oi >>> 8, Vi[Ui++] = 255 & Oi;
		Ui = 0, Ae()
	}
	Se.prototype.nextBytes = _e;
	Ce.prototype.doPublic = Te, Ce.prototype.setPublic = Pe, Ce.prototype.encrypt = ze, Ce.prototype.doPrivate = Be, Ce.prototype.setPrivate = Ee, Ce.prototype.setPrivateEx = De, Ce.prototype.decrypt = Ne;
	var Gi = function() {
			Wi.v(Pi)
		},
		Wi = {},
		Hi = "6a384c1259bdb5e731ec96b3174683f48a2c56a85e52e7a5bb20b58711ce50c1a294bd5e1d1752e766085e9ae94bae6d217c25dbb5fcdb86a8a9a7e180fa066723d00fcb85fcf7c9d29f8cc8859f53244a49c0bc30dcc45156daf8843ce1d24fe8ebc9a3c186bb26e9d0714041aef160304c1db8cc5728cf4acb39d29755f319",
		ji = "10001",
		qi = "61a921483dfa8f24e26204ace4d990b965d11e5bef5d8a5e768ebc5853a6bdd94b02369a3165207460fb91001d3fd83fbe69c6e51b8e40c8ae8a4e30a7c539dca98b44858bdc0b76f25af6803d4d13dacd9fa1a28f66cf561fa36309d4239a2cf50fe20ef0e99e01fc8701090f0685a524f411e00ca91f877d3b49d2d0052f9",
		Yi = "b881f568eb43e7a60c256a8a90e08b7c7638fd66ce3cded9005c72e283ca4f2b8601e2edc687d7f898348a05723b515d9edeb626af7b499a56ddaea93b0c2047";
	Wi.cross = function(t) {
		if (t) {
			for (var e = "", i = 0; i < t.length;) i + 1 < t.length ? (e += t[i + 1], e += t[i]) : e += t[i], i += 2;
			return e
		}
		return null
	}, Wi.reverse = function(t) {
		if (t) {
			for (var e = "", i = t.length; i > 0; i--) e += t[i - 1];
			return e
		}
		return null
	}, Wi.v = function(t) {
		if (t) {
			var e = Wi;
			if (e.start = null, e.beginDate = null, e.end = null, e.endDate = null, e.gis = null, e["3D"] = null, e["3d"] = null, e.l = null, e.__li__ = null, t.indexOf("signature=") > 0) {
				var i = t.split("signature="),
					r = i[0],
					a = i[1],
					n = new Ce;
				n.setPublic(Hi, ji);
				for (var s = a, o = s.length, l = 256, h = 0, c = "", u = ""; o > h;) c = s.substr(h, l), u += n.decrypt(c), h += l;
				if (u === r) return e.i(t), !0
			}
		}
		return !1
	}, Wi.i = function(t) {
		var i = Wi;
		i.__li__ = t;
		var r, a, n, s, o, l = t.split("\n");
		for (r = 0; r < l.length; r++) a = l[r], o = a.split("="), n = o[0], s = o[1], i[n] = s;
		i.start != e && (i.beginDate = new Date(Date.parse(i.start.replace(/-/g, "/")))), i.end != e && (i.endDate = new Date(Date.parse(i.end.replace(/-/g, "/"))));
		var h = i.gis;
		h != e && (h = parseInt(h)), h && (i._isPermissionGIS = !0);
		var c = i["3D"] || i["3d"];
		c != e && (c = parseInt(c)), c && (i._isPermission3D = !0), i.l != e && (i.version = i.l)
	};
	var Zi = function(t) {
			return t.__li__ !== e && t._isPermission3D
		},
		Qi = function(t) {
			if (!Zi(t)) return !0;
			var e = new Date;
			return null != t.beginDate && t.beginDate.getTime() - e.getTime() >= 0 || null != t.endDate && t.endDate.getTime() - e.getTime() <= 0
		};
	Wi.$z = function(t) {
		var e = new Ce;
		e.setPublic(Hi, ji);
		for (var i = t, r = i.length, a = 256, n = 0, s = "", o = ""; r > n;) s = i.substr(n, a), o += e.decrypt(s), n += a;
		return o
	}, Wi.twm = function(t) {
		var i = Wi,
			r = i.$z("4cd18113d0c7046bfe51f7a3fbd41c2b7cf14dd785d6ea7cec9da17710d3acfb8ce0cb9cf10839f4bd51e88819de19cdc0db09278584396156fcb65abe0353ac49d01326b30efa0ea98a07da9f8ceeb7572fc1b37b5965ba6103ccba4913b62e36e49425c6ff21a2f008830c59cff8f29058769f858c8a9f0bab3eaea7fb8a9e"),
			a = this.type,
			n = this.markText,
			s = i.$z("648be38cd61c870e95ffc1ea0676af40736c1365015abc326e891a4de67b4de3d4b05da70b9aebedc83ec26ecf71eb74c72f42f6d9a4be2d507d2f67d2860b7b66e3ba1d565e15923f2db335ff922eef17c01b59818b583d5656412d6cc9d9ba70001c2c88e3efd492c6b13a07fda5f325b333138a2036f4696542ec137cc341");
		t[s] = i.__li__;
		var o = t;
		/*if (o._xyz = null, "3" !== a || Qi(Wi) || n !== e) {
			t.DEBUG && (console.log("license: " + Wi.__li__), console.log("license Type : " + a), console.log("beginDate: " + Wi.beginDate), console.log("endDate: " + Wi.endDate), console.log("mark: " + n)), t.__liLabel == e && (t.__liLabel = document.createElement("div")), i.startDate === e && (i.startDate = new Date);
			var l = (new Date).getTime() - i.startDate.getTime(),
				h = "2" === a ? 7200 : 300;
			if (!(1e3 * h > l)) {
				var c = Qi(i) && l > 1e3 * h,
					u = n;
				if (c ? u = i.$z("0dd629dbd0ce341ecdd447e35ddc3135a0b46916f7571a687f38ae665cf0ae095fee885e14329caa75112d8787508da17285b0897845d8ccae73e6a2727dd19f1ca335fe139d0e60d240f9ececc78f81c2c5667f51aeed4135b9c4bb436b8acb7cd418eeeb404bc4f3bcdedb481ac0edff7644435ce2b9f2bda78c892bd56d73") : "2" != a || u !== e && "" != u ? "1" == a && !n && (u = r) : u = i.$z("644d54bf9c59afbd8a742a9e7e2731f23f149ccb7f04c3547548c50ac2d77faea108b55f1f6261e99869f1c06b84e8abdefdf45b5170048531421f3d528123972ba2f03d70f37c33f1341dc12f986e0089e42bab517e2a05b455d12d90991bbba9bc45c715a81943062ea5fa5408c8b1b9270d260cc5a67b38ecc4178ce512fc"), u !== e) {
					var f = o.__liLabel;
					f.innerHTML = u, f.type = a, f.mark = n, f.expired = c, o._xyz = f, c && (o.getView().style.opacity = .1)
				}
			}
		}*/
	}, xi.validateLicense(Pi), Qe.Material = function(t) {
		Qe.PropertyChangeDispatcher.call(this), this.id = Qe.MaterialIdCount++, this.type = "basic", this.shaderID = "", this.uniforms = e, this.vertexShader = "", this.fragmentShader = "", this.alarmColor = null, this.name = "", this.side = Qe.FrontSide, this.fog = !0, this.normalType = e, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = Qe.NoColors, this.blendMode = Qe.NormalBlending, this.blendSrc = Qe.SrcAlphaFactor, this.blendDst = Qe.OneMinusSrcAlphaFactor, this.blendEquation = Qe.AddEquation, this.depthTest = !0, this.depthMask = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.transparent = !1, this.opacity = 1, this.visible = !0, this.needsUpdate = !0, this.setValues(t), this.useCount = 0, this.styleMap = {}, this.offset = new Ke(0, 0), this.repeat = new Ke(1, 1), this.gradient = {}, this.gradientType = 1, this.gradientCenter = new Ke(.5, .5), this.outline = 0
	}, Qe.extend(Qe.Material, Qe.PropertyChangeDispatcher, {
		generateKey: function() {},
		setMap: function(t, e) {
			if (null == e && (e = "map"), this[e] !== t) {
				var i = this[e];
				this[e] = t, this.firePropertyChange(e, i, t), this.onMapChanged(i, t)
			}
		},
		handleTextureChange: function(t) {
			if ("image" === t.property) {
				this.firePropertyChange("needsUpdate", !1, !0)
			} else "disposed" === t.property
		},
		onPropertyChange: function(t, e, i) {},
		onMapChanged: function(t, e) {},
		setColor: function(t) {
			if (this.color !== t) {
				var e = this.color.clone();
				t instanceof Qe.Color ? this.color.copy(t) : this.color.set(t), this.firePropertyChange("color", e, t)
			}
		},
		setPropertyValue: function(t, e) {
			if (this[t] !== e) {
				var i = this[t];
				if (i instanceof Qe.Color) null != e && (i = i.clone(), e instanceof Qe.Color ? this[t].copy(e) : this[t].set(e));
				else if ("gradient" == t) {
					var r = {};
					for (var a in e) e[a] instanceof Qe.Color ? r[a] = e[a] : r[a] = new Qe.Color(e[a]);
					this[t] = r
				} else this[t] = e;
				this._uniqueCode = null, this.firePropertyChange(t, i, e)
			}
		},
		isTextureStyle: function(t) {
			return "terrain" === this._type ? t.startsWith("texture1.") || t.startsWith("texture2.") || t.startsWith("textureb.") || t.startsWith("texturen.") || t.startsWith("texturebp.") : t.startsWith("texture.") || t.startsWith("lightmap") || t.startsWith("envmap") || t.startsWith("normalmap") || t.startsWith("specularmap")
		},
		setNeedsUpdate: function(t) {},
		getShaderID: function() {
			return this instanceof Qe.BasicMaterial && (this.shaderID = "basic"), this.shaderID
		},
		setupMaterialShader: function() {
			var t = this.getShaderID(),
				e = Qe.ShaderLib[t];
			this.uniforms = Qe.UniformsUtils.clone(e.uniforms), this.vertexShader = e.vertexShader, this.fragmentShader = e.fragmentShader
		},
		refreshUniforms: function(t, e) {
			this.refreshUniformsCommon(t, e), this.refreshUniformsSpecific(t, e)
		},
		loadGleyePosition: function(t, e, i) {
			if ((this instanceof Qe.ShaderMaterial || this instanceof Qe.PhongMaterial || this.envMap || "phong" === this._type) && null != t.gleyePosition) {
				var r = e.worldMatrix.getPosition();
				i.uniform3f(t.gleyePosition, r.x, r.y, r.z)
			}
		},
		loadViewMatrix: function(t, e, i) {
			("lambert" === this.type || "phong" === this.type || material.skinning) && null !== t.viewMatrix && i.uniformMatrix4fv(p_uniforms.viewMatrix, !1, e.worldMatrixInverse.elements)
		},
		refreshUniformsSpecific: function(t) {},
		refreshUniformsCommon: function(t) {
			var i = this.uniforms,
				r = this;
			i.opacity.value = r.opacity;
			var a = xi.getObjectCount(this.gradient) > 0;
			if (t ? i.diffuse.value.copyGammaToLinear(this.alarmColor ? this.alarmColor : this.color) : i.diffuse.value = this.alarmColor ? this.alarmColor : this.color, a) {
				var n = [],
					s = [];
				for (var o in this.gradient) n.push(o);
				n.sort();
				for (var l = 0; l < n.length; l++) s.push(this.gradient[n[l]]);
				i.gradientColor.value = s, i.gradientStop.value = n, i.gradientType.value = this.gradientType
			}
			i.map.value = r.map, i.lightMap.value = r.lightMap, i.specularMap.value = r.specularMap, r.bumpMap && (i.bumpMap.value = r.bumpMap, i.bumpScale.value = r.bumpScale), r.normalMap && "phong" === r._type && (i.normalMap.value = r.normalMap, i.normalScale.value.copy(r.normalScale));
			var h;
			if (r.map ? h = r.map : r.specularMap ? h = r.specularMap : r.normalMap && "phong" === r._type ? h = r.normalMap : r.bumpMap && "phong" === r._type && (h = r.bumpMap), h != e) {
				var c = this.offset,
					u = this.repeat;
				i.offsetRepeat.value.set(c.x, c.y, u.x, u.y), i.flipX.value = h.flipX ? 1 : 0, i.mapLoaded.value = 1, h._image && !h._image.loaded && i.offsetRepeat.value.set(0, 0, 1, 1)
			}
			i.envMap.value = r.envMap, i.flipEnvMap.value = 1, t ? i.reflectivity.value = r.reflectRatio * r.reflectRatio : i.reflectivity.value = r.reflectRatio, i.refractionRatio.value = r.refractionRatio, i.combine.value = r.combine, i.useRefract.value = r.envMap && r.envMap.mapping instanceof Qe.CubeRefractionMapping
		},
		loadGeneralUniforms: function() {},
		getNormalType: function() {
			var t = this && this.normalType !== e && this.normalType === Qe.NormalTypeSmooth;
			return t ? Qe.SmoothShading : Qe.FlatShading
		},
		isVertexColor: function() {
			return this.vertexColors ? this.vertexColors : !1
		},
		needUV: function() {
			return this.map || this.lightMap || this.bumpMap || this.normalMap || this.specularMap ? !0 : !0
		},
		setValues: function(t) {
			if (t !== e)
				for (var i in t) {
					var r = t[i];
					if (r !== e) {
						if (i in this) {
							var a = this[i];
							a instanceof Qe.Color && r instanceof Qe.Color ? a.copy(r) : a instanceof Qe.Color ? a.set(r) : a instanceof Qe.XiangliangThree && r instanceof Qe.XiangliangThree ? a.copy(r) : this[i] = r
						}
					} else console.warn("TGL.Material: '" + i + "' parameter is undefined.")
				}
		},
		isCustomAttributesNeedUpdate: function() {
			if (!this.attributes) return !1;
			for (var t in this.attributes)
				if (this.attributes[t].needsUpdate) return !0;
			return !1
		},
		clearCustomAttributes: function() {
			if (this.attributes)
				for (var t in this.attributes) this.attributes[t].needsUpdate = !1
		},
		clone: function(t) {
			return t === e && (t = new Qe.Material), t.name = this.name, t.side = this.side, t.blendMode = this.blendMode, t.blendSrc = this.blendSrc, t.blendDst = this.blendDst, t.blendEquation = this.blendEquation, t.depthTest = this.depthTest, t.depthMask = this.depthMask, t.polygonOffset = this.polygonOffset, t.polygonOffsetFactor = this.polygonOffsetFactor, t.polygonOffsetUnits = this.polygonOffsetUnits, t.alphaTest = this.alphaTest, t.transparent = this.transparent, t.opacity = this.opacity, t.visible = this.visible, t.normalType = this.normalType, t.wireframe = this.wireframe, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.wireframeLinewidth = this.wireframeLinewidth, t.gradient = this.gradient, t.gradientType = this.gradientType, t.outline = this.outline, t
		},
		dispose: function() {
			this.firePropertyChange("disposed", !1, !0)
		}
	}), Qe.MaterialIdCount = 0, Qe.EntityMaterial = function(t) {
		Qe.Material.call(this), this._type = "basic", this.color = new Qe.Color(16777215), this.map = null, this.ambient = new Qe.Color(16777215), this.emissive = new Qe.Color(0), this.specular = new Qe.Color(1118481), this.specularStrength = 1, this.shininess = 30, this.wrapAround = !1, this.wrapRGB = new Qe.XiangliangThree(1, 1, 1), this.lightMap = null, this.specularMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new Qe.XiangliangTwo(1, 1), this.envMap = null, this.combine = Qe.MultiplyOperation, this.reflectRatio = 1, this.refractionRatio = .98, this.fog = !0, this.shading = Qe.SmoothShading, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.metal = !1, this.perPixel = !0, this.map1 = null, this.map2 = null, this.blendMap = null, this.detailMap = null, this.specularMap = null, this.blendRange = new Ke(0, 1), this.setValues(t)
	}, Qe.extend(Qe.EntityMaterial, Qe.Material, {
		getShaderID: function() {
			return this.getType()
		},
		getUniqueCode: function() {
			if (null != this._uniqueCode) return this._uniqueCode;
			var t = this._type + " " + this.color.r + this.color.g + this.color.b + " " + this.ambient.getUniqueCode() + " " + this.emissive.getUniqueCode() + this.specular.getUniqueCode() + " " + this.transparent + " " + this.visible + " " + this.opacity + " " + this.depthTest + this.depthMask + " " + this.side + " " + this.wireframe + " " + this.wireframeLinewidth + " " + this.polygonOffset + " " + this.polygonOffsetFactor + " " + this.polygonOffsetUnits + " " + this.overdraw + " " + this.shininess + " " + this.metal + " " + this.specularStrength;
			if (this.alphaTest && (t += this.alphaTest), t += " " + this.normalType + " ", t += this.repeat.x + " " + this.repeat.y + this.offset.x + " " + this.offset.y, t += " " + this.blendRange.x + " " + this.blendRange.y, t += " " + this.normalScale.x + " " + this.normalScale.y, t += " " + this.reflectRatio, this.map && (t += this.map.getUniqueCode()), this.map1 && (t += this.map1.getUniqueCode()), this.map2 && (t += this.map2.getUniqueCode()), this.blendMap && (t += this.blendMap.getUniqueCode()), this.normalMap && (t += this.normalMap.getUniqueCode()), this.lightMap && (t += this.lightMap.getUniqueCode()), this.envMap && (t += this.envMap.getUniqueCode()), this.specularMap && (t += this.specularMap.getUniqueCode()), this.alarmColor && (t += " " + this.alarmColor.getUniqueCode()), this.gradient)
				for (var e in this.gradient) t += " " + e + ":" + this.gradient[e].getUniqueCode();
			return t += " " + this.gradientType, t += " " + this.outline, t += this.combine, this._uniqueCode = t, t
		},
		loadViewMatrix: function(t, e, i) {
			("lambert" === this._type || "phong" === this._type || material.skinning) && null !== t.viewMatrix && i.uniformMatrix4fv(p_uniforms.viewMatrix, !1, e.worldMatrixInverse.elements)
		},
		onMapChanged: function(t, e) {
			if (Qe.TexturePool.useTexture(e), Qe.TexturePool.unUseTexture(t), e) {
				var i = e.getUniqueCode();
				null == Qe.TexturePool.getTexture(i) && Qe.TexturePool.setTexture(i, e)
			}
		},
		setType: function(t) {
			if (this._type !== t) {
				var e = this._type;
				this._type = t, this.firePropertyChange("type", e, t), this.onTypeChanged(e, t)
			}
		},
		onTypeChanged: function() {},
		getType: function() {
			return this._type
		},
		setStyle: function(t, e) {
			if (null != t) {
				null == this.styleMap && (this.styleMap = {});
				var i = this.styleMap[t];
				return null == e ? delete this.styleMap[t] : this.styleMap[t] = e, this.firePropertyChange(Qe.Styles.PREFIX_STYLE + t, i, e), this.onStyleChanged(t, i, e), this
			}
		},
		getStyle: function(t, e) {
			null == e && (e = !0);
			var i;
			return null != this.styleMap && (i = this.styleMap[t]), null == i && e && (i = Qe.Styles.getStyle(t)), i
		},
		clone: function(t) {
			return t = t || new Qe.EntityMaterial, Qe.Material.prototype.clone.call(this, t), t._type = this._type, t.color.copy(this.color), t.setMap(this.map, "map"), t.setMap(this.map1, "map1"), t.setMap(this.map2, "map2"), t.setMap(this.blendMap, "blendMap"), t.setMap(this.normalMap, "normalMap"), t.setMap(this.specularMap, "specularMap"), t.setMap(this.envMap, "envMap"), t.ambient.copy(this.ambient), t.emissive.copy(this.emissive), t.specular.copy(this.specular), t.shininess = this.shininess, t.metal = this.metal, t.perPixel = this.perPixel, t.wrapAround = this.wrapAround, t.wrapRGB.copy(this.wrapRGB), t.setMap(this.lightMap, "lightMap"), t.bumpMap = this.bumpMap, t.bumpScale = this.bumpScale, t.normalScale.copy(this.normalScale), t.combine = this.combine, t.reflectRatio = this.reflectRatio, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t.specularStrength = this.specularStrength, t.offset.copy(this.offset), t.repeat.copy(this.repeat), t.blendRange.copy(this.blendRange), t
		},
		refreshUniformsSpecific: function(t) {
			var e = this.uniforms;
			"lambert" === this._type ? (t ? (e.ambient.value.copyGammaToLinear(this.ambient), e.emissive.value.copyGammaToLinear(this.emissive)) : (e.ambient.value = this.ambient, e.emissive.value = this.emissive), this.wrapAround && e.wrapRGB.value.copy(this.wrapRGB)) : "phong" === this._type && (e.shininess.value = this.shininess, t ? (e.ambient.value.copyGammaToLinear(this.alarmColor ? this.alarmColor : this.ambient), e.emissive.value.copyGammaToLinear(this.emissive), e.specular.value.copyGammaToLinear(this.specular)) : (e.ambient.value = this.alarmColor ? this.alarmColor : this.ambient, e.emissive.value = this.emissive, e.specular.value = this.specular), e.uspecularStrength.value = this.specularStrength, this.wrapAround && e.wrapRGB.value.copy(this.wrapRGB))
		},
		refreshUniformsCommon: function(t) {
			if ("terrain" === this._type) {
				var e = this.uniforms;
				e.enableDiffuse1.value = this.map ? 1 : 0, e.tDiffuse1.value = this.map, e.enableDiffuse2.value = this.map1 ? 1 : 0, e.tDiffuse2.value = this.map1, e.enableDiffuse3.value = this.map2 ? 1 : 0, e.tDiffuse3.value = this.map2, e.enableDisplacement.value = this.blendMap ? 1 : 0, e.tDisplacement.value = this.blendMap, e.uRepeatOverlay.value = this.repeat, null == this.blendRangeArray && (this.blendRangeArray = [0, 1]), this.blendRangeArray[0] = this.blendRange.x, this.blendRangeArray[1] = this.blendRange.y, e.blendRange.value = this.blendRangeArray
			} else if ("outline" === this._type) {
				var e = this.uniforms;
				e.diffuse.value = this.color, e.outline_offset.value = this.outline
			} else Qe.Material.prototype.refreshUniformsCommon.call(this, t)
		}
	}), Qe.BlurMaterial = function() {
		Qe.Material.call(this), this.orientation = 0, this.blurAmount = 5, this.blurScale = 1, this.blurStrength = 1, this.useBlur = 1, this.texelSize = new Ke(512, 512), this.blurGlobalAlpha = 1
	}, Qe.extend(Qe.BlurMaterial, Qe.Material, {
		refreshUniformsCommon: function(t) {
			var e = this.uniforms;
			e.map.value = this.map, e.orientation.value = this.orientation, e.blurAmount.value = this.blurAmount, e.blurScale.value = this.blurScale, e.blurStrength.value = this.blurStrength, e.useBlur.value = this.useBlur, e.texelSize.value = this.texelSize, e.blurGlobalAlpha.value = this.blurGlobalAlpha
		},
		getShaderID: function() {
			return "blur"
		}
	}), Qe.DeferredMaterial = function(t) {
		t = t || {}, Qe.Material.call(this, t), this.linearDepth = 30, this.isNormal = t.isNormal !== e ? t.isNormal : 0
	}, Qe.extend(Qe.DeferredMaterial, Qe.Material, {
		getShaderID: function() {
			return "deferred"
		},
		refreshUniformsCommon: function(t) {
			var e = this.uniforms;
			e.linearDepth.value = this.linearDepth, e.isNormal.value = this.isNormal
		}
	}), Qe.SSAOMaterial = function(t) {
		Qe.Material.call(this), this.map1 = null, this.map2 = null, this.occluderBias = .05, this.samplingRadius = 20, this.attenuation = new Ke(1, .02), this.texelSize = new Ke(1 / 512, 1 / 512)
	}, Qe.extend(Qe.SSAOMaterial, Qe.Material, {
		getShaderID: function() {
			return "ssao"
		},
		refreshUniformsCommon: function(t) {
			var e = this.uniforms;
			e.map0.value = this.map, e.map1.value = this.map1, e.map2.value = this.map2, e.occluderBias.value = this.occluderBias, e.samplingRadius.value = this.samplingRadius, e.attenuation.value = this.attenuation, e.texelSize.value = this.texelSize
		}
	}), Qe.BasicMaterial = function(t) {
		Qe.Material.call(this), this._type = "basic", this.color = new Qe.Color(16777215), this.map = null, this.setValues(t), this.offset = new Ke(0, 0), this.repeat = new Ke(1, 1)
	}, Qe.extend(Qe.BasicMaterial, Qe.Material, {
		getShaderID: function() {
			return "basic"
		},
		clone: function() {
			var t = new Qe.BasicMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.map = this.map, t
		},
		getUniqueCode: function() {
			var t = this.color.r + this.color.g + this.color.b + " " + this.transparent + " " + this.visible + " " + this.opacity + " " + this.depthTest + this.depthMask + " " + this.side + " " + this.wireframe + " " + this.wireframeLinewidth;
			return t += this.repeat.x + " " + this.repeat.y + this.offset.x + " " + this.offset.y, this.map && (t += this.map.getUniqueCode()), t
		}
	}), Qe.LambertMaterial = function(t) {
		Qe.Material.call(this), this._type = "basic", this.color = new Qe.Color(16777215), this.ambient = new Qe.Color(16777215), this.emissive = new Qe.Color(0), this.wrapAround = !1, this.wrapRGB = new Qe.XiangliangThree(1, 1, 1), this.map = null, this.lightMap = null, this.specularMap = null, this.envMap = null, this.combine = Qe.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = Qe.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = Qe.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
	}, Qe.extend(Qe.LambertMaterial, Qe.Material, {
		clone: function() {
			var t = new Qe.LambertMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.ambient.copy(this.ambient), t.emissive.copy(this.emissive), t.wrapAround = this.wrapAround, t.wrapRGB.copy(this.wrapRGB), t.map = this.map, t.lightMap = this.lightMap, t.specularMap = this.specularMap, t.envMap = this.envMap, t.combine = this.combine, t.reflectivity = this.reflectivity, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
		},
		getShaderID: function() {
			return "lambert"
		},
		refreshUniformsSpecific: function(t) {
			var e = this.uniforms;
			t ? (e.ambient.value.copyGammaToLinear(this.ambient), e.emissive.value.copyGammaToLinear(this.emissive)) : (e.ambient.value = this.ambient, e.emissive.value = this.emissive), this.wrapAround && e.wrapRGB.value.copy(this.wrapRGB)
		}
	}), Qe.PhongMaterial = function(t) {
		Qe.Material.call(this), this._type = "basic", this.color = new Qe.Color(16777215), this.ambient = new Qe.Color(16777215), this.emissive = new Qe.Color(0), this.specular = new Qe.Color(1118481), this.shininess = 30, this.metal = !1, this.perPixel = !0, this.wrapAround = !1, this.wrapRGB = new Qe.XiangliangThree(1, 1, 1), this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new Qe.XiangliangTwo(1, 1), this.specularMap = null, this.envMap = null, this.combine = Qe.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = Qe.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = Qe.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t), this.offset = new Ke(0, 0), this.repeat = new Ke(1, 1)
	}, Qe.extend(Qe.PhongMaterial, Qe.Material, {
		getUniqueCode: function() {
			var t = "phong " + this.color.r + this.color.g + this.color.b + " " + this.transparent + " " + this.visible + " " + this.opacity + " " + this.depthTest + this.depthMask + " " + this.side + " " + this.wireframe + " " + this.wireframeLinewidth;
			return t += this.repeat.x + " " + this.repeat.y + this.offset.x + " " + this.offset.y, this.map && (t += this.map.getUniqueCode()), t
		},
		clone: function() {
			var t = new Qe.PhongMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.ambient.copy(this.ambient), t.emissive.copy(this.emissive), t.specular.copy(this.specular), t.shininess = this.shininess, t.metal = this.metal, t.perPixel = this.perPixel, t.wrapAround = this.wrapAround, t.wrapRGB.copy(this.wrapRGB), t.map = this.map, t.lightMap = this.lightMap, t.bumpMap = this.bumpMap, t.bumpScale = this.bumpScale, t.normalMap = this.normalMap, t.normalScale.copy(this.normalScale), t.specularMap = this.specularMap, t.envMap = this.envMap, t.combine = this.combine, t.reflectivity = this.reflectivity, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
		},
		getShaderID: function() {
			return "phong"
		},
		refreshUniformsSpecific: function(t) {
			var e = this.uniforms;
			e.shininess.value = this.shininess, t ? (e.ambient.value.copyGammaToLinear(this.ambient), e.emissive.value.copyGammaToLinear(this.emissive), e.specular.value.copyGammaToLinear(this.specular)) : (e.ambient.value = this.ambient, e.emissive.value = this.emissive, e.specular.value = this.specular), this.wrapAround && e.wrapRGB.value.copy(material.wrapRGB)
		}
	}), Qe.LineMaterial = function(t) {
		Qe.Material.call(this), this.color = new Qe.Color(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.dashed = !0, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(t)
	}, Qe.extend(Qe.LineMaterial, Qe.Material, {
		clone: function() {
			var t = new Qe.LineMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.linewidth = this.linewidth, t.linecap = this.linecap, t.linejoin = this.linejoin, t.dashed = this.dashed, t.scale = this.scale, t.dashSize = this.dashSize, matetial.gapSize = this.gapSize, t.vertexColors = this.vertexColors, t.fog = this.fog, t
		},
		getShaderID: function() {
			return this.dashed ? "dashed" : "basic"
		},
		refreshUniforms: function(t) {
			Re(this.uniforms, this), this.dashed && Ie(this.uniforms, this)
		}
	}), Qe.ArrayMaterial = function(t) {
		this.materials = t || []
	}, Qe.extend(Qe.ArrayMaterial, Object, {
		clone: function() {
			for (var t = new Qe.ArrayMaterial, e = 0; e < this.materials.length; e++) {
				var i = this.materials[e],
					r = this.materials.indexOf(i);
				null != t.materials[r] ? t.materials.push(t.materials[r]) : t.materials.push(i.clone())
			}
			return t
		}
	}), Qe.BillboardMaterial = function(t) {
		Qe.Material.call(this), this.alignment = Qe.BillboardAlignment.center.clone(), this.fog = !1, this.color = new Qe.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.uvOffset = new Qe.XiangliangTwo(0, 0), this.uvScale = new Qe.XiangliangTwo(1, 1), this.transparent = !0, this.setValues(t), this.depthMask = !0, this.vertical = !1, this.alphaTest = .5
	}, Qe.extend(Qe.BillboardMaterial, Qe.Material, {
		clone: function(t) {
			return t = t ? t : new Qe.BillboardMaterial, Qe.Material.prototype.clone.call(this, t), t.alignment.copy(this.alignment), t.color.copy(this.color), t.map = this.map, t.rotation = this.rotation, t.uvOffset.copy(this.uvOffset), t.uvScale.copy(this.uvScale), t.fog = this.fog, t.vertical = this.vertical, t.transparent = this.transparent, t.alphaTest = this.alphaTest, t
		},
		getUniqueCode: function() {
			var t = "Billboard " + this.color.r + this.color.g + this.color.b + " " + this.transparent + " " + this.visible + " " + this.opacity + " " + this.depthTest + this.depthMask + " " + this.side + " " + this.wireframe + " " + this.wireframeLinewidth;
			return t += this.vertical + " " + this.alphaTest + " " + this.alignment.x + " " + this.alignment.y, this.map && (t += this.map.getUniqueCode()), t
		}
	}), Qe.BillboardAlignment = {}, Qe.BillboardAlignment.topLeft = new Qe.XiangliangTwo(.5, -.5), Qe.BillboardAlignment.topCenter = new Qe.XiangliangTwo(0, -.5), Qe.BillboardAlignment.topRight = new Qe.XiangliangTwo(-.5, -.5), Qe.BillboardAlignment.centerLeft = new Qe.XiangliangTwo(.5, 0), Qe.BillboardAlignment.center = new Qe.XiangliangTwo(0, 0), Qe.BillboardAlignment.centerRight = new Qe.XiangliangTwo(-.5, 0), Qe.BillboardAlignment.bottomLeft = new Qe.XiangliangTwo(.5, .5), Qe.BillboardAlignment.bottomCenter = new Qe.XiangliangTwo(0, .5), Qe.BillboardAlignment.bottomRight = new Qe.XiangliangTwo(-.5, .5);
	var Ki = function(t) {
		Qe.Material.call(this), this.fragmentShader = "void main() {}", this.vertexShader = "void main() {}", this.uniforms = {}, this.defines = {}, this.attributes = null, this.shaderID = t.shaderID || "depth", this._type = "shader", this.shading = Qe.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.vertexColors = Qe.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.defaultAttributeValues = {
			color: [1, 1, 1],
			uv: [0, 0],
			uv2: [0, 0]
		}, this.index0AttributeName = "position", this.setValues(t)
	};
	Qe.ShaderMaterial = Ki, Qe.extend(Qe.ShaderMaterial, Qe.Material, {
		clone: function() {
			var t = new Qe.ShaderMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.fragmentShader = this.fragmentShader, t.vertexShader = this.vertexShader, t.uniforms = Qe.UniformsUtils.clone(this.uniforms), t.attributes = this.attributes, t.defines = this.defines, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.fog = this.fog, t.lights = this.lights, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
		},
		needUV: function() {
			return !0
		},
		getShaderID: function() {
			return null
		},
		refreshUniformsCommon: function(t, e) {}
	}), Qe.TransformGizmoMaterial = function(t) {
		Qe.BasicMaterial.call(this), this.depthTest = !1, this.depthMask = !1, this.side = Qe.DoubleSide, this.transparent = !0, this.setValues(t)
	}, Qe.extend(Qe.TransformGizmoMaterial, Qe.BasicMaterial, {
		getUniqueCode: function() {
			var t = this.id + "TransformGizmo " + this.color.r + this.color.g + this.color.b + " " + this.transparent + " " + this.visible + " " + this.opacity + " " + this.depthTest + this.depthMask + " " + this.side + " " + this.wireframe + " " + this.wireframeLinewidth;
			return this.map && (t += this.map.getUniqueCode()), t
		}
	});
	var Ji = {
		pools: {},
		useTimes: {},
		size: 0,
		getMaterial: function(t) {
			return Ji.pools[t]
		},
		setMaterial: function(t, e) {
			Ji.size++, Ji.pools[t] = e
		},
		useMaterial: function(t) {
			if (t) {
				var e = t.id,
					i = Ji.useTimes[e] || 0;
				i++, Ji.useTimes[e] = i
			}
		},
		unUseMaterial: function(t) {
			if (t) {
				var e = t.id,
					i = Ji.useTimes[e] || 0;
				if (i--, Ji.useTimes[e] = i, 0 >= i) {
					var r = t.getUniqueCode();
					delete Ji.pools[r], Ji.size--, t.dispose()
				}
			}
		}
	};
	Qe.MaterialPool = Ji, Ji.DefaultMaterial = new Qe.EntityMaterial, Ji.TestMaterial = new Qe.EntityMaterial, Ji.DefaultBillBoardMaterial = new Qe.BillboardMaterial, Ji.DefaultLineMaterial = new Qe.LineMaterial;
	Qe.ParticleMaterial = function(t) {
		Qe.Material.call(this), this.color = new Qe.Color(16777215), this.map = null, this.size = 2, this.sizeAttenuation = !1, this.vertexColors = !1, this.fog = !0, this.setValues(t)
	}, Qe.extend(Qe.ParticleMaterial, Qe.Material, {
		clone: function() {
			var t = new Qe.ParticleMaterial;
			return Qe.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.map = this.map, t.size = this.size, t.sizeAttenuation = this.sizeAttenuation, t.vertexColors = this.vertexColors, t.fog = this.fog, t
		},
		getShaderID: function() {
			return this.shaderID = "particle_basic", this.shaderID
		},
		refreshUniforms: function(t) {
			Fe(this.uniforms, this)
		}
	}), Qe.Light = function(t, e) {
		Qe.Element.call(this, e), this.color = new Qe.Color(t), this.ambient = new Qe.Color, this.diffuse = new Qe.Color, this.specular = new Qe.Color, this.castShadow = !1, this.onlyShadow = !1
	}, Qe.extend(Qe.Light, Qe.Element, {
		__accessor: ["color", "ambient", "diffuse", "specular"],
		constructor: Qe.Light,
		className: "TGL.Light",
		setCastShadow: function(t) {
			this.castShadow = t
		},
		setOnlyShadow: function(t) {
			this.onlyShadow = t
		},
		refreshShadowUniforms: function(t, e) {
			var i = this;
			return t.shadowMatrix && i.castShadow && (i instanceof Qe.SpotLight || i instanceof Qe.DirectionalLight && !i.shadowCascade) ? (t.shadowMap.value[e] = i.shadowMap, t.shadowMapSize.value[e] = i.shadowMapSize, t.shadowMatrix.value[e] = i.shadowMatrix, t.shadowDarkness.value[e] = i.shadowDarkness, t.shadowBias.value[e] = i.shadowBias, !0) : void 0
		},
		refreshUniformsPointShadow: function(t, e) {
			var i = this;
			return t.pShadowMap && i.castShadow && i instanceof Qe.PointLight ? (t.pShadowMap.value[e] = i.shadowMap,
				t.pShadowMapSize.value[e] = i.shadowMapSize, t.pShadowDarkness.value[e] = i.shadowDarkness || .5, t.pPosition.value[e] = i.getPosition(), !0) : void 0
		}
	}), Qe.PositionLight = function() {}, Qe.PointLight = function(t, i, r, a) {
		if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
			var n = arguments[0];
			t = n.hex, i = n.intensity, r = n.intensity, a = n.id
		}
		Qe.Light.call(this, t, a), this.position = new Qe.XiangliangThree(0, 0, 0), this.intensity = i !== e ? i : 1, this.distance = r !== e ? r : 0, this.shadowGleyeNear = 10, this.shadowGleyeFar = 1e4, this.shadowMapWidth = 512, this.shadowMapHeight = 512
	}, Qe.extend(Qe.PointLight, Qe.Light, {
		constructor: Qe.PointLight,
		className: "TGL.PointLight",
		__accessor: ["intensity", "distance"]
	}), Qe.SpotLight = function(t, i, r, a, n) {
		Qe.Light.call(this, t), this._position = new Qe.XiangliangThree(0, 1, 0), this.target = new Qe.Element, this.intensity = i !== e ? i : 1, this.distance = r !== e ? r : 0, this.angle = a !== e ? a : Math.PI / 2, this.exponent = n !== e ? n : 10, this.shadowGleyeNear = 100, this.shadowGleyeFar = 5e3, this.shadowGleyeFov = 50, this.shadowGleyeVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowGleye = null, this.shadowMatrix = null
	}, Qe.extend(Qe.SpotLight, Qe.Light, {
		__accessor: ["color", "ambient", "diffuse", "specular", "intensity", "distance", "angle", "exponent"],
		constructor: Qe.SpotLight,
		className: "TGL.SpotLight"
	}), Qe.DirectionalLight = function(t, i, r) {
		if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
			var a = arguments[0];
			t = a.hex, i = a.intensity, r = a.id
		}
		Qe.Light.call(this, t, r), this.direction = new Qe.XiangliangThree(0, 1, 0), this.position = new Qe.XiangliangThree(0, 1, 0), this.target = new Qe.Element, this.intensity = i !== e ? i : 1, this.shadowGleyeNear = 50, this.shadowGleyeFar = 5e3, this.shadowGleyeLeft = -500, this.shadowGleyeRight = 500, this.shadowGleyeTop = 500, this.shadowGleyeBottom = -500, this.shadowGleyeVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new Qe.XiangliangThree(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowGleye = null, this.shadowMatrix = null
	}, Qe.extend(Qe.DirectionalLight, Qe.Light, {
		className: "TGL.DirectionalLight"
	}), Qe.AmbientLight = function(t, e) {
		if (1 === arguments.length && arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
			var i = arguments[0];
			t = i.hex, e = i.id
		}
		Qe.Light.call(this, t, e)
	}, Qe.extend(Qe.AmbientLight, Qe.Light, {
		constructor: Qe.AmbientLight,
		className: "TGL.AmbientLight",
		clone: function() {
			var t = new Qe.AmbientLight;
			return Qe.Light.prototype.clone.call(this, t), t
		}
	}), Qe.Gleye = function() {
		Qe.Element.call(this), this.projectionMatrix = new Qe.Mat4, this.projectionMatrixInverse = new Qe.Mat4, this.worldMatrixInverse = new Qe.Mat4, this.target = new Qe.XiangliangThree, this.setPosition(0, 0, 500)
	}, Qe.extend(Qe.Gleye, Qe.Element, {
		constructor: Qe.Gleye,
		updateGleyeMatrix: function(t) {
			var e = this.matrix.clone();
			this.matrix.lookAt(this._position, this.target, this.up), this.rotationAutoUpdate && this._rotation.setEulerFromRotationMatrix(this.matrix), !e.equals(this.matrix) && t && this.firePropertyChange("matrix", e, this.matrix)
		},
		lookAt: function(t, i) {
			i === e && (i = !0), this.target = t, this.updateGleyeMatrix(i)
		},
		look: function(t) {
			this.lookAt(t, !0)
		},
		onUpChanged: function(t, e) {
			this.updateGleyeMatrix()
		},
		getTarget: function() {
			return this.target
		},
		t: function() {
			return this.getTarget()
		},
		getDistance: function() {
			return (new Je).subVectors(this._position, this.target).length()
		},
		lookAtElement: function(t, e, i) {
			e instanceof Je ? (i = e, e = this.getDistance()) : i = i || new Je(0, 0, 1), t instanceof Qe.Element && (e = e ? e : this.getDistance(), this.setPosition(t.worldPosition(i, e)), this.look(t.getWorldPosition()))
		}
	}), Qe.OrthoGleye = function(t, e, i, r) {
		Qe.Gleye.call(this), this.width = t || 1, this.aspect = e || 1, this.near = i || .1, this.far = r || 1e4, this.updateProjectionMatrix()
	}, Qe.extend(Qe.OrthoGleye, Qe.Gleye, {
		constructor: Qe.OrthoGleye,
		className: "TGL.OrthoGleye",
		__accessor: ["width", "aspect", "near", "far"],
		updateProjectionMatrix: function() {
			var t = this.getDistance(),
				e = t * this.width / 2,
				i = -e,
				r = t / this.aspect * this.width / 2,
				a = -r;
			this.projectionMatrix.makeOrthographic(i, e, r, a, this.near, this.far)
		},
		onPropertyChange: function() {
			this.updateProjectionMatrix()
		},
		updateGleyeMatrix: function(t) {
			Qe.Gleye.prototype.updateGleyeMatrix.call(this, t), this.updateProjectionMatrix()
		}
	}), Qe.PerspectiveGleye = function(t, i, r, a) {
		Qe.Gleye.call(this), this.fov = t !== e ? t : 50, this.aspect = i !== e ? i : 1, this.near = r !== e ? r : .1, this.far = a !== e ? a : 1e4, this.updateProjectionMatrix()
	}, Qe.extend(Qe.PerspectiveGleye, Qe.Gleye, {
		constructor: Qe.PerspectiveGleye,
		className: "TGL.PerspectiveGleye",
		__accessor: ["fov", "aspect", "near", "far"],
		updateProjectionMatrix: function() {
			this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
		},
		onPropertyChange: function() {
			this.updateProjectionMatrix()
		}
	}), Qe.GleyeHelper = function(t) {
		function i(t, e, i) {
			r(t, i), r(e, i)
		}

		function r(t, i) {
			a.vertices.push(new Qe.XiangliangThree), a.colors.push(new Qe.Color(i)), s[t] === e && (s[t] = []), s[t].push(a.vertices.length - 1)
		}
		var a = new Qe.Entity,
			n = new Qe.LineMaterial({
				color: 16777215,
				vertexColors: Qe.FaceColors
			}),
			s = {},
			o = 16755200,
			l = 16711680,
			h = 43775,
			c = 16777215,
			u = 3355443;
		i("n1", "n2", o), i("n2", "n4", o), i("n4", "n3", o), i("n3", "n1", o), i("f1", "f2", o), i("f2", "f4", o), i("f4", "f3", o), i("f3", "f1", o), i("n1", "f1", o), i("n2", "f2", o), i("n3", "f3", o), i("n4", "f4", o), i("p", "n1", l), i("p", "n2", l), i("p", "n3", l), i("p", "n4", l), i("u1", "u2", h), i("u2", "u3", h), i("u3", "u1", h), i("c", "t", c), i("p", "c", u), i("cn1", "cn2", u), i("cn3", "cn4", u), i("cf1", "cf2", u), i("cf3", "cf4", u), Qe.Line.call(this, a.vertices, a.colors, n, Qe.LinePieces), this.gleye = t, this.worldMatrix = t.worldMatrix, this.matrixAutoUpdate = !1, this.pointMap = s, this.update()
	}, Qe.GleyeHelper.prototype = Object.create(Qe.Line.prototype), Qe.GleyeHelper.prototype.update = function() {
		var t = new Qe.XiangliangThree,
			i = new Qe.Gleye,
			r = new Qe.Projector;
		return function() {
			function a(a, s, o, l) {
				t.set(s, o, l), r.unprojectVector(t, i);
				var h = n.pointMap[a];
				if (h !== e)
					for (var c = 0, u = h.length; u > c; c++) n.vertices[h[c]].copy(t)
			}
			var n = this,
				s = 1,
				o = 1;
			i.projectionMatrix.copy(this.gleye.projectionMatrix), a("c", 0, 0, -1), a("t", 0, 0, 1), a("n1", -s, -o, -1), a("n2", s, -o, -1), a("n3", -s, o, -1), a("n4", s, o, -1), a("f1", -s, -o, 1), a("f2", s, -o, 1), a("f3", -s, o, 1), a("f4", s, o, 1), a("u1", .7 * s, 1.1 * o, -1), a("u2", .7 * -s, 1.1 * o, -1), a("u3", 0, 2 * o, -1), a("cf1", -s, 0, 1), a("cf2", s, 0, 1), a("cf3", 0, -o, 1), a("cf4", 0, o, 1), a("cn1", -s, 0, -1), a("cn2", s, 0, -1), a("cn3", 0, -o, -1), a("cn4", 0, o, -1), this.verticesNeedUpdate = !0
		}
	}();
	var $i = function() {
		Qe.Element.call(this)
	};
	$i.prototype = Object.create(Qe.Element.prototype), $i.prototype.updateworldMatrix = function(t) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.worldMatrixNeedsUpdate || t) && (this._parent ? (this.worldMatrix.multiplyMatrices(this._parent.worldMatrix, this.matrix), this.worldMatrix.decompose(this.translationWorld, this.QuatWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.QuatObject, this.scaleObject), this.worldMatrix.compose(this.translationWorld, this.QuatObject, this.scaleWorld)) : this.worldMatrix.copy(this.matrix), this.worldMatrixNeedsUpdate = !1, t = !0);
		for (var e = 0, i = this.getChildren().size(); i > e; e++) this.getChildren().get(e).updateworldMatrix(t)
	}, $i.prototype.translationWorld = new Qe.XiangliangThree, $i.prototype.translationObject = new Qe.XiangliangThree, $i.prototype.QuatWorld = new Qe.Quat, $i.prototype.QuatObject = new Qe.Quat, $i.prototype.scaleWorld = new Qe.XiangliangThree, $i.prototype.scaleObject = new Qe.XiangliangThree;
	var tr = function() {
		function t(t, e) {
			var i = new Qe.DirectionalLight;
			i.isVirtual = !0, i.onlyShadow = !0, i.castShadow = !0, i.shadowGleyeNear = t.shadowGleyeNear, i.shadowGleyeFar = t.shadowGleyeFar, i.shadowGleyeLeft = t.shadowGleyeLeft, i.shadowGleyeRight = t.shadowGleyeRight, i.shadowGleyeBottom = t.shadowGleyeBottom, i.shadowGleyeTop = t.shadowGleyeTop, i.shadowGleyeVisible = t.shadowGleyeVisible, i.shadowDarkness = t.shadowDarkness, i.shadowBias = t.shadowCascadeBias[e], i.shadowMapWidth = t.shadowCascadeWidth[e], i.shadowMapHeight = t.shadowCascadeHeight[e], i.pointsWorld = [], i.pointsFrustum = [];
			for (var r = i.pointsWorld, a = i.pointsFrustum, n = 0; 8 > n; n++) r[n] = new Qe.XiangliangThree, a[n] = new Qe.XiangliangThree;
			var s = t.shadowCascadeNearZ[e],
				o = t.shadowCascadeFarZ[e];
			return a[0].set(-1, -1, s), a[1].set(1, -1, s), a[2].set(-1, 1, s), a[3].set(1, 1, s), a[4].set(-1, -1, o), a[5].set(1, -1, o), a[6].set(-1, 1, o), a[7].set(1, 1, o), i
		}

		function i(t, e) {
			var i = t.shadowCascadeArray[e];
			i.position.copy(t.position), i.target.position.copy(t.target.position), i.lookAt(i.target), i.shadowGleyeVisible = t.shadowGleyeVisible, i.shadowDarkness = t.shadowDarkness, i.shadowBias = t.shadowCascadeBias[e];
			var r = t.shadowCascadeNearZ[e],
				a = t.shadowCascadeFarZ[e],
				n = i.pointsFrustum;
			n[0].z = r, n[1].z = r, n[2].z = r, n[3].z = r, n[4].z = a, n[5].z = a, n[6].z = a, n[7].z = a
		}

		function r(t, e) {
			var i = e.shadowGleye,
				r = e.pointsFrustum,
				a = e.pointsWorld;
			p.set(1 / 0, 1 / 0, 1 / 0), d.set(-(1 / 0), -(1 / 0), -(1 / 0));
			for (var n = 0; 8 > n; n++) {
				var s = a[n];
				s.copy(r[n]), tr.__projector.unprojectVector(s, t), s.applyMatrix4(i.worldMatrixInverse), s.x < p.x && (p.x = s.x), s.x > d.x && (d.x = s.x), s.y < p.y && (p.y = s.y), s.y > d.y && (d.y = s.y), s.z < p.z && (p.z = s.z), s.z > d.z && (d.z = s.z)
			}
			i.left = p.x, i.right = d.x, i.top = d.y, i.bottom = p.y, i.updateProjectionMatrix()
		}

		function a(t) {
			return t.material instanceof Qe.ArrayMaterial ? t.material.materials[0] : t.material
		}
		var n, s, o, l, h, c, u = new Qe.Frustum,
			f = new Qe.Mat4,
			p = new Qe.XiangliangThree,
			d = new Qe.XiangliangThree,
			m = new Qe.XiangliangThree;
		this.init = function(t) {
			n = t._gl, s = t;
			var e = Qe.ShaderLib.depthRGBA,
				i = Qe.UniformsUtils.clone(e.uniforms);
			o = new Ki({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: i
			}), _depthCubeMaterial = new Ki({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: i,
				refreshUniformsCommon: function(t) {
					this.uniforms.isCube.value = 1
				}
			}), l = new Ki({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: i,
				morphTargets: !0
			}), h = new Ki({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: i,
				skinning: !0
			}), c = new Ki({
				fragmentShader: e.fragmentShader,
				vertexShader: e.vertexShader,
				uniforms: i,
				morphTargets: !0,
				skinning: !0
			}), o._shadowPass = !0, l._shadowPass = !0, h._shadowPass = !0, c._shadowPass = !0
		}, this.render = function(t, e) {
			s._shadowMapEnable && this.update(t, e)
		}, this.update = function(p, d) {
			var g, y, v, x, A, w, _, S, b, M, C, P, T, z, L = [],
				E = 0;
			n.clearColor(1, 1, 1, 1), n.disable(n.BLEND), n.enable(n.CULL_FACE), n.frontFace(n.CCW), s.shadowMapCullFace === Qe.CullFaceFront ? n.cullFace(n.FRONT) : n.cullFace(n.BACK), s.setDepthTest(!0);
			var D = p.getLights();
			for (g = 0, y = D.size(); y > g; g++)
				if (T = D.get(g), T.castShadow)
					if (T instanceof Qe.DirectionalLight && T.shadowCascade)
						for (A = 0; A < T.shadowCascadeCount; A++) {
							var B;
							if (T.shadowCascadeArray[A]) B = T.shadowCascadeArray[A];
							else {
								B = t(T, A), B.originalGleye = d;
								var N = new $i;
								N.position = T.shadowCascadeOffset, N.add(B), N.add(B.target), d.add(N), T.shadowCascadeArray[A] = B
							}
							i(T, A), L[E] = B, E++
						} else L[E] = T, E++;
			for (g = 0, y = L.length; y > g; g++) {
				if (T = L[g], !T.shadowMap) {
					var R = Qe.LinearFilter;
					s.shadowMapType === Qe.PCFSoftShadowMap && (R = Qe.NearestFilter);
					var I = {
						minFilter: R,
						magFilter: R,
						format: Qe.RGBAFormat
					};
					T instanceof Qe.PointLight ? (T.shadowMap = new bi(T.shadowMapWidth, T.shadowMapHeight, I), T.shadowMapSize = new Ke(T.shadowMapWidth, T.shadowMapHeight), T.shadowMatrix = new Qe.Mat4) : (T.shadowMap = new Si(T.shadowMapWidth, T.shadowMapHeight, I), T.shadowMapSize = new Ke(T.shadowMapWidth, T.shadowMapHeight), T.shadowMatrix = new Qe.Mat4)
				}
				if (!T.shadowGleye) {
					if (T instanceof Qe.SpotLight) T.shadowGleye = new Qe.PerspectiveGleye(T.shadowGleyeFov, T.shadowMapWidth / T.shadowMapHeight, T.shadowGleyeNear, T.shadowGleyeFar);
					else if (T instanceof Qe.DirectionalLight) T.shadowGleye = new Qe.OrthoGleye(T.shadowGleyeLeft, T.shadowGleyeRight, T.shadowGleyeTop, T.shadowGleyeBottom, T.shadowGleyeNear, T.shadowGleyeFar);
					else {
						if (!(T instanceof Qe.PointLight)) {
							console.error("Unsupported light type for shadow");
							continue
						}
						T.shadowGleye = new Qe.PerspectiveGleye(90, 1, T.shadowGleyeNear, T.shadowGleyeFar)
					}
					T.shadowGleye.updateWorldMatrix();
					for (var F, V = p.getRoots(), U = V.size(), k = 0; U > k; k++) F = V.get(k), F.updateWorldMatrix()
				}
				T.shadowGleyeVisible && !T.gleyeHelper && (T.gleyeHelper = new Qe.GleyeHelper(T.shadowGleye), T.shadowGleye.addChild(T.gleyeHelper), T.shadowGleye.updateWorldMatrix(!0), s.helperBox.add(T.shadowGleye), s.helperBox.add(T.gleyeHelper)), T.isVirtual && B.originalGleye == d && r(d, T);
				for (var O = T instanceof Qe.PointLight ? 6 : 1, X = [new Je(1, 0, 0), new Je(-1, 0, 0), new Je(0, 1, 0), new Je(0, -1, 0), new Je(0, 0, 1), new Je(0, 0, -1)], E = 0; O > E; E++)
					if (null == T.debugFace || E == T.debugFace) {
						for (w = T.shadowMap, _ = T.shadowMatrix, S = T.shadowGleye, S._position.setFromMatrixPosition(T.worldMatrix), T.target ? m.setFromMatrixPosition(T.target.worldMatrix) : m = S._position.clone().add(X[E]), S.lookAt(m), S.updateWorldMatrix(!0), S.worldMatrixInverse.getInverse(S.worldMatrix), T.gleyeHelper && (T.gleyeHelper.visible = T.shadowGleyeVisible), T.shadowGleyeVisible && T.gleyeHelper.update(), _.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), _.multiply(S.projectionMatrix), _.multiply(S.worldMatrixInverse), f.multiplyMatrices(S.projectionMatrix, S.worldMatrixInverse), u.setFromMatrix(f), w.activeCubeFace = E, s.debugPointLight == e && s.setRenderTarget(w), s.clear(), z = s.glNodeList, v = 0, x = z.length; x > v; v++) C = z[v], P = C.node, C.render = !1, P._visible && P.castShadow && (!(P instanceof Qe.Node || P instanceof Qe.Particle) || !P.frustumCulled || u.intersectsObject(P)) && (P._modelViewMatrix.multiplyMatrices(S.worldMatrixInverse, P.worldMatrix), C.render = !0);
						var G, W, H;
						for (v = 0, x = z.length; x > v; v++) C = z[v], C.render && (P = C.node, b = C.group, G = a(P), W = !1, H = !1, M = P.customDepthMaterial ? P.customDepthMaterial : H ? W ? c : h : W ? l : 1 == O ? o : _depthCubeMaterial, P instanceof Qe.BufferNode || s.renderGroup(S, p.getLights(), M, b, P))
					}
			}
			var j = s.getClearColor(),
				q = s.getClearAlpha();
			n.clearColor(j.r, j.g, j.b, q), n.enable(n.BLEND), s.shadowMapCullFace === Qe.CullFaceFront && n.cullFace(n.BACK)
		}
	};
	tr.__projector = new Qe.Projector, Qe.Picking = function(t, e, i, r, a, n) {
		this.gl3dview = n, this.origin = t, this.gleyeUp = i, this.direction = e, this.near = r || 0, this.far = a || 1 / 0, this.ray = new Qe.Ray(t, e), this.ray.direction.length > 0 && this.ray.direction.normalize()
	}, Qe.Picking.testPlane = new Qe.Plane(1, 1), Qe.Picking.prototype = {
		constructor: Qe.Picking,
		precision: 1e-4,
		linePrecision: 2,
		matrixPosition: new Qe.XiangliangThree,
		set: function(t, e) {
			this.origin = t, this.direction = e, this.ray.set(t, e), this.ray.direction.length > 0 && this.ray.direction.normalize()
		},
		intersectObject: function(t, e, i) {
			var r = [];
			return e === !0 && ke(t, this, r, i), Ue(t, this, r, i), r.sort(Ve), r
		},
		intersectObjects: function(t, e, i) {
			t._as && (t = t._as);
			for (var r = [], a = 0, n = t.length; n > a; a++) Ue(t[a], this, r, i, this.gl3dview), e === !0 && ke(t[a], this, r, i, this.gl3dview);
			return r.sort(Ve), r
		}
	};
	var er = new Qe.Ray,
		ir = new Qe.Mat4,
		rr = new Qe.math.Plane,
		ar = new Qe.XiangliangThree,
		nr = new Qe.BoundingSphere,
		sr = function(t) {
			arguments.length > 0 && this.init(t)
		};
	sr.prototype.init = function(t) {
		this.status = t, this.points = new Array
	}, sr.prototype.appendPoint = function(t) {
		this.points.push(t)
	}, sr.prototype.appendPoints = function(t) {
		this.points = this.points.concat(t)
	}, sr.intersectShapes = function(t, e) {
		var i, r = t.getIntersectionParams(),
			a = e.getIntersectionParams();
		if (null != r && null != a)
			if ("Path" == r.name) i = sr.intersectPathShape(t, e);
			else if ("Path" == a.name) i = sr.intersectPathShape(e, t);
		else {
			var n, s;
			if (r.name < a.name ? (n = "intersect" + r.name + a.name, s = r.params.concat(a.params)) : (n = "intersect" + a.name + r.name, s = a.params.concat(r.params)), !(n in sr)) throw new Error("Intersection not available: " + n);
			i = sr[n].apply(null, s)
		} else i = new sr("No Intersection");
		return i
	}, sr.intersectPathShape = function(t, e) {
		return t.intersectShape(e)
	}, sr.intersectBezier2Bezier2 = function(t, e, i, r, a, n) {
		var s, o, l, h, c, u, f, p, d, m = new sr("No Intersection");
		if (s = e.multiply(-2), l = t.add(s.add(i)), s = t.multiply(-2), o = e.multiply(2), h = s.add(o), c = new Ke(t.x, t.y), s = a.multiply(-2), u = r.add(s.add(n)), s = r.multiply(-2), o = a.multiply(2), f = s.add(o), p = new Ke(r.x, r.y), 0 == l.y) {
			var g = l.x * (c.y - p.y),
				y = g - h.x * h.y,
				v = g + y,
				x = h.y * h.y;
			d = new Polynomial(l.x * u.y * u.y, 2 * l.x * f.y * u.y, l.x * f.y * f.y - u.x * x - u.y * g - u.y * y, -f.x * x - f.y * g - f.y * y, (c.x - p.x) * x + (c.y - p.y) * y)
		} else {
			var g = l.x * u.y - l.y * u.x,
				y = l.x * f.y - f.x * l.y,
				v = h.x * l.y - h.y * l.x,
				x = c.y - p.y,
				A = l.y * (c.x - p.x) - l.x * x,
				w = -h.y * v + l.y * A,
				_ = v * v;
			d = new Polynomial(g * g, 2 * g * y, (-u.y * _ + l.y * y * y + l.y * g * A + g * w) / l.y, (-f.y * _ + l.y * y * A + y * w) / l.y, (x * _ + A * w) / l.y)
		}
		for (var S = d.getRoots(), b = 0; b < S.length; b++) {
			var M = S[b];
			if (M >= 0 && 1 >= M) {
				var C = new Polynomial(l.x, h.x, c.x - p.x - M * f.x - M * M * u.x).getRoots(),
					P = new Polynomial(l.y, h.y, c.y - p.y - M * f.y - M * M * u.y).getRoots();
				if (C.length > 0 && P.length > 0) {
					var T = 1e-4;
					t: for (var z = 0; z < C.length; z++) {
						var L = C[z];
						if (L >= 0 && 1 >= L)
							for (var E = 0; E < P.length; E++)
								if (Math.abs(L - P[E]) < T) {
									m.points.push(u.multiply(M * M).add(f.multiply(M).add(p)));
									break t
								}
					}
				}
			}
		}
		return m.points.length > 0 && (m.status = "$Intersection"), m
	}, sr.intersectBezier2Bezier3 = function(t, e, i, r, a, n, s) {
		var o, l, h, c, u, f, p, d, m, g, y, v = new sr("No Intersection");
		o = e.multiply(-2), u = t.add(o.add(i)), o = t.multiply(-2), l = e.multiply(2), f = o.add(l), p = new Ke(t.x, t.y), o = r.multiply(-1), l = a.multiply(3), h = n.multiply(-3), c = o.add(l.add(h.add(s))), d = new Vector2D(c.x, c.y), o = r.multiply(3), l = a.multiply(-6), h = n.multiply(3), c = o.add(l.add(h)), m = new Vector2D(c.x, c.y), o = r.multiply(-3), l = a.multiply(3), h = o.add(l), g = new Vector2D(h.x, h.y), y = new Vector2D(r.x, r.y);
		for (var x = p.x * p.x, A = p.y * p.y, w = f.x * f.x, _ = f.y * f.y, S = u.x * u.x, b = u.y * u.y, M = y.x * y.x, C = y.y * y.y, P = g.x * g.x, T = g.y * g.y, z = m.x * m.x, L = m.y * m.y, E = d.x * d.x, D = d.y * d.y, B = new Polynomial(-2 * u.x * u.y * d.x * d.y + S * D + b * E, -2 * u.x * u.y * m.x * d.y - 2 * u.x * u.y * m.y * d.x + 2 * b * m.x * d.x + 2 * S * m.y * d.y, -2 * u.x * g.x * u.y * d.y - 2 * u.x * u.y * g.y * d.x - 2 * u.x * u.y * m.x * m.y + 2 * g.x * b * d.x + b * z + S * (2 * g.y * d.y + L), 2 * p.x * u.x * u.y * d.y + 2 * p.y * u.x * u.y * d.x + f.x * f.y * u.x * d.y + f.x * f.y * u.y * d.x - 2 * y.x * u.x * u.y * d.y - 2 * u.x * y.y * u.y * d.x - 2 * u.x * g.x * u.y * m.y - 2 * u.x * u.y * g.y * m.x - 2 * p.x * b * d.x - 2 * p.y * S * d.y + 2 * y.x * b * d.x + 2 * g.x * b * m.x - _ * u.x * d.x - w * u.y * d.y + S * (2 * y.y * d.y + 2 * g.y * m.y), 2 * p.x * u.x * u.y * m.y + 2 * p.y * u.x * u.y * m.x + f.x * f.y * u.x * m.y + f.x * f.y * u.y * m.x - 2 * y.x * u.x * u.y * m.y - 2 * u.x * y.y * u.y * m.x - 2 * u.x * g.x * u.y * g.y - 2 * p.x * b * m.x - 2 * p.y * S * m.y + 2 * y.x * b * m.x - _ * u.x * m.x - w * u.y * m.y + P * b + S * (2 * y.y * m.y + T), 2 * p.x * u.x * u.y * g.y + 2 * p.y * u.x * g.x * u.y + f.x * f.y * u.x * g.y + f.x * f.y * g.x * u.y - 2 * y.x * u.x * u.y * g.y - 2 * u.x * y.y * g.x * u.y - 2 * p.x * g.x * b - 2 * p.y * S * g.y + 2 * y.x * g.x * b - _ * u.x * g.x - w * u.y * g.y + 2 * S * y.y * g.y, -2 * p.x * p.y * u.x * u.y - p.x * f.x * f.y * u.y - p.y * f.x * f.y * u.x + 2 * p.x * u.x * y.y * u.y + 2 * p.y * y.x * u.x * u.y + f.x * y.x * f.y * u.y + f.x * f.y * u.x * y.y - 2 * y.x * u.x * y.y * u.y - 2 * p.x * y.x * b + p.x * _ * u.x + p.y * w * u.y - 2 * p.y * S * y.y - y.x * _ * u.x - w * y.y * u.y + x * b + A * S + M * b + S * C), N = B.getRootsInInterval(0, 1), R = 0; R < N.length; R++) {
			var I = N[R],
				F = new Polynomial(u.x, f.x, p.x - y.x - I * g.x - I * I * m.x - I * I * I * d.x).getRoots(),
				V = new Polynomial(u.y, f.y, p.y - y.y - I * g.y - I * I * m.y - I * I * I * d.y).getRoots();
			if (F.length > 0 && V.length > 0) {
				var U = 1e-4;
				t: for (var k = 0; k < F.length; k++) {
					var O = F[k];
					if (O >= 0 && 1 >= O)
						for (var X = 0; X < V.length; X++)
							if (Math.abs(O - V[X]) < U) {
								v.points.push(d.multiply(I * I * I).add(m.multiply(I * I).add(g.multiply(I).add(y))));
								break t
							}
				}
			}
		}
		return v.points.length > 0 && (v.status = "Intersection"), v
	}, sr.intersectBezier2Circle = function(t, e, i, r, a) {
		return sr.intersectBezier2Ellipse(t, e, i, r, a, a)
	}, sr.intersectBezier2Ellipse = function(t, e, i, r, a, n) {
		var s, o, l, h, c, u = new sr("No Intersection");
		s = e.multiply(-2), l = t.add(s.add(i)), s = t.multiply(-2), o = e.multiply(2), h = s.add(o), c = new Ke(t.x, t.y);
		for (var f = a * a, p = n * n, d = new Polynomial(p * l.x * l.x + f * l.y * l.y, 2 * (p * l.x * h.x + f * l.y * h.y), p * (2 * l.x * c.x + h.x * h.x) + f * (2 * l.y * c.y + h.y * h.y) - 2 * (p * r.x * l.x + f * r.y * l.y), 2 * (p * h.x * (c.x - r.x) + f * h.y * (c.y - r.y)), p * (c.x * c.x + r.x * r.x) + f * (c.y * c.y + r.y * r.y) - 2 * (p * r.x * c.x + f * r.y * c.y) - f * p).getRoots(), m = 0; m < d.length; m++) {
			var g = d[m];
			g >= 0 && 1 >= g && u.points.push(l.multiply(g * g).add(h.multiply(g).add(c)))
		}
		return u.points.length > 0 && (u.status = "Intersection"), u
	}, sr.intersectBezier2Line = function(t, e, i, r, a) {
		var n, s, o, l, h, c, u, f = r.min(a),
			p = r.max(a),
			d = new sr("No Intersection");
		n = e.multiply(-2), o = t.add(n.add(i)), n = t.multiply(-2), s = e.multiply(2), l = n.add(s), h = new Ke(t.x, t.y), u = new Vector2D(r.y - a.y, a.x - r.x), c = r.x * a.y - a.x * r.y, roots = new Polynomial(u.dot(o), u.dot(l), u.dot(h) + c).getRoots();
		for (var m = 0; m < roots.length; m++) {
			var g = roots[m];
			if (g >= 0 && 1 >= g) {
				var y = t.lerp(e, g),
					v = e.lerp(i, g),
					x = y.lerp(v, g);
				r.x == a.x ? f.y <= x.y && x.y <= p.y && (d.status = "Intersection", d.appendPoint(x)) : r.y == a.y ? f.x <= x.x && x.x <= p.x && (d.status = "Intersection", d.appendPoint(x)) : x.gte(f) && x.lte(p) && (d.status = "Intersection", d.appendPoint(x))
			}
		}
		return d
	}, sr.intersectBezier2Polygon = function(t, e, i, r) {
		for (var a = new sr("No Intersection"), n = r.length, s = 0; n > s; s++) {
			var o = r[s],
				l = r[(s + 1) % n],
				h = sr.intersectBezier2Line(t, e, i, o, l);
			a.appendPoints(h.points)
		}
		return a.points.length > 0 && (a.status = "Intersection"), a
	}, sr.intersectBezier2Rectangle = function(t, e, i, r, a) {
		var n = r.min(a),
			s = r.max(a),
			o = new Ke(s.x, n.y),
			l = new Ke(n.x, s.y),
			h = sr.intersectBezier2Line(t, e, i, n, o),
			c = sr.intersectBezier2Line(t, e, i, o, s),
			u = sr.intersectBezier2Line(t, e, i, s, l),
			f = sr.intersectBezier2Line(t, e, i, l, n),
			p = new sr("No Intersection");
		return p.appendPoints(h.points), p.appendPoints(c.points), p.appendPoints(u.points), p.appendPoints(f.points), p.points.length > 0 && (p.status = "Intersection"), p
	}, sr.intersectBezier3Bezier3 = function(t, e, i, r, a, n, s, o) {
		var l, h, c, u, f, p, d, m, g, y, v, x, A = new sr("No Intersection");
		l = t.multiply(-1), h = e.multiply(3), c = i.multiply(-3), u = l.add(h.add(c.add(r))), f = new Vector2D(u.x, u.y), l = t.multiply(3), h = e.multiply(-6), c = i.multiply(3), u = l.add(h.add(c)), p = new Vector2D(u.x, u.y), l = t.multiply(-3), h = e.multiply(3), c = l.add(h), d = new Vector2D(c.x, c.y), m = new Vector2D(t.x, t.y), l = a.multiply(-1), h = n.multiply(3), c = s.multiply(-3), u = l.add(h.add(c.add(o))), g = new Vector2D(u.x, u.y), l = a.multiply(3), h = n.multiply(-6), c = s.multiply(3), u = l.add(h.add(c)), y = new Vector2D(u.x, u.y), l = a.multiply(-3), h = n.multiply(3), c = l.add(h), v = new Vector2D(c.x, c.y), x = new Vector2D(a.x, a.y);
		for (var w = m.x * m.x, _ = m.x * m.x * m.x, S = m.y * m.y, b = m.y * m.y * m.y, M = d.x * d.x, C = d.x * d.x * d.x, P = d.y * d.y, T = d.y * d.y * d.y, z = p.x * p.x, L = p.x * p.x * p.x, E = p.y * p.y, D = p.y * p.y * p.y, B = f.x * f.x, N = f.x * f.x * f.x, R = f.y * f.y, I = f.y * f.y * f.y, F = x.x * x.x, V = x.x * x.x * x.x, U = x.y * x.y, k = x.y * x.y * x.y, O = v.x * v.x, X = v.x * v.x * v.x, G = v.y * v.y, W = y.x * y.x, H = y.x * y.x * y.x, j = y.y * y.y, q = g.x * g.x, Y = g.x * g.x * g.x, Z = g.y * g.y, Q = g.y * g.y * g.y, K = new Polynomial(-N * Q + I * Y - 3 * f.x * R * q * g.y + 3 * B * f.y * g.x * Z, -6 * f.x * y.x * R * g.x * g.y + 6 * B * f.y * y.y * g.x * g.y + 3 * y.x * I * q - 3 * N * y.y * Z - 3 * f.x * R * y.y * q + 3 * B * y.x * f.y * Z, -6 * v.x * f.x * R * g.x * g.y - 6 * f.x * y.x * R * y.y * g.x + 6 * B * y.x * f.y * y.y * g.y + 3 * v.x * I * q + 3 * W * I * g.x + 3 * v.x * B * f.y * Z - 3 * f.x * v.y * R * q - 3 * f.x * W * R * g.y + B * f.y * g.x * (6 * v.y * g.y + 3 * j) + N * (-v.y * Z - 2 * j * g.y - g.y * (2 * v.y * g.y + j)), d.x * p.y * f.x * f.y * g.x * g.y - d.y * p.x * f.x * f.y * g.x * g.y + 6 * v.x * y.x * I * g.x + 3 * d.x * p.x * f.x * f.y * Z + 6 * m.x * f.x * R * g.x * g.y - 3 * d.x * p.x * R * g.x * g.y - 3 * d.y * p.y * f.x * f.y * q - 6 * m.y * B * f.y * g.x * g.y - 6 * x.x * f.x * R * g.x * g.y + 3 * d.y * p.y * B * g.x * g.y - 2 * p.x * E * f.x * g.x * g.y - 6 * v.x * f.x * y.x * R * g.y - 6 * v.x * f.x * R * y.y * g.x - 6 * f.x * v.y * y.x * R * g.x + 6 * v.x * B * f.y * y.y * g.y + 2 * z * p.y * f.y * g.x * g.y + H * I - 3 * m.x * I * q + 3 * m.y * N * Z + 3 * x.x * I * q + D * f.x * q - L * f.y * Z - 3 * m.x * B * f.y * Z + 3 * m.y * f.x * R * q - 2 * d.x * p.y * B * Z + d.x * p.y * R * q - d.y * p.x * B * Z + 2 * d.y * p.x * R * q + 3 * x.x * B * f.y * Z - p.x * E * f.y * q - 3 * x.y * f.x * R * q + z * p.y * f.x * Z - 3 * f.x * W * R * y.y + B * f.y * g.x * (6 * x.y * g.y + 6 * v.y * y.y) + B * y.x * f.y * (6 * v.y * g.y + 3 * j) + N * (-2 * v.y * y.y * g.y - x.y * Z - y.y * (2 * v.y * g.y + j) - g.y * (2 * x.y * g.y + 2 * v.y * y.y)), 6 * d.x * p.x * f.x * f.y * y.y * g.y + d.x * p.y * f.x * y.x * f.y * g.y + d.x * p.y * f.x * f.y * y.y * g.x - d.y * p.x * f.x * y.x * f.y * g.y - d.y * p.x * f.x * f.y * y.y * g.x - 6 * d.y * p.y * f.x * y.x * f.y * g.x - 6 * m.x * y.x * I * g.x + 6 * x.x * y.x * I * g.x + 6 * m.y * N * y.y * g.y + 2 * D * f.x * y.x * g.x - 2 * L * f.y * y.y * g.y + 6 * m.x * f.x * y.x * R * g.y + 6 * m.x * f.x * R * y.y * g.x + 6 * m.y * f.x * y.x * R * g.x - 3 * d.x * p.x * y.x * R * g.y - 3 * d.x * p.x * R * y.y * g.x + 2 * d.x * p.y * y.x * R * g.x + 4 * d.y * p.x * y.x * R * g.x - 6 * m.x * B * f.y * y.y * g.y - 6 * m.y * B * y.x * f.y * g.y - 6 * m.y * B * f.y * y.y * g.x - 4 * d.x * p.y * B * y.y * g.y - 6 * x.x * f.x * y.x * R * g.y - 6 * x.x * f.x * R * y.y * g.x - 2 * d.y * p.x * B * y.y * g.y + 3 * d.y * p.y * B * y.x * g.y + 3 * d.y * p.y * B * y.y * g.x - 2 * p.x * E * f.x * y.x * g.y - 2 * p.x * E * f.x * y.y * g.x - 2 * p.x * E * y.x * f.y * g.x - 6 * x.y * f.x * y.x * R * g.x - 6 * v.x * f.x * v.y * R * g.x - 6 * v.x * f.x * y.x * R * y.y + 6 * x.x * B * f.y * y.y * g.y + 2 * z * p.y * f.x * y.y * g.y + 2 * z * p.y * y.x * f.y * g.y + 2 * z * p.y * f.y * y.y * g.x + 3 * v.x * W * I + 3 * O * I * g.x - 3 * f.x * v.y * W * R - 3 * O * f.x * R * g.y + B * y.x * f.y * (6 * x.y * g.y + 6 * v.y * y.y) + B * f.y * g.x * (6 * x.y * y.y + 3 * G) + v.x * B * f.y * (6 * v.y * g.y + 3 * j) + N * (-2 * x.y * y.y * g.y - g.y * (2 * x.y * y.y + G) - v.y * (2 * v.y * g.y + j) - y.y * (2 * x.y * g.y + 2 * v.y * y.y)), d.x * v.x * p.y * f.x * f.y * g.y + d.x * p.y * f.x * v.y * f.y * g.x + d.x * p.y * f.x * y.x * f.y * y.y - d.y * p.x * v.x * f.x * f.y * g.y - d.y * p.x * f.x * v.y * f.y * g.x - d.y * p.x * f.x * y.x * f.y * y.y - 6 * d.y * v.x * p.y * f.x * f.y * g.x - 6 * m.x * v.x * I * g.x + 6 * x.x * v.x * I * g.x + 2 * v.x * D * f.x * g.x + 6 * m.x * v.x * f.x * R * g.y + 6 * m.x * f.x * v.y * R * g.x + 6 * m.x * f.x * y.x * R * y.y + 6 * m.y * v.x * f.x * R * g.x - 3 * d.x * p.x * v.x * R * g.y - 3 * d.x * p.x * v.y * R * g.x - 3 * d.x * p.x * y.x * R * y.y + 2 * d.x * v.x * p.y * R * g.x + 4 * d.y * p.x * v.x * R * g.x - 6 * m.y * v.x * B * f.y * g.y - 6 * m.y * B * v.y * f.y * g.x - 6 * m.y * B * y.x * f.y * y.y - 6 * x.x * v.x * f.x * R * g.y - 6 * x.x * f.x * v.y * R * g.x - 6 * x.x * f.x * y.x * R * y.y + 3 * d.y * v.x * p.y * B * g.y - 3 * d.y * p.y * f.x * W * f.y + 3 * d.y * p.y * B * v.y * g.x + 3 * d.y * p.y * B * y.x * y.y - 2 * p.x * v.x * E * f.x * g.y - 2 * p.x * v.x * E * f.y * g.x - 2 * p.x * E * f.x * v.y * g.x - 2 * p.x * E * f.x * y.x * y.y - 6 * x.y * v.x * f.x * R * g.x - 6 * v.x * f.x * v.y * y.x * R + 6 * x.y * B * v.y * f.y * g.x + 2 * z * v.x * p.y * f.y * g.y + 2 * z * p.y * v.y * f.y * g.x + 2 * z * p.y * y.x * f.y * y.y - 3 * m.x * W * I + 3 * x.x * W * I + 3 * O * y.x * I + D * f.x * W + 3 * m.y * f.x * W * R + d.x * p.y * W * R + 2 * d.y * p.x * W * R - p.x * E * W * f.y - 3 * x.y * f.x * W * R - 3 * O * f.x * R * y.y + z * p.y * f.x * (2 * v.y * g.y + j) + d.x * p.x * f.x * f.y * (6 * v.y * g.y + 3 * j) + v.x * B * f.y * (6 * x.y * g.y + 6 * v.y * y.y) + L * f.y * (-2 * v.y * g.y - j) + m.y * N * (6 * v.y * g.y + 3 * j) + d.y * p.x * B * (-2 * v.y * g.y - j) + d.x * p.y * B * (-4 * v.y * g.y - 2 * j) + m.x * B * f.y * (-6 * v.y * g.y - 3 * j) + B * y.x * f.y * (6 * x.y * y.y + 3 * G) + x.x * B * f.y * (6 * v.y * g.y + 3 * j) + N * (-2 * x.y * v.y * g.y - y.y * (2 * x.y * y.y + G) - x.y * (2 * v.y * g.y + j) - v.y * (2 * x.y * g.y + 2 * v.y * y.y)), -m.x * d.x * p.y * f.x * f.y * g.y + m.x * d.y * p.x * f.x * f.y * g.y + 6 * m.x * d.y * p.y * f.x * f.y * g.x - 6 * m.y * d.x * p.x * f.x * f.y * g.y - m.y * d.x * p.y * f.x * f.y * g.x + m.y * d.y * p.x * f.x * f.y * g.x + d.x * d.y * p.x * p.y * f.x * g.y - d.x * d.y * p.x * p.y * f.y * g.x + d.x * x.x * p.y * f.x * f.y * g.y + d.x * x.y * p.y * f.x * f.y * g.x + d.x * v.x * p.y * f.x * f.y * y.y + d.x * p.y * f.x * v.y * y.x * f.y - x.x * d.y * p.x * f.x * f.y * g.y - 6 * x.x * d.y * p.y * f.x * f.y * g.x - d.y * p.x * x.y * f.x * f.y * g.x - d.y * p.x * v.x * f.x * f.y * y.y - d.y * p.x * f.x * v.y * y.x * f.y - 6 * d.y * v.x * p.y * f.x * y.x * f.y - 6 * m.x * x.x * I * g.x - 6 * m.x * v.x * y.x * I - 2 * m.x * D * f.x * g.x + 6 * x.x * v.x * y.x * I + 2 * x.x * D * f.x * g.x + 2 * v.x * D * f.x * y.x + 2 * m.y * L * f.y * g.y - 6 * m.x * m.y * f.x * R * g.x + 3 * m.x * d.x * p.x * R * g.y - 2 * m.x * d.x * p.y * R * g.x - 4 * m.x * d.y * p.x * R * g.x + 3 * m.y * d.x * p.x * R * g.x + 6 * m.x * m.y * B * f.y * g.y + 6 * m.x * x.x * f.x * R * g.y - 3 * m.x * d.y * p.y * B * g.y + 2 * m.x * p.x * E * f.x * g.y + 2 * m.x * p.x * E * f.y * g.x + 6 * m.x * x.y * f.x * R * g.x + 6 * m.x * v.x * f.x * R * y.y + 6 * m.x * f.x * v.y * y.x * R + 4 * m.y * d.x * p.y * B * g.y + 6 * m.y * x.x * f.x * R * g.x + 2 * m.y * d.y * p.x * B * g.y - 3 * m.y * d.y * p.y * B * g.x + 2 * m.y * p.x * E * f.x * g.x + 6 * m.y * v.x * f.x * y.x * R - 3 * d.x * x.x * p.x * R * g.y + 2 * d.x * x.x * p.y * R * g.x + d.x * d.y * E * f.x * g.x - 3 * d.x * p.x * x.y * R * g.x - 3 * d.x * p.x * v.x * R * y.y - 3 * d.x * p.x * v.y * y.x * R + 2 * d.x * v.x * p.y * y.x * R + 4 * x.x * d.y * p.x * R * g.x + 4 * d.y * p.x * v.x * y.x * R - 2 * m.x * z * p.y * f.y * g.y - 6 * m.y * x.x * B * f.y * g.y - 6 * m.y * x.y * B * f.y * g.x - 6 * m.y * v.x * B * f.y * y.y - 2 * m.y * z * p.y * f.x * g.y - 2 * m.y * z * p.y * f.y * g.x - 6 * m.y * B * v.y * y.x * f.y - d.x * d.y * z * f.y * g.y - 2 * d.x * P * f.x * f.y * g.x + 3 * x.x * d.y * p.y * B * g.y - 2 * x.x * p.x * E * f.x * g.y - 2 * x.x * p.x * E * f.y * g.x - 6 * x.x * x.y * f.x * R * g.x - 6 * x.x * v.x * f.x * R * y.y - 6 * x.x * f.x * v.y * y.x * R + 3 * d.y * x.y * p.y * B * g.x + 3 * d.y * v.x * p.y * B * y.y + 3 * d.y * p.y * B * v.y * y.x - 2 * p.x * x.y * E * f.x * g.x - 2 * p.x * v.x * E * f.x * y.y - 2 * p.x * v.x * E * y.x * f.y - 2 * p.x * E * f.x * v.y * y.x - 6 * x.y * v.x * f.x * y.x * R - P * p.x * p.y * f.x * g.x + 2 * x.x * z * p.y * f.y * g.y + 6 * x.y * B * v.y * y.x * f.y + 2 * M * d.y * f.x * f.y * g.y + M * p.x * p.y * f.y * g.y + 2 * z * x.y * p.y * f.y * g.x + 2 * z * v.x * p.y * f.y * y.y + 2 * z * p.y * v.y * y.x * f.y + X * I + 3 * w * I * g.x - 3 * S * N * g.y + 3 * F * I * g.x + T * B * g.x - C * R * g.y - d.x * P * B * g.y + M * d.y * R * g.x - 3 * w * f.x * R * g.y + 3 * S * B * f.y * g.x - M * E * f.x * g.y + P * z * f.y * g.x - 3 * O * f.x * v.y * R - 3 * F * f.x * R * g.y + 3 * U * B * f.y * g.x + d.x * p.x * f.x * f.y * (6 * x.y * g.y + 6 * v.y * y.y) + L * f.y * (-2 * x.y * g.y - 2 * v.y * y.y) + m.y * N * (6 * x.y * g.y + 6 * v.y * y.y) + d.y * p.x * B * (-2 * x.y * g.y - 2 * v.y * y.y) + z * p.y * f.x * (2 * x.y * g.y + 2 * v.y * y.y) + d.x * p.y * B * (-4 * x.y * g.y - 4 * v.y * y.y) + m.x * B * f.y * (-6 * x.y * g.y - 6 * v.y * y.y) + x.x * B * f.y * (6 * x.y * g.y + 6 * v.y * y.y) + v.x * B * f.y * (6 * x.y * y.y + 3 * G) + N * (-2 * x.y * v.y * y.y - U * g.y - v.y * (2 * x.y * y.y + G) - x.y * (2 * x.y * g.y + 2 * v.y * y.y)), -m.x * d.x * p.y * f.x * f.y * y.y + m.x * d.y * p.x * f.x * f.y * y.y + 6 * m.x * d.y * p.y * f.x * y.x * f.y - 6 * m.y * d.x * p.x * f.x * f.y * y.y - m.y * d.x * p.y * f.x * y.x * f.y + m.y * d.y * p.x * f.x * y.x * f.y + d.x * d.y * p.x * p.y * f.x * y.y - d.x * d.y * p.x * p.y * y.x * f.y + d.x * x.x * p.y * f.x * f.y * y.y + d.x * x.y * p.y * f.x * y.x * f.y + d.x * v.x * p.y * f.x * v.y * f.y - x.x * d.y * p.x * f.x * f.y * y.y - 6 * x.x * d.y * p.y * f.x * y.x * f.y - d.y * p.x * x.y * f.x * y.x * f.y - d.y * p.x * v.x * f.x * v.y * f.y - 6 * m.x * x.x * y.x * I - 2 * m.x * D * f.x * y.x + 2 * x.x * D * f.x * y.x + 2 * m.y * L * f.y * y.y - 6 * m.x * m.y * f.x * y.x * R + 3 * m.x * d.x * p.x * R * y.y - 2 * m.x * d.x * p.y * y.x * R - 4 * m.x * d.y * p.x * y.x * R + 3 * m.y * d.x * p.x * y.x * R + 6 * m.x * m.y * B * f.y * y.y + 6 * m.x * x.x * f.x * R * y.y - 3 * m.x * d.y * p.y * B * y.y + 2 * m.x * p.x * E * f.x * y.y + 2 * m.x * p.x * E * y.x * f.y + 6 * m.x * x.y * f.x * y.x * R + 6 * m.x * v.x * f.x * v.y * R + 4 * m.y * d.x * p.y * B * y.y + 6 * m.y * x.x * f.x * y.x * R + 2 * m.y * d.y * p.x * B * y.y - 3 * m.y * d.y * p.y * B * y.x + 2 * m.y * p.x * E * f.x * y.x - 3 * d.x * x.x * p.x * R * y.y + 2 * d.x * x.x * p.y * y.x * R + d.x * d.y * E * f.x * y.x - 3 * d.x * p.x * x.y * y.x * R - 3 * d.x * p.x * v.x * v.y * R + 4 * x.x * d.y * p.x * y.x * R - 2 * m.x * z * p.y * f.y * y.y - 6 * m.y * x.x * B * f.y * y.y - 6 * m.y * x.y * B * y.x * f.y - 6 * m.y * v.x * B * v.y * f.y - 2 * m.y * z * p.y * f.x * y.y - 2 * m.y * z * p.y * y.x * f.y - d.x * d.y * z * f.y * y.y - 2 * d.x * P * f.x * y.x * f.y + 3 * x.x * d.y * p.y * B * y.y - 2 * x.x * p.x * E * f.x * y.y - 2 * x.x * p.x * E * y.x * f.y - 6 * x.x * x.y * f.x * y.x * R - 6 * x.x * v.x * f.x * v.y * R + 3 * d.y * x.y * p.y * B * y.x + 3 * d.y * v.x * p.y * B * v.y - 2 * p.x * x.y * E * f.x * y.x - 2 * p.x * v.x * E * f.x * v.y - P * p.x * p.y * f.x * y.x + 2 * x.x * z * p.y * f.y * y.y - 3 * d.y * O * p.y * f.x * f.y + 6 * x.y * v.x * B * v.y * f.y + 2 * M * d.y * f.x * f.y * y.y + M * p.x * p.y * f.y * y.y + 2 * z * x.y * p.y * y.x * f.y + 2 * z * v.x * p.y * v.y * f.y - 3 * m.x * O * I + 3 * x.x * O * I + 3 * w * y.x * I - 3 * S * N * y.y + 3 * F * y.x * I + O * D * f.x + T * B * y.x - C * R * y.y + 3 * m.y * O * f.x * R - d.x * P * B * y.y + d.x * O * p.y * R + 2 * d.y * p.x * O * R + M * d.y * y.x * R - p.x * O * E * f.y - 3 * x.y * O * f.x * R - 3 * w * f.x * R * y.y + 3 * S * B * y.x * f.y - M * E * f.x * y.y + P * z * y.x * f.y - 3 * F * f.x * R * y.y + 3 * U * B * y.x * f.y + z * p.y * f.x * (2 * x.y * y.y + G) + d.x * p.x * f.x * f.y * (6 * x.y * y.y + 3 * G) + L * f.y * (-2 * x.y * y.y - G) + m.y * N * (6 * x.y * y.y + 3 * G) + d.y * p.x * B * (-2 * x.y * y.y - G) + d.x * p.y * B * (-4 * x.y * y.y - 2 * G) + m.x * B * f.y * (-6 * x.y * y.y - 3 * G) + x.x * B * f.y * (6 * x.y * y.y + 3 * G) + N * (-2 * x.y * G - U * y.y - x.y * (2 * x.y * y.y + G)), -m.x * d.x * p.y * f.x * v.y * f.y + m.x * d.y * p.x * f.x * v.y * f.y + 6 * m.x * d.y * v.x * p.y * f.x * f.y - 6 * m.y * d.x * p.x * f.x * v.y * f.y - m.y * d.x * v.x * p.y * f.x * f.y + m.y * d.y * p.x * v.x * f.x * f.y - d.x * d.y * p.x * v.x * p.y * f.y + d.x * d.y * p.x * p.y * f.x * v.y + d.x * x.x * p.y * f.x * v.y * f.y + 6 * d.x * p.x * x.y * f.x * v.y * f.y + d.x * x.y * v.x * p.y * f.x * f.y - x.x * d.y * p.x * f.x * v.y * f.y - 6 * x.x * d.y * v.x * p.y * f.x * f.y - d.y * p.x * x.y * v.x * f.x * f.y - 6 * m.x * x.x * v.x * I - 2 * m.x * v.x * D * f.x + 6 * m.y * x.y * N * v.y + 2 * x.x * v.x * D * f.x + 2 * m.y * L * v.y * f.y - 2 * L * x.y * v.y * f.y - 6 * m.x * m.y * v.x * f.x * R + 3 * m.x * d.x * p.x * v.y * R - 2 * m.x * d.x * v.x * p.y * R - 4 * m.x * d.y * p.x * v.x * R + 3 * m.y * d.x * p.x * v.x * R + 6 * m.x * m.y * B * v.y * f.y + 6 * m.x * x.x * f.x * v.y * R - 3 * m.x * d.y * p.y * B * v.y + 2 * m.x * p.x * v.x * E * f.y + 2 * m.x * p.x * E * f.x * v.y + 6 * m.x * x.y * v.x * f.x * R + 4 * m.y * d.x * p.y * B * v.y + 6 * m.y * x.x * v.x * f.x * R + 2 * m.y * d.y * p.x * B * v.y - 3 * m.y * d.y * v.x * p.y * B + 2 * m.y * p.x * v.x * E * f.x - 3 * d.x * x.x * p.x * v.y * R + 2 * d.x * x.x * v.x * p.y * R + d.x * d.y * v.x * E * f.x - 3 * d.x * p.x * x.y * v.x * R + 4 * x.x * d.y * p.x * v.x * R - 6 * m.x * x.y * B * v.y * f.y - 2 * m.x * z * p.y * v.y * f.y - 6 * m.y * x.x * B * v.y * f.y - 6 * m.y * x.y * v.x * B * f.y - 2 * m.y * z * v.x * p.y * f.y - 2 * m.y * z * p.y * f.x * v.y - d.x * d.y * z * v.y * f.y - 4 * d.x * x.y * p.y * B * v.y - 2 * d.x * P * v.x * f.x * f.y + 3 * x.x * d.y * p.y * B * v.y - 2 * x.x * p.x * v.x * E * f.y - 2 * x.x * p.x * E * f.x * v.y - 6 * x.x * x.y * v.x * f.x * R - 2 * d.y * p.x * x.y * B * v.y + 3 * d.y * x.y * v.x * p.y * B - 2 * p.x * x.y * v.x * E * f.x - P * p.x * v.x * p.y * f.x + 6 * x.x * x.y * B * v.y * f.y + 2 * x.x * z * p.y * v.y * f.y + 2 * M * d.y * f.x * v.y * f.y + M * p.x * p.y * v.y * f.y + 2 * z * x.y * v.x * p.y * f.y + 2 * z * x.y * p.y * f.x * v.y + 3 * w * v.x * I - 3 * S * N * v.y + 3 * F * v.x * I + T * v.x * B - C * v.y * R - 3 * U * N * v.y - d.x * P * B * v.y + M * d.y * v.x * R - 3 * w * f.x * v.y * R + 3 * S * v.x * B * f.y - M * E * f.x * v.y + P * z * v.x * f.y - 3 * F * f.x * v.y * R + 3 * U * v.x * B * f.y, m.x * m.y * d.x * p.y * f.x * f.y - m.x * m.y * d.y * p.x * f.x * f.y + m.x * d.x * d.y * p.x * p.y * f.y - m.y * d.x * d.y * p.x * p.y * f.x - m.x * d.x * x.y * p.y * f.x * f.y + 6 * m.x * x.x * d.y * p.y * f.x * f.y + m.x * d.y * p.x * x.y * f.x * f.y - m.y * d.x * x.x * p.y * f.x * f.y - 6 * m.y * d.x * p.x * x.y * f.x * f.y + m.y * x.x * d.y * p.x * f.x * f.y - d.x * x.x * d.y * p.x * p.y * f.y + d.x * d.y * p.x * x.y * p.y * f.x + d.x * x.x * x.y * p.y * f.x * f.y - x.x * d.y * p.x * x.y * f.x * f.y - 2 * m.x * x.x * D * f.x + 2 * m.y * L * x.y * f.y - 3 * m.x * m.y * d.x * p.x * R - 6 * m.x * m.y * x.x * f.x * R + 3 * m.x * m.y * d.y * p.y * B - 2 * m.x * m.y * p.x * E * f.x - 2 * m.x * d.x * x.x * p.y * R - m.x * d.x * d.y * E * f.x + 3 * m.x * d.x * p.x * x.y * R - 4 * m.x * x.x * d.y * p.x * R + 3 * m.y * d.x * x.x * p.x * R + 6 * m.x * m.y * x.y * B * f.y + 2 * m.x * m.y * z * p.y * f.y + 2 * m.x * d.x * P * f.x * f.y + 2 * m.x * x.x * p.x * E * f.y + 6 * m.x * x.x * x.y * f.x * R - 3 * m.x * d.y * x.y * p.y * B + 2 * m.x * p.x * x.y * E * f.x + m.x * P * p.x * p.y * f.x + m.y * d.x * d.y * z * f.y + 4 * m.y * d.x * x.y * p.y * B - 3 * m.y * x.x * d.y * p.y * B + 2 * m.y * x.x * p.x * E * f.x + 2 * m.y * d.y * p.x * x.y * B + d.x * x.x * d.y * E * f.x - 3 * d.x * x.x * p.x * x.y * R - 2 * m.x * z * x.y * p.y * f.y - 6 * m.y * x.x * x.y * B * f.y - 2 * m.y * x.x * z * p.y * f.y - 2 * m.y * M * d.y * f.x * f.y - m.y * M * p.x * p.y * f.y - 2 * m.y * z * x.y * p.y * f.x - 2 * d.x * x.x * P * f.x * f.y - d.x * d.y * z * x.y * f.y + 3 * x.x * d.y * x.y * p.y * B - 2 * x.x * p.x * x.y * E * f.x - x.x * P * p.x * p.y * f.x + 3 * S * d.x * p.x * f.x * f.y + 3 * d.x * p.x * U * f.x * f.y + 2 * x.x * z * x.y * p.y * f.y - 3 * w * d.y * p.y * f.x * f.y + 2 * M * d.y * x.y * f.x * f.y + M * p.x * x.y * p.y * f.y - 3 * F * d.y * p.y * f.x * f.y - _ * I + b * N + V * I - k * N - 3 * m.x * F * I - m.x * T * B + 3 * w * x.x * I + m.y * C * R + 3 * m.y * U * N + x.x * T * B + w * D * f.x - 3 * S * x.y * N - S * L * f.y + F * D * f.x - C * x.y * R - L * U * f.y - m.x * M * d.y * R + m.y * d.x * P * B - 3 * m.x * S * B * f.y - m.x * P * z * f.y + m.y * M * E * f.x - d.x * P * x.y * B + 3 * w * m.y * f.x * R + w * d.x * p.y * R + 2 * w * d.y * p.x * R - 2 * S * d.x * p.y * B - S * d.y * p.x * B + M * x.x * d.y * R - 3 * m.x * U * B * f.y + 3 * m.y * F * f.x * R + d.x * F * p.y * R - 2 * d.x * U * p.y * B + x.x * P * z * f.y - d.y * p.x * U * B - w * p.x * E * f.y - 3 * w * x.y * f.x * R + 3 * S * x.x * B * f.y + S * z * p.y * f.x - M * x.y * E * f.x + 2 * F * d.y * p.x * R + 3 * x.x * U * B * f.y - F * p.x * E * f.y - 3 * F * x.y * f.x * R + z * U * p.y * f.x), J = K.getRootsInInterval(0, 1), $ = 0; $ < J.length; $++) {
			var tt = J[$],
				et = new Polynomial(f.x, p.x, d.x, m.x - x.x - tt * v.x - tt * tt * y.x - tt * tt * tt * g.x).getRoots(),
				it = new Polynomial(f.y, p.y, d.y, m.y - x.y - tt * v.y - tt * tt * y.y - tt * tt * tt * g.y).getRoots();
			if (et.length > 0 && it.length > 0) {
				var rt = 1e-4;
				t: for (var at = 0; at < et.length; at++) {
					var nt = et[at];
					if (nt >= 0 && 1 >= nt)
						for (var st = 0; st < it.length; st++)
							if (Math.abs(nt - it[st]) < rt) {
								A.points.push(g.multiply(tt * tt * tt).add(y.multiply(tt * tt).add(v.multiply(tt).add(x))));
								break t
							}
				}
			}
		}
		return A.points.length > 0 && (A.status = "Intersection"), A
	}, sr.intersectBezier3Circle = function(t, e, i, r, a, n) {
		return sr.intersectBezier3Ellipse(t, e, i, r, a, n, n)
	}, sr.intersectBezier3Ellipse = function(t, e, i, r, a, n, s) {
		var o, l, h, c, u, f, p, d, m = new sr("No Intersection");
		o = t.multiply(-1), l = e.multiply(3), h = i.multiply(-3), c = o.add(l.add(h.add(r))), u = new Vector2D(c.x, c.y), o = t.multiply(3), l = e.multiply(-6), h = i.multiply(3), c = o.add(l.add(h)), f = new Vector2D(c.x, c.y), o = t.multiply(-3), l = e.multiply(3), h = o.add(l), p = new Vector2D(h.x, h.y), d = new Vector2D(t.x, t.y);
		for (var g = n * n, y = s * s, v = new Polynomial(u.x * u.x * y + u.y * u.y * g, 2 * (u.x * f.x * y + u.y * f.y * g), 2 * (u.x * p.x * y + u.y * p.y * g) + f.x * f.x * y + f.y * f.y * g, 2 * u.x * y * (d.x - a.x) + 2 * u.y * g * (d.y - a.y) + 2 * (f.x * p.x * y + f.y * p.y * g), 2 * f.x * y * (d.x - a.x) + 2 * f.y * g * (d.y - a.y) + p.x * p.x * y + p.y * p.y * g, 2 * p.x * y * (d.x - a.x) + 2 * p.y * g * (d.y - a.y), d.x * d.x * y - 2 * d.y * a.y * g - 2 * d.x * a.x * y + d.y * d.y * g + a.x * a.x * y + a.y * a.y * g - g * y), x = v.getRootsInInterval(0, 1), A = 0; A < x.length; A++) {
			var w = x[A];
			m.points.push(u.multiply(w * w * w).add(f.multiply(w * w).add(p.multiply(w).add(d))))
		}
		return m.points.length > 0 && (m.status = "Intersection"), m
	}, sr.intersectBezier3Line = function(t, e, i, r, a, n) {
		var s, o, l, h, c, u, f, p, d, m, g = a.min(n),
			y = a.max(n),
			v = new sr("No Intersection");
		s = t.multiply(-1), o = e.multiply(3), l = i.multiply(-3), h = s.add(o.add(l.add(r))), c = new Vector2D(h.x, h.y), s = t.multiply(3), o = e.multiply(-6), l = i.multiply(3), h = s.add(o.add(l)), u = new Vector2D(h.x, h.y), s = t.multiply(-3), o = e.multiply(3), l = s.add(o), f = new Vector2D(l.x, l.y), p = new Vector2D(t.x, t.y), m = new Vector2D(a.y - n.y, n.x - a.x), d = a.x * n.y - n.x * a.y, roots = new Polynomial(m.dot(c), m.dot(u), m.dot(f), m.dot(p) + d).getRoots();
		for (var x = 0; x < roots.length; x++) {
			var A = roots[x];
			if (A >= 0 && 1 >= A) {
				var w = t.lerp(e, A),
					_ = e.lerp(i, A),
					S = i.lerp(r, A),
					b = w.lerp(_, A),
					M = _.lerp(S, A),
					C = b.lerp(M, A);
				a.x == n.x ? g.y <= C.y && C.y <= y.y && (v.status = "Intersection", v.appendPoint(C)) : a.y == n.y ? g.x <= C.x && C.x <= y.x && (v.status = "Intersection", v.appendPoint(C)) : C.gte(g) && C.lte(y) && (v.status = "Intersection", v.appendPoint(C))
			}
		}
		return v
	}, sr.intersectBezier3Polygon = function(t, e, i, r, a) {
		for (var n = new sr("No Intersection"), s = a.length, o = 0; s > o; o++) {
			var l = a[o],
				h = a[(o + 1) % s],
				c = sr.intersectBezier3Line(t, e, i, r, l, h);
			n.appendPoints(c.points)
		}
		return n.points.length > 0 && (n.status = "Intersection"), n
	}, sr.intersectBezier3Rectangle = function(t, e, i, r, a, n) {
		var s = a.min(n),
			o = a.max(n),
			l = new Ke(o.x, s.y),
			h = new Ke(s.x, o.y),
			c = sr.intersectBezier3Line(t, e, i, r, s, l),
			u = sr.intersectBezier3Line(t, e, i, r, l, o),
			f = sr.intersectBezier3Line(t, e, i, r, o, h),
			p = sr.intersectBezier3Line(t, e, i, r, h, s),
			d = new sr("No Intersection");
		return d.appendPoints(c.points), d.appendPoints(u.points), d.appendPoints(f.points), d.appendPoints(p.points), d.points.length > 0 && (d.status = "Intersection"), d
	}, sr.intersectCircleCircle = function(t, e, i, r) {
		var a, n = e + r,
			s = Math.abs(e - r),
			o = t.distanceFrom(i);
		if (o > n) a = new sr("Outside");
		else if (s > o) a = new sr("Inside");
		else {
			a = new sr("Intersection");
			var l = (e * e - r * r + o * o) / (2 * o),
				h = Math.sqrt(e * e - l * l),
				c = t.lerp(i, l / o),
				u = h / o;
			a.points.push(new Ke(c.x - u * (i.y - t.y), c.y + u * (i.x - t.x))), a.points.push(new Ke(c.x + u * (i.y - t.y), c.y - u * (i.x - t.x)))
		}
		return a
	}, sr.intersectCircleEllipse = function(t, e, i, r, a) {
		return sr.intersectEllipseEllipse(t, e, e, i, r, a)
	}, sr.intersectCircleLine = function(t, e, i, r) {
		var a, n = (r.x - i.x) * (r.x - i.x) + (r.y - i.y) * (r.y - i.y),
			s = 2 * ((r.x - i.x) * (i.x - t.x) + (r.y - i.y) * (i.y - t.y)),
			o = t.x * t.x + t.y * t.y + i.x * i.x + i.y * i.y - 2 * (t.x * i.x + t.y * i.y) - e * e,
			l = s * s - 4 * n * o;
		if (0 > l) a = new sr("Outside");
		else if (0 == l) a = new sr("Tangent");
		else {
			var h = Math.sqrt(l),
				c = (-s + h) / (2 * n),
				u = (-s - h) / (2 * n);
			(0 > c || c > 1) && (0 > u || u > 1) ? a = new sr(0 > c && 0 > u || c > 1 && u > 1 ? "Outside" : "Inside"): (a = new sr("Intersection"), c >= 0 && 1 >= c && a.points.push(i.lerp(r, c)), u >= 0 && 1 >= u && a.points.push(i.lerp(r, u)))
		}
		return a
	}, sr.intersectCirclePolygon = function(t, e, i) {
		for (var r, a = new sr("No Intersection"), n = i.length, s = 0; n > s; s++) {
			var o = i[s],
				l = i[(s + 1) % n];
			r = sr.intersectCircleLine(t, e, o, l), a.appendPoints(r.points)
		}
		return a.points.length > 0 ? a.status = "Intersection" : a.status = r.status, a
	}, sr.intersectCircleRectangle = function(t, e, i, r) {
		var a = i.min(r),
			n = i.max(r),
			s = new Ke(n.x, a.y),
			o = new Ke(a.x, n.y),
			l = sr.intersectCircleLine(t, e, a, s),
			h = sr.intersectCircleLine(t, e, s, n),
			c = sr.intersectCircleLine(t, e, n, o),
			u = sr.intersectCircleLine(t, e, o, a),
			f = new sr("No Intersection");
		return f.appendPoints(l.points), f.appendPoints(h.points), f.appendPoints(c.points), f.appendPoints(u.points), f.points.length > 0 ? f.status = "Intersection" : f.status = l.status, f
	}, sr.intersectEllipseEllipse = function(t, e, i, r, a, n) {
		for (var s = [i * i, 0, e * e, -2 * i * i * t.x, -2 * e * e * t.y, i * i * t.x * t.x + e * e * t.y * t.y - e * e * i * i], o = [n * n, 0, a * a, -2 * n * n * r.x, -2 * a * a * r.y, n * n * r.x * r.x + a * a * r.y * r.y - a * a * n * n], l = sr.bezout(s, o), h = l.getRoots(), c = .001, u = (s[0] * s[0] + 2 * s[1] * s[1] + s[2] * s[2]) * c, f = (o[0] * o[0] + 2 * o[1] * o[1] + o[2] * o[2]) * c, p = new sr("No Intersection"), d = 0; d < h.length; d++)
			for (var m = new Polynomial(s[0], s[3] + h[d] * s[1], s[5] + h[d] * (s[4] + h[d] * s[2])), g = m.getRoots(), y = 0; y < g.length; y++) {
				var v = (s[0] * g[y] + s[1] * h[d] + s[3]) * g[y] + (s[2] * h[d] + s[4]) * h[d] + s[5];
				Math.abs(v) < u && (v = (o[0] * g[y] + o[1] * h[d] + o[3]) * g[y] + (o[2] * h[d] + o[4]) * h[d] + o[5], Math.abs(v) < f && p.appendPoint(new Ke(g[y], h[d])))
			}
		return p.points.length > 0 && (p.status = "Intersection"), p
	}, sr.intersectEllipseLine = function(t, e, i, r, a) {
		var n, s = new Vector2D(r.x, r.y),
			o = Vector2D.fromPoints(r, a),
			l = new Vector2D(t.x, t.y),
			h = s.subtract(l),
			c = new Vector2D(o.x / (e * e), o.y / (i * i)),
			u = new Vector2D(h.x / (e * e), h.y / (i * i)),
			f = o.dot(c),
			p = o.dot(u),
			t = h.dot(u) - 1,
			d = p * p - f * t;
		if (0 > d) n = new sr("Outside");
		else if (d > 0) {
			var m = Math.sqrt(d),
				g = (-p - m) / f,
				y = (-p + m) / f;
			(0 > g || g > 1) && (0 > y || y > 1) ? n = new sr(0 > g && 0 > y || g > 1 && y > 1 ? "Outside" : "Inside"): (n = new sr("Intersection"), g >= 0 && 1 >= g && n.appendPoint(r.lerp(a, g)), y >= 0 && 1 >= y && n.appendPoint(r.lerp(a, y)))
		} else {
			var v = -p / f;
			v >= 0 && 1 >= v ? (n = new sr("Intersection"), n.appendPoint(r.lerp(a, v))) : n = new sr("Outside")
		}
		return n
	}, sr.intersectEllipsePolygon = function(t, e, i, r) {
		for (var a = new sr("No Intersection"), n = r.length, s = 0; n > s; s++) {
			var o = r[s],
				l = r[(s + 1) % n],
				h = sr.intersectEllipseLine(t, e, i, o, l);
			a.appendPoints(h.points)
		}
		return a.points.length > 0 && (a.status = "Intersection"), a
	}, sr.intersectEllipseRectangle = function(t, e, i, r, a) {
		var n = r.min(a),
			s = r.max(a),
			o = new Ke(s.x, n.y),
			l = new Ke(n.x, s.y),
			h = sr.intersectEllipseLine(t, e, i, n, o),
			c = sr.intersectEllipseLine(t, e, i, o, s),
			u = sr.intersectEllipseLine(t, e, i, s, l),
			f = sr.intersectEllipseLine(t, e, i, l, n),
			p = new sr("No Intersection");
		return p.appendPoints(h.points), p.appendPoints(c.points), p.appendPoints(u.points), p.appendPoints(f.points), p.points.length > 0 && (p.status = "Intersection"), p
	}, sr.intersectLineLine = function(t, e, i, r) {
		var a, n = (r.x - i.x) * (t.y - i.y) - (r.y - i.y) * (t.x - i.x),
			s = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x),
			o = (r.y - i.y) * (e.x - t.x) - (r.x - i.x) * (e.y - t.y);
		if (0 != o) {
			var l = n / o,
				h = s / o;
			l >= 0 && 1 >= l && h >= 0 && 1 >= h ? (a = new sr("Intersection"), a.points.push(new Ke(t.x + l * (e.x - t.x), t.y + l * (e.y - t.y)))) : a = new sr("No Intersection")
		} else a = new sr(0 == n || 0 == s ? "Coincident" : "Parallel");
		return a
	}, sr.intersectLinePolygon = function(t, e, i) {
		for (var r = new sr("No Intersection"), a = i.length, n = 0; a > n; n++) {
			var s = i[n],
				o = i[(n + 1) % a],
				l = sr.intersectLineLine(t, e, s, o);
			r.appendPoints(l.points)
		}
		return r.points.length > 0 && (r.status = "Intersection"), r
	}, sr.intersectLineRectangle = function(t, e, i, r) {
		var a = i.min(r),
			n = i.max(r),
			s = new Ke(n.x, a.y),
			o = new Ke(a.x, n.y),
			l = sr.intersectLineLine(a, s, t, e),
			h = sr.intersectLineLine(s, n, t, e),
			c = sr.intersectLineLine(n, o, t, e),
			u = sr.intersectLineLine(o, a, t, e),
			f = new sr("No Intersection");
		return f.appendPoints(l.points), f.appendPoints(h.points), f.appendPoints(c.points), f.appendPoints(u.points), f.points.length > 0 && (f.status = "Intersection"), f
	}, sr.intersectPolygonPolygon = function(t, e) {
		for (var i = new sr("No Intersection"), r = t.length, a = 0; r > a; a++) {
			var n = t[a],
				s = t[(a + 1) % r],
				o = sr.intersectLinePolygon(n, s, e);
			i.appendPoints(o.points)
		}
		return i.points.length > 0 && (i.status = "Intersection"), i
	}, sr.intersectPolygonRectangle = function(t, e, i) {
		var r = e.min(i),
			a = e.max(i),
			n = new Ke(a.x, r.y),
			s = new Ke(r.x, a.y),
			o = sr.intersectLinePolygon(r, n, t),
			l = sr.intersectLinePolygon(n, a, t),
			h = sr.intersectLinePolygon(a, s, t),
			c = sr.intersectLinePolygon(s, r, t),
			u = new sr("No Intersection");
		return u.appendPoints(o.points), u.appendPoints(l.points), u.appendPoints(h.points), u.appendPoints(c.points), u.points.length > 0 && (u.status = "Intersection"), u
	}, sr.intersectRayRay = function(t, e, i, r) {
		var a, n = (r.x - i.x) * (t.y - i.y) - (r.y - i.y) * (t.x - i.x),
			s = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x),
			o = (r.y - i.y) * (e.x - t.x) - (r.x - i.x) * (e.y - t.y);
		if (0 != o) {
			var l = n / o;
			a = new sr("Intersection"), a.points.push(new Ke(t.x + l * (e.x - t.x), t.y + l * (e.y - t.y)))
		} else a = new sr(0 == n || 0 == s ? "Coincident" : "Parallel");
		return a
	}, sr.intersectRectangleRectangle = function(t, e, i, r) {
		var a = t.min(e),
			n = t.max(e),
			s = new Ke(n.x, a.y),
			o = new Ke(a.x, n.y),
			l = sr.intersectLineRectangle(a, s, i, r),
			h = sr.intersectLineRectangle(s, n, i, r),
			c = sr.intersectLineRectangle(n, o, i, r),
			u = sr.intersectLineRectangle(o, a, i, r),
			f = new sr("No Intersection");
		return f.appendPoints(l.points), f.appendPoints(h.points), f.appendPoints(c.points), f.appendPoints(u.points), f.points.length > 0 && (f.status = "Intersection"), f
	}, sr.bezout = function(t, e) {
		var i = t[0] * e[1] - e[0] * t[1],
			r = t[0] * e[2] - e[0] * t[2],
			a = t[0] * e[3] - e[0] * t[3],
			n = t[0] * e[4] - e[0] * t[4],
			s = t[0] * e[5] - e[0] * t[5],
			o = t[1] * e[2] - e[1] * t[2],
			l = t[1] * e[4] - e[1] * t[4],
			h = t[1] * e[5] - e[1] * t[5],
			c = t[2] * e[3] - e[2] * t[3],
			u = t[3] * e[4] - e[3] * t[4],
			f = t[3] * e[5] - e[3] * t[5],
			p = h + u,
			d = l - c;
		return new Polynomial(i * o - r * r, i * d + a * o - 2 * r * n, i * p + a * d - n * n - 2 * r * s, i * f + a * p - 2 * n * s, a * f - s * s)
	}, Qe.Intersection = sr, Qe.AreaPicking = function(t, e) {
		this.gl3dview = t, this.bounding = e, this.cache = {}
	}, Qe.extend(Qe.AreaPicking, Object, {
		intersectObjects: function(t) {
			for (var e = [], i = 0; i < t.length; i++) {
				var r = t[i];
				this.intersectObject(r, e)
			}
			return e
		},
		getViewPoint: function(t, e) {
			var i = e.vertices[t].clone(),
				r = this.cache[e.getId()][i.x + " " + i.y + " " + i.z];
			return r ? r : (i.applyMatrix4(e.worldMatrix), r = this.gl3dview.getViewPosition(i), r.y = r.h - r.y, r)
		},
		intersectObject: function(t, e) {
			if (t instanceof Qe.Entity) {
				this.cache[t.getId()] = {};
				for (var i = 0; i < t.vertices.length; i++) {
					var r = t.vertices[i].clone();
					r.applyMatrix4(t.worldMatrix);
					var a = this.gl3dview.getViewPosition(r);
					if (a.y = a.h - a.y, this.cache[t.getId()][r.x + " " + r.y + " " + r.z] = a, a.x > this.bounding.x && a.y > this.bounding.y && a.x < this.bounding.x + this.bounding.w && a.y < this.bounding.y + this.bounding.h) {
						var n = {
							element: t
						};
						return void e.push(n)
					}
				}
			}
		}
	}), Qe.BaseInteraction = function(t) {
		this.gl3dview = t, this.view = t.getView() || document
	}, Qe.addEventListener = function(t, e, i, r) {
		var a = "_" + t + "_";
		if (!r[a]) {
			var n = function(t) {
				r[e](t)
			};
			r[a] = n, i.addEventListener(t, n, !1)
		}
	}, Qe.removeEventListener = function(t, e, i) {
		var r = "_" + t + "_",
			a = i[r];
		a && (e.removeEventListener(t, a, !1), delete i[r])
	}, Qe.extend(Qe.BaseInteraction, Object, {
		onPropertyChange: function() {},
		firePropertyChange: function() {},
		setUp: function() {},
		tearDown: function() {},
		update: function() {},
		addListener: function() {
			for (var t = 0; t < arguments.length; t++) {
				var e = arguments[t];
				Qe.addEventListener(e, "handle_" + e, this.gl3dview.getRootView(), this)
			}
		},
		removeListener: function() {
			for (var t = 0; t < arguments.length; t++) {
				arguments[t];
				Qe.removeEventListener(arguments[t], this.gl3dview.getRootView(), this)
			}
		},
		isCtrlDown: function(t) {
			return t.ctrlKey || t.metaKey
		},
		isFinished: function() {
			return !0
		}
	}), Qe.DefaultInteraction = function(e) {
		Qe.BaseInteraction.call(this, e), this.screen = {
			width: 0,
			height: 0,
			offsetLeft: 0,
			offsetTop: 0
		}, this.radius = this.screen.width / 4, this.domElement = this.gl3dview.getRootView(), this.rotateSpeed = 1, this.zoomSpeed = 1.2, this.panSpeed = .3, this.noRotate = !1, this.noZoom = !1, this.noPan = !1, this.easing = !0, this.dynamicDampingFactor = .05, this.timeInterval = 2e3, this.minDistance = 0, this.maxDistance = 1 / 0, this.keys = [65, 83, 68], this.lastPosition = new Qe.XiangliangThree;
		var i, r, a = this.STATE.NONE,
			n = (this.STATE.NONE, new Qe.XiangliangThree),
			s = new Qe.XiangliangThree,
			o = new Qe.XiangliangThree,
			l = new Qe.XiangliangTwo,
			h = new Qe.XiangliangTwo,
			c = 0,
			u = 0,
			f = new Qe.XiangliangTwo,
			p = new Qe.XiangliangTwo;
		this.object = this.gl3dview._gleye, this.object.target || (this.object.target = new Qe.XiangliangThree), this.movementSpeed = 1, this.lookSpeed = .005, this.keyboardEnable = !0, this.lookVertical = !0, this.autoForward = !1, this.fpsMode = !1, this.dragMode = !0, this.activeLook = !1, this.heightSpeed = !1, this.heightCoef = 1, this.heightMin = 0, this.heightMax = 1, this.constrainVertical = !1, this.verticalMin = 0, this.verticalMax = Math.PI, this.autoSpeedFactor = 0, this.mouseX = 0, this.mouseY = 0, this.lat = 0, this.lon = 0, this.phi = 0, this.theta = 0, this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.freeze = !1, this.mouseDragOn = !1, this.viewHalfX = 0, this.viewHalfY = 0, this.lastX = 0, this.lastY = 0, this.gl3dview.getRootView().addEventListener("contextmenu", function(t) {
			t.preventDefault()
		}, !1), this.yRistrict = !0, this.yLowerLimitAngle = -Math.PI / 2, this.yUpLimitAngle = Math.PI / 2, this.updateIntervalTime = 0;
		var d = null;
		this.handleResize = function() {
			this.screen.width = t.innerWidth, this.screen.height = t.innerHeight, this.screen.offsetLeft = 0, this.screen.offsetTop = 0, this.radius = (this.screen.width + this.screen.height) / 4
		}, this.handleResize(), this.handle_mousedown = function(t) {
			if (!ei.isCtrlDown(t)) {
				if (t.preventDefault(), this.fpsMode) {
					if (this.domElement !== document && this.domElement.focus(), this.activeLook) switch (t.button) {
						case 0:
							this.moveForward = !0;
							break;
						case 2:
							this.moveBackward = !0
					}
					this.lastX = t.pageX, this.lastY = t.pageY, this.mouseDragOn = !0
				} else a === this.STATE.NONE && (a = t.button), a !== this.STATE.ROTATE || this.noRotate ? this.state !== this.STATE.ZOOM || this.noZoom ? a === this.STATE.PAN && !this.noPan && (f = p = this.getMouseOnScreen(t.clientX, t.clientY)) : l = h = this.getMouseOnScreen(t.clientX, t.clientY) : (s = o = this.getMouseProjectionOnBall(t.clientX, t.clientY), i = r = this.getRotateY(t.clientX, t.clientY));
				this.beforeUpdate(), this.addListener("mousemove", "mouseup")
			}
		}, this.handle_mousemove = function(t) {
			if (!t.stop) {
				t.preventDefault(), this.fpsMode ? this.dragMode ? this.mouseDragOn ? (this.mouseX = 300 * (t.pageX - this.lastX), this.mouseY = 300 * (t.pageY - this.lastY), this.lastX = t.pageX, this.lastY = t.pageY) : (this.mouseX = 0, this.mouseY = 0) : this.domElement === document ? (this.mouseX = t.pageX - this.viewHalfX, this.mouseY = t.pageY - this.viewHalfY) : (this.mouseX = t.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = t.pageY - this.domElement.offsetTop - this.viewHalfY) : a !== this.STATE.ROTATE || this.noRotate ? a !== this.STATE.ZOOM || this.noZoom ? a === this.STATE.PAN && !this.noPan && (p = this.getMouseOnScreen(t.clientX, t.clientY)) : h = this.getMouseOnScreen(t.clientX, t.clientY) : (o = this.getMouseProjectionOnBall(t.clientX, t.clientY), r = this.getRotateY(t.clientX, t.clientY));
				var e = (new Date).getTime();
				if (null == this._lt) this.update();
				else {
					if (e - this._lt < this.updateIntervalTime) return;
					this.update()
				}
				this._lt = e
			}
		}, this.handle_mouseup = function(t) {
			if (t.preventDefault(), this.fpsMode) {
				if (this.activeLook) switch (t.button) {
					case 0:
						this.moveForward = !1;
						break;
					case 2:
						this.moveBackward = !1
				}
				this.lastX = 0, this.lastY = 0, this.dragMode && (this.mouseX = 0, this.mouseY = 0), this.mouseDragOn = !1
			} else a = this.STATE.NONE;
			this.removeListener("mousemove", "mouseup"), this.update()
		}, this.handle_touchstart = function(t) {
			if (this.enabled !== !1) {
				switch (t.touches.length) {
					case 1:
						a = this.STATE.TOUCH_ROTATE, s = this.getMouseProjectionOnBall(t.touches[0].pageX, t.touches[0].pageY), i = r = this.getRotateY(t.touches[0].pageX, t.touches[0].pageY), o.copy(s);
						break;
					case 2:
						a = this.STATE.TOUCH_ZOOM;
						var e = t.touches[0].pageX - t.touches[1].pageX,
							n = t.touches[0].pageY - t.touches[1].pageY;
						u = c = Math.sqrt(e * e + n * n);
						break;
					case 3:
						a = this.STATE.TOUCH_PAN, f.copy(this.getMouseOnScreen(t.touches[0].pageX, t.touches[0].pageY)), p.copy(f);
						break;
					default:
						a = this.STATE.NONE
				}
				this.update()
			}
		}, this.handle_touchmove = function(t) {
			if (this.enabled !== !1) {
				switch (t.preventDefault(), t.touches.length) {
					case 1:
						o = this.getMouseProjectionOnBall(t.touches[0].pageX, t.touches[0].pageY, o), r = this.getRotateY(t.touches[0].pageX, t.touches[0].pageY);
						break;
					case 2:
						var e = t.touches[0].pageX - t.touches[1].pageX,
							i = t.touches[0].pageY - t.touches[1].pageY;
						u = Math.sqrt(e * e + i * i);
						break;
					case 3:
						p = this.getMouseOnScreen(t.touches[0].pageX, t.touches[0].pageY, p);
						break;
					default:
						a = this.STATE.NONE
				}
				this.update()
			}
		}, this.handle_touchend = function(t) {
			if (this.enabled !== !1) {
				switch (t.touches.length) {
					case 0:
						s.copy(this.getMouseProjectionOnBall(t.touches[0].pageX, t.touches[0].pageY, o));
						break;
					case 1:
						c = u = 0;
						break;
					case 2:
						p.copy(this.getMouseOnScreen(t.touches[0].pageX, t.touches[0].pageY)), f.copy(p)
				}
				a = this.STATE.NONE, this.update()
			}
		}, this.handle_DOMMouseScroll = function(t) {
			this.handle_mousewheel(t)
		}, this.handle_mousewheel = function(t) {
			t.preventDefault();
			var e = 0;
			t.wheelDelta ? e = t.wheelDelta % 120 === 0 ? t.wheelDelta / 40 : t.wheelDelta : t.detail && (e = -t.detail / 3), e && (l.y += 1 / e * .01), this.mouseMoving = !0, this.update()
		}, this.handle_dblclick = function(t) {
			if (this.isCtrlDown(t)) {
				var e = this.gl3dview.getElementsByMouseEvent(t);
				e.length > 0 && (d = e[0]), this.update()
			}
		}, this.getMouseOnScreen = function(t, e) {
			return new Qe.XiangliangTwo((t - this.screen.offsetLeft) / this.radius * .5, (e - this.screen.offsetTop) / this.radius * .5)
		}, this.getRotateY = function(t, e) {
			if (this.yRistrict) {
				var i = (.5 * this.screen.height + this.screen.offsetTop - e) / this.screen.height * 2;
				return i
			}
		}, this.handle_keydown = function(t) {
			if (this.keyboardEnable) {
				switch (t.keyCode) {
					case 38:
					case 87:
						this.moveForward = !0;
						break;
					case 37:
					case 65:
						this.moveLeft = !0;
						break;
					case 40:
					case 83:
						this.moveBackward = !0;
						break;
					case 39:
					case 68:
						this.moveRight = !0;
						break;
					case 82:
						this.moveUp = !0;
						break;
					case 70:
						this.moveDown = !0;
						break;
					case 81:
						this.freeze = !this.freeze
				}
				this.update()
			}
		}, this.handle_keyup = function(t) {
			if (this.keyboardEnable) {
				switch (t.keyCode) {
					case 38:
					case 87:
						this.moveForward = !1;
						break;
					case 37:
					case 65:
						this.moveLeft = !1;
						break;
					case 40:
					case 83:
						this.moveBackward = !1;
						break;
					case 39:
					case 68:
						this.moveRight = !1;
						break;
					case 82:
						this.moveUp = !1;
						break;
					case 70:
						this.moveDown = !1
				}
				this.update()
			}
		}, this.getMouseProjectionOnBall = function(t, e) {
			if (this.yRistrict) {
				var i = new Qe.XiangliangThree((t - .5 * this.screen.width - this.screen.offsetLeft) / (.5 * this.screen.width), 0, 0),
					r = i.length();
				return r > 1 ? i.normalize() : i.z = Math.sqrt(1 - r * r), i.normalize()
			}
			var i = new Qe.XiangliangThree((t - .5 * this.screen.width - this.screen.offsetLeft) / this.radius, (.5 * this.screen.height + this.screen.offsetTop - e) / this.radius, 0),
				r = i.length();
			r > 1 ? i.normalize() : i.z = Math.sqrt(1 - r * r), n.copy(this.object._position).sub(this.object.target);
			var a = this.object.up.clone().setLength(i.y);
			return a.add(this.object.up.clone().cross(n).setLength(i.x)), a.add(n.setLength(i.z)), a
		}, this.rotateGleye = function() {
			var t = s.dot(o) / s.length() / o.length(),
				e = Math.acos(t),
				a = !this.easing || Math.abs(e) < 1e-4,
				l = !1;
			if (e) {
				var h = (new Qe.XiangliangThree).crossVectors(s, o).normalize(),
					c = new Qe.Quat;
				c.setFromAxisAngle(h, -e * this.dynamicDampingFactor * this.rotateSpeed), a ? (c.setFromAxisAngle(h, -e * this.rotateSpeed), n.applyQuaternion(c), this.object.up.applyQuaternion(c), s.copy(o)) : (c.setFromAxisAngle(h, -e * this.dynamicDampingFactor * this.rotateSpeed), n.applyQuaternion(c), this.object.up.applyQuaternion(c), c.setFromAxisAngle(h, e * this.dynamicDampingFactor), s.applyQuaternion(c), l = !0)
			}
			var a = !this.easing || Math.abs(r - i) < 1e-4,
				u = (r - i) * n.length();
			if (!xi.isNaN(u))
				if (a) u && this.yRistrict && this.limitY(u), i = r;
				else {
					var u = u * this.dynamicDampingFactor;
					u && this.yRistrict && this.limitY(u), i += (r - i) * this.dynamicDampingFactor, l = !0
				}
			l && this.gl3dview.dirtyGl3dview()
		}, this.limitY = function(t) {
			var e = n.length();
			Math.abs(n.x) <= .1 * e && Math.abs(n.z) <= .1 * e && (n.x = .1 * e);
			var i = n.x,
				r = n.z,
				a = Math.sqrt(i * i + r * r),
				s = Math.tan(this.yLowerLimitAngle) * a,
				o = Math.tan(this.yUpLimitAngle) * a;
			n.y -= t, n.y > o ? n.y = o : n.y < s && (n.y = s)
		}, this.getValueByTime = function(t, e) {
			var i = (new Date).getTime(),
				r = i - this._timeStart;
			return r > this.timeInterval ? e : t + (e - t) * r / this.timeInterval
		}, this.zoomGleye = function() {
			if (a === this.STATE.TOUCH_ZOOM) {
				var t = c / u;
				c = u, n.multiplyScalar(t)
			} else {
				var e = this.zoomSpeed;
				this.easing || (e *= 5);
				var t;
				t = 1 + (h.y - l.y) * e, 1 !== t && t > 0 && (n.multiplyScalar(t), !this.easing || Math.abs(h.y - l.y) < .001 ? l.copy(h) : (l.y += (h.y - l.y) * this.dynamicDampingFactor, this.gl3dview.dirtyGl3dview()))
			}
		}, this.panGleye = function() {
			var t = p.clone().sub(f);
			if (t.lengthSq()) {
				t.multiplyScalar(n.length() * this.panSpeed);
				var e = n.clone().cross(this.object.up).setLength(t.x);
				e.add(this.object.up.clone().setLength(t.y)), this.object._position.add(e), this.object.target.add(e), f = p, this.gl3dview.dirtyGl3dview()
			}
		}, this.checkDistances = function() {
			this.noZoom && this.noPan || (this.object._position.lengthSq() > this.maxDistance * this.maxDistance && this.object._position.setLength(this.maxDistance), n.lengthSq() < this.minDistance * this.minDistance && this.object._position.addVectors(this.object.target, n.setLength(this.minDistance)))
		}, this.updateFPS = function() {
			var t = 2;
			if (!this.freeze) {
				if (this.heightSpeed) {
					var e = Qe.Math.clamp(this.object._position.y, this.heightMin, this.heightMax),
						i = e - this.heightMin;
					this.autoSpeedFactor = t * i * this.heightCoef
				} else this.autoSpeedFactor = 0;
				var r = t * this.movementSpeed;
				if (this.moveForward || this.autoForward && !this.moveBackward) {
					var a = this.object._position.clone();
					this.object.translateZ(-(r + this.autoSpeedFactor));
					var s = this.object.target,
						o = this.object._position,
						l = new Je,
						h = new Je;
					l.subVectors(o, s), h.subVectors(a, s), l.z * h.z <= 0 && this.object.target.subVectors(this.object._position, n)
				}
				this.moveBackward && this.object.translateZ(r), this.moveLeft && (this.object.translateX(-r), this.object.target.subVectors(this.object._position, n)), this.moveRight && (this.object.translateX(r), this.object.target.subVectors(this.object._position, n)), this.moveUp && (this.object.translateY(r), this.object.target.subVectors(this.object._position, n)), this.moveDown && (this.object.translateY(-r), this.object.target.subVectors(this.object._position, n));
				var c = t * this.lookSpeed;
				!this.activeLook && !this.dragMode && (c = 0);
				var u = .1;
				if (this.constrainVertical && (u = Math.PI / (this.verticalMax - this.verticalMin)), this.lon += this.mouseX * c, this.dragMode && (this.mouseX = 0), this.lookVertical && (this.lat -= this.mouseY * c * u), this.lat = Math.max(-85, Math.min(85, this.lat)), this.phi = Qe.Math.degToRad(90 - this.lat), this.theta = Qe.Math.degToRad(this.lon), this.constrainVertical && (this.phi = Qe.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax)), this.fpsMode) {
					var f = this.object.target,
						o = this.object._position;
					f.x = o.x + 100 * Math.sin(this.phi) * Math.sin(this.theta), f.y = o.y + 100 * Math.cos(this.phi), f.z = o.z - 100 * Math.sin(this.phi) * Math.cos(this.theta), this.object.look(f)
				}
			}
		}, this.update = function() {
			if (n.subVectors(this.object._position, this.object.target), !this.noRotate && !this.fpsMode && this.rotateGleye(), !this.noZoom && !this.fpsMode && this.zoomGleye(), !this.noPan && !this.fpsMode && this.panGleye(), d && d.element && this.gl3dview.doubleClickToLookAtFunction(d.element)) {
				this.object.target = d.point;
				var t = this.object._position.distanceTo(this.object.target),
					e = d.face.normal.clone();
				e = e.applyMatrix4((new Qe.Mat4).extractRotation(d.element.worldMatrix)), e.normalize(), n = e.multiplyScalar(t), d = null
			}
			this.object.setPosition(this.object._position.clone().addVectors(this.object.target, n)), this.updateFPS(), this.fpsMode || (this.checkDistances(), this.object.look(this.object.target)), this.lastPosition.distanceToSquared(this.object._position) > 0 && this.lastPosition.copy(this.object._position)
		}
	}, Qe.extend(Qe.DefaultInteraction, Qe.BaseInteraction, {
		STATE: {
			NONE: -1,
			ROTATE: 0,
			ZOOM: 1,
			PAN: 2,
			TOUCH_ROTATE: 3,
			TOUCH_ZOOM: 4,
			TOUCH_PAN: 5
		},
		__accessor: ["rotateSpeed", "zoomSpeed", "panSpeed", "yLowerLimitAngle", "yUpLimitAngle", "minDistance", "maxDistance", "easing"],
		setUp: function() {
			this.addListener("mousedown", "touchstart", "touchend", "touchmove", "mousewheel", "DOMMouseScroll", "dblclick", "keydown", "keyup")
		},
		tearDown: function() {
			this.removeListener("mousedown", "touchstart", "touchend", "touchmove", "mousewheel", "DOMMouseScroll", "dblclick", "keydown", "keyup")
		},
		beforeUpdate: function() {},
		setUpdateIntervalTime: function(t) {
			this.updateIntervalTime = t
		}
	}), Qe.SelectionInteraction = function(t) {
		Qe.BaseInteraction.call(this, t), this.selectUnVisible = !0, this.ctrlDown = !1, this.deleteTimeoutId = null, this._areaPickingLevel = 1
	}, Qe.extend(Qe.SelectionInteraction, Qe.BaseInteraction, {
		constructor: Qe.SelectionInteraction,
		setAreaPickingLevel: function(t) {
			this._areaPickingLevel = t
		},
		getAreaPickingLevel: function() {
			return this._areaPickingLevel
		},
		setUp: function() {
			this.addListener("mousedown")
		},
		tearDown: function() {
			this.removeListener("mousedown")
		},
		setFocus: function(t) {
			if (document.activeElement !== t) {
				var e, i, r, a = document.documentElement;
				document.body;
				a && (ii.isIE || ii.isOpera || a.scrollLeft || a.scrollTop) && (e = a.scrollLeft, i = a.scrollTop, r = a), t.focus(), r && (r.scrollLeft = e, r.scrollTop = i)
			}
		},
		handle_mousedown: function(t) {
			if (1 != t.stop && !ei.isRightClick(t)) {
				this.setFocus(this.gl3dview.getView()), this.isCtrlDown(t) ? (this.addListener("mousemove", "mouseup"), this.ctrlDownEvent = t) : this.gl3dview.getServa().clearSelection();
				var e = this.gl3dview.getElementsByMouseEvent(t, !0),
					i = this.gl3dview.getFirstSelectElement(e);
				this.gl3dview.getServa().getSelectionContainer().appendSelection(i), this.gl3dview.onSelect(i)
			}
		},
		handle_mousemove: function(t) {
			var e = this.getBoundingByMouseEvent(t, this.ctrlDownEvent, this.gl3dview.devicePixelRatio);
			this.mousemoved = !0, this.gl3dview.areaPickingRect = e, this.gl3dview.paintTopCanvas()
		},
		handle_mouseup: function(t) {
			this.gl3dview.areaPickingRect = null, this.gl3dview.paintTopCanvas();
			var e = this.getBoundingByMouseEvent(t, this.ctrlDownEvent);
			if (this.removeListener("mousemove", "mouseup"), this.ctrlDownEvent = null, e && this.mousemoved) {
				var i = this.gl3dview.getElementsByBounding(e, !0, this._areaPickingLevel),
					r = new ci;
				if (i.length > 0)
					for (var a = 0; a < i.length; a++) {
						var n = i[a].element;
						this.gl3dview.selectable(i[a]) && r.add(n)
					}
				r.size() > 0 && this.gl3dview.getServa().getSelectionContainer().appendSelection(r)
			}
		},
		getBoundingByMouseEvent: function(t, e, i) {
			if (t && e) {
				var r = this.gl3dview.getView().getBoundingClientRect(),
					a = t.clientX - r.left,
					n = t.clientY - r.top,
					s = e.clientX - r.left,
					o = e.clientY - r.top,
					l = i || 1,
					h = Math.min(a, s) * l,
					c = Math.min(n, o) * l,
					u = Math.abs(a - s) * l,
					f = Math.abs(n - o) * l;
				return 0 === u && 0 === f ? null : {
					x: h,
					y: c,
					w: u,
					h: f
				}
			}
		}
	}), Qe.TransformGizmo = function() {
		var t = new Qe.TransformGizmoMaterial({
				color: 16711680
			}),
			i = new Qe.TransformGizmoMaterial({
				color: 65280
			}),
			r = new Qe.TransformGizmoMaterial({
				color: 255
			});
		this.handleGizmos = {
			X: [new Qe.Cylinder(t, .005, .005, 1, 4, 1, !1, !1), new Je(.5, 0, 0), new Je(0, 0, -Math.PI / 2)],
			Y: [new Qe.Cylinder(i, .005, .005, 1, 4, 1, !1, !1), new Je(0, .5, 0)],
			Z: [new Qe.Cylinder(r, .005, .005, 1, 4, 1, !1, !1), new Je(0, 0, .5), new Je(Math.PI / 2, 0, 0)]
		};
		var a = !1,
			n = !1;
		this.showHelpers = !0, this.showable = !0, this.init = function() {
			Qe.Element.call(this), this.handles = new Qe.Element, this.pickers = new Qe.Element, this.planes = new Qe.Element, this.addChild(this.handles), this.addChild(this.pickers), this.addChild(this.planes);
			var t = new Qe.BasicMaterial({
					wireframe: !1,
					color: 65535,
					side: Qe.DoubleSide
				}),
				e = (new Qe.Plane(t, 5e4, 5e4, 2, 2), {
					XY: new Qe.Plane(t, 5e4, 5e4, 2, 2),
					YZ: new Qe.Plane(t, 5e4, 5e4, 2, 2),
					XZ: new Qe.Plane(t, 5e4, 5e4, 2, 2),
					XYZE: new Qe.Plane(t, 5e4, 5e4, 2, 2)
				});
			e.YZ._rotation.set(0, Math.PI / 2, 0), e.XZ._rotation.set(-Math.PI / 2, 0, 0);
			for (var i in e) e[i].name = i, this.planes.addChild(e[i]), this.planes[i] = e[i], e[i]._visible = !0;
			for (var i in this.handleGizmos) {
				var r = this.handleGizmos[i][0];
				if (r.name = i, this.handleGizmos[i][1] && r._position.set(this.handleGizmos[i][1].x, this.handleGizmos[i][1].y, this.handleGizmos[i][1].z), this.handleGizmos[i][2] && r._rotation.set(this.handleGizmos[i][2].x, this.handleGizmos[i][2].y, this.handleGizmos[i][2].z), r.mode = this.mode, this.handles.addChild(r), this.pickerGizmos && this.pickerGizmos[i]) {
					var a = this.pickerGizmos[i][0];
					this.pickerGizmos[i][1] && a._position.set(this.pickerGizmos[i][1].x, this.pickerGizmos[i][1].y, this.pickerGizmos[i][1].z), this.pickerGizmos[i][2] && a._rotation.set(this.pickerGizmos[i][2].x, this.pickerGizmos[i][2].y, this.pickerGizmos[i][2].z)
				} else var a = r.clone();
				a.mode = this.mode, a.name = i, this.pickers.addChild(a)
			}
			this.iterator(function(t) {
				t instanceof Qe.Entity && Qe.Utils.transformElement(t)
			})
		}, this.hide = function() {
			this.handles.getChildren().forEach(function(t) {
				t._visible = !1
			}), this.pickers.getChildren().forEach(function(t) {
				t._visible = !1
			}), this.planes.getChildren().forEach(function(t) {
				t._visible = !1
			})
		}, this.show = function() {
			var t = this;
			this.handles.getChildren().forEach(function(e) {
				e._visible = t.showHelpers && t.showable
			}), this.pickers.getChildren().forEach(function(t) {
				t._visible = a
			}), this.activePlane && (this.activePlane._visible = n)
		}, this.highlight = function(t) {
			var i;
			for (var r in this.handleGizmos) i = this.handleGizmos[r][0], i.oldColor && (i.material instanceof Qe.ArrayMaterial ? (i.material.materials[0].color.copy(i.oldColor), i.material.materials[0].opacity = i.oldOpacity) : (i.material.color.copy(i.oldColor), i.material.opacity = i.oldOpacity), i.oldColor = null);
			this.handleGizmos[t] && (i = this.handleGizmos[t][0], i.material instanceof Qe.ArrayMaterial ? (i.oldColor = i.oldColor || i.material.materials[0].color.clone(), i.oldOpacity = i.oldOpacit !== e ? i.oldOpacity : i.material.materials[0].opacity, i.material.materials[0].opacity = 1) : (i.oldColor = i.oldColor || i.material.color.clone(), i.oldOpacity = i.material.opacity, i.setStyle("material.opacity", 1)))
		}, this.init()
	}, Qe.TransformGizmo.prototype = Object.create(Qe.Element.prototype), Qe.TransformGizmo.prototype.update = function(t, e) {
		for (var i = new Je(0, 0, 0), r = new Je(0, 1, 0), a = new ti, n = 0; n < this.getChildren().size(); n++)
			for (var s = 0; s < this.getChildren().get(n).getChildren().size(); s++) {
				var o = this.getChildren().get(n).getChildren().get(s); - 1 != o.name.search("E") ? (o.quaternion.setFromRotationMatrix(a.lookAt(e, i, r)), o._rotation.setEulerFromQuaternion(o.quaternion)) : (o.quaternion.setFromEuler(t), o._rotation.setEulerFromQuaternion(o.quaternion))
			}
	}, Qe.TransformGizmoTranslate = function() {
		Qe.TransformGizmo.call(this);
		var t = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .2
			}),
			e = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .2
			}),
			i = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .2
			}),
			r = new Qe.Arrow(t, 1, .03, .2, .05, 30),
			a = new Qe.Arrow(e, 1, .03, .2, .05, 30),
			n = new Qe.Arrow(i, 1, .03, .2, .05, 30),
			s = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .5
			}),
			o = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .5
			}),
			l = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .5
			}),
			h = new Qe.TransformGizmoMaterial({
				color: 16777215,
				opacity: .5
			}),
			c = new Qe.Circle(s, .5, 10, 0, Math.PI / 2),
			u = new Qe.Circle(o, .5, 10, 0, Math.PI / 2),
			f = new Qe.Circle(l, .5, 10, 0, Math.PI / 2),
			p = new Qe.Octahedron(h, 1e-4, 0);
		this.handleGizmos = {
			X: [r, new Je(1.6, 0, 0), new Je(0, 0, -Math.PI / 2)],
			Y: [a, new Je(0, 1.6, 0)],
			Z: [n, new Je(0, 0, 1.6), new Je(Math.PI / 2, 0, 0)],
			XYZ: [p],
			XY: [c, new Je(0, 0, 0)],
			YZ: [u, new Je(0, 0, 0), new Je(Math.PI / 2, Math.PI / 2, 0)],
			XZ: [f, new Je(0, 0, 0), new Je(Math.PI / 2, 0, 0)]
		};
		var h = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .25
			}),
			d = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .25
			}),
			m = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .25
			}),
			g = new Qe.Cylinder(h, .075, 0, 1.2, 4, 1, !1),
			y = new Qe.Cylinder(d, .075, 0, 1.2, 4, 1, !1),
			v = new Qe.Cylinder(m, .075, 0, 1.2, 4, 1, !1),
			p = new Qe.Octahedron(h, 1e-4, 0);
		this.pickerGizmos = {
			X: [g, new Je(1.6, 0, 0), new Je(0, 0, -Math.PI / 2)],
			Y: [y, new Je(0, 1.6, 0)],
			Z: [v, new Je(0, 0, 1.6), new Je(Math.PI / 2, 0, 0)],
			XYZ: [p]
		}, this.setActivePlane = function(t, e) {
			var i = new ti;
			e.applyProjection(i.getInverse(i.extractRotation(this.planes.XY.worldMatrix))), "X" == t && (this.activePlane = this.planes.XY, Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)), "Y" == t && (this.activePlane = this.planes.XY, Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)), "Z" == t && (this.activePlane = this.planes.XZ, Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)), "XYZ" == t && (this.activePlane = this.planes.XYZE), "XY" == t && (this.activePlane = this.planes.XY), "YZ" == t && (this.activePlane = this.planes.YZ), "XZ" == t && (this.activePlane = this.planes.XZ), this.hide(), this.show()
		}, this.init()
	}, Qe.TransformGizmoTranslate.prototype = Object.create(Qe.TransformGizmo.prototype), Qe.TransformGizmoTranslate.prototype.mode = "translate", Qe.TransformGizmoRotate = function() {
		Qe.TransformGizmo.call(this);
		var t = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .2
			}),
			e = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .2
			}),
			i = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .2
			}),
			r = new Qe.TransformGizmoMaterial({
				color: 16776960
			}),
			a = new Qe.TransformGizmoMaterial({
				color: 7895160,
				opacity: .25
			}),
			a = new Qe.TransformGizmoMaterial({
				color: 16711680
			}),
			n = new Qe.Torus(t, 1, .02, 4, 32, Math.PI),
			s = new Qe.Torus(e, 1, .02, 4, 32, Math.PI),
			o = new Qe.Torus(i, 1, .02, 4, 32, Math.PI);
		new Qe.Torus(r, 1.25, .01, 4, 64),
			new Qe.Torus(a, 1, .01, 4, 64);
		this.handleGizmos = {
			X: [n, new Je(0, 0, 0), new Je(0, -Math.PI / 2, -Math.PI / 2)],
			Y: [s, new Je(0, 0, 0), new Je(Math.PI / 2, 0, 0)],
			Z: [o, new Je(0, 0, 0), new Je(0, 0, -Math.PI / 2)]
		};
		var l = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .25
			}),
			h = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .25
			}),
			c = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .25
			}),
			u = new Qe.TransformGizmoMaterial({
				color: 983040,
				opacity: .25
			}),
			f = new Qe.Torus(l, 1, .05, 4, 12, Math.PI),
			p = new Qe.Torus(h, 1, .05, 4, 12, Math.PI),
			d = new Qe.Torus(c, 1, .05, 4, 12, Math.PI);
		new Qe.Torus(u, 1, .05, 2, 24);
		this.pickerGizmos = {
			X: [f, new Je(0, 0, 0), new Je(0, -Math.PI / 2, -Math.PI / 2)],
			Y: [p, new Je(0, 0, 0), new Je(Math.PI / 2, 0, 0)],
			Z: [d, new Je(0, 0, 0), new Je(0, 0, -Math.PI / 2)]
		}, this.setActivePlane = function(t) {
			"E" == t && (this.activePlane = this.planes.XYZE), "X" == t && (this.activePlane = this.planes.YZ), "Y" == t && (this.activePlane = this.planes.XZ), "Z" == t && (this.activePlane = this.planes.XY), this.hide(), this.show()
		}, this.update = function(t, e) {
			Qe.TransformGizmo.prototype.update.apply(this, arguments);
			var i = {
					handles: this.handles,
					pickers: this.pickers
				},
				r = new ti,
				a = new Qe.Euler(0, 0, 1),
				n = new Qe.Quat,
				s = new Je(1, 0, 0),
				o = new Je(0, 1, 0),
				l = new Je(0, 0, 1),
				h = new Qe.Quat,
				c = new Qe.Quat,
				u = new Qe.Quat,
				f = e.clone();
			a.copy(this.planes.XY._rotation), n.setFromEuler(a), r.makeRotationFromQuaternion(n).getInverse(r), f.applyProjection(r);
			for (var p in i)
				for (var d = 0; d < i[p].getChildren().size; d++) {
					var m = i[p].getChildren().get(d);
					n.setFromEuler(a), "X" == m.name && (h.setFromAxisAngle(s, Math.atan2(-f.y, f.z)), n.multiplyQuaternions(n, h), m.quaternion.copy(n)), "Y" == m.name && (c.setFromAxisAngle(o, Math.atan2(f.x, f.z)), n.multiplyQuaternions(n, c), m.quaternion.copy(n)), "Z" == m.name && (u.setFromAxisAngle(l, Math.atan2(f.y, f.x)), n.multiplyQuaternions(n, u), m.quaternion.copy(n))
				}
		}, this.init()
	}, Qe.TransformGizmoRotate.prototype = Object.create(Qe.TransformGizmo.prototype), Qe.TransformGizmoRotate.prototype.mode = "rotate", Qe.TransformGizmoScale = function() {
		Qe.TransformGizmo.call(this);
		var t = new Qe.TransformGizmoMaterial({
				color: 11184810,
				opacity: 1
			}),
			e = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .2
			}),
			i = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .2
			}),
			r = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .2
			}),
			a = new Qe.Cube(t, .25, .25, .25),
			n = new Qe.Cylinder(null, .1, .1, 1, 4, 1, !1),
			s = new Qe.Cube(t, .225, .225, .225),
			o = new Qe.Cylinder(null, .1, 0, 1, 20, 1, !0);
		o._position.y = .05;
		var o = Qe.Utils.createElement(n, o, e),
			l = (Qe.Utils.createElement(n, o, i), Qe.Utils.createElement(n, o, r), new Qe.Cylinder(e, .08, 0, 1, 4, 1, !1)),
			h = new Qe.Cylinder(i, .08, 0, 1, 4, 1, !1),
			c = new Qe.Cylinder(r, .08, 0, 1, 4, 1, !1),
			u = new Qe.Element;
		u.material = new Qe.BasicMaterial;
		var f = new Qe.Element;
		f.material = new Qe.BasicMaterial;
		var p = new Qe.Element;
		p.material = new Qe.BasicMaterial, this.handleGizmos = {
			X: [l, new Je(.5, 0, 0), new Je(0, 0, -Math.PI / 2)],
			Y: [h, new Je(0, .5, 0)],
			Z: [c, new Je(0, 0, .5), new Je(Math.PI / 2, 0, 0)],
			XY: [u],
			YZ: [f],
			XZ: [p],
			XYZ: [a]
		};
		var d = new Qe.TransformGizmoMaterial({
				color: 16711680,
				opacity: .25
			}),
			m = new Qe.TransformGizmoMaterial({
				color: 65280,
				opacity: .25
			}),
			g = new Qe.TransformGizmoMaterial({
				color: 255,
				opacity: .25
			}),
			y = new Qe.Cylinder(d, .125, 0, 1, 4, 1, !1),
			v = new Qe.Cylinder(m, .125, 0, 1, 4, 1, !1),
			x = new Qe.Cylinder(g, .125, 0, 1, 4, 1, !1);
		this.pickerGizmos = {
			X: [y, new Je(.6, 0, 0), new Je(Math.PI / 4, 0, -Math.PI / 2)],
			Y: [v, new Je(0, .6, 0), new Je(0, Math.PI / 4, 0)],
			Z: [x, new Je(0, 0, .6), new Je(Math.PI / 2, Math.PI / 4, 0)],
			XYZ: [s]
		}, this.setActivePlane = function(t, e) {
			var i = new ti;
			e.applyProjection(i.getInverse(i.extractRotation(this.planes.XY.worldMatrix))), "X" == t ? (this.activePlane = this.planes.XY, Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)) : "Y" == t ? (this.activePlane = this.planes.XY, Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)) : "Z" == t ? (this.activePlane = this.planes.XZ, Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)) : "XYZ" == t ? this.activePlane = this.planes.XYZE : this.activePlane = this.planes[t], this.hide(), this.show()
		}, this.init()
	}, Qe.TransformGizmoScale.prototype = Object.create(Qe.TransformGizmo.prototype), Qe.TransformGizmoScale.prototype.mode = "scale", Qe.EditInteraction = function(i) {
		function r(e) {
			if (y.gl3dview._keyboardRemoveEnabled && 46 == e.keyCode && i.getServa().getSelectionContainer().size() > 0) {
				var r = "Delete?";
				t.confirm(r) && i.getServa().removeSelection()
			}
		}

		function a(e) {
			1 === e.touches.length && (y.deleteTimeoutId = setTimeout(function() {
				var i = y.gl3dview.getElementsByMouseEvent(e, y.selectUnVisible);
				if (i.length > 0) {
					var r = i[0],
						a = "Delete?";
					t.confirm(a) && y.gl3dview.getServa().remove(r.element)
				}
			}, 300))
		}

		function n(t) {
			clearTimeout(y.deleteTimeoutId)
		}

		function s(t) {
			clearTimeout(y.deleteTimeoutId)
		}

		function o(t) {
			y.update()
		}

		function l(t) {
			if (y.object && !v) {
				t.preventDefault(), t.stopPropagation();
				var e = t.touches ? t.touches[0] : t,
					i = p(e, y.filterIntersectPicker(y.pickers));
				if (i) y.axis = i.object.name, y.setMode(i.object.mode);
				else {
					var r = u(t);
					r === y.object || null != r && r.editTransformToParent && r.isDescendantOf(y.object) ? (y.axis = y.getAxis(), y.setMode(y.getMode())) : y.axis = !1
				}
				y.update(!0)
			}
		}

		function h(t) {
			if (!t.stop) {
				if (Q.set(t.clientX, t.clientY), y.showHelpers && y.axis || (f(t), l(t)), !y.object || v) return void y.gl3dview.dirtyGl3dview();
				t.preventDefault(), t.stopPropagation();
				var r = t.touches ? t.touches[0] : t;
				if (0 === r.button || r.button == e) {
					var a = y.filterIntersectPicker(y.pickers),
						n = p(r, a),
						s = u(t);
					if (n || (s === y.object || null != s && s.editTransformToParent && s.isDescendantOf(y.object)) && y.getDefaultPickers() && (n = {
							object: y.getDefaultPickers()
						}), n) {
						y.axis = n.object.name, P.copy(q).sub(W).normalize(), y.gizmo[x].setActivePlane(y.axis, P);
						var o = p(r, [y.gizmo[x].activePlane]);
						if (!o && s && (o = p(r, [s])), o) {
							U.copy(y.object._position), k.copy(y.object._scale), O.extractRotation(y.object.matrix), j.extractRotation(y.object.worldMatrix);
							var h = y.object.getParent();
							h == e && (h = i), X.extractRotation(h.worldMatrix), G.getScaleFromMatrix(T.getInverse(h.worldMatrix)), _.copy(o.point)
						}
					}
				}
				y.update(!0), v = !0
			}
		}

		function c(t) {
			if (y.object && y.axis && v) {
				t.preventDefault(), t.stopPropagation(), t.stop = !0;
				var e = t.touches ? t.touches[0] : t,
					r = p(e, [y.gizmo[x].activePlane]);
				if (r || (r = p(e, [y.object])), r) {
					if (y.moving ? i.fireInteractionEvent({
							kind: "liveMoveBetween",
							event: ji
						}) : (i.fireInteractionEvent({
							kind: "liveMoveStart",
							event: ji
						}), y.moving = !0), w.copy(r.point), "translate" == x && y.translateable) {
						if (w.sub(_), w.multiply(G), "local" == y.space && (w.applyMatrix4(T.getInverse(j)), -1 == y.axis.search("X") && (w.x = 0), -1 == y.axis.search("Y") && (w.y = 0), -1 == y.axis.search("Z") && (w.z = 0), w.applyMatrix4(O), y.object.setPosition(U.clone().add(w))), "world" == y.space || -1 != y.axis.search("XYZ")) {
							-1 == y.axis.search("X") && (w.x = 0), -1 == y.axis.search("Y") && (w.y = 0), -1 == y.axis.search("Z") && (w.z = 0), w.applyMatrix4(T.getInverse(X)), y.object._position.copy(U);
							var a = y.object._position.clone().add(w);
							y.snap && (-1 != y.axis.search("X") && (a.x = Math.round(y.object._position.x / y.snap) * y.snap), -1 != y.axis.search("Y") && (a.y = Math.round(y.object._position.y / y.snap) * y.snap), -1 != y.axis.search("Z") && (a.z = Math.round(y.object._position.z / y.snap) * y.snap)), y.object.setPosition(a)
						}
					} else if ("scale" == x && y.scaleable) {
						w.sub(_), w.multiply(G);
						var n = y.object._scale.clone(),
							s = (y.scaleRate || 1) / 10;
						if ("XYZ" == y.axis) h = 1 + w.y * s, n.x = k.x * h, n.y = k.y * h, n.z = k.z * h;
						else if ("XY" === y.axis) {
							var o = 1 + w.x * s,
								l = 1 + w.y * s;
							if (y.forceSameScale) {
								var h = Math.max(o, l);
								n.x = k.x * h, n.y = k.y * h
							} else n.x = k.x * o, n.y = k.y * l
						} else if ("YZ" === y.axis) {
							var c = 1 + w.z * s,
								l = 1 + w.y * s;
							if (y.forceSameScale) {
								var h = Math.max(c, l);
								n.z = k.z * h, n.y = k.y * h
							} else n.z = k.z * c, n.y = k.y * l
						} else if ("XZ" === y.axis) {
							var o = 1 + w.x * s,
								c = 1 + w.z * s;
							if (y.forceSameScale) {
								var h = Math.max(o, l);
								n.x = k.x * h, n.z = k.z * h
							} else n.x = k.x * o, n.z = k.z * c
						} else w.applyMatrix4(T.getInverse(j)), "X" == y.axis && (n.x = k.x * (1 + w.x * s)), "Y" == y.axis && (n.y = k.y * (1 + w.y * s)), "Z" == y.axis && (n.z = k.z * (1 + w.z * s));
						y.object.setScale(n)
					} else if ("rotate" == x && y.rotateable)
						if (w.sub(W), w.multiply(G), z.copy(_).sub(W), z.multiply(G), "E" == y.axis) w.applyMatrix4(T.getInverse(C)), z.applyMatrix4(T.getInverse(C)), S.set(Math.atan2(w.z, w.y), Math.atan2(w.x, w.z), Math.atan2(w.y, w.x)), b.set(Math.atan2(z.z, z.y), Math.atan2(z.x, z.z), Math.atan2(z.y, z.x)), L.setFromRotationMatrix(T.getInverse(X)), V.setFromAxisAngle(P, S.z - b.z), N.setFromRotationMatrix(j), L.multiplyQuaternions(L, V), L.multiplyQuaternions(L, N), y.object.quaternion.copy(L);
						else if ("XYZE" == y.axis) V.setFromEuler(w.clone().cross(z).normalize()), L.setFromRotationMatrix(T.getInverse(X)), R.setFromAxisAngle(V, -w.clone().angleTo(z)), N.setFromRotationMatrix(j), L.multiplyQuaternions(L, R), L.multiplyQuaternions(L, N), y.object.quaternion.copy(L);
					else if ("local" == y.space) {
						w.applyMatrix4(T.getInverse(j)), z.applyMatrix4(T.getInverse(j)), S.set(Math.atan2(w.z, w.y), Math.atan2(w.x, w.z), Math.atan2(w.y, w.x)), b.set(Math.atan2(z.z, z.y), Math.atan2(z.x, z.z), Math.atan2(z.y, z.x)), N.setFromRotationMatrix(O), R.setFromAxisAngle(E, S.x - b.x), I.setFromAxisAngle(D, S.y - b.y), F.setFromAxisAngle(B, S.z - b.z), "X" == y.axis && N.multiplyQuaternions(N, R), "Y" == y.axis && N.multiplyQuaternions(N, I), "Z" == y.axis && N.multiplyQuaternions(N, F), y.object.quaternion.copy(N);
						var u = y.object._rotation.clone();
						u.setEulerFromQuaternion(N), y.object.setRotation(u)
					} else if ("world" == y.space) {
						S.set(Math.atan2(w.z, w.y), Math.atan2(w.x, w.z), Math.atan2(w.y, w.x)), b.set(Math.atan2(z.z, z.y), Math.atan2(z.x, z.z), Math.atan2(z.y, z.x)), L.setFromRotationMatrix(T.getInverse(X)), R.setFromAxisAngle(E, S.x - b.x), I.setFromAxisAngle(D, S.y - b.y), F.setFromAxisAngle(B, S.z - b.z), N.setFromRotationMatrix(j), "X" == y.axis && L.multiplyQuaternions(L, R), "Y" == y.axis && L.multiplyQuaternions(L, I), "Z" == y.axis && L.multiplyQuaternions(L, F), L.multiplyQuaternions(L, N), y.object.quaternion.copy(L);
						var u = y.object._rotation.clone();
						u.setEulerFromQuaternion(L), y.object.setRotation(u)
					}
					y.changed = !0
				}
				y.update(!0), y.updateTextNote(t, y.object)
			}
		}

		function u(t) {
			var e = y.gl3dview.getElementsByMouseEvent(t);
			return i.getFirstEditElement(e)
		}

		function f(t) {
			if (null === Z && (Z = new Ke), Z.set(t.clientX, t.clientY), i.getServa().clearEditing(), 0 === Z.distanceTo(Q)) {
				var e = y.gl3dview.getElementsByMouseEvent(t),
					r = i.getFirstEditElement(e);
				r && (r !== y.object, y.object = r, y.translateable && y.gizmo.translate.show(), y.rotateable && y.gizmo.rotate.show(), y.scaleable && y.gizmo.scale.show()), r || (y.gizmo[x].hide(), y.gizmo.translate.hide(), y.gizmo.rotate.hide(), y.gizmo.scale.hide(), y.object = null)
			} else y.changed && y.onElementPropertyChanged && (y.changed = !1, y.moving = !1, y.onElementPropertyChanged(t, y.object), i.fireInteractionEvent({
				kind: "liveMoveEnd",
				event: ji
			}));
			y.axis = !1, v = !1, y.update(!0), y.hideTextNote()
		}

		function p(t, e) {
			if (!e) return null;
			var i = y.gl3dview.getPickingByEvent(t),
				r = i.intersectObjects(e, !0, !0);
			return r[0] ? r[0] : !1
		}
		Qe.BaseInteraction.call(this, i);
		var d = new Qe.Element,
			m = i.getGleye(),
			g = i.getRootView();
		g = g !== e ? g : document, this.domElement = g, this.gizmo = {}, this.gizmo.translate = new Qe.TransformGizmoTranslate, this.gizmo.rotate = new Qe.TransformGizmoRotate, this.gizmo.scale = new Qe.TransformGizmoScale, d.addChild(this.gizmo.translate), d.addChild(this.gizmo.rotate), d.addChild(this.gizmo.scale), this.gizmo.translate.hide(), this.gizmo.rotate.hide(), this.gizmo.scale.hide(), this.object = !1, this.snap = !1, this.space = "local", this.size = 1, this.axis = !1;
		var y = this;
		this.scaleable = !0, this.rotateable = !0, this.translateable = !0, this.setShowHelpers(!0);
		var v = !1,
			x = "translate",
			A = {
				type: "change"
			},
			w = (new Qe.Picking, new Qe.Projector, new Je, new Je),
			_ = new Je,
			S = new Je,
			b = new Je,
			M = 1,
			C = new ti,
			P = new Je,
			T = new ti,
			z = new Je,
			L = new Qe.Quat,
			E = new Je(1, 0, 0),
			D = new Je(0, 1, 0),
			B = new Je(0, 0, 1),
			N = new Qe.Quat,
			R = new Qe.Quat,
			I = new Qe.Quat,
			F = new Qe.Quat,
			V = new Qe.Quat,
			U = new Je,
			k = new Je,
			O = new ti,
			X = new ti,
			G = new Je,
			W = new Je,
			H = new Qe.Euler,
			j = new ti,
			q = new Je,
			Y = new Qe.Euler;
		this.showNote = !0, this.handleServaChange = function(t) {
			"remove" == t.kind ? t.data == y.object && (y.gizmo.translate.hide(), y.gizmo.rotate.hide(), y.gizmo.scale.hide()) : "clear" == t.kind && (y.gizmo.translate.hide(), y.gizmo.rotate.hide(), y.gizmo.scale.hide())
		}, this.gl3dview.getServa().addServaChangeListener(this.handleServaChange, this), this.gl3dview.addPropertyChangeListener(function(t) {
			if ("dataBox" == t.property) {
				var e = t.oldValue,
					i = t.value;
				e.removeServaChangeListener(this.handleServaChange), i.addServaChangeListener(this.handleServaChange, this)
			}
		}), this.defaultMode = "TranslateXY", this.pickers = [], this.gizmo.translate.pickers.getChildren().forEach(function(t) {
			y.pickers.push(t)
		}), this.gizmo.rotate.pickers.getChildren().forEach(function(t) {
			y.pickers.push(t)
		}), this.gizmo.scale.pickers.getChildren().forEach(function(t) {
			y.pickers.push(t)
		}), this.attach = function(t) {
			y.object = t, this.gizmo.translate.hide(), this.gizmo.rotate.hide(), this.gizmo.scale.hide(), this.gizmo[x].show(), y.update()
		}, this.detach = function(t) {
			y.object = !1, this.axis = !1, this.gizmo.translate.hide(), this.gizmo.rotate.hide(), this.gizmo.scale.hide()
		}, this.setMode = function(t) {
			x = t ? t : x, this.update()
		}, this.setUp = function() {
			g.addEventListener("mousedown", h, !1), g.addEventListener("touchstart", h, !1), g.addEventListener("mousemove", l, !1), g.addEventListener("touchmove", l, !1), g.addEventListener("mousemove", c, !1), g.addEventListener("touchmove", c, !1), g.addEventListener("mouseup", f, !1), g.addEventListener("mouseout", f, !1), g.addEventListener("touchend", f, !1), g.addEventListener("touchcancel", f, !1), g.addEventListener("touchleave", f, !1), g.addEventListener("keydown", r, !1), g.addEventListener("touchstart", a, !1), g.addEventListener("touchmove", n, !1), g.addEventListener("touchend", s, !1), g.addEventListener("mousewheel", o, !1), y.gl3dview.helperBox.addByDescendant(d)
		}, this.tearDown = function() {
			g.removeEventListener("mousedown", h, !1), g.removeEventListener("touchstart", h, !1), g.removeEventListener("mousemove", l, !1), g.removeEventListener("touchmove", l, !1), g.removeEventListener("mousemove", c, !1), g.removeEventListener("touchmove", c, !1), g.removeEventListener("mouseup", f, !1), g.removeEventListener("mouseout", f, !1), g.removeEventListener("touchend", f, !1), g.removeEventListener("touchcancel", f, !1), g.removeEventListener("touchleave", f, !1), g.removeEventListener("keydown", r, !1), g.removeEventListener("touchstart", a, !1), g.removeEventListener("touchmove", n, !1), g.removeEventListener("touchend", s, !1), g.removeEventListener("mousewheel", o, !1), y.gizmo.translate.hide(), y.gizmo.rotate.hide(), y.gizmo.scale.hide(), y.gl3dview.helperBox.removeByDescendant(d)
		}, this.setSnap = function(t) {
			y.snap = t
		}, this.setSize = function(t) {
			y.size = t, y.dispatchEvent(A), this.update()
		}, this.setSpace = function(t) {
			y.space = t, this.update()
		}, this.update = function(t) {
			y.object && (y.object.updateWorldMatrix(), W.getPositionFromMatrix(y.object.worldMatrix), H.setFromRotationMatrix(T.extractRotation(y.object.worldMatrix)), m.updateWorldMatrix(), q.getPositionFromMatrix(m.worldMatrix), Y.setFromRotationMatrix(T.extractRotation(m.worldMatrix)), M = W.distanceTo(q) / 12 * y.size, d.setPosition(W), d.setScale(M, M, M), P.copy(q).sub(W).normalize(), this.gizmo.scale.update(H, P), "local" == y.space ? (this.gizmo.translate.update(H, P), this.gizmo.rotate.update(H, P)) : (this.gizmo.translate.update(new Qe.Euler, P), this.gizmo.rotate.update(new Qe.Euler, P)), this.gizmo.translate.highlight(null), this.gizmo.rotate.highlight(null), this.gizmo.scale.highlight(null), this.gizmo[x].highlight(y.axis), d.updateWorldMatrix(!0), t && y.gl3dview.dirtyGl3dview())
		}, this.getDefaultPickers = function() {
			return "TranslateX" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(0) : "TranslateY" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(1) : "TranslateZ" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(2) : "TranslateXY" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(4) : "TranslateYZ" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(5) : "TranslateXZ" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(6) : "TranslateXYZ" === this.defaultMode ? y.gizmo.translate.pickers.getChildren().get(3) : "RotateX" === this.defaultMode ? y.gizmo.rotate.pickers.getChildren().get(0) : "RotateY" === this.defaultMode ? y.gizmo.rotate.pickers.getChildren().get(1) : "RotateZ" === this.defaultMode ? y.gizmo.rotate.pickers.getChildren().get(2) : "ScaleX" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(0) : "ScaleY" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(1) : "ScaleZ" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(2) : "ScaleXYZ" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(6) : "ScaleXY" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(3) : "ScaleYZ" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(4) : "ScaleXZ" === this.defaultMode ? y.gizmo.scale.pickers.getChildren().get(5) : null
		}, this.getMode = function() {
			var t = this.defaultMode;
			return t.startsWith("Translate") ? "translate" : t.startsWith("Rotate") ? "rotate" : t.startsWith("Scale") ? "scale" : "translate"
		}, this.getAxis = function() {
			var t = this.defaultMode;
			return t.endsWith("XYZ") ? "XYZ" : t.endsWith("XY") ? "XY" : t.endsWith("YZ") ? "YZ" : t.endsWith("XZ") ? "XZ" : t.endsWith("Y") ? "X" : t.endsWith("Y") ? "Y" : t.endsWith("Z") ? "Z" : ""
		};
		var Z = null,
			Q = new Ke;
		this.filterIntersectPicker = function(t) {
			var e = [];
			if (!this.showHelpers) return e;
			for (var i = 0; i < t.length; i++) {
				var r = t[i];
				r.getParent() === this.gizmo.translate.pickers && this.translateable && e.push(r), r.getParent() === this.gizmo.rotate.pickers && this.rotateable && e.push(r), r.getParent() === this.gizmo.scale.pickers && this.scaleable && e.push(r)
			}
			return e
		}
	}, Qe.extend(Qe.EditInteraction, Qe.BaseInteraction, {
		setShowHelpers: function(t) {
			this.showHelpers = t, this.gizmo.translate.showHelpers = t, this.gizmo.rotate.showHelpers = t, this.gizmo.scale.showHelpers = t, this.resetHelpers()
		},
		onElementPropertyChanged: function(t, e) {},
		resetHelpers: function() {
			this.showHelpers && this.translateable && this.object ? this.gizmo.translate.show() : this.gizmo.translate.hide(), this.showHelpers && this.rotateable && this.object ? this.gizmo.rotate.show() : this.gizmo.rotate.hide(), this.showHelpers && this.scaleable && this.object ? this.gizmo.scale.show() : this.gizmo.scale.hide(), this.update(!0)
		},
		setShowNote: function(t) {
			this.showNote = t
		},
		setScaleable: function(t) {
			this.scaleable = t, this.gizmo.scale.showable = t, this.resetHelpers()
		},
		setRotateable: function(t) {
			this.rotateable = t, this.gizmo.rotate.showable = t, this.resetHelpers()
		},
		setTranslateable: function(t) {
			this.translateable = t, this.gizmo.translate.showable = t, this.resetHelpers()
		},
		setDefaultMode: function(t) {
			this.defaultMode = t
		},
		setScaleRate: function(t) {
			this.scaleRate = t || 1
		},
		setForceSameScale: function(t) {
			this.forceSameScale = t
		},
		setSpaceMode: function(t) {
			"world" == t ? this.space = "world" : this.space = "local", this.update()
		},
		createTextNote: function() {
			this.textNote = document.createElement("div"), this.textNote.style.position = "relative", this.textNote.style.color = "black", this.textNote.style.height = "0px", this.textNote.style.zIndex = "1000", this.domElement.appendChild(this.textNote);
			var t = document.createElement("table");
			this.noteTable = t, this.textNote.appendChild(this.noteTable);
			t.createTHead();
			t.style.borderLeft = "1px solid #ffa500", t.style.borderTop = "1px solid #ffa500", t.style.fontSize = "14px", t.style.backgroundColor = "rgba(255, 170, 13, 0.5)", t.setAttribute("border", 0), t.setAttribute("cellspacing", 0), t.setAttribute("cellpadding", 0);
			for (var e = 0; 4 > e; e++) {
				for (var i = document.createElement("tr"), r = 0; 4 > r; r++) {
					var a = document.createElement("td");
					a.style.borderRight = "1px solid #ffa500", a.style.borderBottom = "1px solid #ffa500", a.style.paddingLeft = "5px", a.style.paddingRight = "5px", a.style.paddingTop = "2px", a.style.paddingBottom = "2px", 0 == e && r > 0 || e > 0 && 0 == r ? (a.style.textAlign = "center", a.style.fontWeight = "bold") : a.style.textAlign = "right", i.appendChild(a)
				}
				t.appendChild(i)
			}
		},
		showTextNote: function() {
			this.showNote && (null == this.textNote && this.createTextNote(), this.textNote.style.display = "")
		},
		hideTextNote: function() {
			this.textNote && (this.textNote.style.display = "none")
		},
		updateTextNote: function(t, e) {
			if (null != e && this.showNote) {
				var i = this.gl3dview.getRootView().getBoundingClientRect();
				this.showTextNote(), this.textNote.style.top = t.clientY - i.top + 20 + "px", this.textNote.style.left = t.clientX - i.left + 20 + "px";
				for (var r = e.getRotation(), a = e.getPosition(), n = e.getScale(), s = [
						[" ", "x", "y", "z"],
						["p", a.x, a.y, a.z],
						["r", r.x, r.y, r.z],
						["s", n.x, n.y, n.z]
					], o = this.noteTable, l = 0; 4 > l; l++)
					for (var h = 0; 4 > h; h++) {
						var c = s[l][h];
						l > 0 && h > 0 && (c = 2 == l ? (180 * c / Math.PI).toFixed(0) + "&deg;" : c.toFixed(2)), o.rows[l].cells[h].innerHTML = "" + c
					}
			}
		}
	});
	var or = 1e-5,
		lr = 0,
		hr = 1,
		cr = 2,
		ur = 3;
	Qe.CSG = function(t) {
		var e, i, r, a, n, s, o, l = [];
		if (!(t instanceof Qe.Element)) {
			if (t instanceof dr) return this.tree = t, this.matrix = new ti, this;
			throw "TGL.CSG: Given geometry is unsupported"
		}
		for (t.computeNodeData && t.computeNodeData(), t.updateWorldMatrix(!0), this.matrix = t.worldMatrix.clone(), e = 0, i = t.faces.length; i > e; e++) {
			if (r = t.faces[e], n = t.uvs[e], s = t.uv2s[e], o = new fr, r instanceof mi) a = t.vertices[r.a], a = new pr(a.x, a.y, a.z, r.vertexNormals[0], new Ke(n[0].x, n[0].y), s[0].clone()), a.materialIndex = r.materialIndex, a.applyMatrix4(this.matrix), o.vertices.push(a), a = t.vertices[r.b], a = new pr(a.x, a.y, a.z, r.vertexNormals[1], new Ke(n[1].x, n[1].y), s[1].clone()), a.materialIndex = r.materialIndex, a.applyMatrix4(this.matrix), o.vertices.push(a), a = t.vertices[r.c], a = new pr(a.x, a.y, a.z, r.vertexNormals[2], new Ke(n[2].x, n[2].y), s[2].clone()), a.applyMatrix4(this.matrix), a.materialIndex = r.materialIndex, o.vertices.push(a);
			else {
				if (!(r instanceof gi)) throw "Invalid face type at index " + e;
				a = t.vertices[r.a], a = new pr(a.x, a.y, a.z, r.vertexNormals[0], new Ke(n[0].x, n[0].y), s[0].clone()), a.materialIndex = r.materialIndex, a.applyMatrix4(this.matrix), o.vertices.push(a), a = t.vertices[r.b], a = new pr(a.x, a.y, a.z, r.vertexNormals[1], new Ke(n[1].x, n[1].y), s[1].clone()), a.materialIndex = r.materialIndex, a.applyMatrix4(this.matrix), o.vertices.push(a), a = t.vertices[r.c], a = new pr(a.x, a.y, a.z, r.vertexNormals[2], new Ke(n[2].x, n[2].y), s[2].clone()), a.materialIndex = r.materialIndex, a.applyMatrix4(this.matrix), o.vertices.push(a), a = t.vertices[r.d], a = new pr(a.x, a.y, a.z, r.vertexNormals[3], new Ke(n[3].x, n[3].y), s[3].clone()), a.applyMatrix4(this.matrix), a.materialIndex = r.materialIndex, o.vertices.push(a)
			}
			isNaN(o.calculateProperties().w) ? console.log("Not right polygon") : l.push(o)
		}
		if (this.tree = new dr(l), this.tree.materialSize = t.getMaterialSize ? t.getMaterialSize() : 0, t.material instanceof Qe.ArrayMaterial) this.tree.material = t.material;
		else {
			var h = new Qe.ArrayMaterial;
			this.tree.material = h;
			for (var e = 0; e < this.tree.materialSize; e++) h.push(t.material)
		}
	}, Qe.CSG.prototype.substract = function(t) {
		var e = this.tree.clone(),
			i = t.tree.clone();
		return e.sumMateriaSize(i), e.invert(), e.clipTo(i), i.clipTo(e), i.invert(), i.clipTo(e), i.invert(), e.build(i.allPolygons()), e.invert(), e = new Qe.CSG(e), e.matrix = this.matrix, e
	}, Qe.CSG.prototype.union = function(t) {
		var e = this.tree.clone(),
			i = t.tree.clone();
		return e.sumMateriaSize(i), e.clipTo(i), i.clipTo(e), i.invert(), i.clipTo(e), i.invert(), e.build(i.allPolygons()), e = new Qe.CSG(e), e.matrix = this.matrix, e
	}, Qe.CSG.prototype.intersect = function(t) {
		var e = this.tree.clone(),
			i = t.tree.clone();
		return e.sumMateriaSize(i), e.invert(), i.clipTo(e), i.invert(), e.clipTo(i), i.clipTo(e), e.build(i.allPolygons()), e.invert(), e = new Qe.CSG(e), e.matrix = this.matrix, e
	}, Qe.CSG.prototype.inverse = function() {
		var t = this.tree.clone();
		return t.polygons.map(function(t) {
			t.flip()
		}), t = new Qe.CSG(t)
	}, Qe.CSG.prototype.toGeometry = function(t) {
		var e, i, r, a, n, s, o, l, h, c, u, f = ((new ti).getInverse(this.matrix), new Qe.Entity(this.tree.material, t)),
			p = this.tree.allPolygons(),
			d = p.length,
			m = {};
		for (e = 0; d > e; e++)
			for (r = p[e], a = r.vertices.length, i = 2; a > i; i++) {
				c = [], u = [], l = r.vertices[0], c.push(new Ke(l.uv.x, l.uv.y)), u.push(l.uv2.clone());
				var g = l.materialIndex;
				l = new Je(l.x, l.y, l.z), "undefined" != typeof m[l.x + "," + l.y + "," + l.z] ? n = m[l.x + "," + l.y + "," + l.z] : (f.vertices.push(l), n = m[l.x + "," + l.y + "," + l.z] = f.vertices.length - 1), l = r.vertices[i - 1], c.push(new Ke(l.uv.x, l.uv.y)), u.push(l.uv2.clone()), l = new Je(l.x, l.y, l.z), "undefined" != typeof m[l.x + "," + l.y + "," + l.z] ? s = m[l.x + "," + l.y + "," + l.z] : (f.vertices.push(l), s = m[l.x + "," + l.y + "," + l.z] = f.vertices.length - 1), l = r.vertices[i], c.push(new Ke(l.uv.x, l.uv.y)), u.push(l.uv2.clone()), l = new Je(l.x, l.y, l.z), "undefined" != typeof m[l.x + "," + l.y + "," + l.z] ? o = m[l.x + "," + l.y + "," + l.z] : (f.vertices.push(l), o = m[l.x + "," + l.y + "," + l.z] = f.vertices.length - 1), h = new mi(n, s, o, new Je(r.normal.x, r.normal.y, r.normal.z)), h.materialIndex = g || 0, f.faces.push(h), f.uvs.push(c), f.uv2s.push(u)
			}
		return f
	}, Qe.CSG.prototype.toMesh = function(t) {
		var e = this.toGeometry(t);
		return e.computeBizBox(), e
	};
	var fr = function(t, i, r) {
		t instanceof Array || (t = []), this.vertices = t, t.length > 0 ? this.calculateProperties() : this.normal = this.w = e
	};
	fr.prototype.calculateProperties = function() {
		var t = this.vertices[0],
			e = this.vertices[1],
			i = this.vertices[2],
			r = e.clone().subtract(t),
			a = i.clone().subtract(t);
		return this.normal = r.cross(a).normalize(), this.w = this.normal.clone().dot(t), this
	}, fr.prototype.clone = function() {
		var t, e, i = new fr;
		for (t = 0, e = this.vertices.length; e > t; t++) i.vertices.push(this.vertices[t].clone());
		return i.calculateProperties(), i
	}, fr.prototype.flip = function() {
		var t, e = [];
		for (this.normal.multiplyScalar(-1), this.w *= -1, t = this.vertices.length - 1; t >= 0; t--) e.push(this.vertices[t]);
		return this.vertices = e, this
	}, fr.prototype.classifyVertex = function(t) {
		var e = this.normal.dot(t) - this.w;
		return -or > e ? cr : e > or ? hr : lr
	}, fr.prototype.classifySide = function(t) {
		var e, i, r, a = 0,
			n = 0,
			s = t.vertices.length;
		for (e = 0; s > e; e++) i = t.vertices[e], r = this.classifyVertex(i), r === hr ? a++ : r === cr && n++;
		return a > 0 && 0 === n ? hr : 0 === a && n > 0 ? cr : 0 === a && 0 === n ? lr : ur
	}, fr.prototype.splitPolygon = function(t, e, i, r, a) {
		var n = this.classifySide(t);
		if (n === lr)(this.normal.dot(t.normal) > 0 ? e : i).push(t);
		else if (n === hr) r.push(t);
		else if (n === cr) a.push(t);
		else {
			var s, o, l, h, c, u, f, p, d, m = [],
				g = [];
			for (o = 0, s = t.vertices.length; s > o; o++) l = (o + 1) % s, u = t.vertices[o], f = t.vertices[l], h = this.classifyVertex(u), c = this.classifyVertex(f), h != cr && m.push(u), h != hr && g.push(u), (h | c) === ur && (p = (this.w - this.normal.dot(u)) / this.normal.dot(f.clone().subtract(u)), d = u.interpolate(f, p), m.push(d), g.push(d));
			m.length >= 3 && r.push(new fr(m).calculateProperties()), g.length >= 3 && a.push(new fr(g).calculateProperties())
		}
	}, Qe.CSG.Polygon = fr;
	var pr = function(t, e, i, r, a, n) {
		this.x = t, this.y = e, this.z = i, this.normal = r || new Je, this.uv = a || new Ke, this.uv2 = n || new Ke
	};
	pr.prototype.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	}, pr.prototype.clone = function() {
		var t = new pr(this.x, this.y, this.z, this.normal.clone(), this.uv.clone(), this.uv2.clone());
		return t.materialIndex = this.materialIndex, t
	}, pr.prototype.add = function(t) {
		return this.x += t.x, this.y += t.y, this.z += t.z, this
	}, pr.prototype.subtract = function(t) {
		return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
	}, pr.prototype.multiplyScalar = function(t) {
		return this.x *= t, this.y *= t, this.z *= t, this
	}, pr.prototype.cross = function(t) {
		var e = this.x,
			i = this.y,
			r = this.z;
		return this.x = i * t.z - r * t.y, this.y = r * t.x - e * t.z, this.z = e * t.y - i * t.x, this
	}, pr.prototype.normalize = function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return this.x /= t, this.y /= t, this.z /= t, this
	}, pr.prototype.dot = function(t) {
		return this.x * t.x + this.y * t.y + this.z * t.z
	}, pr.prototype.lerp = function(t, e) {
		return this.add(t.clone().subtract(this).multiplyScalar(e)), this.normal.add(t.normal.clone().sub(this.normal).multiplyScalar(e)), this.uv.add(t.uv.clone().sub(this.uv).multiplyScalar(e)), this.uv2.add(t.uv2.clone().sub(this.uv2).multiplyScalar(e)), this
	}, pr.prototype.interpolate = function(t, e) {
		return this.clone().lerp(t, e)
	}, pr.prototype.applyMatrix4 = function(t) {
		var e = this.x,
			i = this.y,
			r = this.z,
			a = t.elements;
		return this.x = a[0] * e + a[4] * i + a[8] * r + a[12], this.y = a[1] * e + a[5] * i + a[9] * r + a[13], this.z = a[2] * e + a[6] * i + a[10] * r + a[14], this
	}, Qe.CSG.Vertex = pr;
	var dr = function(t) {
		var i, r, a = [],
			n = [];
		if (this.polygons = [], this.front = this.back = e, t instanceof Array && 0 !== t.length) {
			for (this.divider = t[0].clone(), i = 0, r = t.length; r > i; i++) this.divider.splitPolygon(t[i], this.polygons, this.polygons, a, n);
			a.length > 0 && (this.front = new dr(a)), n.length > 0 && (this.back = new dr(n))
		}
	};
	dr.isConvex = function(t) {
		var e, i;
		for (e = 0; e < t.length; e++)
			for (i = 0; i < t.length; i++)
				if (e !== i && t[e].classifySide(t[i]) !== cr) return !1;
		return !0
	}, dr.prototype.build = function(t) {
		var e, i, r = [],
			a = [];
		for (this.divider || (this.divider = t[0].clone()), e = 0, i = t.length; i > e; e++) this.divider.splitPolygon(t[e], this.polygons, this.polygons, r, a);
		r.length > 0 && (this.front || (this.front = new dr), this.front.build(r)), a.length > 0 && (this.back || (this.back = new dr), this.back.build(a))
	}, dr.prototype.allPolygons = function() {
		var t = this.polygons.slice();
		return this.front && (t = t.concat(this.front.allPolygons())), this.back && (t = t.concat(this.back.allPolygons())), t
	}, dr.prototype.clone = function() {
		var t = new dr;
		if (this.divider && (t.divider = this.divider.clone()), t.polygons = this.polygons.map(function(t) {
				return t.clone()
			}), t.front = this.front && this.front.clone(), t.back = this.back && this.back.clone(), t.materialSize = this.materialSize, t.material = new Qe.ArrayMaterial, this.material)
			for (var e = 0; e < this.material.materials.length; e++) t.material.materials.push(this.material.materials[e]);
		return t
	}, dr.prototype.invert = function() {
		var t, e, i;
		for (t = 0, e = this.polygons.length; e > t; t++) this.polygons[t].flip();
		return this.divider && this.divider.flip(), this.front && this.front.invert(), this.back && this.back.invert(), i = this.front, this.front = this.back, this.back = i, this
	}, dr.prototype.clipPolygons = function(t) {
		var e, i, r, a;
		if (!this.divider) return t.slice();
		for (r = [], a = [], e = 0, i = t.length; i > e; e++) this.divider.splitPolygon(t[e], r, a, r, a);
		return this.front && (r = this.front.clipPolygons(r)), a = this.back ? this.back.clipPolygons(a) : [], r.concat(a)
	}, dr.prototype.clipTo = function(t) {
		this.polygons = t.clipPolygons(this.polygons), this.front && this.front.clipTo(t), this.back && this.back.clipTo(t)
	}, dr.prototype.sumMateriaSize = function(t) {
		t.changeMaterialIndex(this.materialSize), this.materialSize = this.materialSize + t.materialSize;
		for (var e = 0; e < t.material.materials.length; e++) this.material.materials.push(t.material.materials[e])
	}, dr.prototype.changeMaterialIndex = function(t) {
		for (var e = 0; e < this.polygons.length; e++)
			for (var i = this.polygons[e], r = 0; r < i.vertices.length; r++) {
				var a = i.vertices[r];
				a.materialIndex = a.materialIndex + t
			}
		this.front && this.front.changeMaterialIndex(t), this.back && this.back.changeMaterialIndex(t)
	}, Qe.CSG.Node = dr, Qe.XmlSerializer = function(t, e, i) {
		this.dataBox = t, this.settings = e ? e : new Qe.SerializationSettings, this.filterFunction = i, this.ref = 0, this.refMap = {}, this.idMap = {}, this.xmlString = ""
	}, Qe.extend(Qe.XmlSerializer, Object, {
		serialize: function() {
			return this.xmlString = "<TGL version='" + Qe.version + "' platform='html5'>\n", this.serializeBody(), this.xmlString += "</TGL>\n", this.xmlString
		},
		serializeBody: function() {
			this.ref = 0, this.dataBox.getRoots().forEach(this.initRefs, this), this.settings.isServaSerializable && (this.xmlString += "<dataBox class='" + this.dataBox.getClassName() + "'>\n", this.dataBox.serializeXml(this, this.dataBox.newInstance()), this.xmlString += "</dataBox>\n"), this.dataBox.getRoots().forEach(this.serializeData, this)
		},
		initRefs: function(t) {
			this.refMap[t.getId()] = this.ref++, t.getChildren().forEach(this.initRefs, this)
		},
		isSerializable: function(t) {
			return this.dataBox.contains(t) ? this.filterFunction && !this.filterFunction(t) ? !1 : !0 : !1
		},
		getPropertyType: function(t, e) {
			var i = this.settings.getPropertyType(e);
			return i || t.__SizePropeties && -1 != t.__SizePropeties.indexOf(e) && (i = "number"), i
		},
		serializeData: function(t) {
			if (this.isSerializable(t)) {
				var e = t.newInstance(),
					i = this.refMap[t.getId()];
				this.xmlString += "<data class='" + t.getClassName() + "' ref='" + i + "'", null != this.settings.getPropertyType("id") && (this.xmlString += " id='" + t.getId() + "'"), this.xmlString += ">\n", t.serializeXml(this, e), this.xmlString += "</data>\n"
			}
			t.getChildren().forEach(this.serializeData, this)
		},
		serializePropertyXml: function(t, e, i) {
			var r = this.getPropertyType(t, e);
			if (r) {
				var a = Qe.getValue(t, e, r),
					n = Qe.getValue(i, e, r);
				a !== n && this.serializeValue("p", e, a, n, r)
			}
		},
		serializeStyleXml: function(t, e, i) {
			var r = this.settings.getStyleType(e);
			if (r) {
				var a = t.getStyle(e),
					n = i.getStyle(e);
				a != n && this.serializeValue("s", e, a, n, r)
			}
		},
		serializeClientXml: function(t, e, i) {
			var r = this.settings.getClientType(e);
			if (null != r) {
				var a = t.getClient(e),
					n = i.getClient(e);
				a != n && this.serializeValue("c", e, a, n, r)
			}
		},
		serializeValue: function(t, e, i, r, a) {
			if ("s" === t && (i = this.flattenArray(i), i instanceof Array && "string" !== a && "color" !== a && "number" !== a && (a = "list." + a, i = new ci(i))), null == i) this.xmlString += "	<" + t + " n='" + e + "' none=''/>\n";
			else if ("cdata" === a) this.xmlString += "	<" + t + " n='" + e + "'><![CDATA[" + i + "]]></" + t + ">\n";
			else if ("data" === a) {
				var n = this.refMap[i.getId()];
				null != n && (this.xmlString += "	<" + t + " n='" + e + "' ref='" + n + "'/>\n");
			} else "vec2" === a ? r && i.x === r.x && i.y === r.y || (this.xmlString += "	<" + t + " n='" + e + "' x='" + i.x + "' y='" + i.y + "'/>\n") : "vec3" === a ? r && i.x === r.x && i.y === r.y && i.z == r.z || (this.xmlString += "	<" + t + " n='" + e + "' x='" + i.x + "' y='" + i.y + "' z='" + i.z + "'/>\n") : "list.vec2" === a ? (this.xmlString += "	<" + t + " n='" + e + "'>\n", i instanceof Array && (i = new ci(i)), i.forEach(function(e) {
				if (e instanceof Array) {
					this.xmlString += "	<" + t + ">\n";
					for (var i = 0; i < e.length; i++) {
						var r = e[i];
						this.xmlString += "		<p x='" + r.x + "' y='" + r.y + "'/>\n"
					}
					this.xmlString += "	</" + t + ">\n"
				} else this.xmlString += "		<p x='" + e.x + "' y='" + e.y + "'/>\n"
			}, this), this.xmlString += "	</" + t + ">\n") : "list.vec3" === a ? (this.xmlString += "	<" + t + " n='" + e + "'>\n", i instanceof Array && (i = new ci(i)), i.forEach(function(e) {
				if (e instanceof Array) {
					this.xmlString += "	<" + t + ">\n";
					for (var i = 0; i < e.length; i++) {
						var r = e[i];
						this.xmlString += "	<" + t + "' x='" + r.x + "' y='" + r.y + "' z='" + r.z + "'/>\n"
					}
					this.xmlString += "	</" + t + ">\n"
				} else this.xmlString += "		<" + t + "' x='" + e.x + "' y='" + e.y + "' z='" + e.z + "'/>\n"
			}, this), this.xmlString += "	</" + t + ">\n") : "list.string" === a || "list.number" === a || "list.color" === a ? (this.xmlString += "	<" + t + " n='" + e + "'>\n", i.forEach(function(t) {
				this.xmlString += "		<s>" + t + "</s>\n"
			}, this), this.xmlString += "	</" + t + ">\n") : this.xmlString += "	<" + t + " n='" + e + "'>" + i + "</" + t + ">\n"
		},
		flattenArray: function(t) {
			if (t instanceof Array) {
				for (var e = 0; e < t.length - 1; e++)
					if (t[e] != t[e + 1]) {
						if (!t[e] || !t[e].equals) return t;
						if (!t[e].equals(t[e + 1])) return t
					}
				return t[0]
			}
			return t
		},
		deserialize: function(t, e) {
			Qe.isDeserializing = !0, this.xmlString = t;
			var i = Qe.xml(t).documentElement;
			this.refMap = {}, this.idMap = {};
			var r, a, n, s = new ci,
				o = new ci,
				l = i.getElementsByTagName("data"),
				h = l.length;
			for (n = 0; h > n; n++) {
				a = l[n];
				var c = a.getAttribute("class"),
					u = this.settings.getPropertyType("id");
				if (u && a.hasAttribute("id")) {
					var f = null;
					if ("string" === u) f = a.getAttribute("id");
					else if ("int" === u) f = parseInt(a.getAttribute("id"));
					else {
						if ("number" !== u) throw "Unsupported id type '" + u + "'";
						f = parseFloat(a.getAttribute("id"))
					}
					if ("remove" === a.getAttribute("action")) {
						this.dataBox.removeById(f);
						continue
					}
					r = this.dataBox.getDataById(f), r || (r = Qe.newInstance(c, f))
				} else r = Qe.newInstance(c);
				if (a.hasAttribute("ref")) {
					var p = a.getAttribute("ref");
					this.refMap[p] = r
				}
				s.add(r), o.add(a), this.idMap[r.getId()] = r
			}
			for (this.dataBox.forEach(function(t) {
					this.idMap[t.getId()] = t
				}, this), h = s.size(), n = 0; h > n; n++) r = s.get(n), this.dataBox.containsById(r.getId()) || (e && !r.getParent() && r.setParent(e), this.dataBox.add(r));
			for (n = 0; h > n; n++) r = s.get(n), a = o.get(n), r.deserializeXml(this, a);
			this.settings.isServaSerializable && 1 === i.getElementsByTagName("dataBox").length && this.dataBox.deserializeXml(this, i.getElementsByTagName("dataBox")[0]), Qe.isDeserializing = !1
		},
		deserializePropertyXml: function(t, e, i) {
			var r = this.getPropertyType(t, i);
			r && Qe.setValue(t, i, this.deserializeValue(e, r))
		},
		deserializeStyleXml: function(t, e, i) {
			var r = this.settings.getStyleType(i);
			r && t.setStyle(i, this.deserializeValue(e, r))
		},
		deserializeClientXml: function(t, e, i) {
			var r = this.settings.getClientType(i);
			r && t.setClient(i, this.deserializeValue(e, r))
		},
		deserializePoint: function(t) {
			var e = t.getAttribute("x") ? parseFloat(t.getAttribute("x")) : null,
				i = t.getAttribute("a") ? parseFloat(t.getAttribute("a")) : null;
			if (null != e) {
				var r = t.getAttribute("y") ? parseFloat(t.getAttribute("y")) : null,
					a = t.getAttribute("z") ? parseFloat(t.getAttribute("z")) : null,
					n = t.getAttribute("w") ? parseFloat(t.getAttribute("w")) : null;
				return null != n ? new Qe.Vec4(e, r, a, n) : null != a ? new Qe.XiangliangThree(e, r, a) : new Qe.XiangliangTwo(e, r)
			}
			if (null != i) {
				var s = t.getAttribute("b") ? parseFloat(t.getAttribute("b")) : null,
					o = t.getAttribute("c") ? parseFloat(t.getAttribute("c")) : null,
					l = t.getAttribute("d") ? parseFloat(t.getAttribute("d")) : null;
				return null != l ? new Qe.Face4(i, s, o, l) : new Qe.Face3(i, s, o)
			}
			return null
		},
		arrayStyleValue: function(t, e) {
			var i = [];
			if (t.indexOf(",")) {
				if (i = t.split(","), "string" === e) return i;
				if ("number" === e) {
					for (var r = [], a = 0; a < i.length; a++) r.push(parseFloat(i[a]));
					return r
				}
				if ("color" === e) {
					for (var n = [], a = 0; a < i.length; a++) n.push(new Qe.Color(i[a]));
					return n
				}
			}
		},
		deserializeValue: function(t, e, i) {
			if (t.hasAttribute("@none")) return null;
			var r = "s" === t.nodeName,
				a = r && -1 !== t.textContent.indexOf(",");
			if ("string" === e) return a ? this.arrayStyleValue(t.textContent, e) : t.textContent;
			if ("color" === e) return a ? this.arrayStyleValue(t.textContent, e) : t.textContent;
			if ("number" === e) return a ? this.arrayStyleValue(t.textContent, e) : parseFloat(t.textContent);
			if ("boolean" === e) return "true" === t.textContent;
			if ("int" === e) return parseInt(t.textContent);
			if ("point" === e) return this.deserializePoint(t);
			if ("vec2" === e) {
				var n = parseFloat(t.getAttribute("x")),
					s = parseFloat(t.getAttribute("y"));
				if (!isNaN(n) && !isNaN(s) || !r) return new Qe.XiangliangTwo(n, s);
				e = "list.point"
			}
			if ("vec3" === e) {
				var n = parseFloat(t.getAttribute("x")),
					s = parseFloat(t.getAttribute("y")),
					o = parseFloat(t.getAttribute("z"));
				return new Qe.XiangliangThree(n, s, o)
			}
			if ("data" === e) {
				var l = t.getAttribute("ref"),
					h = this.refMap[l];
				return h ? h : this.idMap[l]
			}
			var c, u, f, p;
			if ("list.point" === e) {
				var d = new ci,
					m = t.getElementsByTagName("p");
				for (c = m.length, p = 0; c > p; p++) {
					var g = m[p];
					d.add(this.deserializePoint(g))
				}
				return r ? d._as : d
			}
			if ("list.string" === e) {
				var y = new ci;
				for (f = t.getElementsByTagName("s"), c = f.length, p = 0; c > p; p++) y.add(f[p].textContent);
				return y
			}
			if ("list.number" === e) {
				for (u = new ci, f = t.getElementsByTagName("s"), c = f.length, p = 0; c > p; p++) u.add(parseFloat(f[p].textContent));
				return u
			}
			if ("array.string" === e) return t.textContent.split(",");
			if ("array.number" === e) {
				for (u = t.textContent.split(","), c = u.length, p = 0; c > p; p++) u[p] = parseFloat(u[p]);
				return u
			}
			return "rectangle" === e ? {
				x: parseFloat(t.getAttribute("x")),
				y: parseFloat(t.getAttribute("y")),
				width: parseFloat(t.getAttribute("w")),
				height: parseFloat(t.getAttribute("h"))
			} : t.textContent
		}
	}), Qe.addMethod(Qe.Data, {
		serializeXml: function(t, e) {
			if (this.__SizePropeties && this.__SizePropeties.length) {
				var i, r;
				for (i = 0, r = this.__SizePropeties.length; r > i; i++) this.serializePropertyXml(t, this.__SizePropeties[i], e)
			} else this.serializePropertyXml(t, "materialSize", e), this.vertices && this.vertices.length && this.serializePropertyXml(t, "vertices", e), this.faces && this.faces.length && this.serializePropertyXml(t, "faces", e), this.uvs && this.uvs.length && this.serializePropertyXml(t, "uvs", e);
			if (t.settings.isClientSerializable && this._clientMap)
				for (var a in this._clientMap) this.serializeClientXml(t, a, e);
			this.serializePropertyXml(t, "name", e), this.serializePropertyXml(t, "parent", e)
		},
		serializePropertyXml: function(t, e, i) {
			t.serializePropertyXml(this, e, i)
		},
		serializeClientXml: function(t, e, i) {
			t.serializeClientXml(this, e, i)
		},
		deserializeXml: function(t, e) {
			var i, r, a, n, s = e.getElementsByTagName("p"),
				o = s.length;
			for (i = 0; o > i; i++) r = s[i], r.hasAttribute("n") && this.deserializePropertyXml(t, r, r.getAttribute("n"));
			if (t.settings.isClientSerializable)
				for (a = e.getElementsByTagName("c"), o = a.length, i = 0; o > i; i++) n = a[i], n.hasAttribute("n") && this.deserializeClientXml(t, n, n.getAttribute("n"))
		},
		deserializePropertyXml: function(t, e, i) {
			t.deserializePropertyXml(this, e, i)
		},
		deserializeClientXml: function(t, e, i) {
			t.deserializeClientXml(this, e, i)
		}
	}), Qe.addMethod(Qe.Element, {
		serializeXml: function(t, e) {
			if (t.settings.isStyleSerializable && this.styleMap)
				for (var i in this.styleMap) this.isSideStyle(i) || this.serializeStyleXml(t, i, e);
			this.serializePropertyXml(t, "position", e), this.serializePropertyXml(t, "rotation", e), this.serializePropertyXml(t, "scale", e), Qe.Element.superClass.serializeXml.call(this, t, e), this._alarmState.getHighestNativeAlarmSeverity() && "alarmstate" === t.settings.getPropertyType("alarmState") && (t.xmlString += "	<p n='alarmState'>\n", Qe.AlarmSeverity.forEach(function(e) {
				var i = this.getNewAlarmCount(e);
				i > 0 && (t.xmlString += "		<n n='" + e.name + "' c='" + i + "'/>\n")
			}, this._alarmState), Qe.AlarmSeverity.forEach(function(e) {
				var i = this.getAcknowledgedAlarmCount(e);
				i > 0 && (t.xmlString += "		<a n='" + e.name + "' c='" + i + "'/>\n")
			}, this._alarmState), t.xmlString += "	</p>\n")
		},
		serializeStyleXml: function(t, e, i) {
			t.serializeStyleXml(this, e, i)
		},
		deserializeXml: function(t, e) {
			if (Qe.Element.superClass.deserializeXml.call(this, t, e), t.settings.isStyleSerializable) {
				var i, r, a = e.getElementsByTagName("s"),
					n = a.length;
				for (i = 0; n > i; i++) r = a[i], r.hasAttribute("n") && this.deserializeStyleXml(t, r, r.getAttribute("n"))
			}
		},
		deserializeStyleXml: function(t, e, i) {
			t.deserializeStyleXml(this, e, i)
		},
		deserializePropertyXml: function(t, e, i) {
			if ("alarmState" === i) {
				if ("alarmstate" === t.settings.getPropertyType("alarmState")) {
					var r, a, n, s = e.getElementsByTagName("n");
					for (a = 0; a < s.length; a++) n = s[a], r = twaver.AlarmSeverity.getByName(n.getAttribute("n")), this._alarmState.setNewAlarmCount(r, parseInt(n.getAttribute("c")));
					for (s = e.getElementsByTagName("a"), a = 0; a < s.length; a++) n = s[a], r = twaver.AlarmSeverity.getByName(n.getAttribute("n")), this._alarmState.setAcknowledgedAlarmCount(r, parseInt(n.getAttribute("c")))
				}
			} else Qe.Element.superClass.deserializePropertyXml.call(this, t, e, i)
		}
	}), Qe.addMethod(Qe.Serva, {
		serializeXml: function(t, e) {
			if (t.settings.isClientSerializable && this._clientMap)
				for (var i in this._clientMap) this.serializeClientXml(t, i, e);
			this.serializePropertyXml(t, "name", e)
		},
		serializePropertyXml: function(t, e, i) {
			t.serializePropertyXml(this, e, i)
		},
		serializeClientXml: function(t, e, i) {
			t.serializeClientXml(this, e, i)
		},
		deserializeXml: function(t, e) {
			var i, r, a, n, s = e.getElementsByTagName("p"),
				o = s.length;
			for (i = 0; o > i; i++) r = s[i], r.hasAttribute("n") && this.deserializePropertyXml(t, r, r.getAttribute("n"));
			if (t.settings.isClientSerializable)
				for (a = e.getElementsByTagName("c"), o = a.length, i = 0; o > i; i++) n = a[i], n.hasAttribute("n") && this.deserializeClientXml(t, n, n.getAttribute("n"))
		},
		deserializePropertyXml: function(t, e, i) {
			t.deserializePropertyXml(this, e, i)
		},
		deserializeClientXml: function(t, e, i) {
			t.deserializeClientXml(this, e, i)
		}
	}), Qe.JsonSerializer = function(t, e, i) {
		this.dataBox = t, this.settings = e ? e : new Qe.SerializationSettings, this.filterFunction = i, this.ref = 0, this.refMap = {}, this.idMap = {}, this.jsonObject = {}
	}, Qe.extend(Qe.JsonSerializer, Object, {
		constructor: Qe.JsonSerializer,
		className: "TGL.JsonSerializer",
		serialize: function() {
			return this.jsonObject = {
				v: Qe.version,
				platform: "html5"
			}, this.serializeBody(), JSON.stringify(this.jsonObject)
		},
		serializeBody: function() {
			if (this.ref = 0, this.dataBox.getRoots().forEach(this.initRefs, this), this.settings.isServaSerializable) {
				var t = {
					"class": this.dataBox.getClassName(),
					p: {},
					s: {},
					c: {}
				};
				this.jsonObject.dataBox = t, this.dataBox.serializeJson(this, this.dataBox.newInstance(), t), xi.isEmptyObject(t.p) && delete t.p, xi.isEmptyObject(t.s) && delete t.s, xi.isEmptyObject(t.c) && delete t.c
			}
			this.jsonObject.datas = [], this.dataBox.getRoots().forEach(this.serializeData, this)
		},
		initRefs: function(t) {
			if (this.refMap[t.getId()] = this.ref++, t.getChildren().forEach(this.initRefs, this), t instanceof Qe.ComboNode)
				for (var e = 0; e < t.combos.length; e++) {
					var i = t.combos[e];
					this.refMap[i.getId()] || (this.refMap[i.getId()] = this.ref++)
				}
		},
		isSerializable: function(t) {
			return this.dataBox.contains(t) ? this.filterFunction && !this.filterFunction(t) ? !1 : !0 : !1
		},
		serializeData: function(t) {
			if (this.isSerializable(t)) {
				var e = t.newInstance(),
					i = this.refMap[t.getId()],
					r = {
						"class": t.getClassName(),
						ref: i,
						p: {},
						s: {},
						c: {}
					};
				this.settings.getPropertyType("id") && (this.jsonObject.id = t.getId()), this.jsonObject.datas.push(r), t.serializeJson(this, e, r), xi.isEmptyObject(r.p) && delete r.p, xi.isEmptyObject(r.s) && delete r.s, xi.isEmptyObject(r.c) && delete r.c
			}
			t.getChildren().forEach(this.serializeData, this)
		},
		serializeDataValue: function(t) {
			var e = t.newInstance(),
				i = this.refMap[t.getId()],
				r = {
					"class": t.getClassName(),
					ref: i,
					p: {},
					s: {},
					c: {}
				};
			return t.serializeJson(this, e, r), xi.isEmptyObject(r.p) && delete r.p, xi.isEmptyObject(r.s) && delete r.s, xi.isEmptyObject(r.c) && delete r.c, r
		},
		getPropertyType: function(t, e) {
			var i = this.settings.getPropertyType(e);
			return i || (t.__bool && -1 != t.__bool.indexOf(e) ? i = "boolean" : t.__SizePropeties && -1 != t.__SizePropeties.indexOf(e) && (i = "number")), i
		},
		getStyleType: function(t, e) {
			t.isSideStyle(e) && (e = e.substr(e.indexOf(".") + 1));
			var i = this.settings.getStyleType(e);
			return i
		},
		serializePropertyJson: function(t, e, i, r) {
			var a = this.getPropertyType(t, e);
			if (a) {
				var n = Qe.getValue(t, e, a),
					s = Qe.getValue(i, e, a);
				n !== s && (n && n.equals ? !n.equals(s) && this.serializeValue(e, n, s, a, r.p) : this.serializeValue(e, n, s, a, r.p))
			}
		},
		serializeStyleJson: function(t, e, i, r) {
			var a = this.getStyleType(t, e);
			if (a) {
				var n = t.getStyle(e),
					s = i.getStyle(e);
				e.startsWith("m.") && (n = this.flattenArray(n), s = this.flattenArray(s)), e.endsWith(".image") && (n = this.encodeURI(n), s = this.encodeURI(s)), n != s && (n && n.equals ? !n.equals(s) && this.serializeValue(e, n, s, a, r.s) : this.serializeValue(e, n, s, a, r.s))
			}
		},
		serializeClientJson: function(t, e, i, r) {
			var a = this.settings.getClientType(e);
			if (null != a) {
				var n = t.getClient(e),
					s = i.getClient(e);
				n != s && (n && n.equals ? !n.equals(s) && this.serializeValue(e, n, s, a, r.c) : this.serializeValue(e, n, s, a, r.c))
			}
		},
		serializeValue: function(t, e, i, r, a) {
			if (null == e) a[t] = null;
			else if (e instanceof ci) a[t] = e._as;
			else if ("data" === r) {
				var n = this.refMap[e.getId()];
				null != n && (a[t] = n)
			} else if ("data.list" === r) {
				for (var s = [], o = 0; o < e.length; o++) s.push(this.serializeDataValue(e[o]));
				a[t] = s
			} else if ("serializeabe.list" === r) {
				for (var s = [], o = 0; o < e.length; o++) s.push(e[o].serializeJsonValue());
				a[t] = s
			} else e.serializeJsonValue ? a[t] = e.serializeJsonValue() : a[t] = e
		},
		deserialize: function(t, e) {
			Qe.isDeserializing = !0, this.jsonObject = JSON.parse(t), this.refMap = {}, this.idMap = {};
			var i, r = new ci,
				a = new ci,
				n = this.jsonObject.datas.length;
			null != this.deserializeStartCreateData && this.deserializeStartCreateData(n);
			for (var s = 0; n > s; s++) {
				var o = this.jsonObject.datas[s],
					l = o["class"],
					h = this.settings.getPropertyType("id");
				if (h && null != o.id) {
					if ("remove" === o.action) {
						this.dataBox.removeById(o.id);
						continue
					}
					i = this.dataBox.getDataById(o.id), i || (i = Qe.newInstance(l, o.id))
				} else {
					i = Qe.newInstance(l)
				}
				null != o.ref && (this.refMap[o.ref] = i), r.add(i), a.add(o), this.idMap[i.getId()] = i, this.deserializeCreateData && this.deserializeCreateData(s, n)
			}
			for (this.dataBox.forEach(function(t) {
					this.idMap[t.getId()] = t
				}, this), n = r.size(), this.deserializeStartFillData && this.deserializeStartFillData(n), s = 0; n > s; s++) i = r.get(s), i.deserializeJson(this, a.get(s)), this.deserializeFillData && this.deserializeFillData(s, n);
			for (this.deserializeStartAddData && this.deserializeStartAddData(n), s = 0; n > s; s++) i = r.get(s), this.dataBox.containsById(i.getId()) || (e && !i.getParent() && i.setParent(e), "TGL.Entity" === i.getClassName() && (i.computed = !1, i.computeNodeData()), this.dataBox.add(i), this.deserializeAddData && this.deserializeAddData(s, n));
			this.settings.isServaSerializable && this.jsonObject.dataBox && this.dataBox.deserializeJson(this, this.jsonObject.dataBox), Qe.isDeserializing = !1
		},
		deserializePropertyJson: function(t, e, i) {
			var r = this.getPropertyType(t, i);
			r && Qe.setValue(t, i, this.deserializeValue(e, r))
		},
		deserializeStyleJson: function(t, e, i) {
			var r = this.getStyleType(t, i);
			if (r) {
				var a = this.deserializeValue(e, r);
				a._as && (a = a._as), t.setStyle(i, a)
			}
		},
		deserializeClientJson: function(t, e, i) {
			var r = this.settings.getClientType(i);
			r && t.setClient(i, this.deserializeValue(e, r))
		},
		getClassName: function(t) {
			return null != t ? t["class"] ? t["class"] : t.w !== e && t.x !== e && t.y !== e && t.z !== e ? "TGL.Vec4" : t.x !== e && t.y !== e && t.z !== e ? "TGL.XiangliangThree" : t.x !== e && t.y !== e ? "TGL.XiangliangTwo" : t.a !== e && t.b !== e && t.c !== e && t.d !== e ? "TGL.Face4" : t.a !== e && t.b !== e && t.c !== e ? "TGL.Face3" : void 0 : void 0
		},
		translateJson: function(t) {
			if (null != t) {
				if (null != this.getClassName(t)) {
					var e = Qe.newInstance(this.getClassName(t));
					if (e.deserializeJsonValue) e.deserializeJsonValue(t);
					else
						for (var i in t) e[i] = t[i];
					return e
				}
				if (t instanceof Array)
					for (var r = 0; r < t.length; r++) t[r] = this.translateJson(t[r]);
				return t
			}
		},
		isChinese: function(t) {
			return t = t || "", escape(t).indexOf("%u") > 0
		},
		encodeURI: function(t) {
			if (t instanceof Array) {
				for (var e = 0; e < t.length; e++) t[e] = this.encodeURI(t[e]);
				return t
			}
			return "string" == typeof t && this.isChinese(t) ? encodeURI(t) : t
		},
		flattenArray: function(t) {
			if (t instanceof Array) {
				for (var e = 0; e < t.length - 1; e++)
					if (t[e] != t[e + 1]) {
						if (!t[e] || !t[e].equals) return t;
						if (!t[e].equals(t[e + 1])) return t
					}
				return t[0]
			}
			return t
		},
		deserializeValue: function(t, i) {
			if ("data" === i) {
				var r = this.refMap[t];
				return r ? r : this.idMap[t]
			}
			if ("data.list" === i) {
				for (var a, n, s = [], o = 0; o < t.length; o++) a = t[o], n = Qe.newInstance(a["class"]), null != a.ref && (this.refMap[a.ref] = n), n.deserializeJson(this, a), s.push(n);
				return s
			}
			if ("color" === i && t.r != e) {
				var l = new Qe.Color;
				return l.setRGB(t.r, t.g, t.b), l
			}
			if ("TGL.Path" === t["class"]) {
				var h = new Qe.Path;
				return h.deserializeJsonValue(t), h
			}
			if (t instanceof Array) {
				for (var o = 0; o < t.length; o++) t[o] = this.translateJson(t[o]);
				return t
			}
			return null != this.getClassName(t) ? this.translateJson(t) : t
		}
	}), Qe.addMethod(Qe.Serva, {
		serializeJson: function(t, e, i) {
			if (t.settings.isClientSerializable && this._clientMap)
				for (var r in this._clientMap) this.serializeClientJson(t, r, e, i);
			this.serializePropertyJson(t, "name", e, i)
		},
		serializePropertyJson: function(t, e, i, r) {
			t.serializePropertyJson(this, e, i, r)
		},
		serializeClientJson: function(t, e, i, r) {
			t.serializeClientJson(this, e, i, r)
		},
		deserializeJson: function(t, e) {
			var i;
			for (i in e.p) this.deserializePropertyJson(t, e.p[i], i);
			if (t.settings.isClientSerializable)
				for (i in e.c) this.deserializeClientJson(t, e.c[i], i)
		},
		deserializePropertyJson: function(t, e, i) {
			t.deserializePropertyJson(this, e, i)
		},
		deserializeClientJson: function(t, e, i) {
			t.deserializeClientJson(this, e, i)
		}
	}), Qe.addMethod(Qe.Data, {
		serializeJson: function(t, e, i) {
			if (this.__SizePropeties && this.__SizePropeties.length) {
				var r, a;
				for (r = 0, a = this.__SizePropeties.length; a > r; r++) this.serializePropertyJson(t, this.__SizePropeties[r], e, i)
			} else this.materialSize && this.serializePropertyJson(t, "materialSize", e, i), this instanceof Qe.Entity && (this.vertices && this.vertices.length && this.serializePropertyJson(t, "vertices", e, i), this.faces && this.faces.length && this.serializePropertyJson(t, "faces", e, i), this.uvs && this.uvs.length && this.serializePropertyJson(t, "uvs", e, i), this.uv2s && this.uv2s.length && this.serializePropertyJson(t, "uv2s", e, i));
			if (t.settings.isClientSerializable && this._clientMap)
				for (var n in this._clientMap) this.serializeClientJson(t, n, e, i);
			this.serializePropertyJson(t, "name", e, i), this.serializePropertyJson(t, "parent", e, i)
		},
		serializePropertyJson: function(t, e, i, r) {
			t.serializePropertyJson(this, e, i, r)
		},
		serializeClientJson: function(t, e, i, r) {
			t.serializeClientJson(this, e, i, r)
		},
		deserializeJson: function(t, e) {
			var i;
			for (i in e.p) this.deserializePropertyJson(t, e.p[i], i);
			if (t.settings.isClientSerializable)
				for (i in e.c) this.deserializeClientJson(t, e.c[i], i)
		},
		deserializePropertyJson: function(t, e, i) {
			t.deserializePropertyJson(this, e, i)
		},
		deserializeClientJson: function(t, e, i) {
			t.deserializeClientJson(this, e, i)
		}
	}), Qe.addMethod(Qe.Element, {
		serializeJson: function(t, e, i) {
			if (t.settings.isStyleSerializable && this.styleMap)
				for (var r in this.styleMap) this.isSideStyle(r) || this.serializeStyleJson(t, r, e, i);
			if (Qe.Element.superClass.serializeJson.call(this, t, e, i), this.serializePropertyJson(t, "position", e, i), this.serializePropertyJson(t, "rotation", e, i), this.serializePropertyJson(t, "scale", e, i), this._alarmState.getHighestNativeAlarmSeverity() && "alarmstate" === t.settings.getPropertyType("alarmState")) {
				var a = {
					n: {},
					a: {}
				};
				i.p.alarmState = a, Qe.AlarmSeverity.forEach(function(t) {
					var e = this.getNewAlarmCount(t);
					e > 0 && (a.n[t.name] = e)
				}, this._alarmState), Qe.AlarmSeverity.forEach(function(t) {
					var e = this.getAcknowledgedAlarmCount(t);
					e > 0 && (a.a[t.name] = e)
				}, this._alarmState), xi.isEmptyObject(a.n) && delete a.n, xi.isEmptyObject(a.a) && delete a.a, xi.isEmptyObject(a) && delete i.p.alarmState
			}
		},
		serializeStyleJson: function(t, e, i, r) {
			t.serializeStyleJson(this, e, i, r)
		},
		deserializeJson: function(t, e) {
			if (Qe.Element.superClass.deserializeJson.call(this, t, e), t.settings.isStyleSerializable)
				for (var i in e.s) this.deserializeStyleJson(t, e.s[i], i)
		},
		deserializeStyleJson: function(t, e, i) {
			t.deserializeStyleJson(this, e, i)
		},
		deserializePropertyJson: function(t, e, i) {
			if ("alarmState" === i) {
				if ("alarmstate" === t.settings.getPropertyType("alarmState")) {
					var r;
					for (r in e.n) this._alarmState.setNewAlarmCount(twaver.AlarmSeverity.getByName(r), e.n[r]);
					for (r in e.a) this._alarmState.setAcknowledgedAlarmCount(twaver.AlarmSeverity.getByName(r), e.a[r])
				}
			} else Qe.Element.superClass.deserializePropertyJson.call(this, t, e, i)
		}
	}), Qe.addMethod(Qe.Light, {
		serializeJson: function(t, e, i) {
			if (Qe.Light.superClass.serializeJson.call(this, t, e, i), this.serializePropertyJson(t, "color", e, i), this.serializePropertyJson(t, "ambient", e, i), this.serializePropertyJson(t, "diffuse", e, i), this.serializePropertyJson(t, "specular", e, i), this.serializePropertyJson(t, "castShadow", e, i), this.serializePropertyJson(t, "onlyShadow", e, i), e.__accessor && e.__accessor.length)
				for (var r = 0; r < e.__accessor.length; r++) this.serializePropertyJson(t, e.__accessor[r], e, i)
		}
	});
	var mr = Qe.Animate = function(t) {
		var e = this;
		e.type = null == t.type ? "number" : t.type, e.delay = null == t.delay ? 0 : t.delay, e.dur = null == t.dur ? 1e3 : t.dur, e.interval = null == t.interval ? 0 : t.interval, e.finish = null == t.finish ? e.delay + e.dur + e.interval : t.finish, e.repeat = null == t.repeat ? 1 : t.repeat, e.reverse = null == t.reverse ? !0 : t.reverse, e.easing = null == t.easing ? "easeNone" : t.easing, e.onUpdate = t.onUpdate, e.onDone = t.onDone, e.onStop = t.onStop, e.onPlay = t.onPlay, e.attr = t.attr, e.source = t.source, e.filter = t.filter, e.from = t.from, e.to = t.to, e.start = null, e.time = 0, e.total = 0, e.count = 0, e.started = !1, e.stopped = !1, e.id = yr++
	};
	Qe.extend(Qe.Animate, Object, {
		play: function() {
			return Xe(this)
		},
		stop: function(t) {
			return He(this, t)
		},
		clone: function() {
			return new mr(this)
		},
		chain: function(t) {
			var e, i = this;
			return i.onDone ? (e = i.onDone, i.onDone = function() {
				e.call(i), t.play()
			}) : i.onDone = function() {
				t.play()
			}, i
		}
	});
	var gr = {},
		yr = 1,
		vr = !1;
	! function xr(t) {
		requestAnimationFrame(xr), vr && (vr = !1, qe(t))
	}(0)
}(window);

