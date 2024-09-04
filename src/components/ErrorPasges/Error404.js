import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div className="body" style={{height:"100vh"}}>
      <>
        <div class="mainbox">
          <div class="err">4</div>
          <i class="far bi bi-question-circle-fill fa-spin"></i>
          <div class="err2">4</div>
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

export default Error404;
