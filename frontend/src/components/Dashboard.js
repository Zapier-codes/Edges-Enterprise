import React, { useEffect, useState } from "react";
import AddProducts from "./AddProducts";
import AddServices from "./AddServices";
import UpdateMe from "./UpdateMe";
import AddPicture from "./AddPicture";
import OngoingProjects from "./OngoingProjects";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import jwtDecode from "jwt-decode";
import defaultImg from "./../resources/default.png";

const Dashboard = () => {
  const { setIsLoggedIn, getUserImage, userImg } = useStore();

  useEffect(() => {
    const getImage = async () => {
      try {
        const jwt = Cookies.get("jwt");
        const id = jwtDecode(jwt).id;
        if (!userImg) {
          await getUserImage(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, [getUserImage, userImg]);

  const navigate = useNavigate();
  useEffect(() => {
    const handleLocalStorageChange = (e) => {
      if (e.key === "role" && !e.newValue) {
        Cookies.remove("jwt");
        setIsLoggedIn(false);
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleLocalStorageChange);
    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
    // eslint-disable-next-line
  }, []);

  const role = localStorage.getItem("role");
  const [page, setPage] = useState("OngoingProjects");

  const handleChangePage = (val) => {
    if (val === "AddProducts") setPage("AddProducts");
    else if (val === "UpdateMe") setPage("UpdateMe");
    else if (val === "AddPicture") setPage("AddPicture");
    else if (val === "AddServices") setPage("AddServices");
    else setPage("OngoingProjects");
  };

  const renderPage = () => {
    if (page === "AddServices") return <AddServices />;
    else if (page === "AddProducts") return <AddProducts />;
    else if (page === "UpdateMe") return <UpdateMe />;
    else if (page === "AddPicture") return <AddPicture />;
    else return <OngoingProjects />;
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col p-2 sm:m-2 md:m-12 bg-[var(--bg-primary)] min-h-screen">
      <div className="flex md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
          {role === "admin" ? "Admin " : role === "employee" ? "Employee " : "Client "}
          Dashboard
        </h1>
        <img src={userImg || defaultImg} alt="" className="rounded-full w-16 h-16 object-cover border border-[var(--border-color)]" />
      </div>

      <div className="grid md:grid-cols-6 grid-cols-3 justify-start items-start my-3 gap-px">
        <button
          onClick={() => handleChangePage("OngoingProjects")}
          className={`p-[2px] md:p-3 border border-[var(--border-color)] font-semibold text-base md:text-xl leading-5 transition-colors ${page === "OngoingProjects" ? "bg-[#FED500] text-[#090909]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`}
        >
          Ongoing Projects
        </button>
        {role === "admin" && (
          <button
            onClick={() => handleChangePage("AddServices")}
            className={`p-2 md:p-3 border border-[var(--border-color)] font-semibold text-xl h-full transition-colors ${page === "AddServices" ? "bg-[#FED500] text-[#090909]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`}
          >
            Add Services
          </button>
        )}
        {role === "admin" && (
          <button
            onClick={() => handleChangePage("AddProducts")}
            className={`p-2 md:p-3 border border-[var(--border-color)] font-semibold text-xl h-full transition-colors ${page === "AddProducts" ? "bg-[#FED500] text-[#090909]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`}
          >
            Add Products
          </button>
        )}
        <button
          onClick={() => handleChangePage("UpdateMe")}
          className={`p-1 md:p-3 border border-[var(--border-color)] font-semibold text-base md:text-xl md:h-full h-[45.5px] leading-5 transition-colors ${page === "UpdateMe" ? "bg-[#FED500] text-[#090909]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`}
        >
          Update Password
        </button>
        <button
          onClick={() => handleChangePage("AddPicture")}
          className={`p-2 md:p-3 border border-[var(--border-color)] font-semibold text-xl md:h-full transition-colors ${page === "AddPicture" ? "bg-[#FED500] text-[#090909]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`}
        >
          Add Picture
        </button>
        <button
          onClick={handleLogout}
          className="p-2 md:p-3 border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-red-900/30 hover:text-red-400 font-semibold text-xl md:h-full transition-colors"
        >
          Log Out
        </button>
      </div>
      <div className="mt-6">{page && renderPage()}</div>
    </div>
  );
};

export default Dashboard;
