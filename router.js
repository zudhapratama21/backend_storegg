const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const connection = require('./connection')


router.get('/', (req, res) => {
    res.send('lo hee!')
  })

router.get('/user', async (req,res) => {
  try {    
      const db = connection.db('storeegg')
      const users = await db.collection('user').find().toArray();
      res.send({data : users});
  } catch (err) {
     res.send({message : err.message || 'internal message error'})
  }
})

router.post('/user', async (req,res) => {
  try {    
      const { name,email } = req.body;
      const db = connection.db('storeegg');

      const users = await db.collection('user').insertOne({
        name,
        email
      });

      res.send({data : users})        

      // if (users.insertedCount === 1) {
      //   res.send({message : 'berhasil ditambahkan'})        
      // } else {
      //   res.send({message : 'gagal menambahkan'})
      // }

      res.send({message :'berhasil ditambahkan'});
  } catch (err) {
     res.send({message : err.message || 'internal message error'})
  }
})

router.put('/user/:id', async (req,res) => {
  try {    
      const { id } = req.params
      const { name,email } = req.body;
      const db = connection.db('storeegg');

      const users = await db.collection('user').updateOne({_id : ObjectId(id)},{
        $set : {
          name,
          email
        }
      });

      console.log(users)

      if (users.modifiedCount === 1) {
        res.send({message : 'berhasil diubah'})        
      } else {
        res.send({message : 'gagal menambahkan'})
      }
      
  } catch (err) {
     res.send({message : err.message || 'internal message error'})
  }
})

router.delete('/user/:id', async (req,res) => {
  try {    
      const { id } = req.params      
      const db = connection.db('storeegg');

      const users = await db.collection('user').deleteOne({_id : ObjectId(id)});

      console.log(users)

      if (users.deletedCount === 1) {
        res.send({message : 'berhasil dihapus'})        
      } else {
        res.send({message : 'gagal menghapus'})
      }
      
  } catch (err) {
     res.send({message : err.message || 'internal message error'})
  }
})

  
module.exports = router