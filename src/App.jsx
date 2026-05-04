import { useState } from "react";

const B = {
  darkest:   "#0c293c",
  navy:      "#003f5f",
  teal:      "#2cb1cc",
  cream:     "#f7f3eb",
  navyLight: "#004f78",
  tealDim:   "#1a8599",
  mutedText: "#7eb8c9",
  dimText:   "#b8d4dc",
  border:    "#0a2233",
  borderMid: "#0e3048",
};

const F = {
  heading:    "'Raleway', 'Trebuchet MS', sans-serif",
  subheading: "'Raleway', 'Trebuchet MS', sans-serif",
  body:       "'Montserrat', 'Segoe UI', sans-serif",
};

const LOGO_SRC = "data:image/png;base64,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";

const LOGO_PRINT = "data:image/png;base64,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";

const FLOORING_TYPES = [
  { label: "Carpet",         life: 5,  color: "#c49a6c" },
  { label: "Vinyl Plank",    life: 10, color: "#2cb1cc" },
  { label: "Sheet Laminate", life: 5,  color: "#7eb8c9" },
  { label: "Tile",           life: 30, color: "#f7f3eb" },
];

const EMPTY_ROW = () => ({
  id: Math.random().toString(36).slice(2),
  unit: "", flooringType: "", installDate: "", moveOutDate: "", originalCost: "",
});

function calcRow(row) {
  const ft = FLOORING_TYPES.find((f) => f.label === row.flooringType);
  if (!ft || !row.installDate || !row.moveOutDate || !row.originalCost) return null;
  const ageYrs = (new Date(row.moveOutDate) - new Date(row.installDate)) / (1000 * 60 * 60 * 24 * 365.25);
  const usefulLife = ft.life;
  const remainingLife = Math.max(usefulLife - ageYrs, 0);
  const remainingPct = remainingLife / usefulLife;
  const cost = parseFloat(row.originalCost) || 0;
  return { ageYrs, usefulLife, remainingLife, remainingPct, chargeback: cost * remainingPct };
}

const fmt$ = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

const fmtDate = (d) => {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${m}/${day}/${y}`;
};

function ProgressBar({ pct, color }) {
  return (
    <div style={{ width: "100%", height: 5, background: B.darkest, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(pct * 100, 100)}%`, height: "100%", background: `linear-gradient(90deg, ${B.tealDim}, ${color || B.teal})`, borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

export default function App() {
  const [rows, setRows]               = useState([EMPTY_ROW()]);
  const [residentName, setResidentName] = useState("");
  const [propertyUnit, setPropertyUnit] = useState("");

  const addRow    = () => setRows((r) => [...r, EMPTY_ROW()]);
  const removeRow = (id) => setRows((r) => r.filter((row) => row.id !== id));
  const updateRow = (id, field, value) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const calcs           = rows.map((r) => ({ ...r, calc: calcRow(r) }));
  const totalChargeback = calcs.reduce((sum, r) => sum + (r.calc?.chargeback || 0), 0);
  const validRows       = calcs.filter((r) => r.calc);
  const today           = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const labelStyle = {
    fontSize: 9, letterSpacing: "0.18em", color: B.dimText,
    textTransform: "uppercase", fontFamily: F.subheading, fontWeight: 600,
  };
  const inputStyle = {
    background: B.darkest, border: `1px solid ${B.borderMid}`,
    borderRadius: 8, padding: "9px 12px", color: B.cream, fontSize: 12,
    outline: "none", fontFamily: F.body, width: "100%", boxSizing: "border-box", colorScheme: "dark",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Raleway:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
        input::placeholder { color: #2a5570; }
        input:focus, select:focus { border-color: ${B.teal} !important; box-shadow: 0 0 0 2px ${B.teal}22; }
        button:hover { opacity: 0.85; transition: opacity 0.15s; }

        /* ─── PRINT ─────────────────────────────────── */
        @media print {
          @page { size: letter portrait; margin: 0.8in; }

          /* hide the screen app entirely */
          #screen-app { display: none !important; }

          /* show & reset the print doc */
          #print-doc {
            display: block !important;
            font-family: 'Montserrat', Arial, sans-serif;
            color: #000 !important;
            background: #fff !important;
            font-size: 11px;
            line-height: 1.5;
          }
        }

        /* hide print doc on screen */
        #print-doc { display: none; }
      `}</style>

      {/* ══ PRINT DOCUMENT (hidden on screen) ══════════════════════ */}
      <div id="print-doc">
        {/* Header */}
        <div style={{ borderBottom: "3px solid #000", paddingBottom: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <img src={LOGO_PRINT} alt="Logo" style={{ width: 60, height: 60, objectFit: "contain", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Raleway, Arial, sans-serif", marginBottom: 3 }}>
              Move-Out Flooring Depreciation
            </div>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#555" }}>
              Resident Chargeback Assessment
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 48, marginBottom: 22, flexWrap: "wrap" }}>
          {[
            ["Resident Name",   residentName || "—"],
            ["Property Name",   propertyUnit || "—"],
            ["Date Prepared",   today],
          ].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.18em", color: "#777", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10.5, marginBottom: 18 }}>
          <thead>
            <tr>
              {["Unit", "Flooring Type", "Install Date", "Move-Out Date", "Original Cost", "Useful Life", "Age", "Remaining %", "Chargeback"].map((h, i) => (
                <th key={h} style={{ background: "#000", color: "#fff", padding: "6px 9px", textAlign: i >= 7 ? "right" : "left", fontSize: 8.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {validRows.map((row, i) => (
              <tr key={row.id}>
                {[
                  row.unit || "—",
                  row.flooringType,
                  fmtDate(row.installDate),
                  fmtDate(row.moveOutDate),
                  fmt$(parseFloat(row.originalCost)),
                  `${row.calc.usefulLife} yrs`,
                  `${row.calc.ageYrs.toFixed(1)} yrs`,
                ].map((val, ci) => (
                  <td key={ci} style={{ padding: "7px 9px", borderBottom: "1px solid #ddd", background: i % 2 === 1 ? "#f5f5f5" : "#fff" }}>{val}</td>
                ))}
                {/* Remaining % with mini bar */}
                <td style={{ padding: "7px 9px", borderBottom: "1px solid #ddd", background: i % 2 === 1 ? "#f5f5f5" : "#fff", textAlign: "right" }}>
                  <span style={{ marginRight: 6 }}>{(row.calc.remainingPct * 100).toFixed(0)}%</span>
                  <span style={{ display: "inline-block", width: 48, height: 5, background: "#ddd", borderRadius: 3, verticalAlign: "middle", overflow: "hidden" }}>
                    <span style={{ display: "block", width: `${row.calc.remainingPct * 100}%`, height: "100%", background: "#000", borderRadius: 3 }} />
                  </span>
                </td>
                {/* Chargeback */}
                <td style={{ padding: "7px 9px", borderBottom: "1px solid #ddd", background: i % 2 === 1 ? "#f5f5f5" : "#fff", textAlign: "right", fontWeight: 700 }}>
                  {fmt$(row.calc.chargeback)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20, borderTop: "3px solid #000", paddingTop: 12, marginBottom: 36 }}>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "#555" }}>Total Chargeback</span>
          <span style={{ fontFamily: "Raleway, Arial, sans-serif", fontSize: 26, fontWeight: 700 }}>{fmt$(totalChargeback)}</span>
        </div>

        {/* Footer note */}
        <div style={{ borderTop: "1px solid #ccc", paddingTop: 10, fontSize: 8.5, color: "#888", textAlign: "center", lineHeight: 1.6 }}>
          Flooring depreciation calculated based on useful life standards. Residents are charged for the remaining value at time of move-out.
          Generated {today}.
        </div>
      </div>

      {/* ══ SCREEN APP ══════════════════════════════════════════════ */}
      <div id="screen-app" style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${B.darkest} 0%, #091e2d 55%, ${B.darkest} 100%)`, fontFamily: F.body, color: B.cream }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(90deg, ${B.navy} 0%, #004068 100%)`, borderBottom: `1px solid ${B.border}`, padding: "36px 52px 30px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${B.teal}, ${B.tealDim}, ${B.teal})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <img src={LOGO_SRC} alt="Logo" style={{ width: 80, height: 80, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.3em", color: B.teal, textTransform: "uppercase", fontFamily: F.subheading, fontWeight: 600, marginBottom: 10 }}>Move-Out Assessment</div>
                <h1 style={{ fontSize: 34, fontWeight: "normal", color: B.cream, fontFamily: F.heading, lineHeight: 1.1 }}>
                  Flooring Depreciation
                  <span style={{ color: B.teal, display: "block", fontSize: 36 }}>Calculator</span>
                </h1>
                <p style={{ margin: "10px 0 0", color: B.mutedText, fontSize: 12 }}>Estimate resident chargebacks based on flooring age &amp; material</p>
              </div>
            </div>
            <div style={{ background: B.darkest, border: `1px solid ${B.border}`, borderTop: `2px solid ${B.teal}`, borderRadius: 10, padding: "20px 32px", textAlign: "right", minWidth: 220 }}>
              <div style={{ ...labelStyle, marginBottom: 8 }}>Total Chargeback</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: totalChargeback > 0 ? B.teal : B.borderMid, letterSpacing: "-0.01em", fontFamily: F.heading, transition: "color 0.3s" }}>{fmt$(totalChargeback)}</div>
              <div style={{ fontSize: 11, color: B.dimText, marginTop: 6 }}>{validRows.length} item{validRows.length !== 1 ? "s" : ""} calculated</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: "32px 52px 48px", maxWidth: 1300, margin: "0 auto" }}>

          {/* Resident / property */}
          <div style={{ background: `linear-gradient(135deg, ${B.navy}, ${B.navyLight})`, border: `1px solid ${B.borderMid}`, borderRadius: 12, padding: "20px 24px", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={labelStyle}>Resident Name</span>
              <input type="text" value={residentName} placeholder="e.g. Jane Smith" onChange={(e) => setResidentName(e.target.value)} style={inputStyle} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={labelStyle}>Property Name</span>
              <input type="text" value={propertyUnit} placeholder="e.g. Sunset Apartments" onChange={(e) => setPropertyUnit(e.target.value)} style={inputStyle} />
            </label>
          </div>

          {/* Reference chips */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...labelStyle, marginBottom: 10 }}>Useful Life Reference</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FLOORING_TYPES.map((f) => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, background: B.navy, border: `1px solid ${B.borderMid}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: B.cream }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: f.color, flexShrink: 0, display: "inline-block" }} />
                  {f.label} <span style={{ color: B.dimText }}>· {f.life}yr</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {calcs.map((row, idx) => {
              const ft = FLOORING_TYPES.find((f) => f.label === row.flooringType);
              const c  = row.calc;
              return (
                <div key={row.id} style={{ background: `linear-gradient(135deg, ${B.navy} 0%, ${B.navyLight} 100%)`, border: `1px solid ${B.borderMid}`, borderLeft: `3px solid ${c ? (ft?.color || B.teal) : B.borderMid}`, borderRadius: 12 }}>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: B.darkest, border: `1px solid ${B.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: B.dimText, flexShrink: 0 }}>{idx + 1}</div>
                      {row.unit && <span style={{ fontSize: 12, color: B.teal, letterSpacing: "0.08em", fontFamily: F.subheading, fontWeight: 600 }}>Unit {row.unit}</span>}
                      {c && (
                        <div style={{ marginLeft: "auto", textAlign: "right" }}>
                          <div style={{ ...labelStyle, marginBottom: 2 }}>Chargeback</div>
                          <span style={{ fontSize: 24, fontWeight: 700, color: B.cream, fontFamily: F.heading }}>{fmt$(c.chargeback)}</span>
                        </div>
                      )}
                      <button onClick={() => removeRow(row.id)} style={{ background: "none", border: "none", color: B.dimText, cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "2px 6px", marginLeft: c ? 0 : "auto" }}>×</button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                      {[
                        { field: "unit",         label: "Unit Number",       placeholder: "e.g. 002-303", type: "text"   },
                        { field: "installDate",  label: "Install Date",      placeholder: "",             type: "date"   },
                        { field: "moveOutDate",  label: "Move-Out Date",     placeholder: "",             type: "date"   },
                        { field: "originalCost", label: "Original Cost ($)", placeholder: "e.g. 1200",   type: "number" },
                      ].map(({ field, label, placeholder, type }) => (
                        <label key={field} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          <span style={labelStyle}>{label}</span>
                          <input type={type} value={row[field]} placeholder={placeholder} onChange={(e) => updateRow(row.id, field, e.target.value)} style={inputStyle} />
                        </label>
                      ))}
                      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={labelStyle}>Flooring Type</span>
                        <select value={row.flooringType} onChange={(e) => updateRow(row.id, "flooringType", e.target.value)} style={{ ...inputStyle, color: row.flooringType ? B.cream : B.dimText, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a7a8a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: 30 }}>
                          <option value="">Select type…</option>
                          {FLOORING_TYPES.map((f) => <option key={f.label} value={f.label}>{f.label} ({f.life}yr)</option>)}
                        </select>
                      </label>
                    </div>

                    {c && (
                      <div style={{ marginTop: 16, padding: "16px 18px", background: B.darkest, borderRadius: 10, display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 12 }}>
                          {[["Age", `${c.ageYrs.toFixed(1)} yrs`], ["Useful Life", `${c.usefulLife} yrs`], ["Remaining Life", `${c.remainingLife.toFixed(1)} yrs`], ["% Remaining", `${(c.remainingPct * 100).toFixed(0)}%`]].map(([k, v]) => (
                            <div key={k} style={{ textAlign: "center" }}>
                              <div style={{ ...labelStyle, marginBottom: 4 }}>{k}</div>
                              <div style={{ fontSize: 16, color: B.cream, fontFamily: F.subheading, fontWeight: 600 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: B.dimText, marginBottom: 6 }}>
                            <span>Fully Worn</span>
                            <span style={{ color: B.teal, fontWeight: 600 }}>{(c.remainingPct * 100).toFixed(0)}% remaining value charged</span>
                            <span>New</span>
                          </div>
                          <ProgressBar pct={c.remainingPct} color={ft?.color} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={addRow} style={{ background: "none", border: `1px dashed ${B.borderMid}`, borderRadius: 10, padding: "12px 24px", color: B.mutedText, fontSize: 12, cursor: "pointer", fontFamily: F.body, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18, color: B.teal, lineHeight: 1 }}>+</span> Add Flooring Item
            </button>

            {validRows.length > 0 && (
              <button onClick={() => window.print()} style={{ background: `linear-gradient(135deg, ${B.teal}, ${B.tealDim})`, border: "none", borderRadius: 10, padding: "12px 28px", color: B.darkest, fontSize: 12, cursor: "pointer", fontFamily: F.body, fontWeight: 700, letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 10 }}>
                🖨&nbsp; Print / Save as PDF
              </button>
            )}
          </div>

          {validRows.length > 0 && (
            <p style={{ marginTop: 10, fontSize: 11, color: B.dimText, fontFamily: F.body }}>
              In the print dialog, set the destination to <strong style={{ color: B.mutedText }}>"Save as PDF"</strong> to generate a file for the resident record.
            </p>
          )}

        </div>
      </div>
    </>
  );
}
