const I = globalThis, G = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = /* @__PURE__ */ Symbol(), ae = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (G && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (i) => new ye(typeof i == "string" ? i : i + "", void 0, K), ze = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[a + 1], i[0]);
  return new ye(t, i, K);
}, je = (i, e) => {
  if (G) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = I.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, oe = G ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ue(t);
})(i) : i;
const { is: Fe, defineProperty: Le, getOwnPropertyDescriptor: qe, getOwnPropertyNames: Ve, getOwnPropertySymbols: Be, getPrototypeOf: We } = Object, F = globalThis, ne = F.trustedTypes, Ge = ne ? ne.emptyScript : "", Ke = F.reactiveElementPolyfillSupport, T = (i, e) => i, U = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Ge : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, Z = (i, e) => !Fe(i, e), le = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), F.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = le) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Le(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: a } = qe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const n = r?.call(this);
      a?.call(this, o), this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = We(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, s = [...Ve(t), ...Be(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(oe(r));
    } else e !== void 0 && t.push(oe(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return je(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : U).toAttribute(t, s.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = s.getPropertyOptions(r), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : U;
      this._$Em = r;
      const n = o.fromAttribute(t, a.type);
      this[r] = n ?? this._$Ej?.get(r) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (a = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Z)(a, t) || s.useDefault && s.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: a }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: o } = a, n = this[r];
        o !== !0 || this._$AL.has(r) || n === void 0 || this.C(r, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[T("elementProperties")] = /* @__PURE__ */ new Map(), k[T("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: k }), (F.reactiveElementVersions ??= []).push("2.1.2");
const Y = globalThis, ce = (i) => i, z = Y.trustedTypes, de = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, _e = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + $, Ze = `<${$e}>`, x = document, P = () => x.createComment(""), O = (i) => i === null || typeof i != "object" && typeof i != "function", J = Array.isArray, Ye = (i) => J(i) || typeof i?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ue = />/g, b = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ge = /"/g, be = /^(?:script|style|textarea|title)$/i, we = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), u = we(1), W = we(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), w = x.createTreeWalker(x, 129);
function xe(i, e) {
  if (!J(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const Je = (i, e) => {
  const t = i.length - 1, s = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = M;
  for (let n = 0; n < t; n++) {
    const l = i[n];
    let g, f, c = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, f = o.exec(l), f !== null); ) p = o.lastIndex, o === M ? f[1] === "!--" ? o = he : f[1] !== void 0 ? o = ue : f[2] !== void 0 ? (be.test(f[2]) && (r = RegExp("</" + f[2], "g")), o = b) : f[3] !== void 0 && (o = b) : o === b ? f[0] === ">" ? (o = r ?? M, c = -1) : f[1] === void 0 ? c = -2 : (c = o.lastIndex - f[2].length, g = f[1], o = f[3] === void 0 ? b : f[3] === '"' ? ge : pe) : o === ge || o === pe ? o = b : o === he || o === ue ? o = M : (o = b, r = void 0);
    const y = o === b && i[n + 1].startsWith("/>") ? " " : "";
    a += o === M ? l + Ze : c >= 0 ? (s.push(g), l.slice(0, c) + _e + l.slice(c) + $ + y) : l + $ + (c === -2 ? n : y);
  }
  return [xe(i, a + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, l = this.parts, [g, f] = Je(e, t);
    if (this.el = N.createElement(g, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = w.nextNode()) !== null && l.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(_e)) {
          const p = f[o++], y = r.getAttribute(c).split($), A = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: a, name: A[2], strings: y, ctor: A[1] === "." ? Xe : A[1] === "?" ? et : A[1] === "@" ? tt : L }), r.removeAttribute(c);
        } else c.startsWith($) && (l.push({ type: 6, index: a }), r.removeAttribute(c));
        if (be.test(r.tagName)) {
          const c = r.textContent.split($), p = c.length - 1;
          if (p > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let y = 0; y < p; y++) r.append(c[y], P()), w.nextNode(), l.push({ type: 2, index: ++a });
            r.append(c[p], P());
          }
        }
      } else if (r.nodeType === 8) if (r.data === $e) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = r.data.indexOf($, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += $.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const s = x.createElement("template");
    return s.innerHTML = e, s;
  }
}
function C(i, e, t = i, s) {
  if (e === E) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const a = O(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = C(i, r._$AS(i, e.values), r, s)), e;
}
class Qe {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
    w.currentNode = r;
    let a = w.nextNode(), o = 0, n = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let g;
        l.type === 2 ? g = new D(a, a.nextSibling, this, e) : l.type === 1 ? g = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (g = new it(a, this, e)), this._$AV.push(g), l = s[++n];
      }
      o !== l?.index && (a = w.nextNode(), o++);
    }
    return w.currentNode = x, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = C(this, e, t), O(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ye(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = N.createElement(xe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const a = new Qe(r, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new N(e)), t;
  }
  k(e) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const a of e) r === t.length ? t.push(s = new D(this.O(P()), this.O(P()), this, this.options)) : s = t[r], s._$AI(a), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = ce(e).nextSibling;
      ce(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(e, t = this, s, r) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = C(this, e, t, 0), o = !O(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const n = e;
      let l, g;
      for (e = a[0], l = 0; l < a.length - 1; l++) g = C(this, n[s + l], t, l), g === E && (g = this._$AH[l]), o ||= !O(g) || g !== this._$AH[l], g === h ? e = h : e !== h && (e += (g ?? "") + a[l + 1]), this._$AH[l] = g;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xe extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class et extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class tt extends L {
  constructor(e, t, s, r, a) {
    super(e, t, s, r, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? h) === E) return;
    const s = this._$AH, r = e === h && s !== h || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class it {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const st = Y.litHtmlPolyfillSupport;
st?.(N, D), (Y.litHtmlVersions ??= []).push("3.3.3");
const rt = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const a = t?.renderBefore ?? null;
    s._$litPart$ = r = new D(e.insertBefore(P(), a), a, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
const Q = globalThis;
class S extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
S._$litElement$ = !0, S.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: S });
const at = Q.litElementPolyfillSupport;
at?.({ LitElement: S });
(Q.litElementVersions ??= []).push("4.2.2");
const Ae = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
const ot = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: Z }, nt = (i = ot, e, t) => {
  const { kind: s, metadata: r } = t;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), a.set(t.name, i), s === "accessor") {
    const { name: o } = t;
    return { set(n) {
      const l = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, l, i, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, i, n), n;
    } };
  }
  if (s === "setter") {
    const { name: o } = t;
    return function(n) {
      const l = this[o];
      e.call(this, n), this.requestUpdate(o, l, i, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function X(i) {
  return (e, t) => typeof t == "object" ? nt(i, e, t) : ((s, r, a) => {
    const o = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(i, e, t);
}
function ke(i) {
  return X({ ...i, state: !0, attribute: !1 });
}
const Se = ze`
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
  .editor{display:grid;gap:14px;padding:8px 0}.editor-group{display:grid;gap:12px;padding:14px;border:1px solid var(--divider-color);border-radius:14px}.editor-group h3{margin:0;font-size:.95rem}.editor-help{margin:0;color:var(--secondary-text-color);font-size:.78rem;line-height:1.4}.health-editor-row{display:grid;gap:8px;padding:10px;border-radius:10px;background:color-mix(in srgb,var(--secondary-background-color) 65%,transparent)}.editor label{display:grid;gap:6px;color:var(--secondary-text-color);font-size:.82rem}.editor input,.editor select{box-sizing:border-box;width:100%;padding:10px;border-radius:8px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)}.check{display:flex!important;grid-template-columns:auto 1fr!important;align-items:center}.check input{width:auto}
  @media(max-width:760px){.card-shell{padding:14px}.header{align-items:flex-start}.sync{font-size:0}.sync .dot{display:block}.metrics{grid-template-columns:1fr}.metric{display:grid;grid-template-columns:1fr auto;grid-template-areas:"label gauge" "value gauge" "short gauge" "foot gauge";text-align:left;padding:12px 14px}.metric-label{grid-area:label}.metric-value{grid-area:value;font-size:1.65rem}.metric-short{grid-area:short}.metric-foot{grid-area:foot;margin-top:2px}.gauge{grid-area:gauge;width:108px;height:62px;margin:0}.quick-stats{grid-template-columns:1fr}.health-grid{grid-template-columns:1fr 1fr}.lower-grid{grid-template-columns:1fr}.chart-section{min-height:180px}.history-chart{height:135px}.chart-legend{justify-content:flex-start}.activity-details{grid-template-columns:1fr 1fr}}
  @media(max-width:420px){.logo{width:40px;height:40px}.header h2{font-size:1.1rem}.quick-stats>div{padding:9px 11px}.health-grid{grid-template-columns:1fr}.feature{padding:14px}}
`, Ee = "ha_intervals_icu", d = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",
  weight: "weight",
  body_fat: "body_fat",
  muscle_mass: "muscle_mass",
  bone_mass: "bone_mass",
  body_water: "body_water",
  visceral_fat: "visceral_fat",
  bmi: "bmi",
  metabolic_age: "metabolic_age",
  resting_hr: "resting_hr",
  hrv: "hrv",
  sleep: "sleep",
  vo2max: "vo2max",
  blood_oxygen: "blood_oxygen",
  respiration_rate: "respiration_rate",
  body_temperature: "body_temperature",
  stress: "stress",
  daily_calories: "daily_calories",
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
  recordFtp: "record_ftp",
  recordEftp: "record_eftp"
}, Ce = {
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
function me(i, e, t) {
  return t ? i.entities?.[e]?.device_id === t : !0;
}
function Me(i) {
  return Object.values(i.entities ?? {});
}
function lt(i, e) {
  if (i.translation_key === e)
    return !0;
  const t = i.unique_id ?? "";
  return t === e || t.endsWith(`_${e}`) || t.endsWith(`-${e}`);
}
function ct(i) {
  const e = Math.max(0, Math.round(i)), t = Math.floor(e / 3600), s = Math.floor(e % 3600 / 60), r = e % 60;
  return t === 0 ? s === 0 ? `${r} s` : r === 0 ? `${s} min` : `${s} min ${r} s` : `${t} h ${String(s).padStart(2, "0")} min ${String(
    r
  ).padStart(2, "0")} s`;
}
function dt(i) {
  const e = Ce[i];
  if (e)
    return e;
  const t = i.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : i;
}
function ht(i) {
  const e = i.attributes.unit_of_measurement, t = i.attributes.translation_key, s = i.entity_id ?? "";
  return e === "s" || t === "planned_today_duration" || t === "last_activity_duration" || s.endsWith("_planned_today_duration") || s.endsWith("_last_activity_duration");
}
function ut(i) {
  const e = i.attributes.translation_key, t = i.entity_id ?? "";
  return e === "planned_today_sport" || e === "last_activity_type" || t.endsWith("_planned_today_sport") || t.endsWith("_last_activity_type") || !!Ce[i.state];
}
function pt(i) {
  return [...new Set(
    Me(i).filter(
      (t) => t.platform === Ee && typeof t.device_id == "string"
    ).map((t) => t.device_id)
  )].map((t) => i.devices?.[t]).filter((t) => !!t).sort((t, s) => j(t).localeCompare(j(s)));
}
function j(i) {
  return i?.name_by_user ?? i?.name ?? "Athlète Intervals.icu";
}
function Te(i, e, t, s) {
  if (e && i.states[e] && me(i, e, s))
    return e;
  const r = Me(i).find(
    (o) => o.platform === Ee && typeof o.entity_id == "string" && (!s || o.device_id === s) && lt(o, t)
  );
  if (r?.entity_id && i.states[r.entity_id])
    return r.entity_id;
  const a = `_${t}`;
  return Object.keys(i.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(a) && me(i, o, s)
  );
}
function m(i, e, t, s) {
  const r = Te(i, e, t, s);
  return r ? i.states[r] : void 0;
}
function ve(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state))
    return null;
  const e = Number(i.state);
  return Number.isFinite(e) ? e : null;
}
function v(i, e, t = "—") {
  if (!e || ["unknown", "unavailable", "none", ""].includes(e.state))
    return t;
  if (ht(e)) {
    const s = Number(e.state);
    if (Number.isFinite(s))
      return ct(s);
  }
  if (ut(e))
    return dt(e.state);
  try {
    return i.formatEntityState?.(e) ?? `${e.state}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return e.state;
  }
}
function B(i) {
  const e = i?.attributes.history;
  return Array.isArray(e) ? e.map((t) => typeof t == "object" && t !== null && "value" in t ? Number(t.value) : Number(t)).filter(Number.isFinite) : [];
}
function gt(i) {
  if (!i)
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  const e = new Date(i).getTime();
  if (!Number.isFinite(e))
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  const t = Math.max(
    0,
    Math.floor((Date.now() - e) / 6e4)
  );
  return t < 1 ? {
    label: "Synchronisé à l’instant",
    level: "good"
  } : t < 5 ? {
    label: `Synchronisé il y a ${t} min`,
    level: "good"
  } : t <= 30 ? {
    label: `Synchronisé il y a ${t} min`,
    level: "warning"
  } : {
    label: `Synchronisé il y a ${t} min`,
    level: "danger"
  };
}
function ft(i, e, t, s, r) {
  return i.map((a, o) => {
    const n = i.length === 1 ? e / 2 : o / (i.length - 1) * e, l = t - (a - s) / r * (t - 22) - 11;
    return `${n.toFixed(1)},${l.toFixed(1)}`;
  }).join(" ");
}
function mt(i) {
  const e = i.filter((p) => p.values.length >= 2);
  if (e.length === 0) return u`<div class="empty">Historique indisponible</div>`;
  const t = 760, s = 220, r = e.flatMap((p) => p.values), a = Math.min(...r), o = Math.max(...r), n = Math.max((o - a) * 0.12, 2), l = a - n, f = o + n - l || 1, c = [0, 1, 2, 3, 4];
  return u`
    <div class="chart-legend">
      ${e.map((p) => u`<span><i class=${p.className}></i>${p.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${t} ${s}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${c.map((p) => {
    const y = 10 + p / 4 * (s - 20);
    return W`<line class="grid-line" x1="0" y1=${y} x2=${t} y2=${y}></line>`;
  })}
      ${e.map((p) => W`<polyline class="series ${p.className}" points=${ft(p.values, t, s, l, f)}></polyline>`)}
    </svg>`;
}
function vt(i, e, t, s) {
  const a = ((i === null ? 0 : Math.min(s, Math.max(t, i))) - t) / (s - t || 1), o = Math.PI * 52, n = Math.max(0, Math.min(o, a * o));
  return u`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${W`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${n} ${o}"></path>`}
  </svg>`;
}
var yt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, ee = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? _t(e, t) : e, a = i.length - 1, o; a >= 0; a--)
    (o = i[a]) && (r = (s ? o(e, t, r) : o(r)) || r);
  return s && r && yt(e, t, r), r;
};
const Pe = [
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
], $t = Pe.map(
  ([i]) => i
), bt = [
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_sync_status", "Afficher l’état de synchronisation"]
], wt = [
  { key: "weight", label: "Poids" },
  { key: "body_fat", label: "Graisse corporelle" },
  { key: "muscle_mass", label: "Masse musculaire" },
  { key: "bone_mass", label: "Masse osseuse" },
  { key: "body_water", label: "Eau corporelle" },
  { key: "visceral_fat", label: "Graisse viscérale" },
  { key: "bmi", label: "IMC" },
  { key: "metabolic_age", label: "Âge métabolique" },
  { key: "resting_hr", label: "Fréquence cardiaque au repos" },
  { key: "hrv", label: "HRV" },
  { key: "sleep", label: "Sommeil" },
  { key: "vo2max", label: "VO₂max" },
  { key: "blood_oxygen", label: "Saturation en oxygène" },
  { key: "respiration_rate", label: "Fréquence respiratoire" },
  { key: "body_temperature", label: "Température corporelle" },
  { key: "stress", label: "Stress" },
  { key: "daily_calories", label: "Calories quotidiennes" }
];
let R = class extends S {
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
  change(i, e) {
    const t = { ...this.config };
    e === "" ? delete t[i] : Object.assign(t, { [i]: e }), this.emitConfig(t);
  }
  changeDevice(i) {
    const e = {
      ...this.config,
      device_id: i || void 0
    };
    for (const t of $t)
      delete e[t];
    this.emitConfig(e);
  }
  healthMetricConfig(i) {
    const e = this.config?.health?.[i];
    return i === "weight" ? {
      show: e?.show ?? this.config?.show_weight ?? !0,
      entity: e?.entity ?? this.config?.weight_entity ?? ""
    } : {
      show: e?.show ?? !1,
      entity: e?.entity ?? ""
    };
  }
  changeHealthMetric(i, e, t) {
    const s = { ...this.config?.health ?? {} }, r = { ...s[i] ?? {} };
    e === "entity" && t === "" ? delete r.entity : Object.assign(r, { [e]: t }), s[i] = r;
    const a = {
      ...this.config,
      health: s
    };
    i === "weight" && (delete a.weight_entity, delete a.show_weight), this.emitConfig(a);
  }
  render() {
    if (!this.config || !this.hass)
      return u``;
    const i = pt(this.hass), e = this.config.device_id ?? (i.length === 1 ? i[0].id : ""), t = Object.keys(this.hass.states).filter(
      (r) => r.startsWith("sensor.") && (!e || this.hass.entities?.[r]?.device_id === e)
    ).sort(), s = Object.keys(this.hass.states).filter((r) => r.startsWith("sensor.")).sort();
    return u`
      <div class="editor">
        <label>
          Athlète / appareil
          <select
            .value=${e}
            @change=${(r) => this.changeDevice(
      r.target.value
    )}
          >
            <option value="">Sélectionner un athlète</option>
            ${i.map(
      (r) => u`
                <option value=${r.id}>
                  ${j(r)}
                </option>
              `
    )}
          </select>
        </label>

        ${i.length === 0 ? u`
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

        ${Pe.map(
      ([r, a, o]) => u`
            <label>
              ${a}
              <select
                .value=${String(
        this.config[r] ?? Te(
          this.hass,
          void 0,
          o,
          e
        ) ?? ""
      )}
                @change=${(n) => this.change(
        r,
        n.target.value
      )}
              >
                <option value="">
                  Détection automatique pour cet athlète
                </option>
                ${t.map(
        (n) => u`
                    <option value=${n}>
                      ${this.hass.states[n].attributes.friendly_name ?? n}
                    </option>
                  `
      )}
              </select>
            </label>
          `
    )}

        <div class="editor-group">
          <h3>Santé et composition corporelle</h3>
          <p class="editor-help">
            Active uniquement les données que tu souhaites afficher, puis
            sélectionne n’importe quel capteur Home Assistant. Sans capteur
            manuel, les données Intervals.icu disponibles sont utilisées.
          </p>

          ${wt.map(({ key: r, label: a }) => {
      const o = this.healthMetricConfig(r);
      return u`
              <div class="health-editor-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${o.show}
                    @change=${(n) => this.changeHealthMetric(
        r,
        "show",
        n.target.checked
      )}
                  />
                  Afficher ${a}
                </label>

                <label>
                  Capteur — ${a}
                  <select
                    .value=${o.entity}
                    @change=${(n) => this.changeHealthMetric(
        r,
        "entity",
        n.target.value
      )}
                  >
                    <option value="">
                      Détection automatique Intervals.icu
                    </option>
                    ${s.map(
        (n) => u`
                        <option value=${n}>
                          ${this.hass.states[n].attributes.friendly_name ?? n}
                        </option>
                      `
      )}
                  </select>
                </label>
              </div>
            `;
    })}
        </div>

        ${bt.map(
      ([r, a]) => u`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config[r] !== !1}
                @change=${(o) => this.change(
        r,
        o.target.checked
      )}
              />
              ${a}
            </label>
          `
    )}
      </div>
    `;
  }
};
R.styles = Se;
ee([
  X({ attribute: !1 })
], R.prototype, "hass", 2);
ee([
  ke()
], R.prototype, "config", 2);
R = ee([
  Ae("ha-intervals-icu-card-editor")
], R);
var xt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, te = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? At(e, t) : e, a = i.length - 1, o; a >= 0; a--)
    (o = i[a]) && (r = (s ? o(e, t, r) : o(r)) || r);
  return s && r && xt(e, t, r), r;
};
const kt = [
  { key: "weight", label: "Poids", icon: "mdi:scale-bathroom", defaultShow: !0 },
  { key: "body_fat", label: "Graisse corporelle", icon: "mdi:percent-outline", defaultShow: !1 },
  { key: "muscle_mass", label: "Masse musculaire", icon: "mdi:arm-flex", defaultShow: !1 },
  { key: "bone_mass", label: "Masse osseuse", icon: "mdi:bone", defaultShow: !1 },
  { key: "body_water", label: "Eau corporelle", icon: "mdi:water-percent", defaultShow: !1 },
  { key: "visceral_fat", label: "Graisse viscérale", icon: "mdi:human-male", defaultShow: !1 },
  { key: "bmi", label: "IMC", icon: "mdi:human", defaultShow: !1 },
  { key: "metabolic_age", label: "Âge métabolique", icon: "mdi:calendar-heart", defaultShow: !1 },
  { key: "resting_hr", label: "FC au repos", icon: "mdi:heart-pulse", defaultShow: !1 },
  { key: "hrv", label: "HRV", icon: "mdi:heart-flash", defaultShow: !1 },
  { key: "sleep", label: "Sommeil", icon: "mdi:sleep", defaultShow: !1 },
  { key: "vo2max", label: "VO₂max", icon: "mdi:lungs", defaultShow: !1 },
  { key: "blood_oxygen", label: "Oxygène sanguin", icon: "mdi:water-plus-outline", defaultShow: !1 },
  { key: "respiration_rate", label: "Respiration", icon: "mdi:weather-windy", defaultShow: !1 },
  { key: "body_temperature", label: "Température", icon: "mdi:thermometer", defaultShow: !1 },
  { key: "stress", label: "Stress", icon: "mdi:head-heart-outline", defaultShow: !1 },
  { key: "daily_calories", label: "Calories quotidiennes", icon: "mdi:fire", defaultShow: !1 }
];
let H = class extends S {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }
  static getStubConfig() {
    return {
      title: "Intervals.icu",
      show_health: !0,
      show_records: !0,
      show_history: !0,
      show_workout: !0,
      show_last_activity: !0,
      show_sync_status: !0,
      health: {
        weight: { show: !0 }
      }
    };
  }
  setConfig(i) {
    if (!i) throw new Error("Configuration manquante");
    this.config = {
      show_health: !0,
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
  state(i, e) {
    return this.hass ? m(
      this.hass,
      this.config?.[i],
      e,
      this.config?.device_id
    ) : void 0;
  }
  status(i, e) {
    const t = ve(e);
    return t === null ? "neutral" : i === "form" ? t < -20 ? "danger" : t < -10 ? "warning" : "good" : i === "fatigue" ? t >= 80 ? "danger" : t >= 60 ? "warning" : "good" : "good";
  }
  metric(i, e, t, s) {
    const r = ve(s), a = this.status(t, s), o = t === "form" ? -30 : 0, n = t === "form" ? 30 : 100, l = s?.attributes.change_7_days;
    return u`<article class="metric ${t}">
      <div class="metric-label">${i}</div>
      <div class="metric-value">${v(this.hass, s)}</div>
      <div class="metric-short">${e}</div>
      ${vt(r, a, o, n)}
      <div class="metric-foot">
        7 j
        ${typeof l == "number" ? `${l > 0 ? "+" : ""}${l.toFixed(1)}` : "—"}
      </div>
    </article>`;
  }
  infoRow(i, e, t) {
    return u`<div class="info-row">
      <ha-icon icon=${i}></ha-icon>
      <span>${e}</span>
      <strong>${v(this.hass, t)}</strong>
    </div>`;
  }
  healthState(i) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[i]?.entity ?? (i === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : m(
      this.hass,
      void 0,
      d[i],
      this.config.device_id
    );
  }
  healthVisible(i, e) {
    const t = this.config?.health?.[i]?.show;
    return t !== void 0 ? t : i === "weight" && this.config?.show_weight !== void 0 ? this.config.show_weight : e;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const i = this.hass, e = this.state("fitness_entity", d.fitness), t = this.state("fatigue_entity", d.fatigue), s = this.state("form_entity", d.form), r = this.state("ftp_entity", d.ftp), a = this.state(
      "weekly_load_entity",
      d.weeklyLoad
    ), o = this.state(
      "weekly_activities_entity",
      d.weeklyActivities
    ), n = this.config.device_id, l = n ? i.devices?.[n] : void 0, g = this.config.athlete_name || j(l), f = m(
      i,
      void 0,
      d.plannedTodayName,
      n
    ), c = m(
      i,
      void 0,
      d.plannedTodaySport,
      n
    ), p = m(
      i,
      void 0,
      d.plannedTodayDuration,
      n
    ), y = m(
      i,
      void 0,
      d.plannedTodayLoad,
      n
    ), A = m(
      i,
      void 0,
      d.lastActivityName,
      n
    ), Oe = m(
      i,
      void 0,
      d.lastActivityType,
      n
    ), Ne = m(
      i,
      void 0,
      d.lastActivityDate,
      n
    ), Re = m(
      i,
      void 0,
      d.lastActivityDuration,
      n
    ), He = m(
      i,
      void 0,
      d.lastActivityLoad,
      n
    ), De = m(
      i,
      void 0,
      d.lastActivityCalories,
      n
    ), ie = v(i, A), q = v(i, Oe, "Activité"), Ie = q !== "Activité" && q.trim().toLowerCase() !== ie.trim().toLowerCase(), se = kt.map((_) => ({
      ..._,
      state: this.healthState(_.key),
      visible: this.healthVisible(_.key, _.defaultShow)
    })).filter((_) => _.visible && _.state), re = gt(
      e?.last_updated ?? e?.last_changed
    );
    return u`<ha-card>
      <div class="card-shell">
        <header class="header">
          <div class="identity">
            <div class="logo">
              <ha-icon
                icon="mdi:chart-timeline-variant-shimmer"
              ></ha-icon>
            </div>
            <div>
              <h2>${this.config.title ?? "Intervals.icu"}</h2>
              ${g ? u`<div class="athlete">${g}</div>` : h}
            </div>
          </div>
          ${this.config.show_sync_status !== !1 ? u`<div class="sync">
                <span class="dot ${re.level}"></span>${re.label}
              </div>` : h}
        </header>

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", e)}
          ${this.metric("FATIGUE", "ATL", "fatigue", t)}
          ${this.metric("FORME", "TSB", "form", s)}
        </section>

        <section class="quick-stats">
          <div>
            <span>FTP</span><strong>${v(i, r)}</strong>
          </div>
          <div>
            <span>Charge 7 j</span
            ><strong>${v(i, a)}</strong>
          </div>
          <div>
            <span>Activités 7 j</span
            ><strong>${v(i, o)}</strong>
          </div>
        </section>

        ${this.config.show_history !== !1 ? u`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>Évolution</span>
              </div>
              ${mt([
      {
        label: "Fitness",
        values: B(e),
        className: "fitness-line"
      },
      {
        label: "Fatigue",
        values: B(t),
        className: "fatigue-line"
      },
      {
        label: "Forme",
        values: B(s),
        className: "form-line"
      }
    ])}
            </section>` : h}

        ${this.config.show_health !== !1 && se.length > 0 ? u`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>Santé et composition corporelle</span>
              </div>
              <div class="health-grid">
                ${se.map(
      (_) => u`
                    <div class="health-item">
                      <ha-icon icon=${_.icon}></ha-icon>
                      <div>
                        <span>${_.label}</span>
                        <strong>${v(i, _.state)}</strong>
                      </div>
                    </div>
                  `
    )}
              </div>
            </section>` : h}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? u`<article class="feature workout">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>Aujourd’hui</span>
                </div>
                <h3>
                  ${v(
      i,
      f,
      "Aucun entraînement planifié"
    )}
                </h3>
                <div class="pill">
                  ${v(i, c, "Entraînement")}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${v(i, p)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${v(i, y)}</span
                  >
                </div>
              </article>` : h}

          ${this.config.show_records !== !1 ? u`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>Records</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      m(
        i,
        void 0,
        d.recordFtp,
        n
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      "Distance",
      m(
        i,
        void 0,
        d.recordDistance,
        n
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      "Dénivelé",
      m(
        i,
        void 0,
        d.recordElevation,
        n
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      "Puissance max",
      m(
        i,
        void 0,
        d.recordMaxPower,
        n
      )
    )}
              </article>` : h}

          ${this.config.show_last_activity !== !1 ? u`<article class="feature last-activity">
                <div class="section-title">
                  <ha-icon icon="mdi:history"></ha-icon
                  ><span>Dernière activité</span>
                </div>
                <h3>${ie}</h3>
                ${Ie ? u`<div class="pill purple">${q}</div>` : h}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${v(i, Ne)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${v(i, Re)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${v(i, De)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${v(i, He)}</span
                  >
                </div>
              </article>` : h}
        </section>
      </div>
    </ha-card>`;
  }
};
H.styles = Se;
te([
  X({ attribute: !1 })
], H.prototype, "hass", 2);
te([
  ke()
], H.prototype, "config", 2);
H = te([
  Ae("ha-intervals-icu-card")
], H);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/main/docs/lovelace-card.md"
});
console.info("%c HA Intervals.icu Card %c 1.1.0-beta2 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
