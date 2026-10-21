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
          I build backend systems and apply AI, especially computer vision, to
          practical problems.
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
              ><img
                class="medium-logo"
                src="/medium-symbol.svg"
                alt=""
                width="26"
                height="16"
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
      <svg
        class="hero-cat"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        shape-rendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path class="cat-shadow" d="M5 29h23v2H5z" />
        <g class="cat-tail">
          <path d="M23 20h4v-2h2v-5h2v7h-2v3h-5z" />
          <path class="cat-fur" d="M25 20h3v-2h1v2h-1v2h-3z" />
        </g>
        <path d="M10 17h13v2h2v8h-2v2H8v-2H7v-8h3z" />
        <path class="cat-fur" d="M10 19h13v2h1v6H9v-6h1z" />
        <path class="cat-belly" d="M13 21h7v6h-7z" />
        <path d="M9 26h4v3H8v-2h1zm11 0h4v1h1v2h-5z" />
        <path d="M6 5h5v3h10V5h5v5h2v9h-2v2H6v-2H4v-9h2z" />
        <path class="cat-fur" d="M8 7h2v4H8zm15 0h1v4h-2V7zM6 11h20v7h-2v1H8v-1H6z" />
        <path class="cat-ear" d="M8 8h2v3H8zm14 0h2v3h-2z" />
        <path class="cat-eye" d="M10 14h3v2h-3zm10 0h3v2h-3z" />
        <path class="cat-nose" d="M15 16h2v2h-2z" />
        <path class="cat-whiskers" d="M4 16h3v1H4zm23 0h3v1h-3z" />
      </svg>
    </div>
  </section>
</template>
