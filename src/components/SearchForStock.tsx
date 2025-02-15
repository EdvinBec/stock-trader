import { useState } from "react";
import { useParams } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTab, TabType } from "@/redux/features/tabsSlice";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const SearchForStock = () => {
  const { ticker } = useParams();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState(ticker);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 9); // Generates a random string
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [stockInfoResponse, historicalPricesResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/stock/${searchInput}`),
        axios.get(
          `${import.meta.env.VITE_API_URL}/api/stock/${searchInput}/history`
        ),
      ]);

      const newTab: TabType = {
        id: generateRandomId(),
        options: null,
        stockDetails: stockInfoResponse.data,
        stockPrices: historicalPricesResponse.data.historicalData,
        ticker: searchInput!,
        optionsFilter: null,
      };
      dispatch(addTab(newTab));
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Check if the error is a 404
        if (error.response?.status === 404) {
          toast("Stock by that name was not found");
          setIsLoading(false);
          return;
        } else {
          console.error("Error fetching stock data:", error);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchData();
      }}
      className="flex items-center gap-2"
    >
      <Input
        placeholder="Enter stock ticker (MSFT, AAPL...)"
        className="w-[250px]"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <Button variant="outline">
        {isLoading ? <Loader className="animate-spin" size={8} /> : "Search"}
      </Button>
    </form>
  );
};

export default SearchForStock;
