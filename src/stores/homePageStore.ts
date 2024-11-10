import { defineStore } from "pinia"
import { useLogInStore } from '@/stores/loginStore.ts'
import { computed, ref, watch, onMounted } from "vue"
import { db, auth } from '@/main'
import { signOut } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export const useHomePageStore = defineStore('home', () => {
  const logInStore = useLogInStore()
  const router = useRouter()

  const loggedInUser = computed(()   => logInStore.getLoggedInUserEmail)

  // Interface for the user data
  interface user {
    name: string,
    email: string | null,
    phone_no: number,
    city: string,
    occupation: string,
    qualification: string,
    gender: string
  }

  // Ref to store the user data
  const userData = ref<user | null>(null)

  const getUserData = computed(() => userData.value)

  // Fetch data from Firestore
  const getDataForLoggedInUser = (): void => {
    if (!loggedInUser.value) return

    try {
      const docRef = doc(db, "vue-assignment", loggedInUser.value)
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            let docData = docSnap.data()
            userData.value = {
              name: docData.name,
              email: loggedInUser.value,
              gender: docData.gender,
              qualification: docData.qualification,
              occupation: docData.occupation,
              city: docData.city,
              phone_no: docData.phone_no
            }
            // Save the fetched data to localStorage
            localStorage.setItem('userData', JSON.stringify(userData.value))
          } else {
            console.log('No such document found!')
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error)
        })
    } catch (err) {
      console.error('Error:', err)
    }
  }

  // Log out function
  const logOutUser = (): void => {
    signOut(auth).then(() => {
      localStorage.removeItem('userData')
      router.push('/sign-in')
    })
  }
  
  onMounted(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      userData.value = JSON.parse(storedData)
    } else {
      getDataForLoggedInUser()
    }
  })
  
  watch(loggedInUser, (newVal) => {
    if (newVal) {
      getDataForLoggedInUser()
    }
  })
  
  return {
    userData,
    getUserData,
    getDataForLoggedInUser,
    logOutUser
  }
})
