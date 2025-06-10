import KPICards from "@/components/Admin/Dashboard/KPICards";
import SalesChart from "@/components/Admin/Dashboard/SalesChart";
import prisma from "@/lib/prismadb";
import { calculatePercentageChange } from "@/lib/utils";
import { ClassifiedStatus, CustomerStatus } from "@prisma/client";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import React from "react";

const getDashboardData = async () => {
  const now = new Date();
  const startOfThisMonth = startOfMonth(now);
  const endOfThisMonth = endOfMonth(now);

  const startOfLastMonth = startOfMonth(subMonths(now, 1));

  const lastMonthPromises = {
    carsSoldThisMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    carsSoldLastMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfLastMonth,
          lte: startOfThisMonth,
        },
      },
    }),
    newCustomerThisMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    newCustomerLastMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: startOfThisMonth,
        },
      },
    }),
    purchsedCustomerThisMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfLastMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    purchsedCustomerLastMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfLastMonth,
          lte: startOfThisMonth,
        },
      },
    }),
  };

  const totalSaleThismonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfThisMonth,
        lte: endOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const totalSalePreviousmonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfLastMonth,
        lte: startOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const [
    carsSoldThisMonth,
    carsSoldLastMonth,
    newCustomerThisMonth,
    newCustomerLastMonth,
    purchsedCustomerThisMonth,
    purchsedCustomerLastMonth,
  ] = await Promise.all(Object.values(lastMonthPromises));

  const [SaleThismonth, SalePreviousmonth] = await Promise.all([
    totalSaleThismonth,
    totalSalePreviousmonth,
  ]);

  const conversionRate =
    newCustomerThisMonth > 0
      ? purchsedCustomerThisMonth / newCustomerThisMonth
      : 0;
  const previousconversionRate =
    newCustomerLastMonth > 0
      ? purchsedCustomerLastMonth / newCustomerLastMonth
      : 0;

  const conversionRatePersentageChange = calculatePercentageChange(
    conversionRate,
    previousconversionRate
  );

  // console.log({ conversionRate, previousconversionRate });
  // ...existing code...

  // console.log({ SaleThismonth, SalePreviousmonth });
  // ...existing code...

  const totalSales = SaleThismonth._sum.price || 0;
  const previousSales = SalePreviousmonth._sum.price || 0;

  const salesPercentageChange = calculatePercentageChange(
    totalSales,
    previousSales
  );
  // console.log("Sale Percentage", salesPercentageChange);

  const carsSoldPercentageChange = calculatePercentageChange(
    carsSoldThisMonth,
    carsSoldLastMonth
  );
  const NewCustomerPercentageChange = calculatePercentageChange(
    newCustomerThisMonth,
    newCustomerLastMonth
  );
  // console.log(newCustomerThisMonth, newCustomerLastMonth);

  const PurchasedSoldPercentageChange = calculatePercentageChange(
    purchsedCustomerThisMonth,
    purchsedCustomerLastMonth
  );

  return {
    totalSales,
    carsSoldThisMonth,

    newCustomerThisMonth,
    carsSoldPercentageChange,
    NewCustomerPercentageChange,
    PurchasedSoldPercentageChange,
    conversionRate,
    previousconversionRate,
    conversionRatePersentageChange,
    salesPercentageChange,
  };
};

async function getCharData() {
  const now = new Date();
  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const startDate = startOfMonth(subMonths(now, i));
    const endDate = endOfMonth(startDate);
    const monthsales = await prisma.classified.aggregate({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        price: true,
      },
    });
    monthsData.unshift({
      month: format(startDate, "MMM"),
      sales: monthsales._sum.price || 0,
    });
  }
  return monthsData;
}

export type DashboarddataType = Awaited<ReturnType<typeof getDashboardData>>;
export type ChartDataType = ReturnType<typeof getCharData>;

const Page = async () => {
  const dashboard = await getDashboardData();
  const chardata = getCharData();
  return (
    <div>
      <KPICards dashboarddata={dashboard}></KPICards>;
      <SalesChart data={chardata}></SalesChart>
    </div>
  );
};

export default Page;
