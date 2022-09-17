import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Searched() {
  const [Searched, setSearched] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const check = localStorage.getItem(name);
    if (check) {
      setSearched(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=1fcd5dd030c44e8ca35cdda2c9f7a49d&number=9&cuisine=${name}`
      );
      const recipes = await data.json();
      localStorage.setItem(name, JSON.stringify(recipes.results));
      setSearched(recipes.results);
    }
  };

  useEffect(() => {
    getSearched(params.name);
  }, [params.search]);

  return (
    <Grid>
      {Searched.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/"+item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
