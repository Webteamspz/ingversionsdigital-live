const OptimizedImg = ({
  src,
  alt,
  width = 400,
  height = 500,
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
