import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import profileImg from "../asset/user/avatar-yr.png";
import levelImg from "../asset/user/level-1.png";
import replyImg from "../asset/user/avatar-es.png.png";
import firebase from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as solidComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as regularComment } from "@fortawesome/free-regular-svg-icons";

const MealView = ({ clickedData, setIsViewOpen, onReplyCount }) => {
  const user = auth.currentUser;
  const [toggleMore, SetToggleMore] = useState(false);

  console.log(clickedData, "clickedData");
  const closeModal = () => {
    setIsViewOpen(false);
  };

  const toggleSet = () => {
    SetToggleMore(!toggleMore);
  };

  const onDelete = async () => {
    // // const ok = confirm("식단을 삭제하시나요?");
    // if (!ok) return;
    try {
      await deleteDoc(doc(db, "meal", clickedData.id));
      // if (photo) {
      const photoRef = ref(storage, `tweets/${user.uid}/${clickedData.id}`);
      await deleteObject(photoRef);
    } catch (e) {
      console.log(e);
    } finally {
      setIsViewOpen(false);
    }
  };

  const [replys, setReplys] = useState([]);
  const [newReplys, setNewReplys] = useState("");

  // const addReply = async () => {
  //   // 새로운 댓글 추가
  //   const newReplyRef = await firebase.firestore().collection("comments").add({
  //     content: newComment,
  //     userId: "현재 사용자의 UID", // 사용자 로그인 구현 후에 동적으로 설정
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     replies: [], // 답글은 빈 배열로 시작
  //   });

  //   // 댓글 목록 갱신
  //   // fetchComments();

  //   // 입력 필드 초기화
  //   setNewReplys("");
  // };

  // useEffect(() => {
  //   // 컴포넌트 마운트 시에 댓글 목록 불러오기
  //   fetchComments();
  // }, []);

  // const [meal, setMeal] = useState(null);
  // const [replies, setReplies] = useState([]);
  console.log("clickedData", clickedData);

  //댓글 불러오기
  useEffect(() => {
    // Firestore에서 데이터 가져오기
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, `meal/${clickedData.id}/reply`)
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplys(data);
    };

    fetchData();
  }, []);

  console.log("replys", replys.length);

  const replyInputHandler = (e) => {
    setNewReplys(e.target.value);
  };

  const replyCancel = () => {
    setNewReplys("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    //유저 없거나, 게시글 빈값이거나 글자수 초과시 리턴
    if (!user || newReplys === "" || newReplys.length > 1000) return;
    try {
      const doc = await addDoc(collection(db, `meal/${clickedData.id}/reply`), {
        content: newReplys,
        createdAt: Date.now(),
        username: user.displayName,
        userId: user.uid,
      });
      //초기화
      setNewReplys("");
      //부모 컴포넌트로 댓글 수 전달
      onReplyCount(replys);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // const fetchMealDetails = async () => {
  //   try {
  //     // Meal 데이터 가져오기
  //     const mealDoc = await firebase
  //       .firestore()
  //       .collection("meal")
  //       .doc(clickedData)
  //       .get();
  //     if (mealDoc.exists) {
  //       setMeal({ id: mealDoc.id, ...mealDoc.data() });

  //       // Meal에 속한 Replies 가져오기
  //       const repliesCollection = await firebase
  //         .firestore()
  //         .collection(`meal/${clickedData}/reply`)
  //         .get();
  //       const repliesData = repliesCollection.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setReplies(repliesData);
  //     } else {
  //       console.log("문서를 찾을 수 없습니다.");
  //     }
  //   } catch (error) {
  //     console.error("데이터 가져오기 실패:", error);
  //   }
  // };

  // console.log(replies, "replies");
  // useEffect(() => {
  //   // 컴포넌트 마운트 시에 Meal 및 Replies 데이터 가져오기
  //   fetchMealDetails();
  // }, [clickedData]);

  console.log("clickedData.userId", clickedData.userId);
  console.log("auth", auth.currentUser.uid);

  return (
    <>
      <div className="meal-view df">
        <div className="meal-view-col">
          <img src={clickedData.photo} alt="식단이미지" className="meal-img" />
          <div className="meal-info">
            <div className="df aic">
              <img src={profileImg} alt="유저 프로필" />
              <p className="meal-user">{clickedData.username}</p>
            </div>
            <div className="like-reply-wrap">
              <div>
                <FontAwesomeIcon icon={regularHeart} />
                {/* <FontAwesomeIcon icon={solidHeart} /> */}
                <span>6</span>
              </div>
              <div>
                {replys.length === 0 ? (
                  <FontAwesomeIcon icon={regularComment} />
                ) : (
                  <FontAwesomeIcon icon={solidComment} />
                )}{" "}
                <span>{replys.length}</span>
              </div>
            </div>
          </div>

          <p>{clickedData.text}</p>
          <div className="hashtag">
            {clickedData.hashTags
              ? clickedData.hashTags.map((tag, index) => (
                  <span key={index} className="m-badge">
                    {tag}
                  </span>
                ))
              : null}
          </div>
        </div>
        <div className="meal-view-col reply-wrap">
          <div className="meal-info">
            <div>
              <img src={profileImg} alt="유저 프로필" />
              <p className="meal-user">{clickedData.username}</p>
              <img src={levelImg} alt="유저 레벨" className="level-badge" />
              <button className="w-green-btn">팔로우</button>
            </div>
            <div onClick={toggleSet}>
              {toggleMore && auth.currentUser.uid === clickedData.userId ? (
                <div className="btn-wraps">
                  <button className="m-green-btn">수정</button>
                  <button className="m-red-btn" onClick={onDelete}>
                    삭제
                  </button>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.625 17.8125C4.87908 17.8125 4.16371 17.5162 3.63626 16.9887C3.10882 16.4613 2.8125 15.7459 2.8125 15C2.8125 14.2541 3.10882 13.5387 3.63626 13.0113C4.16371 12.4838 4.87908 12.1875 5.625 12.1875C6.37092 12.1875 7.08629 12.4838 7.61374 13.0113C8.14118 13.5387 8.4375 14.2541 8.4375 15C8.4375 15.7459 8.14118 16.4613 7.61374 16.9887C7.08629 17.5162 6.37092 17.8125 5.625 17.8125ZM15 17.8125C14.2541 17.8125 13.5387 17.5162 13.0113 16.9887C12.4838 16.4613 12.1875 15.7459 12.1875 15C12.1875 14.2541 12.4838 13.5387 13.0113 13.0113C13.5387 12.4838 14.2541 12.1875 15 12.1875C15.7459 12.1875 16.4613 12.4838 16.9887 13.0113C17.5162 13.5387 17.8125 14.2541 17.8125 15C17.8125 15.7459 17.5162 16.4613 16.9887 16.9887C16.4613 17.5162 15.7459 17.8125 15 17.8125ZM24.375 17.8125C23.6291 17.8125 22.9137 17.5162 22.3863 16.9887C21.8588 16.4613 21.5625 15.7459 21.5625 15C21.5625 14.2541 21.8588 13.5387 22.3863 13.0113C22.9137 12.4838 23.6291 12.1875 24.375 12.1875C25.1209 12.1875 25.8363 12.4838 26.3637 13.0113C26.8912 13.5387 27.1875 14.2541 27.1875 15C27.1875 15.7459 26.8912 16.4613 26.3637 16.9887C25.8363 17.5162 25.1209 17.8125 24.375 17.8125Z"
                    fill="#495057"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="reply-box">
            <div>
              <ul>
                {replys.map((reply, index) => (
                  <li key={index}>
                    <div className="reply">
                      <div>
                        <img
                          src={replyImg}
                          alt="유저 프로필"
                          className="reply-img"
                        />
                        <p className="reply-user">{reply.username}</p>
                        <p className="reply-text ">{reply.content} </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="16"
                        viewBox="0 0 19 16"
                        fill="none"
                      >
                        <path
                          d="M8.3793 15.5646L8.28652 15.4804L1.78496 9.52724C0.645703 8.48442 0 7.02082 0 5.4877V5.36695C0 2.79102 1.85547 0.580988 4.42344 0.0980001C5.88555 -0.180084 7.38105 0.152885 8.57227 0.979818C8.90625 1.21399 9.21797 1.48476 9.5 1.79577C9.65586 1.62014 9.82285 1.45915 10.001 1.30913C10.1383 1.19204 10.2793 1.08227 10.4277 0.979818C11.6189 0.152885 13.1145 -0.180084 14.5766 0.0943412C17.1445 0.577329 19 2.79102 19 5.36695V5.4877C19 7.02082 18.3543 8.48442 17.215 9.52724L10.7135 15.4804L10.6207 15.5646C10.3164 15.8427 9.91562 16 9.5 16C9.08438 16 8.68359 15.8463 8.3793 15.5646ZM8.87285 3.7387C8.85801 3.72772 8.84688 3.71309 8.83574 3.69845L8.1752 2.96665L8.17148 2.96299C7.31426 2.01531 6.01914 1.58355 4.75742 1.82139C3.02813 2.14704 1.78125 3.63259 1.78125 5.36695V5.4877C1.78125 6.53052 2.22285 7.52942 2.99844 8.23927L9.5 14.1925L16.0016 8.23927C16.7771 7.52942 17.2188 6.53052 17.2188 5.4877V5.36695C17.2188 3.63625 15.9719 2.14704 14.2463 1.82139C12.9846 1.58355 11.6857 2.01897 10.8322 2.96299C10.8322 2.96299 10.8322 2.96299 10.8285 2.96665C10.8248 2.97031 10.8285 2.96665 10.8248 2.97031L10.1643 3.70211C10.1531 3.71675 10.1383 3.72773 10.1271 3.74236C9.96016 3.90702 9.73379 3.99849 9.5 3.99849C9.26621 3.99849 9.03984 3.90702 8.87285 3.74236V3.7387Z"
                          fill="#495057"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <form className="add-reply" onSubmit={onSubmit}>
              <input
                name="reply"
                placeholder="댓글 달기..."
                value={newReplys}
                onChange={replyInputHandler}
              />
              <div className="btn-wraps">
                <button className="m-green-btn">게시</button>
                <button className="m-gray-btn" onClick={replyCancel}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </>
  );
};

export default MealView;
