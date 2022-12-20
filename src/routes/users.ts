import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import verifyAuthToken from 'auth';
import bcrypt from 'bcrypt';

dotenv.config();
const usersRoute = express.Router();
const secret = process.env['JWT_SECRET'];


// const hash = bcrypt.hashSync(
//   u.password + pepper, 
//   parseInt(saltRounds)
// );
// bcrypt.compareSync(password+pepper, user.password_digest)

usersRoute.get('/', verifyAuthToken, 
(req: express.Request, res: express.Response): void => {

  
})

usersRoute.get('/show', (req: express.Request, res: express.Response): void => {
})

usersRoute.get('/create', (req: express.Request, res: express.Response): void => {
})

export default usersRoute;



// async create(u: User): Promise<User> {
//   try {
//     // @ts-ignore
//     const conn = await Client.connect()
//     const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

//     const hash = bcrypt.hashSync(
//       u.password + pepper, 
//       parseInt(saltRounds)
//     );

//     const result = await conn.query(sql, [u.username, hash])
//     const user = result.rows[0]

//     conn.release()

//     return user
//   } catch(err) {
//     throw new Error(`unable create user (${u.username}): ${err}`)
//   } 
// }

// async authenticate(username: string, password: string): Promise<User | null> {
//   const conn = await Client.connect()
//   const sql = 'SELECT password_digest FROM users WHERE username=($1)'

//   const result = await conn.query(sql, [username])

//   console.log(password+pepper)

//   if(result.rows.length) {

//     const user = result.rows[0]

//     console.log(user)

//     if (bcrypt.compareSync(password+pepper, user.password_digest)) {
//       return user
//     }
//   }

//   return null
// }

// const create = async (req: Request, res: Response) => {
//   try {
//       const authorizationHeader = req.headers.authorization
//       const token = authorizationHeader.split(' ')[1]
//       jwt.verify(token, process.env.TOKEN_SECRET)
//   } catch(err) {
//       res.status(401)
//       res.json('Access denied, invalid token')
//       return
//   }

// }

// const verifyAuthToken = (req: Request, res: Response, next) => {
//   try {
//       const authorizationHeader = req.headers.authorization
//       const token = authorizationHeader.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

//       next()
//   } catch (error) {
//       res.status(401)
//   }
// }