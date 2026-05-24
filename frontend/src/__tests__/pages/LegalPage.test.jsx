import { render, screen } from '@testing-library/react';
import LegalPage from '../../pages/LegalPage';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('LegalPage Component', () => {
  const mockProps = {
    title: 'Privacy Policy',
    lastUpdated: 'May 2026',
    sections: [
      { heading: 'Section 1', content: 'This is the first section.' },
      { heading: 'Section 2', content: 'This is the second section.' },
    ],
  };

  test('renders title and sections correctly', () => {
    render(
      <MemoryRouter>
        <LegalPage {...mockProps} />
      </MemoryRouter>
    );

    // Check title
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Updated: May 2026/i)).toBeInTheDocument();

    // Check sections
    expect(screen.getByText(/Section 1/i)).toBeInTheDocument();
    expect(screen.getByText(/This is the first section./i)).toBeInTheDocument();
  });
});
