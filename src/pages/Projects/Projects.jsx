import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectsPage from "../../components/ProjectsPage/ProjectsPage";
import Seo from "../../components/Seo/Seo";

const Projects = () => (
  <>
    <Seo
      title="Our Projects | Ingversions Digital"
      description="See how we've helped ecommerce brands grow through Shopify development, A/B testing, and conversion rate optimization."
      path="/projects"
    />
    <Header />
    <ProjectsPage />
    <Footer />
  </>
);

export default Projects;