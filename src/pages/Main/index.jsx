import PostAJob from "../../components/PostAjobSection.jsx";
import Categories from "../../components/categories";
import HowItWorks from "../../components/how-works";
import Slide from "../../components/slide";
import Header from "../../components/Header";
export default function Main() {
  return (
    <>
      <Header />
      <Slide />
      <Categories />
      <PostAJob />
      <HowItWorks />
    </>
  );
}
