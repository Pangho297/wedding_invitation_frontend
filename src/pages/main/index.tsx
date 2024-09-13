import "./style.scss";

import Profile from "./Profile";
import StoryList from "./StoryList";
import FeedList from "./FeedList";

import MainHeader from "@/pages/main/MainHeader";

export default function Main() {
  return (
    <section className="home-container">
      <MainHeader />
      <Profile />
      <StoryList />
      <FeedList />
    </section>
  );
}
