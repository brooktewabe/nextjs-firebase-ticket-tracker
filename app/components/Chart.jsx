import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Donut = () => {
  const [highRes, setHighRes] = useState(null);
  const [mediumRes, setMediumRes] = useState(null);
  const [lowRes, setLowRes] = useState(null);
  // const [series] = useState([highRes, mediumRes, lowRes]);
  const [options] = useState({
    labels: ["High", "Medium", "Low"],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const highResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/high`
        );
        const highData = await highResponse.json();

        const mediumResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/medium`
        );
        const mediumData = await mediumResponse.json();

        const lowResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/low`
        );
        const lowData = await lowResponse.json();

        setHighRes(highData);
        setMediumRes(mediumData);
        setLowRes(lowData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="donut">
        <Chart
          options={options}
          series={[highRes, mediumRes, lowRes]}
          type="pie"
          width="380"
          height="380"
        />
      </div>
    </>
  );
};

export default Donut;
