import { render, screen, waitFor } from '@testing-library/react';
import SignUpLogin from '../../pages/SignUpLogin';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

// Mock ToastContext
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

import { useAuth } from '../../context/AuthContext';

describe('SignUpLogin Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    useAuth.mockReturnValue({ isAuthenticated: false, user: null });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders logo and login form', () => {
    render(
      <MemoryRouter>
        <SignUpLogin />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Kem Boi Logo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Log In/i)[0]).toBeInTheDocument();
  });

  test('redirects admin user to /admin', async () => {
    useAuth.mockReturnValue({ 
      isAuthenticated: true, 
      user: { role: 'admin' } 
    });

    render(
      <MemoryRouter>
        <SignUpLogin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  test('fetches social links on mount', async () => {
    const mockLinks = {
      facebook: 'fb.com/test',
      instagram: 'ig.com/test',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockLinks,
    });

    render(
      <MemoryRouter>
        <SignUpLogin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/social_links');
    });
  });
});
