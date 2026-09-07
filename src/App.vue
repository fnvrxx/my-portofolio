<script setup>
import { ref } from "vue";
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
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import ProjectModal from "./components/ProjectModal.vue";
import ProjectSection from "./components/ProjectSection.vue";
import SidebarNavigation from "./components/SidebarNavigation.vue";

const menuOpen = ref(false);
const selectedProject = ref(null);
const toolIcons = {
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
};
const asset = (name) => new URL(`./thumb-porto/${name}`, import.meta.url).href;
const projectSections = [
  {
    title: "Data Analyst",
    description: "Models, analysis, and mathematical computing.",
    projects: [
      {
        title: "Predict SPP",
        type: "Internship project",
        year: "2024",
        image: asset("predict-spp.png"),
        description:
          "Machine learning model to predict student performance (SPP) for internship placement.",
        tools: ["Python", "Scikit-learn", "Pandas"],
      },
      {
        title: "Mathematical Modeling",
        type: "Research project",
        year: "2024",
        image: asset("pemod.png"),
        description:
          "Mathematical modeling and simulation projects for solving real-world problems.",
        tools: ["Python", "NumPy", "SymPy"],
      },
      {
        title: "Mathematical System",
        type: "Academic computing",
        year: "2024",
        image: asset("adding-matsis.png"),
        description:
          "Development of mathematical computation systems and tools for academic purposes.",
        tools: ["Python", "NumPy", "SymPy"],
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
        title: "MTQ UI/UX Design",
        type: "Product design",
        year: "2024",
        image: asset("uiux-mtq.png"),
        description:
          "User interface and user experience design project for the MTQ competition.",
        tools: ["Figma", "User Research", "Prototyping"],
      },
      {
        title: "EADS AI Prototyping",
        type: "AI product prototype",
        year: "2024",
        image: asset("in-eads.png"),
        description:
          "An interface prototype for a generative AI concept developed for a PKM competition.",
        tools: ["Figma", "Prototyping"],
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
      },
    ],
  },
];
const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <div class="site-shell">
    <SidebarNavigation
      :open="menuOpen"
      @toggle="menuOpen = !menuOpen"
      @navigate="closeMenu"
    />
    <main id="top" class="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectSection
        :sections="projectSections"
        :tool-icons="toolIcons"
        @select="selectedProject = $event"
      />
      <ContactSection />
    </main>
    <ProjectModal
      :project="selectedProject"
      :tool-icons="toolIcons"
      @close="selectedProject = null"
    />
  </div>
</template>
