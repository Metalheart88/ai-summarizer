import React, { useContext, useState } from 'react'
import { copy, tick } from '../assets'
import { SummarizerContext } from './summarizer-context'

const COPY_ICON_UPDATE_TIME = 3000 // 3 seconds

export const SearchHistory: React.FC = () => {
  const { allArticles, setArticle } = useContext(SummarizerContext)
  const [copyUrl, setCopyUrl] = useState<string>()

  const onCopy = (url: string) => {
    setCopyUrl(url)
    navigator.clipboard.writeText(url).catch(err => console.error(err))

    // Update copy icon
    setTimeout(() => setCopyUrl(undefined), COPY_ICON_UPDATE_TIME)
  }

  const renderCopyButtonIcon = (url: string) => (copyUrl === url ? tick : copy)

  return (
    <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
      {allArticles.map((item, index) => (
        <div
          key={`article-link-${index}`}
          onClick={() => setArticle(item)}
          className='link_card'
        >
          <div className='copy_btn' onClick={() => onCopy(item.url)}>
            <img
              src={renderCopyButtonIcon(item.url)}
              alt='copy_icon'
              className='w-[40%] h-[40%] object-contain'
            />
          </div>
          <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
            {item.url}
          </p>
        </div>
      ))}
    </div>
  )
}
