import { render, screen } from '@testing-library/react';
import LandingPage from '../../pages/LandingPage';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock all complex sub-components to keep the page test simple
vi.mock('../../components/Landing/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('../../components/Landing/Hero', () => ({ default: () => <section>Hero</section> }));
vi.mock('../../components/Landing/VisualLayers', () => ({ default: () => <section>VisualLayers</section> }));
vi.mock('../../components/Landing/Registration', () => ({ default: () => <section>Registration</section> }));
vi.mock('../../components/Landing/Locations', () => ({ default: () => <section>Locations</section> }));
vi.mock('../../components/Landing/InstagramGrid', () => ({ default: () => <section>InstagramGrid</section> }));
vi.mock('../../components/Landing/Footer', () => ({ default: () => <footer>Footer</footer> }));

describe('LandingPage', () => {
  test('renders all main sections', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('VisualLayers')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
