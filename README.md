# Morphogenic Studio

**A living systems design lab, generated entirely in your browser.**

Four interconnected workspaces — an interactive specimen canvas, editable morphogenesis parameters, deterministic synthetic nucleotide strings, graph-based mycelial topology, and a harmonic signal field. All simulations are local and reproducible from a seed. This is generative artwork and exploratory software, **not biological or medical instrumentation**.

## What it does

- **Organism canvas:** SVG geometry with live complexity, symmetry, turbulence and energy sliders, motion pause and lossless SVG export.
- **Gene sequencer:** Searchable seeded 16-character strands with generated affinity/activation flags; export as FASTA.
- **Mycelial network:** Connected nearest-neighbor graph with selectable nodes and JSON export.
- **Synaptic signals:** Live harmonic synthetic chart, oscillator controls, pause/resume and CSV export.
- **Presets and persistence:** Three color palettes, rotating configuration presets, project JSON export and local browser storage.
- **Responsive and accessible:** Mobile navigation, keyboard-reachable controls, reduced-motion support, labels, and high-contrast focus styles.

No account, database, cookies, API keys, runtime fonts/CDNs or third-party telemetry. **No recurring infrastructure charges are required within Cloudflare's free-plan limits.**

## Run locally

Requires Node.js 20+ to run tests, but the app itself has **zero runtime or build dependencies**:

```bash
npm test
npm run check
npm run dev
```

Open `http://localhost:8787`. If Python isn't available, serve `public/` from any static HTTP server.

## Deploy on Cloudflare (Free)

Built as **Cloudflare Workers Static Assets**, served directly from `public/` under the worker name `morphogenic-ui` and configured by `wrangler.jsonc`. No server-side Worker script is invoked for normal static requests.

1. Sign up for Cloudflare's free plan and enable a `workers.dev` subdomain.
2. In GitHub repository **Settings → Secrets and variables → Actions**, create `CLOUDFLARE_API_TOKEN` (Cloudflare API token scoped to **Workers Scripts: Edit** on your account) and `CLOUDFLARE_ACCOUNT_ID`.
3. If the repository uses GitHub environment protection, permit deployments to the `production` environment. No paid GitHub environment feature is needed; create the environment only if required by your policy.
4. Push changes to `main` or trigger **Test and deploy · Cloudflare Workers** manually. Pull requests run validation without deploying.
5. Cloudflare will serve the site at `https://morphogenic-ui.<your-subdomain>.workers.dev/`.

You can alternatively run `npx wrangler@4 deploy` from the repository root after authenticating with `npx wrangler@4 login`.

### Security and billing

- Only GitHub Actions receives the Cloudflare deploy token; no token is embedded in the browser bundle.
- Restrictive static response security headers are defined in `public/_headers`.
- Static assets are free and unlimited on Cloudflare Workers; ordinary Worker invocations, if added later, have separate plan limits.
- This is a free-plan deployment, not a guarantee that an account can never incur charges if unrelated paid services are enabled.

## Repository maintenance

The original December 2025 prototype accidentally committed `node_modules`, build output and logs (over 12,000 generated files) and used a GitHub Pages workflow and browser-injected Gemini config. Version 2 replaces those with an audited dependency-free UI and GitHub Actions → Cloudflare deploy pipeline. No Gemini API key is needed.

## License

No explicit license has been granted. All rights reserved until a license is added by the owner.
