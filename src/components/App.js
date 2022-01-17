import React, { useEffect } from 'react'
import '../style.css'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import ContackForm from './contactForm/ContactForm'
import Filter from './Filter/Filter'
import ContactList from './ContactList/ContactList'

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('Контакты')) || [],
  )
  const [filter, setFilter] = useState('')

  const submitForm = ({ name, number }) => {
    if (test(name.toLowerCase())) {
      return alert(`${name} уже есть`)
    }

    setContacts((contacts) => [
      ...contacts,
      {
        id: nanoid(),
        names: name,

        number: number,
      },
    ])
  }
  const changeFilter = (e) => {
    setFilter(e.target.value)
  }
  const clickDelete = (e) => {
    setContacts((prevstate) => prevstate.filter((contact) => contact.id !== e))
  }

  const test = (data) => {
    return contacts.some((item) => {
      return item.names.toLowerCase() === data
    })
  }

  useEffect(() => {
    localStorage.setItem('Контакты', JSON.stringify(contacts))
  })

  const visibal = contacts.filter((contact) => {
    return contact.names.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <>
      <ContackForm submitForm={submitForm} />

      <Filter value={filter} onChange={changeFilter} />

      <ContactList visibal={visibal} click={clickDelete} />
    </>
  )
}

export default App
