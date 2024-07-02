import { CSSTransition } from "react-transition-group";
import { FaCircleNotch } from "react-icons/fa6";

import { Icon } from "@/components/icon";

import styles from "./styles.module.scss";

const LoadingOverlay = (props: { isLoading: boolean }) => {
  const { isLoading } = props;

  return (
    <CSSTransition
      in={isLoading}
      timeout={200}
      classNames={{
        enter: styles["loading-overlay--enter"],
        enterActive: styles["loading-overlay--enter-active"],
        exit: styles["loading-overlay--exit"],
        exitActive: styles["loading-overlay--exit-active"],
      }}
      unmountOnExit
    >
      <div className={styles["loading-overlay"]}>
        <Icon
          icon={FaCircleNotch}
          className={styles["loading-icon"]}
          size="h2"
        />
      </div>
    </CSSTransition>
  );
};

export { LoadingOverlay };
