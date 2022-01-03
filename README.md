# ![alt text](https://github.com/JKal24/RS3Merch/blob/main/client/src/assets/rs3exch_logo_small.png) RS3Exch - A Grand Exchange Tool for Runescape 3

**Current deployed at:** https://rs3exch.herokuapp.com/

This is a demo version which isn't being updated.  This is primarily due to the throttling which is present in the Runescape API and slows down update times. More information about this can be read on the app.

# Introduction

This project was made in a similar vain as ge-tracker where the main purpose is to feed the user with information about various items. 
Information included in the app will be:
* Item information
* Valuation
* Variation
* Weekly highs and lows

Information will be organized through the following categories:
* Rising prices
* Falling prices
* Buy Limit filtered
* Type filtered

Disclaimer: This app is not nearly as powerful as ge-tracker due to the simple fact that data accessibility is severely limited in Runescape 3.
OSRS has a custom client which can track player data but this is not the case for Runescape 3.

# Technologies Used

* Frontend: ReactJS, Axios, React-Router, Redux, React-Redux toolkit and React-Bootstrap
* Backend: NodeJS, Express, Cheerio, Node-Postgres
* Testing & Deployment: Docker, Heroku and Jest

# Acknowledgements

* [Jean Rauwers MERN Tutorial](https://github.com/jeanrauwers/mern-course-bootcamp)
* [freeCodeCamp MERN Tutorial](https://www.youtube.com/watch?v=7CqJlxBYj-M)
