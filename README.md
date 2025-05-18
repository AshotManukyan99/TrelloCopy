# Trello copy app with vite and react

A lightweight, opinionated starter template for building React applications with TypeScript and Vite. This project includes:

* React 18 with the new JSX transform
* TypeScript configuration optimized for Vite
* Redux Toolkit-powered state management
* Ant Design components and styling
* Styled-components for custom styles
* ESLint setup for code quality

---

## 🚀 Quick Start

### Prerequisites

* **Node.js** v20.0.0 or higher
* **Yarn** (or npm)

> **Tip:** If you use [nvm](https://github.com/nvm-sh/nvm) and your default Node.js version is below v20.11.0, run:
>
> ```bash
> nvm install 20.11.0
> nvm use 20.11.0
> ```


### Running in Development

Start the development server with hot-reload:

```bash
yarn start
# or: npm run start
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app will reload automatically when you make changes.

### Building for Production

Compile and bundle the application:

```bash
yarn build
# or: npm run build
```

This generates optimized assets in the `dist/` folder.

### Previewing the Production Build

Spin up a local server to test the production build:

```bash
yarn preview
# or: npm run preview
```

Open [http://localhost:4173](http://localhost:4173) (or the port you specify) to verify the compiled app.

---

## 🛠️ Available Scripts

| Command        | Description                               |
| -------------- | ----------------------------------------- |
| `yarn start`   | Run Vite dev server                       |
| `yarn build`   | Build for production (outputs to `dist/`) |
| `yarn preview` | Preview the built app locally             |
| `yarn lint`    | Run ESLint across the project             |

---

## 🔧 Project Structure

```
├── public/            # Static assets
├── src/               # Source files
│   ├── components/    # Shared React components
│   ├── store/         # Redux slices and store setup
│   ├── mocks/         # Mock API data
│   ├── types/         # TypeScript interfaces
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── tsconfig.json      # TypeScript config
├── vite.config.ts     # Vite config
├── .eslintrc.js       # ESLint config
└── README.md          # Project documentation
```

---

## ❤️ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

