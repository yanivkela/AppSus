const { useState } = React

export function MailHeader({ criteria, setCriteria }) {
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
            <img src="../../../assets/img/gmail.svg"/>
            <span>Cmail</span>
        </div>
      <div className='search-box'>
        <div className="search-icon-container">
            <object data="../../../assets/icons/search.svg" height="22" width="22"></object>
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
    </section>
  )
}