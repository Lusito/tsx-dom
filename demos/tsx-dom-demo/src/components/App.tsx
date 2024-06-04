import { MyCustomElement } from "./MyCustomElement";
import { TodoList } from "./TodoList";

export const App = () => (
    <div>
        <h2>GRINCH TO DO LIST</h2>
        <TodoList />
        <h2>Custom Elements Demo</h2>
        <div style={{ height: "800px" }}>
            <p>Scroll down... you'll see a bar, which starts growing angry and changing color once in view. </p>
            <p>Don't worry. When you scroll up again, it returns to its calm state.</p>
        </div>
        <MyCustomElement activeColor="red" />
    </div>
);
