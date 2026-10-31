import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

export async function render(url) {
  const errors = [];
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider context={{}}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
    { onError: (e) => { errors.push(e); } }
  );
  if (errors.length) throw new Error(`Prerender of ${url} failed: ${errors.map((e) => e.message).join("; ")}`);
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
