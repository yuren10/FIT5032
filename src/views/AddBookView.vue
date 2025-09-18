<template>
  <div class="container" style="max-width: 560px">
    <h1 class="my-4">Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="text" v-model="isbn" id="isbn" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="name" id="name" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Book List Component -->
    <BookList />

    <!-- Admin (edit/delete + queries) -->
    <BookAdmin />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase/init'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'
import BookAdmin from '../components/BookAdmin.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }
    await addDoc(collection(db, 'books'), { isbn: isbnNumber, name: name.value })
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>
