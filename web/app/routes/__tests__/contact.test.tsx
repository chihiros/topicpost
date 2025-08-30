import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Contact, { meta, loader } from '../contact'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  useLoaderData: () => ({
    googleFormUrl: 'https://docs.google.com/forms/d/e/test-form-id-123/viewform'
  }),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}))

// Mock environment variable
Object.defineProperty(process, 'env', {
  value: {
    ...process.env,
    CONTACT_GOOGLE_FORM_ID: 'test-form-id-123'
  }
})

describe('Contact Page', () => {
  it('renders page title', () => {
    render(<Contact />)
    
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('renders main description', () => {
    render(<Contact />)
    
    expect(screen.getByText(/TopicPostに関するご質問やご要望がございましたら/)).toBeInTheDocument()
    expect(screen.getByText(/下記のフォームからお気軽にお問い合わせください/)).toBeInTheDocument()
  })

  it('renders pre-contact guidance', () => {
    render(<Contact />)
    
    expect(screen.getByText('📋 お問い合わせ前にご確認ください')).toBeInTheDocument()
    expect(screen.getByText(/よくある質問につきましては/)).toBeInTheDocument()
    expect(screen.getByText('ヘルプページ')).toBeInTheDocument()
  })

  it('renders contact form section', () => {
    render(<Contact />)
    
    expect(screen.getByText('📝 お問い合わせフォーム')).toBeInTheDocument()
  })

  it('renders email contact information', () => {
    render(<Contact />)
    
    expect(screen.getByText('📧 その他の連絡方法')).toBeInTheDocument()
    expect(screen.getByText('メールでのお問い合わせ')).toBeInTheDocument()
    expect(screen.getAllByText('support@topicpost.net')).toHaveLength(2)
    expect(screen.getByText('平日 9:00-17:00')).toBeInTheDocument()
  })

  it('renders support team information', () => {
    render(<Contact />)
    
    expect(screen.getByText('🤝 TopicPost サポートチーム')).toBeInTheDocument()
    expect(screen.getByText(/全国の子ども会活動をサポートするため/)).toBeInTheDocument()
  })

  it('renders frequently asked questions section', () => {
    render(<Contact />)
    
    expect(screen.getByText('❓ よくお問い合わせいただく内容')).toBeInTheDocument()
    expect(screen.getByText('パスワードを忘れた')).toBeInTheDocument()
    expect(screen.getByText('投稿の編集・削除')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<Contact />)
    
    const pageContainer = screen.getByText('お問い合わせ')
    expect(pageContainer).toBeInTheDocument()
    
    // Check for main container structure
    const whiteContainer = screen.getByText('📋 お問い合わせ前にご確認ください').closest('.bg-white')
    expect(whiteContainer).toBeInTheDocument()
  })

  describe('meta function', () => {
    it('returns correct metadata', () => {
      const result = meta()
      
      expect(result).toEqual([
        { title: 'お問い合わせ | TopicPost' },
        { name: 'description', content: 'TopicPostに関するお問い合わせはこちらから。ご質問やご要望をお聞かせください。' }
      ])
    })
  })

  describe('loader function', () => {
    it('returns Google Form ID from environment', async () => {
      const request = new Request('http://localhost:3000/contact')
      const result = await loader({ request, params: {}, context: {} })
      const data = await result.json()
      
      expect(data.googleFormId).toBe('test-form-id-123')
    })
  })
})