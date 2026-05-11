import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPanel from '../../pages/AdminPanel';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock ToastContext
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

// Mock child components to keep tests focused
vi.mock('../../components/Admin/BonusEntryForm', () => ({ default: () => <div>BonusEntryForm</div> }));
vi.mock('../../components/Admin/WebsiteLinksForm', () => ({ default: () => <div>WebsiteLinksForm</div> }));
vi.mock('../../components/Admin/LocationEditor', () => ({ default: () => <div>LocationEditor</div> }));
vi.mock('../../components/Admin/RewardsManager', () => ({ default: () => <div>RewardsManager</div> }));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { useAuth } from '../../context/AuthContext';

describe('AdminPanel Page', () => {
  const mockAdmin = { first_name: 'Admin', role: 'admin' };
  const mockCustomer = { first_name: 'Customer', role: 'customer' };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }));
  });

  test('redirects non-admin users to home', () => {
    useAuth.mockReturnValue({ user: mockCustomer, token: 'fake-token' });

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('renders sidebar and header for admin users', () => {
    useAuth.mockReturnValue({ user: mockAdmin, token: 'fake-token' });

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Directory/i)).toBeInTheDocument();
  });

  test('switches tabs via sidebar', () => {
    useAuth.mockReturnValue({ user: mockAdmin, token: 'fake-token' });

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    const staffHubBtn = screen.getByText(/Staff Service Hub/i);
    fireEvent.click(staffHubBtn);

    // Header title should update
    expect(screen.getAllByText(/Staff Service Hub/i).length).toBeGreaterThan(1);
    // Sub-component should render
    expect(screen.getByText(/BonusEntryForm/i)).toBeInTheDocument();
  });

  test('filters user list via search', async () => {
    const mockUsers = [
      { id: 1, first_name: 'Alice', email: 'alice@test.com', points_balance: 100 },
      { id: 2, first_name: 'Bob', email: 'bob@test.com', points_balance: 200 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    useAuth.mockReturnValue({ user: mockAdmin, token: 'fake-token' });

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getAllByText(/Alice/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Bob/i)[0]).toBeInTheDocument();
    });

    // Type into search
    const searchInput = screen.getByPlaceholderText(/Search membership/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    // Bob should be filtered out
    expect(screen.getAllByText(/Alice/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Bob/i)).not.toBeInTheDocument();
  });
});
