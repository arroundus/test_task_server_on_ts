import { Pool } from "pg";

export class Contact {
  cid: number;
  name: string;
  surname: string;
  post: string;
  static pool: Pool;
  constructor(cid: number, name: string, surname: string, post: string) {
    this.cid = cid;
    this.name = name;
    this.surname = surname;
    this.post = post;
  }

  static async getAllContacts() {
    const query = `
      SELECT c.cid, c.name, c.surname, c.post,
        COALESCE((SELECT COUNT(*) FROM calls WHERE calls.src = c.cid), 0) as outgoing_calls_count,
        COALESCE((SELECT COUNT(*) FROM calls WHERE calls.trg = c.cid), 0) as incoming_calls_count
      FROM contacts c;
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  static async getContactById(cid: number) {
    const query = `
      SELECT c.cid, c.name, c.surname, c.post,
        json_agg(json_build_object(
          'type', 
          CASE 
            WHEN c.cid = calls.src THEN 'outgoing'
            WHEN c.cid = calls.trg THEN 'incoming'
          END,
          'status', calls.status,
          'duration', calls.duration,
          'partyName', 
          CASE 
            WHEN c.cid = calls.src THEN trg_contact.name || ' ' || trg_contact.surname
            WHEN c.cid = calls.trg THEN src_contact.name || ' ' || src_contact.surname
          END
        )) as calls
      FROM contacts c
      LEFT JOIN calls ON c.cid = calls.src OR c.cid = calls.trg
      LEFT JOIN contacts src_contact ON calls.src = src_contact.cid
      LEFT JOIN contacts trg_contact ON calls.trg = trg_contact.cid
      WHERE c.cid = $1
      GROUP BY c.cid;
    `;
    const result = await this.pool.query(query, [cid]);
    return result.rows[0];
  }

  static async createContact(name: string, surname: string, post: string) {
    const query = `
      INSERT INTO contacts (name, surname, post) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const result = await this.pool.query(query, [name, surname, post]);
    return result.rows[0];
  }

  static async updateContact(cid: number, name: string, surname: string, post: string) {
    const query = `
      UPDATE contacts 
      SET name = $1, surname = $2, post = $3 
      WHERE cid = $4 
      RETURNING *;
    `;
    const result = await this.pool.query(query, [name, surname, post, cid]);
    return result.rows[0];
  }
}
