import React from "react";
import badSticker from '../asset/bad-sticker.png';
import goodsticker from '../asset/good-sticker.png';

const Today = () => {
  return(
    <main className="Today">
      <div className='today'>
        <h5>오늘의</h5>
        <div className='today-cards'>
          <div className='today-card lg-radius'>
            <h6>식단</h6>
            <img src={badSticker} alt='today meal sticker' className='sticker'/>
          </div>
          <div className='today-card lg-radius'>
            <h6>운동</h6>
            <img src={goodsticker} alt='today meal sticker' className='sticker'/>
          </div>
        </div>
      </div>
    </main>
  )
};

export default Today;