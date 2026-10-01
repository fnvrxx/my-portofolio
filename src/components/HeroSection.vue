<script setup>
import { Github, Linkedin, Mail } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import portrait from "../icon/my-face-web.jpg";
</script>

<template>
  <section class="hero page-section" aria-labelledby="hero-title">
    <div class="hero-copy">
      <div v-reveal class="hero-copy-inner">
        <p class="hero-kicker">Hi, I'm Fajar Adie Santosa.</p>
        <h1 id="hero-title">Software<br />Developer</h1>
        <p class="hero-description">
          I build web apps, APIs, and data workflows. My recent work includes a
          Laravel competition platform, document OCR, and a React study timer.
        </p>
        <div class="hero-actions">
          <RouterLink class="action-button action-button-primary" to="/work">
            View my work
          </RouterLink>
          <a class="action-button" href="/Fajar-Adie-Santosa-CV.pdf" download>
            Download CV
          </a>
        </div>
        <div class="hero-connect">
          <p>Connect with me</p>
          <nav class="hero-social-links" aria-label="Contact links">
            <a
              href="https://github.com/fnvrxx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              ><Github :size="21"
            /></a>
            <a
              href="https://www.linkedin.com/in/fajar-adie-santosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              ><Linkedin :size="21"
            /></a>
            <a
              href="https://medium.com/@fajardios01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              ><img class="medium-logo" src="/medium-symbol.svg" alt="" width="26" height="16"
            /></a>
            <a href="mailto:fajaradios01@gmail.com" aria-label="Email Fajar"
              ><Mail :size="21"
            /></a>
          </nav>
        </div>
      </div>
    </div>
    <div v-reveal class="hero-visual">
      <div class="portrait-frame">
        <img :src="portrait" alt="Fajar Adie Santosa" />
      </div>
      <div class="hero-stack" aria-label="Technologies Fajar works with">
        <code>Built_with = {Laravel, FastAPI, React}</code>
      </div>
    </div>
  </section>
</template>
