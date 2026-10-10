<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import { toolIcons } from "../data/portfolio";

const skills = [
  "Laravel",
  "Python",
  "React",
  "Next.js",
  "Pandas",
  "Figma",
  "OpenCV",
  "paddleocr",
  "postgresql",
  "mysql",
  "vite",
  "selenium",
  "matplotlib",
];
</script>

<template>
  <section id="contact" class="page-section contact-section">
    <p class="contact-intro">Thanks for taking a look at my work.</p>
    <div class="contact-inner">
      <h2>Want to discuss<br /><em>a problem or project?</em></h2>
      <a class="email-link" href="mailto:fajaradios01@gmail.com"
        >fajaradios01@gmail.com <ArrowUpRight :size="20"
      /></a>
    </div>
    <div class="skills-strip">
      <div class="skills-strip-label">
        <strong>Skills</strong>
      </div>
      <div
        class="skills-viewport"
        role="region"
        tabindex="0"
        aria-label="Skills"
      >
        <div class="skills-track">
          <ul
            v-for="copy in 2"
            :key="copy"
            class="skills-list"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <li v-for="skill in skills" :key="skill">
              <img :src="toolIcons[skill]" alt="" width="42" height="42" />
              <span>{{ skill }}</span>
            </li>
          </ul>
        </div>
      </div>
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
