// styles
import React from "react";

export default function BackToTop() {
  return (
    <div className="back__holder">
      <div>
        <div className="fixed__widget">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="top__button"
            type="button"
          >
            <img alt="back-to-top" src="/images/back-to-top.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
