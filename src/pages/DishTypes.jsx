import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function DishTypes() {
  const [dishType, setDishType] = useState([]);
  let params = useParams(); // let's us take the type in the url
  const [typeOfDish, setTypeOfDish] = useState("");

  const getDishType = async (type) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    //  Because the API databse is way too big I don't wanna fetch every single recipe that has a certaine typeOfDish
    //  i do it on only 100 random recipes
    const data = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=100`
    );
    const recipes = await data.json();
    const filteredRecipes = recipes.recipes.filter((recipe) =>
      recipe.dishTypes.includes(type)
    );
    setDishType(filteredRecipes);
    setTypeOfDish(type);
  };

  useEffect(() => {
    getDishType(params.type);
  }, [params]);

  return (
    <div>
      <h2 className="title-typeDish">#{typeOfDish}</h2>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {dishType.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    height: 15rem;
    object-fit: fill;
    border-radius: 2rem;
    transition: transform 0.3s ease;
  }
  img:hover {
    transform: scale(1.05);
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default DishTypes;
