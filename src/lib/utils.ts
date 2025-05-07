import {
  BodyType,
  Color,
  CurrentCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceProps {
  price: number | null;
  currency: CurrentCode | null;
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

export function formatFualType(fuenType: FuelType) {
  switch (fuenType) {
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
