import { FormEvent, ChangeEvent, useState, useEffect } from 'react';

import { Item } from './item';

export interface EditorResult {
    name: string,
    important: boolean,
}

export const ItemEditor = (prop: {
    onChangesSubmit : (value: EditorResult) => void,
    initialValue: Item | null,
}) => {
    const [name, setName] = useState<string>(
        () => prop.initialValue?.name || ''
    );
    const [important, setImportant] = useState<boolean>(
        () => prop.initialValue?.important || false
    );

    const existing = !!prop.initialValue;

    const pushChanges = () => {
        prop.onChangesSubmit({
            name: name,
            important: important,
        });
    }

    const resetValues = () => {
        setName('');
        setImportant(false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        pushChanges();

        if (!existing) {
            resetValues();
        }
    }

    const onNameChanged = (e: ChangeEvent) => {
        const target = e.target as typeof e.target & {
            value: string,
        }
        const value = target.value;

        setName(value);
    };
    const onImportantChanged = (e: ChangeEvent) => {
        const target = e.target as typeof e.target & {
            checked: boolean
        };
        const value = target.checked;
        setImportant(value);
    };

    useEffect(() => {
        if (prop.initialValue) {
            setName(prop.initialValue.name);
            setImportant(prop.initialValue.important);
        } else {
            resetValues();
        }
    }, [prop.initialValue]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="itemInput">Beschreibung: </label>
                <input name="item" id="itemInput"
                    onChange={onNameChanged}
                    value={name}
                    type="text"></input>
            </div>
            <div>
                <label htmlFor="">Wichtig? </label>
                <input type="checkbox" 
                onChange={onImportantChanged}
                checked={important}></input>
            </div>
            <button type="submit">{prop.initialValue ? 'Speichern' : 'Hinzufügen'}</button>
        </form>
    );
}