import { render, screen } from '@testing-library/react';
import { DotButton } from '../../components/Landing/EmblaCarouselDotButton';

describe('DotButton Component', () => {
  test('renders children correctly', () => {
    // Render the component
    render(<DotButton>Click Me</DotButton>);

    // Find the element and assert
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<DotButton>1</DotButton>);
    
    // Creates a snapshot to track UI changes
    expect(asFragment()).toMatchSnapshot();
  });
});
