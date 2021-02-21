import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {Tweet} from './';

const testTweet = {
    "date": "Sun Feb 21 10:48:46 +0000 2021",
    "id": 1363440521394479000,
    name: "Auto Tradition / Racing Spirit",
    tweetContent: "RT @adamcooperF1: '@yukitsunoda07 has been conducting a low-key test F1 programme in 2018 and 2019 Toro Rossos - and his @AlphaTauriF1 team…",
    twitterHandle: "AutoTradition"
}
describe('Tweet component tests', () =>{
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
        render(<Tweet />, container);
        expect(container.textContent).toBe("");

    });

    it('renders with props to passed it', () => {
        act(() => {
            render(<Tweet {...testTweet}/>, container);
          });
        expect(container.textContent).toContain(testTweet.tweetContent);
        expect(container.textContent).toContain(testTweet.twitterHandle);
        expect(container.textContent).toContain(testTweet.name);
    });
})