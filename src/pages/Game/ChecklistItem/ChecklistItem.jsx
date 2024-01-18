const ChecklistItem = ({ character, found }) => {
  return (
    <li>
      {character} {found ? "(found)" : null}
    </li>
  );
};

export default ChecklistItem;
