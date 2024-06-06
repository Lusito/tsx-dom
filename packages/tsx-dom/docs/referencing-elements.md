# Referencing Elements

At some point you'll want to access the element itself to read from it or modify it.

## By Storing the JSX Result

This is the easiest way to store a reference:

```tsx
export function MyForm() {
  const input = <input placeholder="Enter a message to send..." />;

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (input.value) {
      console.log(input.value);
      input.value = "";
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {input}
      <button>Send</button>
    </form>
  );
}
```

## Using createRef

The above example can get quite ugly to read if you have to extract every element to a higher place.
You might be used to `useRef` from React. tsx-dom has a similar concept (`createRef`):

```tsx
export function MyForm() {
  const input = createRef<HTMLInputElement>();

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Be aware, that input.current will be set after the JSX has been transformed,
    // so TypeScript can't know if it's non-null at this point.
    // But as long as this function is not called before the return statement, input.current will not be null here.
    if (input.current?.value) {
      console.log(input.current.value);
      input.current.value = "";
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Enter a message to send..." ref={input} />
      <button>Send</button>
    </form>
  );
}
```
