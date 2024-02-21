import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import styles from "./ImageLoader.module.css";

const ImageLoader = ({
  src,
  alt,
  imgClass,
  imgRef,
  placeholderClass,
  spinnerHeight,
  spinnerWidth,
  spinnerColour,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <div className={`${styles.container} ${placeholderClass}`}>
          <ScaleLoader
            color={spinnerColour}
            height={spinnerHeight}
            width={spinnerWidth}
          />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        ref={imgRef}
        className={imgClass}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1, transition: "0.3s" }}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  imgRef: null,
};

export default ImageLoader;
