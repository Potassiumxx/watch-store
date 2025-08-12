import * as React from "react";

type SortOption = string;

interface SortConfig<T> {
  az?: keyof T;
  za?: keyof T;
  priceLowHigh?: keyof T;
  priceHighLow?: keyof T;
  newest?: keyof T;
  oldest?: keyof T;
}

export function useSortedList<T>(items: T[], sortOption: SortOption, config: SortConfig<T>) {
  return React.useMemo(() => {
    const sorted = [...items];

    switch (sortOption) {
      case "az":
        return sorted.sort((a, b) => String(a[config.az!]).localeCompare(String(b[config.az!])));
      case "za":
        return sorted.sort((a, b) => String(b[config.za!]).localeCompare(String(a[config.za!])));
      case "priceLowHigh":
        return sorted.sort((a, b) => Number(a[config.priceLowHigh!]) - Number(b[config.priceLowHigh!]));
      case "priceHighLow":
        return sorted.sort((a, b) => Number(b[config.priceHighLow!]) - Number(a[config.priceHighLow!]));
      case "newest":
        return sorted.sort(
          (a, b) => new Date(String(b[config.newest!])).getTime() - new Date(String(a[config.newest!])).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(String(a[config.oldest!])).getTime() - new Date(String(b[config.oldest!])).getTime()
        );
      default:
        return sorted;
    }
  }, [items, sortOption, config]);
}
