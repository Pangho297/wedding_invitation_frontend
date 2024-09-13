import DefaultFeed from "@/components/DefaultFeed";
import copy from "copy-to-clipboard";

import "./style.scss";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";

export default function Donation() {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = useDebounce(async () => {
    try {
      const res = await api.main.getIntroImage();
      setImage(res[4]);
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleCopy = (account: string) => {
    copy(account);
    alert(`계좌번호${account}이 복사되었습니다`);
  };
  return (
    <DefaultFeed title="마음전하기" src={image ?? ""}>
      <div className="donation-container">
        <div className="donation-intro">
          함께한 9년, <br />
          행복한 모습 소중한 분들께 <br />
          보여드리려 합니다. <br />
          그 설레는 순간을 함께 축하해 주시면 <br />더 예쁘게 잘 살겠습니다.
        </div>
        <div className="donation-name-container">
          <p className="donation-name">
            <span className="name">
              <a className="tel-link" href="tel:00000000000">
                #신랑 모 <FontAwesomeIcon icon={faMobileRetro} />{" "}
              </a>
            </span>
            의 무엇{" "}
            <span className="name">
              <a className="tel-link" href="tel:00000000000">
                #신랑 <FontAwesomeIcon icon={faMobileRetro} />
              </a>
            </span>
          </p>
          <p className="donation-name">
            <span className="name">
              <a className="tel-link" href="tel:00000000000">
                #신부 모 <FontAwesomeIcon icon={faMobileRetro} />{" "}
              </a>
            </span>
            의 무엇{" "}
            <span className="name">
              <a className="tel-link" href="tel:00000000000">
                #신부 <FontAwesomeIcon icon={faMobileRetro} />
              </a>
            </span>
          </p>
        </div>
        <div className="copy-account-wrapper">
          <button className="copy-account-button" onClick={() => handleCopy("계좌번호 복사")}>
            <p>신랑측 마음 전하실곳 💌</p>
          </button>
          <div className="divider" />
          <button className="copy-account-button" onClick={() => handleCopy("계좌번호 복사")}>
            <p>신부측 마음 전하실곳 💌</p>
          </button>
        </div>
      </div>
    </DefaultFeed>
  );
}
