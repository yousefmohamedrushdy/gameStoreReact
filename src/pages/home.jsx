import styles from "../css/home.module.css";
import { GamesContext } from "../context/GamesContext.jsx";
import { useContext } from "react";
import Loader from "../components/loader.jsx";
import Alert from "react-bootstrap/Alert";
import GameSlider from "../components/gameSlider.jsx";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";

function home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { Games, loading, error } = useContext(GamesContext);
  if (loading) return <Loader />;
  if (error) return <Alert variant="danger"> Error: {error}</Alert>;
  return (
    <section id="home" className={styles.home}>
      <div className="container-fluid page-container">
        <div className="row mb-5 mt-5">
          <GameSlider Games={Games} />
        </div>
        <div className="row ">
          <div className="col-lg-6">
            <h2 className={styles.sectionTitle}>Games on promotion</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <div>
              <Link to="/categories" className={styles.viewMore}>
                view more games <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {Games.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default home;
