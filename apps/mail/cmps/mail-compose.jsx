const { useState, useEffect, useRef } = React
const{ useSearchParams} = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose({saveDraft, sendMail , onDeleteMail , setIsCompose}) {
    const [emailToEdit, setEmailToEdit] = useState(mailService.defaultEmail)
    const [searchParams, setSearchParams] = useSearchParams()
    const intervalId  = useRef()

    useEffect(() => {
        const compose = searchParams.get('compose')
        if (compose && compose !== 'new') mailService.get(compose).then(setEmailToEdit)
        else if (compose) setEmailToEdit(mailService.defaultEmail)
    },[searchParams])

    useEffect(() => {
        
        intervalId.current = setInterval(() => {
            saveDraft(emailToEdit).then(returnedDraft => {
                setEmailToEdit(returnedDraft)
                setSearchParams({compose: returnedDraft.id})
            })
        }, 5000)
        return () => {clearInterval(intervalId.current)}
    },[saveDraft,emailToEdit])

    function handleChange({target}) {
        const {value, name: field} = target
        setEmailToEdit(prevEmailToEdit => ({...prevEmailToEdit,[field]:value}))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        sendMail(emailToEdit)
    }

    function onDeleteDraft(ev) {
        onDeleteMail(ev, emailToEdit)
        setIsCompose(false)
    }

    return <section className="mail-compose">
        <div className="header"><div>{emailToEdit.subject ? emailToEdit.subject : 'New Message'}</div>
        <div className="exit-compose" onClick={() => setIsCompose(false)}>X</div></div>
        <form onSubmit={onSendMail}>
        <div className="input-container">
            <input type="text" 
            name="to" 
            placeholder="To"
            value={emailToEdit.to}
            onChange={handleChange}
            />
        </div>
        <div className="input-container">
            <input type="text" 
            name="subject" 
            placeholder="Subject"
            value={emailToEdit.subject}
            onChange={handleChange}
            />
        </div>
        <div className="body-input-container">
            <textarea type="text" 
            name="body" 
            value={emailToEdit.body}
            onChange={handleChange}
            />
        </div>
        <div className="actions">
            <button className="send-btn">Send</button>
            <div onClick={onDeleteDraft} className="trash-icon-container"><object className="trash-icon" data="../../../assets/icons/trash.svg" height="15" width="15"></object></div>
        </div>
        </form>
    </section>
}