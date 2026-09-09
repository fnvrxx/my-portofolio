<script setup>
import { Menu, X } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps({ open: Boolean });
const emit = defineEmits(["toggle", "navigate"]);

const navigation = [
  { number: "01", label: "Introduction", to: "/" },
  { number: "02", label: "About", to: "/about" },
  { number: "03", label: "Selected work", to: "/work" },
  { number: "04", label: "Contact", to: "/contact" },
];
</script>

<template>
  <aside id="site-navigation" class="sidebar" :class="{ 'is-open': open }">
    <RouterLink class="brand" to="/" @click="emit('navigate')">
      <span class="brand-mark">F</span><span>Fajar Adie Santosa</span>
    </RouterLink>
    <nav class="nav-links" aria-label="Main navigation">
      <RouterLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        @click="emit('navigate')"
      >
        <span>{{ item.number }}</span>{{ item.label }}
      </RouterLink>
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
