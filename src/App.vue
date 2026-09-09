<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import SidebarNavigation from "./components/SidebarNavigation.vue";

const menuOpen = ref(false);
const route = useRoute();

const closeMenu = () => {
  menuOpen.value = false;
};

const handleKeydown = (event) => {
  if (event.key === "Escape") closeMenu();
};

watch(
  () => route.fullPath,
  () => closeMenu(),
);

watch(menuOpen, (open) => {
  document.body.classList.toggle("menu-open", open);
});

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("menu-open");
});
</script>

<template>
  <div class="site-shell">
    <SidebarNavigation
      :open="menuOpen"
      @toggle="menuOpen = !menuOpen"
      @navigate="closeMenu"
    />
    <button
      v-if="menuOpen"
      class="mobile-nav-backdrop"
      aria-label="Close navigation"
      @click="closeMenu"
    />
    <main id="main-content" class="main-content">
      <RouterView />
    </main>
  </div>
</template>
