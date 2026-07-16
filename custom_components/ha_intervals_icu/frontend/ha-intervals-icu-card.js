const U = globalThis, V = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = /* @__PURE__ */ Symbol(), et = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ot = (i) => new gt(typeof i == "string" ? i : i + "", void 0, q), Rt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new gt(e, i, q);
}, Dt = (i, t) => {
  if (V) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = U.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, it = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ot(e);
})(i) : i;
const { is: Ut, defineProperty: Ht, getOwnPropertyDescriptor: It, getOwnPropertyNames: zt, getOwnPropertySymbols: jt, getPrototypeOf: Ft } = Object, j = globalThis, st = j.trustedTypes, Lt = st ? st.emptyScript : "", Bt = j.reactiveElementPolyfillSupport, P = (i, t) => i, H = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Lt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, K = (i, t) => !Ut(i, t), rt = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: K };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = rt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Ht(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const a = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...zt(e), ...jt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(it(r));
    } else t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : H;
      this._$Em = r;
      const a = n.fromAttribute(e, o.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? K)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, a = this[r];
        n !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[P("elementProperties")] = /* @__PURE__ */ new Map(), A[P("finalized")] = /* @__PURE__ */ new Map(), Bt?.({ ReactiveElement: A }), (j.reactiveElementVersions ??= []).push("2.1.2");
const G = globalThis, nt = (i) => i, I = G.trustedTypes, ot = I ? I.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ft = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + y, Wt = `<${mt}>`, x = document, T = () => x.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", Z = Array.isArray, Vt = (i) => Z(i) || typeof i?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, ct = />/g, _ = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, dt = /"/g, vt = /^(?:script|style|textarea|title)$/i, $t = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), f = $t(1), W = $t(2), k = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function yt(i, t) {
  if (!Z(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const qt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let p, g, l = -1, u = 0;
    for (; u < c.length && (n.lastIndex = u, g = n.exec(c), g !== null); ) u = n.lastIndex, n === C ? g[1] === "!--" ? n = at : g[1] !== void 0 ? n = ct : g[2] !== void 0 ? (vt.test(g[2]) && (r = RegExp("</" + g[2], "g")), n = _) : g[3] !== void 0 && (n = _) : n === _ ? g[0] === ">" ? (n = r ?? C, l = -1) : g[1] === void 0 ? l = -2 : (l = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? _ : g[3] === '"' ? dt : lt) : n === dt || n === lt ? n = _ : n === at || n === ct ? n = C : (n = _, r = void 0);
    const $ = n === _ && i[a + 1].startsWith("/>") ? " " : "";
    o += n === C ? c + Wt : l >= 0 ? (s.push(p), c.slice(0, l) + ft + c.slice(l) + y + $) : c + y + (l === -2 ? a : $);
  }
  return [yt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, c = this.parts, [p, g] = qt(t, e);
    if (this.el = N.createElement(p, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = b.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ft)) {
          const u = g[n++], $ = r.getAttribute(l).split(y), w = /([.?@])?(.*)/.exec(u);
          c.push({ type: 1, index: o, name: w[2], strings: $, ctor: w[1] === "." ? Gt : w[1] === "?" ? Zt : w[1] === "@" ? Yt : F }), r.removeAttribute(l);
        } else l.startsWith(y) && (c.push({ type: 6, index: o }), r.removeAttribute(l));
        if (vt.test(r.tagName)) {
          const l = r.textContent.split(y), u = l.length - 1;
          if (u > 0) {
            r.textContent = I ? I.emptyScript : "";
            for (let $ = 0; $ < u; $++) r.append(l[$], T()), b.nextNode(), c.push({ type: 2, index: ++o });
            r.append(l[u], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === mt) c.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(y, l + 1)) !== -1; ) c.push({ type: 7, index: o }), l += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  if (t === k) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class Kt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? x).importNode(e, !0);
    b.currentNode = r;
    let o = b.nextNode(), n = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let p;
        c.type === 2 ? p = new D(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new Jt(o, this, t)), this._$AV.push(p), c = s[++a];
      }
      n !== c?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = x, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new Kt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new D(this.O(T()), this.O(T()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = nt(t).nextSibling;
      nt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== k, n && (this._$AH = t);
    else {
      const a = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = E(this, a[s + c], e, c), p === k && (p = this._$AH[c]), n ||= !M(p) || p !== this._$AH[c], p === h ? t = h : t !== h && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Zt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Yt extends F {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? h) === k) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Qt = G.litHtmlPolyfillSupport;
Qt?.(N, D), (G.litHtmlVersions ??= []).push("3.3.3");
const Xt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new D(t.insertBefore(T(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const Y = globalThis;
class S extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
S._$litElement$ = !0, S.finalized = !0, Y.litElementHydrateSupport?.({ LitElement: S });
const te = Y.litElementPolyfillSupport;
te?.({ LitElement: S });
(Y.litElementVersions ??= []).push("4.2.2");
const _t = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const ee = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: K }, ie = (i = ee, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, c, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const c = this[n];
      t.call(this, a), this.requestUpdate(n, c, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(i) {
  return (t, e) => typeof e == "object" ? ie(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function bt(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
const xt = Rt`
  :host{display:block;--icu-green:#70d64b;--icu-orange:#ff991f;--icu-blue:#4d92ef;--icu-purple:#9a70ee}
  ha-card{overflow:hidden;background:linear-gradient(145deg,var(--ha-card-background,var(--card-background-color)),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#102030));border-radius:22px}
  .card-shell{padding:20px;color:var(--primary-text-color)}
  .header,.identity,.sync,.section-title,.feature-meta span,.activity-details span,.info-row{display:flex;align-items:center}
  .header{justify-content:space-between;gap:16px;margin-bottom:14px}.identity{gap:12px}.logo{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#1a66d8,#5aa8ff);color:white;box-shadow:0 8px 24px rgba(42,117,230,.3)}
  .logo ha-icon{--mdc-icon-size:29px}h2{font-size:1.35rem;margin:0}.athlete{color:var(--secondary-text-color);margin-top:2px}.sync{gap:8px;font-size:.82rem;color:var(--secondary-text-color);white-space:nowrap}.dot{width:10px;height:10px;border-radius:50%;background:var(--disabled-text-color)}.dot.good{background:#25b958}.dot.warning{background:#f4b62b}.dot.danger{background:#e24848}
  .metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.metric{position:relative;text-align:center;padding:15px 10px 8px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 90%,transparent);overflow:hidden}.metric-label{font-weight:750;letter-spacing:.04em}.fitness .metric-label,.fitness .metric-value{color:var(--icu-green)}.fatigue .metric-label,.fatigue .metric-value{color:var(--icu-orange)}.form .metric-label,.form .metric-value{color:var(--icu-blue)}.metric-value{font-size:2rem;font-weight:800;line-height:1.1;margin-top:5px}.metric-short,.metric-foot{font-size:.76rem;color:var(--secondary-text-color)}.metric-foot{margin-top:-5px}.gauge{width:min(150px,100%);height:70px;margin:3px auto -7px;display:block}.gauge-track,.gauge-value{fill:none;stroke-width:12;stroke-linecap:round}.gauge-track{stroke:color-mix(in srgb,var(--disabled-text-color) 24%,transparent)}.gauge-value{stroke:var(--icu-green)}.gauge-value.warning{stroke:var(--icu-orange)}.gauge-value.danger{stroke:#ef4545}.gauge-value.neutral{stroke:var(--disabled-text-color)}
  .quick-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:8px}.quick-stats>div{display:flex;justify-content:space-between;gap:8px;padding:11px 13px;border:1px solid var(--divider-color);border-radius:12px}.quick-stats span{font-size:.8rem;color:var(--secondary-text-color)}
  .section{margin-top:12px;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.section-title{gap:8px;text-transform:uppercase;font-size:.82rem;font-weight:750;letter-spacing:.025em}.section-title ha-icon{--mdc-icon-size:20px}.chart-section{min-height:230px}.chart-legend{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:14px;margin:0 0 6px}.chart-legend span{display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--secondary-text-color)}.chart-legend i{width:9px;height:9px;border-radius:50%}.fitness-line{stroke:var(--icu-green);background:var(--icu-green)}.fatigue-line{stroke:var(--icu-orange);background:var(--icu-orange)}.form-line{stroke:var(--icu-blue);background:var(--icu-blue)}.history-chart{width:100%;height:190px;overflow:visible}.grid-line{stroke:var(--divider-color);stroke-width:1}.series{fill:none;stroke-width:3;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}.empty{height:180px;display:grid;place-items:center;color:var(--secondary-text-color)}
  .lower-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.feature{min-width:0;padding:16px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 78%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 75%,transparent)}.feature h3{font-size:1.12rem;margin:18px 0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pill{display:inline-flex;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--icu-blue) 25%,transparent);color:#83b9ff;font-size:.76rem}.pill.purple{background:color-mix(in srgb,var(--icu-purple) 25%,transparent);color:#c5a9ff}.feature-meta{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}.feature-meta span,.activity-details span{gap:5px;font-size:.8rem;color:var(--secondary-text-color)}.feature-meta ha-icon,.activity-details ha-icon,.info-row ha-icon{--mdc-icon-size:17px}.records-card .section-title{margin-bottom:10px}.info-row{gap:8px;padding:9px 0;border-bottom:1px solid var(--divider-color)}.info-row:last-child{border-bottom:0}.info-row span{flex:1;color:var(--secondary-text-color);font-size:.8rem}.info-row strong{font-size:.82rem}.activity-details{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
  .editor{display:grid;gap:14px;padding:8px 0}.editor label{display:grid;gap:6px;color:var(--secondary-text-color);font-size:.82rem}.editor input,.editor select{box-sizing:border-box;width:100%;padding:10px;border-radius:8px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)}.check{display:flex!important;grid-template-columns:auto 1fr!important;align-items:center}.check input{width:auto}
  @media(max-width:760px){.card-shell{padding:14px}.header{align-items:flex-start}.sync{font-size:0}.sync .dot{display:block}.metrics{grid-template-columns:1fr}.metric{display:grid;grid-template-columns:1fr auto;grid-template-areas:"label gauge" "value gauge" "short gauge" "foot gauge";text-align:left;padding:12px 14px}.metric-label{grid-area:label}.metric-value{grid-area:value;font-size:1.65rem}.metric-short{grid-area:short}.metric-foot{grid-area:foot;margin-top:2px}.gauge{grid-area:gauge;width:108px;height:62px;margin:0}.quick-stats{grid-template-columns:1fr}.lower-grid{grid-template-columns:1fr}.chart-section{min-height:180px}.history-chart{height:135px}.chart-legend{justify-content:flex-start}.activity-details{grid-template-columns:1fr 1fr}}
  @media(max-width:420px){.logo{width:40px;height:40px}.header h2{font-size:1.1rem}.quick-stats>div{padding:9px 11px}.feature{padding:14px}}
`, wt = "ha_intervals_icu", d = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",
  plannedTodayName: "planned_today_name",
  plannedTodaySport: "planned_today_sport",
  plannedTodayDuration: "planned_today_duration",
  plannedTodayLoad: "planned_today_load",
  lastActivityName: "last_activity_name",
  lastActivityType: "last_activity_type",
  lastActivityDate: "last_activity_date",
  lastActivityDuration: "last_activity_duration",
  lastActivityLoad: "last_activity_load",
  lastActivityCalories: "last_activity_calories",
  recordDistance: "record_distance",
  recordElevation: "record_elevation",
  recordMaxPower: "record_max_power",
  recordFtp: "record_ftp"
}, At = {
  AlpineSki: "Ski alpin",
  BackcountrySki: "Ski de randonnée",
  Badminton: "Badminton",
  Basketball: "Basket-ball",
  Canoeing: "Canoë",
  Crossfit: "CrossFit",
  CrossFit: "CrossFit",
  Cycling: "Vélo",
  EBikeRide: "VAE",
  Elliptical: "Vélo elliptique",
  GravelRide: "Gravel",
  Handcycle: "Handbike",
  HighIntensityIntervalTraining: "HIIT",
  Hike: "Randonnée",
  IndoorCycling: "Vélo d’intérieur",
  IndoorRide: "Vélo d’intérieur",
  IndoorRun: "Course en intérieur",
  Kayaking: "Kayak",
  MountainBikeRide: "VTT",
  NordicSki: "Ski de fond",
  OpenWaterSwim: "Natation en eau libre",
  OpenWaterSwimming: "Natation en eau libre",
  Other: "Autre",
  Pilates: "Pilates",
  Ride: "Vélo",
  RoadBikeRide: "Vélo de route",
  Rowing: "Rameur",
  Run: "Course à pied",
  Running: "Course à pied",
  Snowboard: "Snowboard",
  Soccer: "Football",
  StairStepper: "Escalier",
  StrengthTraining: "Musculation",
  Swim: "Natation",
  Swimming: "Natation",
  Tennis: "Tennis",
  TrailRun: "Trail",
  VirtualRide: "Vélo virtuel",
  VirtualRun: "Course virtuelle",
  Walk: "Marche",
  Walking: "Marche",
  WeightTraining: "Musculation",
  Workout: "Entraînement",
  Yoga: "Yoga"
};
function ut(i, t, e) {
  return e ? i.entities?.[t]?.device_id === e : !0;
}
function St(i) {
  return Object.values(i.entities ?? {});
}
function se(i, t) {
  if (i.translation_key === t)
    return !0;
  const e = i.unique_id ?? "";
  return e === t || e.endsWith(`_${t}`) || e.endsWith(`-${t}`);
}
function re(i) {
  const t = Math.max(0, Math.round(i)), e = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), r = t % 60;
  return e === 0 ? s === 0 ? `${r} s` : r === 0 ? `${s} min` : `${s} min ${r} s` : `${e} h ${String(s).padStart(2, "0")} min ${String(
    r
  ).padStart(2, "0")} s`;
}
function ne(i) {
  const t = At[i];
  if (t)
    return t;
  const e = i.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return e ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : i;
}
function oe(i) {
  const t = i.attributes.unit_of_measurement, e = i.attributes.translation_key, s = i.entity_id ?? "";
  return t === "s" || e === "planned_today_duration" || e === "last_activity_duration" || s.endsWith("_planned_today_duration") || s.endsWith("_last_activity_duration");
}
function ae(i) {
  const t = i.attributes.translation_key, e = i.entity_id ?? "";
  return t === "planned_today_sport" || t === "last_activity_type" || e.endsWith("_planned_today_sport") || e.endsWith("_last_activity_type") || !!At[i.state];
}
function ce(i) {
  return [...new Set(
    St(i).filter(
      (e) => e.platform === wt && typeof e.device_id == "string"
    ).map((e) => e.device_id)
  )].map((e) => i.devices?.[e]).filter((e) => !!e).sort((e, s) => z(e).localeCompare(z(s)));
}
function z(i) {
  return i?.name_by_user ?? i?.name ?? "Athlète Intervals.icu";
}
function kt(i, t, e, s) {
  if (t && i.states[t] && ut(i, t, s))
    return t;
  const r = St(i).find(
    (n) => n.platform === wt && typeof n.entity_id == "string" && (!s || n.device_id === s) && se(n, e)
  );
  if (r?.entity_id && i.states[r.entity_id])
    return r.entity_id;
  const o = `_${e}`;
  return Object.keys(i.states).find(
    (n) => n.startsWith("sensor.") && n.endsWith(o) && ut(i, n, s)
  );
}
function m(i, t, e, s) {
  const r = kt(i, t, e, s);
  return r ? i.states[r] : void 0;
}
function pt(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state))
    return null;
  const t = Number(i.state);
  return Number.isFinite(t) ? t : null;
}
function v(i, t, e = "—") {
  if (!t || ["unknown", "unavailable", "none", ""].includes(t.state))
    return e;
  if (oe(t)) {
    const s = Number(t.state);
    if (Number.isFinite(s))
      return re(s);
  }
  if (ae(t))
    return ne(t.state);
  try {
    return i.formatEntityState?.(t) ?? `${t.state}${t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return t.state;
  }
}
function B(i) {
  const t = i?.attributes.history;
  return Array.isArray(t) ? t.map((e) => typeof e == "object" && e !== null && "value" in e ? Number(e.value) : Number(e)).filter(Number.isFinite) : [];
}
function le(i) {
  if (!i)
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  const t = new Date(i).getTime();
  if (!Number.isFinite(t))
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  const e = Math.max(
    0,
    Math.floor((Date.now() - t) / 6e4)
  );
  return e < 1 ? {
    label: "Synchronisé à l’instant",
    level: "good"
  } : e < 5 ? {
    label: `Synchronisé il y a ${e} min`,
    level: "good"
  } : e <= 30 ? {
    label: `Synchronisé il y a ${e} min`,
    level: "warning"
  } : {
    label: `Synchronisé il y a ${e} min`,
    level: "danger"
  };
}
function de(i, t, e, s, r) {
  return i.map((o, n) => {
    const a = i.length === 1 ? t / 2 : n / (i.length - 1) * t, c = e - (o - s) / r * (e - 22) - 11;
    return `${a.toFixed(1)},${c.toFixed(1)}`;
  }).join(" ");
}
function he(i) {
  const t = i.filter((u) => u.values.length >= 2);
  if (t.length === 0) return f`<div class="empty">Historique indisponible</div>`;
  const e = 760, s = 220, r = t.flatMap((u) => u.values), o = Math.min(...r), n = Math.max(...r), a = Math.max((n - o) * 0.12, 2), c = o - a, g = n + a - c || 1, l = [0, 1, 2, 3, 4];
  return f`
    <div class="chart-legend">
      ${t.map((u) => f`<span><i class=${u.className}></i>${u.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${e} ${s}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${l.map((u) => {
    const $ = 10 + u / 4 * (s - 20);
    return W`<line class="grid-line" x1="0" y1=${$} x2=${e} y2=${$}></line>`;
  })}
      ${t.map((u) => W`<polyline class="series ${u.className}" points=${de(u.values, e, s, c, g)}></polyline>`)}
    </svg>`;
}
function ue(i, t, e, s) {
  const o = ((i === null ? 0 : Math.min(s, Math.max(e, i))) - e) / (s - e || 1), n = Math.PI * 52, a = Math.max(0, Math.min(n, o * n));
  return f`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${W`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${t}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${a} ${n}"></path>`}
  </svg>`;
}
var pe = Object.defineProperty, ge = Object.getOwnPropertyDescriptor, Q = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ge(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && pe(t, e, r), r;
};
const Et = [
  ["fitness_entity", "Fitness", d.fitness],
  ["fatigue_entity", "Fatigue", d.fatigue],
  ["form_entity", "Forme", d.form],
  ["ftp_entity", "FTP", d.ftp],
  ["weekly_load_entity", "Charge 7 jours", d.weeklyLoad],
  ["weekly_activities_entity", "Activités 7 jours", d.weeklyActivities]
], fe = Et.map(([i]) => i), me = [
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_sync_status", "Afficher l’état de synchronisation"]
];
let O = class extends S {
  setConfig(i) {
    this.config = { ...i };
  }
  emitConfig(i) {
    this.config = i, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: i },
      bubbles: !0,
      composed: !0
    }));
  }
  change(i, t) {
    this.emitConfig({ ...this.config, [i]: t });
  }
  changeDevice(i) {
    const t = { ...this.config, device_id: i || void 0 };
    for (const e of fe) delete t[e];
    this.emitConfig(t);
  }
  render() {
    if (!this.config || !this.hass) return f``;
    const i = ce(this.hass), t = this.config.device_id ?? (i.length === 1 ? i[0].id : ""), e = Object.keys(this.hass.states).filter((s) => s.startsWith("sensor.") && (!t || this.hass.entities?.[s]?.device_id === t)).sort();
    return f`<div class="editor">
      <label>Athlète / appareil
        <select .value=${t} @change=${(s) => this.changeDevice(s.target.value)}>
          <option value="">Sélectionner un athlète</option>
          ${i.map((s) => f`<option value=${s.id}>${z(s)}</option>`)}
        </select>
      </label>
      ${i.length === 0 ? f`<p>Aucun appareil Intervals.icu détecté. Recharge Home Assistant après avoir configuré l’intégration.</p>` : ""}
      <label>Titre<input .value=${this.config.title ?? "Intervals.icu"} @change=${(s) => this.change("title", s.target.value)}></label>
      <label>Nom affiché<input .value=${this.config.athlete_name ?? ""} placeholder="Nom de l’appareil par défaut" @change=${(s) => this.change("athlete_name", s.target.value)}></label>
      ${Et.map(([s, r, o]) => f`<label>${r}<select .value=${String(this.config[s] ?? kt(this.hass, void 0, o, t) ?? "")} @change=${(n) => this.change(s, n.target.value)}><option value="">Détection automatique pour cet athlète</option>${e.map((n) => f`<option value=${n}>${this.hass.states[n].attributes.friendly_name ?? n}</option>`)}</select></label>`)}
      ${me.map(([s, r]) => f`<label class="check"><input type="checkbox" .checked=${this.config[s] !== !1} @change=${(o) => this.change(s, o.target.checked)}>${r}</label>`)}
    </div>`;
  }
};
O.styles = xt;
Q([
  J({ attribute: !1 })
], O.prototype, "hass", 2);
Q([
  bt()
], O.prototype, "config", 2);
O = Q([
  _t("ha-intervals-icu-card-editor")
], O);
var ve = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, X = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? $e(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && ve(t, e, r), r;
};
let R = class extends S {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }
  static getStubConfig() {
    return {
      title: "Intervals.icu",
      show_records: !0,
      show_history: !0,
      show_workout: !0,
      show_last_activity: !0,
      show_sync_status: !0
    };
  }
  setConfig(i) {
    if (!i) throw new Error("Configuration manquante");
    this.config = {
      show_records: !0,
      show_history: !0,
      show_workout: !0,
      show_last_activity: !0,
      show_sync_status: !0,
      ...i
    };
  }
  getCardSize() {
    return 10;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 9, min_rows: 5 };
  }
  state(i, t) {
    return this.hass ? m(this.hass, this.config?.[i], t, this.config?.device_id) : void 0;
  }
  status(i, t) {
    const e = pt(t);
    return e === null ? "neutral" : i === "form" ? e < -20 ? "danger" : e < -10 ? "warning" : "good" : i === "fatigue" ? e >= 80 ? "danger" : e >= 60 ? "warning" : "good" : "good";
  }
  metric(i, t, e, s) {
    const r = pt(s), o = this.status(e, s), n = e === "form" ? -30 : 0, a = e === "form" ? 30 : 100, c = s?.attributes.change_7_days;
    return f`<article class="metric ${e}">
      <div class="metric-label">${i}</div>
      <div class="metric-value">${v(this.hass, s)}</div>
      <div class="metric-short">${t}</div>
      ${ue(r, o, n, a)}
      <div class="metric-foot">7 j ${typeof c == "number" ? `${c > 0 ? "+" : ""}${c.toFixed(1)}` : "—"}</div>
    </article>`;
  }
  infoRow(i, t, e) {
    return f`<div class="info-row"><ha-icon icon=${i}></ha-icon><span>${t}</span><strong>${v(this.hass, e)}</strong></div>`;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const i = this.hass, t = this.state("fitness_entity", d.fitness), e = this.state("fatigue_entity", d.fatigue), s = this.state("form_entity", d.form), r = this.state("ftp_entity", d.ftp), o = this.state("weekly_load_entity", d.weeklyLoad), n = this.state("weekly_activities_entity", d.weeklyActivities), a = this.config.device_id, c = a ? i.devices?.[a] : void 0, p = this.config.athlete_name || z(c), g = m(i, void 0, d.plannedTodayName, a), l = m(i, void 0, d.plannedTodaySport, a), u = m(i, void 0, d.plannedTodayDuration, a), $ = m(i, void 0, d.plannedTodayLoad, a), w = m(i, void 0, d.lastActivityName, a), Ct = m(i, void 0, d.lastActivityType, a), Pt = m(i, void 0, d.lastActivityDate, a), Tt = m(i, void 0, d.lastActivityDuration, a), Mt = m(i, void 0, d.lastActivityLoad, a), Nt = m(i, void 0, d.lastActivityCalories, a), tt = le(t?.last_updated ?? t?.last_changed);
    return f`<ha-card>
      <div class="card-shell">
        <header class="header">
          <div class="identity">
            <div class="logo"><ha-icon icon="mdi:chart-timeline-variant-shimmer"></ha-icon></div>
            <div><h2>${this.config.title ?? "Intervals.icu"}</h2>${p ? f`<div class="athlete">${p}</div>` : h}</div>
          </div>
          ${this.config.show_sync_status !== !1 ? f`<div class="sync"><span class="dot ${tt.level}"></span>${tt.label}</div>` : h}
        </header>

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", t)}
          ${this.metric("FATIGUE", "ATL", "fatigue", e)}
          ${this.metric("FORME", "TSB", "form", s)}
        </section>

        <section class="quick-stats">
          <div><span>FTP</span><strong>${v(i, r)}</strong></div>
          <div><span>Charge 7 j</span><strong>${v(i, o)}</strong></div>
          <div><span>Activités 7 j</span><strong>${v(i, n)}</strong></div>
        </section>

        ${this.config.show_history !== !1 ? f`<section class="section chart-section">
          <div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon><span>Évolution</span></div>
          ${he([
      { label: "Fitness", values: B(t), className: "fitness-line" },
      { label: "Fatigue", values: B(e), className: "fatigue-line" },
      { label: "Forme", values: B(s), className: "form-line" }
    ])}
        </section>` : h}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? f`<article class="feature workout">
            <div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon><span>Aujourd’hui</span></div>
            <h3>${v(i, g, "Aucun entraînement planifié")}</h3>
            <div class="pill">${v(i, l, "Entraînement")}</div>
            <div class="feature-meta"><span><ha-icon icon="mdi:clock-outline"></ha-icon>${v(i, u)}</span><span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${v(i, $)}</span></div>
          </article>` : h}

          ${this.config.show_records !== !1 ? f`<article class="feature records-card">
            <div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon><span>Records</span></div>
            ${this.infoRow("mdi:bike-fast", "FTP", m(i, void 0, d.recordFtp, a))}
            ${this.infoRow("mdi:map-marker-distance", "Distance", m(i, void 0, d.recordDistance, a))}
            ${this.infoRow("mdi:image-filter-hdr", "Dénivelé", m(i, void 0, d.recordElevation, a))}
            ${this.infoRow("mdi:flash", "Puissance max", m(i, void 0, d.recordMaxPower, a))}
          </article>` : h}

          ${this.config.show_last_activity !== !1 ? f`<article class="feature last-activity">
            <div class="section-title"><ha-icon icon="mdi:history"></ha-icon><span>Dernière activité</span></div>
            <h3>${v(i, w)}</h3>
            <div class="pill purple">${v(i, Ct, "Activité")}</div>
            <div class="activity-details">
              <span><ha-icon icon="mdi:calendar-blank-outline"></ha-icon>${v(i, Pt)}</span>
              <span><ha-icon icon="mdi:clock-outline"></ha-icon>${v(i, Tt)}</span>
              <span><ha-icon icon="mdi:fire"></ha-icon>${v(i, Nt)}</span>
              <span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${v(i, Mt)}</span>
            </div>
          </article>` : h}
        </section>
      </div>
    </ha-card>`;
  }
};
R.styles = xt;
X([
  J({ attribute: !1 })
], R.prototype, "hass", 2);
X([
  bt()
], R.prototype, "config", 2);
R = X([
  _t("ha-intervals-icu-card")
], R);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/main/docs/lovelace-card.md"
});
console.info("%c HA Intervals.icu Card %c 1.1.0-beta2 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
