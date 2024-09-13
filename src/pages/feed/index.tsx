import { useEffect, useState } from "react";
import { Link, To, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import "./style.scss";
import ArrowBackOutline from "@/assets/icons/arrow_back.svg";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { FeedType } from "@/types/feed";
import { Modal, Popup } from "antd-mobile";
import { onlyNumberChange } from "@/utils/onlyNumber";

// Tpost 길찾기 링크 https://surl.tmobiapi.com/84613cbe
// 네이버 지도 길찾기 링크 https://naver.me/5jmz6uMM
// 카카오 지도 길찾기 링크 https://kko.to/lh71BfBXDV

export default function post() {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [feedDetail, setFeedDetail] = useState<FeedType>();
  const [like, setLike] = useState<number>();
  const [pw, setPw] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getFeedDetail();
  }, []);

  const getFeedDetail = useDebounce(async () => {
    try {
      const res = await api.feed.getFeedDetail(parseInt(id ?? ""));

      setFeedDetail(res);
      setLike(res.like);
    } catch (error) {
      throw error;
    }
  }, 300);

  const deleteFeed = useDebounce(async () => {
    try {
      await api.feed.deleteFeed({
        id: parseInt(id ?? ""),
        pw,
      });

      Modal.alert({
        content: "삭제되었습니다",
        confirmText: "확인",
        onConfirm: () => navigate(-1),
      });
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleLike = async () => {
    if (isLike) return;

    try {
      const res = await api.feed.setFeedLike(parseInt(id ?? ""));

      setLike(res);
    } catch (error) {
      throw error;
    }

    setIsLike(true);

    setTimeout(() => setIsLike(false), 1000);
  };

  const handleDelete = useDebounce(() => {
    // 비밀번호 안적은 경우 모달 다시 띄우기
    if (pw === "")
      return Modal.alert({
        content: "비밀번호를 입력해주세요",
        confirmText: "확인",
      });

    deleteFeed();
  }, 300);

  const handleShowModal = (type: "EDIT" | "DELETE") => {
    if (type === "EDIT") {
      navigate("/write", {
        state: {
          id,
          body: feedDetail?.body,
          author: feedDetail?.author,
          image_url: feedDetail?.image_url,
          type: "EDIT",
        },
      });
    }
    setShowPopup(true);
  };

  return (
    <>
      {feedDetail && (
        <section className="post-container">
          <nav className="post-header">
            <Link to={-1 as To} className="post-header-left">
              <ArrowBackOutline />
            </Link>
            <h3 className="post-header-title">{feedDetail.author}</h3>
            <div className="post-header-right"></div>
          </nav>
          <article className="post-body">
            <div className="image-container">
              <div className={`heart-anime ${isLike ? "active" : ""}`}>
                <FontAwesomeIcon icon={solidHeart} />
              </div>
              <img className="feed-image" src={feedDetail.image_url} alt="feed_image" />
            </div>
            <nav className="feed-icon-container">
              <div className="feed-icon-left">
                <button className={`feed-icon heart`} onClick={handleLike}>
                  <div className="dislike" style={{ opacity: isLike ? 0 : 1 }}>
                    <FontAwesomeIcon icon={regularHeart} />
                  </div>
                  <div className={`like ${isLike ? "active" : ""}`}>
                    <FontAwesomeIcon icon={solidHeart} />
                  </div>
                </button>
                <button className="feed-icon" onClick={() => handleShowModal("EDIT")}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="feed-icon" onClick={() => handleShowModal("DELETE")}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </nav>
            <h4 className="like-counter">{like ?? 0} likes</h4>
            <div className="feed-content">{feedDetail.body}</div>
          </article>
        </section>
      )}
      <Popup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        closeOnMaskClick={true}
        bodyStyle={{
          height: "20vh",
        }}
      >
        <div className="popup-body">
          <div className="popup-wrapper">
            <h3 className="popup-title">비밀번호를 입력해 주세요</h3>
            <input
              className="popup-input"
              type="password"
              inputMode="numeric"
              placeholder="비밀번호를 입력해 주세요"
              value={pw}
              onChange={e => e.target.value.length < 7 && onlyNumberChange(e, setPw)}
            />
          </div>
          <button className="popup-button" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </Popup>
    </>
  );
}
