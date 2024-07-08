import { useEffect, useState } from "react";

const App = () => {
    const [versions, setVersions] = useState({
        node: '',
        chrome: '',
        electron: ''
    });

    useEffect(() => {
        setVersions({
            node: window.versions.node(),
            chrome: window.versions.chrome(),
            electron: window.versions.electron(),
        });
    }, []);

    return (
        <div>
            <h1>Hello, Electron with Vite!</h1>
            <div id="chrome-version">Chrome version: {versions.chrome}</div>
            <div id="node-version">Node version: {versions.node}</div>
            <div id="electron-version">Electron version: {versions.electron}</div>
        </div>
    );
};

export default App;