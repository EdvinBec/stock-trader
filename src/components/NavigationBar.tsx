import SearchForStock from "./SearchForStock";

const NavigationBar = () => {
  return (
    <nav className="font-inter flex flex-col md:flex-row md:items-center gap-4 justify-between items-start">
      <a href="/">
        <h1 className="font-bold text-2xl text-[#219ebc]">Stock Trader</h1>
      </a>
      <SearchForStock />
    </nav>
  );
};

export default NavigationBar;
