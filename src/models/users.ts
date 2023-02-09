import client from "../database";
import bcrypt from "bcrypt";
import { PEPPER, SALT_ROUNDS } from "../constatns";

export type User = {
  userId: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserController {
  async index(userId: string): Promise<User> {
    try {
      // Query And It's data
      const userData = [userId];
      const sql = "DELETE FROM users WHERE userId=$($1)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];

      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to delete user (${userId}): ${err}`);
    }
  }

  async show(userId: string): Promise<User> {
    try {
      // Query And It's data
      const userData = [userId];
      const sql = "DELETE FROM users WHERE userId=$($1)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];

      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to delete user (${userId}): ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // Prepare data
      const hash = bcrypt.hashSync(
        u.password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );

      // Query And It's data
      const userData = [u.firstname, u.lastname, hash];
      const sql =
        "INSERT INTO users (firstname, lastname, password_digest)" +
        "VALUES($1, $2, $3) RETURNING (userId, firstname, lastname)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];

      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err}`
      );
    }
  }

  async authenticate(userId: string, password: string): Promise<User | null> {
    // Query And It's data
    const userData = [userId];
    const sql = "SELECT password_digest FROM users WHERE userId=($1)";

    // Connection
    const conn = await client.connect();

    // Result
    const result = await conn.query(sql, userData);

    if (result.rows.length) {
      const user_found = result.rows[0];
      if (bcrypt.compareSync(password + PEPPER, user_found.password)) {
        // Release
        conn.release();
        user_found.password = ""; // Return user without password
        return user_found;
      }
    }

    // Release
    conn.release();
    return null;
  }
}
