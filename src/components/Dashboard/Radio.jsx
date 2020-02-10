import React from 'react'
import ReactPlayer from "react-player";

export default function Radio({radio}) {
    return (
        <div className="homeSectionCon radioCon">
              <h3>
                <strong>Radio</strong>
              </h3>
              <div className="radioWrapper">
                {radio.map(post => (
                  <div className="player-wrapper" key={post.id}>
                    <a
                      href={post.directLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <h4>{post.name}</h4>
                    </a>
                    <ReactPlayer
                      url={post.fileURL}
                      playing={false}
                      width="240px"
                      height="50px"
                      controls
                    />
                  </div>
                ))}
              </div>
            </div>
    )
}
