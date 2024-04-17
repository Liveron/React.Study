type ItemProps = {
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem: () => void;
  onToggleItem: () => void;
};

export default function Item({
  description,
  quantity,
  packed,
  onDeleteItem,
  onToggleItem,
}: ItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        value={packed.toString()}
        onChange={onToggleItem}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={onDeleteItem}>❌</button>
    </li>
  );
}
