# Mathed – Interactive Math Practice App

Mathed is a web-based math study tool designed for upper secondary / high school students, covering curriculum-aligned topics through guided tutorials and interactive exercises.

## Features

- Step-by-step math tutorials with worked examples
- Interactive problem solving with instant feedback
- Topic-based exercise generation with adjustable difficulty
- Progress tracking (local, no account required)
- Support for multiple answer formats (fractions, decimals, expressions, vectors)
- Personalized recommendations based on performance

## Supported Topics

**C-Level:**
- Arithmetic and basic number operations
- Linear and quadratic equations
- Functions and graphs
- Trigonometry
- Geometry
- Probability

**B-Level:**
- Quadratic polynomials
- Combinatorics
- Statistics
- Vectors in 2D
- Analytic geometry
- Differential calculus (introductory)

## Tech Stack

- Next.js 16
- TypeScript
- React
- Tailwind CSS
- mathjs
- Jest (testing)

## Prerequisites
- Node.js 18+

## Installation

```bash
git clone https://github.com/mikkelreuter-cloud/mathed.git
cd mathed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

Select a topic from the sidebar, read the tutorial with examples and quizzes, then practice with dynamically generated exercises. The app provides instant feedback and tracks your progress across all topics.

## Project Structure

```
app/          # Next.js App Router pages
components/   # Reusable UI components
lib/          # Core logic (generators, validators, utilities)
  generators/ # Question generation by topic
  tutorials/  # Tutorial content by topic
  validators/ # Answer checking logic
__tests__/    # Unit tests
```

## Testing

```bash
npm test        # Run unit tests
npm run build   # Build for production
```

## Roadmap

- Expand question templates (Phase 2: 80+ templates)
- Step-by-step worksheet with interactive math keypad
- Enhanced algebraic step validation
- Dark mode support
- Optional backend persistence (SQLite + Prisma)

## Contributing

Contributions are welcome. Please open an issue before submitting major changes.

## License

This project is for educational and personal use only.
All rights reserved.


## Author

Created by Mikkel Reuter
