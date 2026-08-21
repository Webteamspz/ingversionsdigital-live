import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="nfWrapper">
      <span className="nfBlob nfBlobOne" aria-hidden="true" />
      <span className="nfBlob nfBlobTwo" aria-hidden="true" />
      <span className="nfBlob nfBlobThree" aria-hidden="true" />
      <div className="nfCard">
        <h1 className="nfTitle">404</h1>
        <p className="nfSubtitle">The page you are looking for does not exist.</p>
        <Link to="/" className="nfBtn">Go Back Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
