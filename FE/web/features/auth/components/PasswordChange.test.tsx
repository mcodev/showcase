import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PasswordChange from '../components/PasswordChange';

// Mocks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('react-secure-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
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

describe('PasswordChange component', () => {
  const mockRequest = require('@/providers/ApiConnectionProvider').useApiConnection().request;
  const mockChangeComponent = require('../context/AuthSelectionProvider').useAuthContext()
    .changeSelectedComponent;
  const mockHandleUrlParam = require('../context/AuthSelectionProvider').useAuthContext()
    .handleAuthModalUrlParam;
  const mockSetNotification = require('@/components/ShowNotification/ShowNotification').default;
  const mockGetItem = require('react-secure-storage').getItem;
  const mockRemoveItem = require('react-secure-storage').removeItem;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockImplementation((key: string) =>
      key === 'userEmail' ? 'test@example.com' : 'reset-token'
    );
  });

  it('renders inputs and submit button', () => {
    render(<PasswordChange />);
    expect(screen.getByLabelText(/new_password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm_password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change/i })).toBeInTheDocument();
  });

  it('submits valid passwords and shows success message', async () => {
    mockRequest.mockResolvedValueOnce({});

    render(<PasswordChange />);
    fireEvent.change(screen.getByLabelText(/new_password/i), { target: { value: 'Passw0rd!' } });
    fireEvent.change(screen.getByLabelText(/confirm_password/i), {
      target: { value: 'Passw0rd!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /change/i }));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        service: expect.any(String),
        payload: {
          password: 'Passw0rd!',
          email: 'test@example.com',
          temporaryResetToken: 'reset-token',
        },
      });

      expect(mockSetNotification).toHaveBeenCalledWith({
        title: 'success',
        message: 'password_changed',
      });

      expect(mockRemoveItem).toHaveBeenCalledWith('userEmail');
      expect(mockRemoveItem).toHaveBeenCalledWith('temporaryResetToken');
      expect(mockHandleUrlParam).toHaveBeenCalledWith({ type: 'delete' });
      expect(mockChangeComponent).toHaveBeenCalledWith('signIn');
    });
  });

  it('handles API error and shows error message, redirects to forgot password', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'SOMETHING_WENT_WRONG' });

    render(<PasswordChange />);
    fireEvent.change(screen.getByLabelText(/new_password/i), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText(/confirm_password/i), {
      target: { value: 'Test1234!' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockSetNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'SOMETHING_WENT_WRONG',
      });

      expect(mockRemoveItem).toHaveBeenCalledTimes(2);
      expect(mockChangeComponent).toHaveBeenCalledWith('forgotPassword');
    });
  });

  it('does not submit if passwords don’t match', async () => {
    render(<PasswordChange />);
    fireEvent.change(screen.getByLabelText(/new_password/i), { target: { value: 'OnePass123' } });
    fireEvent.change(screen.getByLabelText(/confirm_password/i), {
      target: { value: 'AnotherPass' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockRequest).not.toHaveBeenCalled();
    });
  });
});
