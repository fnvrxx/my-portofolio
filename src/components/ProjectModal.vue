<script setup>
import { X } from "lucide-vue-next";
defineProps({
  project: { type: Object, default: null },
  toolIcons: { type: Object, required: true },
});
const emit = defineEmits(["close"]);
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
        <div class="modal-tools">
          <p>Tools used</p>
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
  z-index: 30;
}
</style>
