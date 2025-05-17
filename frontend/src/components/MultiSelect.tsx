import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { ServiceType } from "@/constants/serviceType";
import ServiceBadge from "@/components/ServiceBadge";
import { cn } from "@/lib/utils";

const options = [
  { label: "Delivery", value: ServiceType.DELIVERY },
  { label: "Pick Up", value: ServiceType.PICK_UP },
  { label: "Payment", value: ServiceType.PAYMENT },
];

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelect({ value, onChange }: MultiSelectProps) {
  const toggleItem = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((i) => i !== item));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start min-h-[40px]"
          >
            {value.length === 0 ? (
              <span>Select services...</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {value.map((val) => (
                  <div
                    key={val}
                    className="flex items-center gap-1 px-1 bg-muted rounded-md"
                  >
                    <ServiceBadge text={val} />
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(val);
                      }}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-1 h-1" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search services..." />
            <CommandList>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggleItem(opt.value)}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "w-4 h-4",
                        value.includes(opt.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt.label}
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
