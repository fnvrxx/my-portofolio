<script setup>
import { computed, ref } from "vue";
import ProjectGrid from "./ProjectGrid.vue";
import ProjectModal from "./ProjectModal.vue";
import { toolIcons } from "../data/portfolio";

const props = defineProps({
  sections: { type: Array, required: true },
});

const selectedProject = ref(null);
const searchQuery = ref("");
const activeCategory = ref("all");
const projects = computed(() =>
  props.sections
    .flatMap((section) =>
      section.projects.map((project) => ({
        ...project,
        role: section.title,
        categoryId: section.id,
      })),
    )
    .sort((a, b) => Number(b.year) - Number(a.year)),
);
const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return projects.value.filter((project) => {
    if (
      activeCategory.value !== "all" &&
      project.categoryId !== activeCategory.value
    ) {
      return false;
    }

    if (!query) return true;

    return [
      project.title,
      project.type,
      project.role,
      project.year,
      project.description,
      ...project.tools,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
});
const hasActiveFilters = computed(
  () => Boolean(searchQuery.value.trim()) || activeCategory.value !== "all",
);
const clearFilters = () => {
  searchQuery.value = "";
  activeCategory.value = "all";
};
</script>

<template>
  <section id="work" class="page-section work-section">
    <div class="work-intro">
      <h1>Selected work</h1>
      <p>These are some of my recent projects!</p>
    </div>
    <div v-if="projects.length" class="work-controls">
      <label class="work-control" for="project-search">
        <span>Search projects</span>
        <input
          id="project-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search by project or tool"
        />
      </label>
      <label class="work-control" for="project-category">
        <span>Filter by field</span>
        <select id="project-category" v-model="activeCategory">
          <option value="all">All fields</option>
          <option v-for="section in sections" :key="section.id" :value="section.id">
            {{ section.title }}
          </option>
        </select>
      </label>
    </div>
    <div v-if="projects.length" class="work-results">
      <p role="status">
        {{ filteredProjects.length }}
        {{ filteredProjects.length === 1 ? "project" : "projects" }} found
      </p>
      <button
        v-if="hasActiveFilters && filteredProjects.length"
        class="work-clear"
        type="button"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </div>
    <div
      v-if="projects.length && !filteredProjects.length"
      class="work-state work-no-results"
    >
      <p>No projects match your filters.</p>
      <button class="work-clear" type="button" @click="clearFilters">
        Clear filters
      </button>
    </div>
    <ProjectGrid
      v-else
      :projects="filteredProjects"
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
