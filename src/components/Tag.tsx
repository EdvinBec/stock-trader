const Tag = ({ label }: { label: string }) => {
  return (
    <div className="px-3 py-2 rounded-sm text-sm tracking-wider bg-gray-950 text-white">
      {label}
    </div>
  );
};

export default Tag;
