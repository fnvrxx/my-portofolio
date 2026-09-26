<script setup>
import { computed } from "vue";
import { writingCollections } from "../data/writing";

const props = defineProps({
  collection: { type: String, required: true },
});

const content = computed(() => writingCollections[props.collection]);
</script>

<template>
  <section class="page-section writing-section">
    <header class="writing-header">
      <h1>{{ content.title }}</h1>
      <p>{{ content.description }}</p>
    </header>
    <div class="writing-grid">
      <a
        v-for="entry in content.entries"
        :key="entry.href"
        class="writing-card"
        :href="entry.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${entry.title}, ${entry.destination} (opens in a new tab)`"
      >
        <span class="writing-card-media">
          <img :src="entry.image" :alt="entry.imageAlt" />
        </span>
        <span class="writing-card-tags">
          <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
        </span>
        <span class="writing-card-caption">
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.caption }}</span>
          <small v-if="entry.imageCredit">{{ entry.imageCredit }}</small>
        </span>
        <span class="writing-card-destination">{{ entry.destination }}</span>
      </a>
    </div>
  </section>
</template>
