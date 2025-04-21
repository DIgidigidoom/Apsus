# 🧩 AppSus

AppSus (short for *App Suite*) is a modern, minimalist web application that combines the functionality of email (Gmail-style) and notes (Google Keep-style) into one seamless experience.

Built with React, modern routing techniques, and asynchronous storage, AppSus aims to be your go-to personal productivity hub for managing communications and ideas—all in one place.

---

## ✉️ Mail + 🗒️ Notes in One Place

AppSus brings together two core features:

- **Mail** – A Gmail-inspired interface for viewing, reading, and organizing your emails.
- **Keep** – A notes feature modeled after Google Keep, perfect for jotting down ideas, todos, and reminders.


# 📬 Gmail Clone (React)

A minimalist Gmail-inspired email client built with React, featuring nested routing, modern UI, and dynamic state management using asynchronous storage services.

## 🚀 Features

- **Mail List & Mail Detail View:** Seamlessly swap between mail list and individual mail detail in the same layout space.
- **Nested Routing:** Utilizes `react-router-dom` with `<Outlet />` for intuitive and clean route transitions.
- **Async Storage:** Integrates asynchronous storage services to persist user data such as selected emails, starred status, or recent views.
- **Responsive UI:** Clean and responsive design inspired by Gmail.
- **Component-Based Architecture:** Modular React components for easy maintenance and scaling.
- **Mock Data Support:** Easily switch between mock data and real API integrations.

## 🛠️ Tech Stack

- **React**
- **React Router DOM**
- **Asynchronous Storage Services** (e.g. `localForage`, `AsyncStorage`, or custom API)
- **Tailwind CSS** (optional, if you're using it)
- **Vite / Create React App** (based on your setup)

## 📁 Project Structure



## 🧭 Routing Overview

The app uses nested routes so that both the mail list and the individual mail detail render in the same layout container.




## 💾 Async Storage Use Cases

- **Persist selected email state**
- **Starred or important flags**
- **Recent mail cache**
- **User preferences (view mode, theme, etc.)**

## 🧪 How to Run

```bash
# Clone the repo
git clone https://github.com/your-username/gmail-clone.git
cd gmail-clone

# Install dependencies
npm install

# Start the development server
npm run dev    # or npm start
