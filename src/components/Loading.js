import styled, { keyframes } from "styled-components";
import "../styles/common.css";

const Loading = () => {
  return (
    <div className="loading">
      <span class="ouro ouro3">
        <span class="left">
          <span class="anim"></span>
        </span>
        <span class="right">
          <span class="anim"></span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
