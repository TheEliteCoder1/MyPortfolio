import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

const project = {
  title: 'Portfolio Website',
  image: '/images/portfolio.png',
  link_url: 'https://example.com/portfolio',
  link_text: 'View project',
  description: 'A full-stack portfolio built with MERN.',
  role: 'Full-stack developer',
  outcome: 'Deployed to production',
};

// Helper: matches a <p> whose full text equals `text` (avoids ambiguous matches
// between the <p>, the <strong> inside it, and the parent card).
const paragraphWith = text =>
  screen.getByText((_, el) => el.tagName === 'P' && el.textContent === text);

describe('ProjectCard', () => {
  test('renders the project details passed in as props', () => {
    render(<ProjectCard {...project} />);
    expect(screen.getByRole('heading', { name: 'Portfolio Website' })).toBeInTheDocument();
    expect(paragraphWith('A full-stack portfolio built with MERN.')).toBeInTheDocument();
    expect(paragraphWith('My role: Full-stack developer')).toBeInTheDocument();
    expect(paragraphWith('Outcome: Deployed to production')).toBeInTheDocument();
  });

  test('gives the screenshot meaningful alt text and the correct src', () => {
    render(<ProjectCard {...project} />);
    const img = screen.getByAltText('Screenshot of Portfolio Website');
    expect(img).toHaveAttribute('src', '/images/portfolio.png');
  });

  test('renders a link with the provided URL and text that opens in a new tab', () => {
    render(<ProjectCard {...project} />);
    const link = screen.getByRole('link', { name: 'View project' });
    expect(link).toHaveAttribute('href', 'https://example.com/portfolio');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('updates when new props are passed (behaviour across re-renders)', () => {
    const { rerender } = render(<ProjectCard {...project} />);
    rerender(
      <ProjectCard
        {...project}
        title="Second Project"
        description="A different description."
        link_text="Open"
      />
    );
    expect(screen.getByRole('heading', { name: 'Second Project' })).toBeInTheDocument();
    expect(paragraphWith('A different description.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open' })).toBeInTheDocument();
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument();
  });
});