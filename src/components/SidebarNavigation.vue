<script setup>
import { Menu, X } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

defineProps({ open: Boolean });
const emit = defineEmits(["toggle", "navigate"]);
const route = useRoute();

const primaryNavigation = [
  { label: "Introduction", to: "/" },
  { label: "Experience", to: "/experience" },
];
</script>

<template>
  <aside id="site-navigation" class="sidebar" :class="{ 'is-open': open }">
    <RouterLink class="brand" to="/" @click="emit('navigate')">
      <span class="brand-mark">F</span><span>Fajar Adie Santosa</span>
    </RouterLink>
    <nav class="nav-links" aria-label="Main navigation">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.to"
        :to="item.to"
        @click="emit('navigate')"
      >
        {{ item.label }}
      </RouterLink>
      <RouterLink
        to="/work"
        :class="{ 'is-active': route.path.startsWith('/work') }"
        @click="emit('navigate')"
      >
        Selected work
      </RouterLink>
      <RouterLink to="/gitbook" @click="emit('navigate')">Gitbook</RouterLink>
      <RouterLink to="/medium" @click="emit('navigate')">Medium</RouterLink>
      <RouterLink to="/contact" @click="emit('navigate')"> Contact </RouterLink>
    </nav>
  </aside>
  <header class="mobile-header">
    <RouterLink class="brand" to="/" @click="emit('navigate')">
      <span class="brand-mark">F</span><span>Fajar Adie Santosa</span>
    </RouterLink>
    <button
      class="icon-button mobile-menu-button"
      type="button"
      :aria-label="open ? 'Close navigation' : 'Open navigation'"
      aria-controls="site-navigation"
      :aria-expanded="open"
      @click="emit('toggle')"
    >
      <X v-if="open" :size="22" :stroke-width="1.8" />
      <Menu v-else :size="22" :stroke-width="1.8" />
    </button>
  </header>
</template>
