# 🤖 AI Assistant Portfolio

A modern, interactive portfolio website showcasing Lionel Hu's work as a software engineer. Built with Next.js, TypeScript, and powered by OpenAI for an intelligent chat experience.

## ✨ Features

- **Interactive AI Chat**: Chat with an AI assistant that knows about Lionel's background, skills, and projects
- **Photography Gallery**: Browse photography collections from various locations around the world
- **Responsive Design**: Beautiful UI that works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Modern Tech Stack**: Built with the latest web technologies for optimal performance

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **HeroUI** - Modern React components
- **Framer Motion** - Smooth animations and transitions

### Backend & AI

- **OpenAI API** - Powers the intelligent chat assistant
- **Next.js API Routes** - Serverless backend functions
- **EmailJS** - Contact form functionality

### Development Tools

- **ESLint & Prettier** - Code formatting and linting
- **Turbopack** - Fast bundling and development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- OpenAI API key (for chat functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/33lenoil/ai-assistant.git
   cd ai-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ai-assistant/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/chat/          # Chat API endpoint
│   │   ├── chat/              # Chat page
│   │   ├── contact/           # Contact page
│   │   ├── photography/       # Photography gallery
│   │   ├── portfolio/         # Portfolio showcase
│   │   ├── resume/            # Resume page
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   ├── data/                  # Static data files
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   ├── images/               # Photography and profile images
│   └── Lionel_Hu_Resume.pdf  # Resume PDF
└── ...config files
```

## 🤖 AI Chat Assistant

The AI chat assistant is powered by OpenAI's GPT-4o-mini model and has been specifically trained on Lionel's:

- Professional background and experience
- Technical skills and expertise
- Project portfolio and achievements
- Educational background

### Chat Features

- **Context-Aware**: Understands questions about Lionel's work and background
- **Repository Links**: Can provide relevant GitHub repository links for projects
- **Professional Tone**: Maintains a friendly yet professional conversation style
- **Rate Limited**: Implements smart conversation limits for optimal performance

## 📸 Photography Gallery

The photography section showcases collections from various locations:

- Alaska
- Canada
- Chicago
- China (Guangzhou, Qinggan)
- Peru
- Puerto Rico
- Utah
- And more...

Features include:

- **Responsive Image Gallery**: Optimized loading with Next.js Image component
- **Location-Based Organization**: Photos organized by travel destinations
- **Smooth Navigation**: Intuitive browsing experience

## 🎨 Customization

### Themes

The application supports both light and dark themes with automatic system preference detection. Theme switching is handled by `next-themes`.

### Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **HeroUI Components**: Pre-built, customizable React components
- **Custom Color Schemes**: Carefully chosen color palettes for optimal readability

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **LinkedIn**: [https://www.linkedin.com/in/lionel-hu/](https://www.linkedin.com/in/lionel-hu/)
- **GitHub**: [https://github.com/33lenoil](https://github.com/33lenoil)
- **Email**: lionelhu33@gmail.com

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API that powers the chat assistant
- **Vercel** for the amazing Next.js framework and hosting platform
- **HeroUI** for the beautiful, accessible React components
- **Tailwind CSS** for the utility-first styling approach

---

**Built with ❤️ by Lionel Hu**
