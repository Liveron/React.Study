import { useState } from "react";
import ItemModel from "./models/ItemModel";
import Item from "./Item";

type PackingListProps = {
  items: ItemModel[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onDeleteItems: () => void;
};

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteItems,
}: PackingListProps) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems: ItemModel[] = [];

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
            key={item.id}
            onDeleteItem={() => onDeleteItem(item.id)}
            onToggleItem={() => onToggleItem(item.id)}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteItems}>Clear list</button>
      </div>
    </div>
  );
}
