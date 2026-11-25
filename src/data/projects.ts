export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  problemSummary: string;
  contributionSummary: string;
  outcomeSummary: string;
  visual: 'architecture' | 'gallery' | 'workflow';
  visualCaption: string;
  visualImages?: ProjectImage[];
  cardImage?: ProjectImage;
  workflow?: { title: string; detail: string }[];
  overview: string;
  problem: string;
  contribution?: string;
  architecture?: string;
  platforms: string[];
  stack: string[];
  decisions?: string;
  security?: string;
  quality?: string;
  challenges?: string;
  outcomes: string;
  statusDetail: string;
  links: { label: string; href: string }[];
  featured: boolean;
}

const tracemarkCover: ProjectImage = {
  src: '/projects/tracemark-cover.webp',
  alt: 'Tracemark project cover with redacted desktop screenshots',
  width: 1600,
  height: 1000,
};

export const projects = [
  {
    slug: 'tracemark',
    name: 'Tracemark',
    category: 'Open-source developer infrastructure',
    status: 'Open source · v0.5.0',
    summary:
      'I build Tracemark to make unfamiliar codebases easier to explore and changes easier to review—with evidence kept close to the source.',
    problemSummary:
      'Understanding symbols, call paths, and change impact takes time in unfamiliar codebases.',
    contributionSummary:
      'I focused on release validation, MCP integration, and GitHub Actions reporting.',
    outcomeSummary:
      'Released as v0.5.0 with CLI, desktop, pull-request, and MCP interfaces.',
    visual: 'architecture',
    visualCaption:
      'A local Rust and Tree-sitter pipeline with a SQLite index and several developer interfaces. Scan counts are specific to the redacted example.',
    cardImage: tracemarkCover,
    visualImages: [
      {
        src: '/projects/tracemark-desktop-welcome.webp',
        alt: 'Tracemark desktop welcome screen explaining local project indexing and evidence labels',
        width: 1200,
        height: 830,
        caption: 'Tracemark desktop welcome screen.',
      },
      {
        src: '/projects/tracemark-desktop-explore-redacted.webp',
        alt: 'Tracemark desktop symbol explorer with private paths and symbols redacted',
        width: 1919,
        height: 1030,
        caption:
          'Redacted symbol exploration from one local scan; the displayed counts describe only that scan.',
      },
    ],
    overview:
      'I build Tracemark as a local-first code intelligence tool. It indexes source files, explores symbols and dependencies, and shows what a change may affect through the CLI, desktop app, GitHub pull-request integration, and MCP.',
    problem:
      'In a large or unfamiliar repository, finding a symbol is only the first step. Developers also need to follow imports and calls, understand the limits of static analysis, and review changes without mistaking an inferred relationship for a verified one.',
    contribution:
      'I worked on release validation on Windows, exercised the MCP integration with Claude Code, and improved GitHub Actions reporting.',
    architecture:
      'A Rust workspace uses Tree-sitter parsers to extract source structure and a local SQLite index to support symbol and dependency queries. The same analysis is exposed through the CLI and desktop app; GitHub Actions and MCP provide integration points.',
    platforms: ['CLI', 'Desktop', 'GitHub Actions', 'MCP'],
    stack: ['Rust', 'Tree-sitter', 'SQLite', 'GitHub Actions', 'MCP'],
    decisions:
      'I keep the index local and label evidence by how it was obtained. Name-matched call links are marked as inferred rather than presented as type-checked facts.',
    security:
      'Core indexing runs locally. The GitHub Action is the explicit online integration and posts a review summary to the pull request.',
    quality:
      'I validated releases with automated tests on Windows and checked MCP integration with Claude Code. Public CI runs formatting, Clippy, and workspace tests on Linux, macOS, and Windows.',
    challenges:
      'Static analysis cannot resolve every dynamic call or import. I make those limits visible in the product so developers can judge the evidence instead of treating every link as certainty.',
    outcomes:
      'The public v0.5.0 release includes CLI and desktop builds for Windows, macOS, and Linux. The repository also documents GitHub pull-request and MCP integrations.',
    statusDetail: 'Active open-source project; v0.5.0 released on 14 November 2026.',
    links: [
      { label: 'GitHub repository', href: 'https://github.com/Gabions256/tracemark' },
      { label: 'Latest release', href: 'https://github.com/Gabions256/tracemark/releases/latest' },
      {
        label: 'Project documentation',
        href: 'https://github.com/Gabions256/tracemark/blob/main/README.md',
      },
      {
        label: 'Quick guide',
        href: 'https://github.com/Gabions256/tracemark/blob/main/docs/guide.md',
      },
    ],
    featured: true,
  },
  {
    slug: 'poultrix-hub',
    name: 'Poultrix Hub',
    category: 'Agricultural technology',
    status: 'Released · Android + web',
    summary:
      'Poultrix Hub brings poultry farm records, practical learning, and a marketplace together.',
    problemSummary:
      'Help poultry farmers keep useful records and find practical tools in one place.',
    contributionSummary:
      'Farm records, learning, and marketplace features across a released product.',
    outcomeSummary:
      'Live on the web and Google Play, with farm, learning, and marketplace features.',
    visual: 'gallery',
    visualCaption: 'A real view of the public Poultrix Hub website.',
    cardImage: {
      src: '/projects/poultrix-hub-cover.webp',
      alt: 'Poultrix Hub editorial project cover',
      width: 1600,
      height: 1000,
    },
    visualImages: [
      {
        src: '/projects/poultrix-hub-website.webp',
        alt: 'Poultrix Hub public website with its farm, learning, and marketplace navigation',
        width: 1607,
        height: 817,
        caption: 'Public product website; the image does not depict the farm-record dashboard.',
      },
    ],
    overview:
      'Poultrix Hub is a released web and Android product for poultry farmers, with farm records, learning, marketplace, and vendor workflows.',
    problem:
      'Farmers can end up tracking flocks, feed, health, and sales in notebooks, phone notes, and chat groups. The product brings those records and related learning and supply discovery into one companion.',
    platforms: ['Android', 'Web'],
    stack: [],
    decisions:
      'The product combines farm records with learning, marketplace, and vendor workflows.',
    outcomes:
      'Poultrix Hub is live at poultrixhub.com and on Google Play. Its public product pages describe farm records, learning, marketplace, subscriptions, and vendor workflows.',
    statusDetail: 'Released web platform and Android app.',
    links: [
      { label: 'Product website', href: 'https://poultrixhub.com' },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=app.poultrixhub.android',
      },
      {
        label: 'GAB product case study',
        href: 'https://www.gabdigitalsystem.com/work/poultrix-hub',
      },
    ],
    featured: true,
  },
  {
    slug: 'sente',
    name: 'Sente',
    category: 'Small-business finance',
    status: 'Released · Windows + Android',
    summary:
      'Sente is an offline-first money tracker that turns approved Mobile Money messages into reviewable records.',
    problemSummary:
      'Small businesses need a clearer picture of payments, invoices, and day-to-day cash flow.',
    contributionSummary:
      'Offline records, payment matching, invoices, and cash-flow forecasting.',
    outcomeSummary:
      'Available as a Windows download and an Android app on Google Play.',
    visual: 'workflow',
    visualCaption:
      'The official Windows product page with transaction-like demo records obscured.',
    cardImage: {
      src: '/projects/sente-cover-redacted.webp',
      alt: 'Sente project cover with transaction-like demo records redacted',
      width: 1600,
      height: 1000,
    },
    visualImages: [
      {
        src: '/projects/sente-windows-product-page-redacted.webp',
        alt: 'Sente Windows product page with its embedded transaction-like demo records redacted',
        width: 1144,
        height: 846,
        caption: 'Official Windows product page; embedded demo records are redacted.',
      },
    ],
    workflow: [
      { title: 'Read messages', detail: 'Supported Mobile Money texts' },
      { title: 'Review entries', detail: 'Check before saving' },
      { title: 'Match payments', detail: 'Money owed and orders' },
      { title: 'Plan ahead', detail: 'Invoices and cash flow' },
    ],
    overview:
      'Sente is an offline-first money tracker for small businesses, available for Windows and Android, with workflows for recording payments, keeping books, and following cash flow.',
    problem:
      'Owners often need to reconcile cash, Mobile Money, invoices, and customer balances without a full finance system. Sente brings those everyday tasks into one place.',
    architecture:
      'The Windows edition stores business records in a local file and works offline. The Android listing says records stay on the phone. On Android, supported Mobile Money messages are read with permission and reviewed before they become records.',
    platforms: ['Windows', 'Android'],
    stack: [],
    decisions:
      'Imported payment messages are reviewable before saving. Invoices and reminders open in WhatsApp or SMS for the user to send, rather than being sent automatically.',
    security:
      'Sente’s privacy policy says business records stay on the user’s device. Optional online features are off until the user chooses them.',
    quality:
      'The payment workflow asks the user to review each imported message before it is saved, keeping the final record under their control.',
    challenges:
      'Matching a message to money owed requires context. The workflow pairs suggested payment details with a review step instead of treating every message as a confirmed transaction.',
    outcomes:
      'Sente is listed on Google Play and available for Windows through the GAB product page. Its published feature set includes offline records, payment matching, invoices, reminders, and cash-flow forecasting.',
    statusDetail: 'Released for Android and Windows.',
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.gabsoftware.sente',
      },
      {
        label: 'Windows product page',
        href: 'https://www.gabdigitalsystem.com/products/sente',
      },
      {
        label: 'Privacy policy',
        href: 'https://www.gabdigitalsystem.com/privacy/sente',
      },
    ],
    featured: true,
  },
  {
    slug: 'fastworkflow-vpn',
    name: 'FastWorkFlow VPN',
    category: 'Android networking',
    status: 'Released · Android',
    summary:
      'Its Google Play listing presents FastWorkFlow VPN as an Android privacy app with VPN, private browsing, and tracker-limiting features.',
    problemSummary:
      'People often switch between separate apps for a VPN, private browsing, and tracker controls.',
    contributionSummary:
      'VPN, browser, and tracker-limiting features described in the Android listing.',
    outcomeSummary:
      'Released for Android; the public listing describes its advertised features.',
    visual: 'gallery',
    visualCaption: 'Approved product artwork and Google Play listing imagery.',
    cardImage: {
      src: '/projects/fastworkflow-vpn-cover.webp',
      alt: 'FastWorkFlow VPN Android product cover',
      width: 1600,
      height: 1000,
    },
    visualImages: [
      {
        src: '/projects/fastworkflow-vpn-product-card.webp',
        alt: 'FastWorkFlow VPN product artwork describing its Android app',
        width: 556,
        height: 481,
        caption: 'Android product listing artwork.',
      },
    ],
    overview:
      'FastWorkFlow VPN is an Android product with VPN, private browsing, and tracker-limiting features described in its Google Play listing.',
    problem:
      'A privacy workflow can become fragmented when a user needs separate tools for a connection, browsing, and tracker controls.',
    platforms: ['Android'],
    stack: [],
    outcomes:
      'The Android app is live on Google Play, with VPN, browser, and tracker-limiting features described in the listing. Server coverage and premium options continue to evolve.',
    statusDetail: 'Android app available on Google Play.',
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.fastworkflow.fastworkflow_vpn',
      },
    ],
    featured: true,
  },
  {
    slug: 'gab-pdf-editor',
    name: 'GAB Office',
    category: 'Document software',
    status: 'Internal testing',
    summary:
      'GAB Office is an Android document workspace in internal testing.',
    problemSummary:
      'Make common document tasks easier to find and start from a phone.',
    contributionSummary:
      'An internal test build with a mobile document workspace.',
    outcomeSummary:
      'An internal test build with a focused document-workspace home screen.',
    visual: 'gallery',
    visualCaption: 'Current GAB Office home screen from the internal test build.',
    cardImage: {
      src: '/projects/gab-office-cover.webp',
      alt: 'GAB Office internal-testing project cover',
      width: 1600,
      height: 1000,
    },
    visualImages: [
      {
        src: '/projects/gab-office-app-home.webp',
        alt: 'GAB Office mobile home screen with document and PDF quick actions',
        width: 486,
        height: 1005,
        caption: 'GAB Office · internal testing.',
      },
    ],
    overview:
      'GAB Office is an Android document app in internal testing.',
    problem:
      'People often need several small tools to open, create, scan, and organize documents on a phone. GAB Office groups these actions in one mobile workspace.',
    platforms: ['Android'],
    stack: [],
    decisions:
      'The current home screen keeps document actions such as Open PDF, Scan, Sign, Merge, and Compress together for quick access.',
    outcomes:
      'The internal build shows a mobile home screen that groups common PDF and document actions.',
    statusDetail: 'Internal testing; not presented as a released product.',
    links: [],
    featured: false,
  },
  {
    slug: 'enterprise-parts-crm',
    name: 'Enterprise Parts CRM',
    category: 'Operations prototype',
    status: 'Prototype · not in production',
    summary:
      'I built an anonymized prototype for equipment-parts inquiries, quotations, follow-ups, and reporting.',
    problemSummary:
      'Keep inquiry and quotation work visible through revisions, reminders, and reporting.',
    contributionSummary:
      'I built the React and TypeScript prototype and automated workflow tests.',
    outcomeSummary:
      'A working prototype; no production deployment or client outcomes are claimed.',
    visual: 'workflow',
    visualCaption: 'A text-based view of the prototype’s inquiry workflow.',
    workflow: [
      { title: 'Inquiry', detail: 'Customer and equipment records' },
      { title: 'Quotation', detail: 'Revisions, VAT, and discounts' },
      { title: 'Follow-up', detail: 'Reminders and next steps' },
      { title: 'Reporting', detail: 'Print and spreadsheet export' },
    ],
    overview:
      'I built a private prototype for equipment-parts operations. It keeps inquiry details, customer and equipment records, quotation revisions, and follow-up work in one workflow.',
    problem:
      'Parts inquiries can involve customer context, equipment details, quote changes, and later follow-ups. The prototype brings those pieces together without claiming a production rollout.',
    contribution:
      'I built the prototype with React, TypeScript, and Vite. Its workflows cover inquiry tracking, quotation revisions, VAT and discounts, reminders, printable quotes, and spreadsheet exports.',
    architecture:
      'The interface centers on an inquiry record and connects it to customer and equipment details, quotation history, and follow-up reminders.',
    platforms: ['Web prototype'],
    stack: ['React', 'TypeScript', 'Vite'],
    decisions:
      'I kept quotation revisions and next steps connected to the original inquiry so the prototype can follow the work from request to report.',
    quality:
      'I used automated tests to validate the inquiry and quotation workflows.',
    challenges:
      'The prototype needed to make revisions and follow-up status visible without exposing client-specific data. I kept the public presentation anonymized and focused on the workflow.',
    outcomes:
      'A working prototype for inquiry and quotation management. It is not a production deployment, and no client identity or outcome is included.',
    statusDetail: 'Private prototype; not production software.',
    links: [],
    featured: false,
  },
] satisfies Project[];

export const engineeringEvidence = [
  {
    title: 'Automated testing',
    description:
      'I validate code and integrations with automated suites and reproducible CI checks.',
    source: 'Tracemark CI',
    href: 'https://github.com/Gabions256/tracemark/blob/main/.github/workflows/rust-ci.yml',
  },
  {
    title: 'Released software',
    description:
      'Poultrix Hub is live on the web and Android; Sente is available for Windows and Android.',
    source: 'Poultrix Hub',
    href: 'https://poultrixhub.com',
  },
  {
    title: 'Open-source releases',
    description:
      'I maintain Tracemark, with public CLI and desktop releases across Windows, macOS, and Linux.',
    source: 'Tracemark releases',
    href: 'https://github.com/Gabions256/tracemark/releases',
  },
  {
    title: 'Cross-platform engineering',
    description:
      'I work across Flutter mobile products and Rust desktop and command-line tooling.',
    source: 'Tracemark repository',
    href: 'https://github.com/Gabions256/tracemark',
  },
  {
    title: 'Technical documentation',
    description:
      'I document setup, commands, integration paths, and the limits of code analysis.',
    source: 'Tracemark guide',
    href: 'https://github.com/Gabions256/tracemark/blob/main/docs/guide.md',
  },
] satisfies { title: string; description: string; source: string; href: string }[];
