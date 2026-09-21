<script setup>
import { ChevronRight, Github, Linkedin, Mail } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="hero page-section">
    <p class="eyebrow">Portfolio / 2026</p>
    <nav class="hero-social-links" aria-label="Contact links">
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
    </nav>
    <h1>Turning raw data and manual workflows into <em>working software.</em></h1>
    <div class="hero-footer">
      <p>
        I'm Fajar Adie Santosa. I collect and analyze data, build APIs and
        interfaces, and develop computer vision pipelines. My work includes
        market analysis, financial tools, OCR-based document extraction, and
        face recognition.
      </p>
      <RouterLink class="text-link" to="/work">
        See the project archive <ChevronRight :size="16" />
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
