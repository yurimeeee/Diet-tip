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

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/mealSlice";

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
  const dispatch = useDispatch();
  const postsSelector = (state) => state.mealDB.posts;
  const posts = useSelector(postsSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [replyCount, setReplyCount] = useState("");
  const [bestPost, setBestPosts] = useState([]);

  // console.log("replyCount", replyCount);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModeChange = (val) => {
    setIsWritingMode(val);
  };

  // const [posts, setPosts] = useState([]);

  // console.log("posts", posts);
  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      //쿼리생성
      const mealQuery = query(
        collection(db, "meal"), //컬렉션 지정
        orderBy("createdAt", "desc"), //시간순으로 내림차순
        limit(25)
      );

      unsubscribe = await onSnapshot(mealQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { text, createdAt, userId, username, photo, hashTags, like } =
            doc.data();
          return {
            text,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            hashTags,
            like,
          };
        });
        // 리덕스 액션을 통해 스토어에 데이터 저장
        dispatch(setPosts(posts));
        // setPosts(posts);

        // let bestPostSort = posts.sort((a, b) => b.like - a.like);
        // setBestPosts(bestPostSort);
        let bestPostSort = [...posts]; // 원본 배열을 변경하지 않고 복제본 생성
        bestPostSort.sort((a, b) => b.like - a.like);
        setBestPosts(bestPostSort);
        console.log(bestPostSort);

        // 결과 확인
        console.log(posts);
      });
    };

    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
      // 사용자가 타임라인을 보고 있을때만 작동
    };
    // }, []);
  }, [dispatch]);

  //best post
  // useEffect(() => {
  //   let unsubscribe = null;
  //   const fetchPosts = async () => {
  //     //쿼리생성
  //     const mealQuery = query(
  //       collection(db, "meal"), //컬렉션 지정
  //       orderBy("like", "desc"), // like 필드의 값이 높은 순서대로 정렬
  //       limit(4) // 상위 4개만 가져오도록 제한
  //     );

  //     unsubscribe = await onSnapshot(mealQuery, (snapshot) => {
  //       const bestPost = snapshot.docs.map((doc) => {
  //         const { text, createdAt, userId, username, photo, hashTags, like } =
  //           doc.data();
  //         return {
  //           text,
  //           createdAt,
  //           userId,
  //           username,
  //           photo,
  //           id: doc.id,
  //           hashTags,
  //           like,
  //         };
  //       });
  //       // 리덕스 액션을 통해 스토어에 데이터 저장
  //       // dispatch(setPosts(posts));
  //       setBestPosts(bestPost);
  //     });
  //   };

  //   fetchPosts();
  //   return () => {
  //     unsubscribe && unsubscribe();
  //     // 사용자가 타임라인을 보고 있을때만 작동
  //   };
  //   // }, []);
  // }, [dispatch]);

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
      <h2 className="sec-tt wb">Weekly Best</h2>
      <div className="meal-post-wrap best-meal">
        {bestPost.slice(0, 4).map((post, index) => (
          // <div style={{ width: "312px" }} key={index}>
          <div key={index}>
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
      <h2 className="sec-tt">Today’s pick!</h2>
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
