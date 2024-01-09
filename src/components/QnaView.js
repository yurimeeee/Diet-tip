import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import icon_q from "../asset/community/icon_q.png"
import icon_a from "../asset/community/icon_a.png"
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";


const QnaView = ({ post, onClose, setAllData }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const levelImg = {
    '1': level_1, 
    '2': level_2, 
    '3': level_3,
  };

  const [ replyText, setReplyText ] = useState('');
  const [ replyCount, setReplyCount ] = useState(0);
  const [ comments, setComments ] = useState([]);
  const replyPath = `community/${post.id}/comments`;

  useEffect(() => {
    // Firebase Authentication 상태 변경을 감지하여 로그인한 사용자 정보 업데이트
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged in user:', user);
      } else {
        console.log('No user logged in');
      }
    });

    if (post && !comments.length) {
      loadComments();
    }

    return () => unsubscribe(); // 컴포넌트 언마운트 시에 이벤트 리스너 해제
  }, [auth, post, comments]);

  const loadComments = async () => {
    //post의 id를 기반으로 댓글을 불러옴
    const commentsQuery = query(
      collection(db, replyPath),
      orderBy('timestamp', 'asc')
    );
    
    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
    setComments(commentsData);

    console.log(commentsData);

    // 댓글이 추가되었을 때 게시글 목록 업데이트
    if (commentsData.length > 0) {
      setAllData((prevAllData) =>
        prevAllData.map((prevPost) => {
          if (prevPost.id === post.id) {
            // 현재 게시글에 해당하는 경우 댓글 수를 업데이트
            return {
              ...prevPost,
              commentsData: commentsData,
            };
          }
          return prevPost;
        })
      );
    };
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    if (replyText === "") return;

    // 현재 post에 댓글을 추가
    const commentData = {
      postId: post.id,
      text: replyText,
      userId: user.displayName,
      timestamp: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, replyPath), commentData);
      console.log(docRef.id);

      loadComments(); //댓글 추가 후 다시 댓글 불러오기
      setReplyText(''); //댓글 입력란 초기화
      setReplyCount(0);
    } catch (e) {
      console.error('Error adding comment: ', e);
    }
  };

  if (!post) {
    return null; //post가 없으면 QnaView를 보여주지 않음
  }

  console.log(post);

  return(
    <div className="container">
      <button className="w-green-btn mg-t3" onClick={onClose}>목록</button>

      <div className="q-card mg-t1 mb-shadow lg-radius df">
        <img src={icon_q} alt=""/>
        <div className="df q-content">
          <p className="q-tt tt5 bold">{post.title}</p>
          <div className="q-info df">
            <span>{post.date}</span>
            <span className="point-1">{post.category}</span>
            <span>
              {post.userLevel && (
                <>
                  <img 
                    src={levelImg[post.userLevel]}
                    alt={`Level ${post.userLevel}`}
                    className="level-img"
                  />
                  {post.userId}
                </>
              )}
            </span>
          </div>
          <p>{post.content}</p>
        </div>
      </div>

      <form action="" className="reply-form mg-t1 sm" onSubmit={handleReplySubmit}>
        <div>
          <label htmlFor="reply" className="hidden">댓글 작성</label>
          <TextareaAutosize
            id="reply" 
            className="mb-shadow lg-radius"
            placeholder="답변을 작성해보세요!"
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value); 
              setReplyCount(e.target.value.length); 
            }}
            rows={1}
            maxLength="1000"
            cacheMeasurements
          />
          <button type="submit"><FontAwesomeIcon icon={faReply} className="point-1" /></button>
        </div>
        <p>
          <span>{replyCount}</span>
          <span>/1000 자</span>
        </p>
      </form>

      <div className="df a-frame">
        <div className="a-box mg-t2 df">
          <div className="df a-tt">
            <img src={icon_a} alt=""/>
            <p className="tt5 bold">{comments.length} 개</p>
          </div>
          {comments.map((comment, index) => (
            <div key={index} className="a-card lg-radius df sm-shadow">
              <img src={icon_a} alt="" />
              <div style={{ width:'100%' }}>
                <p style={{ whiteSpace: 'pre-line' }}>{comment.text}</p>
                <div className="df jcsb aic mg-t1">
                  <p>{comment.userId}</p>
                  <button type="button" className="m-red-btn">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 

export default QnaView;
