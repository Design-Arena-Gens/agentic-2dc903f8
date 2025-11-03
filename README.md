# DBT Imaging Biobank Proposal Agent

An interactive research associate built with Next.js 14 and Tailwind CSS to help teams craft a compelling, plagiarism-free proposal for the Department of Biotechnology (DBT). The agent personalises guidance for the flagship programme:

> **“Establishment of a National Network for AI-Enabled Imaging Biobank on Onco-pathology and infectious diseases: A Hub-and-Spoke Model for India-Specific Diagnostic and Prognostic Tools.”**

## ✨ What’s inside

- **Humanised proposal narratives** that adapt in real-time to the institution, cohorts, and translational plans you input.
- **Actionable 90-day sprint planner** to operationalise inception activities across hub-and-spoke partners.
- **Reviewer readiness radar** with probing questions to stress-test completeness before submission.
- **Toggleable priority lenses** (data governance, federated AI, capacity building, regulatory engagement) to rebalance emphasis for DBT reviewers.
- **Tailored DBT persona** that behaves like a senior research associate, aligning science, policy, and deployment strategy.

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to explore the agent. Update the left-hand forms with your context—narratives, action steps, and prompts refresh instantly.

## 🗂️ Project structure

```
├── src/
│   └── app/
│       ├── page.tsx        # Proposal agent UI and generators
│       ├── layout.tsx      # App metadata and root layout
│       └── globals.css     # Tailwind + design tokens
├── public/                 # Static assets
├── package.json
└── tsconfig.json
```

## 🧭 Tech stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS (v4 preview)](https://tailwindcss.com/)

## 🛡️ Staying original

All guidance is generated from handcrafted templates and logic—no external corpora or scraping—ensuring your proposal language remains unique and human-centred. Use the content as a draft, then iterate with domain experts for final submission.

## 📬 Feedback & enhancements

Ideas for new modules (budget justifications, risk register automation, etc.) are welcome. Feel free to open an issue or submit a pull request with enhancements that strengthen proposal readiness for DBT or allied funding calls.
