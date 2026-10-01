<script setup>
import { RouterLink } from "vue-router";

defineProps({
  sections: { type: Array, required: true },
});
</script>

<template>
  <section id="work" class="page-section work-section">
    <div class="work-intro">
      <h1>Selected work</h1>
      <p>Choose a field to see the projects inside.</p>
    </div>
    <p v-if="!sections.length" class="work-state">
      No project categories are available yet.
    </p>
    <div v-else v-reveal class="folder-grid">
      <RouterLink
        v-for="section in sections"
        :key="section.id"
        class="folder-link"
        :to="`/work/${section.id}`"
      >
        <span class="folder-art" aria-hidden="true">
          <span class="folder-tab"></span>
          <span class="folder-face"></span>
        </span>
        <span class="folder-name">{{ section.title }}</span>
      </RouterLink>
    </div>
  </section>
</template>
