import ReactDOM from 'react-dom/client'
import App from './App'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
