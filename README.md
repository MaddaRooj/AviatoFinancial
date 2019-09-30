# Aviato Financial - Your personal Financial Advisor
This purpose of this application is to aid the user in managing and tracking their finances. User will be able to create budgets and then track all the purchases made from the respective budget. All purchases will be displayed in a graph on the user's financial profile for easy, quick analysis. 

![AviatoFinancial](https://user-images.githubusercontent.com/38664958/65908328-d9782600-e38b-11e9-95d0-da40e7599833.png)

## To Get Started
1. Create your own Firebase Project
  * [Google Console](https://console.firebase.google.com/)
  * Start New Project
  * Click the </> icon under "Get started by adding Firebase to your app"
  * Name your app to get access to you Firebase SDK
  * Navigate to the configTemplate.js and input your information
2. Open your terminal, navigate to the directory you would like to save this project, and run the command ```git clone git@github.com:MaddaRooj/AviatoFinancial.git```
1. Run ```npm install``` to git all the node dependencies
1. Navigate to the API folder to start the JSON server on port 5002
  - ```json-server database.json -p 5002```

## Dependencies Used
1. Firebase
2. React
3. React-DOM
4. React-Router-DOM
5. React-Scripts
6. Reactstrap
7. Bootstrap
8. Chart.js

## Stock Market Ticker Tape

The awesome ticker tape in the footer of my project is a widget produced by tradingview.com
https://www.tradingview.com/widget/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
