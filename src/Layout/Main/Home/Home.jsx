import HomeHeader from "./HomeHeader";
import HomeProducts from "./HomeProducts";
import WhyChooseUs from "./WhyChooseUs";
import OurPartners from "./OurPartners";
import OrderStatistics from "./OrderStatistics";
import HowItWorks from "./HowItWorks";
import FeaturedCategories from "./FeaturedCategories";
import UserTestimonials from "./UserTestimonials";
import PricingPlans from "./PricingPlans";
import FrequentlyAsked from "./FrequentlyAsked";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HomeHeader></HomeHeader>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
      <OurPartners></OurPartners>
      <OrderStatistics></OrderStatistics>
      <HowItWorks></HowItWorks>
      <FeaturedCategories></FeaturedCategories>
      <UserTestimonials></UserTestimonials>
      <PricingPlans></PricingPlans>
      <FrequentlyAsked></FrequentlyAsked>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
