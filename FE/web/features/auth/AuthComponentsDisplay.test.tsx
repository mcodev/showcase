import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AuthComponentsDisplay from './AuthComponentsDisplay';

// Mock components
jest.mock('../components/SignIn', () => () => <div>Sign In Component</div>);
jest.mock('../components/SignUp', () => () => <div>Sign Up Component</div>);
jest.mock('../components/ForgotPassword', () => () => <div>Forgot Password Component</div>);
jest.mock('../components/PinCodeVerification', () => () => <div>Pin Code Component</div>);
jest.mock('../components/PasswordChange', () => () => <div>Password Change Component</div>);

// Mock Modal
jest.mock(
  '@/components/CustomModal/CustomModal',
  () =>
    ({ children, ...props }: any) =>
      props.isVisible ? <div data-testid="custom-modal">{children}</div> : null
);

// Mock AuthSelectionProvider
jest.mock('../context/AuthSelectionProvider', () => ({ children }: any) => <>{children}</>);

// Mock useSearchParams
const mockGet = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

// Mock useModulesContext
const mockCloseAuthModal = jest.fn();
jest.mock('@/providers/ModulesProvider', () => ({
  useModulesContext: () => ({
    isAuthModalOpen: true,
    closeAuthModal: mockCloseAuthModal,
  }),
}));

describe('AuthComponentsDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SignIn component by default', () => {
    mockGet.mockReturnValue(null);

    render(<AuthComponentsDisplay />);
    expect(screen.getByTestId('custom-modal')).toBeInTheDocument();
    expect(screen.getByText('Sign In Component')).toBeInTheDocument();
  });

  it('renders the SignUp component if authModal=signUp', () => {
    mockGet.mockReturnValue('signUp');

    render(<AuthComponentsDisplay />);
    expect(screen.getByText('Sign Up Component')).toBeInTheDocument();
  });

  it('closes modal and resets component to signIn after timeout', async () => {
    jest.useFakeTimers();
    mockGet.mockReturnValue('signUp');

    render(<AuthComponentsDisplay />);
    fireEvent.click(screen.getByTestId('custom-modal')); // triggers onClose

    expect(mockCloseAuthModal).toHaveBeenCalled();

    // Fast-forward timeout
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText('Sign In Component')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
