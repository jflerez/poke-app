import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import NavBar from "../components/Navbar";

import "react-toastify/dist/ReactToastify.min.css";
import "./pokemon.css";
import "./home.css";

type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const [pokemons, setPokemons] = useState([]);

  const handleClick = (pokemonId: number) => {
    // Lógica de manejo del evento de clic con parámetros
    setFavoritePokemons(pokemonId);
  };

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const getPokemons = () => {
    axios
      .get("https://poke-api-production-1759.up.railway.app/api/pokemon")
      .then(function (response) {
        console.log("response pokemon: ", response);
        setPokemons(response.data);

        if (!response.data.success) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })

      .catch(function (error) {
        console.log("error in get pokemons: ", error.response.status);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        if (error?.response?.status === 401) {
          logout();
        }
      });
  };

  const setFavoritePokemons = (pokemonId: number) => {
    const token = localStorage.getItem("auth");
    let params = {
      pokemonId,
    };
    axios
      .post(
        "https://poke-api-production-1759.up.railway.app/api/user/favorites",
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("response pokemon: ", response);

        if (!response.data.success) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })

      .catch(function (error) {
        console.log("error in get pokemons: ", error.response.status);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        if (error?.response?.status === 401) {
          logout();
        }
      });
  };

  useEffect(() => {
    getPokemons();
    return () => {
      console.log("El componente se ha desmontado");
    };
  }, []);

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h3 className="m-3">Pokemons</h3>
        </div>
        <div>
          <button type="submit" className="buttons" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="container">
        <section>
          <div className="container">
            <div className="row">
              {pokemons.map((pokemon, index) => (
                <div key={index} className="col-md-3">
                  <div className="card profile-card-1">
                    <img
                      src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb"
                      alt="profile-sample1"
                      className="background"
                    />
                    <img
                      src={pokemon["image"]}
                      alt="profile-image"
                      className="profile"
                    />
                    <div className="card-content">
                      <h2>
                        {pokemon["name"]} <small>Engineer</small>
                      </h2>
                      <div className="icon-block">
                        <a href="#" onClick={() => handleClick(pokemon["id"])}>
                          <i
                            className="fa fa-heart"
                            title="marcar como favorito"
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default Home;
