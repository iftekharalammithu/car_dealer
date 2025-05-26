import { DashboarddataType } from "@/app/admin/dashboard/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { CarIcon, PoundSterling, TrendingUp, UserIcon } from "lucide-react";
type KPICardsProps = {
  dashboarddata: DashboarddataType;
};

interface DashboardItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  amount: number;
  persentage: number;
  style: Intl.NumberFormatOptions["style"];
}

export default function KPICards(props: KPICardsProps) {
  const { dashboarddata } = props;
  // console.log(dashboarddata.totalSales);
  const {
    totalSales,
    carsSoldThisMonth,

    newCustomerThisMonth,
    carsSoldPercentageChange,
    NewCustomerPercentageChange,
    conversionRate,

    conversionRatePersentageChange,
    salesPercentageChange,
  } = dashboarddata;

  // console.log(
  //   "totalSales",
  //   totalSales,
  //   "carsSoldThisMonth",
  //   carsSoldThisMonth,
  //   "newCustomerThisMonth",
  //   newCustomerThisMonth,
  //   "carsSoldPercentageChange",
  //   carsSoldPercentageChange,
  //   "NewCustomerPercentageChange",
  //   NewCustomerPercentageChange,
  //   "conversionRate",
  //   conversionRate,
  //   "conversionRatePersentageChange",
  //   conversionRatePersentageChange,
  //   "salesPercentageChange",
  //   salesPercentageChange
  // );

  const dashboardData: DashboardItem[] = [
    {
      id: 1,
      title: "Total Sale",
      description: "Total sales revenue is the last 30 days",
      icon: PoundSterling,
      amount: totalSales,
      persentage: Math.round(salesPercentageChange),
      style: "currency",
    },
    {
      id: 2,
      title: "Cars Sold",
      description: "Total number of sold in the last 30 days",
      icon: CarIcon,
      amount: carsSoldThisMonth,
      persentage: Math.round(carsSoldPercentageChange),
      style: "decimal",
    },
    {
      id: 3,
      title: "New Customers",
      description: "Total Customers in the last 30 days",
      icon: UserIcon,
      amount: newCustomerThisMonth,
      persentage: Math.round(NewCustomerPercentageChange),
      style: "decimal",
    },
    {
      id: 4,
      title: "Conversion Rate",
      description: "% of sales  in the last 30 days",
      icon: TrendingUp,
      amount: conversionRate,
      persentage: Math.round(conversionRatePersentageChange),
      style: "percent",
    },
  ];
  return (
    <div className=" grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.map((item) => {
        return <KPICard key={item.id} {...item}></KPICard>;
      })}
    </div>
  );
}

const KPICard = (props: DashboardItem[][number]) => {
  const { icon: Icon, ...rest } = props;
  return (
    <Card key={rest.id} className=" bg-gray-800 border-gray-700">
      <CardHeader className=" flex flex-row items-center justify-between  space-y-0  pb-2">
        <div className=" flex flex-col space-y-1">
          <CardTitle className=" text-gray-100">{rest.title}</CardTitle>
          <CardDescription className=" text-gray-200">
            {rest.description}
          </CardDescription>
        </div>
        <Icon className=" h-6 w-6 text-gray-200"></Icon>
      </CardHeader>
      <CardContent className=" flex items-center justify-between">
        <span className=" text-2xl font-bold text-gray-100">
          {rest.style === "currency"
            ? formatPrice({ price: rest.amount, currency: "GBP" })
            : formatNumber(rest.amount, {
                style: rest.style,
                currency: "GBP",
                maximumFractionDigits: 0,
              })}
        </span>
        <p
          className={cn(
            "text-xs ",
            !rest.persentage && "!text-gray-200",
            rest.persentage > 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {rest.persentage === 0
            ? `${rest.persentage}%`
            : formatNumber(rest.persentage / 100, {
                style: "percent",
                maximumFractionDigits: 0,
              })}
        </p>
      </CardContent>
    </Card>
  );
};
