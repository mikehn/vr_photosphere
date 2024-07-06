import React, { useState, useRef, useEffect } from 'react'
import 'aframe'

const Demo = () => {
  const [image, setImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const skyRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (skyRef.current) {
      skyRef.current.setAttribute(
        'src',
        image ||
          'https://upload.wikimedia.org/wikipedia/commons/2/2b/G%C3%BCnther-Klotz-Anlage_Panoramaplatte_Europahalle.jpg'
      )
    }
  }, [image])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex h-screen flex-col" key={image}>
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
        <div className="absolute left-4 top-4 z-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Upload 360° Image
          </button>
        </div>
      </div>
    </div>
  )
}

export default Demo
