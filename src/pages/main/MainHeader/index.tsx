import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import copy from "copy-to-clipboard";
import { Toast } from "antd-mobile";

export default function MainHeader() {
  const handleShare = () => {
    const shareData = {
      title: "Weddingstagram",
      text: `👰🏻‍♀️ ❤️ 🤵🏻 청첩장 보러가기`,
      url: "",
    };
    //@ts-ignore
    if (window.navigator.canShare) {
      return window.navigator.share(shareData);
    } else {
      copy("");
      Toast.show({
        content: "복사되었습니다",
      });
    }
  };
  return (
    <nav className="main-header-container">
      <h3 className="main-header-title">Weddingstagram</h3>
      <div className="button-container">
        <button className="share-button" type="button" onClick={handleShare}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </button>
        <Link className="main-header-link" to="/write">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </nav>
  );
}
