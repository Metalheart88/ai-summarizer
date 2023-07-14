import React from 'react'
import { useState, useEffect } from 'react'
import { useLazyGetSummaryQuery } from '../services/api'
import { SearchHistory } from './search-history'
import { SearchBar } from './search-bar'
import { Article, SummarizerContext } from './summarizer-context'
import { TextSummary } from './text-summary'

export const Summarizer: React.FC = () => {
  const [article, setArticle] = useState<Article>({ url: '', summary: '' })
  const [allArticles, setAllArticles] = useState<Article[]>([])

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem('articles')

    if (articlesFromLocalStorage) {
      const parsedArticlesFromLocalStorage = JSON.parse(
        articlesFromLocalStorage
      ) as Article[]

      setAllArticles(parsedArticlesFromLocalStorage)
    }
  }, [])

  return (
    <SummarizerContext.Provider
      value={{
        getSummary,
        isFetching,
        article,
        setArticle,
        allArticles,
        setAllArticles,
        error,
      }}
    >
      <section className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>
          <SearchBar />
          <SearchHistory />
        </div>
        <TextSummary />
      </section>
    </SummarizerContext.Provider>
  )
}
