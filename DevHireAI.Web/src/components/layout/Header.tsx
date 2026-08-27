import React from 'react';
import { Cpu, ShieldCheck, BookOpen, Users, Sparkles } from 'lucide-react';

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    return (
        <header className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <div className="logo-icon">
                        <Cpu size={24} />
                    </div>
                    <span className="logo-text">DevHire<span className="gradient-text">.AI</span></span>
                </div>

                <nav className="nav-links">
                    <button
                        className={`nav-btn ${activeTab === 'ats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ats')}
                    >
                        <ShieldCheck size={17} /> ATS Optimizer
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'cheatsheet' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cheatsheet')}
                    >
                        <BookOpen size={17} /> Interview Prep
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        <Users size={17} /> Match Leaderboard
                    </button>
                </nav>

                <div className="status-pill">
                    <Sparkles size={14} /> Enterprise AI Active
                </div>
            </div>
        </header>
    );
};
