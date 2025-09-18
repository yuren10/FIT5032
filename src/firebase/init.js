import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDccoUthhQAX2BaudD849i21xnYKPaP8qc',
  authDomain: 'week7-yuren.firebaseapp.com',
  projectId: 'week7-yuren',
  storageBucket: 'week7-yuren.firebasestorage.app',
  messagingSenderId: '58170985293',
  appId: '1:58170985293:web:039f9487b5376abcfa0504',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

export default firebaseApp
