import express from 'express'
import * as db from '../database/db.js'
import bcrypt from 'bcrypt'

const router = express.Router()

const saltRounds = 10

router.get('/',async(req, res) => {
    const user = await db.query('SELECT * FROM users')
    res.send(user.rows)
})

router.get('/:id', async (req, res)=>{
    console.log(req.params);
    const id = req.params.id

    const user = await db.query('SELECT * FROM users WHERE userid = $1', [id])

    res.send(user.rows[0])
})

router.post('/', async (req, res) => {  
        const user = req.body
        if(!user.name || !user.email || !user.password)
        {
            return res.send('erro')
        }

        bcrypt.hash(user.password, saltRounds, async function(err, hash){
            const nUser = await db.query('INSERT INTO users (userName, userPassword, userEmail) VALUES ($1, $2,$3)',
            [user.name, hash, user.email])        
        })

               
    res.send('haha')
})


router.put('/', (req, res)=>{

})

export default router