<script setup>
import { computed } from "vue";
import ProjectGrid from "./ProjectGrid.vue";

const props = defineProps({
  sections: { type: Array, required: true },
  toolIcons: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
});
const emit = defineEmits(["select"]);

const projects = computed(() =>
  props.sections.flatMap((section) =>
    section.projects.map((project) => ({
      ...project,
      role: section.title,
    })),
  ),
);
</script>

<template>
  <section id="work" class="page-section work-section">
    <div class="work-intro">
      <h2>Selected projects, organized by field.</h2>
      <p>Use the sidebar to move between fields, or read the full archive.</p>
    </div>
    <ProjectGrid
      :projects="projects"
      :tool-icons="toolIcons"
      :loading="loading"
      :error="error"
      @select="emit('select', $event)"
    />
  </section>
</template>
