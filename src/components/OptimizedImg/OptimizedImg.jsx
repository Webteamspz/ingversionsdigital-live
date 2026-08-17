const OptimizedImg = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  ...rest
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      {...rest}
    />
  );
};

export default OptimizedImg;
