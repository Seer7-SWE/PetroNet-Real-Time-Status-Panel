import { db } from "./firebaseAdmin.js"

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

fastify.post("/sensor", async (req, res) => {
  const data = req.body;

  await db.ref("sensors/" + data.sensorId).set(data);

  return { success: true };
});


exports.checkSensorUpdate = functions.database.ref('/sensors/{sensorId}/latest')
.onWrite(async (change, context) => {
const after = change.after.val()
if(!after) return null
const sensorId = context.params.sensorId


// basic thresholds; in prod read from /sensors/{id}/meta/thresholds
const thresholds = { temperature: 100, pressure: 400 }
const notifications = []
if(after.temperature > thresholds.temperature) notifications.push({type:'temperature', value: after.temperature})
if(after.pressure > thresholds.pressure) notifications.push({type:'pressure', value: after.pressure})


if(notifications.length > 0){
const alertRef = admin.database().ref('/alerts').push()
await alertRef.set({ sensorId, notifications, ts: new Date().toISOString(), acknowledged: false })


// optional: send FCM here (requires tokens or topic subscription)
}
return null
})