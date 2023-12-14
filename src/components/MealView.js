import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  docRef,
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
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MealView = ({ clickedData, setIsViewOpen, onReplyCount }) => {
  const user = auth.currentUser;
  const [toggleMore, SetToggleMore] = useState(false);
  const [replys, setReplys] = useState([]);
  const [newReplys, setNewReplys] = useState("");
  const [nestedReplys, setNestedReplys] = useState([]);
  const [replyTo, setReplyTo] = useState("");
  const [isReplyToMode, setIsReplyToMode] = useState(false);
  const [replyIdx, setReplyIdx] = useState("");
  const [nereplyIdx, setNeReplyIdx] = useState("");
  const [isnestedReplysView, setIsNestedReplysView] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(clickedData.like);

  // console.log(clickedData, "clickedData");

  //식단 좋아요
  const handleDoubleClick = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      let newLikeCount = ++clickedData.like;
      setLikeCount(newLikeCount);
      const docRef = doc(db, "meal", clickedData.id);
      const updateData = {
        // like: likeCount,
        like: newLikeCount,
      };
      try {
        await updateDoc(docRef, updateData);
        console.log("좋아요 성공:");
      } catch (error) {
        console.error("좋아요 실패:", error);
      }
    }
  };

  const closeModal = () => {
    setIsViewOpen(false);
  };

  const toggleSet = () => {
    SetToggleMore(!toggleMore);
  };

  //식단 삭제
  const onDelete = async () => {
    // // const ok = confirm("식단을 삭제하시나요?");
    // if (!ok) return;
    try {
      await deleteDoc(doc(db, "meal", clickedData.id));
      // await deleteDoc(doc(db, "meal", `${clickedData.id}/reply`));

      // meal 컬렉션 내의 reply 문서 모두 삭제
      const replyQuerySnapshot = await getDocs(
        collection(db, `meal/${clickedData.id}/reply`)
      );
      const replyDocs = replyQuerySnapshot.docs;
      await Promise.all(replyDocs.map(async (doc) => await deleteDoc(doc.ref)));

      //스토리지에서 사진 삭제
      const photoRef = ref(storage, `meal/${user.uid}/${clickedData.id}`);
      await deleteObject(photoRef);
      console.log(photoRef);
    } catch (e) {
      console.log(e);
    } finally {
      setIsViewOpen(false);
    }
  };

  //댓글 불러오기
  useEffect(() => {
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
    if (nestedReplys.length > 0) {
      setIsNestedReplysView(true);
    }
  }, []);

  const replyInputHandler = (e) => {
    setNewReplys(e.target.value);
  };

  const replyCancel = () => {
    setNewReplys("");
  };

  //대댓글
  const handleItemIdx = (e) => {
    const listItem = e.target.closest("li");

    if (listItem) {
      const dataIdx = listItem.getAttribute("data-idx");
      // console.log("data-idx 값:", dataIdx);
      setReplyIdx(dataIdx);

      // useEffect(() => {
      // 대댓글 불러오기
      const fetchListData = async () => {
        const querySnapshot = await getDocs(
          collection(db, `meal/${clickedData.id}/reply/${dataIdx}/nestedReply`)
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNestedReplys(data);

        // const querySnapshot2 = await getDocs(
        //   collection(db, `meal/${clickedData.id}/reply`)
        // );
        // const replyIdx = querySnapshot2.docs.map((doc) => ({
        //   id: doc.id,
        //   username: doc.data().username,
        //   // ...doc.data(),
        // }));

        // data-idx 값과 일치하는 문서
        const clickedDocument = replys.find((doc) => doc.id === dataIdx);

        if (clickedDocument) {
          const replyToUsername = clickedDocument.username;
          // console.log(clickedDocument.id, "replyTo");
          setReplyTo(replyToUsername);
          // console.log(replyToUsername, "replyTo");
        }
      };

      fetchListData();
      // }, []);
      //대댓글 모드 전환
      setIsReplyToMode(true);
    }
  };

  //대댓글 보기
  const handleNestedItemIdx = (e) => {
    // 클릭한 요소의 데이터 인덱스
    const clickedDataIdx = e.currentTarget
      .closest("li")
      .getAttribute("data-idx");

    // 클릭한 요소의 대댓글만 보이도록
    setIsNestedReplysView((prev) =>
      prev !== clickedDataIdx ? clickedDataIdx : null
    );
  };

  const replyToModeHandler = () => {
    setIsReplyToMode(false);
  };
  // console.log(nestedReplys, "nestedReplys");

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    //유저 없거나, 게시글 빈값이거나 글자수 초과시 리턴
    if (!user || newReplys === "" || newReplys.length > 1000) return;
    try {
      // let docRef;

      //대댓글 모드에 따라 경로 설정
      const replyPath = isReplyToMode
        ? `meal/${clickedData.id}/reply/${replyIdx}/nestedReply`
        : `meal/${clickedData.id}/reply`;

      //댓글 추가
      const doc = await addDoc(collection(db, replyPath), {
        content: newReplys,
        createdAt: Date.now(),
        username: user.displayName,
        userId: user.uid,
        replyIdx: replyIdx,
      });
      setNewReplys("");
      onReplyCount(replys); //부모 컴포넌트로 댓글 수 전달

      //추가된 댓글 다시 불러오기
      const querySnapshot = await getDocs(collection(db, replyPath));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplys(data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <div className="meal-view-bg">
      <div className="meal-view df">
        <div className="meal-view-col">
          <div className="meal-img-wrap">
            <img
              src={clickedData.photo}
              alt="식단이미지"
              className={isLiked ? "liked meal-img" : "meal-img"}
              onDoubleClick={handleDoubleClick}
            />
            {isLiked && (
              <svg
                className="like-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="45"
                viewBox="0 0 52 45"
                fill="none"
              >
                <path
                  d="M24.3019 41.7445L24.2944 41.7375L24.2869 41.7306L24.0399 41.5034L24.033 41.497L6.24612 24.9791L6.24588 24.9789C3.5367 22.4639 2 18.933 2 15.2322V14.897C2 8.70813 6.3949 3.39753 12.481 2.2366L12.4851 2.23582C15.9417 1.56905 19.4822 2.36597 22.3057 4.3523C23.1033 4.9199 23.8425 5.57215 24.5091 6.3176L26.0162 8.0032L27.5052 6.30153C27.8638 5.89167 28.2511 5.51237 28.6701 5.15448L28.6701 5.15451L28.6794 5.14646C29.0103 4.86032 29.3424 4.59862 29.686 4.35814L29.6904 4.35502C32.5145 2.36672 36.0584 1.5677 39.5198 2.22658C45.6038 3.3875 50 8.70672 50 14.897V15.2322C50 18.933 48.4633 22.4639 45.7541 24.9789L45.7539 24.9791L27.967 41.497L27.9601 41.5034L27.7131 41.7306L27.7077 41.7356C27.2392 42.1698 26.626 42.4111 26 42.4111C25.3631 42.4111 24.758 42.1729 24.3019 41.7445Z"
                  stroke="white"
                  stroke-width="4"
                />
              </svg>
            )}
          </div>
          <div className="meal-info">
            <div className="df aic">
              <img src={profileImg} alt="유저 프로필" />
              <p className="meal-user">{clickedData.username}</p>
            </div>
            <div className="like-reply-wrap">
              <div>
                {isLiked ? (
                  <FontAwesomeIcon icon={solidHeart} />
                ) : (
                  <FontAwesomeIcon icon={regularHeart} />
                )}
                <span>{clickedData.like}</span>
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
                  <li key={index} data-idx={reply.id}>
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
                      <FontAwesomeIcon icon={regularHeart} />
                    </div>
                    <p className="add-nested-reply" onClick={handleItemIdx}>
                      답글달기...
                    </p>
                    {nestedReplys.length > 0 && (
                      <p
                        className="add-nested-reply"
                        onClick={handleNestedItemIdx}
                      >
                        {isnestedReplysView ? "대댓글 접기" : "대댓글 보기"}
                      </p>
                    )}
                    {isnestedReplysView === reply.id && (
                      <ul className="nested-replys">
                        {nestedReplys
                          .filter((neReply) => neReply.replyIdx === reply.id)
                          .map((neReply, index) => (
                            <li key={index} data-idx={neReply.id}>
                              <div className="reply">
                                <div>
                                  <img
                                    src={replyImg}
                                    alt="유저 프로필"
                                    className="reply-img"
                                  />
                                  <p className="reply-user">
                                    {neReply.username}
                                  </p>
                                  <p className="reply-text ">
                                    {neReply.content}{" "}
                                  </p>
                                </div>
                                <FontAwesomeIcon icon={regularHeart} />
                              </div>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <form className="add-reply" onSubmit={onSubmit}>
              {isReplyToMode && (
                <div className="reply-to">
                  <p>{replyTo} 님에게 답글 남기는 중</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={replyToModeHandler}
                  />
                </div>
              )}
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
    </div>
  );
};

export default MealView;
