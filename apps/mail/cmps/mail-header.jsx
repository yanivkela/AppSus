const { useState } = React

export function MailHeader({ criteria, setCriteria }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  function handleTextChange({ target }) {
    const { value } = target
    setCriteria((prevCritera) => ({ ...prevCritera, txt: value }))
  }

  function handleSelectChange({target}) {
    const {value} = target
    setCriteria((prevCritera) => ({ ...prevCritera,isRead: value}))
  }

  return (
    <section className='mail-header'>
        <div className="logo">
            <img src="assets/img/gmail.svg"/>
            <span>Cmail</span>
        </div>
      <div className='search-box'>
        <div className="search-icon-container">
            <img src="assets/icons/search.svg"/>
        </div>
        <input
          type='text'
          name='txt'
          placeholder='Search mail'
          value={criteria.txt}
          onChange={handleTextChange}
        />
        <select onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
        </select>
      </div>

      {/* <div className="menu-container">
        <div className="menu-trigger" onClick={() => {setDropdownOpen(!dropdownOpen)}}>
          <img src="assets/icons/menu.svg" alt="" />
        </div>

      </div> */}

    </section>
  )
}
