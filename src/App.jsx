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
        <div style={{ borderBottom: "3px solid #000", paddingBottom: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "Raleway, Arial, sans-serif", marginBottom: 3 }}>
            Move-Out Flooring Depreciation
          </div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#555" }}>
            Resident Chargeback Assessment
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 48, marginBottom: 22, flexWrap: "wrap" }}>
          {[
            ["Resident Name",   residentName || "—"],
            ["Property / Unit", propertyUnit || "—"],
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

        {/* Signature lines */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 28 }}>
          {["Resident Signature & Date", "Management Signature & Date"].map((lbl) => (
            <div key={lbl}>
              <div style={{ borderBottom: "1px solid #000", height: 42, marginBottom: 6 }} />
              <div style={{ fontSize: 9.5, color: "#555" }}>{lbl}</div>
            </div>
          ))}
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
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", color: B.teal, textTransform: "uppercase", fontFamily: F.subheading, fontWeight: 600, marginBottom: 10 }}>Move-Out Assessment</div>
              <h1 style={{ fontSize: 34, fontWeight: "normal", color: B.cream, fontFamily: F.heading, lineHeight: 1.1 }}>
                Flooring Depreciation
                <span style={{ color: B.teal, display: "block", fontSize: 36 }}>Calculator</span>
              </h1>
              <p style={{ margin: "10px 0 0", color: B.mutedText, fontSize: 12 }}>Estimate resident chargebacks based on flooring age &amp; material</p>
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
              <span style={labelStyle}>Property / Unit</span>
              <input type="text" value={propertyUnit} placeholder="e.g. Sunset Apts — Unit 204" onChange={(e) => setPropertyUnit(e.target.value)} style={inputStyle} />
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
