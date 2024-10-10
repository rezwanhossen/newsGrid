import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import { AuthContext } from "../../Fairbase/AuthProvider";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const AddNews = () => {
  const [selectedDate , setSelectedDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const {user} = useContext(AuthContext)



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
    const urlToImage = form.urlToImage.value
    const category = form.category.value

    console.log(author , content , url , title , publishedAt , description , urlToImage);

    const addNews ={
      userName,
      email,
       author,
       content,
       url,
       title,
       publishedAt,
       description,
       urlToImage,
       status : 'pending',
       category
    }

    console.log(addNews);

    const res = axios.post(`${axiosPublic}/addNews` , addNews)
     axiosPublic.post('/addNews' , addNews)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your news has been added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        
      }
    })
    .catch(error => {
      console.error(error);
    })
    
  }
  return (
    <div className="my-5">
      
      <div className="text-center heebo">
          <h2 className="text-2xl font-bold">Add News</h2>
        </div>
      <div className="hero  min-h-screen">
      
        
    
  <div className="hero-content">
    <div className="card bg-slate-200  shadow-lg rounded-none ">
      <form className="card-body lg:w-[700px]" onSubmit={handleSubmit}>
          <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4">
          <div className="form-control w-full ">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Author <span className="text-lg text-red-600">  *</span></span>
          </label>
          <input type="text"name="author" placeholder="author" defaultValue={user?.displayName} className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none" required />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Content <span className="text-lg text-red-600">  *</span></span>
          </label>
          <input type="text"name="content" placeholder="Content" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"required />
          
        </div>

          </div>
        
        
        

        <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Date <span className="text-lg text-red-600">  *</span></span>
          </label>
          <DatePicker
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)} required name="publishedAt"className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none w-full"
      
    />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Title <span className="text-lg text-red-600">  *</span></span>
          </label>
          <input type="text" placeholder="title"name="title" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"required />
          
        </div>

        </div>


        <div className="flex gap-16 flex-col lg:flex-row items-center bg-white rounded-lg py-5 px-4"><div className="form-control w-full">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Image <span className="text-lg text-red-600">  *</span></span>
          </label>
          <input type="text" placeholder="image"name="urlToImage" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"required />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">News URL <span className="text-lg text-red-600">  *</span></span>
          </label>
          <input type="text" placeholder="url"name="url" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none" required />
          
        </div>

        </div>
        <div className="form-control w-full bg-white rounded-lg py-5 px-4">
          <label className="label">
            <span className="text-base font-semibold text-[#005689]">Category News <span className="text-lg text-red-600">  *</span></span>
          </label>
          {/* <input type="text" placeholder="category news"name="category" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"required /> */}
          <select className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none"name="category" required>
  
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
            <span className="text-base font-semibold text-[#005689]">Description <span className="text-lg text-red-600">  *</span></span>
          </label>
          <textarea name="description" id="" className="border-b-2  border-[#005689] focus:border-b-2 focus:border-[#7baac5] outline-none" placeholder="description ( 250-300 ) words"></textarea>
          
        </div>



        <div className="form-control mt-6">
          <button className="btn bg-[#005689] text-white hover:bg-[#043d5e]">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default AddNews;
