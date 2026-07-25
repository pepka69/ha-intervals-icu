const K = globalThis, he = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = /* @__PURE__ */ Symbol(), xe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (he && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = xe.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && xe.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const at = (t) => new De(typeof t == "string" ? t : t + "", void 0, pe), ee = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, s, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[a + 1], t[0]);
  return new De(i, t, pe);
}, ot = (t, e) => {
  if (he) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), s = K.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r);
  }
}, $e = he ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return at(i);
})(t) : t;
const { is: nt, defineProperty: lt, getOwnPropertyDescriptor: ct, getOwnPropertyNames: dt, getOwnPropertySymbols: ht, getPrototypeOf: pt } = Object, te = globalThis, we = te.trustedTypes, ut = we ? we.emptyScript : "", gt = te.reactiveElementPolyfillSupport, D = (t, e) => t, J = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ut : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, ue = (t, e) => !nt(t, e), ke = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), te.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ke) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, r, i);
      s !== void 0 && lt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: s, set: a } = ct(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const n = s?.call(this);
      a?.call(this, o), this.requestUpdate(e, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const i = this.properties, r = [...dt(i), ...ht(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, s] of i) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const s = this._$Eu(i, r);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) i.unshift($e(s));
    } else e !== void 0 && i.push($e(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ot(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : J).toAttribute(i, r.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : J;
      this._$Em = s;
      const n = o.fromAttribute(i, a.type);
      this[s] = n ?? this._$Ej?.get(s) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, s = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? ue)(a, i) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: s, wrapped: a }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[D("elementProperties")] = /* @__PURE__ */ new Map(), R[D("finalized")] = /* @__PURE__ */ new Map(), gt?.({ ReactiveElement: R }), (te.reactiveElementVersions ??= []).push("2.1.2");
const ge = globalThis, Ae = (t) => t, Q = ge.trustedTypes, Se = Q ? Q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, je = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ue = "?" + x, mt = `<${Ue}>`, E = document, j = () => E.createComment(""), U = (t) => t === null || typeof t != "object" && typeof t != "function", me = Array.isArray, ft = (t) => me(t) || typeof t?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ce = /-->/g, Ee = />/g, S = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Me = /"/g, Ie = /^(?:script|style|textarea|title)$/i, He = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = He(1), le = He(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), C = E.createTreeWalker(E, 129);
function Le(t, e) {
  if (!me(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Se !== void 0 ? Se.createHTML(e) : e;
}
const vt = (t, e) => {
  const i = t.length - 1, r = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = z;
  for (let n = 0; n < i; n++) {
    const d = t[n];
    let m, v, u = -1, p = 0;
    for (; p < d.length && (o.lastIndex = p, v = o.exec(d), v !== null); ) p = o.lastIndex, o === z ? v[1] === "!--" ? o = Ce : v[1] !== void 0 ? o = Ee : v[2] !== void 0 ? (Ie.test(v[2]) && (s = RegExp("</" + v[2], "g")), o = S) : v[3] !== void 0 && (o = S) : o === S ? v[0] === ">" ? (o = s ?? z, u = -1) : v[1] === void 0 ? u = -2 : (u = o.lastIndex - v[2].length, m = v[1], o = v[3] === void 0 ? S : v[3] === '"' ? Me : Te) : o === Me || o === Te ? o = S : o === Ce || o === Ee ? o = z : (o = S, s = void 0);
    const _ = o === S && t[n + 1].startsWith("/>") ? " " : "";
    a += o === z ? d + mt : u >= 0 ? (r.push(m), d.slice(0, u) + je + d.slice(u) + x + _) : d + x + (u === -2 ? n : _);
  }
  return [Le(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class I {
  constructor({ strings: e, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, d = this.parts, [m, v] = vt(e, i);
    if (this.el = I.createElement(m, r), C.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = C.nextNode()) !== null && d.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(je)) {
          const p = v[o++], _ = s.getAttribute(u).split(x), A = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: a, name: A[2], strings: _, ctor: A[1] === "." ? _t : A[1] === "?" ? bt : A[1] === "@" ? xt : ie }), s.removeAttribute(u);
        } else u.startsWith(x) && (d.push({ type: 6, index: a }), s.removeAttribute(u));
        if (Ie.test(s.tagName)) {
          const u = s.textContent.split(x), p = u.length - 1;
          if (p > 0) {
            s.textContent = Q ? Q.emptyScript : "";
            for (let _ = 0; _ < p; _++) s.append(u[_], j()), C.nextNode(), d.push({ type: 2, index: ++a });
            s.append(u[p], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ue) d.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(x, u + 1)) !== -1; ) d.push({ type: 7, index: a }), u += x.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const r = E.createElement("template");
    return r.innerHTML = e, r;
  }
}
function O(t, e, i = t, r) {
  if (e === P) return e;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const a = U(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(t), s._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (e = O(t, s._$AS(t, e.values), s, r)), e;
}
class yt {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, s = (e?.creationScope ?? E).importNode(i, !0);
    C.currentNode = s;
    let a = C.nextNode(), o = 0, n = 0, d = r[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let m;
        d.type === 2 ? m = new F(a, a.nextSibling, this, e) : d.type === 1 ? m = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (m = new $t(a, this, e)), this._$AV.push(m), d = r[++n];
      }
      o !== d?.index && (a = C.nextNode(), o++);
    }
    return C.currentNode = E, s;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = O(this, e, i), U(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = I.createElement(Le(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const a = new yt(s, this), o = a.u(this.options);
      a.p(i), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Re.get(e.strings);
    return i === void 0 && Re.set(e.strings, i = new I(e)), i;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const a of e) s === i.length ? i.push(r = new F(this.O(j()), this.O(j()), this, this.options)) : r = i[s], r._$AI(a), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = Ae(e).nextSibling;
      Ae(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, s, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(e, i = this, r, s) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = O(this, e, i, 0), o = !U(e) || e !== this._$AH && e !== P, o && (this._$AH = e);
    else {
      const n = e;
      let d, m;
      for (e = a[0], d = 0; d < a.length - 1; d++) m = O(this, n[r + d], i, d), m === P && (m = this._$AH[d]), o ||= !U(m) || m !== this._$AH[d], m === h ? e = h : e !== h && (e += (m ?? "") + a[d + 1]), this._$AH[d] = m;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class bt extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class xt extends ie {
  constructor(e, i, r, s, a) {
    super(e, i, r, s, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = O(this, e, i, 0) ?? h) === P) return;
    const r = this._$AH, s = e === h && r !== h || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== h && (r === h || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $t {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const wt = ge.litHtmlPolyfillSupport;
wt?.(I, F), (ge.litHtmlVersions ??= []).push("3.3.3");
const kt = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const a = i?.renderBefore ?? null;
    r._$litPart$ = s = new F(e.insertBefore(j(), a), a, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
const fe = globalThis;
class $ extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = kt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
$._$litElement$ = !0, $.finalized = !0, fe.litElementHydrateSupport?.({ LitElement: $ });
const At = fe.litElementPolyfillSupport;
At?.({ LitElement: $ });
(fe.litElementVersions ??= []).push("4.2.2");
const re = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const St = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: ue }, Ct = (t = St, e, i) => {
  const { kind: r, metadata: s } = i;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), r === "accessor") {
    const { name: o } = i;
    return { set(n) {
      const d = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, d, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, t, n), n;
    } };
  }
  if (r === "setter") {
    const { name: o } = i;
    return function(n) {
      const d = this[o];
      e.call(this, n), this.requestUpdate(o, d, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function V(t) {
  return (e, i) => typeof i == "object" ? Ct(t, e, i) : ((r, s, a) => {
    const o = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(t, e, i);
}
function w(t) {
  return V({ ...t, state: !0, attribute: !1 });
}
const qe = ee`
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
`, Fe = "ha_intervals_icu", g = {
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
}, Ve = {
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
  Musculation: "Musculation",
  Workout: "Entraînement",
  Yoga: "Yoga"
};
function Pe(t, e, i) {
  return i ? t.entities?.[e]?.device_id === i : !0;
}
function Be(t) {
  return Object.values(t.entities ?? {});
}
function Et(t, e) {
  if (t.translation_key === e)
    return !0;
  const i = t.unique_id ?? "";
  return i === e || i.endsWith(`_${e}`) || i.endsWith(`-${e}`);
}
function Tt(t, e) {
  const i = (e ?? "s").trim().toLowerCase();
  return ["ms", "millisecond", "milliseconds"].includes(i) ? t / 1e3 : ["min", "minute", "minutes"].includes(i) ? t * 60 : ["h", "hr", "hour", "hours"].includes(i) ? t * 3600 : ["d", "day", "days"].includes(i) ? t * 86400 : t;
}
function Z(t, e) {
  const i = Math.max(
    0,
    Math.round(Tt(t, e))
  ), r = Math.floor(i / 86400), s = Math.floor(i % 86400 / 3600), a = Math.floor(i % 3600 / 60), o = i % 60, n = [];
  return r > 0 && n.push(`${r} j`), s > 0 && n.push(`${s} h`), a > 0 && n.push(`${a} min`), o > 0 && r === 0 && s === 0 && n.push(`${o} s`), n.length > 0 ? n.join(" ") : "0 s";
}
function Mt(t) {
  const e = Ve[t];
  if (e)
    return e;
  const i = t.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return i ? i.charAt(0).toUpperCase() + i.slice(1).toLowerCase() : t;
}
function Rt(t) {
  const e = t.attributes.unit_of_measurement, i = t.attributes.translation_key, r = t.entity_id ?? "";
  return e === "s" || i === "planned_today_duration" || i === "last_activity_duration" || r.endsWith("_planned_today_duration") || r.endsWith("_last_activity_duration");
}
function Pt(t) {
  const e = t.attributes.translation_key, i = t.entity_id ?? "";
  return e === "planned_today_sport" || e === "last_activity_type" || i.endsWith("_planned_today_sport") || i.endsWith("_last_activity_type") || !!Ve[t.state];
}
function We(t) {
  return [...new Set(
    Be(t).filter(
      (i) => i.platform === Fe && typeof i.device_id == "string"
    ).map((i) => i.device_id)
  )].map((i) => t.devices?.[i]).filter((i) => !!i).sort((i, r) => H(i).localeCompare(H(r)));
}
function H(t) {
  return t?.name_by_user ?? t?.name ?? "Athlète Intervals.icu";
}
function ce(t, e, i, r) {
  if (e && t.states[e] && Pe(t, e, r))
    return e;
  const s = Be(t).find(
    (o) => o.platform === Fe && typeof o.entity_id == "string" && (!r || o.device_id === r) && Et(o, i)
  );
  if (s?.entity_id && t.states[s.entity_id])
    return s.entity_id;
  const a = `_${i}`;
  return Object.keys(t.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(a) && Pe(t, o, r)
  );
}
function f(t, e, i, r) {
  const s = ce(t, e, i, r);
  return s ? t.states[s] : void 0;
}
function Oe(t) {
  if (!t || ["unknown", "unavailable", "none", ""].includes(t.state))
    return null;
  const e = Number(t.state);
  return Number.isFinite(e) ? e : null;
}
function y(t, e, i = "—") {
  if (!e || ["unknown", "unavailable", "none", ""].includes(e.state))
    return i;
  if (Rt(e)) {
    const r = Number(e.state);
    if (Number.isFinite(r))
      return Z(r, e.attributes.unit_of_measurement);
  }
  if (Pt(e))
    return Mt(e.state);
  try {
    return t.formatEntityState?.(e) ?? `${e.state}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return e.state;
  }
}
function ne(t) {
  const e = t?.attributes.history;
  return Array.isArray(e) ? e.map((i) => typeof i == "object" && i !== null && "value" in i ? Number(i.value) : Number(i)).filter(Number.isFinite) : [];
}
function Ot(t, e, i, r, s) {
  return t.map((a, o) => {
    const n = t.length === 1 ? e / 2 : o / (t.length - 1) * e, d = i - (a - r) / s * (i - 22) - 11;
    return `${n.toFixed(1)},${d.toFixed(1)}`;
  }).join(" ");
}
function zt(t) {
  const e = t.filter((p) => p.values.length >= 2);
  if (e.length === 0) return c`<div class="empty">Historique indisponible</div>`;
  const i = 760, r = 220, s = e.flatMap((p) => p.values), a = Math.min(...s), o = Math.max(...s), n = Math.max((o - a) * 0.12, 2), d = a - n, v = o + n - d || 1, u = [0, 1, 2, 3, 4];
  return c`
    <div class="chart-legend">
      ${e.map((p) => c`<span><i class=${p.className}></i>${p.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${i} ${r}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${u.map((p) => {
    const _ = 10 + p / 4 * (r - 20);
    return le`<line class="grid-line" x1="0" y1=${_} x2=${i} y2=${_}></line>`;
  })}
      ${e.map((p) => le`<polyline class="series ${p.className}" points=${Ot(p.values, i, r, d, v)}></polyline>`)}
    </svg>`;
}
function Nt(t, e, i, r) {
  const a = ((t === null ? 0 : Math.min(r, Math.max(i, t))) - i) / (r - i || 1), o = Math.PI * 52, n = Math.max(0, Math.min(o, a * o));
  return c`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${le`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${n} ${o}"></path>`}
  </svg>`;
}
const Dt = {
  refresh: "Actualiser",
  atlas_readiness: "Préparation Atlas",
  atlas_coach: "Coach Atlas",
  recovery: "Récupération",
  unavailable: "Indisponible",
  unknown_status: "Statut inconnu",
  no_recommendation: "Aucune recommandation",
  fitness: "CONDITION",
  fatigue: "FATIGUE",
  form: "FORME",
  load_7d: "Charge 7 j",
  activities_7d: "Activités 7 j",
  evolution: "Évolution",
  health: "Santé et composition corporelle",
  today: "Aujourd’hui",
  no_workout: "Aucun entraînement planifié",
  workout: "Entraînement",
  load: "Charge",
  records: "Records",
  distance: "Distance",
  elevation: "Dénivelé",
  max_power: "Puissance max",
  last_activity: "Dernière activité",
  activity: "Activité",
  activity_short: "act.",
  overview: "Vue d’ensemble",
  sports: "Sports",
  trends: "Tendances",
  quality: "Qualité",
  statistics_trends: "Statistiques et tendances",
  activities: "Activités",
  duration: "Durée",
  calories: "Calories",
  no_sport_data: "Aucune donnée sportive",
  completeness: "Complétude des données d’activité",
  api_fields: "champs API",
  training_load: "Charge d’entraînement",
  sport_mix: "Répartition des sports",
  previous_period: "période précédente",
  higher: "supérieure",
  lower: "inférieure",
  stable: "stable",
  represents: "représente",
  training_time: "du temps d’entraînement",
  last_30_days: "sur les 30 derniers jours",
  sync_unknown: "Synchronisation inconnue",
  sync_now: "Synchronisé à l’instant",
  sync_minutes: "Synchronisé il y a {value} min",
  sync_hours: "Synchronisé il y a {value} h",
  sync_days: "Synchronisé il y a {value} j",
  weight: "Poids",
  body_fat: "Graisse corporelle",
  muscle_mass: "Masse musculaire",
  bone_mass: "Masse osseuse",
  body_water: "Eau corporelle",
  visceral_fat: "Graisse viscérale",
  bmi: "IMC",
  metabolic_age: "Âge métabolique",
  resting_hr: "FC au repos",
  hrv: "HRV",
  sleep: "Sommeil",
  vo2max: "VO₂max",
  blood_oxygen: "Oxygène sanguin",
  respiration_rate: "Respiration",
  body_temperature: "Température",
  stress: "Stress",
  daily_calories: "Calories quotidiennes",
  athlete_device: "Athlète / appareil",
  select_athlete: "Sélectionner un athlète",
  no_intervals_device: "Aucun appareil Intervals.icu détecté. Rechargez Home Assistant après avoir configuré l’intégration.",
  title: "Titre",
  default_period: "Période par défaut",
  statistics_entity: "Entité Statistiques",
  automatic_athlete_detection: "Détection automatique pour cet athlète",
  period_7_days: "7 jours",
  period_30_days: "30 jours",
  period_90_days: "90 jours",
  period_365_days: "365 jours",
  day_short: "j"
}, ze = {
  refresh: "Refresh",
  atlas_readiness: "Atlas Readiness",
  atlas_coach: "Atlas Coach",
  recovery: "Recovery",
  unavailable: "Unavailable",
  unknown_status: "Unknown status",
  no_recommendation: "No recommendation",
  fitness: "FITNESS",
  fatigue: "FATIGUE",
  form: "FORM",
  load_7d: "7-day load",
  activities_7d: "7-day activities",
  evolution: "Evolution",
  health: "Health and body composition",
  today: "Today",
  no_workout: "No workout planned",
  workout: "Workout",
  load: "Load",
  records: "Records",
  distance: "Distance",
  elevation: "Elevation",
  max_power: "Max power",
  last_activity: "Last activity",
  activity: "Activity",
  activity_short: "act.",
  overview: "Overview",
  sports: "Sports",
  trends: "Trends",
  quality: "Quality",
  statistics_trends: "Statistics & trends",
  activities: "Activities",
  duration: "Duration",
  calories: "Calories",
  no_sport_data: "No sport data",
  completeness: "Activity data completeness",
  api_fields: "API fields",
  training_load: "Training load",
  sport_mix: "Sport mix",
  previous_period: "previous period",
  higher: "higher",
  lower: "lower",
  stable: "stable",
  represents: "represents",
  training_time: "of training time",
  last_30_days: "over the last 30 days",
  sync_unknown: "Sync unknown",
  sync_now: "Synced just now",
  sync_minutes: "Synced {value} min ago",
  sync_hours: "Synced {value} h ago",
  sync_days: "Synced {value} d ago",
  weight: "Weight",
  body_fat: "Body fat",
  muscle_mass: "Muscle mass",
  bone_mass: "Bone mass",
  body_water: "Body water",
  visceral_fat: "Visceral fat",
  bmi: "BMI",
  metabolic_age: "Metabolic age",
  resting_hr: "Resting HR",
  hrv: "HRV",
  sleep: "Sleep",
  vo2max: "VO₂max",
  blood_oxygen: "Blood oxygen",
  respiration_rate: "Respiration",
  body_temperature: "Temperature",
  stress: "Stress",
  daily_calories: "Daily calories",
  athlete_device: "Athlete / device",
  select_athlete: "Select an athlete",
  no_intervals_device: "No Intervals.icu device detected. Reload Home Assistant after configuring the integration.",
  title: "Title",
  default_period: "Default period",
  statistics_entity: "Statistics entity",
  automatic_athlete_detection: "Automatic detection for this athlete",
  period_7_days: "7 days",
  period_30_days: "30 days",
  period_90_days: "90 days",
  period_365_days: "365 days",
  day_short: "d"
};
function se(t) {
  return (t?.locale?.language ?? t?.language ?? navigator.language ?? "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
function l(t, e, i = {}) {
  let r = (se(t) === "fr" ? Dt : ze)[e] ?? ze[e] ?? e;
  for (const [s, a] of Object.entries(i))
    r = r.replaceAll(`{${s}}`, String(a));
  return r;
}
const jt = {
  overview: "Vue d’ensemble",
  training_load: "Charge d’entraînement",
  sleep: "Sommeil",
  sport_mix: "Répartition des sports",
  moderate: "Modérée",
  low: "Faible",
  very_low: "Très faible",
  good: "Bonne",
  high: "Élevée",
  excellent: "Excellente",
  productive_load: "Charge productive",
  productive: "Productive",
  maintaining: "Maintien",
  overreaching: "Surcharge",
  detraining: "Désentraînement",
  recovering: "Récupération",
  recovery: "Récupération",
  optimal: "Optimale",
  balanced: "Équilibrée",
  easy: "Facile",
  easy_session: "Séance facile",
  rest_day: "Jour de repos",
  endurance: "Endurance",
  tempo: "Tempo",
  threshold: "Seuil",
  sweetspot: "Sweet spot",
  sweet_spot: "Sweet spot",
  vo2max: "VO₂max",
  anaerobic: "Anaérobie",
  race: "Course"
};
function N(t, e) {
  const i = String(e ?? "").trim();
  if (!i || se(t) !== "fr")
    return i;
  const r = i.toLowerCase().replace(/[\s-]+/g, "_");
  return jt[r] ?? i.replace(/_/g, " ").replace(/^./, (s) => s.toUpperCase());
}
function Y(t, e) {
  const i = String(e ?? "").trim();
  if (!i || se(t) !== "fr")
    return i;
  let r = i.match(
    /^(\d+)-day load\s+(?:is\s+)?([\d.,]+)%\s+(lower|higher) than the previous period\.?$/i
  );
  return r ? `Charge sur ${r[1]} jours ${r[2]} % ${r[3].toLowerCase() === "lower" ? "inférieure" : "supérieure"} à la période précédente` : /^Latest sleep is more than one hour below the value from seven days ago\.?$/i.test(
    i
  ) ? "Le dernier sommeil est inférieur de plus d’une heure à celui d’il y a sept jours" : (r = i.match(
    /^(.+?) represents\s+([\d.,]+)% of training time over the last\s+(\d+) days\.?$/i
  ), r ? `${X(t, r[1])} représente ${r[2]} % du temps d’entraînement sur les ${r[3]} derniers jours` : N(t, i));
}
const Ut = {
  ride: "Vélo",
  virtualride: "Vélo virtuel",
  mountainbikeride: "VTT",
  gravelride: "Gravel",
  ebikeride: "Vélo électrique",
  run: "Course à pied",
  virtualrun: "Course virtuelle",
  trailrun: "Trail",
  walk: "Marche",
  hike: "Randonnée",
  swim: "Natation",
  openwaterswim: "Natation en eau libre",
  poolswim: "Natation en piscine",
  weighttraining: "Musculation",
  strengthtraining: "Renforcement musculaire",
  crossfit: "CrossFit",
  workout: "Entraînement",
  yoga: "Yoga",
  pilates: "Pilates",
  rowing: "Aviron",
  indoorrowing: "Rameur",
  kayaking: "Kayak",
  canoeing: "Canoë",
  alpineski: "Ski alpin",
  nordicski: "Ski de fond",
  snowboard: "Snowboard",
  other: "Autre activité"
};
function X(t, e, i) {
  const r = String(e ?? "").trim();
  if (!r)
    return i ?? l(t, "activity");
  if (se(t) !== "fr")
    return r.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const s = r.replace(/[\s_-]+/g, "").toLowerCase();
  return Ut[s] ?? r.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function It(t, e) {
  if (!e)
    return { label: l(t, "sync_unknown"), level: "danger" };
  const i = new Date(e).getTime();
  if (!Number.isFinite(i))
    return { label: l(t, "sync_unknown"), level: "danger" };
  const r = Math.max(0, Math.floor((Date.now() - i) / 6e4));
  if (r < 1)
    return { label: l(t, "sync_now"), level: "good" };
  if (r < 60)
    return {
      label: l(t, "sync_minutes", { value: r }),
      level: r < 5 ? "good" : r <= 30 ? "warning" : "danger"
    };
  const s = Math.floor(r / 60);
  return s < 24 ? {
    label: l(t, "sync_hours", { value: s }),
    level: "danger"
  } : {
    label: l(t, "sync_days", { value: Math.floor(s / 24) }),
    level: "danger"
  };
}
function Ne(t, e = "Activity", i) {
  return X(i, t, e);
}
var Ht = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, ve = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Lt(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && Ht(e, i, s), s;
};
const B = "https://github.com/pepka69/ha-intervals-icu", qt = `${B}/blob/develop/README.fr.md`, Ft = `${B}/issues`, Vt = `${B}/issues/new/choose`, Bt = "https://buymeacoffee.com/pep_ka", Wt = `${B}/raw/develop/.github/assets/buy-me-a-beer-en.png`, Ge = [
  ["fitness_entity", "Fitness", g.fitness],
  ["fatigue_entity", "Fatigue", g.fatigue],
  ["form_entity", "Forme", g.form],
  ["ftp_entity", "FTP", g.ftp],
  ["weekly_load_entity", "Charge 7 jours", g.weeklyLoad],
  [
    "weekly_activities_entity",
    "Activités 7 jours",
    g.weeklyActivities
  ]
], Gt = Ge.map(
  ([t]) => t
), Kt = [
  ["show_atlas", "Afficher Coach Atlas et Readiness"],
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_sync_status", "Afficher l’état de synchronisation"],
  ["show_refresh_button", "Afficher le bouton Actualiser"],
  ["compact", "Mode compact"]
], Zt = [
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
let L = class extends $ {
  setConfig(t) {
    this.config = { ...t };
  }
  integrationVersion() {
    if (!this.hass)
      return "unknown";
    const t = ce(
      this.hass,
      void 0,
      "dashboard",
      this.config?.device_id
    ), e = t ? this.hass.states[t]?.attributes.integration_version : void 0;
    return typeof e == "string" && e ? e : "unknown";
  }
  emitConfig(t) {
    this.config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  change(t, e) {
    const i = { ...this.config };
    e === "" ? delete i[t] : Object.assign(i, { [t]: e }), this.emitConfig(i);
  }
  changeDevice(t) {
    const e = {
      ...this.config,
      device_id: t || void 0
    };
    for (const i of Gt)
      delete e[i];
    this.emitConfig(e);
  }
  healthMetricConfig(t) {
    const e = this.config?.health?.[t];
    return t === "weight" ? {
      show: e?.show ?? this.config?.show_weight ?? !0,
      entity: e?.entity ?? this.config?.weight_entity ?? ""
    } : {
      show: e?.show ?? !1,
      entity: e?.entity ?? ""
    };
  }
  changeHealthMetric(t, e, i) {
    const r = { ...this.config?.health ?? {} }, s = { ...r[t] ?? {} };
    e === "entity" && i === "" ? delete s.entity : Object.assign(s, { [e]: i }), r[t] = s;
    const a = {
      ...this.config,
      health: r
    };
    t === "weight" && (delete a.weight_entity, delete a.show_weight), this.emitConfig(a);
  }
  render() {
    if (!this.config || !this.hass)
      return c``;
    const t = We(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter(
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
            ${t.map(
      (s) => c`
                <option value=${s.id}>
                  ${H(s)}
                </option>
              `
    )}
          </select>
        </label>

        ${t.length === 0 ? c`
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

        ${Ge.map(
      ([s, a, o]) => c`
            <label>
              ${a}
              <select
                .value=${String(
        this.config[s] ?? ce(
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
                ${i.map(
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

          ${Zt.map(({ key: s, label: a }) => {
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

        ${Kt.map(
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
              <a href=${qt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
                Documentation
              </a>
              <a href=${Ft} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:bug-outline"></ha-icon>
                Signaler un bug
              </a>
              <a href=${Vt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                Proposer une fonctionnalité
              </a>
              <a href=${B} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:github"></ha-icon>
                Dépôt GitHub
              </a>
            </div>

            <a
              class="beer-link"
              href=${Bt}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="beer-logo"
                src=${Wt}
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
L.styles = qe;
ve([
  V({ attribute: !1 })
], L.prototype, "hass", 2);
ve([
  w()
], L.prototype, "config", 2);
L = ve([
  re("ha-intervals-icu-card-editor")
], L);
var Yt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, W = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Jt(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && Yt(e, i, s), s;
};
const Qt = [
  { key: "weight", label: "weight", icon: "mdi:scale-bathroom", defaultShow: !0 },
  { key: "body_fat", label: "body_fat", icon: "mdi:percent-outline", defaultShow: !1 },
  { key: "muscle_mass", label: "muscle_mass", icon: "mdi:arm-flex", defaultShow: !1 },
  { key: "bone_mass", label: "bone_mass", icon: "mdi:bone", defaultShow: !1 },
  { key: "body_water", label: "body_water", icon: "mdi:water-percent", defaultShow: !1 },
  { key: "visceral_fat", label: "visceral_fat", icon: "mdi:human-male", defaultShow: !1 },
  { key: "bmi", label: "bmi", icon: "mdi:human", defaultShow: !1 },
  { key: "metabolic_age", label: "metabolic_age", icon: "mdi:calendar-heart", defaultShow: !1 },
  { key: "resting_hr", label: "resting_hr", icon: "mdi:heart-pulse", defaultShow: !1 },
  { key: "hrv", label: "HRV", icon: "mdi:heart-flash", defaultShow: !1 },
  { key: "sleep", label: "sleep", icon: "mdi:sleep", defaultShow: !1 },
  { key: "vo2max", label: "VO₂max", icon: "mdi:lungs", defaultShow: !1 },
  { key: "blood_oxygen", label: "blood_oxygen", icon: "mdi:water-plus-outline", defaultShow: !1 },
  { key: "respiration_rate", label: "respiration_rate", icon: "mdi:weather-windy", defaultShow: !1 },
  { key: "body_temperature", label: "body_temperature", icon: "mdi:thermometer", defaultShow: !1 },
  { key: "stress", label: "Stress", icon: "mdi:head-heart-outline", defaultShow: !1 },
  { key: "daily_calories", label: "daily_calories", icon: "mdi:fire", defaultShow: !1 }
];
let T = class extends $ {
  constructor() {
    super(...arguments), this.refreshing = !1, this.closeTooltipFromDocument = (t) => {
      const e = t.composedPath();
      this.tooltip?.pinned && !e.includes(this) && (this.tooltip = void 0);
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("pointerdown", this.closeTooltipFromDocument);
  }
  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.closeTooltipFromDocument), super.disconnectedCallback();
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
  setConfig(t) {
    if (!t) throw new Error("Configuration manquante");
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
      ...t
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
  sportIcon(t) {
    const e = (t ?? "").toLowerCase();
    return e.includes("ride") || e.includes("cycl") || e.includes("vélo") ? "mdi:bike-fast" : e.includes("run") || e.includes("course") ? "mdi:run-fast" : e.includes("swim") || e.includes("natation") ? "mdi:swim" : e.includes("strength") || e.includes("musculation") || e.includes("crossfit") ? "mdi:weight-lifter" : e.includes("walk") || e.includes("marche") ? "mdi:walk" : "mdi:arm-flex";
  }
  quickStat(t, e, i) {
    return c`<div class="quick-stat"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${y(this.hass, i)}</strong></div></div>`;
  }
  state(t, e) {
    return this.hass ? f(
      this.hass,
      this.config?.[t],
      e,
      this.config?.device_id
    ) : void 0;
  }
  status(t, e) {
    const i = Oe(e);
    return i === null ? "neutral" : t === "form" ? i < -20 ? "danger" : i < -10 ? "warning" : "good" : t === "fatigue" ? i >= 80 ? "danger" : i >= 60 ? "warning" : "good" : "good";
  }
  tooltipPosition(t) {
    const i = t.currentTarget.getBoundingClientRect(), r = 170;
    return {
      x: Math.max(
        r,
        Math.min(
          i.left + i.width / 2,
          window.innerWidth - r
        )
      ),
      y: i.top
    };
  }
  showMetricTooltip(t, e, i = !1) {
    if (i && this.tooltip?.pinned && this.tooltip.key === e) {
      this.tooltip = void 0;
      return;
    }
    const r = this.metricTooltip(e), s = this.tooltipPosition(t);
    this.tooltip = {
      key: e,
      title: r.title,
      text: r.text,
      x: s.x,
      y: s.y,
      pinned: i
    };
  }
  hideMetricTooltip() {
    this.tooltip?.pinned || (this.tooltip = void 0);
  }
  handleMetricKeydown(t, e) {
    if (t.key === "Escape") {
      this.tooltip = void 0;
      return;
    }
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.showMetricTooltip(t, e, !0));
  }
  renderMetricTooltip() {
    if (!this.tooltip)
      return h;
    const t = this.tooltip.y < 180;
    return c`
      <div
        class="metric-tooltip ${t ? "bottom" : ""}"
        role="tooltip"
        style=${`left: ${this.tooltip.x}px; top: ${this.tooltip.y}px;`}
      >
        <strong>${this.tooltip.title}</strong>
        <span>${this.tooltip.text}</span>
      </div>
    `;
  }
  metricTooltip(t) {
    return t === "fitness" ? {
      title: "Fitness · CTL",
      text: `Charge d’entraînement chronique calculée sur environ 42 jours.

Une valeur en hausse indique généralement que votre niveau d’entraînement progresse.`
    } : t === "fatigue" ? {
      title: "Fatigue · ATL",
      text: `Charge d’entraînement récente calculée sur environ 7 jours.

Une valeur élevée indique une fatigue accumulée plus importante.`
    } : {
      title: "Form · TSB",
      text: `Différence entre la Fitness et la Fatigue.

Une valeur négative indique généralement de la fatigue. Une valeur positive indique davantage de fraîcheur.`
    };
  }
  metric(t, e, i, r) {
    const s = Oe(r), a = this.status(i, r), o = i === "form" ? -30 : 0, n = i === "form" ? 30 : 100, d = r?.attributes.change_7_days;
    return c`
      <article
        class="metric ${i}"
        tabindex="0"
        aria-label=${`${t} — ${this.metricTooltip(i).title}`}
        @mouseenter=${(m) => this.showMetricTooltip(m, i)}
        @mouseleave=${() => this.hideMetricTooltip()}
        @focus=${(m) => this.showMetricTooltip(m, i)}
        @blur=${() => this.hideMetricTooltip()}
        @click=${(m) => {
      m.stopPropagation(), this.showMetricTooltip(m, i, !0);
    }}
        @keydown=${(m) => this.handleMetricKeydown(m, i)}
      >
        <div class="metric-label">${t}</div>
        <div class="metric-value">${y(this.hass, r)}</div>
        <div class="metric-short">${e}</div>
        ${Nt(s, a, o, n)}
        <div class="metric-foot">
          7 j
          ${typeof d == "number" ? `${d > 0 ? "+" : ""}${d.toFixed(1)}` : "—"}
        </div>
      </article>
    `;
  }
  infoRow(t, e, i) {
    return c`<div class="info-row">
      <ha-icon icon=${t}></ha-icon>
      <span>${e}</span>
      <strong>${y(this.hass, i)}</strong>
    </div>`;
  }
  healthState(t) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[t]?.entity ?? (t === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : f(
      this.hass,
      void 0,
      g[t],
      this.config.device_id
    );
  }
  healthVisible(t, e) {
    const i = this.config?.health?.[t]?.show;
    return i !== void 0 ? i : t === "weight" && this.config?.show_weight !== void 0 ? this.config.show_weight : e;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const t = this.hass, e = this.state("fitness_entity", g.fitness), i = this.state("fatigue_entity", g.fatigue), r = this.state("form_entity", g.form), s = this.state("ftp_entity", g.ftp), a = this.state(
      "weekly_load_entity",
      g.weeklyLoad
    ), o = this.state(
      "weekly_activities_entity",
      g.weeklyActivities
    ), n = f(
      t,
      void 0,
      g.trainingStatus,
      this.config.device_id
    ), d = f(
      t,
      void 0,
      g.readinessScore,
      this.config.device_id
    ), m = f(
      t,
      void 0,
      g.readinessLevel,
      this.config.device_id
    ), v = f(
      t,
      void 0,
      g.readinessRecoveryHours,
      this.config.device_id
    ), u = f(
      t,
      void 0,
      g.atlasCoach,
      this.config.device_id
    ), p = this.config.device_id, _ = p ? t.devices?.[p] : void 0, A = this.config.athlete_name || H(_), Ke = f(
      t,
      void 0,
      g.plannedTodayName,
      p
    ), Ze = f(
      t,
      void 0,
      g.plannedTodaySport,
      p
    ), Ye = f(
      t,
      void 0,
      g.plannedTodayDuration,
      p
    ), Je = f(
      t,
      void 0,
      g.plannedTodayLoad,
      p
    ), Qe = f(
      t,
      void 0,
      g.lastActivityName,
      p
    ), Xe = f(
      t,
      void 0,
      g.lastActivityType,
      p
    ), et = f(
      t,
      void 0,
      g.lastActivityDate,
      p
    ), tt = f(
      t,
      void 0,
      g.lastActivityDuration,
      p
    ), it = f(
      t,
      void 0,
      g.lastActivityLoad,
      p
    ), rt = f(
      t,
      void 0,
      g.lastActivityCalories,
      p
    ), ye = y(t, Qe), ae = l(t, "activity"), G = Ne(y(t, Xe, ae), ae, t), st = G !== ae && G.trim().toLowerCase() !== ye.trim().toLowerCase(), _e = Qt.map((b) => ({
      ...b,
      state: this.healthState(b.key),
      visible: this.healthVisible(b.key, b.defaultShow)
    })).filter((b) => b.visible && b.state), be = It(
      t,
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
              ${A ? c`<div class="athlete">${A}</div>` : h}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== !1 ? c`<div class="sync"><span class="dot ${be.level}"></span>${be.label}</div>` : h}
            ${this.config.show_refresh_button !== !1 ? c`<button class="refresh" title=${l(t, "refresh")} @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>` : h}
          </div>
        </header>

        ${this.config.show_atlas !== !1 ? c`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>${l(t, "atlas_readiness")}</span>
                </div>
                <div class="atlas-score">
                  <strong>${y(t, d)}</strong>
                  <span>${N(t, y(t, m, l(t, "unavailable")))}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>${l(t, "recovery")} ${y(t, v)}</span>
                  <span><ha-icon icon=${n?.attributes.icon || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${N(t, y(t, n, l(t, "unknown_status")))}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>${l(t, "atlas_coach")}</span>
                </div>
                <h3>${N(t, y(t, u, l(t, "no_recommendation")))}</h3>
                ${u?.attributes.recommendation ? c`<p>${Y(t, u.attributes.recommendation)}</p>` : h}
                <div class="atlas-chips">
                  ${u?.attributes.intensity ? c`<span>${N(t, u.attributes.intensity)}</span>` : h}
                  ${u?.attributes.duration_minutes ? c`<span>${String(u.attributes.duration_minutes)} min</span>` : h}
                  ${u?.attributes.heart_rate_zone ? c`<span>${String(u.attributes.heart_rate_zone)}</span>` : h}
                </div>
              </article>
            </section>` : h}

        <section class="metrics">
          ${this.metric(l(t, "fitness"), "CTL", "fitness", e)}
          ${this.metric(l(t, "fatigue"), "ATL", "fatigue", i)}
          ${this.metric(l(t, "form"), "TSB", "form", r)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", s)}
          ${this.quickStat("mdi:chart-areaspline", l(t, "load_7d"), a)}
          ${this.quickStat("mdi:calendar-check", l(t, "activities_7d"), o)}
        </section>

        ${this.config.show_history !== !1 ? c`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>${l(t, "evolution")}</span>
              </div>
              ${zt([
      {
        label: l(t, "fitness"),
        values: ne(e),
        className: "fitness-line"
      },
      {
        label: l(t, "fatigue"),
        values: ne(i),
        className: "fatigue-line"
      },
      {
        label: l(t, "form"),
        values: ne(r),
        className: "form-line"
      }
    ])}
            </section>` : h}

        ${this.config.show_health !== !1 && _e.length > 0 ? c`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>${l(t, "health")}</span>
              </div>
              <div class="health-grid">
                ${_e.map(
      (b) => c`
                    <div class="health-item">
                      <ha-icon icon=${b.icon}></ha-icon>
                      <div>
                        <span>${l(t, b.label)}</span>
                        <strong>${y(t, b.state)}</strong>
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
                  ><span>${l(t, "today")}</span>
                </div>
                <h3>
                  ${y(
      t,
      Ke,
      l(t, "no_workout")
    )}
                </h3>
                <div class="pill">
                  ${Ne(y(t, Ze, l(t, "workout")), l(t, "workout"), t)}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${y(t, Ye)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${l(t, "load")}
                    ${y(t, Je)}</span
                  >
                </div>
              </article>` : h}

          ${this.config.show_records !== !1 ? c`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>${l(t, "records")}</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      f(
        t,
        void 0,
        g.recordFtp,
        p
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      l(t, "distance"),
      f(
        t,
        void 0,
        g.recordDistance,
        p
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      l(t, "elevation"),
      f(
        t,
        void 0,
        g.recordElevation,
        p
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      l(t, "max_power"),
      f(
        t,
        void 0,
        g.recordMaxPower,
        p
      )
    )}
              </article>` : h}

          ${this.config.show_last_activity !== !1 ? c`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(G)}></ha-icon
                  ><span>${l(t, "last_activity")}</span>
                </div>
                <h3>${ye}</h3>
                ${st ? c`<div class="pill purple">${G}</div>` : h}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${y(t, et)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${y(t, tt)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${y(t, rt)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${l(t, "load")}
                    ${y(t, it)}</span
                  >
                </div>
              </article>` : h}
        </section>

        ${this.renderMetricTooltip()}
      </div>
    </ha-card>`;
  }
};
T.styles = [
  qe,
  ee`
      .metric {
        cursor: help;
      }

      .metric:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 3px;
      }

      .metric-tooltip {
        position: fixed;
        z-index: 10000;
        width: max-content;
        max-width: min(320px, calc(100vw - 24px));
        padding: 12px 14px;
        color: var(--primary-text-color);
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        box-shadow:
          0 10px 30px rgba(0, 0, 0, 0.24),
          0 2px 8px rgba(0, 0, 0, 0.16);
        pointer-events: none;
        transform: translate(-50%, calc(-100% - 12px));
        animation: tooltip-appear 120ms ease-out;
      }

      .metric-tooltip.bottom {
        transform: translate(-50%, 12px);
      }

      .metric-tooltip strong {
        display: block;
        margin-bottom: 6px;
        font-size: 0.88rem;
        line-height: 1.25;
      }

      .metric-tooltip span {
        display: block;
        color: var(--secondary-text-color);
        font-size: 0.78rem;
        line-height: 1.45;
        white-space: pre-line;
      }

      @keyframes tooltip-appear {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @media (hover: none) {
        .metric {
          cursor: pointer;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .metric-tooltip {
          animation: none;
        }
      }
    `
];
W([
  V({ attribute: !1 })
], T.prototype, "hass", 2);
W([
  w()
], T.prototype, "config", 2);
W([
  w()
], T.prototype, "refreshing", 2);
W([
  w()
], T.prototype, "tooltip", 2);
T = W([
  re("ha-intervals-icu-card")
], T);
var Xt = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, k = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ei(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && Xt(e, i, s), s;
};
let q = class extends $ {
  setConfig(t) {
    this.config = { ...t };
  }
  emitConfig(t) {
    this.config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  change(t, e) {
    const i = { ...this.config };
    e === "" ? delete i[t] : Object.assign(i, { [t]: e }), this.emitConfig(i);
  }
  changeDevice(t) {
    const e = {
      ...this.config,
      device_id: t || void 0
    };
    delete e.entity, this.emitConfig(e);
  }
  render() {
    if (!this.hass || !this.config)
      return c``;
    const t = We(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter((r) => {
      if (!r.startsWith("sensor.") || e && this.hass.entities?.[r]?.device_id !== e)
        return !1;
      const s = this.hass.entities?.[r], a = this.hass.states[r];
      return s?.translation_key === "statistics_dashboard" || s?.unique_id?.endsWith("_statistics_dashboard") || r.endsWith("_statistics_dashboard") || a?.attributes.translation_key === "statistics_dashboard";
    }).sort();
    return c`
      <div class="statistics-editor">
        <label>
          <span>${l(this.hass, "athlete_device")}</span>

          <select
            .value=${e}
            @change=${(r) => this.changeDevice(
      r.target.value
    )}
          >
            <option value="">${l(this.hass, "select_athlete")}</option>

            ${t.map(
      (r) => c`
                <option value=${r.id}>
                  ${H(r)}
                </option>
              `
    )}
          </select>
        </label>

        ${t.length === 0 ? c`
              <p>${l(this.hass, "no_intervals_device")}</p>
            ` : h}

        <label>
          <span>${l(this.hass, "title")}</span>

          <input
            type="text"
            .value=${this.config.title ?? ""}
            @input=${(r) => this.change(
      "title",
      r.target.value
    )}
          />
        </label>

        <label>
          <span>${l(this.hass, "default_period")}</span>

          <select
            .value=${this.config.default_period ?? "30_days"}
            @change=${(r) => this.change(
      "default_period",
      r.target.value
    )}
          >
            <option value="7_days">${l(this.hass, "period_7_days")}</option>
            <option value="30_days">${l(this.hass, "period_30_days")}</option>
            <option value="90_days">${l(this.hass, "period_90_days")}</option>
            <option value="365_days">${l(this.hass, "period_365_days")}</option>
          </select>
        </label>

        <label>
          <span>${l(this.hass, "statistics_entity")}</span>

          <select
            .value=${this.config.entity ?? ""}
            @change=${(r) => this.change(
      "entity",
      r.target.value
    )}
          >
            <option value="">
              ${l(this.hass, "automatic_athlete_detection")}
            </option>

            ${i.map(
      (r) => c`
                <option value=${r}>
                  ${this.hass.states[r].attributes.friendly_name ?? r}
                </option>
              `
    )}
          </select>
        </label>
      </div>
    `;
  }
};
q.styles = ee`
    :host {
      display: block;
    }

    .statistics-editor {
      display: grid;
      gap: 16px;
      padding: 16px;
    }

    label {
      display: grid;
      gap: 7px;
    }

    label > span {
      font-weight: 600;
    }

    input,
    select {
      width: 100%;
      min-height: 42px;
      padding: 8px 10px;
      color: var(--primary-text-color);
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }

    p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.88rem;
    }
  `;
k([
  V({ attribute: !1 })
], q.prototype, "hass", 2);
k([
  w()
], q.prototype, "config", 2);
q = k([
  re("ha-intervals-icu-statistics-card-editor")
], q);
let M = class extends $ {
  constructor() {
    super(...arguments), this.period = "30_days", this.section = "overview";
  }
  static getConfigElement() {
    return document.createElement(
      "ha-intervals-icu-statistics-card-editor"
    );
  }
  static getStubConfig() {
    return { title: "Intervals.icu Statistics", default_period: "30_days" };
  }
  setConfig(t) {
    this.config = { title: "Intervals.icu Statistics", default_period: "30_days", ...t }, this.period = this.config.default_period ?? "30_days";
  }
  getCardSize() {
    return 12;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 10, min_rows: 6 };
  }
  attrs() {
    return this.hass ? f(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id)?.attributes ?? {} : {};
  }
  number(t, e = 1) {
    const i = Number(t);
    return Number.isFinite(i) ? i.toLocaleString(this.hass?.locale?.language, { maximumFractionDigits: e }) : "—";
  }
  change(t) {
    const e = Number(t);
    if (!Number.isFinite(e)) return c`<span class="change neutral">—</span>`;
    const i = e > 3 ? "up" : e < -3 ? "down" : "neutral";
    return c`<span class="change ${i}">${e > 0 ? "+" : ""}${e.toFixed(1)}%</span>`;
  }
  tile(t, e, i, r = "", s) {
    return c`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${this.number(i)}${r}</strong>${s !== void 0 ? this.change(s) : h}</div></article>`;
  }
  textTile(t, e, i, r) {
    return c`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${i}</strong>${r !== void 0 ? this.change(r) : h}</div></article>`;
  }
  label(t) {
    return l(this.hass, t);
  }
  name(t) {
    return Y(this.hass, t.replaceAll("_", " "));
  }
  overview(t) {
    const e = t.periods?.[this.period] ?? {}, i = e.current ?? {}, r = e.comparison ?? {};
    return c`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", this.label("activities"), i.activities, "", r.activities_change_percent)}
        ${this.textTile("mdi:clock-outline", this.label("duration"), Z(i.duration_hours, "h"), r.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", this.label("distance"), i.distance_km, " km", r.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", this.label("load"), i.load, "", r.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", this.label("elevation"), i.elevation_m, " m", r.elevation_m_change_percent)}
        ${this.tile("mdi:fire", this.label("calories"), i.calories, " kcal", r.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", i.hrss, "", r.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", i.trimp, "", r.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(t.training_insights_by_period?.[this.period] ?? t.insights ?? t.training_insights ?? []).map((s) => c`<div class="insight ${s.type ?? "info"}"><ha-icon icon=${s.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${Y(this.hass, s.title)}</strong><span>${Y(this.hass, s.message)}</span></div></div>`)}
      </div>`;
  }
  sports(t) {
    const e = t.sports?.[this.period] ?? {};
    return c`<div class="table">${Object.entries(e).map(([i, r]) => c`
      <div class="row"><strong>${X(this.hass, i)}</strong><span>${this.number(r.activities, 0)} ${l(this.hass, "activity_short")}</span><span>${Z(r.duration_hours, "h")}</span><span>${this.number(r.distance_km)} km</span><span>${l(this.hass, "load")} ${this.number(r.load)}</span></div>`)}
      ${Object.keys(e).length ? h : c`<div class="empty">${l(this.hass, "no_sport_data")}</div>`}
    </div>`;
  }
  records(t) {
    const e = t.period_records ?? {}, i = t.records_by_sport ?? {};
    return c`
      <div class="record-grid">
        ${Object.entries(e).map(([r, s]) => s ? c`<article class="record"><span>${this.name(r)}</span><strong>${s.period}</strong><small>${this.number(s.load)} ${l(this.hass, "load").toLowerCase()} · ${Z(s.duration_hours, "h")}</small></article>` : h)}
      </div>
      ${Object.entries(i).map(([r, s]) => c`<details><summary>${X(this.hass, r)}</summary><div class="record-list">${Object.entries(s).map(([a, o]) => c`<div><span>${this.name(a)}</span><strong>${this.number(o.value)}</strong><small>${o.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }
  trends(t) {
    const e = t.trends ?? {};
    return c`<div class="trend-grid">${Object.entries(e).map(([i, r]) => c`
      <article class="trend"><span>${this.name(i)}</span><strong>${this.number(r.latest)}</strong><div class="trend-changes"><small>7d ${this.number(r.change_7_days)}</small><small>30d ${this.number(r.change_30_days)}</small><small>90d ${this.number(r.change_90_days)}</small><small>365d ${this.number(r.change_365_days)}</small></div></article>`)}
    </div>`;
  }
  quality(t) {
    const e = t.data_quality ?? {}, i = e.coverage ?? {};
    return c`<div class="quality-head"><strong>${this.number(e.completeness_percent)}%</strong><span>${l(this.hass, "completeness")} · ${this.number(e.field_count, 0)} ${l(this.hass, "api_fields")}</span></div>
      <div class="coverage">${Object.entries(i).map(([r, s]) => c`<div><span>${this.name(r)}</span><progress max="100" value=${s.percent ?? 0}></progress><strong>${this.number(s.percent)}%</strong></div>`)}</div>`;
  }
  render() {
    if (!this.hass || !this.config) return h;
    const t = this.attrs(), e = this.section === "sports" ? this.sports(t) : this.section === "records" ? this.records(t) : this.section === "trends" ? this.trends(t) : this.section === "quality" ? this.quality(t) : this.overview(t);
    return c`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>${l(this.hass, "statistics_trends")}</span></div></div><nav>${["7_days", "30_days", "90_days", "365_days"].map((i) => c`<button class=${this.period === i ? "active" : ""} @click=${() => this.period = i}>${i.replace("_days", l(this.hass, "day_short"))}</button>`)}</nav></header>
      <div class="tabs">${["overview", "sports", "records", "trends", "quality"].map((i) => c`<button class=${this.section === i ? "active" : ""} @click=${() => this.section = i}>${l(this.hass, i)}</button>`)}</div>
      <section>${e}</section></div></ha-card>`;
  }
};
M.styles = ee`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:520px){.shell{padding:14px}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
k([
  V({ attribute: !1 })
], M.prototype, "hass", 2);
k([
  w()
], M.prototype, "config", 2);
k([
  w()
], M.prototype, "period", 2);
k([
  w()
], M.prototype, "section", 2);
M = k([
  re("ha-intervals-icu-statistics-card")
], M);
const de = (navigator.language ?? "en").toLowerCase().startsWith("fr");
window.customCards = window.customCards ?? [];
window.customCards.some((t) => t.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: de ? "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu." : "Intervals.icu fitness, fatigue, form, records and workouts dashboard.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
window.customCards.some(
  (t) => t.type === "ha-intervals-icu-statistics-card"
) || window.customCards.push({
  type: "ha-intervals-icu-statistics-card",
  name: de ? "Carte Statistiques Intervals.icu" : "Intervals.icu Statistics Card",
  description: de ? "Statistiques avancées sur 7, 30, 90 ou 365 jours, records, tendances et analyses." : "Advanced 7, 30, 90 or 365-day statistics, records, trends and insights.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
console.info(
  "%c HA Intervals.icu Card %c 2.0.0-beta14 ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:white"
);
