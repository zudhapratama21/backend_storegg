const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) throw err

  const db = client.db('storeegg')

  db.collection('user').find().toArray((err, result) => {

    if (err) throw err
    console.log(result)

  })
})