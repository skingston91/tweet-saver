import React, {SFC, ReactNode} from 'react';

export type PageProps = {
    headerText?: string;
    children: ReactNode;
  }

export const Page: SFC<PageProps> = ({headerText, children}) => {
    return (
        <div className="Page">
            {headerText && <h1 className="Page-Header">
                {headerText}
            </h1>}
            {children}
        </div>
    )
}

export default Page