import React, { useState, useEffect } from "react";
import "../styles/meal.css";
import Weekly from "../components/Weekly";

import MealCreate from "../components/MealCreate";
import MealPost from "../components/MealPost";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

import TitleBanner from "../components/TitleBanner";
import MealView from "../components/MealView";

// const Modal = ({ isOpen, closeModal, children }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             {/* <button onClick={closeModal} className="close-button">
//               닫기
//             </button> */}
//             {children}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

const DailyMeal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [replyCount, setReplyCount] = useState("");

  console.log("replyCount", replyCount);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModeChange = (val) => {
    setIsWritingMode(val);
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      //쿼리생성
      const tweetsQuery = query(
        collection(db, "meal"), //컬렉션 지정
        orderBy("createdAt", "desc"), //시간순으로 내림차순
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { text, createdAt, userId, username, photo, hashTags } =
            doc.data();
          return {
            text,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            hashTags,
          };
        });
        setPosts(posts);
      });
    };

    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
      // 사용자가 타임라인을 보고 있을때만 작동
    };
  }, []);

  //상세보기
  const [myData, setMyData] = useState([]);
  const [clickedData, setClickedData] = useState([]);

  useEffect(() => {
    // Firestore에서 데이터 가져오기
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "meal"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyData(data);
    };

    fetchData();
  }, []);

  const handleClick = async (id) => {
    // 클릭한 요소에 해당하는 문서 가져오기
    const docRef = doc(db, "meal", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const clickedData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
      setClickedData(clickedData);
      console.log("클릭한 요소에 해당하는 문서:", clickedData.text);
      setIsViewOpen(true);
    } else {
      console.log("문서가 존재하지 않습니다.");
    }
  };
  const onReplyCount = (val) => {
    console.log("val", val);
    setReplyCount(val.length);
    console.log(replyCount, "onReplyCount replyCount");
  };

  return (
    <div className="container">
      <TitleBanner
        isWritingMode={isWritingMode}
        onModeChange={handleModeChange}
      />
      {isWritingMode && (
        <MealCreate
          isWritingMode={isWritingMode}
          onModeChange={handleModeChange}
        />
      )}
      <Weekly />
      {isViewOpen ? (
        <MealView
          clickedData={clickedData}
          setIsViewOpen={setIsViewOpen}
          onReplyCount={onReplyCount}
        />
      ) : null}
      <div className="meal-post-wrap">
        {posts.slice(0, 4).map((post, index) => (
          <div style={{ width: "312px" }} key={index}>
            <MealPost
              key={index}
              {...post}
              handleClick={handleClick}
              onClick={() => {
                setIsViewOpen(true);
              }}
              onReplyCount={replyCount}
            />
          </div>
        ))}
      </div>
      <h2 className="sec-tt">Today’s pick! </h2>
      <div className="meal-post-wrap today-meal">
        {posts.map((post, index) => (
          <MealPost
            key={index}
            {...post}
            handleClick={handleClick}
            onClick={() => {
              setIsViewOpen(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default DailyMeal;
