<template>
  <div class="mt-5">
    <h2>Manage Books</h2>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 140px">ISBN</th>
            <th>Name</th>
            <th style="width: 220px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>
              <input v-model.number="book.editIsbn" type="number" class="form-control" />
            </td>
            <td>
              <input v-model="book.editName" type="text" class="form-control" />
            </td>
            <td>
              <button class="btn btn-sm btn-primary me-2" @click="save(book)">Save</button>
              <button class="btn btn-sm btn-danger" @click="remove(book)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4">
      <h3>Query examples (where + orderBy + limit)</h3>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-outline-secondary btn-sm" @click="runQuery('where')">where isbn > 1000</button>
        <button class="btn btn-outline-secondary btn-sm" @click="runQuery('order')">orderBy isbn desc</button>
        <button class="btn btn-outline-secondary btn-sm" @click="runQuery('limit')">limit 3</button>
        <button class="btn btn-outline-secondary btn-sm" @click="runQuery('combo')">where + orderBy + limit</button>
      </div>
      <ul>
        <li v-for="b in queried" :key="b.id">{{ b.name }} - ISBN: {{ b.isbn }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init'
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

const books = ref([])
const queried = ref([])

const load = async () => {
  const snap = await getDocs(collection(db, 'books'))
  books.value = snap.docs.map(d => ({ id: d.id, ...d.data(), editIsbn: d.data().isbn, editName: d.data().name }))
}

const save = async (book) => {
  const target = doc(db, 'books', book.id)
  await updateDoc(target, { isbn: Number(book.editIsbn), name: book.editName })
  await load()
}

const remove = async (book) => {
  const target = doc(db, 'books', book.id)
  await deleteDoc(target)
  await load()
}

const runQuery = async (type) => {
  let q
  if (type === 'where') {
    q = query(collection(db, 'books'), where('isbn', '>', 1000))
  } else if (type === 'order') {
    q = query(collection(db, 'books'), orderBy('isbn', 'desc'))
  } else if (type === 'limit') {
    q = query(collection(db, 'books'), limit(3))
  } else if (type === 'combo') {
    q = query(collection(db, 'books'), where('isbn', '>', 1000), orderBy('isbn', 'desc'), limit(5))
  }
  const snap = await getDocs(q)
  queried.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

onMounted(load)
</script>
