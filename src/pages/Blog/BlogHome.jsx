import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import BlogClient from "../../components/BlogClient/BlogClient";
import { blogHomeSeo } from "../../data/blog/blogSeo.js";
import "./blog.css";

const BlogHome = () => (
  <>
    <SEO {...blogHomeSeo} />
    <Layout header={1} footer={1}>
      <div className="ing-blog">
        <BlogClient />
      </div>
    </Layout>
  </>
);

export default BlogHome;
