import AdminClassifiedsHeader from "@/components/Admin/Classified/AdminClassifiedsHeader";
import { PageProps } from "@/config/types";

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  // console.log(searchParams);
  return (
    <div>
      <AdminClassifiedsHeader
        searchParams={searchParams}
      ></AdminClassifiedsHeader>
    </div>
  );
};

export default page;
