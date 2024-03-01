import PropTypes from "prop-types";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Image, Placeholder } from "./styles";

const ImageLoader = ({
  src,
  alt,
  imgRef,
  imgStyles,
  placeholderStyles,
  spinnerHeight,
  spinnerWidth,
  spinnerColour,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Placeholder $customStyles={placeholderStyles}>
          <ScaleLoader
            color={spinnerColour}
            height={spinnerHeight}
            width={spinnerWidth}
          />
        </Placeholder>
      ) : null}
      <Image
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoading(false)}
        $customStyles={imgStyles}
        $loading={loading}
      />
    </>
  );
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  imgRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  imgStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  spinnerHeight: PropTypes.number,
  spinnerWidth: PropTypes.number,
  spinnerColour: PropTypes.string,
};

export default ImageLoader;
