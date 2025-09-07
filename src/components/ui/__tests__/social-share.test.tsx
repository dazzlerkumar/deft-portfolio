import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocialShare } from '../social-share';

// Mock clipboard API
const mockClipboard = {
  writeText: vi.fn(),
};

Object.assign(navigator, {
  clipboard: mockClipboard,
});

// Mock window.open
const mockWindowOpen = vi.fn();
Object.assign(window, { open: mockWindowOpen });

describe('SocialShare', () => {
  const defaultProps = {
    url: 'https://example.com/chapter/1',
    title: 'Chapter 1: The Beginning',
    description: 'Discover the early career journey and learning milestones.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render share button', () => {
    render(<SocialShare {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('should show share menu when button is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText('Share this chapter')).toBeInTheDocument();
    });
  });

  it('should display all social platform options', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('Reddit')).toBeInTheDocument();
    });
  });

  it('should open Twitter share URL when Twitter button is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const twitterButton = screen.getByText('Twitter').closest('button');
      fireEvent.click(twitterButton!);
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open LinkedIn share URL when LinkedIn button is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const linkedinButton = screen.getByText('LinkedIn').closest('button');
      fireEvent.click(linkedinButton!);
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/sharing/share-offsite'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open Facebook share URL when Facebook button is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const facebookButton = screen.getByText('Facebook').closest('button');
      fireEvent.click(facebookButton!);
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('facebook.com/sharer/sharer.php'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open Reddit share URL when Reddit button is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const redditButton = screen.getByText('Reddit').closest('button');
      fireEvent.click(redditButton!);
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('reddit.com/submit'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should copy link to clipboard when copy button is clicked', async () => {
    mockClipboard.writeText.mockResolvedValue(undefined);
    
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const copyButton = screen.getByText('Copy Link').closest('button');
      fireEvent.click(copyButton!);
    });

    expect(mockClipboard.writeText).toHaveBeenCalledWith(defaultProps.url);
  });

  it('should show "Copied!" feedback after successful copy', async () => {
    vi.useFakeTimers();
    mockClipboard.writeText.mockResolvedValue(undefined);
    
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const copyButton = screen.getByText('Copy Link').closest('button');
      fireEvent.click(copyButton!);
    });

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    // Fast-forward time to check if feedback disappears
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
      expect(screen.getByText('Copy Link')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('should handle clipboard write failure gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockClipboard.writeText.mockRejectedValue(new Error('Clipboard not available'));
    
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const copyButton = screen.getByText('Copy Link').closest('button');
      fireEvent.click(copyButton!);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to copy link:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('should close menu when backdrop is clicked', async () => {
    render(<SocialShare {...defaultProps} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText('Share this chapter')).toBeInTheDocument();
    });

    // Click the backdrop
    const backdrop = document.querySelector('.fixed.inset-0');
    fireEvent.click(backdrop!);

    await waitFor(() => {
      expect(screen.queryByText('Share this chapter')).not.toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    const { container } = render(<SocialShare {...defaultProps} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should encode URLs properly for social platforms', async () => {
    const propsWithSpecialChars = {
      url: 'https://example.com/chapter/1?param=value&other=test',
      title: 'Chapter 1: The "Beginning" & More',
      description: 'A description with special chars: @#$%',
    };

    render(<SocialShare {...propsWithSpecialChars} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      const twitterButton = screen.getByText('Twitter').closest('button');
      fireEvent.click(twitterButton!);
    });

    const calledUrl = mockWindowOpen.mock.calls[0][0];
    expect(calledUrl).toContain(encodeURIComponent(propsWithSpecialChars.url));
    expect(calledUrl).toContain(encodeURIComponent(propsWithSpecialChars.title));
  });
});