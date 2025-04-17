const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
/////////////////////////General Imports///////////////////////////////////////
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"

////////////////////////Mail Imports//////////////////////////////////////////
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"

//////////////////////Note Imports//////////////////////////////////////////////
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                { /* Mail Routes */ }
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                
                {/* note Routes */}
                <Route path="/note" element={<NoteIndex />} />

            </Routes>
        </section>
    </Router>
}
