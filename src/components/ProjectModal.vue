<script setup>
import { onBeforeUnmount, onMounted, watch } from "vue";
import { Award, ExternalLink, FileText, X } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, default: null },
  toolIcons: { type: Object, required: true },
});
const emit = defineEmits(["close"]);

const handleKeydown = (event) => {
  if (event.key === "Escape" && props.project) emit("close");
};

watch(
  () => props.project,
  (project) => document.body.classList.toggle("modal-open", Boolean(project)),
);

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("modal-open");
});
</script>

<template>
  <Transition name="fade"
    ><div v-if="project" class="modal-backdrop" @click.self="emit('close')">
      <article
        class="project-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
      >
        <button
          class="modal-close"
          aria-label="Close project details"
          @click="emit('close')"
        >
          <X :size="20" /></button
        ><img :src="project.image" :alt="project.title" />
        <p class="eyebrow">{{ project.type }} / {{ project.year }}</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <a
          v-if="project.document"
          class="project-link"
          :href="project.document"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText :size="16" />
          {{ project.documentLabel || "View full analysis" }}
        </a>
        <a
          v-if="project.certificate"
          class="project-link"
          :href="project.certificate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Award :size="16" />
          View certificate
        </a>
        <a
          v-if="project.url"
          class="project-link"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink :size="16" />
          {{ project.urlLabel || "Visit live project" }}
        </a>
        <div class="modal-tools">
          <p>Skills & tools</p>
          <div class="tool-list">
            <span v-for="tool in project.tools" :key="tool"
              ><img
                v-if="typeof toolIcons[tool] === 'string'"
                :src="toolIcons[tool]"
                alt=""
              /><component v-else :is="toolIcons[tool]" :size="14" />{{ tool }}</span
            >
          </div>
        </div>
      </article>
    </div></Transition
  >
</template>

<style scoped>
.modal-backdrop {
  z-index: 50;
}

.project-modal {
  max-height: calc(100vh - 44px);
  overflow-y: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  padding-bottom: 4px;
  color: #1e4238;
  border-bottom: 1px solid #1e4238;
  font-size: 14px;
  font-weight: 500;
}

.project-link:hover {
  color: #2e7262;
  border-color: #2e7262;
}
</style>
