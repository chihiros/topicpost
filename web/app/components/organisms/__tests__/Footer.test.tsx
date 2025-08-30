import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Footer from '../Footer'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  ),
  NavLink: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}))

const FooterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Footer Component', () => {
  it('renders TopicPost branding', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    expect(screen.getByText('TopicPost')).toBeInTheDocument()
    expect(screen.getByText('子ども会活動をもっと楽しく')).toBeInTheDocument()
  })

  it('renders all footer links', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    // Main navigation links
    expect(screen.getByText('レクリエーション一覧')).toBeInTheDocument()
    expect(screen.getByText('新規投稿')).toBeInTheDocument()
    expect(screen.getByText('マイページ')).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
    
    // Support links
    expect(screen.getByText('利用規約')).toBeInTheDocument()
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
    expect(screen.getByText('ヘルプ')).toBeInTheDocument()
    expect(screen.getByText('サポート窓口')).toBeInTheDocument()
  })

  it('does not contain "Made with love in Japan" text', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    expect(screen.queryByText(/Made with love in Japan/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/❤️/)).not.toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} TopicPost. All rights reserved.`)).toBeInTheDocument()
  })

  it('has proper link structure', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    const recreationLink = screen.getByText('レクリエーション一覧').closest('a')
    expect(recreationLink).toHaveAttribute('href', '/recreation')
    
    const newPostLink = screen.getByText('新規投稿').closest('a')
    expect(newPostLink).toHaveAttribute('href', '/recreation/new')
    
    const privacyLink = screen.getByText('プライバシーポリシー').closest('a')
    expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  it('renders brand information', () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    )
    
    // Use partial text matching since the text spans multiple lines
    expect(screen.getByText(/全国の子ども会活動を支援する/)).toBeInTheDocument()
    expect(screen.getByText('🎯 子ども会')).toBeInTheDocument()
    expect(screen.getByText('🤝 コミュニティ')).toBeInTheDocument()
  })
})