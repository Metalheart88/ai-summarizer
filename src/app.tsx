import { Header } from './components/header'
import { Summarizer } from './components/summarizer'
import './app.css'

export const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className='app'>
        <Header />
        <Summarizer />
      </div>
    </main>
  )
}
