import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";

//this pattern is reusable with any framework (angular, vue, etc.) within a child application
const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default MarketingApp;
