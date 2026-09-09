<script setup>
import { ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="hero page-section">
    <p class="eyebrow"><Code2 :size="16" /> Portfolio / 2026</p>
    <div class="hero-social-links" aria-label="Contact links">
      <a
        href="https://github.com/fnvrxx"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        ><Github :size="18"
      /></a>
      <a
        href="https://www.linkedin.com/in/fajar-adie-santosa/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        ><Linkedin :size="18"
      /></a>
      <a href="mailto:fajardiesantosa@gmail.com" aria-label="Email"
        ><Mail :size="18"
      /></a>
    </div>
    <h1>Turning mathematical thinking into practical <em>digital work.</em></h1>
    <div class="hero-footer">
      <p>
        I'm Fajar Adie Santosa, a mathematics student from Yogyakarta working
        across data analysis, full-stack development, and computer vision. I
        use logic, code, and curiosity to explore complex problems and build
        clear, useful solutions.
      </p>
      <RouterLink class="text-link" to="/work">
        Explore selected work <ArrowUpRight :size="16" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero-social-links {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>
