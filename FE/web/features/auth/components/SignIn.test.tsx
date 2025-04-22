import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignIn from '../components/SignIn';

// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock showNotification
const mockNotification = jest.fn();
jest.mock('@/components/ShowNotification/ShowNotification', () => ({
  __esModule: true,
  default: (args: any) => mockNotification(args),
}));

// Mock context functions
const mockChangeSelectedComponent = jest.fn();
jest.mock('../context/AuthSelectionProvider', () => ({
  useAuthContext: () => ({
    changeSelectedComponent: mockChangeSelectedComponent,
  }),
}));

const mockCloseAuthModal = jest.fn();
jest.mock('@/providers/ModulesProvider', () => ({
  useModulesContext: () => ({
    closeAuthModal: mockCloseAuthModal,
  }),
}));

// Mock API connection
const mockRequest = jest.fn();
jest.mock('@/providers/ApiConnectionProvider', () => ({
  useApiConnection: () => ({
    request: mockRequest,
  }),
}));

describe('SignIn component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign in form', () => {
    render(<SignIn />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign_in/i })).toBeInTheDocument();
  });

  it('validates empty form submission and does not call API', async () => {
    render(<SignIn />);
    fireEvent.click(screen.getByRole('button', { name: /sign_in/i }));

    await waitFor(() => {
      expect(mockRequest).not.toHaveBeenCalled();
    });
  });

  it('submits valid form and calls API', async () => {
    mockRequest.mockResolvedValueOnce({ success: true });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign_in/i }));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        service: expect.any(String),
        payload: {
          email: 'test@example.com',
          password: 'Password123',
        },
      });
      expect(mockCloseAuthModal).toHaveBeenCalled();
    });
  });

  it('handles API error correctly', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'login_failed' });

    render(<SignIn />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'invalidpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign_in/i }));

    await waitFor(() => {
      expect(mockNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'login_failed',
      });
    });
  });

  it('switches to forgot password on link click', () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText(/forgot_password/i));
    expect(mockChangeSelectedComponent).toHaveBeenCalledWith('forgotPassword');
  });

  it('switches to sign up on link click', () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText(/sign_up/i));
    expect(mockChangeSelectedComponent).toHaveBeenCalledWith('signUp');
  });
});
