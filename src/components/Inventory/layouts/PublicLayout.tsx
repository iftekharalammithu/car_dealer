import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header></Header>
      <main className=" bg-white ">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default PublicLayout;
