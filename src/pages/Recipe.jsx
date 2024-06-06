import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useFavorites } from "../context/FavoritesContext";
import useSound from "use-sound";
import favoriteSound from "../assets/favorite-sound.mp3";
import unfavoriteSound from "../assets/unfavorite-sound.wav";

function Recipe() {
  const apiKey = import.meta.env.VITE_API_KEY;
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("Add to favorites");
  const [hovered, setHovered] = useState(false);
  const [playSound] = useSound(favoriteSound, {
    volume: 1,
  });
  const [playSoundUnlike] = useSound(unfavoriteSound, {
    volume: 0.5,
  });
  const navigate = useNavigate();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  // after 500ms a tool tip pops out with a message when hovering over the heart
  useEffect(() => {
    if (hovered) {
      const timer = setTimeout(() => setShowTooltip(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [hovered]);

  const handleDishTypeClick = (dishType) => {
    navigate(`/dish-type/${dishType}`);
  };

  const isFavorite = favorites.some((recipe) => recipe.id === details.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      playSoundUnlike();
      removeFavorite(details.id);
      setTooltipText("Add to favorites");
    } else {
      playSound();
      addFavorite(details);
      setTooltipText("Delete from favorites");
    }
  };

  return (
    <DetailWrapper>
      <div className="image-title-div">
        <h2>{details ? details.title : "Loading..."}</h2>
        <img src={details.image} alt="" />
        <br />
        <FavoriteIcon
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <BsHeartFill className="favorites" />
          ) : (
            <BsHeart className="favorites-not-clicked" />
          )}
          {showTooltip && <span className="tooltiptext">{tooltipText}</span>}
        </FavoriteIcon>

        {details.dishTypes && (
          <div className="dish-types">
            {details.dishTypes.map((dishType, idx) => (
              <h3 key={idx} onClick={() => handleDishTypeClick(dishType)}>
                <i>#{dishType}</i>
              </h3>
            ))}
          </div>
        )}

        <div className="stats">
          <h3>Vegan : {details.vegan ? "✔️" : "✖️"}</h3>
          <h3>Vegeterian : {details.vegeterian ? "✔️" : "✖️"}</h3>
          <h3>Very healthy : {details.veryHealthy ? "✔️" : "✖️"}</h3>
          <h3>Popular : {details.veryPopular ? "✔️" : "✖️"}</h3>
        </div>
      </div>
      <Info>
        <div className="buttons">
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </div>

        {activeTab === "instructions" && (
          <div className="instructions-div">
            {/* use this method because in the API the summary is already written with html tags so it transforms it from html to normal text */}
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients &&
              details.extendedIngredients.map((ingredient, indx) => (
                <li key={indx}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img {
    border-radius: 20px;
  }
  .favorites {
    width: 40px;
    height: 50px;
    cursor: pointer;
    color: red;
    margin-top: 20px;
  }

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .favorites:hover {
    transform: scale(0.9);
    background-color: rgb(238, 210, 169);
  }
  .favorites:hover .tooltiptext {
    visibility: visible;
  }
  .favorites-not-clicked {
    width: 40px;
    height: 50px;
    margin-top: 20px;
    cursor: pointer;
  }
  .favorites-not-clicked:hover {
    transform: scale(0.9);
    background-color: rgb(209, 185, 148);
    border-radius: 20%;
  }
  .favorites-not-clicked .tooltiptext {
    visibility: visible;
  }

  .instructions-div {
    min-width: 500px;

    h3 {
      font-size: 20px;
      font-weight: normal;
    }
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  .stats {
    font-size: 18px;
    width: 500px;
    font-family: "Times New Roman", Times, serif;
  }

  .image-title-div {
    margin-left: -150px;
  }

  .buttons {
    display: flex;
  }
  .dish-types {
    max-width: 200px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 20px;
    white-space: nowrap;
    margin-top: 50px;

    h3 {
      background-color: #f03f3f2e;
      font-size: 1rem;
      width: 150px;
      color: white;
      text-align: center;
      cursor: pointer;
      margin-top: -20px;
    }
  }
`;

const FavoriteIcon = styled.div`
  position: relative;
  display: inline-block;
  .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
