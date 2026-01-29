import React from 'react'

function Button({
  Btntext,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props // are for other properties
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} h-auto cursor-pointer  hover:scale-[1.04] transition-all duration-300 ease-in-out w-20 `} {...props}>
      {/* {Btntext} */}
    </button>
  )
}

export default Button