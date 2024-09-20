const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-center md:text-left">
          {/* About Section */}
          <div className="col-span-2">
            <h4 className="text-2xl font-semibold text-white mb-4">About Us</h4>
            <p className="text-gray-400 mb-6">
              We are a trusted news source delivering the latest breaking news, 
              in-depth articles, and unbiased journalism. Our mission is to keep 
              the public informed with accurate and timely news updates.
            </p>
            <p className="text-gray-400">
              Join millions of readers who rely on us to stay up-to-date on global events.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-2xl font-semibold text-white mb-4">Quick Links</h4>
            <ul>
              {["Home", "Politics", "World", "Sports", "Entertainment", "Technology", "Health"].map((link, index) => (
                <li className="mb-2" key={index}>
                  <a href="#" className="hover:text-red-500 transition duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-2xl font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">Email: contact@newspaper.com</p>
            <p className="text-gray-400 mb-2">Phone: +123 456 789</p>
            <p className="text-gray-400 mb-4">Address: 123 News St, City, Country</p>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-2xl font-semibold text-white mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest news and articles. Subscribe to our newsletter.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 mb-4 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-red-500"
              />
              <button className="w-full bg-red-500 hover:bg-red-600 transition duration-300 text-white font-semibold py-2 rounded">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 mb-6">
            {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon, index) => (
              <a href="#" key={index} className="text-gray-400 hover:text-red-500 transition duration-300">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-center">
            &copy; 2024 Your Newspaper Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
