import { useEffect, useState } from "react";
import "./style.scss";
import { GuestType } from "@/types/check";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";

export default function Guests() {
  const [checkList, setCheckList] = useState<GuestType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    getCheckList();
  }, []);

  const getCheckList = useDebounce(async () => {
    try {
      const res = await api.check.getGuestList();
      setCheckList(res);
    } catch (error) {
      throw error;
    }
  }, 300);


  return (
    <div className="guests-container">
      {!showModal && (
        <>
          <div className="table-header-row">
            <div className="table-header">이름</div>
            <div className="table-header">참석측</div>
            <div className="table-header">참석인원</div>
            <div className="table-header">식사여부</div>
          </div>
          <ul className="table-data-container">
            {checkList.map((item, index) => (
              <li key={index} className="table-data-row">
                <div className="table-data">{item.name}</div>
                <div className="table-data">{item.side}측</div>
                <div className="table-data">{item.attendees}명</div>
                <div className="table-data">{item.meal}</div>
              </li>
            ))}
          </ul>
        </>
      )}
      {showModal && (
        <>
          <div className="admin-modal-mask" />
          <form className="admin-modal-body">
            <p>비밀번호를 입력해주세요</p>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" className="submit-button">
                제출
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
