import { useState } from 'react';
import './App.css';
import { v4 } from 'uuid';

import { Item } from './item';
import { EditorResult, ItemEditor } from './item-editor';
import { ItemList } from './item-list';

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const onItemSubmit = (value: EditorResult) => {
    if (selectedItem) {
      const editedItems = items.map(item => {
        const thisItemChanged = item.id === selectedItem.id;
        return {id: item.id, 
          name: thisItemChanged ? value.name : item.name,
          important: thisItemChanged ? value.important : item.important,
        }; 
      });
      setItems(editedItems);
      setSelectedItem(null);
    } else {
      const newItem: Item = {
        id: v4(),
        name: value.name,
        important: value.important,
      };
      setItems([...items, newItem]);
    }
  };

  const onItemDelete = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    setSelectedItem(null);
  }

  const onItemClicked = (item: Item) => {
    setSelectedItem(item);
  }

  return (
    <div className="App">
      <ItemEditor
        initialValue={selectedItem}
        onChangesSubmit={onItemSubmit}></ItemEditor>
      <ItemList items={items}
        onItemSelect={onItemClicked}
        onItemDelete={onItemDelete}></ItemList>
    </div>
  );
}

export default App;
