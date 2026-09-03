# Next.js Project Exam 2

This is the final exam of that focuses on the general knowledge of React library within Next.js. The task was to build a working venues booking website, using modern solutions and knowledge gained throughout the courses.

![Image of the upper part of the website](/img-readme.jpg)

Explore the website by visiting the link - [PROD INC](https://js-frameworkca.netlify.app/)

## Key Features

- Build on Next.js with TypeScript
- Register as user or venue manager
- Zod for all form validation
- Venu detail pages with a date picker for availability
- Paginated venues listing, 10 per page
- Manager can book stays and view their upcoming bookings
- User can book stays and view their upcoming stay

## Tech Stack

- Language = TypeScript 5
- Framework = Next.js 16 + React 19
- State = Zustand
- Forms = React Hook Form 7 + Zod 4
- Styling = Tailwind CSS 4
- Date picking: @daypicker/react
- API = Noroff Holidaze
- Hosting = Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Nikita-stud/Project-Exam2
```

2. Install the dependencies:

```bash
npm install
```

3. Run the dependencies:

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Starts the Next.js dev server
- `npm run build` - Compiles TypeScript and bundles the app for production
- `npm run start` - Serves the production build locally for testing
- `npm run lint` - Runs ESLint

### Script Details

```json
  "scripts": {
    "dev": "rm -rf .next && next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
```

### Environment Variables

```
NEXT_PUBLIC_NOROFF_API_KEY=[yourNoroffToken]
```

### Contact

You can always contact us though official Noroff portal

@Nikita-stud
