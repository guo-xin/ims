(function () {
  var b = {};
  b.dev = false;
  b.tooltip = b.tooltip || {};
  b.utils = b.utils || {};
  b.models = b.models || {};
  b.charts = {};
  b.logs = {};
  b.dom = {};
  if (typeof(module) !== "undefined" && typeof(exports) !== "undefined" && typeof(d3) == "undefined") {
    d3 = require("d3")
  }
  b.dispatch = d3.dispatch("render_start", "render_end");
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (c) {
      if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
      }
      var g = Array.prototype.slice.call(arguments, 1), f = this, d = function () {
      }, e = function () {
        return f.apply(this instanceof d && c ? this : c, g.concat(Array.prototype.slice.call(arguments)))
      };
      d.prototype = this.prototype;
      e.prototype = new d();
      return e
    }
  }
  if (b.dev) {
    b.dispatch.on("render_start", function (c) {
      b.logs.startTime = +new Date()
    });
    b.dispatch.on("render_end", function (c) {
      b.logs.endTime = +new Date();
      b.logs.totalTime = b.logs.endTime - b.logs.startTime;
      b.log("total", b.logs.totalTime)
    })
  }
  b.log = function () {
    if (b.dev && window.console && console.log && console.log.apply) {
      console.log.apply(console, arguments)
    } else {
      if (b.dev && window.console && typeof console.log == "function" && Function.prototype.bind) {
        var c = Function.prototype.bind.call(console.log, console);
        c.apply(console, arguments)
      }
    }
    return arguments[arguments.length - 1]
  };
  b.deprecated = function (c, d) {
    if (console && console.warn) {
      console.warn("nvd3 warning: `" + c + "` has been deprecated. ", d || "")
    }
  };
  b.render = function a(d) {
    d = d || 1;
    b.render.active = true;
    b.dispatch.render_start();
    var c = function () {
      var f, g;
      for (var e = 0; e < d && (g = b.render.queue[e]); e++) {
        f = g.generate();
        if (typeof g.callback == typeof(Function)) {
          g.callback(f)
        }
      }
      b.render.queue.splice(0, e);
      if (b.render.queue.length) {
        setTimeout(c)
      } else {
        b.dispatch.render_end();
        b.render.active = false
      }
    };
    setTimeout(c)
  };
  b.render.active = false;
  b.render.queue = [];
  b.addGraph = function (c) {
    if (typeof arguments[0] === typeof(Function)) {
      c = {generate: arguments[0], callback: arguments[1]}
    }
    b.render.queue.push(c);
    if (!b.render.active) {
      b.render()
    }
  };
  if (typeof(module) !== "undefined" && typeof(exports) !== "undefined") {
    module.exports = b
  }
  if (typeof(window) !== "undefined") {
    window.z = b
  }
  b.dom.write = function (c) {
    if (window.fastdom !== undefined) {
      return fastdom.mutate(c)
    }
    return c()
  };
  b.dom.read = function (c) {
    if (window.fastdom !== undefined) {
      return fastdom.measure(c)
    }
    return c()
  };
  b.interactiveGuideline = function () {
    var d = {left: 0, top: 0}, c = null, k = null, j = d3.scale.linear(),
      g = d3.dispatch("elementMousemove", "elementMouseout", "elementClick", "elementDblclick", "elementMouseDown", "elementMouseUp"),
      h = true, f = null, l = b.models.tooltip(), i = window.ActiveXObject;
    l.duration(0).hideDelay(0).hidden(false);

    function e(m) {
      m.each(function (q) {
        var n = d3.select(this);
        var p = (c || 960), s = (k || 400);
        var o = n.selectAll("g.z-wrap.z-interactiveLineLayer").data([q]);
        var t = o.enter().append("g").attr("class", " z-wrap z-interactiveLineLayer");
        t.append("g").attr("class", "z-interactiveGuideLine");
        if (!f) {
          return
        }

        function r() {
          var z = d3.mouse(this);
          var x = z[0];
          var v = z[1];
          var A = true;
          var B = false;
          if (i) {
            x = d3.event.offsetX;
            v = d3.event.offsetY;
            if (d3.event.target.tagName !== "svg") {
              A = false
            }
            if (d3.event.target.className.baseVal.match("z-legend")) {
              B = true
            }
          }
          if (A) {
            x -= d.left;
            v -= d.top
          }
          if (d3.event.type === "mouseout" || x < 0 || v < 0 || x > p || v > s || (d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined) || B) {
            if (i) {
              if (d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined && (d3.event.relatedTarget.className === undefined || d3.event.relatedTarget.className.match(l.nvPointerEventsClass))) {
                return
              }
            }
            g.elementMouseout({mouseX: x, mouseY: v});
            e.renderGuideLine(null);
            l.hidden(true);
            return
          } else {
            l.hidden(false)
          }
          var w = typeof j.rangeBands === "function";
          var u = undefined;
          if (w) {
            var y = d3.bisect(j.range(), x) - 1;
            if (j.range()[y] + j.rangeBand() >= x) {
              u = j.domain()[d3.bisect(j.range(), x) - 1]
            } else {
              g.elementMouseout({mouseX: x, mouseY: v});
              e.renderGuideLine(null);
              l.hidden(true);
              return
            }
          } else {
            u = j.invert(x)
          }
          g.elementMousemove({mouseX: x, mouseY: v, pointXValue: u});
          if (d3.event.type === "dblclick") {
            g.elementDblclick({mouseX: x, mouseY: v, pointXValue: u})
          }
          if (d3.event.type === "click") {
            g.elementClick({mouseX: x, mouseY: v, pointXValue: u})
          }
          if (d3.event.type === "mousedown") {
            g.elementMouseDown({mouseX: x, mouseY: v, pointXValue: u})
          }
          if (d3.event.type === "mouseup") {
            g.elementMouseUp({mouseX: x, mouseY: v, pointXValue: u})
          }
        }

        f.on("touchmove", r).on("mousemove", r, true).on("mouseout", r, true).on("mousedown", r, true).on("mouseup", r, true).on("dblclick", r).on("click", r);
        e.guideLine = null;
        e.renderGuideLine = function (u) {
          if (!h) {
            return
          }
          if (e.guideLine && e.guideLine.attr("x1") === u) {
            return
          }
          b.dom.write(function () {
            var v = o.select(".z-interactiveGuideLine").selectAll("line").data((u != null) ? [b.utils.NaNtoZero(u)] : [], String);
            v.enter().append("line").attr("class", "z-guideline").attr("x1", function (w) {
              return w
            }).attr("x2", function (w) {
              return w
            }).attr("y1", s).attr("y2", 0);
            v.exit().remove()
          })
        }
      })
    }

    e.dispatch = g;
    e.tooltip = l;
    e.margin = function (m) {
      if (!arguments.length) {
        return d
      }
      d.top = typeof m.top != "undefined" ? m.top : d.top;
      d.left = typeof m.left != "undefined" ? m.left : d.left;
      return e
    };
    e.width = function (m) {
      if (!arguments.length) {
        return c
      }
      c = m;
      return e
    };
    e.height = function (m) {
      if (!arguments.length) {
        return k
      }
      k = m;
      return e
    };
    e.xScale = function (m) {
      if (!arguments.length) {
        return j
      }
      j = m;
      return e
    };
    e.showGuideLine = function (m) {
      if (!arguments.length) {
        return h
      }
      h = m;
      return e
    };
    e.svgContainer = function (m) {
      if (!arguments.length) {
        return f
      }
      f = m;
      return e
    };
    return e
  };
  b.interactiveBisect = function (k, h, d) {
    if (!(k instanceof Array)) {
      return null
    }
    var c;
    if (typeof d !== "function") {
      c = function (m) {
        return m.x
      }
    } else {
      c = d
    }
    var l = function (n, m) {
      return c(n) - m
    };
    var e = d3.bisector(l).left;
    var g = d3.max([0, e(k, h) - 1]);
    var j = c(k[g]);
    if (typeof j === "undefined") {
      j = g
    }
    if (j === h) {
      return g
    }
    var f = d3.min([g + 1, k.length - 1]);
    var i = c(k[f]);
    if (typeof i === "undefined") {
      i = f
    }
    if (Math.abs(i - h) >= Math.abs(j - h)) {
      return g
    } else {
      return f
    }
  };
  b.nearestValueIndex = function (e, d, c) {
    var g = Infinity, f = null;
    e.forEach(function (j, h) {
      var k = Math.abs(d - j);
      if (j != null && k <= g && k < c) {
        g = k;
        f = h
      }
    });
    return f
  };
  b.models.tooltip = function () {
    var r = "nvtooltip-" + Math.floor(Math.random() * 100000), z = null, h = "w", f = 25, p = 0, v = null, u = true,
      m = 200, g = null, q = {left: null, top: null}, l = true, d = 100, w = true, j = "z-pointer-events-none";
    var c = function (C, A, B) {
      return C
    };
    var s = function (A) {
      return A
    };
    var t = function (B, A) {
      return B
    };
    var e = function (E) {
      if (E === null) {
        return ""
      }
      var D = d3.select(document.createElement("table"));
      if (w) {
        var A = D.selectAll("thead").data([E]).enter().append("thead");
        A.append("tr").append("td").attr("colspan", 3).append("strong").classed("x-value", true).html(s(E.value))
      }
      var F = D.selectAll("tbody").data([E]).enter().append("tbody");
      var B = F.selectAll("tr").data(function (G) {
        return G.series
      }).enter().append("tr").classed("highlight", function (G) {
        return G.highlight
      });
      B.append("td").classed("legend-color-guide", true).append("div").style("background-color", function (G) {
        return G.color
      });
      B.append("td").classed("key", true).classed("total", function (G) {
        return !!G.total
      }).html(function (H, G) {
        return t(H.key, G)
      });
      B.append("td").classed("value", true).html(function (H, G) {
        return c(H.value, G, H)
      });
      B.filter(function (H, G) {
        return H.percent !== undefined
      }).append("td").classed("percent", true).html(function (H, G) {
        return "(" + d3.format("%")(H.percent) + ")"
      });
      B.selectAll("td").each(function (I) {
        if (I.highlight) {
          var H = d3.scale.linear().domain([0, 1]).range(["#fff", I.color]);
          var G = 0.6;
          d3.select(this).style("border-bottom-color", H(G)).style("border-top-color", H(G))
        }
      });
      if (E.data.desc) {
        F.append("tr").classed("custom", true).append("td").text(function (G) {
          return G.data.desc
        })
      }
      var C = D.node().outerHTML;
      if (E.footer !== undefined) {
        C += "<div class='footer'>" + E.footer + "</div>"
      }
      return C
    };
    var y = function () {
      var B = {left: d3.event !== null ? d3.event.clientX : 0, top: d3.event !== null ? d3.event.clientY : 0};
      if (getComputedStyle(document.body).transform != "none") {
        var A = document.body.getBoundingClientRect();
        B.left -= A.left;
        B.top -= A.top
      }
      return B
    };
    var i = function (A) {
      if (A && A.series) {
        if (b.utils.isArray(A.series)) {
          return true
        }
        if (b.utils.isObject(A.series)) {
          A.series = [A.series];
          return true
        }
      }
      return false
    };
    var o = function (H) {
      var A = g.node().offsetHeight, D = g.node().offsetWidth, G = document.documentElement.clientWidth,
        B = document.documentElement.clientHeight, F, E, C;
      switch (h) {
        case"e":
          F = -D - f;
          E = -(A / 2);
          if (H.left + F < 0) {
            F = f
          }
          if ((C = H.top + E) < 0) {
            E -= C
          }
          if ((C = H.top + E + A) > B) {
            E -= C - B
          }
          break;
        case"w":
          F = f;
          E = -(A / 2);
          if (H.left + F + D > G) {
            F = -D - f
          }
          if ((C = H.top + E) < 0) {
            E -= C
          }
          if ((C = H.top + E + A) > B) {
            E -= C - B
          }
          break;
        case"n":
          F = -(D / 2) - 5;
          E = f;
          if (H.top + E + A > B) {
            E = -A - f
          }
          if ((C = H.left + F) < 0) {
            F -= C
          }
          if ((C = H.left + F + D) > G) {
            F -= C - G
          }
          break;
        case"s":
          F = -(D / 2);
          E = -A - f;
          if (H.top + E < 0) {
            E = f
          }
          if ((C = H.left + F) < 0) {
            F -= C
          }
          if ((C = H.left + F + D) > G) {
            F -= C - G
          }
          break;
        case"center":
          F = -(D / 2);
          E = -(A / 2);
          break;
        default:
          F = 0;
          E = 0;
          break
      }
      return {"left": F, "top": E}
    };
    var x = function () {
      b.dom.read(function () {
        var H = y(), B = o(H), G = H.left + B.left, F = H.top + B.top;
        if (u) {
          g.interrupt().transition().delay(m).duration(0).style("opacity", 0)
        } else {
          var D = "translate(" + q.left + "px, " + q.top + "px)";
          var A = "translate(" + Math.round(G) + "px, " + Math.round(F) + "px)";
          var C = d3.interpolateString(D, A);
          var E = g.style("opacity") < 0.1;
          g.interrupt().transition().duration(E ? 0 : d).styleTween("transform", function (I) {
            return C
          }, "important").styleTween("-webkit-transform", function (I) {
            return C
          }).style("-ms-transform", A).style("opacity", 1)
        }
        q.left = G;
        q.top = F
      })
    };

    function k() {
      if (!g || !g.node()) {
        var A = [1];
        g = d3.select(document.body).select("#" + r).data(A);
        g.enter().append("div").attr("class", "nvtooltip " + (v ? v : "xy-tooltip")).attr("id", r).style("top", 0).style("left", 0).style("opacity", 0).style("position", "fixed").selectAll("div, table, td, tr").classed(j, true).classed(j, true);
        g.exit().remove()
      }
    }

    function n() {
      if (!l) {
        return
      }
      if (!i(z)) {
        return
      }
      b.dom.write(function () {
        k();
        var A = e(z);
        if (A) {
          g.node().innerHTML = A
        }
        x()
      });
      return n
    }

    n.nvPointerEventsClass = j;
    n.options = b.utils.optionsFunc.bind(n);
    n._options = Object.create({}, {
      duration: {
        get: function () {
          return d
        }, set: function (A) {
          d = A
        }
      }, gravity: {
        get: function () {
          return h
        }, set: function (A) {
          h = A
        }
      }, distance: {
        get: function () {
          return f
        }, set: function (A) {
          f = A
        }
      }, snapDistance: {
        get: function () {
          return p
        }, set: function (A) {
          p = A
        }
      }, classes: {
        get: function () {
          return v
        }, set: function (A) {
          v = A
        }
      }, enabled: {
        get: function () {
          return l
        }, set: function (A) {
          l = A
        }
      }, hideDelay: {
        get: function () {
          return m
        }, set: function (A) {
          m = A
        }
      }, contentGenerator: {
        get: function () {
          return e
        }, set: function (A) {
          e = A
        }
      }, valueFormatter: {
        get: function () {
          return c
        }, set: function (A) {
          c = A
        }
      }, headerFormatter: {
        get: function () {
          return s
        }, set: function (A) {
          s = A
        }
      }, keyFormatter: {
        get: function () {
          return t
        }, set: function (A) {
          t = A
        }
      }, headerEnabled: {
        get: function () {
          return w
        }, set: function (A) {
          w = A
        }
      }, position: {
        get: function () {
          return y
        }, set: function (A) {
          y = A
        }
      }, chartContainer: {
        get: function () {
          return document.body
        }, set: function (A) {
          b.deprecated("chartContainer", "feature removed after 1.8.3")
        }
      }, fixedTop: {
        get: function () {
          return null
        }, set: function (A) {
          b.deprecated("fixedTop", "feature removed after 1.8.1")
        }
      }, offset: {
        get: function () {
          return {left: 0, top: 0}
        }, set: function (A) {
          b.deprecated("offset", "use chart.tooltip.distance() instead")
        }
      }, hidden: {
        get: function () {
          return u
        }, set: function (A) {
          if (u != A) {
            u = !!A;
            n()
          }
        }
      }, data: {
        get: function () {
          return z
        }, set: function (A) {
          if (A.point) {
            A.value = A.point.x;
            A.series = A.series || {};
            A.series.value = A.point.y;
            A.series.color = A.point.color || A.series.color
          }
          z = A
        }
      }, node: {
        get: function () {
          return g.node()
        }, set: function (A) {
        }
      }, id: {
        get: function () {
          return r
        }, set: function (A) {
        }
      }
    });
    b.utils.initOptions(n);
    return n
  };
  b.utils.windowSize = function () {
    var c = {width: 640, height: 480};
    if (window.innerWidth && window.innerHeight) {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      return (c)
    }
    if (document.compatMode == "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth) {
      c.width = document.documentElement.offsetWidth;
      c.height = document.documentElement.offsetHeight;
      return (c)
    }
    if (document.body && document.body.offsetWidth) {
      c.width = document.body.offsetWidth;
      c.height = document.body.offsetHeight;
      return (c)
    }
    return (c)
  };
  b.utils.isArray = Array.isArray;
  b.utils.isObject = function (c) {
    return c !== null && typeof c === "object"
  };
  b.utils.isFunction = function (c) {
    return typeof c === "function"
  };
  b.utils.isDate = function (c) {
    return toString.call(c) === "[object Date]"
  };
  b.utils.isNumber = function (c) {
    return !isNaN(c) && typeof c === "number"
  };
  b.utils.windowResize = function (c) {
    if (window.addEventListener) {
      window.addEventListener("resize", c)
    } else {
      b.log("ERROR: Failed to bind to window.resize with: ", c)
    }
    return {
      callback: c, clear: function () {
        window.removeEventListener("resize", c)
      }
    }
  };
  b.utils.getColor = function (c) {
    if (c === undefined) {
      return b.utils.defaultColor()
    } else {
      if (b.utils.isArray(c)) {
        var d = d3.scale.ordinal().range(c);
        return function (g, f) {
          var e = f === undefined ? g : f;
          return g.color || d(e)
        }
      } else {
        return c
      }
    }
  };
  b.utils.defaultColor = function () {
    return b.utils.getColor(d3.scale.category20().range())
  };
  b.utils.customTheme = function (f, d, e) {
    d = d || function (g) {
      return g.key
    };
    e = e || d3.scale.category20().range();
    var c = e.length;
    return function (i, g) {
      var h = d(i);
      if (b.utils.isFunction(f[h])) {
        return f[h]()
      } else {
        if (f[h] !== undefined) {
          return f[h]
        } else {
          if (!c) {
            c = e.length
          }
          c = c - 1;
          return e[c]
        }
      }
    }
  };
  b.utils.pjax = function (c, d) {
    var e = function (f) {
      d3.html(f, function (g) {
        var h = d3.select(d).node();
        h.parentNode.replaceChild(d3.select(g).select(d).node(), h);
        b.utils.pjax(c, d)
      })
    };
    d3.selectAll(c).on("click", function () {
      history.pushState(this.href, this.textContent, this.href);
      e(this.href);
      d3.event.preventDefault()
    });
    d3.select(window).on("popstate", function () {
      if (d3.event.state) {
        e(d3.event.state)
      }
    })
  };
  b.utils.calcApproxTextWidth = function (c) {
    if (b.utils.isFunction(c.style) && b.utils.isFunction(c.text)) {
      var e = parseInt(c.style("font-size").replace("px", ""), 10);
      var d = c.text().length;
      return b.utils.NaNtoZero(d * e * 0.5)
    }
    return 0
  };
  b.utils.NaNtoZero = function (c) {
    if (!b.utils.isNumber(c) || isNaN(c) || c === null || c === Infinity || c === -Infinity) {
      return 0
    }
    return c
  };
  d3.selection.prototype.watchTransition = function (d) {
    var c = [this].concat([].slice.call(arguments, 1));
    return d.transition.apply(d, c)
  };
  b.utils.renderWatch = function (e, f) {
    if (!(this instanceof b.utils.renderWatch)) {
      return new b.utils.renderWatch(e, f)
    }
    var g = f !== undefined ? f : 250;
    var c = [];
    var d = this;
    this.models = function (h) {
      h = [].slice.call(arguments, 0);
      h.forEach(function (i) {
        i.__rendered = false;
        (function (j) {
          j.dispatch.on("renderEnd", function (k) {
            j.__rendered = true;
            d.renderEnd("model")
          })
        })(i);
        if (c.indexOf(i) < 0) {
          c.push(i)
        }
      });
      return this
    };
    this.reset = function (h) {
      if (h !== undefined) {
        g = h
      }
      c = []
    };
    this.transition = function (i, h, j) {
      h = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
      if (h.length > 1) {
        j = h.pop()
      } else {
        j = g !== undefined ? g : 250
      }
      i.__rendered = false;
      if (c.indexOf(i) < 0) {
        c.push(i)
      }
      if (j === 0) {
        i.__rendered = true;
        i.delay = function () {
          return this
        };
        i.duration = function () {
          return this
        };
        return i
      } else {
        if (i.length === 0) {
          i.__rendered = true
        } else {
          if (i.every(function (l) {
              return !l.length
            })) {
            i.__rendered = true
          } else {
            i.__rendered = false
          }
        }
        var k = 0;
        return i.transition().duration(j).each(function () {
          ++k
        }).each("end", function (m, l) {
          if (--k === 0) {
            i.__rendered = true;
            d.renderEnd.apply(this, h)
          }
        })
      }
    };
    this.renderEnd = function () {
      if (c.every(function (h) {
          return h.__rendered
        })) {
        c.forEach(function (h) {
          h.__rendered = false
        });
        e.renderEnd.apply(this, arguments)
      }
    }
  };
  b.utils.deepExtend = function (d) {
    var c = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
    c.forEach(function (i) {
      for (var h in i) {
        var f = b.utils.isArray(d[h]);
        var e = b.utils.isObject(d[h]);
        var g = b.utils.isObject(i[h]);
        if (e && !f && g) {
          b.utils.deepExtend(d[h], i[h])
        } else {
          d[h] = i[h]
        }
      }
    })
  };
  b.utils.state = function () {
    if (!(this instanceof b.utils.state)) {
      return new b.utils.state()
    }
    var f = {};
    var d = this;
    var i = function () {
    };
    var e = function () {
      return {}
    };
    var h = null;
    var g = null;
    this.dispatch = d3.dispatch("change", "set");
    this.dispatch.on("set", function (j) {
      i(j, true)
    });
    this.getter = function (j) {
      e = j;
      return this
    };
    this.setter = function (j, k) {
      if (!k) {
        k = function () {
        }
      }
      i = function (l, m) {
        j(l);
        if (m) {
          k()
        }
      };
      return this
    };
    this.init = function (j) {
      h = h || {};
      b.utils.deepExtend(h, j)
    };
    var c = function () {
      var k = e();
      if (JSON.stringify(k) === JSON.stringify(f)) {
        return false
      }
      for (var j in k) {
        if (f[j] === undefined) {
          f[j] = {}
        }
        f[j] = k[j];
        g = true
      }
      return true
    };
    this.update = function () {
      if (h) {
        i(h, false);
        h = null
      }
      if (c.call(this)) {
        this.dispatch.change(f)
      }
    }
  };
  b.utils.optionsFunc = function (c) {
    if (c) {
      d3.map(c).forEach((function (d, e) {
        if (b.utils.isFunction(this[d])) {
          this[d](e)
        }
      }).bind(this))
    }
    return this
  };
  b.utils.calcTicksX = function (g, f) {
    var c = 1;
    var e = 0;
    for (e; e < f.length; e += 1) {
      var d = f[e] && f[e].values ? f[e].values.length : 0;
      c = d > c ? d : c
    }
    b.log("Requested number of ticks: ", g);
    b.log("Calculated max values to be: ", c);
    g = g > c ? g = c - 1 : g;
    g = g < 1 ? 1 : g;
    g = Math.floor(g);
    b.log("Calculating tick count as: ", g);
    return g
  };
  b.utils.calcTicksY = function (d, c) {
    return b.utils.calcTicksX(d, c)
  };
  b.utils.initOption = function (d, c) {
    if (d._calls && d._calls[c]) {
      d[c] = d._calls[c]
    } else {
      d[c] = function (e) {
        if (!arguments.length) {
          return d._options[c]
        }
        d._overrides[c] = true;
        d._options[c] = e;
        return d
      };
      d["_" + c] = function (e) {
        if (!arguments.length) {
          return d._options[c]
        }
        if (!d._overrides[c]) {
          d._options[c] = e
        }
        return d
      }
    }
  };
  b.utils.initOptions = function (f) {
    f._overrides = f._overrides || {};
    var e = Object.getOwnPropertyNames(f._options || {});
    var d = Object.getOwnPropertyNames(f._calls || {});
    e = e.concat(d);
    for (var c in e) {
      b.utils.initOption(f, e[c])
    }
  };
  b.utils.inheritOptionsD3 = function (d, c, e) {
    d._d3options = e.concat(d._d3options || []);
    e.unshift(c);
    e.unshift(d);
    d3.rebind.apply(this, e)
  };
  b.utils.arrayUnique = function (c) {
    return c.sort().filter(function (d, e) {
      return !e || d != c[e - 1]
    })
  };
  b.utils.symbolMap = d3.map();
  b.utils.symbol = function () {
    var d, c = 64;

    function e(j, g) {
      var f = d.call(this, j, g);
      var h = c.call(this, j, g);
      if (d3.svg.symbolTypes.indexOf(f) !== -1) {
        return d3.svg.symbol().type(f).size(h)()
      } else {
        return b.utils.symbolMap.get(f)(h)
      }
    }

    e.type = function (f) {
      if (!arguments.length) {
        return d
      }
      d = d3.functor(f);
      return e
    };
    e.size = function (f) {
      if (!arguments.length) {
        return c
      }
      c = d3.functor(f);
      return e
    };
    return e
  };
  b.utils.inheritOptions = function (i, h) {
    var g = Object.getOwnPropertyNames(h._options || {});
    var f = Object.getOwnPropertyNames(h._calls || {});
    var c = h._inherited || [];
    var d = h._d3options || [];
    var e = g.concat(f).concat(c).concat(d);
    e.unshift(h);
    e.unshift(i);
    d3.rebind.apply(this, e);
    i._inherited = b.utils.arrayUnique(g.concat(f).concat(c).concat(g).concat(i._inherited || []));
    i._d3options = b.utils.arrayUnique(d.concat(i._d3options || []))
  };
  b.utils.initSVG = function (c) {
    c.classed({"nvd3-svg": true})
  };
  b.utils.sanitizeHeight = function (c, d) {
    return (c || parseInt(d.style("height"), 10) || 400)
  };
  b.utils.sanitizeWidth = function (d, c) {
    return (d || parseInt(c.style("width"), 10) || 960)
  };
  b.utils.availableHeight = function (c, d, e) {
    return Math.max(0, b.utils.sanitizeHeight(c, d) - e.top - e.bottom)
  };
  b.utils.availableWidth = function (d, c, e) {
    return Math.max(0, b.utils.sanitizeWidth(d, c) - e.left - e.right)
  };
  b.utils.noData = function (i, d) {
    var f = i.options(), g = f.margin(), l = f.noData(), h = (l == null) ? ["No Data Available."] : [l],
      m = b.utils.availableHeight(null, d, g), e = b.utils.availableWidth(null, d, g), k = g.left + e / 2,
      j = g.top + m / 2;
    d.selectAll("g").remove();
    var c = d.selectAll(".z-noData").data(h);
    c.enter().append("text").attr("class", "nvd3 z-noData").attr("dy", "-.7em").style("text-anchor", "middle");
    c.attr("x", k).attr("y", j).text(function (n) {
      return n
    })
  };
  b.utils.wrapTicks = function (d, c) {
    d.each(function () {
      var k = d3.select(this), g = k.text().split(/\s+/).reverse(), e, m = [], f = 0, j = 1.1, i = k.attr("y"),
        l = parseFloat(k.attr("dy")), h = k.text(null).append("tspan").attr("x", 0).attr("y", i).attr("dy", l + "em");
      while (e = g.pop()) {
        m.push(e);
        h.text(m.join(" "));
        if (h.node().getComputedTextLength() > c) {
          m.pop();
          h.text(m.join(" "));
          m = [e];
          h = k.append("tspan").attr("x", 0).attr("y", i).attr("dy", ++f * j + l + "em").text(e)
        }
      }
    })
  };
  b.utils.arrayEquals = function (f, e) {
    if (f === e) {
      return true
    }
    if (!f || !e) {
      return false
    }
    if (f.length != e.length) {
      return false
    }
    for (var d = 0, c = f.length; d < c; d++) {
      if (f[d] instanceof Array && e[d] instanceof Array) {
        if (!b.arrayEquals(f[d], e[d])) {
          return false
        }
      } else {
        if (f[d] != e[d]) {
          return false
        }
      }
    }
    return true
  };
  b.models.axis = function () {
    var e = d3.svg.axis();
    var u = d3.scale.linear();
    var l = {top: 0, right: 0, bottom: 0, left: 0}, n = 75, m = 60, i = null, q = true, g = 0, r = true, d = false,
      o = false, s = null, j = 0, f = undefined, c = 250, t = d3.dispatch("renderEnd");
    e.scale(u).orient("bottom").tickFormat(function (v) {
      return v
    });
    var p;
    var h = b.utils.renderWatch(t, c);

    function k(v) {
      h.reset();
      v.each(function (H) {
        var y = d3.select(this);
        b.utils.initSVG(y);
        var A = y.selectAll("g.z-wrap.z-axis").data([H]);
        var D = A.enter().append("g").attr("class", "nvd3 z-wrap z-axis");
        var x = D.append("g");
        var J = A.select("g");
        if (s !== null) {
          e.ticks(s)
        } else {
          if (e.orient() == "top" || e.orient() == "bottom") {
            e.ticks(Math.abs(u.range()[1] - u.range()[0]) / 100)
          }
        }
        J.watchTransition(h, "axis").call(e);
        p = p || e.scale();
        var C = e.tickFormat();
        if (C == null) {
          C = p.tickFormat()
        }
        var B = J.selectAll("text.z-axislabel").data([i || null]);
        B.exit().remove();
        if (f !== undefined) {
          J.selectAll("g").select("text").style("font-size", f)
        }
        var G;
        var I;
        var N;
        switch (e.orient()) {
          case"top":
            B.enter().append("text").attr("class", "z-axislabel");
            N = 0;
            if (u.range().length === 1) {
              N = o ? u.range()[0] * 2 + u.rangeBand() : 0
            } else {
              if (u.range().length === 2) {
                N = o ? u.range()[0] + u.range()[1] + u.rangeBand() : u.range()[1]
              } else {
                if (u.range().length > 2) {
                  N = u.range()[u.range().length - 1] + (u.range()[1] - u.range()[0])
                }
              }
            }
            B.attr("text-anchor", "middle").attr("y", 0).attr("x", N / 2);
            if (q) {
              I = A.selectAll("g.z-axisMaxMin").data(u.domain());
              I.enter().append("g").attr("class", function (O, w) {
                return ["z-axisMaxMin", "z-axisMaxMin-x", (w == 0 ? "z-axisMin-x" : "z-axisMax-x")].join(" ")
              }).append("text");
              I.exit().remove();
              I.attr("transform", function (O, w) {
                return "translate(" + b.utils.NaNtoZero(u(O)) + ",0)"
              }).select("text").attr("dy", "-0.5em").attr("y", -e.tickPadding()).attr("text-anchor", "middle").text(function (P, O) {
                var w = C(P);
                return ("" + w).match("NaN") ? "" : w
              });
              I.watchTransition(h, "min-max top").attr("transform", function (O, w) {
                return "translate(" + b.utils.NaNtoZero(u.range()[w]) + ",0)"
              })
            }
            break;
          case"bottom":
            G = j + 36;
            var z = 30;
            var L = 0;
            var E = J.selectAll("g").select("text");
            var M = "";
            if (g % 360) {
              E.attr("transform", "");
              E.each(function (Q, w) {
                var P = this.getBoundingClientRect();
                var O = P.width;
                L = P.height;
                if (O > z) {
                  z = O
                }
              });
              M = "rotate(" + g + " 0," + (L / 2 + e.tickPadding()) + ")";
              var K = Math.abs(Math.sin(g * Math.PI / 180));
              G = (K ? K * z : z) + 30;
              E.attr("transform", M).style("text-anchor", g % 360 > 0 ? "start" : "end")
            } else {
              if (d) {
                E.attr("transform", function (O, w) {
                  return "translate(0," + (w % 2 == 0 ? "0" : "12") + ")"
                })
              } else {
                E.attr("transform", "translate(0,0)")
              }
            }
            B.enter().append("text").attr("class", "z-axislabel");
            N = 0;
            if (u.range().length === 1) {
              N = o ? u.range()[0] * 2 + u.rangeBand() : 0
            } else {
              if (u.range().length === 2) {
                N = o ? u.range()[0] + u.range()[1] + u.rangeBand() : u.range()[1]
              } else {
                if (u.range().length > 2) {
                  N = u.range()[u.range().length - 1] + (u.range()[1] - u.range()[0])
                }
              }
            }
            B.attr("text-anchor", "middle").attr("y", G).attr("x", N / 2);
            if (q) {
              I = A.selectAll("g.z-axisMaxMin").data([u.domain()[0], u.domain()[u.domain().length - 1]]);
              I.enter().append("g").attr("class", function (O, w) {
                return ["z-axisMaxMin", "z-axisMaxMin-x", (w == 0 ? "z-axisMin-x" : "z-axisMax-x")].join(" ")
              }).append("text");
              I.exit().remove();
              I.attr("transform", function (O, w) {
                return "translate(" + b.utils.NaNtoZero((u(O) + (o ? u.rangeBand() / 2 : 0))) + ",0)"
              }).select("text").attr("dy", ".71em").attr("y", e.tickPadding()).attr("transform", M).style("text-anchor", g ? (g % 360 > 0 ? "start" : "end") : "middle").text(function (P, O) {
                var w = C(P);
                return ("" + w).match("NaN") ? "" : w
              });
              I.watchTransition(h, "min-max bottom").attr("transform", function (O, w) {
                return "translate(" + b.utils.NaNtoZero((u(O) + (o ? u.rangeBand() / 2 : 0))) + ",0)"
              })
            }
            break;
          case"right":
            B.enter().append("text").attr("class", "z-axislabel");
            B.style("text-anchor", r ? "middle" : "begin").attr("transform", r ? "rotate(90)" : "").attr("y", r ? (-Math.max(l.right, n) + 12 - (j || 0)) : -10).attr("x", r ? (d3.max(u.range()) / 2) : e.tickPadding());
            if (q) {
              I = A.selectAll("g.z-axisMaxMin").data(u.domain());
              I.enter().append("g").attr("class", function (O, w) {
                return ["z-axisMaxMin", "z-axisMaxMin-y", (w == 0 ? "z-axisMin-y" : "z-axisMax-y")].join(" ")
              }).append("text").style("opacity", 0);
              I.exit().remove();
              I.attr("transform", function (O, w) {
                return "translate(0," + b.utils.NaNtoZero(u(O)) + ")"
              }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", e.tickPadding()).style("text-anchor", "start").text(function (P, O) {
                var w = C(P);
                return ("" + w).match("NaN") ? "" : w
              });
              I.watchTransition(h, "min-max right").attr("transform", function (O, w) {
                return "translate(0," + b.utils.NaNtoZero(u.range()[w]) + ")"
              }).select("text").style("opacity", 1)
            }
            break;
          case"left":
            B.enter().append("text").attr("class", "z-axislabel");
            B.style("text-anchor", r ? "middle" : "end").attr("transform", r ? "rotate(-90)" : "").attr("y", r ? (-Math.max(l.left, n) + 25 - (j || 0)) : -10).attr("x", r ? (-d3.max(u.range()) / 2) : -e.tickPadding());
            if (q) {
              I = A.selectAll("g.z-axisMaxMin").data(u.domain());
              I.enter().append("g").attr("class", function (O, w) {
                return ["z-axisMaxMin", "z-axisMaxMin-y", (w == 0 ? "z-axisMin-y" : "z-axisMax-y")].join(" ")
              }).append("text").style("opacity", 0);
              I.exit().remove();
              I.attr("transform", function (O, w) {
                return "translate(0," + b.utils.NaNtoZero(p(O)) + ")"
              }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", -e.tickPadding()).attr("text-anchor", "end").text(function (P, O) {
                var w = C(P);
                return ("" + w).match("NaN") ? "" : w
              });
              I.watchTransition(h, "min-max right").attr("transform", function (O, w) {
                return "translate(0," + b.utils.NaNtoZero(u.range()[w]) + ")"
              }).select("text").style("opacity", 1)
            }
            break
        }
        B.text(function (w) {
          return w
        });
        if (q && (e.orient() === "left" || e.orient() === "right")) {
          J.selectAll("g").each(function (O, w) {
            d3.select(this).select("text").attr("opacity", 1);
            if (u(O) < u.range()[1] + 10 || u(O) > u.range()[0] - 10) {
              if (O > 1e-10 || O < -1e-10) {
                d3.select(this).attr("opacity", 0)
              }
              d3.select(this).select("text").attr("opacity", 0)
            }
          });
          if (u.domain()[0] == u.domain()[1] && u.domain()[0] == 0) {
            A.selectAll("g.z-axisMaxMin").style("opacity", function (O, w) {
              return !w ? 1 : 0
            })
          }
        }
        if (q && (e.orient() === "top" || e.orient() === "bottom")) {
          var F = [];
          A.selectAll("g.z-axisMaxMin").each(function (P, w) {
            try {
              if (w) {
                F.push(u(P) - this.getBoundingClientRect().width - 4)
              } else {
                F.push(u(P) + this.getBoundingClientRect().width + 4)
              }
            } catch (O) {
              if (w) {
                F.push(u(P) - 4)
              } else {
                F.push(u(P) + 4)
              }
            }
          });
          J.selectAll("g").each(function (O, w) {
            if (u(O) < F[0] || u(O) > F[1]) {
              if (O > 1e-10 || O < -1e-10) {
                d3.select(this).remove()
              } else {
                d3.select(this).select("text").remove()
              }
            }
          })
        }
        J.selectAll(".tick").filter(function (w) {
          return !parseFloat(Math.round(w * 100000) / 1000000) && (w !== undefined)
        }).classed("zero", true);
        p = u.copy()
      });
      h.renderEnd("axis immediate");
      return k
    }

    k.axis = e;
    k.dispatch = t;
    k.options = b.utils.optionsFunc.bind(k);
    k._options = Object.create({}, {
      axisLabelDistance: {
        get: function () {
          return j
        }, set: function (v) {
          j = v
        }
      }, staggerLabels: {
        get: function () {
          return d
        }, set: function (v) {
          d = v
        }
      }, rotateLabels: {
        get: function () {
          return g
        }, set: function (v) {
          g = v
        }
      }, rotateYLabel: {
        get: function () {
          return r
        }, set: function (v) {
          r = v
        }
      }, showMaxMin: {
        get: function () {
          return q
        }, set: function (v) {
          q = v
        }
      }, axisLabel: {
        get: function () {
          return i
        }, set: function (v) {
          i = v
        }
      }, height: {
        get: function () {
          return m
        }, set: function (v) {
          m = v
        }
      }, ticks: {
        get: function () {
          return s
        }, set: function (v) {
          s = v
        }
      }, width: {
        get: function () {
          return n
        }, set: function (v) {
          n = v
        }
      }, fontSize: {
        get: function () {
          return f
        }, set: function (v) {
          f = v
        }
      }, margin: {
        get: function () {
          return l
        }, set: function (v) {
          l.top = v.top !== undefined ? v.top : l.top;
          l.right = v.right !== undefined ? v.right : l.right;
          l.bottom = v.bottom !== undefined ? v.bottom : l.bottom;
          l.left = v.left !== undefined ? v.left : l.left
        }
      }, duration: {
        get: function () {
          return c
        }, set: function (v) {
          c = v;
          h.reset(c)
        }
      }, scale: {
        get: function () {
          return u
        }, set: function (v) {
          u = v;
          e.scale(u);
          o = typeof u.rangeBands === "function";
          b.utils.inheritOptionsD3(k, u, ["domain", "range", "rangeBand", "rangeBands"])
        }
      }
    });
    b.utils.initOptions(k);
    b.utils.inheritOptionsD3(k, e, ["orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat"]);
    b.utils.inheritOptionsD3(k, u, ["domain", "range", "rangeBand", "rangeBands"]);
    return k
  };
  b.models.legend = function () {
    var g = {top: 5, right: 0, bottom: 5, left: 0}, e = 400, q = 20, i = function (s) {
        return s.key
      }, c = function (s) {
        return s
      }, h = b.utils.getColor(), o = 20, m = true, p = 32, f = true, r = true, d = false, k = false,
      l = d3.dispatch("legendClick", "legendDblclick", "legendMouseover", "legendMouseout", "stateChange"),
      j = "classic";

    function n(s) {
      s.each(function (U) {
        var x = e - g.left - g.right, L = d3.select(this);
        b.utils.initSVG(L);
        var J = L.selectAll("g.z-legend").data([U]);
        var Q = J.enter().append("g").attr("class", "nvd3 z-legend").append("g");
        var T = J.select("g");
        if (f) {
          J.attr("transform", "translate(" + (-g.right) + "," + g.top + ")")
        } else {
          J.attr("transform", "translate(" + g.left + "," + g.top + ")")
        }
        var K = T.selectAll(".z-series").data(function (V) {
          if (j != "furious") {
            return V
          }
          return V.filter(function (W) {
            return k ? true : !W.disengaged
          })
        });
        var C = K.enter().append("g").attr("class", "z-series");
        var N;
        var B;
        switch (j) {
          case"furious":
            B = 23;
            break;
          case"classic":
            B = 20
        }
        if (j == "classic") {
          C.append("circle").style("stroke-width", 2).attr("class", "z-legend-symbol").attr("r", 5);
          N = K.select(".z-legend-symbol")
        } else {
          if (j == "furious") {
            C.append("rect").style("stroke-width", 2).attr("class", "z-legend-symbol").attr("rx", 3).attr("ry", 3);
            N = K.select(".z-legend-symbol");
            C.append("g").attr("class", "z-check-box").property("innerHTML", '<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="z-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="z-check"></path>').attr("transform", "translate(-10,-8)scale(0.5)");
            var y = K.select(".z-check-box");
            y.each(function (W, V) {
              d3.select(this).selectAll("path").attr("stroke", v(W, V))
            })
          }
        }
        C.append("text").attr("text-anchor", "start").attr("class", "z-legend-text").attr("dy", ".32em").attr("dx", "8");
        var G = K.select("text.z-legend-text");
        K.on("mouseover", function (W, V) {
          l.legendMouseover(W, V)
        }).on("mouseout", function (W, V) {
          l.legendMouseout(W, V)
        }).on("click", function (Y, V) {
          l.legendClick(Y, V);
          var X = K.data();
          if (r) {
            if (j == "classic") {
              if (d) {
                X.forEach(function (Z) {
                  Z.disabled = true
                });
                Y.disabled = false
              } else {
                Y.disabled = !Y.disabled;
                if (X.every(function (Z) {
                    return Z.disabled
                  })) {
                  X.forEach(function (Z) {
                    Z.disabled = false
                  })
                }
              }
            } else {
              if (j == "furious") {
                if (k) {
                  Y.disengaged = !Y.disengaged;
                  Y.userDisabled = Y.userDisabled == undefined ? !!Y.disabled : Y.userDisabled;
                  Y.disabled = Y.disengaged || Y.userDisabled
                } else {
                  if (!k) {
                    Y.disabled = !Y.disabled;
                    Y.userDisabled = Y.disabled;
                    var W = X.filter(function (Z) {
                      return !Z.disengaged
                    });
                    if (W.every(function (Z) {
                        return Z.userDisabled
                      })) {
                      X.forEach(function (Z) {
                        Z.disabled = Z.userDisabled = false
                      })
                    }
                  }
                }
              }
            }
            l.stateChange({
              disabled: X.map(function (Z) {
                return !!Z.disabled
              }), disengaged: X.map(function (Z) {
                return !!Z.disengaged
              })
            })
          }
        }).on("dblclick", function (X, V) {
          if (j == "furious" && k) {
            return
          }
          l.legendDblclick(X, V);
          if (r) {
            var W = K.data();
            W.forEach(function (Y) {
              Y.disabled = true;
              if (j == "furious") {
                Y.userDisabled = Y.disabled
              }
            });
            X.disabled = false;
            if (j == "furious") {
              X.userDisabled = X.disabled
            }
            l.stateChange({
              disabled: W.map(function (Y) {
                return !!Y.disabled
              })
            })
          }
        });
        K.classed("z-disabled", function (V) {
          return V.userDisabled
        });
        K.exit().remove();
        G.attr("fill", v).text(function (V) {
          return c(i(V))
        });
        var P = 0;
        if (m) {
          var A = [];
          K.each(function (aa, Y) {
            var X;
            if (c(i(aa)) && c(i(aa)).length > o) {
              var V = c(i(aa)).substring(0, o);
              X = d3.select(this).select("text").text(V + "...");
              d3.select(this).append("svg:title").text(c(i(aa)))
            } else {
              X = d3.select(this).select("text")
            }
            var W;
            try {
              W = X.node().getComputedTextLength();
              if (W <= 0) {
                throw Error()
              }
            } catch (Z) {
              W = b.utils.calcApproxTextWidth(X)
            }
            A.push(W + p)
          });
          var I = 0;
          var M = [];
          P = 0;
          while (P < x && I < A.length) {
            M[I] = A[I];
            P += A[I++]
          }
          if (I === 0) {
            I = 1
          }
          while (P > x && I > 1) {
            M = [];
            I--;
            for (var R = 0; R < A.length; R++) {
              if (A[R] > (M[R % I] || 0)) {
                M[R % I] = A[R]
              }
            }
            P = M.reduce(function (W, X, V, Y) {
              return W + X
            })
          }
          var w = [];
          for (var S = 0, H = 0; S < I; S++) {
            w[S] = H;
            H += M[S]
          }
          K.attr("transform", function (W, V) {
            return "translate(" + w[V % I] + "," + (5 + Math.floor(V / I) * B) + ")"
          });
          if (f) {
            T.attr("transform", "translate(" + (e - g.right - P) + "," + g.top + ")")
          } else {
            T.attr("transform", "translate(0" + "," + g.top + ")")
          }
          q = g.top + g.bottom + (Math.ceil(A.length / I) * B)
        } else {
          var E = 5, F = 5, O = 0, z;
          K.attr("transform", function (X, V) {
            var W = d3.select(this).select("text").node().getComputedTextLength() + p;
            z = F;
            if (e < g.left + g.right + z + W) {
              F = z = 5;
              E += B
            }
            F += W;
            if (F > O) {
              O = F
            }
            if (P < z + O) {
              P = z + O
            }
            return "translate(" + z + "," + E + ")"
          });
          T.attr("transform", "translate(" + (e - g.right - O) + "," + g.top + ")");
          q = g.top + g.bottom + E + 15
        }
        if (j == "furious") {
          N.attr("width", function (W, V) {
            return G[0][V].getComputedTextLength() + 27
          }).attr("height", 18).attr("y", -9).attr("x", -15);
          Q.insert("rect", ":first-child").attr("class", "z-legend-bg").attr("fill", "#eee").attr("opacity", 0);
          var D = T.select(".z-legend-bg");
          D.transition().duration(300).attr("x", -B).attr("width", P + B - 12).attr("height", q + 10).attr("y", -g.top - 10).attr("opacity", k ? 1 : 0)
        }
        N.style("fill", t).style("fill-opacity", u).style("stroke", t)
      });

      function v(x, w) {
        if (j != "furious") {
          return "#000"
        }
        if (k) {
          return x.disengaged ? "#000" : "#fff"
        } else {
          if (!k) {
            if (!x.color) {
              x.color = h(x, w)
            }
            return !!x.disabled ? x.color : "#fff"
          }
        }
      }

      function t(x, w) {
        if (k && j == "furious") {
          return x.disengaged ? "#eee" : x.color || h(x, w)
        } else {
          return x.color || h(x, w)
        }
      }

      function u(x, w) {
        if (k && j == "furious") {
          return 1
        } else {
          return !!x.disabled ? 0 : 1
        }
      }

      return n
    }

    n.dispatch = l;
    n.options = b.utils.optionsFunc.bind(n);
    n._options = Object.create({}, {
      width: {
        get: function () {
          return e
        }, set: function (s) {
          e = s
        }
      }, height: {
        get: function () {
          return q
        }, set: function (s) {
          q = s
        }
      }, key: {
        get: function () {
          return i
        }, set: function (s) {
          i = s
        }
      }, keyFormatter: {
        get: function () {
          return c
        }, set: function (s) {
          c = s
        }
      }, align: {
        get: function () {
          return m
        }, set: function (s) {
          m = s
        }
      }, maxKeyLength: {
        get: function () {
          return o
        }, set: function (s) {
          o = s
        }
      }, rightAlign: {
        get: function () {
          return f
        }, set: function (s) {
          f = s
        }
      }, padding: {
        get: function () {
          return p
        }, set: function (s) {
          p = s
        }
      }, updateState: {
        get: function () {
          return r
        }, set: function (s) {
          r = s
        }
      }, radioButtonMode: {
        get: function () {
          return d
        }, set: function (s) {
          d = s
        }
      }, expanded: {
        get: function () {
          return k
        }, set: function (s) {
          k = s
        }
      }, vers: {
        get: function () {
          return j
        }, set: function (s) {
          j = s
        }
      }, margin: {
        get: function () {
          return g
        }, set: function (s) {
          g.top = s.top !== undefined ? s.top : g.top;
          g.right = s.right !== undefined ? s.right : g.right;
          g.bottom = s.bottom !== undefined ? s.bottom : g.bottom;
          g.left = s.left !== undefined ? s.left : g.left
        }
      }, color: {
        get: function () {
          return h
        }, set: function (s) {
          h = b.utils.getColor(s)
        }
      }
    });
    b.utils.initOptions(n);
    return n
  };
  b.models.multiBar = function () {
    var o = {top: 0, right: 0, bottom: 0, left: 0}, t = 960, p = 500, j = d3.scale.ordinal(), i = d3.scale.linear(),
      q = Math.floor(Math.random() * 10000), k = null, C = function (x) {
        return x.x
      }, A = function (x) {
        return x.y
      }, e = [0], E = true, D = false, h = "zero", w = b.utils.defaultColor(), F = false, r = null, f, c = 500, v, s, n,
      u, H = 0.1, z = 0.75,
      G = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "elementMousemove", "renderEnd");
    var B, d, g = b.utils.renderWatch(G, c);
    var m = 0;

    function l(x) {
      g.reset();
      x.each(function (S) {
        var X = t - o.left - o.right, O = p - o.top - o.bottom;
        k = d3.select(this);
        b.utils.initSVG(k);
        var T = 0;
        var L = function (Z, Y) {
          if (Z.series === S.length - 1 && Y === S[0].values.length - 1) {
            return true
          }
          return false
        };
        if (F && S.length) {
          F = [{
            values: S[0].values.map(function (Y) {
              return {x: Y.x, y: 0, series: Y.series, size: 0.01}
            })
          }]
        }
        if (D) {
          var V = d3.layout.stack().offset(h).values(function (Y) {
            return Y.values
          }).y(A)(!S.length && F ? F : S);
          V.forEach(function (Z, Y) {
            if (Z.nonStackable) {
              S[Y].nonStackableSeries = T++;
              V[Y] = S[Y]
            } else {
              if (Y > 0 && V[Y - 1].nonStackable) {
                V[Y].values.map(function (ab, aa) {
                  ab.y0 -= V[Y - 1].values[aa].y;
                  ab.y1 = ab.y0 + ab.y
                })
              }
            }
          });
          S = V
        }
        S.forEach(function (Z, Y) {
          Z.values.forEach(function (aa) {
            aa.series = Y;
            aa.key = Z.key
          })
        });
        if (D && S.length > 0) {
          S[0].values.map(function (aa, Y) {
            var ab = 0, Z = 0;
            S.map(function (ae, ac) {
              if (!S[ac].nonStackable) {
                var ad = ae.values[Y];
                ad.size = Math.abs(ad.y);
                if (ad.y < 0) {
                  ad.y1 = Z;
                  Z = Z - ad.size
                } else {
                  ad.y1 = ad.size + ab;
                  ab = ab + ad.size
                }
              }
            })
          })
        }
        var M = (v && s) ? [] : S.map(function (Z, Y) {
          return Z.values.map(function (ab, aa) {
            return {x: C(ab, aa), y: A(ab, aa), y0: ab.y0, y1: ab.y1, idx: Y}
          })
        });
        j.domain(v || d3.merge(M).map(function (Y) {
          return Y.x
        })).rangeBands(n || [0, X], H);
        i.domain(s || d3.extent(d3.merge(M).map(function (Z) {
          var Y = Z.y;
          if (D && !S[Z.idx].nonStackable) {
            if (Z.y > 0) {
              Y = Z.y1
            } else {
              Y = Z.y1 + Z.y
            }
          }
          return Y
        }).concat(e))).range(u || [O, 0]);
        if (j.domain()[0] === j.domain()[1]) {
          j.domain()[0] ? j.domain([j.domain()[0] - j.domain()[0] * 0.01, j.domain()[1] + j.domain()[1] * 0.01]) : j.domain([-1, 1])
        }
        if (i.domain()[0] === i.domain()[1]) {
          i.domain()[0] ? i.domain([i.domain()[0] + i.domain()[0] * 0.01, i.domain()[1] - i.domain()[1] * 0.01]) : i.domain([-1, 1])
        }
        B = B || j;
        d = d || i;
        var K = k.selectAll("g.z-wrap.z-multibar").data([S]);
        var Q = K.enter().append("g").attr("class", "nvd3 z-wrap z-multibar");
        var N = Q.append("defs");
        var I = Q.append("g");
        var U = K.select("g");
        I.append("g").attr("class", "z-groups");
        K.attr("transform", "translate(" + o.left + "," + o.top + ")");
        N.append("clipPath").attr("id", "z-edge-clip-" + q).append("rect");
        K.select("#z-edge-clip-" + q + " rect").attr("width", X).attr("height", O);
        U.attr("clip-path", E ? "url(#z-edge-clip-" + q + ")" : "");
        var P = K.select(".z-groups").selectAll(".z-group").data(function (Y) {
          return Y
        }, function (Z, Y) {
          return Y
        });
        P.enter().append("g").style("stroke-opacity", 0.000001).style("fill-opacity", 0.000001);
        var y = g.transition(P.exit().selectAll("rect.z-bar"), "multibarExit", Math.min(100, c)).attr("y", function (ab, Z, Y) {
          var aa = d(0) || 0;
          if (D) {
            if (S[ab.series] && !S[ab.series].nonStackable) {
              aa = d(ab.y0)
            }
          }
          return aa
        }).attr("height", 0).remove();
        if (y.delay) {
          y.delay(function (aa, Z) {
            var Y = Z * (c / (m + 1)) - Z;
            return Y
          })
        }
        P.attr("class", function (Z, Y) {
          return "z-group z-series-" + Y
        }).classed("hover", function (Y) {
          return Y.hover
        }).style("fill", function (Z, Y) {
          return w(Z, Y)
        }).style("stroke", function (Z, Y) {
          return w(Z, Y)
        });
        P.style("stroke-opacity", 1).style("fill-opacity", z);
        var W = P.selectAll("rect.z-bar").data(function (Y) {
          return (F && !S.length) ? F.values : Y.values
        });
        W.exit().remove();
        var R = W.enter().append("rect").attr("class", function (Z, Y) {
          return A(Z, Y) < 0 ? "z-bar negative" : "z-bar positive"
        }).attr("x", function (aa, Z, Y) {
          return D && !S[Y].nonStackable ? 0 : (Y * j.rangeBand() / S.length)
        }).attr("y", function (aa, Z, Y) {
          return d(D && !S[Y].nonStackable ? aa.y0 : 0) || 0
        }).attr("height", 0).attr("width", function (aa, Z, Y) {
          return j.rangeBand() / (D && !S[Y].nonStackable ? 1 : S.length)
        }).attr("transform", function (Z, Y) {
          return "translate(" + j(C(Z, Y)) + ",0)"
        });
        W.style("fill", function (aa, Z, Y) {
          return w(aa, Y, Z)
        }).style("stroke", function (aa, Z, Y) {
          return w(aa, Y, Z)
        }).on("mouseover", function (Z, Y) {
          d3.select(this).classed("hover", true);
          G.elementMouseover({data: Z, index: Y, color: d3.select(this).style("fill")})
        }).on("mouseout", function (Z, Y) {
          d3.select(this).classed("hover", false);
          G.elementMouseout({data: Z, index: Y, color: d3.select(this).style("fill")})
        }).on("mousemove", function (Z, Y) {
          G.elementMousemove({data: Z, index: Y, color: d3.select(this).style("fill")})
        }).on("click", function (aa, Z) {
          var Y = this;
          G.elementClick({data: aa, index: Z, color: d3.select(this).style("fill"), event: d3.event, element: Y});
          d3.event.stopPropagation()
        }).on("dblclick", function (Z, Y) {
          G.elementDblClick({data: Z, index: Y, color: d3.select(this).style("fill")});
          d3.event.stopPropagation()
        });
        W.attr("class", function (Z, Y) {
          return A(Z, Y) < 0 ? "z-bar negative" : "z-bar positive"
        }).attr("transform", function (Z, Y) {
          return "translate(" + j(C(Z, Y)) + ",0)"
        });
        if (r) {
          if (!f) {
            f = S.map(function () {
              return true
            })
          }
          W.style("fill", function (aa, Z, Y) {
            return d3.rgb(r(aa, Z)).darker(f.map(function (ac, ab) {
              return ab
            }).filter(function (ac, ab) {
              return !f[ab]
            })[Y]).toString()
          }).style("stroke", function (aa, Z, Y) {
            return d3.rgb(r(aa, Z)).darker(f.map(function (ac, ab) {
              return ab
            }).filter(function (ac, ab) {
              return !f[ab]
            })[Y]).toString()
          })
        }
        var J = W.watchTransition(g, "multibar", Math.min(250, c)).delay(function (Z, Y) {
          return Y * c / S[0].values.length
        });
        if (D) {
          J.attr("y", function (ab, Z, Y) {
            var aa = 0;
            if (!S[Y].nonStackable) {
              aa = i(ab.y1)
            } else {
              if (A(ab, Z) < 0) {
                aa = i(0)
              } else {
                if (i(0) - i(A(ab, Z)) < -1) {
                  aa = i(0) - 1
                } else {
                  aa = i(A(ab, Z)) || 0
                }
              }
            }
            return aa
          }).attr("height", function (aa, Z, Y) {
            if (!S[Y].nonStackable) {
              return Math.max(Math.abs(i(aa.y + aa.y0) - i(aa.y0)), 0)
            } else {
              return Math.max(Math.abs(i(A(aa, Z)) - i(0)), 0) || 0
            }
          }).attr("x", function (ab, Z, Y) {
            var aa = 0;
            if (S[Y].nonStackable) {
              aa = ab.series * j.rangeBand() / S.length;
              if (S.length !== T) {
                aa = S[Y].nonStackableSeries * j.rangeBand() / (T * 2)
              }
            }
            return aa
          }).attr("width", function (ab, Z, Y) {
            if (!S[Y].nonStackable) {
              return j.rangeBand()
            } else {
              var aa = (j.rangeBand() / T);
              if (S.length !== T) {
                aa = j.rangeBand() / (T * 2)
              }
              return aa
            }
          })
        } else {
          J.attr("x", function (Z, Y) {
            return Z.series * j.rangeBand() / S.length
          }).attr("width", j.rangeBand() / S.length).attr("y", function (Z, Y) {
            return A(Z, Y) < 0 ? i(0) : i(0) - i(A(Z, Y)) < 1 ? i(0) - 1 : i(A(Z, Y)) || 0
          }).attr("height", function (Z, Y) {
            return Math.max(Math.abs(i(A(Z, Y)) - i(0)), 1) || 0
          })
        }
        B = j.copy();
        d = i.copy();
        if (S[0] && S[0].values) {
          m = S[0].values.length
        }
      });
      g.renderEnd("multibar immediate");
      return l
    }

    l.dispatch = G;
    l.options = b.utils.optionsFunc.bind(l);
    l._options = Object.create({}, {
      width: {
        get: function () {
          return t
        }, set: function (x) {
          t = x
        }
      }, height: {
        get: function () {
          return p
        }, set: function (x) {
          p = x
        }
      }, x: {
        get: function () {
          return C
        }, set: function (x) {
          C = x
        }
      }, y: {
        get: function () {
          return A
        }, set: function (x) {
          A = x
        }
      }, xScale: {
        get: function () {
          return j
        }, set: function (x) {
          j = x
        }
      }, yScale: {
        get: function () {
          return i
        }, set: function (x) {
          i = x
        }
      }, xDomain: {
        get: function () {
          return v
        }, set: function (x) {
          v = x
        }
      }, yDomain: {
        get: function () {
          return s
        }, set: function (x) {
          s = x
        }
      }, xRange: {
        get: function () {
          return n
        }, set: function (x) {
          n = x
        }
      }, yRange: {
        get: function () {
          return u
        }, set: function (x) {
          u = x
        }
      }, forceY: {
        get: function () {
          return e
        }, set: function (x) {
          e = x
        }
      }, stacked: {
        get: function () {
          return D
        }, set: function (x) {
          D = x
        }
      }, stackOffset: {
        get: function () {
          return h
        }, set: function (x) {
          h = x
        }
      }, clipEdge: {
        get: function () {
          return E
        }, set: function (x) {
          E = x
        }
      }, disabled: {
        get: function () {
          return f
        }, set: function (x) {
          f = x
        }
      }, id: {
        get: function () {
          return q
        }, set: function (x) {
          q = x
        }
      }, hideable: {
        get: function () {
          return F
        }, set: function (x) {
          F = x
        }
      }, groupSpacing: {
        get: function () {
          return H
        }, set: function (x) {
          H = x
        }
      }, fillOpacity: {
        get: function () {
          return z
        }, set: function (x) {
          z = x
        }
      }, margin: {
        get: function () {
          return o
        }, set: function (x) {
          o.top = x.top !== undefined ? x.top : o.top;
          o.right = x.right !== undefined ? x.right : o.right;
          o.bottom = x.bottom !== undefined ? x.bottom : o.bottom;
          o.left = x.left !== undefined ? x.left : o.left
        }
      }, duration: {
        get: function () {
          return c
        }, set: function (x) {
          c = x;
          g.reset(c)
        }
      }, color: {
        get: function () {
          return w
        }, set: function (x) {
          w = b.utils.getColor(x)
        }
      }, barColor: {
        get: function () {
          return r
        }, set: function (x) {
          r = x ? b.utils.getColor(x) : null
        }
      }
    });
    b.utils.initOptions(l);
    return l
  };
  b.models.multiBarChart = function () {
    var A = b.models.multiBar(), o = b.models.axis(), l = b.models.axis(), H = b.interactiveGuideline(),
      C = b.models.legend(), q = b.models.legend(), u = b.models.tooltip();
    var h = {top: 30, right: 20, bottom: 50, left: 60}, D = null, c = null, d = null, s = b.utils.defaultColor(),
      i = true, t = {}, n = true, I = null, f = true, G = true, K = false, g = true, v = false, L = false, m = 0, B, w,
      O = b.utils.state(), r = null, k = null, E = d3.dispatch("stateChange", "changeState", "renderEnd"),
      F = function () {
        return i ? 180 : 0
      }, p = 250, e = false;
    O.stacked = false;
    A.stacked(false);
    o.orient("bottom").tickPadding(7).showMaxMin(false).tickFormat(function (x) {
      return x
    });
    l.orient((K) ? "right" : "left").tickFormat(d3.format(",.1f"));
    u.duration(0).valueFormatter(function (y, x) {
      return l.tickFormat()(y, x)
    }).headerFormatter(function (y, x) {
      return o.tickFormat()(y, x)
    });
    H.tooltip.valueFormatter(function (y, x) {
      return y == null ? "N/A" : l.tickFormat()(y, x)
    }).headerFormatter(function (y, x) {
      return o.tickFormat()(y, x)
    });
    H.tooltip.valueFormatter(function (y, x) {
      return y == null ? "N/A" : l.tickFormat()(y, x)
    }).headerFormatter(function (y, x) {
      return o.tickFormat()(y, x)
    });
    H.tooltip.duration(0).valueFormatter(function (y, x) {
      return l.tickFormat()(y, x)
    }).headerFormatter(function (y, x) {
      return o.tickFormat()(y, x)
    });
    q.updateState(false);
    var z = b.utils.renderWatch(E);
    var J = false;
    var N = function (x) {
      return function () {
        return {
          active: x.map(function (y) {
            return !y.disabled
          }), stacked: J
        }
      }
    };
    var j = function (x) {
      return function (y) {
        if (y.stacked !== undefined) {
          J = y.stacked
        }
        if (y.active !== undefined) {
          x.forEach(function (Q, P) {
            Q.disabled = !y.active[P]
          })
        }
      }
    };

    function M(x) {
      z.reset();
      z.models(A);
      if (f) {
        z.models(o)
      }
      if (G) {
        z.models(l)
      }
      x.each(function (W) {
        var Q = d3.select(this), Z = this;
        b.utils.initSVG(Q);
        var ad = b.utils.availableWidth(c, Q, h), S = b.utils.availableHeight(d, Q, h);
        M.update = function () {
          if (p === 0) {
            Q.call(M)
          } else {
            Q.transition().duration(p).call(M)
          }
        };
        M.container = this;
        O.setter(j(W), M.update).getter(N(W)).update();
        O.disabled = W.map(function (ae) {
          return !!ae.disabled
        });
        if (!r) {
          var ac;
          r = {};
          for (ac in O) {
            if (O[ac] instanceof Array) {
              r[ac] = O[ac].slice(0)
            } else {
              r[ac] = O[ac]
            }
          }
        }
        if (!W || !W.length || !W.filter(function (ae) {
            return ae.values.length
          }).length) {
          b.utils.noData(M, Q);
          return M
        } else {
          Q.selectAll(".z-noData").remove()
        }
        B = A.xScale();
        w = A.yScale();
        var R = Q.selectAll("g.z-wrap.z-multiBarWithLegend").data([W]);
        var y = R.enter().append("g").attr("class", "nvd3 z-wrap z-multiBarWithLegend").append("g");
        var X = R.select("g");
        y.append("g").attr("class", "z-x z-axis");
        y.append("g").attr("class", "z-y z-axis");
        y.append("g").attr("class", "z-barsWrap");
        y.append("g").attr("class", "z-legendWrap");
        y.append("g").attr("class", "z-controlsWrap");
        y.append("g").attr("class", "z-interactive");
        if (!n) {
          X.select(".z-legendWrap").selectAll("*").remove()
        } else {
          if (I === "bottom") {
            C.width(ad - h.right);
            X.select(".z-legendWrap").datum(W).call(C);
            h.bottom = o.height() + C.height();
            S = b.utils.availableHeight(d, Q, h);
            X.select(".z-legendWrap").attr("transform", "translate(0," + (S + o.height()) + ")")
          } else {
            C.width(ad - F());
            X.select(".z-legendWrap").datum(W).call(C);
            if (!D && C.height() !== h.top) {
              h.top = C.height();
              S = b.utils.availableHeight(d, Q, h)
            }
            X.select(".z-legendWrap").attr("transform", "translate(" + F() + "," + (-h.top) + ")")
          }
        }
        if (!i) {
          X.select(".z-controlsWrap").selectAll("*").remove()
        } else {
          var aa = [{key: t.grouped || "Grouped", disabled: A.stacked()}, {
            key: t.stacked || "Stacked",
            disabled: !A.stacked()
          }];
          q.width(F()).color(["#444", "#444", "#444"]);
          X.select(".z-controlsWrap").datum(aa).attr("transform", "translate(0," + (-h.top) + ")").call(q)
        }
        R.attr("transform", "translate(" + h.left + "," + h.top + ")");
        if (K) {
          X.select(".z-y.z-axis").attr("transform", "translate(" + ad + ",0)")
        }
        A.disabled(W.map(function (ae) {
          return ae.disabled
        })).width(ad).height(S).color(W.map(function (af, ae) {
          return af.color || s(af, ae)
        }).filter(function (af, ae) {
          return !W[ae].disabled
        }));
        var Y = X.select(".z-barsWrap").datum(W.filter(function (ae) {
          return !ae.disabled
        }));
        Y.call(A);
        if (f) {
          o.scale(B)._ticks(b.utils.calcTicksX(ad / 100, W)).tickSize(-S, 0);
          X.select(".z-x.z-axis").attr("transform", "translate(0," + w.range()[0] + ")");
          X.select(".z-x.z-axis").call(o);
          var V = X.select(".z-x.z-axis > g").selectAll("g");
          V.selectAll("line, text").style("opacity", 1);
          if (v) {
            var ab = function (ae, af) {
              return "translate(" + ae + "," + af + ")"
            };
            var P = 5, U = 17;
            V.selectAll("text").attr("transform", function (ag, af, ae) {
              return ab(0, (ae % 2 == 0 ? P : U))
            });
            var T = d3.selectAll(".z-x.z-axis .z-wrap g g text")[0].length;
            X.selectAll(".z-x.z-axis .z-axisMaxMin text").attr("transform", function (af, ae) {
              return ab(0, (ae === 0 || T % 2 !== 0) ? U : P)
            })
          }
          if (L) {
            X.selectAll(".tick text").call(b.utils.wrapTicks, M.xAxis.rangeBand())
          }
          if (g) {
            V.filter(function (af, ae) {
              return ae % Math.ceil(W[0].values.length / (ad / 100)) !== 0
            }).selectAll("text, line").style("opacity", 0)
          }
          if (m) {
            V.selectAll(".tick text").attr("transform", "rotate(" + m + " 0,0)").style("text-anchor", m > 0 ? "start" : "end")
          }
          X.select(".z-x.z-axis").selectAll("g.z-axisMaxMin text").style("opacity", 1)
        }
        if (G) {
          l.scale(w)._ticks(b.utils.calcTicksY(S / 36, W)).tickSize(-ad, 0);
          X.select(".z-y.z-axis").call(l)
        }
        if (e) {
          H.width(ad).height(S).margin({left: h.left, top: h.top}).svgContainer(Q).xScale(B);
          R.select(".z-interactive").call(H)
        }
        C.dispatch.on("stateChange", function (af) {
          for (var ae in af) {
            O[ae] = af[ae]
          }
          E.stateChange(O);
          M.update()
        });
        q.dispatch.on("legendClick", function (af, ae) {
          if (!af.disabled) {
            return
          }
          aa = aa.map(function (ag) {
            ag.disabled = true;
            return ag
          });
          af.disabled = false;
          switch (af.key) {
            case"Grouped":
            case t.grouped:
              A.stacked(false);
              break;
            case"Stacked":
            case t.stacked:
              A.stacked(true);
              break
          }
          O.stacked = A.stacked();
          E.stateChange(O);
          M.update()
        });
        E.on("changeState", function (ae) {
          if (typeof ae.disabled !== "undefined") {
            W.forEach(function (ag, af) {
              ag.disabled = ae.disabled[af]
            });
            O.disabled = ae.disabled
          }
          if (typeof ae.stacked !== "undefined") {
            A.stacked(ae.stacked);
            O.stacked = ae.stacked;
            J = ae.stacked
          }
          M.update()
        });
        if (e) {
          H.dispatch.on("elementMousemove", function (aj) {
            if (aj.pointXValue == undefined) {
              return
            }
            var ai, ah, ae, af, ag = [];
            W.filter(function (al, ak) {
              al.seriesIndex = ak;
              return !al.disabled
            }).forEach(function (am, al) {
              ah = B.domain().indexOf(aj.pointXValue);
              var ak = am.values[ah];
              if (ak === undefined) {
                return
              }
              af = ak.x;
              if (ai === undefined) {
                ai = ak
              }
              if (ae === undefined) {
                ae = aj.mouseX
              }
              ag.push({key: am.key, value: M.y()(ak, ah), color: s(am, am.seriesIndex), data: am.values[ah]})
            });
            H.tooltip.data({value: af, index: ah, series: ag})();
            H.renderGuideLine(ae)
          });
          H.dispatch.on("elementMouseout", function (ae) {
            H.tooltip.hidden(true)
          })
        } else {
          A.dispatch.on("elementMouseover.tooltip", function (ae) {
            ae.value = M.x()(ae.data);
            ae["series"] = {key: ae.data.key, value: M.y()(ae.data), color: ae.color};
            u.data(ae).hidden(false)
          });
          A.dispatch.on("elementMouseout.tooltip", function (ae) {
            u.hidden(true)
          });
          A.dispatch.on("elementMousemove.tooltip", function (ae) {
            u()
          })
        }
      });
      z.renderEnd("multibarchart immediate");
      return M
    }

    M.dispatch = E;
    M.multibar = A;
    M.legend = C;
    M.controls = q;
    M.xAxis = o;
    M.yAxis = l;
    M.state = O;
    M.tooltip = u;
    M.interactiveLayer = H;
    M.options = b.utils.optionsFunc.bind(M);
    M._options = Object.create({}, {
      width: {
        get: function () {
          return c
        }, set: function (x) {
          c = x
        }
      }, height: {
        get: function () {
          return d
        }, set: function (x) {
          d = x
        }
      }, showLegend: {
        get: function () {
          return n
        }, set: function (x) {
          n = x
        }
      }, legendPosition: {
        get: function () {
          return I
        }, set: function (x) {
          I = x
        }
      }, showControls: {
        get: function () {
          return i
        }, set: function (x) {
          i = x
        }
      }, controlLabels: {
        get: function () {
          return t
        }, set: function (x) {
          t = x
        }
      }, showXAxis: {
        get: function () {
          return f
        }, set: function (x) {
          f = x
        }
      }, showYAxis: {
        get: function () {
          return G
        }, set: function (x) {
          G = x
        }
      }, defaultState: {
        get: function () {
          return r
        }, set: function (x) {
          r = x
        }
      }, noData: {
        get: function () {
          return k
        }, set: function (x) {
          k = x
        }
      }, reduceXTicks: {
        get: function () {
          return g
        }, set: function (x) {
          g = x
        }
      }, rotateLabels: {
        get: function () {
          return m
        }, set: function (x) {
          m = x
        }
      }, staggerLabels: {
        get: function () {
          return v
        }, set: function (x) {
          v = x
        }
      }, wrapLabels: {
        get: function () {
          return L
        }, set: function (x) {
          L = !!x
        }
      }, margin: {
        get: function () {
          return h
        }, set: function (x) {
          if (x.top !== undefined) {
            h.top = x.top;
            D = x.top
          }
          h.right = x.right !== undefined ? x.right : h.right;
          h.bottom = x.bottom !== undefined ? x.bottom : h.bottom;
          h.left = x.left !== undefined ? x.left : h.left
        }
      }, duration: {
        get: function () {
          return p
        }, set: function (x) {
          p = x;
          A.duration(p);
          o.duration(p);
          l.duration(p);
          z.reset(p)
        }
      }, color: {
        get: function () {
          return s
        }, set: function (x) {
          s = b.utils.getColor(x);
          C.color(s)
        }
      }, rightAlignYAxis: {
        get: function () {
          return K
        }, set: function (x) {
          K = x;
          l.orient(K ? "right" : "left")
        }
      }, useInteractiveGuideline: {
        get: function () {
          return e
        }, set: function (x) {
          e = x
        }
      }, barColor: {
        get: function () {
          return A.barColor
        }, set: function (x) {
          A.barColor(x);
          C.color(function (P, y) {
            return d3.rgb("#ccc").darker(y * 1.5).toString()
          })
        }
      }
    });
    b.utils.inheritOptions(M, A);
    b.utils.initOptions(M);
    return M
  };
  b.models.pie = function () {
    var n = {top: 0, right: 0, bottom: 0, left: 0}, u = 500, o = 500, A = function (G) {
        return G.x
      }, z = function (G) {
        return G.y
      }, r = Math.floor(Math.random() * 10000), k = null, v = b.utils.defaultColor(), h = d3.format(",.2f"), q = true,
      C = false, E = "key", w = 0.02, i = false, F = false, B = true, e = 0, d = false, x = false, j = false, t = false,
      f = 0, l = 0.5, c = 250, s = [],
      D = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "elementMousemove", "renderEnd");
    var y = [];
    var p = [];
    var g = b.utils.renderWatch(D);

    function m(G) {
      g.reset();
      G.each(function (ak) {
        var I = u - n.left - n.right, M = o - n.top - n.bottom, P = Math.min(I, M) / 2, O = [], N = [];
        k = d3.select(this);
        if (s.length === 0) {
          var H = P - P / 10;
          var aj = l * P;
          for (var aa = 0; aa < ak[0].length; aa++) {
            O.push(H);
            N.push(aj)
          }
        } else {
          if (B) {
            O = s.map(function (ae) {
              return (ae.outer - ae.outer / 10) * P
            });
            N = s.map(function (ae) {
              return (ae.inner - ae.inner / 10) * P
            });
            l = d3.min(s.map(function (ae) {
              return (ae.inner - ae.inner / 10)
            }))
          } else {
            O = s.map(function (ae) {
              return ae.outer * P
            });
            N = s.map(function (ae) {
              return ae.inner * P
            });
            l = d3.min(s.map(function (ae) {
              return ae.inner
            }))
          }
        }
        b.utils.initSVG(k);
        var W = k.selectAll(".z-wrap.z-pie").data(ak);
        var R = W.enter().append("g").attr("class", "nvd3 z-wrap z-pie z-chart-" + r);
        var Z = R.append("g");
        var ab = W.select("g");
        var Q = Z.append("g").attr("class", "z-pie");
        Z.append("g").attr("class", "z-pieLabels");
        W.attr("transform", "translate(" + n.left + "," + n.top + ")");
        ab.select(".z-pie").attr("transform", "translate(" + I / 2 + "," + M / 2 + ")");
        ab.select(".z-pieLabels").attr("transform", "translate(" + I / 2 + "," + M / 2 + ")");
        k.on("click", function (al, ae) {
          D.chartClick({data: al, index: ae, pos: d3.event, id: r})
        });
        y = [];
        p = [];
        for (var aa = 0; aa < ak[0].length; aa++) {
          var U = d3.svg.arc().outerRadius(O[aa]);
          var ad = d3.svg.arc().outerRadius(O[aa] + 5);
          if (x !== false) {
            U.startAngle(x);
            ad.startAngle(x)
          }
          if (t !== false) {
            U.endAngle(t);
            ad.endAngle(t)
          }
          if (i) {
            U.innerRadius(N[aa]);
            ad.innerRadius(N[aa])
          }
          if (U.cornerRadius && f) {
            U.cornerRadius(f);
            ad.cornerRadius(f)
          }
          y.push(U);
          p.push(ad)
        }
        var X = d3.layout.pie().sort(null).value(function (ae) {
          return ae.disabled ? 0 : z(ae)
        });
        if (X.padAngle && j) {
          X.padAngle(j)
        }
        if (i && F) {
          Q.append("text").attr("class", "z-pie-title");
          W.select(".z-pie-title").style("text-anchor", "middle").text(function (ae) {
            return F
          }).style("font-size", (Math.min(I, M)) * l * 2 / (F.length + 2) + "px").attr("dy", "0.35em").attr("transform", function (al, ae) {
            return "translate(0, " + e + ")"
          })
        }
        var K = W.select(".z-pie").selectAll(".z-slice").data(X);
        var J = W.select(".z-pieLabels").selectAll(".z-label").data(X);
        K.exit().remove();
        J.exit().remove();
        var ag = K.enter().append("g");
        ag.attr("class", "z-slice");
        ag.on("mouseover", function (al, ae) {
          d3.select(this).classed("hover", true);
          if (B) {
            d3.select(this).select("path").transition().duration(70).attr("d", p[ae])
          }
          D.elementMouseover({
            data: al.data,
            index: ae,
            color: d3.select(this).style("fill"),
            percent: (al.endAngle - al.startAngle) / (2 * Math.PI)
          })
        });
        ag.on("mouseout", function (al, ae) {
          d3.select(this).classed("hover", false);
          if (B) {
            d3.select(this).select("path").transition().duration(50).attr("d", y[ae])
          }
          D.elementMouseout({data: al.data, index: ae})
        });
        ag.on("mousemove", function (al, ae) {
          D.elementMousemove({data: al.data, index: ae})
        });
        ag.on("click", function (am, al) {
          var ae = this;
          D.elementClick({data: am.data, index: al, color: d3.select(this).style("fill"), event: d3.event, element: ae})
        });
        ag.on("dblclick", function (al, ae) {
          D.elementDblClick({data: al.data, index: ae, color: d3.select(this).style("fill")})
        });
        K.attr("fill", function (al, ae) {
          return v(al.data, ae)
        });
        K.attr("stroke", function (al, ae) {
          return v(al.data, ae)
        });
        var Y = ag.append("path").each(function (ae) {
          this._current = ae
        });
        K.select("path").transition().duration(c).attr("d", function (al, ae) {
          return y[ae](al)
        }).attrTween("d", L);
        if (q) {
          var S = [];
          for (var aa = 0; aa < ak[0].length; aa++) {
            S.push(y[aa]);
            if (C) {
              if (i) {
                S[aa] = d3.svg.arc().outerRadius(y[aa].outerRadius());
                if (x !== false) {
                  S[aa].startAngle(x)
                }
                if (t !== false) {
                  S[aa].endAngle(t)
                }
              }
            } else {
              if (!i) {
                S[aa].innerRadius(0)
              }
            }
          }
          J.enter().append("g").classed("z-label", true).each(function (am, ae) {
            var al = d3.select(this);
            al.attr("transform", function (ap, ao) {
              if (d) {
                ap.outerRadius = O[ao] + 10;
                ap.innerRadius = O[ao] + 15;
                var an = (ap.startAngle + ap.endAngle) / 2 * (180 / Math.PI);
                if ((ap.startAngle + ap.endAngle) / 2 < Math.PI) {
                  an -= 90
                } else {
                  an += 90
                }
                return "translate(" + S[ao].centroid(ap) + ") rotate(" + an + ")"
              } else {
                ap.outerRadius = P + 10;
                ap.innerRadius = P + 15;
                return "translate(" + S[ao].centroid(ap) + ")"
              }
            });
            al.append("rect").style("stroke", "#fff").style("fill", "#fff").attr("rx", 3).attr("ry", 3);
            al.append("text").style("text-anchor", d ? ((am.startAngle + am.endAngle) / 2 < Math.PI ? "start" : "end") : "middle").style("fill", "#000")
          });
          var V = {};
          var ai = 14;
          var T = 140;
          var ah = function (ae) {
            return Math.floor(ae[0] / T) * T + "," + Math.floor(ae[1] / ai) * ai
          };
          var af = function (ae) {
            return (ae.endAngle - ae.startAngle) / (2 * Math.PI)
          };
          J.watchTransition(g, "pie labels").attr("transform", function (ap, am) {
            if (d) {
              ap.outerRadius = O[am] + 10;
              ap.innerRadius = O[am] + 15;
              var al = (ap.startAngle + ap.endAngle) / 2 * (180 / Math.PI);
              if ((ap.startAngle + ap.endAngle) / 2 < Math.PI) {
                al -= 90
              } else {
                al += 90
              }
              return "translate(" + S[am].centroid(ap) + ") rotate(" + al + ")"
            } else {
              ap.outerRadius = P + 10;
              ap.innerRadius = P + 15;
              var ae = S[am].centroid(ap);
              var ao = af(ap);
              if (ap.value && ao >= w) {
                var an = ah(ae);
                if (V[an]) {
                  ae[1] -= ai
                }
                V[ah(ae)] = true
              }
              return "translate(" + ae + ")"
            }
          });
          J.select(".z-label text").style("text-anchor", function (al, ae) {
            return d ? ((al.startAngle + al.endAngle) / 2 < Math.PI ? "start" : "end") : "middle"
          }).text(function (an, al) {
            var am = af(an);
            var ae = "";
            if (!an.value || am < w) {
              return ""
            }
            if (typeof E === "function") {
              ae = E(an, al, {"key": A(an.data), "value": z(an.data), "percent": h(am)})
            } else {
              switch (E) {
                case"key":
                  ae = A(an.data);
                  break;
                case"value":
                  ae = h(z(an.data));
                  break;
                case"percent":
                  ae = d3.format("%")(am);
                  break
              }
            }
            return ae
          })
        }

        function ac(al) {
          var ae = (al.startAngle + al.endAngle) * 90 / Math.PI - 90;
          return ae > 90 ? ae - 180 : ae
        }

        function L(al, ae) {
          al.endAngle = isNaN(al.endAngle) ? 0 : al.endAngle;
          al.startAngle = isNaN(al.startAngle) ? 0 : al.startAngle;
          if (!i) {
            al.innerRadius = 0
          }
          var am = d3.interpolate(this._current, al);
          this._current = am(0);
          return function (an) {
            return y[ae](am(an))
          }
        }
      });
      g.renderEnd("pie immediate");
      return m
    }

    m.dispatch = D;
    m.options = b.utils.optionsFunc.bind(m);
    m._options = Object.create({}, {
      arcsRadius: {
        get: function () {
          return s
        }, set: function (G) {
          s = G
        }
      }, width: {
        get: function () {
          return u
        }, set: function (G) {
          u = G
        }
      }, height: {
        get: function () {
          return o
        }, set: function (G) {
          o = G
        }
      }, showLabels: {
        get: function () {
          return q
        }, set: function (G) {
          q = G
        }
      }, title: {
        get: function () {
          return F
        }, set: function (G) {
          F = G
        }
      }, titleOffset: {
        get: function () {
          return e
        }, set: function (G) {
          e = G
        }
      }, labelThreshold: {
        get: function () {
          return w
        }, set: function (G) {
          w = G
        }
      }, valueFormat: {
        get: function () {
          return h
        }, set: function (G) {
          h = G
        }
      }, x: {
        get: function () {
          return A
        }, set: function (G) {
          A = G
        }
      }, id: {
        get: function () {
          return r
        }, set: function (G) {
          r = G
        }
      }, endAngle: {
        get: function () {
          return t
        }, set: function (G) {
          t = G
        }
      }, startAngle: {
        get: function () {
          return x
        }, set: function (G) {
          x = G
        }
      }, padAngle: {
        get: function () {
          return j
        }, set: function (G) {
          j = G
        }
      }, cornerRadius: {
        get: function () {
          return f
        }, set: function (G) {
          f = G
        }
      }, donutRatio: {
        get: function () {
          return l
        }, set: function (G) {
          l = G
        }
      }, labelsOutside: {
        get: function () {
          return C
        }, set: function (G) {
          C = G
        }
      }, labelSunbeamLayout: {
        get: function () {
          return d
        }, set: function (G) {
          d = G
        }
      }, donut: {
        get: function () {
          return i
        }, set: function (G) {
          i = G
        }
      }, growOnHover: {
        get: function () {
          return B
        }, set: function (G) {
          B = G
        }
      }, pieLabelsOutside: {
        get: function () {
          return C
        }, set: function (G) {
          C = G;
          b.deprecated("pieLabelsOutside", "use labelsOutside instead")
        }
      }, donutLabelsOutside: {
        get: function () {
          return C
        }, set: function (G) {
          C = G;
          b.deprecated("donutLabelsOutside", "use labelsOutside instead")
        }
      }, labelFormat: {
        get: function () {
          return h
        }, set: function (G) {
          h = G;
          b.deprecated("labelFormat", "use valueFormat instead")
        }
      }, margin: {
        get: function () {
          return n
        }, set: function (G) {
          n.top = typeof G.top != "undefined" ? G.top : n.top;
          n.right = typeof G.right != "undefined" ? G.right : n.right;
          n.bottom = typeof G.bottom != "undefined" ? G.bottom : n.bottom;
          n.left = typeof G.left != "undefined" ? G.left : n.left
        }
      }, duration: {
        get: function () {
          return c
        }, set: function (G) {
          c = G;
          g.reset(c)
        }
      }, y: {
        get: function () {
          return z
        }, set: function (G) {
          z = d3.functor(G)
        }
      }, color: {
        get: function () {
          return v
        }, set: function (G) {
          v = b.utils.getColor(G)
        }
      }, labelType: {
        get: function () {
          return E
        }, set: function (G) {
          E = G || "key"
        }
      }
    });
    b.utils.initOptions(m);
    return m
  };
  b.models.pieChart = function () {
    var n = b.models.pie();
    var d = b.models.legend();
    var g = b.models.tooltip();
    var p = {top: 30, right: 20, bottom: 20, left: 20}, e = null, r = null, q = null, m = false, u = true, l = "top",
      s = b.utils.defaultColor(), h = b.utils.state(), i = null, f = null, c = 250,
      v = d3.dispatch("stateChange", "changeState", "renderEnd");
    g.duration(0).headerEnabled(false).valueFormatter(function (x, w) {
      return n.valueFormat()(x, w)
    });
    var j = b.utils.renderWatch(v);
    var k = function (w) {
      return function () {
        return {
          active: w.map(function (x) {
            return !x.disabled
          })
        }
      }
    };
    var t = function (w) {
      return function (x) {
        if (x.active !== undefined) {
          w.forEach(function (z, y) {
            z.disabled = !x.active[y]
          })
        }
      }
    };

    function o(w) {
      j.reset();
      j.models(n);
      w.each(function (B) {
        var y = d3.select(this);
        b.utils.initSVG(y);
        var D = this;
        var H = b.utils.availableWidth(r, y, p), A = b.utils.availableHeight(q, y, p);
        o.update = function () {
          y.transition().call(o)
        };
        o.container = this;
        h.setter(t(B), o.update).getter(k(B)).update();
        h.disabled = B.map(function (I) {
          return !!I.disabled
        });
        if (!i) {
          var F;
          i = {};
          for (F in h) {
            if (h[F] instanceof Array) {
              i[F] = h[F].slice(0)
            } else {
              i[F] = h[F]
            }
          }
        }
        if (!B || !B.length) {
          b.utils.noData(o, y);
          return o
        } else {
          y.selectAll(".z-noData").remove()
        }
        var z = y.selectAll("g.z-wrap.z-pieChart").data([B]);
        var x = z.enter().append("g").attr("class", "nvd3 z-wrap z-pieChart").append("g");
        var C = z.select("g");
        x.append("g").attr("class", "z-pieWrap");
        x.append("g").attr("class", "z-legendWrap");
        if (!u) {
          C.select(".z-legendWrap").selectAll("*").remove()
        } else {
          if (l === "top") {
            d.width(H).key(n.x());
            z.select(".z-legendWrap").datum(B).call(d);
            if (!e && d.height() !== p.top) {
              p.top = d.height();
              A = b.utils.availableHeight(q, y, p)
            }
            z.select(".z-legendWrap").attr("transform", "translate(0," + (-p.top) + ")")
          } else {
            if (l === "right") {
              var G = b.models.legend().width();
              if (H / 2 < G) {
                G = (H / 2)
              }
              d.height(A).key(n.x());
              d.width(G);
              H -= d.width();
              z.select(".z-legendWrap").datum(B).call(d).attr("transform", "translate(" + (H) + ",0)")
            } else {
              if (l === "bottom") {
                d.width(H).key(n.x());
                z.select(".z-legendWrap").datum(B).call(d);
                p.bottom = d.height();
                A = b.utils.availableHeight(q, y, p);
                z.select(".z-legendWrap").attr("transform", "translate(0," + A + ")")
              }
            }
          }
        }
        z.attr("transform", "translate(" + p.left + "," + p.top + ")");
        n.width(H).height(A);
        var E = C.select(".z-pieWrap").datum([B]);
        d3.transition(E).call(n);
        d.dispatch.on("stateChange", function (J) {
          for (var I in J) {
            h[I] = J[I]
          }
          v.stateChange(h);
          o.update()
        });
        v.on("changeState", function (I) {
          if (typeof I.disabled !== "undefined") {
            B.forEach(function (K, J) {
              K.disabled = I.disabled[J]
            });
            h.disabled = I.disabled
          }
          o.update()
        })
      });
      j.renderEnd("pieChart immediate");
      return o
    }

    n.dispatch.on("elementMouseover.tooltip", function (w) {
      w["series"] = {key: o.x()(w.data), value: o.y()(w.data), color: w.color, percent: w.percent};
      if (!m) {
        delete w.percent;
        delete w.series.percent
      }
      g.data(w).hidden(false)
    });
    n.dispatch.on("elementMouseout.tooltip", function (w) {
      g.hidden(true)
    });
    n.dispatch.on("elementMousemove.tooltip", function (w) {
      g()
    });
    o.legend = d;
    o.dispatch = v;
    o.pie = n;
    o.tooltip = g;
    o.options = b.utils.optionsFunc.bind(o);
    o._options = Object.create({}, {
      width: {
        get: function () {
          return r
        }, set: function (w) {
          r = w
        }
      }, height: {
        get: function () {
          return q
        }, set: function (w) {
          q = w
        }
      }, noData: {
        get: function () {
          return f
        }, set: function (w) {
          f = w
        }
      }, showTooltipPercent: {
        get: function () {
          return m
        }, set: function (w) {
          m = w
        }
      }, showLegend: {
        get: function () {
          return u
        }, set: function (w) {
          u = w
        }
      }, legendPosition: {
        get: function () {
          return l
        }, set: function (w) {
          l = w
        }
      }, defaultState: {
        get: function () {
          return i
        }, set: function (w) {
          i = w
        }
      }, color: {
        get: function () {
          return s
        }, set: function (w) {
          s = w;
          d.color(s);
          n.color(s)
        }
      }, duration: {
        get: function () {
          return c
        }, set: function (w) {
          c = w;
          j.reset(c);
          n.duration(c)
        }
      }, margin: {
        get: function () {
          return p
        }, set: function (w) {
          if (w.top !== undefined) {
            p.top = w.top;
            e = w.top
          }
          p.right = w.right !== undefined ? w.right : p.right;
          p.bottom = w.bottom !== undefined ? w.bottom : p.bottom;
          p.left = w.left !== undefined ? w.left : p.left
        }
      }
    });
    b.utils.inheritOptions(o, n);
    b.utils.initOptions(o);
    return o
  };
  b.version = "1.0"
})()
