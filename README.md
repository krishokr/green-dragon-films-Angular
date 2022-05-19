# Green Dragon Films Movie App - Angular
### Last Updated: May 18, 2022

<img src="./assets/demo1.png" width="300">
<p left="float">
    <img src="./assets/demo2.png" width="300">
    <img src="./assets/demo3.png" width="300">
</p>

## Overview

Green Dragon Films - Angular is a frontend application that uses Angular and TypeScript to allow users to login and fan over their favorite action and adventure movies. They can view details about a movie's genre, director, and description, as well as store it in their account as a favorite.

## Purpose & Context

Green Dragon Films - Angular is a personal project I built to test my Angular and TypeScript skills I learned as part of a web development course called Career Foundry. It's the Angular version of the frontend application that integrates an API I built using Express and Node. I also built a React version, which can be seen at [https://greendragonfilms.netlify.app/](https://greendragonfilms.netlify.app/).


## Approach

### Server-Side
I built a Movies RESTful API that uses MongoDB to store JSON files about movies and users. You can view the documentation at [https://greendragonflix.herokuapp.com/](https://greendragonflix.herokuapp.com/).

### Client-Side
The client-side of the application is the main focus of the project using Angular and TypeScript. Initially, users are prompted to either login or register using their username and password. Once the user is validated, they are redirected to the main page with displays movie cards that allow the user to view clickable information on their favorite movies such as the genre, director, and description. On clicking the card, the user is directed to a single movie page where they can view more information about their favorite movies. Users can like a movie, which will add it to their favorites for them to view on the favorite movies page. From the Account button, users are able to update their personal information such as their username, password, and email.


## Credits Lead Developer and Designer: Kristofer Hokr

## Dependencies
- Angular v13.3.5 or higher
- TypeScript v4.6.2 or higher
- Material UI v13.3 or higher

## Getting Started

You can also view this project at (https://green-dragon-films-angular.netlify.app/)[https://green-dragon-films-angular.netlify.app/].

Clone this repository

```git clone https://github.com/krishokr/green-dragon-films-Angular.git```

Go to project's root directory

```cd green-dragon-Angular```

Install dependencies

```npm install```


Run the project using angular

```ng serve```




