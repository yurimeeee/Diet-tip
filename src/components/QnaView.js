import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from "@fortawesome/free-solid-svg-icons";
import icon_q from "../asset/community/icon_q.png"
import icon_a from "../asset/community/icon_a.png"
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";

const auth = getAuth();

const QnaView = ({ post, onClose }) => {
  const levelImg = {
    '1': level_1, 
    '2': level_2, 
    '3': level_3,
  };

  const [ replyText, setReplyText ] = useState('');
  const [ comments, setComments ] = useState([]);
  const replyPath = `community/${post.id}/comments`;

  useEffect(() => {
    // Firebase Authentication 상태 변경을 감지하여 로그인한 사용자 정보 업데이트
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged in user:', user);
        // 여기에서 user 객체를 이용하여 로그인한 사용자의 정보를 활용할 수 있습니다.
      } else {
        console.log('No user logged in');
      }
    });

    if (post) {
      loadComments();
    }

    // 컴포넌트 언마운트 시에 이벤트 리스너 해제
    return () => unsubscribe();
  }, [auth, post]);

  const loadComments = async () => {
    //post의 id를 기반으로 댓글을 불러옴
    const commentsQuery = query(
      collection(db, replyPath),
      // where('postId', '==', post.id),
      orderBy('timestamp', 'asc')
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
    setComments(commentsData);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    // 현재 post에 댓글을 추가
    const commentData = {
      postId: post.id,
      text: replyText,
      userId: auth.currentUser ? auth.currentUser.displayName : 'USER_ID', // 사용자 ID를 가져오거나 기본 값 사용
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, replyPath), commentData);
      console.log('Comment written with ID: ', docRef.id);

      // 댓글 추가 후 다시 댓글 불러오기
      loadComments();

      // 댓글 입력란 초기화
      setReplyText('');
    } catch (e) {
      console.error('Error adding comment: ', e);
    }
  };

  if (!post) {
    return null; // post가 없으면 QnaView를 보여주지 않음
  }

  return(
    <div className="container">
      <button className="w-green-btn mg-t3" onClick={onClose}>목록</button>

      <div className="q-card mg-t1 mb-shadow lg-radius df">
        <img src={icon_q} alt=""/>
        <div className="df q-content">
          <p className="q-tt tt5 bold">{post.title}</p>
          <div className="q-info df">
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
            <span>{post.date}</span>
          </div>
          <p>{post.content}</p>
        </div>
      </div>

      <form action="" className="mg-t1 reply-form" onSubmit={handleReplySubmit}>
        <label htmlFor="reply" className="hidden">댓글 작성</label>
        {/* <textarea  type="text" id="reply" className="mb-shadow" placeholder="답변을 작성해보세요!"></textarea> */}
        <input 
          type="text" 
          id="reply" 
          className="mb-shadow" 
          placeholder="답변을 작성해보세요!"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button type="submit"><FontAwesomeIcon icon={faReply} className="mg-r1 point-1" /></button>
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
              <div>
                <p>{comment.text}</p>
                <p className="mg-t1">{comment.userId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 

export default QnaView;
