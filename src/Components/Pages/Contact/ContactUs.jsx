import { useRef } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_5ntdame", "template_ulafixq", form.current, {
        publicKey: "q__Ik0tfgxTFRI-IR",
      })
      .then(
        () => {
          toast.success("email send sucessfully!");
          console.log("SUCCESS!");
        },
        (error) => {
          toast.error(error.text);
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need assistance? Feel free to reach out to us,
            and we'll respond promptly.
          </p>
        </div>

        {/* Form Section */}
        <div className="mt-10">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  autoComplete="name"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 p-4 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Full Name"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="user_email"
                  id="email-address"
                  autoComplete="email"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 p-4 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 p-4 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Subject"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 p-4 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h3>
          <p className="mt-4 text-base text-gray-600">
            <span className="font-semibold">Email:</span> support@newsgrid.com
          </p>
          <p className="mt-1 text-base text-gray-600">
            <span className="font-semibold">Phone:</span> +1 (123) 456-7890
          </p>
          <p className="mt-1 text-base text-gray-600">
            <span className="font-semibold">Address:</span> 123 NewsGrid Avenue,
            New York, NY 10001, USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
