import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";
import "./Loader.css";

export default function Loader({ active, children }) {
  return (
    <LoadingOverlay active={active} spinner={<HashLoader />}>
      {children}
    </LoadingOverlay>
  );
}
