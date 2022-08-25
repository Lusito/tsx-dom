import { SomeNumber } from "../../contexts/SomeNumber";
import { withCss } from "../../utils/withCss";
import classes from "./LazyImage.module.scss";

// eslint-disable-next-line func-names
export const LazyImage = withCss<{ src: string }>(classes, function ({ src }) {
    const num = SomeNumber.for(this);
    return [<img class={classes.lazyImage} data-src={src} />, <div>{num}</div>];
});
