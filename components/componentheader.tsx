import Image, { type StaticImageData } from 'next/image'

interface ComponentHeaderProps {
  title: string
  icon: StaticImageData
}

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  title,
  icon
}: ComponentHeaderProps) => {
  return (
    <div style={{ display: 'flex', opacity: '0.8' }}>
      <Image src={icon} alt="Icon" width={25} /> {title}
    </div>
  )
}
