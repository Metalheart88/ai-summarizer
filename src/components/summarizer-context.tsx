import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { createContext } from 'react'
import { SummaryQueryParams, SummaryResponse } from '../services/api'
import { SerializedError } from '@reduxjs/toolkit'

export type Article = {
  url: string
  summary: string
}

type SummarizerContextValue = {
  getSummary: LazyQueryTrigger<
    QueryDefinition<
      SummaryQueryParams,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      never,
      SummaryResponse,
      'textApi'
    >
  >
  isFetching: boolean
  article: Article
  setArticle: React.Dispatch<React.SetStateAction<Article>>
  allArticles: Article[]
  setAllArticles: (value: React.SetStateAction<Article[]>) => void
  error: FetchBaseQueryError | SerializedError | undefined
}

// @ts-expect-error we don't want to set default values
export const SummarizerContext = createContext<SummarizerContextValue>({})
