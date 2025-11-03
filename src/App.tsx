import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';

const GITHUB_REPO = "funatsuya/awesome-github-profile-readme-templates-reborn";

interface RepoInfo {
  stars: number;
  forks: number;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [contributorsCount, setContributorsCount] = useState<number | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.stargazers_count !== undefined) {
          setRepoInfo({ stars: data.stargazers_count, forks: data.forks_count });
        }
      })
      .catch(console.error);

    fetch(`https://api.github.com/repos/${GITHUB_REPO}/contributors?anon=true&per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContributorsCount(data.length);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      if (isDarkMode) {
        appContainer.classList.add('dark-mode');
      } else {
        appContainer.classList.remove('dark-mode');
      }
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);


  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
    setIsMenuOpen(false);
  };

  const showWelcomeScreen = () => {
    setSelectedFile(null);
    setIsMenuOpen(false);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-left">
          <button
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-icon"></span>
          </button>
          <h1 onClick={showWelcomeScreen} style={{ cursor: 'pointer' }}>
            <span className="title-long">Awesome Github Profile README Templates Reborn</span>
            <span className="title-short">AGPRTR</span>
          </h1>
        </div>

        <div className="header-right">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <img src="/light-mode.svg" alt="Switch to light mode" />
            ) : (
              <img src="/dark-mode.svg" alt="Switch to dark mode" />
            )}
          </button>
        </div>
      </header>

      <aside className={`app-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <Sidebar
          onFileSelect={handleFileSelect}
          onShowWelcome={showWelcomeScreen}
        />
      </aside>

      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      <main className="app-content">
        <MarkdownViewer
          selectedFile={selectedFile}
          repoInfo={repoInfo}
          contributorsCount={contributorsCount}
        />
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Trade Agency. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;