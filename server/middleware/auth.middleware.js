import express from 'express'
import * as db from '../database/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/', async function(req,res){
    const auth = req.headers.authorization

    const [schema, token] = auth.split(' ')

    console.log(token)   


    const user = jwt.verify(token, 'test')

    console.log('user :>> ', user);

    
    const buscaUser = await db.query('select * from users where userid = $1',[user.id])

    console.log('buscaUser :>> ', buscaUser.rows);
    return res.send('try')
    //console.log('buscaUSer.rows[0] :>> ', buscaUSer.rows[0]);
 
})

export default router