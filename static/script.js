const fileInput = document.getElementById("logFile");
const uploadBtn = document.getElementById("uploadBtn");
const clearBtn = document.getElementById("clearBtn");
const fileName = document.getElementById("fileName");
const reportBtn = document.getElementById("reportBtn");
const refreshBtn = document.getElementById("refreshBtn");
const darkBtn = document.getElementById("darkBtn");
const searchLog = document.getElementById("searchLog");

const infoCount = document.getElementById("infoCount");
const warningCount = document.getElementById("warningCount");
const errorCount = document.getElementById("errorCount");
const totalCount = document.getElementById("totalCount");

const logEvents = document.getElementById("logEvents");
const systemStatus = document.getElementById("systemStatus");

const aiAnalysis = document.getElementById("aiAnalysis");
const recommendations = document.getElementById("recommendations");

const infoBar = document.getElementById("infoBar");
const warningBar = document.getElementById("warningBar");
const errorBar = document.getElementById("errorBar");

const healthScore = document.getElementById("healthScore");
const healthMessage = document.getElementById("healthMessage");


uploadBtn.addEventListener("click", function () {
    fileInput.click();
});


fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }
    if (!file.name.endsWith(".log") && !file.name.endsWith(".txt")) {
    alert("⚠️ Please select a .log or .txt file.");
    fileInput.value = "";
    fileName.textContent = "No file selected";
    return;
}
    fileName.textContent = "📄 Selected File: " + file.name;

    const reader = new FileReader();


    reader.onload = function (event) {

        const text = event.target.result;
        sendToPython(text).then(function (result) {
    totalCount.textContent = result.total;
    infoCount.textContent = result.info;
    warningCount.textContent = result.warning;
    errorCount.textContent = result.error;
});

        if (text.trim() === "") {
    alert("⚠️ The selected log file is empty.");
    clearBtn.click();
    return;
}

        const lines = text.split("\n");

        logEvents.innerHTML = "";


        lines.forEach(function (line) {

            if (line.trim() !== "") {

                const eventItem = document.createElement("p");
                const timestamp = line.substring(0, 19);

                let icon = "🟢";

if (line.includes("ERROR")) {
    icon = "🔴";
} else if (line.includes("WARNING")) {
    icon = "🟡";
}

eventItem.innerHTML =
    icon + " <strong>" + timestamp + "</strong> " +
    line.substring(20);


                if (line.includes("ERROR")) {

                    eventItem.classList.add("error-event");

                } else if (line.includes("WARNING")) {

                    eventItem.classList.add("warning-event");

                } else if (line.includes("INFO")) {

                    eventItem.classList.add("info-event");
                }


                logEvents.appendChild(eventItem);
            }

        });


        const infoMatches = text.match(/\bINFO\b/gi) || [];
        const warningMatches = text.match(/\bWARNING\b/gi) || [];
        const errorMatches = text.match(/\bERROR\b/gi) || [];
        if (
    infoMatches.length === 0 &&
    warningMatches.length === 0 &&
    errorMatches.length === 0
) {
    alert("⚠️ No recognizable log events found in this file.");
    return;
}


        infoCount.textContent = infoMatches.length;
        warningCount.textContent = warningMatches.length;
        errorCount.textContent = errorMatches.length;


        totalCount.textContent =
            infoMatches.length +
            warningMatches.length +
            errorMatches.length;


        // Severity Summary

        const totalLogs =
            infoMatches.length +
            warningMatches.length +
            errorMatches.length;
            const infoChart = document.getElementById("infoChart");
const warningChart = document.getElementById("warningChart");
const errorChart = document.getElementById("errorChart");

if (totalLogs > 0) {
    infoChart.style.width =
        (infoMatches.length / totalLogs) * 100 + "%";

    warningChart.style.width =
        (warningMatches.length / totalLogs) * 100 + "%";

    errorChart.style.width =
        (errorMatches.length / totalLogs) * 100 + "%";
}



        if (totalLogs > 0) {

            const infoPercent =
                (infoMatches.length / totalLogs) * 100;

            const warningPercent =
                (warningMatches.length / totalLogs) * 100;

            const errorPercent =
                (errorMatches.length / totalLogs) * 100;


            if (infoBar) {
                infoBar.style.width = infoPercent + "%";
                infoBar.textContent = "INFO " + infoMatches.length;
            }

            if (warningBar) {
                warningBar.style.width = warningPercent + "%";
                warningBar.textContent =
                    "WARNING " + warningMatches.length;
            }

            if (errorBar) {
                errorBar.style.width = errorPercent + "%";
                errorBar.textContent =
                    "ERROR " + errorMatches.length;
            }
        }


        // System Health Score

        let health = 100;

        health = health - (errorMatches.length * 15);
        health = health - (warningMatches.length * 5);


        if (health < 0) {
            health = 0;
        }


        if (healthScore) {
            healthScore.textContent = health + "%";
        }


        if (healthMessage) {

            if (health >= 80) {

                healthMessage.textContent =
                    "💚 System Health: Good — The system is operating normally.";

            } else if (health >= 50) {

                healthMessage.textContent =
                    "💛 System Health: Moderate — Some warnings need attention.";

            } else {

                healthMessage.textContent =
                    "❤️ System Health: Critical — Errors require immediate attention.";
            }
        }


        // AI Analysis

let analysisMessages = [];

if (text.toLowerCase().includes("file not found")) {
    analysisMessages.push(
        "📁 File-not-found error detected. Check whether the required file exists and verify its file path."
    );
}

if (text.toLowerCase().includes("permission denied")) {
    analysisMessages.push(
        "🔐 Permission-denied error detected. Check the file or folder permissions."
    );
}

if (text.toLowerCase().includes("memory usage is high")) {
    analysisMessages.push(
        "🧠 High memory usage detected. Check which processes are consuming memory."
    );
}

if (text.toLowerCase().includes("disk space is low")) {
    analysisMessages.push(
        "💾 Low disk space detected. Remove unnecessary files to free storage."
    );
}

if (analysisMessages.length > 0) {
    aiAnalysis.innerHTML =
        "🤖 AI Analysis: " +
        analysisMessages.length +
        " issue(s) detected.<br><br>• " +
        analysisMessages.join("<br>• ");
    } else if (errorMatches.length > 0) {
    aiAnalysis.textContent =
        "🤖 AI Analysis: " +
        errorMatches.length +
        " error(s) detected. Please check the affected system events.";
} else if (warningMatches.length > 0) {
    aiAnalysis.textContent =
        "🤖 AI Analysis: " +
        warningMatches.length +
        " warning(s) detected. The system should be monitored.";
} else {
    aiAnalysis.textContent =
        "🤖 AI Analysis: No errors or warnings detected. The analyzed log appears normal.";
}
        // Suggested Actions

 let actions = [];

if (text.toLowerCase().includes("file not found")) {
    actions.push("📁 Check whether the required file exists.");
    actions.push("🔎 Verify that the file path is correct.");
}

if (text.toLowerCase().includes("permission denied")) {
    actions.push("🔐 Check the file or folder permissions.");
    actions.push("👤 Verify that the user has the required access.");
}

if (text.toLowerCase().includes("memory usage is high")) {
    actions.push("🧠 Check which processes are using high memory.");
    actions.push("🛑 Close unnecessary applications if required.");
}

if (text.toLowerCase().includes("disk space is low")) {
    actions.push("💾 Remove unnecessary files to free disk space.");
    actions.push("📊 Check available disk space regularly.");
}

if (actions.length === 0) {
    actions.push("✅ No specific action is required.");
}

recommendations.innerHTML = "";

actions.forEach(function (action) {
    const item = document.createElement("li");
    item.textContent = action;
    recommendations.appendChild(item);
});

        // System Status

        if (errorMatches.length > 0) {

            systemStatus.textContent =
                "🔴 System Status: Critical — Errors detected in the log.";

        } else if (warningMatches.length > 0) {

            systemStatus.textContent =
                "🟡 System Status: Warning — Warnings detected in the log.";

        } else {

            systemStatus.textContent =
                "🟢 System Status: Healthy — No errors or warnings detected.";
        }

    };


    reader.readAsText(file);

});
clearBtn.addEventListener("click", function () {

    fileInput.value = "";
    fileName.textContent = "No file selected";

    totalCount.textContent = "0";
    infoCount.textContent = "0";
    warningCount.textContent = "0";
    errorCount.textContent = "0";

    logEvents.innerHTML =
        "<p>No log file selected yet.</p>";

    systemStatus.textContent =
        "No log file analyzed yet.";

    aiAnalysis.textContent =
        "Upload a log file to generate an analysis.";

    recommendations.innerHTML =
        "<li>Upload a log file to view suggested actions.</li>";

    if (infoBar) {
        infoBar.style.width = "0%";
        infoBar.textContent = "";
    }

    if (warningBar) {
        warningBar.style.width = "0%";
        warningBar.textContent = "";
    }

    if (errorBar) {
        errorBar.style.width = "0%";
        errorBar.textContent = "";
    }

    if (healthScore) {
        healthScore.textContent = "0%";
    }

    if (healthMessage) {
        healthMessage.textContent =
            "No log file analyzed yet.";
    }

});
reportBtn.addEventListener("click", function () {

    const report =
        "LOGSENSE AI - ANALYSIS REPORT\n" +
        "================================\n\n" +
        "Selected File: " + fileName.textContent + "\n\n" +
        "Total Logs: " + totalCount.textContent + "\n" +
        "Information: " + infoCount.textContent + "\n" +
        "Warnings: " + warningCount.textContent + "\n" +
        "Errors: " + errorCount.textContent + "\n\n" +
        "System Status:\n" +
        systemStatus.textContent + "\n\n" +
        "AI Analysis:\n" +
        aiAnalysis.textContent + "\n\n" +
        "Suggested Actions:\n" +
        recommendations.innerText + "\n\n" +
        "Health Score: " + healthScore.textContent + "\n";

    const blob = new Blob([report], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "LogSense_AI_Report.txt";

    link.click();

    URL.revokeObjectURL(link.href);

});
searchLog.addEventListener("input", function () {

    const searchText = searchLog.value.toLowerCase();

    const events = logEvents.querySelectorAll("p");

    events.forEach(function (event) {

        if (event.textContent.toLowerCase().includes(searchText)) {
            event.style.display = "block";
        } else {
            event.style.display = "none";
        }

    });

});
refreshBtn.addEventListener("click", function () {

    if (fileInput.files.length === 0) {
        alert("Please select a log file first.");
        return;
    }

    fileInput.dispatchEvent(new Event("change"));

});
darkBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkBtn.textContent = "☀️ Light Mode";
    } else {
        darkBtn.textContent = "🌙 Dark Mode";
    }

});
async function sendToPython(text) {
    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text
        })
    });

    return await response.json();
}