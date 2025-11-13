import { sendSuccess, sendError } from '../utils/response.js';
import { validateContact } from '../utils/validation.js';
import { createContact } from '../models/contactModel.js';

const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phoneNo, message } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate input
    const validation = validateContact({ name, email, phoneNo, message });
    if (!validation.isValid) {
      return sendError(res, 'Validation failed', 400, validation.errors);
    }

    // Create contact message
    const contactData = await createContact(userId, {
      name,
      email,
      phoneNo,
      message,
    });

    return sendSuccess(
      res,
      {
        id: contactData.id,
        user_id: contactData.user_id,
        name: contactData.name,
        email: contactData.email,
        phone_no: contactData.phone_no,
        message: contactData.message,
        created_at: contactData.created_at,
      },
      'Contact message sent successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createContactMessage,
};

