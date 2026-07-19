const q = globalThis, ee = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = /* @__PURE__ */ Symbol(), he = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = he.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && he.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ge = (i) => new ke(typeof i == "string" ? i : i + "", void 0, te), Ae = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((r, s, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[a + 1], i[0]);
  return new ke(t, i, te);
}, Ke = (i, e) => {
  if (ee) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), s = q.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = t.cssText, i.appendChild(r);
  }
}, pe = ee ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Ge(t);
})(i) : i;
const { is: Ye, defineProperty: Ze, getOwnPropertyDescriptor: Je, getOwnPropertyNames: Qe, getOwnPropertySymbols: Xe, getPrototypeOf: et } = Object, W = globalThis, ue = W.trustedTypes, tt = ue ? ue.emptyScript : "", it = W.reactiveElementPolyfillSupport, R = (i, e) => i, F = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? tt : null;
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
} }, ie = (i, e) => !Ye(i, e), ge = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: ie };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ge) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, r, t);
      s !== void 0 && Ze(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: s, set: a } = Je(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const n = s?.call(this);
      a?.call(this, o), this.requestUpdate(e, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = et(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const t = this.properties, r = [...Qe(t), ...Xe(t)];
      for (const s of r) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, s] of t) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const s = this._$Eu(t, r);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) t.unshift(pe(s));
    } else e !== void 0 && t.push(pe(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ke(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : F).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : F;
      this._$Em = s;
      const n = o.fromAttribute(t, a.type);
      this[s] = n ?? this._$Ej?.get(s) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, s = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? ie)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: s, wrapped: a }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, a] of r) {
        const { wrapped: o } = a, n = this[s];
        o !== !0 || this._$AL.has(s) || n === void 0 || this.C(s, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[R("elementProperties")] = /* @__PURE__ */ new Map(), E[R("finalized")] = /* @__PURE__ */ new Map(), it?.({ ReactiveElement: E }), (W.reactiveElementVersions ??= []).push("2.1.2");
const re = globalThis, me = (i) => i, V = re.trustedTypes, fe = V ? V.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Se = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + _, rt = `<${Ee}>`, A = document, z = () => A.createComment(""), N = (i) => i === null || typeof i != "object" && typeof i != "function", se = Array.isArray, st = (i) => se(i) || typeof i?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, be = />/g, $ = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, _e = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Te = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), c = Te(1), Q = Te(2), C = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function Pe(i, e) {
  if (!se(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(e) : e;
}
const at = (i, e) => {
  const t = i.length - 1, r = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = O;
  for (let n = 0; n < t; n++) {
    const l = i[n];
    let m, f, p = -1, d = 0;
    for (; d < l.length && (o.lastIndex = d, f = o.exec(l), f !== null); ) d = o.lastIndex, o === O ? f[1] === "!--" ? o = ve : f[1] !== void 0 ? o = be : f[2] !== void 0 ? (Ce.test(f[2]) && (s = RegExp("</" + f[2], "g")), o = $) : f[3] !== void 0 && (o = $) : o === $ ? f[0] === ">" ? (o = s ?? O, p = -1) : f[1] === void 0 ? p = -2 : (p = o.lastIndex - f[2].length, m = f[1], o = f[3] === void 0 ? $ : f[3] === '"' ? _e : ye) : o === _e || o === ye ? o = $ : o === ve || o === be ? o = O : (o = $, s = void 0);
    const b = o === $ && i[n + 1].startsWith("/>") ? " " : "";
    a += o === O ? l + rt : p >= 0 ? (r.push(m), l.slice(0, p) + Se + l.slice(p) + _ + b) : l + _ + (p === -2 ? n : b);
  }
  return [Pe(i, a + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class I {
  constructor({ strings: e, _$litType$: t }, r) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, l = this.parts, [m, f] = at(e, t);
    if (this.el = I.createElement(m, r), w.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = w.nextNode()) !== null && l.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Se)) {
          const d = f[o++], b = s.getAttribute(p).split(_), x = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: a, name: x[2], strings: b, ctor: x[1] === "." ? nt : x[1] === "?" ? ct : x[1] === "@" ? lt : G }), s.removeAttribute(p);
        } else p.startsWith(_) && (l.push({ type: 6, index: a }), s.removeAttribute(p));
        if (Ce.test(s.tagName)) {
          const p = s.textContent.split(_), d = p.length - 1;
          if (d > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let b = 0; b < d; b++) s.append(p[b], z()), w.nextNode(), l.push({ type: 2, index: ++a });
            s.append(p[d], z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(_, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += _.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = A.createElement("template");
    return r.innerHTML = e, r;
  }
}
function T(i, e, t = i, r) {
  if (e === C) return e;
  let s = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = N(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(i), s._$AT(i, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = s : t._$Cl = s), s !== void 0 && (e = T(i, s._$AS(i, e.values), s, r)), e;
}
class ot {
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
    const { el: { content: t }, parts: r } = this._$AD, s = (e?.creationScope ?? A).importNode(t, !0);
    w.currentNode = s;
    let a = w.nextNode(), o = 0, n = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let m;
        l.type === 2 ? m = new D(a, a.nextSibling, this, e) : l.type === 1 ? m = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (m = new dt(a, this, e)), this._$AV.push(m), l = r[++n];
      }
      o !== l?.index && (a = w.nextNode(), o++);
    }
    return w.currentNode = A, s;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = T(this, e, t), N(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : st(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = I.createElement(Pe(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const a = new ot(s, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = xe.get(e.strings);
    return t === void 0 && xe.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, s = 0;
    for (const a of e) s === t.length ? t.push(r = new D(this.O(z()), this.O(z()), this, this.options)) : r = t[s], r._$AI(a), s++;
    s < t.length && (this._$AR(r && r._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = me(e).nextSibling;
      me(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, s, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(e, t = this, r, s) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = T(this, e, t, 0), o = !N(e) || e !== this._$AH && e !== C, o && (this._$AH = e);
    else {
      const n = e;
      let l, m;
      for (e = a[0], l = 0; l < a.length - 1; l++) m = T(this, n[r + l], t, l), m === C && (m = this._$AH[l]), o ||= !N(m) || m !== this._$AH[l], m === h ? e = h : e !== h && (e += (m ?? "") + a[l + 1]), this._$AH[l] = m;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class nt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ct extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class lt extends G {
  constructor(e, t, r, s, a) {
    super(e, t, r, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = T(this, e, t, 0) ?? h) === C) return;
    const r = this._$AH, s = e === h && r !== h || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== h && (r === h || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const ht = re.litHtmlPolyfillSupport;
ht?.(I, D), (re.litHtmlVersions ??= []).push("3.3.3");
const pt = (i, e, t) => {
  const r = t?.renderBefore ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = s = new D(e.insertBefore(z(), a), a, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
const ae = globalThis;
class k extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
}
k._$litElement$ = !0, k.finalized = !0, ae.litElementHydrateSupport?.({ LitElement: k });
const ut = ae.litElementPolyfillSupport;
ut?.({ LitElement: k });
(ae.litElementVersions ??= []).push("4.2.2");
const oe = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
const gt = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: ie }, mt = (i = gt, e, t) => {
  const { kind: r, metadata: s } = t;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), r === "setter" && ((i = Object.create(i)).wrapped = !0), a.set(t.name, i), r === "accessor") {
    const { name: o } = t;
    return { set(n) {
      const l = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, l, i, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, i, n), n;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(n) {
      const l = this[o];
      e.call(this, n), this.requestUpdate(o, l, i, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function K(i) {
  return (e, t) => typeof t == "object" ? mt(i, e, t) : ((r, s, a) => {
    const o = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(i, e, t);
}
function M(i) {
  return K({ ...i, state: !0, attribute: !1 });
}
const Me = Ae`
  :host{display:block;--icu-green:#6fe04f;--icu-orange:#ff9f2f;--icu-blue:#4c9fff;--icu-purple:#a579ff;--icu-pink:#ff6fae}
  *{box-sizing:border-box}
  ha-card{position:relative;overflow:hidden;border-radius:24px;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 96%,#0b1830),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#12305a));box-shadow:0 18px 55px rgba(0,0,0,.16)}
  ha-card:before{content:"";position:absolute;inset:-30% auto auto -15%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(76,159,255,.18),transparent 68%);pointer-events:none}
  .card-shell{position:relative;padding:20px;color:var(--primary-text-color)}
  .header,.identity,.header-actions,.sync,.section-title,.feature-meta span,.activity-details span,.info-row,.health-item,.quick-stat{display:flex;align-items:center}
  .header{justify-content:space-between;gap:16px;margin-bottom:16px}.identity{gap:12px}.logo{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#1766d8,#68b5ff);color:#fff;box-shadow:0 10px 26px rgba(42,117,230,.32);transform:rotate(-3deg)}
  .logo ha-icon{--mdc-icon-size:29px}h2{font-size:1.35rem;margin:0;letter-spacing:-.02em}.athlete{color:var(--secondary-text-color);margin-top:3px;font-size:.88rem}.header-actions{gap:9px}.sync{gap:7px;font-size:.8rem;color:var(--secondary-text-color);white-space:nowrap;padding:7px 10px;border-radius:999px;background:color-mix(in srgb,var(--secondary-background-color) 70%,transparent)}.dot{width:9px;height:9px;border-radius:50%;background:var(--disabled-text-color);box-shadow:0 0 0 4px color-mix(in srgb,var(--disabled-text-color) 14%,transparent)}.dot.good{background:#28c763}.dot.warning{background:#f4b62b}.dot.danger{background:#e24848}.refresh{width:38px;height:38px;border:0;border-radius:12px;display:grid;place-items:center;color:var(--primary-text-color);background:color-mix(in srgb,var(--secondary-background-color) 82%,transparent);cursor:pointer}.refresh:hover{background:color-mix(in srgb,var(--primary-color) 18%,var(--secondary-background-color))}.refresh ha-icon{--mdc-icon-size:21px}.spinning{animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
  .atlas-panel{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:11px;margin-bottom:12px}.atlas-readiness,.atlas-coach{padding:16px;border-radius:18px;border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);background:linear-gradient(145deg,color-mix(in srgb,var(--primary-color) 11%,var(--secondary-background-color)),color-mix(in srgb,var(--secondary-background-color) 80%,transparent))}.atlas-score{display:flex;align-items:end;gap:10px}.atlas-score strong{font-size:2.35rem;line-height:1;color:var(--primary-color)}.atlas-score span{font-size:.82rem;font-weight:750;text-transform:uppercase;letter-spacing:.06em;color:var(--secondary-text-color)}.atlas-meta{display:grid;gap:7px;margin-top:13px}.atlas-meta span{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--secondary-text-color)}.atlas-meta ha-icon{--mdc-icon-size:18px}.atlas-coach h3{margin:4px 0 7px;font-size:1.08rem}.atlas-coach p{margin:0;color:var(--secondary-text-color);font-size:.84rem;line-height:1.45}.atlas-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.atlas-chips span{padding:5px 9px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color);font-size:.72rem;font-weight:750}
  .metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.metric{position:relative;text-align:center;padding:16px 10px 9px;border-radius:18px;background:linear-gradient(160deg,color-mix(in srgb,var(--secondary-background-color) 92%,transparent),color-mix(in srgb,var(--secondary-background-color) 72%,transparent));border:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent);overflow:hidden;transition:transform .2s ease}.metric:hover{transform:translateY(-2px)}.metric:after{content:"";position:absolute;inset:auto -20px -45px;width:100px;height:100px;border-radius:50%;background:currentColor;opacity:.055}.metric-label{font-weight:800;letter-spacing:.06em;font-size:.77rem}.fitness .metric-label,.fitness .metric-value{color:var(--icu-green)}.fatigue .metric-label,.fatigue .metric-value{color:var(--icu-orange)}.form .metric-label,.form .metric-value{color:var(--icu-blue)}.metric-value{font-size:2.05rem;font-weight:850;line-height:1.1;margin-top:5px}.metric-short,.metric-foot{font-size:.74rem;color:var(--secondary-text-color)}.metric-foot{margin-top:-5px}.gauge{width:min(150px,100%);height:70px;margin:3px auto -7px;display:block}.gauge-track,.gauge-value{fill:none;stroke-width:12;stroke-linecap:round}.gauge-track{stroke:color-mix(in srgb,var(--disabled-text-color) 24%,transparent)}.gauge-value{stroke:var(--icu-green)}.gauge-value.warning{stroke:var(--icu-orange)}.gauge-value.danger{stroke:#ef4545}.gauge-value.neutral{stroke:var(--disabled-text-color)}
  .quick-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:10px}.quick-stat{gap:10px;padding:12px 13px;border:1px solid color-mix(in srgb,var(--divider-color) 75%,transparent);border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.quick-stat>ha-icon{--mdc-icon-size:22px;color:var(--primary-color);padding:8px;border-radius:10px;background:color-mix(in srgb,var(--primary-color) 13%,transparent)}.quick-stat div{min-width:0;display:grid;gap:2px}.quick-stat span{font-size:.72rem;color:var(--secondary-text-color)}.quick-stat strong{font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .section{margin-top:13px;padding:15px;border-radius:17px;background:color-mix(in srgb,var(--secondary-background-color) 67%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.section-title{gap:8px;font-weight:800;margin-bottom:11px;font-size:.89rem}.section-title ha-icon{--mdc-icon-size:20px;color:var(--primary-color)}
  .chart-section{min-height:205px}.chart-legend{display:flex;gap:14px;justify-content:flex-end;font-size:.72rem;color:var(--secondary-text-color);margin:-30px 0 7px}.chart-legend span{display:flex;gap:5px;align-items:center}.chart-legend i{width:9px;height:9px;border-radius:50%}.fitness-line{stroke:var(--icu-green);background:var(--icu-green)}.fatigue-line{stroke:var(--icu-orange);background:var(--icu-orange)}.form-line{stroke:var(--icu-blue);background:var(--icu-blue)}.history-chart{width:100%;height:150px;overflow:visible}.grid-line{stroke:color-mix(in srgb,var(--divider-color) 60%,transparent);stroke-width:1}.series{fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 4px 5px rgba(0,0,0,.15))}.empty{padding:38px;text-align:center;color:var(--secondary-text-color)}
  .health-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.health-item{gap:10px;padding:11px;border-radius:13px;background:color-mix(in srgb,var(--card-background-color) 66%,transparent)}.health-item ha-icon{--mdc-icon-size:21px;color:var(--icu-pink)}.health-item div{display:grid;gap:2px;min-width:0}.health-item span{font-size:.7rem;color:var(--secondary-text-color)}.health-item strong{font-size:.91rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .lower-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:12px}.feature{position:relative;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);overflow:hidden}.spotlight{background:linear-gradient(145deg,color-mix(in srgb,var(--primary-color) 10%,var(--secondary-background-color)),color-mix(in srgb,var(--secondary-background-color) 78%,transparent))}.feature h3{margin:6px 0 9px;font-size:1.05rem}.pill{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:.72rem;font-weight:750;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.pill.purple{color:var(--icu-purple);background:color-mix(in srgb,var(--icu-purple) 14%,transparent)}.feature-meta,.activity-details{display:grid;gap:8px;margin-top:13px}.feature-meta{grid-template-columns:1fr 1fr}.activity-details{grid-template-columns:1fr 1fr}.feature-meta span,.activity-details span{gap:6px;font-size:.76rem;color:var(--secondary-text-color)}.feature-meta ha-icon,.activity-details ha-icon{--mdc-icon-size:17px}.info-row{justify-content:space-between;gap:9px;padding:8px 0;border-bottom:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent)}.info-row:last-child{border-bottom:0}.info-row ha-icon{--mdc-icon-size:18px;color:var(--icu-purple)}.info-row span{flex:1;color:var(--secondary-text-color);font-size:.78rem}.info-row strong{font-size:.82rem}
  .editor{display:grid;gap:12px;padding:16px}.editor label{display:grid;gap:6px;font-size:.85rem}.editor input,.editor select{width:100%;padding:10px;border:1px solid var(--divider-color);border-radius:9px;background:var(--card-background-color);color:var(--primary-text-color)}.editor .check{display:flex;align-items:center;gap:8px}.editor .check input{width:auto}.editor-group{display:grid;gap:10px;padding:13px;border:1px solid var(--divider-color);border-radius:12px}.editor-group h3{margin:0}.editor-help{margin:0;color:var(--secondary-text-color);font-size:.78rem}.health-editor-row{display:grid;gap:8px;padding-top:8px;border-top:1px solid var(--divider-color)}.about-panel{margin-top:6px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden}.about-panel summary{display:flex;justify-content:space-between;align-items:center;padding:12px;cursor:pointer}.about-summary{display:flex;align-items:center;gap:8px}.about-version{font-size:.75rem;color:var(--secondary-text-color)}.about-content{display:grid;gap:12px;padding:0 12px 12px}.about-heading{display:flex;gap:10px;align-items:center}.about-heading>ha-icon{--mdc-icon-size:30px;color:var(--primary-color)}.about-heading div{display:grid}.about-heading span{font-size:.72rem;color:var(--secondary-text-color)}.about-links{display:grid;grid-template-columns:1fr 1fr;gap:7px}.about-links a{display:flex;gap:7px;align-items:center;padding:9px;border-radius:9px;text-decoration:none;color:var(--primary-text-color);background:var(--secondary-background-color)}.beer-link{display:flex;align-items:center;justify-content:center;gap:10px;padding:12px;border:1px solid color-mix(in srgb,var(--warning-color,#f5a623) 45%,var(--divider-color));border-radius:12px;color:var(--primary-text-color);text-decoration:none;background:color-mix(in srgb,var(--warning-color,#f5a623) 10%,transparent)}.beer-logo{display:block;width:min(280px,calc(100% - 30px));height:auto}.beer-link>ha-icon:last-child{--mdc-icon-size:17px;color:var(--secondary-text-color)}
  ha-card.compact .card-shell{padding:14px}ha-card.compact .chart-section,ha-card.compact .health-section{display:none}ha-card.compact .metric{padding:11px 8px 5px}ha-card.compact .gauge{height:55px}ha-card.compact .lower-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  @media(max-width:760px){.atlas-panel{grid-template-columns:1fr}.card-shell{padding:14px}.header{align-items:flex-start}.sync{font-size:0;padding:8px}.metrics{grid-template-columns:1fr}.metric{display:grid;grid-template-columns:1fr auto;grid-template-areas:"label gauge" "value gauge" "short gauge" "foot gauge";text-align:left;padding:12px 14px}.metric-label{grid-area:label}.metric-value{grid-area:value;font-size:1.65rem}.metric-short{grid-area:short}.metric-foot{grid-area:foot;margin-top:2px}.gauge{grid-area:gauge;width:108px;height:62px;margin:0}.quick-stats{grid-template-columns:1fr}.health-grid{grid-template-columns:1fr 1fr}.lower-grid,ha-card.compact .lower-grid{grid-template-columns:1fr}.chart-section{min-height:180px}.history-chart{height:135px}.chart-legend{justify-content:flex-start;margin:0 0 7px}.activity-details{grid-template-columns:1fr 1fr}}
  @media(max-width:560px){.about-links{grid-template-columns:1fr}}
  @media(max-width:420px){.logo{width:42px;height:42px;border-radius:13px}.header h2{font-size:1.08rem}.health-grid{grid-template-columns:1fr}.feature{padding:14px}}
`, Oe = "ha_intervals_icu", u = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  trainingStatus: "training_status",
  readinessScore: "readiness_score",
  readinessLevel: "readiness_level",
  readinessRecoveryHours: "readiness_recovery_hours",
  atlasCoach: "atlas_coach",
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
}, Re = {
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
function $e(i, e, t) {
  return t ? i.entities?.[e]?.device_id === t : !0;
}
function ze(i) {
  return Object.values(i.entities ?? {});
}
function ft(i, e) {
  if (i.translation_key === e)
    return !0;
  const t = i.unique_id ?? "";
  return t === e || t.endsWith(`_${e}`) || t.endsWith(`-${e}`);
}
function vt(i) {
  const e = Math.max(0, Math.round(i)), t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), s = e % 60;
  return t === 0 ? r === 0 ? `${s} s` : s === 0 ? `${r} min` : `${r} min ${s} s` : `${t} h ${String(r).padStart(2, "0")} min ${String(
    s
  ).padStart(2, "0")} s`;
}
function bt(i) {
  const e = Re[i];
  if (e)
    return e;
  const t = i.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : i;
}
function yt(i) {
  const e = i.attributes.unit_of_measurement, t = i.attributes.translation_key, r = i.entity_id ?? "";
  return e === "s" || t === "planned_today_duration" || t === "last_activity_duration" || r.endsWith("_planned_today_duration") || r.endsWith("_last_activity_duration");
}
function _t(i) {
  const e = i.attributes.translation_key, t = i.entity_id ?? "";
  return e === "planned_today_sport" || e === "last_activity_type" || t.endsWith("_planned_today_sport") || t.endsWith("_last_activity_type") || !!Re[i.state];
}
function xt(i) {
  return [...new Set(
    ze(i).filter(
      (t) => t.platform === Oe && typeof t.device_id == "string"
    ).map((t) => t.device_id)
  )].map((t) => i.devices?.[t]).filter((t) => !!t).sort((t, r) => B(t).localeCompare(B(r)));
}
function B(i) {
  return i?.name_by_user ?? i?.name ?? "Athlète Intervals.icu";
}
function X(i, e, t, r) {
  if (e && i.states[e] && $e(i, e, r))
    return e;
  const s = ze(i).find(
    (o) => o.platform === Oe && typeof o.entity_id == "string" && (!r || o.device_id === r) && ft(o, t)
  );
  if (s?.entity_id && i.states[s.entity_id])
    return s.entity_id;
  const a = `_${t}`;
  return Object.keys(i.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(a) && $e(i, o, r)
  );
}
function g(i, e, t, r) {
  const s = X(i, e, t, r);
  return s ? i.states[s] : void 0;
}
function we(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state))
    return null;
  const e = Number(i.state);
  return Number.isFinite(e) ? e : null;
}
function v(i, e, t = "—") {
  if (!e || ["unknown", "unavailable", "none", ""].includes(e.state))
    return t;
  if (yt(e)) {
    const r = Number(e.state);
    if (Number.isFinite(r))
      return vt(r);
  }
  if (_t(e))
    return bt(e.state);
  try {
    return i.formatEntityState?.(e) ?? `${e.state}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return e.state;
  }
}
function J(i) {
  const e = i?.attributes.history;
  return Array.isArray(e) ? e.map((t) => typeof t == "object" && t !== null && "value" in t ? Number(t.value) : Number(t)).filter(Number.isFinite) : [];
}
function $t(i) {
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
function wt(i, e, t, r, s) {
  return i.map((a, o) => {
    const n = i.length === 1 ? e / 2 : o / (i.length - 1) * e, l = t - (a - r) / s * (t - 22) - 11;
    return `${n.toFixed(1)},${l.toFixed(1)}`;
  }).join(" ");
}
function kt(i) {
  const e = i.filter((d) => d.values.length >= 2);
  if (e.length === 0) return c`<div class="empty">Historique indisponible</div>`;
  const t = 760, r = 220, s = e.flatMap((d) => d.values), a = Math.min(...s), o = Math.max(...s), n = Math.max((o - a) * 0.12, 2), l = a - n, f = o + n - l || 1, p = [0, 1, 2, 3, 4];
  return c`
    <div class="chart-legend">
      ${e.map((d) => c`<span><i class=${d.className}></i>${d.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${t} ${r}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${p.map((d) => {
    const b = 10 + d / 4 * (r - 20);
    return Q`<line class="grid-line" x1="0" y1=${b} x2=${t} y2=${b}></line>`;
  })}
      ${e.map((d) => Q`<polyline class="series ${d.className}" points=${wt(d.values, t, r, l, f)}></polyline>`)}
    </svg>`;
}
function At(i, e, t, r) {
  const a = ((i === null ? 0 : Math.min(r, Math.max(t, i))) - t) / (r - t || 1), o = Math.PI * 52, n = Math.max(0, Math.min(o, a * o));
  return c`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${Q`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${n} ${o}"></path>`}
  </svg>`;
}
var St = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, ne = (i, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? Et(e, t) : e, a = i.length - 1, o; a >= 0; a--)
    (o = i[a]) && (s = (r ? o(e, t, s) : o(s)) || s);
  return r && s && St(e, t, s), s;
};
const H = "https://github.com/pepka69/ha-intervals-icu", Ct = `${H}/blob/develop/README.fr.md`, Tt = `${H}/issues`, Pt = `${H}/issues/new/choose`, Mt = "https://buymeacoffee.com/pep_ka", Ot = `${H}/raw/develop/.github/assets/buy-me-a-beer-en.png`, Ne = [
  ["fitness_entity", "Fitness", u.fitness],
  ["fatigue_entity", "Fatigue", u.fatigue],
  ["form_entity", "Forme", u.form],
  ["ftp_entity", "FTP", u.ftp],
  ["weekly_load_entity", "Charge 7 jours", u.weeklyLoad],
  [
    "weekly_activities_entity",
    "Activités 7 jours",
    u.weeklyActivities
  ]
], Rt = Ne.map(
  ([i]) => i
), zt = [
  ["show_atlas", "Afficher Atlas Coach et Readiness"],
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_sync_status", "Afficher l’état de synchronisation"],
  ["show_refresh_button", "Afficher le bouton Actualiser"],
  ["compact", "Mode compact"]
], Nt = [
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
let U = class extends k {
  setConfig(i) {
    this.config = { ...i };
  }
  integrationVersion() {
    if (!this.hass)
      return "unknown";
    const i = X(
      this.hass,
      void 0,
      "dashboard",
      this.config?.device_id
    ), e = i ? this.hass.states[i]?.attributes.integration_version : void 0;
    return typeof e == "string" && e ? e : "unknown";
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
    for (const t of Rt)
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
    const r = { ...this.config?.health ?? {} }, s = { ...r[i] ?? {} };
    e === "entity" && t === "" ? delete s.entity : Object.assign(s, { [e]: t }), r[i] = s;
    const a = {
      ...this.config,
      health: r
    };
    i === "weight" && (delete a.weight_entity, delete a.show_weight), this.emitConfig(a);
  }
  render() {
    if (!this.config || !this.hass)
      return c``;
    const i = xt(this.hass), e = this.config.device_id ?? (i.length === 1 ? i[0].id : ""), t = Object.keys(this.hass.states).filter(
      (s) => s.startsWith("sensor.") && (!e || this.hass.entities?.[s]?.device_id === e)
    ).sort(), r = Object.keys(this.hass.states).filter((s) => s.startsWith("sensor.")).sort();
    return c`
      <div class="editor">
        <label>
          Athlète / appareil
          <select
            .value=${e}
            @change=${(s) => this.changeDevice(
      s.target.value
    )}
          >
            <option value="">Sélectionner un athlète</option>
            ${i.map(
      (s) => c`
                <option value=${s.id}>
                  ${B(s)}
                </option>
              `
    )}
          </select>
        </label>

        ${i.length === 0 ? c`
              <p>
                Aucun appareil Intervals.icu détecté. Recharge Home
                Assistant après avoir configuré l’intégration.
              </p>
            ` : ""}

        <label>
          Titre
          <input
            .value=${this.config.title ?? "Intervals.icu"}
            @change=${(s) => this.change(
      "title",
      s.target.value
    )}
          />
        </label>

        <label>
          Nom affiché
          <input
            .value=${this.config.athlete_name ?? ""}
            placeholder="Nom de l’appareil par défaut"
            @change=${(s) => this.change(
      "athlete_name",
      s.target.value
    )}
          />
        </label>

        ${Ne.map(
      ([s, a, o]) => c`
            <label>
              ${a}
              <select
                .value=${String(
        this.config[s] ?? X(
          this.hass,
          void 0,
          o,
          e
        ) ?? ""
      )}
                @change=${(n) => this.change(
        s,
        n.target.value
      )}
              >
                <option value="">
                  Détection automatique pour cet athlète
                </option>
                ${t.map(
        (n) => c`
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

          ${Nt.map(({ key: s, label: a }) => {
      const o = this.healthMetricConfig(s);
      return c`
              <div class="health-editor-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${o.show}
                    @change=${(n) => this.changeHealthMetric(
        s,
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
        s,
        "entity",
        n.target.value
      )}
                  >
                    <option value="">
                      Détection automatique Intervals.icu
                    </option>
                    ${r.map(
        (n) => c`
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

        ${zt.map(
      ([s, a]) => c`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config[s] !== !1}
                @change=${(o) => this.change(
        s,
        o.target.checked
      )}
              />
              ${a}
            </label>
          `
    )}

        <details class="about-panel">
          <summary>
            <span class="about-summary">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              À propos
            </span>
            <span class="about-version">v${this.integrationVersion()}</span>
          </summary>

          <div class="about-content">
            <div class="about-heading">
              <ha-icon icon="mdi:chart-timeline-variant-shimmer"></ha-icon>
              <div>
                <strong>Intervals.icu pour Home Assistant</strong>
                <span>Développé par Alexandre Perez</span>
              </div>
            </div>

            <div class="about-links">
              <a href=${Ct} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
                Documentation
              </a>
              <a href=${Tt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:bug-outline"></ha-icon>
                Signaler un bug
              </a>
              <a href=${Pt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                Proposer une fonctionnalité
              </a>
              <a href=${H} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:github"></ha-icon>
                Dépôt GitHub
              </a>
            </div>

            <a
              class="beer-link"
              href=${Mt}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="beer-logo"
                src=${Ot}
                alt="Buy me a beer"
              />
              <ha-icon icon="mdi:open-in-new"></ha-icon>
            </a>
          </div>
        </details>
      </div>
    `;
  }
};
U.styles = Me;
ne([
  K({ attribute: !1 })
], U.prototype, "hass", 2);
ne([
  M()
], U.prototype, "config", 2);
U = ne([
  oe("ha-intervals-icu-card-editor")
], U);
var It = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, Y = (i, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? Ut(e, t) : e, a = i.length - 1, o; a >= 0; a--)
    (o = i[a]) && (s = (r ? o(e, t, s) : o(s)) || s);
  return r && s && It(e, t, s), s;
};
const Dt = [
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
let P = class extends k {
  constructor() {
    super(...arguments), this.refreshing = !1;
  }
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }
  static getStubConfig() {
    return {
      title: "Intervals.icu",
      show_atlas: !0,
      show_health: !0,
      show_records: !0,
      show_history: !0,
      show_workout: !0,
      show_last_activity: !0,
      show_sync_status: !0,
      show_refresh_button: !0,
      compact: !1,
      health: {
        weight: { show: !0 }
      }
    };
  }
  setConfig(i) {
    if (!i) throw new Error("Configuration manquante");
    this.config = {
      show_atlas: !0,
      show_health: !0,
      show_records: !0,
      show_history: !0,
      show_workout: !0,
      show_last_activity: !0,
      show_sync_status: !0,
      show_refresh_button: !0,
      compact: !1,
      ...i
    };
  }
  getCardSize() {
    return 10;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 9, min_rows: 5 };
  }
  async refresh() {
    if (!(!this.hass?.callService || this.refreshing)) {
      this.refreshing = !0;
      try {
        await this.hass.callService("ha_intervals_icu", "refresh", {});
      } finally {
        window.setTimeout(() => {
          this.refreshing = !1;
        }, 900);
      }
    }
  }
  sportIcon(i) {
    const e = (i ?? "").toLowerCase();
    return e.includes("ride") || e.includes("cycl") || e.includes("vélo") ? "mdi:bike-fast" : e.includes("run") || e.includes("course") ? "mdi:run-fast" : e.includes("swim") || e.includes("natation") ? "mdi:swim" : e.includes("strength") || e.includes("musculation") || e.includes("crossfit") ? "mdi:weight-lifter" : e.includes("walk") || e.includes("marche") ? "mdi:walk" : "mdi:arm-flex";
  }
  quickStat(i, e, t) {
    return c`<div class="quick-stat"><ha-icon icon=${i}></ha-icon><div><span>${e}</span><strong>${v(this.hass, t)}</strong></div></div>`;
  }
  state(i, e) {
    return this.hass ? g(
      this.hass,
      this.config?.[i],
      e,
      this.config?.device_id
    ) : void 0;
  }
  status(i, e) {
    const t = we(e);
    return t === null ? "neutral" : i === "form" ? t < -20 ? "danger" : t < -10 ? "warning" : "good" : i === "fatigue" ? t >= 80 ? "danger" : t >= 60 ? "warning" : "good" : "good";
  }
  metric(i, e, t, r) {
    const s = we(r), a = this.status(t, r), o = t === "form" ? -30 : 0, n = t === "form" ? 30 : 100, l = r?.attributes.change_7_days;
    return c`<article class="metric ${t}">
      <div class="metric-label">${i}</div>
      <div class="metric-value">${v(this.hass, r)}</div>
      <div class="metric-short">${e}</div>
      ${At(s, a, o, n)}
      <div class="metric-foot">
        7 j
        ${typeof l == "number" ? `${l > 0 ? "+" : ""}${l.toFixed(1)}` : "—"}
      </div>
    </article>`;
  }
  infoRow(i, e, t) {
    return c`<div class="info-row">
      <ha-icon icon=${i}></ha-icon>
      <span>${e}</span>
      <strong>${v(this.hass, t)}</strong>
    </div>`;
  }
  healthState(i) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[i]?.entity ?? (i === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : g(
      this.hass,
      void 0,
      u[i],
      this.config.device_id
    );
  }
  healthVisible(i, e) {
    const t = this.config?.health?.[i]?.show;
    return t !== void 0 ? t : i === "weight" && this.config?.show_weight !== void 0 ? this.config.show_weight : e;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const i = this.hass, e = this.state("fitness_entity", u.fitness), t = this.state("fatigue_entity", u.fatigue), r = this.state("form_entity", u.form), s = this.state("ftp_entity", u.ftp), a = this.state(
      "weekly_load_entity",
      u.weeklyLoad
    ), o = this.state(
      "weekly_activities_entity",
      u.weeklyActivities
    ), n = g(
      i,
      void 0,
      u.trainingStatus,
      this.config.device_id
    ), l = g(
      i,
      void 0,
      u.readinessScore,
      this.config.device_id
    ), m = g(
      i,
      void 0,
      u.readinessLevel,
      this.config.device_id
    ), f = g(
      i,
      void 0,
      u.readinessRecoveryHours,
      this.config.device_id
    ), p = g(
      i,
      void 0,
      u.atlasCoach,
      this.config.device_id
    ), d = this.config.device_id, b = d ? i.devices?.[d] : void 0, x = this.config.athlete_name || B(b), Ie = g(
      i,
      void 0,
      u.plannedTodayName,
      d
    ), Ue = g(
      i,
      void 0,
      u.plannedTodaySport,
      d
    ), De = g(
      i,
      void 0,
      u.plannedTodayDuration,
      d
    ), He = g(
      i,
      void 0,
      u.plannedTodayLoad,
      d
    ), je = g(
      i,
      void 0,
      u.lastActivityName,
      d
    ), Le = g(
      i,
      void 0,
      u.lastActivityType,
      d
    ), qe = g(
      i,
      void 0,
      u.lastActivityDate,
      d
    ), Fe = g(
      i,
      void 0,
      u.lastActivityDuration,
      d
    ), Ve = g(
      i,
      void 0,
      u.lastActivityLoad,
      d
    ), Be = g(
      i,
      void 0,
      u.lastActivityCalories,
      d
    ), ce = v(i, je), L = v(i, Le, "Activité"), We = L !== "Activité" && L.trim().toLowerCase() !== ce.trim().toLowerCase(), le = Dt.map((y) => ({
      ...y,
      state: this.healthState(y.key),
      visible: this.healthVisible(y.key, y.defaultShow)
    })).filter((y) => y.visible && y.state), de = $t(
      e?.last_updated ?? e?.last_changed
    );
    return c`<ha-card class=${this.config.compact ? "compact" : ""}>
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
              ${x ? c`<div class="athlete">${x}</div>` : h}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== !1 ? c`<div class="sync"><span class="dot ${de.level}"></span>${de.label}</div>` : h}
            ${this.config.show_refresh_button !== !1 ? c`<button class="refresh" title="Actualiser" @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>` : h}
          </div>
        </header>

        ${this.config.show_atlas !== !1 ? c`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>Atlas Readiness</span>
                </div>
                <div class="atlas-score">
                  <strong>${v(i, l)}</strong>
                  <span>${v(i, m, "Indisponible")}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>Récupération ${v(i, f)}</span>
                  <span><ha-icon icon=${n?.attributes.icon || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${v(i, n, "Statut inconnu")}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>Atlas Coach</span>
                </div>
                <h3>${v(i, p, "Aucune recommandation")}</h3>
                ${p?.attributes.recommendation ? c`<p>${String(p.attributes.recommendation)}</p>` : h}
                <div class="atlas-chips">
                  ${p?.attributes.intensity ? c`<span>${String(p.attributes.intensity)}</span>` : h}
                  ${p?.attributes.duration_minutes ? c`<span>${String(p.attributes.duration_minutes)} min</span>` : h}
                  ${p?.attributes.heart_rate_zone ? c`<span>${String(p.attributes.heart_rate_zone)}</span>` : h}
                </div>
              </article>
            </section>` : h}

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", e)}
          ${this.metric("FATIGUE", "ATL", "fatigue", t)}
          ${this.metric("FORME", "TSB", "form", r)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", s)}
          ${this.quickStat("mdi:chart-areaspline", "Charge 7 j", a)}
          ${this.quickStat("mdi:calendar-check", "Activités 7 j", o)}
        </section>

        ${this.config.show_history !== !1 ? c`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>Évolution</span>
              </div>
              ${kt([
      {
        label: "Fitness",
        values: J(e),
        className: "fitness-line"
      },
      {
        label: "Fatigue",
        values: J(t),
        className: "fatigue-line"
      },
      {
        label: "Forme",
        values: J(r),
        className: "form-line"
      }
    ])}
            </section>` : h}

        ${this.config.show_health !== !1 && le.length > 0 ? c`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>Santé et composition corporelle</span>
              </div>
              <div class="health-grid">
                ${le.map(
      (y) => c`
                    <div class="health-item">
                      <ha-icon icon=${y.icon}></ha-icon>
                      <div>
                        <span>${y.label}</span>
                        <strong>${v(i, y.state)}</strong>
                      </div>
                    </div>
                  `
    )}
              </div>
            </section>` : h}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? c`<article class="feature workout spotlight">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>Aujourd’hui</span>
                </div>
                <h3>
                  ${v(
      i,
      Ie,
      "Aucun entraînement planifié"
    )}
                </h3>
                <div class="pill">
                  ${v(i, Ue, "Entraînement")}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${v(i, De)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${v(i, He)}</span
                  >
                </div>
              </article>` : h}

          ${this.config.show_records !== !1 ? c`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>Records</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      g(
        i,
        void 0,
        u.recordFtp,
        d
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      "Distance",
      g(
        i,
        void 0,
        u.recordDistance,
        d
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      "Dénivelé",
      g(
        i,
        void 0,
        u.recordElevation,
        d
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      "Puissance max",
      g(
        i,
        void 0,
        u.recordMaxPower,
        d
      )
    )}
              </article>` : h}

          ${this.config.show_last_activity !== !1 ? c`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(L)}></ha-icon
                  ><span>Dernière activité</span>
                </div>
                <h3>${ce}</h3>
                ${We ? c`<div class="pill purple">${L}</div>` : h}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${v(i, qe)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${v(i, Fe)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${v(i, Be)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${v(i, Ve)}</span
                  >
                </div>
              </article>` : h}
        </section>
      </div>
    </ha-card>`;
  }
};
P.styles = Me;
Y([
  K({ attribute: !1 })
], P.prototype, "hass", 2);
Y([
  M()
], P.prototype, "config", 2);
Y([
  M()
], P.prototype, "refreshing", 2);
P = Y([
  oe("ha-intervals-icu-card")
], P);
var Ht = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, j = (i, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? jt(e, t) : e, a = i.length - 1, o; a >= 0; a--)
    (o = i[a]) && (s = (r ? o(e, t, s) : o(s)) || s);
  return r && s && Ht(e, t, s), s;
};
let S = class extends k {
  constructor() {
    super(...arguments), this.period = "30_days", this.section = "overview";
  }
  static getStubConfig() {
    return { title: "Intervals.icu Statistics", default_period: "30_days" };
  }
  setConfig(i) {
    this.config = { title: "Intervals.icu Statistics", default_period: "30_days", ...i }, this.period = this.config.default_period ?? "30_days";
  }
  getCardSize() {
    return 12;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 10, min_rows: 6 };
  }
  attrs() {
    return this.hass ? g(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id)?.attributes ?? {} : {};
  }
  number(i, e = 1) {
    const t = Number(i);
    return Number.isFinite(t) ? t.toLocaleString(void 0, { maximumFractionDigits: e }) : "—";
  }
  change(i) {
    const e = Number(i);
    if (!Number.isFinite(e)) return c`<span class="change neutral">—</span>`;
    const t = e > 3 ? "up" : e < -3 ? "down" : "neutral";
    return c`<span class="change ${t}">${e > 0 ? "+" : ""}${e.toFixed(1)}%</span>`;
  }
  tile(i, e, t, r = "", s) {
    return c`<article class="tile"><ha-icon icon=${i}></ha-icon><div><span>${e}</span><strong>${this.number(t)}${r}</strong>${s !== void 0 ? this.change(s) : h}</div></article>`;
  }
  overview(i) {
    const e = i.periods?.[this.period] ?? {}, t = e.current ?? {}, r = e.comparison ?? {};
    return c`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", "Activities", t.activities, "", r.activities_change_percent)}
        ${this.tile("mdi:clock-outline", "Duration", t.duration_hours, " h", r.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", "Distance", t.distance_km, " km", r.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", "Load", t.load, "", r.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", "Elevation", t.elevation_m, " m", r.elevation_m_change_percent)}
        ${this.tile("mdi:fire", "Calories", t.calories, " kcal", r.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", t.hrss, "", r.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", t.trimp, "", r.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(i.insights ?? []).map((s) => c`<div class="insight ${s.type ?? "info"}"><ha-icon icon=${s.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${s.title}</strong><span>${s.message}</span></div></div>`)}
      </div>`;
  }
  sports(i) {
    const e = i.sports?.[this.period] ?? {};
    return c`<div class="table">${Object.entries(e).map(([t, r]) => c`
      <div class="row"><strong>${t}</strong><span>${this.number(r.activities, 0)} act.</span><span>${this.number(r.duration_hours)} h</span><span>${this.number(r.distance_km)} km</span><span>Load ${this.number(r.load)}</span></div>`)}
      ${Object.keys(e).length ? h : c`<div class="empty">No sport data</div>`}
    </div>`;
  }
  records(i) {
    const e = i.period_records ?? {}, t = i.records_by_sport ?? {};
    return c`
      <div class="record-grid">
        ${Object.entries(e).map(([r, s]) => s ? c`<article class="record"><span>${r.replaceAll("_", " ")}</span><strong>${s.period}</strong><small>${this.number(s.load)} load · ${this.number(s.duration_hours)} h</small></article>` : h)}
      </div>
      ${Object.entries(t).map(([r, s]) => c`<details><summary>${r}</summary><div class="record-list">${Object.entries(s).map(([a, o]) => c`<div><span>${a.replaceAll("_", " ")}</span><strong>${this.number(o.value)}</strong><small>${o.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }
  trends(i) {
    const e = i.trends ?? {};
    return c`<div class="trend-grid">${Object.entries(e).map(([t, r]) => c`
      <article class="trend"><span>${t.replaceAll("_", " ")}</span><strong>${this.number(r.latest)}</strong><div class="trend-changes"><small>7d ${this.number(r.change_7_days)}</small><small>30d ${this.number(r.change_30_days)}</small><small>90d ${this.number(r.change_90_days)}</small><small>365d ${this.number(r.change_365_days)}</small></div></article>`)}
    </div>`;
  }
  quality(i) {
    const e = i.data_quality ?? {}, t = e.coverage ?? {};
    return c`<div class="quality-head"><strong>${this.number(e.completeness_percent)}%</strong><span>Activity data completeness · ${this.number(e.field_count, 0)} API fields</span></div>
      <div class="coverage">${Object.entries(t).map(([r, s]) => c`<div><span>${r.replaceAll("_", " ")}</span><progress max="100" value=${s.percent ?? 0}></progress><strong>${this.number(s.percent)}%</strong></div>`)}</div>`;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const i = this.attrs(), e = this.section === "sports" ? this.sports(i) : this.section === "records" ? this.records(i) : this.section === "trends" ? this.trends(i) : this.section === "quality" ? this.quality(i) : this.overview(i);
    return c`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>Statistics & Trends</span></div></div><nav>${["7_days", "30_days", "90_days", "365_days"].map((t) => c`<button class=${this.period === t ? "active" : ""} @click=${() => this.period = t}>${t.replace("_days", "d")}</button>`)}</nav></header>
      <div class="tabs">${["overview", "sports", "records", "trends", "quality"].map((t) => c`<button class=${this.section === t ? "active" : ""} @click=${() => this.section = t}>${t}</button>`)}</div>
      <section>${e}</section></div></ha-card>`;
  }
};
S.styles = Ae`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:520px){.shell{padding:14px}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
j([
  K({ attribute: !1 })
], S.prototype, "hass", 2);
j([
  M()
], S.prototype, "config", 2);
j([
  M()
], S.prototype, "period", 2);
j([
  M()
], S.prototype, "section", 2);
S = j([
  oe("ha-intervals-icu-statistics-card")
], S);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
window.customCards.some((i) => i.type === "ha-intervals-icu-statistics-card") || window.customCards.push({
  type: "ha-intervals-icu-statistics-card",
  name: "Intervals.icu Statistics Card",
  description: "Advanced 7/30/90/365-day statistics, records, trends and insights.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
console.info("%c HA Intervals.icu Card %c 1.3.0-beta11 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
