import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectsPage from "../../components/ProjectsPage/ProjectsPage";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";

const Projects = () => (
  <>
    <SEO {...seo.projects} />
    <Header />
    <ProjectsPage />
    <Footer />
  </>
);

export default Projects;
