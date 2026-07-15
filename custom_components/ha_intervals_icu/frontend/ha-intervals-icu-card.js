const D = globalThis, F = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = /* @__PURE__ */ Symbol(), Y = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (F && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Y.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Y.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (i) => new ct(typeof i == "string" ? i : i + "", void 0, B), _t = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new ct(e, i, B);
}, yt = (i, t) => {
  if (F) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = D.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, Q = F ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return vt(e);
})(i) : i;
const { is: bt, defineProperty: At, getOwnPropertyDescriptor: wt, getOwnPropertyNames: xt, getOwnPropertySymbols: Et, getPrototypeOf: St } = Object, z = globalThis, X = z.trustedTypes, Ct = X ? X.emptyScript : "", Pt = z.reactiveElementPolyfillSupport, P = (i, t) => i, j = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ct : null;
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
} }, q = (i, t) => !bt(i, t), tt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && At(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = wt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...xt(e), ...Et(e)];
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
      for (const r of s) e.unshift(Q(r));
    } else t !== void 0 && e.push(Q(t));
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
    return yt(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : j;
      this._$Em = r;
      const c = n.fromAttribute(e, o.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? q)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
        const { wrapped: n } = o, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[P("elementProperties")] = /* @__PURE__ */ new Map(), w[P("finalized")] = /* @__PURE__ */ new Map(), Pt?.({ ReactiveElement: w }), (z.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, et = (i) => i, R = W.trustedTypes, st = R ? R.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, lt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + v, kt = `<${ht}>`, A = document, k = () => A.createComment(""), O = (i) => i === null || typeof i != "object" && typeof i != "function", V = Array.isArray, Ot = (i) => V(i) || typeof i?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, rt = />/g, _ = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, nt = /"/g, dt = /^(?:script|style|textarea|title)$/i, pt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), f = pt(1), Ut = pt(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), b = A.createTreeWalker(A, 129);
function ut(i, t) {
  if (!V(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(t) : t;
}
const Tt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let h, d, l = -1, $ = 0;
    for (; $ < a.length && (n.lastIndex = $, d = n.exec(a), d !== null); ) $ = n.lastIndex, n === C ? d[1] === "!--" ? n = it : d[1] !== void 0 ? n = rt : d[2] !== void 0 ? (dt.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = _) : d[3] !== void 0 && (n = _) : n === _ ? d[0] === ">" ? (n = r ?? C, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? _ : d[3] === '"' ? nt : ot) : n === nt || n === ot ? n = _ : n === it || n === rt ? n = C : (n = _, r = void 0);
    const g = n === _ && i[c + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + kt : l >= 0 ? (s.push(h), a.slice(0, l) + lt + a.slice(l) + v + g) : a + v + (l === -2 ? c : g);
  }
  return [ut(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, d] = Tt(t, e);
    if (this.el = U.createElement(h, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(lt)) {
          const $ = d[n++], g = r.getAttribute(l).split(v), H = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: o, name: H[2], strings: g, ctor: H[1] === "." ? Nt : H[1] === "?" ? Ht : H[1] === "@" ? Dt : I }), r.removeAttribute(l);
        } else l.startsWith(v) && (a.push({ type: 6, index: o }), r.removeAttribute(l));
        if (dt.test(r.tagName)) {
          const l = r.textContent.split(v), $ = l.length - 1;
          if ($ > 0) {
            r.textContent = R ? R.emptyScript : "";
            for (let g = 0; g < $; g++) r.append(l[g], k()), b.nextNode(), a.push({ type: 2, index: ++o });
            r.append(l[$], k());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ht) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(v, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(i, t, e = i, s) {
  if (t === E) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = S(i, r._$AS(i, t.values), r, s)), t;
}
class Mt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? A).importNode(e, !0);
    b.currentNode = r;
    let o = b.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new N(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new jt(o, this, t)), this._$AV.push(h), a = s[++c];
      }
      n !== a?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = S(this, t, e), O(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new Mt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    V(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new N(this.O(k()), this.O(k()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = et(t).nextSibling;
      et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = S(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = S(this, c[s + a], e, a), h === E && (h = this._$AH[a]), n ||= !O(h) || h !== this._$AH[a], h === u ? t = u : t !== u && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Nt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ht extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Dt extends I {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? u) === E) return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Rt = W.litHtmlPolyfillSupport;
Rt?.(U, N), (W.litHtmlVersions ??= []).push("3.3.3");
const zt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new N(t.insertBefore(k(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const K = globalThis;
class x extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zt(e, this.renderRoot, this.renderOptions);
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
x._$litElement$ = !0, x.finalized = !0, K.litElementHydrateSupport?.({ LitElement: x });
const It = K.litElementPolyfillSupport;
It?.({ LitElement: x });
(K.litElementVersions ??= []).push("4.2.2");
const ft = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Lt = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: q }, Ft = (i = Lt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Z(i) {
  return (t, e) => typeof e == "object" ? Ft(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function $t(i) {
  return Z({ ...i, state: !0, attribute: !1 });
}
const gt = _t`
  :host{display:block} ha-card{overflow:hidden}.card{padding:18px;color:var(--primary-text-color)}
  .header{display:flex;align-items:center;gap:12px;margin-bottom:16px}.logo{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--secondary-background-color)}
  h2{margin:0;font-size:1.25rem}.subtitle{font-size:.82rem;color:var(--secondary-text-color)}
  .metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.metric,.panel{padding:12px;border-radius:14px;background:var(--secondary-background-color)}
  .metric-head,.section-title{display:flex;align-items:center;justify-content:space-between;gap:8px}.label{color:var(--secondary-text-color);font-size:.8rem}.value{font-size:1.45rem;font-weight:700;margin-top:4px}
  .dot{width:10px;height:10px;border-radius:50%;background:var(--disabled-text-color)}.good{background:var(--success-color,#43a047)}.warning{background:var(--warning-color,#fb8c00)}.danger{background:var(--error-color,#db4437)}
  .summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:10px}.summary>div,.record{padding:10px 12px;border:1px solid var(--divider-color);border-radius:12px}.section{margin-top:16px}.section-title{justify-content:flex-start;font-weight:650;margin-bottom:8px}
  .records{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.record strong{display:block;margin-top:3px}.detail{color:var(--secondary-text-color);font-size:.86rem;margin-top:4px}
  .graph{height:82px;padding:10px;border:1px solid var(--divider-color);border-radius:14px}.spark{width:100%;height:100%}.spark polyline{fill:none;stroke:var(--primary-color);stroke-width:3;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}.empty{display:grid;place-items:center;height:100%;color:var(--secondary-text-color)}
  .editor{display:grid;gap:14px;padding:8px 0}.editor label{display:grid;gap:6px;color:var(--secondary-text-color);font-size:.82rem}.editor input,.editor select{box-sizing:border-box;width:100%;padding:10px;border-radius:8px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)}.check{display:flex!important;grid-template-columns:auto 1fr!important;align-items:center}
  @media(max-width:600px){.card{padding:14px}.metrics,.records{grid-template-columns:1fr}.summary{grid-template-columns:repeat(2,minmax(0,1fr))}}
`, p = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",
  plannedTodayName: "planned_today_name",
  plannedTodayDuration: "planned_today_duration",
  plannedTodayLoad: "planned_today_load",
  lastActivityName: "last_activity_name",
  lastActivityDistance: "last_activity_distance",
  recordDistance: "record_distance",
  recordElevation: "record_elevation",
  recordMaxPower: "record_max_power"
};
function mt(i, t, e) {
  if (t && i.states[t]) return t;
  const s = `_${e}`;
  return Object.keys(i.states).find((r) => r.startsWith("sensor.") && r.endsWith(s));
}
function y(i, t, e) {
  const s = mt(i, t, e);
  return s ? i.states[s] : void 0;
}
function Bt(i) {
  if (!i || ["unknown", "unavailable", "none"].includes(i.state)) return null;
  const t = Number(i.state);
  return Number.isFinite(t) ? t : null;
}
function m(i, t, e = "—") {
  if (!t || ["unknown", "unavailable", "none"].includes(t.state)) return e;
  try {
    return i.formatEntityState?.(t) ?? `${t.state}${t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return t.state;
  }
}
function qt(i) {
  const t = i?.attributes.history;
  return Array.isArray(t) ? t.map((e) => Number(typeof e == "object" && e !== null && "value" in e ? e.value : e)).filter(Number.isFinite) : [];
}
function Wt(i) {
  if (i.length < 2) return f`<div class="empty">Historique indisponible</div>`;
  const t = 320, e = 76, s = Math.min(...i), o = Math.max(...i) - s || 1, n = i.map((c, a) => {
    const h = a / (i.length - 1) * t, d = e - (c - s) / o * (e - 12) - 6;
    return `${h.toFixed(1)},${d.toFixed(1)}`;
  }).join(" ");
  return f`<svg class="spark" viewBox="0 0 ${t} ${e}" preserveAspectRatio="none">${Ut`<polyline points=${n}></polyline>`}</svg>`;
}
var Vt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, J = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Kt(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && Vt(t, e, r), r;
};
const Zt = [
  ["fitness_entity", "Fitness", p.fitness],
  ["fatigue_entity", "Fatigue", p.fatigue],
  ["form_entity", "Forme", p.form],
  ["ftp_entity", "FTP", p.ftp],
  ["weekly_load_entity", "Charge 7 jours", p.weeklyLoad],
  ["weekly_activities_entity", "Activités 7 jours", p.weeklyActivities]
];
let T = class extends x {
  setConfig(i) {
    this.config = { ...i };
  }
  change(i, t) {
    this.config = { ...this.config, [i]: t }, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config }, bubbles: !0, composed: !0 }));
  }
  render() {
    return !this.config || !this.hass ? f`` : f`<div class="editor">
      <label>Titre<input .value=${this.config.title ?? "Intervals.icu"} @change=${(i) => this.change("title", i.target.value)}></label>
      ${Zt.map(([i, t, e]) => f`<label>${t}<select .value=${String(this.config[i] ?? mt(this.hass, void 0, e) ?? "")} @change=${(s) => this.change(i, s.target.value)}><option value="">Détection automatique</option>${Object.keys(this.hass.states).filter((s) => s.startsWith("sensor.")).map((s) => f`<option value=${s}>${s}</option>`)}</select></label>`)}
      ${["show_workout", "show_last_activity", "show_records", "show_history"].map((i) => f`<label class="check"><input type="checkbox" .checked=${this.config[i] !== !1} @change=${(t) => this.change(i, t.target.checked)}>${i.replaceAll("_", " ")}</label>`)}
    </div>`;
  }
};
T.styles = gt;
J([
  Z({ attribute: !1 })
], T.prototype, "hass", 2);
J([
  $t()
], T.prototype, "config", 2);
T = J([
  ft("ha-intervals-icu-card-editor")
], T);
var Jt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, G = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Gt(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && Jt(t, e, r), r;
};
let M = class extends x {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }
  static getStubConfig() {
    return { title: "Intervals.icu", show_records: !0, show_history: !0, show_workout: !0, show_last_activity: !0 };
  }
  setConfig(i) {
    if (!i) throw new Error("Configuration manquante");
    this.config = { show_records: !0, show_history: !0, show_workout: !0, show_last_activity: !0, ...i };
  }
  getCardSize() {
    return 9;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 8, min_rows: 5 };
  }
  state(i, t) {
    return this.hass ? y(this.hass, this.config?.[i], t) : void 0;
  }
  status(i, t) {
    const e = Bt(t);
    return e === null ? "" : i === "form" ? e < -20 ? "danger" : e < -10 ? "warning" : "good" : i === "fatigue" ? e >= 80 ? "danger" : e >= 60 ? "warning" : "good" : "good";
  }
  metric(i, t, e) {
    return f`<div class="metric"><div class="metric-head"><span class="label">${i}</span><span class="dot ${this.status(t, e)}"></span></div><div class="value">${m(this.hass, e)}</div><div class="detail">7 j : ${e?.attributes.change_7_days ?? "—"}</div></div>`;
  }
  render() {
    if (!this.hass || !this.config) return f``;
    const i = this.hass, t = this.state("fitness_entity", p.fitness), e = this.state("fatigue_entity", p.fatigue), s = this.state("form_entity", p.form), r = this.state("ftp_entity", p.ftp), o = this.state("weekly_load_entity", p.weeklyLoad), n = this.state("weekly_activities_entity", p.weeklyActivities), c = y(i, void 0, p.plannedTodayName), a = y(i, void 0, p.plannedTodayDuration), h = y(i, void 0, p.plannedTodayLoad), d = y(i, void 0, p.lastActivityName), l = y(i, void 0, p.lastActivityDistance);
    return f`<ha-card><div class="card"><div class="header"><div class="logo"><ha-icon icon="mdi:bike-fast"></ha-icon></div><div><h2>${this.config.title}</h2><div class="subtitle">Intervals.icu</div></div></div>
      <div class="metrics">${this.metric("Fitness", "fitness", t)}${this.metric("Fatigue", "fatigue", e)}${this.metric("Forme", "form", s)}</div>
      <div class="summary"><div><span class="label">FTP</span><strong>${m(i, r)}</strong></div><div><span class="label">Charge 7 j</span><strong>${m(i, o)}</strong></div><div><span class="label">Activités 7 j</span><strong>${m(i, n)}</strong></div></div>
      ${this.config.show_workout !== !1 ? f`<section class="section"><div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon>Aujourd’hui</div><div class="panel"><strong>${m(i, c, "Aucun entraînement planifié")}</strong><div class="detail">${m(i, a)} • Charge ${m(i, h)}</div></div></section>` : ""}
      ${this.config.show_last_activity !== !1 ? f`<section class="section"><div class="section-title"><ha-icon icon="mdi:history"></ha-icon>Dernière activité</div><div class="panel"><strong>${m(i, d)}</strong><div class="detail">${m(i, l)}</div></div></section>` : ""}
      ${this.config.show_records !== !1 ? f`<section class="section"><div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon>Records personnels</div><div class="records">${[["Distance", p.recordDistance], ["Dénivelé", p.recordElevation], ["Puissance max.", p.recordMaxPower]].map(([$, g]) => f`<div class="record"><span class="label">${$}</span><strong>${m(i, y(i, void 0, g))}</strong></div>`)}</div></section>` : ""}
      ${this.config.show_history !== !1 ? f`<section class="section"><div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon>Historique fitness</div><div class="graph">${Wt(qt(t))}</div></section>` : ""}
    </div></ha-card>`;
  }
};
M.styles = gt;
G([
  Z({ attribute: !1 })
], M.prototype, "hass", 2);
G([
  $t()
], M.prototype, "config", 2);
M = G([
  ft("ha-intervals-icu-card")
], M);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-intervals-icu-card") || window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: "Fitness, fatigue, forme, entraînements et records Intervals.icu.",
  preview: !0,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/main/docs/lovelace-card.md"
});
console.info("%c HA Intervals.icu Card %c 1.1.0-beta1 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
