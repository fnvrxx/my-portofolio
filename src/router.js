import { createRouter, createWebHistory } from "vue-router";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import WorkPage from "./views/WorkPage.vue";
import WritingPage from "./views/WritingPage.vue";
import { projectSections } from "./data/portfolio";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "introduction", component: HeroSection },
    { path: "/experience", name: "experience", component: ExperienceSection },
    { path: "/about", redirect: "/experience" },
    { path: "/work", name: "work", component: WorkPage, meta: { work: true } },
    ...projectSections.map((section) => {
      const category = section.slug || section.id;
      return {
        path: `/${category}`,
        name: `work-${category}`,
        component: WorkPage,
        props: { category },
        meta: { work: true },
      };
    }),
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
  scrollBehavior: (to, from) => {
    if (to.hash) return { el: to.hash, top: 42, behavior: "smooth" };
    if (to.meta.work && from.meta.work) return false;
    return { top: 0 };
  },
});

export default router;
