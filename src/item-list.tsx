import { Item } from './item';

const ItemRow = (prop: {
    item: Item,
    itemSelected: () => void,
    itemDeleted: () => void,
}) => {
    const item = prop.item
    const style = {
        color: item.important ? 'red' : 'inherit', 
    };
    return (
        <tr>
            <th onClick={() => prop.itemSelected()}
            style={style}>
                {item.name}</th>
            <th>
                <button onClick={() => prop.itemDeleted()}>x</button>
            </th>
        </tr>);
}

export const ItemList = (prop: {
    items: Item[],
    onItemSelect: (item: Item) => void,
    onItemDelete: (id: string) => void
}) => {

    const deleteItem = (item: Item) => {
        prop.onItemDelete(item.id);
    };
    const selectItem = (item: Item) => {
        prop.onItemSelect(item);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Beschreibung</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {prop.items.map(item =>
                    <ItemRow key={item.id}
                        item={item}
                        itemDeleted={() => deleteItem(item)}
                        itemSelected={() => selectItem(item)} />)}
            </tbody>
        </table>
    );
}