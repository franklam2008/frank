import React from "react";

export default function Radio({ radio }) {
  return (
    <div className="homeSectionCon radioCon">
      <h3 className="colorHeader">
        <strong>Radio</strong>
      </h3>
      <div className="radioWrapper">
        {radio.map(post => (
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
                // src='https://firebasestorage.googleapis.com/v0/b/frank-app-58b31.appspot.com/o/radio%2F0211.mp3?alt=media&token=aef23cde-9ec3-4782-b317-55eea621f715'
                src={post.fileURL}
                
              />
            </audio>
            
          </div>
        ))}
      </div>
    </div>
  );
  
}
