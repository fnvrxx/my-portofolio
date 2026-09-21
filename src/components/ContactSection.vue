<script setup>
import { ArrowUpRight } from "lucide-vue-next";
</script>

<template>
  <section id="contact" class="page-section contact-section">
    <div class="section-label"><span>04</span><span>Contact</span></div>
    <div class="contact-inner">
      <h2>Want to discuss<br /><em>a problem or project?</em></h2>
      <a class="email-link" href="mailto:fajaradiesantosa@gmail.com"
        >fajaradiesantosa@gmail.com <ArrowUpRight :size="20"
      /></a>
    </div>
    <footer>
      <span>© 2026 Fajar Adie Santosa</span>
    </footer>
  </section>
</template>

<style scoped>
.contact-section {
  border-top: 1px solid var(--ink);
}
</style>
