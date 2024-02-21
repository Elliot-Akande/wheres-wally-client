import styles from "./ChecklistItem.module.css";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";

const ChecklistItem = ({ character, found }) => {
  return (
    <li className={found ? styles.listItemComplete : styles.listItem}>
      <ImageLoader
        src={character.imageUrl}
        alt={character.name}
        imgClass={styles.image}
        loaderColour={"hsl(288, 70%, 49%)"}
        spinnerWidth={3}
        spinnerHeight={26}
      />
      {character.name}
    </li>
  );
};

export default ChecklistItem;
