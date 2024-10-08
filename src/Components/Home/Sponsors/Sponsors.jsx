import { useState, useEffect } from "react";

const sponsorsData = [
    {
        imgSrc: "https://www.react-fast-marquee.com/static/media/microsoft.4a9a93f0.png",
        alt: "Microsoft"
    },
    {
        imgSrc: "https://www.react-fast-marquee.com/static/media/ibm.bcec6b9a.png",
        alt: "IBM"
    },
    {
        imgSrc: "https://www.react-fast-marquee.com/static/media/dell.09332c44.png",
        alt: "Dell"
    },
    {
        imgSrc: "https://www.react-fast-marquee.com/static/media/pennsylvania.8c9f4108.png",
        alt: "Pennsylvania"
    },
    {
        imgSrc: "https://www.react-fast-marquee.com/static/media/nasa.3bf5af29.png",
        alt: "NASA"
    }
];

const Sponsors = () => {
    const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

    // Automatically change sponsors every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSponsorIndex((prevIndex) => 
                (prevIndex + 1) % sponsorsData.length
            );
        }, 5000); // 5 seconds interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="my-16 mx-2 md:mx-0">
            {/* Header */}
            <div>
                <h1 className='text-3xl text-[#4A4A4A] font-semibold text-center font-serif mb-8'><span className="text-[#007E7E]">Sponsored</span> By</h1>
            </div>

            {/* Sponsor Card Section */}
            <div className="flex justify-center">
                {/* Card for Sponsor */}
                <div className="relative flex items-center justify-center w-full max-w-3xl h-72 bg-white border shadow-lg rounded-lg transition-all duration-500 ease-in-out hover:shadow-2xl">
                    <img 
                        src={sponsorsData[currentSponsorIndex].imgSrc} 
                        alt={sponsorsData[currentSponsorIndex].alt}
                        className="w-40 h-40 object-contain"
                    />
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {sponsorsData.map((_, index) => (
                    <div 
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentSponsorIndex ? 'bg-[#00A6A6]' : 'bg-gray-300'
                        } transition-colors duration-300`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sponsors;
