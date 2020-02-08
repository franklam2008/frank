import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination.jsx";
import PokemonList from "./PokemonList.jsx";
import { Spinner } from "react-bootstrap";

import pokeBallIcon from "../assets/img/pokeBallIcon.png";

import "./css/pokemon.css";
export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(res => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        res.data.results.forEach(x => {
          // eslint-disable-next-line no-sequences
          x.id = x.url.split("/")[x.url.split("/").length - 2];
          x.imageUrlMin =
            "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/" +
            x.id +
            ".png?raw=true";
          x.imageUrlClear =
            "https://pokeres.bastionbot.org/images/pokemon/" + x.id + ".png";
        });
        setPokemon(res.data.results);
        // console.log(res.data.results);
        
      });
    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  return (
    <section className="pokemonCon">
      <div className="mainTitle">
        <img src={pokeBallIcon} alt="movie" />
        Pokemon
      </div>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      ></Pagination>
      {loading ? (
        <div className="loadingScreen">
          <Spinner size="lg " className="" animation="border" />
          <p>Loading...</p>
        </div>
      ) : (
        <PokemonList pokemon={pokemon}></PokemonList>
      )}
      
    </section>
  );

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
}
