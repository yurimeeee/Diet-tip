import React from "react";
import GoogleLogin from "../components/GoogleLogin";
import { Link } from 'react-router-dom';

const Login = () => {
  
  return(
    <main className="Login">
      <form>
        <label htmlFor="user-email">email</label>
        <input type="email" placeholder="email(xxx@xxx.com)" id="user-email" required></input>
        <label htmlFor="user-pw">password</label>
        <input type="password" placeholder="password" id="user-pw" required></input>
        <button type="button" className="w-green-btn">로그인</button>
      </form>
      {<GoogleLogin/>}
      <div className="already">
        <p>아직 다이어팁 계정이 없다면?</p>
        <button className="w-green-btn" type="button"><Link to="/signin" className="login-btn">회원가입 하기</Link></button>
      </div>
    </main>
  )
};

export default Login;