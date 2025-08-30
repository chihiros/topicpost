import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Help, { meta } from '../help'

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}))

describe('Help Page', () => {
  it('renders page title', () => {
    render(<Help />)
    
    expect(screen.getByText('ヘルプ')).toBeInTheDocument()
  })

  it('renders table of contents', () => {
    render(<Help />)
    
    expect(screen.getByText('📖 目次')).toBeInTheDocument()
    expect(screen.getByText('基本機能')).toBeInTheDocument()
    expect(screen.getByText('サポート')).toBeInTheDocument()
  })

  it('renders account section', () => {
    render(<Help />)
    
    expect(screen.getByText('🔑 アカウント登録・ログイン')).toBeInTheDocument()
    expect(screen.getByText('新規登録の方法')).toBeInTheDocument()
  })

  it('renders help navigation links', () => {
    render(<Help />)
    
    expect(screen.getByText('アカウント登録・ログイン')).toBeInTheDocument()
    expect(screen.getByText('レクリエーション投稿')).toBeInTheDocument()
    expect(screen.getByText('よくあるご質問')).toBeInTheDocument()
    expect(screen.getByText('トラブルシューティング')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<Help />)
    
    const pageTitle = screen.getByText('ヘルプ')
    expect(pageTitle).toBeInTheDocument()
    
    // Check for main sections
    expect(screen.getByText('📖 目次')).toBeInTheDocument()
    expect(screen.getByText('🔑 アカウント登録・ログイン')).toBeInTheDocument()
  })

  describe('meta function', () => {
    it('returns correct metadata', () => {
      const result = meta()
      
      expect(result).toEqual([
        { title: 'ヘルプ | TopicPost' },
        { name: 'description', content: 'TopicPostの使い方やよくあるご質問をご確認ください。' }
      ])
    })
  })
})