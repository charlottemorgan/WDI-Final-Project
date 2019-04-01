# General Assembly Project 4 : Full Stack React App

### Timeframe
7 days - Solo Project

## Technologies used

* JavaScript (ES6)
* Python
* HTML5, SCSS, Bulma
* React.js
* Git/GitHub
* Webpack
* PostgreSQL
* SQLAlchemy
* Flask


## Installation

1. Clone or download the repo
2. Install yarn (and pipenv) in Terminal
3. Launch the server using yarn serve:flask
4. Launch front-end using yarn serve:react

## Dine

![Dine](https://media.git.generalassemb.ly/user/17639/files/c42a4980-5485-11e9-92b5-636ad08e1e51)

You can find a hosted version here ---->

### Overview
Dine is an app that allows the user to search for recipes based on their dietary requirements eg. Vegan, low-carb etc

The search will return recipes from an API based on their requirements. They will then be able to add the ingredients from the recipe into a shopping list.

From the shopping list they will be able to either use this as a checklist while out shopping, or choose to check-out via Amazon Fresh.


### User Journey
##### Search for recipes and add to shopping list:

![Dine](https://media.git.generalassemb.ly/user/17639/files/9f37d580-5489-11e9-815d-5db7bd59e437)

##### Check off and re-add items on list

![Dine](https://media.git.generalassemb.ly/user/17639/files/9f37d580-5489-11e9-815d-5db7bd59e437)

##### Check out using Amazon Fresh

![Dine](https://media.git.generalassemb.ly/user/17639/files/9f37d580-5489-11e9-815d-5db7bd59e437)



## Process

I decided to build an app that was simple but functioned well.

I knew that my biggest challenge would be the back-end so decided to keep this as simple as possible to allow myself time to work on the backend.

I started by building out the back-end and playing around with the recipe API in insomnia as this required some information to make a request. The API didn't allow an 'all recipes' search and had to be passed the user input for every request.

I decided that MVP would be the shopping list and to tackle the Amazon Fresh API as a bonus challenge.


### Challenges

1. The recipe API that I used was quite difficult to use as I needed to give it info to search with rather than being able to pull all the recipes then filter them myself. It took me a bit of time to get the logic right for this as I was taking in the dietary requirements on the front end and making my call to the API on the backend.

2. The Amazon Fresh API was another big challenge. There isn't currently a lot of documentation for this so it took a lot of trial and error. The API takes a specific data format so the information returned from the recipe API search needed to be converted to this format before being posted to the Amazon Fresh API

### Wins

Getting the Amazon Fresh integration working was a big win. Initially I wasn't sure I would be able to make it happen but after breaking down the problem it was much easier to tackle.

Completing a full stack application solo  was a huge win for me. I decided to complete this project on my own rather than in a group to test myself, as I had been primarily focused on the front-end in previous projects.


## Future features

Ideally I would like to create my own database of recipes rather than using an API. This would allow me to use better images and better search functions.

I would also like to use the Tesco API to pull up info about pricing etc to add to the shopping list. 
