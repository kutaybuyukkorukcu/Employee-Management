# Employee Management System

## Overview

This project was developed as to demonstrate employee management solution using LitElement and modern web standards. It includes a reusable component library, state management, internationalization, and a full-featured application for managing employee records.

## Features

### Component Library

- **Button**: Customizable button components with various styles
- **Card**: Flexible card layouts for displaying content
- **Dialog**: Modal dialogs for user interactions
- **Header**: Application header with navigation
- **Icon**: SVG icon system with customizable icons
- **Input**: Form input components with validation
- **Pagination**: Data pagination controls
- **Select**: Dropdown selection components
- **Table**: Data table with sorting and filtering
- **Text**: Typography components

### Technical Features

- **JavaScript (ES2022)**: Modern JavaScript with modules and latest features
- **CSS**: Custom properties and modern CSS features, building a complete design system
- **Modern Normalize**: Modern CSS reset and normalization
- **Routing**: Utilized vaadin/router library for the client-side routing, fully implemented dynamic import and loader resolvers
- **State Management**: Centralized store for application state using Zustand
- **Internationalization (i18n)**: Support for English and Turkish languages using i18next
- **Testing**: Comprehensive test suite using web-test-runner
- **Prettier**: Code formatting

## Architecture & Component Organization

This project follows an **atomic design-inspired architecture** adapted for web components, though not implemented in its purest form due to time constraints. The organization draws inspiration from atomic design principles while maintaining practicality for a component-based web application.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── controllers/        # Application controllers
├── i18n/               # Internationalization setup
├── pages/              # Application pages
├── patterns/           # Higher-level component patterns
├── store/              # State management
├── styles/             # CSS stylesheets
└── utils/              # Utility functions

test/                   # Test files
public/                 # Static assets and data
```

## Test Coverage

**Overall Coverage: 85.58%**

All 12 different test files are passing successfully. For detailed coverage reports, please check out `coverage/` folder or view `coverage/lcov-report/index.html`.

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run serve
```

Open http://localhost:8000 in your browser.

### Testing

```bash
npm test
```

## Acknowledgments

Built on the LitElement starter template, this project demonstrates modern web component development practices and provides a solid foundation for enterprise applications.

## 📄 License
This project is licensed under the MIT License.
