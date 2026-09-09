import { createRouter, createWebHistory } from "vue-router";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import WorkPage from "./views/WorkPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "introduction", component: HeroSection },
    { path: "/about", name: "about", component: AboutSection },
    { path: "/work", name: "work", component: WorkPage },
    { path: "/contact", name: "contact", component: ContactSection },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
