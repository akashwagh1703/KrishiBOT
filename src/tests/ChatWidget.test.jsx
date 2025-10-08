import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatWidget from '../components/chat/ChatWidget';

// Mock the store
vi.mock('../state/store', () => ({
  useChatStore: () => ({
    messages: [],
    isTyping: false,
    addMessage: vi.fn(),
    setTyping: vi.fn()
  })
}));

// Mock the chat adapter
vi.mock('../services/chatAdapter', () => ({
  default: vi.fn().mockImplementation(() => ({
    sendMessage: vi.fn().mockResolvedValue({
      text: 'Hello! How can I help you?',
      timestamp: new Date().toISOString(),
      sender: 'bot'
    })
  }))
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chat input and send button', () => {
    render(<ChatWidget />);
    
    expect(screen.getByPlaceholderText('typeMessage')).toBeInTheDocument();
    expect(screen.getByText('send')).toBeInTheDocument();
  });

  it('allows typing in the input field', () => {
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('typeMessage');
    fireEvent.change(input, { target: { value: 'Hello bot' } });
    
    expect(input.value).toBe('Hello bot');
  });

  it('sends message when send button is clicked', async () => {
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('typeMessage');
    const sendButton = screen.getByText('send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    // Input should be cleared after sending
    expect(input.value).toBe('');
  });

  it('sends message when Enter key is pressed', async () => {
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('typeMessage');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    expect(input.value).toBe('');
  });

  it('does not send empty messages', () => {
    render(<ChatWidget />);
    
    const sendButton = screen.getByText('send');
    
    // Button should be disabled when input is empty
    expect(sendButton).toBeDisabled();
  });

  it('renders voice and attachment buttons', () => {
    render(<ChatWidget />);
    
    const voiceButton = screen.getByLabelText('Voice input');
    const attachButton = screen.getByLabelText('Attach file');
    
    expect(voiceButton).toBeInTheDocument();
    expect(attachButton).toBeInTheDocument();
  });
});