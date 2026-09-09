<script setup>
import { ref } from "vue";
import ProjectModal from "../components/ProjectModal.vue";
import ProjectSection from "../components/ProjectSection.vue";
import { projectSections, toolIcons } from "../data/portfolio";

const selectedProject = ref(null);
</script>

<template>
  <ProjectSection
    :sections="projectSections"
    :tool-icons="toolIcons"
    @select="selectedProject = $event"
  />
  <ProjectModal
    :project="selectedProject"
    :tool-icons="toolIcons"
    @close="selectedProject = null"
  />
</template>
