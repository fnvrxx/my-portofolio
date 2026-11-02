<script setup>
import ProjectSection from "../components/ProjectSection.vue";
import { projectSections } from "../data/portfolio";

defineProps({
  category: { type: String, default: "all" },
});
</script>

<template>
  <ProjectSection :sections="projectSections" :category="category" />
</template>
