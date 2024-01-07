import React, { useEffect, useState } from "react";
const { Kakao } = window;

const ShareBtn = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if(window.Kakao){
        window.Kakao.init(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
        setInit(true);
        console.log(init);
      }
  });

  //카카오톡 공유하기
  const shareMessage = () => {
    console.log(init);
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "다이어팁 관리 레벨",
        description: "친구의 관리 레벨을 확인하고 나도 테스트 해보자!",
        imageUrl: fscore,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
    });
  };

  return(
    <button
      type="button"
      className="w-green-btn"
      id="kakaotalk-sharing-btn"
      onClick={shareMessage}
    >
      카카오톡 공유하기
  </button>
  )

}

export default ShareBtn;