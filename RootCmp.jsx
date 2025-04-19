const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
/////////////////////////General Imports///////////////////////////////////////
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"

////////////////////////Mail Imports//////////////////////////////////////////
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { AddMail } from "./apps/mail/cmps/AddMail.jsx"
//////////////////////Note Imports//////////////////////////////////////////////
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { NoteDetails } from "./apps/note/pages/NoteDetails.jsx"






export function App() {
    return <Router>
        <section className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                { /* Mail Routes */}
                <Route path="/mail/*" element={<MailIndex />}/>
                <Route path="/mail/:mailId" element={<MailIndex />} /> 
                

                {/* note Routes */}
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/details" element={<NoteDetails />} />
            </Routes>
            <AppFooter />
        </section>
        
    </Router>
}
