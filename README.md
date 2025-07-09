# DearthFunk Remake

A modern React application built with TypeScript, Webpack, and React Router.

## Features

- **React 18** with TypeScript support
- **Webpack 5** for bundling and development
- **React Router** for client-side routing
- **ESM modules** for modern JavaScript
- **Hot Module Replacement** for fast development
- **Responsive design** with mobile-first approach

## Project Structure

```
dearthfunk.remake/
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.html
│   └── styles.css
├── webpack.config.js
├── tsconfig.json
├── tsconfig.check.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dearthfunk.remake
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Building

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Type Checking

Run TypeScript type checking:
```bash
npm run type-check
```

### Development Mode

Run webpack in development mode with file watching:
```bash
npm run dev
```

## Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page with form
- `*` - 404 Not Found page

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Webpack](https://webpack.js.org/) - Module bundler
- [React Router](https://reactrouter.com/) - Client-side routing
- [Babel](https://babeljs.io/) - JavaScript compiler

## License

ISC
