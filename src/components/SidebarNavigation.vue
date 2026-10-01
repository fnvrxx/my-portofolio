<script setup>
import { ref, watch } from "vue";
import { ChevronDown, Menu, X } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

defineProps({ open: Boolean });
const emit = defineEmits(["toggle", "navigate"]);
const route = useRoute();
const workMenuOpen = ref(route.path.startsWith("/work"));

const primaryNavigation = [
  { label: "Introduction", to: "/" },
  { label: "Experience", to: "/experience" },
];

const workNavigation = [
  {
    label: "Data Analyst",
    to: "/work/data-analyst",
  },
  {
    label: "Computer Vision",
    to: "/work/computer-vision",
  },
  {
    label: "Web Full Stack",
    to: "/work/web-full-stack",
  },
];

watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/work")) workMenuOpen.value = true;
  },
);
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
      <div
        class="nav-dropdown"
        :class="{ 'is-active': route.path.startsWith('/work') }"
      >
        <div class="nav-dropdown-trigger">
          <RouterLink class="nav-dropdown-link" to="/work/" @click="emit('navigate')">
            Selected work
          </RouterLink>
          <button
            class="nav-dropdown-toggle"
            type="button"
            aria-label="Toggle work categories"
            aria-controls="work-navigation"
            :aria-expanded="workMenuOpen"
            @click="workMenuOpen = !workMenuOpen"
          >
            <ChevronDown class="nav-dropdown-chevron" :size="17" />
          </button>
        </div>
        <div v-show="workMenuOpen" id="work-navigation" class="nav-submenu">
          <RouterLink
            v-for="item in workNavigation"
            :key="item.label"
            :to="item.to"
            :class="{ 'is-current': route.path === item.to }"
            @click="emit('navigate')"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
      <RouterLink to="/gitbook" @click="emit('navigate')">Gitbook</RouterLink>
      <RouterLink to="/medium" @click="emit('navigate')">Medium</RouterLink>
      <RouterLink to="/contact" @click="emit('navigate')">
        Contact
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
