# RS3Merch - A Flipping/Merchanting Tool for Runescape 3

![alt text](https://github.com/JKal24/RS3Merch/blob/master/rs3merch_frontend/src/assets/rs3merch_logo_small.png)

# Introduction

This project was made in a similar vain as ge-tracker where the main purpose is to feed the user with information about various items. 
Information included in the app will be:
* Average prices 
* Undervaluation 
* Monthly variation levels
* Historic highs and lows

This app will also allow you to add a set of items as favorites to your database.

Information will be organized through the following categories:
* Investments
* Stable items
* Buy Limit filtered
* Type filtered

Lastly, simple plotly graphs may be used if the [ItemGraph](https://github.com/JKal24/ItemGraph) extension is running by pressing the button "Enable Plots" in the top right corner of your window.

Disclaimer: This app is not nearly as powerful as ge-tracker due to the simple fact that data accessibility is severely limited in Runescape 3.
OSRS has a custom client which can track player data but this is not the case for Runescape 3.

# Technologies Used

* Frontend: ReactJS, Axios, React-Router and React-Bootstrap
* Backend: NodeJS, Express, Cheerio, Axios, dotenv, Node-postgres, cors
* [ItemGraph](https://github.com/JKal24/ItemGraph): Python, Flask, Flask-cors, Plotly, Numpy, Pandas, Requests

# Usage

Please set up a .env file with your respective database credentials in the backend folder for use.
Use [ItemGraph](https://github.com/JKal24/ItemGraph) for detailed plots.

# Acknowledgements

* [Jean Rauwers MERN Tutorial](https://github.com/jeanrauwers/mern-course-bootcamp)
* [Ge-Tracker](https://www.ge-tracker.com/)
