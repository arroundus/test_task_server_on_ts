"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contact_1 = require("../models/Contact");
const errors_1 = require("../utils/errors");
class ContactController {
    static async getContacts(ctx) {
        const contacts = await Contact_1.Contact.getAllContacts();
        ctx.body = contacts;
    }
    static async getContact(ctx) {
        const cid = parseInt(ctx.params.id);
        if (isNaN(cid)) {
            throw new errors_1.InvalidArgumentsError('Неверный ID контакта');
        }
        const contact = await Contact_1.Contact.getContactById(cid);
        if (contact) {
            ctx.body = contact;
        }
        else {
            ctx.status = 404;
            ctx.body = { message: 'Контакт не найден' };
        }
    }
    static async createContact(ctx) {
        const { name, surname, post } = JSON.parse(ctx.request.body);
        if (!name || !surname || !post) {
            throw new errors_1.InvalidArgumentsError('Не все поля заполнены');
        }
        const newContact = await Contact_1.Contact.createContact(name, surname, post);
        ctx.status = 201;
        ctx.body = newContact;
    }
    static async updateContact(ctx) {
        const cid = parseInt(ctx.params.id);
        const { name, surname, post } = JSON.parse(ctx.request.body);
        if (isNaN(cid)) {
            throw new errors_1.InvalidArgumentsError('Неверный ID контакта');
        }
        if (!name || !surname || !post) {
            throw new errors_1.InvalidArgumentsError('Не все поля заполнены');
        }
        const updatedContact = await Contact_1.Contact.updateContact(cid, name, surname, post);
        if (updatedContact) {
            ctx.body = updatedContact;
        }
        else {
            ctx.status = 404;
            ctx.body = { message: 'Контакт не найден' };
        }
    }
}
exports.default = ContactController;
//# sourceMappingURL=ContactController.js.map