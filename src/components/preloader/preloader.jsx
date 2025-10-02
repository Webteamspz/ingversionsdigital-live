import React, { useEffect, useState } from "react";
import "./preloader.module.css"; // make sure this path is correct

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
    };

    loadData();
  }, []);

  if (!loading) return null;

  return (
    <div id="preloader">
      <div id="loader" className="loader">
        <div className="loader-container">
          <div className="loader-icon">
            {/* 👇 replace path with your actual logo */}
            <img
              src="../../assets/Main-logo.png"
              alt="Preloader"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
