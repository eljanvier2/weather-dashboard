import React, { useState } from 'react'
import Link from 'next/link'
import { type City } from '@/type'

interface CityButtonProps {
  city: City
}

const CityButton: React.FC<CityButtonProps> = (props: CityButtonProps) => {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={`/weatherpage?lat=${props.city.latitude}&lon=${props.city.longitude}&city=${props.city.name}&timezone=${props.city.timezone}&country=${props.city.country_code}`}>
      <div
        className="button"
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        style={hover ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : {}}>
        {props.city.name}
      </div>
    </Link>
  )
}

export default CityButton
