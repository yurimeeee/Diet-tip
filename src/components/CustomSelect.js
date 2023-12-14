import React, { useState } from "react";
import Select from "react-select"; //react-select 라이브러리
import styled from "styled-components"; //css-in-js 라이브러리

const CustomSelect = ({ onSelectChange }) => {
  const SelectBox = styled(Select).attrs({
    classNamePrefix: 'react-select',
  })`
    .react-select__control {
      cursor: pointer;
      background: transparent;
      border-radius: 66px;
      border: 1px solid #32a061;
      box-shadow: none;
      // width: 136px;
      // text-align: center;
      &:hover{
        border: 1px solid #32a061;
      }
    }
    .react-select__single-value {
      color: #32a061; /* 텍스트 색상 지정 */
      font-size: 16px;
    }
    .react-select__menu {
      background-color: #f2f3f5;
      border-radius: 10px;
      border: 1px solid #32a061;
      box-shadow: none;
      overflow: hidden;
    }
    .react-select__option {
      background-color: transparent; /* option 배경색 */
      color: black; /* option 텍스트 색상 */
    }
    .react-select__option--is-selected {
      background-color: #32a061; /* 클릭된 option 배경색 */
      color: white; /* click 옵션 텍스트 색상 */
    }
    .react-select__option--is-focused {
      background-color: #94dfb6;
      color: #000; /* hover 옵션 텍스트 색상 */
    }
    .react-select__option:active{
      background-color: #94dfb6;
    }
  `;

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'all', label: '전체' },
    { value: 'review', label: '후기' },
    { value: 'beforeAfter', label: '비포&애프터' },
    { value: 'tip', label: '꿀 TIP' },
    { value: 'etc', label: '기타' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption);
  };
  console.log(selectedOption);

  return(
    <div className="free-select">
      <SelectBox
        value={selectedOption || options[0]} //선택된 옵션이 없을 경우 배열의 첫번째를 기본값으로
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;