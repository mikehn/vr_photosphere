import React, { useState, useRef, useEffect } from 'react'
import 'aframe'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getLinks } from '../services/subabase/db.service'
import { Link } from '../utils/general.type'

const Show = ({ isQ }: { isQ?: boolean }) => {
  const [image, setImage] = useState<string>('')
  const [searchParams] = useSearchParams()

  //const fileInputRef = useRef<HTMLInputElement>(null)
  const skyRef = useRef<HTMLElement | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('>>', id)

  useEffect(() => {
    if (skyRef.current) {
      let img = image
      if (isQ) {
        const url = searchParams.get('url')
        if (url) img = url
      }
      console.log('IMAGE', img)
      skyRef.current.setAttribute('src', img)
    }
  }, [image])

  useEffect(() => {
    getLinks().then((data: Link[] | null) => {
      if (data) {
        console.log('DATA', data)
        const selectedLink = data.find((link) => String(link.name) === id)
        console.log('SEL', selectedLink)
        if (!selectedLink && !isQ) navigate('/error')
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
