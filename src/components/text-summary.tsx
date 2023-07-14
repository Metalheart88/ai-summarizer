import React, { useContext } from 'react'
import { SummarizerContext } from './summarizer-context'
import { TEST_IDS } from '../constants'
import { loader } from '../assets'

type ErrorMessage = {
  message: string
}

type Error = {
  data: ErrorMessage
  status: number
}

export const TextSummary: React.FC = () => {
  const { article, isFetching, error } = useContext(SummarizerContext)

  const renderContent = () => {
    if (isFetching) {
      return (
        <img
          src={loader}
          alt='loader'
          className='w-20 h-20 object-contain'
          data-testid={TEST_IDS.SPINNER}
        />
      )
    }

    if (error) {
      return (
        <p className='font-inter font-bold text-black text-center'>
          Oops! Something went wrong...
          <br />
          <span className='font-satoshi font-normal text-gray-700'>
            {(error as Error)?.data?.message}
          </span>
        </p>
      )
    }

    if (article.summary) {
      return (
        <div className='flex flex-col gap-3'>
          <h2
            className='font-satoshi font-bold text-xl'
            data-testid={TEST_IDS.TEXT_SUMMARY_HEADER}
          >
            Text Summary
          </h2>
          <div className='summary_box'>
            <p
              className='font-inter font-medium text-sm text-gray-700'
              data-testid={TEST_IDS.TEXT_SUMMARY_BODY}
            >
              {article.summary}
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='my-10 max-w-full flex justify-center items-center'>
      {renderContent()}
    </div>
  )
}
