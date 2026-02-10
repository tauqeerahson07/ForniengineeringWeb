"use client";
import{React} from 'react';
const HandleMessage = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  const subject = `Quotation Request from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
};

const ContactForm = () => {
  return (
    <form className="contact-form flex flex-col p-8 rounded-lg w-full max-w-md " onSubmit={HandleMessage}>
      <label htmlFor="name" className="text-white">Name:</label>
      <input type="text" id="name" name="name" className="mb-4 p-2 rounded-lg" required />

      <label htmlFor="email" className="text-white">Email:</label>
      <input type="email" id="email" name="email" className="mb-4 p-2 rounded-lg" required />

      <label htmlFor="message" className="text-white">Message:</label>
      <textarea id="message" name="message" className="mb-4 p-2 rounded-lg" required></textarea>

      <button type="submit" className="mt-8 bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">Send Message</button>
    </form>
  );
}

export default ContactForm;
