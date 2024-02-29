import { type News } from '@/type'
import { getDay } from '@/utils/gettimedata'
import NewsIcon from '@/public/icons/news-icon.png'
import Image from 'next/image'
import { ComponentHeader } from '../ComponentHeader'
import Link from 'next/link'
import OpenLink from '@/public/icons/open-link.png'
import { useState } from 'react'

interface NewsComponentProps {
  news: News
}

const NewsComponent: React.FC<NewsComponentProps> = ({
  news
}: NewsComponentProps) => {
  const [hover, setHover] = useState(false)

  const isToday = (someDate: string): boolean => {
    const today = new Date()
    const date = new Date(someDate)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  return (
    <div className="component-container" style={{ height: '180px' }}>
      <ComponentHeader title="Country News" icon={NewsIcon} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          paddingBottom: '27px'
        }}>
        <div>
          <div
            style={{
              fontSize: '1.2rem',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            {news.title}
          </div>
          <Link legacyBehavior href={news.url}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setHover(true)
              }}
              onMouseLeave={() => {
                setHover(false)
              }}
              style={{ display: 'flex', width: 'fit-content' }}>
              <span style={{ textDecorationLine: hover ? 'underline' : '' }}>
                {'View Article '}
              </span>
              <Image src={OpenLink} alt="Open Link" height={20} />
            </a>
          </Link>
        </div>
        <div style={{ color: 'lightgrey', fontWeight: 'lighter' }}>
          {isToday(news.publishedAt) ? 'Today' : getDay(news.publishedAt)} at{' '}
          {news.publishedAt.split('T')[1].split(':')[0]}:
          {news.publishedAt.split('T')[1].split(':')[1]}
        </div>
      </div>
    </div>
  )
}

export default NewsComponent
