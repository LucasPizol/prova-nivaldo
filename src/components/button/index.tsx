import classNames from "classnames";
import styles from "./styles.module.scss";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", ...props }: IButtonProps) => {
  return (
    <button {...props} className={classNames(styles.button, styles[variant])} />
  );
};
