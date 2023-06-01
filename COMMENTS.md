# Comments on the _full-stack-challenge_

Thank you for taking me into consideration. The task appeared to be interesting and quite challenging despite the fact that it looks somewhat simple at the first steel.

## Assumptions

The description of the task appears to be a bit loose so I did several assumptions:

1. Given the picture of the app rendered on a desktop screen and the possible use cases I assume the app will be used mostly on a pc therefore the main layout is what's on the picture and smaller layouts are of a secondary nature. For more public or more general purpose apps the primary layout should be the one for a smartphone. following the advice I've set up 3 major viewport sizes for adapting layout: LG and MD greater than `max-width: 786px;`, SM greater than `max-width: 459px;` and XS. The smallest screen which still looks decent is iPhone 6 size
2. CRA should work as I'm quite familiar with it and not so much with Next.js
3. I didn't follow TDD paradigm despite I was advised to do so later because of the most of code was written at that moment. So I added tests after the app started functioning.
4. Regarding API. API is so basic, 2 endpoints only, so I chose to go with a simple stand alone Apollo server without any db and ORM on top of it. Normally I use relational db, namely postgresql with Sequelize as ORM and TypeGraphQL because they share the same model classes.
5. Regarding API tests. I only tested data structure and several helpers that do needed computation, basically what's necessary for refactoring IMHO.

## Tech stack

### Front

1. CRA, i.e. React with typescript
2. Apollo client
3. graphql-codegen (just for convenience)
4. jest and cypress for test

### Back

1. Node/express
2. Apollo server
3. graphql-tools
4. graphql-codegen
5. jest for test

## What I didn't do or did wrong

The first of all time spent on this challenge exceeded 30 hours. But nevertheless there is a couple of things I failed to achieve:

1. I made header of the room list sticky at the top while app header reading "ROOM PLANNER" scrolls up. But I failed to test app header scrolls up because after `cy.scrollTo()` Cypress auto scrolls to the element `cy.get(".header")` so it becomes visible. I even wrote (actually found on the internet) the proprietary command for checking if an element is visible in a viewport.
2. For a SM size viewport room card `flex-direction` changes from `row` to `column`. And button for booking/canceling needed to change text in order to fit to small space. I decided to avoid javascript for styling purpose so invented a bit ugly solution using text scrolling animation.
3. I tried hard, but failed to make Cypress read from `.env` so API url remains hardcoded. It's a shame.
4. And regarding API I wanted to avoid boiler-plate code introducing db, so wrote a bunch of utils mocking the db. Now it doesn't look very smart for me.

## Checking how it works

The whole thing fits inside the repo. So the first thing is:

```
git clone git@github.com:sensorberg/full-stack-challenge-arturasmckwcz.git
```

Then there are 2 folders: `front` and `back`.
First launch API. After `cd full-stack-challenge-arturasmckwcz/back`:

```
yarn && PORT=3007 yarn start
```

For your convenience I made docker image of the API so alternatively you may (if there's docker running on your machine):

```
docker run -p 3007:3000 --name challenge-back arturasmckwcz/full-stack-challenge-backend
```

Then `cd ../front` and:

```
yarn && yarn start
```

You may change `3007` to the port you want. For AIP it's straight forward, for the frontend:

1. change `REACT_APP_API_URL` in `.env`
2. For Cypress test please check `*.cy.ts` files.
