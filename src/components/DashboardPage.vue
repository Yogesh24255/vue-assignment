<template>
  <div>
    <!-- Header -->
    <div class="bg-blue-600 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-md">
        <div class="flex justify-center items-center">
          <h1 class="text-xl font-semibold">Home Page</h1>
        </div>
    </div>

    <!-- Main content section -->
    <div class="pt-20 px-6">
      <div v-if="isDataAvailable" class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold mb-4">
          User Details
        </h3>
        <div class="space-y-4">
          <p><strong>Name:</strong> {{ userData.name }}</p>
          <p><strong>Email:</strong> {{ userData.email }}</p>
          <p><strong>Contact No:</strong> {{ userData.phone_no }}</p>
          <p><strong>Qualification:</strong> {{ userData.qualification }}</p>
          <p><strong>Gender:</strong> {{ userData.gender }}</p>
          <p><strong>City:</strong> {{ userData.city }}</p>
          <p><strong>Occupation:</strong> {{ userData.occupation }}</p>
        </div>
        <div class="mt-6 text-center">
          <button @click="signOut" class="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300">
            Sign out
          </button>
        </div>
      </div>
      <div v-else class="flex justify-center items-center h-full">
        <h3>
          Loading user data...
        </h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue'
import { useHomePageStore } from '@/stores/homePageStore.ts'

export default {
  name: 'Dashboard',
  setup () {
    const dashBoardStore = useHomePageStore()

    const userData = computed(() => dashBoardStore.getUserData)
    const isDataAvailable = computed(() => {
      return userData.value && Object.keys(userData.value).length > 0
    })

    const signOut = () => {
      dashBoardStore.logOutUser()
    }
    
    onMounted(() => {
      dashBoardStore.getDataForLoggedInUser()
    })

    return {
      userData,
      signOut,
      isDataAvailable
    }
  }
}
</script>
