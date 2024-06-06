import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    navigate("/searched/" + input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }
  };

  const handleOnClick = (e) => {
    submitHandler(e);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div className="input-wrapper">
        <FaSearch onClick={handleOnClick} className="search-icon" />
        <input
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 430px;
    margin-right: 40px;
  }

  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
  }

  .search-icon {
    position: absolute;
    left: 15px;
    color: white;
    cursor: pointer;
  }
`;

export default Search;
