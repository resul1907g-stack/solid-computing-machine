export const CLEANING_TYPE_LABELS: Record<string, string> = {
  MAINTENANCE: "Unterhaltsreinigung",
  BASIC: "Grundreinigung",
  GLASS: "Glasreinigung",
  SPECIAL: "Sonderreinigung",
  HYGIENE: "Hygienereinigung",
  OPERATING_ROOM: "OP-Reinigung",
  DISINFECTION: "Desinfektionsreinigung",
  FACADE: "Fassadenreinigung",
  OUTDOOR: "Außenreinigung",
};

export const CLEANING_TYPE_COLORS: Record<string, string> = {
  MAINTENANCE: "bg-blue-100 text-blue-800",
  BASIC: "bg-green-100 text-green-800",
  GLASS: "bg-cyan-100 text-cyan-800",
  SPECIAL: "bg-orange-100 text-orange-800",
  HYGIENE: "bg-purple-100 text-purple-800",
  OPERATING_ROOM: "bg-red-100 text-red-800",
  DISINFECTION: "bg-pink-100 text-pink-800",
  FACADE: "bg-gray-100 text-gray-800",
  OUTDOOR: "bg-emerald-100 text-emerald-800",
};

export const FREQUENCY_LABELS: Record<string, string> = {
  DAILY: "Täglich",
  TWICE_DAILY: "2x Täglich",
  THREE_TIMES_DAILY: "3x Täglich",
  WEEKLY: "Wöchentlich",
  BIWEEKLY: "14-tägig",
  MONTHLY: "Monatlich",
  QUARTERLY: "Vierteljährlich",
  BIANNUALLY: "Halbjährlich",
  ANNUALLY: "Jährlich",
  ON_DEMAND: "Nach Bedarf",
};

export const FREQUENCY_COLORS: Record<string, string> = {
  DAILY: "bg-red-100 text-red-800",
  TWICE_DAILY: "bg-red-100 text-red-800",
  THREE_TIMES_DAILY: "bg-red-100 text-red-800",
  WEEKLY: "bg-blue-100 text-blue-800",
  BIWEEKLY: "bg-blue-100 text-blue-800",
  MONTHLY: "bg-green-100 text-green-800",
  QUARTERLY: "bg-yellow-100 text-yellow-800",
  BIANNUALLY: "bg-orange-100 text-orange-800",
  ANNUALLY: "bg-gray-100 text-gray-800",
  ON_DEMAND: "bg-gray-100 text-gray-800",
};

export const ROLE_LABELS: Record<string, string> = {
  OWNER: "Eigentümer",
  ADMIN: "Administrator",
  MANAGER: "Manager",
  INSPECTOR: "Inspektor",
  CLEANER: "Reinigungskraft",
};

export const ROLE_COLORS: Record<string, string> = {
  OWNER: "bg-purple-100 text-purple-800",
  ADMIN: "bg-blue-100 text-blue-800",
  MANAGER: "bg-green-100 text-green-800",
  INSPECTOR: "bg-yellow-100 text-yellow-800",
  CLEANER: "bg-gray-100 text-gray-800",
};
