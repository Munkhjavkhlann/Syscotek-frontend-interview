# Dummy Critics

A technical challenge for Front-end job application at Syscotek LLC.

Using the API endpoints in this repo, you must build a simple app where the user can authenticate, write reviews for movies or tv shows, and see their previously written reviews.

## Getting started

Setup the database.

```
docker compose up
```

A local database named `dummycritics` will be created. You can connect to it on port 3306 with username = `root`, password = `password`.

The back-end uses Prisma to manage the database. You should explore the Prisma schema.

Run the Next.js app.

```
cd dummy-critics
npm run dev
```

---

## Instructions

UI context is described below, but the visual design is completely up to you. Feel free to utilize any library or tools of your choice.

When accessing API endpoints after authentication, make sure to put the `token` received from login endpoint response in `Authorization` header as a `Bearer Token`.

### Authentication

To proceed with the app, user must be authenticated. Allow them to register and login with email+password.

Upon successful login, store the user's ID and email in a global store. Then, redirect to a screen where user can navigate easily between two views:

- Browse (user can see movies and tv shows)
- Review history (list of previous reviews written by the authenticated user)

### Browse

In the browse view, fetch list of contents from `http://localhost:3000/api/contents`. Display the title, and poster image of a content.

When user selects a content, navigate to Content view.

### Content details

Here, you can fetch details of a content from `http://localhost:3000/api/contents/{contentUri}`, and the reviews of this content from `http://localhost:3000/api/reviews/{contentUri}`.

Display all the details of the content fetched from the API (all fields except uri), and it's reviews (author email, review body, written date in readable manner). There are sample reviews in the database for `Inside Out 2`.

Allow the user to write a review for this content.

### Review history

Fetch all reviews written by the user from `http://localhost:3000/api/reviews/me`.

Display these reviews, and allow the user to navigate to it's Content details view.

---

## Notes

It is mandatory to use the pre-made Next.js app. You can integrate any library(s) of your choice.

We will examine the following.

- Thinking in React: how the data flows in the app
- Overall code quality
- User Experience
  - visual feedback on interactions (i.e: data loading/failed, action success etc.)
  - accessibility (i.e: using the app with a keyboard only)
  - app performance
- User Interface: how you have designed the screens, layouts and components
- If used, the choice of external libraries
  - how well they integrate with the app in code and in design

**If you have any questions, please ask your supervisor immediately.**
