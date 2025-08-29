# Aguka –system (Frontend)

## 📌 Overview

This is the **frontend application** of **Aguka**, a digital platform that helps community savings groups (associations) in Rwanda manage contributions, loans, and dividend sharing **transparently**.

The frontend is built with **React, TypeScript, Vite, TailwindCSS**, and communicates with the backend APIs to provide members with dashboards, notifications, and financial records.

---

## 🚀 Tech Stack

- ⚛️ **React (Vite + TypeScript)** – modern, fast frontend framework
- 🎨 **TailwindCSS** – utility-first CSS for responsive styling
- 🔗 **React Router** – client-side routing
- 🛠 **Axios / Fetch API** – API communication
- 🗂 **State Management** – React Context API / Redux Toolkit
- 🧪 **Jest + React Testing Library** – testing framework

---

## 📂 Project Structure

```bash
src/
 ┣ components/     # Reusable UI components (buttons, modals, inputs)
 ┣ features/       # Feature-based modules (loans, contributions, members)
 ┣ pages/          # Page-level components (Dashboard, Login, Register)
 ┣ routes/         # Route definitions (AppRoutes.tsx)
 ┣ services/       # API calls and external integrations
 ┣ lib/            # Utility functions, helpers
 ┣ types/          # TypeScript types & interfaces
 ┣ assets/         # Images, icons, static files
 ┣ App.tsx         # Root component
 ┗ main.tsx        # Application entry point
```
