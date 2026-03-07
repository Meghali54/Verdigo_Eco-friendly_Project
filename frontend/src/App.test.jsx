import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component Baseline Test', () => {
  it('renders the application without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
