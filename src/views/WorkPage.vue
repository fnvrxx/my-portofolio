<script setup>
import ProjectSection from "../components/ProjectSection.vue";
import { projectSections } from "../data/portfolio";
</script>

<template>
  <ProjectSection :sections="projectSections" />
</template>
