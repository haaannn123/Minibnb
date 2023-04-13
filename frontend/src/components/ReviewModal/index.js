import './ReviewModal.css'

function ReviewModal({spotId}) {
;
  return (
    <>
    <div className="review-modal-container">
      <h1>How was your stay?</h1>
      <textarea placeholder="Leave your review here..." className="textarea-review"></textarea>
      <div className="star-rating">
        <div onMouseEnter="">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div onMouseenter="">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div onMouseEnter="">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div onMouseEnter="">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div onMouseEnter="">
          <span className="material-symbols-outlined">star</span>
        </div>
      </div>
      <button className="submit-review-button">Submit Your Review</button>
      </div>
    </>
  );
}

export default ReviewModal;
