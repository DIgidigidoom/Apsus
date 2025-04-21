# 🧩 AppSus

AppSus (short for *App Suite*) is a modern, minimalist web application that combines the functionality of email (Gmail-style) and notes (Google Keep-style) into one seamless experience.

Built with React, modern routing techniques, and asynchronous storage, AppSus aims to be your go-to personal productivity hub for managing communications and ideas—all in one place.

---

## ✉️ Mail + 🗒️ Notes in One Place

AppSus brings together two core features:

- **Mail** – A Gmail-inspired interface for viewing, reading, and organizing your emails.
- **Keep** – A notes feature modeled after Google Keep, perfect for jotting down ideas, todos, and reminders.


# 📬 Gmail Clone (by Tom Shahar)

A minimalist Gmail-inspired email client built with React, featuring nested routing, modern UI, and dynamic state management using asynchronous storage services.

## 🚀 Features

- **Mail List & Mail Detail View:** Seamlessly swap between mail list and individual mail detail in the same layout space.
- **Nested Routing:** Utilizes `react-router-dom` with `<Outlet />` for intuitive and clean route transitions.
- **Async Storage:** Integrates asynchronous storage services to persist user data such as selected emails, starred status, or recent views.
- **Responsive UI:** Clean and responsive design inspired by Gmail.
- **Component-Based Architecture:** Modular React components for easy maintenance and scaling.
- **Mock Data Support:** Easily switch between mock data and real API integrations.

# 🗒️ Google Keep Clone (React)

A fully functional Google Keep-style note-taking app, crafted with attention to usability and smooth user experience.

## ✨ Features

- **Add Notes:** Create notes of various types — text, image, or todo list — using a single intuitive input field.
- **Note Types:** 
  - **Text notes** – just write and hit Enter.
  - **Image notes** – add an image via URL.
  - **Todo notes** – manage task lists with checkboxes and titles.
- **Edit Notes:** Open a modal to edit any note, with a custom editor that matches the note type.
- **Search & Filter:** Search notes by title or content using a live search input.
- **Color Picker:** Change the background color of each note from a customizable palette.
- **Pin Notes:** Pin important notes to keep them at the top of the grid.
- **Duplicate Notes:** Instantly duplicate any note with a single click.
- **Responsive Layout:** Notes are displayed in a clean grid layout inspired by Google Keep.
- **Dynamic UI:** Real-time updates using React’s state and effect hooks.
- **Local Storage:** Notes are stored in localStorage and persist across sessions.

## 🧠 Tech Highlights

- React (useState, useEffect, useRef)
- Modular component structure (NotePreview, NoteModal, AddNote, NoteTodos, etc.)
- Dynamic rendering based on note type
- Styled with custom CSS (Keep-style UI)
- Query Params integration for better UX

## 🎨 Example Note Types

- `NoteTxt`: "Meeting with team at 10am"
- `NoteImg`: image URL with caption
- `NoteTodos`: todo list with optional completed tasks


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
