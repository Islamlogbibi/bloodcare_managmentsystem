# BloodCare Management System

## Overview
BloodCare is a Next.js 14 application for managing blood transfusion records, patients, and analytics. It supports Arabic, French, and English via a custom translation context (`useLanguage`).

## Features
- Patient management (add, edit, view history)
- Transfusion scheduling (today/tomorrow)
- Internationalization with dynamic UI strings
- Printable reports with localized headers
- Analytics dashboards

## Prerequisites
- Node.js >= 20
- npm (comes with Node)
- Git (optional for version control)

## Getting Started
```bash
# Clone the repository
git clone https://github.com/yourusername/bloodcare-management-system.git
cd bloodcare-management-system

# Install dependencies
npm install

# Run development server
npm run dev
```
Open `http://localhost:3000` in your browser.

## Build for Production
```bash
npm run build   # Creates an optimized production build
npm start       # Serves the built app
```

## Internationalization
The app uses a `LanguageProvider` located at `contexts/language-context.tsx`. Wrap your components with `useLanguage()` to access the `t(key)` translation function. Supported locales are defined in the `translations` object (`en`, `fr`, `ar`).

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes
4. Open a Pull Request

## License
This project is licensed under the MIT License.
