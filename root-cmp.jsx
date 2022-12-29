const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import {AppFooter} from "./cmps/app-footer.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"



export function App() {
    return <Router>
        <section className="app">
            <header className="header">
            <AppHeader />
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail/:folder/:mailId" element={<MailIndex />} />
                <Route path="/mail/:folder" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
            
            <AppFooter/>

        </section>
    </Router>
}
