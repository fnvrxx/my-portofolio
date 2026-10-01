<script setup>
const props = defineProps({
  projects: { type: Array, required: true },
  toolIcons: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits(["select"]);
const visibleTools = (project) =>
  project.tools.filter((tool) => Boolean(props.toolIcons[tool]));
</script>

<template>
  <p v-if="loading" class="work-state" role="status">
    Loading project archive.
  </p>
  <div v-else-if="error" class="work-state" role="alert">
    <p>Project archive could not be loaded.</p>
    <p>{{ error }}</p>
  </div>
  <p v-else-if="!projects.length" class="work-state">
    No projects are available for this role yet.
  </p>
  <div v-else v-reveal class="project-grid">
    <button
      v-for="project in projects"
      :key="project.title"
      class="project-card"
      type="button"
      @click="emit('select', project)"
    >
      <span class="project-card-media">
        <img :src="project.image" :alt="project.title" />
      </span>
      <span class="project-card-meta">
        <span>{{ project.role }}</span>
        <span>{{ project.year }}</span>
      </span>
      <span class="project-card-copy">
        <strong>{{ project.title }}</strong>
        <span>{{ project.type }}</span>
      </span>
      <span v-if="visibleTools(project).length" class="tool-list" aria-label="Tools used">
        <img
          v-for="tool in visibleTools(project)"
          :key="tool"
          :src="toolIcons[tool]"
          :alt="tool"
          width="34"
          height="34"
        />
      </span>
      <span class="project-card-action">View project details</span>
    </button>
  </div>
</template>
