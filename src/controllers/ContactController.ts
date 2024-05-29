import { Context } from 'koa';
import { Contact } from '../models/Contact';
import { InvalidArgumentsError } from '../utils/errors';

export default class ContactController {
  static async getContacts(ctx: Context) {
    const contacts = await Contact.getAllContacts();
    ctx.body = contacts;
  }

  static async getContact(ctx: Context) {
    const cid = parseInt(ctx.params.id);
    if (isNaN(cid)) {
      throw new InvalidArgumentsError('Неверный ID контакта');
    }
    const contact = await Contact.getContactById(cid);
    if (contact) {
      ctx.body = contact;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Контакт не найден' };
    }
  }

  static async createContact(ctx: Context) {
    const { name, surname, post } = JSON.parse(ctx.request.body);
    if (!name || !surname || !post) {
      throw new InvalidArgumentsError('Не все поля заполнены');
    }
    const newContact = await Contact.createContact(name, surname, post);
    ctx.status = 201;
    ctx.body = newContact;
  }

  static async updateContact(ctx: Context) {
    const cid = parseInt(ctx.params.id);
    const { name, surname, post } = JSON.parse(ctx.request.body);
    if (isNaN(cid)) {
      throw new InvalidArgumentsError('Неверный ID контакта');
    }
    if (!name || !surname || !post) {
      throw new InvalidArgumentsError('Не все поля заполнены');
    }
    const updatedContact = await Contact.updateContact(cid, name, surname, post);
    if (updatedContact) {
      ctx.body = updatedContact;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Контакт не найден' };
    }
  }
}