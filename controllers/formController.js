const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const userEmail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASSWORD;
const mainGmail = process.env.MAIN_GMAIL

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});

/**
 * Basic email validation (can be enhanced)
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Handle form submissions
 */
exports.submitForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and message',
      });
    }

    const isUserEmailValid = email && isValidEmail(email);

    // Main mail to you (portfolio owner)
    const toOwnerMail = {
      from: `"Portfolio Contact" <${userEmail}>`,
      to: userEmail,
      subject: `New Portfolio Message: ${subject || 'No Subject'}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        ${isUserEmailValid ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: isUserEmailValid ? email : undefined,
    };

    // Optional confirmation email back to user
    const toUserMail = isUserEmailValid
      ? {
          from: `"Aryan Portfolio" <${mainGmail}>`,
          to: email,
          subject: "We've received your message!",
          html: `
            <p>Hi ${name},</p>
            <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you shortly.</p>
            <p><strong>Your message:</strong></p>
            <blockquote>${message}</blockquote>
            <p>Cheers,<br/>Aryan</p>
          `,
        }
      : null;

    // Send to yourself
    await transporter.sendMail(toOwnerMail);

    // Send confirmation if valid email
    if (toUserMail) {
      await transporter.sendMail(toUserMail);
    }

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    });

  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};
