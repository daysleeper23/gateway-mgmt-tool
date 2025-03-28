import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Check, CirclePlus } from "lucide-react";
import { OptionData } from "@/data/mock/common";

interface TanstackListFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: OptionData[];
}

const TanstackListFilter = <TData, TValue>({
  column,
  title,
  options,
}: TanstackListFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelect = (optionValue: string, isSelected: boolean) => {
    if (isSelected) {
      selectedValues.delete(optionValue);
    } else {
      selectedValues.add(optionValue);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const clearFilters = () => {
    column?.setFilterValue(undefined);
  };

  return (
    <Popover>
      <FilterButton
        title={title || "Filter"}
        selectedValues={selectedValues}
        options={options}
      />
      <PopoverContent
        className="inline-flex p-0"
        data-testid="list-filter-dropdown"
        align="start"
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <FilterOptions
              options={options}
              selectedValues={selectedValues}
              facets={facets}
              onSelect={handleSelect}
            />
            {selectedValues.size > 0 && <ClearFilters onClear={clearFilters} />}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default TanstackListFilter;

const FilterButton = ({
  title,
  selectedValues,
  options,
}: {
  title: string;
  selectedValues: Set<string>;
  options: OptionData[];
}) => {
  return (
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="h-8 border-dashed">
        <CirclePlus className="mr-2 h-4 w-4" />
        {title}
        {selectedValues?.size > 0 && (
          <div data-testid="list-filter-selected">
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </div>
        )}
      </Button>
    </PopoverTrigger>
  );
};

const FilterOptions = ({
  options,
  selectedValues,
  facets,
  onSelect,
}: {
  options: OptionData[];
  selectedValues: Set<string>;
  facets?: Map<string, number>;
  onSelect: (optionValue: string, isSelected: boolean) => void;
}) => (
  <CommandGroup>
    {options.map((option) => {
      const isSelected = selectedValues.has(option.value);
      return (
        <CommandItem
          key={option.value}
          onSelect={() => onSelect(option.value, isSelected)}
        >
          <div
            className={cn(
              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible",
            )}
          >
            <Check className={cn("h-4 w-4 text-muted")} />
          </div>
          {option.icon && (
            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{option.label}</span>
          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
            {facets?.get(option.value) ?? 0}
          </span>
        </CommandItem>
      );
    })}
  </CommandGroup>
);

const ClearFilters = ({ onClear }: { onClear: () => void }) => (
  <div data-testid="list-filter-clear">
    <CommandSeparator />
    <CommandGroup>
      <CommandItem onSelect={onClear} className="justify-center text-center">
        Clear filters
      </CommandItem>
    </CommandGroup>
  </div>
);
