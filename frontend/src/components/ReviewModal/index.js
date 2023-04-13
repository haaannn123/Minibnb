import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function ReviewModal() {
  return (
    <>
      <h1>How was your stay?</h1>
      <textarea placeholder="Leave your review here..."></textarea>
      <div>
        <div className="">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div>
          <span className="material-symbols-outlined">star</span>
        </div>
        <div>
          <span className="material-symbols-outlined">star</span>
        </div>
        <div>
          <span className="material-symbols-outlined">star</span>
        </div>
        <div>
          <span className="material-symbols-outlined">star</span>
        </div>
      </div>
      <button>Submit Your Review</button>
    </>
  );
}

export default ReviewModal;
