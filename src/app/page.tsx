"use client";

import { useMemo, useState } from "react";

type FormState = {
  principalInvestigator: string;
  institute: string;
  instituteType: string;
  hubLocation: string;
  oncologyFocus: string;
  infectiousFocus: string;
  dataAssets: string;
  aiStrengths: string;
  partnerships: string;
  clinicalIntegration: string;
  ethicsPlan: string;
  differentiator: string;
  translationalPlan: string;
  capacityBuilding: string;
  budget: string;
  timeline: string;
};

type PriorityKey =
  | "dataGovernance"
  | "clinicalValidation"
  | "federatedLearning"
  | "capacityBuilding"
  | "policyEngagement";

type Section = {
  title: string;
  narrative: string;
  prompts: string[];
};

type ActionItem = {
  title: string;
  lead: string;
  impact: string;
  detail: string;
};

const baseFormState: FormState = {
  principalInvestigator: "",
  institute: "",
  instituteType: "Autonomous Institute",
  hubLocation: "",
  oncologyFocus: "",
  infectiousFocus: "",
  dataAssets: "",
  aiStrengths: "",
  partnerships: "",
  clinicalIntegration: "",
  ethicsPlan: "",
  differentiator: "",
  translationalPlan: "",
  capacityBuilding: "",
  budget: "₹180 – ₹220 Cr across 5 years",
  timeline: "60 months with staged go-lives every 12 months",
};

const priorityConfig: Record<
  PriorityKey,
  { label: string; description: string; payoff: string }
> = {
  dataGovernance: {
    label: "Pan-India Data Governance Fabric",
    description:
      "Draft a governance charter covering consent models, data localisation, anonymisation, and interoperable metadata for imaging archives.",
    payoff:
      "Demonstrates DBT-aligned stewardship of sensitive clinical data while enabling learnable datasets.",
  },
  clinicalValidation: {
    label: "Prospective Clinical Validation",
    description:
      "Embed prospective validation cohorts for both oncology and infectious disease modules with unified CRF design.",
    payoff:
      "Proves real-world safety and efficacy of AI models in heterogeneous Indian settings.",
  },
  federatedLearning: {
    label: "Federated & Privacy-Preserving AI Stack",
    description:
      "Stand up sandboxed federated learning pipelines that respect hospital IT constraints and low bandwidth spokes.",
    payoff:
      "Unlocks cross-centre learning without centralising raw patient data.",
  },
  capacityBuilding: {
    label: "Capacity Building & Field Readiness",
    description:
      "Launch continuous training for pathologists, radiologists, and data managers combining e-learning with immersive residencies at the hub.",
    payoff:
      "Addresses the human resource gap and ensures adoption beyond pilot sites.",
  },
  policyEngagement: {
    label: "Regulatory & Policy Engagement",
    description:
      "Coordinate with CDSCO, ICMR, and state health missions to align validation protocols and fast-track approvals.",
    payoff:
      "Reduces translational friction and positions the network as a national reference implementation.",
  },
};

const guidingQuestions = [
  "How will the hub orchestrate data standardisation across varied hospital IT systems?",
  "What differentiates your imaging archives for India-specific AI diagnostics?",
  "Which infectious disease cohorts will be prioritised in the first 18 months?",
  "How will you govern IP and benefit sharing with spoke hospitals and industry partners?",
] as const;

function buildNarrativeSections(
  form: FormState,
  priorities: Record<PriorityKey, boolean>,
): Section[] {
  const {
    principalInvestigator,
    institute,
    instituteType,
    hubLocation,
    oncologyFocus,
    infectiousFocus,
    dataAssets,
    aiStrengths,
    partnerships,
    clinicalIntegration,
    ethicsPlan,
    differentiator,
    translationalPlan,
    capacityBuilding,
    budget,
    timeline,
  } = form;

  const piRef = principalInvestigator || "the Principal Investigator";
  const instituteRef =
    institute ||
    "the lead applicant institution with proven expertise in biomedical innovation";
  const hubRef =
    hubLocation || "the proposed central hub anchoring the network";
  const instituteDescriptor =
    instituteType ||
    "an autonomous, DBT-aligned research institute with mature governance systems";

  const oncologyNarrative =
    oncologyFocus ||
    "triple-negative breast cancer, oral squamous cell carcinoma, and hepatobiliary malignancies with high national incidence";

  const infectiousNarrative =
    infectiousFocus ||
    "antimicrobial-resistant tuberculosis, COVID-19 sequelae, and vector-borne fevers with atypical imaging signatures";

  const dataNarrative =
    dataAssets ||
    "legacy histopathology slides, WSI archives, radiology PACS feeds, and longitudinal clinical metadata captured through EMR integration";

  const aiNarrative =
    aiStrengths ||
    "hybrid vision–language models, multimodal embeddings for histopathology and radiology, explainability toolkits, and MLOps pipelines aligned with BIS/ISO standards";

  const partnershipNarrative =
    partnerships ||
    "premier cancer centres, infectious disease institutes, digital health start-ups, and state-run telemedicine networks";

  const clinicalNarrative =
    clinicalIntegration ||
    "embedding AI triage dashboards in MDT meetings, automating structured reporting, and integrating decision support in hospital HIS";

  const ethicsNarrative =
    ethicsPlan ||
    "sovereign data residency, dynamic consent models, tribal ethics board representation, and periodic algorithmic bias audits";

  const differentiatorNarrative =
    differentiator ||
    "India-specific imaging phenotypes curated across geographies, multilingual reporting layers, and first-of-its-kind cross-institutional model benchmarking";

  const translationalNarrative =
    translationalPlan ||
    "co-developing regulatory dossiers with CDSCO, partnering with National Cancer Grid hospitals for scale-out, and scripting industry co-development MOUs";

  const capacityNarrative =
    capacityBuilding ||
    "immersive residencies for pathologists, national hackathons on curated datasets, and certification programmes for AI-ready biomedical technologists";

  const summaryBody = [
    `Under the leadership of ${piRef} at ${instituteRef}, this proposal establishes a National Network for AI-enabled Imaging Biobanks on onco-pathology and infectious diseases. The programme operates a hub-and-spoke architecture anchored at ${hubRef}, synchronising spoke centres across India to co-create diagnostic and prognostic tools tailored to local clinical realities.`,
    `${instituteDescriptor} anchors the command centre, orchestrating regulatory compliance, data stewardship, and translational acceleration for spoke partners.`,
    `The network prioritises ${oncologyNarrative} on the oncology front and ${infectiousNarrative} for infectious diseases, ensuring dual impact on India's cancer burden and emerging outbreaks.`,
    `A phased deployment across ${timeline} is budgeted at ${budget}, balancing capital expenditure on digital pathology infrastructure with sustained investments in data stewardship, AI R&D, and translational pilots.`,
  ].join(" ");

  const objectivesBody = [
    "1. Curate a federated imaging biobank that harmonises oncology and infectious disease datasets, enabling trustworthy India-specific AI algorithm development.",
    `2. Build and validate AI pipelines leveraging ${aiNarrative}, with prospective clinical evaluations embedded across hub and spokes.`,
    `3. Operationalise a translational corridor through ${partnershipNarrative}, catalysing rapid deployment of validated tools into national programmes and market-ready solutions.`,
  ].join("\n");

  const methodologyBody = [
    `Data acquisition will consolidate ${dataNarrative}. A harmonised data dictionary and HL7 FHIR-compliant APIs backhaul imaging and clinical metadata to the hub.`,
    `Model development capitalises on ${aiNarrative}. Adaptive workflows combine central model training with on-premises federated fine-tuning to respect institutional policies.`,
    `Clinical integration strategies include ${clinicalNarrative}. A continuous feedback loop captures physician insights to refine algorithms and usability.`,
  ].join(" ");

  const governanceBody = [
    `Ethical and regulatory guardrails rely on ${ethicsNarrative}. A national governance council chaired by DBT nominees reviews bias, consent adherence, and cross-border collaborations.`,
    priorities.dataGovernance
      ? "A dedicated data governance office issues stewardship playbooks for each spoke, including metadata audits and rapid incident response protocols."
      : "Data stewardship frameworks will be finalised during inception, prioritising consent traceability and anonymisation pipelines compliant with Indian privacy directives.",
    priorities.policyEngagement
      ? "Regulatory liaisons co-develop evidence packages with CDSCO and ICMR, positioning validated algorithms for expedited approvals."
      : "Engagement with regulators is programmed through quarterly consultations, aligning study designs with CDSCO's SaMD expectations.",
  ]
    .filter(Boolean)
    .join(" ");

  const translationalBody = [
    translationalNarrative,
    priorities.clinicalValidation
      ? "Prospective validation studies will cover urban tertiary, tier-2, and aspirational district hospitals, evidencing generalisability and health-economic value."
      : "Pilot deployments begin with tertiary hospitals, expanding to district-level spokes after initial validation cycles.",
    priorities.policyEngagement
      ? "A policy brief series informs National Digital Health Mission and Ayushman Bharat on reimbursement pathways for AI-augmented diagnostics."
      : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const capacityBody = [
    capacityNarrative,
    priorities.capacityBuilding
      ? "An academy at the hub offers stackable micro-credentials, while spoke champions receive on-site mentorship and playbooks for sustaining QA programmes."
      : "Capacity building will leverage blended learning modules and peer knowledge exchanges hosted by the hub.",
  ]
    .filter(Boolean)
    .join(" ");

  const differentiationBody = [
    differentiatorNarrative,
    priorities.federatedLearning
      ? "An indigenous federated learning framework reduces bandwidth load, enabling spokes with limited connectivity to contribute to national model updates."
      : "Cloud-native MLOps guardrails ensure reproducibility, while governance mechanisms prevent data drift across institutions.",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    {
      title: "Executive Orientation",
      narrative: summaryBody,
      prompts: [
        "Clarify the value proposition for DBT and national health missions.",
        "Spell out dual benefit across cancer and infectious disease burden.",
        "Quantify reach (patients, hospitals, regulatory stakeholders).",
      ],
    },
    {
      title: "Program Objectives",
      narrative: objectivesBody,
      prompts: [
        "Ensure objectives map to measurable outputs and outcomes.",
        "Highlight cross-disciplinary integration across AI, pathology, epidemiology.",
        "Capture both national coordination and local empowerment goals.",
      ],
    },
    {
      title: "Methodology & Technical Blueprint",
      narrative: methodologyBody,
      prompts: [
        "Detail data capture, curation, and AI model lifecycle.",
        "Explain hub responsibilities versus spoke execution roles.",
        "Integrate resilience planning for low-resource spoke settings.",
      ],
    },
    {
      title: "Governance, Ethics & Regulatory Readiness",
      narrative: governanceBody,
      prompts: [
        "Document consent artefacts, anonymisation protocols, and data sharing agreements.",
        "Demonstrate adherence to Indian privacy and medical device regulations.",
        "Align governance cadence with DBT reporting expectations.",
      ],
    },
    {
      title: "Translation Pathways & Partnerships",
      narrative: translationalBody,
      prompts: [
        "Showcase industry, clinical, and public health alliances.",
        "Outline revenue or sustainability models post-grant.",
        "Position the network as a lighthouse for national policy.",
      ],
    },
    {
      title: "Human Capacity & Change Management",
      narrative: capacityBody,
      prompts: [
        "Quantify people trained and competencies developed.",
        "Document knowledge-transfer mechanisms across hub and spokes.",
        "Include gender and geographic inclusion strategies.",
      ],
    },
    {
      title: "Differentiators & Risk Mitigation",
      narrative: differentiationBody,
      prompts: [
        "Articulate unique assets compared with global biobank initiatives.",
        "Address algorithmic fairness, cyber-resilience, and sustainability risks.",
        "Provide contingency planning for supply-chain or policy delays.",
      ],
    },
  ];
}

function buildActionPlan(
  form: FormState,
  priorities: Record<PriorityKey, boolean>,
): ActionItem[] {
  const actions: ActionItem[] = [
    {
      title: "Constitute National Steering Council",
      lead: form.principalInvestigator || "PI & DBT-appointed co-chairs",
      impact: "Alignment",
      detail:
        "Draft TOR, onboard regional spokes, and ratify governance charter within first 60 days.",
    },
    {
      title: "Hub Infrastructure Upgrade",
      lead: `${form.institute || "Lead institute"} Digital Pathology Core`,
      impact: "Readiness",
      detail:
        "Commission WSI scanners, edge compute clusters, and secure data lake to host reference biobank nodes.",
    },
    {
      title: "Prospective Cohort Onboarding",
      lead: "Clinical Workstreams",
      impact: "Evidence",
      detail:
        "Recruit representative oncology and infectious disease cohorts with harmonised CRFs across all spokes.",
    },
  ];

  if (priorities.dataGovernance) {
    actions.push({
      title: "Data Governance Charter Roll-out",
      lead: "Data Stewardship Office",
      impact: "Trust",
      detail:
        "Publish interoperable metadata schemas, consent templates, and audit cadence for spoke hospitals.",
    });
  }

  if (priorities.federatedLearning) {
    actions.push({
      title: "Federated Learning Pilot",
      lead: "AI Engineering Guild",
      impact: "Innovation",
      detail:
        "Deploy privacy-preserving training nodes in at least three spokes with bandwidth profiling.",
    });
  }

  if (priorities.capacityBuilding) {
    actions.push({
      title: "National Training Grid Launch",
      lead: "Capacity Building Pod",
      impact: "Adoption",
      detail:
        "Roll out blended learning journeys, certify 200+ clinicians/data managers, and seed communities of practice.",
    });
  }

  if (priorities.policyEngagement) {
    actions.push({
      title: "Regulatory & Policy Roundtables",
      lead: "Policy & Advocacy Node",
      impact: "Scale",
      detail:
        "Co-design regulatory evidence packages with CDSCO and align milestone reviews with NDHM playbooks.",
    });
  }

  if (form.translationalPlan) {
    actions.push({
      title: "Translational Playbook Publication",
      lead: "Knowledge Translation Office",
      impact: "Diffusion",
      detail:
        "Document SOPs, pricing models, and state adoption strategies for rapid replication beyond grant tenure.",
    });
  }

  return actions;
}

export default function Home() {
  const [formState, setFormState] = useState<FormState>(baseFormState);
  const [priorityState, setPriorityState] = useState<Record<PriorityKey, boolean>>(
    {
      dataGovernance: true,
      clinicalValidation: true,
      federatedLearning: true,
      capacityBuilding: true,
      policyEngagement: true,
    },
  );
  const [copied, setCopied] = useState(false);

  const sections = useMemo(
    () => buildNarrativeSections(formState, priorityState),
    [formState, priorityState],
  );

  const actionPlan = useMemo(
    () => buildActionPlan(formState, priorityState),
    [formState, priorityState],
  );

  const compiledNarrative = useMemo(
    () =>
      sections
        .map((section) => `${section.title}\n${section.narrative}`)
        .join("\n\n"),
    [sections],
  );

  const handleCopyNarrative = async () => {
    try {
      await navigator.clipboard.writeText(compiledNarrative);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (error) {
      console.error("Failed to copy narrative", error);
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617_45%)] pb-16 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pt-12 lg:px-10">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
                DBT Proposal Associate
              </p>
              <h1 className="text-3xl font-medium leading-relaxed text-white md:text-4xl">
                Agentic partner for the{" "}
                <span className="text-emerald-300">
                  National AI-Enabled Imaging Biobank
                </span>{" "}
                initiative on onco-pathology and infectious diseases.
              </h1>
              <p className="text-lg text-slate-200">
                This workspace is engineered to help you craft a persuasive,
                plagiarism-free proposal aligned with DBT expectations. Feed in
                your context and the agent will map bespoke narratives, action
                plans, and review prompts so you can focus on strategy, not
                paperwork.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-lg shadow-emerald-500/20">
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Persona Snapshot
              </span>
              <p className="mt-3 font-medium text-emerald-50">
                Your embedded research associate combines oncology informatics
                expertise, clinical translation experience, and policy fluency
                to anticipate reviewer concerns, stitch multi-institutional
                narratives, and surface India-specific differentiators.
              </p>
              <ul className="mt-4 space-y-2 text-emerald-100/90">
                <li>• Strategises hub-and-spoke roll-outs and data governance</li>
                <li>• Crafts humanised copy tuned to DBT scoring rubrics</li>
                <li>• Maps validation, regulatory, and sustainability pathways</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Project Backbone
                  </h2>
                  <p className="text-sm text-slate-300">
                    Populate the scaffolding with institution-specific details
                    to personalise the generated narrative.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Step 1
                </span>
              </header>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Field
                  label="Principal Investigator"
                  placeholder="Dr. Aditi Sharma, MBBS, PhD – Translational Oncology"
                  value={formState.principalInvestigator}
                  onChange={(value) => updateField("principalInvestigator", value)}
                />
                <Field
                  label="Lead Institute"
                  placeholder="National Institute of Biomedical Imaging Sciences"
                  value={formState.institute}
                  onChange={(value) => updateField("institute", value)}
                />
                <Field
                  label="Institute Type"
                  placeholder="e.g., Autonomous Institute under DBT"
                  value={formState.instituteType}
                  onChange={(value) => updateField("instituteType", value)}
                />
                <Field
                  label="Hub Location"
                  placeholder="Bengaluru – National Centre for Life Sciences Innovation"
                  value={formState.hubLocation}
                  onChange={(value) => updateField("hubLocation", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Oncology Focus Areas"
                  placeholder="Specify cancer cohorts, unmet diagnostic needs, Indian epidemiological nuances."
                  value={formState.oncologyFocus}
                  onChange={(value) => updateField("oncologyFocus", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Infectious Disease Priorities"
                  placeholder="Detail infectious disease cohorts, surveillance gaps, and imaging phenotypes."
                  value={formState.infectiousFocus}
                  onChange={(value) => updateField("infectiousFocus", value)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Technical & Translational Muscle
                  </h2>
                  <p className="text-sm text-slate-300">
                    Highlight your data, AI, partnership, and policy strengths.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Step 2
                </span>
              </header>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <TextArea
                  className="md:col-span-2"
                  label="Data Assets & Infrastructure"
                  placeholder="Catalogue digital pathology archives, radiology PACS, EMR integrations, sample logistics."
                  value={formState.dataAssets}
                  onChange={(value) => updateField("dataAssets", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="AI & Analytics Strengths"
                  placeholder="Algorithms, explainability stacks, federated capabilities, standards compliance."
                  value={formState.aiStrengths}
                  onChange={(value) => updateField("aiStrengths", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Strategic Partnerships"
                  placeholder="Clinical networks, state health missions, industry collaborators, international alliances."
                  value={formState.partnerships}
                  onChange={(value) => updateField("partnerships", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Clinical Workflow Integration"
                  placeholder="Detail how AI outputs embed into MDTs, reporting, or telemedicine services."
                  value={formState.clinicalIntegration}
                  onChange={(value) => updateField("clinicalIntegration", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Ethics, IP & Governance"
                  placeholder="Consent processes, data localisation, IP sharing, community engagement."
                  value={formState.ethicsPlan}
                  onChange={(value) => updateField("ethicsPlan", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Flagship Differentiators"
                  placeholder="What genuinely sets your network apart at an India scale?"
                  value={formState.differentiator}
                  onChange={(value) => updateField("differentiator", value)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Translation Outlook & Resourcing
                  </h2>
                  <p className="text-sm text-slate-300">
                    Embed sustainability, policy hooks, and people development.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Step 3
                </span>
              </header>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <TextArea
                  className="md:col-span-2"
                  label="Translational & Commercialisation Pathway"
                  placeholder="Market strategy, regulatory roadmap, industry co-development, public health integration."
                  value={formState.translationalPlan}
                  onChange={(value) => updateField("translationalPlan", value)}
                />
                <TextArea
                  className="md:col-span-2"
                  label="Capacity Building Blueprint"
                  placeholder="Training cadence, certifications, community of practice, diversity and inclusion."
                  value={formState.capacityBuilding}
                  onChange={(value) => updateField("capacityBuilding", value)}
                />
                <Field
                  label="Indicative Budget Envelope"
                  placeholder="₹180 – ₹220 Cr across 5 years"
                  value={formState.budget}
                  onChange={(value) => updateField("budget", value)}
                />
                <Field
                  label="Implementation Horizon"
                  placeholder="60 months with staged go-lives every 12 months"
                  value={formState.timeline}
                  onChange={(value) => updateField("timeline", value)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Critical Emphases
                  </h2>
                  <p className="text-sm text-slate-300">
                    Toggle focal areas to tailor narrative emphasis and action
                    plan.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Step 4
                </span>
              </header>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {(
                  Object.keys(priorityConfig) as Array<keyof typeof priorityConfig>
                ).map((key) => {
                  const config = priorityConfig[key];
                  const active = priorityState[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setPriorityState((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                      className={`flex h-full flex-col justify-between rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-emerald-300/60 bg-emerald-400/15"
                          : "border-white/10 bg-white/5 hover:border-emerald-200/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              active
                                ? "bg-emerald-400 text-emerald-950"
                                : "bg-white/10 text-slate-200"
                            }`}
                          >
                            {active ? "●" : "○"}
                          </span>
                          <p className="text-base font-semibold text-white">
                            {config.label}
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-slate-200">
                          {config.description}
                        </p>
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                        Payoff: {config.payoff}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Generated Narrative
                  </h2>
                  <p className="text-sm text-slate-200">
                    Blend these sections into your proposal or export them into
                    writing tools. Content refreshes as you edit the inputs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNarrative}
                  className="rounded-full border border-emerald-300/50 bg-emerald-400/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-100 transition hover:bg-emerald-400/30"
                >
                  {copied ? "Copied" : "Copy All"}
                </button>
              </div>
              <div className="mt-6 space-y-7">
                {sections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-white/5 bg-slate-900/60 p-5"
                  >
                    <h3 className="text-lg font-semibold text-emerald-200">
                      {section.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-100">
                      {section.narrative}
                    </p>
                    <div className="mt-4 space-y-1 text-xs text-slate-400">
                      <p className="font-semibold text-emerald-200/80">
                        Review Prompts
                      </p>
                      {section.prompts.map((prompt) => (
                        <p key={prompt}>• {prompt}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-white">
                90-Day Action Sprint
              </h2>
              <p className="text-sm text-slate-300">
                Operational checkpoints to anchor inception workshops, field
                pilots, and stakeholder confidence.
              </p>
              <div className="mt-6 space-y-5">
                {actionPlan.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <p className="text-base font-semibold text-emerald-200">
                        {action.title}
                      </p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-slate-200">
                        {action.impact}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-200">{action.detail}</p>
                    <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">
                      Lead: {action.lead}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-emerald-500/10 p-8 backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-emerald-100">
                Reviewer Readiness Radar
              </h2>
              <div className="mt-4 grid gap-4 text-sm text-emerald-50/90">
                {guidingQuestions.map((question) => (
                  <div
                    key={question}
                    className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4"
                  >
                    <p>• {question}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-emerald-200/80">
                Use these prompts during internal reviews or advisory board
                sessions to stress-test completeness, feasibility, and
                differentiation before submission.
              </p>
            </div>
          </aside>
        </section>
      </main>
      <footer className="mx-auto mt-12 w-full max-w-7xl px-6 pb-10 text-xs text-slate-400 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center">
          Crafted to keep your proposal human, insightful, and future-ready.
          Continually iterate on the inputs above as you gather stakeholder
          feedback and updated field data.
        </div>
      </footer>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  className,
}: FieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      />
    </label>
  );
}

type TextAreaProps = FieldProps;

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  className,
}: TextAreaProps) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
        {label}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[128px] w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      />
    </label>
  );
}
