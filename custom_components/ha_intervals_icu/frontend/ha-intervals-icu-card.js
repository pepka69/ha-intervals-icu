const te = globalThis, $e = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, we = /* @__PURE__ */ Symbol(), Re = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, i, a) {
    if (this._$cssResult$ = !0, a !== we) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if ($e && e === void 0) {
      const a = i !== void 0 && i.length === 1;
      a && (e = Re.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && Re.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const nt = (t) => new Ke(typeof t == "string" ? t : t + "", void 0, we), re = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((a, r, s) => a + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new Ke(i, t, we);
}, lt = (t, e) => {
  if ($e) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const a = document.createElement("style"), r = te.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = i.cssText, t.appendChild(a);
  }
}, Ne = $e ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const a of e.cssRules) i += a.cssText;
  return nt(i);
})(t) : t;
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: ht, getOwnPropertyNames: pt, getOwnPropertySymbols: ut, getPrototypeOf: mt } = Object, se = globalThis, Pe = se.trustedTypes, gt = Pe ? Pe.emptyScript : "", vt = se.reactiveElementPolyfillSupport, U = (t, e) => t, ie = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? gt : null;
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
} }, ke = (t, e) => !ct(t, e), De = { attribute: !0, type: String, converter: ie, reflect: !1, useDefault: !1, hasChanged: ke };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), se.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = De) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const a = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, a, i);
      r !== void 0 && dt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, a) {
    const { get: r, set: s } = ht(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      s?.call(this, o), this.requestUpdate(e, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = mt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const i = this.properties, a = [...pt(i), ...ut(i)];
      for (const r of a) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [a, r] of i) this.elementProperties.set(a, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, a] of this.elementProperties) {
      const r = this._$Eu(i, a);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const r of a) i.unshift(Ne(r));
    } else e !== void 0 && i.push(Ne(e));
    return i;
  }
  static _$Eu(e, i) {
    const a = i.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const a of i.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return lt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, a) {
    this._$AK(e, a);
  }
  _$ET(e, i) {
    const a = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, a);
    if (r !== void 0 && a.reflect === !0) {
      const s = (a.converter?.toAttribute !== void 0 ? a.converter : ie).toAttribute(i, a.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const a = this.constructor, r = a._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = a.getPropertyOptions(r), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ie;
      this._$Em = r;
      const l = o.fromAttribute(i, s.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, a, r = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), a ??= o.getPropertyOptions(e), !((a.hasChanged ?? ke)(s, i) || a.useDefault && a.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, a)))) return;
      this.C(e, i, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: a, reflect: r, wrapped: s }, o) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [r, s] of a) {
        const { wrapped: o } = s, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[U("elementProperties")] = /* @__PURE__ */ new Map(), z[U("finalized")] = /* @__PURE__ */ new Map(), vt?.({ ReactiveElement: z }), (se.reactiveElementVersions ??= []).push("2.1.2");
const Se = globalThis, ze = (t) => t, ae = Se.trustedTypes, Oe = ae ? ae.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ze = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + w, ft = `<${Ye}>`, R = document, q = () => R.createComment(""), V = (t) => t === null || typeof t != "object" && typeof t != "function", Ae = Array.isArray, yt = (t) => Ae(t) || typeof t?.[Symbol.iterator] == "function", fe = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Le = /-->/g, je = />/g, E = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Fe = /'/g, He = /"/g, Je = /^(?:script|style|textarea|title)$/i, Qe = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Qe(1), be = Qe(2), O = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), T = R.createTreeWalker(R, 129);
function Xe(t, e) {
  if (!Ae(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(e) : e;
}
const bt = (t, e) => {
  const i = t.length - 1, a = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = j;
  for (let l = 0; l < i; l++) {
    const d = t[l];
    let m, v, p = -1, h = 0;
    for (; h < d.length && (o.lastIndex = h, v = o.exec(d), v !== null); ) h = o.lastIndex, o === j ? v[1] === "!--" ? o = Le : v[1] !== void 0 ? o = je : v[2] !== void 0 ? (Je.test(v[2]) && (r = RegExp("</" + v[2], "g")), o = E) : v[3] !== void 0 && (o = E) : o === E ? v[0] === ">" ? (o = r ?? j, p = -1) : v[1] === void 0 ? p = -2 : (p = o.lastIndex - v[2].length, m = v[1], o = v[3] === void 0 ? E : v[3] === '"' ? He : Fe) : o === He || o === Fe ? o = E : o === Le || o === je ? o = j : (o = E, r = void 0);
    const _ = o === E && t[l + 1].startsWith("/>") ? " " : "";
    s += o === j ? d + ft : p >= 0 ? (a.push(m), d.slice(0, p) + Ze + d.slice(p) + w + _) : d + w + (p === -2 ? l : _);
  }
  return [Xe(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class B {
  constructor({ strings: e, _$litType$: i }, a) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, d = this.parts, [m, v] = bt(e, i);
    if (this.el = B.createElement(m, a), T.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = T.nextNode()) !== null && d.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Ze)) {
          const h = v[o++], _ = r.getAttribute(p).split(w), x = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: s, name: x[2], strings: _, ctor: x[1] === "." ? xt : x[1] === "?" ? $t : x[1] === "@" ? wt : oe }), r.removeAttribute(p);
        } else p.startsWith(w) && (d.push({ type: 6, index: s }), r.removeAttribute(p));
        if (Je.test(r.tagName)) {
          const p = r.textContent.split(w), h = p.length - 1;
          if (h > 0) {
            r.textContent = ae ? ae.emptyScript : "";
            for (let _ = 0; _ < h; _++) r.append(p[_], q()), T.nextNode(), d.push({ type: 2, index: ++s });
            r.append(p[h], q());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ye) d.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(w, p + 1)) !== -1; ) d.push({ type: 7, index: s }), p += w.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const a = R.createElement("template");
    return a.innerHTML = e, a;
  }
}
function L(t, e, i = t, a) {
  if (e === O) return e;
  let r = a !== void 0 ? i._$Co?.[a] : i._$Cl;
  const s = V(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, i, a)), a !== void 0 ? (i._$Co ??= [])[a] = r : i._$Cl = r), r !== void 0 && (e = L(t, r._$AS(t, e.values), r, a)), e;
}
class _t {
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
    const { el: { content: i }, parts: a } = this._$AD, r = (e?.creationScope ?? R).importNode(i, !0);
    T.currentNode = r;
    let s = T.nextNode(), o = 0, l = 0, d = a[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let m;
        d.type === 2 ? m = new Z(s, s.nextSibling, this, e) : d.type === 1 ? m = new d.ctor(s, d.name, d.strings, this, e) : d.type === 6 && (m = new kt(s, this, e)), this._$AV.push(m), d = a[++l];
      }
      o !== d?.index && (s = T.nextNode(), o++);
    }
    return T.currentNode = R, r;
  }
  p(e) {
    let i = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, i), i += a.strings.length - 2) : a._$AI(e[i])), i++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, a, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = a, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = L(this, e, i), V(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(R.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: a } = e, r = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = B.createElement(Xe(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new _t(r, this), o = s.u(this.options);
      s.p(i), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Ue.get(e.strings);
    return i === void 0 && Ue.set(e.strings, i = new B(e)), i;
  }
  k(e) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let a, r = 0;
    for (const s of e) r === i.length ? i.push(a = new Z(this.O(q()), this.O(q()), this, this.options)) : a = i[r], a._$AI(s), r++;
    r < i.length && (this._$AR(a && a._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const a = ze(e).nextSibling;
      ze(e).remove(), e = a;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class oe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, a, r, s) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = s, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = u;
  }
  _$AI(e, i = this, a, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = L(this, e, i, 0), o = !V(e) || e !== this._$AH && e !== O, o && (this._$AH = e);
    else {
      const l = e;
      let d, m;
      for (e = s[0], d = 0; d < s.length - 1; d++) m = L(this, l[a + d], i, d), m === O && (m = this._$AH[d]), o ||= !V(m) || m !== this._$AH[d], m === u ? e = u : e !== u && (e += (m ?? "") + s[d + 1]), this._$AH[d] = m;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xt extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class $t extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class wt extends oe {
  constructor(e, i, a, r, s) {
    super(e, i, a, r, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = L(this, e, i, 0) ?? u) === O) return;
    const a = this._$AH, r = e === u && a !== u || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, s = e !== u && (a === u || r);
    r && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class kt {
  constructor(e, i, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const St = Se.litHtmlPolyfillSupport;
St?.(B, Z), (Se.litHtmlVersions ??= []).push("3.3.3");
const At = (t, e, i) => {
  const a = i?.renderBefore ?? e;
  let r = a._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    a._$litPart$ = r = new Z(e.insertBefore(q(), s), s, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const Ce = globalThis;
class k extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = At(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return O;
  }
}
k._$litElement$ = !0, k.finalized = !0, Ce.litElementHydrateSupport?.({ LitElement: k });
const Ct = Ce.litElementPolyfillSupport;
Ct?.({ LitElement: k });
(Ce.litElementVersions ??= []).push("4.2.2");
const ne = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Et = { attribute: !0, type: String, converter: ie, reflect: !1, hasChanged: ke }, Tt = (t = Et, e, i) => {
  const { kind: a, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), a === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), a === "accessor") {
    const { name: o } = i;
    return { set(l) {
      const d = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, d, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (a === "setter") {
    const { name: o } = i;
    return function(l) {
      const d = this[o];
      e.call(this, l), this.requestUpdate(o, d, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function Y(t) {
  return (e, i) => typeof i == "object" ? Tt(t, e, i) : ((a, r, s) => {
    const o = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, a), o ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, i);
}
function S(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
const et = re`
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
`, tt = "ha_intervals_icu", g = {
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
}, it = {
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
function Ie(t, e, i) {
  return i ? t.entities?.[e]?.device_id === i : !0;
}
function at(t) {
  return Object.values(t.entities ?? {});
}
function Mt(t, e) {
  if (t.translation_key === e)
    return !0;
  const i = t.unique_id ?? "";
  return i === e || i.endsWith(`_${e}`) || i.endsWith(`-${e}`);
}
function Rt(t, e) {
  const i = (e ?? "s").trim().toLowerCase();
  return ["ms", "millisecond", "milliseconds"].includes(i) ? t / 1e3 : ["min", "minute", "minutes"].includes(i) ? t * 60 : ["h", "hr", "hour", "hours"].includes(i) ? t * 3600 : ["d", "day", "days"].includes(i) ? t * 86400 : t;
}
function F(t, e) {
  const i = Math.max(
    0,
    Math.round(Rt(t, e))
  ), a = Math.floor(i / 86400), r = Math.floor(i % 86400 / 3600), s = Math.floor(i % 3600 / 60), o = i % 60, l = [];
  return a > 0 && l.push(`${a} j`), r > 0 && l.push(`${r} h`), s > 0 && l.push(`${s} min`), o > 0 && a === 0 && r === 0 && l.push(`${o} s`), l.length > 0 ? l.join(" ") : "0 s";
}
function Nt(t) {
  const e = it[t];
  if (e)
    return e;
  const i = t.replace(/[_-]+/g, " ").replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2").trim();
  return i ? i.charAt(0).toUpperCase() + i.slice(1).toLowerCase() : t;
}
function Pt(t) {
  const e = t.attributes.unit_of_measurement, i = t.attributes.translation_key, a = t.entity_id ?? "";
  return e === "s" || i === "planned_today_duration" || i === "last_activity_duration" || a.endsWith("_planned_today_duration") || a.endsWith("_last_activity_duration");
}
function Dt(t) {
  const e = t.attributes.translation_key, i = t.entity_id ?? "";
  return e === "planned_today_sport" || e === "last_activity_type" || i.endsWith("_planned_today_sport") || i.endsWith("_last_activity_type") || !!it[t.state];
}
function rt(t) {
  return [...new Set(
    at(t).filter(
      (i) => i.platform === tt && typeof i.device_id == "string"
    ).map((i) => i.device_id)
  )].map((i) => t.devices?.[i]).filter((i) => !!i).sort((i, a) => W(i).localeCompare(W(a)));
}
function W(t) {
  return t?.name_by_user ?? t?.name ?? "Athlète Intervals.icu";
}
function _e(t, e, i, a) {
  if (e && t.states[e] && Ie(t, e, a))
    return e;
  const r = at(t).find(
    (o) => o.platform === tt && typeof o.entity_id == "string" && (!a || o.device_id === a) && Mt(o, i)
  );
  if (r?.entity_id && t.states[r.entity_id])
    return r.entity_id;
  const s = `_${i}`;
  return Object.keys(t.states).find(
    (o) => o.startsWith("sensor.") && o.endsWith(s) && Ie(t, o, a)
  );
}
function y(t, e, i, a) {
  const r = _e(t, e, i, a);
  return r ? t.states[r] : void 0;
}
function qe(t) {
  if (!t || ["unknown", "unavailable", "none", ""].includes(t.state))
    return null;
  const e = Number(t.state);
  return Number.isFinite(e) ? e : null;
}
function b(t, e, i = "—") {
  if (!e || ["unknown", "unavailable", "none", ""].includes(e.state))
    return i;
  if (Pt(e)) {
    const a = Number(e.state);
    if (Number.isFinite(a))
      return F(a, e.attributes.unit_of_measurement);
  }
  if (Dt(e))
    return Nt(e.state);
  try {
    return t.formatEntityState?.(e) ?? `${e.state}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return e.state;
  }
}
function ye(t) {
  const e = t?.attributes.history;
  return Array.isArray(e) ? e.map((i) => typeof i == "object" && i !== null && "value" in i ? Number(i.value) : Number(i)).filter(Number.isFinite) : [];
}
function zt(t, e, i, a, r) {
  return t.map((s, o) => {
    const l = t.length === 1 ? e / 2 : o / (t.length - 1) * e, d = i - (s - a) / r * (i - 22) - 11;
    return `${l.toFixed(1)},${d.toFixed(1)}`;
  }).join(" ");
}
function Ot(t) {
  const e = t.filter((h) => h.values.length >= 2);
  if (e.length === 0) return c`<div class="empty">Historique indisponible</div>`;
  const i = 760, a = 220, r = e.flatMap((h) => h.values), s = Math.min(...r), o = Math.max(...r), l = Math.max((o - s) * 0.12, 2), d = s - l, v = o + l - d || 1, p = [0, 1, 2, 3, 4];
  return c`
    <div class="chart-legend">
      ${e.map((h) => c`<span><i class=${h.className}></i>${h.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${i} ${a}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${p.map((h) => {
    const _ = 10 + h / 4 * (a - 20);
    return be`<line class="grid-line" x1="0" y1=${_} x2=${i} y2=${_}></line>`;
  })}
      ${e.map((h) => be`<polyline class="series ${h.className}" points=${zt(h.values, i, a, d, v)}></polyline>`)}
    </svg>`;
}
function Lt(t, e, i, a) {
  const s = ((t === null ? 0 : Math.min(a, Math.max(i, t))) - i) / (a - i || 1), o = Math.PI * 52, l = Math.max(0, Math.min(o, s * o));
  return c`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${be`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${e}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${l} ${o}"></path>`}
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
  chart_evolution: "Évolution",
  chart_fitness_fatigue_form: "Condition, fatigue et forme",
  no_evolution_data: "Aucune donnée d’évolution disponible.",
  chart_wellness: "Évolution du bien-être",
  chart_sleep: "Sommeil",
  chart_readiness: "Préparation",
  chart_hrv: "Variabilité cardiaque",
  chart_resting_hr: "Fréquence cardiaque au repos",
  latest_value: "Dernière valeur",
  hours_short: "h",
  bpm_short: "bpm",
  milliseconds_short: "ms",
  activity_timeline: "Chronologie des activités",
  activity_timeline_description: "Activités de la période sélectionnée",
  no_activity_timeline_data: "Aucune activité disponible pour cette période.",
  duration: "Durée",
  distance: "Distance",
  activity_load: "Charge",
  sport_distribution: "Répartition sportive",
  activities_count: "Activités",
  health: "Santé et composition corporelle",
  today: "Aujourd’hui",
  no_workout: "Aucun entraînement planifié",
  workout: "Entraînement",
  load: "Charge",
  records: "Records",
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
}, Ve = {
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
  chart_evolution: "Evolution",
  chart_fitness_fatigue_form: "Fitness, fatigue and form",
  no_evolution_data: "No evolution data available.",
  chart_wellness: "Wellness evolution",
  chart_sleep: "Sleep",
  chart_readiness: "Readiness",
  chart_hrv: "Heart rate variability",
  chart_resting_hr: "Resting heart rate",
  latest_value: "Latest value",
  hours_short: "h",
  bpm_short: "bpm",
  milliseconds_short: "ms",
  activity_timeline: "Activity timeline",
  activity_timeline_description: "Activities in the selected period",
  no_activity_timeline_data: "No activities available for this period.",
  duration: "Duration",
  distance: "Distance",
  activity_load: "Load",
  sport_distribution: "Sport distribution",
  activities_count: "Activities",
  health: "Health and body composition",
  today: "Today",
  no_workout: "No workout planned",
  workout: "Workout",
  load: "Load",
  records: "Records",
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
function le(t) {
  return (t?.locale?.language ?? t?.language ?? navigator.language ?? "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
function n(t, e, i = {}) {
  let a = (le(t) === "fr" ? jt : Ve)[e] ?? Ve[e] ?? e;
  for (const [r, s] of Object.entries(i))
    a = a.replaceAll(`{${r}}`, String(s));
  return a;
}
const Ft = {
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
function H(t, e) {
  const i = String(e ?? "").trim();
  if (!i || le(t) !== "fr")
    return i;
  const a = i.toLowerCase().replace(/[\s-]+/g, "_");
  return Ft[a] ?? i.replace(/_/g, " ").replace(/^./, (r) => r.toUpperCase());
}
function I(t, e) {
  const i = String(e ?? "").trim();
  if (!i || le(t) !== "fr")
    return i;
  let a = i.match(
    /^(\d+)-day load\s+(?:is\s+)?([\d.,]+)%\s+(lower|higher) than the previous period\.?$/i
  );
  if (a)
    return `Charge sur ${a[1]} jours ${a[2]} % ${a[3].toLowerCase() === "lower" ? "inférieure" : "supérieure"} à la période précédente`;
  if (/^Latest sleep is more than one hour below the value from seven days ago\.?$/i.test(
    i
  ))
    return "Le dernier sommeil est inférieur de plus d’une heure à celui d’il y a sept jours";
  if (a = i.match(
    /^(.+?) represents\s+([\d.,]+)% of training time over the last\s+(\d+) days\.?$/i
  ), a)
    return `${M(t, a[1])} représente ${a[2]} % du temps d’entraînement sur les ${a[3]} derniers jours`;
  const r = M(t, i);
  return r !== i ? r : H(t, i);
}
const Ht = {
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
function M(t, e, i) {
  const a = String(e ?? "").trim();
  if (!a)
    return i ?? n(t, "activity");
  if (le(t) !== "fr")
    return a.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const r = a.replace(/[\s_-]+/g, "").toLowerCase();
  return Ht[r] ?? a.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function Ut(t, e) {
  if (!e)
    return { label: n(t, "sync_unknown"), level: "danger" };
  const i = new Date(e).getTime();
  if (!Number.isFinite(i))
    return { label: n(t, "sync_unknown"), level: "danger" };
  const a = Math.max(0, Math.floor((Date.now() - i) / 6e4));
  if (a < 1)
    return { label: n(t, "sync_now"), level: "good" };
  if (a < 60)
    return {
      label: n(t, "sync_minutes", { value: a }),
      level: a < 5 ? "good" : a <= 30 ? "warning" : "danger"
    };
  const r = Math.floor(a / 60);
  return r < 24 ? {
    label: n(t, "sync_hours", { value: r }),
    level: "danger"
  } : {
    label: n(t, "sync_days", { value: Math.floor(r / 24) }),
    level: "danger"
  };
}
function Be(t, e = "Activity", i) {
  return M(i, t, e);
}
var It = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, Ee = (t, e, i, a) => {
  for (var r = a > 1 ? void 0 : a ? qt(e, i) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (a ? o(e, i, r) : o(r)) || r);
  return a && r && It(e, i, r), r;
};
const J = "https://github.com/pepka69/ha-intervals-icu", Vt = `${J}/blob/develop/README.fr.md`, Bt = `${J}/issues`, Wt = `${J}/issues/new/choose`, Gt = "https://buymeacoffee.com/pep_ka", Kt = `${J}/raw/develop/.github/assets/buy-me-a-beer-en.png`, st = [
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
], Zt = st.map(
  ([t]) => t
), Yt = [
  ["show_atlas", "Afficher Coach Atlas et Readiness"],
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_sync_status", "Afficher l’état de synchronisation"],
  ["show_refresh_button", "Afficher le bouton Actualiser"],
  ["compact", "Mode compact"]
], Jt = [
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
let G = class extends k {
  setConfig(t) {
    this.config = { ...t };
  }
  integrationVersion() {
    if (!this.hass)
      return "unknown";
    const t = _e(
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
    for (const i of Zt)
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
    const a = { ...this.config?.health ?? {} }, r = { ...a[t] ?? {} };
    e === "entity" && i === "" ? delete r.entity : Object.assign(r, { [e]: i }), a[t] = r;
    const s = {
      ...this.config,
      health: a
    };
    t === "weight" && (delete s.weight_entity, delete s.show_weight), this.emitConfig(s);
  }
  render() {
    if (!this.config || !this.hass)
      return c``;
    const t = rt(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter(
      (r) => r.startsWith("sensor.") && (!e || this.hass.entities?.[r]?.device_id === e)
    ).sort(), a = Object.keys(this.hass.states).filter((r) => r.startsWith("sensor.")).sort();
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
                  ${W(r)}
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

        ${st.map(
      ([r, s, o]) => c`
            <label>
              ${s}
              <select
                .value=${String(
        this.config[r] ?? _e(
          this.hass,
          void 0,
          o,
          e
        ) ?? ""
      )}
                @change=${(l) => this.change(
        r,
        l.target.value
      )}
              >
                <option value="">
                  Détection automatique pour cet athlète
                </option>
                ${i.map(
        (l) => c`
                    <option value=${l}>
                      ${this.hass.states[l].attributes.friendly_name ?? l}
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

          ${Jt.map(({ key: r, label: s }) => {
      const o = this.healthMetricConfig(r);
      return c`
              <div class="health-editor-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${o.show}
                    @change=${(l) => this.changeHealthMetric(
        r,
        "show",
        l.target.checked
      )}
                  />
                  Afficher ${s}
                </label>

                <label>
                  Capteur — ${s}
                  <select
                    .value=${o.entity}
                    @change=${(l) => this.changeHealthMetric(
        r,
        "entity",
        l.target.value
      )}
                  >
                    <option value="">
                      Détection automatique Intervals.icu
                    </option>
                    ${a.map(
        (l) => c`
                        <option value=${l}>
                          ${this.hass.states[l].attributes.friendly_name ?? l}
                        </option>
                      `
      )}
                  </select>
                </label>
              </div>
            `;
    })}
        </div>

        ${Yt.map(
      ([r, s]) => c`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config[r] !== !1}
                @change=${(o) => this.change(
        r,
        o.target.checked
      )}
              />
              ${s}
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
              <a href=${Vt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
                Documentation
              </a>
              <a href=${Bt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:bug-outline"></ha-icon>
                Signaler un bug
              </a>
              <a href=${Wt} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                Proposer une fonctionnalité
              </a>
              <a href=${J} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:github"></ha-icon>
                Dépôt GitHub
              </a>
            </div>

            <a
              class="beer-link"
              href=${Gt}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="beer-logo"
                src=${Kt}
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
G.styles = et;
Ee([
  Y({ attribute: !1 })
], G.prototype, "hass", 2);
Ee([
  S()
], G.prototype, "config", 2);
G = Ee([
  ne("ha-intervals-icu-card-editor")
], G);
var Qt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, Q = (t, e, i, a) => {
  for (var r = a > 1 ? void 0 : a ? Xt(e, i) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (a ? o(e, i, r) : o(r)) || r);
  return a && r && Qt(e, i, r), r;
};
const ei = [
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
let N = class extends k {
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
    return c`<div class="quick-stat"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${b(this.hass, i)}</strong></div></div>`;
  }
  state(t, e) {
    return this.hass ? y(
      this.hass,
      this.config?.[t],
      e,
      this.config?.device_id
    ) : void 0;
  }
  status(t, e) {
    const i = qe(e);
    return i === null ? "neutral" : t === "form" ? i < -20 ? "danger" : i < -10 ? "warning" : "good" : t === "fatigue" ? i >= 80 ? "danger" : i >= 60 ? "warning" : "good" : "good";
  }
  tooltipPosition(t) {
    const i = t.currentTarget.getBoundingClientRect(), r = this.renderRoot.querySelector("ha-card")?.getBoundingClientRect() ?? this.getBoundingClientRect(), s = 160, o = i.left - r.left + i.width / 2;
    return {
      x: Math.max(
        s,
        Math.min(o, r.width - s)
      ),
      y: i.bottom - r.top
    };
  }
  showMetricTooltip(t, e, i = !1) {
    if (i && this.tooltip?.pinned && this.tooltip.key === e) {
      this.tooltip = void 0;
      return;
    }
    const a = this.metricTooltip(e), r = this.tooltipPosition(t);
    this.tooltip = {
      key: e,
      title: a.title,
      text: a.text,
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
    return this.tooltip ? c`
      <div
        class="metric-tooltip bottom"
        role="tooltip"
        style=${`left: ${this.tooltip.x}px; top: ${this.tooltip.y}px;`}
      >
        <strong>${this.tooltip.title}</strong>
        <span>${this.tooltip.text}</span>
      </div>
    ` : u;
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
  metric(t, e, i, a) {
    const r = qe(a), s = this.status(i, a), o = i === "form" ? -30 : 0, l = i === "form" ? 30 : 100, d = a?.attributes.change_7_days;
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
        <div class="metric-value">${b(this.hass, a)}</div>
        <div class="metric-short">${e}</div>
        ${Lt(r, s, o, l)}
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
      <strong>${b(this.hass, i)}</strong>
    </div>`;
  }
  healthState(t) {
    if (!this.hass || !this.config) return;
    const e = this.config.health?.[t]?.entity ?? (t === "weight" ? this.config.weight_entity : void 0);
    return e && this.hass.states[e] ? this.hass.states[e] : y(
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
    if (!this.hass || !this.config) return u;
    const t = this.hass, e = this.state("fitness_entity", g.fitness), i = this.state("fatigue_entity", g.fatigue), a = this.state("form_entity", g.form), r = this.state("ftp_entity", g.ftp), s = this.state(
      "weekly_load_entity",
      g.weeklyLoad
    ), o = this.state(
      "weekly_activities_entity",
      g.weeklyActivities
    ), l = y(
      t,
      void 0,
      g.trainingStatus,
      this.config.device_id
    ), d = y(
      t,
      void 0,
      g.readinessScore,
      this.config.device_id
    ), m = y(
      t,
      void 0,
      g.readinessLevel,
      this.config.device_id
    ), v = y(
      t,
      void 0,
      g.readinessRecoveryHours,
      this.config.device_id
    ), p = y(
      t,
      void 0,
      g.atlasCoach,
      this.config.device_id
    ), h = this.config.device_id, _ = h ? t.devices?.[h] : void 0, x = this.config.athlete_name || W(_), f = y(
      t,
      void 0,
      g.plannedTodayName,
      h
    ), C = y(
      t,
      void 0,
      g.plannedTodaySport,
      h
    ), ce = y(
      t,
      void 0,
      g.plannedTodayDuration,
      h
    ), de = y(
      t,
      void 0,
      g.plannedTodayLoad,
      h
    ), he = y(
      t,
      void 0,
      g.lastActivityName,
      h
    ), pe = y(
      t,
      void 0,
      g.lastActivityType,
      h
    ), D = y(
      t,
      void 0,
      g.lastActivityDate,
      h
    ), ue = y(
      t,
      void 0,
      g.lastActivityDuration,
      h
    ), me = y(
      t,
      void 0,
      g.lastActivityLoad,
      h
    ), ge = y(
      t,
      void 0,
      g.lastActivityCalories,
      h
    ), X = b(t, he), ve = n(t, "activity"), ee = Be(b(t, pe, ve), ve, t), ot = ee !== ve && ee.trim().toLowerCase() !== X.trim().toLowerCase(), Te = ei.map(($) => ({
      ...$,
      state: this.healthState($.key),
      visible: this.healthVisible($.key, $.defaultShow)
    })).filter(($) => $.visible && $.state), Me = Ut(
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
              ${x ? c`<div class="athlete">${x}</div>` : u}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== !1 ? c`<div class="sync"><span class="dot ${Me.level}"></span>${Me.label}</div>` : u}
            ${this.config.show_refresh_button !== !1 ? c`<button class="refresh" title=${n(t, "refresh")} @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>` : u}
          </div>
        </header>

        ${this.config.show_atlas !== !1 ? c`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>${n(t, "atlas_readiness")}</span>
                </div>
                <div class="atlas-score">
                  <strong>${b(t, d)}</strong>
                  <span>${H(t, b(t, m, n(t, "unavailable")))}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>${n(t, "recovery")} ${b(t, v)}</span>
                  <span><ha-icon icon=${l?.attributes.icon || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${H(t, b(t, l, n(t, "unknown_status")))}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>${n(t, "atlas_coach")}</span>
                </div>
                <h3>${H(t, b(t, p, n(t, "no_recommendation")))}</h3>
                ${p?.attributes.recommendation ? c`<p>${I(t, p.attributes.recommendation)}</p>` : u}
                <div class="atlas-chips">
                  ${p?.attributes.intensity ? c`<span>${H(t, p.attributes.intensity)}</span>` : u}
                  ${p?.attributes.duration_minutes ? c`<span>${String(p.attributes.duration_minutes)} min</span>` : u}
                  ${p?.attributes.heart_rate_zone ? c`<span>${String(p.attributes.heart_rate_zone)}</span>` : u}
                </div>
              </article>
            </section>` : u}

        <section class="metrics">
          ${this.metric(n(t, "fitness"), "CTL", "fitness", e)}
          ${this.metric(n(t, "fatigue"), "ATL", "fatigue", i)}
          ${this.metric(n(t, "form"), "TSB", "form", a)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", r)}
          ${this.quickStat("mdi:chart-areaspline", n(t, "load_7d"), s)}
          ${this.quickStat("mdi:calendar-check", n(t, "activities_7d"), o)}
        </section>

        ${this.config.show_history !== !1 ? c`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>${n(t, "evolution")}</span>
              </div>
              ${Ot([
      {
        label: n(t, "fitness"),
        values: ye(e),
        className: "fitness-line"
      },
      {
        label: n(t, "fatigue"),
        values: ye(i),
        className: "fatigue-line"
      },
      {
        label: n(t, "form"),
        values: ye(a),
        className: "form-line"
      }
    ])}
            </section>` : u}

        ${this.config.show_health !== !1 && Te.length > 0 ? c`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>${n(t, "health")}</span>
              </div>
              <div class="health-grid">
                ${Te.map(
      ($) => c`
                    <div class="health-item">
                      <ha-icon icon=${$.icon}></ha-icon>
                      <div>
                        <span>${n(t, $.label)}</span>
                        <strong>${b(t, $.state)}</strong>
                      </div>
                    </div>
                  `
    )}
              </div>
            </section>` : u}

        <section class="lower-grid">
          ${this.config.show_workout !== !1 ? c`<article class="feature workout spotlight">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>${n(t, "today")}</span>
                </div>
                <h3>
                  ${b(
      t,
      f,
      n(t, "no_workout")
    )}
                </h3>
                <div class="pill">
                  ${Be(b(t, C, n(t, "workout")), n(t, "workout"), t)}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${b(t, ce)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${n(t, "load")}
                    ${b(t, de)}</span
                  >
                </div>
              </article>` : u}

          ${this.config.show_records !== !1 ? c`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>${n(t, "records")}</span>
                </div>
                ${this.infoRow(
      "mdi:bike-fast",
      "FTP",
      y(
        t,
        void 0,
        g.recordFtp,
        h
      )
    )}
                ${this.infoRow(
      "mdi:map-marker-distance",
      n(t, "distance"),
      y(
        t,
        void 0,
        g.recordDistance,
        h
      )
    )}
                ${this.infoRow(
      "mdi:image-filter-hdr",
      n(t, "elevation"),
      y(
        t,
        void 0,
        g.recordElevation,
        h
      )
    )}
                ${this.infoRow(
      "mdi:flash",
      n(t, "max_power"),
      y(
        t,
        void 0,
        g.recordMaxPower,
        h
      )
    )}
              </article>` : u}

          ${this.config.show_last_activity !== !1 ? c`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(ee)}></ha-icon
                  ><span>${n(t, "last_activity")}</span>
                </div>
                <h3>${X}</h3>
                ${ot ? c`<div class="pill purple">${ee}</div>` : u}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${b(t, D)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${b(t, ue)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${b(t, ge)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>${n(t, "load")}
                    ${b(t, me)}</span
                  >
                </div>
              </article>` : u}
        </section>

        ${this.renderMetricTooltip()}
      </div>
    </ha-card>`;
  }
};
N.styles = [
  et,
  re`
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
Q([
  Y({ attribute: !1 })
], N.prototype, "hass", 2);
Q([
  S()
], N.prototype, "config", 2);
Q([
  S()
], N.prototype, "refreshing", 2);
Q([
  S()
], N.prototype, "tooltip", 2);
N = Q([
  ne("ha-intervals-icu-card")
], N);
function ti(t) {
  return t.map((e) => ({
    date: String(e.date ?? ""),
    value: Number(e.value),
    timestamp: new Date(e.date).getTime()
  })).filter(
    (e) => e.date !== "" && Number.isFinite(e.value) && Number.isFinite(e.timestamp)
  ).sort((e, i) => e.timestamp - i.timestamp);
}
function ii(t) {
  return t.map((e) => ({
    key: e.key,
    label: e.label,
    className: e.className,
    points: ti(e.points)
  })).filter((e) => e.points.length > 0);
}
function ai(t, e, i, a, r, s, o, l) {
  const d = s - l * 2, m = o - l * 2, v = Math.max(1, i - e), p = Math.max(1, r - a);
  return t.map((h, _) => {
    const x = l + (h.timestamp - e) / v * d, f = l + (1 - (h.value - a) / p) * m;
    return `${_ === 0 ? "M" : "L"} ${x.toFixed(2)} ${f.toFixed(2)}`;
  }).join(" ");
}
function We(t, e) {
  const i = t.flatMap((s) => s.points).map((s) => new Date(s.date).getTime()).filter(Number.isFinite);
  if (!i.length)
    return t;
  const r = Math.max(...i) - (e - 1) * 864e5;
  return t.map((s) => ({
    ...s,
    points: s.points.filter((o) => {
      const l = new Date(o.date).getTime();
      return Number.isFinite(l) && l >= r;
    })
  }));
}
function Ge(t, e = {}) {
  const i = e.width ?? 900, a = e.height ?? 280, r = 28, s = ii(t);
  if (!s.length)
    return c`
      <div class="chart-empty">
        ${e.emptyLabel ?? "No chart data"}
      </div>
    `;
  const o = s.flatMap((f) => f.points), l = Math.min(
    ...o.map((f) => f.timestamp)
  ), d = Math.max(
    ...o.map((f) => f.timestamp)
  ), m = Math.min(
    ...o.map((f) => f.value)
  ), v = Math.max(
    ...o.map((f) => f.value)
  ), p = Math.max(
    2,
    Math.abs(v - m) * 0.08
  ), h = m - p, _ = v + p, x = [0, 0.25, 0.5, 0.75, 1];
  return c`
    <div class="native-chart">
      <div class="chart-legend">
        ${s.map(
    (f) => c`
            <span>
              <i class=${f.className}></i>
              ${f.label}
            </span>
          `
  )}
      </div>

      <svg
        class="statistics-history-chart"
        viewBox="0 0 ${i} ${a}"
        preserveAspectRatio="none"
        role="img"
        aria-label=${e.ariaLabel ?? "Statistics evolution"}
      >
        ${x.map((f) => {
    const C = r + f * (a - r * 2);
    return c`
            <line
              class="chart-grid-line"
              x1=${r}
              y1=${C}
              x2=${i - r}
              y2=${C}
            ></line>
          `;
  })}

        ${s.map((f) => {
    const C = ai(
      f.points,
      l,
      d,
      h,
      _,
      i,
      a,
      r
    ), ce = i - r * 2, de = a - r * 2, he = Math.max(
      1,
      d - l
    ), pe = Math.max(
      1,
      _ - h
    );
    return C ? c`
                <path
                  class="chart-series ${f.className}"
                  d=${C}
                ></path>

                ${f.points.map((D) => {
      const ue = r + (D.timestamp - l) / he * ce, me = r + (1 - (D.value - h) / pe) * de, ge = e.valueDecimals ?? 1, X = e.valueSuffix ?? "";
      return c`
                    <circle
                      class="chart-point ${f.className}"
                      cx=${ue}
                      cy=${me}
                      r="4"
                    >
                      <title>
                        ${f.label} ·
                        ${new Date(D.timestamp).toLocaleDateString()}
                        · ${D.value.toFixed(ge)}${X}
                      </title>
                    </circle>
                  `;
    })}
              ` : u;
  })}
      </svg>

      <div class="chart-axis">
        <span>
          ${new Date(l).toLocaleDateString(void 0, {
    day: "2-digit",
    month: "2-digit"
  })}
        </span>

        <span>
          ${new Date(d).toLocaleDateString(void 0, {
    day: "2-digit",
    month: "2-digit"
  })}
        </span>
      </div>
    </div>
  `;
}
function ri(t) {
  if (!Number.isFinite(t) || Number(t) < 0)
    return "";
  const e = Math.round(Number(t)), i = Math.floor(e / 3600), a = Math.floor(e % 3600 / 60), r = e % 60, s = [];
  return i > 0 && s.push(`${i} h`), a > 0 && s.push(`${a} min`), (r > 0 || s.length === 0) && s.push(`${r} s`), s.join(" ");
}
function si(t, e) {
  if (!Number.isFinite(e) || Number(e) <= 0)
    return "";
  const i = Number(e) / 1e3;
  return `${new Intl.NumberFormat(t.locale?.language ?? navigator.language, {
    maximumFractionDigits: 1
  }).format(i)} km`;
}
function oi(t) {
  const e = t.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
  return e.includes("ride") || e.includes("cycling") || e.includes("bike") ? "mdi:bike" : e.includes("run") || e.includes("jog") ? "mdi:run" : e.includes("walk") || e.includes("hike") ? "mdi:walk" : e.includes("swim") ? "mdi:swim" : e.includes("crossfit") || e.includes("highintensity") || e === "hiit" ? "mdi:kettlebell" : e.includes("strength") || e.includes("weighttraining") ? "mdi:dumbbell" : e.includes("row") ? "mdi:rowing" : "mdi:arm-flex";
}
function ni(t) {
  return `sport-${t.toLowerCase().replaceAll(/[^a-z0-9]/g, "-").replaceAll(/-+/g, "-").replace(/^-|-$/g, "") || "other"}`;
}
function li(t, e, i) {
  return e.length ? c`
    <div class="activity-timeline">
      ${e.map((a) => {
    const r = ri(a.durationSeconds), s = si(
      t,
      a.distanceMeters
    );
    return c`
          <article class="activity-timeline-item">
            <div
              class="activity-timeline-marker ${ni(
      a.sport
    )}"
            >
              <ha-icon icon=${oi(a.sport)}></ha-icon>
            </div>

            <div class="activity-timeline-content">
              <header>
                <div>
                  <strong>
                    ${I(t, a.name)}
                  </strong>

                  <span>
                    ${M(t, a.sport)}
                  </span>
                </div>

                <time datetime=${a.date}>
                  ${new Date(a.date).toLocaleDateString(
      t.locale?.language ?? navigator.language,
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    )}
                </time>
              </header>

              <div class="activity-timeline-metrics">
                ${r ? c`
                      <span>
                        <ha-icon icon="mdi:timer-outline"></ha-icon>
                        ${i.durationLabel} : ${r}
                      </span>
                    ` : ""}

                ${s ? c`
                      <span>
                        <ha-icon icon="mdi:map-marker-distance"></ha-icon>
                        ${i.distanceLabel} : ${s}
                      </span>
                    ` : ""}

                ${Number.isFinite(a.load) ? c`
                      <span>
                        <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                        ${i.loadLabel} :
                        ${Math.round(Number(a.load))}
                      </span>
                    ` : ""}
              </div>
            </div>
          </article>
        `;
  })}
    </div>
  ` : c`
      <div class="activity-timeline-empty">
        ${i.emptyLabel}
      </div>
    `;
}
var ci = Object.defineProperty, di = Object.getOwnPropertyDescriptor, A = (t, e, i, a) => {
  for (var r = a > 1 ? void 0 : a ? di(e, i) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (a ? o(e, i, r) : o(r)) || r);
  return a && r && ci(e, i, r), r;
};
let K = class extends k {
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
    const t = rt(this.hass), e = this.config.device_id ?? (t.length === 1 ? t[0].id : ""), i = Object.keys(this.hass.states).filter((a) => {
      if (!a.startsWith("sensor.") || e && this.hass.entities?.[a]?.device_id !== e)
        return !1;
      const r = this.hass.entities?.[a], s = this.hass.states[a];
      return r?.translation_key === "statistics_dashboard" || r?.unique_id?.endsWith("_statistics_dashboard") || a.endsWith("_statistics_dashboard") || s?.attributes.translation_key === "statistics_dashboard";
    }).sort();
    return c`
      <div class="statistics-editor">
        <label>
          <span>${n(this.hass, "athlete_device")}</span>

          <select
            .value=${e}
            @change=${(a) => this.changeDevice(
      a.target.value
    )}
          >
            <option value="">${n(this.hass, "select_athlete")}</option>

            ${t.map(
      (a) => c`
                <option value=${a.id}>
                  ${W(a)}
                </option>
              `
    )}
          </select>
        </label>

        ${t.length === 0 ? c`
              <p>${n(this.hass, "no_intervals_device")}</p>
            ` : u}

        <label>
          <span>${n(this.hass, "title")}</span>

          <input
            type="text"
            .value=${this.config.title ?? ""}
            @input=${(a) => this.change(
      "title",
      a.target.value
    )}
          />
        </label>

        <label>
          <span>${n(this.hass, "default_period")}</span>

          <select
            .value=${this.config.default_period ?? "30_days"}
            @change=${(a) => this.change(
      "default_period",
      a.target.value
    )}
          >
            <option value="7_days">${n(this.hass, "period_7_days")}</option>
            <option value="30_days">${n(this.hass, "period_30_days")}</option>
            <option value="90_days">${n(this.hass, "period_90_days")}</option>
            <option value="365_days">${n(this.hass, "period_365_days")}</option>
          </select>
        </label>

        <label>
          <span>${n(this.hass, "statistics_entity")}</span>

          <select
            .value=${this.config.entity ?? ""}
            @change=${(a) => this.change(
      "entity",
      a.target.value
    )}
          >
            <option value="">
              ${n(this.hass, "automatic_athlete_detection")}
            </option>

            ${i.map(
      (a) => c`
                <option value=${a}>
                  ${this.hass.states[a].attributes.friendly_name ?? a}
                </option>
              `
    )}
          </select>
        </label>
      </div>
    `;
  }
};
K.styles = re`
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
A([
  Y({ attribute: !1 })
], K.prototype, "hass", 2);
A([
  S()
], K.prototype, "config", 2);
K = A([
  ne("ha-intervals-icu-statistics-card-editor")
], K);
let P = class extends k {
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
    return this.hass ? y(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id)?.attributes ?? {} : {};
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
  tile(t, e, i, a = "", r) {
    return c`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${this.number(i)}${a}</strong>${r !== void 0 ? this.change(r) : u}</div></article>`;
  }
  textTile(t, e, i, a) {
    return c`<article class="tile"><ha-icon icon=${t}></ha-icon><div><span>${e}</span><strong>${i}</strong>${a !== void 0 ? this.change(a) : u}</div></article>`;
  }
  label(t) {
    return n(this.hass, t);
  }
  name(t) {
    return I(this.hass, t.replaceAll("_", " "));
  }
  overview(t) {
    const e = t.periods?.[this.period] ?? {}, i = e.current ?? {}, a = e.comparison ?? {};
    return c`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", this.label("activities"), i.activities, "", a.activities_change_percent)}
        ${this.textTile("mdi:clock-outline", this.label("duration"), F(i.duration_hours, "h"), a.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", this.label("distance"), i.distance_km, " km", a.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", this.label("load"), i.load, "", a.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", this.label("elevation"), i.elevation_m, " m", a.elevation_m_change_percent)}
        ${this.tile("mdi:fire", this.label("calories"), i.calories, " kcal", a.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", i.hrss, "", a.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", i.trimp, "", a.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(t.training_insights_by_period?.[this.period] ?? t.insights ?? t.training_insights ?? []).map((r) => c`<div class="insight ${r.type ?? "info"}"><ha-icon icon=${r.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${I(this.hass, r.title)}</strong><span>${I(this.hass, r.message)}</span></div></div>`)}
      </div>`;
  }
  periodDays() {
    return this.period === "7_days" ? 7 : this.period === "30_days" ? 30 : this.period === "90_days" ? 90 : 365;
  }
  chartPoints(t, e = (i) => i) {
    return Array.isArray(t) ? t.map((i) => {
      const a = i, r = Number(a.value);
      return {
        date: String(a.date ?? ""),
        value: e(r)
      };
    }).filter(
      (i) => i.date !== "" && Number.isFinite(i.value)
    ) : [];
  }
  latestChartValue(t) {
    if (t.length)
      return [...t].sort(
        (e, i) => new Date(e.date).getTime() - new Date(i.date).getTime()
      ).at(-1)?.value;
  }
  wellnessChart(t, e, i, a, r, s = 0) {
    const o = We(
      [
        {
          key: i,
          label: t,
          className: i,
          points: a
        }
      ],
      this.periodDays()
    ), l = o[0]?.points ?? [], d = this.latestChartValue(l);
    return c`
      <article class="wellness-chart-card">
        <header class="wellness-chart-head">
          <div>
            <ha-icon icon=${e}></ha-icon>

            <div>
              <strong>${t}</strong>
              <span>${n(this.hass, `period_${this.period}`)}</span>
            </div>
          </div>

          ${d !== void 0 ? c`
                <div class="chart-latest-value">
                  <span>${n(this.hass, "latest_value")}</span>
                  <strong>
                    ${d.toFixed(s)}${r}
                  </strong>
                </div>
              ` : u}
        </header>

        ${Ge(o, {
      height: 220,
      emptyLabel: n(this.hass, "no_evolution_data"),
      ariaLabel: t,
      valueSuffix: r,
      valueDecimals: s
    })}
      </article>
    `;
  }
  evolution(t) {
    const e = t.evolution ?? {}, i = [
      {
        key: "fitness",
        label: n(this.hass, "fitness"),
        className: "fitness-series",
        points: this.chartPoints(e.fitness)
      },
      {
        key: "fatigue",
        label: n(this.hass, "fatigue"),
        className: "fatigue-series",
        points: this.chartPoints(e.fatigue)
      },
      {
        key: "form",
        label: n(this.hass, "form"),
        className: "form-series",
        points: this.chartPoints(e.form)
      }
    ], a = We(
      i,
      this.periodDays()
    );
    return c`
      <article class="chart-card">
        <div class="chart-card-title">
          <div>
            <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>

            <div>
              <strong>
                ${n(this.hass, "chart_fitness_fatigue_form")}
              </strong>

              <span>
                ${n(this.hass, `period_${this.period}`)}
              </span>
            </div>
          </div>
        </div>

        ${Ge(a, {
      emptyLabel: n(this.hass, "no_evolution_data"),
      ariaLabel: n(this.hass, "chart_fitness_fatigue_form"),
      valueDecimals: 1
    })}
      </article>

      <section class="wellness-evolution-section">
        <div class="section-title">
          <ha-icon icon="mdi:heart-pulse"></ha-icon>

          <div>
            <strong>${n(this.hass, "chart_wellness")}</strong>
            <span>${n(this.hass, `period_${this.period}`)}</span>
          </div>
        </div>

        <div class="wellness-chart-grid">
          ${this.wellnessChart(
      n(this.hass, "chart_sleep"),
      "mdi:sleep",
      "sleep-series",
      this.chartPoints(
        e.sleep,
        (r) => r / 3600
      ),
      ` ${n(this.hass, "hours_short")}`,
      1
    )}

          ${this.wellnessChart(
      n(this.hass, "chart_readiness"),
      "mdi:battery-heart-variant",
      "readiness-series",
      this.chartPoints(e.readiness),
      "",
      0
    )}

          ${this.wellnessChart(
      n(this.hass, "chart_hrv"),
      "mdi:heart-pulse",
      "hrv-series",
      this.chartPoints(e.hrv),
      ` ${n(this.hass, "milliseconds_short")}`,
      0
    )}

          ${this.wellnessChart(
      n(this.hass, "chart_resting_hr"),
      "mdi:heart-outline",
      "resting-hr-series",
      this.chartPoints(e.resting_hr),
      ` ${n(this.hass, "bpm_short")}`,
      0
    )}
        </div>
      </section>
    `;
  }
  timelineActivities(t) {
    return Array.isArray(t) ? t.map((e, i) => {
      const a = e, r = String(
        a.date ?? a.start_date_local ?? a.start_date ?? a.startDate ?? ""
      ), s = String(
        a.sport ?? a.type ?? a.activity_type ?? a.activityType ?? "Other"
      );
      return {
        id: String(
          a.id ?? a.activity_id ?? `${r}-${s}-${i}`
        ),
        date: r,
        name: String(
          a.name ?? a.title ?? s
        ),
        sport: s,
        durationSeconds: Number(
          a.duration ?? a.moving_time ?? a.elapsed_time ?? a.duration_seconds
        ),
        distanceMeters: Number(
          a.distance ?? a.distance_meters
        ),
        load: Number(
          a.load ?? a.training_load ?? a.icu_training_load
        )
      };
    }).filter(
      (e) => e.date !== "" && Number.isFinite(new Date(e.date).getTime())
    ).sort(
      (e, i) => new Date(i.date).getTime() - new Date(e.date).getTime()
    ) : [];
  }
  filteredTimelineActivities(t) {
    if (!t.length)
      return [];
    const i = Math.max(
      ...t.map(
        (a) => new Date(a.date).getTime()
      )
    ) - (this.periodDays() - 1) * 864e5;
    return t.filter(
      (a) => new Date(a.date).getTime() >= i
    );
  }
  activityTimeline(t) {
    const e = this.filteredTimelineActivities(
      this.timelineActivities(t.activity_timeline)
    ), i = /* @__PURE__ */ new Map();
    for (const s of e)
      i.set(
        s.sport,
        (i.get(s.sport) ?? 0) + 1
      );
    const a = [...i.entries()].sort((s, o) => o[1] - s[1]), r = Math.max(
      1,
      ...a.map((s) => s[1])
    );
    return c`
      <section class="activity-dashboard">
        <article class="activity-timeline-card">
          <header class="activity-panel-header">
            <div>
              <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>

              <div>
                <strong>
                  ${n(this.hass, "activity_timeline")}
                </strong>

                <span>
                  ${n(
      this.hass,
      "activity_timeline_description"
    )}
                </span>
              </div>
            </div>

            <span class="activity-total">
              ${e.length}
              ${n(this.hass, "activities_count")}
            </span>
          </header>

          ${li(
      this.hass,
      e,
      {
        emptyLabel: n(
          this.hass,
          "no_activity_timeline_data"
        ),
        durationLabel: n(this.hass, "duration"),
        distanceLabel: n(this.hass, "distance"),
        loadLabel: n(this.hass, "activity_load")
      }
    )}
        </article>

        <article class="sport-distribution-card">
          <header class="activity-panel-header">
            <div>
              <ha-icon icon="mdi:chart-donut"></ha-icon>

              <div>
                <strong>
                  ${n(this.hass, "sport_distribution")}
                </strong>

                <span>
                  ${n(this.hass, `period_${this.period}`)}
                </span>
              </div>
            </div>
          </header>

          ${a.length ? c`
                <div class="sport-distribution-list">
                  ${a.map(
      ([s, o]) => c`
                      <div class="sport-distribution-row">
                        <div class="sport-distribution-label">
                          <span>
                            ${M(
        this.hass,
        s
      )}
                          </span>

                          <strong>${o}</strong>
                        </div>

                        <div class="sport-distribution-track">
                          <div
                            class="sport-distribution-value"
                            style=${`width:${(o / r * 100).toFixed(1)}%`}
                          ></div>
                        </div>
                      </div>
                    `
    )}
                </div>
              ` : c`
                <div class="activity-timeline-empty">
                  ${n(
      this.hass,
      "no_activity_timeline_data"
    )}
                </div>
              `}
        </article>
      </section>
    `;
  }
  sports(t) {
    const e = t.sports?.[this.period] ?? {};
    return c`<div class="table">${Object.entries(e).map(([i, a]) => c`
      <div class="row"><strong>${M(this.hass, i)}</strong><span>${this.number(a.activities, 0)} ${n(this.hass, "activity_short")}</span><span>${F(a.duration_hours, "h")}</span><span>${this.number(a.distance_km)} km</span><span>${n(this.hass, "load")} ${this.number(a.load)}</span></div>`)}
      ${Object.keys(e).length ? u : c`<div class="empty">${n(this.hass, "no_sport_data")}</div>`}
    </div>`;
  }
  wellness(t) {
    const e = t.wellness ?? {}, a = [
      {
        key: "wellness_sleep",
        label: n(this.hass, "sleep"),
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
        label: n(this.hass, "resting_hr"),
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
      (o) => e[o.key] !== void 0 && e[o.key] !== null
    );
    if (!a.length)
      return c`
        <div class="empty">
          ${this.hass?.locale?.language?.startsWith("fr") ? "Aucune donnée de bien-être disponible." : "No wellness data available."}
        </div>
      `;
    const r = this.period === "7_days" ? 7 : this.period === "30_days" ? 30 : null, s = (o, l) => {
      if (l === "duration") {
        const d = Number(o);
        return Number.isFinite(d) ? F(d, "s") : "—";
      }
      return this.number(o);
    };
    return c`
      <div class="wellness-grid">
        ${a.map((o) => {
      const l = r ? `${o.key}_average_${r}_days` : void 0, d = this.period === "30_days" ? `${o.key}_minimum_30_days` : void 0, m = this.period === "30_days" ? `${o.key}_maximum_30_days` : void 0, v = l ? e[l] : void 0, p = d ? e[d] : void 0, h = m ? e[m] : void 0;
      return c`
            <article class="wellness-card">
              <div class="wellness-title">
                <ha-icon icon=${o.icon}></ha-icon>
                <span>${o.label}</span>
              </div>

              <strong>
                ${s(e[o.key], o.format)}
              </strong>

              ${v != null ? c`
                    <small>
                      ${this.hass?.locale?.language?.startsWith("fr") ? "Moyenne" : "Average"}
                      ${r} j :
                      ${s(v, o.format)}
                    </small>
                  ` : u}

              ${p != null && h !== void 0 && h !== null ? c`
                    <small>
                      Min :
                      ${s(p, o.format)}
                      · Max :
                      ${s(h, o.format)}
                    </small>
                  ` : u}
            </article>
          `;
    })}
      </div>
    `;
  }
  records(t) {
    const e = t.period_records ?? {}, i = t.records_by_sport ?? {};
    return c`
      <div class="record-grid">
        ${Object.entries(e).map(([a, r]) => r ? c`<article class="record"><span>${this.name(a)}</span><strong>${r.period}</strong><small>${this.number(r.load)} ${n(this.hass, "load").toLowerCase()} · ${F(r.duration_hours, "h")}</small></article>` : u)}
      </div>
      ${Object.entries(i).map(([a, r]) => c`<details><summary>${M(this.hass, a)}</summary><div class="record-list">${Object.entries(r).map(([s, o]) => c`<div><span>${this.name(s)}</span><strong>${this.number(o.value)}</strong><small>${o.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }
  trends(t) {
    const e = t.trends ?? {};
    return c`<div class="trend-grid">${Object.entries(e).map(([i, a]) => c`
      <article class="trend"><span>${this.name(i)}</span><strong>${this.number(a.latest)}</strong><div class="trend-changes"><small>7d ${this.number(a.change_7_days)}</small><small>30d ${this.number(a.change_30_days)}</small><small>90d ${this.number(a.change_90_days)}</small><small>365d ${this.number(a.change_365_days)}</small></div></article>`)}
    </div>`;
  }
  quality(t) {
    const e = t.data_quality ?? {}, i = e.coverage ?? {};
    return c`<div class="quality-head"><strong>${this.number(e.completeness_percent)}%</strong><span>${n(this.hass, "completeness")} · ${this.number(e.field_count, 0)} ${n(this.hass, "api_fields")}</span></div>
      <div class="coverage">${Object.entries(i).map(([a, r]) => c`<div><span>${this.name(a)}</span><progress max="100" value=${r.percent ?? 0}></progress><strong>${this.number(r.percent)}%</strong></div>`)}</div>`;
  }
  render() {
    if (!this.hass || !this.config) return u;
    const t = this.attrs(), e = this.section === "evolution" ? this.evolution(t) : this.section === "activities" ? this.activityTimeline(t) : this.section === "sports" ? this.sports(t) : this.section === "records" ? this.records(t) : this.section === "trends" ? this.trends(t) : this.section === "wellness" ? this.wellness(t) : this.section === "quality" ? this.quality(t) : this.overview(t);
    return c`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>${n(this.hass, "statistics_trends")}</span></div></div><nav>${["7_days", "30_days", "90_days", "365_days"].map((i) => c`<button class=${this.period === i ? "active" : ""} @click=${() => this.period = i}>${i.replace("_days", n(this.hass, "day_short"))}</button>`)}</nav></header>
      <div class="tabs">${["overview", "evolution", "activities", "sports", "records", "trends", "wellness", "quality"].map((i) => c`<button class=${this.section === i ? "active" : ""} @click=${() => this.section = i}>${i === "wellness" ? this.hass?.locale?.language?.startsWith("fr") ? "Bien-être" : "Wellness" : n(this.hass, i)}</button>`)}</div>
      <section>${e}</section></div></ha-card>`;
  }
};
P.styles = re`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.wellness-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.wellness-card{display:grid;gap:7px;padding:15px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.wellness-title{display:flex;gap:8px;align-items:center;color:var(--secondary-text-color);font-size:.78rem}.wellness-title ha-icon{color:var(--primary-color)}.wellness-card>strong{font-size:1.25rem}.wellness-card>small{color:var(--secondary-text-color)}.chart-card{display:grid;gap:14px;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.chart-card-title>div{display:flex;gap:10px;align-items:center}.chart-card-title ha-icon{color:var(--primary-color)}.chart-card-title div div{display:grid;gap:2px}.chart-card-title span{font-size:.76rem;color:var(--secondary-text-color)}.native-chart{display:grid;gap:7px}.chart-legend{display:flex;justify-content:flex-end;gap:14px;flex-wrap:wrap;font-size:.74rem;color:var(--secondary-text-color)}.chart-legend span{display:flex;align-items:center;gap:5px}.chart-legend i{display:block;width:10px;height:10px;border-radius:50%}.statistics-history-chart{display:block;width:100%;height:280px;overflow:visible}.chart-grid-line{stroke:color-mix(in srgb,var(--divider-color) 75%,transparent);stroke-width:1}.chart-series{fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}.chart-point{stroke:var(--card-background-color);stroke-width:2;vector-effect:non-scaling-stroke;cursor:pointer}.fitness-series{stroke:var(--success-color,#4caf50);fill:var(--success-color,#4caf50);background:var(--success-color,#4caf50)}.fatigue-series{stroke:var(--warning-color,#ff9800);fill:var(--warning-color,#ff9800);background:var(--warning-color,#ff9800)}.form-series{stroke:var(--info-color,#2196f3);fill:var(--info-color,#2196f3);background:var(--info-color,#2196f3)}.sleep-series{stroke:#7e57c2;fill:#7e57c2;background:#7e57c2}.readiness-series{stroke:#26a69a;fill:#26a69a;background:#26a69a}.hrv-series{stroke:#42a5f5;fill:#42a5f5;background:#42a5f5}.resting-hr-series{stroke:#ef5350;fill:#ef5350;background:#ef5350}.wellness-evolution-section{display:grid;gap:14px}.section-title{display:flex;align-items:center;gap:10px}.section-title ha-icon{color:var(--primary-color)}.section-title>div{display:grid;gap:2px}.section-title span{font-size:.76rem;color:var(--secondary-text-color)}.wellness-chart-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.wellness-chart-card{display:grid;gap:12px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);min-width:0}.wellness-chart-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.wellness-chart-head>div:first-child{display:flex;align-items:center;gap:9px}.wellness-chart-head ha-icon{color:var(--primary-color)}.wellness-chart-head>div:first-child>div{display:grid;gap:2px}.wellness-chart-head span{font-size:.72rem;color:var(--secondary-text-color)}.chart-latest-value{display:grid;text-align:right;gap:2px}.chart-latest-value strong{font-size:1.15rem}.wellness-chart-card .statistics-history-chart{height:220px}.chart-axis{display:flex;justify-content:space-between;color:var(--secondary-text-color);font-size:.7rem}.chart-empty{text-align:center;padding:55px 20px;color:var(--secondary-text-color)}.activity-dashboard{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,.8fr);gap:16px;align-items:start}.activity-timeline-card,.sport-distribution-card{display:grid;gap:16px;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);min-width:0}.activity-panel-header{display:flex;align-items:center;justify-content:space-between;gap:12px}.activity-panel-header>div{display:flex;align-items:center;gap:10px}.activity-panel-header ha-icon{color:var(--primary-color)}.activity-panel-header>div>div{display:grid;gap:2px}.activity-panel-header span{font-size:.74rem;color:var(--secondary-text-color)}.activity-total{white-space:nowrap;padding:6px 10px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-text-color)!important}.activity-timeline{display:grid}.activity-timeline-item{position:relative;display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;padding:0 0 18px}.activity-timeline-item:not(:last-child)::before{content:"";position:absolute;left:20px;top:40px;bottom:0;width:2px;background:var(--divider-color)}.activity-timeline-marker{z-index:1;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:color-mix(in srgb,var(--primary-color) 15%,var(--card-background-color));color:var(--primary-color)}.activity-timeline-marker ha-icon{--mdc-icon-size:21px}.activity-timeline-content{display:grid;gap:9px;padding:10px 12px;border-radius:14px;background:color-mix(in srgb,var(--card-background-color) 68%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent)}.activity-timeline-content header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.activity-timeline-content header>div{display:grid;gap:3px}.activity-timeline-content header span,.activity-timeline-content time{font-size:.72rem;color:var(--secondary-text-color)}.activity-timeline-content time{white-space:nowrap}.activity-timeline-metrics{display:flex;flex-wrap:wrap;gap:7px 13px}.activity-timeline-metrics span{display:flex;align-items:center;gap:4px;font-size:.72rem;color:var(--secondary-text-color)}.activity-timeline-metrics ha-icon{--mdc-icon-size:15px}.activity-timeline-empty{padding:40px 16px;text-align:center;color:var(--secondary-text-color)}.sport-distribution-list{display:grid;gap:14px}.sport-distribution-row{display:grid;gap:6px}.sport-distribution-label{display:flex;justify-content:space-between;gap:10px;font-size:.78rem}.sport-distribution-track{height:8px;overflow:hidden;border-radius:999px;background:color-mix(in srgb,var(--divider-color) 70%,transparent)}.sport-distribution-value{height:100%;min-width:4px;border-radius:inherit;background:var(--primary-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid,.wellness-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:900px){.activity-dashboard{grid-template-columns:1fr}}@media(max-width:760px){.wellness-chart-grid{grid-template-columns:1fr}}@media(max-width:520px){.shell{padding:14px}.statistics-history-chart{height:220px}.wellness-chart-card .statistics-history-chart{height:190px}.wellness-chart-head{align-items:flex-start}.chart-legend{justify-content:flex-start}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid,.wellness-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
A([
  Y({ attribute: !1 })
], P.prototype, "hass", 2);
A([
  S()
], P.prototype, "config", 2);
A([
  S()
], P.prototype, "period", 2);
A([
  S()
], P.prototype, "section", 2);
P = A([
  ne("ha-intervals-icu-statistics-card")
], P);
const xe = (navigator.language ?? "en").toLowerCase().startsWith("fr");
window.customCards = window.customCards ?? [];
window.customCards.some((t) => t.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: xe ? "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu." : "Intervals.icu fitness, fatigue, form, records and workouts dashboard.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
window.customCards.some(
  (t) => t.type === "ha-intervals-icu-statistics-card"
) || window.customCards.push({
  type: "ha-intervals-icu-statistics-card",
  name: xe ? "Carte Statistiques Intervals.icu" : "Intervals.icu Statistics Card",
  description: xe ? "Statistiques avancées sur 7, 30, 90 ou 365 jours, records, tendances et analyses." : "Advanced 7, 30, 90 or 365-day statistics, records, trends and insights.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
});
console.info(
  "%c HA Intervals.icu Card %c 2.0.0-beta15 ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:white"
);
