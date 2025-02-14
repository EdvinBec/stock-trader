import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchForStock = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();

  const [searchInput, setSearchInput] = useState(ticker);

  return (
    <form
      onSubmit={() => navigate(`/${searchInput}`)}
      className="flex items-center gap-2"
    >
      <Input
        placeholder="Search for stocks"
        className="w-[200px]"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <Button variant="outline">Search</Button>
    </form>
  );
};

export default SearchForStock;
