import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


var firebaseConfig = {
  apiKey: "AIzaSyBdAVNLz1RlWo4XTpZlnHibXnzMaWxpAbE",
  authDomain: "vue-assignment-project.firebaseapp.com",
  projectId: "vue-assignment-project",
  storageBucket: "vue-assignment-project.firebasestorage.app",
  messagingSenderId: "392852999455",
  appId: "1:392852999455:web:ebc974a419c6c13c26f42a",
  measurementId: "G-EEQLLSDHTK"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(firebaseApp)
const db: Firestore = getFirestore(firebaseApp)
let analytics: Analytics | undefined
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(firebaseApp)
  }
})

export {auth, db, analytics, firebaseApp}
