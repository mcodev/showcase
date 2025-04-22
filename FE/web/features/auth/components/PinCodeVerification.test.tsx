import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TEMPORARY_TOKEN_KEY } from '@/common/consts';
import PinCodeVerification from '../components/PinCodeVerification';

// Mocks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
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

describe('PinCodeVerification component', () => {
  const mockRequest = require('@/providers/ApiConnectionProvider').useApiConnection().request;
  const mockSetItem = require('react-secure-storage').setItem;
  const mockGetItem = require('react-secure-storage').getItem;
  const mockChangeSelectedComponent = require('../context/AuthSelectionProvider').useAuthContext()
    .changeSelectedComponent;
  const mockHandleAuthModalUrlParam = require('../context/AuthSelectionProvider').useAuthContext()
    .handleAuthModalUrlParam;
  const mockShowNotification = require('@/components/ShowNotification/ShowNotification').default;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue('test@example.com');
  });

  it('renders pin input and submit button', () => {
    render(<PinCodeVerification />);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('enables button when input is 5 characters', () => {
    render(<PinCodeVerification />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345' } });
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('submits valid pin and stores token', async () => {
    mockRequest.mockResolvedValueOnce({ data: { temporaryResetToken: 'fakeToken' } });

    render(<PinCodeVerification />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        service: expect.any(String),
        payload: { resetCode: '12345', email: 'test@example.com' },
      });

      expect(mockSetItem).toHaveBeenCalledWith(TEMPORARY_TOKEN_KEY, 'fakeToken');
      expect(mockHandleAuthModalUrlParam).toHaveBeenCalledWith({
        type: 'set',
        param: 'changePassword',
      });
      expect(mockChangeSelectedComponent).toHaveBeenCalledWith('changePassword');
    });
  });

  it('handles invalid reset code with error notification only', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'INVALID_RESET_CODE' });

    render(<PinCodeVerification />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '54321' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'INVALID_RESET_CODE',
      });

      expect(mockChangeSelectedComponent).not.toHaveBeenCalledWith('forgotPassword');
    });
  });

  it('handles other errors by reverting to forgot password', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'NETWORK_ERROR' });

    render(<PinCodeVerification />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '99999' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'NETWORK_ERROR',
      });

      expect(mockChangeSelectedComponent).toHaveBeenCalledWith('forgotPassword');
      expect(mockHandleAuthModalUrlParam).toHaveBeenCalledWith({ type: 'delete' });
    });
  });
});
