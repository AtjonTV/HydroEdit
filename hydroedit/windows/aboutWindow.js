const {remote, shell} = require('electron');

let version = remote.app.getVersion();

if(version == "1.7.9")
document.getElementById('version').innerText = "[Electron 1.7.9]";
else
document.getElementById('version').innerText = version;

const ospl = document.querySelector('#ospl');
ospl.addEventListener('click', openOSPL);
function openOSPL()
{
    shell.openExternal("http://open-source-project-license.atvg-studios.at");
}

const verified = document.querySelector('#verified');
verified.addEventListener('click', openVerified);
function openVerified()
{
    shell.openExternal("http://atvg-studios.at/osplp#verified_003");
}

const elec = document.querySelector('#elec');
elec.addEventListener('click', openElec);
function openElec()
{
    shell.openExternal("https://electronjs.org");
}

const gihu = document.querySelector('#gihu');
gihu.addEventListener('click', openGitHub);
function openGitHub()
{
    shell.openExternal("https://github.com");
}

const vscode = document.querySelector('#vxc');
vscode.addEventListener('click', openVSCode);
function openVSCode()
{
    shell.openExternal("https://code.visualstudio.com");
}

const cxcss = document.querySelector('#cx');
cxcss.addEventListener('click', openCXCSS);
function openCXCSS()
{
    shell.openExternal("https://github.com/atjontv/cx-css");
}

const mona = document.querySelector('#mona');
mona.addEventListener('click', openMonaco);
function openMonaco()
{
    shell.openExternal("https://github.com/Microsoft/monaco-editor/releases/tag/v0.13.1");
}