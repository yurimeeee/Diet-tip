import React, { useEffect, useState } from "react";
import "../styles/health.css";
import testImg from "../asset/health/testImg.png";


const HealthBanner = () => {
	return(
		<div className="container">
			<div className="bannerWrap">
				<div className="bannerTitle">
					<ul>
							<li>#스트레칭요가</li>
							<li>#누워서하는스트레칭</li>
							<li>#누워서하는요가</li>
					</ul>
					<h1>오늘의 잠깐 스트레칭</h1>
					<h3>누워서 하는 15분 스트레칭 | 전신스트레칭 요가, 누워서 하는 운동</h3>
				</div>
				<div className="bannerImg">
					<img src={testImg} alt="내 이미지" className="banner-img md-radius" />
				</div>
			</div>
		</div>
	)
}

export default HealthBanner;