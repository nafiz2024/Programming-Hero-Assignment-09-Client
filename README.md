# DriveFleet

DriveFleet is a modern full-stack car rental platform where users can explore verified cars, book rides with custom dates, and manage their own car listings and bookings.

## Live Site

Client URL: [https://drivefleet-nu.vercel.app](https://drivefleet-nu.vercel.app)

## Highlights

- Secure authentication with email/password and Google sign-in.
- Protected routes for `Add Car`, `My Bookings`, and `My Added Cars`.
- Smart car exploration with search and car-type filtering.
- Detailed car page with booking, edit, and delete options.
- Booking form includes driver need, pickup date, drop-off date, and note.
- Automatic total booking price calculation based on rental days.
- User-wise data visibility for bookings and added cars.
- Fully responsive UI across mobile, tablet, and desktop.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Better Auth
- MongoDB
- React Toastify
- HeroUI

## Project Pages

- `/` - Home
- `/explore-car` - Explore all cars
- `/explore-car/[id]` - Single car details
- `/add-car` - Add new car (protected)
- `/my-bookings` - Current user's bookings (protected)
- `/my-added-cars` - Current user's added cars (protected)
- `/signin` - Sign in
- `/signup` - Sign up

## Getting Started Locally

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open in your browser:

```text
http://localhost:3000
```

## Notes

- This project uses token-based requests for protected backend endpoints.
- UI is designed with a clean orange/blue visual identity for rental workflow clarity.
