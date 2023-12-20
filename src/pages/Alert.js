import React from "react";
import avatasmall1 from "../asset/user/avatar-yr-small.png";
import postIcon from "../asset/post-icon.png";

const Alert = () => {
  return (
    <main className="Alert container">
      {/* <h5 className="maintt">알림</h5> */}
      <section>
        <h5>내 게시글에 좋아요</h5>
        <div className="alert-board">
          <div className="alert like">
            <p>
              <img
                className="profile-img"
                src={avatasmall1}
                alt="profile img"
              ></img>
              <span>yurimeee 님이 내 게시글에 좋아요를 눌렀습니다.</span>
            </p>
            <img className="post-img" src={postIcon} alt="post img"></img>
          </div>
        </div>
      </section>
      <section>
        <h5>내 게시글에 댓글</h5>
        <div className="alert-board">
          <div className="alert reply">
            <p>
              <img
                className="profile-img"
                src={avatasmall1}
                alt="profile img"
              ></img>
              <span>yurimeee 님이 내 게시글에 댓글을 남겼습니다.</span>
            </p>
            <img className="post-img" src={postIcon} alt="post img"></img>
            <p className="reply-text">
              저도 이 방법으로 한번 해봐야겠어요 알려주셔서 감사합니다 ㅎㅎ!
            </p>
          </div>
        </div>
      </section>
      <section>
        <h5>내 댓글에 대댓글</h5>
        <div className="alert-board">
          <div className="alert rereply">
            <p>
              <img
                className="profile-img"
                src={avatasmall1}
                alt="profile img"
              ></img>
              <span>yurimeee 님이 내 댓글에 대댓글을 달았습니다.</span>
            </p>
            <p className="reply-text">
              저도 이 방법으로 한번 해봐야겠어요 알려주셔서 감사합니다 ㅎㅎ!
            </p>
          </div>
        </div>
      </section>
      <section>
        <h5>신고 처리</h5>
        <div className="alert-board">
          <p>신고하신 1건이 처리중입니다.</p>
          <div className="alert report">
            <p>다이어트 쉐이크 중에 제일 성분 좋은</p>
            <div className="badges">
              <span className="w-badge"># 광고의심</span>
              <span className="w-badge">···</span>
            </div>
          </div>
          <div className="progress">
            <p>
              <span className="w-badge">···</span>
              <span>처리중</span>
            </p>
            <p>
              <span className="w-badge green">O</span>
              <span>처리완료(삭제 또는 경고조치)</span>
            </p>
            <p>
              <span className="w-badge red">X</span>
              <span>기각</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Alert;
