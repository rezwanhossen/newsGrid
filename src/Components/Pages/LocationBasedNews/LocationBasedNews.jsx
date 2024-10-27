import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../../Shared/Card";
import ReadMoreLink from "../../../Shared/ReadMoreLink";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Loading from "../../Loading/Loading";
import { useDispatch } from "react-redux";
import { setLocationBasedNews } from "../../../features/allNews/allNewsSlice";


const LocationBasedNews = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const [locationBasedNews, setLocationBasednews] = useState([]);
  const [loading , setLoading] = useState(true);

  // redux
  const dispatch = useDispatch();









  const [menuValue, setMenuValue] = useState("2");
  // console.log("menuValue : ", menuValue);
  const handleMenu = (value) => {
    setMenuValue(value);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
            .then((response) => {
              // console.log(response.data.address || 'Unknown location')

              setCity(response.data.address.city || "Unknown location");
              setCountry(response?.data?.address?.country);

              axios
                .get(
                  `https://newsapi.org/v2/everything?q=${response?.data?.address?.city}&apiKey=${import.meta.env.VITE_NAIMUL_API_KEY}`
                )
                .then((res) => {
                  // console.log(res?.data)-8/


                  setLocationBasednews(res?.data?.articles);
                  dispatch(setLocationBasedNews(res?.data?.articles))
                  setLoading(false);

                });
            })
            .catch((error) => {
              setError("Unable to retrive location name");
            });
        },

        (error) => {
          setError("unable to retrive your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, [city , dispatch]);


  if(loading){
    return <Loading></Loading>
  }


  if(loading){
    return <Loading></Loading>
  }

  return (
    <div>



          <div>
          {
    location?.latitude && location?.longitude &&
      <MapContainer center={[location?.latitude, location?.longitude]} zoom={13}  className="mt-[171px] lg:mt-[136px] z-10 w-full h-[350px] lg:h-[500px]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location?.latitude, location?.longitude]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer> 
}

          </div>

      

      <div className="my-10 md:my-20 container mx-auto heebo text-black">
        <div className="flex flex-col md:flex-row justify-center md:justify-between mx-3 md:mx-0 md:px-6 py-4 rounded bg-base-300  items-center  mb-10">
          <h1 className="text-xl md:text-2xl    font-bold heebo  ">
            Location Based News
          </h1>

          <div className="flex flex-row-reverse md:flex-row  lg:gap-10 items-center">
            <div className="flex items-center gap-4">
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr4.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2  rounded"
                  onClick={() => handleMenu("4")}
                />
              </div>
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr3.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("3")}
                />
              </div>
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr2.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("2")}
                />
              </div>
              <div className="hover:cursor-pointer hidden lg:block">
                <img
                  src="https://departmental-store-02.web.app/images/gr.svg"
                  alt="nai"
                  className="w-[40px] h-[40px] bg-base-200 p-2 rounded"
                  onClick={() => handleMenu("1")}
                />
              </div>
            </div>

            <h1 className="text-base md:text-xl     font-bold heebo ">
              My City : {city} , {country}{" "}
            </h1>
          </div>
        </div>
        {/* grid-cols-1 */}

        {!error ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-${menuValue} gap-8`}
          >
            {locationBasedNews?.map((news) => {
              return menuValue === "1" ? (
                <div className="mx-4 md:mx-0 bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700">
                  <div className="flex flex-col md:flex-row  gap-4 md:gap-6   relative ">
                    <div className="w-full md:w-[30%] h-[250px] rounded">
                      <img
                        src={
                          news?.urlToImage ||
                          news?.image ||
                          news?.image_url ||
                          news?.url_image
                        }
                        alt=""
                        className="h-full  object-cover w-full "
                      />
                    </div>

                    <div className="space-y-3 p-5 w-full md:w-[70%]   heebo ">
                      <h3 className="text-xl  font-medium">
                        {news?.title.slice(0, 100)}...
                      </h3>
                      <p className="text-lg font-bold">
                        Published Date :{" "}
                        <span className="bg-[#005689] text-white px-2 rounded">
                          {news?.publishedAt.slice(0, 10)}
                        </span>
                      </p>
                      <p className="text-lg ">
                        {news?.description.slice(0, 200)}
                      </p>
                      <ReadMoreLink news={news}></ReadMoreLink>
                    </div>
                  </div>
                </div>
              ) : menuValue === "2" ? (
                <div className="mx-4 md:mx-0 bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden lg:h-[252px] shadow-md shadow-gray-700">
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 md:h-full   relative ">
                    <div className="w-full lg:w-[35%] h-[220px] lg:h-full p-3 rounded">
                      <img
                        src={
                          news?.urlToImage ||
                          news?.image ||
                          news?.image_url ||
                          news?.url_image
                        }
                        alt=""
                        className="h-full  object-cover w-full "
                      />
                    </div>

                    <div className="space-y-3 p-5 lg:w-[65%]   heebo ">
                      <h3 className="text-lg md:text-xl  font-medium">
                        {news?.title.slice(0, 30)}...
                      </h3>
                      <p className="text-lg font-bold">
                        Published Date :{" "}
                        <span className="bg-[#005689] text-white px-2 rounded">
                          {news?.publishedAt.slice(0, 10)}
                        </span>
                      </p>
                      <p className="text-lg hidden md:block ">
                        {news?.description.slice(0, 60)}
                      </p>
                      <ReadMoreLink news={news}></ReadMoreLink>
                    </div>
                  </div>
                </div>
              ) : menuValue === "3" ? (
                <div className="mx-4 md:mx-0 bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700">
                  <div className="   relative ">
                    <div className="w-full h-[250px]">
                      <img
                        src={
                          news?.urlToImage ||
                          news?.image ||
                          news?.image_url ||
                          news?.url_image
                        }
                        alt=""
                        className="h-full  object-cover w-full "
                      />
                    </div>

                    <div className=" p-5 space-y-2   heebo ">
                      <h3 className="text-xl  font-medium">
                        {news?.title.slice(0, 45)}...
                      </h3>
                      <p className="text-lg font-bold">
                        Published Date :{" "}
                        <span className="bg-[#005689] text-white px-2 rounded">
                          {news?.publishedAt.slice(0, 10)}
                        </span>
                      </p>
                      <p className="text -lg ">
                        {news?.description?.slice(0, 100)}
                      </p>
                      <ReadMoreLink news={news}></ReadMoreLink>
                    </div>
                  </div>
                </div>
              ) : (
                <Card news={news}></Card>
              );
            })}
          </div>
        ) : (
          <h1 className="text-3xl text-red-600">Error : {error}</h1>
        )}
      </div>
    </div>
  );
};

export default LocationBasedNews;
