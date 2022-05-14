# GreenDragonFilmsAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

Overview

Green Dragon Films - Angular is a frontend application that uses Angular and TypeScript to allow users to login and fan over their favorite action and adventure movies. They can view details about a movie's genre, director, and description, as well as store it in their account as a favorite.

Purpose & Context

Green Dragon Films - Angular is a personal project I built to test my Angular and TypeScript skills I learned as part of a web development course called Career Foundry. It's the Angular version of the frontend application that integrates an API I built using Express and Node. I also built a React version, which can be seen on my portfolio site.

Objective

The aim of this project was to build an Angular application I can add to my professional portfolio. The problem I wanted to solve was to build a frontend for my Movies API using Angular and TypeScript.


Approach

Server-Side

My Movies API uses MongoDB to store information about movies and users. The API stores data using JSON format and is accessed through https://greendragonflix.herokuapp.com/.

Client-Side

The client-side of the application is the main focus of the project using Angular and TypeScript. Initially, users are prompted to either login or register using their username and password. Once the user is validated, they are redirected to the main page with displays movie cards that allow the user to view clickable information on their favorite movies such as the genre, director, and description. On clicking the card, the user is directed to a single movie page where they can view more information about their favorite movies. Users can like a movie, which will add it to their favorites for them to view on the favorite movies page. From the Account button, users are able to update their personal information such as their username, password, and email.

Credits Lead Developer and Designer: Kristofer Hokr

                                -------------     

Development Environment Requirement and Libraries

Angular v13.3.5 or higher
TypeScript v4.6.2 or higher
Material UI v13.3 or higher

