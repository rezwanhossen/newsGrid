import useAuth from "../../Hook/useAuth/useAuth";

const UsersDashboard = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, emailVerified } = user;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-10 px-6">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={photoURL}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-6 border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {displayName}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{email}</p>

          {/* Email Verified Badge */}
          <p
            className={`px-4 py-2 rounded-full text-xs font-semibold mt-2 ${
              emailVerified ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {emailVerified ? "Email Verified" : "Email Not Verified"}
          </p>
        </div>
      </div>

      {/* Additional Info or Buttons */}
      <div className="mt-8 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
          Edit Profile
        </button>
      </div>

      {/* Optional Future Features or Info */}
      <div className="mt-10 text-gray-500 text-center">
        <p className="text-sm">
          Want to customize your profile? More options coming soon!
        </p>
      </div>
    </div>
  );
};

export default UsersDashboard;
