import userEvent from '@testing-library/user-event'
import { BASE_GITHUB_URL, TEST_IDS } from '../../constants'
import { render, screen } from '../../react-testing-utils/test-utils'
import { Header } from '../header'

window.open = vi.fn()

describe('header', () => {
  it('should be able to click GitHub link and navigate to website', async () => {
    render(<Header />)

    const spy = vi.spyOn(window, 'open')

    const githubButton = screen.getByTestId(TEST_IDS.GITHUB_BUTTON)
    expect(githubButton).toBeEnabled()
    await userEvent.click(githubButton)

    expect(spy).toBeCalledWith(
      `${BASE_GITHUB_URL}${import.meta.env.VITE_GITHUB_PROFILE_NAME}`
    )
  })
})
