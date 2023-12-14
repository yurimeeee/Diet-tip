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
import likeImg from "../asset/like-fill.png";

const MealPost = ({
  username,
  photo,
  like,
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

  return (
    <div className="meal-card" onClick={() => handleClick(id)}>
      <div className="img-container">
        <img src={photo || mealImg} alt="식단이미지" className="meal-img" />
        {/* {heartActive && ( */}
        {/* <div className="heart-active"> */}
        <div className="like-container">
          <img alt="like icon" src={likeImg}></img>
        </div>
        {/* <div className="heart-active">
        
        <FontAwesomeIcon icon={solidHeart} size="4x" />
      </div> */}
        {/* )} */}
      </div>
      <div className="meal-info">
        <div className="df aic">
          <img src={profileImg} alt="유저 프로필" />
          <p className="meal-user">{username}</p>
        </div>
        <div className="like-reply-wrap">
          <div>
            <FontAwesomeIcon icon={regularHeart} />
            {/* <FontAwesomeIcon icon={solidHeart} /> */}
            <span>{like}</span>
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
