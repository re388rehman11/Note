// src/components/HomeFeatures.js
import React from 'react';
import './App.scss'; // Create a new SCSS file for styling
import { Link } from 'react-router-dom'; 
const HomeFeatures = () => {
    return (
        <div className="home-features">
            <section className="hero">
                <h1>Get started</h1>
                <h2>The most powerful note-taking tool</h2>
                <p>
                    Evernote brings your notes, tasks, and schedule together to keep you focused and organized all day long.
                </p>
                <Link to="../NoteList/AddNote" className="btn btn-dark">Add Notes</Link> 
           
            </section>

            <div className="features-grid">
                <Feature
                    icon="📌" // You can replace with actual icon components
                    title="Capture what matters"
                    description="Take note of what's important for you."
                />
                <Feature
                    icon="🧹"
                    title="Clean up your notes"
                    description="Use our powerful AI tools to structure and summarize your notes."
                />
                <Feature
                    icon="⏰"
                    title="Never miss a deadline"
                    description="Keep track of your important deadlines with your to-do-lists."
                />
                <Feature
                    icon="📝"
                    title="Use our templates"
                    description="Use and customize our +100 templates."
                />
            </div>

            <section className="overview">
                <h2>Dive into your day</h2>
                <p>
                    Home shows you the information you need, when you need it, so you can start your day with a clear view—and less stress.
                </p>
            </section>

            <section className="calendar-integration">
                <h2>Make your calendar work for you</h2>
                <p>
                    Connect Evernote and Google Calendar and bring your schedule and notes together to make the most of every moment.
                </p>
            </section>

            <section className="testimonial">
                <h2>Stacey, Evernote Certified Expert</h2>
                <p>
                    Evernote is a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. All you have to do is use it.
                </p>
                <p>- Stacey Harmon</p>
            </section>

            <section className="web-clipper">
                <h2>Your ‘save’ button for the web</h2>
                <p>
                    Use Web Clipper to save the important things you find online. Clip web pages, articles, or PDFs and keep them in Evernote—searchable, and stored forever.
                </p>
            </section>

            <section className="search-features">
                <h2>Search less, do more</h2>
                <p>
                    Find exactly what you need, when you need it. Look inside images and documents, and save search terms for quicker access.
                </p>
            </section>

            <section className="paperless">
                <h2>Go paperless</h2>
                <p>
                    From instruction manuals and warranty information to boarding passes and receipts, relax knowing they’re always handy if you need them later.
                </p>
            </section>

            <section className="integrations">
                <h2>Designed to fit your workflow</h2>
                <p>
                    Evernote integrates with your favorite apps like Google Drive, Slack, and Microsoft Teams so you can be more productive from brainstorm to execution.
                </p>
            </section>
        </div>
    );
};

const Feature = ({ icon, title, description }) => (
    <div className="feature">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default HomeFeatures;
