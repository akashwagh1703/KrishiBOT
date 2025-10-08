import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '../components/ui/ThemeToggle';

// Mock the store
const mockToggleTheme = vi.fn();
vi.mock('../state/store', () => ({
  useThemeStore: () => ({
    isDark: false,
    toggleTheme: mockToggleTheme
  })
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document classes
    document.documentElement.className = '';
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('shows sun icon in light mode', () => {
    render(<ThemeToggle />);
    
    // In light mode, should show moon icon (to switch to dark)
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('applies dark class to document when isDark is true', () => {
    // Mock isDark as true
    vi.mocked(vi.importMock('../state/store')).useThemeStore.mockReturnValue({
      isDark: true,
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);
    
    // Should apply dark class to document
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document when isDark is false', () => {
    // Start with dark class
    document.documentElement.classList.add('dark');
    
    render(<ThemeToggle />);
    
    // Should remove dark class
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});