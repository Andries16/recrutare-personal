import PostAJob from "../components/PostAjobSection";
import Categories from "../components/categories";
import HowItWorks from "../components/how-works";
import Slide from "../components/slide";

export default function Home() {
  return (
    <>
      <Slide />
      <Categories />
      <PostAJob />
      <HowItWorks />
    </>
  );
}
