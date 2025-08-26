<template>
  <div class="container">
    <div
      class="d-flex align-items-center justify-content-center"
      style="min-height: calc(100vh - 120px)"
    >
      <div class="row w-100 justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center">
            <i class="fas fa-database me-2"></i>
            W4. Library Registration Form
          </h1>
          <p class="text-center text-muted mb-4">
            This form now includes validation. Registered users are displayed in a data table below
            (PrimeVue).
          </p>
          <form @submit.prevent="submitForm">
            <!-- Row 1: Username | Gender -->
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  @blur="() => validateName(true)"
                  @import="() => validateName(false)"
                  v-model="formData.username"
                />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
              <div class="col-md-6">
                <label for="gender" class="form-label">Gender</label>
                <select
                  class="form-select"
                  id="gender"
                  v-model="formData.gender"
                  @change="() => validateGender(true)"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
              </div>
            </div>

            <!-- Row 2: Password | Confirm Password -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  @blur="() => validatePassword(true)"
                  @import="() => validatePassword(false)"
                  v-model="formData.password"
                />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
              <div class="col-md-6 col-sm-6">
                <label for="confirm-password" class="form-label">Confirm password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm-password"
                  v-model="formData.confirmPassword"
                  @blur="() => validateConfirmPassword(true)"
                />
                <div v-if="errors.confirmPassword" class="text-danger">
                  {{ errors.confirmPassword }}
                </div>
              </div>
            </div>

            <!-- Resident + Reason -->
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isAustralian"
                    v-model="formData.isAustralian"
                    @change="() => validateResident(true)"
                  />
                  <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
                </div>
                <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
                @change="() => validateReason(true)"
                @input="() => validateReason(false)"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
              <div v-if="formData.reason.toLowerCase().includes('friend')" class="text-success">
                Great to have a friend
              </div>
            </div>

            <!-- Suburb (use v-model for two-way binding) -->
            <div class="mb-3">
              <label for="suburb" class="form-label">Suburb</label>
              <input type="text" class="form-control" id="suburb" v-model="formData.suburb" />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- DataTable from PrimeVue -->
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-md-8 offset-md-2">
        <DataTable
          :value="submittedCards"
          tableStyle="min-width: 50rem; background-color: white; color: black;"
        >
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'true' : 'false' }}
            </template>
          </Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>

    <!-- Bootstrap Cards -->
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-md-8 offset-md-2">
        <div class="d-flex flex-wrap justify-content-start">
          <div
            v-for="(card, index) in submittedCards"
            :key="index"
            class="card m-2"
            style="width: 18rem"
          >
            <div class="card-header">User Information</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Username: {{ card.username }}</li>
              <li class="list-group-item">Password: {{ card.password }}</li>
              <li class="list-group-item">
                Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
              </li>
              <li class="list-group-item">Gender: {{ card.gender }}</li>
              <li class="list-group-item">Reason: {{ card.reason }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '../stores/auth'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    // store for display
    submittedCards.value.push({ ...formData.value })
    // register account for future login, stay on page
    registerUser({ username: formData.value.username, password: formData.value.password })
    // clear form so user can continue registering
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'You must confirm if you are an Australian resident.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
  const reasonText = formData.value.reason.trim()
  if (reasonText.length === 0 || reasonText.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
