import { createRouter, createWebHistory } from "vue-router";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import RoleWorkPage from "./views/RoleWorkPage.vue";
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
    {
      path: "/work/data-analyst",
      name: "work-data-analyst",
      component: RoleWorkPage,
      props: { roleId: "data-analyst" },
    },
    {
      path: "/work/web-full-stack",
      name: "work-web-full-stack",
      component: RoleWorkPage,
      props: { roleId: "web-full-stack" },
    },
    { path: "/work/nothing", redirect: "/work/web-full-stack" },
    {
      path: "/work/computer-vision",
      name: "work-computer-vision",
      component: RoleWorkPage,
      props: { roleId: "computer-vision" },
    },
    { path: "/contact", name: "contact", component: ContactSection },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior: (to) => {
    if (to.hash) return { el: to.hash, top: 42, behavior: "smooth" };
    return { top: 0 };
  },
});

export default router;
