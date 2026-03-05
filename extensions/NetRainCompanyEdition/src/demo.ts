import express from "express";

const knowledgeBase = [
  {
    id: "kb1",
    q: "what is netrain",
    a: "NetRain is a company-specific private AI tooling layer built on top of opencode + openwork. It enables branded experiences, multi-tenant learning pipelines, and persistent data storage.",
  },
  {
    id: "kb2",
    q: "how to onboard tenant",
    a: "Use POST /netrain/onboard with tenantId, name, and branding information. The MVP onboarding is wired in the extension.",
  },
  {
    id: "kb3",
    q: "branding replacement",
    a: "Branding is applied by the NetRainCompanyEdition extension. It replaces the logo and color palette for the tenant UI.",
  },
];

export function setupDemoRoutes(app: any) {
  const router = express.Router();
  router.use(express.json());

  router.get("/demo", (req: any, res: any) => {
    res.send(`<!doctype html><html><head><meta charset="UTF-8"><title>NetRain Demo</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px} .branding{margin-bottom:20px} </style></head><body>
      <h1>NetRain Demo (Multi-Tenant Branding)</h1>
      <div class="branding" id="branding">Loading branding...</div>
      <div>
        <input id="q" placeholder="Ask a question..." style="width:60%"/>
        <button id="ask">Ask</button>
      </div>
      <pre id="out" style="background:#f6f6f6;padding:10px;min-height:100px;margin-top:10px;width:60%"></pre>
      <script>
        async function loadBranding(){
          try{
            const r = await fetch('/netrain/branding/demoTenant');
            const j = await r.json();
            const branding = j.branding || {};
            document.getElementById('branding').textContent = JSON.stringify(branding, null, 2);
          } catch(e){ document.getElementById('branding').textContent = 'branding load error'; }
        }
        async function ask(){
          const query = document.getElementById('q').value;
          const res = await fetch('/netrain/demo/ask', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ query: query, tenantId: 'demoTenant' })
          });
          const data = await res.json();
          document.getElementById('out').textContent = data.answer;
        }
        document.getElementById('ask').addEventListener('click', ask);
        loadBranding();
      </script>
    </body></html>`);
  });

  router.post("/demo/ask", (req: any, res: any) => {
    const { query, tenantId } = req.body || {};
    const q = (query || "").toLowerCase();
    let answer = "对不起，我还没有遇到这个问题的答案。";
    const found = knowledgeBase.find((k) => q.includes((k.q || "").toLowerCase()));
    if (found) answer = found.a;
    res.json({ answer, tenantId });
  });

  app.use("/netrain", router);
}
