import React, { useState, useRef, useEffect } from 'react'
import 'aframe'
import { useNavigate, useParams } from 'react-router-dom'
import { getLinks } from '../services/subabase/db.service'
import { Link } from '../utils/general.type'

const Show = () => {
  const [image, setImage] = useState<string>('')
  //const fileInputRef = useRef<HTMLInputElement>(null)
  const skyRef = useRef<HTMLElement | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('>>', id)

  useEffect(() => {
    if (skyRef.current) {
      console.log('IMAGE', image)
      skyRef.current.setAttribute('src', image)
    }
  }, [image])

  useEffect(() => {
    getLinks().then((data: Link[] | null) => {
      if (data) {
        console.log('DATA', data)
        const selectedLink = data.find((link) => String(link.name) === id)
        console.log('SEL', selectedLink)
        if (!selectedLink) navigate('/error')
        if (selectedLink) setImage(selectedLink.url)
      }
    })
  }, [id])

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       if (e.target?.result) {
  //         setImage(e.target.result as string)
  //       }
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex-1">
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-expect-error*/}
        <a-scene embedded>
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-expect-error*/}
          <a-sky ref={skyRef}></a-sky>
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-expect-error*/}
        </a-scene>
      </div>
    </div>
  )
}

export default Show
