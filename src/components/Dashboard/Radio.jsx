import React from "react";

export default function Radio({ radio }) {
  return (
    <div className="homeSectionCon radioCon">
      <h3 className="colorHeader">
        <strong>Radio</strong>
      </h3>
      <div className="radioWrapper">
        {/* {radio.map(post => (
          <div className="player-wrapper" key={post.id}>
            <h3 className="colorHeader">
              <span>
                <a
                  href={post.directLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {post.name}
                </a>
              </span>
            </h3>
            
            <audio id={post.id} className="audio" controls="controls">
              <source
                type="audio/mpeg"
                src={post.fileURL}
              />
            </audio>
            
          </div>
        ))} */}
      </div>
    </div>
  );
  
}
