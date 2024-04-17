'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Donut = () => {
  let [highRes, setHighRes]= useState(10)
  let [mediumRes, setMediumRes]= useState(10)
  let [lowRes, setLowRes]= useState(10)


  useEffect(() => {
    const fetchData = async () => {
      const highResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/high`
      );
      console.log(await highResponse.json())
      const mediumResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/medium`
      );
      const lowResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/priority/low`
      );

      setHighRes(highResponse.data);
      setMediumRes(mediumResponse.data);
      setLowRes(lowResponse.data);
    };
    fetchData();
  }, []);
  const [options] = useState({
    labels: ["High", "Medium", "Low"],
  });
  const [series] = useState([highRes, mediumRes, lowRes]);
console.log('hR'+ highRes)
  return (
    <>
      <div className="donut">
        <Chart
          options={options}
          series={series}
          type="pie"
          width="380"
          height="380"
        />
        {/* <Chart options={options} series={series} type="donut" width="380" /> */}
      </div>
    </>
  );
};

export default Donut;
