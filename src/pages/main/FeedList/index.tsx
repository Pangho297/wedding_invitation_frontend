import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import api from "@/api";
import useDebounce from "@/hooks/useDebounce";
import { Mask } from "antd-mobile";
import { FeedListType, GetFeedListPayloadType } from "@/types/feed";
import { useInView } from "react-intersection-observer";

export type LocationStateType = {
  thumbnail: string;
};

type IntroFeedListType = {
  id: number;
  thumbnail: string;
  to: string;
  state?: LocationStateType;
};

export default function FeedList() {
  const [introFeedList, setIntroFeedList] = useState<IntroFeedListType[]>([]);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [feedList, setFeedList] = useState<FeedListType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allFeedLength, setAllFeedLength] = useState<number>(0);
  const link = ["/map", "/story/WEDDING", "VIDEO", "/check", "/donation", "/write"];
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: infiniteRef, inView } = useInView();

  useEffect(() => {
    getIntro();
    getFeedList({
      page: 1,
      size: 30,
    });
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      getFeedList({ page: currentPage, size: 30 });
    }
  }, [inView]);

  const getIntro = useDebounce(async () => {
    try {
      const res: string[] = await api.main.getIntroImage();
      setIntroFeedList(
        res.map((item, index) => ({
          id: index,
          thumbnail: item,
          to: link[index],
          state: { thumbnail: item },
        })),
      );
    } catch (error) {
      throw error;
    }
  }, 500);

  const getFeedList = useDebounce(async (payload?: GetFeedListPayloadType) => {
    try {
      const res = await api.feed.getFeedList(payload);
      setFeedList(prev => [...prev, ...res.feeds]);
      setAllFeedLength(res.all_cnt);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleNavigator = (link: string, state: any) => {
    if (link.indexOf("/") !== -1) {
      navigate(link, {
        state,
      });
    }

    if (link === "VIDEO") {
      setShowVideo(true);
    }
  };

  const handleCloseModal = () => {
    if (!videoRef.current) return;

    // 모달 닫히면 비디오도 중지
    videoRef.current.pause();
    setShowVideo(false);
  };

  return (
    <article className="feed-container">
      <div className="grid-wrapper">
        {introFeedList.slice(0, 6).map((item, index) => (
          <button className="feed-link" key={index} onClick={() => handleNavigator(item.to, item.state)}>
            <img className="feed-thumbnail" src={item.thumbnail} alt="feed-thumbnail" />
          </button>
        ))}
        {feedList.map(item => (
          <button className="feed-link" key={item.id} onClick={() => navigate(`/feed/${item.id}`)}>
            <img className="feed-thumbnail" src={item.image_url} alt="feed-thumbnail" />
          </button>
        ))}
      </div>
      {/* </InfiniteScroll> */}
      <Mask visible={showVideo} onMaskClick={handleCloseModal}>
        <div className="video-container">
          <video
            className="video-player"
            controls={true}
            width={window.innerWidth > 1080 ? 1080 : window.innerWidth}
            ref={videoRef}
          >
            <source src="https://web.yongineer.kr/my_wedding/wedding_movie.mp4" type="video/mp4" />
          </video>
        </div>
      </Mask>
      {currentPage > 1 && allFeedLength !== feedList.length && (
        <div ref={infiniteRef} style={{ width: "100%", height: "1px" }} />
      )}
    </article>
  );
}
