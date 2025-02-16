import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockOption } from "./stock.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import TooltipQuestionmark from "../TooltipQuestionmark";

const OptionsTable = ({
  className,
  optionsData,
}: {
  className: string;
  optionsData: StockOption[] | null;
}) => {
  return (
    <>
      {!optionsData && (
        <div className="w-full flex justify-between gap-24 mt-8 mb-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} className="text-center">
                  Empty - Stock options table
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  Enter filter criteria and fetch data to see more
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
      {optionsData && (
        <div className={className}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Contract name</TableHead>
                <TableHead>Expiration date</TableHead>
                <TableHead>Strike price</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <span>Delta</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="ml-4">
                          <TooltipQuestionmark />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px]">
                          <p className="text-xs">
                            Delta is the theoretical estimate of how much an
                            option's value may change given a $1 move UP or DOWN
                            in the underlying security. <br /> <br /> CAUTION:
                            Delta might not be displayed due to 25 calls per day
                            API limit.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>IV</TableHead>
                <TableHead>Yearly ROI</TableHead>
                <TableHead className="text-right">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optionsData.length == 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No stock options match set criteria
                  </TableCell>
                </TableRow>
              )}
              {optionsData!.map((option) => (
                <TableRow key={option.contractName}>
                  <TableCell className="font-medium">
                    {option.contractName}
                  </TableCell>
                  <TableCell>{option.expirationDate}</TableCell>
                  <TableCell>{option.strikePrice}</TableCell>
                  <TableCell>${option.premium.toFixed(2)}</TableCell>
                  <TableCell>{Number(option.delta).toFixed(3)}</TableCell>
                  <TableCell>{option.iv}</TableCell>
                  <TableCell>{option.roi}</TableCell>
                  <TableCell
                    className={`text-right font-medium uppercase ${
                      option.optionType === "call"
                        ? "text-[#008000]"
                        : "text-[#df2935]"
                    }`}
                  >
                    {option.optionType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default OptionsTable;
