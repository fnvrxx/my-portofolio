import {
  BarChart3,
  Braces,
  BrainCircuit,
  Code2,
  Database,
  Eye,
  Figma,
  Image,
  ScanLine,
} from "lucide-vue-next";

export const toolIcons = {
  Laravel: "/tool-icons/laravel.svg",
  "Burp Suite": ScanLine,
  Python: Code2,
  "Scikit-learn": BrainCircuit,
  Pandas: BarChart3,
  Figma,
  "User Research": Eye,
  Prototyping: Figma,
  NumPy: Database,
  SymPy: Braces,
  OpenCV: Image,
  "Computer Vision": Eye,
  "Data Visualization": BarChart3,
  "Data Scraping": Database,
  "Business Analysis": BarChart3,
  "Predictive Modeling": BrainCircuit,
  "Analytical Thinking": BrainCircuit,
  "Mathematical Statistics": BarChart3,
  "Simulation Techniques": Braces,
};

const asset = (name) => new URL(`../thumb-porto/${name}`, import.meta.url).href;
const documentAsset = (name) =>
  new URL(`../doc/${name}`, import.meta.url).href;
const competitionAsset = (name) =>
  new URL(`../competition/${name}`, import.meta.url).href;

export const projectSections = [
  {
    title: "Data Analyst",
    description:
      "Turning data into clear business insights, practical decisions, and measurable opportunities.",
    projects: [
      {
        title: "Surabaya Kos Market Analysis",
        type: "Data analytics case study",
        year: "2026",
        image: asset("analys-pasar-kos-sby.png"),
        description:
          "Market analysis of 284 unique kos listings from 9,009 scraped records across Surabaya and nearby areas. The study found a median rent of Rp1.55 million, identified AC as the strongest price differentiator, and mapped Budget, Mid-Range, and Premium segments by facilities and location.",
        tools: ["Python", "Pandas", "Data Visualization"],
        document: documentAsset("Analisis_Pasar_Kos_Surabaya.pdf"),
      },
      {
        title: "DAWG-ID",
        type: "Interactive analytics platform",
        year: "2026",
        image: asset("dawg-id.png"),
        description:
          "Dynamic Assessment of Weakness & Growth for exploring how Indonesian provinces respond to macroeconomic shocks. The platform combines scenario-based vulnerability scores, an interactive map, datasets, predictions, policy briefs, and technical reporting in one analytical workspace.",
        tools: ["Python", "Pandas", "Data Visualization"],
        url: "https://dawg-id-portal.vercel.app/",
      },
      {
        title: "Predict SPP",
        type: "Internship project at SEVIMA",
        year: "2025",
        image: asset("predict-spp.png"),
        description:
          "An internship analysis for SEVIMA's K-12 market expansion that estimates private-school tuition in Yogyakarta to identify prospective customers. From 7,601 collected school records, the study prepared 523 eligible schools and 105 labeled samples; LightGBM achieved the best test result with an R² of 0.69 while revealing overfitting and underestimation at higher tuition levels.",
        tools: [
          "Python",
          "Pandas",
          "Data Scraping",
          "Business Analysis",
          "Predictive Modeling",
        ],
        document: documentAsset("PRESENTASI DATA ANALYST.pdf"),
      },
      {
        title: "SPBU Queueing System Analysis",
        type: "Operations research study",
        year: "2024",
        image: asset("analisis-antrian-spbu.png"),
        description:
          "A G/G/1 queueing analysis based on direct observation of motorcycle service at SPBU Keputih, Surabaya. The study found low average waiting time under normal conditions, but 97.63% server utilization leaves little spare capacity and makes the system vulnerable to traffic surges.",
        tools: [
          "Analytical Thinking",
          "Mathematical Statistics",
          "Simulation Techniques",
        ],
        document: documentAsset("PPT SURVEI ANALISIS ANTRIAN.pdf"),
      },
    ],
  },
  {
    title: "Full Stack Developer",
    description: "Digital products, web systems, and interfaces.",
    projects: [
      {
        title: "OMITS 17th Website",
        type: "Web development",
        year: "2024",
        image: asset("omits17th.png"),
        description:
          "Website for OMITS, a mathematics competition platform at Institut Teknologi Sepuluh Nopember.",
        tools: ["Laravel"],
      },
      {
        title: "Khabbab — Personalized Quranic Learning",
        type: "1st Honorable Mention · MTQ ITS",
        year: "2024",
        image: asset("uiux-mtq.png"),
        description:
          "An AI-assisted mobile learning concept that helps users improve Quranic recitation through pronunciation feedback, gamified practice, learning recommendations, video lessons, and a community forum. The design earned 1st Honorable Mention in the Quran Application Design category at MTQ ITS 2024.",
        tools: ["Figma", "User Research", "Prototyping"],
        document: documentAsset(
          "PROPOSAL_JARMED_Khabbab_ Personalized Quranic Learning.pdf",
        ),
        documentLabel: "View proposal",
        certificate: competitionAsset("sertif.png"),
      },
      {
        title: "EADS AI Prototyping",
        type: "AI product prototype",
        year: "2024",
        image: asset("in-eads.png"),
        description:
          "An interface prototype for a generative AI concept developed for a PKM competition.",
        tools: ["Figma", "Prototyping"],
        url: "https://www.figma.com/proto/m21wkVJ8Lr9ZyB9lz7Xz7B/PKM?node-id=434-2&p=f&viewport=-2127%2C1301%2C0.25&t=sUvFDDiyvXabCXNB-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=434%3A2&page-id=57%3A2",
        urlLabel: "View Figma prototype",
      },
    ],
  },
  {
    title: "Computer Vision",
    description: "Image processing and object detection exploration.",
    projects: [
      {
        title: "OpenCV Projects",
        type: "Computer vision",
        year: "2024",
        image: asset("opencv.png"),
        description:
          "Computer vision projects using OpenCV for image processing and object detection.",
        tools: ["Python", "OpenCV", "Computer Vision"],
        url: "https://github.com/fnvrxx/Face-recognition-expression",
        urlLabel: "View GitHub repository",
      },
    ],
  },
];
