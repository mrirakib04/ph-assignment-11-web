import HomeHeader from "./HomeHeader";
import HomeProducts from "./HomeProducts";
import OurPartners from "./OurPartners";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HomeHeader></HomeHeader>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
      <OurPartners></OurPartners>
    </div>
  );
};

export default Home;
