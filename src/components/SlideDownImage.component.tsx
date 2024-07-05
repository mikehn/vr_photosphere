import React, { useState } from 'react'

interface SlideDownImageProps {
  imageSrc: string
  altText: string
  className?: string
}

const SlideDownImage: React.FC<SlideDownImageProps> = ({
  imageSrc,
  altText,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={
        className +
        ' fixed bottom-0 flex justify-center transition-transform duration-500 ease-in-out'
      }
      style={{
        transform: isHovered ? 'translateY(100%)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 1200)}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="h-40 max-w-md object-cover md:h-auto md:w-full"
      />
    </div>
  )
}

export default SlideDownImage
