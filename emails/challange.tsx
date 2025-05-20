import React from "react";

const PropsDefault = {
  code: 123456,
};
const Challange = ({ data = PropsDefault }) => {
  return <div>{data.code}</div>;
};

export default Challange;
