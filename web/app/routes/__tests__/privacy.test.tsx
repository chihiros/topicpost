import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Privacy, { meta } from '../privacy'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}))

describe('Privacy Policy Page', () => {
  it('renders page title', () => {
    render(<Privacy />)
    
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
  })

  it('renders all privacy policy sections', () => {
    render(<Privacy />)
    
    // Check for key section headings
    expect(screen.getByText('1. 基本方針')).toBeInTheDocument()
    expect(screen.getByText('2. 収集する情報')).toBeInTheDocument()
    expect(screen.getByText('3. 情報の利用目的')).toBeInTheDocument()
    expect(screen.getByText('4. 情報の第三者提供')).toBeInTheDocument()
    expect(screen.getByText('5. 情報の管理・保護')).toBeInTheDocument()
    expect(screen.getByText('6. Cookieについて')).toBeInTheDocument()
  })

  it('renders additional sections', () => {
    render(<Privacy />)
    
    expect(screen.getByText('7. ユーザーの権利')).toBeInTheDocument()
    expect(screen.getByText('8. 外部サービスとの連携')).toBeInTheDocument()
    expect(screen.getByText('9. 未成年者の個人情報')).toBeInTheDocument()
    expect(screen.getByText('10. プライバシーポリシーの変更')).toBeInTheDocument()
    expect(screen.getByText('11. お問い合わせ')).toBeInTheDocument()
  })

  it('contains contact information', () => {
    render(<Privacy />)
    
    expect(screen.getByText('TopicPost サポート窓口')).toBeInTheDocument()
    expect(screen.getByText('Email: support@topicpost.net')).toBeInTheDocument()
  })

  it('contains effective date', () => {
    render(<Privacy />)
    
    expect(screen.getByText(/制定日：2024年1月1日/)).toBeInTheDocument()
    expect(screen.getByText(/最終改定日：2024年8月30日/)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<Privacy />)
    
    const pageTitle = screen.getByText('プライバシーポリシー')
    expect(pageTitle).toBeInTheDocument()
    
    // Check for main content sections
    expect(screen.getByText('1. 基本方針')).toBeInTheDocument()
    expect(screen.getByText('TopicPost サポート窓口')).toBeInTheDocument()
  })

  describe('meta function', () => {
    it('returns correct metadata', () => {
      const result = meta()
      
      expect(result).toEqual([
        { title: 'プライバシーポリシー | TopicPost' },
        { name: 'description', content: 'TopicPostのプライバシーポリシーをご確認ください。' }
      ])
    })
  })
})