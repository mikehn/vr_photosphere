import React, { useState, useEffect } from 'react'
import { TABLE, getLinks, supabase } from '../services/subabase/db.service'
import { Link } from '../utils/general.type'
import { Link as LinkR } from 'react-router-dom'
import SlideDownImage from '../components/SlideDownImage.component'
import ImageLink from '../components/ImageLink.component'

const AdminPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    //const storedLinks = localStorage.getItem(TABLE)
    getLinks().then((data) => {
      if (data) {
        console.log(data)
        setLinks(data)
      }
    })
    //if (storedLinks) {
    //setLinks(JSON.parse(storedLinks))
    //}
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('links', JSON.stringify(links))
  // }, [links])

  const addLink = () => {
    if (name && url) {
      supabase.from(TABLE).insert({ name, url }).then(console.log)

      setLinks([...links, { id: Date.now(), name, url }])
      setName('')
      setUrl('')
    }
  }

  const updateLink = () => {
    if (editId !== null) {
      supabase
        .from(TABLE)
        .update({ name, url })
        .eq('id', editId)
        .then(console.log)
      setLinks(
        links.map((link) =>
          link.id === editId ? { id: editId, name, url } : link
        )
      )
      setEditId(null)
      setName('')
      setUrl('')
    }
  }

  const deleteLink = (id: number) => {
    supabase.from(TABLE).delete().eq('id', id).then(console.log)
    setLinks(links.filter((link) => link.id !== id))
  }

  const editLink = (link: Link) => {
    setEditId(link.id)
    setName(link.name)
    setUrl(link.url)
  }

  return (
    <div className="min-h-screen w-full items-center justify-center bg-gradient-to-br from-purple-600 to-pink-400 p-8">
      <div className="mx-auto flex w-fit gap-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-purple-700">
          Admin Page
        </h1>
        <LinkR to="/">
          <button className="mb-6 w-20 rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
            Home
          </button>
        </LinkR>
      </div>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-purple-600">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-purple-600">
            URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button
          onClick={editId !== null ? updateLink : addLink}
          className="w-full rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-pink-600"
        >
          {editId !== null ? 'Update Link' : 'Add Link'}
        </button>
      </div>
      <div className="mx-auto mt-8 max-w-lg">
        {links.reverse().map((link) => (
          <div
            key={link.id}
            className="mb-4 flex flex-col rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-lg font-semibold text-purple-700">
                  {link.name}
                </p>
                <a
                  href={link.url}
                  className="text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.url}
                </a>
              </div>
              <div className="ml-4 mt-4 flex space-x-2">
                <button
                  onClick={() => editLink(link)}
                  className="rounded-lg bg-purple-500 px-2 py-1 text-white transition-colors hover:bg-purple-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteLink(link.id)}
                  className="rounded-lg bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
              <ImageLink
                altText={link.name}
                imageSrc={link.url}
                linkTo={`/show/${link.name}`}
              />
            </div>
          </div>
        ))}
      </div>
      <SlideDownImage
        altText="home"
        imageSrc="/home2.png"
        className="right-0"
      />
    </div>
  )
}

export default AdminPage
