import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

type OptionsFilter = {
  deltaRange: {
    min: number;
    max: number;
  };
  expirationRange: {
    min: number;
    max: number;
  };
  premiumMin: number;
  optionType: "CALL" | "PUT" | "BOTH";
};

const optionsFilter: OptionsFilter = {
  deltaRange: {
    min: -1,
    max: 1,
  },
  expirationRange: {
    min: 0,
    max: 99,
  },
  premiumMin: 0,
  optionType: "BOTH",
};

const OptionsTable = ({ className }: { className: string }) => {
  const optionsData = [
    {
      contractName: "MSFT250214C00240000",
      expirationDate: "2025-02-14",
      strikePrice: 240,
      premium: 177.27,
      delta: 0.6,
      iv: 232.23,
      roi: 47.23,
      type: "Call",
    },
    {
      contractName: "MSFT250214P00240000",
      expirationDate: "2025-02-14",
      strikePrice: 240,
      premium: 15.32,
      delta: -0.4,
      iv: 210.11,
      roi: 12.45,
      type: "Put",
    },
    {
      contractName: "MSFT250214C00250000",
      expirationDate: "2025-02-14",
      strikePrice: 250,
      premium: 170.45,
      delta: 0.58,
      iv: 225.67,
      roi: 45.12,
      type: "Call",
    },
    {
      contractName: "MSFT250214P00250000",
      expirationDate: "2025-02-14",
      strikePrice: 250,
      premium: 18.75,
      delta: -0.42,
      iv: 215.89,
      roi: 13.67,
      type: "Put",
    },
    {
      contractName: "MSFT250214C00260000",
      expirationDate: "2025-02-14",
      strikePrice: 260,
      premium: 163.89,
      delta: 0.55,
      iv: 220.34,
      roi: 43.78,
      type: "Call",
    },
    {
      contractName: "MSFT250214P00260000",
      expirationDate: "2025-02-14",
      strikePrice: 260,
      premium: 22.1,
      delta: -0.44,
      iv: 220.45,
      roi: 14.89,
      type: "Put",
    },
    {
      contractName: "MSFT250214C00270000",
      expirationDate: "2025-02-14",
      strikePrice: 270,
      premium: 157.34,
      delta: 0.52,
      iv: 215.12,
      roi: 42.45,
      type: "Call",
    },
    {
      contractName: "MSFT250214P00270000",
      expirationDate: "2025-02-14",
      strikePrice: 270,
      premium: 25.45,
      delta: -0.46,
      iv: 225.78,
      roi: 16.12,
      type: "Put",
    },
    {
      contractName: "MSFT250214C00280000",
      expirationDate: "2025-02-14",
      strikePrice: 280,
      premium: 150.78,
      delta: 0.5,
      iv: 210.89,
      roi: 41.12,
      type: "Call",
    },
    {
      contractName: "MSFT250214P00280000",
      expirationDate: "2025-02-15",
      strikePrice: 280,
      premium: 28.8,
      delta: -0.48,
      iv: 230.12,
      roi: 17.34,
      type: "Put",
    },
  ];

  const [optionsFilterCriteria, setOptionsFilterCriteria] =
    useState<OptionsFilter>(optionsFilter);

  const [filteredOptionsData, setFilteredOptionsData] = useState(optionsData);

  const applyFilters = () => {
    const filteredData = optionsData.filter((item) => {
      const deltaInRange =
        item.delta >= optionsFilterCriteria.deltaRange.min &&
        item.delta <= optionsFilterCriteria.deltaRange.max;

      const expirationInRange =
        new Date(item.expirationDate) >
          new Date(
            new Date().getTime() +
              optionsFilterCriteria.expirationRange.min * 1000 * 60 * 60 * 24
          ) &&
        new Date(item.expirationDate) <
          new Date(
            new Date().getTime() +
              optionsFilterCriteria.expirationRange.max * 1000 * 60 * 60 * 24
          );

      const premiumAboveMin = item.premium >= optionsFilterCriteria.premiumMin;

      const optionTypeMatch =
        optionsFilterCriteria.optionType === "BOTH" ||
        item.type.toLowerCase() ===
          optionsFilterCriteria.optionType.toLowerCase();

      return (
        deltaInRange && expirationInRange && premiumAboveMin && optionTypeMatch
      );
    });

    setFilteredOptionsData(filteredData);
  };

  return (
    <div className={className}>
      <div className="flex justify-end mb-2">
        <Popover>
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-bold text-[#191919]">
              List of options
            </h2>
            <PopoverTrigger className="cursor-pointer text-sm bg-white border-1 px-4 py-1.5 hover:opacity-75 font-medium rounded-sm">
              Filter
            </PopoverTrigger>
          </div>

          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter</h4>
                <p className="text-sm text-muted-foreground">
                  Filter the information by your needs
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Delta range</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      onChange={(e) => {
                        setOptionsFilterCriteria((prevCriteria) => ({
                          ...prevCriteria,
                          deltaRange: {
                            ...prevCriteria.deltaRange,
                            min: Number(e.target.value),
                          },
                        }));
                      }}
                      id="width"
                      defaultValue={optionsFilterCriteria.deltaRange.min}
                      className="h-8 w-17"
                    />
                    <span>-</span>
                    <Input
                      onChange={(e) => {
                        setOptionsFilterCriteria((prevCriteria) => ({
                          ...prevCriteria,
                          deltaRange: {
                            ...prevCriteria.deltaRange,
                            max: Number(e.target.value),
                          },
                        }));
                      }}
                      id="width"
                      defaultValue={optionsFilterCriteria.deltaRange.max}
                      className="h-8 w-17"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Expiration range</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      onChange={(e) => {
                        setOptionsFilterCriteria((prevCriteria) => ({
                          ...prevCriteria,
                          expirationRange: {
                            ...prevCriteria.expirationRange,
                            min: Number(e.target.value),
                          },
                        }));
                      }}
                      id="width"
                      defaultValue={optionsFilterCriteria.expirationRange.min}
                      className="h-8 w-17"
                    />
                    <span>-</span>
                    <Input
                      onChange={(e) => {
                        setOptionsFilterCriteria((prevCriteria) => ({
                          ...prevCriteria,
                          expirationRange: {
                            ...prevCriteria.expirationRange,
                            max: Number(e.target.value),
                          },
                        }));
                      }}
                      id="width"
                      defaultValue={optionsFilterCriteria.expirationRange.max}
                      className="h-8 w-17"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Premium minimum</Label>
                  <Input
                    onChange={(e) => {
                      setOptionsFilterCriteria((prevCriteria) => ({
                        ...prevCriteria,
                        premiumMin: Number(e.target.value),
                      }));
                    }}
                    id="height"
                    defaultValue={optionsFilterCriteria.premiumMin}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Option type</Label>
                  <Select
                    defaultValue={optionsFilterCriteria.optionType}
                    onValueChange={(e: "CALL" | "BOTH" | "PUT") => {
                      setOptionsFilterCriteria((prevCriteria) => ({
                        ...prevCriteria,
                        optionType: e,
                      }));
                    }}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Option type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CALL">CALL</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="BOTH">BOTH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Button
                    onClick={applyFilters}
                    className="col-span-3 mt-4 cursor-pointer"
                  >
                    Apply filter
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Contract name</TableHead>
            <TableHead>Expiration date</TableHead>
            <TableHead>Strike price</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Delta</TableHead>
            <TableHead>IV</TableHead>
            <TableHead>Yearly ROI</TableHead>
            <TableHead className="text-right">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOptionsData.map((option) => (
            <TableRow key={option.contractName}>
              <TableCell className="font-medium">
                {option.contractName}
              </TableCell>
              <TableCell>{option.expirationDate}</TableCell>
              <TableCell>{option.strikePrice}</TableCell>
              <TableCell>${option.premium.toFixed(2)}</TableCell>
              <TableCell>{option.delta}</TableCell>
              <TableCell>{option.iv}%</TableCell>
              <TableCell>{option.roi}%</TableCell>
              <TableCell
                className={`text-right font-medium uppercase ${
                  option.type === "Call" ? "text-[#008000]" : "text-[#df2935]"
                }`}
              >
                {option.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OptionsTable;
