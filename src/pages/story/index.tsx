import Stories from "react-insta-stories";
import { useEffect, useState } from "react";

import "./style.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { StoryIdxType, StoryDataType } from "@/types/story";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Story() {
  const [background, setBackground] = useState<string>("rgb(0, 0, 0)");
  const [index, setIndex] = useState<number>(0);
  // react-insta-stories에서 제공하는 타입 import시 에러 발생해 any로 사용
  const [storyList, setStoryList] = useState<any[]>([]);
  const [resStoryList, setResStoryList] = useState<StoryDataType[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [nextIdx, setNextIdx] = useState<StoryIdxType>("2015-2016");
  const [prevIdx, setPrevIdx] = useState<StoryIdxType | "/">("/");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { idx } = useParams();

  useEffect(() => {
    getStories(idx as StoryIdxType);
  }, []);

  useEffect(() => {
    getStories(idx as StoryIdxType);
  }, [pathname]);

  const getStories = useDebounce(async (idx: StoryIdxType) => {
    try {
      const res = await api.story.getStoryDetail(idx);
      const first = res.img[0];
      // background 변경에 사용하기 위한 통신 데이터 저장
      setResStoryList(res.img);

      // react-insta-stories에서 제공하는 타입에 맞게 가공
      setStoryList(
        res.img.map((item, _, arr) => ({
          url: item.image_url,
          header: {
            heading: res.title,
            subheading: "",
            profileImage: arr[0].image_url,
          },
        })),
      );
      setBackground(`rgb(${first.r}, ${first.g}, ${first.b})`);
      setLikeCount(res.like);
      setNextIdx(res.next_story);
      setPrevIdx(res.prev_story);
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleLike = async () => {
    if (isLike) return;

    try {
      const res = await api.story.updateStoryLike(idx as StoryIdxType);

      setLikeCount(res);
    } catch (error) {
      throw error;
    }

    setIsLike(true);

    setTimeout(() => setIsLike(false), 1000);
  };

  return (
    <>
      {storyList.length > 0 && (
        <section className="story-container">
          <div className="story-wrapper">
            <Stories
              stories={storyList}
              width={window.innerWidth > 484 ? 484 : window.innerWidth}
              height="100vh"
              loop={true}
              header={(story: any) => (
                <div className="header-container">
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={story.profileImage}
                      alt="profileImage"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ color: "#ffffff", fontSize: "20px" }}>{story.heading}</div>
                  </div>
                </div>
              )}
              onStoryEnd={(e: number) => {
                setBackground(`rgb(${resStoryList[e + 1]?.r}, ${resStoryList[e + 1]?.g}, ${resStoryList[e + 1]?.b})`);
                setIndex(prev => prev + 1);
              }}
              onNext={() => {
                setIndex(prev => prev + 1);
                let idx = index + 1 > resStoryList.length - 1 ? resStoryList.length - 1 : index + 1;
                setBackground(
                  `rgb(${resStoryList[idx < 0 ? 0 : idx].r}, ${resStoryList[idx < 0 ? 0 : idx].g}, ${
                    resStoryList[idx < 0 ? 0 : idx].b
                  })`,
                );
              }}
              onPrevious={() => {
                if (index < 0) return setIndex(0);

                if (index === 0) {
                  navigate(`/story/${prevIdx}`, { replace: true });
                  return;
                }

                setIndex(prev => prev - 1);
                const idx = index - 1 < 0 ? 0 : index - 1;
                setBackground(
                  `rgb(${resStoryList[!idx ? 0 : idx].r}, ${resStoryList[!idx ? 0 : idx].g}, ${
                    resStoryList[!idx ? 0 : idx].b
                  })`,
                );
              }}
              onAllStoriesEnd={() => {
                setIndex(0);
                navigate(`/story/${nextIdx}`, { replace: true });
              }}
              // preventDefault={true}
              storyContainerStyles={{
                backgroundColor: `${background}`,
              }}
            />
            <div className="like-wrapper">
              <button className={`story-icon heart`} onClick={handleLike}>
                <div className="dislike" style={{ opacity: isLike ? 0 : 1 }}>
                  <FontAwesomeIcon icon={regularHeart} />
                </div>
                <div className={`like ${isLike ? "active" : ""}`}>
                  <FontAwesomeIcon icon={solidHeart} />
                </div>
              </button>
              <div className="like-count">{likeCount}</div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
