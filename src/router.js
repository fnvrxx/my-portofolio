import { createRouter, createWebHistory } from "vue-router";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import WorkPage from "./views/WorkPage.vue";
import WritingPage from "./views/WritingPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "introduction", component: HeroSection },
    { path: "/experience", name: "experience", component: ExperienceSection },
    { path: "/about", redirect: "/experience" },
    { path: "/work", name: "work", component: WorkPage },
    {
      path: "/gitbook",
      name: "gitbook",
      component: WritingPage,
      props: { collection: "gitbook" },
    },
    {
      path: "/medium",
      name: "medium",
      component: WritingPage,
      props: { collection: "medium" },
    },
    { path: "/work/:category", redirect: "/work" },
    { path: "/contact", name: "contact", component: ContactSection },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior: (to) => {
    if (to.hash) return { el: to.hash, top: 42, behavior: "smooth" };
    return { top: 0 };
  },
});

export default router;
