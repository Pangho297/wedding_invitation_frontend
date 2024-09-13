import { Link, To, useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { DotLoading, Modal, TextArea } from "antd-mobile";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { onlyNumberChange } from "@/utils/onlyNumber";

export default function WritePost() {
  // 썸네일
  const [image, setImage] = useState<string | null>(null);
  // 파일
  const [file, setFile] = useState<File>();
  const [author, setAuthor] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isPicDelete, setIsPicDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const isEdit = state && state.type === "EDIT";

  useEffect(() => {
    if (isEdit) {
      setImage(state.image_url);
      setAuthor(state.author);
      setBody(state.body);
    }
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // 썸네일용 이미지 상태 저장
      setImage(URL.createObjectURL(e.target.files[0]));
      // 전송용 이미지 상태 저장
      setFile(e.target.files[0]);
    }
  };

  const handlePostFeed = useDebounce(async () => {
    setLoading(true);
    if (isEdit) {
      const formData = new FormData();

      if (file !== undefined) {
        formData.append("file", file);
      }
      formData.append("id", state.id);
      formData.append("pw", pw);
      formData.append("body", body);

      if (isPicDelete) {
        formData.append("is_pic_delete", "true");
      }

      try {
        await api.feed.updateFeed(formData);
        Modal.alert({
          content: "수정이 완료되었습니다",
          confirmText: "확인",
          onConfirm: () => navigate(-1),
        });
      } catch (error) {
        Modal.alert({
          content: "업로드에 실패했습니다",
          confirmText: "확인",
          onConfirm: () => setLoading(false),
        });
        throw error;
      }
      return;
    }

    const formData = new FormData();

    if (file !== undefined) {
      formData.append("file", file);
    }
    formData.append("author", author);
    formData.append("pw", pw);
    formData.append("body", body);

    try {
      await api.feed.postFeed(formData);
      Modal.alert({
        content: "게시가 완료되었습니다",
        confirmText: "확인",
        onConfirm: () => navigate(-1),
      });
    } catch (error) {
      Modal.alert({
        content: "업로드에 실패했습니다",
        confirmText: "확인",
        onConfirm: () => setLoading(false),
      });
      throw error;
    }
  }, 300);

  return (
    <article className="write-container">
      <div className="write-header">
        <Link to={-1 as To} className="write-escape-button">
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </Link>
        <h3 className="write-title">{isEdit ? "피드 수정" : "새로운 피드"}</h3>
        <div className="write-upload">
          {loading ? (
            <DotLoading color="#1877f2" />
          ) : (
            <button className="write-button" onClick={handlePostFeed}>
              {isEdit ? "수정" : "게시"}
            </button>
          )}
        </div>
      </div>
      <form className="write-body">
        <div className="write-top">
          <div className="write-input-container">
            {isEdit ? null : (
              <input
                className="write-input"
                placeholder="이름을 입력해주세요"
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            )}
            <input
              className="write-input"
              placeholder="비밀번호를 설정해주세요"
              type="password"
              inputMode="numeric"
              value={pw}
              onChange={e => e.target.value.length < 7 && onlyNumberChange(e, setPw)}
            />
          </div>
        </div>
        <TextArea
          className="write-textarea"
          placeholder="축하의 메시지를 남겨주세요"
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={body}
          onChange={e => setBody(e)}
        />
        <input
          type="file"
          accept="image/jpeg,image/png,image/bmp,image/gif,image/webp"
          id="imageUpload"
          onChange={handleImageChange}
        />
        {!image ? (
          <label className="icon-wrapper" htmlFor="imageUpload">
            <FontAwesomeIcon icon={faCamera} size="lg" />
          </label>
        ) : (
          <div className="thumbnail-wrapper">
            <img className="thumbnail-image" src={image ?? ""} alt="thumbnailImage" />
            <button
              className="thumbnail-delete"
              type="button"
              onClick={() => {
                setImage(null);
                setIsPicDelete(true);
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
        )}
      </form>
    </article>
  );
}
