import { defineStore } from "pinia"
import { ref, computed, onMounted } from 'vue'
import { auth } from '@/main'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'


export const useLogInStore = defineStore('log_in', () => {
  const router = useRouter()
  const email = ref<string>('')
  const password = ref<string>('')
  const errMsg = ref<string>('')
  const loggedInUserEmail = ref<string | null>('')

  const getLoggedInUserEmail = computed(() => loggedInUserEmail.value)
  const getErrMsg = computed(() => errMsg.value)

  const setErrorMessage = (errCode: string) => {
    switch (errCode) {
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email'
        break
      case 'auth/user-not-found':
        errMsg.value = 'No account with that email was found'
        break
      case 'auth/wrong-password':
        errMsg.value = 'Incorrect password'
        break
      default:
        errMsg.value = 'Email or password was incorrect'
    }
  }

  const loginUser = (): void => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        loggedInUserEmail.value = data.user.email
        email.value = ''
        password.value = ''
        router.push('/dashboard')
      })
      .catch((error: any) => {
          setErrorMessage(error.code)
      })
  }
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loggedInUserEmail.value = user.email
      } else {
        loggedInUserEmail.value = ''
      }
    })
  })
  return {
    email,
    password,
    loginUser,
    errMsg,
    loggedInUserEmail,
    getLoggedInUserEmail,
    getErrMsg
  }
})