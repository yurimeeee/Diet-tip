import React, { useState } from "react";
import profileImg from "../asset/user/avatar-yr.png";
//이모지 라이브러리
import { EmojiButton } from "@joeattardi/emoji-button";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {/* <button onClick={closeModal} className="close-button">
              닫기
            </button> */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const MealCreate = ({ onModeChange }) => {
  const [inputHashTag, setInputHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [textarea, setTextarea] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //글 작성
  const [post, setPost] = useState("");
  const [file, setFile] = useState("");

  //글 입력시
  // const postChange = (e) => {
  //   setPost(e.target.value);
  //   console.log(post);
  // };

  //이미지 업로드
  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length == 1) {
      setFile(files[0]);
    }
  };

  //식단 업로드
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    //유저 없거나, 게시글 빈값이거나 글자수 초과시 리턴
    if (!user || post === "" || post.length > 1000) return;
    try {
      const doc = await addDoc(collection(db, "meal"), {
        text: post,
        createdAt: Date.now(),
        username: user.displayName,
        userId: user.uid,
        hashTags,
      });
      if (file) {
        // 파일 위치에 대한 참조
        const locationRef = ref(storage, `meal/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          //파일 업로드 후 파일의 퍼블릭 url 받음
          photo: url,
        });
      }
      //초기화
      setPost("");
      setTextarea("");
      setHashTags([]);
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  console.log("post", post);
  console.log("textarea", textarea);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //해시태그 start.
  const handleInputChange = (e) => {
    setInputHashTag(e.target.value);
  };

  // 해시태그 추가
  const keyDownHandler = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      //이벤트가 합성중인지 여부 확인
      e.preventDefault();

      // 빈값이거나 해시태그 다섯개 이상 입력 시, 리턴
      if (inputHashTag.trim() === "" || hashTags.length === 5) {
        return;
      }
      // 입력값을 배열에 추가
      setHashTags((prevHashtags) => [...prevHashtags, inputHashTag.trim()]);
      // 입력값 초기화
      setInputHashTag("");
    }
  };

  //해시태그 삭제
  const deleteHashTag = (index) => {
    const updatedHashTags = [...hashTags];
    updatedHashTags.splice(index, 1);
    setHashTags(updatedHashTags);
  };
  // 해시태그 end.

  //이모지 start.
  const picker = new EmojiButton();
  picker.on("emoji", (emoji) => {
    setTextarea((value) => value + emoji.emoji);
    setPost((value) => value + emoji.emoji);
    // console.log(emoji);
  });

  const handleEmojiClick = () => {
    picker.togglePicker();
  };
  //이모지 end.

  //식단 작성 취소
  const writeModeCancel = () => {
    onModeChange(false);
  };

  if (isModalOpen) {
    document.body.style.overflow = "hidden"; // 스크롤 막기
  } else {
    document.body.style.overflow = "visible"; // 스크롤 허용
  }

  return (
    <>
      <div className="meal-create web-shadow lg-radius">
        <div className="df aic">
          <img src={profileImg} alt="유저 프로필" />
          {/* <p className="meal-user">yurimeeee</p> */}
          <p className="meal-user">{auth.currentUser.displayName}</p>
        </div>
        <form onSubmit={onSubmit}>
          <textarea
            name="mealText"
            placeholder={`${auth.currentUser.displayName}님의 오늘의 다이어팁 식단을 소개해주세요!`}
            rows={5}
            value={textarea}
            // onChange={(e) => setTextarea(e.target.value)}
            onChange={(e) => {
              setTextarea(e.target.value);
              setPost(e.target.value);
            }}
          ></textarea>
          <div className="tag-wrap">
            <input
              value={inputHashTag}
              onChange={handleInputChange}
              // onKeyUp={addHashTag}
              onKeyDown={keyDownHandler}
              placeholder="#해시태그를 등록해보세요. (최대 5개)"
              className="tag-input"
            />
            <div className="form-tag-wrap">
              {hashTags.map((tag, index) => (
                <div className="w-badge" key={index}>
                  {tag}
                  <svg
                    onClick={() => {
                      deleteHashTag(index);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle
                      cx="9.99985"
                      cy="9.99985"
                      r="9.37486"
                      fill="white"
                      stroke="#9DA1A6"
                      stroke-width="1.24998"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.40735 6.40735C6.4571 6.35747 6.5162 6.3179 6.58127 6.2909C6.64634 6.2639 6.7161 6.25 6.78655 6.25C6.857 6.25 6.92675 6.2639 6.99182 6.2909C7.05689 6.3179 7.11599 6.35747 7.16574 6.40735L10.0001 9.24276L12.8344 6.40735C12.8842 6.35755 12.9433 6.31805 13.0084 6.2911C13.0735 6.26415 13.1432 6.25028 13.2136 6.25028C13.284 6.25028 13.3538 6.26415 13.4188 6.2911C13.4839 6.31805 13.543 6.35755 13.5928 6.40735C13.6426 6.45715 13.6821 6.51626 13.7091 6.58133C13.736 6.64639 13.7499 6.71612 13.7499 6.78655C13.7499 6.85697 13.736 6.9267 13.7091 6.99177C13.6821 7.05683 13.6426 7.11595 13.5928 7.16574L10.7574 10.0001L13.5928 12.8344C13.6426 12.8842 13.6821 12.9433 13.7091 13.0084C13.736 13.0735 13.7499 13.1432 13.7499 13.2136C13.7499 13.284 13.736 13.3538 13.7091 13.4188C13.6821 13.4839 13.6426 13.543 13.5928 13.5928C13.543 13.6426 13.4839 13.6821 13.4188 13.7091C13.3538 13.736 13.284 13.7499 13.2136 13.7499C13.1432 13.7499 13.0735 13.736 13.0084 13.7091C12.9433 13.6821 12.8842 13.6426 12.8344 13.5928L10.0001 10.7574L7.16574 13.5928C7.11595 13.6426 7.05683 13.6821 6.99177 13.7091C6.9267 13.736 6.85697 13.7499 6.78655 13.7499C6.71612 13.7499 6.64639 13.736 6.58133 13.7091C6.51626 13.6821 6.45715 13.6426 6.40735 13.5928C6.35755 13.543 6.31805 13.4839 6.2911 13.4188C6.26415 13.3538 6.25028 13.284 6.25028 13.2136C6.25028 13.1432 6.26415 13.0735 6.2911 13.0084C6.31805 12.9433 6.35755 12.8842 6.40735 12.8344L9.24276 10.0001L6.40735 7.16574C6.35747 7.11599 6.3179 7.05689 6.2909 6.99182C6.2639 6.92675 6.25 6.857 6.25 6.78655C6.25 6.7161 6.2639 6.64634 6.2909 6.58127C6.3179 6.5162 6.35747 6.4571 6.40735 6.40735Z"
                      fill="#9DA1A6"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="df jcsb">
            <div className="utility">
              <div>
                <label htmlFor="add-img">
                  {/* <FontAwesomeIcon icon={faImage} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12" />
                  </svg>
                  <span>이미지 추가</span>
                </label>
                <input
                  type="file"
                  id="add-img"
                  className="hidden"
                  onChange={onFileChange}
                  accept="image/*"
                />
              </div>
              <div>
                <svg
                  className="trigger"
                  onClick={handleEmojiClick}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-smile"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                </svg>
              </div>
            </div>

            {/* <FontAwesomeIcon
            icon={faFaceSmile}
            className="trigger"
            onClick={handleEmojiClick}
          /> */}
            <div className="form-btns">
              <button className="w-green-btn">게시</button>
              <button className="w-gray-btn" onClick={openModal}>
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="modal-overlay" onClick={closeModal}>
          <div className="cancel-confirm">
            <h2>식단 작성을 취소하시나요?</h2>
            <div className="modal-btn">
              <button onClick={writeModeCancel} className="w-green-btn">
                확인
              </button>
              <button onClick={closeModal} className="w-gray-btn">
                취소
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default MealCreate;
