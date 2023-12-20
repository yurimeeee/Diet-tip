import React,{useState} from "react";
import bannerImg from "../asset/health/bannerImg.png"
import { auth } from "../firebase";

function HealthBanner2({ onModeChange }) {
	
		const writingMode = () => {
			//로그인 유무 확인
			if (auth.currentUser) {
				setIsWritingMode(true);
				// isWritingMode 값이 변경되었음을 부모 컴포넌트에 알림
				onModeChange(true);
			} else {
				alert("로그인이 필요합니다!");
			}
		};
	const [isWritingMode, setIsWritingMode] = useState(false);

	return(
		<div className="bannerWrap">
			<div className="bannerTitle">
				<ul>
						<li><span>#오운완</span></li>
						<li><span>#꾸준히운동실천</span></li>
						<li><span>#달라진내모습</span></li>
				</ul>
				<div className="bannerMainTitle">
					<h1>오늘도 <p>운동</p> 완성</h1>
				</div>
				<div className="bannerSubTitle">
					<h3>오늘도 빠짐없이 실천한 나와의 운동 약속!</h3>
					<h3>매일 운동 사진 공유하고 달라진 내 모습을 자랑하세요.</h3>
				</div>
				<button type="button" className="youtubeBtn w-green-btn"
				onClick={writingMode}>오늘의 식단 인증하기</button>
			</div>
			<div className="bannerImg">
				<img id="test" src={bannerImg} alt="" />
			</div>
		</div>		
	)
}

export default HealthBanner2;