import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Terms, { meta } from '../terms'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}))

describe('Terms of Service Page', () => {
  it('renders page title', () => {
    render(<Terms />)
    
    expect(screen.getByText('利用規約')).toBeInTheDocument()
  })

  it('renders all terms sections', () => {
    render(<Terms />)
    
    // Check for key section headings
    expect(screen.getByText('第1条（適用）')).toBeInTheDocument()
    expect(screen.getByText('第2条（利用登録）')).toBeInTheDocument()
    expect(screen.getByText('第3条（禁止事項）')).toBeInTheDocument()
  })

  it('contains service name', () => {
    render(<Terms />)
    
    // Look for TopicPost in the actual content
    expect(screen.getByText(/TopicPost.*以下「当サービス」/)).toBeInTheDocument()
  })

  it('contains service information', () => {
    render(<Terms />)
    
    expect(screen.getByText(/本規約は、TopicPost/)).toBeInTheDocument()
    expect(screen.getAllByText(/当サービス/).length).toBeGreaterThan(0)
  })

  it('has proper page structure', () => {
    render(<Terms />)
    
    const pageTitle = screen.getByText('利用規約')
    expect(pageTitle).toBeInTheDocument()
    
    // Check for main sections
    expect(screen.getByText('第1条（適用）')).toBeInTheDocument()
    expect(screen.getByText('第2条（利用登録）')).toBeInTheDocument()
  })

  it('contains prohibited activities section', () => {
    render(<Terms />)
    
    expect(screen.getByText('法令または公序良俗に違反する行為')).toBeInTheDocument()
    expect(screen.getByText('犯罪行為に関連する行為')).toBeInTheDocument()
    expect(screen.getByText(/営業、宣伝、広告、勧誘、その他営利を目的とする行為/)).toBeInTheDocument()
  })

  describe('meta function', () => {
    it('returns correct metadata', () => {
      const result = meta()
      
      expect(result).toEqual([
        { title: '利用規約 | TopicPost' },
        { name: 'description', content: 'TopicPostの利用規約をご確認ください。' }
      ])
    })
  })
})