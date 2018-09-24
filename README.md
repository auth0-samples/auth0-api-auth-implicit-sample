## Overview

This is a sample application that demonstrates the usage of a single Resource Server with namespaced scoping representing multiple APIs. This sample consists of:

- 2 Node.js APIs: `contacts` and `calendar` (you can think of them as microservices);
- 1 Resource Server representing the 2 APIs;
- 2 Namespaced scopes: `read:contacts` and `read:calendar`;
- The Implicit Grant flow to obtain an `access_token` that works for both APIs

## Setup

You will need to create an API using the Auth0 Dashboard called `Organizer Service` with the unique identifier `organize` (this is later used in the `audience` parameter of your Authorization URL).

The API needs two namespaced scopes:

* `read:contacts`
* `read:calendar`

## Usage

Prior to beginning, you may need to make some or all of the following changes so that the sample runs on your local environment:

* `.env` (Please note that this file will, by default, be hidden):
  * replace the placeholder with your Auth0 Domain
  * update the ports you're using to serve your SPA and APIs
* `calendar-api.js`: replace each of the two placeholders with your Auth0 Domain
* `contacts-api.js`: replace each of the two placeholders with your Auth0 Domain
* `index.html`:
  * update the Authorization URL with your domain, Auth0 Client ID, and the port you're using to serve the SPA
  * replace each of the two placeholders with the ports you're using to serve the `contacts` and `calendar` APIs

### Run the Sample

1. Navigate to the root of your sample folder.
2. Run `npm install` to install the dependencies.
3. Start the two Node.js APIs and the Node.js host for the SPA by running `npm run dev`
