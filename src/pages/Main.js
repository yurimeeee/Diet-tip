import React, { useEffect, useState } from "react";
import '../styles/main.css';
import Banner from "../components/Banner";
import Today from "../components/Today";
import mealImg from "../asset/meal/meal.png";
import likeImg from "../asset/like.png";
import likeImgDark from "../asset/like-icon-dark.png";
import replyIcon from "../asset/reply-icon.png";
import likefillImg from "../asset/like-fill.png";
import profile from "../asset/profile-icon.png";
import Exercise from "../components/Exercise";
import Healthmodal from "../components/HealthModal";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { yesLogin, noLogin } from "../store/loginSlice";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import freeBoard_data from "../data/freeBoard_data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";

const OnlyImg = () => {
  const [posts, setPosts] = useState([]);
  console.log("OnlyImg", posts);
  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      const mealQuery = query(
        collection(db, "meal"),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      unsubscribe = await onSnapshot(mealQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { photo } = doc.data();
          return {
            photo,
            id: doc.id,
          };
        });
        setPosts(posts); // 상태 업데이트
        console.log(posts);
      });
    };
    fetchPosts();
  }, []);
  console.log(posts, "post");

  return (
    <div className="hot-board-main img-ver" data-type="onlyimg">
      <div className="img-container">
        {posts.map((item) => (
          <div key={item.id}>
            <img alt="hot meal" src={item.photo} className="board-img"></img>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImgText = () => {
  return (
    <div className="hot-board-main text-ver" data-type="imgtext">
      <div className="text-card">
        <img className="text-card-img" alt="hot board img" src={mealImg}></img>
        <div className="text-card-text">
          <div className="text-card-title">
            <p>청사과 반쪽 썰어서 아침으로 먹었어요</p>
          </div>
          <div className="profile">
            <p className="profile-content">
              <img
                src={profile}
                className="profile-icon"
                alt="profile icon"
              ></img>
              eeuns_diary
            </p>
            <div>
              <p className="profile-content">
                <img
                  src={likeImgDark}
                  className="like-icon"
                  alt="like icon"
                ></img>
                6
              </p>
              <p className="profile-content">
                <img
                  src={replyIcon}
                  className="reply-icon"
                  alt="reply icon"
                ></img>
                6
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthImgText = () => {

  const [photos,setPhotos] = useState([]);
  const [modal,setModal] = useState(false);
  const [modalItem,setModalItem] = useState();

  // firebase 데이터 연동
  useEffect(() => {
    const fetchData = async () => {
      const health = await getDocs(
        collection(db, `health`)
      );
      const data = health.docs.map((doc) => (
        doc.data()
      ));
      setPhotos(data)
    };
    fetchData();
  },[]);

  return(
    <div className="hot-board-main text-ver df" data-type="HealthImgText">
      {photos.slice(0,2).map((item)=>(
        <>
        <div className="text-card"
           onClick={()=>{
            setModal(true)
            setModalItem(item)
          }}>
          <img className="text-card-img" alt="hot board img" src={item.photo}></img>
          <div className="text-card-text">
            <div className="text-card-title">
              <p>{item.text}</p>
            </div>
            <div className="profile">
              <p className="profile-content"><img src={profile} className="profile-icon" alt="profile icon"></img>{item.username}</p>
              <div>
                <p className="profile-content"><img src={likeImgDark} className="like-icon" alt="like icon"></img>{item.like}</p>
              </div>
            </div> 
          </div>
        </div>
        {modal === true ? 
          <Healthmodal 
            parentSetModal={setModal}
            data={modalItem}
          />:null}
        </>
      ))}
    </div>
  )
}

const OnlyText = () => {
  return (
    <div className="hot-board-main text-ver no-img" data-type="onlytext">
      <div className="text-card">
        <div className="text-card-text">
          <div className="text-card-title">
            <p>청사과 반쪽 썰어서 아침으로 먹었어요</p>
          </div>
          <div className="profile">
            <p className="profile-content">
              <img
                src={profile}
                className="profile-icon"
                alt="profile icon"
              ></img>
              eeuns_diary
            </p>
            <div>
              <p className="profile-content">
                <img
                  src={likeImgDark}
                  className="like-icon"
                  alt="like icon"
                ></img>
                6
              </p>
              <p className="profile-content">
                <img
                  src={replyIcon}
                  className="reply-icon"
                  alt="reply icon"
                ></img>
                6
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//자유게시판
const FreeBoard = ({freeBoardList}) => {
  return(
    <div className="hot-board-main text-ver no-img" data-type="onlytext">
      {freeBoardList.map((item, index) => (
        <div className="text-card" key={index}>
          <div className="text-card-text">
            <div className="text-card-title df">
              <p className="point-2">{item.category}</p>
              <p>{item.title}</p>
            </div>
            <div className="profile">
              <p className="profile-content">
                <img src={profile} className="profile-icon" alt="profile icon"></img>
                {item.userId}
              </p>
              <div>
                <p className="profile-content">
                  <FontAwesomeIcon icon={faThumbsUp} className="like-icon gray-3" />
                  {item.thumbsUp}
                </p>
                <p className="profile-content">
                  <FontAwesomeIcon icon={faEye} className="like-icon gray-3" />
                  {item.view}
                </p>
              </div>
            </div> 
          </div>
        </div>
      ))}
    </div>
  )
}

//Q&A
const QnA = ({qnaBoardList}) => {

  function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}

  const originalString = "This is a long string that needs to be truncated.";
  const maxLength = 10;

  const truncatedString = truncateString(originalString, maxLength);
  console.log(truncatedString);
  return(
    <div className="hot-board-main text-ver no-img" data-type="onlytext">
      {qnaBoardList.map((item, index) => (
        <div className="text-card" key={index}>
          {/* <Link to={`/qnaboard/${item.id}`} style={{ color: 'black' }}> */}
            <div className="text-card-text">
              <div className="text-card-title df">
                <p className="point-2">{item.category}</p>
                <p>Q. {item.title}</p>
              </div>
              <div className="profile">
                <p className="profile-content">
                  <img src={profile} className="profile-icon" alt="profile icon"></img>
                  {item.userId}
                </p>
                <div>
                  <p className="profile-content">
                    <FontAwesomeIcon icon={faThumbsUp} className="like-icon gray-3" />
                    {item.thumbsUp}
                  </p>
                  <p className="profile-content">
                    <FontAwesomeIcon icon={faEye} className="like-icon gray-3" />
                    {item.view}
                  </p>
                </div>
              </div> 
            </div>
          {/* </Link> */}
        </div>
      ))}
    </div>
  )
}

const Main = () => {

  //자유게시판
  const [ freeBoardList, setFreeBoardList ] = useState([]);
  const FbFetchData = () => {
    const fbData = freeBoard_data.slice(0, 6);
    setFreeBoardList(fbData);
  };
  useEffect(() => {
    FbFetchData();
  }, []);

  //Q&A
  const [ qnaBoardList, setQnaBoardList ] = useState([]);
  const QnaFetchData = async () => {
    try {
      const qnaQuery = query(collection(db, "community"), orderBy("date", "desc"), limit(6));
      const qnaQuerySnapshot = await getDocs(qnaQuery);
      const qnaData = qnaQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        userId: doc.data().userId,
        thumbsUp: doc.data().thumbsUp,
        view: doc.data().view,
      }));
      setQnaBoardList(qnaData);
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
    }
  };
  useEffect(() => {
    QnaFetchData();
  }, []);
  const [boardtype, setBoardType] = useState("onlyimg");

  const setType = (e) => {
    setBoardType(e.currentTarget.getAttribute("data-type"));
    console.log(boardtype);
  };

  let content;
  const renderContent = (boardtype) => {
    switch (boardtype) {
      case "onlyimg":
        content = <OnlyImg />;
        break;
      case "imgtext":
        content = <ImgText />;
        break;
      case "onlytext":
        content = <OnlyText />;
        break;
      case 'FreeBoard':
        content = <FreeBoard />;
        break;
      case 'QnA':
        content = <QnA />;
        break;
      default:
        content = <OnlyImg />;
    }
  };

  return(
    <main className="Main container">
      <Banner />
      <Today />
      <section className="hot-board">
        <h5>HOT한 다이어팁! 인기 게시물</h5>
        <div className="hot-board-buttons">
          <button className="w-green-btn" type="button" data-type="onlyimg" onClick={setType}>식단공유</button>
          <button className="w-green-btn" type="button" data-type="imgtext" onClick={setType}>추천제품</button>
          <button className="w-green-btn" type="button" data-type="HealthImgText" onClick={setType}>운동인증</button>
          <button className="w-green-btn" type="button" data-type="FreeBoard" onClick={setType}>자유게시판</button>
          <button className="w-green-btn" type="button" data-type="QnA" onClick={setType}>Q&A</button>
        </div>
        {boardtype === 'onlyimg' && <OnlyImg/>}
        {boardtype === 'imgtext' && <ImgText/>}
        {boardtype === 'HealthImgText' && <HealthImgText/>}
        {boardtype === 'onlytext' && <OnlyText/>}
        {boardtype === 'FreeBoard' && <FreeBoard freeBoardList={freeBoardList} />}
        {boardtype === 'QnA' && <QnA qnaBoardList={qnaBoardList} />}
      </section>
      <Exercise/>
    </main>
  );
};

export default Main;
