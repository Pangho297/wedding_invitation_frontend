import DefaultFeed from "@/components/DefaultFeed";

import "./style.scss";
import { useEffect, useState } from "react";
import { onlyNumberChange } from "@/utils/onlyNumber";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { useNavigate } from "react-router-dom";

export default function Check() {
  const [side, setSide] = useState<"신랑" | "신부">("신랑");
  const [meal, setMeal] = useState<"예정" | "안함" | "미정">("예정");
  const [name, setName] = useState<string>("");
  const [attendees, setAttendees] = useState<string>("");
  const navigate = useNavigate();

  const [image, setImage] = useState<string>();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = useDebounce(async () => {
    try {
      const res = await api.main.getIntroImage();
      setImage(res[3]);
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleSubmit = useDebounce(async () => {
    try {
      const res = await api.check.AddGuest({
        side,
        name,
        meal,
        attendees: parseInt(attendees),
      });

      if (res.message === "OK") {
        alert("참석 의사가 전달되었습니다");
        navigate(-1);
      }
    } catch (error) {
      throw error;
    }
  }, 300);

  return (
    <DefaultFeed title="참석 의사 전달" src={image ?? ""}>
      <div className="invite-check-container">
        <div className="check-intro">
          축하의 마음으로 참석해주시는 <br />
          모든 분들을 귀하게 모실 수 있도록 <br />
          참석 의사를 전달 부탁드립니다. <br />
        </div>
        <h5 className="invite-check-title">참석 의사 전달</h5>
        <form className="check-form-container">
          <div className="form-item-wrapper">
            <p className="item-head">구분</p>
            <div className="item-content">
              <button
                className={`type-button ${side === "신랑" ? "active" : ""}`}
                type="button"
                value="신랑"
                onClick={e => setSide(e.currentTarget.value as "신랑")}
              >
                신랑측
              </button>
              <button
                className={`type-button ${side === "신부" ? "active" : ""}`}
                type="button"
                value="신부"
                onClick={e => setSide(e.currentTarget.value as "신부")}
              >
                신부측
              </button>
            </div>
          </div>
          <div className="form-item-wrapper">
            <p className="item-head">성함</p>
            <div className="item-content">
              <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className="form-item-wrapper">
            <p className="item-head">참석인원</p>
            <div className="item-content">
              <input
                type="text"
                placeholder="본인 포함 총 참석인원 (숫자만 입력)"
                className="form-input"
                inputMode="numeric"
                value={attendees}
                onChange={e => onlyNumberChange(e, setAttendees)}
              />
            </div>
          </div>
          <div className="form-item-wrapper">
            <p className="item-head">식사여부</p>
            <div className="item-content">
              <button
                className={`type-button ${meal === "예정" ? "active" : ""}`}
                type="button"
                value="예정"
                onClick={e => setMeal(e.currentTarget.value as "예정")}
              >
                예정
              </button>
              <button
                className={`type-button ${meal === "안함" ? "active" : ""}`}
                type="button"
                value="안함"
                onClick={e => setMeal(e.currentTarget.value as "안함")}
              >
                안함
              </button>
              <button
                className={`type-button ${meal === "미정" ? "active" : ""}`}
                type="button"
                value="미정"
                onClick={e => setMeal(e.currentTarget.value as "미정")}
              >
                미정
              </button>
            </div>
          </div>
          <button className="submit-button" type="button" onClick={handleSubmit}>
            참석 의사 전달하기
          </button>
        </form>
      </div>
    </DefaultFeed>
  );
}
