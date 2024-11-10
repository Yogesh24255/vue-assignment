<template>
  <div>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Name" v-model="name" /></p>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">
      <label for="submit">Submit</label>
    </button></p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/main'
import { createUserWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'Registration',
  setup () {
    // Define types for the reactive variables
    const email = ref<string>('')
    const password = ref<string>('')
    const name = ref<string>('')


    // Set up the router for navigation
    const router = useRouter()

    // Define the register function with async for cleaner code
    const register = (): void => {
      try {
        const userCredential = createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(data => {
          console.log('Successfully registered!', data)
          // router.push('/feed')
          email.value = ''
          password.value = ''
          name.value = ''
        })
      } catch (error: any) {
        console.log(error.code)
        // alert(error.message)
      }
    }
    return {
      email,
      password,
      register,
      name
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
