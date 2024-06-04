import { createRef } from "tsx-dom";

import { TodoListEntry } from "./TodoListEntry";

export const TodoList = () => {
    const input = createRef<HTMLInputElement>();
    const list = createRef<HTMLUListElement>();
    const formItem = createRef<HTMLLIElement>();

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (input.current?.value) {
            list.current?.insertBefore(<TodoListEntry label={input.current.value} checked={false} />, formItem.current);
            input.current.value = "";
        }
    };

    return (
        <ul class="todo-list" ref={list}>
            <TodoListEntry label="Make cookies" checked={false} />
            <TodoListEntry label="Go to Christmas party" checked={false} />
            <TodoListEntry label="Wish everyone a merry Christmas" checked={false} />
            <TodoListEntry label="Dress up like Santa" checked />
            <TodoListEntry label="Ignore 1-3" checked />
            <TodoListEntry label="Steal Christmas" checked />
            <li ref={formItem}>
                <form class="todo-list-form" onSubmit={onSubmit}>
                    <input class="todo-list-new-entry" placeholder="Add a new entry..." ref={input} />
                    <button>+</button>
                </form>
            </li>
        </ul>
    );
};
