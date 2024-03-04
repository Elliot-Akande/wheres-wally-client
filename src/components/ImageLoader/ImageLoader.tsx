import { forwardRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Interpolation } from "styled-components";
import { Image, Placeholder } from "./styles";

interface Props {
  src: string;
  alt: string;
  imgStyles?: Interpolation<React.CSSProperties>;
  placeholderStyles?: Interpolation<React.CSSProperties>;
  spinnerHeight?: number;
  spinnerWidth?: number;
  spinnerColour?: string;
}

type Ref = HTMLImageElement;

const ImageLoader = forwardRef<Ref, Props>(
  (
    {
      src,
      alt,
      imgStyles,
      placeholderStyles,
      spinnerHeight,
      spinnerWidth,
      spinnerColour,
    },
    ref
  ) => {
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
          ref={ref}
          onLoad={() => setLoading(false)}
          $customStyles={imgStyles}
          $loading={loading}
        />
      </>
    );
  }
);

export default ImageLoader;
