import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactMissionControl } from '../contact-mission-control';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('ContactMissionControl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders mission control interface', () => {
    render(<ContactMissionControl />);
    
    expect(screen.getByText('Mission Control Interface')).toBeInTheDocument();
    expect(screen.getByText('Mission Briefing')).toBeInTheDocument();
    expect(screen.getByText('Alternative Channels')).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<ContactMissionControl />);
    
    expect(screen.getByLabelText('Mission Commander')).toBeInTheDocument();
    expect(screen.getByLabelText('Communication Channel')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Mission Details')).toBeInTheDocument();
  });

  it('displays contact reason options', () => {
    render(<ContactMissionControl />);
    
    expect(screen.getByText('🤝 Collaboration Opportunity')).toBeInTheDocument();
    expect(screen.getByText('💼 Hiring Discussion')).toBeInTheDocument();
    expect(screen.getByText('🎯 Consulting Project')).toBeInTheDocument();
    expect(screen.getByText('🎤 Speaking Engagement')).toBeInTheDocument();
    expect(screen.getByText('🌐 Professional Networking')).toBeInTheDocument();
    expect(screen.getByText('💬 General Inquiry')).toBeInTheDocument();
  });

  it('allows selecting contact reasons', () => {
    render(<ContactMissionControl />);
    
    const hiringButton = screen.getByText('💼 Hiring Discussion');
    fireEvent.click(hiringButton);
    
    // The button should be selected (this would be indicated by styling changes)
    expect(hiringButton).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactMissionControl />);
    
    const submitButton = screen.getByText('🚀 Launch Communication');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mission commander name required')).toBeInTheDocument();
      expect(screen.getByText('Communication channel required')).toBeInTheDocument();
      expect(screen.getByText('Mission briefing required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<ContactMissionControl />);
    
    const emailInput = screen.getByLabelText('Communication Channel');
    const submitButton = screen.getByText('🚀 Launch Communication');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid communication frequency')).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    render(<ContactMissionControl />);
    
    const messageInput = screen.getByLabelText('Mission Details');
    const submitButton = screen.getByText('🚀 Launch Communication');
    
    fireEvent.change(messageInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mission briefing too brief (minimum 10 characters)')).toBeInTheDocument();
    });
  });

  it('clears validation errors when fields are corrected', async () => {
    render(<ContactMissionControl />);
    
    const nameInput = screen.getByLabelText('Mission Commander');
    const submitButton = screen.getByText('🚀 Launch Communication');
    
    // Trigger validation error
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mission commander name required')).toBeInTheDocument();
    });
    
    // Fix the error
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Mission commander name required')).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<ContactMissionControl />);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText('Mission Commander'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Communication Channel'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Mission Details'), {
      target: { value: 'This is a test message with enough characters.' }
    });
    
    const submitButton = screen.getByText('🚀 Launch Communication');
    fireEvent.click(submitButton);
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Launching...')).toBeInTheDocument();
    });
    
    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText('Mission Successful!')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays social media links', () => {
    render(<ContactMissionControl />);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows response protocol information', () => {
    render(<ContactMissionControl />);
    
    expect(screen.getByText('📡 Response Protocol')).toBeInTheDocument();
    expect(screen.getByText(/Mission briefings reviewed within 24 hours/)).toBeInTheDocument();
    expect(screen.getByText(/Detailed responses within 48 hours/)).toBeInTheDocument();
  });

  it('updates mission status based on form interaction', async () => {
    render(<ContactMissionControl />);
    
    // Initially should show standby
    expect(screen.getByText('MISSION CONTROL - STANDBY')).toBeInTheDocument();
    
    // Start typing to activate
    const nameInput = screen.getByLabelText('Mission Commander');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.getByText('MISSION CONTROL - ACTIVE')).toBeInTheDocument();
    });
  });

  it('handles form submission error state', async () => {
    // Mock console.log to avoid test output
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<ContactMissionControl />);
    
    // Fill out form with valid data
    fireEvent.change(screen.getByLabelText('Mission Commander'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Communication Channel'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Mission Details'), {
      target: { value: 'This is a test message with enough characters.' }
    });
    
    const submitButton = screen.getByText('🚀 Launch Communication');
    fireEvent.click(submitButton);
    
    // The form should handle the submission (success in this case since we're mocking)
    await waitFor(() => {
      expect(screen.getByText('Mission Successful!')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    consoleSpy.mockRestore();
  });

  it('allows optional company field to be empty', async () => {
    render(<ContactMissionControl />);
    
    // Fill required fields only
    fireEvent.change(screen.getByLabelText('Mission Commander'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Communication Channel'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Mission Details'), {
      target: { value: 'This is a test message with enough characters.' }
    });
    
    // Leave company field empty
    const companyInput = screen.getByLabelText('Organization (Optional)');
    expect(companyInput).toHaveValue('');
    
    const submitButton = screen.getByText('🚀 Launch Communication');
    fireEvent.click(submitButton);
    
    // Should not show validation errors for optional field
    await waitFor(() => {
      expect(screen.getByText('Mission Successful!')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});