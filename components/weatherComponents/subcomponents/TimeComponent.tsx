import React, { useEffect, useState } from 'react'

interface TimeComponentProps {
  timezone: string
}

const TimeComponent: React.FC<TimeComponentProps> = (
  props: TimeComponentProps
) => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <p>
        {time
          ? time.toLocaleTimeString('en-US', { timeZone: props.timezone })
          : 'Loading...'}
      </p>
    </div>
  )
}

export default TimeComponent
