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
  const [users, setUsers] = useState([]);

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const getUsers = () => {
    const token = localStorage.getItem("auth");

    axios
      .get("https://poke-api-production-1759.up.railway.app/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("response pokemon: ", response);
        setUsers(response.data);

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
        console.log("error in get users: ", error);
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
    getUsers();
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
          <h3 className="m-3">Usuarios registrados</h3>
        </div>
        <div>
          <button type="submit" className="buttons" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="container">
        <div className="container">
          <div className="row">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{user["firstname"]}</td>
                    <td>{user["lastname"]}</td>
                    <td>{user["email"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
