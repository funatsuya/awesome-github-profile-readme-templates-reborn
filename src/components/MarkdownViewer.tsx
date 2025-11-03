// src/components/MarkdownViewer.tsx

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const templateLoaders = import.meta.glob<string>('../templates/*.md', { as: 'raw' });

const getDisplayName = (path: string) => {
    return path.split('/').pop() || path;
};

interface MarkdownViewerProps {
    selectedFile: string | null;
    repoInfo: { stars: number; forks: number } | null;
    contributorsCount: number | null;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
    selectedFile,
    repoInfo,
    contributorsCount,
}) => {
    const [markdown, setMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedFile) {
            const loader = templateLoaders[selectedFile];
            if (loader) {
                setIsLoading(true);
                loader()
                    .then((content) => setMarkdown(content))
                    .catch(console.error)
                    .finally(() => setIsLoading(false));
            }
        } else {
            setMarkdown('');
            setIsLoading(false);
        }
    }, [selectedFile]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!selectedFile) {
        const GITHUB_REPO = "funatsuya/awesome-github-profile-readme-templates-reborn";
        const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;

        return (
            <div className="welcome-screen">
                <h2>Awesome GitHub Profile README Templates Reborn</h2>
                <p>
                    A community-maintained collection of awesome GitHub profile README templates.
                    <br />
                    Select a template from the sidebar to get started!
                </p>

                <div className="welcome-stats">
                    {repoInfo && (
                        <a href={`${GITHUB_REPO_URL}/stargazers`} target="_blank" rel="noopener noreferrer">
                            <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.192L.868 6.374a.75.75 0 01.416-1.28l4.21-.612L7.327.668A.75.75 0 018 .25z"></path></svg>
                            <strong>{repoInfo.stars}</strong> Stars
                        </a>
                    )}
                    {repoInfo && (
                        <a href={`${GITHUB_REPO_URL}/forks`} target="_blank" rel="noopener noreferrer">
                            <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zM10.75 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>
                            <strong>{repoInfo.forks}</strong> Forks
                        </a>
                    )}
                    {contributorsCount !== null && (
                        <a href={`${GITHUB_REPO_URL}/graphs/contributors`} target="_blank" rel="noopener noreferrer">
                            <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path></svg>
                            <strong>{contributorsCount}</strong> Contributors
                        </a>
                    )}
                </div>

                <p className="welcome-contribution">
                    Contributions are welcome! Read the{" "}
                    <a
                        href={`${GITHUB_REPO_URL}/blob/main/CONTRIBUTING.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contribution Guidelines
                    </a>
                    {" "}
                    to add your profile.
                </p>

            </div>
        );
    }

    return (
        <>
            <div className="current-file-display">
                <img
                    src="/current-document.svg"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    style={{ marginRight: '8px', flexShrink: 0 }}
                    alt=""
                />
                {getDisplayName(selectedFile)}
            </div>

            <div className="markdown-body">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
            </div>
        </>
    );
};

export default MarkdownViewer;