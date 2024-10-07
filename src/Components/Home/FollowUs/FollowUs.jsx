
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FollowUs = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-500 pb-2">Follow Us</h2>
      <p className="text-gray-600 mb-4">Stay connected with us on social media for the latest updates and news!</p>
      <ul className="space-y-4">
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition duration-200">
            <FaFacebookF className="text-blue-600 text-xl mr-3" />
            <span className="text-lg font-medium text-gray-700">Facebook</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition duration-200">
            <FaTwitter className="text-blue-400 text-xl mr-3" />
            <span className="text-lg font-medium text-gray-700">Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition duration-200">
            <FaInstagram className="text-pink-600 text-xl mr-3" />
            <span className="text-lg font-medium text-gray-700">Instagram</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition duration-200">
            <FaLinkedinIn className="text-blue-700 text-xl mr-3" />
            <span className="text-lg font-medium text-gray-700">LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FollowUs;
