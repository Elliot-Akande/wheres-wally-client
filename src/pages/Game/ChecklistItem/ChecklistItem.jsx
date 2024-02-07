import styles from "./ChecklistItem.module.css";

const ChecklistItem = ({ character, found }) => {
  return (
    <li className={found ? styles.listItemComplete : styles.listItem}>
      <img
        src={character.imageUrl}
        alt={character.name}
        className={styles.image}
      />
      {character.name}
    </li>
  );
};

export default ChecklistItem;
