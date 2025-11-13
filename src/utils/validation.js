export const validateContact = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required and must be a string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Email must be a valid email address');
    }
  }

  // Phone number validation
  if (!data.phoneNo || typeof data.phoneNo !== 'string') {
    errors.push('Phone number is required and must be a string');
  } else if (data.phoneNo.trim().length < 10) {
    errors.push('Phone number must be at least 10 characters long');
  } else if (data.phoneNo.trim().length > 20) {
    errors.push('Phone number must be less than 20 characters');
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required and must be a string');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.trim().length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

