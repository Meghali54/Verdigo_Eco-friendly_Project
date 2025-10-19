# Contributing to VerdiGo 🌱

First off, thank you for considering contributing to VerdiGo! It's people like you that make VerdiGo such a great tool for environmental awareness and action.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Git
- A GitHub account

### First Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/verdi-go.git
   cd verdi-go
   ```
3. **Add the original repository** as upstream:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/verdi-go.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** after following the steps
- **Explain which behavior you expected** to see instead and why
- **Include screenshots and animated GIFs** if possible
- **Include your environment details** (OS, browser, Node.js version)

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the enhancement
- **Describe the current behavior** and explain the improvement
- **Explain why this enhancement would be useful**

### 🔧 Code Contributions

#### Good First Issues

Look for issues labeled `good first issue` or `beginner-friendly`. These are specifically chosen to be approachable for newcomers.

#### Areas We Need Help

- **Frontend Components**: New UI components or improving existing ones
- **Backend APIs**: New endpoints or optimizing existing ones
- **Documentation**: Improving or adding documentation
- **Testing**: Writing unit tests or integration tests
- **Accessibility**: Making the app more accessible
- **Performance**: Optimizing app performance
- **Mobile Responsiveness**: Improving mobile experience

## Development Setup

### Environment Setup

1. **Create environment files**:

   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Start development servers**:

   ```bash
   # Terminal 1 - Backend (port 3001)
   cd backend
   PORT=3001 node index.js

   # Terminal 2 - Frontend (port 3000)
   cd frontend
   npm run dev
   ```

### Development Workflow

1. **Create a new branch** for your feature/fix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our style guidelines

3. **Test your changes** thoroughly

4. **Commit your changes** using conventional commits:

   ```bash
   git commit -m "feat: add carbon offset calculation feature"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Pull Request Process

### Before Submitting

- [ ] Check that your code follows our style guidelines
- [ ] Run the linter and fix any issues: `npm run lint`
- [ ] Test your changes manually
- [ ] Update documentation if needed
- [ ] Add or update tests if applicable

### PR Requirements

1. **Title**: Use a clear and descriptive title
2. **Description**: Include:
   - What changes you made and why
   - Link to any related issues
   - Screenshots/GIFs for UI changes
   - Testing instructions

3. **Checklist**: Complete the PR checklist template

### Review Process

1. At least one maintainer will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge your PR

## Style Guidelines

### Code Style

#### JavaScript/React

- Use ES6+ features
- Follow ESLint configuration
- Use functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistency with existing design
- Use semantic class names

#### File Structure

- Place components in appropriate directories
- Use PascalCase for component files
- Use camelCase for utility files
- Keep files focused and small when possible

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**

```
feat: add carbon footprint calculator for transportation
fix: resolve map rendering issue on mobile devices
docs: update installation instructions
style: format components with prettier
refactor: simplify authentication logic
```

## Issue Guidelines

### Bug Reports

Use the bug report template and include:

- **Environment**: OS, browser, Node.js version
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable

### Feature Requests

Use the feature request template and include:

- **Problem description**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches you've thought of
- **Additional context**: Any other relevant information

## Recognition

Contributors will be recognized in:

- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

## Questions?

Feel free to ask questions by:

- Creating a discussion on GitHub
- Joining our Discord community
- Reaching out to maintainers

---

Thank you for contributing to VerdiGo! Together, we can build tools that help create a more sustainable future. 🌍💚
