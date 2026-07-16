const U = globalThis, K = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = /* @__PURE__ */ Symbol(), nt = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const It = (i) => new $t(typeof i == "string" ? i : i + "", void 0, G), zt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new $t(e, i, G);
}, jt = (i, t) => {
  if (K) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = U.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, ot = K ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return It(e);
})(i) : i;
const { is: Lt, defineProperty: Ft, getOwnPropertyDescriptor: Bt, getOwnPropertyNames: Wt, getOwnPropertySymbols: qt, getPrototypeOf: Vt } = Object, j = globalThis, at = j.trustedTypes, Kt = at ? at.emptyScript : "", Gt = j.reactiveElementPolyfillSupport, T = (i, t) => i, H = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Kt : null;
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
} }, Z = (i, t) => !Lt(i, t), ct = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Ft(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = Bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const a = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...Wt(e), ...qt(e)];
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
      for (const r of s) e.unshift(ot(r));
    } else t !== void 0 && e.push(ot(t));
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
    return jt(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : H;
      this._$Em = r;
      const a = o.fromAttribute(e, n.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Z)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[T("elementProperties")] = /* @__PURE__ */ new Map(), A[T("finalized")] = /* @__PURE__ */ new Map(), Gt?.({ ReactiveElement: A }), (j.reactiveElementVersions ??= []).push("2.1.2");
const Y = globalThis, lt = (i) => i, I = Y.trustedTypes, dt = I ? I.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, yt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, _t = "?" + y, Zt = `<${_t}>`, w = document, P = () => w.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", J = Array.isArray, Yt = (i) => J(i) || typeof i?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, ut = />/g, _ = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, gt = /"/g, bt = /^(?:script|style|textarea|title)$/i, wt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = wt(1), V = wt(2), k = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), b = w.createTreeWalker(w, 129);
function xt(i, t) {
  if (!J(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Jt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let g, f, l = -1, u = 0;
    for (; u < c.length && (o.lastIndex = u, f = o.exec(c), f !== null); ) u = o.lastIndex, o === C ? f[1] === "!--" ? o = ht : f[1] !== void 0 ? o = ut : f[2] !== void 0 ? (bt.test(f[2]) && (r = RegExp("</" + f[2], "g")), o = _) : f[3] !== void 0 && (o = _) : o === _ ? f[0] === ">" ? (o = r ?? C, l = -1) : f[1] === void 0 ? l = -2 : (l = o.lastIndex - f[2].length, g = f[1], o = f[3] === void 0 ? _ : f[3] === '"' ? gt : pt) : o === gt || o === pt ? o = _ : o === ht || o === ut ? o = C : (o = _, r = void 0);
    const $ = o === _ && i[a + 1].startsWith("/>") ? " " : "";
    n += o === C ? c + Zt : l >= 0 ? (s.push(g), c.slice(0, l) + yt + c.slice(l) + y + $) : c + y + (l === -2 ? a : $);
  }
  return [xt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, c = this.parts, [g, f] = Jt(t, e);
    if (this.el = N.createElement(g, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = b.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(yt)) {
          const u = f[o++], $ = r.getAttribute(l).split(y), x = /([.?@])?(.*)/.exec(u);
          c.push({ type: 1, index: n, name: x[2], strings: $, ctor: x[1] === "." ? Xt : x[1] === "?" ? te : x[1] === "@" ? ee : L }), r.removeAttribute(l);
        } else l.startsWith(y) && (c.push({ type: 6, index: n }), r.removeAttribute(l));
        if (bt.test(r.tagName)) {
          const l = r.textContent.split(y), u = l.length - 1;
          if (u > 0) {
            r.textContent = I ? I.emptyScript : "";
            for (let $ = 0; $ < u; $++) r.append(l[$], P()), b.nextNode(), c.push({ type: 2, index: ++n });
            r.append(l[u], P());
          }
        }
      } else if (r.nodeType === 8) if (r.data === _t) c.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(y, l + 1)) !== -1; ) c.push({ type: 7, index: n }), l += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  if (t === k) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class Qt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? w).importNode(e, !0);
    b.currentNode = r;
    let n = b.nextNode(), o = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let g;
        c.type === 2 ? g = new D(n, n.nextSibling, this, t) : c.type === 1 ? g = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (g = new ie(n, this, t)), this._$AV.push(g), c = s[++a];
      }
      o !== c?.index && (n = b.nextNode(), o++);
    }
    return b.currentNode = w, r;
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
    t = E(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(xt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Qt(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new D(this.O(P()), this.O(P()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = lt(t).nextSibling;
      lt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, e, 0), o = !M(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const a = t;
      let c, g;
      for (t = n[0], c = 0; c < n.length - 1; c++) g = E(this, a[s + c], e, c), g === k && (g = this._$AH[c]), o ||= !M(g) || g !== this._$AH[c], g === h ? t = h : t !== h && (t += (g ?? "") + n[c + 1]), this._$AH[c] = g;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class te extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class ee extends L {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? h) === k) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
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
const se = Y.litHtmlPolyfillSupport;
se?.(N, D), (Y.litHtmlVersions ??= []).push("3.3.3");
const re = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new D(t.insertBefore(P(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const Q = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: S });
const ne = Q.litElementPolyfillSupport;
ne?.({ LitElement: S });
(Q.litElementVersions ??= []).push("4.2.2");
const At = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const oe = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: Z }, ae = (i = oe, t, e) => {
  const { kind: s, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function X(i) {
  return (t, e) => typeof e == "object" ? ae(i, t, e) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, t, e);
}
function St(i) {
  return X({ ...i, state: !0, attribute: !1 });
}
const kt = zt`
  :host{display:block;--icu-green:#70d64b;--icu-orange:#ff991f;--icu-blue:#4d92ef;--icu-purple:#9a70ee}
  ha-card{overflow:hidden;background:linear-gradient(145deg,var(--ha-card-background,var(--card-background-color)),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#102030));border-radius:22px}
  .card-shell{padding:20px;color:var(--primary-text-color)}
  .header,.identity,.sync,.section-title,.feature-meta span,.activity-details span,.info-row,.health-item{display:flex;align-items:center}
  .header{justify-content:space-between;gap:16px;margin-bottom:14px}.identity{gap:12px}.logo{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#1a66d8,#5aa8ff);color:white;box-shadow:0 8px 24px rgba(42,117,230,.3)}
  .logo ha-icon{--mdc-icon-size:29px}h2{font-size:1.35rem;margin:0}.athlete{color:var(--secondary-text-color);margin-top:2px}.sync{gap:8px;font-size:.82rem;color:var(--secondary-text-color);white-space:nowrap}.dot{width:10px;height:10px;border-radius:50%;background:var(--disabled-text-color)}.dot.good{background:#25b958}.dot.warning{background:#f4b62b}.dot.danger{background:#e24848}
  .metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.metric{position:relative;text-align:center;padding:15px 10px 8px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 90%,transparent);overflow:hidden}.metric-label{font-weight:750;letter-spacing:.04em}.fitness .metric-label,.fitness .metric-value{color:var(--icu-green)}.fatigue .metric-label,.fatigue .metric-value{color:var(--icu-orange)}.form .metric-label,.form .metric-value{color:var(--icu-blue)}.metric-value{font-size:2rem;font-weight:800;line-height:1.1;margin-top:5px}.metric-short,.metric-foot{font-size:.76rem;color:var(--secondary-text-color)}.metric-foot{margin-top:-5px}.gauge{width:min(150px,100%);height:70px;margin:3px auto -7px;display:block}.gauge-track,.gauge-value{fill:none;stroke-width:12;stroke-linecap:round}.gauge-track{stroke:color-mix(in srgb,var(--disabled-text-color) 24%,transparent)}.gauge-value{stroke:var(--icu-green)}.gauge-value.warning{stroke:var(--icu-orange)}.gauge-value.danger{stroke:#ef4545}.gauge-value.neutral{stroke:var(--disabled-text-color)}
  .quick-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:8px}.quick-stats>div{display:flex;justify-content:space-between;gap:8px;padding:11px 13px;border:1px solid var(--divider-color);border-radius:12px}.quick-stats span{font-size:.8rem;color:var(--secondary-text-color)}
  .section{margin-top:12px;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.section-title{gap:8px;text-transform:uppercase;font-size:.82rem;font-weight:750;letter-spacing:.025em}.section-title ha-icon{--mdc-icon-size:20px}.chart-section{min-height:230px}.chart-legend{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:14px;margin:0 0 6px}.chart-legend span{display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--secondary-text-color)}.chart-legend i{width:9px;height:9px;border-radius:50%}.fitness-line{stroke:var(--icu-green);background:var(--icu-green)}.fatigue-line{stroke:var(--icu-orange);background:var(--icu-orange)}.form-line{stroke:var(--icu-blue);background:var(--icu-blue)}.history-chart{width:100%;height:190px;overflow:visible}.grid-line{stroke:var(--divider-color);stroke-width:1}.series{fill:none;stroke-width:3;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}.empty{height:180px;display:grid;place-items:center;color:var(--secondary-text-color)}
  .health-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.health-item{gap:10px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 76%,transparent)}.health-item ha-icon{--mdc-icon-size:22px;color:var(--icu-blue)}.health-item div{display:grid;gap:2px}.health-item span{font-size:.75rem;color:var(--secondary-text-color)}.health-item strong{font-size:.96rem}
  .lower-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.feature{min-width:0;padding:16px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 78%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 75%,transparent)}.feature h3{font-size:1.12rem;margin:18px 0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pill{display:inline-flex;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--icu-blue) 25%,transparent);color:#83b9ff;font-size:.76rem}.pill.purple{background:color-mix(in srgb,var(--icu-purple) 25%,transparent);color:#c5a9ff}.feature-meta{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}.feature-meta span,.activity-details span{gap:5px;font-size:.8rem;color:var(--secondary-text-color)}.feature-meta ha-icon,.activity-details ha-icon,.info-row ha-icon{--mdc-icon-size:17px}.records-card .section-title{margin-bottom:10px}.info-row{gap:8px;padding:9px 0;border-bottom:1px solid var(--divider-color)}.info-row:last-child{border-bottom:0}.info-row span{flex:1;color:var(--secondary-text-color);font-size:.8rem}.info-row strong{font-size:.82rem}.activity-details{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
  .editor{display:grid;gap:14px;padding:8px 0}.editor label{display:grid;gap:6px;color:var(--secondary-text-color);font-size:.82rem}.editor input,.editor select{box-sizing:border-box;width:100%;padding:10px;border-radius:8px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)}.check{display:flex!important;grid-template-columns:auto 1fr!important;align-items:center}.check input{width:auto}
  @media(max-width:760px){.card-shell{padding:14px}.header{align-items:flex-start}.sync{font-size:0}.sync .dot{display:block}.metrics{grid-template-columns:1fr}.metric{display:grid;grid-template-columns:1fr auto;grid-template-areas:"label gauge" "value gauge" "short gauge" "foot gauge";text-align:left;padding:12px 14px}.metric-label{grid-area:label}.metric-value{grid-area:value;font-size:1.65rem}.metric-short{grid-area:short}.metric-foot{grid-area:foot;margin-top:2px}.gauge{grid-area:gauge;width:108px;height:62px;margin:0}.quick-stats{grid-template-columns:1fr}.health-grid{grid-template-columns:1fr 1fr}.lower-grid{grid-template-columns:1fr}.chart-section{min-height:180px}.history-chart{height:135px}.chart-legend{justify-content:flex-start}.activity-details{grid-template-columns:1fr 1fr}}
  @media(max-width:420px){.logo{width:40px;height:40px}.header h2{font-size:1.1rem}.quick-stats>div{padding:9px 11px}.health-grid{grid-template-columns:1fr}.feature{padding:14px}}
`, Et = "ha_intervals_icu", d = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",
  weight: "weight",
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
}, Ct = {
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
function mt(i, t, e) {
  return e ? i.entities?.[t]?.device_id === e : !0;
}
function Tt(i) {
  return Object.values(i.entities ?? {});
}
function ce(i, t) {
  if (i.translation_key === t)
    return !0;
  const e = i.unique_id ?? "";
  return e === t || e.endsWith(`_${t}`) || e.endsWith(`-${t}`);
}
function le(i) {
  const t = Math.max(0, Math.round(i)), e = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), r = t % 60;
  return e === 0 ? s === 0 ? `${r} s` : r === 0 ? `${s} min` : `${s} min ${r} s` : `${e} h ${String(s).padStart(2, "0")} min ${String(
    r
  ).padStart(2, "0")} s`;
}
function de(i) {
  const t = Ct[i];
  if (t)
    return t;
  const e = i.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return e ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : i;
}
function he(i) {
  const t = i.attributes.unit_of_measurement, e = i.attributes.translation_key, s = i.entity_id ?? "";
  return t === "s" || e === "planned_today_duration" || e === "last_activity_duration" || s.endsWith("_planned_today_duration") || s.endsWith("_last_activity_duration");
}
function ue(i) {
  const t = i.attributes.translation_key, e = i.entity_id ?? "";
  return t === "planned_today_sport" || t === "last_activity_type" || e.endsWith("_planned_today_sport") || e.endsWith("_last_activity_type") || !!Ct[i.state];
}
function pe(i) {
  return [...new Set(
    Tt(i).filter(
      (e) => e.platform === Et && typeof e.device_id == "string"
    ).map((e) => e.device_id)
  )].map((e) => i.devices?.[e]).filter((e) => !!e).sort((e, s) => z(e).localeCompare(z(s)));
}
function z(i) {
  return i?.name_by_user ?? i?.name ?? "Athlète Intervals.icu";
}
function Pt(i, t, e, s) {
  if (t && i.states[t] && mt(i, t, s))
    return t;
  const r = Tt(i).find(
    (o) => o.platform === Et && typeof o.entity_id == "string" && (!s || o.device_id === s) && ce(o, e)
  );
  if (r?.entity_id && i.states[r.entity_id])
    return r.entity_id;
  const n = `_${e}`;
  return Object.keys(i.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(n) && mt(i, o, s)
  );
}
function m(i, t, e, s) {
  const r = Pt(i, t, e, s);
  return r ? i.states[r] : void 0;
}
function vt(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state))
    return null;
  const t = Number(i.state);
  return Number.isFinite(t) ? t : null;
}
function v(i, t, e = "—") {
  if (!t || ["unknown", "unavailable", "none", ""].includes(t.state))
    return e;
  if (he(t)) {
    const s = Number(t.state);
    if (Number.isFinite(s))
      return le(s);
  }
  if (ue(t))
    return de(t.state);
  try {
    return i.formatEntityState?.(t) ?? `${t.state}${t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return t.state;
  }
}
function q(i) {
  const t = i?.attributes.history;
  return Array.isArray(t) ? t.map((e) => typeof e == "object" && e !== null && "value" in e ? Number(e.value) : Number(e)).filter(Number.isFinite) : [];
}
function ge(i) {
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
function fe(i, t, e, s, r) {
  return i.map((n, o) => {
    const a = i.length === 1 ? t / 2 : o / (i.length - 1) * t, c = e - (n - s) / r * (e - 22) - 11;
    return `${a.toFixed(1)},${c.toFixed(1)}`;
  }).join(" ");
}
function me(i) {
  const t = i.filter((u) => u.values.length >= 2);
  if (t.length === 0) return p`<div class="empty">Historique indisponible</div>`;
  const e = 760, s = 220, r = t.flatMap((u) => u.values), n = Math.min(...r), o = Math.max(...r), a = Math.max((o - n) * 0.12, 2), c = n - a, f = o + a - c || 1, l = [0, 1, 2, 3, 4];
  return p`
    <div class="chart-legend">
      ${t.map((u) => p`<span><i class=${u.className}></i>${u.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${e} ${s}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${l.map((u) => {
    const $ = 10 + u / 4 * (s - 20);
    return V`<line class="grid-line" x1="0" y1=${$} x2=${e} y2=${$}></line>`;
  })}
      ${t.map((u) => V`<polyline class="series ${u.className}" points=${fe(u.values, e, s, c, f)}></polyline>`)}
    </svg>`;
}
function ve(i, t, e, s) {
  const n = ((i === null ? 0 : Math.min(s, Math.max(e, i))) - e) / (s - e || 1), o = Math.PI * 52, a = Math.max(0, Math.min(o, n * o));
  return p`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${V`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${t}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${a} ${o}"></path>`}
  </svg>`;
}
var $e = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, tt = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ye(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && $e(t, e, r), r;
};
const Mt = [
  ["fitness_entity", "Fitness", d.fitness],
  ["fatigue_entity", "Fatigue", d.fatigue],
  ["form_entity", "Forme", d.form],
  ["ftp_entity", "FTP", d.ftp],
  ["weekly_load_entity", "Charge 7 jours", d.weeklyLoad],
  [
    "weekly_activities_entity",
    "Activités 7 jours",
    d.weeklyActivities
  ]
], _e = Mt.map(
  ([i]) => i
), be = [
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_weight", "Afficher le poids"],
  ["show_sync_status", "Afficher l’état de synchronisation"]
];
let O = class extends S {
  setConfig(i) {
    this.config = { ...i };
  }
  emitConfig(i) {
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  change(i, t) {
    const e = { ...this.config };
    t === "" ? delete e[i] : Object.assign(e, { [i]: t }), this.emitConfig(e);
  }
  changeDevice(i) {
    const t = {
      ...this.config,
      device_id: i || void 0
    };
    for (const e of _e)
      delete t[e];
    this.emitConfig(t);
  }
  render() {
    if (!this.config || !this.hass)
      return p``;
    const i = pe(this.hass), t = this.config.device_id ?? (i.length === 1 ? i[0].id : ""), e = Object.keys(this.hass.states).filter(
      (r) => r.startsWith("sensor.") && (!t || this.hass.entities?.[r]?.device_id === t)
    ).sort(), s = Object.keys(this.hass.states).filter((r) => r.startsWith("sensor.")).sort();
    return p`
      <div class="editor">
        <label>
          Athlète / appareil
          <select
            .value=${t}
            @change=${(r) => this.changeDevice(
      r.target.value
    )}
          >
            <option value="">Sélectionner un athlète</option>
            ${i.map(
      (r) => p`
                <option value=${r.id}>
                  ${z(r)}
                </option>
              `
    )}
          </select>
        </label>

        ${i.length === 0 ? p`
              <p>
                Aucun appareil Intervals.icu détecté. Recharge Home
                Assistant après avoir configuré l’intégration.
              </p>
            ` : ""}

        <label>
          Titre
          <input
            .value=${this.config.title ?? "Intervals.icu"}
            @change=${(r) => this.change(
      "title",
      r.target.value
    )}
          />
        </label>

        <label>
          Nom affiché
          <input
            .value=${this.config.athlete_name ?? ""}
            placeholder="Nom de l’appareil par défaut"
            @change=${(r) => this.change(
      "athlete_name",
      r.target.value
    )}
          />
        </label>

        ${Mt.map(
      ([r, n, o]) => p`
            <label>
              ${n}
              <select
                .value=${String(
        this.config[r] ?? Pt(
          this.hass,
          void 0,
          o,
          t
        ) ?? ""
      )}
                @change=${(a) => this.change(
        r,
        a.target.value
      )}
              >
                <option value="">
                  Détection automatique pour cet athlète
                </option>
                ${e.map(
        (a) => p`
                    <option value=${a}>
                      ${this.hass.states[a].attributes.friendly_name ?? a}
                    </option>
                  `
      )}
              </select>
            </label>
          `
    )}

        <label>
          Capteur de poids personnalisé
          <select
            .value=${this.config.weight_entity ?? ""}
            @change=${(r) => this.change(
      "weight_entity",
      r.target.value
    )}
          >
            <option value="">
              Détection automatique Intervals.icu
            </option>
            ${s.map(
      (r) => p`
                <option value=${r}>
                  ${this.hass.states[r].attributes.friendly_name ?? r}
                </option>
              `
    )}
          </select>
        </label>

        ${be.map(
      ([r, n]) => p`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config[r] !== !1}
                @change=${(o) => this.change(
        r,
        o.target.checked
      )}
              />
              ${n}
            </label>
          `
    )}
      </div>
    `;
  }
};
O.styles = kt;
tt([
  X({ attribute: !1 })
], O.prototype, "hass", 2);
tt([
  St()
], O.prototype, "config", 2);
O = tt([
  At("ha-intervals-icu-card-editor")
], O);
var we = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, et = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? xe(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && we(t, e, r), r;
};
let R = class extends S {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }
  static getStubConfig() {
    return {
      title: "Intervals.icu",
      show_health: !0,
      show_weight: !0,
      show_health: !0,
      show_weight: !0,
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
    const e = vt(t);
    return e === null ? "neutral" : i === "form" ? e < -20 ? "danger" : e < -10 ? "warning" : "good" : i === "fatigue" ? e >= 80 ? "danger" : e >= 60 ? "warning" : "good" : "good";
  }
  metric(i, t, e, s) {
    const r = vt(s), n = this.status(e, s), o = e === "form" ? -30 : 0, a = e === "form" ? 30 : 100, c = s?.attributes.change_7_days;
    return p`<article class="metric ${e}">
      <div class="metric-label">${i}</div>
      <div class="metric-value">${v(this.hass, s)}</div>
      <div class="metric-short">${t}</div>
      ${ve(r, n, o, a)}
      <div class="metric-foot">7 j ${typeof c == "number" ? `${c > 0 ? "+" : ""}${c.toFixed(1)}` : "—"}</div>
    </article>`;
  }
  infoRow(i, t, e) {
    return p`<div class="info-row"><ha-icon icon=${i}></ha-icon><span>${t}</span><strong>${v(this.hass, e)}</strong></div>`;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const i = this.hass, t = this.state("fitness_entity", d.fitness), e = this.state("fatigue_entity", d.fatigue), s = this.state("form_entity", d.form), r = this.state("ftp_entity", d.ftp), n = this.state("weekly_load_entity", d.weeklyLoad), o = this.state("weekly_activities_entity", d.weeklyActivities), a = this.config.device_id, c = a ? i.devices?.[a] : void 0, g = this.config.athlete_name || z(c), f = m(i, void 0, d.plannedTodayName, a), l = m(i, void 0, d.plannedTodaySport, a), u = m(i, void 0, d.plannedTodayDuration, a), $ = m(i, void 0, d.plannedTodayLoad, a), x = m(i, void 0, d.lastActivityName, a), Nt = m(i, void 0, d.lastActivityType, a), Ot = m(i, void 0, d.lastActivityDate, a), Rt = m(i, void 0, d.lastActivityDuration, a), Dt = m(i, void 0, d.lastActivityLoad, a), Ut = m(i, void 0, d.lastActivityCalories, a), it = v(i, x), F = v(i, Nt, "Activité"), Ht = F !== "Activité" && F.trim().toLowerCase() !== it.trim().toLowerCase(), B = this.config.weight_entity, st = B && i.states[B] ? i.states[B] : m(i, void 0, d.weight, a), rt = ge(t?.last_updated ?? t?.last_changed);
    return p`<ha-card>
      <div class="card-shell">
        <header class="header">
          <div class="identity">
            <div class="logo"><ha-icon icon="mdi:chart-timeline-variant-shimmer"></ha-icon></div>
            <div><h2>${this.config.title ?? "Intervals.icu"}</h2>${g ? p`<div class="athlete">${g}</div>` : h}</div>
          </div>
          ${this.config.show_sync_status !== !1 ? p`<div class="sync"><span class="dot ${rt.level}"></span>${rt.label}</div>` : h}
        </header>

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", t)}
          ${this.metric("FATIGUE", "ATL", "fatigue", e)}
          ${this.metric("FORME", "TSB", "form", s)}
        </section>

        <section class="quick-stats">
          <div><span>FTP</span><strong>${v(i, r)}</strong></div>
          <div><span>Charge 7 j</span><strong>${v(i, n)}</strong></div>
          <div><span>Activités 7 j</span><strong>${v(i, o)}</strong></div>
        </section>

        ${this.config.show_history !== !1 ? p`<section class="section chart-section">
          <div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon><span>Évolution</span></div>
          ${me([
      { label: "Fitness", values: q(t), className: "fitness-line" },
      { label: "Fatigue", values: q(e), className: "fatigue-line" },
      { label: "Forme", values: q(s), className: "form-line" }
    ])}
        </section>` : h}

        ${this.config.show_health !== !1 && this.config.show_weight !== !1 && st ? p`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>Santé</span>
              </div>
              <div class="health-grid">
                <div class="health-item">
                  <ha-icon icon="mdi:scale-bathroom"></ha-icon>
                  <div>
                    <span>Poids</span>
                    <strong>${v(i, st)}</strong>
                  </div>
                </div>
              </div>
            </section>` : h}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? p`<article class="feature workout">
            <div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon><span>Aujourd’hui</span></div>
            <h3>${v(i, f, "Aucun entraînement planifié")}</h3>
            <div class="pill">${v(i, l, "Entraînement")}</div>
            <div class="feature-meta"><span><ha-icon icon="mdi:clock-outline"></ha-icon>${v(i, u)}</span><span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${v(i, $)}</span></div>
          </article>` : h}

          ${this.config.show_records !== !1 ? p`<article class="feature records-card">
            <div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon><span>Records</span></div>
            ${this.infoRow("mdi:bike-fast", "FTP", m(i, void 0, d.recordFtp, a))}
            ${this.infoRow("mdi:map-marker-distance", "Distance", m(i, void 0, d.recordDistance, a))}
            ${this.infoRow("mdi:image-filter-hdr", "Dénivelé", m(i, void 0, d.recordElevation, a))}
            ${this.infoRow("mdi:flash", "Puissance max", m(i, void 0, d.recordMaxPower, a))}
          </article>` : h}

          ${this.config.show_last_activity !== !1 ? p`<article class="feature last-activity">
            <div class="section-title"><ha-icon icon="mdi:history"></ha-icon><span>Dernière activité</span></div>
            <h3>${it}</h3>
            ${Ht ? p`<div class="pill purple">${F}</div>` : h}
            <div class="activity-details">
              <span><ha-icon icon="mdi:calendar-blank-outline"></ha-icon>${v(i, Ot)}</span>
              <span><ha-icon icon="mdi:clock-outline"></ha-icon>${v(i, Rt)}</span>
              <span><ha-icon icon="mdi:fire"></ha-icon>${v(i, Ut)}</span>
              <span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${v(i, Dt)}</span>
            </div>
          </article>` : h}
        </section>
      </div>
    </ha-card>`;
  }
};
R.styles = kt;
et([
  X({ attribute: !1 })
], R.prototype, "hass", 2);
et([
  St()
], R.prototype, "config", 2);
R = et([
  At("ha-intervals-icu-card")
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
