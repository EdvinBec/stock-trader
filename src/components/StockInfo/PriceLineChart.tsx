import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { StockHistoricalPrices } from "./stock.types";

const chartConfig = {
  price: { label: "Price", color: "hsl(var(--chart-1))" },
  date: { label: "Date", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const PriceLineChart = ({
  stockHistoricalPrices,
}: {
  stockHistoricalPrices: StockHistoricalPrices[];
}) => {
  const [timeRange, setTimeRange] = useState("6m");
  const chartData: StockHistoricalPrices[] = Array.isArray(
    stockHistoricalPrices
  )
    ? stockHistoricalPrices
    : [];
  console.log(chartData);

  const filterData = (range: string) => {
    const endDate = new Date();
    const startDate = new Date();

    if (range === "7d") startDate.setDate(endDate.getDate() - 7);
    else if (range === "1m") startDate.setMonth(endDate.getMonth() - 1);
    else if (range === "6m") startDate.setMonth(endDate.getMonth() - 6);

    return chartData.filter(
      (data) =>
        new Date(data.date) >= startDate && new Date(data.date) <= endDate
    );
  };

  const filteredData = filterData(timeRange);

  return (
    <div>
      <div className="flex justify-between items-center space-x-2 mb-4 md:max-w-2/3">
        <h2 className="text-lg font-bold text-[#191919]">Price chart</h2>
        <div className="space-x-2">
          {["7d", "1m", "6m"].map((range) => (
            <button
              key={range}
              className={`px-3 text-xs py-1 border rounded-sm font-medium ${
                timeRange === range ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range === "7d" ? "7D" : range === "1m" ? "1M" : "6M"}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer className="md:max-w-2/3" config={chartConfig}>
        <LineChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={true}
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) return null;

              const { date, openPrice, highPrice, lowPrice } =
                payload[0].payload;

              return (
                <div className="text-sm bg-white px-3 py-2 border rounded-sm">
                  <span className="font-medium">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <br />
                  <span>Open price: ${openPrice}</span>
                  <br />
                  <span className="text-[#008000]">High: ${highPrice}</span>
                  <br />
                  <span className="text-[#df2935]">Low: ${lowPrice}</span>
                </div>
              );
            }}
          />
          <Line
            dataKey="openPrice"
            type="linear"
            stroke="#219ebc"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default PriceLineChart;
