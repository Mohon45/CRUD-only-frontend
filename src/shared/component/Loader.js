import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";
import "./Loader.css";

export default function Loader({ active, children }) {
  const COLORS = {
    PRIMARY: "#2FA84F",
  };
  return (
    <LoadingOverlay
      active={active}
      spinner={<HashLoader color={COLORS.PRIMARY} />}
    >
      {children}
    </LoadingOverlay>
  );
}
