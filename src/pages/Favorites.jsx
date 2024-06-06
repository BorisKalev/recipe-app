import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <Title>
        <h1>
          {favorites.length > 0
            ? "Favorite(s)"
            : "There is no favorites yet ... "}
        </h1>
      </Title>

      <FavoritesList>
        {favorites.map((recipe) => (
          <FavoriteItem key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </FavoriteItem>
        ))}
      </FavoritesList>
    </>
  );
}

const Title = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FavoriteItem = styled.div`
  width: 200px;
  img {
    width: 100%;
    border-radius: 15px;
  }
  h4 {
    text-align: center;
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`;

export default Favorites;
