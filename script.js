// Calcetix Calculator - Following Lunotes Brand Guidelines
// Beautiful calculator made simple - by Lunetix

// App Version
const CALCETIX_VERSION = '1.0.0';
const CALCETIX_BUILD = 'Initial Release';
const CALCETIX_RELEASE_DATE = 'December 2025';

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.history = JSON.parse(localStorage.getItem('calcetix-history')) || [];
        this.soundEnabled = JSON.parse(localStorage.getItem('calcetix-sound')) !== false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        
        this.updateDisplay();
        this.playSound('button');
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        const calculation = `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand)}`;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
            case '-':
                computation = prev - current;
                break;
            case '×':
            case '*':
                computation = prev * current;
                break;
            case '÷':
            case '/':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case 'pow':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        // Handle very large or very small numbers
        if (!isFinite(computation)) {
            this.showError('Result too large');
            return;
        }

        // Round to avoid floating point precision issues
        computation = Math.round((computation + Number.EPSILON) * 100000000) / 100000000;
        
        // Add to history
        this.addToHistory(calculation, computation);
        
        // Play sound
        this.playSound('compute');
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    showError(message) {
        this.currentOperand = 'Error';
        this.previousOperand = message;
        this.operation = undefined;
        this.updateDisplay();
        
        // Clear error after 2 seconds
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand === '') {
            this.currentOperandTextElement.innerText = '0';
        } else if (this.currentOperand === 'Error') {
            this.currentOperandTextElement.innerText = 'Error';
        } else {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        }
        
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
    }





    // Constants
    appendConstant(constant) {
        switch (constant) {
            case 'π':
                this.currentOperand = Math.PI.toString();
                break;
            case 'e':
                this.currentOperand = Math.E.toString();
                break;
        }
        this.updateDisplay();
        this.playSound('button');
    }

    // History Functions
    addToHistory(calculation, result) {
        const historyItem = {
            calculation: calculation,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 calculations
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        localStorage.setItem('calcetix-history', JSON.stringify(this.history));
    }

    // Sound Functions
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound effects
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different sounds for different actions
        switch (type) {
            case 'button':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                break;
            case 'compute':
                oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
                break;
            case 'error':
                oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
                break;
        }
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Copy to clipboard
    copyResult() {
        const result = this.currentOperand || '0';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(result).then(() => {
                this.showToast('Copied to clipboard');
            });
        }
        this.playSound('button');
    }

    // Show toast message
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gray-800);
            color: var(--white);
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register service worker for PWA
    registerServiceWorker();
    
    // Show splash screen first
    showSplashScreen();
    
    // Initialize calculator after splash
    setTimeout(() => {
        initializeCalculator();
        hideSplashScreen();
    }, 2500); // 2.5 seconds splash duration
});

// Register Service Worker for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('Calcetix: ServiceWorker registered successfully:', registration.scope);
                })
                .catch(function(error) {
                    console.log('Calcetix: ServiceWorker registration failed:', error);
                });
        });
    }
}

function showSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainApp = document.getElementById('mainApp');
    
    splashScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Fade out splash screen
    splashScreen.style.animation = 'splashFadeOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
        
        // Animate main app entrance
        mainApp.style.animation = 'appSlideIn 0.6s ease-out';
    }, 500);
}

function initializeCalculator() {
    const previousOperandTextElement = document.querySelector('#previousOperand');
    const currentOperandTextElement = document.querySelector('#currentOperand');
    
    window.calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
    
    // Initialize UI event listeners
    initializeUIControls();
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Numbers and decimal point
        if ((key >= '0' && key <= '9') || key === '.') {
            calculator.appendNumber(key);
        }
        
        // Operations
        else if (key === '+') {
            calculator.chooseOperation('+');
        }
        else if (key === '-') {
            calculator.chooseOperation('−');
        }
        else if (key === '*') {
            calculator.chooseOperation('×');
        }
        else if (key === '/') {
            event.preventDefault(); // Prevent browser search
            calculator.chooseOperation('÷');
        }
        else if (key === '%') {
            calculator.chooseOperation('%');
        }
        
        // Actions
        else if (key === 'Enter' || key === '=') {
            calculator.compute();
        }
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            calculator.clear();
        }
        else if (key === 'Backspace') {
            calculator.delete();
        }
    });
    
    // Add button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add haptic feedback for mobile devices
    addHapticFeedback();
    
    // Prevent zoom on double tap
    preventZoom();
    
    // Handle orientation changes
    handleOrientationChange();
    
    // Initialize gesture support
    initializeGestures();
}

// Add haptic feedback for button presses (Android)
function addHapticFeedback() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            // Haptic feedback for Android
            if (navigator.vibrate) {
                navigator.vibrate(10); // Very short vibration
            }
        });
    });
}

// Prevent zoom on double tap
function preventZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Handle orientation changes
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Small delay to ensure proper rendering after orientation change
        setTimeout(() => {
            // Recalculate display if needed
            if (window.calculator) {
                window.calculator.updateDisplay();
            }
        }, 100);
    });
}

// Initialize UI Controls
function initializeUIControls() {
    // Info button
    document.getElementById('infoBtn').addEventListener('click', toggleInfoModal);
    document.getElementById('closeInfoBtn').addEventListener('click', toggleInfoModal);
    document.getElementById('modalOverlay').addEventListener('click', toggleInfoModal);
    
    // History button
    document.getElementById('historyBtn').addEventListener('click', toggleHistory);
    document.getElementById('closeHistoryBtn').addEventListener('click', toggleHistory);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    

    
    // Theme button
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    
    // Sound button
    document.getElementById('soundBtn').addEventListener('click', toggleSound);
    
    // Copy button
    document.getElementById('copyBtn').addEventListener('click', () => calculator.copyResult());
    
    // Load saved theme
    const savedTheme = localStorage.getItem('calcetix-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('themeBtn').classList.add('active');
    }
    
    // Update sound button state
    updateSoundButton();
}

// Toggle Info Modal
function toggleInfoModal() {
    const infoModal = document.getElementById('infoModal');
    const isVisible = infoModal.classList.contains('show');
    
    if (isVisible) {
        infoModal.classList.remove('show');
        setTimeout(() => {
            infoModal.classList.add('hidden');
        }, 300);
    } else {
        infoModal.classList.remove('hidden');
        setTimeout(() => {
            infoModal.classList.add('show');
        }, 10);
    }
    
    calculator.playSound('button');
}

// Toggle History Panel
function toggleHistory() {
    const historyPanel = document.getElementById('historyPanel');
    const isVisible = historyPanel.classList.contains('show');
    
    if (isVisible) {
        historyPanel.classList.remove('show');
        setTimeout(() => {
            historyPanel.classList.add('hidden');
        }, 300);
    } else {
        updateHistoryDisplay();
        historyPanel.classList.remove('hidden');
        setTimeout(() => {
            historyPanel.classList.add('show');
        }, 10);
    }
}

// Update History Display
function updateHistoryDisplay() {
    const historyContent = document.getElementById('historyContent');
    
    if (calculator.history.length === 0) {
        historyContent.innerHTML = '<p class="history-empty">No calculations yet</p>';
        return;
    }
    
    const historyHTML = calculator.history.map(item => `
        <div class="history-item" onclick="useHistoryResult('${item.result}')">
            <div class="history-calculation">${item.calculation}</div>
            <div class="history-result">= ${calculator.getDisplayNumber(item.result.toString())}</div>
        </div>
    `).join('');
    
    historyContent.innerHTML = historyHTML;
}

// Use History Result
function useHistoryResult(result) {
    calculator.currentOperand = result.toString();
    calculator.updateDisplay();
    toggleHistory();
    calculator.playSound('button');
}

// Clear History
function clearHistory() {
    calculator.history = [];
    localStorage.removeItem('calcetix-history');
    updateHistoryDisplay();
    calculator.playSound('button');
}



// Toggle Theme
function toggleTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const isLight = document.body.classList.contains('light-theme');
    
    if (isLight) {
        document.body.classList.remove('light-theme');
        themeBtn.classList.remove('active');
        localStorage.setItem('calcetix-theme', 'dark');
    } else {
        document.body.classList.add('light-theme');
        themeBtn.classList.add('active');
        localStorage.setItem('calcetix-theme', 'light');
    }
    
    calculator.playSound('button');
}

// Toggle Sound
function toggleSound() {
    calculator.soundEnabled = !calculator.soundEnabled;
    localStorage.setItem('calcetix-sound', JSON.stringify(calculator.soundEnabled));
    updateSoundButton();
    calculator.playSound('button');
}

// Update Sound Button
function updateSoundButton() {
    const soundBtn = document.getElementById('soundBtn');
    if (calculator.soundEnabled) {
        soundBtn.classList.add('active');
        soundBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
        `;
    } else {
        soundBtn.classList.remove('active');
        soundBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
        `;
    }
}

// Handle swipe gestures
function initializeGestures() {
    let startX, startY, endX, endY;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Swipe right to open history
        if (deltaX > 100 && Math.abs(deltaY) < 50) {
            const historyPanel = document.getElementById('historyPanel');
            if (historyPanel.classList.contains('hidden')) {
                toggleHistory();
            }
        }
        
        // Swipe left to close history
        if (deltaX < -100 && Math.abs(deltaY) < 50) {
            const historyPanel = document.getElementById('historyPanel');
            if (historyPanel.classList.contains('show')) {
                toggleHistory();
            }
        }
        

    });
}

// Add CSS animation for splash fade out
const style = document.createElement('style');
style.textContent = `
    @keyframes splashFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);