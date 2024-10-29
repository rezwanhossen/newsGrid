import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto"; // Import Chart.js directly

const AdminHome = () => {
  const [likeData, setLikeData] = useState([]); // Initialize as an empty array
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstanceRef = useRef(null); // Reference to the Chart instance

  useEffect(() => {
    const fetchLikeCounts = async () => {
      try {
        const response = await axios.get("/likeCount");
        console.log("API Response:", response.data); // Log the API response
        setLikeData(response.data || []); // Ensure the data is an array
      } catch (error) {
        console.error("Error fetching like counts:", error);
      }
    };

    fetchLikeCounts();
  }, []);

  useEffect(() => {
    // Destroy any existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Check if likeData is an array before proceeding
    if (!Array.isArray(likeData)) return;

    console.log("Like Data:", likeData); // Log the like data

    // Prepare data and options for the new chart
    const data = {
      labels: likeData.map((item) => item.newsId),
      datasets: [
        {
          label: "Likes",
          data: likeData.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    console.log("Chart Data:", data); // Log the chart data

    // Create new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [likeData]); // Re-run whenever likeData changes

  return (
    <div>
      <h2 className="text-3xl font-bold">This is Admin Home</h2>
      <div style={{ width: "80%", margin: "auto" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AdminHome;
