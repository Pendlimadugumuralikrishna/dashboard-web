import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import Fileupload from "./Fileupload.jsx";
import Display from "./Display.jsx";
import Login from "./Login.jsx";

Chart.register(...registerables);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [isFileUploaded,setIsFileUploaded] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8082/dashboard", {
          withCredentials: true,
        });
        setDashboardData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      setUploadFiles(JSON.parse(storedFiles).map((name) => ({ name })));
    }

    const fileStatus =  localStorage.getItem("fileStatus");
    if(fileStatus){
      setIsFileUploaded(fileStatus);
    }
  
  }, []);

  const calculateFillRates = () => {
    const totalRecords = dashboardData.length;
    let fields = [
      "Account Record Type",
      "Account: First Name",
      "Account: Last Name",
      "Name",
      "Specialty",
      "Gender",
      "Address: Address line 1",
      "Address line 2",
      "City",
      "Postal Code",
      "State",
      "Status",
      "Account: Email",
      "Multiplier Portal Email",
      "Account: Mobile",
      "Phone"


    ];
    let fillRates = [];

    fields.forEach((field) => {
      let filledCount = 0;
      dashboardData.forEach((record) => {
        if (record[field] && record[field] !== "NaN" && record[field] !== "") {
          filledCount++;
        }
      });
      const fillRate = (filledCount / totalRecords) * 100;
      fillRates.push({ field, fillRate });
    });

    return { fillRates, totalRecords };
  };

  useEffect(() => {
    if (dashboardData.length > 0) {
      const { fillRates } = calculateFillRates();
      const chartCtx = chartRef.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(chartCtx, {
        type: "bar",
        data: {
          labels: fillRates.map((rate) => rate.field),
          datasets: [
            {
              label: "Fill Rate (%)",
              data: fillRates.map((rate) => rate.fillRate),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });

      setChartInstance(newChartInstance);

      return () => {
        if (newChartInstance) {
          newChartInstance.destroy();
        }
      };
    }
  }, [dashboardData]);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (dashboardData.length === 0) {
    return <div>No data to display.</div>;
  }

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8082/auth/logout",
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      localStorage.clear();
      console.log("Logout successful:", response);
      window.location.href = "/login";
    } catch (e) {
      console.error("Logout failed:", e);
      alert("Logout failed");
    }
  }

  const { fillRates, totalRecords } = calculateFillRates();

  const updateUploadedFiles = (newFile) => {
    setUploadFiles([...uploadFiles, newFile]);
    localStorage.setItem(
      "uploadedFiles",
      JSON.stringify([...uploadFiles, newFile].map((file) => file.name))
    );
    setIsFileUploaded(true);
 
      localStorage.setItem("fileStatus",true);

  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <aside className="col-span-3 p-4">
        <div className="m-0.5 bg-white border-white shadow-md bg-white">
          <h2>upload Files</h2>
          <Fileupload updateUploadedFiles={updateUploadedFiles} />
          <h3>Uploaded Files</h3>
          <ul>
            {uploadFiles.map((file, index) => {
              return (
                <li key={index} className="mb-0.5">
                  {file.name}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="col-span-9 p-4">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button
              className="bg-amber-600 p-2 shadow-2xs border-amber-600 rounded-md hover:cursor-alias"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4 ">
            <div className="bg-white shadow-md rounded-md p-4 text-center">
              <h2 className="text-lg font-semibold">Total Records</h2>
              <p className="text-3xl">{totalRecords}</p>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 text-center">
              <h2 className="text-lg font-semibold">Total Specialties</h2>
              <p className="text-3xl">
                {new Set(dashboardData.map((item) => item.Specialty)).size}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 text-center">
              <h2 className="text-lg font-semibold">Total Cities</h2>
              <p className="text-3xl">
                {new Set(dashboardData.map((item) => item.City)).size}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 text-center">
              <h2 className="text-lg font-semibold">Total States</h2>
              <p className="text-3xl">
                {new Set(dashboardData.map((item) => item.State)).size}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">Fill Rate Chart</h2>
            <canvas width="300" height="100" role="img" ref={chartRef} />
          </div>
        </div>
        {isFileUploaded && <Display data={dashboardData} />}
      </div>
    </div>
  );
}

export default Dashboard;
