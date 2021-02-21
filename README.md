# Tweet-saver
Create a one page webapp that allows users to save tweets to HTML 5 local storage by dragging and dropping (see mockup below). Users can search for tweets to save by putting in some text into a search field and clicking the search button to populate the left hand column with the 10 most recent twitter posts matching that criteria. The user can then drag and drop tweets from the left hand column to column on the right labelled saved tweets. The saved tweets will get "saved" in the page so that when the user refreshes the page or comes back to it later his saved tweets are still present.

# Prerequisites
Yarn or NPM
Node
# Installing the App
Replace the bearer Token in the .env file with your own bearer token from Twitter
Fake example below
`BEARER_TOKEN=Bearer AASSHFHSAFHHASHFHSAHFHSHFAHF`

Run `yarn` to install the dependencies 
# Starting the App
Run `yarn startClient`
Run `yarn startServer`

This will start the node server and the react app

Go to http://localhost:3000/ to see the page

# Running Tests
Run `yarn test`
## Improvements
Improve/More Tests
Typescript for the node sever
Abstracted the api Request Hook
Abstracted out the Draggable entities to own components
Migrate the CSS to either styled compontents or Less (or potentially migrate to a component library)
Rename the css to be named styles.css
Prettier + TSLint + Husky automated running
CI/CD Deployment Pipeline + Enviroment Variable injection for the Bearer Token
Component library added for handling the components
