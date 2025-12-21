import HomeHeader from "./HomeHeader";
import HomeProducts from "./HomeProducts";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HomeHeader></HomeHeader>
      <HomeProducts></HomeProducts>
    </div>
  );
};

export default Home;
