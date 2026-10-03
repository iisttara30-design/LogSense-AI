# LogSense AI 🖥️🤖

## Intelligent System Log Analysis Web Application

LogSense AI is a web-based system log analysis application that helps users analyze log files and identify INFO, WARNING, and ERROR events.

### 🚀 Features

- 📁 Upload `.log` and `.txt` files
- 📊 Count INFO, WARNING, and ERROR logs
- 🔍 Search log events
- 🤖 AI-based analysis and suggestions
- 💡 Suggested actions for detected issues
- ❤️ System health score
- 📈 Log severity visualization
- 🌙 Dark mode
- 📄 Download analysis report

### 🛠️ Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript

### ⚙️ How It Works

1. User uploads a log file.
2. The application reads the log content.
3. Python analyzes the log entries.
4. INFO, WARNING, and ERROR events are identified and counted.
5. The dashboard displays the analysis.
6. The application provides system status, health score, and suggested actions.

### 📂 Project Structure

```text
LogSense-AI/
│
├── app.py
├── log_analyzer.py
├── sample.log
├── static/
│   ├── script.js
│   └── style.css
│
└── templates/
    └── index.html
