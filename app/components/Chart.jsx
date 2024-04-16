import React, { useState } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



const Donut = () => {
  const [options] = useState({
    labels: ['High', 'Medium', 'Low']
  });
  const [series] = useState([44, 55, 41]);

  return (
    <>
      <div className="donut">
        <Chart options={options} series={series} type="pie" width="380" height="380" />
        {/* <Chart options={options} series={series} type="donut" width="380" /> */}
      </div>
    </>
  );
};

export default Donut;