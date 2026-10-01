import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles.css";

const app = createApp(App).use(router);

app.directive("reveal", {
  mounted(element) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      element.classList.add("is-visible");
      return;
    }

    element.classList.add("will-reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    element.revealObserver = observer;
    observer.observe(element);
  },
  unmounted(element) {
    element.revealObserver?.disconnect();
  },
});

app.mount("#app");
