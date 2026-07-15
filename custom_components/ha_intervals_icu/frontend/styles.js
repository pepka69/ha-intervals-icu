export const styles = `
  :host { display:block; }
  ha-card { overflow:hidden; }
  .card { padding:18px; color:var(--primary-text-color); }
  .header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; }
  .title-wrap { display:flex; align-items:center; gap:12px; min-width:0; }
  .logo { width:44px; height:44px; border-radius:13px; display:grid; place-items:center; background:color-mix(in srgb, var(--primary-color) 16%, var(--secondary-background-color)); }
  .logo ha-icon { --mdc-icon-size:28px; color:var(--primary-color); }
  h2 { margin:0; font-size:1.25rem; line-height:1.2; }
  .subtitle { color:var(--secondary-text-color); font-size:.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
  .metric { padding:12px; border-radius:14px; background:var(--secondary-background-color); min-width:0; }
  .metric-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .metric-label { color:var(--secondary-text-color); font-size:.82rem; }
  .metric-value { font-size:1.45rem; font-weight:700; margin-top:4px; }
  .metric-change { color:var(--secondary-text-color); font-size:.75rem; margin-top:2px; }
  .dot { width:9px; height:9px; border-radius:50%; background:var(--disabled-text-color); }
  .dot.good { background:var(--success-color,#43a047); }
  .dot.warning { background:var(--warning-color,#fb8c00); }
  .dot.danger { background:var(--error-color,#db4437); }
  .summary { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:10px; }
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
  .graph-wrap { border:1px solid var(--divider-color); border-radius:14px; padding:10px; min-height:120px; }
  .history-graph { width:100%; height:110px; display:block; }
  .graph-line { fill:none; stroke-width:3; vector-effect:non-scaling-stroke; stroke-linecap:round; stroke-linejoin:round; }
  .zero-line { stroke:var(--divider-color); stroke-width:1; stroke-dasharray:4 4; vector-effect:non-scaling-stroke; }
  .graph-legend { display:flex; flex-wrap:wrap; gap:12px; margin-bottom:5px; color:var(--secondary-text-color); font-size:.75rem; }
  .legend-item { display:flex; align-items:center; gap:5px; }
  .legend-dot { width:8px; height:8px; border-radius:50%; }
  .graph-empty { display:grid; place-items:center; min-height:110px; color:var(--secondary-text-color); font-size:.82rem; }
  .footer { margin-top:12px; text-align:right; color:var(--secondary-text-color); font-size:.7rem; }
  .editor { display:grid; gap:14px; padding:8px 0; }
  .editor-row { display:grid; gap:6px; }
  .editor label { color:var(--secondary-text-color); font-size:.82rem; }
  .editor input, .editor select { box-sizing:border-box; width:100%; padding:10px; border-radius:8px; border:1px solid var(--divider-color); color:var(--primary-text-color); background:var(--card-background-color); }
  .checkbox { display:flex; align-items:center; gap:9px; color:var(--primary-text-color) !important; }
  .checkbox input { width:auto; }
  @media (max-width:600px) {
    .card { padding:14px; }
    .metrics { grid-template-columns:1fr; }
    .summary { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .records { grid-template-columns:1fr; }
  }
`;
