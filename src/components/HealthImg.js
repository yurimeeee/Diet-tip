import React, { useState, useEffect } from "react";
import "../styles/health.css";
import Healthmodal from "../components/HealthModal";
import profileImg from "../asset/user/avatar-yr.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { auth, db, storage } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  docRef,
  deleteField,
} from "firebase/firestore";

function HealthImg(){

  const [modal,setModal] = useState(false);
  const [modalItem,setModalItem] = useState();
  const [photos,setPhotos] = useState([]);
  const [like,setLike] = useState(0);

  // firebase 데이터 연동
  useEffect(() => {
    const fetchData = async () => {
      const health = await getDocs(
        collection(db, `health`)
      );
      const data = health.docs.map((doc) => (
        doc.data()
      ));
      setPhotos(data)
    };
    fetchData();
  },[]);


  return(
    <div className="grid">
      {photos.map((item, index) => (
        <>
        <div className="grid-item" 
          onClick={()=>{
            setModal(true)
            setModalItem(item)
          }}
          key={index}>
          <img src={item.photo} />
          <div className="grid-text df jcsb">
            <div className="text df">
              <div>
                <img src={profileImg}/>
              </div>
              <div>
                <p>{item.username}</p>
              </div>
            </div>
            <div className="text df">
              <h2 onClick={() => { setLike(like + 1); }}><FontAwesomeIcon icon={regularHeart}/></h2>
              <p>{item.like}</p>
            </div>
          </div>
        </div>   
        {modal === true ? 
        <Healthmodal 
          parentSetModal={setModal} 
          data={modalItem}
        />:null}
        </>
      ))}
    </div>
  )
  
}

export default HealthImg;