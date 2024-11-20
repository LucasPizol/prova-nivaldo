import styles from "./styles.module.scss";

export const Avatar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={styles.avatar}>
      U
    </div>
  );
};
