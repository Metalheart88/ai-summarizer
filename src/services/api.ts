import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

export type SummaryResponse = {
  summary: string
}

export type SummaryQueryParams = {
  url: string
}

const rapidApiKey = import.meta.env.VITE_RAPID_API_TEXT_KEY

export const textApi = createApi({
  reducerPath: 'textApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    prepareHeaders: headers => {
      headers.set('X-RapidAPI-Key', rapidApiKey)
      headers.set(
        'X-RapidAPI-Host',
        'article-extractor-and-summarizer.p.rapidapi.com'
      )

      return headers
    },
  }),
  endpoints: builder => ({
    getSummary: builder.query<SummaryResponse, SummaryQueryParams>({
      query: params =>
        `/summarize?url=${encodeURIComponent(params.url)}&length=3`,
    }),
  }),
})

export const { useLazyGetSummaryQuery } = textApi
