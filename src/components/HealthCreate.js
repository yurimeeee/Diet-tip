import React, { useState } from "react";
import profileImg from "../asset/user/avatar-yr.png";
//이모지 라이브러리
import { EmojiButton } from "@joeattardi/emoji-button";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

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

const HealthCreate = ({ onModeChange }) => {
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
    const now = moment();
    //유저 없거나, 게시글 빈값이거나 글자수 초과시 리턴
    if (!user || post === "" || post.length > 200) return;
    try {
      const doc = await addDoc(collection(db, "health"), {
        text: post,
        createdAt: now.format("YYYY-MM-DD"),
        username: user.displayName,
        userId: user.uid,
        hashTags,
        like: 0,
      });
      if (file) {
        // 파일 위치에 대한 참조
        const locationRef = ref(storage, `health/${user.uid}/${doc.id}`);
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
      <div className="meal-create web-shadow md-radius">
        <div className="df aic">
          <img src={profileImg} alt="유저 프로필" />
          <p className="meal-user">{auth.currentUser.displayName}</p>
        </div>
        <form onSubmit={onSubmit}>
          <textarea
            name="mealText"
            placeholder={`${auth.currentUser.displayName}님의 오늘의 운동을 인증해주세요!`}
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
                  <span className="tag-del">
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="sm"
                      onClick={() => {
                        deleteHashTag(index);
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="df jcsb">
            <div className="utility">
              <div>
                <label htmlFor="add-img">
                  <FontAwesomeIcon icon={faImage} />
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
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  onClick={handleEmojiClick}
                />
              </div>
            </div>

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
            <h2>작성을 취소하시나요?</h2>
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
export default HealthCreate;
