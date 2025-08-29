import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Label from './Label'

describe('Label Component', () => {
  it('renders label text correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('applies correct HTML attributes', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })
})