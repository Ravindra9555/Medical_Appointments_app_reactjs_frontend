import React from "react";

const Error500 = () => {
  return (
    <div className="body" style={{height:"100vh"}}>
    <>
      <div class="mainbox">
        <div class="err">5</div>
        <i class="far bi bi-question-circle-fill fa-spin"></i>
        <div class="err2">0</div>
        <div class="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine?
          Never existed in the first place?
          <p>
            Let's go <Link to="/">home</Link> and try from there.
          </p>
        </div>
      </div>
    </>
  </div>
  );
};

export default Error500;
