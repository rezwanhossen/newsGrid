import useAuth from "../../Hook/useAuth/useAuth";

const UsersDeshboard = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, emailVerified } = user;

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10 px-4">
      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={photoURL}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{displayName}</h2>
          <p className="text-gray-600">{email}</p>

          {/* Email Verified */}
          <p className={`mt-2 text-sm ${emailVerified ? "text-green-500" : "text-red-500"}`}>
            {emailVerified ? "Email Verified" : "Email Not Verified"}
          </p>
        </div>
      </div>

      {/* Additional Info or Buttons */}
      <div className="mt-6 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UsersDeshboard;
