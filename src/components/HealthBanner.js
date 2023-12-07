import React, { useEffect, useState } from "react";
import testImg from "../asset/health/testImg.png";

const HealthBanner = () => {
	return(
		<div className="container">
			<div className="bannerWrap">
				<div className="bannerTitle">
					<ul>
							<li><span>#스트레칭요가</span></li>
							<li><span>#누워서하는스트레칭</span></li>
							<li><span>#누워서하는요가</span></li>
					</ul>
					<div className="bannerMainTitle">
						<h1>오늘의 <p>잠깐</p> 스트레칭</h1>
					</div>
					<div className="bannerSubTitle">
						<h3>누워서 하는 15분 스트레칭 | 전신스트레칭 요가, 누워서 하는 운동</h3>
						<p>누워서 쉽게 할 수 있는 15분 스트레칭 요가입니다. 매트 없이 침대에서 따라하셔도 괜찮습니다. 누운 자세에서 전신을 가볍게 풀어 ...</p>
					</div>
					<button type="button" className="youtubeBtn w-green-btn">유튜브 보러가기</button>
				</div>
				<div className="bannerImg">
					<img src={testImg} alt="내 이미지" className="banner-img md-radius" />
				</div>
			</div>		
		</div>
	)
}

export default HealthBanner;