<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const experiences = [
  {
    role: "Software Developer",
    organization: "Nechcode",
    period: "Feb 2026–Present",
    summary:
      "Building a company introduction website and a POS system for warehouse cashiers.",
    detail:
      "The work covers the company website and a cashier workflow for the warehouse.",
  },
  {
    role: "Data Analyst Intern",
    organization: "SEVIMA",
    period: "Feb–Aug 2025",
    summary: "Structured 7,601 school records for K–12 market analysis.",
    detail:
      "Helped design an OCR workflow for files from several teams, reducing document processing time by about 50%.",
  },
  {
    role: "Programming Laboratory Teaching Assistant",
    organization: "ITS",
    period: "Aug 2024–Sep 2025",
    summary:
      "Mentored more than 20 mathematics students in Java and object-oriented programming.",
    detail:
      "Wrote weekly exercises and JUnit tests to review their solutions more consistently.",
  },
  {
    role: "Coordinator of Website",
    organization: "OMITS 17th",
    period: "2023–2024",
    summary: "Led four developers on a Laravel competition website.",
    detail:
      "Deployed and maintained the server through an event with more than 2,000 participants.",
  },
];

const expandedIndex = ref(0);
const toggleExperience = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
};
</script>

<template>
  <section
    id="experience"
    class="page-section experience-section"
    aria-labelledby="experience-title"
  >
    <div v-reveal class="experience-main">
      <h1 id="experience-title" class="experience-title-card">
        My Work Experience
      </h1>
      <ol class="experience-timeline">
        <li v-for="(experience, index) in experiences" :key="experience.role">
          <button
            class="experience-entry"
            type="button"
            :aria-expanded="expandedIndex === index"
            :aria-controls="`experience-detail-${index}`"
            @click="toggleExperience(index)"
          >
            <span class="experience-entry-top">
              <strong
                >{{ experience.role }}
                <span>· {{ experience.organization }}</span></strong
              >
              <small>{{ experience.period }}</small>
            </span>
            <span class="experience-summary">{{ experience.summary }}</span>
            <span class="experience-toggle" aria-hidden="true">{{
              expandedIndex === index ? "−" : "+"
            }}</span>
          </button>
          <Transition name="detail">
            <p
              v-show="expandedIndex === index"
              :id="`experience-detail-${index}`"
              class="experience-detail"
            >
              {{ experience.detail }}
            </p>
          </Transition>
        </li>
      </ol>
      <a
        class="action-button experience-cv"
        href="/Fajar-Adie-Santosa-CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        View full CV
      </a>
    </div>

    <aside class="experience-contact">
      <div>
        <p>Let's Build Something Intelligent Together.</p>
        <h2>
          Have an idea for AI or Computer Vision? Let's turn it into a working
          solution.
        </h2>
      </div>
      <RouterLink class="action-button" to="/contact">Get in touch</RouterLink>
    </aside>
  </section>
</template>
