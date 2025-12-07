const Loader = () => {
  return (
    <div className="w-full sm:py-20 py-10 flex flex-col items-center justify-center gap-3 text-center">
      <div className="w-8 h-8 rounded-full border-4 border-green-700 border-t-transparent animate-spin"></div>
      <p className="text-green-600 font-semibold animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;
