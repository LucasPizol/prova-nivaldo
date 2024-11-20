import { useState } from "react";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { SearchInput } from "../search";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/filmes/${query}`);
    setQuery("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.logo} onClick={() => navigate("/filmes")}>
          Pizol Flix
        </h1>

        <div className={styles.header__navBar}>
          <form onSubmit={handleSearch}>
            <SearchInput
              placeholder="Buscar filmes"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <Button variant="primary">Entrar</Button>
          <Button variant="secondary">Cadastrar</Button>
          <Avatar />
        </div>
      </div>
    </header>
  );
};
