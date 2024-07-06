import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ImageLinkProps {
  imageSrc: string
  altText: string
  linkTo: string
}

const ImageLink: React.FC<ImageLinkProps> = ({ imageSrc, altText, linkTo }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const handleClick = () => {
    if (!isError) navigate(linkTo)
  }

  return (
    <div
      className="group relative mt-4 cursor-pointer overflow-hidden "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isError ? (
        <p className="text-red-600">
          Cannot load image, try to use a different link, this wont work in the
          VR viewer.
        </p>
      ) : (
        <>
          <img
            src={imageSrc}
            alt={altText}
            onError={() => setIsError(true)}
            className="h-40 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-md bg-black/50 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="rounded-md bg-purple-400/80 p-4 text-2xl font-bold text-white">
              Go to Page
            </p>
          </div>
        </>
      )}
    </div>
  )
}
export default ImageLink
