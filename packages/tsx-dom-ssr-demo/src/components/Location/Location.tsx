import { RamLocation } from "../../types/ramTypes";
import { withCss } from "../../utils/withCss";
import classes from "./Location.module.scss";

export type LocationProps = {
    location: RamLocation;
};

export const Location = withCss(classes, ({ location }: LocationProps) => {
    const name = location.name.replace(`(${location.dimension.replace(/^Dimension /, "")})`, "").trim();

    return (
        <div class={classes.location}>
            <a href={`/location/${location.id}`}>{name}</a>, {location.type} of {location.dimension}
        </div>
    );
});
