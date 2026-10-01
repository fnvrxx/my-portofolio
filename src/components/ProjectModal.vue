<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Award, ExternalLink, FileText, X } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, default: null },
  toolIcons: { type: Object, required: true },
});
const emit = defineEmits(["close"]);
const visibleTools = () =>
  (props.project?.tools || []).filter((tool) => Boolean(props.toolIcons[tool]));
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
        <div v-if="project.document || project.certificate || project.url" class="project-links">
          <a
            v-if="project.document"
            class="project-link"
            :href="project.document"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText :size="18" />
            {{ project.documentLabel || "View full analysis" }}
          </a>
          <a
            v-if="project.certificate"
            class="project-link"
            :href="project.certificate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Award :size="18" />
            View certificate
          </a>
          <a
            v-if="project.url"
            class="project-link"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink :size="18" />
            {{ project.urlLabel || "Visit live project" }}
          </a>
        </div>
        <div v-if="visibleTools().length" class="modal-tools" aria-label="Tools used">
          <p class="modal-tools-heading">Tools what i used</p>
          <div class="tool-list">
            <img
              v-for="tool in visibleTools()"
              :key="tool"
              :src="toolIcons[tool]"
              :alt="tool"
              width="38"
              height="38"
            />
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

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 27px;
}

.project-link {
  display: inline-flex;
  min-height: 49px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  color: var(--ink);
  background: var(--soft);
  border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
  font-family: "DM Sans", Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.project-link:hover,
.project-link:focus-visible {
  transform: translate(3px, 3px);
  background: var(--accent);
  box-shadow: 2px 2px 0 var(--ink);
}

.project-link svg {
  flex: 0 0 auto;
}
</style>
