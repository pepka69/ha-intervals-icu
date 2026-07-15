export const styles = `
  :host { display: block; }
  ha-card { overflow: hidden; }
  .card { padding: 18px; color: var(--primary-text-color); }
  .header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; }
  .title-wrap { display:flex; align-items:center; gap:12px; min-width:0; }
  .logo { width:42px; height:42px; border-radius:12px; display:grid; place-items:center; background:var(--secondary-background-color); }
  .logo ha-icon { --mdc-icon-size:27px; }
  h2 { margin:0; font-size:1.25rem; line-height:1.2; }
  .subtitle { color:var(--secondary-text-color); font-size:.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
  .metric { padding:12px; border-radius:14px; background:var(--secondary-background-color); min-width:0; }
  .metric-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .metric-label { color:var(--secondary-text-color); font-size:.82rem; }
  .metric-value { font-size:1.45rem; font-weight:700; margin-top:4px; }
  .dot { width:9px; height:9px; border-radius:50%; background:var(--disabled-text-color); }
  .dot.good { background:var(--success-color,#43a047); }
  .dot.warning { background:var(--warning-color,#fb8c00); }
  .dot.danger { background:var(--error-color,#db4437); }
  .summary { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; margin-top:10px; }
  .summary-item { padding:10px 12px; border:1px solid var(--divider-color); border-radius:12px; }
  .summary-label { color:var(--secondary-text-color); font-size:.76rem; }
  .summary-value { font-weight:650; margin-top:3px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .section { margin-top:16px; }
  .section-title { display:flex; align-items:center; gap:7px; margin-bottom:8px; font-weight:650; }
  .section-title ha-icon { --mdc-icon-size:20px; }
  .workout, .activity { padding:12px; border-radius:14px; background:var(--secondary-background-color); }
  .main-line { font-weight:650; }
  .detail-line { color:var(--secondary-text-color); margin-top:4px; font-size:.87rem; }
  .records { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
  .record { border:1px solid var(--divider-color); border-radius:12px; padding:10px; }
  .record-label { color:var(--secondary-text-color); font-size:.75rem; }
  .record-value { font-weight:650; margin-top:3px; }
  .graph-wrap { border:1px solid var(--divider-color); border-radius:14px; padding:10px; height:68px; }
  .sparkline { width:100%; height:100%; }
  .sparkline polyline { fill:none; stroke:var(--primary-color); stroke-width:3; vector-effect:non-scaling-stroke; stroke-linecap:round; stroke-linejoin:round; }
  .graph-empty { display:grid; place-items:center; height:100%; color:var(--secondary-text-color); font-size:.82rem; }
  .footer { margin-top:12px; text-align:right; color:var(--secondary-text-color); font-size:.7rem; }
  .editor { display:grid; gap:14px; padding:8px 0; }
  .editor-row { display:grid; gap:6px; }
  .editor label { color:var(--secondary-text-color); font-size:.82rem; }
  .editor input, .editor select { box-sizing:border-box; width:100%; padding:10px; border-radius:8px; border:1px solid var(--divider-color); color:var(--primary-text-color); background:var(--card-background-color); }
  .checkbox { display:flex; align-items:center; gap:9px; }
  @media (max-width:600px) {
    .card { padding:14px; }
    .metrics { grid-template-columns:1fr; }
    .summary { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .records { grid-template-columns:1fr; }
  }
`;
