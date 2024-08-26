import { useState } from "react";
import Logo from "./Logo";
import ItemModel from "./models/ItemModel";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState(Array<ItemModel>);

  function handleAddItems(item: ItemModel) {
    setItems((x) => [...x, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((x) => [...x.filter((item) => item.id !== id)]);
  }

  function handleDeleteItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function handleToggleItem(id: number) {
    setItems((x) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
