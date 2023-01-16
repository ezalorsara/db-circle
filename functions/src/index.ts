import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const cors = require('cors')({ origin: true })

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const saveInputText = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { text } = request.body
    console.log('text: ', text)
    await admin.firestore().collection('Texts').doc('inputfield').set({
      text,
    })

    response.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.send('Hello from Firebase!')
  })
})
