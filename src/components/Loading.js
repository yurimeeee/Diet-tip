import styled, { keyframes } from "styled-components";
import "../styles/common.css";

const spinnerRotateRight = keyframes`
0% {
  transform: rotate(0deg);
}
25% {
  transform: rotate(180deg);
}
50% {
  transform: rotate(180deg);
}
75% {
  transform: rotate(360deg);
}
100% {
  transform: rotate(360deg);
}
`;

const spinnerRotateLeft = keyframes`
0% {
  transform: rotate(0deg);
}
25% {
  transform: rotate(0deg);
}
50% {
  transform: rotate(180deg);
}
75% {
  transform: rotate(180deg);
}
100% {
  transform: rotate(360deg);
}
`;
const webspinnerRotateRight = keyframes`
0% {
  -webkit-transform: rotate(0deg);
}
25% {
  -webkit-transform: rotate(180deg);
}
50% {
  -webkit-transform: rotate(180deg);
}
75% {
  -webkit-transform: rotate(360deg);
}
100% {
  -webkit-transform: rotate(360deg);
}
`;

const webspinnerRotateLeft = keyframes`
0% {
  -webkit-transform: rotate(0deg);
}
25% {
  -webkit-transform: rotate(0deg);
}
50% {
  -webkit-transform: rotate(180deg);
}
75% {
  -webkit-transform: rotate(180deg);
}
100% {
  -webkit-transform: rotate(360deg);
}
`;

const Ouro = styled.div`
  position: relative;
  display: inline-block;
  height: 46px;
  width: 46px;
  margin: 1em;
  border-radius: 50%;
  background: #dddddd;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 25px rgba(0, 0, 255, 0.075);

  &::after {
    content: "";
    position: absolute;
    top: 9px;
    left: 9px;
    display: block;
    height: 28px;
    width: 28px;
    background: #f2f2f2;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  > span {
    position: absolute;
    height: 100%;
    width: 50%;
    overflow: hidden;
  }
`;

const Anim = styled.span`
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: #508ec3;
  opacity: 0.8;
  // animation-duration: 3s;
  // animation-timing-function: linear;
  transform-origin: 0 50% 0;
  // animation-name: ${spinnerRotateLeft};

  -webkit-animation: ${webspinnerRotateLeft} 3s infinite;
  animation: ${spinnerRotateLeft} 3s infinite;

  &.left {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  &.right {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    left: -100%;
    transform-origin: 100% 50% 0;
    animation-name: ${spinnerRotateRight};
    animation-delay: 1.5s;
  }
`;

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
