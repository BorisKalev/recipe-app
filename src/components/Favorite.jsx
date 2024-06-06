// src/components/Favorite.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Favorite() {
  return (
    <>
      <FavoriteButton to="/favorites">
        <span role="img" aria-label="heart" className="heart-icon">
          ❤️
        </span>
        Favorites
      </FavoriteButton>
    </>
  );
}

const FavoriteButton = styled(Link)`
  display: flex;
  text-align: right;
  text-decoration: none;
  font-size: 1rem;
  color: hsl(0, 0%, 0%);
  background: linear-gradient(to right, #880505, #ff487f);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-left: 1rem;
  &:hover {
    background: #ff2b2b;
    color: white;
  }

  .heart-icon {
    padding-right: 5px;
  }
`;

export default Favorite;
