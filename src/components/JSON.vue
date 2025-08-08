<!-- JSONLab.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 6: Render a list containing author names and their birth years. Hint: Make use of the v-for directive to iterate through the array of authors. -->
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->

      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <!-- Activity 7: Render a list containing authors born after 1850. Hint: Make use of the v-for directive to iterate through the array of authors that you have filtered out. -->
      <p>Authors born after 1850:</p>
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 8: Render a list of all famous works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
        <!-- TODO: CODE TO RENDER LIST OF FAMOUS WORKS HERE -->
      </ul>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">
          {{ work.title }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9: Render a list of Austen's works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
      <!-- TODO: CODE TO RENDER LIST OF AUSTEN'S WORKS HERE -->
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company: {{ bookstores.name }}
        <!-- Activity 9a: Get the company name from the bookstores object. -->
        <!-- TODO: CODE TO GET COMPANY NAME HERE -->
      </p>

      <p>
        Total Stores: {{ bookstores.totalStores }}
        <!-- Activity 9b: Get the total number of stores from the bookstores object. -->
        <!-- TODO: CODE TO GET TOTAL STORES HERE -->
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:{{ bookstores.storeTypes }}</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <!-- TODO: CODE TO RENDER LIST OF STORE TYPES HERE -->
      <!-- <ul>
        <li v-for="storeType in bookstores.storeTypes" :key="storeType">
          {{ bookstore }}
        </li>
      </ul> -->

      <h3>Nested Objects</h3>
      <p>Opening Hours:{{ bookstores.openingHours.weekdays }}</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <!-- TODO: CODE TO RENDER LIST OF OPENING HOURS HERE -->

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <!-- TODO: CODE TO GET TOP SELLERS HERE -->
      <p>We operate in:</p>
      <p>Our #1 seller: {{ bookstores.topSellers[0] }}</p>
      <ul>
        <li v-for="seller in bookstores.topSellers" :key="seller">
          {{ seller }}
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->
      <!-- TODO: CODE TO TOGGLE MESSAGE VISIBILITY HERE. Hint: Use the v-if directive. -->

      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
      <li v-for="author in authors" :key="author.id" :class="{ highlight: author.id === 1 }">
        {{ author.name }} ({{ author.birthYear }})
      </li>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'
// TODO: CODE TO IMPORT JSON FILES HERE

const showMessage = ref(false) // == android mustableStateOf

console.log('Log1', showMessage)
console.log('Log2', showMessage.value)
showMessage.value = true
console.log('Log3', showMessage.value)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => {
  // TODO: CODE TO FILTER ARRAY OF AUTHORS HERE
  return authors.filter((item) => item.birthYear > 1850)
})

// Activity 3: Get all famous works
const allFamousWorks = computed(() => {
  return authors.flatMap((author) => author.famousWorks)
  // TODO: CODE TO GET ALL FAMOUS WORKS HERE
})

// Activity 4: Find author by name
const orwell = computed(() => {
  return authors.find((author) => author.name === 'George Orwell')
  // TODO: CODE TO FIND AUTHOR BY NAME HERE
})

// Activity 5: Find author by ID
const austen = computed(() => {
  // TODO: CODE TO FIND AUTHOR BY ID HERE
  return authors.find((author) => author.id === 2)
})
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f9fafb; /* lighter background */
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  color: #222831; /* darker, high-contrast font color */
  font-size: 1.15rem;
  line-height: 1.7;
}

h1,
h2 {
  color: #1a3a5d;
  font-weight: 700;
}
h1 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

.lab-section {
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.message {
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 1.1rem;
}

.success {
  background-color: #e7faf3;
  color: #1e7e34;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
  color: #fff;
}

code {
  background-color: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Mono', 'Consolas', 'Courier New', Courier, monospace;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f4f8;
  color: #222831;
  padding: 12px;
  margin: 6px 0;
  border-radius: 6px;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
}
</style>
