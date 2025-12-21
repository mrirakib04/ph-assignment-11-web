import HomeHeader from "./HomeHeader";
import HomeProducts from "./HomeProducts";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HomeHeader></HomeHeader>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
