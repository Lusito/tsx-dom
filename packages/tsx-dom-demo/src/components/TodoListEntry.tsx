import { createRef } from "tsx-dom";

interface TodoListEntryProps {
    label: string;
    checked: boolean;
}

export const TodoListEntry = ({ label, checked }: TodoListEntryProps) => {
    const item = createRef<HTMLLIElement>();

    const onRemove = () => item.current?.remove();
    const toggleChecked = () => item.current?.classList.toggle("checked");

    return (
        <li class={`todo-list-entry${checked ? " checked" : ""}`} ref={item}>
            <span class="label" title="Click to toggle" onClick={toggleChecked}>
                {label}
            </span>
            <button class="remove" onClick={onRemove} type="button" title="Remove">
                x
            </button>
        </li>
    );
};
