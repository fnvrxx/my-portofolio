<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Award, ExternalLink, FileText, X } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, default: null },
  toolIcons: { type: Object, required: true },
});
const emit = defineEmits(["close"]);
const modal = ref(null);
const closeButton = ref(null);
let previouslyFocused = null;

const handleKeydown = (event) => {
  if (!props.project) return;

  if (event.key === "Escape") {
    emit("close");
    return;
  }

  if (event.key !== "Tab" || !modal.value) return;

  const focusable = modal.value.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};

watch(
  () => props.project,
  async (project) => {
    document.body.classList.toggle("modal-open", Boolean(project));

    if (project) {
      previouslyFocused = document.activeElement;
      await nextTick();
      closeButton.value?.focus();
    } else {
      previouslyFocused?.focus();
      previouslyFocused = null;
    }
  },
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
        ref="modal"
        class="project-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
      >
        <button
          ref="closeButton"
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
  min-height: 44px;
  color: var(--ink);
  border-bottom: 1px solid var(--ink);
  font-size: 14px;
  font-weight: 500;
}

.project-link:hover {
  background: var(--soft);
}
</style>
