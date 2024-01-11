import styled, { keyframes } from "styled-components";
import "../styles/common.css";

const Loading = () => {
  return (
    <div className="loading">
      <span className="ouro ouro3">
        <span className="left">
          <span className="anim"></span>
        </span>
        <span className="right">
          <span className="anim"></span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
