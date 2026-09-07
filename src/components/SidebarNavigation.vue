<script setup>
import { Menu, X } from 'lucide-vue-next'
defineProps({ open: Boolean })
const emit = defineEmits(['toggle', 'navigate'])
</script>

<template>
  <aside class="sidebar" :class="{ 'is-open': open }">
    <a class="brand" href="#top" @click="emit('navigate')"><span class="brand-mark">F</span><span>Fajar Adie Santosa</span></a>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="#top" @click="emit('navigate')"><span>01</span> Introduction</a>
      <a href="#about" @click="emit('navigate')"><span>02</span> About</a>
      <a href="#work" @click="emit('navigate')"><span>03</span> Selected work</a>
      <a href="#contact" @click="emit('navigate')"><span>04</span> Contact</a>
    </nav>
  </aside>
  <header class="mobile-header">
    <a class="brand" href="#top"><span class="brand-mark">F</span><span>Fajar Adie Santosa</span></a>
    <button class="icon-button" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="emit('toggle')"><X v-if="open" :size="21" /><Menu v-else :size="21" /></button>
  </header>
</template>

<style scoped>
.sidebar { z-index: 10; }
</style>
