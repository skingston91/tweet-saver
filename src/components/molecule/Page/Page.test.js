import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Page from './';
describe('Page component tests', () =>{
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renders without crashing with no props', () => {
        render(<Page />, container);
    });

    it('renders with header and without a header passed it', () => {
        let headerText = "This is a header"
        act(() => {
            render(<Page headerText={headerText}/>, container);
          });
        expect(container.textContent).toBe(headerText);
        headerText = ""

        act(() => {
            render(<Page headerText={headerText}/>, container);
        });
        expect(container.textContent).toBe("");
    });
    it('renders with children', () => {
        let childText = "Child text"
        const Component = (
            <Page >
                <p>{childText}</p>
            </Page>
        )
        render(Component, container);
        expect(container.textContent).toBe(childText);
    });
})