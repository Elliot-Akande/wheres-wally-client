import PropTypes from "prop-types";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import styles from "./ChecklistItem.module.css";

const ChecklistItem = ({ character, found }) => {
  return (
    <li className={found ? styles.listItemComplete : styles.listItem}>
      <ImageLoader
        src={character.imageUrl}
        alt={character.name}
        imgClass={styles.image}
        spinnerColour={"hsl(288, 70%, 49%)"}
        spinnerWidth={3}
        spinnerHeight={26}
      />
      {character.name}
    </li>
  );
};

ChecklistItem.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  found: PropTypes.bool.isRequired,
};

export default ChecklistItem;
