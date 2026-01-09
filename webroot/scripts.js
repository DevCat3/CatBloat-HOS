const MODDIR = "/data/adb/modules/CatBloat-HOS";
const DISABLE = `${MODDIR}/disable.sh`;
const ENABLE = `${MODDIR}/enable.sh`;
const PROP = `${MODDIR}/module.prop`;

let lineCount = 0;

function isMMRL() {
  return navigator.userAgent.includes("com.dergoogler.mmrl");
}

function runShell(command) {
  return new Promise((resolve, reject) => {
    // KernelSU
    if (typeof ksu === "object" && typeof ksu.exec === "function") {
      const cb = `cb_${Date.now()}`;
      window[cb] = (code, stdout, stderr) => {
        delete window[cb];
        code === 0 ? resolve(stdout) : reject(stderr || "Shell error");
      };
      ksu.exec(command, "{}", cb);
      return;
    }

    // MMRL
    if (isMMRL() && typeof window.execShell === "function") {
      window.execShell(command)
        .then(resolve)
        .catch(err => reject(err || "Shell error"));
      return;
    }

    reject("No supported shell API found (KernelSU or MMRL).");
  });
}

function popup(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

function logOutput(text) {
  const output = document.getElementById("output-log");
  const lines = text.trim().split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;
    
    lineCount++;
    const entry = document.createElement("pre");
    entry.textContent = `${lineCount.toString().padStart(3, " ")} | ${line}`;
    entry.style.opacity = "0";
    entry.style.transform = "translateY(10px)";
    output.appendChild(entry);
    
    setTimeout(() => {
      entry.style.transition = "opacity 0.3s, transform 0.3s";
      entry.style.opacity = "1";
      entry.style.transform = "translateY(0)";
    }, 10);
    
    output.scrollTop = output.scrollHeight;
  }
}

function clearOutput() {
  lineCount = 0;
  const output = document.getElementById("output-log");
  output.style.opacity = "0";
  setTimeout(() => {
    output.innerHTML = "";
    output.style.opacity = "1";
  }, 200);
}

// === دوال جديدة ===

function validatePackageName(name) {
  return /^[a-zA-Z][\w.]*[a-zA-Z0-9]$/.test(name) && name.includes('.');
}

async function disableSingleApp() {
  const packageName = document.getElementById("package-input").value.trim();
  
  if (!packageName) {
    popup("⚠️ Please enter a package name");
    return;
  }
  
  if (!validatePackageName(packageName)) {
    popup("❌ Invalid package name format");
    return;
  }

  popup(`⏳ Disabling ${packageName}...`);
  clearOutput();
  logOutput(`[*] Disabling single app: ${packageName}`);

  try {
    await runShell(`pm disable-user --user 0 ${packageName}`);
    logOutput(`[✓] Successfully disabled: ${packageName}`);
    popup(`✅ ${packageName} disabled`);
    await listDisabledApps();
  } catch (error) {
    logOutput(`[✗] Failed to disable ${packageName}: ${error}`);
    popup(`❌ Failed: ${error}`);
  }
}

async function enableSingleApp() {
  const packageName = document.getElementById("package-input").value.trim();
  
  if (!packageName) {
    popup("⚠️ Please enter a package name");
    return;
  }
  
  if (!validatePackageName(packageName)) {
    popup("❌ Invalid package name format");
    return;
  }

  popup(`⏳ Enabling ${packageName}...`);
  clearOutput();
  logOutput(`[*] Enabling single app: ${packageName}`);

  try {
    await runShell(`pm enable ${packageName}`);
    logOutput(`[✓] Successfully enabled: ${packageName}`);
    popup(`✅ ${packageName} enabled`);
    await listDisabledApps();
  } catch (error) {
    logOutput(`[✗] Failed to enable ${packageName}: ${error}`);
    popup(`❌ Failed: ${error}`);
  }
}

async function listDisabledApps() {
  const card = document.getElementById("disabled-apps-card");
  const listElement = document.getElementById("disabled-apps-list");
  const refreshBtn = document.getElementById("refresh-apps-btn");
  
  // Disable button and show loading spinner inside it
  refreshBtn.disabled = true;
  refreshBtn.innerHTML = '🔄 <span class="spinner"></span> Refresh';
  
  card.classList.add("show");
  listElement.innerHTML = '<div class="app-item">⏳ Loading...</div>';

  try {
    const result = await runShell("pm list packages -d");
    const disabledPackages = result.trim().split('\n').filter(p => p.startsWith('package:'));
    
    if (disabledPackages.length === 0) {
      listElement.innerHTML = '<div class="app-item">ℹ️ No disabled apps found</div>';
      return;
    }
    
    listElement.innerHTML = '';
    disabledPackages.forEach((pkgLine, index) => {
      const packageName = pkgLine.replace('package:', '');
      const appItem = document.createElement('div');
      appItem.className = 'app-item';
      appItem.style.animationDelay = `${index * 0.05}s`;
      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'app-name';
      nameSpan.textContent = packageName;
      
      const enableBtn = document.createElement('button');
      enableBtn.className = 'remove-btn';
      enableBtn.textContent = 'Enable';
      enableBtn.onclick = () => enableAppFromList(packageName);
      
      appItem.appendChild(nameSpan);
      appItem.appendChild(enableBtn);
      listElement.appendChild(appItem);
    });
  } catch (error) {
    listElement.innerHTML = `<div class="app-item">[✗] Error: ${error}</div>`;
  } finally {
    // Reset button after animation completes
    setTimeout(() => {
      refreshBtn.disabled = false;
      refreshBtn.innerHTML = '🔄 Refresh';
    }, 600);
  }
}

async function enableAppFromList(packageName) {
  popup(`⏳ Enabling ${packageName}...`);
  clearOutput();
  logOutput(`[*] Enabling from list: ${packageName}`);

  try {
    await runShell(`pm enable ${packageName}`);
    logOutput(`[✓] Successfully enabled: ${packageName}`);
    popup(`✅ ${packageName} enabled`);
    await listDisabledApps();
  } catch (error) {
    logOutput(`[✗] Failed to enable ${packageName}: ${error}`);
    popup(`❌ Failed: ${error}`);
  }
}

// === دوال موجودة معدّلة ===

async function getModuleName() {
  try {
    const name = await runShell(`grep '^name=' ${PROP} | cut -d= -f2`);
    document.getElementById("module-name").textContent = name.trim();
    document.title = name.trim();
  } catch {
    document.getElementById("module-name").textContent = "CatBloat HOS";
  }
}

async function streamOutput(scriptPath) {
  const logPath = "/data/local/tmp/bloatlog";
  await runShell(`rm -f ${logPath}`);
  runShell(`sh ${scriptPath}`);

  let lastOutput = "";
  const interval = 500;

  const poll = setInterval(async () => {
    try {
      const content = await runShell(`cat ${logPath}`);
      if (content !== lastOutput) {
        const newLines = content.slice(lastOutput.length).trim();
        if (newLines) logOutput(newLines);
        lastOutput = content;
      }
    } catch (e) {
      clearInterval(poll);
      logOutput("[!] Error reading log.");
    }
  }, interval);

  setTimeout(() => clearInterval(poll), 60000);
}

document.addEventListener("DOMContentLoaded", () => {
  getModuleName();
  listDisabledApps();

  // Add event listeners with loading states
  const disableBtn = document.getElementById("disable-btn");
  const enableBtn = document.getElementById("enable-btn");
  const refreshBtn = document.getElementById("refresh-apps-btn");
  
  disableBtn.addEventListener("click", async () => {
    disableBtn.disabled = true;
    popup("⏳ Disabling all bloatware...");
    clearOutput();
    logOutput("[*] Running bulk disable script...");
    await streamOutput(DISABLE);
    setTimeout(() => {
      disableBtn.disabled = false;
      listDisabledApps();
    }, 1000);
  });

  enableBtn.addEventListener("click", async () => {
    enableBtn.disabled = true;
    popup("⏳ Re-enabling all bloatware...");
    clearOutput();
    logOutput("[*] Running bulk enable script...");
    await streamOutput(ENABLE);
    setTimeout(() => {
      enableBtn.disabled = false;
      listDisabledApps();
    }, 1000);
  });

  refreshBtn.addEventListener("click", () => {
    if (!refreshBtn.disabled) {
      listDisabledApps();
    }
  });

  document.getElementById("clear-output").addEventListener("click", clearOutput);
  document.getElementById("disable-single-btn").addEventListener("click", disableSingleApp);
  document.getElementById("enable-single-btn").addEventListener("click", enableSingleApp);

  // Theme toggle
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.documentElement.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});
