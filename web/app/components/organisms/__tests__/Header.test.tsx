import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Header from '../Header'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  ),
  NavLink: ({ children, to, className, ...props }: any) => (
    <a href={to} className={typeof className === 'function' ? className({ isActive: false }) : className} {...props}>{children}</a>
  ),
  useFetcher: () => ({
    Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    state: 'idle',
    submit: vi.fn()
  })
}))

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Header Component', () => {
  it('renders TopicPost logo', () => {
    render(
      <HeaderWrapper>
        <Header isLoggedIn={false} />
      </HeaderWrapper>
    )
    
    expect(screen.getByText('TopicPost')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <HeaderWrapper>
        <Header isLoggedIn={false} />
      </HeaderWrapper>
    )
    
    expect(screen.getByText('レクリエーション一覧')).toBeInTheDocument()
    expect(screen.getByText('ヘルプ')).toBeInTheDocument()
  })

  it('shows login button when user is not authenticated', () => {
    render(
      <HeaderWrapper>
        <Header isLoggedIn={false} />
      </HeaderWrapper>
    )
    
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(
      <HeaderWrapper>
        <Header isLoggedIn={false} />
      </HeaderWrapper>
    )
    
    // Look for the hamburger menu button (should be the last button)
    const buttons = screen.getAllByRole('button')
    const hamburgerButton = buttons[buttons.length - 1]
    
    // Verify it's the mobile menu button by checking for the hamburger icon
    expect(hamburgerButton).toBeInTheDocument()
    expect(hamburgerButton).toHaveClass('lg:hidden')
  })

  it('renders gradient logo design', () => {
    render(
      <HeaderWrapper>
        <Header isLoggedIn={false} />
      </HeaderWrapper>
    )
    
    const logoContainer = screen.getByText('T').closest('div')
    expect(logoContainer).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-green-500')
  })
})