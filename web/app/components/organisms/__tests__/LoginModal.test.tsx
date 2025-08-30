import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginModal from '../LoginModal'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  useFetcher: () => ({
    Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    state: 'idle',
    data: null
  })
}))

// Mock child components
vi.mock('../../atoms/InputTest', () => ({
  default: ({ name, type, placeholder, required, defaultValue }: any) => (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      data-testid={name}
    />
  )
}))

vi.mock('../../atoms/Label', () => ({
  default: ({ children, htmlFor }: any) => (
    <label htmlFor={htmlFor}>{children}</label>
  )
}))

vi.mock('../../molecules/SocialLoginButton', () => ({
  SocialLoginButton: ({ children, onClick }: any) => (
    <button onClick={onClick} type="button">
      {children}
    </button>
  )
}))

vi.mock('../../molecules/Modal', () => ({
  default: ({ isOpen, onClose, children }: any) => 
    isOpen ? (
      <div role="dialog" data-testid="login-modal">
        <button onClick={onClose} data-testid="close-modal">×</button>
        {children}
      </div>
    ) : null
}))

describe('LoginModal Component', () => {
  const mockOnClose = vi.fn()
  
  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders when isOpen is true', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByTestId('login-modal')).toBeInTheDocument()
    expect(screen.getByText('TopicPost にログイン')).toBeInTheDocument()
    expect(screen.getByText('全国の子ども会活動コミュニティへようこそ')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<LoginModal isOpen={false} onClose={mockOnClose} />)
    
    expect(screen.queryByTestId('login-modal')).not.toBeInTheDocument()
  })

  it('renders social login buttons', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('Googleでログイン')).toBeInTheDocument()
    expect(screen.getByText('GitHubでログイン')).toBeInTheDocument()
    expect(screen.getByText('Xでログイン')).toBeInTheDocument()
    expect(screen.getByText('Facebookでログイン')).toBeInTheDocument()
  })

  it('renders email login form', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    expect(screen.getByTestId('LoginEmail')).toBeInTheDocument()
    expect(screen.getByTestId('LoginPassword')).toBeInTheDocument()
  })

  it('renders login button', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })

  it('renders signup link', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('アカウントをお持ちでない方は')).toBeInTheDocument()
    expect(screen.getByText('新規登録')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    fireEvent.click(screen.getByTestId('close-modal'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('includes redirectTo in form', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} redirectTo="/mypage" />)
    
    const hiddenInput = screen.getByDisplayValue('/mypage')
    expect(hiddenInput).toHaveAttribute('name', 'redirectTo')
    expect(hiddenInput).toHaveAttribute('type', 'hidden')
  })

  it('uses default redirectTo when not provided', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    
    const hiddenInput = screen.getByDisplayValue('/')
    expect(hiddenInput).toHaveAttribute('name', 'redirectTo')
  })
})