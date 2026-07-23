import { Project } from './types';
import surchiLogo from './assets/images/surchi_logo_1784587802150.jpg';
import bushguyLogo from './assets/images/bushguy_logo_1784587816344.jpg';

export const FOUNDER_INFO = {
  name: "Andrew Ifeanyichukwu",
  title: "Founder & CEO",
  avatarUrl: "https://raw.githubusercontent.com/Ifeanyichukwu-N/Ifeanyichukwu-N/refs/heads/main/ifeanyichukwu%20.png",
  bio: "Andrew Ifeanyichukwu is a Nigerian entrepreneur and Web3 founder focused on building intelligent blockchain infrastructure. He is the Founder & CEO of SURCHI, an AI-powered multi-chain DeFi intelligence platform designed to simplify crypto analytics, security, and on-chain decision-making. He also founded BUSHGUY, a Solana community-driven meme token that blends strong branding with long-term ecosystem development. His vision is to create products that make decentralized finance more accessible, transparent, and intelligent.",
  signatureQuote: "Empowering decentralized users through intelligent infrastructure, robust community cohesion, and raw strategic execution.",
  location: "Lagos, Nigeria",
  leadershipPillars: [
    {
      title: "Intelligent Automation",
      description: "Leveraging state-of-the-art AI agents to abstract blockchain complexities and deliver actionable multi-chain analytics.",
      metric: "01"
    },
    {
      title: "Community-Driven Synergy",
      description: "Cultivating organic, highly engaged global ecosystems that blend unique cultural narratives with durable project utilities.",
      metric: "02"
    },
    {
      title: "Multi-Chain Vision",
      description: "Pioneering seamless analytical pipelines across major L1 and L2 blockchains, unlocking deep insights in real time.",
      metric: "03"
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "surchi",
    name: "SURCHI",
    website: "https://www.surchi.xyz",
    logoUrl: surchiLogo,
    description: "SURCHI is an AI-powered multi-chain DeFi intelligence platform that delivers real-time market analytics, token discovery, wallet intelligence, and security insights across major blockchain ecosystems. The platform is built to simplify decentralized finance through intelligent automation, live data, and professional-grade analytics.",
    tags: ["DeFi", "AI Analytics", "Multi-Chain", "Intelligence"],
    metrics: [
      { label: "Platform Focus", value: "Multi-Chain AI Intelligence" },
      { label: "Target Audience", value: "DeFi Traders & Analysts" },
      { label: "Core Security", value: "Real-time Audits & Wallet Intel" }
    ],
    fullDetails: [
      "Real-time wallet tracking and smart money telemetry across Ethereum, Solana, and EVM chains.",
      "Automated smart contract security scanning and threat level detection.",
      "AI-driven token discovery engine mapping high-volume on-chain activity."
    ]
  },
  {
    id: "bushguy",
    name: "BUSHGUY",
    website: "https://bushguy.xyz",
    logoUrl: bushguyLogo,
    description: "BUSHGUY is a Solana-based community meme token inspired by the spirit of resilience, adventure, and wilderness culture. More than a meme coin, it aims to build a recognizable brand supported by an engaged community and future ecosystem utilities.",
    tags: ["Solana", "Community", "Brand Development", "Meme Ecosystem"],
    metrics: [
      { label: "Ecosystem", value: "Solana Network" },
      { label: "Core Ethos", value: "Resilience & Wilderness Culture" },
      { label: "Community", value: "Hyper-Engaged Organic Growth" }
    ],
    fullDetails: [
      "Built on top of Solana's high-speed, low-cost decentralized architecture.",
      "Centered on organic brand development and high-retention meme culture storytelling.",
      "Staged roadmaps targeting immersive interactive initiatives and long-term utility pipelines."
    ]
  }
];
