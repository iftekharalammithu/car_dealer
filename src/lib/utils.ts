import { ClassifiedSchema } from "@/app/schemas/Classified.Schema";
import { AwaitedPageProps } from "@/config/types";
import {
  BodyType,
  ClassifiedStatus,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";
import prettyBytes from "pretty-bytes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceProps {
  price: number | null;
  currency: CurrencyCode | null;
}

export function formatPrice({ price, currency }: FormatPriceProps) {
  if (!price) return "0";

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currencyDisplay: "symbol",
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });

  if (currency === "USD") {
    return formatter.format(price / 100).replace("US$", "$");
  }

  return formatter.format(price);
}

export function formatNumber(
  number: number | null,
  options?: Intl.NumberFormatOptions
) {
  if (!number) {
    return "0";
  }
  return new Intl.NumberFormat("en-GB", options).format(number);
}

export function formatOdometerUnit(unit: OdoUnit) {
  return unit === OdoUnit.MILES ? "mi" : "km";
}

export function formatTransmission(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? "Automatic" : "Manual";
}

export function formatFuelType(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.DIESEL:
      return "Diesel";
    case FuelType.ELECTRIC:
      return "Electric";
    case FuelType.HYBRID:
      return "Hybrid";
    case FuelType.PETROL:
      return "Petrol";
    default:
      return "Unknown";
  }
}

export function formatColor(color: Color) {
  switch (color) {
    case Color.BLACK:
      return "Black";
    case Color.BLUE:
      return "Blue";
    case Color.BROWN:
      return "Brown";
    case Color.GREEN:
      return "Green";
    case Color.ORANGE:
      return "Orange";
    case Color.RED:
      return "Red";
    case Color.SILVER:
      return "Silver";
    case Color.WHITE:
      return "White";
    case Color.YELLOW:
      return "Yellow";
    case Color.GOLD:
      return "Gold";
    case Color.PURPLE:
      return "Purple";
    case Color.PINK:
      return "Pink";

    default:
      return "Unknown";
  }
}

export function formatUlezCompliance(ulezCompliance: ULEZCompliance) {
  return ulezCompliance === ULEZCompliance.EXEMPT ? "Exempt" : "Non Exempt";
}

export function formatBodyType(bodyType: BodyType) {
  switch (bodyType) {
    case BodyType.HATCHBACK:
      return "Hatchback";
    case BodyType.SEDAN:
      return "Sedan";
    case BodyType.SUV:
      return "SUV";
    case BodyType.COUPE:
      return "Coupe";
    case BodyType.CONVERTIBLE:
      return "Convertible";
    case BodyType.WAGON:
      return "Wagon";
    default:
      return "Unknown";
  }
}

// This Function Creating a prisma query to search spacific Car Details
export const buildClassifiedQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedSchema.safeParse(searchParams);
  if (!data) {
    return { status: ClassifiedStatus.LIVE };
  }
  const keys = Object.keys(data);

  const taxonomiefilters = ["make", "model", "modelVariant"];
  const rangefilter = {
    minYear: "year",
    maxYear: "year",
    minPrice: "price",
    maxPrice: "price",
    minReading: "odoReading",
    maxReading: "odoReading",
  };

  const numFilters = ["seats", "doors"];
  const enulmFilters = [
    "odoUnit",
    "currency",
    "transmission",
    "bodyType",
    "fuelType",
    "color",
    "ulezCompliance",
  ];

  const mapParamsToFields = keys.reduce(
    (acc, key) => {
      const value = searchParams?.[key] as string | undefined;

      if (!value) return acc;

      if (taxonomiefilters.includes(key)) {
        acc[key] = { id: value };
      } else if (enulmFilters.includes(key)) {
        // console.log("Value", value);
        acc[key] = value.toUpperCase();
      } else if (numFilters.includes(key)) {
        acc[key] = Number(value);
      } else if (key in rangefilter) {
        const field = rangefilter[key as keyof typeof rangefilter];
        acc[field] = acc[field] || {};
        if (key.startsWith("min")) {
          acc[field].gte = Number(value);
        } else if (key.startsWith("max")) {
          acc[field].lte = Number(value);
        }
      }
      return acc;
    },
    {} as { [key: string]: any }
  );
  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        { title: { contains: searchParams.q as string, mode: "insensitive" } },
        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};

export const generateTimeOptions = () => {
  const times = [];
  const startHours = 8;
  const endHours = 18;

  for (let hour = startHours; hour < endHours; hour++) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(hour);
    date.setMinutes(0);

    const formatedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    times.push({
      label: formatedTime,
      value: formatedTime,
    });
  }
  return times;
};

export const generateDateOptions = () => {
  const today = new Date();
  const dates = [];
  for (let index = 0; index < 30; index++) {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    dates.push({
      label: format(date, "dd MMM yyyy"),
      value: format(date, "dd MMM yyyy"),
    });
  }
  return dates;
};

export const formatDate = (date: string, time: string) => {
  const parseDate = parse(date, "dd MMM yyyy", new Date());
  const parseTime = parse(time, "hh:mm aa", new Date());
  // console.log(parseDate, date);

  parseDate.setHours(parseTime.getHours(), parseTime.getMinutes(), 0, 0);
  return parseDate;
};

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;

  return ((current - previous) / Math.abs(previous)) * 100;
}

export const convertToMb = (bytes: number) => {
  return prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  });
};

export function generateYears(minYear: number, maxYear?: number): string[] {
  const currentYear = maxYear ? maxYear : new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= minYear; year--) {
    years.push(year.toString());
  }
  return years;
}

export function formatClassifiedStatus(status: ClassifiedStatus) {
  switch (status) {
    case ClassifiedStatus.LIVE:
      return "Live";
    case ClassifiedStatus.SOLD:
      return "Sold";
    case ClassifiedStatus.DRAFT:
      return "Draft";
  }
}
