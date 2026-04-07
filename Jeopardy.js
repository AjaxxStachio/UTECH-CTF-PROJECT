// ================================================================
// UTECH CTF HUB — JEOPARDY ENGINE
// 6 categories × 5 point values = 30 questions
// Categories: Web, Crypto, Network, Linux, OWASP, Incident Basics
// Point values: 100 / 200 / 300 / 400 / 500
// ================================================================

// ----------------------------------------------------------------
// QUESTION BANK
// Each entry: { id, category, catKey, points, question, options[],
//               correct (0-indexed for MC / exact string for flag),
//               flag, explanation, dailyDouble? }
// ----------------------------------------------------------------

const CATEGORIES = [
    { key: 'web',      label: 'Web Security',    icon: 'fa-globe' },
    { key: 'crypto',   label: 'Cryptography',    icon: 'fa-lock' },
    { key: 'network',  label: 'Network',         icon: 'fa-network-wired' },
    { key: 'linux',    label: 'Linux',           icon: 'fa-terminal' },
    { key: 'owasp',    label: 'OWASP',           icon: 'fa-shield-alt' },
    { key: 'incident', label: 'Incident Basics', icon: 'fa-fire-extinguisher' },
];

const POINT_VALUES = [100, 200, 300, 400, 500];

const questions = [

    // ============================================================
    // WEB SECURITY
    // ============================================================
    {
        id: 'web-100', category: 'Web Security', catKey: 'web', points: 100,
        question: 'What character is most commonly used as the first test in an SQL injection attempt because it breaks query syntax?',
        options: ["Double quote (\")", "Single quote (')", "Semicolon (;)", "Hash (#)"],
        correct: 1,
        flag: "flag{single_quote}",
        explanation: "The single quote (') terminates the string literal in SQL syntax. Injecting it into a query reveals whether the input is unsanitized, causing a syntax error or altered behavior."
    },
    {
        id: 'web-200', category: 'Web Security', catKey: 'web', points: 200,
        question: 'Which type of XSS attack permanently stores the malicious script in the server\'s database, executing for every visitor who loads the infected page?',
        options: ["Reflected XSS", "DOM-based XSS", "Stored XSS", "Blind XSS"],
        correct: 2,
        flag: "flag{stored_xss}",
        explanation: "Stored (Persistent) XSS injects malicious scripts into a server-side store (database, comments, forum posts). Every user who loads that page executes the payload — making it far more dangerous than Reflected XSS."
    },
    {
        id: 'web-300', category: 'Web Security', catKey: 'web', points: 300,
        question: 'An attacker changes the URL from /profile?id=42 to /profile?id=1 and accesses the admin account without extra privileges. What vulnerability is this?',
        options: ["SQL Injection", "CSRF", "Insecure Direct Object Reference (IDOR)", "Path Traversal"],
        correct: 2,
        flag: "flag{idor_vuln}",
        explanation: "IDOR (Insecure Direct Object Reference) occurs when applications expose internal implementation objects via user-controllable references without proper authorization checks — OWASP API Top 10 #1 (Broken Object Level Authorization)."
    },
    {
        id: 'web-400', category: 'Web Security', catKey: 'web', points: 400,
        question: 'A victim visits a malicious page that silently sends a POST request to their bank using their existing authenticated session cookies. What attack is this, and what header prevents it?',
        options: [
            "XSS — prevented by Content-Security-Policy",
            "CSRF — prevented by SameSite cookies / CSRF token",
            "Clickjacking — prevented by X-Frame-Options",
            "SSRF — prevented by network segmentation"
        ],
        correct: 1,
        flag: "flag{csrf_attack}",
        explanation: "Cross-Site Request Forgery (CSRF) forges authenticated requests from a victim's browser. Defenses: SameSite=Strict/Lax cookies, synchronizer CSRF tokens, and checking the Origin/Referer header on state-changing requests."
    },
    {
        id: 'web-500', category: 'Web Security', catKey: 'web', points: 500,
        question: 'A web app fetches a URL supplied by the user: fetch($_GET[\'url\']). An attacker supplies http://169.254.169.254/latest/meta-data/ and receives AWS credentials. What vulnerability class is this?',
        options: [
            "Remote Code Execution (RCE)",
            "Server-Side Request Forgery (SSRF)",
            "XML External Entity (XXE)",
            "Open Redirect"
        ],
        correct: 1,
        flag: "flag{ssrf_cloud}",
        explanation: "SSRF (Server-Side Request Forgery) causes the server to make requests on the attacker's behalf — bypassing firewalls and reaching internal services like the AWS Instance Metadata Service (IMDS) at 169.254.169.254, leaking IAM credentials."
    },

    // ============================================================
    // CRYPTOGRAPHY
    // ============================================================
    {
        id: 'crypto-100', category: 'Cryptography', catKey: 'crypto', points: 100,
        question: 'What encoding scheme converts binary data into printable ASCII text using 64 characters and is identifiable by trailing "=" padding characters?',
        options: ["Hexadecimal", "ROT13", "Base64", "URL encoding"],
        correct: 2,
        flag: "flag{base64_encoding}",
        explanation: "Base64 maps every 3 bytes of binary data to 4 printable ASCII characters chosen from A-Z, a-z, 0-9, +, and /. Padding (=) is added when input length is not a multiple of 3. It is encoding — NOT encryption."
    },
    {
        id: 'crypto-200', category: 'Cryptography', catKey: 'crypto', points: 200,
        question: 'The SHA-256 hash of "password" is always the same value. An attacker pre-computes millions of hash→plaintext pairs. What defensive technique makes each stored password hash unique, defeating this attack?',
        options: ["Key stretching", "Salting", "HMAC", "Symmetric encryption"],
        correct: 1,
        flag: "flag{password_salt}",
        explanation: "Salting appends a unique random value to each password before hashing — even identical passwords produce completely different hashes. This defeats rainbow table attacks, which rely on pre-computed hash-to-plaintext mappings."
    },
    {
        id: 'crypto-300', category: 'Cryptography', catKey: 'crypto', points: 300,
        question: 'In asymmetric cryptography, Alice wants to send Bob an encrypted message only Bob can read. Which key does Alice use to encrypt it?',
        options: ["Alice's private key", "Alice's public key", "Bob's public key", "Bob's private key"],
        correct: 2,
        flag: "flag{asymmetric_crypto}",
        explanation: "In asymmetric (public-key) cryptography: encrypt with the RECIPIENT's public key, decrypt with the RECIPIENT's private key. Bob's public key is freely shared; only Bob's private key can decrypt messages encrypted with it."
    },
    {
        id: 'crypto-400', category: 'Cryptography', catKey: 'crypto', points: 400,
        question: 'A Caesar cipher encrypted message reads: "IODJ{FDHVDU}". The shift is 3. What is the plaintext flag?',
        options: ["flag{caesar}", "FLAG{CAESAR}", "flag{CAESAR}", "hlag{daezar}"],
        correct: 0,
        flag: "flag{caesar}",
        explanation: "Caesar cipher: each letter shifted back 3 positions. I→f, O→l, D→a, J→g, {→{, F→c, D→a, H→e, V→s, D→a, U→r, }→}. Result: flag{caesar}. With only 25 possible shifts, brute-force takes seconds."
    },
    {
        id: 'crypto-500', category: 'Cryptography', catKey: 'crypto', points: 500,
        question: 'RSA is used with p=3, q=11, n=33, e=7. Using Euler\'s theorem: φ(n)=(p-1)(q-1). What is φ(33)?',
        options: ["20", "22", "30", "32"],
        correct: 0,
        flag: "flag{rsa_phi_20}",
        explanation: "φ(n) = (p-1)(q-1) = (3-1)(11-1) = 2×10 = 20. The private exponent d satisfies e×d ≡ 1 (mod φ(n)), so 7×d ≡ 1 (mod 20). Solving: d=3 (7×3=21≡1 mod 20). Real RSA uses primes with 1000+ bits — making φ(n) computationally infeasible to compute without knowing p and q."
    },

    // ============================================================
    // NETWORK SECURITY
    // ============================================================
    {
        id: 'network-100', category: 'Network', catKey: 'network', points: 100,
        question: 'Which port does HTTPS use, and what protocol does it employ to encrypt traffic in transit?',
        options: ["Port 80, SSL", "Port 443, TLS", "Port 8080, SSH", "Port 443, IPSec"],
        correct: 1,
        flag: "flag{https_443_tls}",
        explanation: "HTTPS uses port 443 and TLS (Transport Layer Security). TLS replaced the deprecated SSL protocol. It provides confidentiality (encryption), integrity (MAC), and authentication (certificates) for all web traffic."
    },
    {
        id: 'network-200', category: 'Network', catKey: 'network', points: 200,
        question: 'TCP establishes connections via a 3-way handshake. What is the correct sequence of packets?',
        options: ["SYN → ACK → SYN-ACK", "SYN → SYN-ACK → ACK", "ACK → SYN → SYN-ACK", "SYN-ACK → SYN → ACK"],
        correct: 1,
        flag: "flag{tcp_handshake}",
        explanation: "TCP 3-way handshake: (1) Client sends SYN (synchronize). (2) Server replies SYN-ACK (synchronize-acknowledge). (3) Client sends ACK (acknowledge). The connection is now established. A half-open scan (Nmap -sS) sends SYN and never completes the handshake."
    },
    {
        id: 'network-300', category: 'Network', catKey: 'network', points: 300,
        question: 'You open a PCAP in Wireshark and see plaintext "USER admin" and "PASS secret123" in a packet stream. What protocol is almost certainly in use?',
        options: ["SFTP", "HTTPS", "FTP", "SSH"],
        correct: 2,
        flag: "flag{ftp_plaintext}",
        explanation: "FTP (port 21) transmits commands USER and PASS in plaintext — visible to anyone capturing network traffic. SFTP (port 22) and FTPS encrypt credentials. Never use plain FTP for production file transfers."
    },
    {
        id: 'network-400', category: 'Network', catKey: 'network', points: 400,
        question: 'An attacker on the same LAN sends forged ARP replies telling all hosts that their MAC address is associated with the gateway\'s IP, becoming the route for all traffic. This is called:',
        options: ["DNS Spoofing", "ARP Poisoning / ARP Spoofing", "BGP Hijacking", "MAC Flooding"],
        correct: 1,
        flag: "flag{arp_poisoning}",
        explanation: "ARP Poisoning (ARP Spoofing) exploits the stateless, unauthenticated nature of ARP. The attacker sends gratuitous ARP replies mapping their MAC to a legitimate IP — inserting themselves as a Man-in-the-Middle. Defense: Dynamic ARP Inspection (DAI) on managed switches."
    },
    {
        id: 'network-500', category: 'Network', catKey: 'network', points: 500,
        question: 'A Wireshark filter shows: tcp.flags.syn==1 && tcp.flags.ack==0 with thousands of unique source IPs, all destined for a single server. The server becomes unresponsive. What attack is occurring?',
        options: [
            "ARP Poisoning",
            "Distributed Denial of Service via SYN Flood",
            "DNS Amplification",
            "Session Hijacking"
        ],
        correct: 1,
        flag: "flag{syn_flood_ddos}",
        explanation: "A SYN Flood DDoS exploits the TCP handshake: the server allocates resources for each SYN but the attacker never completes the handshake. Thousands of spoofed-source SYNs exhaust the server's connection table (SYN backlog), causing denial of service. Defense: SYN cookies, rate limiting, and upstream DDoS scrubbing."
    },

    // ============================================================
    // LINUX
    // ============================================================
    {
        id: 'linux-100', category: 'Linux', catKey: 'linux', points: 100,
        question: 'Which Linux command extracts all printable ASCII strings (≥4 characters) from a binary file — a first step in reverse engineering?',
        options: ["cat", "hexdump", "strings", "file"],
        correct: 2,
        flag: "flag{strings_command}",
        explanation: "`strings` scans a binary and prints all sequences of printable characters 4+ characters long. It reveals hardcoded passwords, error messages, flags, API keys, and library names without any reverse engineering tools."
    },
    {
        id: 'linux-200', category: 'Linux', catKey: 'linux', points: 200,
        question: 'A file has permissions -rwsr-xr-x. The "s" in the owner execute position is the SetUID bit. What does SetUID mean for a binary?',
        options: [
            "The file runs with the permissions of the person who created it",
            "The file runs with the permissions of the file's owner, regardless of who executes it",
            "The file is shared across all users",
            "The file cannot be deleted"
        ],
        correct: 1,
        flag: "flag{setuid_bit}",
        explanation: "SetUID (SUID) causes a binary to execute with the file OWNER's privileges, not the caller's. If root owns an SUID binary, any user who runs it temporarily has root-level access — a major privilege escalation risk if the binary is exploitable."
    },
    {
        id: 'linux-300', category: 'Linux', catKey: 'linux', points: 300,
        question: 'You run: sudo find / -perm -4000 -type f 2>/dev/null. What are you searching for?',
        options: [
            "Files writable by all users",
            "SetUID root binaries — potential privilege escalation vectors",
            "Files modified in the last 4 days",
            "Hidden configuration files"
        ],
        correct: 1,
        flag: "flag{suid_privesc}",
        explanation: "`-perm -4000` finds all files with the SetUID bit set. These run as their owner (often root) regardless of who executes them. Finding exploitable SUID binaries (like a misconfigured copy of nano, vim, or find) is a classic Linux privilege escalation technique."
    },
    {
        id: 'linux-400', category: 'Linux', catKey: 'linux', points: 400,
        question: 'Which file on a Linux system contains hashed passwords for all local user accounts, readable only by root?',
        options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/var/log/auth.log"],
        correct: 1,
        flag: "flag{etc_shadow}",
        explanation: "/etc/shadow stores hashed passwords, account expiry, and lock status — readable only by root. /etc/passwd is world-readable but contains only the account metadata (UID, GID, home, shell) — not password hashes in modern systems. Gaining read access to /etc/shadow allows offline cracking attempts."
    },
    {
        id: 'linux-500', category: 'Linux', catKey: 'linux', points: 500,
        question: 'A Bash script contains: eval "$(cat user_input.txt)". Why is this a critical remote code execution vulnerability?',
        options: [
            "eval reads files without permission checks",
            "eval executes its argument as shell code — any content in user_input.txt runs as the script owner",
            "cat is insecure and should be replaced with less",
            "The $() syntax is deprecated in modern Bash"
        ],
        correct: 1,
        flag: "flag{eval_rce}",
        explanation: "`eval` treats its argument as shell code and executes it immediately. If an attacker controls the content of user_input.txt (e.g., `rm -rf /` or a reverse shell), they achieve arbitrary code execution as the script's owner. Never use `eval` with user-controlled input — use parameter expansion and strict input validation instead."
    },

    // ============================================================
    // OWASP TOP 10
    // ============================================================
    {
        id: 'owasp-100', category: 'OWASP', catKey: 'owasp', points: 100,
        question: 'According to OWASP Top 10 (2021), what vulnerability category holds the #1 position?',
        options: [
            "Injection",
            "Cryptographic Failures",
            "Broken Access Control",
            "Security Misconfiguration"
        ],
        correct: 2,
        flag: "flag{owasp_a01}",
        explanation: "OWASP Top 10 (2021): A01 — Broken Access Control moved to #1, up from #5 in 2017. It occurs when users can act outside their intended permissions. 94% of applications tested had some form of broken access control."
    },
    {
        id: 'owasp-200', category: 'OWASP', catKey: 'owasp', points: 200,
        question: 'OWASP A03:2021 is "Injection." Which of the following is NOT considered an injection vulnerability?',
        options: ["SQL Injection", "Command Injection", "LDAP Injection", "Session Fixation"],
        correct: 3,
        flag: "flag{owasp_injection}",
        explanation: "Session Fixation is an authentication vulnerability (OWASP A07: Identification and Authentication Failures) — not injection. Injection attacks (A03) involve untrusted data being sent to an interpreter as part of a command or query: SQL, OS commands, LDAP, XPath, and others."
    },
    {
        id: 'owasp-300', category: 'OWASP', catKey: 'owasp', points: 300,
        question: 'A developer stores sensitive API keys in JavaScript source files and pushes them to a public GitHub repo. Which OWASP category does this fall under?',
        options: [
            "A01: Broken Access Control",
            "A02: Cryptographic Failures",
            "A05: Security Misconfiguration",
            "A09: Security Logging Failures"
        ],
        correct: 1,
        flag: "flag{owasp_crypto_fail}",
        explanation: "OWASP A02: Cryptographic Failures (formerly 'Sensitive Data Exposure') covers failure to protect sensitive data — including storing secrets in source code, transmitting data without encryption, using weak algorithms, or exposing credentials in public repositories."
    },
    {
        id: 'owasp-400', category: 'OWASP', catKey: 'owasp', points: 400,
        question: 'Which OWASP Top 10 category specifically addresses risks from using outdated components with known vulnerabilities, such as unpatched libraries or frameworks?',
        options: [
            "A04: Insecure Design",
            "A06: Vulnerable and Outdated Components",
            "A05: Security Misconfiguration",
            "A08: Software and Data Integrity Failures"
        ],
        correct: 1,
        flag: "flag{owasp_a06}",
        explanation: "OWASP A06: Vulnerable and Outdated Components covers risks from using libraries, frameworks, or components with known CVEs. The 2017 Equifax breach — exposing 147M records — exploited an unpatched Apache Struts vulnerability (CVE-2017-5638), a textbook A06 failure."
    },
    {
        id: 'owasp-500', category: 'OWASP', catKey: 'owasp', points: 500, dailyDouble: true,
        question: 'OWASP A10:2021 — Server-Side Request Forgery (SSRF) was added to the Top 10 in 2021. Which of these scenarios BEST demonstrates an SSRF vulnerability?',
        options: [
            "A user uploads a malicious PDF that crashes the PDF parser",
            "A web app fetches an external URL from user input and returns the response, allowing access to internal AWS metadata",
            "An attacker intercepts HTTP traffic between client and server",
            "A login form allows unlimited password attempts"
        ],
        correct: 1,
        flag: "flag{owasp_ssrf_a10}",
        explanation: "SSRF (A10:2021) allows attackers to make the server issue requests to internal or external destinations. Classic impact: reaching AWS IMDS at 169.254.169.254 to steal IAM credentials. SSRF was added to the 2021 list as a standalone category due to its growing impact in cloud environments. Defense: allowlist only required URLs, disable unused URL schemes, enforce network egress controls."
    },

    // ============================================================
    // INCIDENT BASICS
    // ============================================================
    {
        id: 'incident-100', category: 'Incident Basics', catKey: 'incident', points: 100,
        question: 'What does the acronym IOC stand for in the context of incident response and threat intelligence?',
        options: [
            "Index of Commands",
            "Indicator of Compromise",
            "Instance of Control",
            "Input Output Controller"
        ],
        correct: 1,
        flag: "flag{ioc_defined}",
        explanation: "Indicator of Compromise (IOC) is forensic evidence that a system has been breached. Common IOCs: unusual outbound traffic, known malicious IP addresses or domains, hash values of known malware, unusual process names, unexpected registry changes, or unauthorized user accounts."
    },
    {
        id: 'incident-200', category: 'Incident Basics', catKey: 'incident', points: 200,
        question: 'During a security incident, what should be done FIRST before taking any remediation actions?',
        options: [
            "Immediately wipe and re-image all affected systems",
            "Disconnect all systems from the internet",
            "Contain the incident to prevent spread, while preserving evidence",
            "Notify law enforcement"
        ],
        correct: 2,
        flag: "flag{contain_preserve}",
        explanation: "The first step in the NIST/SANS incident response cycle after detection is Containment — stopping the spread — while simultaneously preserving evidence for forensic investigation. Immediately wiping systems destroys evidence and may violate legal or compliance obligations. Evidence preservation is critical before any remediation."
    },
    {
        id: 'incident-300', category: 'Incident Basics', catKey: 'incident', points: 300,
        question: 'A user reports their computer is unusually slow, anti-virus was disabled by itself, and a new administrator account appeared overnight. Which phase of the attack lifecycle is most likely occurring?',
        options: [
            "Reconnaissance",
            "Initial Access",
            "Post-Exploitation / Persistence",
            "Exfiltration"
        ],
        correct: 2,
        flag: "flag{post_exploitation}",
        explanation: "These signs — disabled AV, new admin accounts, resource exhaustion — are classic Post-Exploitation and Persistence indicators. The attacker has already gained access and is establishing a foothold (MITRE ATT&CK: TA0003 Persistence). Investigation should determine the initial access vector and the extent of lateral movement."
    },
    {
        id: 'incident-400', category: 'Incident Basics', catKey: 'incident', points: 400,
        question: 'Your SIEM shows 50,000 failed SSH login attempts from 200 different IP addresses in 10 minutes, all targeting the same user account. What type of attack is this and what is the immediate mitigation?',
        options: [
            "Phishing — implement email filtering",
            "Credential Stuffing / Brute-Force — implement account lockout, rate limiting, and geo-blocking",
            "SQL Injection — implement a WAF",
            "DDoS — contact your ISP for upstream filtering"
        ],
        correct: 1,
        flag: "flag{brute_force_ssh}",
        explanation: "Distributed brute-force / credential stuffing against SSH. Immediate mitigations: (1) Rate-limit SSH connections per IP. (2) Implement account lockout after N failures. (3) Disable password auth — use SSH key pairs only. (4) Move SSH to a non-standard port. (5) Use fail2ban to auto-block offending IPs. (6) Restrict SSH access via firewall allowlist."
    },
    {
        id: 'incident-500', category: 'Incident Basics', catKey: 'incident', points: 500,
        question: 'The MITRE ATT&CK framework documents adversary TTPs. What do TTP stand for, and which of the following is an example of a Technique?',
        options: [
            "Tools, Tactics, Procedures — Spearphishing is a Technique",
            "Tactics, Techniques, Procedures — OS Credential Dumping (T1003) is a Technique",
            "Threats, Tactics, Protocols — Port Scanning is a Technique",
            "Tactics, Tools, Processes — Malware is a Technique"
        ],
        correct: 1,
        flag: "flag{mitre_attack_ttp}",
        explanation: "TTPs = Tactics, Techniques, Procedures. In MITRE ATT&CK: Tactics are high-level goals (e.g., Credential Access TA0006). Techniques are specific methods to achieve them (e.g., OS Credential Dumping T1003 using Mimikatz). Procedures are specific real-world implementations by named threat actors. ATT&CK provides a common language for defenders and enables gap analysis of security controls."
    }

];

// ================================================================
// STATE
// ================================================================

const state = {
    answered: {},      // { 'web-100': 'correct' | 'wrong' }
    score:    0,
    correct:  0,
    catScores: {},     // { web: 300, crypto: 100, … }
    timerInterval: null,
    currentQuestion: null,
    mode: 'mc',        // 'mc' | 'flag'
};

// ================================================================
// BOARD RENDERING
// ================================================================

function renderBoard() {
    const board = document.getElementById('jeopardyBoard');
    board.innerHTML = '';

    // Row 1: category headers
    CATEGORIES.forEach(cat => {
        const header = document.createElement('div');
        header.className = `j-category cat-${cat.key}`;
        header.innerHTML = `<i class="fas ${cat.icon}"></i><span>${cat.label}</span>`;
        board.appendChild(header);
    });

    // Rows 2-6: question tiles
    POINT_VALUES.forEach(pts => {
        CATEGORIES.forEach(cat => {
            const q    = questions.find(x => x.catKey === cat.key && x.points === pts);
            const tile = document.createElement('div');
            tile.className = 'j-tile';
            tile.dataset.points = pts;
            tile.dataset.id     = q.id;

            if (q.dailyDouble) tile.classList.add('daily-double');

            const status = state.answered[q.id];
            if (status === 'correct') {
                tile.classList.add('answered-correct');
                tile.innerHTML = `<span>${pts}</span>`;
            } else if (status === 'wrong') {
                tile.classList.add('answered-wrong');
                tile.innerHTML = `<span>${pts}</span>`;
            } else {
                tile.innerHTML = `<span>${pts}</span>`;
                tile.addEventListener('click', () => openQuestion(q.id));
            }

            board.appendChild(tile);
        });
    });

    updateStats();
}

// ================================================================
// QUESTION MODAL
// ================================================================

function openQuestion(id) {
    const q    = questions.find(x => x.id === id);
    const mode = document.getElementById('gameModeSelect')?.value || 'mc';
    state.currentQuestion = q;
    state.mode = mode;

    const modal   = document.getElementById('questionModal');
    const content = document.getElementById('questionContent');

    const isDailyDouble = !!q.dailyDouble;
    const timerSeconds  = { 100: 30, 200: 30, 300: 45, 400: 60, 500: 90 }[q.points] || 45;

    content.innerHTML = `
        <span class="close" id="modalClose">&times;</span>

        <!-- Header -->
        <div class="j-question-header">
            <div>
                <div class="j-category-label">${q.category}</div>
                ${isDailyDouble ? `<div style="color:var(--neon-yellow);font-family:'Orbitron',monospace;font-size:0.75rem;margin-top:0.35rem;letter-spacing:2px;">★ DAILY DOUBLE</div>` : ''}
            </div>
            <div class="j-points-label">$${q.points}</div>
        </div>

        <!-- Timer bar -->
        <div class="j-timer-bar">
            <div class="j-timer-fill" id="timerFill" style="width:100%;"></div>
        </div>
        <p style="text-align:right;font-size:0.75rem;color:var(--text-secondary);margin-top:-0.5rem;margin-bottom:1rem;">
            <i class="fas fa-clock"></i> <span id="timerText">${timerSeconds}s</span>
        </p>

        <!-- Question -->
        <p class="j-question-text">${q.question}</p>

        <!-- Answer area — rendered by mode -->
        <div id="answerArea"></div>

        <!-- Result banner -->
        <div class="j-result" id="jResult">
            <i class="fas fa-circle" id="jResultIcon"></i>
            <span id="jResultText"></span>
        </div>

        <!-- Explanation (hidden until answered) -->
        <div id="explanationBox" class="what-learned" style="display:none;">
            <h3><i class="fas fa-graduation-cap"></i> What You'll Learn</h3>
            <p>${q.explanation}</p>
        </div>

        <!-- Next button (hidden until answered) -->
        <button class="btn-primary" id="nextBtn" style="display:none;margin-top:1rem;width:100%;" onclick="closeQuestion()">
            <i class="fas fa-arrow-right"></i> Continue
        </button>
    `;

    // Render answer area based on mode
    if (mode === 'mc') {
        renderMCOptions(q);
    } else {
        renderFlagInput(q);
    }

    // Wire close button
    document.getElementById('modalClose').addEventListener('click', closeQuestion);

    modal.style.display = 'flex';
    startTimer(timerSeconds, q);
}

function renderMCOptions(q) {
    const letters = ['A', 'B', 'C', 'D'];
    const area    = document.getElementById('answerArea');
    area.innerHTML = `<div class="j-mc-options" id="mcOptions">
        ${q.options.map((opt, i) => `
            <button class="j-mc-btn" data-idx="${i}" onclick="submitMC(${i})">
                <span class="option-letter">${letters[i]}.</span>${opt}
            </button>
        `).join('')}
    </div>`;
}

function renderFlagInput(q) {
    const area = document.getElementById('answerArea');
    area.innerHTML = `
        <div class="j-flag-row">
            <input type="text" id="flagInput" placeholder="flag{...}"
                onkeypress="if(event.key==='Enter') submitFlag()">
            <button class="flag-submission" onclick="submitFlag()"
                style="padding:0.75rem 1.5rem;background:var(--neon-green);border:none;color:var(--bg-deep);font-family:'Share Tech Mono',monospace;font-weight:600;text-transform:uppercase;letter-spacing:2px;cursor:pointer;">
                Submit
            </button>
        </div>
    `;
}

// ================================================================
// SUBMISSION HANDLERS
// ================================================================

function submitMC(selectedIdx) {
    const q    = state.currentQuestion;
    const btns = document.querySelectorAll('.j-mc-btn');
    stopTimer();

    btns.forEach(btn => {
        btn.disabled = true;
        const idx = parseInt(btn.dataset.idx);
        if (idx === q.correct) {
            btn.classList.add('correct');
        } else if (idx === selectedIdx && idx !== q.correct) {
            btn.classList.add('wrong');
        }
    });

    const isCorrect = selectedIdx === q.correct;
    resolveAnswer(isCorrect, q);
}

function submitFlag() {
    const q     = state.currentQuestion;
    const input = document.getElementById('flagInput');
    if (!input) return;

    const submitted = input.value.trim().toLowerCase();
    const correct   = q.flag.toLowerCase();
    stopTimer();

    input.disabled = true;
    resolveAnswer(submitted === correct, q);
}

function resolveAnswer(isCorrect, q) {
    const resultEl = document.getElementById('jResult');
    const resultTx = document.getElementById('jResultText');
    const resultIc = document.getElementById('jResultIcon');
    const explBox  = document.getElementById('explanationBox');
    const nextBtn  = document.getElementById('nextBtn');

    resultEl.style.display = 'flex';

    if (isCorrect) {
        state.score  += q.points;
        state.correct += 1;
        state.catScores[q.catKey] = (state.catScores[q.catKey] || 0) + q.points;

        resultEl.className       = 'j-result correct';
        resultIc.className       = 'fas fa-check-circle';
        resultTx.textContent     = `Correct! +${q.points} points`;
        state.answered[q.id]     = 'correct';

        saveToUser(q.points);
    } else {
        resultEl.className       = 'j-result wrong';
        resultIc.className       = 'fas fa-times-circle';
        resultTx.textContent     = `Incorrect. The correct answer: "${q.options ? q.options[q.correct] : q.flag}"`;
        state.answered[q.id]     = 'wrong';
    }

    explBox.style.display = 'block';
    nextBtn.style.display = 'block';

    saveState();
    updateStats();
}

function timeExpired(q) {
    const btns = document.querySelectorAll('.j-mc-btn');
    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('reveal');
    });

    const input = document.getElementById('flagInput');
    if (input) input.disabled = true;

    const resultEl = document.getElementById('jResult');
    const resultTx = document.getElementById('jResultText');
    const resultIc = document.getElementById('jResultIcon');

    resultEl.style.display      = 'flex';
    resultEl.className          = 'j-result wrong';
    resultIc.className          = 'fas fa-hourglass-end';
    resultTx.textContent        = `Time's up! Correct: "${q.options ? q.options[q.correct] : q.flag}"`;
    state.answered[q.id]        = 'wrong';

    document.getElementById('explanationBox').style.display = 'block';
    document.getElementById('nextBtn').style.display        = 'block';

    saveState();
    updateStats();
}

// ================================================================
// TIMER
// ================================================================

function startTimer(seconds, q) {
    stopTimer();
    let remaining = seconds;
    const fill    = document.getElementById('timerFill');
    const text    = document.getElementById('timerText');

    state.timerInterval = setInterval(() => {
        remaining--;
        if (fill) fill.style.width = (remaining / seconds * 100) + '%';
        if (text) text.textContent = remaining + 's';

        if (remaining <= 0) {
            stopTimer();
            // Only expire if not already answered
            if (!state.answered[q.id]) timeExpired(q);
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

// ================================================================
// MODAL CONTROL
// ================================================================

function closeQuestion() {
    stopTimer();
    document.getElementById('questionModal').style.display = 'none';
    renderBoard();
}

function closeFinalModal() {
    document.getElementById('finalModal').style.display = 'none';
}

// ================================================================
// FINAL SCORE MODAL
// ================================================================

function showFinalScore() {
    const total    = questions.length;
    const answered = Object.keys(state.answered).length;
    const pct      = answered ? Math.round((state.correct / answered) * 100) : 0;
    const maxPts   = questions.reduce((s, q) => s + q.points, 0);

    // Category breakdown
    const catRows = CATEGORIES.map(cat => {
        const catQs   = questions.filter(q => q.catKey === cat.key);
        const maxCat  = catQs.reduce((s, q) => s + q.points, 0);
        const earned  = state.catScores[cat.key] || 0;
        const pctCat  = Math.round((earned / maxCat) * 100);
        const color   = pctCat >= 70 ? 'var(--diff-beginner)' :
                        pctCat >= 40 ? 'var(--diff-intermediate)' :
                                       'var(--diff-advanced)';
        return `
            <div class="j-cat-row">
                <span class="cat-name">${cat.label}</span>
                <div class="j-cat-bar-track">
                    <div class="j-cat-bar-fill" style="width:${pctCat}%;background:${color};"></div>
                </div>
                <span class="cat-score">${earned}</span>
            </div>`;
    }).join('');

    const rank = state.score >= 1500 ? '🏆 Elite Hacker'
               : state.score >= 1000 ? '⚡ Advanced'
               : state.score >= 500  ? '🔧 Intermediate'
               :                       '🌱 Beginner';

    document.getElementById('finalContent').innerHTML = `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <h2 style="color:var(--neon-green);">Final Score</h2>
            <p style="font-size:3rem;font-family:'Orbitron',monospace;color:var(--neon-green);
                      text-shadow:0 0 20px var(--neon-green);">${state.score}</p>
            <p style="color:var(--neon-cyan);font-size:1.1rem;">${rank}</p>
        </div>

        <div class="j-final-grid">
            <div class="j-final-stat">
                <span class="val">${state.correct}</span>
                <span class="lbl">Correct</span>
            </div>
            <div class="j-final-stat">
                <span class="val">${answered - state.correct}</span>
                <span class="lbl">Wrong</span>
            </div>
            <div class="j-final-stat">
                <span class="val">${pct}%</span>
                <span class="lbl">Accuracy</span>
            </div>
            <div class="j-final-stat">
                <span class="val">${maxPts - state.score}</span>
                <span class="lbl">Points Left</span>
            </div>
        </div>

        <div style="margin:1.5rem 0;">
            <p style="color:var(--neon-cyan);font-size:0.8rem;text-transform:uppercase;
                      letter-spacing:2px;margin-bottom:1rem;">Category Breakdown</p>
            ${catRows}
        </div>

        <button class="btn-primary" onclick="closeFinalModal()" style="width:100%;">
            <i class="fas fa-times"></i> Close
        </button>
    `;

    document.getElementById('finalModal').style.display = 'flex';
}

// ================================================================
// STATS & PERSISTENCE
// ================================================================

function updateStats() {
    const total    = questions.length;
    const answered = Object.keys(state.answered).length;
    const remaining = total - answered;

    const scoreEl  = document.getElementById('jScore');
    const answEl   = document.getElementById('jAnswered');
    const corrEl   = document.getElementById('jCorrect');
    const remEl    = document.getElementById('jRemaining');

    if (scoreEl)   scoreEl.textContent   = state.score;
    if (answEl)    answEl.textContent    = answered + ' / ' + total;
    if (corrEl)    corrEl.textContent    = state.correct;
    if (remEl)     remEl.textContent     = remaining;
}

function saveState() {
    localStorage.setItem('jeopardyState', JSON.stringify({
        answered:  state.answered,
        score:     state.score,
        correct:   state.correct,
        catScores: state.catScores,
    }));
}

function loadState() {
    const saved = localStorage.getItem('jeopardyState');
    if (!saved) return;
    const s = JSON.parse(saved);
    state.answered  = s.answered  || {};
    state.score     = s.score     || 0;
    state.correct   = s.correct   || 0;
    state.catScores = s.catScores || {};
}

function saveToUser(pts) {
    const raw  = localStorage.getItem('user') || sessionStorage.getItem('user') || '{}';
    const user = JSON.parse(raw);
    user.points = (user.points || 0) + pts;
    const store = localStorage.getItem('user') ? localStorage : sessionStorage;
    store.setItem('user', JSON.stringify(user));
}

function resetBoard() {
    if (!confirm('Reset the entire board? All progress will be lost.')) return;
    state.answered  = {};
    state.score     = 0;
    state.correct   = 0;
    state.catScores = {};
    localStorage.removeItem('jeopardyState');
    renderBoard();
}

// ================================================================
// INIT
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderBoard();
});