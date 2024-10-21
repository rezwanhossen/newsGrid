
const ContactUs = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            We’d love to hear from you! Reach out to us with your inquiries or feedback, and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-10">
          <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full shadow-md sm:text-sm border-gray-300 p-4 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Abraham Linkon"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email-address"
                  autoComplete="email"
                  className="block w-full shadow-md sm:text-sm border-gray-300 p-4 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="block w-full shadow-md sm:text-sm border-gray-300 p-4 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Subject of your message"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="block w-full shadow-md sm:text-sm border-gray-300 p-4 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 ease-in-out transform hover:scale-105"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-cyan-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transform transition duration-300 ease-in-out hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Our Contact Information</h3>
          <p className="mt-4 text-base text-gray-600">
            <span className="font-semibold">Email:</span> support@newsgrid.com
          </p>
          <p className="mt-1 text-base text-gray-600">
            <span className="font-semibold">Phone:</span> +1 (123) 456-7890
          </p>
          <p className="mt-1 text-base text-gray-600">
            <span className="font-semibold">Address:</span> 123 NewsGrid Avenue, New York, NY 10001, USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
