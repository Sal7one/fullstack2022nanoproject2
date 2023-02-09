import client from "../database";
import bcrypt from 'bcrypt';

import {PEPPER, SALT_ROUNDS} from '../constatns'

export type User = {
id: Number;
firstname: string;
lastname: string;
password: string;
}

export class Users {
  
    async create(u: User): Promise<User> {
        try {
          const conn = await client.connect()
          const sql = 'INSERT INTO users (username, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'
      
          const hash = bcrypt.hashSync(
            u.password + PEPPER, 
            parseInt(SALT_ROUNDS as string)
          );

          const userData = [u.firstname,u.lastname, hash]
          const result = await conn.query(sql,userData )
          const user = result.rows[0]
          conn.release()
      
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.firstname} ${u.lastname}): ${err}`)
        } 
      }
        
    async authenticate(id: Number, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE id=($1)'
      
        const result = await conn.query(sql, [id])
      
        if(result.rows.length) {
          const user = result.rows[0]
          if (bcrypt.compareSync(password+PEPPER, user['password_digest'])) {
            return user
          }
        }
        return null
}

}