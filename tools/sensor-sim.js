import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyDxNZlK90wLkr836tFNY3rff19mrhF9V8o",
  authDomain: "petronet-real-time-statuspanel.firebaseapp.com",
  projectId: "petronet-real-time-statuspanel",
  storageBucket: "petronet-real-time-statuspanel.firebasestorage.app",
  messagingSenderId: "618378360496",
  appId: "1:618378360496:web:3ddc08264b6a26a6d22d75",
  measurementId: "G-TYK2NN57MP",
  databaseURL: "https://petronet-real-time-statuspanel-default-rtdb.firebaseio.com"
};


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)


function pushRandom(id, lat, lng){
const now = new Date().toISOString()
const payload = {
id,
location: { lat, lng },
latest: {
temperature: Math.round(50 + Math.random()*70),
pressure: Math.round(150 + Math.random()*300),
flowRate: +(5 + Math.random()*25).toFixed(2),
ts: now
}
}
set(ref(database, `sensors/${id}`), payload)
}


setInterval(() => pushRandom('sensor-001', 26.2, 50.6), 5000)
setInterval(() => pushRandom('sensor-002', 26.4, 50.9), 7000)