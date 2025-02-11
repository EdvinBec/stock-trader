const Tag = ({ label }: { label: string }) => {
  return (
    <div className="px-3 py-2 font-bold rounded-sm text-sm tracking-wider bg-[#219ebc] text-white">
      {label}
    </div>
  );
};

export default Tag;
