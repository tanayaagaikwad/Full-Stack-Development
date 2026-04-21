# CampusConnect

CampusConnect is a MERN stack application that combines:

- a College Informational Portal
- a Used Item Marketplace with Booking
- a Student Feedback System

The project is split into `client/` and `server/` as required.

## Folder Structure

```text
assign 5 6 7/
|-- client/
|   |-- src/
|   |   |-- api.js
|   |   |-- constants.js
|   |   |-- components/
|   |   |   |-- Home.js
|   |   |   |-- Marketplace.js
|   |   |   |-- Booking.js
|   |   |   `-- Feedback.js
|   |   |-- App.js
|   |   |-- App.css
|   |   `-- index.css
|   `-- package.json
`-- server/
    |-- models/
    |   |-- User.js
    |   |-- Item.js
    |   |-- Booking.js
    |   `-- Feedback.js
    |-- routes/
    |   |-- college.js
    |   |-- items.js
    |   |-- bookings.js
    |   `-- feedback.js
    |-- server.js
    `-- package.json
```

## Phase 1: Environment Setup

Backend:

```bash
cd server
npm install express mongoose cors dotenv
npm start
```

Frontend:

```bash
cd client
npm install axios react-router-dom
npm start
```

Optional server `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/campusconnect
```

## Phase 2: Data Flow Logic

1. A React component triggers an event such as `onSubmit` or `onClick`.
2. Axios sends a request to the Express backend.
3. Express routes receive the request and create/query Mongoose models.
4. Mongoose validates the payload using schema rules.
5. MongoDB stores or retrieves the document.
6. Express returns JSON back to the frontend.
7. React updates the UI using `useState` and `useEffect`.

Examples in this project:

- `Marketplace.js` posts ads to `POST /api/items`
- `Booking.js` reserves lab slots through `POST /api/bookings`
- `Feedback.js` posts reviews to `POST /api/feedback` and refreshes course reviews through `GET /api/feedback`

## Phase 3: Regional Language Integration

Regional language support is implemented through [`client/src/constants.js`](client/src/constants.js), with English and Marathi labels.

Example structure:

```js
const content = {
  en: { welcome: "Welcome to Computer Engineering Department" },
  mr: { welcome: "संगणक अभियांत्रिकी विभागात आपले स्वागत आहे" }
};
```

The app-level toggle switches labels across the portal, marketplace, booking, and feedback pages.

## Phase 4: Testing and Screenshots

Capture these screenshots for submission:

1. MongoDB Compass showing `items` and `feedbacks` collections
2. Postman showing a successful `GET /api/college/info`
3. Browser home page with faculty cards and academic calendar
4. Browser marketplace page with a listed used item such as a used bike
5. Browser feedback page with a course review
6. Browser booking modal after reserving a lab slot

## MongoDB Schema Summary

### Users

```js
{
  name: String,
  email: String,
  role: "Student" | "Admin"
}
```

### Items

```js
{
  name: String,
  description: String,
  price: Number,
  category: "Book" | "Bike" | "Electronics",
  sellerID: ObjectId,
  status: "Available" | "Sold"
}
```

### Bookings

```js
{
  labID: String,
  studentID: ObjectId,
  timeslot: String,
  date: Date
}
```

### Feedback

```js
{
  subject: String,
  rating: Number,
  comment: String,
  timestamp: Date
}
```

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/college/info` | Return department and faculty information |
| POST | `/api/items` | List a new used item |
| GET | `/api/items` | Fetch available marketplace items |
| POST | `/api/bookings` | Reserve a lab slot |
| POST | `/api/feedback` | Submit student feedback |
| GET | `/api/feedback?subject=Data%20Structures` | Fetch feedback for a course |

## Frontend Modules

### Home / Landing Page

- professional department hero section
- academic calendar timeline
- faculty profile cards
- shared language toggle

### Marketplace Dashboard

- grid view for listed items
- `Post Ad` form
- `Buy` button on each card

### Booking Modal

- modal-based lab reservation form
- date picker and timeslot selector
- duplicate-slot protection from the backend

### Review System

- star-rating input
- comment box
- instant UI update using React state after submit

## Verification Completed

- `node --check server.js`
- `npm run build` in `client/`
