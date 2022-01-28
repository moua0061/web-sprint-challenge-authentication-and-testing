# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [x] Run `npm install` to install your dependencies.
- [x] Build your database executing `npm run migrate`.
- [x] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [x] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [x] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [x] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.
    Session cookies make use of session-based authentication. A user’s logged in state is saved in the server’s memory. After a user signs in, a session is securely created by the server. Then, that session ID is stored in a session cookie on the user’s browser. While the user remains logged in, the cookie is sent with every subsequent request.Cookies are not accessible from JavaScript or anywhere because they are cryptographically signed and very secure. Sessions has expirations. 

    A JSON web token takes JASON data, called a claim, and transfers it securely. It does this by cryptographically signing the claim. The signature is either symmetrically or asymmetrically signed, but both offer authentication. With JSON web tokens, your identity is unequivocally verified, and you’re able to continue browsing the website or app where you logged in. JSON web token consists of three main parts that are separated by periods: A header, payload, and signature.

2. What does `bcryptjs` do to help us store passwords in a secure manner?
    It hashes a password where it implements salting both manually and automatically by accumulating hashing rounds. It will not store our plain text password but an encrypted password that has been hashed at a specific round declared by the developer. Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.
3. How are unit tests different from integration and end-to-end testing?
    a. When doing E2E (end-to-end) tests will run the entire application (both frontend and backend) and your test will interact with the app just like a typical user would.
    b. Integration testings is to check the connectivity and communication between different components of the application. 
    c. Unit testing is when you test a small isolated unit.

4. How does _Test Driven Development_ change the way we write applications and tests?
    Helps developers better analyze and understand client requirements and request clarity when they are not adequately defined. The addition and testing of new functionalities become much easier in the latter stages of development. Test coverage under TDD is much higher compared to the conventional development models. This is because the TDD focuses on creating tests for each functionality right from the beginning. Enhances the productivity of the developer and leads to the development of a codebase that is flexible and easy to maintain.
