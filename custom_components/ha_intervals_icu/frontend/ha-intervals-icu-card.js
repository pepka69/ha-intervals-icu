const Y = globalThis, he = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = /* @__PURE__ */ Symbol(), xe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (he && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = xe.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && xe.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const at = (t) => new De(typeof t == "string" ? t : t + "", void 0, pe), ee = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[o + 1], t[0]);
  return new De(i, t, pe);
}, ot = (t, e) => {
  if (he) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = Y.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, $e = he ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return at(i);
})(t) : t;
const { is: nt, defineProperty: lt, getOwnPropertyDescriptor: ct, getOwnPropertyNames: dt, getOwnPropertySymbols: ht, getPrototypeOf: pt } = Object, te = globalThis, we = te.trustedTypes, ut = we ? we.emptyScript : "", gt = te.reactiveElementPolyfillSupport, j = (t, e) => t, Q = { toAttribute(t, e) {
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
} }, ue = (t, e) => !nt(t, e), ke = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: ue };
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
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && lt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: o } = ct(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const n = r?.call(this);
      o?.call(this, a), this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const i = this.properties, s = [...dt(i), ...ht(i)];
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
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Q).toAttribute(i, s.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Q;
      this._$Em = r;
      const n = a.fromAttribute(i, o.type);
      this[r] = n ?? this._$Ej?.get(r) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), s ??= a.getPropertyOptions(e), !((s.hasChanged ?? ue)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: o }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: a } = o, n = this[r];
        a !== !0 || this._$AL.has(r) || n === void 0 || this.C(r, void 0, o, n);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[j("elementProperties")] = /* @__PURE__ */ new Map(), R[j("finalized")] = /* @__PURE__ */ new Map(), gt?.({ ReactiveElement: R }), (te.reactiveElementVersions ??= []).push("2.1.2");
const ge = globalThis, Se = (t) => t, X = ge.trustedTypes, Ae = X ? X.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, je = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ue = "?" + x, mt = `<${Ue}>`, E = document, U = () => E.createComment(""), H = (t) => t === null || typeof t != "object" && typeof t != "function", me = Array.isArray, ft = (t) => me(t) || typeof t?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ce = /-->/g, Ee = />/g, A = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Me = /"/g, He = /^(?:script|style|textarea|title)$/i, Ie = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), l = Ie(1), le = Ie(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), C = E.createTreeWalker(E, 129);
function qe(t, e) {
  if (!me(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ae !== void 0 ? Ae.createHTML(e) : e;
}
const vt = (t, e) => {
  const i = t.length - 1, s = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = z;
  for (let n = 0; n < i; n++) {
    const d = t[n];
    let g, f, u = -1, h = 0;
    for (; h < d.length && (a.lastIndex = h, f = a.exec(d), f !== null); ) h = a.lastIndex, a === z ? f[1] === "!--" ? a = Ce : f[1] !== void 0 ? a = Ee : f[2] !== void 0 ? (He.test(f[2]) && (r = RegExp("</" + f[2], "g")), a = A) : f[3] !== void 0 && (a = A) : a === A ? f[0] === ">" ? (a = r ?? z, u = -1) : f[1] === void 0 ? u = -2 : (u = a.lastIndex - f[2].length, g = f[1], a = f[3] === void 0 ? A : f[3] === '"' ? Me : Te) : a === Me || a === Te ? a = A : a === Ce || a === Ee ? a = z : (a = A, r = void 0);
    const _ = a === A && t[n + 1].startsWith("/>") ? " " : "";
    o += a === z ? d + mt : u >= 0 ? (s.push(g), d.slice(0, u) + je + d.slice(u) + x + _) : d + x + (u === -2 ? n : _);
  }
  return [qe(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class I {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, d = this.parts, [g, f] = vt(e, i);
    if (this.el = I.createElement(g, s), C.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = C.nextNode()) !== null && d.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(je)) {
          const h = f[a++], _ = r.getAttribute(u).split(x), S = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: o, name: S[2], strings: _, ctor: S[1] === "." ? _t : S[1] === "?" ? bt : S[1] === "@" ? xt : ie }), r.removeAttribute(u);
        } else u.startsWith(x) && (d.push({ type: 6, index: o }), r.removeAttribute(u));
        if (He.test(r.tagName)) {
          const u = r.textContent.split(x), h = u.length - 1;
          if (h > 0) {
            r.textContent = X ? X.emptyScript : "";
            for (let _ = 0; _ < h; _++) r.append(u[_], U()), C.nextNode(), d.push({ type: 2, index: ++o });
            r.append(u[h], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ue) d.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(x, u + 1)) !== -1; ) d.push({ type: 7, index: o }), u += x.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = E.createElement("template");
    return s.innerHTML = e, s;
  }
}
function O(t, e, i = t, s) {
  if (e === P) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = H(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (e = O(t, r._$AS(t, e.values), r, s)), e;
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
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? E).importNode(i, !0);
    C.currentNode = r;
    let o = C.nextNode(), a = 0, n = 0, d = s[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let g;
        d.type === 2 ? g = new B(o, o.nextSibling, this, e) : d.type === 1 ? g = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (g = new $t(o, this, e)), this._$AV.push(g), d = s[++n];
      }
      a !== d?.index && (o = C.nextNode(), a++);
    }
    return C.currentNode = E, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class B {
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
    e = O(this, e, i), H(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = I.createElement(qe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const o = new yt(r, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = Re.get(e.strings);
    return i === void 0 && Re.set(e.strings, i = new I(e)), i;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const o of e) r === i.length ? i.push(s = new B(this.O(U()), this.O(U()), this, this.options)) : s = i[r], s._$AI(o), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = Se(e).nextSibling;
      Se(e).remove(), e = s;
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
  constructor(e, i, s, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, i = this, s, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = O(this, e, i, 0), a = !H(e) || e !== this._$AH && e !== P, a && (this._$AH = e);
    else {
      const n = e;
      let d, g;
      for (e = o[0], d = 0; d < o.length - 1; d++) g = O(this, n[s + d], i, d), g === P && (g = this._$AH[d]), a ||= !H(g) || g !== this._$AH[d], g === p ? e = p : e !== p && (e += (g ?? "") + o[d + 1]), this._$AH[d] = g;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class bt extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class xt extends ie {
  constructor(e, i, s, r, o) {
    super(e, i, s, r, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = O(this, e, i, 0) ?? p) === P) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
const wt = ge.litHtmlPolyfillSupport;
wt?.(I, B), (ge.litHtmlVersions ??= []).push("3.3.3");
const kt = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = r = new B(e.insertBefore(U(), o), o, void 0, i ?? {});
  }
  return r._$AI(t), r;
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
const St = fe.litElementPolyfillSupport;
St?.({ LitElement: $ });
(fe.litElementVersions ??= []).push("4.2.2");
const se = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const At = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: ue }, Ct = (t = At, e, i) => {
  const { kind: s, metadata: r } = i;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(n) {
      const d = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(a, d, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, t, n), n;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(n) {
      const d = this[a];
      e.call(this, n), this.requestUpdate(a, d, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function W(t) {
  return (e, i) => typeof i == "object" ? Ct(t, e, i) : ((s, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(t, e, i);
}
function w(t) {
  return W({ ...t, state: !0, attribute: !1 });
}
const Le = ee`
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
`, Fe = "ha_intervals_icu", m = {
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
function N(t, e) {
  const i = Math.max(
    0,
    Math.round(Tt(t, e))
  ), s = Math.floor(i / 86400), r = Math.floor(i % 86400 / 3600), o = Math.floor(i % 3600 / 60), a = i % 60, n = [];
  return s > 0 && n.push(`${s} j`), r > 0 && n.push(`${r} h`), o > 0 && n.push(`${o} min`), a > 0 && s === 0 && r === 0 && n.push(`${a} s`), n.length > 0 ? n.join(" ") : "0 s";
}
function Mt(t) {
  const e = Ve[t];
  if (e)
    return e;
  const i = t.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return i ? i.charAt(0).toUpperCase() + i.slice(1).toLowerCase() : t;
}
function Rt(t) {
  const e = t.attributes.unit_of_measurement, i = t.attributes.translation_key, s = t.entity_id ?? "";
  return e === "s" || i === "planned_today_duration" || i === "last_activity_duration" || s.endsWith("_planned_today_duration") || s.endsWith("_last_activity_duration");
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
  )].map((i) => t.devices?.[i]).filter((i) => !!i).sort((i, s) => q(i).localeCompare(q(s)));
}
function q(t) {
  return t?.name_by_user ?? t?.name ?? "Athlète Intervals.icu";
}
function ce(t, e, i, s) {
  if (e && t.states[e] && Pe(t, e, s))
    return e;
  const r = Be(t).find(
    (a) => a.platform === Fe && typeof a.entity_id == "string" && (!s || a.device_id === s) && Et(a, i)
  );
  if (r?.entity_id && t.states[r.entity_id])
    return r.entity_id;
  const o = `_${i}`;
  return Object.keys(t.states).find(
    (a) => a.startsWith("sensor.") && a.endsWith(o) && Pe(t, a, s)
  );
}
function v(t, e, i, s) {
  const r = ce(t, e, i, s);
  return r ? t.states[r] : void 0;
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
    const s = Number(e.state);
    if (Number.isFinite(s))
      return N(s, e.attributes.unit_of_measurement);
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
function Ot(t, e, i, s, r) {
  return t.map((o, a) => {
    const n = t.length === 1 ? e / 2 : a / (t.length - 1) * e, d = i - (o - s) / r * (i - 22) - 11;
    return `${n.toFixed(1)},${d.toFixed(1)}`;
  }).join(" ");
}
function zt(t) {
  const e = t.filter((h) => h.values.length >= 2);
  if (e.length === 0) return l`<div class="empty">Historique indisponible</div>`;
  const i = 760, s = 220, r = e.flatMap((h) => h.values), o = Math.min(...r), a = Math.max(...r), n = Math.max((a - o) * 0.12, 2), d = o - n, f = a + n - d || 1, u = [0, 1, 2, 3, 4];
  return l`
    <div class="chart-legend">
      ${e.map((h) => l`<span><i class=${h.className}></i>${h.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${i} ${s}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${u.map((h) => {
    const _ = 10 + h / 4 * (s - 20);
    return le`<line class="grid-line" x1="0" y1=${_} x2=${i} y2=${_}></line>`;
  })}
      ${e.map((h) => le`<polyline class="series ${h.className}" points=${Ot(h.values, i, s, d, f)}></polyline>`)}
    </svg>`;
}
function Nt(t, e, i, s) {
  const o = ((t === null ? 0 : Math.min(s, Math.max(i, t))) - i) / (s - i || 1), a = Math.PI * 52, n = Math.max(0, Math.min(a, o * a));
  return l`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${le`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${n} ${a}"></path>`}
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
function re(t) {
  return (t?.locale?.language ?? t?.language ?? navigator.language ?? "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
function c(t, e, i = {}) {
  let s = (re(t) === "fr" ? Dt : ze)[e] ?? ze[e] ?? e;
  for (const [r, o] of Object.entries(i))
    s = s.replaceAll(`{${r}}`, String(o));
  return s;
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
function D(t, e) {
  const i = String(e ?? "").trim();
  if (!i || re(t) !== "fr")
    return i;
  const s = i.toLowerCase().replace(/[\s-]+/g, "_");
  return jt[s] ?? i.replace(/_/g, " ").replace(/^./, (r) => r.toUpperCase());
}
function J(t, e) {
  const i = String(e ?? "").trim();
  if (!i || re(t) !== "fr")
    return i;
  let s = i.match(
    /^(\d+)-day load\s+(?:is\s+)?([\d.,]+)%\s+(lower|higher) than the previous period\.?$/i
  );
  if (s)
    return `Charge sur ${s[1]} jours ${s[2]} % ${s[3].toLowerCase() === "lower" ? "inférieure" : "supérieure"} à la période précédente`;
  if (/^Latest sleep is more than one hour below the value from seven days ago\.?$/i.test(
    i
  ))
    return "Le dernier sommeil est inférieur de plus d’une heure à celui d’il y a sept jours";
  if (s = i.match(
    /^(.+?) represents\s+([\d.,]+)% of training time over the last\s+(\d+) days\.?$/i
  ), s)
    return `${L(t, s[1])} représente ${s[2]} % du temps d’entraînement sur les ${s[3]} derniers jours`;
  const r = L(t, i);
  return r !== i ? r : D(t, i);
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
  strengthtraining: "Musculation",
  crossfit: "CrossFit",
  highintensityintervaltraining: "CrossFit",
  hiit: "CrossFit",
  workout: "Entraînement",
  yoga: "Yoga",
  pilates: "Pilates",
  rowing: "Aviron",
  indoorrowing: "Rameur",
  virtualrow: "Rameur virtuel",
  virtualrowing: "Rameur virtuel",
  kayaking: "Kayak",
  canoeing: "Canoë",
  stepper: "Stepper",
  stairclimber: "Stepper",
  stairstepper: "Stepper",
  alpineski: "Ski alpin",
  nordicski: "Ski de fond",
  snowboard: "Snowboard",
  other: "Autre activité"
};
function L(t, e, i) {
  const s = String(e ?? "").trim();
  if (!s)
    return i ?? c(t, "activity");
  if (re(t) !== "fr")
    return s.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const r = s.replace(/[\s_-]+/g, "").toLowerCase();
  return Ut[r] ?? s.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function Ht(t, e) {
  if (!e)
    return { label: c(t, "sync_unknown"), level: "danger" };
  const i = new Date(e).getTime();
  if (!Number.isFinite(i))
    return { label: c(t, "sync_unknown"), level: "danger" };
  const s = Math.max(0, Math.floor((Date.now() - i) / 6e4));
  if (s < 1)
    return { label: c(t, "sync_now"), level: "good" };
  if (s < 60)
    return {
      label: c(t, "sync_minutes", { value: s }),
      level: s < 5 ? "good" : s <= 30 ? "warning" : "danger"
    };
  const r = Math.floor(s / 60);
  return r < 24 ? {
    label: c(t, "sync_hours", { value: r }),
    level: "danger"
  } : {
    label: c(t, "sync_days", { value: Math.floor(r / 24) }),
    level: "danger"
  };
}
function Ne(t, e = "Activity", i) {
  return L(i, t, e);
}
var It = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, ve = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? qt(e, i) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && It(e, i, r), r;
};
const G = "https://github.com/pepka69/ha-intervals-icu", Lt = `${G}/blob/develop/README.fr.md`, Ft = `${G}/issues`, Vt = `${G}/issues/new/choose`, Bt = "https://buymeacoffee.com/pep_ka", Wt = `${G}/raw/develop/.github/assets/buy-me-a-beer-en.png`, Ge = [
  ["fitness_entity", "Fitness", m.fitness],
  ["fatigue_entity", "Fatigue", m.fatigue],
  ["form_entity", "Forme", m.form],
  ["ftp_entity", "FTP", m.ftp],
  ["weekly_load_entity", "Charge 7 jours", m.weeklyLoad],
  [
    "weekly_activities_entity",
    "Activités 7 jours",
    m.weeklyActivities
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
let F = class extends $ {
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
    const s = { ...this.config?.health ?? {} }, r = { ...s[t] ?? {} };
    e === "entity" && i === "" ? delete r.entity : Object.assign(r, { [e]: i }), s[t] = r;
    const o = {
      ...this.config,
      health: s
    };
    t === "weight" && (delete o.weight_entity, delete o.show_weight), this.emitConfig(o);
  }
  render() {
    if (!this.config || !this.hass)
      return l``;
    const t = We(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter(
      (r) => r.startsWith("sensor.") && (!e || this.hass.entities?.[r]?.device_id === e)
    ).sort(), s = Object.keys(this.hass.states).filter((r) => r.startsWith("sensor.")).sort();
    return l`
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
      (r) => l`
                <option value=${r.id}>
                  ${q(r)}
                </option>
              `
    )}
          </select>
        </label>

        ${t.length === 0 ? l`
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

        ${Ge.map(
      ([r, o, a]) => l`
            <label>
              ${o}
              <select
                .value=${String(
        this.config[r] ?? ce(
          this.hass,
          void 0,
          a,
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
        (n) => l`
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

          ${Zt.map(({ key: r, label: o }) => {
      const a = this.healthMetricConfig(r);
      return l`
              <div class="health-editor-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${a.show}
                    @change=${(n) => this.changeHealthMetric(
        r,
        "show",
        n.target.checked
      )}
                  />
                  Afficher ${o}
                </label>

                <label>
                  Capteur — ${o}
                  <select
                    .value=${a.entity}
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
        (n) => l`
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
      ([r, o]) => l`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config[r] !== !1}
                @change=${(a) => this.change(
        r,
        a.target.checked
      )}
              />
              ${o}
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
              <a href=${Lt} target="_blank" rel="noopener noreferrer">
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
              <a href=${G} target="_blank" rel="noopener noreferrer">
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
F.styles = Le;
ve([
  W({ attribute: !1 })
], F.prototype, "hass", 2);
ve([
  w()
], F.prototype, "config", 2);
F = ve([
  se("ha-intervals-icu-card-editor")
], F);
var Yt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, K = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Jt(e, i) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (r = (s ? a(e, i, r) : a(r)) || r);
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
    return l`<div class="quick-stat"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${y(this.hass, i)}</strong></div></div>`;
  }
  state(t, e) {
    return this.hass ? v(
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
    const i = t.currentTarget.getBoundingClientRect(), r = this.renderRoot.querySelector("ha-card")?.getBoundingClientRect() ?? this.getBoundingClientRect(), o = 160, a = i.left - r.left + i.width / 2;
    return {
      x: Math.max(
        o,
        Math.min(a, r.width - o)
      ),
      y: i.bottom - r.top
    };
  }
  showMetricTooltip(t, e, i = !1) {
    if (i && this.tooltip?.pinned && this.tooltip.key === e) {
      this.tooltip = void 0;
      return;
    }
    const s = this.metricTooltip(e), r = this.tooltipPosition(t);
    this.tooltip = {
      key: e,
      title: s.title,
      text: s.text,
      x: r.x,
      y: r.y,
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
    return this.tooltip ? l`
      <div
        class="metric-tooltip bottom"
        role="tooltip"
        style=${`left: ${this.tooltip.x}px; top: ${this.tooltip.y}px;`}
      >
        <strong>${this.tooltip.title}</strong>
        <span>${this.tooltip.text}</span>
      </div>
    ` : p;
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
  metric(t, e, i, s) {
    const r = Oe(s), o = this.status(i, s), a = i === "form" ? -30 : 0, n = i === "form" ? 30 : 100, d = s?.attributes.change_7_days;
    return l`
      <article
        class="metric ${i}"
        tabindex="0"
        aria-label=${`${t} — ${this.metricTooltip(i).title}`}
        @mouseenter=${(g) => this.showMetricTooltip(g, i)}
        @mouseleave=${() => this.hideMetricTooltip()}
        @focus=${(g) => this.showMetricTooltip(g, i)}
        @blur=${() => this.hideMetricTooltip()}
        @click=${(g) => {
      g.stopPropagation(), this.showMetricTooltip(g, i, !0);
    }}
        @keydown=${(g) => this.handleMetricKeydown(g, i)}
      >
        <div class="metric-label">${t}</div>
        <div class="metric-value">${y(this.hass, s)}</div>
        <div class="metric-short">${e}</div>
        ${Nt(r, o, a, n)}
        <div class="metric-foot">
          7 j
          ${typeof d == "number" ? `${d > 0 ? "+" : ""}${d.toFixed(1)}` : "—"}
        </div>
      </article>
    `;
  }
  infoRow(t, e, i) {
    return l`<div class="info-row">
      <ha-icon icon=${t}></ha-icon>
      <span>${e}</span>
      <strong>${y(this.hass, i)}</strong>
    </div>`;
  }
  healthState(t) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[t]?.entity ?? (t === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : v(
      this.hass,
      void 0,
      m[t],
      this.config.device_id
    );
  }
  healthVisible(t, e) {
    const i = this.config?.health?.[t]?.show;
    return i !== void 0 ? i : t === "weight" && this.config?.show_weight !== void 0 ? this.config.show_weight : e;
  }
  render() {
    if (!this.hass || !this.config) return p;
    const t = this.hass, e = this.state("fitness_entity", m.fitness), i = this.state("fatigue_entity", m.fatigue), s = this.state("form_entity", m.form), r = this.state("ftp_entity", m.ftp), o = this.state(
      "weekly_load_entity",
      m.weeklyLoad
    ), a = this.state(
      "weekly_activities_entity",
      m.weeklyActivities
    ), n = v(
      t,
      void 0,
      m.trainingStatus,
      this.config.device_id
    ), d = v(
      t,
      void 0,
      m.readinessScore,
      this.config.device_id
    ), g = v(
      t,
      void 0,
      m.readinessLevel,
      this.config.device_id
    ), f = v(
      t,
      void 0,
      m.readinessRecoveryHours,
      this.config.device_id
    ), u = v(
      t,
      void 0,
      m.atlasCoach,
      this.config.device_id
    ), h = this.config.device_id, _ = h ? t.devices?.[h] : void 0, S = this.config.athlete_name || q(_), Ke = v(
      t,
      void 0,
      m.plannedTodayName,
      h
    ), Ze = v(
      t,
      void 0,
      m.plannedTodaySport,
      h
    ), Ye = v(
      t,
      void 0,
      m.plannedTodayDuration,
      h
    ), Je = v(
      t,
      void 0,
      m.plannedTodayLoad,
      h
    ), Qe = v(
      t,
      void 0,
      m.lastActivityName,
      h
    ), Xe = v(
      t,
      void 0,
      m.lastActivityType,
      h
    ), et = v(
      t,
      void 0,
      m.lastActivityDate,
      h
    ), tt = v(
      t,
      void 0,
      m.lastActivityDuration,
      h
    ), it = v(
      t,
      void 0,
      m.lastActivityLoad,
      h
    ), st = v(
      t,
      void 0,
      m.lastActivityCalories,
      h
    ), ye = y(t, Qe), ae = c(t, "activity"), Z = Ne(y(t, Xe, ae), ae, t), rt = Z !== ae && Z.trim().toLowerCase() !== ye.trim().toLowerCase(), _e = Qt.map((b) => ({
      ...b,
      state: this.healthState(b.key),
      visible: this.healthVisible(b.key, b.defaultShow)
    })).filter((b) => b.visible && b.state), be = Ht(
      t,
      e?.last_updated ?? e?.last_changed
    );
    return l`<ha-card class=${this.config.compact ? "compact" : ""}>
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
              ${S ? l`<div class="athlete">${S}</div>` : p}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== !1 ? l`<div class="sync"><span class="dot ${be.level}"></span>${be.label}</div>` : p}
            ${this.config.show_refresh_button !== !1 ? l`<button class="refresh" title=${c(t, "refresh")} @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>` : p}
          </div>
        </header>

        ${this.config.show_atlas !== !1 ? l`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>${c(t, "atlas_readiness")}</span>
                </div>
                <div class="atlas-score">
                  <strong>${y(t, d)}</strong>
                  <span>${D(t, y(t, g, c(t, "unavailable")))}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>${c(t, "recovery")} ${y(t, f)}</span>
                  <span><ha-icon icon=${n?.attributes.icon || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${D(t, y(t, n, c(t, "unknown_status")))}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>${c(t, "atlas_coach")}</span>
                </div>
                <h3>${D(t, y(t, u, c(t, "no_recommendation")))}</h3>
                ${u?.attributes.recommendation ? l`<p>${J(t, u.attributes.recommendation)}</p>` : p}
                <div class="atlas-chips">
                  ${u?.attributes.intensity ? l`<span>${D(t, u.attributes.intensity)}</span>` : p}
                  ${u?.attributes.duration_minutes ? l`<span>${String(u.attributes.duration_minutes)} min</span>` : p}
                  ${u?.attributes.heart_rate_zone ? l`<span>${String(u.attributes.heart_rate_zone)}</span>` : p}
                </div>
              </article>
            </section>` : p}

        <section class="metrics">
          ${this.metric(c(t, "fitness"), "CTL", "fitness", e)}
          ${this.metric(c(t, "fatigue"), "ATL", "fatigue", i)}
          ${this.metric(c(t, "form"), "TSB", "form", s)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", r)}
          ${this.quickStat("mdi:chart-areaspline", c(t, "load_7d"), o)}
          ${this.quickStat("mdi:calendar-check", c(t, "activities_7d"), a)}
        </section>

        ${this.config.show_history !== !1 ? l`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>${c(t, "evolution")}</span>
              </div>
              ${zt([
      {
        label: c(t, "fitness"),
        values: ne(e),
        className: "fitness-line"
      },
      {
        label: c(t, "fatigue"),
        values: ne(i),
        className: "fatigue-line"
      },
      {
        label: c(t, "form"),
        values: ne(s),
        className: "form-line"
      }
    ])}
            </section>` : p}

        ${this.config.show_health !== !1 && _e.length > 0 ? l`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>${c(t, "health")}</span>
              </div>
              <div class="health-grid">
                ${_e.map(
      (b) => l`
                    <div class="health-item">
                      <ha-icon icon=${b.icon}></ha-icon>
                      <div>
                        <span>${c(t, b.label)}</span>
                        <strong>${y(t, b.state)}</strong>
                      </div>
                    </div>
                  `
    )}
              </div>
            </section>` : p}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? l`<article class="feature workout spotlight">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>${c(t, "today")}</span>
                </div>
                <h3>
                  ${y(
      t,
      Ke,
      c(t, "no_workout")
    )}
                </h3>
                <div class="pill">
                  ${Ne(y(t, Ze, c(t, "workout")), c(t, "workout"), t)}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${y(t, Ye)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${c(t, "load")}
                    ${y(t, Je)}</span
                  >
                </div>
              </article>` : p}

          ${this.config.show_records !== !1 ? l`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>${c(t, "records")}</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      v(
        t,
        void 0,
        m.recordFtp,
        h
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      c(t, "distance"),
      v(
        t,
        void 0,
        m.recordDistance,
        h
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      c(t, "elevation"),
      v(
        t,
        void 0,
        m.recordElevation,
        h
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      c(t, "max_power"),
      v(
        t,
        void 0,
        m.recordMaxPower,
        h
      )
    )}
              </article>` : p}

          ${this.config.show_last_activity !== !1 ? l`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(Z)}></ha-icon
                  ><span>${c(t, "last_activity")}</span>
                </div>
                <h3>${ye}</h3>
                ${rt ? l`<div class="pill purple">${Z}</div>` : p}
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
                    >${y(t, st)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${c(t, "load")}
                    ${y(t, it)}</span
                  >
                </div>
              </article>` : p}
        </section>

        ${this.renderMetricTooltip()}
      </div>
    </ha-card>`;
  }
};
T.styles = [
  Le,
  ee`
      :host {
        overflow: visible;
      }

      ha-card {
        position: relative;
        overflow: visible;
      }

      .metric {
        position: relative;
        overflow: visible;
        cursor: help;
      }

      .metric:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 3px;
      }

      .metric-tooltip {
        position: absolute;
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
        transform: translate(-50%, 12px);
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
K([
  W({ attribute: !1 })
], T.prototype, "hass", 2);
K([
  w()
], T.prototype, "config", 2);
K([
  w()
], T.prototype, "refreshing", 2);
K([
  w()
], T.prototype, "tooltip", 2);
T = K([
  se("ha-intervals-icu-card")
], T);
var Xt = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, k = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ei(e, i) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Xt(e, i, r), r;
};
let V = class extends $ {
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
      return l``;
    const t = We(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter((s) => {
      if (!s.startsWith("sensor.") || e && this.hass.entities?.[s]?.device_id !== e)
        return !1;
      const r = this.hass.entities?.[s], o = this.hass.states[s];
      return r?.translation_key === "statistics_dashboard" || r?.unique_id?.endsWith("_statistics_dashboard") || s.endsWith("_statistics_dashboard") || o?.attributes.translation_key === "statistics_dashboard";
    }).sort();
    return l`
      <div class="statistics-editor">
        <label>
          <span>${c(this.hass, "athlete_device")}</span>

          <select
            .value=${e}
            @change=${(s) => this.changeDevice(
      s.target.value
    )}
          >
            <option value="">${c(this.hass, "select_athlete")}</option>

            ${t.map(
      (s) => l`
                <option value=${s.id}>
                  ${q(s)}
                </option>
              `
    )}
          </select>
        </label>

        ${t.length === 0 ? l`
              <p>${c(this.hass, "no_intervals_device")}</p>
            ` : p}

        <label>
          <span>${c(this.hass, "title")}</span>

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
          <span>${c(this.hass, "default_period")}</span>

          <select
            .value=${this.config.default_period ?? "30_days"}
            @change=${(s) => this.change(
      "default_period",
      s.target.value
    )}
          >
            <option value="7_days">${c(this.hass, "period_7_days")}</option>
            <option value="30_days">${c(this.hass, "period_30_days")}</option>
            <option value="90_days">${c(this.hass, "period_90_days")}</option>
            <option value="365_days">${c(this.hass, "period_365_days")}</option>
          </select>
        </label>

        <label>
          <span>${c(this.hass, "statistics_entity")}</span>

          <select
            .value=${this.config.entity ?? ""}
            @change=${(s) => this.change(
      "entity",
      s.target.value
    )}
          >
            <option value="">
              ${c(this.hass, "automatic_athlete_detection")}
            </option>

            ${i.map(
      (s) => l`
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
V.styles = ee`
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
  W({ attribute: !1 })
], V.prototype, "hass", 2);
k([
  w()
], V.prototype, "config", 2);
V = k([
  se("ha-intervals-icu-statistics-card-editor")
], V);
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
    return this.hass ? v(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id)?.attributes ?? {} : {};
  }
  number(t, e = 1) {
    const i = Number(t);
    return Number.isFinite(i) ? i.toLocaleString(this.hass?.locale?.language, { maximumFractionDigits: e }) : "—";
  }
  change(t) {
    const e = Number(t);
    if (!Number.isFinite(e)) return l`<span class="change neutral">—</span>`;
    const i = e > 3 ? "up" : e < -3 ? "down" : "neutral";
    return l`<span class="change ${i}">${e > 0 ? "+" : ""}${e.toFixed(1)}%</span>`;
  }
  tile(t, e, i, s = "", r) {
    return l`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${this.number(i)}${s}</strong>${r !== void 0 ? this.change(r) : p}</div></article>`;
  }
  textTile(t, e, i, s) {
    return l`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${i}</strong>${s !== void 0 ? this.change(s) : p}</div></article>`;
  }
  label(t) {
    return c(this.hass, t);
  }
  name(t) {
    return J(this.hass, t.replaceAll("_", " "));
  }
  overview(t) {
    const e = t.periods?.[this.period] ?? {}, i = e.current ?? {}, s = e.comparison ?? {};
    return l`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", this.label("activities"), i.activities, "", s.activities_change_percent)}
        ${this.textTile("mdi:clock-outline", this.label("duration"), N(i.duration_hours, "h"), s.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", this.label("distance"), i.distance_km, " km", s.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", this.label("load"), i.load, "", s.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", this.label("elevation"), i.elevation_m, " m", s.elevation_m_change_percent)}
        ${this.tile("mdi:fire", this.label("calories"), i.calories, " kcal", s.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", i.hrss, "", s.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", i.trimp, "", s.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(t.training_insights_by_period?.[this.period] ?? t.insights ?? t.training_insights ?? []).map((r) => l`<div class="insight ${r.type ?? "info"}"><ha-icon icon=${r.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${J(this.hass, r.title)}</strong><span>${J(this.hass, r.message)}</span></div></div>`)}
      </div>`;
  }
  sports(t) {
    const e = t.sports?.[this.period] ?? {};
    return l`<div class="table">${Object.entries(e).map(([i, s]) => l`
      <div class="row"><strong>${L(this.hass, i)}</strong><span>${this.number(s.activities, 0)} ${c(this.hass, "activity_short")}</span><span>${N(s.duration_hours, "h")}</span><span>${this.number(s.distance_km)} km</span><span>${c(this.hass, "load")} ${this.number(s.load)}</span></div>`)}
      ${Object.keys(e).length ? p : l`<div class="empty">${c(this.hass, "no_sport_data")}</div>`}
    </div>`;
  }
  wellness(t) {
    const e = t.wellness ?? {}, s = [
      {
        key: "wellness_sleep",
        label: c(this.hass, "sleep"),
        icon: "mdi:sleep",
        format: "duration"
      },
      {
        key: "wellness_sleep_score",
        label: this.hass?.locale?.language?.startsWith("fr") ? "Score de sommeil" : "Sleep score",
        icon: "mdi:sleep-off",
        format: "number"
      },
      {
        key: "wellness_hrv",
        label: "HRV",
        icon: "mdi:heart-flash",
        format: "number"
      },
      {
        key: "wellness_resting_hr",
        label: c(this.hass, "resting_hr"),
        icon: "mdi:heart-pulse",
        format: "number"
      },
      {
        key: "wellness_readiness",
        label: this.hass?.locale?.language?.startsWith("fr") ? "Préparation" : "Readiness",
        icon: "mdi:battery-heart-variant",
        format: "number"
      },
      {
        key: "wellness_vo2max",
        label: "VO₂max",
        icon: "mdi:lungs",
        format: "number"
      }
    ].filter(
      (a) => e[a.key] !== void 0 && e[a.key] !== null
    );
    if (!s.length)
      return l`
        <div class="empty">
          ${this.hass?.locale?.language?.startsWith("fr") ? "Aucune donnée de bien-être disponible." : "No wellness data available."}
        </div>
      `;
    const r = this.period === "7_days" ? 7 : this.period === "30_days" ? 30 : null, o = (a, n) => {
      if (n === "duration") {
        const d = Number(a);
        return Number.isFinite(d) ? N(d, "s") : "—";
      }
      return this.number(a);
    };
    return l`
      <div class="wellness-grid">
        ${s.map((a) => {
      const n = r ? `${a.key}_average_${r}_days` : void 0, d = this.period === "30_days" ? `${a.key}_minimum_30_days` : void 0, g = this.period === "30_days" ? `${a.key}_maximum_30_days` : void 0, f = n ? e[n] : void 0, u = d ? e[d] : void 0, h = g ? e[g] : void 0;
      return l`
            <article class="wellness-card">
              <div class="wellness-title">
                <ha-icon icon=${a.icon}></ha-icon>
                <span>${a.label}</span>
              </div>

              <strong>
                ${o(e[a.key], a.format)}
              </strong>

              ${f != null ? l`
                    <small>
                      ${this.hass?.locale?.language?.startsWith("fr") ? "Moyenne" : "Average"}
                      ${r} j :
                      ${o(f, a.format)}
                    </small>
                  ` : p}

              ${u != null && h !== void 0 && h !== null ? l`
                    <small>
                      Min :
                      ${o(u, a.format)}
                      · Max :
                      ${o(h, a.format)}
                    </small>
                  ` : p}
            </article>
          `;
    })}
      </div>
    `;
  }
  records(t) {
    const e = t.period_records ?? {}, i = t.records_by_sport ?? {};
    return l`
      <div class="record-grid">
        ${Object.entries(e).map(([s, r]) => r ? l`<article class="record"><span>${this.name(s)}</span><strong>${r.period}</strong><small>${this.number(r.load)} ${c(this.hass, "load").toLowerCase()} · ${N(r.duration_hours, "h")}</small></article>` : p)}
      </div>
      ${Object.entries(i).map(([s, r]) => l`<details><summary>${L(this.hass, s)}</summary><div class="record-list">${Object.entries(r).map(([o, a]) => l`<div><span>${this.name(o)}</span><strong>${this.number(a.value)}</strong><small>${a.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }
  trends(t) {
    const e = t.trends ?? {};
    return l`<div class="trend-grid">${Object.entries(e).map(([i, s]) => l`
      <article class="trend"><span>${this.name(i)}</span><strong>${this.number(s.latest)}</strong><div class="trend-changes"><small>7d ${this.number(s.change_7_days)}</small><small>30d ${this.number(s.change_30_days)}</small><small>90d ${this.number(s.change_90_days)}</small><small>365d ${this.number(s.change_365_days)}</small></div></article>`)}
    </div>`;
  }
  quality(t) {
    const e = t.data_quality ?? {}, i = e.coverage ?? {};
    return l`<div class="quality-head"><strong>${this.number(e.completeness_percent)}%</strong><span>${c(this.hass, "completeness")} · ${this.number(e.field_count, 0)} ${c(this.hass, "api_fields")}</span></div>
      <div class="coverage">${Object.entries(i).map(([s, r]) => l`<div><span>${this.name(s)}</span><progress max="100" value=${r.percent ?? 0}></progress><strong>${this.number(r.percent)}%</strong></div>`)}</div>`;
  }
  render() {
    if (!this.hass || !this.config) return p;
    const t = this.attrs(), e = this.section === "sports" ? this.sports(t) : this.section === "records" ? this.records(t) : this.section === "trends" ? this.trends(t) : this.section === "wellness" ? this.wellness(t) : this.section === "quality" ? this.quality(t) : this.overview(t);
    return l`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>${c(this.hass, "statistics_trends")}</span></div></div><nav>${["7_days", "30_days", "90_days", "365_days"].map((i) => l`<button class=${this.period === i ? "active" : ""} @click=${() => this.period = i}>${i.replace("_days", c(this.hass, "day_short"))}</button>`)}</nav></header>
      <div class="tabs">${["overview", "sports", "records", "trends", "wellness", "quality"].map((i) => l`<button class=${this.section === i ? "active" : ""} @click=${() => this.section = i}>${i === "wellness" ? this.hass?.locale?.language?.startsWith("fr") ? "Bien-être" : "Wellness" : c(this.hass, i)}</button>`)}</div>
      <section>${e}</section></div></ha-card>`;
  }
};
M.styles = ee`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.wellness-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.wellness-card{display:grid;gap:7px;padding:15px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.wellness-title{display:flex;gap:8px;align-items:center;color:var(--secondary-text-color);font-size:.78rem}.wellness-title ha-icon{color:var(--primary-color)}.wellness-card>strong{font-size:1.25rem}.wellness-card>small{color:var(--secondary-text-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid,.wellness-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:520px){.shell{padding:14px}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid,.wellness-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
k([
  W({ attribute: !1 })
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
  se("ha-intervals-icu-statistics-card")
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
  "%c HA Intervals.icu Card %c 2.0.0-beta15 ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:white"
);
