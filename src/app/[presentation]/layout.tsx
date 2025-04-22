// import React, { PropsWithChildren } from "react";

// const layout = (props: PropsWithChildren) => {
//   return props.children;
// };

// export default layout;

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
