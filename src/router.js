import { createRouter, createWebHistory } from "vue-router";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import HeroSection from "./components/HeroSection.vue";
import RoleWorkPage from "./views/RoleWorkPage.vue";
import WorkPage from "./views/WorkPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "introduction", component: HeroSection },
    { path: "/about", name: "about", component: AboutSection },
    { path: "/work", name: "work", component: WorkPage },
    {
      path: "/work/data-analyst",
      name: "work-data-analyst",
      component: RoleWorkPage,
      props: { roleId: "data-analyst" },
    },
    {
      path: "/work/nothing",
      name: "work-nothing",
      component: RoleWorkPage,
      props: { roleId: "nothing" },
    },
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
