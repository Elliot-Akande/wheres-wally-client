import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import styles from "./ImageLoader.module.css";

const ImageLoader = ({
  src,
  alt,
  imgClass,
  placeholderClass,
  loaderColour,
  spinnerHeight,
  spinnerWidth,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <div className={`${styles.container} ${placeholderClass}`}>
          <ScaleLoader
            color={loaderColour}
            height={spinnerHeight}
            width={spinnerWidth}
          />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        className={imgClass}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1, transition: "0.3s" }}
      />
    </>
  );
};

export default ImageLoader;
