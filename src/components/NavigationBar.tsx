import SearchForStock from "./SearchForStock";

const NavigationBar = () => {
  return (
    <nav className="font-inter flex justify-between items-center">
      <a href="/">
        <h1 className="font-bold text-2xl text-[#219ebc]">Stock Trader</h1>
      </a>
      <SearchForStock />
    </nav>
  );
};

export default NavigationBar;
