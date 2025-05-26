"use client";

import { ChartDataType } from "@/app/admin/dashboard/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { use } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  Tooltip,
  type TooltipProps,
} from "recharts";

interface SalesChartProps {
  data: ChartDataType;
}

const SalesChart = (props: SalesChartProps) => {
  const { data } = props;
  const chardata = use(data);
  console.log("Char Data", data);
  return (
    <Card className=" mb-6 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className=" text-gray-100">
          Monthly Sales {new Date().getFullYear() - 1} /{" "}
          {new Date().getFullYear()}
        </CardTitle>
        <CardDescription className=" text-gray-400">
          Number of cars sold per month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={"100%"} height={500}>
          <BarChart data={chardata}>
            <XAxis
              dataKey={"month"}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            ></XAxis>
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                formatPrice({ price: value, currency: "GBP" })
              }
            ></YAxis>
            <Tooltip
              content={<CustomTooTil></CustomTooTil>}
              cursor={{ fill: "transparent" }}
            ></Tooltip>
            <Bar dataKey={"sales"} fill="#0080db" radius={[4, 4, 0, 0]}></Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;

const CustomTooTil = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-gray-800 border border-gray-700 p-2 rounded">
        <p className=" text-gray-100">{`${label} : ${formatPrice({ price: payload[0].value as number, currency: "GBP" })}`}</p>
      </div>
    );
  }
};
