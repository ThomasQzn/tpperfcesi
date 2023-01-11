! function(t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) n.d(i, r, function(e) {
                return t[e]
            }.bind(null, r));
        return i
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 31)
}([function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = n(19),
        s = n(20),
        a = n(11),
        u = n(22),
        l = n(9),
        c = "object",
        h = "function",
        d = /\s+/,
        f = "data-nqis",
        p = Array.prototype.slice,
        m = {},
        g = {},
        v = {
            onDefine: [],
            onCreate: [],
            onDestroy: []
        };

    function w(t, e, n) {
        var i, s, a, l;
        if (!L(t)) throw new Error("createComponent() invalid element");
        if (!I(e)) throw new Error("createComponent() invalid name");
        if (!(i = m[e])) throw new Error("createComponent() component definition not found for " + e);
        return s = o(t, {
            create: !0
        }), (a = s in g && e in g[s] ? g[s][e] : null) ? a : (r(n) !== c && (n = x(t, e)), l = typeof(a = typeof i === h ? new i : Object.create(i)).getDefaultCfg === h ? a.getDefaultCfg() : {}, a.cfg = r(n) === c ? u(l, n) : l, a.element = t, a.state = {}, s in g || (g[s] = {
            _count: 0
        }), g[s][e] = a, g[s]._count++, v.onCreate.forEach(function(t) {
            t(a)
        }), typeof a.setup === h && a.setup(), a)
    }

    function b(t, e) {
        var n, i;
        L(t) ? n = o(t) : t && t.element && (n = o(t.element), e = t.componentName), n && n in g && e in g[n] && (typeof(i = g[n][e]).cleanup === h && i.cleanup(), v.onDestroy.forEach(function(t) {
            t(i)
        }), delete g[n][e], 0 == --g[n]._count && delete g[n])
    }

    function E(t) {
        C(t, w)
    }

    function y(t) {
        C(t, b)
    }

    function C(t, e) {
        (function(t) {
            var e = (t || document).querySelectorAll("[" + f + "]");
            return p.call(e)
        })(t).forEach(function(t) {
            (function(t) {
                return t.getAttribute(f).split(d)
            })(t).forEach(function(n) {
                n in m && e(t, n)
            })
        })
    }

    function x(t, e) {
        var n = t.getAttribute("data-" + e + "-cfg");
        return n && n in window ? window[n] : n && n.indexOf("{") > -1 ? s(n) : null
    }

    function L(t) {
        return t && typeof t.get === h && (t = t.get(0)), t && t.tagName && 1 === t.nodeType && typeof t.getAttribute === h
    }

    function I(t) {
        return t && "string" == typeof t
    }
    document.addEventListener("DOMContentLoaded", function() {
        E(document), a(document, "nqcomponentsready")
    }), document.addEventListener("nqbeforedomremove", function(t) {
        y(t.detail.fromElement)
    }), document.addEventListener("nqafterdomadd", function(t) {
        E(t.detail.fromElement)
    }), t.exports = i("nqjs.component", {
        define: function(t, e) {
            var n, i = r(e);
            if (!I(t)) throw new Error("defineComponent() invalid name");
            if (t in m) throw new Error("defineComponent() " + t + " is already defined");
            if (i === c) n = e;
            else {
                if (i !== h) throw new Error("defineComponent() invalid definition for " + t);
                n = e.prototype
            }
            return n.componentName = t, n.cfg = null, n.element = null, n.state = null, m[t] = e, v.onDefine.forEach(function(n) {
                n(t, e)
            }), e
        },
        getDefinition: function(t) {
            return m[t] || null
        },
        create: w,
        destroy: b,
        createAll: E,
        destroyAll: y,
        get: function(t, e) {
            if (!L(t)) throw new Error("getComponent() invalid element");
            if (!I(e)) throw new Error("getComponent() invalid name");
            var n = o(t);
            return n && n in g && g[n][e] || null
        },
        getAll: function(t) {
            if (!L(t)) throw new Error("getAllComponents() invalid element");
            var e, n = o(t);
            return n && n in g && delete(e = l({}, g[n]))._count, e || null
        },
        getByName: function(t) {
            var e, n = [];
            for (e in g) g.hasOwnProperty(e) && t in g[e] && n.push(g[e][t]);
            return n
        },
        getConfig: x,
        hook: function(t, e) {
            if (!(t in v)) throw new Error("registerHook() invalid name ; only onDefine, onCreate and onDestroy are valid");
            if (typeof e !== h) throw new Error("registerHook() invalid definition for " + t);
            v[t].push(e)
        }
    })
}, function(t, e) {
    function n(t, e) {
        if ("object" != typeof window || !window) return e;
        for (var n, i = t.split("."), r = -1, o = i.length, s = window; ++r < o;)
            if ((n = i[r]) in s) {
                if (s = s[n], r === o - 1) throw new Error('namespace(): "' + t + '" already in use')
            } else r + 1 === o ? s[n] = e : s = s[n] = {};
        return e
    }
    t.exports = n("nqjs.util.namespace", n)
}, function(t, e, n) {
    var i = n(1),
        r = n(9),
        o = /\s+/,
        s = {
            bubbles: !0,
            cancelable: !0,
            detail: null
        };

    function a(t) {
        var e = t.nodeType;
        return 1 === e || 9 === e || t === t.window
    }

    function u(t, e) {
        for (var n = -1, i = t.node.length; ++n < i;) l(t.node[n], t, e)
    }

    function l(t, e, n) {
        for (var i = e.type.split(o), r = -1, s = i.length; ++r < s;) t[n + "EventListener"](i[r], e.handler, c(e.options))
    }

    function c(t) {
        return !!t && (!("capture" in t) || "once" in t || "passive" in t ? t : t.capture)
    }

    function h(t, e) {
        var n = e.options ? r({}, s, e.options) : r({}, s),
            i = new window.CustomEvent(e.type, n);
        return t.dispatchEvent(i)
    }
    n(21), t.exports = i("nqjs.dom.events", {
        on: function(t) {
            a(t.node) ? l(t.node, t, "add") : u(t, "add")
        },
        off: function(t) {
            a(t.node) ? l(t.node, t, "remove") : u(t, "remove")
        },
        dispatch: function(t) {
            var e, n, i;
            if (a(t.node)) i = h(t.node, t);
            else
                for (e = -1, n = t.node.length, i = []; ++e < n;) i[e] = h(t.node[e], t);
            return i
        }
    })
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.dom.qs", function(t, e) {
        return e || (e = document), e.querySelector(t)
    })
}, function(t, e, n) {
    var i = n(22),
        r = n(13),
        o = n(48),
        s = /^(?:ok|success)$/i;

    function a(t) {
        if (!(this instanceof a)) return new a(t);
        var e = {
            url: "/",
            method: "get",
            dataType: "json",
            data: {},
            errorPopin: !0
        };
        this.settings = t ? i(e, t) : e
    }

    function u(t, e) {
        s.test(t.statusText) ? t.responseJSON ? e(t.responseJSON, t) : e(t.responseText, t) : e(null, t)
    }
    a.prototype.abort = function() {
        return this.xhr && this.xhr.abort(), this
    }, a.prototype.send = function(t) {
        var e = i({}, this.settings, t || {});
        return e.beforeAll && e.beforeAll(e), e.before && e.before(e), this.xhr = $.ajax({
            url: e.url,
            method: e.method,
            dataType: e.dataType,
            data: e.data,
            complete: function(t) {
                e.after && u(t, e.after), e.afterAll && u(t, e.afterAll),
                    function(t, e) {
                        if (!e.errorPopin || ! function(t, e) {
                                if (e.isError) return e.isError(t);
                                var n = t.responseJSON;
                                if (t.status >= 400 || n && (n.hasError || n.errors && n.errors.length)) return !0;
                                return !1
                            }(t, e) || !document.body) return;
                        var n = r(),
                            i = function(t) {
                                if (t.responseJSON && t.responseJSON.errors) return t.responseJSON.errors;
                                return null
                            }(t);
                        n && n.open(o({
                            message: i
                        }))
                    }(t, e)
            }
        }), this
    }, t.exports = a
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = Array.prototype.slice;
    t.exports = i("nqjs.dom.qsa", function(t, e) {
        e || (e = document);
        var n, i, s = r(t);
        if ("string" === s) i = o.call(e.querySelectorAll(t));
        else if ("object" === s)
            for (n in i = {}, t) t.hasOwnProperty(n) && (i[n] = o.call(e.querySelectorAll(t[n])));
        return i || []
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(20),
        o = n(11),
        s = 0,
        a = 10,
        u = null,
        l = 30;

    function c(t) {
        var e = t.touches;
        e && e.length && ("touchstart" === t.type ? u = {
            x1: e[0].clientX,
            y1: e[0].clientY,
            x2: e[0].clientX,
            y2: e[0].clientY
        } : (u.x2 = e[0].clientX, u.y2 = e[0].clientY))
    }

    function h(t) {
        if ("click" !== t.type || 3 !== t.which && 2 !== t.button)
            for (var e, n, i = t.target, s = -1, u = a; i && ++s < u;) {
                if (1 === i.nodeType && i.hasAttribute("data-nqtap") && d(t) && !i.disabled) {
                    !1 !== (n = (e = i.getAttribute("data-nqtap")) ? r(e) : {}).cancel && t.preventDefault(), !1 === n.propagate && t.stopPropagation(), n.originalEvent = t, o(i, n.trigger || "nqtap", {
                        detail: n
                    });
                    break
                }
                i = i.parentNode
            }
    }

    function d(t) {
        return "click" === t.type || "touchend" === t.type && Math.abs(u.x2 - u.x1) < l && Math.abs(u.y2 - u.y1) < l
    }
    e.use = i("nqjs.dom.tap.use", function() {
        ++s > 1 || (document.addEventListener("touchstart", c), document.addEventListener("touchmove", c), document.addEventListener("touchend", h), document.addEventListener("click", h))
    }), e.stopUsing = i("nqjs.dom.tap.stopUsing", function() {
        0 == --s && (document.removeEventListener("touchstart", c), document.removeEventListener("touchmove", c), document.removeEventListener("touchend", h), document.removeEventListener("click", h))
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(15),
        o = n(16),
        s = /\s+/;
    t.exports = i("nqjs.dom.attributes", {
        get: function(t, e) {
            t = r(t);
            var n, i = e.split(s);
            return 1 === i.length ? t.getAttribute(e) : (n = {}, i.forEach(function(e) {
                n[e] = t.getAttribute(e)
            }), n)
        },
        set: function(t, e, n) {
            var i;
            3 === arguments.length ? (i = {})[e] = n : i = e, o(t, function(t) {
                var e;
                for (e in i) i.hasOwnProperty(e) && t.setAttribute(e, "" + i[e])
            })
        },
        remove: function(t, e) {
            var n = e.split(s);
            o(t, function(t) {
                n.forEach(function(e) {
                    t.removeAttribute(e)
                })
            })
        }
    })
}, function(t, e, n) {
    var i = n(1),
        r = Object.prototype.toString,
        o = "undefined";
    t.exports = i("nqjs.util.kindof", function(t) {
        var e;
        return null === t ? "null" : (e = typeof t) === o ? o : "number" === e && isNaN(t) ? "nan" : r.call(t).slice(8, -1).toLowerCase()
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = "object",
        s = "mixin() only handles objects";
    t.exports = i("nqjs.util.mixin", function(t) {
        if (r(t) !== o) throw new Error(s);
        for (var e, n, i = 0, a = arguments.length; ++i < a;) {
            if (e = arguments[i], r(e) !== o) throw new Error(s);
            for (n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        }
        return t
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(9);
    t.exports = i("nqjs.dom.template", {
        helpers: {
            createElement: n(50),
            getData: n(51)
        },
        create: function(t) {
            var e = Object.create(this);
            return e.src = r({}, t), e
        },
        override: function(t) {
            if (!this.src) throw new Error("template.override() call create() before overriding");
            for (var e in t) t.hasOwnProperty(e) && (this.src[e + "Override"] = t[e]);
            return this
        },
        render: function(t, e) {
            if (!this.src) throw new Error("template.render() call create() before rendering");
            var n, i, r, o = t + "Override",
                s = "function" == typeof this.src[o] ? o : t,
                a = this.src[s](e, this.helpers);
            if (!a) return null;
            if (a.nodeType) return a;
            if (1 === a.length) return a[0];
            for (n = document.createDocumentFragment(), i = -1, r = a.length; ++i < r;) "string" != typeof a[i] && n.appendChild(a[i]);
            return n
        }
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(9),
        o = {
            bubbles: !0,
            cancelable: !0,
            detail: null
        };
    n(21), t.exports = i("nqjs.dom.dispatchCustomEvent", function(t, e, n) {
        var i = n ? r({}, o, n) : r({}, o),
            s = new CustomEvent(e, i);
        return !t.nodeType && t !== t.window && t.length && (t = t[0]), t.dispatchEvent(s), s
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(15),
        o = n(16),
        s = /\s+/;

    function a(t) {
        return "role" === t ? t : "aria-" + t.toLowerCase()
    }
    t.exports = i("nqjs.dom.aria", {
        get: function(t, e) {
            t = r(t);
            var n, i = e.split(s);
            return 1 === i.length ? t.getAttribute(a(e)) : (n = {}, i.forEach(function(e) {
                n[e] = t.getAttribute(a(e))
            }), n)
        },
        set: function(t, e, n) {
            var i;
            3 === arguments.length ? (i = {})[e] = n : i = e, o(t, function(t) {
                var e;
                for (e in i) i.hasOwnProperty(e) && t.setAttribute(a(e), "" + i[e])
            })
        },
        remove: function(t, e) {
            var n = e.split(s);
            o(t, function(t) {
                n.forEach(function(e) {
                    t.removeAttribute(a(e))
                })
            })
        }
    })
}, function(t, e, n) {
    var i = n(0);
    t.exports = function() {
        return i.get(document.body, "nq-popins")
    }
}, function(t, e) {
    t.exports = function(t, e) {
        return (e || document).querySelector('[data-replace="' + t + '"]')
    }
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.dom.requireElement", function(t) {
        if (!t || "length" in t && !t.length) throw new Error("requireElement() no element given");
        return 1 === t.nodeType ? t : t.length ? t[0] : t
    })
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.dom.forEachElement", function(t, e) {
        if (1 !== t.nodeType)
            for (var n = -1, i = t.length; ++n < i;) e(t[n], n);
        else e(t, 0)
    })
}, function(t, e) {
    t.exports = function() {
        return window.nqcfg.labels.popins
    }
}, function(t, e) {
    function n(t) {
        return !t.name || "BUTTON" === t.tagName || "INPUT" === t.tagName && "submit" === t.type
    }
    t.exports = function(t) {
        for (var e, i = t.elements.length, r = {}; i--;) n(e = t.elements[i]) || ("radio" === e.type || "checkbox" === e.type ? e.checked && (r[e.name] = e.value) : "SELECT" === e.tagName ? r[e.name] = e.options[e.selectedIndex].value : r[e.name] = e.value);
        return r
    }
}, function(t, e, n) {
    var i = n(1),
        r = n(36),
        o = "data-nqid";
    t.exports = i("nqjs.dom.elementID", function(t, e) {
        var n = t.getAttribute(o);
        return n || (e && e.create ? (n = "" + r(), t.setAttribute(o, n), n) : null)
    })
}, function(t, e, n) {
    var i = n(1),
        r = /"/g,
        o = /'/g,
        s = /_DOUBLEQUOTE_/g,
        a = /_SINGLEQUOTE_/g,
        u = /([{,])\s*([a-zA-Z0-9_]+)\s*:/g;
    t.exports = i("nqjs.dom.parseCfg", function(t) {
        try {
            var e = t.replace(r, "&#34;").replace(o, '"').replace(u, '$1"$2":').replace(a, "'").replace(s, '\\"');
            return JSON.parse(e)
        } catch (t) {
            return null
        }
    })
}, function(t, e) {
    try {
        new window.CustomEvent("?")
    } catch (t) {
        window.CustomEvent = function(t) {
            function e(t, e, n, i) {
                this.initEvent(t, e, n), this.detail = i
            }
            return function(n, i) {
                var r = document.createEvent(t);
                if (!n || "string" != typeof n) throw new Error("CustomEvent() missing or invalid event type");
                return "Event" === t && (r.initCustomEvent = e), r.initCustomEvent(n, i.bubbles, i.cancelable, i.detail), r
            }
        }(window.CustomEvent ? "CustomEvent" : "Event")
    }
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = n(37),
        s = "object",
        a = "merge() can only merge objects";
    t.exports = i("nqjs.util.merge", function t() {
        if (r(arguments[0]) !== s) throw new Error(a);
        for (var e, n, i, u = 0, l = arguments.length, c = o(arguments[0]); ++u < l;) {
            if (e = arguments[u], r(e) !== s) throw new Error(a);
            for (n in e) e.hasOwnProperty(n) && (i = e[n], r(i) === s && r(c[n]) === s ? c[n] = t(c[n], i) : c[n] = o(i))
        }
        return c
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(5),
        o = n(3),
        s = n(24).support,
        a = s("transition"),
        u = /\s*,\s*/,
        l = /\s+/,
        c = /^-[a-zA-Z]+-/,
        h = {
            name: "data-transition",
            enter: ":enter",
            stay: ":stay",
            leave: ":leave"
        };

    function d(t, e, n, i) {
        requestAnimationFrame(function() {
            var r, o = f(i);
            o && p(e, i.transition, "enter"), i && i.beforeInsertion && i.beforeInsertion(e), "append" !== t && n.firstChild ? n.insertBefore(e, n.firstChild) : n.appendChild(e), i && i.afterInsertion && i.afterInsertion(e), i && i.afterTransition && (o && (r = v(e, i.transition)), r ? (b(e, r, i.afterTransition), requestAnimationFrame(function() {
                p(e, i.transition, "stay")
            })) : i.afterTransition(e))
        })
    }

    function f(t) {
        return a && t && t.transition
    }

    function p(t, e, n) {
        "string" != typeof e ? function(t, e, n) {
            var i;
            for (i in e) e.hasOwnProperty(i) && ("@root" === i ? g(t, e[i], n) : m(t, i, e[i], n))
        }(t, e, n) : g(t, e, n)
    }

    function m(t, e, n, i) {
        r(e, t).forEach(function(t) {
            g(t, n, i)
        })
    }

    function g(t, e, n) {
        t.setAttribute(h.name, e + h[n])
    }

    function v(t, e) {
        if ("string" == typeof e) return w(t);
        var n, i = 0;
        for (n in e) e.hasOwnProperty(n) && (i += w("@root" === n ? t : o(n, t)));
        return i
    }

    function w(t) {
        var e = window.getComputedStyle(t)[a.js].split(u).map(function(t) {
            return t.split(l)[0]
        });
        return e.filter(function(t) {
            return "-" !== t.charAt(0) || function(t, e) {
                var n = s(t.replace(c, ""));
                if (!n) return !1;
                return n.css === t || -1 === e.indexOf(n.css)
            }(t, e)
        }).length
    }

    function b(t, e, n) {
        var i = 0;

        function r(o) {
            ++i === e && (t.removeEventListener("transitionend", r), t.removeEventListener("webkitTransitionEnd", r), n(t))
        }
        t.addEventListener("transitionend", r), t.addEventListener("webkitTransitionEnd", r)
    }
    n(45), e.append = i("nqjs.dom.append", function(t, e, n) {
        d("append", t, e, n)
    }), e.prepend = i("nqjs.dom.prepend", function(t, e, n) {
        d("prepend", t, e, n)
    }), e.remove = i("nqjs.dom.remove", function(t, e) {
        requestAnimationFrame(function() {
            var n;
            f(e) && (p(t, e.transition, "stay"), n = v(t, e.transition)) ? requestAnimationFrame(function() {
                b(t, n, function() {
                    requestAnimationFrame(function() {
                        e.afterTransition && e.afterTransition(t), e.beforeRemoval && e.beforeRemoval(t), t.parentNode.removeChild(t), e.afterRemoval && e.afterRemoval(t)
                    })
                }), p(t, e.transition, "leave")
            }) : (e && e.afterTransition && e.afterTransition(t), e && e.beforeRemoval && e.beforeRemoval(t), t.parentNode.removeChild(t), e && e.afterRemoval && e.afterRemoval(t))
        })
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = n(15),
        s = n(16),
        a = {},
        u = {},
        l = /\s+/,
        c = ["ms", "Moz", "Webkit", ""],
        h = /(?:^[a-zA-Z]|[A-Z])/g,
        d = /-[a-zA-Z]/g,
        f = /^(-?\d*(?:\.?\d+)?)(px|r?em|ex|c[hm]|v[hw]|vm(?:in|ax)|pt|ms?|deg|rad|turn|%)?$/;

    function p(t) {
        var e = t.indexOf("-") > -1 ? t.replace(d, m) : t;
        if (e in a) return a[e];
        for (var n = document.documentElement.style, i = c.length; i--;)
            if ("string" == typeof n[t = c[i] ? c[i] + e.charAt(0).toUpperCase() + e.substring(1) : e]) return a[e] = {
                js: t,
                css: g(t, c[i])
            }, a[e];
        return null
    }

    function m(t) {
        return t.substring(1).toUpperCase()
    }

    function g(t, e) {
        return (e ? "-" : "") + t.replace(h, v)
    }

    function v(t, e) {
        return (0 === e ? "" : "-") + t.toLowerCase()
    }

    function w(t, e) {
        var n, i, r, o, s = e.split(l);
        if (1 === s.length) return (n = p(s[0])) ? b(s[0], t[n.js]) : null;
        for (i = {}, r = -1, o = s.length; ++r < o;) n = p(s[r]), i[s[r]] = n ? b(s[r], t[n.js]) : null;
        return i
    }

    function b(t, e) {
        if (t in u) return u[t].parse(e);
        var n = e.match(f);
        return n ? {
            value: parseFloat(n[1]),
            unit: n[2] || ""
        } : {
            value: e,
            unit: ""
        }
    }

    function E(t, e) {
        return t in u ? u[t].stringify(e) : "number" === r(e) ? e + "px" : e
    }
    t.exports = i("nqjs.dom.styles", {
        support: p,
        get: function(t, e) {
            return w(o(t).style, e)
        },
        getComputed: function(t, e) {
            return w(window.getComputedStyle(o(t)), e)
        },
        set: function(t, e, n) {
            var i;
            3 === arguments.length ? (i = {})[e] = n : i = e, s(t, function(t) {
                var e, n;
                for (e in i) i.hasOwnProperty(e) && (n = p(e)) && (t.style[n.js] = E(e, i[e]))
            })
        },
        parseValue: b,
        stringifyValue: E,
        registerHelper: function(t, e) {
            if (!t || "string" != typeof t) throw new Error("registerStyleHelper() invalid style name helper");
            if (!e || "function" != typeof e.parse || "function" != typeof e.stringify) throw new Error('registerStyleHelper() invalid definition for "' + t + '" style helper');
            u[t] = e
        },
        getHelper: function(t) {
            return u[t] || null
        }
    })
}, function(t, e, n) {
    var i = n(52),
        r = n(10).create(i),
        o = n(17),
        s = n(9);
    t.exports = function(t) {
        var e, n = r.render("root", {
            labels: o(),
            tapToClose: "{trigger:'NQPopins',action:'close'}"
        });
        return t ? (e = n.querySelector("[data-popin-content]"), t.contentHTML ? e.innerHTML = t.contentHTML : t.iframe && (e.innerHTML = '<iframe src="' + t.iframe.url + '"></iframe>'), s({
            popinElement: n
        }, t)) : {
            popinElement: n
        }
    }
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.util.debounce", function(t, e, n) {
        var i, r;
        return function() {
            var o = arguments,
                s = this;
            return i ? clearTimeout(i) : n && (r = t.apply(s, o)), i = setTimeout(function() {
                n || (r = t.apply(s, o)), i = null
            }, e), r
        }
    })
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.dom.renderTemplateLoop", function(t, e) {
        for (var n = -1, i = t.length, r = document.createDocumentFragment(); ++n < i;) r.appendChild(e(t[n]));
        return r
    })
}, function(t, e) {
    var n;
    t.exports = (-1 === (n = navigator.userAgent).indexOf("Android 2.") && -1 === n.indexOf("Android 4.0") || -1 === n.indexOf("Mobile Safari") || -1 !== n.indexOf("Chrome") || -1 !== n.indexOf("Windows Phone") || "file:" === location.protocol) && window.history && "pushState" in window.history
}, function(t, e, n) {
    var i = n(26),
        r = n(11),
        o = i(function() {
            var t = Math.min(window.innerWidth, document.documentElement.clientWidth),
                e = Math.min(window.innerHeight, document.documentElement.clientHeight);
            r(window, "nqviewresize", {
                detail: {
                    scrollTop: window.pageYOffset,
                    width: t,
                    height: e
                }
            })
        }, 100);
    window.addEventListener("resize", o), window.addEventListener("orientationchange", o)
}, function(t, e, n) {
    var i = n(95),
        r = n(11);
    window.addEventListener("scroll", i(function() {
        r(window, "nqviewscroll", {
            detail: {
                scrollTop: window.pageYOffset
            }
        })
    }, 50))
}, function(t, e, n) {
    n(32), n(34), n(39), n(42), n(43), n(44), n(53), n(54), n(55), n(56), n(60), n(62), n(64), n(65), n(69), n(70), n(77), n(78), n(79), n(85), n(86), n(87), n(89), n(90), n(92), n(93), n(94), n(96), n(97)
}, function(t, e, n) {
    var i = n(33);
    for (var r in i.prototype) i.prototype.hasOwnProperty(r) && (window.prestashop[r] = i.prototype[r])
}, function(t, e, n) {
    "use strict";
    var i, r = "object" == typeof Reflect ? Reflect : null,
        o = r && "function" == typeof r.apply ? r.apply : function(t, e, n) {
            return Function.prototype.apply.call(t, e, n)
        };
    i = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(t) {
        return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : function(t) {
        return Object.getOwnPropertyNames(t)
    };
    var s = Number.isNaN || function(t) {
        return t != t
    };

    function a() {
        a.init.call(this)
    }
    t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
    var u = 10;

    function l(t) {
        return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners
    }

    function c(t, e, n, i) {
        var r, o, s, a;
        if ("function" != typeof n) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n);
        if (void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), o = t._events), s = o[e]), void 0 === s) s = o[e] = n, ++t._eventsCount;
        else if ("function" == typeof s ? s = o[e] = i ? [n, s] : [s, n] : i ? s.unshift(n) : s.push(n), (r = l(t)) > 0 && s.length > r && !s.warned) {
            s.warned = !0;
            var u = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            u.name = "MaxListenersExceededWarning", u.emitter = t, u.type = e, u.count = s.length, a = u, console && console.warn && console.warn(a)
        }
        return t
    }

    function h(t, e, n) {
        var i = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: n
            },
            r = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t.push(arguments[e]);
                this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, o(this.listener, this.target, t))
            }.bind(i);
        return r.listener = n, i.wrapFn = r, r
    }

    function d(t, e, n) {
        var i = t._events;
        if (void 0 === i) return [];
        var r = i[e];
        return void 0 === r ? [] : "function" == typeof r ? n ? [r.listener || r] : [r] : n ? function(t) {
            for (var e = new Array(t.length), n = 0; n < e.length; ++n) e[n] = t[n].listener || t[n];
            return e
        }(r) : p(r, r.length)
    }

    function f(t) {
        var e = this._events;
        if (void 0 !== e) {
            var n = e[t];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length
        }
        return 0
    }

    function p(t, e) {
        for (var n = new Array(e), i = 0; i < e; ++i) n[i] = t[i];
        return n
    }
    Object.defineProperty(a, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return u
        },
        set: function(t) {
            if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
            u = t
        }
    }), a.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    }, a.prototype.setMaxListeners = function(t) {
        if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
        return this._maxListeners = t, this
    }, a.prototype.getMaxListeners = function() {
        return l(this)
    }, a.prototype.emit = function(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
        var i = "error" === t,
            r = this._events;
        if (void 0 !== r) i = i && void 0 === r.error;
        else if (!i) return !1;
        if (i) {
            var s;
            if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
            var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw a.context = s, a
        }
        var u = r[t];
        if (void 0 === u) return !1;
        if ("function" == typeof u) o(u, this, e);
        else {
            var l = u.length,
                c = p(u, l);
            for (n = 0; n < l; ++n) o(c[n], this, e)
        }
        return !0
    }, a.prototype.addListener = function(t, e) {
        return c(this, t, e, !1)
    }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(t, e) {
        return c(this, t, e, !0)
    }, a.prototype.once = function(t, e) {
        if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
        return this.on(t, h(this, t, e)), this
    }, a.prototype.prependOnceListener = function(t, e) {
        if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
        return this.prependListener(t, h(this, t, e)), this
    }, a.prototype.removeListener = function(t, e) {
        var n, i, r, o, s;
        if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
        if (void 0 === (i = this._events)) return this;
        if (void 0 === (n = i[t])) return this;
        if (n === e || n.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, n.listener || e));
        else if ("function" != typeof n) {
            for (r = -1, o = n.length - 1; o >= 0; o--)
                if (n[o] === e || n[o].listener === e) {
                    s = n[o].listener, r = o;
                    break
                }
            if (r < 0) return this;
            0 === r ? n.shift() : function(t, e) {
                for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                t.pop()
            }(n, r), 1 === n.length && (i[t] = n[0]), void 0 !== i.removeListener && this.emit("removeListener", t, s || e)
        }
        return this
    }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(t) {
        var e, n, i;
        if (void 0 === (n = this._events)) return this;
        if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[t]), this;
        if (0 === arguments.length) {
            var r, o = Object.keys(n);
            for (i = 0; i < o.length; ++i) "removeListener" !== (r = o[i]) && this.removeAllListeners(r);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
        }
        if ("function" == typeof(e = n[t])) this.removeListener(t, e);
        else if (void 0 !== e)
            for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
        return this
    }, a.prototype.listeners = function(t) {
        return d(this, t, !0)
    }, a.prototype.rawListeners = function(t) {
        return d(this, t, !1)
    }, a.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : f.call(t, e)
    }, a.prototype.listenerCount = f, a.prototype.eventNames = function() {
        return this._eventsCount > 0 ? i(this._events) : []
    }
}, function(t, e, n) {
    var i = n(35);
    n(0).hook("onDefine", function(t, e) {
        "method" in e || (e.method = i)
    })
}, function(t, e) {
    t.exports = function(t) {
        if ("function" != typeof this[t]) throw new Error(this.componentName + '.method() cannot bind non-function property "' + t + '"');
        return this._bound || (this._bound = {}), t in this._bound || (this._bound[t] = this[t].bind(this)), this._bound[t]
    }
}, function(t, e, n) {
    var i = n(1),
        r = 0;
    t.exports = i("nqjs.util.id", function() {
        return ++r
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = n(38),
        s = {
            global: "g",
            ignoreCase: "i",
            multiline: "m",
            unicode: "u",
            sticky: "y"
        };

    function a(t) {
        switch (r(t)) {
            case "object":
                return function(t) {
                    if (!o(t)) throw new Error("clone() trying to clone an object that was not created with the Object constructor");
                    var e, n = {};
                    for (e in t) t.hasOwnProperty(e) && (n[e] = a(t[e]));
                    return n
                }(t);
            case "array":
                return function(t) {
                    var e = [],
                        n = -1,
                        i = t.length;
                    for (; ++n < i;) e[n] = a(t[n]);
                    return e
                }(t);
            case "date":
                return function(t) {
                    return new Date(+t)
                }(t);
            case "regexp":
                return function(t) {
                    var e, n;
                    if (t.flags) e = t.flags;
                    else
                        for (n in e = "", s) s.hasOwnProperty(n) && t[n] && (e += s[n]);
                    return new RegExp(t.source, e)
                }(t);
            default:
                return t
        }
    }
    t.exports = i("nqjs.util.clone", a)
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.util.isPlainObject", function(t) {
        return !!t && "object" == typeof t && t.constructor === Object
    })
}, function(t, e, n) {
    (function(t) {
        var e = n(0),
            i = n(2),
            r = n(7),
            o = n(12),
            s = n(8),
            a = n(6),
            u = n(41);
        t.export = e.define("nq-input-number", {
            getDefaultCfg: function() {
                return {
                    selectors: {
                        input: 'input[type="number"], input[type="text"]',
                        increment: 'button[data-type="increment"]',
                        decrement: 'button[data-type="decrement"]'
                    }
                }
            },
            setup: function() {
                this.queryElements(), this.state.currentValue = this.getValue(), this.setupButtons(), i.on(this.getTapListenerInfos()), i.on(this.getChangeListenerInfos()), a.use()
            },
            cleanup: function() {
                this.cleanupButtons(), i.off(this.getTapListenerInfos()), i.off(this.getChangeListenerInfos()), a.stopUsing()
            },
            getTapListenerInfos: function() {
                return {
                    node: this.element,
                    type: "nqtap",
                    handler: this.method("handleTapEvent")
                }
            },
            getChangeListenerInfos: function() {
                return {
                    node: this.inputElement,
                    type: "change",
                    handler: this.method("handleChangeEvent")
                }
            },
            queryElements: function() {
                var t = this.cfg.selectors;
                if (this.inputElement = this.element.querySelector(t.input), this.incrementElement = this.element.querySelector(t.increment), this.decrementElement = this.element.querySelector(t.decrement), !this.inputElement) throw new Error(u(this, "setup", "input number not found"));
                if (!this.incrementElement) throw new Error(u(this, "setup", "increment button not found"));
                if (!this.decrementElement) throw new Error(u(this, "setup", "decrement button not found"))
            },
            setupButtons: function() {
                var t = this.cfg.labels,
                    e = this.inputElement.id;
                o.set(this.incrementElement, {
                    controls: e,
                    label: t.increment
                }), o.set(this.decrementElement, {
                    controls: e,
                    label: t.decrement
                }), r.set(this.incrementElement, "data-nqtap", "{action:'increment'}"), r.set(this.decrementElement, "data-nqtap", "{action:'decrement',ignoreDisabled:true}"), this.updateButtons(this.state.currentValue)
            },
            cleanupButtons: function() {
                o.remove(this.incrementElement, "controls label"), o.set(this.decrementElement, "controls label"), r.remove(this.incrementElement, "data-nqtap"), r.remove(this.decrementElement, "data-nqtap")
            },
            handleTapEvent: function(t) {
                var e = t.detail.action;
                "increment" !== e && "decrement" !== e || this[e]()
            },
            handleChangeEvent: function() {
                var t = this.state.currentValue,
                    e = this.getValue();
                e !== t && (this.state.currentValue = e, this.updateButtons(e), this.dispatchValueChange(e, t))
            },
            getValue: function() {
                return parseFloat(this.inputElement.value)
            },
            setValue: function(t) {
                var e = this.getValue();
                if (t === e || !this.validateValue(t)) return this.dispatchOverflow(t);
                this.inputElement.value = "" + t, this.state.currentValue = t, this.updateButtons(t), this.dispatchValueChange(t, e)
            },
            dispatchValueChange: function(t, e) {
                i.dispatch({
                    node: this.inputElement,
                    type: "NQChange",
                    options: {
                        detail: {
                            component: this,
                            value: t,
                            oldValue: e,
                            delta: Math.abs(t - e),
                            action: t > e ? "increment" : "decrement"
                        }
                    }
                })
            },
            dispatchOverflow: function(t) {
                if (this.cfg.overflowWarning) {
                    var e = t < this.getMin(),
                        n = t > this.getMax();
                    (e || n) && i.dispatch({
                        node: this.inputElement,
                        type: "NQOverflowWarning",
                        options: {
                            detail: {
                                component: this,
                                value: t,
                                overflow: e ? "min" : "max"
                            }
                        }
                    })
                }
            },
            validateValue: function(t) {
                return "number" === s(t) && t >= this.getMin() && t <= this.getMax()
            },
            increment: function() {
                this.setValue(this.getValue() + this.getStep())
            },
            decrement: function() {
                this.setValue(this.getValue() - this.getStep())
            },
            getMin: function() {
                return parseFloat(this.inputElement.getAttribute("min")) || -1 / 0
            },
            setMin: function(t) {
                if (t !== this.getMin()) {
                    if (!this.validateMin(t)) throw new Error(u(this, "setMin", "invalid minimum"));
                    this.inputElement.setAttribute("min", "" + t)
                }
            },
            validateMin: function(t) {
                return "number" === s(t) && t <= this.getValue()
            },
            getMax: function() {
                return parseFloat(this.inputElement.getAttribute("max")) || 1 / 0
            },
            setMax: function(t) {
                if (t !== this.getMax()) {
                    if (!this.validateMax(t)) throw new Error(u(this, "setMax", "invalid maximum"));
                    this.inputElement.setAttribute("max", "" + t)
                }
            },
            validateMax: function(t) {
                return "number" === s(t) && t >= this.getValue()
            },
            getStep: function() {
                return parseFloat(this.inputElement.getAttribute("step")) || 1
            },
            setStep: function(t) {
                if (t !== this.getStep()) {
                    if (!this.validateStep(t)) throw new Error(u(this, "setStep", "invalid step"));
                    this.inputElement.setAttribute("step", "" + t)
                }
            },
            validateStep: function(t) {
                return "number" === s(t) && t <= this.getMax() - this.getMin()
            },
            updateButtons: function(t) {
                this.cfg.overflowWarning || (t === this.getMin() ? (this.incrementElement.disabled = !1, this.decrementElement.disabled = !0) : t === this.getMax() ? (this.incrementElement.disabled = !0, this.decrementElement.disabled = !1) : (this.incrementElement.disabled = !1, this.decrementElement.disabled = !1))
            }
        })
    }).call(this, n(40)(t))
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, function(t, e) {
    t.exports = function(t, e, n) {
        return t.componentName + "." + e + "() " + n
    }
}, function(t, e, n) {
    var i = n(2),
        r = n(3),
        o = /[\/\\]/;
    t.exports = n(0).define("nq-input-file", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    label: ".nq-c-File-custom-label-xtra"
                }
            }
        },
        setup: function() {
            i.on(this.getNQInputFileListenerInfos()), i.on(this.getChangeListenerInfos())
        },
        cleanup: function() {
            i.off(this.getNQInputFileListenerInfos()), i.off(this.getChangeListenerInfos())
        },
        getNQInputFileListenerInfos: function() {
            return {
                node: this.element,
                type: "NQInputFile",
                handler: this.method("handleNQInputFileEvent")
            }
        },
        getChangeListenerInfos: function() {
            return {
                node: this.getInput(),
                type: "change",
                handler: this.method("handleChangeEvent")
            }
        },
        handleNQInputFileEvent: function() {
            this.getInput().click()
        },
        handleChangeEvent: function(t) {
            var e = t.target.value.split(o),
                n = e[e.length - 1] || "";
            this.getLabel().innerHTML = n
        },
        getInput: function() {
            return r('input[type="file"]', this.element)
        },
        getLabel: function() {
            return r(this.cfg.selectors.label, this.element)
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(3);
    t.exports = n(0).define("nq-password-reveal", {
        setup: function() {
            i.on(this.getNQPwdRevealListenerInfos())
        },
        cleanup: function() {
            i.off(this.getNQPwdRevealListenerInfos())
        },
        getNQPwdRevealListenerInfos: function() {
            return {
                node: this.element,
                type: "NQPwdReveal",
                handler: this.method("toggle")
            }
        },
        toggle: function() {
            var t = r("input", this.element),
                e = r("[data-nqtap]", this.element),
                n = this.cfg.labelAs,
                i = this.cfg.labels;
            "text" === t.type ? (this.element.setAttribute("data-mode", "show"), t.type = "password", "title" === n ? e.title = i.show : e.innerHTML = i.show) : (this.element.setAttribute("data-mode", "hide"), t.type = "text", "title" === n ? e.title = i.hide : e.innerHTML = i.hide)
        }
    })
}, function(t, e, n) {
    var i = n(0),
        r = n(2),
        o = n(3),
        s = n(9),
        a = n(23),
        u = n(6),
        l = n(46),
        c = n(47),
        h = n(25);
    t.exports = i.define("nq-popins", {
        getDefaultCfg: function() {
            return {
                transitions: {},
                selectors: {
                    content: "[data-popin-content]"
                }
            }
        },
        setup: function() {
            r.on(this.getNQPopinsListenerInfos()), u.use()
        },
        cleanup: function() {
            r.off(this.getNQPopinsListenerInfos()), u.stopUsing()
        },
        getNQPopinsListenerInfos: function() {
            return {
                node: this.element,
                type: "NQPopins",
                handler: this.method("handleNQPopinsEvent")
            }
        },
        getKeyDownListenersInfos: function() {
            return {
                node: document,
                type: "keydown",
                handler: this.method("handleKeyDownEvent")
            }
        },
        handleNQPopinsEvent: function(t) {
            var e, n = t.detail.action;
            "open" === n ? (e = h(s({
                openerElement: t.target
            }, t.detail)), this.open(e)) : "close" === n && this.close()
        },
        handleKeyDownEvent: function(t) {
            27 === t.keyCode && this.close()
        },
        open: function(t) {
            if (this.popinElement) return this.update(t);
            this.state.data = t.popinElement ? t : h(t), this.popinElement = this.state.data.popinElement, document.documentElement.setAttribute("data-popin-opened", "true"), document.body.style.paddingRight = l() + "px", a.append(this.popinElement, document.body, {
                transition: this.cfg.transitions.show,
                afterInsertion: this.method("afterOpen"),
                afterTransition: this.method("afterOpenTransition")
            })
        },
        afterOpen: function() {
            i.createAll(this.popinElement)
        },
        afterOpenTransition: function() {
            var t = this.state;
            r.on(this.getKeyDownListenersInfos()), this.getContent(t.data, t.fromElm), t.available = !0, t.data.afterOpen && t.data.afterOpen(this.popinElement)
        },
        getContent: function(t) {
            "xhr" === t.mode && (t.url || t.openerElement && t.openerElement.href) && c.abort().send({
                url: t.url || t.openerElement.href,
                after: this.method("afterGetContent")
            })
        },
        afterGetContent: function(t) {
            var e, n = this.state.data;
            e = n.selector ? $(t).find(n.selector).html() : t, this.update({
                contentHTML: e
            })
        },
        close: function() {
            this.popinElement && (r.off(this.getKeyDownListenersInfos()), a.remove(this.popinElement, {
                transition: this.cfg.transitions.hide,
                beforeRemoval: this.method("beforeClose")
            }))
        },
        beforeClose: function() {
            this.state.data.beforeClose && this.state.data.beforeClose(this.popinElement), i.destroyAll(this.popinElement), document.body.style.paddingRight = "", document.documentElement.setAttribute("data-popin-opened", "false"), this.popinElement = null, this.state.data = null, this.state.updateData = null
        },
        update: function(t) {
            if (this.popinElement) {
                var e = this.getContentElement();
                this.state.updateData = t, i.destroyAll(e), t.contentHTML || t.contentElement ? t.contentHTML ? e.innerHTML = t.contentHTML : (e.parentNode.replaceChild(t.contentElement, e), e = this.getContentElement()) : t.popinElement && (this.popinElement.parentNode.replaceChild(t.popinElement, this.popinElement), this.popinElement = t.popinElement, e = this.getContentElement()), t.afterOpen && t.afterOpen(this.popinElement), i.createAll(e)
            }
        },
        getContentElement: function() {
            return o(this.cfg.selectors.content, this.popinElement)
        }
    })
}, function(t, e) {
    ! function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - t)),
                r = window.setTimeout(function() {
                    e(n + i)
                }, i);
            return t = n + i, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }()
}, function(t, e, n) {
    var i = n(1),
        r = null;
    t.exports = i("nqjs.dom.getScrollbarWidth", function() {
        if (null !== r) return r;
        var t = document.createElement("div");
        return t.style.cssText = "position:absolute;left:-9999px;overflow:scroll;width:50px;height:50px;", document.body.appendChild(t), r = t.offsetWidth - t.clientWidth, document.body.removeChild(t), r
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        dataType: "html",
        beforeAll: function(t) {
            -1 === t.url.indexOf("content_only") && (t.url += (t.url.indexOf("?") > -1 ? "&" : "?") + "content_only=1")
        }
    })
}, function(t, e, n) {
    var i = n(49),
        r = n(10).create(i),
        o = n(17),
        s = n(9),
        a = n(8);
    t.exports = function(t) {
        var e = o(),
            n = "array" === a(t.message) ? t.message.join(" ") : t.message;
        return s({
            popinElement: r.render("root", {
                title: e.error,
                labels: e,
                message: n,
                tapToClose: "{trigger:'NQPopins',action:'close'}"
            })
        }, t)
    }
}, function(t, e) {
    t.exports = {
        root: function(t, e) {
            return [e.createElement("div", {
                class: "nq-c-Popin",
                "data-popin-type": "error"
            }, ["\n    ", e.createElement("div", {
                class: "nq-c-Popin-mask",
                "data-nqtap": e.getData("tapToClose", t)
            }, null, "http://www.w3.org/1999/xhtml"), "\n    ", e.createElement("div", {
                class: "nq-c-Popin-content"
            }, ["\n        ", e.createElement("div", {
                "data-popin-content": !0
            }, ["\n            ", e.createElement("h2", {
                class: "nq-c-Popin-title"
            }, [e.getData("title", t)], "http://www.w3.org/1999/xhtml"), "\n            ", e.createElement("p", null, [e.getData("message", t)], "http://www.w3.org/1999/xhtml"), "\n        "], "http://www.w3.org/1999/xhtml"), "\n        ", e.createElement("button", {
                type: "button",
                class: "nq-c-Popin-close",
                "data-nqtap": e.getData("tapToClose", t)
            }, [e.getData("labels.close", t)], "http://www.w3.org/1999/xhtml"), "\n    "], "http://www.w3.org/1999/xhtml"), "\n"], "http://www.w3.org/1999/xhtml")]
        }
    }
}, function(t, e, n) {
    var i = n(1),
        r = n(8),
        o = /^(?:async|autocomplete|autofocus|autoplay|checked|contenteditable|controls|default|defer|disabled|hidden|ismap|loop|multiple|muted|novalidate|open|readonly|required|reversed|scoped|selected|spellcheck|translate)$/;
    t.exports = i("nqjs.dom.createElement", function(t, e, n, i) {
        if ("array" === r(e) && (n = e, e = null), "array" !== r(n) && (n = null), function(t) {
                return !(!t || !0 !== t["nq-remove-if"] && !1 !== t["nq-insert-if"])
            }(e)) return null;
        var s, a, u, l, c = function(t) {
            return !!(t && t.indexOf("/svg") > -1)
        }(i) ? document.createElementNS("http://www.w3.org/2000/svg", t) : document.createElement(t);
        if (e)
            for (s in e) e.hasOwnProperty(s) && "nq-remove-if" !== s && "nq-insert-if" !== s && (o.test(s) ? e[s] && c.setAttribute(s, s) : c.setAttribute(s, e[s]));
        if (n)
            for (a = -1, u = n.length; ++a < u;) "string" == (l = typeof n[a]) || "number" === l || "boolean" === l ? c.appendChild(document.createTextNode("" + n[a])) : null !== n[a] && c.appendChild(n[a]);
        return c
    })
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.util.get", function(t, e) {
        if (!e) return null;
        for (var n, i = t.split("."), r = -1, o = i.length; ++r < o;) {
            if (void 0 === e[n = i[r]] || null === e[n]) return null;
            e = e[n]
        }
        return e
    })
}, function(t, e) {
    t.exports = {
        root: function(t, e) {
            return [e.createElement("div", {
                class: "nq-c-Popin",
                "data-popin-type": "basic"
            }, ["\n    ", e.createElement("div", {
                class: "nq-c-Popin-mask",
                "data-nqtap": e.getData("tapToClose", t)
            }, null, "http://www.w3.org/1999/xhtml"), "\n    ", e.createElement("div", {
                class: "nq-c-Popin-content"
            }, ["\n        ", e.createElement("div", {
                "data-popin-content": !0
            }, ["\n            ", e.createElement("p", null, [e.getData("labels.loading", t)], "http://www.w3.org/1999/xhtml"), "\n        "], "http://www.w3.org/1999/xhtml"), "\n        ", e.createElement("button", {
                type: "button",
                class: "nq-c-Popin-close",
                "data-nqtap": e.getData("tapToClose", t)
            }, [e.getData("labels.close", t)], "http://www.w3.org/1999/xhtml"), "\n    "], "http://www.w3.org/1999/xhtml"), "\n"], "http://www.w3.org/1999/xhtml")]
        }
    }
}, function(t, e, n) {
    var i = n(2),
        r = n(6),
        o = n(7),
        s = n(12),
        a = n(3);
    t.exports = n(0).define("nq-dropdown", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    toggler: ".nq-c-Dropdown-toggler",
                    menu: ".nq-c-Dropdown-menu"
                }
            }
        },
        setup: function() {
            i.on(this.getTapListenerInfos()), this.setupTogglerButton(), r.use()
        },
        cleanup: function() {
            i.off(this.getTapListenerInfos()), this.cleanupTogglerButton(), r.stopUsing()
        },
        setupTogglerButton: function() {
            var t = this.getTogglerButton();
            o.set(t, "data-nqtap", ""), s.set(t, "expanded", "false")
        },
        cleanupTogglerButton: function() {
            var t = this.getTogglerButton();
            o.remove(t, "data-nqtap"), s.remove(t, "expanded")
        },
        getTapListenerInfos: function() {
            return {
                node: this.element,
                type: "nqtap",
                handler: this.method("handleNQTapEvent")
            }
        },
        getDocClickOrTouchListenersInfos: function() {
            return {
                node: document,
                type: "click touchstart",
                handler: this.method("handleDocClickOrTouchEvent")
            }
        },
        handleNQTapEvent: function() {
            this.toggle()
        },
        handleDocClickOrTouchEvent: function(t) {
            this.isPartOfElement(t.target) || this.close()
        },
        toggle: function() {
            var t = this.getTogglerButton();
            "true" === s.get(t, "expanded") ? this.close() : this.open()
        },
        open: function() {
            s.set(this.getTogglerButton(), "expanded", "true"), this.getMenu().removeAttribute("hidden"), i.on(this.getDocClickOrTouchListenersInfos())
        },
        close: function() {
            s.set(this.getTogglerButton(), "expanded", "false"), this.getMenu().setAttribute("hidden", "hidden"), i.off(this.getDocClickOrTouchListenersInfos())
        },
        getTogglerButton: function() {
            return a(this.cfg.selectors.toggler, this.element)
        },
        getMenu: function() {
            return a(this.cfg.selectors.menu, this.element)
        },
        isPartOfElement: function(t) {
            return t === this.element || this.element.contains(t)
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = n(12),
        s = n(3),
        a = n(5),
        u = n(6);
    t.exports = n(0).define("nq-tabs", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    list: ".nq-c-Tabs-list",
                    tab: ".nq-c-Tabs-item",
                    panel: ".nq-c-Tabs-panel"
                }
            }
        },
        setup: function() {
            this.setupTabs(), i.on(this.getTapListenerInfos()), u.use()
        },
        cleanup: function() {
            this.cleanupTabs(), i.off(this.getTapListenerInfos()), u.stopUsing()
        },
        setupTabs: function() {
            var t = this,
                e = t.getTabsElms();
            o.set(e.list, "role", "tablist"), o.set(e.tabs, "role", "tab"), r.set(e.tabs, "data-nqtap", ""), o.set(e.panels, "role", "tabpanel"), e.tabs.forEach(function(n, i) {
                "true" === r.get(n, "data-selected") ? (o.set(n, "selected", "true"), t.state.currentID = r.get(n, "href")) : r.set(e.panels[i], "hidden", "hidden");
                for (var s = n.parentNode; s !== e.list;) o.set(s, "role", "presentation"), s = s.parentNode
            })
        },
        cleanupTabs: function() {
            var t = this.getTabsElms();
            o.remove(t.list, "role"), o.remove(t.tabs, "role"), r.remove(t.tabs, "data-nqtap"), o.remove(t.panels, "role"), t.tabs.forEach(function(e, n) {
                o.remove(e, "role selected"), r.remove(t.panels[n], "hidden");
                for (var i = e.parentNode; i !== t.list;) o.remove(i, "role"), i = i.parentNode
            })
        },
        getTabsElms: function() {
            var t = this.cfg.selectors,
                e = s(t.list, this.element);
            return {
                list: e,
                tabs: a(t.tab, e),
                panels: a(t.panel, this.element)
            }
        },
        getTapListenerInfos: function() {
            return {
                node: this.element,
                type: "nqtap",
                handler: this.method("handleNQTapEvent")
            }
        },
        handleNQTapEvent: function(t) {
            this.change(r.get(t.target, "href"))
        },
        change: function(t) {
            var e, n = this.state.currentID;
            t !== n && (e = this.getOldAndNewTabsElms(n, t), r.set(e.oldPanel, "hidden", "hidden"), o.set(e.oldTab, "selected", "false"), r.remove(e.newPanel, "hidden"), o.set(e.newTab, "selected", "true"), this.state.currentID = t)
        },
        getOldAndNewTabsElms: function(t, e) {
            return {
                oldPanel: s(t),
                oldTab: s('a[href="' + t + '"]', this.element),
                newPanel: s(e),
                newTab: s('a[href="' + e + '"]', this.element)
            }
        }
    }), $(".section-4 .tabs li, .section-2 .tabs li").click(function(t) {
        if (!$(this).hasClass("active")) return !1;
        var e = $(this).data("link");
        e += "#" + $(this).data("id"), window.location = e
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(3);
    t.exports = n(0).define("nq-show-hide", {
        setup: function() {
            this.queryDOM(), i.on(this.getNQTapListenerInfos())
        },
        cleanup: function() {
            i.off(this.getNQTapListenerInfos())
        },
        queryDOM: function() {
            this.btnElement = r("button", this.element), this.labelElement = r("[data-label]", this.element), this.contentElement = r("[data-shown]", this.element)
        },
        getNQTapListenerInfos: function() {
            return {
                node: this.element,
                type: "NQShowHide",
                handler: this.method("handleToggleCheckoutPrdListEvent")
            }
        },
        handleToggleCheckoutPrdListEvent: function() {
            this.state.timeoutID && (clearTimeout(this.state.timeoutID), this.state.timeoutID = null), this.isContentShown() ? this.contentElement.style.height ? this.hide() : (this.contentElement.style.height = this.contentElement.scrollHeight + "px", this.state.timeoutID = setTimeout(this.method("hide"), 0)) : this.show()
        },
        isContentShown: function() {
            return "true" === this.contentElement.getAttribute("data-shown")
        },
        hide: function() {
            this.contentElement.style.height = "0px", this.contentElement.setAttribute("data-shown", "false"), this.btnElement.setAttribute("data-shown", "false"), void 0 !== this.cfg.labels && void 0 !== this.cfg.labels.hidden && (this.labelElement.innerHTML = this.cfg.labels.hidden)
        },
        show: function() {
            this.contentElement.style.height = this.contentElement.scrollHeight + "px", this.contentElement.setAttribute("data-shown", "true"), this.btnElement.setAttribute("data-shown", "true"), void 0 !== this.cfg.labels && void 0 !== this.cfg.labels.shown && (this.labelElement.innerHTML = this.cfg.labels.shown)
        }
    })
}, function(t, e, n) {
    var i = n(3),
        r = n(2),
        o = n(26),
        s = n(12),
        a = n(10),
        u = n(57);
    t.exports = n(0).define("nq-suggest", {
        getDefaultCfg: function() {
            return {
                minChars: 3,
                resultsPerPage: 10,
                idPrefix: "nq-SuggestResults-"
            }
        },
        setup: function() {
            this.queryDOM(), this.setupResults(), r.on(this.getKeyDownListenerInfos()), r.on(this.getKeyUpListenerInfos()), r.on(this.getNQSuggestListenerInfos()), r.on(this.getBlurListenerInfos())
        },
        cleanup: function() {
            r.off(this.getKeyDownListenerInfos()), r.off(this.getKeyUpListenerInfos()), r.off(this.getNQSuggestListenerInfos()), r.off(this.getBlurListenerInfos())
        },
        queryDOM: function() {
            this.inputElement = i('input[type="text"], input[type="search"]', this.element)
        },
        setupResults: function() {
            var t = n(58),
                e = n(59),
                i = n(27),
                r = a.create(e).override({
                    forEachItem: function(t, e) {
                        return t && t.results && t.results.length ? i(t.results, function(t) {
                            return this.forEachItem({
                                link: t.link,
                                name: t.name,
                                tapToActivate: "{trigger:'NQSuggest'}"
                            }, e)
                        }.bind(this)) : null
                    }
                }),
                o = new t({
                    idPrefix: this.cfg.idPrefix
                });
            o.setTemplate(r), o.createElement(), o.insertElement(this.element), this.results = o, s.set(this.inputElement, "owns", o.getListID())
        },
        getKeyDownListenerInfos: function() {
            return {
                node: this.inputElement,
                type: "keydown",
                handler: this.method("handleKeyDownEvent")
            }
        },
        getKeyUpListenerInfos: function() {
            return {
                node: this.inputElement,
                type: "keyup",
                handler: o(this.method("handleKeyUpEvent"), 300)
            }
        },
        getNQSuggestListenerInfos: function() {
            return {
                node: this.element,
                type: "NQSuggest",
                handler: this.method("handleNQSuggestEvent")
            }
        },
        getBlurListenerInfos: function() {
            return {
                node: this.inputElement,
                type: "blur",
                handler: o(this.method("handleBlurEvent"), 300)
            }
        },
        handleKeyDownEvent: function(t) {
            var e = t.ctrlKey,
                n = t.shiftKey;
            switch (t.keyCode) {
                case 13:
                    t.preventDefault(), this.activate();
                    break;
                case 27:
                    this.close();
                    break;
                case 35:
                    e || n || (t.preventDefault(), this.select("last"));
                    break;
                case 36:
                    e || n || (t.preventDefault(), this.select("first"));
                    break;
                case 37:
                case 38:
                    e || n || (t.preventDefault(), this.select("previous"));
                    break;
                case 39:
                case 40:
                    e || n || (t.preventDefault(), this.select("next"))
            }
        },
        handleKeyUpEvent: function(t) {
            if (!this.isCtrlChar(t)) {
                var e = this.getQuery();
                e.length >= this.cfg.minChars ? this.search(e) : this.close()
            }
        },
        handleNQSuggestEvent: function(t) {
            this.activate(t.target)
        },
        handleBlurEvent: function() {
            this.close()
        },
        isCtrlChar: function(t) {
            var e = t.keyCode;
            return e >= 35 && e <= 40
        },
        getQuery: function() {
            return this.inputElement.value.trim()
        },
        search: function(t) {
            t !== this.state.lastQuery && (this.state.lastQuery = t, u.abort().send({
                url: this.element.action,
                data: {
                    s: t,
                    resultsPerPage: this.cfg.resultsPerPage
                },
                after: this.method("afterSearch")
            }))
        },
        afterSearch: function(t) {
            t.products.length ? this.open(t.products) : this.close()
        },
        open: function(t) {
            this.results.fill({
                results: t,
                total: t.length
            }), this.results.open()
        },
        close: function() {
            this.results.close(), this.results.empty()
        },
        select: function(t) {
            this.results[t](), s.set(this.inputElement, "activedescendant", this.results.getSelectedItemID())
        },
        activate: function(t) {
            var e, n;
            t || (t = (e = this.results.getSelectedItemID()) ? document.getElementById(e) : null), t && (n = t.getAttribute("data-url")), n ? location.href = n : this.element.submit()
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i
}, function(t, e, n) {
    var i = n(9),
        r = n(3),
        o = n(5);

    function s(t) {
        this.cfg = t, this.state = {
            selectedIndex: -1
        }
    }
    i(s.prototype, {
        setTemplate: function(t) {
            this.template = t
        },
        createElement: function() {
            this.element || (this.element = this.template.render("root"))
        },
        insertElement: function(t) {
            this.element && !this.element.parentNode && t.appendChild(this.element)
        },
        fill: function(t) {
            var e = r('[role="listbox"]', this.element),
                n = this.template.render("list", t),
                i = this.cfg.idPrefix;
            this.state.selectedIndex = -1, n.id = this.getListID(), this.itemElements = o('[role="option"]', n), this.itemElements.forEach(function(t, e) {
                t.id = i + "item-" + e
            }), this.state.total = this.itemElements.length, e.parentNode.replaceChild(n, e)
        },
        empty: function() {
            this.element && this.fill()
        },
        open: function() {
            this.element && this.element.removeAttribute("hidden")
        },
        close: function() {
            this.element && (this.element.setAttribute("hidden", "hidden"), this.state.selectedIndex = -1)
        },
        first: function() {
            this.select(0)
        },
        last: function() {
            this.select(this.state.total - 1)
        },
        previous: function() {
            var t = this.state.selectedIndex;
            this.select(-1 === t ? this.state.total - 1 : t - 1)
        },
        next: function() {
            var t = this.state.selectedIndex;
            this.select(-1 === t ? 0 : t + 1)
        },
        select: function(t) {
            var e = this.state;
            this.element && this.element.parentNode && this.itemElements && this.itemElements.length && t !== e.selectedIndex && (-1 === t ? t = e.total - 1 : t === e.total && (t = 0), this.itemElements.forEach(function(e, n) {
                e.setAttribute("data-selected", "" + (n === t))
            }), e.selectedIndex = t)
        },
        getSelectedItemID: function() {
            var t = this.itemElements ? this.itemElements[this.state.selectedIndex] : null;
            return t ? t.id : null
        },
        getListID: function() {
            return this.cfg.idPrefix + "results"
        }
    }), t.exports = s
}, function(t, e) {
    t.exports = {
        forEachItem: function(t, e) {
            return e.createElement("li", {
                role: "option",
                "data-nqtpl": "forEachItem",
                "data-url": e.getData("link", t),
                "data-nqtap": e.getData("tapToActivate", t)
            }, ["\n            " + e.getData("name", t) + "\n        "], "http://www.w3.org/1999/xhtml")
        },
        list: function(t, e) {
            return e.createElement("ul", {
                role: "listbox",
                "data-nqtpl": "list"
            }, ["\n        ", this.forEachItemOverride ? this.forEachItemOverride(t, e) : this.forEachItem(t, e), "\n    "], "http://www.w3.org/1999/xhtml")
        },
        root: function(t, e) {
            return [e.createElement("div", {
                class: "nq-c-SuggestResults",
                hidden: !0
            }, ["\n    ", this.listOverride ? this.listOverride(t, e) : this.list(t, e), "\n"], "http://www.w3.org/1999/xhtml")]
        }
    }
}, function(t, e, n) {
    var i = n(0),
        r = n(2),
        o = n(6),
        s = n(5),
        a = n(28),
        u = n(61),
        l = n(14);
    t.exports = i.define("nq-product-listing", {
        setup: function() {
            r.on(this.getNQProductListingListenersInfos()), r.on(this.getPopStateListenerOptions()), o.use()
        },
        cleanup: function() {
            r.off(this.getNQProductListingListenersInfos()), r.off(this.getPopStateListenerOptions()), o.stopUsing()
        },
        getNQProductListingListenersInfos: function() {
            return {
                node: this.element,
                type: "NQProductListing",
                handler: this.method("handleNQProductListingEvent")
            }
        },
        getPopStateListenerOptions: function() {
            return {
                node: window,
                type: "popstate",
                handler: this.method("handlePopStateEvent")
            }
        },
        handleUpdateProductListEvent: function(t) {
            this.updateHTML(t)
        },
        handleNQProductListingEvent: function(t) {
            this.isTappedElementUsable(t.target, t.detail) && (this.state.appendProducts = "goToPage" === t.detail.action && !0 === t.detail.appendProducts, this.getProducts(t.target.href))
        },
        handlePopStateEvent: function() {
            this.state.lockURL = !0, this.getProducts(location.href)
        },
        isTappedElementUsable: function(t, e) {
            var n = e.action;
            return !("sort" === n && e.selected || "goToPage" === n && e.disabled || t.disabled || "true" === t.getAttribute("data-disabled"))
        },
        getProducts: function(t) {
            a || this.state.appendProducts ? u.abort().send({
                url: t,
                before: this.method("beforeGetProducts"),
                after: this.method("afterGetProducts")
            }) : location.href = t
        },
        beforeGetProducts: function() {
            this.closeDropdowns()
        },
        afterGetProducts: function(t) {
            this.updateHTML(t), this.updateURL(t)
        },
        closeDropdowns: function() {
            s('[data-nqis~="nq-dropdown"]', this.element).forEach(function(t) {
                var e = i.get(t, "nq-dropdown");
                e && e.close()
            })
        },
        updateHTML: function(t) {
            this.updateFacetsHTML(t);
            var e = this.getReplacedElements();
            i.destroyAll(e.top), i.destroyAll(e.list), i.destroyAll(e.bottom), $(e.top).replaceWith(t.rendered_products_top), this.state.appendProducts ? this.appendProductsHTML(e.list, t.rendered_products) : $(e.list).replaceWith(t.rendered_products), $(e.bottom).replaceWith(t.rendered_products_bottom), e = this.getReplacedElements(), i.createAll(e.top), i.createAll(e.list), i.createAll(e.bottom)
        },
        updateFacetsHTML: function(t) {
            $("#search_filters").replaceWith(t.rendered_facets), $("#js-active-search-filters").replaceWith(t.rendered_active_filters)
        },
        appendProductsHTML: function(t, e) {
            $(t).append($(e).children())
        },
        updateURL: function(t) {
            if (a && !this.state.lockURL && t.current_url) {
                var e = t.current_url.split("#")[0];
                this.state.appendProducts && (e = e.replace(/[?&]page=\d+/, "")), e !== location.href && history.pushState(null, "", e)
            }
            this.state.lockURL = !1
        },
        getReplacedElements: function() {
            return {
                top: l("rendered_products_top"),
                list: l("rendered_products"),
                bottom: l("rendered_products_bottom")
            }
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        afterAll: function(t, e) {
            !t || e.status < 200 || e.status >= 300 || window.prestashop.emit("updateProductList", t)
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(6),
        o = n(63),
        s = n(13),
        a = n(25);
    t.exports = n(0).define("nq-quickview-manager", {
        setup: function() {
            i.on(this.getQuickViewListenerInfos()), r.use()
        },
        cleanup: function() {
            i.off(this.getQuickViewListenerInfos()), r.stopUsing()
        },
        getQuickViewListenerInfos: function() {
            return {
                node: this.element,
                type: "NQQuickView",
                handler: this.method("handleQuickViewEvent")
            }
        },
        handleQuickViewEvent: function(t) {
            this.state.quickViewOpener = t.target, this.getQuickView(t.target.href)
        },
        getQuickView: function(t) {
            o.abort().send({
                url: t.split("#")[0] + "?action=quickview",
                before: this.method("beforeGetQuickView"),
                after: this.method("afterGetQuickView")
            })
        },
        beforeGetQuickView: function() {
            var t = s();
            t && t.open(a({
                openerElement: this.state.quickViewOpener
            }))
        },
        afterGetQuickView: function(t) {
            var e = s();
            e && e.update({
                contentHTML: t.quickview_html
            })
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i
}, function(t, e, n) {
    var i = n(0),
        r = n(2),
        o = n(14);
    t.exports = i.define("nq-product", {
        setup: function() {
            r.on(this.getRefreshListenerOptions())
        },
        cleanup: function() {
            r.off(this.getRefreshListenerOptions())
        },
        getRefreshListenerOptions: function() {
            return {
                node: this.element,
                type: "NQRefresh",
                handler: this.method("handleRefreshEvent")
            }
        },
        handleRefreshEvent: function(t) {
            this.cleanupComponents(), this.updateHTML(t.detail), this.setupComponents()
        },
        cleanupComponents: function() {
            i.destroyAll(o("product_add_to_cart", this.element)), i.destroyAll(o("product_cover_thumbnails", this.element)), i.destroyAll(o("product_variants", this.element))
        },
        setupComponents: function() {
            i.createAll(o("product_add_to_cart", this.element)), i.createAll(o("product_cover_thumbnails", this.element)), i.createAll(o("product_variants", this.element))
        },
        updateHTML: function(t) {
            var e = this.element;
            ["product_prices", "product_customization", "product_variants", "product_discounts", "product_cover_thumbnails", "product_additional_info", "product_add_to_cart", "product_details"].forEach(function(n) {
                $(o(n, e)).replaceWith(t[n])
            })
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(66),
        o = n(67),
        s = n(68),
        a = n(28),
        u = n(18);
    t.exports = n(0).define("nq-product-form", {
        setup: function() {
            i.on(this.getChangeListenerOptions()), i.on(this.getNQChangeListenerOptions()), i.on(this.getPopStateListenerOptions())
        },
        cleanup: function() {
            i.off(this.getChangeListenerOptions()), i.off(this.getNQChangeListenerOptions()), i.off(this.getPopStateListenerOptions())
        },
        getSubmitListenerOptions: function() {
            return {
                node: this.element,
                type: "submit",
                handler: this.method("handleSubmitEvent")
            }
        },
        getChangeListenerOptions: function() {
            return {
                node: this.element,
                type: "change",
                handler: this.method("handleChangeEvent"),
                options: {
                    capture: !0
                }
            }
        },
        getNQChangeListenerOptions: function() {
            return {
                node: this.element,
                type: "NQChange",
                handler: this.method("handleChangeEvent")
            }
        },
        getPopStateListenerOptions: function() {
            return {
                node: window,
                type: "popstate",
                handler: this.method("handlePopStateEvent")
            }
        },
        handleSubmitEvent: function(t) {
            t.preventDefault(), this.addToCart()
        },
        handleChangeEvent: function(t) {
	     //console.log(t.target.name.indexOf('group'));
	     if (t.target.name.indexOf('group') >= 0) {
			jQuery(".lvm-loader").show();
	     }            
	     "accessories[]" !== t.target.name && ("qty" === t.target.name ? "NQChange" === t.type && this.refresh() : this.getProductURL())
        },
        handlePopStateEvent: function() {
            this.refresh()
        },
        addToCart: function() {
            r.abort().send({
                url: this.element.action,
                method: this.element.method,
                data: u(this.element),
                before: this.method("beforeAddToCart"),
                after: this.method("afterAddToCart")
            })
        },
        beforeAddToCart: function() {
            this.disableSubmitButton()
        },
        afterAddToCart: function(t) {
            t && !t.hasError && this.refresh()
        },
        getProductURL: function() {
            o.abort().send({
                url: this.element.action,
                method: this.element.method,
                data: u(this.element),
                before: this.method("beforeGetProductURL"),
                after: this.method("afterGetProductURL")
            })
        },
        beforeGetProductURL: function() {
            this.disableSubmitButton()
        },
        afterGetProductURL: function(t) {
            t && t.productUrl ? a ? this.refresh(t.productUrl) : location.href = t.productUrl : this.enableSubmitButton()
        },
        refresh: function(t) {
            t || (this.state.lockURL = !0, t = this.getURLWithQuantity()), s.abort().send({
                url: t,
                method: this.element.method,
                before: this.method("beforeRefresh"),
                after: this.method("afterRefresh")
            })
        },
        beforeRefresh: function() {
            this.disableSubmitButton();
        },
        afterRefresh: function(t) {
	     
		//console.log("After Refresh");
		//Modif promo sport bleu
	     if (t.id_product_attribute == 96) {
		jQuery("#promo-bleu").show();
	     } else {
		jQuery("#promo-bleu").hide();
	     }

	     jQuery(".lvm-loader").hide();

            this.enableSubmitButton(), t && (this.updateURL(t), i.dispatch({
                node: this.element,
                type: "NQRefresh",
                options: {
                    detail: t
                }
            }))
        },
        getURLWithQuantity: function() {
            var t = this.getQuantityWanted(),
                e = (this.cfg.url || location.href).split("#"),
                n = e[0].indexOf("?") > -1 ? "&" : "?",
                i = e[1] ? "#" + e[1] : "";
            return e[0] + n + "quantity_wanted=" + t + i
        },
        getQuantityWanted: function() {
            return this.element.querySelector('input[name="qty"]').value
        },
        updateURL: function(t) {
            !this.cfg.quickview && !this.state.lockURL && a && t.product_url && history.pushState(null, "", t.product_url.split("#")[0]), this.state.lockURL = !1
        },
        disableSubmitButton: function() {
            var t = this.element.querySelectorAll('button[type="submit"]');
            Array.prototype.slice.call(t).forEach(function(t) {
                t.disabled = !0
            })
        },
        enableSubmitButton: function() {
            var t = this.element.querySelectorAll('button[type="submit"]');
            Array.prototype.slice.call(t).forEach(function(t) {
                t.disabled = !1
            })
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            add: 1,
            action: "update"
        },
        afterAll: function(t, e) {
            !t || !t.cart || t.errors && t.errors.length || e.status < 200 || e.status >= 300 || (window.prestashop.cart = t.cart, window.prestashop.emit("updateCart", {
                reason: {
                    idProduct: t.id_product,
                    idProductAttribute: t.id_product_attribute,
                    idCustomization: t.id_customization,
                    linkAction: "add-to-cart",
                    cart: t.cart
                },
                resp: t
            }))
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "productrefresh"
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "refresh"
        }
    })
}, function(t, e, n) {
    var i = n(0);
    t.exports = i.define("nq-product-switch", {
        setup: function() {
            $(".nq-c-ProductSwitch").on("click", this.handleClick)
        },
        cleanup: function() {},
        handleClick: function() {
            $(".nq-c-Product").toggleClass("is-dark"), $('.nq-c-ProductVariants-radio[type="radio"]').not(":checked").click()
        }
    })
}, function(t, e, n) {
    var i = n(0),
        r = n(2),
        o = n(7),
        s = n(3),
        a = n(5),
        u = n(6),
        l = n(13),
        c = n(71);
    n(73), t.exports = i.define("nq-product-images", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    cover: ".nq-c-ProductImages-cover img",
                    thumbs: ".nq-c-ProductImages-thumbs img",
                    gallery: ".nq-c-ImageGallery"
                }
            }
        },
        setup: function() {
            this.setupThumbnails(), this.setupCover(), r.on(this.getNQProductImagesListenerInfos()), u.use()
        },
        cleanup: function() {
            this.cleanupThumbnails(), this.cleanupCover(), r.off(this.getNQProductImagesListenerInfos()), u.stopUsing()
        },
        setupThumbnails: function() {
            this.getThumbnails().forEach(function(t) {
                o.set(t, "data-nqtap", "{trigger:'NQProductImages',action:'selectImage'}")
            })
        },
        cleanupThumbnails: function() {
            this.getThumbnails().forEach(function(t) {
                o.remove(t, "data-nqtap")
            })
        },
        getThumbnails: function() {
            return a(this.cfg.selectors.thumbs, this.element)
        },
        setupCover: function() {
            var t = this.getCover();
            o.set(t, "data-nqtap", "{trigger:'NQProductImages',action:'zoomImage'}")
        },
        cleanupCover: function() {
            var t = this.getCover();
            o.remove(t, "data-nqtap")
        },
        getCover: function() {
            return s(this.cfg.selectors.cover, this.element)
        },
        getNQProductImagesListenerInfos: function() {
            return {
                node: this.element,
                type: "NQProductImages",
                handler: this.method("handleNQProductImagesEvent")
            }
        },
        handleNQProductImagesEvent: function(t) {
            var e = t.detail.action;
            "selectImage" === e ? this.selectImage(t.target) : "zoomImage" === e && this.zoomImage()
        },
        selectImage: function(t) {
            if (!this.isImageSelected(t)) {
                var e = s('[data-selected="true"]', this.element),
                    n = this.getCover();
                o.set(e, "data-selected", "false"), o.set(t.parentNode, "data-selected", "true"), n.src = o.get(t, "data-image-medium-src")
            }
        },
        isImageSelected: function(t) {
            return "true" === o.get(t.parentNode, "data-selected")
        },
        zoomImage: function() {
            l().open(c({
                afterOpen: this.method("handleGalleryPopinOpen")
            }))
        },
        handleGalleryPopinOpen: function(t) {
            var e = s(this.cfg.selectors.gallery, t),
                n = this.getThumbnails().map(function(t, e) {
                    return {
                        idx: e,
                        url: o.get(t, "data-image-large-src"),
                        alt: t.alt,
                        selected: this.isImageSelected(t)
                    }
                }, this);
            i.create(e, "nq-image-gallery", {
                images: n,
                labels: window.nqcfg.labels.popins,
                height: e.offsetHeight
            })
        }
    })
}, function(t, e, n) {
    var i = n(72),
        r = n(10).create(i),
        o = n(17),
        s = n(9);
    t.exports = function(t) {
        return s({
            popinElement: r.render("root", {
                labels: o(),
                tapToClose: "{trigger:'NQPopins',action:'close'}"
            })
        }, t)
    }
}, function(t, e) {
    t.exports = {
        root: function(t, e) {
            return [e.createElement("div", {
                class: "nq-c-Popin",
                "data-popin-type": "zoom"
            }, ["\n    ", e.createElement("div", {
                class: "nq-c-Popin-mask",
                "data-nqtap": e.getData("tapToClose", t)
            }, null, "http://www.w3.org/1999/xhtml"), "\n    ", e.createElement("div", {
                class: "nq-c-Popin-content"
            }, ["\n        ", e.createElement("div", {
                "data-popin-content": !0
            }, ["\n            ", e.createElement("div", {
                class: "nq-c-ImageGallery",
                "data-fill-parent": "true"
            }, null, "http://www.w3.org/1999/xhtml"), "\n        "], "http://www.w3.org/1999/xhtml"), "\n        ", e.createElement("button", {
                type: "button",
                class: "nq-c-Popin-close",
                "data-nqtap": e.getData("tapToClose", t)
            }, [e.getData("labels.close", t)], "http://www.w3.org/1999/xhtml"), "\n    "], "http://www.w3.org/1999/xhtml"), "\n"], "http://www.w3.org/1999/xhtml")]
        }
    }
}, function(t, e, n) {
    var i = n(3),
        r = n(5),
        o = n(2),
        s = n(74),
        a = n(23),
        u = n(24).support("transform"),
        l = n(75);
    t.exports = n(0).define("nq-image-gallery", {
        getDefaultCfg: function() {
            return {
                manageImageDimensions: !0,
                minToPreventDefault: 4,
                swipeThresholdPercent: .15,
                selectors: {
                    viewport: ".nq-c-ImageGallery-viewport",
                    list: ".nq-c-ImageGallery-list",
                    items: ".nq-c-ImageGallery-item",
                    paginationBtns: ".nq-c-ImageGallery-pagination > button"
                },
                transitions: {}
            }
        },
        setup: function() {
            this.render(), this.queryDOM(), this.getInfos(), this.loadImages(), this.state.totalItems > 1 && (o.on(this.getNQTapEventListeners()), o.on(this.getTransitionEndListenerInfos()), o.on(this.getDragStartListenerInfos()), s.use(this.viewportElement, {
                onStart: this.method("handleSwipeStart"),
                onMove: this.method("handleSwipeMove"),
                onEnd: this.method("handleSwipeEnd")
            }), this.state.available = !0, this.enableAnimation())
        },
        cleanup: function() {
            this.state.totalItems > 1 && (o.off(this.getNQTapEventListeners()), o.off(this.getTransitionEndListenerInfos())), s.stopUsing(this.viewportElement)
        },
        render: function() {
            var t = this.cfg.images.length > 1,
                e = (this.template = l).render("root", {
                    labels: this.cfg.labels,
                    images: this.cfg.images,
                    height: this.cfg.height,
                    withPagination: t,
                    tap: t ? {
                        prev: "{action:'prev'}",
                        next: "{action:'next'}"
                    } : null
                });
            this.element.appendChild(e)
        },
        queryDOM: function() {
            var t = this.cfg.selectors;
            this.viewportElement = i(t.viewport, this.element), this.listElement = i(t.list, this.viewportElement), this.itemElements = r(t.items, this.listElement)
        },
        getInfos: function() {
            var t = this.state;
            t.currentIndex = 0, t.currentX = 0, t.totalItems = this.itemElements.length, t.slideWidth = this.itemElements[0].offsetWidth
        },
        loadImages: function() {
            this.cfg.images.forEach(function(t, e) {
                var n = document.createElement("img");
                o.on(this.getLoadOrErrorListenerInfos(n)), n.setAttribute("data-idx", e), n.src = t.url
            }, this)
        },
        getNQTapEventListeners: function() {
            return {
                node: this.element,
                type: "nqtap",
                handler: this.method("handleNQTapEvent")
            }
        },
        getTransitionEndListenerInfos: function() {
            return {
                node: this.element,
                type: "transitionend webkitTransitionEnd",
                handler: this.method("handleTransitionEndEvent")
            }
        },
        getDragStartListenerInfos: function() {
            return {
                node: this.element,
                type: "dragstart",
                handler: this.method("handleDragStartEvent")
            }
        },
        getLoadOrErrorListenerInfos: function(t) {
            return {
                node: t,
                type: "load error",
                handler: this.method("handleLoadOrErrorEvent")
            }
        },
        handleLoadOrErrorEvent: function(t) {
            var e = parseInt(t.target.getAttribute("data-idx"), 10);
            "error" === t.type ? this.insertError(e) : this.insertImage(e, t.target), o.off(this.getLoadOrErrorListenerInfos(t.target))
        },
        handleNQTapEvent: function(t) {
            var e = t.detail.action;
            "prev" !== e && "next" !== e || this[e]()
        },
        handleTransitionEndEvent: function(t) {
            t.target === this.listElement && (this.state.available = !0)
        },
        handleDragStartEvent: function(t) {
            t.preventDefault()
        },
        handleSwipeStart: function() {
            this.disableAnimation(), this.state.swipeStartX = this.state.currentX, this.state.swipeDiffX = 0, this.state.swipe = !1
        },
        handleSwipeMove: function(t) {
            var e = this.cfg.swipeThresholdPercent;
            (Math.abs(t.diffX) > e || "mousemove" === t.evt.type && Math.abs(t.diffY) > e) && (Math.abs(t.diffX) > e && (this.state.swipe = !0), t.evt.preventDefault()), this.state.swipeDiffX = Math.abs(t.diffX), this.translateToCoord(this.state.swipeStartX + t.diffX)
        },
        handleSwipeEnd: function(t) {
            var e, n, i = this.state.currentIndex;
            this.enableAnimation(), this.state.swipeDiffX >= this.state.slideWidth * this.cfg.swipeThresholdPercent ? (e = t.diffX > 0 ? "prev" : "next", n = this.state.totalItems, "prev" === e && 0 === i || "next" === e && i === n - 1 ? this.translateToItem(i) : this[e]()) : this.translateToItem(i)
        },
        disableAnimation: function() {
            this.listElement.setAttribute("data-animatable", "false")
        },
        enableAnimation: function() {
            this.listElement.setAttribute("data-animatable", "true")
        },
        prev: function() {
            this.item(this.state.currentIndex - 1)
        },
        next: function() {
            this.item(this.state.currentIndex + 1)
        },
        item: function(t) {
            var e = this.state;
            !e.available || t < 0 || t > e.totalItems - 1 || t === e.currentIndex || (e.currentIndex = t, this.updatePagination(), this.translateToItem(t))
        },
        updatePagination: function() {
            var t = this.state.currentIndex,
                e = this.state.totalItems - 1,
                n = r(this.cfg.selectors.paginationBtns);
            n[0].disabled = 0 === t, n[1].disabled = t === e
        },
        translateToItem: function(t) {
            this.state.available = !1, this.translateToCoord(-t * this.state.slideWidth)
        },
        translateToCoord: function(t) {
            this.listElement.style[u.js] = "translateX(" + t + "px)", this.state.currentX = t
        },
        insertError: function(t) {
            var e = this.itemElements[t],
                n = this.template.render("errorMsg", {
                    labels: this.cfg.labels,
                    hasError: !0
                }),
                i = t === this.state.currentIndex ? {
                    transition: this.cfg.transitions.showError
                } : null;
            a.append(n, e, i)
        },
        insertImage: function(t, e) {
            var n = this.itemElements[t],
                i = t === this.state.currentIndex ? {
                    transition: this.cfg.transitions.showImage
                } : null;
            this.cfg.manageImageDimensions && this.setImageDimensions(e, n), a.append(e, n, i)
        },
        setImageDimensions: function(t, e) {
            var n = e.offsetWidth,
                i = e.offsetHeight,
                r = Math.min(n / t.naturalWidth, i / t.naturalHeight, 1);
            t.width = r * t.naturalWidth, t.height = r * t.naturalHeight
        }
    })
}, function(t, e, n) {
    var i = n(1),
        r = n(19),
        o = {};

    function s(t) {
        return 0 === t.type.indexOf("mouse")
    }

    function a(t) {
        var e = t.touches && t.touches[0] ? t.touches[0] : t;
        return {
            x: e.pageX,
            y: e.pageY
        }
    }
    e.use = i("nqjs.dom.swipe.use", function(t, e) {
        t.length && (t = t[0]), e || (e = {});
        var n, i = r(t, {
            create: !0
        });
        i in o || ((n = o[i] = {
            data: {
                elm: t,
                evt: null,
                minX: e.minX || 50,
                minY: e.minY || 50,
                startX: null,
                startY: null,
                endX: null,
                endY: null,
                diffX: null,
                diffY: null,
                top: !1,
                right: !1,
                bottom: !1,
                left: !1,
                horizontal: !1,
                vertical: !1,
                swipe: !1,
                multitouch: !1
            },
            handlers: null,
            callbacks: {
                onStart: e.onStart || function() {},
                onMove: e.onMove || function() {},
                onEnd: e.onEnd || function() {}
            }
        }).handlers = function(t) {
            var e = t.data;
            return {
                onStart: function(n) {
                    var i, r = s(n);
                    !r && n.touches.length > 1 ? e.multitouch = !0 : (i = a(n), e.evt = n, e.startX = e.endX = i.x, e.startY = e.endY = i.y, e.diffX = e.diffY = 0, e.horizontal = e.vertical = e.left = e.right = e.top = e.bottom = e.swipe = !1, t.callbacks.onStart(e), document.addEventListener(r ? "mousemove" : "touchmove", t.handlers.onMove, {
                        passive: !1
                    }), document.addEventListener(r ? "mouseup" : "touchend", t.handlers.onEnd))
                },
                onMove: function(n) {
                    var i, r = s(n);
                    e.multitouch || !r && n.touches.length > 1 ? e.multitouch = !0 : (i = a(n), e.evt = n, e.endX = i.x, e.endY = i.y, e.diffX = e.endX - e.startX, e.diffY = e.endY - e.startY, e.horizontal = Math.abs(e.diffX) >= e.minX, e.vertical = Math.abs(e.diffY) >= e.minY, e.left = e.horizontal && e.diffX < 0, e.right = e.horizontal && e.diffX > 0, e.top = e.vertical && e.diffY < 0, e.bottom = e.vertical && e.diffY > 0, e.swipe = e.horizontal || e.vertical, t.callbacks.onMove(e))
                },
                onEnd: function(n) {
                    var i = s(n);
                    e.multitouch || !i && n.touches.length > 1 ? e.multitouch = !0 : (e.evt = n, document.removeEventListener(i ? "mousemove" : "touchmove", t.handlers.onMove, {
                        passive: !1
                    }), document.removeEventListener(i ? "mouseup" : "touchend", t.handlers.onEnd), t.callbacks.onEnd(e))
                }
            }
        }(n), t.addEventListener("mousedown", n.handlers.onStart), t.addEventListener("touchstart", n.handlers.onStart))
    }), e.stopUsing = i("nqjs.dom.swipe.stopUsing", function(t) {
        t.length && (t = t[0]);
        var e = r(t);
        e && e in o && (t.removeEventListener("mousedown", o[e].handlers.onStart), t.removeEventListener("touchstart", o[e].handlers.onStart), delete o[e])
    })
}, function(t, e, n) {
    var i = n(76),
        r = n(27);
    t.exports = n(10).create(i).override({
        forEachItem: function(t, e) {
            return r(t.images, function() {
                return this.forEachItem({
                    height: t.height
                }, e)
            }.bind(this))
        },
        errorMsg: function(t, e) {
            return t.hasError ? this.errorMsg(t, e) : null
        }
    })
}, function(t, e) {
    t.exports = {
        errorMsg: function(t, e) {
            return e.createElement("div", {
                class: "nq-c-ImageGallery-error",
                "data-nqtpl": "errorMsg"
            }, [e.getData("labels.imageNotLoaded", t)], "http://www.w3.org/1999/xhtml")
        },
        forEachItem: function(t, e) {
            return e.createElement("li", {
                class: "nq-c-ImageGallery-item",
                style: "height: " + e.getData("height", t) + "px;",
                "data-nqtpl": "forEachItem"
            }, ["\n                ", this.errorMsgOverride ? this.errorMsgOverride(t, e) : this.errorMsg(t, e), "\n            "], "http://www.w3.org/1999/xhtml")
        },
        root: function(t, e) {
            return [e.createElement("div", {
                class: "nq-c-ImageGallery-content"
            }, ["\n    ", e.createElement("div", {
                class: "nq-c-ImageGallery-viewport"
            }, ["\n        ", e.createElement("ul", {
                class: "nq-c-ImageGallery-list"
            }, ["\n            ", this.forEachItemOverride ? this.forEachItemOverride(t, e) : this.forEachItem(t, e), "\n        "], "http://www.w3.org/1999/xhtml"), "\n    "], "http://www.w3.org/1999/xhtml"), "\n\n    ", e.createElement("div", {
                class: "nq-c-ImageGallery-pagination",
                "nq-insert-if": e.getData("withPagination", t)
            }, ["\n        ", e.createElement("button", {
                type: "button",
                class: "nq-c-ImageGallery-prev",
                "aria-label": e.getData("labels.previousImage", t),
                "data-nqtap": e.getData("tap.prev", t),
                disabled: !0
            }, ["<"], "http://www.w3.org/1999/xhtml"), "\n        ", e.createElement("button", {
                type: "button",
                class: "nq-c-ImageGallery-next",
                "aria-label": e.getData("labels.nextImage", t),
                "data-nqtap": e.getData("tap.next", t)
            }, [">"], "http://www.w3.org/1999/xhtml"), "\n    "], "http://www.w3.org/1999/xhtml"), "\n"], "http://www.w3.org/1999/xhtml")]
        }
    }
}, function(t, e, n) {
    t.exports = n(0).define("nq-product-image-slider", {
        getDefaultCfg: function() {
            return {
                slick: {
                    fade: !1,
                    vertical: !0,
                    verticalSwiping: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    focusOnSelect: !0,
                    arrows: !0,
                    prevArrow: "",
                    nextArrow: '<button type="button" class="nq-c-ProductImageSlider-next slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10"><path d="M14.8 4.52L10.33.2a.69.69 0 0 0-1 0 .64.64 0 0 0 0 1l3.27 3.07H.7a.78.78 0 0 0 0 1.56h11.92L9.35 8.85a.64.64 0 0 0 0 1 .7.7 0 0 0 1 0l4.45-4.37a.67.67 0 0 0 0-.96z" fill="#cf092c"/></svg></button>'
                }
            }
        },
        setup: function() {
            $(this.element).slick(this.cfg.slick)
        },
        cleanup: function() {
            $(this.element).slick("unslick")
        }
    })
}, function(t, e, n) {
    var i = n(13);
    t.exports = n(0).define("nq-mini-cart", {
        setup: function() {
            window.prestashop.on("updateCart", this.method("handlePSUpdateCartEvent"))
        },
        cleanup: function() {
            window.prestashop.removeListener("updateCart", this.method("handlePSUpdateCartEvent"))
        },
        handlePSUpdateCartEvent: function(t) {
            var e = this.element.getAttribute("data-refresh-url"),
                n = {
                    id_product_attribute: t.reason.idProductAttribute,
                    id_product: t.reason.idProduct,
                    action: t.reason.linkAction
                };
            this.xhr && this.xhr.abort(), this.state.reason = t.reason, this.xhr = $.ajax({
                url: e,
                type: "POST",
                data: n,
                success: this.method("handleXHRSuccess")
            })
        },
        handleXHRSuccess: function(t) {
            $(this.element).html($(t.preview).children()), "add-voucher" !== this.state.reason.linkAction && t.modal && i().open({
                contentHTML: t.modal
            })
        }
    })
}, function(t, e, n) {
    var i = n(0),
        r = n(2),
        o = n(6),
        s = n(3),
        a = n(5),
        u = n(80),
        l = n(81),
        c = n(82),
        h = n(83),
        d = n(84),
        f = n(18),
        p = n(14);
    t.exports = i.define("nq-cart", {
        setup: function() {
            r.on(this.getNQChangeListenerInfos()), r.on(this.getNQOverflowWarningListenerInfos()), r.on(this.getNQCartListenerInfos()), r.on(this.getSubmitListenerInfos()), o.use()
        },
        cleanup: function() {
            r.off(this.getNQChangeListenerInfos()), r.off(this.getNQOverflowWarningListenerInfos()), r.off(this.getNQCartListenerInfos()), r.off(this.getSubmitListenerInfos()), o.stopUsing()
        },
        getNQChangeListenerInfos: function() {
            return {
                node: this.element,
                type: "NQChange",
                handler: this.method("handleNQChangeEvent")
            }
        },
        getNQOverflowWarningListenerInfos: function() {
            return {
                node: this.element,
                type: "NQOverflowWarning",
                handler: this.method("handleNQOverflowWarningEvent")
            }
        },
        getNQCartListenerInfos: function() {
            return {
                node: this.element,
                type: "NQCart",
                handler: this.method("handleNQCartEvent")
            }
        },
        getSubmitListenerInfos: function() {
            return {
                node: this.element,
                type: "submit",
                handler: this.method("handleSubmitEvent"),
                options: {
                    capture: !0
                }
            }
        },
        handleNQChangeEvent: function(t) {
            var e = "increment" === t.detail.action ? "up" : "down",
                n = t.target.getAttribute("data-" + e + "-url");
            n && this.changeQuantity(n, t.detail.delta)
        },
        handleNQOverflowWarningEvent: function(t) {
            var e = t.detail.component.inputElement.getAttribute("data-product-id"),
                n = s('[data-link-action="remove-from-cart"][data-id-product="' + e + '"]');
            n && n.click()
        },
        handleNQCartEvent: function(t) {
            var e = t.detail.action;
            "remove" !== e && "removeVoucher" !== e && "proceed" !== e || this[e](t.target.href)
        },
        handleSubmitEvent: function(t) {
            "add-voucher" === t.target.getAttribute("data-link-action") && (t.preventDefault(), this.addVoucher())
        },
        changeQuantity: function(t, e) {
            u.abort().send({
                url: t + "&qty=" + e,
                before: this.method("beforeChangeQuantity"),
                after: this.method("afterChangeQuantity")
            })
        },
        beforeChangeQuantity: function() {
            this.disableActions()
        },
        afterChangeQuantity: function(t) {
            t && !t.errors && this.refresh()
        },
        remove: function(t) {
            c.abort(), l.abort().send({
                url: t,
                before: this.method("beforeRemove"),
                after: this.method("afterRemove")
            })
        },
        beforeRemove: function() {
            this.disableActions()
        },
        afterRemove: function(t) {
            t && this.refresh(t)
        },
        addVoucher: function() {
            var t = this.element.querySelector('form[data-link-action="add-voucher"]');
            c.abort(), h.abort().send({
                url: t.action,
                method: t.method,
                data: f(t),
                before: this.method("beforeAddVoucher"),
                after: this.method("afterAddVoucher")
            })
        },
        beforeAddVoucher: function() {
            this.disableActions()
        },
        afterAddVoucher: function(t) {
            t && this.refresh(t)
        },
        removeVoucher: function(t) {
            c.abort(), d.abort().send({
                url: t,
                before: this.method("beforeRemoveVoucher"),
                after: this.method("afterRemoveVoucher")
            })
        },
        beforeRemoveVoucher: function() {
            this.disableActions()
        },
        afterRemoveVoucher: function(t) {
            t && this.refresh(t)
        },
        refresh: function(t) {
            c.abort().send({
                url: this.getRefreshURL(t),
                after: this.method("afterRefresh")
            })
        },
        afterRefresh: function(t) {
            t.errors || this.cleanupErrors(), this.cleanupComponents(), this.updateHTML(t), this.setupComponents(), this.enableActions()
        },
        proceed: function(t) {
            this.state.proceedLocked || (location.href = t)
        },
        cleanupErrors: function() {
            a(".notification").forEach(function(t) {
                t.parentNode.removeChild(t)
            })
        },
        setupComponents: function() {
            var t = this.getCartOverview(),
                e = p("cart_voucher", this.element);
            console.log(e), t && (i.createAll(t), i.createAll(e))
        },
        cleanupComponents: function() {
            var t = this.getCartOverview();
            t && i.destroyAll(t)
        },
        getCartOverview: function() {
            return p("cart_detailed", this.element)
        },
        updateHTML: function(t) {
            var e = this.element;
            this.cleanupComponents(), ["cart_detailed_totals", "cart_summary_items_subtotal", "cart_summary_totals", "cart_detailed_actions", "cart_voucher", "cart_detailed"].forEach(function(n) {
                var i = p(n, e);
                i && t && n in t && $(i).replaceWith(t[n])
            }), this.setupComponents()
        },
        getRefreshURL: function(t) {
            var e = this.cfg.refreshURL || this.element.querySelector("[data-refresh-url]").getAttribute("data-refresh-url");
            return t && t.id_product && t.id_product_attribute && (e += "&id_product=" + t.id_product + "&id_product_attribute=" + t.id_product_attribute), e
        },
        disableActions: function() {
            var t = this.getProceedLink();
            t && t.setAttribute("data-disabled", "true"), this.state.proceedLocked = !0
        },
        enableActions: function() {
            var t = this.getProceedLink();
            t && t.setAttribute("data-disabled", "false"), this.state.proceedLocked = !1
        },
        getProceedLink: function() {
            return this.element.querySelector('a[data-nqtap*="proceed"]')
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "update"
        },
        afterAll: function(t, e) {
            !t || !t.cart || t.errors && t.errors.length || e.status < 200 || e.status >= 300 || (window.prestashop.cart = t.cart, window.prestashop.emit("updateCart", {
                reason: {
                    idProduct: t.id_product,
                    idProductAttribute: t.id_product_attribute,
                    idCustomization: t.id_customization,
                    linkAction: "change-qty-in-cart",
                    cart: t.cart
                },
                resp: t
            }))
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        method: "POST",
        beforeAll: function(t) {
            t.url += "&ajax=1&action=update"
        },
        afterAll: function(t, e) {
            !t || !t.cart || t.errors && t.errors.length || e.status < 200 || e.status >= 300 || (window.prestashop.cart = t.cart, window.prestashop.emit("updateCart", {
                reason: {
                    idProduct: t.id_product,
                    idProductAttribute: t.id_product_attribute,
                    idCustomization: t.id_customization,
                    linkAction: "remove-from-cart",
                    cart: t.cart
                },
                resp: t
            }))
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        method: "POST"
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "update"
        },
        afterAll: function(t, e) {
            !t || !t.cart || t.errors && t.errors.length || e.status < 200 || e.status >= 300 || (window.prestashop.cart = t.cart, window.prestashop.emit("updateCart", {
                reason: {
                    idProduct: t.id_product,
                    idProductAttribute: t.id_product_attribute,
                    idCustomization: t.id_customization,
                    linkAction: "add-voucher",
                    cart: t.cart
                },
                resp: t
            }))
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        method: "POST",
        data: {
            ajax: 1,
            action: "update"
        },
        afterAll: function(t, e) {
            !t || !t.cart || t.errors && t.errors.length || e.status < 200 || e.status >= 300 || (window.prestashop.cart = t.cart, window.prestashop.emit("updateCart", {
                reason: {
                    idProduct: t.id_product,
                    idProductAttribute: t.id_product_attribute,
                    idCustomization: t.id_customization,
                    linkAction: "remove-voucher",
                    cart: t.cart
                },
                resp: t
            }))
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(6);
    t.exports = n(0).define("nq-checkout-steps", {
        setup: function() {
            i.on(this.getNQCheckoutStepListenerInfos()), r.use()
        },
        cleanup: function() {
            i.off(this.getNQCheckoutStepListenerInfos()), r.stopUsing()
        },
        getNQCheckoutStepListenerInfos: function() {
            return {
                node: this.element,
                type: "NQCheckoutStep",
                handler: this.method("handleNQCheckoutStepEvent")
            }
        },
        handleNQCheckoutStepEvent: function(t) {
            var e = document.getElementById(t.detail.id);
            e && !this.isCurrentElement(e) && this.isReachableElement(e) && this.open(e)
        },
        isCurrentElement: function(t) {
            return "true" === t.getAttribute("data-step-current")
        },
        isReachableElement: function(t) {
            return "true" === t.getAttribute("data-step-reachable")
        },
        open: function(t) {
            var e = "data-step-current",
                n = "string" == typeof t ? document.getElementById(t) : t;
            this.element.querySelector("[" + e + '="true"]').setAttribute(e, "false"), n.setAttribute(e, "true")
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = n(3),
        s = n(5);
    t.exports = n(0).define("nq-checkout-addresses", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    errors: ".nq-c-AddressList-error"
                }
            }
        },
        setup: function() {
            this.setupInputRadio(), i.on(this.getNQCheckoutAddressListenerInfos())
        },
        cleanup: function() {
            this.cleanupInputRadio(), i.off(this.getNQCheckoutAddressListenerInfos())
        },
        setupInputRadio: function() {
            r.set(this.getInputRadio(), "data-nqtap", "{trigger:'NQCheckoutAddress',cancel:false}")
        },
        cleanupInputRadio: function() {
            r.remove(this.getInputRadio(), "data-nqtap")
        },
        getInputRadio: function() {
            return s('input[type="radio"]', this.element)
        },
        getNQCheckoutAddressListenerInfos: function() {
            return {
                node: this.element,
                type: "NQCheckoutAddress",
                handler: this.method("handleNQCheckoutAddressEvent")
            }
        },
        handleNQCheckoutAddressEvent: function(t) {
            var e = t.target.value,
                n = t.target.name.replace(/_/g, "-") + "-address-" + e;
            this.select(n), this.toggleError(e)
        },
        select: function(t) {
            var e = o('[data-selected="true"]', this.element),
                n = document.getElementById(t);
            r.set(e, "data-selected", "false"), r.set(n, "data-selected", "true")
        },
        toggleError: function(t) {
            var e = this.getErrorIDs(),
                n = s(this.cfg.selectors.errors, this.element);
            n.forEach(function(t) {
                t.hidden = !0
            }), -1 !== e.indexOf(t) && ((document.getElementById("id-failure-address-" + t) || n[n.length - 1]).hidden = !1)
        },
        getErrorIDs: function() {
            return document.getElementById("not-valid-addresses").value.split(",")
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = n(5),
        s = n(88),
        a = n(18),
        u = n(14);
    t.exports = n(0).define("nq-checkout-delivery", {
        setup: function() {
            this.setupInputRadio(), i.on(this.getNQCheckoutDeliveryListenerOptions())
        },
        cleanup: function() {
            this.cleanupInputRadio(), i.off(this.getNQCheckoutDeliveryListenerOptions())
        },
        setupInputRadio: function() {
            r.set(this.getInputRadio(), "data-nqtap", "{trigger:'NQCheckoutDelivery',action:'chooseOption',cancel:false}")
        },
        cleanupInputRadio: function() {
            r.remove(this.getInputRadio(), "data-nqtap")
        },
        getInputRadio: function() {
            return o('input[type="radio"]', this.element)
        },
        getNQCheckoutDeliveryListenerOptions: function() {
            return {
                node: this.element,
                type: "NQCheckoutDelivery",
                handler: this.method("handleNQCheckoutDeliveryEvent")
            }
        },
        handleNQCheckoutDeliveryEvent: function(t) {
            var e = t.detail.action;
            "chooseOption" === e ? this.update() : "toggleGift" === e && this.toggleGift(t.target)
        },
        update: function() {
            o(".nq-c-CheckoutDeliveryOption-xtra").forEach(function(t) {
                var e = t.getAttribute("data-radio-id"),
                    n = document.getElementById(e);
                n && n.checked ? t.removeAttribute("hidden") : t.setAttribute("hidden", "hidden")
            }), s.abort().send({
                url: this.element.action,
                method: this.element.method,
                data: a(this.element),
                before: this.method("beforeUpdate"),
                after: this.method("afterUpdate")
            })
        },
        beforeUpdate: function() {
            this.disableActions()
        },
        afterUpdate: function(t) {
            t && (this.updateHTML(t), this.enableActions())
        },
        updateHTML: function(t) {
            $(u("preview"), this.element).replaceWith(t.preview)
        },
        disableActions: function() {
            this.getActionsElements().forEach(function(t) {
                t.disabled = !0
            })
        },
        enableActions: function() {
            this.getActionsElements().forEach(function(t) {
                t.disabled = !1
            })
        },
        getActionsElements: function() {
            return o('button[type="submit"]', this.element)
        },
        toggleGift: function(t) {
            var e = document.getElementById("gift");
            t.checked ? r.remove(e, "hidden") : r.set(e, "hidden", "hidden")
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "selectDeliveryOption"
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = n(3),
        s = n(5);
    t.exports = n(0).define("nq-checkout-payment", {
        setup: function() {
            i.on(this.getNQCheckoutPaymentsListenerInfos()), this.setupInputCheckable(), this.setupOrderButton(), this.toggleOrderButton(), this.setupTermsAndConditions()
        },
        cleanup: function() {
            this.cleanupInputCheckable(), this.cleanupOrderButton(), this.cleanupTermsAndConditions(), i.on(this.getNQCheckoutPaymentsListenerInfos())
        },
        setupInputCheckable: function() {
            r.set(this.getInputCheckable(), "data-nqtap", "{trigger:'NQCheckoutPayments',cancel:false}")
        },
        cleanupInputCheckable: function() {
            r.remove(this.getInputCheckable(), "data-nqtap")
        },
        getInputCheckable: function() {
            return s("input", this.element).filter(function(t) {
                return "radio" === t.type || "checkbox" === t.type
            })
        },
        setupOrderButton: function() {
            var t = this.getOrderElements().btn;
            r.set(t, "data-nqtap", "{trigger:'NQCheckoutPayments',action:'proceed'}")
        },
        cleanupOrderButton: function() {
            var t = this.getOrderElements().btn;
            r.remove(t, "data-nqtap")
        },
        setupTermsAndConditions: function() {
            s("#conditions-to-approve a").forEach(function(t) {
                r.set(t, "data-nqtap", "{trigger:'NQPopins',action:'open',type:'basic',mode:'xhr'}")
            })
        },
        cleanupTermsAndConditions: function() {
            s("#conditions-to-approve a").forEach(function(t) {
                r.remove(t, "data-nqtap")
            })
        },
        getNQCheckoutPaymentsListenerInfos: function() {
            return {
                node: this.element,
                type: "NQCheckoutPayments",
                handler: this.method("handleNQCheckoutPaymentsEvent")
            }
        },
        handleNQCheckoutPaymentsEvent: function(t) {
            if ("proceed" === t.detail.action) return this.proceed();
            var e = t.target;
            this.toggleOrderButton(), "payment-option" === e.name && this.togglePayments()
        },
        proceed: function() {
            var t = this.getOrderElements().btn,
                e = this.getPaymentInputs(),
                n = e.length;
            for (t.disabled = !0; n--;)
                if (e[n].checked) return void o("#pay-with-" + e[n].id + "-form > form").submit()
        },
        toggleOrderButton: function() {
            var t = this.getOrderElements();
            this.allConditionsApproved() && this.paymentSelected() ? (t.btn.disabled = !1, t.msg.hidden = !0) : (t.btn.disabled = !0, t.msg.hidden = !1)
        },
        getOrderElements: function() {
            var t = o("#payment-confirmation");
            return {
                btn: o('button[type="submit"]', t),
                msg: o(".js-alert-payment-conditions", t)
            }
        },
        allConditionsApproved: function() {
            for (var t = s('#conditions-to-approve input[type="checkbox"]', this.element), e = t.length; e--;)
                if (!t[e].checked) return !1;
            return !0
        },
        paymentSelected: function() {
            for (var t = this.getPaymentInputs(), e = t.length; e--;)
                if (t[e].checked) return !0;
            return !1
        },
        togglePayments: function() {
            this.getPaymentInputs().forEach(function(t) {
                var e = document.getElementById(t.id + "-additional-information"),
                    n = document.getElementById("pay-with-" + t.id + "-form");
                e && e.setAttribute("data-selected", "" + t.checked), n && n.setAttribute("data-selected", "" + t.checked)
            })
        },
        getPaymentInputs: function() {
            return s('.payment-options input[type="radio"]', this.element)
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(91);
    t.exports = n(0).define("nq-address", {
        setup: function() {
            i.on(this.getChangeListenerInfos())
        },
        cleanup: function() {
            i.off(this.getChangeListenerInfos())
        },
        getChangeListenerInfos: function() {
            return {
                node: this.element,
                type: "change",
                handler: this.method("handleChangeEvent")
            }
        },
        handleChangeEvent: function(t) {
            var e = t.target;
            "id_country" === e.name && this.changeCountry(e.options[e.selectedIndex].value)
        },
        changeCountry: function(t) {
            var e = this.element.querySelector("form");
            r.abort().send({
                url: e.getAttribute("data-refresh-url"),
                method: e.method,
                data: {
                    id_country: t,
                    id_address: e.getAttribute("data-id-address")
                },
                after: this.method("afterChangeCountry")
            })
        },
        afterChangeCountry: function(t) {
            t && this.updateHTML(t)
        },
        updateHTML: function(t) {
            this.saveInputFields(), this.element.innerHTML = t.address_form, this.restoreInputFields()
        },
        saveInputFields: function() {
            for (var t = this.getInputElements(), e = t.length, n = this.state.fields = {}; e--;) n[t[e].name] = t[e].value
        },
        restoreInputFields: function() {
            for (var t = this.getInputElements(), e = t.length, n = this.state.fields; e--;) t[e].value = n[t[e].name];
            this.state.fields = null
        },
        getInputElements: function() {
            return this.element.querySelector("form").querySelectorAll("input")
        }
    })
}, function(t, e, n) {
    var i = n(4);
    t.exports = new i({
        data: {
            ajax: 1,
            action: "addressForm"
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = n(5);
    t.exports = n(0).define("nq-product-returns", {
        setup: function() {
            this.setupCheckboxes(), i.on(this.getNQProductReturnsListenerInfos())
        },
        cleanup: function() {
            this.cleanupCheckboxes(), i.off(this.getNQProductReturnsListenerInfos())
        },
        setupCheckboxes: function() {
            this.getCheckboxes().forEach(function(t, e) {
                r.set(t, "data-nqtap", "{trigger:'NQProductReturns',cancel:false,idx:" + e + "}")
            })
        },
        cleanupCheckboxes: function() {
            this.getCheckboxes().forEach(function(t) {
                r.remove(t, "data-nqtap")
            })
        },
        getCheckboxes: function() {
            return o('input[type="checkbox"]', this.element)
        },
        getNQProductReturnsListenerInfos: function() {
            return {
                node: this.element,
                type: "NQProductReturns",
                handler: this.method("handleNQProductReturnsEvent")
            }
        },
        handleNQProductReturnsEvent: function(t) {
            0 === t.detail.idx ? this.toggleAll({
                check: t.target.checked
            }) : this.checkAll()
        },
        toggleAll: function(t) {
            this.getCheckboxes().forEach(function(e) {
                e.checked = t.check
            })
        },
        checkAll: function() {
            for (var t = this.getCheckboxes(), e = t.length; --e > 0;)
                if (!t[e].checked) return void(t[0].checked = !1);
            t[0].checked = !0
        }
    })
}, function(t, e, n) {
    n(2);
    t.exports = n(0).define("nq-storehow", {
        setup: function() { /*$("[data-tab-toggler]").on("click",this.handleClick)*/ },
        cleanup: function() {
            $("[data-tab-toggler]").off("click")
        },
        handleClick: function(t) {
            elm = $(t.target).closest("[data-tab-toggler]"), targetTab = elm.attr("data-tab-toggler"), $("[data-tab-toggler=" + targetTab + "]").hasClass("is-active") || $(".nq-c-StoresHow-arrow").toggleClass("is-right"), $("[data-tab-toggler]").not("[data-tab-toggler=" + targetTab + "]").removeClass("is-active"), $("[data-tab-name]").not("[data-tab-target=" + targetTab + "]").removeClass("is-active"), $("[data-tab-toggler=" + targetTab + "]").addClass("is-active"), $("[data-tab-name=" + targetTab + "]").addClass("is-active")
        }
    })
}, function(t, e, n) {
    var i = n(2),
        r = n(7),
        o = (n(5), n(3));
    n(29), n(30);
    n(6);
    t.exports = n(0).define("nq-menu", {
        getDefaultCfg: function() {
            return {
                selectors: {
                    triggerMenu: ".nq-c-Burger"
                }
            }
        },
        setup: function() {
            i.on(this.getViewResizeListenerInfos()), i.on(this.getTapMenuInfos())
        },
        cleanup: function() {
            i.off(this.getViewResizeListenerInfos()), i.off(this.getTapMenuInfos())
        },
        getViewResizeListenerInfos: function() {
            return {
                node: window,
                type: "nqviewresize",
                handler: this.method("handleViewResizeEvent")
            }
        },
        getTapMenuInfos: function() {
            return {
                node: this.element,
                type: "nqtap",
                handler: this.method("handleNQTapEvent")
            }
        },
        getMenuTrigger: function() {
            return o(this.cfg.selectors.triggerMenu)
        },
        handleViewResizeEvent: function() {
            var t = this.getMenuTrigger();
            r.set(t, "data-opened", "false")
        },
        handleNQTapEvent: function(t) {
            switch (t.detail.action) {
                case "toggleMenu":
                    this.toggleMenu()
            }
        },
        toggleMenu: function() {
            var t = this.getMenuTrigger(),
                e = r.get(t, "data-opened"),
                n = t.parentNode.parentNode;
            "true" === e ? (r.set(t, "data-opened", "false"), $(n).removeClass("openMenu")) : (r.set(t, "data-opened", "true"), $(n).addClass("openMenu"))
        }
    })
}, function(t, e, n) {
    var i = n(1);
    t.exports = i("nqjs.util.throttle", function(t, e) {
        var n, i, r, o, s, a = 0;

        function u() {
            a = Date.now(), i = null, r = t.apply(n, o)
        }

        function l() {
            return n = this, o = arguments, (s = e - (Date.now() - a)) <= 0 ? (clearTimeout(i), u()) : i || (i = setTimeout(u, s)), r
        }
        return l.cancel = function() {
            clearTimeout(i)
        }, l
    })
}, function(t, e, n) {
    t.exports = n(0).define("nq-home-switch", {
        setup: function() {
            $("#homeswitch").on("change", function() {
                wrapper = $(".nq-c-HomeBike"), "white" == wrapper.attr("data-state") ? wrapper.attr("data-state", "black") : wrapper.attr("data-state", "white")
            })
        },
        cleanup: function() {}
    })
}, function(t, e, n) {
    var i = n(2),
        r = (n(7), n(5));
    n(3);
    n(29), n(30);
    n(6);
    t.exports = n(0).define("nq-menu-animation", {
        getDefaultCfg: function() {
            return {
                data: {
                    scrollTop: $(window).scrollTop(),
                    elms: []
                },
                selectors: {
                    sections: ".section_formenu"
                }
            }
        },
        setup: function() {
            //this.setNqObjectData(), this.handleViewResizeEvent(), i.on(this.getViewResizeListenerInfos()), i.on(this.getViewScrollListenerInfos()), $(window).scrollTop() > 60 ? $(".nq-c-Header").hasClass("scrolled") || $(".nq-c-Header").addClass("scrolled") : $(".nq-c-Header").hasClass("scrolled") && $(".nq-c-Header").removeClass("scrolled")
        },
        cleanup: function() {
            i.off(this.getViewResizeListenerInfos()), i.off(this.getViewScrollListenerInfos())
        },
        getViewResizeListenerInfos: function() {
            return {
                node: window,
                type: "nqviewresize",
                handler: this.method("handleViewResizeEvent")
            }
        },
        getViewScrollListenerInfos: function() {
            return {
                node: window,
                type: "nqviewscroll",
                handler: this.method("handleViewsScrollEvent")
            }
        },
        handleViewResizeEvent: function() {
            this.isSmallDisplay() ? $(".nq-c-Header").removeClass("scrolled") : this.setNqObjectData()
        },
        handleViewsScrollEvent: function(t) {

/*
            if (!this.isSmallDisplay()) {
                this.setNqObjectData();
                var e = this.cfg.data,
                    n = e.elms[0].offSet - t.detail.scrollTop;
                n < 60 ? $(".nq-c-Header").hasClass("scrolled") || $(".nq-c-Header").addClass("scrolled") : n > 60 && $(".nq-c-Header").hasClass("scrolled") && $(".nq-c-Header").removeClass("scrolled");
                var i = $(".nq-c-Header");
                e.elms.forEach(function(n, r) {
                    if (r < e.elms.length - 1) var o = r + 1;
                    if (o) {
                        if (e.elms[r].offSet - 60 < t.detail.scrollTop && t.detail.scrollTop < e.elms[o].offSet - 60 && !i.hasClass("" + e.elms[r].backgroundMenu)) {
                            switch (e.elms[r].backgroundMenu) {
                                case "white":
                                    i.removeClass("black");
                                    break;
                                case "black":
                                    i.removeClass("white")
                            }
                            i.addClass("" + e.elms[r].backgroundMenu)
                        }
                    } else if (e.elms[r].offSet - 60 < t.detail.scrollTop && !i.hasClass("" + e.elms[r].backgroundMenu)) {
                        switch (e.elms[r].backgroundMenu) {
                            case "white":
                                i.removeClass("black");
                                break;
                            case "black":
                                i.removeClass("white")
                        }
                        i.addClass("" + e.elms[r].backgroundMenu)
                    }
                })
            }
*/

        },
        getSections: function() {
            return r(this.cfg.selectors.sections, this.element)
        },
        setNqObjectData: function() {
            var t = this.getSections(),
                e = this.cfg.data;
            t.forEach(function(t, n) {
                if (n % 2 == 1) {
                    var i = {
                        backgroundMenu: "white",
                        offSet: $(t).offset().top
                    };
                    e.elms[n] = i
                } else {
                    i = {
                        backgroundMenu: "black",
                        offSet: $(t).offset().top
                    };
                    e.elms[n] = i
                }
            }), this.cfg.data = e
        },
        isSmallDisplay: function() {
            return "none" === $(".is-header-mobile").css("display")
        }
    })
}]);