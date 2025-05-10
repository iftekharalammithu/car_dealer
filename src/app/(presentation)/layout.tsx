import PublicLayout from "@/components/layouts/PublicLayout";
import React, { PropsWithChildren } from "react";

const layout = (props: PropsWithChildren) => {
  return <PublicLayout>{props.children}</PublicLayout>;
};

export default layout;
