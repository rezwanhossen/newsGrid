
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FollowUs = () => {
  return (
    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-[#3BAFDA] font-bold mb-4 border-b-2 border-[#007E7E] pb-2">Follow Us</h2>
      <p className="text-[#767676] mb-4">Stay connected with us on social media for the latest updates and news!</p>
      <ul className="space-y-4">
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-white transition duration-200">
            <FaFacebookF className="text-blue-600 text-xl mr-3" />
            <span className="text-lg font-medium text-[#4A4A4A]">Facebook</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-white transition duration-200">
            <FaTwitter className="text-blue-400 text-xl mr-3" />
            <span className="text-lg font-medium text-[#4A4A4A]">Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-white transition duration-200">
            <FaInstagram className="text-pink-600 text-xl mr-3" />
            <span className="text-lg font-medium text-[#4A4A4A]">Instagram</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-white transition duration-200">
            <FaLinkedinIn className="text-blue-700 text-xl mr-3" />
            <span className="text-lg font-medium text-[#4A4A4A]">LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FollowUs;
