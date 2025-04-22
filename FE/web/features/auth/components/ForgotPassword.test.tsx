import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ForgotPassword from '../components/ForgotPassword';

// Mocks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/en/auth',
}));

jest.mock('react-secure-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@/components/ShowNotification/ShowNotification', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/providers/ApiConnectionProvider', () => ({
  useApiConnection: () => ({
    request: jest.fn(),
  }),
}));

jest.mock('../context/AuthSelectionProvider', () => ({
  useAuthContext: () => ({
    changeSelectedComponent: jest.fn(),
    handleAuthModalUrlParam: jest.fn(),
  }),
}));

describe('ForgotPassword component', () => {
  const mockRequest = require('@/providers/ApiConnectionProvider').useApiConnection().request;
  const mockChangeComponent = require('../context/AuthSelectionProvider').useAuthContext()
    .changeSelectedComponent;
  const mockHandleUrlParam = require('../context/AuthSelectionProvider').useAuthContext()
    .handleAuthModalUrlParam;
  const mockSetItem = require('react-secure-storage').setItem;
  const mockSetNotification = require('@/components/ShowNotification/ShowNotification').default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email input and submit button', () => {
    render(<ForgotPassword />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send_reset_code/i })).toBeInTheDocument();
  });

  it('submits valid email and navigates to reset code verification', async () => {
    mockRequest.mockResolvedValueOnce({});

    render(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send_reset_code/i }));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        service: expect.any(String),
        payload: {
          email: 'test@example.com',
          language: 'en',
        },
      });

      expect(mockSetItem).toHaveBeenCalledWith('userEmail', 'test@example.com');
      expect(mockHandleUrlParam).toHaveBeenCalledWith({
        type: 'set',
        param: 'verifyResetCode',
      });
      expect(mockChangeComponent).toHaveBeenCalledWith('verifyResetCode');
    });
  });

  it('shows error notification on failure', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'EMAIL_NOT_FOUND' });

    render(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send_reset_code/i }));

    await waitFor(() => {
      expect(mockSetNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'EMAIL_NOT_FOUND',
      });
    });
  });

  it('prevents submission if email is empty or invalid', async () => {
    render(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send_reset_code/i }));

    await waitFor(() => {
      expect(mockRequest).not.toHaveBeenCalled();
    });
  });

  it('navigates to SignIn when link is clicked', () => {
    render(<ForgotPassword />);
    const signInText = screen.getByText(/sign_in/i);
    fireEvent.click(signInText);
    expect(mockChangeComponent).toHaveBeenCalledWith('signIn');
  });
});
