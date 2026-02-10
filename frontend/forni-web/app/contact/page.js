import{React} from 'react';
import ContactForm from '../../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="contact-page flex flex-col items-center justify-center w-screen h-screen bg-orange-600">
        <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-2xl">If you have any questions or inquiries, please feel free to reach out to us using the form below.</p>
        </div>
      <ContactForm />
    </div>
  );
}
export default ContactPage;