const G = globalThis, ce = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = /* @__PURE__ */ Symbol(), be = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ce && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = be.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && be.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const rt = (t) => new Ne(typeof t == "string" ? t : t + "", void 0, de), he = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[a + 1], t[0]);
  return new Ne(i, t, de);
}, at = (t, e) => {
  if (ce) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = G.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, $e = ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return rt(i);
})(t) : t;
const { is: ot, defineProperty: nt, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: dt, getPrototypeOf: ht } = Object, Q = globalThis, xe = Q.trustedTypes, pt = xe ? xe.emptyScript : "", ut = Q.reactiveElementPolyfillSupport, j = (t, e) => t, Z = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? pt : null;
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
} }, pe = (t, e) => !ot(t, e), we = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: pe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = we) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && nt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: a } = lt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: r, set(o) {
      const n = r?.call(this);
      a?.call(this, o), this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = ht(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const i = this.properties, s = [...ct(i), ...dt(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) i.unshift($e(r));
    } else e !== void 0 && i.push($e(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return at(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : Z).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = s.getPropertyOptions(r), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Z;
      this._$Em = r;
      const n = o.fromAttribute(i, a.type);
      this[r] = n ?? this._$Ej?.get(r) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (a = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? pe)(a, i) || s.useDefault && s.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: a }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[j("elementProperties")] = /* @__PURE__ */ new Map(), T[j("finalized")] = /* @__PURE__ */ new Map(), ut?.({ ReactiveElement: T }), (Q.reactiveElementVersions ??= []).push("2.1.2");
const ue = globalThis, ke = (t) => t, Y = ue.trustedTypes, Ae = Y ? Y.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, je = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, De = "?" + $, gt = `<${De}>`, C = document, D = () => C.createComment(""), I = (t) => t === null || typeof t != "object" && typeof t != "function", ge = Array.isArray, mt = (t) => ge(t) || typeof t?.[Symbol.iterator] == "function", re = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Se = /-->/g, Ce = />/g, A = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, Re = /"/g, Ie = /^(?:script|style|textarea|title)$/i, Ue = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Ue(1), oe = Ue(2), M = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function He(t, e) {
  if (!ge(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ae !== void 0 ? Ae.createHTML(e) : e;
}
const ft = (t, e) => {
  const i = t.length - 1, s = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = z;
  for (let n = 0; n < i; n++) {
    const d = t[n];
    let f, v, u = -1, h = 0;
    for (; h < d.length && (o.lastIndex = h, v = o.exec(d), v !== null); ) h = o.lastIndex, o === z ? v[1] === "!--" ? o = Se : v[1] !== void 0 ? o = Ce : v[2] !== void 0 ? (Ie.test(v[2]) && (r = RegExp("</" + v[2], "g")), o = A) : v[3] !== void 0 && (o = A) : o === A ? v[0] === ">" ? (o = r ?? z, u = -1) : v[1] === void 0 ? u = -2 : (u = o.lastIndex - v[2].length, f = v[1], o = v[3] === void 0 ? A : v[3] === '"' ? Re : Ee) : o === Re || o === Ee ? o = A : o === Se || o === Ce ? o = z : (o = A, r = void 0);
    const y = o === A && t[n + 1].startsWith("/>") ? " " : "";
    a += o === z ? d + gt : u >= 0 ? (s.push(f), d.slice(0, u) + je + d.slice(u) + $ + y) : d + $ + (u === -2 ? n : y);
  }
  return [He(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, d = this.parts, [f, v] = ft(e, i);
    if (this.el = U.createElement(f, s), S.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = S.nextNode()) !== null && d.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(je)) {
          const h = v[o++], y = r.getAttribute(u).split($), k = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: a, name: k[2], strings: y, ctor: k[1] === "." ? _t : k[1] === "?" ? yt : k[1] === "@" ? bt : X }), r.removeAttribute(u);
        } else u.startsWith($) && (d.push({ type: 6, index: a }), r.removeAttribute(u));
        if (Ie.test(r.tagName)) {
          const u = r.textContent.split($), h = u.length - 1;
          if (h > 0) {
            r.textContent = Y ? Y.emptyScript : "";
            for (let y = 0; y < h; y++) r.append(u[y], D()), S.nextNode(), d.push({ type: 2, index: ++a });
            r.append(u[h], D());
          }
        }
      } else if (r.nodeType === 8) if (r.data === De) d.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = r.data.indexOf($, u + 1)) !== -1; ) d.push({ type: 7, index: a }), u += $.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const s = C.createElement("template");
    return s.innerHTML = e, s;
  }
}
function O(t, e, i = t, s) {
  if (e === M) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const a = I(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (e = O(t, r._$AS(t, e.values), r, s)), e;
}
class vt {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? C).importNode(i, !0);
    S.currentNode = r;
    let a = S.nextNode(), o = 0, n = 0, d = s[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let f;
        d.type === 2 ? f = new F(a, a.nextSibling, this, e) : d.type === 1 ? f = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (f = new $t(a, this, e)), this._$AV.push(f), d = s[++n];
      }
      o !== d?.index && (a = S.nextNode(), o++);
    }
    return S.currentNode = C, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = O(this, e, i), I(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : mt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && I(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = U.createElement(He(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const a = new vt(r, this), o = a.u(this.options);
      a.p(i), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Te.get(e.strings);
    return i === void 0 && Te.set(e.strings, i = new U(e)), i;
  }
  k(e) {
    ge(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const a of e) r === i.length ? i.push(s = new F(this.O(D()), this.O(D()), this, this.options)) : s = i[r], s._$AI(a), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = ke(e).nextSibling;
      ke(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, r, a) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, i = this, s, r) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = O(this, e, i, 0), o = !I(e) || e !== this._$AH && e !== M, o && (this._$AH = e);
    else {
      const n = e;
      let d, f;
      for (e = a[0], d = 0; d < a.length - 1; d++) f = O(this, n[s + d], i, d), f === M && (f = this._$AH[d]), o ||= !I(f) || f !== this._$AH[d], f === p ? e = p : e !== p && (e += (f ?? "") + a[d + 1]), this._$AH[d] = f;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class yt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class bt extends X {
  constructor(e, i, s, r, a) {
    super(e, i, s, r, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = O(this, e, i, 0) ?? p) === M) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $t {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const xt = ue.litHtmlPolyfillSupport;
xt?.(U, F), (ue.litHtmlVersions ??= []).push("3.3.3");
const wt = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const a = i?.renderBefore ?? null;
    s._$litPart$ = r = new F(e.insertBefore(D(), a), a, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const me = globalThis;
class x extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return M;
  }
}
x._$litElement$ = !0, x.finalized = !0, me.litElementHydrateSupport?.({ LitElement: x });
const kt = me.litElementPolyfillSupport;
kt?.({ LitElement: x });
(me.litElementVersions ??= []).push("4.2.2");
const ee = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const At = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: pe }, St = (t = At, e, i) => {
  const { kind: s, metadata: r } = i;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), s === "accessor") {
    const { name: o } = i;
    return { set(n) {
      const d = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, d, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, t, n), n;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(n) {
      const d = this[o];
      e.call(this, n), this.requestUpdate(o, d, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function V(t) {
  return (e, i) => typeof i == "object" ? St(t, e, i) : ((s, r, a) => {
    const o = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(t, e, i);
}
function R(t) {
  return V({ ...t, state: !0, attribute: !1 });
}
const Le = he`
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
`, qe = "ha_intervals_icu", g = {
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
}, Fe = {
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
function Me(t, e, i) {
  return i ? t.entities?.[e]?.device_id === i : !0;
}
function Ve(t) {
  return Object.values(t.entities ?? {});
}
function Ct(t, e) {
  if (t.translation_key === e)
    return !0;
  const i = t.unique_id ?? "";
  return i === e || i.endsWith(`_${e}`) || i.endsWith(`-${e}`);
}
function Et(t, e) {
  const i = (e ?? "s").trim().toLowerCase();
  return ["ms", "millisecond", "milliseconds"].includes(i) ? t / 1e3 : ["min", "minute", "minutes"].includes(i) ? t * 60 : ["h", "hr", "hour", "hours"].includes(i) ? t * 3600 : ["d", "day", "days"].includes(i) ? t * 86400 : t;
}
function Rt(t, e) {
  const i = Math.max(
    0,
    Math.round(Et(t, e))
  ), s = Math.floor(i / 86400), r = Math.floor(i % 86400 / 3600), a = Math.floor(i % 3600 / 60), o = i % 60, n = [];
  return s > 0 && n.push(`${s} j`), r > 0 && n.push(`${r} h`), a > 0 && n.push(`${a} min`), o > 0 && s === 0 && r === 0 && n.push(`${o} s`), n.length > 0 ? n.join(" ") : "0 s";
}
function Tt(t) {
  const e = Fe[t];
  if (e)
    return e;
  const i = t.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return i ? i.charAt(0).toUpperCase() + i.slice(1).toLowerCase() : t;
}
function Mt(t) {
  const e = t.attributes.unit_of_measurement, i = t.attributes.translation_key, s = t.entity_id ?? "";
  return e === "s" || i === "planned_today_duration" || i === "last_activity_duration" || s.endsWith("_planned_today_duration") || s.endsWith("_last_activity_duration");
}
function Ot(t) {
  const e = t.attributes.translation_key, i = t.entity_id ?? "";
  return e === "planned_today_sport" || e === "last_activity_type" || i.endsWith("_planned_today_sport") || i.endsWith("_last_activity_type") || !!Fe[t.state];
}
function Be(t) {
  return [...new Set(
    Ve(t).filter(
      (i) => i.platform === qe && typeof i.device_id == "string"
    ).map((i) => i.device_id)
  )].map((i) => t.devices?.[i]).filter((i) => !!i).sort((i, s) => H(i).localeCompare(H(s)));
}
function H(t) {
  return t?.name_by_user ?? t?.name ?? "Athlète Intervals.icu";
}
function ne(t, e, i, s) {
  if (e && t.states[e] && Me(t, e, s))
    return e;
  const r = Ve(t).find(
    (o) => o.platform === qe && typeof o.entity_id == "string" && (!s || o.device_id === s) && Ct(o, i)
  );
  if (r?.entity_id && t.states[r.entity_id])
    return r.entity_id;
  const a = `_${i}`;
  return Object.keys(t.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(a) && Me(t, o, s)
  );
}
function m(t, e, i, s) {
  const r = ne(t, e, i, s);
  return r ? t.states[r] : void 0;
}
function Oe(t) {
  if (!t || ["unknown", "unavailable", "none", ""].includes(t.state))
    return null;
  const e = Number(t.state);
  return Number.isFinite(e) ? e : null;
}
function _(t, e, i = "—") {
  if (!e || ["unknown", "unavailable", "none", ""].includes(e.state))
    return i;
  if (Mt(e)) {
    const s = Number(e.state);
    if (Number.isFinite(s))
      return Rt(s, e.attributes.unit_of_measurement);
  }
  if (Ot(e))
    return Tt(e.state);
  try {
    return t.formatEntityState?.(e) ?? `${e.state}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return e.state;
  }
}
function ae(t) {
  const e = t?.attributes.history;
  return Array.isArray(e) ? e.map((i) => typeof i == "object" && i !== null && "value" in i ? Number(i.value) : Number(i)).filter(Number.isFinite) : [];
}
function Pt(t, e, i, s, r) {
  return t.map((a, o) => {
    const n = t.length === 1 ? e / 2 : o / (t.length - 1) * e, d = i - (a - s) / r * (i - 22) - 11;
    return `${n.toFixed(1)},${d.toFixed(1)}`;
  }).join(" ");
}
function zt(t) {
  const e = t.filter((h) => h.values.length >= 2);
  if (e.length === 0) return c`<div class="empty">Historique indisponible</div>`;
  const i = 760, s = 220, r = e.flatMap((h) => h.values), a = Math.min(...r), o = Math.max(...r), n = Math.max((o - a) * 0.12, 2), d = a - n, v = o + n - d || 1, u = [0, 1, 2, 3, 4];
  return c`
    <div class="chart-legend">
      ${e.map((h) => c`<span><i class=${h.className}></i>${h.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${i} ${s}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${u.map((h) => {
    const y = 10 + h / 4 * (s - 20);
    return oe`<line class="grid-line" x1="0" y1=${y} x2=${i} y2=${y}></line>`;
  })}
      ${e.map((h) => oe`<polyline class="series ${h.className}" points=${Pt(h.values, i, s, d, v)}></polyline>`)}
    </svg>`;
}
function Nt(t, e, i, s) {
  const a = ((t === null ? 0 : Math.min(s, Math.max(i, t))) - i) / (s - i || 1), o = Math.PI * 52, n = Math.max(0, Math.min(o, a * o));
  return c`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${oe`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${n} ${o}"></path>`}
  </svg>`;
}
const jt = {
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
}, Pe = {
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
function te(t) {
  return (t?.locale?.language ?? t?.language ?? navigator.language ?? "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
function l(t, e, i = {}) {
  let s = (te(t) === "fr" ? jt : Pe)[e] ?? Pe[e] ?? e;
  for (const [r, a] of Object.entries(i))
    s = s.replaceAll(`{${r}}`, String(a));
  return s;
}
const Dt = {
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
  if (!i || te(t) !== "fr")
    return i;
  const s = i.toLowerCase().replace(/[\s-]+/g, "_");
  return Dt[s] ?? i.replace(/_/g, " ").replace(/^./, (r) => r.toUpperCase());
}
function K(t, e) {
  const i = String(e ?? "").trim();
  if (!i || te(t) !== "fr")
    return i;
  let s = i.match(
    /^(\d+)-day load\s+(?:is\s+)?([\d.,]+)%\s+(lower|higher) than the previous period\.?$/i
  );
  return s ? `Charge sur ${s[1]} jours ${s[2]} % ${s[3].toLowerCase() === "lower" ? "inférieure" : "supérieure"} à la période précédente` : /^Latest sleep is more than one hour below the value from seven days ago\.?$/i.test(
    i
  ) ? "Le dernier sommeil est inférieur de plus d’une heure à celui d’il y a sept jours" : (s = i.match(
    /^(.+?) represents\s+([\d.,]+)% of training time over the last\s+(\d+) days\.?$/i
  ), s ? `${J(t, s[1])} représente ${s[2]} % du temps d’entraînement sur les ${s[3]} derniers jours` : N(t, i));
}
const It = {
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
function J(t, e, i) {
  const s = String(e ?? "").trim();
  if (!s)
    return i ?? l(t, "activity");
  if (te(t) !== "fr")
    return s.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const r = s.replace(/[\s_-]+/g, "").toLowerCase();
  return It[r] ?? s.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function Ut(t, e) {
  if (!e)
    return { label: l(t, "sync_unknown"), level: "danger" };
  const i = new Date(e).getTime();
  if (!Number.isFinite(i))
    return { label: l(t, "sync_unknown"), level: "danger" };
  const s = Math.max(0, Math.floor((Date.now() - i) / 6e4));
  if (s < 1)
    return { label: l(t, "sync_now"), level: "good" };
  if (s < 60)
    return {
      label: l(t, "sync_minutes", { value: s }),
      level: s < 5 ? "good" : s <= 30 ? "warning" : "danger"
    };
  const r = Math.floor(s / 60);
  return r < 24 ? {
    label: l(t, "sync_hours", { value: r }),
    level: "danger"
  } : {
    label: l(t, "sync_days", { value: Math.floor(r / 24) }),
    level: "danger"
  };
}
function ze(t, e = "Activity", i) {
  return J(i, t, e);
}
var Ht = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, fe = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Lt(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && Ht(e, i, r), r;
};
const B = "https://github.com/pepka69/ha-intervals-icu", qt = `${B}/blob/develop/README.fr.md`, Ft = `${B}/issues`, Vt = `${B}/issues/new/choose`, Bt = "https://buymeacoffee.com/pep_ka", Wt = `${B}/raw/develop/.github/assets/buy-me-a-beer-en.png`, We = [
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
], Gt = We.map(
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
let L = class extends x {
  setConfig(t) {
    this.config = { ...t };
  }
  integrationVersion() {
    if (!this.hass)
      return "unknown";
    const t = ne(
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
    const s = { ...this.config?.health ?? {} }, r = { ...s[t] ?? {} };
    e === "entity" && i === "" ? delete r.entity : Object.assign(r, { [e]: i }), s[t] = r;
    const a = {
      ...this.config,
      health: s
    };
    t === "weight" && (delete a.weight_entity, delete a.show_weight), this.emitConfig(a);
  }
  render() {
    if (!this.config || !this.hass)
      return c``;
    const t = Be(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter(
      (r) => r.startsWith("sensor.") && (!e || this.hass.entities?.[r]?.device_id === e)
    ).sort(), s = Object.keys(this.hass.states).filter((r) => r.startsWith("sensor.")).sort();
    return c`
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

        ${We.map(
      ([r, a, o]) => c`
            <label>
              ${a}
              <select
                .value=${String(
        this.config[r] ?? ne(
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

          ${Zt.map(({ key: r, label: a }) => {
      const o = this.healthMetricConfig(r);
      return c`
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
      ([r, a]) => c`
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
L.styles = Le;
fe([
  V({ attribute: !1 })
], L.prototype, "hass", 2);
fe([
  R()
], L.prototype, "config", 2);
L = fe([
  ee("ha-intervals-icu-card-editor")
], L);
var Yt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, ie = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Jt(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && Yt(e, i, r), r;
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
let P = class extends x {
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
    return c`<div class="quick-stat"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${_(this.hass, i)}</strong></div></div>`;
  }
  state(t, e) {
    return this.hass ? m(
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
  metric(t, e, i, s) {
    const r = Oe(s), a = this.status(i, s), o = i === "form" ? -30 : 0, n = i === "form" ? 30 : 100, d = s?.attributes.change_7_days;
    return c`<article class="metric ${i}">
      <div class="metric-label">${t}</div>
      <div class="metric-value">${_(this.hass, s)}</div>
      <div class="metric-short">${e}</div>
      ${Nt(r, a, o, n)}
      <div class="metric-foot">
        7 j
        ${typeof d == "number" ? `${d > 0 ? "+" : ""}${d.toFixed(1)}` : "—"}
      </div>
    </article>`;
  }
  infoRow(t, e, i) {
    return c`<div class="info-row">
      <ha-icon icon=${t}></ha-icon>
      <span>${e}</span>
      <strong>${_(this.hass, i)}</strong>
    </div>`;
  }
  healthState(t) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[t]?.entity ?? (t === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : m(
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
    if (!this.hass || !this.config) return p;
    const t = this.hass, e = this.state("fitness_entity", g.fitness), i = this.state("fatigue_entity", g.fatigue), s = this.state("form_entity", g.form), r = this.state("ftp_entity", g.ftp), a = this.state(
      "weekly_load_entity",
      g.weeklyLoad
    ), o = this.state(
      "weekly_activities_entity",
      g.weeklyActivities
    ), n = m(
      t,
      void 0,
      g.trainingStatus,
      this.config.device_id
    ), d = m(
      t,
      void 0,
      g.readinessScore,
      this.config.device_id
    ), f = m(
      t,
      void 0,
      g.readinessLevel,
      this.config.device_id
    ), v = m(
      t,
      void 0,
      g.readinessRecoveryHours,
      this.config.device_id
    ), u = m(
      t,
      void 0,
      g.atlasCoach,
      this.config.device_id
    ), h = this.config.device_id, y = h ? t.devices?.[h] : void 0, k = this.config.athlete_name || H(y), Ge = m(
      t,
      void 0,
      g.plannedTodayName,
      h
    ), Ke = m(
      t,
      void 0,
      g.plannedTodaySport,
      h
    ), Ze = m(
      t,
      void 0,
      g.plannedTodayDuration,
      h
    ), Ye = m(
      t,
      void 0,
      g.plannedTodayLoad,
      h
    ), Je = m(
      t,
      void 0,
      g.lastActivityName,
      h
    ), Qe = m(
      t,
      void 0,
      g.lastActivityType,
      h
    ), Xe = m(
      t,
      void 0,
      g.lastActivityDate,
      h
    ), et = m(
      t,
      void 0,
      g.lastActivityDuration,
      h
    ), tt = m(
      t,
      void 0,
      g.lastActivityLoad,
      h
    ), it = m(
      t,
      void 0,
      g.lastActivityCalories,
      h
    ), ve = _(t, Je), se = l(t, "activity"), W = ze(_(t, Qe, se), se, t), st = W !== se && W.trim().toLowerCase() !== ve.trim().toLowerCase(), _e = Qt.map((b) => ({
      ...b,
      state: this.healthState(b.key),
      visible: this.healthVisible(b.key, b.defaultShow)
    })).filter((b) => b.visible && b.state), ye = Ut(
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
              ${k ? c`<div class="athlete">${k}</div>` : p}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== !1 ? c`<div class="sync"><span class="dot ${ye.level}"></span>${ye.label}</div>` : p}
            ${this.config.show_refresh_button !== !1 ? c`<button class="refresh" title=${l(t, "refresh")} @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>` : p}
          </div>
        </header>

        ${this.config.show_atlas !== !1 ? c`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>${l(t, "atlas_readiness")}</span>
                </div>
                <div class="atlas-score">
                  <strong>${_(t, d)}</strong>
                  <span>${N(t, _(t, f, l(t, "unavailable")))}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>${l(t, "recovery")} ${_(t, v)}</span>
                  <span><ha-icon icon=${n?.attributes.icon || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${N(t, _(t, n, l(t, "unknown_status")))}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>${l(t, "atlas_coach")}</span>
                </div>
                <h3>${N(t, _(t, u, l(t, "no_recommendation")))}</h3>
                ${u?.attributes.recommendation ? c`<p>${K(t, u.attributes.recommendation)}</p>` : p}
                <div class="atlas-chips">
                  ${u?.attributes.intensity ? c`<span>${N(t, u.attributes.intensity)}</span>` : p}
                  ${u?.attributes.duration_minutes ? c`<span>${String(u.attributes.duration_minutes)} min</span>` : p}
                  ${u?.attributes.heart_rate_zone ? c`<span>${String(u.attributes.heart_rate_zone)}</span>` : p}
                </div>
              </article>
            </section>` : p}

        <section class="metrics">
          ${this.metric(l(t, "fitness"), "CTL", "fitness", e)}
          ${this.metric(l(t, "fatigue"), "ATL", "fatigue", i)}
          ${this.metric(l(t, "form"), "TSB", "form", s)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", r)}
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
        values: ae(e),
        className: "fitness-line"
      },
      {
        label: l(t, "fatigue"),
        values: ae(i),
        className: "fatigue-line"
      },
      {
        label: l(t, "form"),
        values: ae(s),
        className: "form-line"
      }
    ])}
            </section>` : p}

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
                        <strong>${_(t, b.state)}</strong>
                      </div>
                    </div>
                  `
    )}
              </div>
            </section>` : p}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? c`<article class="feature workout spotlight">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>${l(t, "today")}</span>
                </div>
                <h3>
                  ${_(
      t,
      Ge,
      l(t, "no_workout")
    )}
                </h3>
                <div class="pill">
                  ${ze(_(t, Ke, l(t, "workout")), l(t, "workout"), t)}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${_(t, Ze)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${l(t, "load")}
                    ${_(t, Ye)}</span
                  >
                </div>
              </article>` : p}

          ${this.config.show_records !== !1 ? c`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>${l(t, "records")}</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      m(
        t,
        void 0,
        g.recordFtp,
        h
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      l(t, "distance"),
      m(
        t,
        void 0,
        g.recordDistance,
        h
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      l(t, "elevation"),
      m(
        t,
        void 0,
        g.recordElevation,
        h
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      l(t, "max_power"),
      m(
        t,
        void 0,
        g.recordMaxPower,
        h
      )
    )}
              </article>` : p}

          ${this.config.show_last_activity !== !1 ? c`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(W)}></ha-icon
                  ><span>${l(t, "last_activity")}</span>
                </div>
                <h3>${ve}</h3>
                ${st ? c`<div class="pill purple">${W}</div>` : p}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${_(t, Xe)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${_(t, et)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${_(t, it)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${l(t, "load")}
                    ${_(t, tt)}</span
                  >
                </div>
              </article>` : p}
        </section>
      </div>
    </ha-card>`;
  }
};
P.styles = Le;
ie([
  V({ attribute: !1 })
], P.prototype, "hass", 2);
ie([
  R()
], P.prototype, "config", 2);
ie([
  R()
], P.prototype, "refreshing", 2);
P = ie([
  ee("ha-intervals-icu-card")
], P);
var Xt = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, w = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ei(e, i) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && Xt(e, i, r), r;
};
let q = class extends x {
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
    const t = Be(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter((s) => {
      if (!s.startsWith("sensor.") || e && this.hass.entities?.[s]?.device_id !== e)
        return !1;
      const r = this.hass.entities?.[s], a = this.hass.states[s];
      return r?.translation_key === "statistics_dashboard" || r?.unique_id?.endsWith("_statistics_dashboard") || s.endsWith("_statistics_dashboard") || a?.attributes.translation_key === "statistics_dashboard";
    }).sort();
    return c`
      <div class="statistics-editor">
        <label>
          <span>${l(this.hass, "athlete_device")}</span>

          <select
            .value=${e}
            @change=${(s) => this.changeDevice(
      s.target.value
    )}
          >
            <option value="">${l(this.hass, "select_athlete")}</option>

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
              <p>${l(this.hass, "no_intervals_device")}</p>
            ` : p}

        <label>
          <span>${l(this.hass, "title")}</span>

          <input
            type="text"
            .value=${this.config.title ?? ""}
            @input=${(s) => this.change(
      "title",
      s.target.value
    )}
          />
        </label>

        <label>
          <span>${l(this.hass, "default_period")}</span>

          <select
            .value=${this.config.default_period ?? "30_days"}
            @change=${(s) => this.change(
      "default_period",
      s.target.value
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
            @change=${(s) => this.change(
      "entity",
      s.target.value
    )}
          >
            <option value="">
              ${l(this.hass, "automatic_athlete_detection")}
            </option>

            ${i.map(
      (s) => c`
                <option value=${s}>
                  ${this.hass.states[s].attributes.friendly_name ?? s}
                </option>
              `
    )}
          </select>
        </label>
      </div>
    `;
  }
};
q.styles = he`
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
w([
  V({ attribute: !1 })
], q.prototype, "hass", 2);
w([
  R()
], q.prototype, "config", 2);
q = w([
  ee("ha-intervals-icu-statistics-card-editor")
], q);
let E = class extends x {
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
    return this.hass ? m(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id)?.attributes ?? {} : {};
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
  tile(t, e, i, s = "", r) {
    return c`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${this.number(i)}${s}</strong>${r !== void 0 ? this.change(r) : p}</div></article>`;
  }
  label(t) {
    return l(this.hass, t);
  }
  name(t) {
    return K(this.hass, t.replaceAll("_", " "));
  }
  overview(t) {
    const e = t.periods?.[this.period] ?? {}, i = e.current ?? {}, s = e.comparison ?? {};
    return c`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", this.label("activities"), i.activities, "", s.activities_change_percent)}
        ${this.tile("mdi:clock-outline", this.label("duration"), i.duration_hours, " h", s.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", this.label("distance"), i.distance_km, " km", s.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", this.label("load"), i.load, "", s.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", this.label("elevation"), i.elevation_m, " m", s.elevation_m_change_percent)}
        ${this.tile("mdi:fire", this.label("calories"), i.calories, " kcal", s.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", i.hrss, "", s.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", i.trimp, "", s.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(t.training_insights_by_period?.[this.period] ?? t.insights ?? t.training_insights ?? []).map((r) => c`<div class="insight ${r.type ?? "info"}"><ha-icon icon=${r.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${K(this.hass, r.title)}</strong><span>${K(this.hass, r.message)}</span></div></div>`)}
      </div>`;
  }
  sports(t) {
    const e = t.sports?.[this.period] ?? {};
    return c`<div class="table">${Object.entries(e).map(([i, s]) => c`
      <div class="row"><strong>${J(this.hass, i)}</strong><span>${this.number(s.activities, 0)} ${l(this.hass, "activity_short")}</span><span>${this.number(s.duration_hours)} h</span><span>${this.number(s.distance_km)} km</span><span>${l(this.hass, "load")} ${this.number(s.load)}</span></div>`)}
      ${Object.keys(e).length ? p : c`<div class="empty">${l(this.hass, "no_sport_data")}</div>`}
    </div>`;
  }
  records(t) {
    const e = t.period_records ?? {}, i = t.records_by_sport ?? {};
    return c`
      <div class="record-grid">
        ${Object.entries(e).map(([s, r]) => r ? c`<article class="record"><span>${this.name(s)}</span><strong>${r.period}</strong><small>${this.number(r.load)} ${l(this.hass, "load").toLowerCase()} · ${this.number(r.duration_hours)} h</small></article>` : p)}
      </div>
      ${Object.entries(i).map(([s, r]) => c`<details><summary>${J(this.hass, s)}</summary><div class="record-list">${Object.entries(r).map(([a, o]) => c`<div><span>${this.name(a)}</span><strong>${this.number(o.value)}</strong><small>${o.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }
  trends(t) {
    const e = t.trends ?? {};
    return c`<div class="trend-grid">${Object.entries(e).map(([i, s]) => c`
      <article class="trend"><span>${this.name(i)}</span><strong>${this.number(s.latest)}</strong><div class="trend-changes"><small>7d ${this.number(s.change_7_days)}</small><small>30d ${this.number(s.change_30_days)}</small><small>90d ${this.number(s.change_90_days)}</small><small>365d ${this.number(s.change_365_days)}</small></div></article>`)}
    </div>`;
  }
  quality(t) {
    const e = t.data_quality ?? {}, i = e.coverage ?? {};
    return c`<div class="quality-head"><strong>${this.number(e.completeness_percent)}%</strong><span>${l(this.hass, "completeness")} · ${this.number(e.field_count, 0)} ${l(this.hass, "api_fields")}</span></div>
      <div class="coverage">${Object.entries(i).map(([s, r]) => c`<div><span>${this.name(s)}</span><progress max="100" value=${r.percent ?? 0}></progress><strong>${this.number(r.percent)}%</strong></div>`)}</div>`;
  }
  render() {
    if (!this.hass || !this.config) return p;
    const t = this.attrs(), e = this.section === "sports" ? this.sports(t) : this.section === "records" ? this.records(t) : this.section === "trends" ? this.trends(t) : this.section === "quality" ? this.quality(t) : this.overview(t);
    return c`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>${l(this.hass, "statistics_trends")}</span></div></div><nav>${["7_days", "30_days", "90_days", "365_days"].map((i) => c`<button class=${this.period === i ? "active" : ""} @click=${() => this.period = i}>${i.replace("_days", l(this.hass, "day_short"))}</button>`)}</nav></header>
      <div class="tabs">${["overview", "sports", "records", "trends", "quality"].map((i) => c`<button class=${this.section === i ? "active" : ""} @click=${() => this.section = i}>${l(this.hass, i)}</button>`)}</div>
      <section>${e}</section></div></ha-card>`;
  }
};
E.styles = he`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:520px){.shell{padding:14px}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
w([
  V({ attribute: !1 })
], E.prototype, "hass", 2);
w([
  R()
], E.prototype, "config", 2);
w([
  R()
], E.prototype, "period", 2);
w([
  R()
], E.prototype, "section", 2);
E = w([
  ee("ha-intervals-icu-statistics-card")
], E);
const le = (navigator.language ?? "en").toLowerCase().startsWith("fr");
window.customCards = window.customCards ?? [];
window.customCards.some((t) => t.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: le ? "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu." : "Intervals.icu fitness, fatigue, form, records and workouts dashboard.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
window.customCards.some(
  (t) => t.type === "ha-intervals-icu-statistics-card"
) || window.customCards.push({
  type: "ha-intervals-icu-statistics-card",
  name: le ? "Carte Statistiques Intervals.icu" : "Intervals.icu Statistics Card",
  description: le ? "Statistiques avancées sur 7, 30, 90 ou 365 jours, records, tendances et analyses." : "Advanced 7, 30, 90 or 365-day statistics, records, trends and insights.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
console.info(
  "%c HA Intervals.icu Card %c 2.0.0-beta10 ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:white"
);
