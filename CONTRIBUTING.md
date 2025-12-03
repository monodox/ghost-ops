# Contributing to GhostOps 👻

Thank you for your interest in contributing to GhostOps! We're excited to have you join our spooky security community.

## 🎃 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Git
- A GitHub account

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ghostops.git
   cd ghostops
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original/ghostops.git
   ```

## 🛠️ Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to http://localhost:3000

4. **Run linter**
   ```bash
   npm run lint
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🤝 How to Contribute

### Reporting Bugs

Found a bug? Please create an issue with:

- **Clear title** - Descriptive summary of the issue
- **Description** - Detailed explanation of the problem
- **Steps to reproduce** - How to recreate the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Screenshots** - If applicable
- **Environment** - OS, browser, Node version

### Suggesting Features

Have an idea? Create an issue with:

- **Feature description** - What you want to add
- **Use case** - Why it's useful
- **Proposed solution** - How it might work
- **Alternatives** - Other approaches considered

### 
Working on Issues

1. **Find an issue** - Check [open issues](https://github.com/yourusername/ghostops/issues)
2. **Comment** - Let us know you're working on it
3. **Create branch** - Use descriptive branch names
4. **Make changes** - Follow coding standards
5. **Test** - Ensure everything works
6. **Submit PR** - Follow PR guidelines

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Linter shows no errors
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### PR Guidelines

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Follow existing patterns

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Use a clear title
   - Describe your changes
   - Reference related issues
   - Add screenshots if UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### React/Next.js

- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Use Next.js App Router conventions

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme
- Maintain responsive design
- Keep accessibility in mind

### File Organization

```
src/
├── app/              # Next.js pages
├── components/       # Reusable components
│   └── ui/          # UI primitives
└── lib/             # Utilities and helpers
```

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
feat(dashboard): add haunted health score widget
fix(terminal): resolve command history bug
docs(readme): update installation instructions
style(ui): improve button hover effects
refactor(scan): optimize vulnerability detection
test(remediation): add unit tests for PR generation
chore(deps): update dependencies
```

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for good coverage
- Test edge cases

## 📚 Documentation

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date
- Use JSDoc for functions

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Updating dependencies
- Modifying configuration

## 🎨 Design Guidelines

### UI/UX

- Maintain spooky theme
- Keep interface intuitive
- Ensure accessibility
- Test on multiple devices

### Colors

- Primary: Purple (#9333ea)
- Background: Dark slate
- Accent: Ghost white
- Danger: Red
- Success: Green

## 🐛 Debugging

### Common Issues

1. **Port already in use**
   ```bash
   lsof -ti:3000 | xargs kill
   ```

2. **Module not found**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   npm run build
   ```

## 🤔 Questions?

- Check [existing issues](https://github.com/yourusername/ghostops/issues)
- Join [discussions](https://github.com/yourusername/ghostops/discussions)
- Read the [documentation](README.md)

## 🙏 Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Mentioned in release notes
- Added to contributors list

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to GhostOps!** 👻✨

Every contribution, no matter how small, helps make security more accessible and fun!
