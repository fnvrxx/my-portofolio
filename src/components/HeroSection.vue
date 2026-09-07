<script setup>
import { ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-vue-next";
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
    <h1>Exploring ideas through <em>logic</em> and design.</h1>
    <div class="hero-footer">
      <p>
        A mathematics student and curious builder who enjoys turning complex
        questions into thoughtful digital work.
      </p>
      <a class="text-link" href="#work"
        >View selected work <ArrowUpRight :size="16"
      /></a>
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
