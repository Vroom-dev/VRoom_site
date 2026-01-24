# Contributing to VRoom

Thank you for your interest in contributing to VRoom! This document provides guidelines and instructions for getting started.

## Code of Conduct

- **Be respectful**: Treat all community members with respect and kindness
- **Safety first**: Our top priority is rider safety; all contributions should align with this philosophy
- **Inclusive**: We welcome contributors of all backgrounds and experience levels
- **Constructive**: Provide helpful, actionable feedback on pull requests and issues

## How to Contribute

### 1. **Report Bugs**
Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Device info (Android version, phone model)
- Relevant logs/screenshots

### 2. **Suggest Features**
Have an idea? Open a feature request with:
- Clear problem statement
- Proposed solution
- Alternative approaches considered
- Use cases / user stories

### 3. **Improve Documentation**
- Fix typos or clarify explanations
- Add examples or tutorials
- Improve architecture documentation
- Update README sections

### 4. **Code Contributions**

#### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Vroom4.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Set up development environment:
   ```bash
   cd android
   ./gradlew build
   ```

#### Before You Start
- Read the [Architecture Documentation](../docs/ARCH_stack_audit.md)
- Review the [Project Knowledge Base](../docs/REF_project_knowledge.md)
- Check [open issues](https://github.com/Datanal/Vroom4/issues) for ongoing work
- Join [discussions](https://github.com/Datanal/Vroom4/discussions) to ask questions

#### Development Guidelines

**Code Style**
- Follow Kotlin conventions
- Use meaningful variable/function names
- Add comments for complex logic
- Keep functions focused and testable

**Android Specifics**
- Target API 26+ (Android 8+)
- Use Jetpack Compose for new UI
- Respect battery and privacy constraints
- Test on real devices when possible

**Module Structure**
```
core/
  ├── common/      # Shared utilities
  ├── location/    # GPS tracking
  ├── map/         # Map provider abstraction
  ├── voice/       # Voice recognition
  └── nlu/         # NLU engine

data/
  ├── local/       # Room entities & DAOs
  └── repository/  # Repository implementations

domain/
  ├── models/      # Business entities
  └── repositories/# Repository interfaces

ui/               # Compose screens & ViewModels
```

#### Git Workflow
1. Create descriptive commit messages:
   ```
   feat: add voice command for speed cameras
   docs: update installation guide
   fix: improve GPS accuracy filtering
   ```

2. Keep commits atomic (one logical change per commit)

3. Push to your fork: `git push origin feature/your-feature-name`

4. Create a Pull Request with:
   - Clear title and description
   - Reference related issues
   - Screenshot/video for UI changes
   - Testing notes

#### Testing
- Write unit tests for business logic
- Test on multiple Android versions (minimum API 26)
- Test on real devices (not just emulator)
- Include edge cases and error conditions

### 5. **Translating**
VRoom currently has Italian voice support. Help us expand:
- Voice keyword mappings for new languages
- UI translations
- Documentation localization

## Pull Request Process

1. **Ensure quality**
   - Code compiles without warnings
   - Tests pass: `./gradlew test`
   - No breaking changes without discussion

2. **Describe your changes**
   - What problem does this solve?
   - How did you test it?
   - Any considerations for other modules?

3. **Update documentation**
   - Update relevant .md files
   - Add comments to complex code
   - Update CHANGELOG if applicable

4. **Be patient**
   - Reviews may take time
   - Feedback is collaborative, not critical
   - We may suggest improvements

## Development Roadmap

Current priorities (as of Jan 2026):
- ✅ **Phase 1**: MVP (complete)
- 🔄 **Phase 2**: Group sessions (ready)
- 🏗️ **Phase 3-5**: Analytics & ML (designing)

Consider checking the [roadmap section](../README.md#-development-roadmap) for what we're working on.

## Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Ask questions and discuss ideas
- **Architecture Docs**: Deep dives into technical decisions

## Recognition

Contributors are recognized in:
- [CONTRIBUTORS.md](../CONTRIBUTORS.md) (coming soon)
- GitHub contributors page
- Release notes for significant contributions

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).

---

**Thank you for making VRoom better!** 🏍️

Your contributions help us build a safer, smarter riding experience for everyone.
