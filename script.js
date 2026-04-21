const lines = [
"$ whoami",
"fabrice",
"",
"$ hostname",
"portfolio-server",
"",
"$ systemctl status httpd",
"active (running)",
"",
"$ docker --version",
"Docker version 24.0",
"",
"$ kubectl get nodes",
"node1 Ready",
"",
"$ echo 'Welcome to my DevOps journey 🚀'"
];

let i = 0;
let j = 0;
let current = "";
const terminal = document.getElementById("terminal");

function type() {
    if (i < lines.length) {
        if (j < lines[i].length) {
            current += lines[i][j];
            terminal.innerHTML = current;
            j++;
            setTimeout(type, 30);
        } else {
            current += "<br>";
            i++;
            j = 0;
            setTimeout(type, 300);
        }
    }
}

type();
