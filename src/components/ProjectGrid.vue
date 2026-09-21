<script setup>
defineProps({
  projects: { type: Array, required: true },
  toolIcons: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits(["select"]);
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
  <div v-else class="project-grid">
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
      <span class="tool-list">
        <span v-for="tool in project.tools" :key="tool">
          <img
            v-if="typeof toolIcons[tool] === 'string'"
            :src="toolIcons[tool]"
            alt=""
          />
          <component v-else :is="toolIcons[tool]" :size="13" />
          {{ tool }}
        </span>
      </span>
      <span class="project-card-action">View project details</span>
    </button>
  </div>
</template>
