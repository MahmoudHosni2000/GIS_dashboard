import { useState } from 'react';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('en');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [theme, setTheme] = useState('light');

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold">Account</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <hr />

            <h2 className="text-2xl font-bold">Preferences</h2>
            <div className="space-y-4">
                <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                </select>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={e => setEmailNotifications(e.target.checked)}
                    />
                    <span>Email Notifications</span>
                </label>
            </div>

            <hr />

            <h2 className="text-2xl font-bold">Appearance</h2>
            <div className="space-y-4">
                <select
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                </select>
            </div>
        </div>
    );
};

export default Settings;
