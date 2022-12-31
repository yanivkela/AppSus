import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js"
const EMAIL_KEY = "emailDB"

const defaultCriteria = {
    status: 'inbox',
    txt: '',
    isRead: '',
    isStared: '',
}

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const defaultEmail = {
    id: null,
    subject: '',
    body: '',
    isRead: true,
    isDraft: true,
    isStared: false,
    from: 'user@appsus.com',
    to: '',
    createdAt: Date.now()
}

export const mailService = {
    query,
    defaultCriteria,
    loggedInUser,
    defaultEmail,
    save,
    remove,
    get,
    getFoldersNumber
}

const mockupEmails = [
    {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Renders the subject',
        body: `Renders the subject Renders the  subject Renders the subject subject Renders the subject
         subject Renders the subject subject Renders theRenders the subject   Renders theRenders the subject  Renders theRenders the subject`,
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Support hover state',
        body: 'Support hover state Support hover state Support hover state',
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'user@appsus.com',
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        subject: 'show the entire email',
        body: 'show the entire email show the entire email show the entire email',
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Allow filtering',
        body: 'Allow filtering Allow filtering Allow filtering',
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'user@appsus.com',
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Start with Search',
        body: 'Start with Search Start with Search Start with Search',
        isRead: true,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Use the service to ',
        body: 'Use the service to Use the service to Use the service to',
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'user@appsus.com',
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Allow keeping an email as ',
        body: 'Allow keeping an email as Allow keeping an email as Allow keeping an email as',
        isRead: false,
        isStared: false,
        sentAt: utilService.getRandomIntInclusive(Date.now()-1000*60*60*24*10, Date.now()),
        isTrash: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
]

function query(criteria = defaultCriteria) {
    return storageService.query(EMAIL_KEY).then(emails => {
        if (!emails || !emails.length) {
            emails = mockupEmails
            utilService.saveToLocalStorage(EMAIL_KEY, emails)
            return emails
        } else return emails
    }).then(emails => {
        switch (criteria.status) {
            case 'inbox':
                emails = emails.filter(email => email.to === loggedInUser.email && !email.isTrash)
                break
            case 'sent':
                emails = emails.filter(email => email.from === loggedInUser.email && !email.isDraft && !email.isTrash)
                break
            case 'trash':
                emails = emails.filter(email => email.isTrash)
                break
            case 'draft':
                emails = emails.filter(email => email.isDraft)
        }
        emails = emails.filter(email => email.subject.toLowerCase().includes(criteria.txt.toLowerCase()) || 
        email.body.toLowerCase().includes(criteria.txt.toLowerCase()) || 
        email.to.toLowerCase().includes(criteria.txt.toLowerCase()) ||
        email.from.toLowerCase().includes(criteria.txt.toLowerCase()))

        if (criteria.isRead === 'read') emails = emails.filter(email => email.isRead)
        else if (criteria.isRead === 'unread') emails = emails.filter(email => !email.isRead)
        // if (criteria.isRead) emails = emails.filter(email => email.isStared)
        if (emails.length && emails[0].sentAt) return emails.sort((a, b) => (a.sentAt - b.sentAt)*-1) 
        else if (emails.length) return emails.sort((a, b) => (a.createdAt - b.createdAt)*-1) 
        else return []
    })
}

function getFoldersNumber() {
    return storageService.query(EMAIL_KEY).then(emails => {
        const foldersNumber = {}
        foldersNumber.inbox = emails.filter(email => email.to === loggedInUser.email && !email.isTrash && !email.isRead).length
        foldersNumber.sent = emails.filter(email => email.from === loggedInUser.email && !email.isDraft && !email.isTrash && !email.isRead).length
        foldersNumber.trash = emails.filter(email => email.isTrash && !email.isRead).length
        foldersNumber.draft = emails.filter(email => email.isDraft).length
        return foldersNumber
    })
}

function save(email) {
    if (email.id) return storageService.put(EMAIL_KEY, email)
    else return storageService.post(EMAIL_KEY, email)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}