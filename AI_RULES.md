# AI Development Rules for Joule Academy Landing Page

This document outlines the technology stack and provides clear guidelines for making changes to this web application. Following these rules ensures consistency, maintainability, and adherence to the project's architectural principles.

## Tech Stack

This is a modern, lightweight web application built with the following technologies:

-   **Framework:** React with TypeScript for building a type-safe, component-based user interface.
-   **Build Tool:** Vite is used for fast development and optimized production builds.
-   **Styling:** Tailwind CSS is used for all styling. A custom theme with CSS variables is defined in `index.html` to ensure a consistent design system (light and dark modes).
-   **State Management:** Local component state is managed with React Hooks (`useState`, `useEffect`). Global state, such as theme switching, is handled by React's Context API (`ThemeContext`).
-   **Icons:** A set of custom SVG icon components is available in `src/components/icons.tsx`.
-   **Animations:** Animations are implemented using CSS transitions and keyframes. A custom `useIntersectionObserver` hook is used to trigger animations on scroll.
-   **Architecture:** The application is a single-page landing page, composed of multiple reusable components located in the `src/components` directory.

## Library and Coding Rules

To maintain code quality and simplicity, please adhere to the following rules:

1.  **Styling:** **Only use Tailwind CSS** for styling. All colors, fonts, and spacing are configured in `index.html` via CSS variables. Do not write custom CSS files or use other styling libraries.
2.  **Icons:** **Use the existing icon components** from `src/components/icons.tsx`. Do not add external icon libraries like `lucide-react` or `react-icons`. If a new icon is needed, create it as a new SVG component in that file.
3.  **State Management:** For simple, component-level state, use the built-in `useState` and `useEffect` hooks. For global state that needs to be shared across the application, extend the existing React Context setup. **Do not add state management libraries** like Redux or Zustand.
4.  **Components:** Keep components small, focused, and reusable. All components should be placed in the `src/components` directory.
5.  **Dependencies:** **Avoid adding new third-party libraries** unless absolutely necessary. The goal is to keep the project lightweight and maintainable. If a feature can be built with the existing stack, that is the preferred approach.
6.  **Routing:** The application is currently a single page and does not have a router. If routing becomes necessary, use `react-router-dom`.
7.  **Code Style:** Follow the existing code style for consistency. Use functional components with TypeScript and adhere to modern React best practices.