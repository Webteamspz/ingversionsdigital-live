import { Suspense, useEffect, useRef, useState } from "react";

const DeferredComponent = ({ component: Component, componentProps = {}, id, minHeight = 240, rootMargin = "500px 0px" }) => {
  const placeholderRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (!shouldRender) {
    return <div ref={placeholderRef} id={id} style={{ minHeight }} aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
      <Component {...componentProps} />
    </Suspense>
  );
};

export default DeferredComponent;
