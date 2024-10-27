import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import { AuthContext } from "../../Fairbase/AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hook/useAxiosCommon";

const AddNews = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Track submit button state
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const axiosCommon = useAxiosCommon();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/payment");
      return data;
    },
  });
  const matchingPayment = payments.find((pay) => pay?.email === user?.email);

  // Handle description change and word count validation
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const wordCount = text.trim().split(/\s+/).length;

    setDescription(text);

    if (wordCount > 300) {
      setIsSubmitDisabled(true); // Disable submit if word count exceeds 300
    } else {
      setIsSubmitDisabled(false); // Enable submit if within limit
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = user?.displayName;
    const email = user?.email;
    const author = form.author.value;
    const content = form.content.value;
    const url = form.url.value;
    const title = form.title.value;
    const publishedAt = form.publishedAt.value;
    const description = form.description.value;
    const urlToImage = form.urlToImage.value;
    const category = form.category.value;

    const addNews = {
      userName,
      email,
      author,
      content,
      url,
      title,
      publishedAt,
      description,
      urlToImage,
      status: "pending",
      category,
    };

    axiosPublic
      .post("/addNews", addNews)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your news has been added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="my-5">
      <div className="text-center heebo">
        <h2 className="text-2xl font-bold mt-8 text-[#006589]">Add News</h2>
      </div>
      <div className="hero  min-h-screen">
        <div className="hero-content">
          <div className="card  bg-white   shadow-lg rounded-lg ">
            <form className="card-body lg:w-[700px]" onSubmit={handleSubmit}>
              <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      Author <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="author"
                    defaultValue={user?.displayName}
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      Content <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      Date <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    required
                    name="publishedAt"
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      Title <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="title"
                    name="title"
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      Image <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="image"
                    name="urlToImage"
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-base font-semibold text-[#005689]">
                      News URL <span className="text-lg text-red-600"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="url"
                    name="url"
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full bg-white rounded-lg py-5 px-4">
                <label className="label">
                  <span className="text-base font-semibold text-[#005689]">
                    Category News{" "}
                    <span className="text-lg text-red-600"> *</span>
                  </span>
                </label>
                <select
                  className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                  name="category"
                  required
                >
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="general">General</option>
                  <option value="health">Health</option>
                  <option value="science">Science</option>
                  <option value="sports">Sports</option>
                  <option value="technology">Technology</option>
                  <option value="politics">Politics</option>
                </select>
              </div>

              <div className="form-control w-full bg-white rounded-lg py-5 px-4">
                <label className="label">
                  <span className="text-base font-semibold text-[#005689]">
                    Description <span className="text-lg text-red-600"> *</span>
                  </span>
                </label>
                {matchingPayment ? (
                  <textarea
                    name="description"
                    id=""
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    placeholder="description words"
                  ></textarea>
                ) : (
                  <textarea
                    name="description"
                    id=""
                    className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"
                    placeholder="description (max 300 words)"
                    value={description}
                    onChange={handleDescriptionChange} // Handle input change
                    required
                  ></textarea>
                )}
              </div>

              <div className="form-control mt-6 bg-white rounded-lg py-5 px-4">
                <button
                  className={`bg-[#006589] hover:bg-[#1c3eaf] w-full py-3 text-white rounded-md cursor-pointer`}
                  type="submit"
                  disabled={isSubmitDisabled} // Disable button based on word count
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
