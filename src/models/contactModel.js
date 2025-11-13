import supabase from '../config/supabase.js';

export const createContact = async (userId, contactData) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        user_id: userId,
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        phone_no: contactData.phoneNo.trim(),
        message: contactData.message.trim(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

