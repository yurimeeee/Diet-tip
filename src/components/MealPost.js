// import { auth, db, storage } from "../firebase";
import { useState, useEffect } from "react";
import mealImg from "../asset/meal/meal.png";
import profileImg from "../asset/user/avatar-yr.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as solidComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as regularComment } from "@fortawesome/free-regular-svg-icons";

const MealPost = ({
  username,
  photo,
  post,
  userId,
  id,
  hashTags,
  handleClick,
  replyCount,
}) => {
  const [isreplyCount, setIsReplyCount] = useState(replyCount);
  const [heartActive, setHeartActive] = useState(false);

  //댓글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, `meal/${id}/reply`));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsReplyCount(data.length);
    };

    fetchData();
  }, [id]);

  //더블 클릭
  // const handleDoubleClick = () => {
  //   setTimeout(setHeartActive(true), 1500);
  //   setHeartActive(false);
  // };

  const handleHover = () => {
    setHeartActive(true);
  };

  const handleLeave = () => {
    setHeartActive(false);
  };

  // // 이미지에 대한 호버 이벤트만 한 번만 실행되도록 useEffect 사용
  // useEffect(() => {
  //   const imgElement = document.querySelector(".meal-img");

  //   if (imgElement) {
  //     imgElement.addEventListener("mouseenter", handleHover);
  //     imgElement.addEventListener("mouseleave", handleLeave);

  //     return () => {
  //       imgElement.removeEventListener("mouseenter", handleHover);
  //       imgElement.removeEventListener("mouseleave", handleLeave);
  //     };
  //   }
  // }, []);
  return (
    <div className="meal-card" onClick={() => handleClick(id)}>
      <img
        src={photo || mealImg}
        alt="식단이미지"
        className="meal-img"
        // onMouseEnter={handleHover}
        // onMouseLeave={handleLeave}
      />
      {/* {heartActive && ( */}
      <div className="heart-active">
        <FontAwesomeIcon icon={solidHeart} size="4x" />
      </div>
      {/* )} */}
      <div className="meal-info">
        <div className="df aic">
          <img src={profileImg} alt="유저 프로필" />
          <p className="meal-user">{username}</p>
        </div>
        <div className="like-reply-wrap">
          <div>
            <FontAwesomeIcon icon={regularHeart} />
            {/* <FontAwesomeIcon icon={solidHeart} /> */}
            <span>{6}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={isreplyCount > 0 ? solidComment : regularComment}
            />
            <span>{isreplyCount}</span>
          </div>
        </div>
      </div>
      <div className="hashtag">
        {hashTags
          ? hashTags.map((tag, index) => (
              <span key={index} className="m-badge">
                {tag}
              </span>
            ))
          : null}
      </div>
    </div>
  );
};

export default MealPost;
