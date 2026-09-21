<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import ProjectGrid from "../components/ProjectGrid.vue";
import ProjectModal from "../components/ProjectModal.vue";
import { projectSections, toolIcons } from "../data/portfolio";

const props = defineProps({
  roleId: { type: String, required: true },
});

const selectedProject = ref(null);
const section = computed(() =>
  projectSections.find((item) => item.id === props.roleId),
);
const projects = computed(() =>
  (section.value?.projects || []).map((project) => ({
    ...project,
    role: section.value?.title,
  })),
);
</script>

<template>
  <section class="page-section role-work-section">
    <RouterLink class="text-link role-back-link" to="/work">
      All selected work
    </RouterLink>
    <header v-if="section" class="role-work-header">
      <h1>{{ section.title }}</h1>
    </header>
    <ProjectGrid
      :projects="projects"
      :tool-icons="toolIcons"
      @select="selectedProject = $event"
    />
  </section>
  <ProjectModal
    :project="selectedProject"
    :tool-icons="toolIcons"
    @close="selectedProject = null"
  />
</template>
