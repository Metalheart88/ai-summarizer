import React, { useContext } from 'react'
import { linkIcon } from '../assets'
import { TEST_IDS } from '../constants'
import { SummarizerContext } from './summarizer-context'

export const SearchBar: React.FC = () => {
  const {
    allArticles,
    article,
    isFetching,
    setAllArticles,
    setArticle,
    getSummary,
  } = useContext(SummarizerContext)

  const handleSubmit = async () => {
    const { data } = await getSummary({ url: article.url })

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const filteredAllArticles = allArticles.filter(
        ({ url }) => url !== article.url
      )
      const updatedAllArticles = [...filteredAllArticles, newArticle]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    handleSubmit().catch(err => console.error(err))
  }

  return (
    <form
      className='relative flex justify-center items-center'
      onSubmit={onSubmit}
    >
      <img
        src={linkIcon}
        alt='link_icon'
        className='absolute left-0 my-2 ml-3 w-5'
      />
      <input
        type='url'
        placeholder='Enter a valid URL'
        value={article.url}
        onChange={e => setArticle({ ...article, url: e.target.value })}
        required
        className='url_input peer'
        data-testid={TEST_IDS.URL_INPUT}
      />
      <button
        type='submit'
        className='submit_btn'
        data-testid={TEST_IDS.SUBMIT_BUTTON}
        disabled={isFetching}
      >
        Submit
      </button>
    </form>
  )
}
