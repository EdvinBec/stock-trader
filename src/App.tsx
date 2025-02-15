import MaxWidthWrapper from "./components/MaxWidthWrapper";
import SearchForStock from "./components/SearchForStock";

const App = () => {
  return (
    <MaxWidthWrapper>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <h1 className="text-2xl font-bold">Enter stock ticker</h1>
        <SearchForStock />
      </div>
    </MaxWidthWrapper>
  );
};

export default App;
