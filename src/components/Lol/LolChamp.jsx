import React from 'react'

export default function LolChamp({champ}) {
    return (
        <div className="lolChamp" >
            
            <p>{champ.id}</p>
            <p>{champ.title}</p>
            <p>{champ.name}</p>
            <p>{champ.blurb}</p>
        </div>
    )
}
