import { BaseProps } from "tsx-dom-ssr";

import { DefaultLayout } from "./DefaultLayout";

interface PaginationLayoutProps extends BaseProps {
    title: string;
    pagination: JSX.Element;
}

export function PaginationLayout({ children, title, pagination }: PaginationLayoutProps) {
    return (
        <DefaultLayout title={title}>
            {pagination}
            {children}
            {pagination}
        </DefaultLayout>
    );
}
