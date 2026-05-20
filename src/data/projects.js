/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} name
 * @property {boolean} flagship
 * @property {string} role
 * @property {string} start
 * @property {string} end - "Mon YYYY" or "ongoing" for active projects.
 * @property {string} summary
 * @property {string} problem
 * @property {string} solution
 * @property {string[]} stack
 * @property {{label: string, url: string}[]} [links]
 */

/**
 * @typedef {Object} Section
 * @property {string} slug
 * @property {string} title
 * @property {Project[]} projects
 */

const freeze = (sections) =>
  Object.freeze(
    sections.map((s) =>
      Object.freeze({
        ...s,
        projects: Object.freeze(
          s.projects.map((p) =>
            Object.freeze({
              ...p,
              stack: Object.freeze([...p.stack]),
              ...(p.links
                ? { links: Object.freeze(p.links.map((l) => Object.freeze({ ...l }))) }
                : {}),
            }),
          ),
        ),
      }),
    ),
  );

/** @type {readonly Section[]} */
export const PROJECT_SECTIONS = freeze([
  {
    slug: 'ai-agents',
    title: 'AI Agents & Chat Platforms',
    projects: [
      {
        slug: 'multi-agent-hub',
        name: 'Centralized Multi-Agent Hub & Artifact Platform',
        flagship: true,
        role: 'architect + full stack core dev',
        start: 'Jul 2025',
        end: 'May 2026',
        summary:
          'A centralized hub where users browse and interact with every agent and MCP the team has developed, with persistent history, file upload, RBAC, and artifact management.',
        problem:
          "The team had built dozens of specialized AI agents and MCP servers across company intelligence, credit ratings (Fitch/Moody's/S&P), value investing, Italian economic data, procurement, and document analysis — but they were scattered across separate repos, demos, and environments, with no single place to discover or use them, and no shared layer for managing the artifacts they produced.",
        solution:
          'A centralized hub where users browse and interact with every agent and MCP the team has developed, both production and R&D. Supports persistent conversation history, file upload, in-context memory shared across agents, RBAC, an admin panel to register agents without code deploys, and artifact management (create, edit, share) exposed via both UI and API. Architecturally combines Vercel AI SDK streaming primitives with LangGraph orchestration — keeping fast token streaming on the frontend while running multi-step graph logic on the backend.',
        stack: [
          'Next.js 15',
          'TypeScript',
          'Vercel AI SDK',
          'LangGraph',
          'PostgreSQL',
          'Redis',
          'Elasticsearch',
          'Langfuse',
        ],
      },
      {
        slug: 'catalog-text-to-sql',
        name: 'Catalog-Aware Text-to-SQL Agent over OpenMetadata',
        flagship: true,
        role: 'architect + core dev',
        start: 'Nov 2023',
        end: 'May 2026',
        summary:
          'A graph-based AI agent that searches an OpenMetadata catalog of ~800 tables and generates SQL for grounded answers, serving ~30 queries/day.',
        problem:
          'Data analysts, marketing teams, and LLM-powered tools had no way to discover or query the internal catalog of ~800 tables, glossary entries, and data products. Finding the right dataset required knowing its name; getting answers meant writing SQL by hand.',
        solution:
          'A graph-based AI agent that searches the full OpenMetadata catalog (ingested into Elasticsearch with LLM-enriched descriptions and semantic embeddings), performs multi-hop retrieval to find relevant tables, then generates and runs SQL for grounded answers. Also answers questions over the catalog metadata itself (lineage, ownership, definitions). Surfaced through the central agent hub at ~30 queries/day — the de-facto entrypoint for data questions internally, and a key tool during the ION merger to navigate the combined data estate.',
        stack: [
          'Python 3.13',
          'LangGraph',
          'LangChain',
          'Elasticsearch',
          'OpenMetadata',
          'PostgreSQL',
          'Langfuse',
          'Azkaban',
        ],
      },
      {
        slug: 'persona-financial-agents',
        name: 'Persona-Based Financial Analyst Agents',
        flagship: true,
        role: 'architect + AI core dev',
        start: 'Mar 2025',
        end: 'Apr 2026',
        summary:
          "AI personas (Howard Marks, Warren Buffett, Moody's) for analyst-grade financial Q&A with corpus RAG, web search, and live portfolio data access.",
        problem:
          "Analysts needed well-known economist and credit analyst personas (Howard Marks, Warren Buffett, Moody's, etc.) for grounded financial and company-intelligence Q&A, but no tooling existed to deliver stylistically consistent, sourced answers tied to each expert's actual writings and to live portfolio positions.",
        solution:
          'Each persona has its full body of writings indexed and runs RAG over its own corpus, web search when needed, and citations that link every claim back to the source paragraph. A text-to-SQL sub-agent exposed as a tool gives the personas live access to customer portfolio data, so a question like "how is my portfolio exposed to X?" is answered against the real positions rather than generic advice.',
        stack: [
          'Python',
          'FastAPI',
          'LangGraph',
          'OpenAI',
          'PostgreSQL',
          'Elasticsearch',
          'Langfuse',
        ],
      },
      {
        slug: 'company-intel-orchestrator',
        name: 'Cross-Product Multi-Agent Orchestrator API',
        flagship: true,
        role: 'AI core dev',
        start: 'Nov 2024',
        end: 'Nov 2025',
        summary:
          'A multi-agent backend with 9 execution paths routing queries across all company-intelligence products via an LLM orchestrator with real-time WebSocket streaming.',
        problem:
          'An R&D effort to build a single "superagent" sitting on top of all company-intelligence products — one orchestrator agent that could answer any market or company question by delegating to the right tools and sub-agents, removing the need for analysts to learn each product\'s API or UI.',
        solution:
          'A multi-agent backend (fork of Perplexica) with 9 specialized execution paths routed by an LLM orchestrator. Integrates four proprietary APIs with web search, a PostgreSQL market database, and SearxNG. Responses stream in real-time via WebSocket; conversation state persists across sessions. Designed to work with both cloud and locally-run models.',
        stack: [
          'TypeScript',
          'Node.js',
          'Express',
          'Next.js',
          'Python',
          'LangGraph',
          'LangChain',
          'SearxNG',
          'PostgreSQL',
          'FAISS',
          'Elasticsearch',
          'Langfuse',
          'OpenTelemetry',
        ],
      },
      {
        slug: 'company-intel-mcp-server',
        name: 'MCP Server for Company-Intelligence Database',
        flagship: false,
        role: 'dev',
        start: 'Aug 2025',
        end: 'May 2026',
        summary:
          'A plug-and-play MCP server exposing company search, detail extraction, and aggregated analytics as AI-native tools, with two auth variants and automated behavioral tests.',
        problem:
          'AI agents (Claude Desktop, custom LLM tools) needed structured access to a company-intelligence database without writing API integrations from scratch, while still respecting authentication and per-client data scope rules.',
        solution:
          'A plug-and-play MCP server that exposes four tools covering company search, detail extraction, and aggregated analytics. Ships in two variants — extended/authenticated for internal use and open/limited for public clients — with per-request cost tracking, full observability, and an automated behavioral test suite that simulates real agent interactions to catch protocol-level regressions before release. Compatible with any AI client that speaks the Model Context Protocol.',
        stack: ['Python 3.13', 'FastMCP', 'httpx', 'OpenTelemetry', 'Langfuse'],
      },
    ],
  },
  {
    slug: 'nlp',
    title: 'NLP & Text Classification',
    projects: [
      {
        slug: 'sdg-text-classifier',
        name: 'Multilingual Multi-Label SDG Classifier',
        flagship: true,
        role: 'architect + core dev',
        start: 'Mar 2022',
        end: 'Feb 2026',
        summary:
          'A production REST API classifying text across all 17 UN SDGs with explainability outputs, running at ~100k classifications/year for four years.',
        problem:
          'Organizations needed to automatically tag documents, reports, and company descriptions against the 17 UN Sustainable Development Goals — a task previously requiring manual review by policy experts and prohibitively expensive at corporate-database scale.',
        solution:
          "Originally built as a master's thesis project (encoder-only XLM-RoBERTa with a multilingual classification head), now a production REST API and React demo UI that classifies arbitrary text across all 17 SDGs with explainability outputs (keywords, sub-target alignment, verbatim source quotes). Running in production for four years at ~100k classifications per year, and consumed internally as a microservice by other enrichment pipelines — most notably the country-wide SDG tagging pipeline for sustainability reports.",
        stack: [
          'Python',
          'FastAPI',
          'PyTorch',
          'Hugging Face Transformers',
          'scikit-learn',
          'React',
        ],
      },
      {
        slug: 'long-text-llm-classification',
        name: 'Long-Document Classification via Frozen LLM Feature Extractor',
        flagship: false,
        role: 'core dev',
        start: 'Aug 2023',
        end: 'Nov 2023',
        summary:
          'A frozen LLaMA-2-7B used as a feature extractor with a linear classification head for full-document SDG classification without truncation.',
        problem:
          'Standard transformer classifiers truncate long documents, losing the context most relevant to multi-label tasks like SDG classification — where the signal can sit anywhere across a 50-page sustainability report.',
        solution:
          'Started as a solo research exploration: a frozen LLaMA-2-7B used as a feature extractor with a lightweight linear classification head on top, letting full-length documents flow through the model without chunking or truncation. The architecture moved from notebook into production and now serves as the long-document classification layer consumed by the country-wide SDG tagging pipeline and other downstream pipelines.',
        stack: ['Python 3.10', 'PyTorch', 'Hugging Face Transformers', 'Weights & Biases'],
      },
    ],
  },
  {
    slug: 'search',
    title: 'Search & Semantic Infrastructure',
    projects: [
      {
        slug: 'nl-to-api-library',
        name: 'Natural-Language-to-API Library for Company-Intelligence Database',
        flagship: true,
        role: 'architect + core dev',
        start: 'Sep 2023',
        end: 'May 2026',
        summary:
          'A Python library and FastAPI service turning free-text questions into validated API query objects via LLM intent classification and FAISS/Elasticsearch enum resolution.',
        problem:
          'LLM-powered products needed to query a company-intelligence database without forcing every engineer to learn its complex API parameter schema, and Italian natural-language queries had to be reliably translated into valid structured API calls.',
        solution:
          'A production Python library and FastAPI service that turns free-text questions into validated API query objects via a multi-step pipeline (LLM intent classification → per-field extraction → FAISS/Elasticsearch/LLM resolution for high-cardinality enums like NACE → serialized output). Ships with input-validation guardrails and an evaluation framework that tracks accuracy as the pipeline evolves.',
        stack: [
          'Python 3.12',
          'LangChain',
          'OpenAI',
          'FAISS',
          'PostgreSQL (pgvector)',
          'Elasticsearch',
          'FastAPI',
          'Langfuse',
        ],
      },
    ],
  },
  {
    slug: 'documents',
    title: 'Document Intelligence',
    projects: [
      {
        slug: 'sector-research-rag-api',
        name: 'Streaming RAG API & Reusable Library for Italian Sector Research',
        flagship: true,
        role: 'core dev',
        start: 'Jun 2023',
        end: 'May 2026',
        summary:
          'A production API exposing a reusable async Python library for streaming RAG Q&A over sector-analysis reports with bilingual citation extraction and Redis-cached retrieval.',
        problem:
          'Analysts querying Italian industry-sector research reports needed natural-language Q&A with grounded answers, table extraction, and source citations — without every consuming service rebuilding the retrieval stack from scratch.',
        solution:
          'Deployed as a production API that exposes a reusable async Python library. Provides streaming RAG Q&A over sector-analysis reports with bilingual (IT/EN) citation extraction and Redis-cached retrieval.',
        stack: ['Python 3.12', 'LangChain', 'OpenAI', 'Elasticsearch', 'Redis'],
      },
      {
        slug: 'fund-report-ocr-benchmark',
        name: 'OCR/VLM Benchmark & Extraction Pipeline for Italian Fund Reports',
        flagship: true,
        role: 'architect + core dev',
        start: 'Apr 2026',
        end: 'May 2026',
        summary:
          'A benchmark platform for competing OCR/VLM engines on scanned Italian fund-report PDFs, with a custom quality-index evaluator, Streamlit QA UI, and key-information extraction layer.',
        problem:
          'Italian fund management reports arrive as scanned PDFs that traditional OCR struggles with, and existing tools offered no principled way to compare candidate engines on production-representative inputs — for a pipeline that needs to handle ~80k PDFs every year.',
        solution:
          "A benchmark platform that runs competing OCR and VLM-based engines (IBM Docling, DeepSeek-OCR-2, dots.mocr, LightOnOCR, FalconOCR) served locally through vLLM for GPU inference. Beyond raw accuracy, a custom quality-index evaluation scores each model's output and surfaces low-confidence pages in a Streamlit QA UI for manual review. On top of the benchmark, an extraction layer pulls key information and AI-generated summaries from the selected pipeline.",
        stack: ['Python 3.14', 'vLLM', 'Docling', 'PyMuPDF', 'rapidfuzz', 'tiktoken', 'Streamlit'],
      },
      {
        slug: 'public-tender-extraction',
        name: 'LLM Extraction Pipeline for Italian Public-Tender Documents',
        flagship: true,
        role: 'architect + core dev',
        start: 'Sep 2024',
        end: 'May 2025',
        summary:
          'A multi-step production LLM pipeline extracting ~20 structured fields from Italian public tender attachments as normalized JSON, covering >200k documents/year.',
        problem:
          "Italian public tender attachments (disciplinari di gara) bury ~20 distinct qualification requirements inside very long, unstructured PDFs. Extracting them manually for a public-procurement platform was slow, error-prone, and didn't scale to the >200k attachments published every year.",
        solution:
          'A multi-step production LLM pipeline that reads each attachment, classifies the document type, and extracts ~20 structured fields — certifications, SOA requirements, financial guarantees, award criteria, deadlines, and more — as normalized JSON for downstream consumption. The pipeline is split into multiple stages because documents are long and field-specific prompting on chunked context outperforms single-shot extraction. Includes semantic search over the corpus so analysts can also query past tenders by content rather than metadata alone.',
        stack: ['Python 3.12', 'LangChain', 'OpenAI', 'Elasticsearch', 'PostgreSQL', 'Langfuse'],
      },
      {
        slug: 'csv-diff-tool',
        name: 'Semantic CSV Diff Tool for LLM-Extraction Validation',
        flagship: false,
        role: 'architect + core dev',
        start: 'Oct 2024',
        end: 'Jul 2025',
        summary:
          'A diff tool for CSV datasets with exact, numerical-tolerance, and LLM semantic-equivalence strategies, available as CLI and Streamlit UI with persisted sessions.',
        problem:
          "The public-tender extraction pipeline and similar LLM extraction pipelines produced thousands of structured records that had to be validated against a ground-truth dataset — comparing them column-by-column by hand was the only available option, and didn't scale beyond small samples.",
        solution:
          'A diff tool for CSV datasets that runs column-by-column comparisons under three configurable strategies — exact match, numerical tolerance (±10% by default), and LLM-based semantic equivalence for free-text fields — and produces per-column correctness metrics with mismatch breakdowns. Available as a CLI for batch validation runs and a Streamlit UI for interactive exploration, with persisted sessions so prior comparisons can be revisited. Used in practice to validate the public-tender extraction pipeline.',
        stack: ['Python 3.13', 'pandas', 'LangChain', 'Elasticsearch', 'Streamlit', 'Click'],
      },
    ],
  },
  {
    slug: 'pipelines',
    title: 'Data Pipelines & ETL',
    projects: [
      {
        slug: 'sdg-tagging-pipeline',
        name: 'End-to-End SDG Tagging Pipeline for Italian Sustainability Disclosures',
        flagship: false,
        role: 'architect + core dev',
        start: 'Apr 2023',
        end: 'Dec 2025',
        summary:
          'An end-to-end batch pipeline discovering, ingesting, and SDG-classifying Italian corporate sustainability reports, re-run twice a year in production.',
        problem:
          "Italian listed companies publish mandatory non-financial disclosures (DNF / sustainability reports) every year, but they're scattered across corporate websites and a sector observatory in dozens of unstandardized PDF formats — tagging them against the 17 UN SDGs required manual analyst work and didn't scale to a country-wide corporate database.",
        solution:
          'An end-to-end batch pipeline, still in production and re-run twice a year, that discovers DNF PDFs via SERP API and the official observatory, ingests and chunks them, classifies their content across all 17 SDGs by calling the SDG classifier microservice, matches every report back to its company in the company-intelligence database, and publishes scored results to its custom data collections. Designed to resume from arbitrary stage failures so re-runs only pay for the missing work, and orchestrated via Azkaban for the scheduled refresh cycle.',
        stack: [
          'Python 3.10',
          'LangChain',
          'Chroma',
          'Elasticsearch',
          'PostgreSQL',
          'SERP API',
          'Azkaban',
        ],
      },
      {
        slug: 'public-procurement-score',
        name: 'Public-Procurement Dependence Score for Italian Companies',
        flagship: false,
        role: 'core dev',
        start: 'Oct 2022',
        end: 'May 2025',
        summary:
          'A scheduled pipeline computing a public-procurement dependence score for Italian companies, published alongside each company profile in production.',
        problem:
          "Credit and risk teams had no quantitative way to gauge how much of an Italian company's business depends on public-sector contracts — a signal that materially affects creditworthiness but was previously left to analyst judgment.",
        solution:
          "A scheduled production pipeline that joins public procurement contract data with each company's revenue history (filling gaps via a simple LinearRegression interpolation) and computes a rilevanza_committenza_pubblica score, scoped to the subset of the ~6M companies in the company-intelligence database with measurable PA exposure. Scores are published to custom data collections and surfaced inside the product alongside the rest of the company profile.",
        stack: ['Python 3.10', 'scikit-learn', 'pandas', 'Elasticsearch', 'PostgreSQL', 'Azkaban'],
      },
    ],
  },
  {
    slug: 'research',
    title: 'ML Research & Experimentation',
    projects: [
      {
        slug: 'llm-fine-tuning',
        name: 'Comparative LLM Fine-Tuning Study on Italian Domain Data',
        flagship: false,
        role: 'core dev',
        start: 'Mar 2024',
        end: 'Jul 2025',
        summary:
          'Reproducible training scripts for Llama-2, Mistral, Falcon, and Gemma sweeping LoRA/DoRA and quantization configs on Italian-language datasets, tracked on Weights & Biases.',
        problem:
          'The team needed empirical answers on which fine-tuning strategies — LoRA vs. DoRA, 4-bit vs. 8-bit quantization, SFTTrainer vs. raw Trainer, single-GPU vs. FSDP — actually pay off on Italian-language, domain-specific data, before any of it could be considered for production use.',
        solution:
          'A reproducible research repo of training scripts and notebooks that fine-tunes Llama-2, Mistral, Falcon, and Gemma on two internal datasets (Italian cybersecurity-market Q&A and address extraction), sweeping quantization and adapter configurations and tracking every run on Weights & Biases for side-by-side comparison. Outcome stayed as internal reference material — a shared playbook the team can pull from when fine-tuning eventually moves into a real pipeline.',
        stack: [
          'Python 3.10',
          'PyTorch',
          'Hugging Face Transformers',
          'PEFT (LoRA/DoRA)',
          'TRL',
          'BitsAndBytes',
          'Unsloth',
          'Accelerate',
          'Weights & Biases',
        ],
      },
      {
        slug: 'llm-inference-benchmarks',
        name: 'Self-Hosted LLM Throughput/Latency Benchmark Suite',
        flagship: false,
        role: 'core dev',
        start: 'May 2024',
        end: 'Jun 2024',
        summary:
          'vLLM vs Hugging Face benchmarks across quantization, batch size, and speculative decoding — headline: vLLM+AWQ sustains ~875 tokens/sec vs ~192 tokens/sec for HF 8-bit.',
        problem:
          'Before committing the team to a serving stack for self-hosted LLMs, we needed hard numbers — not vendor benchmarks — on throughput, latency, and GPU memory across realistic configurations: batch size, quantization (AWQ vs. 8-bit vs. none), prefix caching, speculative decoding, and runtime LoRA adapter switching.',
        solution:
          "A reproducible benchmark suite that exercises vLLM and Hugging Face Transformers under matched conditions. Headline result: vLLM with AWQ sustains ~875 tokens/sec against ~192 tokens/sec for HF 8-bit (~4.5× speedup). vLLM has since become the team's default inference engine for self-hosted models, including the GPU-served OCR/VLM stack for fund-report extraction. Bundled with deployment recipes for multi-GPU serving via Ray tensor parallelism.",
        stack: [
          'Python 3.11',
          'vLLM',
          'PyTorch',
          'Hugging Face Transformers',
          'PEFT',
          'BitsAndBytes',
          'Ray',
        ],
      },
    ],
  },
  {
    slug: 'tooling',
    title: 'Developer Tooling & Infrastructure',
    projects: [
      {
        slug: 'langfuse-freeze',
        name: 'Langfuse Freeze (Python + TypeScript, OSS)',
        flagship: false,
        role: 'core dev',
        start: 'Jan 2025',
        end: 'May 2026',
        summary:
          'Twin Python + TypeScript libraries that snapshot Langfuse prompts to disk at startup and fall back to the local cache when Langfuse is unreachable.',
        problem:
          'Production AI services rely on Langfuse-hosted prompts fetched at runtime — a Langfuse outage immediately breaks every dependent inference pipeline.',
        solution:
          'A small open-source library, shipped in matching Python (PyPI) and TypeScript (npm) implementations, that wraps the official Langfuse SDK to snapshot every used prompt to disk at startup and transparently fall back to the local cache when Langfuse is unreachable. Both packages also ship a CLI suitable for Dockerfile or k8s init-container use. Adopted by other team services to harden their inference paths against Langfuse downtime.',
        stack: [
          'Python 3.11–3.13',
          'TypeScript',
          'Node.js',
          'Langfuse SDK',
          'pytest',
          'Vitest',
          'GitHub Actions',
        ],
      },
      {
        slug: 'live-your-own-life',
        name: 'Live Your Own Life',
        flagship: true,
        role: 'solo developer (side project)',
        start: 'Oct 2024',
        end: 'Jan 2026',
        summary:
          'A full-stack platform for an Italian life coach to sell digital content and capacity-limited coaching offerings with Stripe payments and Flask-Admin management.',
        problem:
          'Built outside day-job hours for Sofia Riggi, an Italian life coach who needed a branded platform to sell digital content (video journeys, podcasts, workbooks) and run capacity-limited coaching offerings (live events, group journeys, 1-on-1 sessions) directly to her audience, with first-party payments and access control.',
        solution:
          'A production full-stack web application designed, built, and operated end-to-end. Users browse, purchase, and access products and live sessions; Stripe webhooks atomically confirm payment and grant access in one transactional step. Capacity-limited offerings include waiting-list support, and admins can grant entitlements manually. A Flask-Admin panel lets the client run the platform without engineering involvement, and the React frontend lives in a Yarn-workspace monorepo that shares Pydantic-derived types with the backend.',
        stack: [
          'Python 3.12',
          'Flask 3',
          'SQLAlchemy 2',
          'Flask-Admin',
          'Supabase',
          'Stripe',
          'Zappa (AWS Lambda)',
          'TypeScript',
          'React',
          'Vite',
          'TanStack Query',
          'Tailwind CSS 4',
          'Radix UI',
          'Sentry',
        ],
      },
      {
        slug: 'llm-elasticsearch-cache',
        name: 'LLM Elasticsearch Cache (archived)',
        flagship: false,
        role: 'core dev',
        start: 'Feb 2024',
        end: 'Feb 2025',
        summary:
          'A drop-in LangChain-compatible Elasticsearch cache for LLM completions and embeddings, later contributed upstream and merged into LangChain.',
        problem:
          'LangChain shipped without a production-ready Elasticsearch-backed cache for LLM chat completions and embeddings, which meant every internal project ended up rebuilding the same caching layer against an existing Elasticsearch cluster.',
        solution:
          'A drop-in LangChain-compatible library — ElasticsearchCache for chat models and ElasticsearchStore for embeddings — published on PyPI. Supports index aliases for ILM-based retention, customizable document building so cached LLM output is full-text searchable, and extensible subclassing for vector search over cached embeddings. The implementation was later contributed upstream and merged into LangChain itself (LangChain docs), after which the standalone package was archived.',
        stack: ['Python', 'LangChain', 'Elasticsearch'],
        links: [
          {
            label: 'LangChain docs',
            url: 'https://python.langchain.com/v0.2/docs/integrations/llm_caching/#elasticsearch-cache',
          },
        ],
      },
    ],
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    projects: [
      {
        slug: 'company-llm-gateway',
        name: 'Company-Wide LLM Gateway & Observability Stack',
        flagship: true,
        role: 'application owner (with SysOps)',
        start: 'Jan 2025',
        end: 'ongoing',
        summary:
          'A self-hosted LiteLLM + Langfuse stack fronting all internal LLM traffic with per-team cost tracking, model routing, fallback rules, and Grafana dashboards.',
        problem:
          "Once the AI team's services multiplied, each one was independently calling OpenAI/Anthropic/local-model endpoints with its own auth, retry logic, and observability — making cost attribution, model swaps, and rate-limit handling nearly impossible to manage at the company level.",
        solution:
          'A self-hosted stack that now sits in front of all internal LLM traffic. Co-owned with SysOps (who run the underlying infra) while I own the application layer: model and provider mapping, per-team and per-project cost tracking, fallback and rate-limit rules, prompt-management policies in Langfuse, and custom Grafana dashboards for both systems. Adding a new model or routing rule is now a config change rather than per-service code.',
        stack: ['LiteLLM', 'Langfuse', 'PostgreSQL', 'Redis', 'Grafana', 'Kubernetes'],
      },
    ],
  },
]);
