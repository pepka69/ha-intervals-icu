import { css } from "lit";

export const cardStyles = css`
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
`;
