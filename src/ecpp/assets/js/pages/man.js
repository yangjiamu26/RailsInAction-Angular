(function(e) {
    function f(e) {
        if (!(this instanceof f)) return new f(e);
        e || (e = {});
        "number" == typeof e && (e = {
            s: e
        });
        null != e.u || (e.u = !0);
        this.options = e;
        this.s = e.s || f.C;
        this.H = 1E3 / this.s;
        this.I = this.s !== f.C;
        this.w = null;
        this.l = {};
        this.p = this.v = 0
    }
    var u = Date.now,
        O = e.setTimeout,
        n, y, C = !1;
    (function() {
        var f, s = ["ms", "moz", "webkit", "o"];
        n = e.requestAnimationFrame;
        y = e.cancelAnimationFrame;
        for (f = 0; f < s.length && !n; f++) n = n || e[s[f] + "RequestAnimationFrame"], y = y || e[s[f] + "CancelAnimationFrame"] || e[s[f] + "CancelRequestAnimationFrame"];
        n && n(function() {
            C = !0
        })
    })();
    f.C = 60;
    f.R = function(n) {
        var s = new f(n);
        e.requestAnimationFrame = function(e) {
            return s.Q(e)
        };
        e.cancelAnimationFrame = function(e) {
            return s.cancel(e)
        };
        return s
    };
    f.prototype.request = function(e) {
        var f = this,
            w;
        ++this.p;
        if (C && f.options.u && !this.I) return n(e);
        if (!e) throw new TypeError("Not enough arguments");
        null == this.w && (w = this.H + this.v - (u ? u() : (new Date).getTime()), 0 > w && (w = 0), this.w = O(function() {
            var e;
            f.v = u ? u() : (new Date).getTime();
            f.w = null;
            ++f.p;
            for (e in f.l)
                if (f.l[e]) {
                    if (C && f.options.u) n(f.l[e]);
                    else f.l[e](f.v);
                    delete f.l[e]
                }
        }, w));
        this.l[this.p] = e;
        return this.p
    };
    f.prototype.cancel = function(e) {
        C && this.options.u && y(e);
        delete this.l[e]
    };
    "object" == typeof exports && "object" == typeof module ? module.P = f : "function" == typeof define && define.O ? define(function() {
        return f
    }) : e.AnimationFrame = f
})(window);
window.TagulDisplayCloud = function(e, f, u, O) {
    function n(b) {
        return !isNaN(parseFloat(b)) && isFinite(b)
    }

    function y() {
        var b = h.offsetWidth,
            c = h.offsetHeight;
        G = 36E4 < b * c ? 1 : 1.5;
        h.width = G * b + 1;
        h.height = G * c + 1
    }

    function C() {
        if (x) {
            attribution.f = D;
            var b = H();
            attribution.d = b - Math.max(attribution.k - (b - attribution.d), 0);
            attribution.q = !0
        }
    }

    function K(b) {
        b = parseInt(b.replace("#", ""), 16);
        return {
            j: b >> 16 & 255,
            i: b >> 8 & 255,
            g: b & 255
        }
    }

    function s(b, c) {
        b = b.substring(1, b.length);
        b = K(b);
        return "rgba(" + b.j + "," + b.i + "," + b.g + "," + c.toFixed(4) +
            ")"
    }

    function w(b) {
        b = b.toString(16);
        return 1 == b.length ? "0" + b : b
    }

    function Q(b, c, d) {
        c1 = K(b.substring(1, b.length));
        c2 = K(c.substring(1, c.length));
        return "#" + w(Math.round(c1.j * (1 - d) + c2.j * d)) + w(Math.round(c1.i * (1 - d) + c2.i * d)) + w(Math.round(c1.g * (1 - d) + c2.g * d))
    }

    function H() {
        return Date.now ? Date.now() : (new Date).getTime()
    }

    function L(b, c) {
        b.setTransform(c[0][0], c[1][0], c[0][1], c[1][1], c[0][2], c[1][2])
    }

    function v(b, c) {
        return [
            [1, 0, b],
            [0, 1, c]
        ]
    }

    function q(b, c) {
        return [
            [b[0][0] * c[0][0] + b[0][1] * c[1][0], b[0][0] * c[0][1] +
                b[0][1] * c[1][1], b[0][0] * c[0][2] + b[0][1] * c[1][2] + b[0][2]
            ],
            [b[1][0] * c[0][0] + b[1][1] * c[1][0], b[1][0] * c[0][1] + b[1][1] * c[1][1], b[1][0] * c[0][2] + b[1][1] * c[1][2] + b[1][2]]
        ]
    }

    function R(b) {
        var c = b[0][0] * b[1][1] - b[0][1] * b[1][0];
        return [
            [b[1][1] / c, -b[0][1] / c, (b[0][1] * b[1][2] - b[0][2] * b[1][1]) / c],
            [-b[1][0] / c, b[0][0] / c, (b[0][2] * b[1][0] - b[0][0] * b[1][2]) / c]
        ]
    }

    function S(b) {
        return Math.sqrt(b[0][0] * b[0][0] + b[0][1] * b[0][1])
    }

    function E(b, c) {
        return {
            x: c[0][0] * b.x + c[0][1] * b.y + c[0][2],
            y: c[1][0] * b.x + c[1][1] * b.y + c[1][2]
        }
    }

    function F(b,
        c) {
        var d = E({
                x: b.x,
                y: b.y
            }, c),
            a = E({
                x: b.x + b.width,
                y: b.y + b.height
            }, c),
            e = E({
                x: b.x,
                y: b.y + b.height
            }, c),
            g = E({
                x: b.x + b.width,
                y: b.y
            }, c),
            f = Math.min(d.x, a.x, e.x, g.x),
            h = Math.min(d.y, a.y, e.y, g.y),
            k = Math.max(d.x, a.x, e.x, g.x),
            d = Math.max(d.y, a.y, e.y, g.y);
        return {
            x: f,
            y: h,
            width: k - f,
            height: d - h
        }
    }

    function T(b, c) {
        var d = v(-b.bbox.D, -b.bbox.F),
            a = Math.pow(b.o / b.scale, c),
            d = q([
                [a, 0, 0],
                [0, a, 0]
            ], d),
            a = (b.N - b.G) * c,
            d = q([
                [Math.cos(a), Math.sin(a), 0],
                [-Math.sin(a), Math.cos(a), 0]
            ], d);
        return q(v(b.bbox.D, b.bbox.F), d)
    }

    function U(b, c, d, a,
        e) {
        radius = 0.1 * Math.min(a, e);
        b.beginPath();
        b.moveTo(c + radius, d);
        b.lineTo(c + a - radius, d);
        b.quadraticCurveTo(c + a, d, c + a, d + radius);
        b.lineTo(c + a, d + e - radius);
        b.quadraticCurveTo(c + a, d + e, c + a - radius, d + e);
        b.lineTo(c + radius, d + e);
        b.quadraticCurveTo(c, d + e, c, d + e - radius);
        b.lineTo(c, d + radius);
        b.quadraticCurveTo(c, d, c + radius, d);
        b.closePath();
        b.fill()
    }

    function M(b, c) {
        for (var d = 0, a = 0, e = 0; e < c.glyphs.length; e++) {
            var g = c.glyphs[e],
                d = v(g.x - d, g.y - a);
            b.transform(d[0][0], d[1][0], d[0][1], d[1][1], d[0][2], d[1][2]);
            d = b;
            a = g.path;
            d.beginPath();
            for (var f = void 0, h = void 0, k = 0; k < a.length; k++) "M" == a[k] ? d.moveTo(f = parseFloat(a[++k]), h = parseFloat(a[++k])) : "q" == a[k] ? d.quadraticCurveTo(f + parseFloat(a[++k]), f + parseFloat(a[++k]), f += parseFloat(a[++k]), h = f + parseFloat(a[++k])) : "Q" == a[k] ? d.quadraticCurveTo(parseFloat(a[++k]), parseFloat(a[++k]), f = parseFloat(a[++k]), h = parseFloat(a[++k])) : "c" == a[k] ? d.bezierCurveTo(f + parseFloat(a[++k]), h + parseFloat(a[++k]), f + parseFloat(a[++k]), h + parseFloat(a[++k]), f += parseFloat(a[++k]), h += parseFloat(a[++k])) :
                "C" == a[k] ? d.bezierCurveTo(a[++k], a[++k], a[++k], a[++k], f = parseFloat(a[++k]), h = parseFloat(a[++k])) : "l" == a[k] ? d.lineTo(f += parseFloat(a[++k]), h += parseFloat(a[++k])) : "h" == a[k] ? d.lineTo(f += parseFloat(a[++k]), h) : "H" == a[k] ? d.lineTo(f = parseFloat(a[++k]), h) : "v" == a[k] ? d.lineTo(f, h += parseFloat(a[++k])) : "V" == a[k] ? d.lineTo(f, h = parseFloat(a[++k])) : "L" == a[k] ? d.lineTo(f = parseFloat(a[++k]), h = parseFloat(a[++k])) : "Z" != a[k] && "z" != a[k] || d.closePath();
            d.closePath();
            d.fill();
            d = g.x;
            a = g.y
        }
    }

    function V() {
        var b = {},
            c;
        for (c in e.outlines) b[c] =
            e.outlines[c].split(" ");
        for (c = 0; c < r.length; ++c)
            for (var d = 0; d < r[c].glyphs.length; ++d) r[c].glyphs[d].path = b[r[c].glyphs[d].glyph];
        void 0 != l.backgroundColor && (m.fillStyle = s(l.backgroundColor, l.J), m.fillRect(0, 0, h.width, h.height));
        b = e.a;
        c = Math.min(0.95 * h.width / b.width, 0.95 * h.height / b.height);
        d = q([
            [c, 0, 0],
            [0, c, 0]
        ], v(-b.x + (h.width / c - b.width) / 2, -b.y + (h.height / c - b.height) / 2));
        for (c = 0; c < r.length; c++) {
            var a = r[c];
            m.fillStyle = a.fill;
            a.h = q(d, a.matrix);
            L(m, a.h);
            M(m, a);
            a.bbox.b = a.bbox.x + a.bbox.width;
            a.bbox.c = a.bbox.y +
                a.bbox.height;
            a.bbox.D = a.bbox.x + a.bbox.width / 2;
            a.bbox.F = a.bbox.y + a.bbox.height / 2;
            a.B = R(a.h);
            a.d = 0;
            a.scale = S(a.matrix);
            a.o = l.zoom ? Math.max(1.1 * a.scale, 0.15 * Math.sqrt(b.width * b.height / (a.bbox.width * a.bbox.height))) : a.scale;
            a.o = Math.min(a.o, Math.min(b.width / a.bbox.width, b.height / a.bbox.height));
            a.o = Math.max(a.scale, a.o);
            var f = a.matrix,
                g = S(f),
                n = f[0][0] / g,
                f = f[0][1] / g,
                g = void 0,
                g = 1 < f ? 90 : -1 > f ? -90 : 180 * Math.asin(f) / Math.PI;
            0 > n && (g = 180 * (0 > f ? -1 : 1) - g);
            a.G = Math.round(g) * Math.PI / 180;
            a.N = l.rotate ? 0 : a.G;
            a.m = 0;
            a.n =
                0;
            a.e = F(a.bbox, q(a.h, T(a, 1)));
            0 > a.e.x && (a.m = -a.e.x);
            a.e.x + a.e.width > h.width && (a.m = -(a.e.x + a.e.width) + h.width);
            0 > a.e.y && (a.n = -a.e.y);
            a.e.y + a.e.height > h.height && (a.n = -(a.e.y + a.e.height) + h.height);
            a.L = Q(l.backgroundColor, a.fill, 0.2);
            x && a.fill && (attribution.backgroundColor = attribution.backgroundColor || {
                j: 0,
                i: 0,
                g: 0
            }, a = K(a.fill), attribution.backgroundColor.j += a.j, attribution.backgroundColor.i += a.i, attribution.backgroundColor.g += a.g)
        }
        l.A && (l.r = s(l.A, 1), l.r = l.r.substring(0, l.r.length - 7));
        P = m.getImageData(0,
            0, h.width, h.height);
        if (x) {
            attribution.backgroundColor.j /= r.length;
            attribution.backgroundColor.i /= r.length;
            attribution.backgroundColor.g /= r.length;
            attribution.backgroundColor = "#" + (65536 * attribution.backgroundColor.j + 256 * attribution.backgroundColor.i + attribution.backgroundColor.g).toString(16);
            attribution.backgroundColor = s(attribution.backgroundColor, 0.8);
            attribution.t = l.backgroundColor;
            for (c = 0; c < attribution.data.tags.length; c++) a = attribution.data.tags[c], b = F(a.bbox, a.matrix), attribution.a = attribution.a ? {
                x: Math.min(b.x, attribution.a.x),
                y: Math.min(b.y, attribution.a.y),
                b: Math.max(b.x + b.width, attribution.a.b),
                c: Math.max(b.y + b.height, attribution.a.c)
            } : {
                x: b.x,
                y: b.y,
                b: b.x + b.width,
                c: b.y + b.height
            };
            attribution.a.width = attribution.a.b - attribution.a.x;
            attribution.a.height = attribution.a.c - attribution.a.y;
            c = Math.min(h.width / attribution.a.width, h.height / attribution.a.height);
            c = Math.min(c, Math.sqrt(0.02 * h.width * h.height / (attribution.a.width * attribution.a.height)));
            a = attribution.data.tags[0];
            a.bbox.b = a.bbox.x + a.bbox.width;
            a.bbox.c = a.bbox.y + a.bbox.height;
            a.h = q(q([
                [c, 0, 0],
                [0, c, 0]
            ], v(-attribution.a.x + (h.width / c - 1 * attribution.a.width), -attribution.a.y + (h.height / c - 0 * attribution.a.height))), a.matrix);
            a.m = 0;
            a.n = -attribution.a.height * c;
            a.B = R(q(v(1 * a.m, 1 * a.n), a.h));
            for (d = 0; d < a.glyphs.length; ++d) a.glyphs[d].path = attribution.data.outlines[a.glyphs[d].glyph].split(" ")
        }
    }

    function W() {
        if (p && 0 < p.length || x && attribution.q) {
            for (var b = p.slice(), c = 0; c < t.length; c++) - 1 == b.indexOf(t[c]) && b.push(t[c]);
            g && m.putImageData(P, 0, 0, g.x - 2, g.y - 2,
                g.width + 4, g.height + 4);
            g = void 0;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                m.fillStyle = d.L;
                L(m, d.h);
                M(m, d)
            }
            for (var a = H(), c = 0; c < b.length; c++) {
                var d = b[c],
                    e = (a - d.d) / (1E3 * l.k),
                    e = 1 < e ? 1 : e;
                if (0.5 < e && d != z && d.f == D) {
                    var f = t.indexOf(d); - 1 != f && (t.splice(f, 1), -1 == p.indexOf(d) && p.push(d), -1 == b.indexOf(d) && b.push(d));
                    d.f = I;
                    e = 1 - e;
                    d.d = a - 1E3 * e * l.k
                }
                d.f == I && (e = 1 - e);
                0 < e ? (f = q(d.h, T(d, e)), f = q(v(e * d.m, e * d.n), f)) : f = d.h;
                L(m, f);
                g ? (f = F(d.bbox, f), g = {
                    x: Math.min(g.x, f.x),
                    y: Math.min(g.y, f.y),
                    b: Math.max(g.b, f.x + f.width),
                    c: Math.max(g.c, f.y +
                        f.height)
                }, g.width = g.b - g.x, g.height = g.c - g.y) : (g = F(d.bbox, f), g.b = g.x + g.width, g.c = g.y + g.height);
                l.A && (m.fillStyle = l.r + (e * l.K).toFixed(4) + ")", U(m, d.bbox.x, d.bbox.y, d.bbox.width, d.bbox.height));
                m.fillStyle = l.t ? Q(d.fill, l.t, e) : d.fill;
                M(m, d);
                a > d.d + 1E3 * l.k && (b.splice(c, 1), c < p.length && p.splice(c, 1), c--, d.f == D && -1 == t.indexOf(d) && t.push(d))
            }
            x && (attribution.q || g) && (d = attribution.data.tags[0], e = (a - attribution.d) / attribution.k, e = 1 < e ? 1 : e, 1 <= e && (attribution.q = !1), attribution.f == I && (e = 1 - e), f = q(v(e * d.m, e * d.n), d.h),
                g ? (f = F(d.bbox, f), g = {
                    x: Math.min(g.x, f.x),
                    y: Math.min(g.y, f.y),
                    b: Math.max(g.b, f.x + f.width),
                    c: Math.max(g.c, f.y + f.height)
                }, g.width = g.b - g.x, g.height = g.c - g.y) : (g = F(d.bbox, f), g.b = g.x + g.width, g.c = g.y + g.height), m.fillStyle = attribution.backgroundColor, L(m, q(v(e * d.m, e * d.n), d.h)), U(m, d.bbox.x, d.bbox.y, d.bbox.width, d.bbox.height), m.fillStyle = attribution.t, M(m, d))
        }
        N && N.request(W)
    }
    if (!f)
        if (e)
            if (f = document.createElement("canvas"), f.getContext && f.getContext("2d")) {
                for (var A = 0; document.getElementById(f = "tagul_embed_cloud_" +
                        A);) A++;
                document.writeln('<a id="' + f + '" style="width: 100%; height: 100%">');
                document.writeln('<canvas style="width: 100%; height: 100%"></canvas>');
                document.writeln("</a>");
                var A = document.getElementsByTagName("head")[0],
                    J = document.createElement("style"),
                    X = document.createTextNode("#" + f + " {outline: 0; border: 0; background: none; margin: 0; padding: 0;}\n#" + f + ":hover {border: 0;}\n");
                J.type = "text/css";
                J.styleSheet ? J.styleSheet.cssText = X.nodeValue : J.appendChild(X);
                A.appendChild(J)
            } else {
                document.writeln('<a href="http://tagul.com/unsupported-browser" style="width: 100%; height: 100%">');
                document.writeln('<img src="http://tagul.com/static/please_update_browser.png" style="width: 100%; height: auto"/>');
                document.writeln("</a>");
                return
            } else {
        document.writeln("<div>Sorry! Cloud does not exist!</div>");
        return
    }
    var x = !1;
    e.a = {
        x: e.viewBox.x,
        y: e.viewBox.y,
        width: e.viewBox.width,
        height: e.viewBox.height
    };
    A = {};
    u = "boolean" == typeof u ? u : !0;
    var G, g, r = e.tags,
        P, z = null,
        p = [],
        t = [],
        D = 0,
        I = 1;
    A.cleanUp = function() {
        m = B = null;
        h.onmousemove = null;
        h.onmouseout = null;
        l = N = t = p = z = P = g = h = window.onresize = null
    };
    var B = document.getElementById(f),
        h = B.getElementsByTagName("canvas")[0];
    window.onresize = function() {
        y();
        V()
    };
    y();
    var m = h.getContext("2d");
    m.clearRect(0, 0, h.width, h.height);
    x && (h.onmouseover = C);
    h.onmousemove = function(b) {
        var c = h,
            d = 0,
            a = 0;
        if (void 0 !== c.offsetParent) {
            do d += c.offsetLeft, a += c.offsetTop; while (c = c.offsetParent)
        }
        d += Y + Z + $;
        a += aa + ba + ca;
        b = {
            x: (b.pageX - d) * G,
            y: (b.pageY - a) * G
        };
        if (x && (c = attribution.data.tags[0], d = E(b, c.B), c = c.bbox, !(d.x < c.x || d.x > c.b || d.y < c.y || d.y > c.c))) {
            h.style.cursor = "pointer";
            B.href = attribution.url;
            B.target = "_blank";
            z = null;
            return
        }
        for (c = r.length - 1; 0 <= c && (d = E(b, r[c].B), a = r[c].bbox, d.x < a.x || d.x > a.b || d.y < a.y || d.y > a.c); c--);
        c = 0 <= c ? r[c] : null;
        null != c ? h.style.cursor = "pointer" : (h.style.cursor = "auto", B.removeAttribute("href"));
        if (c != z) {
            for (b = 0; b < t.length; b++) - 1 == p.indexOf(t[b]) && p.push(t[b]);
            t = []
        }
        c != z && null != c && (B.href = c.url ? c.url : "javascript:void(0);", B.target = l.M || O ? "_blank" : "_self", null != c && c.f != D && (c.f = D, b = H(), c.d = b - Math.max(1E3 * l.k - (b - c.d), 0), -1 == p.indexOf(c) && p.push(c)));
        z = c
    };
    h.onmouseout = function() {
        for (var b = 0; b <
            p.length; b++) {
            var c = p[b];
            if (c.f == D) {
                c.f = I;
                var d = H();
                c.d = d - Math.max(1E3 * l.k - (d - c.d), 0);
                z = null
            }
        }
        x && (attribution.f = I, d = H(), attribution.d = d - Math.max(attribution.k - (d - attribution.d), 0), attribution.q = !0)
    };
    var N = N || new window.AnimationFrame(60),
        Y = parseInt(document.defaultView.getComputedStyle(h, void 0).paddingLeft, 10) || 0,
        aa = parseInt(document.defaultView.getComputedStyle(h, void 0).paddingTop, 10) || 0,
        Z = parseInt(document.defaultView.getComputedStyle(h, void 0).borderLeftWidth, 10) || 0,
        ba = parseInt(document.defaultView.getComputedStyle(h,
            void 0).borderTopWidth, 10) || 0;
    f = document.body.parentNode;
    ca = f.offsetTop;
    $ = f.offsetLeft;
    void 0 === e.styleOptions && (e.styleOptions = {});
    var l = {
            backgroundColor: e.styleOptions.backgroundColor ? "#" + e.styleOptions.backgroundColor : "#FFFFFF",
            J: n(e.styleOptions.backgroundColorAlpha) ? e.styleOptions.backgroundColorAlpha : 1,
            k: n(e.styleOptions.animationSpeed) ? e.styleOptions.animationSpeed : 0.3,
            t: e.styleOptions.textColor ? "#" + e.styleOptions.textColor : void 0,
            S: n(e.styleOptions.textAlpha) ? e.styleOptions.textAlpha : 1,
            A: e.styleOptions.boxColor ?
                "#" + e.styleOptions.boxColor : void 0,
            K: n(e.styleOptions.boxAlpha) ? e.styleOptions.boxAlpha : 0.8,
            zoom: !0 == e.styleOptions.zoom,
            rotate: !0 == e.styleOptions.rotate,
            M: !0 == e.styleOptions.openLinksInNewWindow
        },
        Y, aa, Z, ba, ca, $;
    V();
    u && W();
    return A
};
TagulDisplayCloud({
    "viewBox": {
        "x": -0.13967388535031822,
        "y": 0.8042500000000001,
        "width": 79.03787458957567,
        "height": 197.93637910415563
    },
    "styleOptions": {
        "backgroundColor": "ffffff",
        "backgroundColorAlpha": 0,
        "animationSpeed": 0.2,
        "textColor": "ffffff",
        "textAlpha": 1,
        "boxColor": "2c4d73",
        "boxAlpha": 0.7,
        "zoom": true,
        "rotate": true,
        "openLinksInNewWindow": true
    },
    "outlines": {
        "0.16781m": "M 860 -809 L 931 -780 Q 871 -665 818 -593 L 754 -620 Q 821 -715 860 -809 M 261 -449 L 217 -390 Q 156 -449 42 -510 L 84 -562 Q 203 -503 261 -449 M 136 66 L 72 19 Q 161 -125 241 -303 L 296 -258 Q 224 -90 136 66 M 89 -775 L 132 -826 Q 241 -772 305 -712 L 259 -654 Q 203 -713 89 -775 M 519 -621 L 452 -588 Q 427 -673 352 -775 L 415 -804 Q 494 -701 519 -621 M 453 -205 L 820 -205 L 820 -312 L 453 -312 L 453 -205 M 820 -483 L 453 -483 L 453 -377 L 820 -377 L 820 -483 M 892 -553 L 892 -17 Q 892 15 883.5 32 Q 875 49 854 59 Q 823 71 698 71 Q 693 41 674 0 Q 731 2 799 2 Q 820 1 820 -18 L 820 -141 L 453 -141 L 453 77 L 380 77 L 380 -553 L 603 -553 L 603 -837 L 676 -837 L 676 -553 L 892 -553 Z ",
        "0.24898m": "M 198 -519 L 336 -519 Q 352 -554 355 -594 L 211 -594 Q 209 -579 204 -553.5 Q 199 -528 198 -519 M 425 -719 L 425 -648 L 583 -648 L 583 -719 L 425 -719 M 802 -719 L 654 -719 L 654 -648 L 802 -648 L 802 -719 M 583 -519 L 583 -594 L 424 -594 Q 421 -553 411 -519 L 583 -519 M 189 -61 L 189 -324 Q 160 -313 99 -298 Q 85 -330 62 -355 Q 233 -395 301 -466 L 121 -466 Q 139 -554 150 -647 L 178 -647 L 178 -648 L 357 -648 L 357 -719 L 111 -719 L 111 -772 L 357 -772 L 357 -836 L 425 -836 L 425 -772 L 583 -772 L 583 -836 L 654 -836 L 654 -772 L 870 -772 L 870 -594 L 654 -594 L 654 -519 L 929 -519 Q 928 -503 928 -494 Q 918 -402 899 -382 Q 881 -364 850 -364 Q 819 -360 763 -365 Q 763 -387 749 -415 Q 780 -412 818 -412 Q 835 -412 842 -418 Q 849 -427 855 -466 L 654 -466 L 654 -361 L 583 -361 L 583 -466 L 388 -466 Q 342 -385 224 -338 L 818 -338 L 818 -68 L 744 -68 L 744 -275 L 260 -275 L 260 -61 L 189 -61 M 474 -234 L 548 -234 Q 529 -138 483 -79.5 Q 437 -21 340 18 Q 243 57 78 77 Q 68 43 47 14 Q 202 -1 290 -32 Q 378 -63 417.5 -109 Q 457 -155 474 -234 M 521 -59 L 560 -110 Q 797 -48 941 18 L 900 77 Q 752 5 521 -59 Z ",
        "0.8955m": "M 270 -836 L 340 -815 Q 303 -710 243 -599 L 243 76 L 170 76 L 170 -477 Q 131 -418 85 -367 Q 59 -417 42 -439 Q 111 -511 171.5 -616.5 Q 232 -722 270 -836 M 440 -314 L 440 -449 L 514 -449 L 514 -313 Q 514 -48 339 84 Q 316 52 285 32 Q 336 -3 369.5 -49 Q 403 -95 417 -145 Q 431 -195 435.5 -232 Q 440 -269 440 -314 M 722 74 L 722 -451 L 797 -451 L 797 74 L 722 74 M 596 -839 L 675 -825 L 654 -780 Q 707 -690 793.5 -607 Q 880 -524 967 -478 Q 936 -454 915 -420 Q 836 -466 756 -545.5 Q 676 -625 618 -714 Q 501 -522 305 -406 Q 289 -438 259 -464 Q 383 -534 469 -634.5 Q 555 -735 596 -839 Z ",
        "0.9280m": "M 266 -835 L 333 -814 Q 292 -696 231 -586 L 231 76 L 162 76 L 162 -475 Q 126 -422 77 -366 Q 65 -396 36 -439 Q 105 -512 166 -617 Q 227 -722 266 -835 M 450 -99 L 450 -17 L 797 -17 L 797 -99 L 450 -99 M 797 -518 L 450 -518 L 450 -434 L 797 -434 L 797 -518 M 797 -294 L 797 -379 L 450 -379 L 450 -294 L 797 -294 M 450 -240 L 450 -154 L 797 -154 L 797 -240 L 450 -240 M 866 -17 L 955 -17 L 955 47 L 288 47 L 288 -17 L 383 -17 L 383 -576 L 555 -576 Q 558 -591 564.5 -622.5 Q 571 -654 574 -669 L 330 -669 L 330 -734 L 585 -734 Q 595 -806 598 -836 L 677 -831 Q 675 -822 668.5 -787.5 Q 662 -753 658 -734 L 925 -734 L 925 -669 L 645 -669 Q 624 -584 622 -576 L 866 -576 L 866 -17 Z ",
        "0.11262m": "M 535 -119 L 535 -14 L 880 -14 L 880 49 L 126 49 L 126 -14 L 461 -14 L 461 -119 L 257 -119 L 257 -180 L 461 -180 L 461 -264 L 535 -264 L 535 -180 L 744 -180 L 744 -119 L 535 -119 M 320 -430 L 320 -359 L 683 -359 L 683 -430 L 320 -430 M 683 -678 L 320 -678 L 320 -611 L 683 -611 L 683 -678 M 320 -555 L 320 -486 L 683 -486 L 683 -555 L 320 -555 M 951 -296 L 739 -296 Q 781 -247 841 -206 Q 901 -165 964 -142 Q 938 -121 915 -85 Q 843 -115 775 -172 Q 707 -229 661 -296 L 348 -296 Q 301 -227 230.5 -166.5 Q 160 -106 87 -72 Q 66 -107 39 -129 Q 174 -183 265 -296 L 49 -296 L 49 -359 L 247 -359 L 247 -678 L 95 -678 L 95 -740 L 247 -740 L 247 -836 L 320 -836 L 320 -740 L 683 -740 L 683 -836 L 758 -836 L 758 -740 L 908 -740 L 908 -678 L 758 -678 L 758 -359 L 951 -359 L 951 -296 Z ",
        "0.19525m": "M 306 -116 L 306 -411 L 182 -411 L 182 -116 L 306 -116 M 54 -715 L 54 -784 L 394 -784 L 394 -715 L 246 -715 Q 223 -588 184 -477 L 370 -477 L 370 -49 L 182 -49 L 182 31 L 119 31 L 119 -329 Q 93 -282 67 -249 Q 54 -293 33 -328 Q 131 -459 176 -715 L 54 -715 M 856 -349 L 928 -350 L 928 66 L 856 66 L 856 14 L 424 14 L 424 -350 L 498 -350 L 498 -58 L 639 -58 L 639 -420 L 446 -420 L 446 -743 L 514 -743 L 514 -487 L 639 -487 L 639 -830 L 712 -830 L 712 -487 L 830 -487 L 830 -743 L 901 -743 L 901 -420 L 712 -420 L 712 -58 L 856 -58 L 856 -349 Z ",
        "0.12386m": "M 810 -734 L 216 -734 L 216 -645 L 810 -645 L 810 -734 M 883 -585 L 216 -585 L 216 -502 Q 216 -114 100 70 Q 70 45 36 34 Q 101 -71 122 -207 Q 143 -343 143 -502 L 143 -793 L 883 -793 L 883 -585 M 361 -309 L 536 -309 L 536 -381 L 361 -381 L 361 -309 M 785 -381 L 605 -381 L 605 -309 L 785 -309 L 785 -381 M 899 -205 L 899 10 Q 899 35 892.5 47 Q 886 59 867 66 Q 844 76 741 76 Q 737 56 721 23 Q 790 26 814 24 Q 824 23 827 20.5 Q 830 18 830 10 L 830 -152 L 605 -152 L 605 -75 L 696 -78 Q 682 -100 667 -122 L 711 -136 Q 767 -63 800 1 L 754 19 Q 741 -5 727 -28 Q 672 -26 545.5 -19.5 Q 419 -13 366 -11 L 362 -67 Q 398 -68 536 -72 L 536 -152 L 322 -152 L 322 78 L 253 78 L 253 -205 L 536 -205 L 536 -262 L 293 -262 L 293 -428 L 536 -428 L 536 -482 Q 403 -474 288 -474 Q 285 -495 273 -523 Q 621 -529 795 -561 L 840 -516 Q 754 -499 605 -487 L 605 -428 L 855 -428 L 855 -262 L 605 -262 L 605 -205 L 899 -205 Z ",
        "0.13356m": "M 89 -372 L 31 -392 Q 69 -485 83 -648 L 139 -640 Q 130 -486 89 -372 M 175 76 L 175 -837 L 249 -837 L 249 76 L 175 76 M 256 -653 L 308 -677 Q 360 -583 381 -510 L 325 -483 Q 307 -552 256 -653 M 695 -29 L 945 -29 L 945 42 L 335 42 L 335 -29 L 621 -29 L 621 -279 L 409 -279 L 409 -348 L 621 -348 L 621 -555 L 475 -555 Q 444 -462 405 -400 Q 384 -414 339 -434 Q 420 -556 460 -791 L 532 -779 Q 516 -696 496 -626 L 621 -626 L 621 -833 L 695 -833 L 695 -626 L 921 -626 L 921 -555 L 695 -555 L 695 -348 L 899 -348 L 899 -279 L 695 -279 L 695 -29 Z ",
        "0.8875m": "M 899 -716 L 899 -645 L 113 -645 L 113 -716 L 487 -716 Q 463 -770 426 -817 L 499 -838 Q 553 -771 574 -718 L 569 -716 L 899 -716 M 417 -496 L 349 -466 Q 325 -528 265 -610 L 329 -636 Q 387 -564 417 -496 M 925 -463 L 925 -391 L 204 -391 L 204 -325 Q 204 -59 101 84 Q 69 49 40 32 Q 128 -89 128 -327 L 128 -463 L 606 -463 Q 656 -546 687 -631 L 767 -605 Q 720 -522 681 -463 L 925 -463 Z ",
        "0.10438m": "M 700 -534 L 700 -723 L 303 -723 L 303 -534 L 700 -534 M 775 -794 L 775 -463 L 231 -463 L 231 -794 L 775 -794 M 366 -286 L 157 -286 L 157 -49 L 366 -49 L 366 -286 M 86 77 L 86 -358 L 439 -358 L 439 68 L 366 68 L 366 23 L 157 23 L 157 77 L 86 77 M 620 -49 L 847 -49 L 847 -286 L 620 -286 L 620 -49 M 548 -358 L 920 -358 L 920 70 L 847 70 L 847 23 L 620 23 L 620 77 L 548 77 L 548 -358 Z ",
        "0.20608m": "M 744 -818 L 821 -794 Q 763 -714 704 -655 L 644 -678 Q 706 -751 744 -818 M 355 -681 L 290 -648 Q 276 -677 245.5 -716 Q 215 -755 184 -785 L 246 -815 Q 323 -745 355 -681 M 461 -379 L 461 -546 Q 396 -473 301.5 -416.5 Q 207 -360 104 -330 Q 85 -365 56 -390 Q 155 -414 248 -463 Q 341 -512 401 -574 L 75 -574 L 75 -643 L 461 -643 L 461 -836 L 534 -836 L 534 -643 L 929 -643 L 929 -574 L 580 -574 Q 821 -459 925 -393 L 889 -333 Q 772 -409 534 -528 L 534 -379 L 461 -379 M 933 -180 L 573 -180 Q 682 -24 959 7 Q 931 35 912 77 Q 609 29 498 -174 Q 470 -110 423 -63.5 Q 376 -17 293 19 Q 210 55 88 77 Q 76 38 49 9 Q 207 -16 292.5 -62 Q 378 -108 417 -180 L 70 -180 L 70 -250 L 444 -250 Q 455 -290 464 -357 L 541 -357 Q 533 -294 522 -250 L 933 -250 L 933 -180 Z ",
        "0.11151m": "M 890 -830 L 890 -385 Q 890 -353 882 -337.5 Q 874 -322 852 -313 Q 819 -301 703 -301 Q 698 -332 678 -369 Q 775 -366 800 -369 Q 811 -369 815 -372.5 Q 819 -376 819 -387 L 819 -830 L 890 -830 M 703 -780 L 703 -447 L 634 -447 L 634 -780 L 703 -780 M 266 -599 L 266 -593 L 389 -593 L 389 -730 L 266 -730 L 266 -599 M 389 -527 L 261 -527 Q 239 -369 111 -288 Q 89 -319 62 -340 Q 170 -406 192 -527 L 71 -527 L 71 -593 L 197 -593 L 197 -601 L 197 -730 L 104 -730 L 104 -796 L 552 -796 L 552 -730 L 459 -730 L 459 -593 L 572 -593 L 572 -527 L 459 -527 L 459 -313 L 389 -313 L 389 -527 M 543 -27 L 949 -27 L 949 43 L 51 43 L 51 -27 L 468 -27 L 468 -153 L 154 -153 L 154 -221 L 468 -221 L 468 -333 L 543 -333 L 543 -221 L 845 -221 L 845 -153 L 543 -153 L 543 -27 Z ",
        "0.8854": "M 297 -263 L 661 -263 Q 669 -318 687 -477 L 341 -477 Q 313 -334 297 -263 M 705 -32 L 948 -32 L 948 41 L 56 41 L 56 -32 L 628 -32 Q 637 -90 652 -193 L 198 -193 Q 254 -404 304 -707 L 89 -707 L 89 -779 L 918 -779 L 918 -707 L 383 -707 Q 373 -646 354 -547 L 702 -547 L 716 -551 L 771 -544 Q 754 -366 705 -32 Z ",
        "0.21594": "M 646 -669 L 583 -636 Q 554 -709 486 -791 L 545 -820 Q 616 -740 646 -669 M 171 -317 L 171 -154 Q 180 -155 315 -177 L 315 -317 L 171 -317 M 315 -726 L 171 -726 L 171 -586 L 315 -586 L 315 -726 M 171 -523 L 171 -380 L 315 -380 L 315 -523 L 171 -523 M 463 -136 L 380 -122 L 380 77 L 315 77 L 315 -110 L 57 -66 L 41 -136 Q 52 -138 74.5 -140.5 Q 97 -143 105 -144 L 105 -726 L 50 -726 L 50 -794 L 424 -794 L 424 -726 L 380 -726 L 380 -188 L 458 -200 L 463 -136 M 951 -312 L 704 -312 Q 738 -197 804 -112 Q 870 -27 962 14 Q 933 40 913 76 Q 758 -3 675 -201 Q 617 -30 448 86 Q 427 56 393 33 Q 593 -96 626 -312 L 428 -312 L 428 -380 L 633 -380 Q 635 -402 635 -442 L 635 -561 L 453 -561 L 453 -630 L 700 -630 Q 763 -716 808 -819 L 882 -798 Q 824 -696 779 -630 L 914 -630 L 914 -561 L 709 -561 L 709 -441 Q 709 -402 707 -380 L 951 -380 L 951 -312 Z ",
        "0.21334": "M 506 -207 L 457 -159 Q 433 -205 381 -286 Q 320 -143 232 -49 Q 215 -64 174 -90 Q 275 -188 334 -352 Q 266 -450 196 -535 L 242 -576 Q 290 -521 359 -428 Q 384 -516 404 -637 L 472 -630 Q 447 -478 408 -360 Q 471 -269 506 -207 M 797 -172 L 745 -129 Q 711 -201 663 -281 Q 601 -134 511 -41 Q 480 -67 452 -82 Q 555 -175 619 -351 Q 552 -449 483 -535 L 531 -572 Q 581 -514 643 -428 Q 667 -511 686 -635 L 753 -628 Q 730 -475 691 -358 Q 761 -251 797 -172 M 911 -776 L 911 -22 Q 911 43 866 61 Q 827 76 690 74 Q 685 49 662 0 Q 706 2 812 2 Q 838 1 838 -22 L 838 -706 L 166 -706 L 166 75 L 92 75 L 92 -776 L 911 -776 Z ",
        "0.9299": "M 282 -833 L 351 -811 Q 304 -693 247 -596 L 247 74 L 176 74 L 176 -486 Q 128 -419 75 -364 Q 59 -404 34 -436 Q 107 -508 173 -613.5 Q 239 -719 282 -833 M 838 -666 L 428 -666 L 428 -551 L 838 -551 L 838 -666 M 911 -488 L 428 -488 Q 424 -125 342 66 Q 319 39 285 23 Q 359 -157 359 -524 L 359 -728 L 610 -728 Q 594 -772 567 -822 L 633 -839 Q 664 -789 686 -728 L 911 -728 L 911 -488 M 774 -211 L 866 -211 L 866 -361 L 774 -361 L 774 -211 M 635 -211 L 723 -211 L 723 -361 L 635 -361 L 635 -211 M 500 -211 L 584 -211 L 584 -361 L 500 -361 L 500 -211 M 926 -420 L 926 0 Q 926 44 901 58 Q 878 70 810 70 Q 806 49 790 12 Q 839 14 854 12 Q 866 12 866 0 L 866 -152 L 774 -152 L 774 42 L 723 42 L 723 -152 L 635 -152 L 635 46 L 584 46 L 584 -152 L 500 -152 L 500 71 L 440 71 L 440 -420 L 926 -420 Z ",
        "0.11649": "M 350 -563 L 209 -563 Q 182 -433 149 -321 Q 209 -282 264 -238 Q 328 -377 350 -563 M 382 -635 L 427 -624 Q 403 -358 322 -191 Q 400 -125 438 -75 L 388 -14 Q 350 -63 285 -123 Q 204 5 77 76 Q 57 37 30 17 Q 150 -43 229 -171 Q 156 -233 68 -292 Q 100 -387 138 -563 L 46 -563 L 46 -632 L 151 -632 Q 174 -748 184 -836 L 257 -831 Q 240 -716 223 -632 L 368 -632 L 382 -635 M 956 -415 L 956 -344 L 736 -344 L 736 -12 Q 736 21 726.5 38.5 Q 717 56 694 65 Q 656 79 538 77 Q 530 45 510 6 Q 605 9 639 7 Q 661 7 661 -12 L 661 -344 L 430 -344 L 430 -415 L 661 -415 L 661 -529 Q 731 -587 807 -694 L 474 -694 L 474 -763 L 858 -763 L 875 -767 L 926 -730 Q 842 -604 736 -511 L 736 -415 L 956 -415 Z ",
        "0.21197": "M 52 17 L 39 -55 Q 147 -72 394 -121 L 400 -55 L 52 17 M 455 -81 L 499 -134 Q 596 -108 707 -65 Q 818 -22 888 17 L 845 76 Q 775 35 664.5 -10 Q 554 -55 455 -81 M 564 -265 L 608 -312 Q 727 -269 816 -204 L 771 -153 Q 686 -217 564 -265 M 571 -667 L 567 -662 Q 613 -584 681 -516 Q 753 -587 797 -667 L 571 -667 M 850 -736 L 897 -708 Q 840 -578 732 -470 Q 843 -376 973 -330 Q 950 -312 923 -269 Q 796 -319 681 -423 Q 569 -328 428 -270 Q 410 -307 381 -330 Q 515 -379 631 -472 Q 568 -538 525 -607 Q 486 -559 423 -504 Q 398 -539 370 -553 Q 272 -393 166 -279 L 376 -308 Q 376 -266 379 -245 Q 191 -215 137 -204.5 Q 83 -194 66 -186 Q 56 -224 43 -253 Q 66 -257 119 -317 Q 159 -359 221 -450 Q 80 -434 60 -424 Q 51 -460 35 -494 Q 55 -498 92 -556 Q 117 -593 159 -676 Q 201 -759 229 -838 L 300 -808 Q 231 -642 135 -503 L 264 -515 Q 286 -548 328 -623 L 390 -586 L 372 -557 Q 512 -668 582 -837 L 659 -824 Q 640 -780 612 -732 L 837 -732 L 850 -736 Z ",
        "0.20212": "M 919 -787 L 919 -550 L 419 -550 L 419 -787 L 488 -787 L 488 -616 L 626 -616 L 626 -835 L 697 -835 L 697 -616 L 848 -616 L 848 -787 L 919 -787 M 284 -682 L 218 -658 Q 200 -717 152 -806 L 214 -826 Q 261 -750 284 -682 M 387 -650 L 387 -581 L 54 -581 L 54 -650 L 387 -650 M 188 -176 L 128 -166 Q 123 -316 85 -523 L 142 -533 Q 181 -337 188 -176 M 290 -152 L 386 -176 L 394 -107 Q 128 -38 63 -23 L 47 -95 Q 72 -101 134.5 -115.5 Q 197 -130 232 -138 Q 269 -305 291 -542 L 356 -530 Q 323 -296 290 -152 M 952 -411 L 703 -411 Q 701 -404 690.5 -370 Q 680 -336 674 -320 L 931 -320 L 931 9 Q 931 53 905 67 Q 883 79 814 79 Q 810 53 792 19 Q 841 21 853 19 Q 864 19 864 8 L 864 -256 L 773 -256 L 773 64 L 714 64 L 714 -256 L 622 -256 L 622 67 L 563 67 L 563 -256 L 475 -256 L 475 76 L 408 76 L 408 -320 L 601 -320 Q 604 -336 610.5 -370 Q 617 -404 619 -411 L 376 -411 L 376 -477 L 952 -477 L 952 -411 Z ",
        "0.15121": "M 177 -330 L 330 -330 L 330 -498 L 179 -498 L 179 -443 Q 179 -410 177 -330 M 330 -731 L 179 -731 L 179 -567 L 330 -567 L 330 -731 M 399 -800 L 399 -12 Q 399 46 365 63 Q 338 77 233 77 Q 229 41 211 6 Q 290 8 311 6 Q 330 5 330 -13 L 330 -259 L 173 -259 Q 156 -41 98 78 Q 75 57 37 42 Q 83 -51 97 -172.5 Q 111 -294 111 -443 L 111 -800 L 399 -800 M 856 -391 L 647 -391 Q 689 -263 756 -167 Q 822 -265 856 -391 M 894 -462 L 937 -447 Q 899 -250 800 -110 Q 875 -24 967 21 Q 940 43 919 78 Q 829 27 757 -57 Q 690 22 606 71 Q 586 37 562 16 Q 646 -30 715 -111 Q 634 -228 582 -391 L 557 -391 L 557 77 L 487 77 L 487 -797 L 909 -797 L 909 -605 Q 909 -576 900.5 -560.5 Q 892 -545 870 -537 Q 838 -527 713 -527 Q 709 -554 689 -590 Q 792 -588 817 -590 Q 829 -590 833 -593.5 Q 837 -597 837 -606 L 837 -728 L 557 -728 L 557 -460 L 881 -460 L 894 -462 Z ",
        "0.9894": "M 504 -282 L 866 -282 Q 865 -259 862 -249 Q 847 -116 828.5 -51 Q 810 14 784 38 Q 758 62 703 65 Q 634 67 555 62 Q 553 27 532 -4 Q 606 3 683 3 Q 714 3 726 -6 Q 763 -36 786 -217 L 483 -217 Q 437 -99 344.5 -30 Q 252 39 101 75 Q 83 37 60 12 Q 195 -14 278.5 -68.5 Q 362 -123 404 -217 L 129 -217 L 129 -282 L 427 -282 Q 441 -333 446 -381 L 523 -375 Q 516 -332 504 -282 M 339 -670 L 324 -656 Q 387 -577 508 -525 Q 659 -586 743 -670 L 339 -670 M 813 -738 L 858 -707 Q 775 -582 595 -494 Q 742 -449 956 -436 Q 932 -409 915 -369 Q 669 -390 507 -457 Q 331 -388 79 -357 Q 70 -393 49 -422 Q 256 -442 425 -496 Q 336 -545 276 -614 Q 221 -569 139 -522 Q 117 -559 93 -577 Q 192 -627 266.5 -697 Q 341 -767 383 -838 L 461 -822 Q 427 -771 397 -734 L 800 -734 L 813 -738 Z ",
        "0.8732": "M 851 -606 L 918 -573 Q 831 -366 746 -229 L 685 -262 Q 790 -434 851 -606 M 295 -265 L 221 -237 Q 184 -373 85 -588 L 154 -609 Q 252 -404 295 -265 M 659 -49 L 938 -49 L 938 24 L 64 24 L 64 -49 L 342 -49 L 342 -824 L 416 -824 L 416 -49 L 585 -49 L 585 -823 L 659 -823 L 659 -49 Z ",
        "0.18046": "M 383 -369 L 389 -301 L 286 -266 L 286 76 L 214 76 L 214 -243 Q 141 -219 66 -196 L 50 -270 Q 76 -277 137.5 -295 Q 199 -313 214 -317 L 214 -561 L 139 -561 Q 124 -463 99 -392 Q 75 -411 42 -423 Q 84 -534 100 -760 L 163 -749 Q 155 -672 149 -632 L 214 -632 L 214 -836 L 286 -836 L 286 -632 L 379 -632 L 379 -561 L 286 -561 L 286 -339 L 383 -369 M 458 -213 L 513 -248 Q 602 -161 638 -89 L 580 -51 Q 548 -121 458 -213 M 954 -464 L 832 -464 L 832 -345 L 949 -345 L 949 -276 L 832 -276 L 832 -15 Q 832 19 824 36.5 Q 816 54 793 63 Q 758 76 635 76 Q 630 39 612 2 Q 706 5 742 3 Q 754 2 758 -1.5 Q 762 -5 762 -16 L 762 -276 L 406 -276 L 406 -345 L 762 -345 L 762 -464 L 391 -464 L 391 -534 L 641 -534 L 641 -660 L 447 -660 L 447 -729 L 641 -729 L 641 -837 L 712 -837 L 712 -729 L 908 -729 L 908 -660 L 712 -660 L 712 -534 L 954 -534 L 954 -464 Z ",
        "0.13190": "M 251 -834 L 321 -807 Q 279 -743 215.5 -678.5 Q 152 -614 88 -569 Q 71 -601 49 -629 Q 106 -667 163 -724.5 Q 220 -782 251 -834 M 272 -613 L 337 -588 Q 305 -530 255 -463 L 255 76 L 180 76 L 180 -372 Q 135 -320 75 -271 Q 57 -313 35 -343 Q 103 -394 166.5 -466 Q 230 -538 272 -613 M 703 -22 L 959 -22 L 959 49 L 320 49 L 320 -22 L 419 -22 L 419 -498 L 491 -498 L 491 -22 L 630 -22 L 630 -691 L 383 -691 L 383 -761 L 926 -761 L 926 -691 L 703 -691 L 703 -409 L 910 -409 L 910 -340 L 703 -340 L 703 -22 Z ",
        "0.22571": "M 772 -139 L 243 -139 L 243 -21 L 772 -21 L 772 -139 M 172 80 L 172 -204 L 845 -204 L 845 78 L 772 78 L 772 42 L 243 42 L 243 80 L 172 80 M 697 -321 L 697 -409 L 312 -409 L 312 -321 L 697 -321 M 242 -463 L 770 -463 L 770 -267 L 242 -267 L 242 -463 M 93 -394 L 93 -588 L 915 -588 L 915 -394 L 843 -394 L 843 -528 L 162 -528 L 162 -394 L 93 -394 M 711 -754 L 937 -754 L 937 -686 L 711 -686 L 711 -615 L 638 -615 L 638 -686 L 357 -686 L 357 -615 L 284 -615 L 284 -686 L 64 -686 L 64 -754 L 284 -754 L 284 -836 L 357 -836 L 357 -754 L 638 -754 L 638 -836 L 711 -836 L 711 -754 Z ",
        "0.26891": "M 885 -808 L 949 -779 Q 882 -653 836 -593 L 781 -619 Q 845 -711 885 -808 M 411 -646 L 167 -646 Q 128 -581 79 -529 Q 65 -564 41 -596 Q 133 -686 181 -834 L 245 -815 Q 231 -769 205 -717 L 411 -717 L 411 -646 M 277 -479 L 277 -344 L 416 -344 L 416 -276 L 277 -276 L 277 -66 L 390 -125 Q 394 -90 405 -62 Q 279 9 243.5 30 Q 208 51 196 64 Q 184 29 161 2 Q 208 -27 208 -79 L 208 -276 L 66 -276 L 66 -344 L 208 -344 L 208 -479 L 109 -479 L 109 -546 L 394 -546 L 394 -479 L 277 -479 M 595 -622 L 534 -590 Q 508 -672 438 -774 L 496 -801 Q 571 -696 595 -622 M 520 -205 L 853 -205 L 853 -312 L 520 -312 L 520 -205 M 853 -483 L 520 -483 L 520 -377 L 853 -377 L 853 -483 M 853 -554 L 920 -554 L 920 -17 Q 920 13 912.5 29.5 Q 905 46 885 55 Q 854 68 736 68 Q 730 29 713 0 Q 802 3 833 1 Q 844 0 848.5 -4 Q 853 -8 853 -18 L 853 -141 L 520 -141 L 520 77 L 452 77 L 452 -553 L 656 -553 L 656 -838 L 725 -838 L 725 -553 L 853 -554 Z ",
        "0.16704": "M 322 -721 L 279 -661 Q 219 -703 94 -771 L 135 -824 Q 248 -770 322 -721 M 271 -451 L 229 -390 Q 157 -439 45 -498 L 86 -552 Q 209 -491 271 -451 M 131 63 L 69 13 Q 155 -107 258 -307 L 312 -258 Q 228 -88 131 63 M 817 -35 L 817 -241 L 461 -241 L 461 -35 L 817 -35 M 953 -474 L 679 -474 L 679 -310 L 888 -310 L 888 71 L 817 71 L 817 34 L 461 34 L 461 76 L 393 76 L 393 -310 L 608 -310 L 608 -474 L 320 -474 L 320 -546 L 608 -546 L 608 -708 Q 506 -693 388 -681 Q 384 -705 368 -744 Q 702 -779 852 -833 L 911 -775 Q 816 -743 679 -719 L 679 -546 L 953 -546 L 953 -474 Z ",
        "0.9901": "M 477 -755 L 477 -688 L 93 -688 L 93 -755 L 477 -755 M 512 -88 L 446 -67 L 439 -92 Q 432 -118 428 -132 Q 231 -88 171 -72.5 Q 111 -57 93 -46 L 93 -50 Q 92 -49 92 -47 Q 87 -74 69 -116 Q 86 -120 114 -184 Q 162 -297 195 -450 L 57 -450 L 57 -518 L 494 -518 L 494 -450 L 272 -450 Q 232 -288 170 -145 L 407 -195 Q 375 -287 349 -347 L 410 -364 Q 481 -202 512 -88 M 722 -607 L 942 -607 Q 941 -580 941 -570 Q 931 -257 919 -132.5 Q 907 -8 882 24 Q 856 56 810 62 Q 766 66 672 61 Q 668 19 649 -12 Q 705 -7 779 -7 Q 804 -6 817 -22 Q 837 -44 848.5 -158.5 Q 860 -273 868 -536 L 719 -536 Q 707 -326 662.5 -173.5 Q 618 -21 517 76 Q 492 41 459 22 Q 553 -64 594.5 -204 Q 636 -344 646 -536 L 507 -536 L 507 -607 L 649 -607 Q 652 -677 652 -820 L 725 -820 Q 725 -712 722 -607 Z ",
        "0.16933": "M 798 -619 L 446 -619 L 446 -540 L 798 -540 L 798 -619 M 936 -403 L 936 -345 L 373 -345 L 373 -802 L 916 -802 L 916 -744 L 446 -744 L 446 -673 L 871 -673 L 871 -486 L 446 -486 L 446 -403 L 936 -403 M 321 -754 L 287 -701 Q 225 -743 119 -782 L 152 -829 Q 251 -797 321 -754 M 125 -311 L 77 -368 Q 173 -440 284 -551 L 323 -500 Q 234 -408 125 -311 M 272 -612 L 237 -557 Q 170 -599 64 -637 L 99 -687 Q 216 -648 272 -612 M 942 -196 L 606 -196 Q 670 -133 765 -81.5 Q 860 -30 959 -3 Q 929 27 911 58 Q 806 24 704.5 -38.5 Q 603 -101 535 -178 L 535 77 L 461 77 L 461 -180 Q 394 -104 293 -39 Q 192 26 90 61 Q 68 28 41 1 Q 135 -27 229 -80 Q 323 -133 388 -196 L 60 -196 L 60 -262 L 461 -262 L 461 -329 L 535 -329 L 535 -262 L 942 -262 L 942 -196 Z ",
        "0.25694": "M 787 -420 L 787 -502 L 455 -502 L 455 -420 L 787 -420 M 787 -284 L 787 -368 L 455 -368 L 455 -284 L 787 -284 M 787 -148 L 787 -232 L 455 -232 L 455 -148 L 787 -148 M 385 -559 L 553 -559 Q 570 -613 575 -643 L 313 -643 L 313 -705 L 482 -705 Q 462 -752 415 -815 L 477 -841 Q 529 -777 549 -729 L 497 -705 L 681 -705 Q 728 -769 758 -836 L 830 -815 Q 779 -736 757 -705 L 944 -705 L 944 -643 L 658 -643 Q 640 -598 622 -559 L 860 -559 L 860 -92 L 385 -92 L 385 -559 M 271 -636 L 210 -595 Q 166 -666 69 -763 L 125 -798 Q 224 -707 271 -636 M 264 -482 L 264 -102 Q 275 -97 300 -80.5 Q 325 -64 340 -55 Q 418 -13 598 -13 Q 801 -13 958 -31 Q 940 12 937 43 Q 759 53 597 53 Q 410 53 325 4 Q 311 -4 288.5 -20 Q 266 -36 252.5 -43 Q 239 -50 228 -50 Q 188 -50 91 64 L 46 4 Q 132 -82 192 -105 L 192 -412 L 54 -412 L 54 -482 L 264 -482 Z ",
        "0.18733": "M 542 -299 L 811 -299 L 811 -465 L 542 -465 L 542 -299 M 225 -299 L 468 -299 L 468 -465 L 229 -465 L 229 -406 Q 229 -348 225 -299 M 468 -695 L 229 -695 L 229 -535 L 468 -535 L 468 -695 M 811 -535 L 811 -695 L 542 -695 L 542 -535 L 811 -535 M 884 -766 L 884 -24 Q 884 12 873.5 30.5 Q 863 49 839 59 Q 801 73 653 71 Q 648 40 628 -1 Q 675 1 784 1 Q 799 0 805 -5.5 Q 811 -11 811 -25 L 811 -228 L 542 -228 L 542 67 L 468 67 L 468 -228 L 218 -228 Q 191 -27 93 82 Q 85 71 66.5 55.5 Q 48 40 36 33 Q 75 -11 100.5 -66 Q 126 -121 137.5 -183 Q 149 -245 152.5 -294 Q 156 -343 156 -406 L 156 -766 L 884 -766 Z ",
        "0.13884": "M 247 -414 L 768 -414 L 768 -613 L 248 -613 L 248 -467 Q 248 -433 247 -414 M 528 -683 L 843 -683 L 843 -279 L 768 -279 L 768 -344 L 244 -344 Q 222 -64 101 82 Q 74 53 38 37 Q 94 -31 126 -128 Q 158 -225 165 -299.5 Q 172 -374 172 -467 L 172 -683 L 495 -683 Q 475 -749 441 -823 L 513 -842 Q 556 -757 574 -697 L 528 -683 Z ",
        "0.15371": "M 898 -760 L 898 -690 L 465 -690 L 465 -760 L 898 -760 M 412 -360 L 368 -301 Q 350 -337 278 -444 L 278 76 L 204 76 L 204 -420 Q 143 -237 70 -146 Q 59 -173 28 -215 Q 75 -270 119.5 -366 Q 164 -462 188 -556 L 53 -556 L 53 -626 L 204 -626 L 204 -836 L 278 -836 L 278 -626 L 407 -626 L 407 -556 L 278 -556 L 278 -530 Q 357 -435 412 -360 M 491 -342 L 559 -327 Q 508 -138 424 -20 Q 386 -49 365 -59 Q 447 -164 491 -342 M 951 -453 L 709 -453 L 709 -18 Q 709 15 701 32 Q 693 49 672 58 Q 642 73 528 73 Q 524 43 505 -3 Q 588 0 616 -2 Q 627 -3 631 -6 Q 635 -9 635 -19 L 635 -453 L 422 -453 L 422 -523 L 951 -523 L 951 -453 M 777 -325 L 839 -344 Q 925 -171 953 -43 L 884 -19 Q 860 -151 777 -325 Z ",
        "0.20355": "M 244 -687 L 199 -687 Q 153 -602 102 -541 Q 82 -560 41 -580 Q 136 -680 189 -841 L 258 -823 Q 243 -784 228 -749 L 477 -749 L 477 -687 L 318 -687 Q 354 -625 368 -576 L 302 -557 Q 286 -612 244 -687 M 757 -298 L 825 -278 Q 759 -135 685 -16 L 932 -16 L 932 50 L 67 50 L 67 -16 L 600 -16 Q 686 -133 757 -298 M 700 -403 L 700 -340 L 297 -340 L 297 -403 L 700 -403 M 575 -104 L 513 -78 Q 489 -167 425 -280 L 484 -303 Q 550 -189 575 -104 M 179 -253 L 239 -279 Q 316 -173 351 -90 L 288 -60 Q 258 -141 179 -253 M 526 -627 L 563 -608 L 542 -584 Q 612 -523 730 -466 Q 848 -409 961 -381 Q 937 -361 913 -320 Q 804 -353 690.5 -414.5 Q 577 -476 501 -545 Q 336 -395 84 -311 Q 54 -358 40 -370 Q 173 -410 295.5 -477 Q 418 -544 491 -625 Q 464 -645 450 -652 Q 534 -726 574 -841 L 644 -824 Q 631 -791 609 -749 L 936 -749 L 936 -687 L 743 -687 Q 792 -623 813 -573 L 743 -556 Q 724 -608 665 -687 L 572 -687 Q 548 -652 526 -627 Z "
    },
    "tags": [{
        "text": "消费价值",
        "url": "http://www.163.com",
        "fill": "#a61d1d",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.16781m"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.24898m"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.8955m"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.9280m"
        }],
        "parentId": 1,
        "bbox": {
            "x": -110.29500000000002,
            "y": -991.2950000000001,
            "width": 4217.59,
            "height": 1227.5900000000001
        },
        "shapeColor": "000000",
        "matrix": [
            [0.01749729144095341, 0, 7.0316630552546115],
            [0, 0.01749729144095341, 92.10522751895991]
        ],
        "fc": true
    }, {
        "text": "基础属性",
        "url": "http://www.163.com",
        "fill": "#51bee7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.11262m"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.19525m"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.12386m"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.13356m"
        }],
        "parentId": 2,
        "bbox": {
            "x": -111.975,
            "y": -987.975,
            "width": 4207.95,
            "height": 1216.95
        },
        "shapeColor": "000000",
        "matrix": [
            [0.014669738863287249, 0, 15.7778801843318],
            [0, 0.014669738863287249, 116.05267244336494]
        ],
        "fc": 1
    }, {
        "text": "产品类型",
        "url": "http://www.163.com",
        "fill": "#47d42c",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.8875m"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.10438m"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.20608m"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.11151m"
        }],
        "parentId": 3,
        "bbox": {
            "x": -112.13,
            "y": -990.13,
            "width": 4213.26,
            "height": 1226.26
        },
        "shapeColor": "000000",
        "matrix": [
            [0.013828633405639914, 0, 22.005438470863762],
            [0, 0.013828633405639914, 131.71339479392626]
        ],
        "fc": 1
    }, {
        "text": "互联网偏好",
        "url": "http://www.163.com",
        "fill": "#a363e3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.8854"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.21594"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.21334"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.9299"
        }, {
            "x": 4000,
            "y": 0,
            "glyph": "0.11649"
        }],
        "parentId": 4,
        "bbox": {
            "x": -96.625,
            "y": -991.625,
            "width": 5205.25,
            "height": 1230.25
        },
        "shapeColor": "000000",
        "matrix": [
            [0.012405405405405405, 0, 7.585726053936167],
            [0, 0.012405405405405405, 56.77077632153776]
        ],
        "fc": 1
    }, {
        "text": "终端偏好",
        "url": "http://www.163.com",
        "fill": "#156d7b",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.21197"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.20212"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.9299"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.11649"
        }],
        "parentId": 5,
        "bbox": {
            "x": -116.47,
            "y": -990.47,
            "width": 4223.94,
            "height": 1220.94
        },
        "shapeColor": "000000",
        "matrix": [
            [0.009259259259259259, 0, 19.446949563990263],
            [0, 0.009259259259259259, 44.51851851851852]
        ],
        "fc": 1
    }, {
        "text": "服务偏好",
        "url": "http://www.163.com",
        "fill": "#c29d2c",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.15121"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.9894"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.9299"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.11649"
        }],
        "parentId": 6,
        "bbox": {
            "x": -114.305,
            "y": -990.3050000000001,
            "width": 4221.61,
            "height": 1219.6100000000001
        },
        "shapeColor": "000000",
        "matrix": [
            [0.009269356597600871, 0, 19.620681556574507],
            [0, 0.009269356597600871, 72.49828470910927]
        ],
        "fc": 1
    }, {
        "text": "业务特征",
        "url": "http://www.163.com",
        "fill": "#000000",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.8732"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.9894"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.18046"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.13190"
        }],
        "parentId": 7,
        "bbox": {
            "x": -86.81,
            "y": -988.81,
            "width": 4196.62,
            "height": 1215.62
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00836980306345733, 0, 20.26801260775083],
            [0, 0.00836980306345733, 101.68889496717723]
        ],
        "fc": 1
    }, {
        "text": "营销活动偏好",
        "url": "http://www.163.com",
        "fill": "#10a453",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.22571"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.26891"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.16704"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.9901"
        }, {
            "x": 4000,
            "y": 0,
            "glyph": "0.9299"
        }, {
            "x": 5000,
            "y": 0,
            "glyph": "0.11649"
        }],
        "parentId": 8,
        "bbox": {
            "x": -87.63500000000002,
            "y": -990.635,
            "width": 6195.27,
            "height": 1222.27
        },
        "shapeColor": "000000",
        "matrix": [
            [0.005549510337323177, 0, 22.579895755278784],
            [0, 0.005549510337323177, 63.10603917301415]
        ],
        "fc": 1
    }, {
        "text": "渠道偏好",
        "url": "http://www.163.com",
        "fill": "#14395b",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.16933"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.25694"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.9299"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.11649"
        }],
        "parentId": 9,
        "bbox": {
            "x": -110.47,
            "y": -992.47,
            "width": 4217.94,
            "height": 1220.94
        },
        "shapeColor": "000000",
        "matrix": [
            [0.005555555555555555, 0, 23.213740080306355],
            [0, 0.005555555555555555, 20.80648917240871]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.005519480519480519, 0, 28.46379071817626],
            [0, 0.005519480519480519, 14.235652521739977]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.005519480519480519, 0, 26.44183331350371],
            [0, 0.005519480519480519, 27.097402597402596]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0045995670995671, 0, 28.243287413396192],
            [0, 0.0045995670995671, 8.247835497835498]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 41.209668789808916],
            [0, 0.0038980891719745223, 171.28363450173032]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 41.209668789808916],
            [0, 0.0038980891719745223, 186.62776906357746]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004165605095541401, 0, 40.67503821656051],
            [0, 0.004165605095541401, 176.42144397261572]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004318471337579618, 0, 40.36953503184713],
            [0, 0.004318471337579618, 191.2218515697521]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 19.20966878980892],
            [0, 0.0038980891719745223, 137.9385884912397]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 19.20966878980892],
            [0, 0.0038980891719745223, 192.83460551534964]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 41.209668789808916],
            [0, 0.0038980891719745223, 150.40239697014988]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004050955414012739, 0, 40.904165605095535],
            [0, 0.004050955414012739, 142.0299375118074]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003936305732484076, 0, 41.13329299363057],
            [0, 0.003936305732484076, 164.7196262065399]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0043949044585987265, 0, 40.21678343949045],
            [0, 0.0043949044585987265, 137.2379788525654]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004203821656050956, 0, 40.59866242038217],
            [0, 0.004203821656050956, 157.13219836734328]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004356687898089172, 0, 40.29315923566879],
            [0, 0.004356687898089172, 181.47741235850117]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 19.20966878980892],
            [0, 0.0038980891719745223, 167.33689506738895]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 19.20966878980892],
            [0, 0.0038980891719745223, 149.6120676074234]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004318471337579618, 0, 18.369535031847136],
            [0, 0.004318471337579618, 144.47237687592937]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004050955414012739, 0, 18.904165605095542],
            [0, 0.004050955414012739, 158.8997568817894]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0043949044585987265, 0, 18.216783439490445],
            [0, 0.0043949044585987265, 154.20600504681966]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0038980891719745223, 0, 19.20966878980892],
            [0, 0.0038980891719745223, 181.32108979824798]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004318471337579618, 0, 18.369535031847136],
            [0, 0.004318471337579618, 186.37494430379002]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.004203821656050956, 0, 18.598662420382166],
            [0, 0.004203821656050956, 173.70001481537483]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0036796536796536794, 0, 42.93684564266144],
            [0, 0.0036796536796536794, 146.3982683982684]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0036796536796536794, 0, 20.987644975824086],
            [0, 0.0036796536796536794, 163.3982683982684]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0036796536796536794, 0, 20.692577867878533],
            [0, 0.0036796536796536794, 177.39826839826839]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0036796536796536794, 0, 54.79931513123715],
            [0, 0.0036796536796536794, 45.3982683982684]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003630573248407643, 0, 42.24429936305732],
            [0, 0.003630573248407643, 195.61339780869554]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0034140127388535032, 0, 20.177095541401272],
            [0, 0.0034140127388535032, 197.2121313541384]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0034140127388535032, 0, 5.177095541401274],
            [0, 0.0034140127388535032, 46.356856703503325]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003031847133757962, 0, 0.9408535031847125],
            [0, 0.003031847133757962, 62.41083242417013]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003031847133757962, 0, 0.9408535031847125],
            [0, 0.003031847133757962, 67.26451926657812]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0032229299363057324, 0, 0.5589745222929933],
            [0, 0.0032229299363057324, 73.52909821020656]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003031847133757962, 0, 0.9408535031847125],
            [0, 0.003031847133757962, 101.66918696871974]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003337579617834395, 0, 0.3298471337579616],
            [0, 0.003337579617834395, 106.08663523255717]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.003375796178343949, 0, 0.2534713375796181],
            [0, 0.003375796178343949, 98.1583568878397]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 43.399866261361524],
            [0, 0.0027597402597402594, 76.54870129870129]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 24.942945042614564],
            [0, 0.0027597402597402594, 76.54870129870129]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 45.87364688691223],
            [0, 0.0027597402597402594, 160.5487012987013]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 46.519440828483106],
            [0, 0.0027597402597402594, 167.5487012987013]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 32.4739550865017],
            [0, 0.0027597402597402594, 30.5487012987013]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 24.773369657703636],
            [0, 0.0027597402597402594, 119.54870129870129]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 2.391853178123768],
            [0, 0.0027597402597402594, 76.54870129870129]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027133757961783442, 0, 62.577318471337584],
            [0, 0.0027133757961783442, 98.587776659531]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0025987261146496812, 0, 62.80644585987261],
            [0, 0.0025987261146496812, 69.05076262502578]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002751592356687898, 0, 62.50094267515924],
            [0, 0.002751592356687898, 61.64700816649691]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0029044585987261146, 0, 62.19543949044586],
            [0, 0.0029044585987261146, 65.45564549927002]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002789808917197452, 0, 62.42456687898089],
            [0, 0.002789808917197452, 75.8139114891248]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 62.49956814159248],
            [0, 0.0027597402597402594, 72.5487012987013]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0029044585987261146, 0, 62.19543949044586],
            [0, 0.0029044585987261146, 101.97956013700576]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0027597402597402594, 0, 31.580419954054545],
            [0, 0.0027597402597402594, 3.5487012987012987]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0026496815286624203, 0, 2.2046114649681527],
            [0, 0.0026496815286624203, 109.64340830676309]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0025350318471337578, 0, 25.433738853503183],
            [0, 0.0025350318471337578, 132.91258200786385]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0026878980891719747, 0, 25.12823566878981],
            [0, 0.0026878980891719747, 129.48859753784157]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0026878980891719747, 0, 8.128235668789808],
            [0, 0.0026878980891719747, 42.50627162792579]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002394904458598726, 0, 0.2137834394904457],
            [0, 0.002394904458598726, 87.75086627697303]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0024331210191082804, 0, 64.1374076433121],
            [0, 0.0024331210191082804, 95.56619510488629]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0024331210191082804, 0, 57.1374076433121],
            [0, 0.0024331210191082804, 41.30587929314236]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0021401273885350318, 0, 1.2229554140127388],
            [0, 0.0021401273885350318, 55.21817322834918]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 45.14657961783439],
            [0, 0.002178343949044586, 17.199209384104755]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 45.14657961783439],
            [0, 0.002178343949044586, 198.22989458186262]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 44.14657961783439],
            [0, 0.002178343949044586, 21.293509268222934]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 3.1465796178343948],
            [0, 0.002178343949044586, 112.18656274723422]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 0.14657961783439466],
            [0, 0.002178343949044586, 81.352029658756]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.002178343949044586, 0, 0.14657961783439466],
            [0, 0.002178343949044586, 90.44211189033362]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 50.105880783498044],
            [0, 0.0018398268398268397, 119.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 49.73325805394779],
            [0, 0.0018398268398268397, 152.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 41.635573648026686],
            [0, 0.0018398268398268397, 119.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 26.537316647764456],
            [0, 0.0018398268398268397, 169.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 26.812304728412112],
            [0, 0.0018398268398268397, 188.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 4.936174753996798],
            [0, 0.0018398268398268397, 69.69913419913419]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 57.1686602515692],
            [0, 0.0018398268398268397, 38.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 41.01396232124264],
            [0, 0.0018398268398268397, 152.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 12.413001518196733],
            [0, 0.0018398268398268397, 38.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 0.3635422259899261],
            [0, 0.0018398268398268397, 94.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0019235668789808916, 0, 0.15575159235668792],
            [0, 0.0019235668789808916, 58.16497749315759]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 33.26260604617116],
            [0, 0.0018398268398268397, 32.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 18.17129671597104],
            [0, 0.0018398268398268397, 169.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 18.433361498068503],
            [0, 0.0018398268398268397, 188.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 13.173398349166687],
            [0, 0.0018398268398268397, 49.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 3.5596752073976967],
            [0, 0.0018398268398268397, 49.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0019235668789808916, 0, 2.155751592356688],
            [0, 0.0019235668789808916, 52.252447297968914]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 0.2814445291626959],
            [0, 0.0018398268398268397, 78.6991341991342]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0018398268398268397, 0, 0.20110068224343514],
            [0, 0.0018398268398268397, 92.69913419913419]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001554140127388535, 0, 67.39405095541402],
            [0, 0.001554140127388535, 56.93503778833952]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0016687898089171975, 0, 21.16492356687898],
            [0, 0.0016687898089171975, 15.231469876925912]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0016687898089171975, 0, 18.16492356687898],
            [0, 0.0016687898089171975, 76.2664897794448]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0016687898089171975, 0, 0.1649235668789808],
            [0, 0.0016687898089171975, 83.81712477718521]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 67.08854777070064],
            [0, 0.0017070063694267516, 54.68015510730294]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 67.08854777070064],
            [0, 0.0017070063694267516, 58.70249743817702]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 40.088547770700636],
            [0, 0.0017070063694267516, 166.589011524504]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0016305732484076434, 0, 22.241299363057326],
            [0, 0.0016305732484076434, 10.738987759944004]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0016305732484076434, 0, 36.24129936305733],
            [0, 0.0016305732484076434, 76.07315563533241]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 22.088547770700636],
            [0, 0.0017070063694267516, 12.659485024325425]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 18.088547770700636],
            [0, 0.0017070063694267516, 118.65241013456522]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014140127388535032, 0, 40.17409554140128],
            [0, 0.0014140127388535032, 160.4474672836806]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0017070063694267516, 0, 18.088547770700636],
            [0, 0.0017070063694267516, 124.65210180154584]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 18.09771974522293],
            [0, 0.0014522292993630573, 140.45800839067957]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001337579617834395, 0, 39.326847133757965],
            [0, 0.001337579617834395, 89.71619681985797]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 27.106891719745224],
            [0, 0.001197452229299363, 29.41462127433534]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 68.09771974522293],
            [0, 0.0014522292993630573, 50.48178464708233]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 22.10689171974522],
            [0, 0.001197452229299363, 23.443061228080037]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 52.09771974522293],
            [0, 0.0014522292993630573, 97.5753961208136]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 0.10689171974522285],
            [0, 0.001197452229299363, 64.65206948252312]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 52.09771974522293],
            [0, 0.0014522292993630573, 100.5513200528284]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0010828025477707007, 0, 18.336019108280254],
            [0, 0.0010828025477707007, 62.19166170093153]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 41.09771974522293],
            [0, 0.0014522292993630573, 104.66244756650498]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 18.10689171974522],
            [0, 0.001197452229299363, 64.65136490863543]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 40.09771974522293],
            [0, 0.0014522292993630573, 78.60375630084808]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001159235668789809, 0, 0.18326751592356688],
            [0, 0.001159235668789809, 70.6378042433098]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 39.09771974522293],
            [0, 0.0014522292993630573, 87.69070560111696]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 24.19243949044586],
            [0, 0.0009044585987261146, 7.579501365879916]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 18.09771974522293],
            [0, 0.0014522292993630573, 120.43216600661214]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 18.19243949044586],
            [0, 0.0009044585987261146, 59.418085997864665]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0014522292993630573, 0, 18.09771974522293],
            [0, 0.0014522292993630573, 134.45301398349207]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 70.11606369426751],
            [0, 0.0009426751592356688, 52.446549566372376]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 50.10689171974523],
            [0, 0.001197452229299363, 117.38446935684118]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 69.11606369426751],
            [0, 0.0009426751592356688, 48.646754148269515]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 49.10689171974523],
            [0, 0.001197452229299363, 94.51064697350424]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 23.116063694267517],
            [0, 0.0009426751592356688, 25.0927067609485]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 47.10689171974523],
            [0, 0.001197452229299363, 121.19113817896512]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 51.125235668789806],
            [0, 0.0006878980891719745, 14.764690313234238]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 40.10689171974523],
            [0, 0.001197452229299363, 80.41941596348086]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 49.12523566878981],
            [0, 0.0006878980891719745, 22.77596724787738]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 40.10689171974523],
            [0, 0.001197452229299363, 91.39530900559254]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 47.20161146496815],
            [0, 0.0006496815286624203, 5.919888119143832]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 35.10689171974523],
            [0, 0.001197452229299363, 15.739466662419952]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 47.20161146496815],
            [0, 0.0006496815286624203, 8.325584553129227]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 33.10689171974522],
            [0, 0.001197452229299363, 94.37570406103177]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 44.125235668789806],
            [0, 0.0006878980891719745, 29.55902577794336]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 27.106891719745224],
            [0, 0.001197452229299363, 108.2500072020385]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 43.125235668789806],
            [0, 0.0006878980891719745, 3.3071087579932956]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 18.10689171974522],
            [0, 0.001197452229299363, 95.66315877082545]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 18.201611464968153],
            [0, 0.0006496815286624203, 97.65866193458885]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.001197452229299363, 0, 18.10689171974522],
            [0, 0.001197452229299363, 122.19264165249939]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 40.20161146496815],
            [0, 0.0006496815286624203, 143.9643636413675]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0010828025477707007, 0, 18.336019108280254],
            [0, 0.0010828025477707007, 126.30998297865918]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 40.20161146496815],
            [0, 0.0006496815286624203, 145.43260675726754]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0011210191082802548, 0, 18.25964331210191],
            [0, 0.0011210191082802548, 129.0602093313168]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 29.12523566878981],
            [0, 0.0006878980891719745, 140.2954244137039]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 70.19243949044586],
            [0, 0.0009044585987261146, 104.58932955549311]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 18.201611464968153],
            [0, 0.0006496815286624203, 99.10757205919856]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 70.19243949044586],
            [0, 0.0009044585987261146, 109.71340018459233]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 18.201611464968153],
            [0, 0.0006496815286624203, 161.46626904148457]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 54.19243949044586],
            [0, 0.0009044585987261146, 103.09451573369398]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 18.12523566878981],
            [0, 0.0006878980891719745, 163.69006416146868]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 21.19243949044586],
            [0, 0.0009044585987261146, 104.32981705455931]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 18.201611464968153],
            [0, 0.0006496815286624203, 176.12347241164917]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 18.19243949044586],
            [0, 0.0009044585987261146, 132.0549425256045]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 70.1344076433121],
            [0, 0.00043312101910828024, 46.496129406260536]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 17.19243949044586],
            [0, 0.0009044585987261146, 54.324970426220524]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 51.1344076433121],
            [0, 0.00043312101910828024, 13.532102131192184]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 66.11606369426752],
            [0, 0.0009426751592356688, 77.52391435111234]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 0.13440764331210198],
            [0, 0.00043312101910828024, 76.37547684580305]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 54.11606369426751],
            [0, 0.0009426751592356688, 78.33476690749126]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 70.1344076433121],
            [0, 0.00043312101910828024, 44.97738514028609]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 54.11606369426751],
            [0, 0.0009426751592356688, 95.42272855713195]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 67.12667619143299]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 50.11606369426752],
            [0, 0.0009426751592356688, 92.5326204407932]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 64.03764879789874]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 47.11606369426752],
            [0, 0.0009426751592356688, 125.22045036174286]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 59.66297907810212]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 41.11606369426751],
            [0, 0.0009426751592356688, 93.52501241995742]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "ffffff",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 60.89233687702435]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 41.11606369426751],
            [0, 0.0009426751592356688, 123.04064351792445]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 62.569519608232554]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 29.116063694267517],
            [0, 0.0009426751592356688, 51.36532184801494]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 54.1344076433121],
            [0, 0.00043312101910828024, 197.66063541014753]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 27.116063694267517],
            [0, 0.0009426751592356688, 104.71182527180292]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 51.1344076433121],
            [0, 0.00043312101910828024, 12.453494989210931]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 26.116063694267513],
            [0, 0.0009426751592356688, 95.50919347490084]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 49.1344076433121],
            [0, 0.00043312101910828024, 23.998116864172204]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009426751592356688, 0, 23.116063694267517],
            [0, 0.0009426751592356688, 81.0689823736452]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 48.1344076433121],
            [0, 0.00043312101910828024, 18.80763990902117]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0008662420382165605, 0, 23.268815286624204],
            [0, 0.0008662420382165605, 88.59893294191093]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 43.1344076433121],
            [0, 0.00043312101910828024, 196.77427017760954]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0009044585987261146, 0, 23.19243949044586],
            [0, 0.0009044585987261146, 91.00409165879906]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "ffffff",
        "matrix": [
            [0.00043312101910828024, 0, 40.1344076433121],
            [0, 0.00043312101910828024, 192.9622627271716]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 51.20161146496815],
            [0, 0.0006496815286624203, 86.49453462977492]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 34.1344076433121],
            [0, 0.00043312101910828024, 169.0006908959741]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 44.20161146496816],
            [0, 0.0006496815286624203, 56.15764656312612]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 34.1344076433121],
            [0, 0.00043312101910828024, 194.7339776633223]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 62.125235668789806],
            [0, 0.0006878980891719745, 54.54541084430766]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 29.134407643312098],
            [0, 0.00043312101910828024, 3.3923004810773603]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006878980891719745, 0, 60.12523566878981],
            [0, 0.0006878980891719745, 58.44427734119874]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 25.1344076433121],
            [0, 0.00043312101910828024, 140.07249164866403]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 55.20161146496815],
            [0, 0.0006496815286624203, 76.4059462505425]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "ffffff",
        "matrix": [
            [0.00043312101910828024, 0, 56.13440764331211],
            [0, 0.00043312101910828024, 71.91622864283072]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 55.20161146496815],
            [0, 0.0006496815286624203, 73.57497153290583]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.00043312101910828024, 0, 21.1344076433121],
            [0, 0.00043312101910828024, 18.825024989586005]
        ],
        "fc": 1
    }, {
        "text": "用户标签",
        "url": "http://www.163.com",
        "fill": "#87c1e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.18733"
        }, {
            "x": 1000,
            "y": 0,
            "glyph": "0.13884"
        }, {
            "x": 2000,
            "y": 0,
            "glyph": "0.15371"
        }, {
            "x": 3000,
            "y": 0,
            "glyph": "0.20355"
        }],
        "parentId": 10,
        "bbox": {
            "x": -116.46000000000001,
            "y": -994.46,
            "width": 4229.92,
            "height": 1228.92
        },
        "shapeColor": "000000",
        "matrix": [
            [0.0006496815286624203, 0, 51.20161146496815],
            [0, 0.0006496815286624203, 83.8525914477445]
        ],
        "fc": 1
    }],
    "meta": "Tagul Generator Version 1.86; Mozilla/5.0 (Windows NT 6.1; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0"
});
