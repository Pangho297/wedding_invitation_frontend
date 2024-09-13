import { Link, To, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import "./style.scss";
import ArrowBackOutline from "@/assets/icons/arrow_back.svg";
import { ReactNode, useState } from "react";

type DefaultFeedProps = {
  title: string;
  src: string;
  children: ReactNode;
};

export default function DefaultFeed({ title, src, children }: DefaultFeedProps) {
  const location = useLocation();
  const [isLike, setIsLike] = useState<boolean>(false);

  const handleLike = () => {
    if (isLike) return;

    setIsLike(true);

    setTimeout(() => setIsLike(false), 1000);
  };

  return (
    <section className="feed-detail-container">
      <nav className="feed-header">
        <Link to={-1 as To} className="feed-header-left">
          <ArrowBackOutline />
        </Link>
        <h3 className="feed-header-title">{title}</h3>
        <div className="feed-header-right"></div>
      </nav>
      <article className="feed-body">
        <div className="feed-image-container">
          <div className={`heart-anime ${isLike ? "active" : ""}`}>
            <FontAwesomeIcon icon={solidHeart} />
          </div>

          {src && <img className="thumbnail_image" src={src} alt="feed_image" />}
        </div>
        <nav className="feed-icon-container">
          <div className="feed-icon-left">
            {!location.pathname.includes("/check") && !location.pathname.includes("/donation") && (
              <button className={`feed-icon heart`} onClick={handleLike}>
                <div className="dislike" style={{ opacity: isLike ? 0 : 1 }}>
                  <FontAwesomeIcon icon={regularHeart} />
                </div>
                <div className={`like ${isLike ? "active" : ""}`}>
                  <FontAwesomeIcon icon={solidHeart} />
                </div>
              </button>
            )}
          </div>
        </nav>
        {children}
      </article>
    </section>
  );
}
