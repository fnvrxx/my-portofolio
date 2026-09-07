<script setup>
import { ChevronRight } from "lucide-vue-next";
defineProps({
  sections: { type: Array, required: true },
  toolIcons: { type: Object, required: true },
});
const emit = defineEmits(["select"]);
</script>

<template>
  <section id="work" class="page-section work-section">
    <div class="section-label"><span>02</span><span>Selected work</span></div>
    <div class="work-intro">
      <h2>A record of things made and questions explored.</h2>
      <p>Projects organized by the kind of problem they are built to solve.</p>
    </div>
    <div class="project-sections">
      <section
        v-for="(section, sectionIndex) in sections"
        :key="section.title"
        class="project-subsection"
      >
        <header class="subsection-header">
          <div>
            <p class="subsection-number">
              {{ String(sectionIndex + 1).padStart(2, "0") }}
            </p>
            <h3>{{ section.title }}</h3>
          </div>
          <p>{{ section.description }}</p>
        </header>
        <div class="projects">
          <button
            v-for="(project, index) in section.projects"
            :key="project.title"
            class="project-row"
            @click="emit('select', project)"
          >
            <span class="project-number">0{{ index + 1 }}</span>
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
            </div>
            <div class="project-title">
              <h4>{{ project.title }}</h4>
              <p>{{ project.type }}</p>
              <div class="tool-list">
                <span v-for="tool in project.tools" :key="tool"
                  ><img
                    v-if="typeof toolIcons[tool] === 'string'"
                    :src="toolIcons[tool]"
                    alt=""
                  /><component v-else :is="toolIcons[tool]" :size="13" />{{
                    tool
                  }}</span
                >
              </div>
            </div>
            <span class="project-year">{{ project.year }}</span
            ><ChevronRight class="project-arrow" :size="20" />
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.project-subsection {
  scroll-margin-top: 86px;
}
</style>
