import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLinks } from '../services/subabase/db.service'
import SlideDownImage from '../components/SlideDownImage.component'

interface Image {
  id: number
  name: string
  url: string
}

const PersonCard: React.FC<Image> = ({ name, url }) => (
  <Link to={`/show/${name}`} className="block w-full">
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
      <div className="aspect-video">
        <img src={url} alt={name} className="size-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className="truncate text-xl font-semibold text-purple-800">
          {name}
        </h2>
      </div>
    </div>
  </Link>
)

const LinksGrid: React.FC = () => {
  const [links, setLinks] = useState<Image[]>([])
  useEffect(() => {
    getLinks().then((data) => {
      if (data) setLinks(data)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-main mb-6 text-center text-3xl font-bold text-white sm:mb-8 sm:text-5xl">
          {"Vered's Gallery"}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {links.map((link) => (
            <div key={link.id} className="flex justify-center">
              <div className="w-full max-w-sm">
                <PersonCard {...link} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlideDownImage altText="home" imageSrc="/home.png" className="right-0" />
      {/* <img
        src="/home.png"
        alt="error"
        className="fixed bottom-0 right-0 h-20 md:h-60"
      /> */}
    </div>
  )
}

// Example usage
const Home: React.FC = () => {
  return <LinksGrid />
}

export default Home
