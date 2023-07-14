import React from 'react'
import { logo } from '../assets'
import { BASE_GITHUB_URL, TEST_IDS } from '../constants'

export const Header: React.FC = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='nav_container'>
        <img src={logo} alt='sumz_logo' className='w-24 object-contain' />
        <button
          type='button'
          onClick={() =>
            window.open(
              `${BASE_GITHUB_URL}${import.meta.env.VITE_GITHUB_PROFILE_NAME}`
            )
          }
          className='black_btn'
          data-testid={TEST_IDS.GITHUB_BUTTON}
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Text with <br className='max-md:hidden' />
        <span className='green_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summarizer, an open-source text summarizer
        that transforms lengthy text into clear and concise summary
      </h2>
    </header>
  )
}
