import "./App.css";
import Pages from "./pages/Pages";
import Categories from "./components/Categories";
import { BrowserRouter, useLocation } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import Favorite from "./components/Favorite";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { FavoritesProvider } from "./context/FavoritesContext";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <FavoritesProvider>
        <BrowserRouter>
          <Nav>
            <LeftContainer>
              <Link to={"/"}>
                <GiKnifeFork />
              </Link>
              <Logo to={"/"}>Goods</Logo>
            </LeftContainer>
            <Favorite />
          </Nav>
          <ContentWrapper>
            <ShowOrDoNotShowCategoriesAndSearchBar />
            <Pages />
          </ContentWrapper>
          <ShowOrDoNotShowFooter />
        </BrowserRouter>
      </FavoritesProvider>
    </>
  );
}

//because it throws an error that useLocation has to be wrapped in a <Route> when I do this : {showSearchAndCategories && <Search />}
//and seen this on stackOverflow and worked
const ShowOrDoNotShowCategoriesAndSearchBar = () => {
  //Basically here I use the useLocation to know if I am in the favorites component, because
  //I do not want to render the search bar and the categories in it.
  const location = useLocation();

  const showSearchAndCategories = location.pathname !== "/favorites";

  return (
    <>
      {showSearchAndCategories && <Search />}
      {showSearchAndCategories && <Categories />}
    </>
  );
};

const ShowOrDoNotShowFooter = () => {
  const location = useLocation();
  const showFooter = location.pathname === "/";

  return <>{showFooter && <Footer />}</>;
};

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  margin: 0 10%;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 2rem;
  }

  &:hover {
    svg {
      color: white;
    }

    ${Logo} {
      color: white;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 0 20%;
  padding-bottom: 20px; /* Ensure there's space for the footer */
`;

const FooterWrapper = styled.div``;

export default App;
