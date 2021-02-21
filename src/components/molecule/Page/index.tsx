import React, {SFC, ReactNode} from 'react';
import './Page.css'

export type PageProps = {
    headerText?: string;
    children: ReactNode;
  }

export const Page: SFC<PageProps> = ({headerText, children}) => (
    <div className="Page">
        {headerText && <h1 className="Page-Header">
            {headerText}
        </h1>}
        <div className="Page-line"/>
        <div className="Page-content">
            {children}
        </div>
    </div>
)

export default Page