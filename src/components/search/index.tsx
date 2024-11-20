import searchIcon from "../../assets/search-icon.svg";
import styles from "./styles.module.scss";

export const SearchInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <div className={styles.search}>
      <input type="text" {...props} />

      <button className={styles.search__icon}>
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
};
