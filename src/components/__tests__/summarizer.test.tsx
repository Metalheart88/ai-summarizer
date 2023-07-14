import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BASE_URL, TEST_IDS, TEST_URL } from '../../constants'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../react-testing-utils/test-utils'
import { server } from '../../react-testing-utils/server'
import { Summarizer } from '../summarizer'

describe('summarizer', () => {
  it('should render search bar component', () => {
    render(<Summarizer />)

    const urlInput = screen.getByTestId(TEST_IDS.URL_INPUT)
    expect(urlInput).toBeEnabled()
  })

  it('should be able to submit url and render the text summary', async () => {
    const SUMMARY_TEXT = 'This is the summary of the text'

    const getSummaryHandler = rest.get(
      `${BASE_URL}/summarize`,
      (_req, res, ctx) => {
        return res(
          ctx.delay(100),
          ctx.status(200),
          ctx.json({ summary: SUMMARY_TEXT })
        )
      }
    )

    server.use(getSummaryHandler)

    render(<Summarizer />)

    const urlInput = screen.getByTestId(TEST_IDS.URL_INPUT)

    await userEvent.type(urlInput, TEST_URL)

    const submitButton = screen.getByTestId(TEST_IDS.SUBMIT_BUTTON)
    expect(submitButton).toBeEnabled()
    await userEvent.click(submitButton)

    const spinner = await screen.findByTestId(TEST_IDS.SPINNER)
    expect(spinner).toBeVisible()

    await waitForElementToBeRemoved(spinner)

    const textSummaryHeader = screen.getByTestId(TEST_IDS.TEXT_SUMMARY_HEADER)
    expect(textSummaryHeader).toBeVisible()

    const textSummaryBody = screen.getByTestId(TEST_IDS.TEXT_SUMMARY_BODY)
    expect(textSummaryBody).toHaveTextContent(SUMMARY_TEXT)
  })
})
