<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Login!</h1>
      <label for="email"></label>
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <label for="password"></label>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <p v-if="errMsg" class="text-center text-red-500 font-medium mb-4">{{ errMsg }}</p>
      <button
        role="button"
        @click="apiCall"
        class="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Log In
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useLogInStore } from '@/stores/loginStore.ts'
import { auth } from '@/main'
import { signOut } from 'firebase/auth'
export default {
  name: 'Registration',
  setup () {

    const loginStore = useLogInStore()
    // Define types for the reactive variables
    const email = ref<string>('')
    const password = ref<string>('')
    const errMsg = computed(() => loginStore.getErrMsg)

    const apiCall = () => {
      loginStore.email = email.value
      loginStore.password = password.value
      loginStore.loginUser()
    }
    onMounted(() => {
      signOut(auth).then(() => {
        localStorage.removeItem('userData')
      })
    })
    return {
      email,
      password,
      apiCall,
      errMsg
    }
    }
  }
</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
