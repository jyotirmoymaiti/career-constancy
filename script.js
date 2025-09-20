/* -------------------------
   DATA
------------------------- */
const STREAM_SUBJECTS = {
  science: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
  ],
  commerce: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Mathematics",
    "English",
  ],
  arts: [
    "History",
    "Geography",
    "Political Science",
    "English",
    "Sociology",
    "Psychology",
  ],
};
const ALL_INTERESTS = [
  "computers",
  "coding",
  "apps",
  "gadgets",
  "software",
  "websites",
  "ai",
  "programming",
  "technology",
  "physics",
  "machines",
  "automobiles",
  "robotics",
  "engines",
  "manufacturing",
  "design",
  "architecture",
  "environment",
  "biology",
  "chemistry",
  "medicine",
  "research",
  "finance",
  "economics",
  "creative writing",
  "visual design",
  "photography",
];
const ALL_CAREER_GOALS = [
  "Software Engineer",
  "Data Scientist",
  "AI Researcher",
  "Cybersecurity Expert",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Game Developer",
  "Cloud Engineer",
  "Product Manager",
  "Mechanical Engineer",
  "Civil Engineer",
  "Electrical Engineer",
  "Electronics Engineer",
  "Biotech Researcher",
  "Doctor / Physician",
  "Pharmacist",
  "Architect",
  "Environmental Engineer",
  "Economist",
  "Entrepreneur",
  "UX Designer",
  "Graphic Designer",
  "Teacher",
  "Research Scientist",
];

const STREAMS = {
  cse: {
    id: "cse",
    name: "Computer Science & Engineering",
    description: "Programming, software systems, algorithms, AI & data.",
    relatedSubjects: ["Mathematics", "Computer Science", "Physics"],
    relatedInterests: [
      "computers",
      "coding",
      "ai",
      "programming",
      "software",
      "apps",
      "websites",
      "technology",
    ],
    careerGoals: [
      "Software Engineer",
      "Data Scientist",
      "AI Researcher",
      "Cloud Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Cybersecurity Expert",
      "Game Developer",
    ],
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "IIIT Hyderabad",
      "BITS Pilani",
    ],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    learningPath: [
      "Programming (Python/C++)",
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Databases & SQL",
      "Operating Systems",
      "Web/App Development",
      "AI & Machine Learning Basics",
      "Version Control & Projects",
    ],
  },
  mech: {
    id: "mech",
    name: "Mechanical Engineering",
    description:
      "Design and manufacturing of machines, robotics and thermodynamics.",
    relatedSubjects: ["Physics", "Mathematics"],
    relatedInterests: [
      "machines",
      "manufacturing",
      "design",
      "automobiles",
      "robotics",
      "engines",
    ],
    careerGoals: [
      "Mechanical Engineer",
      "Robotics Engineer",
      "Automobile Engineer",
    ],
    colleges: ["IIT Madras", "IIT Bombay", "IIT Kanpur", "BITS Pilani"],
    exams: ["JEE Main", "JEE Advanced"],
    learningPath: [
      "Engineering Mechanics",
      "Thermodynamics",
      "Machine Design",
      "CAD & Solid Modeling",
      "Manufacturing Processes",
      "Robotics Basics",
    ],
  },
  civil: {
    id: "civil",
    name: "Civil Engineering",
    description:
      "Infrastructure design, construction and structural engineering.",
    relatedSubjects: ["Mathematics", "Physics"],
    relatedInterests: [
      "building",
      "infrastructure",
      "design",
      "architecture",
      "environment",
    ],
    careerGoals: [
      "Civil Engineer",
      "Structural Engineer",
      "Construction Manager",
      "Architect",
    ],
    colleges: ["IIT Roorkee", "IIT Kharagpur", "NIT Trichy"],
    exams: ["JEE Main", "JEE Advanced"],
    learningPath: [
      "Structural Design",
      "Surveying",
      "Construction Materials",
      "AutoCAD & Revit",
      "Project Management",
    ],
  },
  biotech: {
    id: "biotech",
    name: "Bio-Chemical Engineering",
    description: "Biotech, lab work, bioprocesses, food & pharma applications.",
    relatedSubjects: ["Biology", "Chemistry"],
    relatedInterests: [
      "biology",
      "chemistry",
      "biotechnology",
      "medicine",
      "research",
    ],
    careerGoals: [
      "Biotech Researcher",
      "Pharmacist",
      "Medical Devices",
      "Research Scientist",
    ],
    colleges: ["IISc Bangalore", "IIT Kharagpur", "IIT Delhi"],
    exams: ["JEE Main", "NEET (for medical routes)", "BITSAT"],
    learningPath: [
      "Cell Biology Basics",
      "Biochemistry",
      "Bioprocess Engineering",
      "Genetics & Molecular Biology",
      "Lab Practices",
    ],
  },
  ece: {
    id: "ece",
    name: "Electronics & Communications",
    description:
      "Circuits, embedded systems, communications and semiconductors.",
    relatedSubjects: ["Physics", "Mathematics"],
    relatedInterests: [
      "electronics",
      "circuits",
      "embedded systems",
      "iot",
      "telecom",
    ],
    careerGoals: [
      "Electronics Engineer",
      "Embedded Systems Developer",
      "Telecom Engineer",
    ],
    colleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "NIT Trichy"],
    exams: ["JEE Main", "JEE Advanced"],
    learningPath: [
      "Circuit Theory",
      "Signals & Systems",
      "Embedded C & Microcontrollers",
      "PCB Design",
      "Communication Systems",
    ],
  },
};

/* -------------------------
   APP STATE
------------------------- */
let state = {
  step: 1,
  email: "",
  password: "",
  stream: "",
  subjects: [],
  interests: [],
  careerGoals: [],
  recommended: [],
  chosenStreamId: null,
  completedTopics: JSON.parse(localStorage.getItem("cp_completed") || "{}"),
  quizPassed: false,
};

/* -------------------------
   UTIL: flash element (visual feedback)
------------------------- */
function flashElement(el) {
  if (!el) return;
  el.classList.add("clicked");
  setTimeout(() => el.classList.remove("clicked"), 260);
}

/* -------------------------
   NAV + PROGRESS
------------------------- */
function goTo(step) {
  state.step = step;
  document
    .querySelectorAll(".step-screen")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById("screen-" + step);
  if (el) el.classList.add("active");
  updateProgressBar();
  if (step === 2) renderSubjectGrid();
  if (step === 3) renderInterestGrid();
  if (step === 4) renderCareerGrid();
  if (step === 5) {
    computeRecommendations();
    renderRecommendations();
  }
  if (step === 6) renderStreamDetails(state.chosenStreamId);
  if (step === 7) {
    renderLearningPath();
    renderQuizArea();
    updateProfileCard();
  }
}

function updateProgressBar() {
  const total = 7;
  const percent = Math.round(((state.step - 1) / (total - 1)) * 100);
  document.getElementById("progressFill").style.width = percent + "%";

  document.querySelectorAll(".step-list .step-item").forEach((item, idx) => {
    const badge = item.querySelector(".step-badge");
    if (!badge) return;
    const stepIndex = idx + 1;
    badge.onclick = () => {
      if (stepIndex <= state.step) goTo(stepIndex);
      else alert("Please complete previous steps first.");
    };
    badge.classList.remove("active", "completed");
    if (stepIndex === state.step) badge.classList.add("active");
    else if (stepIndex < state.step) badge.classList.add("completed");
  });
}

/* -------------------------
   LOGIN
------------------------- */
function togglePassword() {
  const pwd = document.getElementById("password"),
    btn = document.getElementById("togglePwd");
  pwd.type = pwd.type === "password" ? "text" : "password";
  btn.textContent = pwd.type === "password" ? "Show" : "Hide";
}
function fillTestAccount() {
  document.getElementById("email").value = "student@example.com";
  document.getElementById("password").value = "demo1234";
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(pwd) {
  return pwd.length >= 8 && /\d/.test(pwd);
}

function extractNameFromEmail(email) {
  try {
    const local = email.split("@")[0];
    const parts = local.split(/[._\-\d]+/).filter(Boolean);
    if (parts.length === 0) return local;
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  } catch (e) {
    return email;
  }
}

function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  flashElement(document.getElementById("signInBtn"));
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters and contain a number.");
    return;
  }
  state.email = email;
  state.password = password;
  if (document.getElementById("remember").checked)
    localStorage.setItem("cp_saved", JSON.stringify({ email }));
  // set profile UI
  const name = extractNameFromEmail(email);
  state.profileName = name;
  // show profile sidebar
  updateProfileCard();
  goTo(2);
}

/* Prefill saved email if present (non-blocking) */
(function prefillSaved() {
  try {
    const s = JSON.parse(localStorage.getItem("cp_saved") || "null");
    if (s && s.email) document.getElementById("email").value = s.email;
  } catch (e) {}
})();

/* -------------------------
   PROFILE UI update
------------------------- */
function updateProfileCard() {
  const profileArea = document.getElementById("profileArea");
  const img = document.getElementById("profileImage");
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const streamEl = document.getElementById("profileStream");

  if (!state.email) {
    profileArea.style.display = "none";
    return;
  }

  profileArea.style.display = "flex";
  // use provided image url
  img.src =
    "https://cdn.vectorstock.com/i/1000v/11/81/young-student-profile-vector-13821181.jpg";
  nameEl.textContent = state.profileName || extractNameFromEmail(state.email);
  emailEl.textContent = state.email;
  streamEl.textContent = state.chosenStreamId
    ? `Stream: ${STREAMS[state.chosenStreamId].name}`
    : "";
}

/* -------------------------
   STREAM & SUBJECTS (STEP 2)
------------------------- */
function onStreamChange() {
  state.stream = document.getElementById("streamSelect").value;
  renderSubjectGrid();
}
function renderSubjectGrid() {
  const container = document.getElementById("subjectGrid");
  container.innerHTML = "";
  if (!state.stream) {
    document.getElementById("subjectHint").textContent =
      "Select a stream to see subjects.";
    return;
  }
  const list = STREAM_SUBJECTS[state.stream] || [];
  list.forEach((subject) => {
    const el = document.createElement("div");
    el.className =
      "chip" + (state.subjects.includes(subject) ? " selected" : "");
    el.textContent = subject;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.onclick = () => {
      toggleSubject(el, subject);
    };
    // keyboard accessibility
    el.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleSubject(el, subject);
      }
    };
    container.appendChild(el);
  });
  document.getElementById(
    "subjectHint"
  ).textContent = `Select between 4 and 5 subjects for accurate matching. (Selected: ${state.subjects.length})`;
}
function toggleSubject(el, subject) {
  if (state.subjects.includes(subject)) {
    state.subjects = state.subjects.filter((s) => s !== subject);
    el.classList.remove("selected");
  } else {
    if (state.subjects.length >= 5) {
      alert("Maximum 5 subjects allowed.");
      return;
    }
    state.subjects.push(subject);
    el.classList.add("selected");
  }
  flashElement(el); /* visual click feedback */
  document.getElementById(
    "subjectHint"
  ).textContent = `Select between 4 and 5 subjects for accurate matching. (Selected: ${state.subjects.length})`;
}
function validateSubjects() {
  if (!state.stream) {
    alert("Please select your 12th stream.");
    return;
  }
  if (state.subjects.length < 4) {
    alert("Please select at least 4 subjects.");
    return;
  }
  goTo(3);
}

/* -------------------------
   INTERESTS (STEP 3)
------------------------- */
function renderInterestGrid() {
  const search = (
    document.getElementById("interestSearch") || { value: "" }
  ).value
    .trim()
    .toLowerCase();
  const grid = document.getElementById("interestGrid");
  grid.innerHTML = "";
  const filtered = ALL_INTERESTS.filter((i) =>
    i.toLowerCase().includes(search)
  );
  filtered.forEach((tag) => {
    const el = document.createElement("div");
    el.className = "chip" + (state.interests.includes(tag) ? " selected" : "");
    el.textContent = tag;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.onclick = () => {
      if (state.interests.includes(tag)) {
        state.interests = state.interests.filter((x) => x !== tag);
        el.classList.remove("selected");
      } else {
        state.interests.push(tag);
        el.classList.add("selected");
      }
      flashElement(el);
    };
    el.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    };
    grid.appendChild(el);
  });
}
function filterInterests() {
  renderInterestGrid();
}
function validateInterests() {
  goTo(4);
}

/* -------------------------
   CAREER GOALS (STEP 4)
------------------------- */
let showAllCareers = false;
function renderCareerGrid() {
  const q = document.getElementById("careerSearch").value.trim().toLowerCase();
  const grid = document.getElementById("careerGrid");
  grid.innerHTML = "";
  let list = ALL_CAREER_GOALS.filter((c) => c.toLowerCase().includes(q));
  const limit = 9;
  if (!showAllCareers) list = list.slice(0, limit);
  list.forEach((goal) => {
    const el = document.createElement("div");
    el.className =
      "career-card" + (state.careerGoals.includes(goal) ? " selected" : "");
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.innerHTML = `<div><div class="career-title">${goal}</div><div class="career-meta">Tap to select</div></div>`;
    el.onclick = () => {
      if (state.careerGoals.includes(goal)) {
        state.careerGoals = state.careerGoals.filter((g) => g !== goal);
        el.classList.remove("selected");
      } else {
        state.careerGoals.push(goal);
        el.classList.add("selected");
      }
      flashElement(el);
    };
    el.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    };
    grid.appendChild(el);
  });
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const foundCount = ALL_CAREER_GOALS.filter((c) =>
    c
      .toLowerCase()
      .includes(
        document.getElementById("careerSearch").value.trim().toLowerCase()
      )
  ).length;
  seeMoreBtn.style.display =
    foundCount > 9 && !showAllCareers ? "inline-block" : "none";
}
function toggleSeeMore() {
  showAllCareers = true;
  renderCareerGrid();
}
function validateCareerGoals() {
  goTo(5);
}
document.getElementById("careerSearch").addEventListener("input", () => {
  showAllCareers = false;
  renderCareerGrid();
});

/* -------------------------
   RECOMMENDATIONS (STEP 5)
------------------------- */
function computeRecommendations() {
  const results = [];
  const userSubjects = state.subjects.map((s) => s.toLowerCase());
  const userInterests = state.interests.map((i) => i.toLowerCase());
  const userGoals = state.careerGoals.map((g) => g.toLowerCase());

  for (const key of Object.keys(STREAMS)) {
    const stream = STREAMS[key];
    let score = 0;
    let totalWeight = 0;

    const subjMatches = stream.relatedSubjects.filter((rs) =>
      userSubjects.includes(rs.toLowerCase())
    ).length;
    score += subjMatches * 4;
    totalWeight += 40;

    const interestMatches = stream.relatedInterests.filter((ri) =>
      userInterests.includes(ri.toLowerCase())
    ).length;
    score += interestMatches * 3.5;
    totalWeight += 35;

    const goalMatches = stream.careerGoals.filter((g) =>
      userGoals.includes(g.toLowerCase())
    ).length;
    score += goalMatches * 2.5 * Math.max(1, stream.careerGoals.length / 6);
    totalWeight += 25;

    const pct =
      totalWeight > 0
        ? Math.min(100, Math.round((score / totalWeight) * 100))
        : 0;
    results.push({
      id: key,
      score: pct,
      matches: { subjMatches, interestMatches, goalMatches },
    });
  }

  results.sort((a, b) => b.score - a.score);
  state.recommended = results;
}

function renderRecommendations() {
  const list = document.getElementById("streamList");
  list.innerHTML = "";
  const primaries = state.recommended.filter((r) => r.score > 50);
  const secondaries = state.recommended.filter((r) => r.score <= 50);

  const render = (arr, label) => {
    if (arr.length === 0) return;
    const header = document.createElement("div");
    header.style.marginTop = "8px";
    header.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${label}</div>`;
    list.appendChild(header);
    arr.forEach((item) => {
      const s = STREAMS[item.id];
      const card = document.createElement("div");
      card.className = "stream-card";
      const left = document.createElement("div");
      left.className = "stream-left";
      left.innerHTML = `<div class="stream-name">${s.name}</div><div class="stream-desc">${s.description}</div>`;
      const right = document.createElement("div");
      right.className = "stream-actions";
      const badge = document.createElement("div");
      badge.className = "badge-match";
      badge.textContent = item.score + "%";
      const detailsBtn = document.createElement("button");
      detailsBtn.className = "btn small";
      detailsBtn.textContent = "See details";
      detailsBtn.onclick = () => {
        state.chosenStreamId = item.id;
        goTo(6);
        flashElement(detailsBtn);
      };
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "btn small secondary";
      confirmBtn.textContent = "Confirm";
      confirmBtn.onclick = () => {
        state.chosenStreamId = item.id;
        confirmSelectedStream();
        flashElement(confirmBtn);
      };
      right.appendChild(badge);
      right.appendChild(detailsBtn);
      right.appendChild(confirmBtn);
      card.appendChild(left);
      card.appendChild(right);
      list.appendChild(card);
    });
  };

  render(primaries, "Top Fit (score > 50%)");
  render(secondaries, "Other matches (lower score)");
}

/* -------------------------
   STREAM DETAILS (STEP 6)
------------------------- */
function renderStreamDetails(key) {
  const container = document.getElementById("streamDetailsCard");
  container.innerHTML = "";
  if (!key) {
    container.innerHTML = '<p class="muted">No stream selected.</p>';
    return;
  }
  const s = STREAMS[key];
  const html = `
    <h3 style="margin-top:0">${s.name}</h3>
    <p class="muted">${s.description}</p>
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:10px">
      <div style="flex:1"><h4 style="margin:6px 0">Key skills</h4><ul>${s.learningPath
        .slice(0, 4)
        .map((x) => `<li class="muted">${x}</li>`)
        .join("")}</ul></div>
      <div style="flex:1"><h4 style="margin:6px 0">Top colleges</h4><ul>${s.colleges
        .map((x) => `<li class="muted">${x}</li>`)
        .join(
          ""
        )}</ul><h4 style="margin:6px 0; margin-top:8px">Entrance exams</h4><ul>${s.exams
    .map((x) => `<li class="muted">${x}</li>`)
    .join("")}</ul></div>
    </div>
    <div style="margin-top:12px; color:var(--muted)">Confirm to lock the stream and open the personalized learning path.</div>
  `;
  container.innerHTML = html;
}

/* Confirm selected stream -> go to learning path and remove back to recommendations */
function confirmSelectedStream() {
  if (!state.chosenStreamId) {
    alert("Please select a stream first (via recommendations).");
    return;
  }
  localStorage.setItem("cp_chosen", state.chosenStreamId);
  // update profile
  updateProfileCard();
  // go to learning path
  goTo(7);
  // hide any "back to recommendations" — (we removed it from UI)
  setTimeout(() => party(), 600);
}

/* -------------------------
   LEARNING PATH (STEP 7)
   - Adds visual progress bar
   - Adds a "resource" link per topic (Google search or targeted)
------------------------- */
function resourceLinkFor(topic) {
  const map = {
    "Programming (Python/C++)":
      "https://www.google.com/search?q=learn+python+for+beginners",
    "Data Structures & Algorithms":
      "https://www.google.com/search?q=data+structures+and+algorithms+tutorial",
    "Discrete Mathematics":
      "https://www.google.com/search?q=discrete+mathematics+tutorial",
    "Databases & SQL": "https://www.google.com/search?q=sql+tutorial",
    "Operating Systems":
      "https://www.google.com/search?q=operating+systems+tutorial",
    "Web/App Development":
      "https://www.google.com/search?q=web+development+tutorial",
    "AI & Machine Learning Basics":
      "https://www.google.com/search?q=introduction+to+machine+learning",
    "Version Control & Projects":
      "https://www.google.com/search?q=git+beginner+tutorial",
    "Engineering Mechanics":
      "https://www.google.com/search?q=engineering+mechanics+tutorial",
    Thermodynamics: "https://www.google.com/search?q=thermodynamics+tutorial",
    "Machine Design": "https://www.google.com/search?q=machine+design+tutorial",
    "CAD & Solid Modeling":
      "https://www.google.com/search?q=solidworks+tutorial",
    "Manufacturing Processes":
      "https://www.google.com/search?q=manufacturing+processes+tutorial",
    "Robotics Basics":
      "https://www.google.com/search?q=robotics+basics+tutorial",
    "Structural Design":
      "https://www.google.com/search?q=structural+design+tutorial",
    Surveying: "https://www.google.com/search?q=surveying+tutorial",
    "Construction Materials":
      "https://www.google.com/search?q=construction+materials+tutorial",
    "AutoCAD & Revit": "https://www.google.com/search?q=autocad+revit+tutorial",
    "Project Management":
      "https://www.google.com/search?q=project+management+basics",
    "Cell Biology Basics":
      "https://www.google.com/search?q=cell+biology+basics",
    Biochemistry: "https://www.google.com/search?q=biochemistry+tutorial",
    "Bioprocess Engineering":
      "https://www.google.com/search?q=bioprocess+engineering+tutorial",
    "Genetics & Molecular Biology":
      "https://www.google.com/search?q=genetics+basics",
    "Lab Practices": "https://www.google.com/search?q=lab+techniques+basics",
    "Circuit Theory": "https://www.google.com/search?q=circuit+theory+tutorial",
    "Signals & Systems":
      "https://www.google.com/search?q=signals+and+systems+tutorial",
    "Embedded C & Microcontrollers":
      "https://www.google.com/search?q=embedded+c+tutorial",
    "PCB Design": "https://www.google.com/search?q=pcb+design+tutorial",
    "Communication Systems":
      "https://www.google.com/search?q=communication+systems+tutorial",
  };
  return (
    map[topic] || `https://www.google.com/search?q=${encodeURIComponent(topic)}`
  );
}

function renderLearningPath() {
  const card = document.getElementById("learningCard");
  card.innerHTML = "";
  const id = state.chosenStreamId;
  if (!id) {
    card.innerHTML = '<p class="muted">No stream confirmed.</p>';
    return;
  }
  const s = STREAMS[id];

  const title = document.createElement("h3");
  title.textContent = s.name;
  const desc = document.createElement("p");
  desc.className = "muted";
  desc.textContent = s.description;
  card.appendChild(title);
  card.appendChild(desc);

  // visual progress bar area
  const progressWrap = document.createElement("div");
  progressWrap.className = "learning-progress";
  progressWrap.innerHTML = `<div class="fill" id="learningFill"></div>`;
  card.appendChild(progressWrap);

  const skillsHeader = document.createElement("h4");
  skillsHeader.textContent = "What to learn (check topics as you complete)";
  card.appendChild(skillsHeader);

  const list = document.createElement("div");
  s.learningPath.forEach((topic, idx) => {
    const todo = document.createElement("div");
    todo.className =
      "todo" + (state.completedTopics[topic] ? " completed" : "");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!state.completedTopics[topic];
    cb.disabled = idx > 0 && !state.completedTopics[s.learningPath[idx - 1]];
    cb.onchange = () => {
      if (cb.checked) {
        // open quiz modal for this topic to unlock (gated)
        openQuizModal(topic, idx, s.learningPath.length);
      } else {
        cb.checked = false; // prevent uncheck
      }
    };

    const label = document.createElement("div");
    label.style.display = "flex";
    label.style.justifyContent = "space-between";
    label.style.alignItems = "center";
    label.style.width = "100%";
    const text = document.createElement("div");
    text.textContent = topic;
    const res = document.createElement("a");
    res.href = resourceLinkFor(topic);
    res.target = "_blank";
    res.className = "resource";
    res.textContent = "Resources";
    label.appendChild(text);
    label.appendChild(res);

    todo.appendChild(cb);
    todo.appendChild(label);
    list.appendChild(todo);
  });
  card.appendChild(list);

  // exams & colleges summary
  const exams = document.createElement("div");
  exams.style.marginTop = "12px";
  exams.innerHTML = `<h4>Entrance exams</h4><div class="muted">${s.exams.join(
    ", "
  )}</div>`;
  const colleges = document.createElement("div");
  colleges.style.marginTop = "12px";
  colleges.innerHTML = `<h4>Top colleges</h4><div class="muted">${s.colleges.join(
    ", "
  )}</div>`;
  card.appendChild(exams);
  card.appendChild(colleges);

  updateProgressStats();
  document.getElementById("quizCard").style.display = "block";
  // also update sidebar profile's chosen stream
  updateProfileCard();
}

function updateProgressStats() {
  const id = state.chosenStreamId;
  if (!id) return;
  const s = STREAMS[id];
  const total = s.learningPath.length;
  const completed = s.learningPath.filter(
    (t) => !!state.completedTopics[t]
  ).length;
  // update text stat
  const existing = document.querySelector("#learningCard .progress-stats");
  if (existing) existing.remove();
  const stats = document.createElement("div");
  stats.className = "progress-stats";
  stats.textContent = `Progress: ${completed} of ${total} topics completed (${Math.round(
    (completed / total) * 100
  )}%)`;
  document.getElementById("learningCard").appendChild(stats);
  // update visual fill
  const fill = document.getElementById("learningFill");
  if (fill) fill.style.width = (completed / total) * 100 + "%";
  // save completed topics persistently
  localStorage.setItem("cp_completed", JSON.stringify(state.completedTopics));
  // if all done celebrate
  if (completed === total && total > 0) {
    setTimeout(() => {
      confettiBurst();
      alert(
        "🎉 Congratulations — you have finished all topics for this learning path!"
      );
    }, 300);
  }
}

/* -------------------------
   QUIZ modal (per-step). When passed, mark topic completed and unlock next.
------------------------- */
const SAMPLE_QUIZ = [
  {
    q: "Which subject is most essential for Computer Science?",
    opts: ["History", "Mathematics", "Biology"],
    a: 1,
  },
  {
    q: "Which skill is core to Mechanical Engineering?",
    opts: ["CAD & Machine Design", "Frontend UI", "Database SQL"],
    a: 0,
  },
  {
    q: "Which exam is commonly required for IIT admissions?",
    opts: ["NEET", "JEE Main", "CAT"],
    a: 1,
  },
];

function openQuizModal(topic, idx, total) {
  const modal = document.getElementById("quizModal");
  const content = document.getElementById("quizContent");
  const quizQ = SAMPLE_QUIZ[idx % SAMPLE_QUIZ.length];
  content.innerHTML = `
    <h3>Quiz for: ${topic}</h3>
    <p style="margin-top:6px">${quizQ.q}</p>
    ${quizQ.opts
      .map(
        (o, i) =>
          `<div class="radio"><input type="radio" name="quizAns" value="${i}"/> <span style="margin-left:8px">${o}</span></div>`
      )
      .join("")}
    <div style="margin-top:14px; display:flex; gap:10px; justify-content:flex-end">
      <button class="btn" onclick="submitStepQuiz('${topic}',${
    quizQ.a
  },${idx},${total})">Submit</button>
      <button class="btn secondary" onclick="closeQuizModal()">Cancel</button>
    </div>
  `;
  modal.style.display = "flex";
}
function closeQuizModal() {
  document.getElementById("quizModal").style.display = "none";
}

function submitStepQuiz(topic, correctIdx, idx, total) {
  const sel = document.querySelector('input[name="quizAns"]:checked');
  if (!sel) {
    alert("Please choose an answer.");
    return;
  }
  if (Number(sel.value) === correctIdx) {
    state.completedTopics[topic] = true;
    localStorage.setItem("cp_completed", JSON.stringify(state.completedTopics));
    closeQuizModal();
    renderLearningPath();
    updateProgressStats();
    // small success feedback
    alert("✅ Correct! Step unlocked.");
  } else {
    alert("❌ Wrong answer. Try again.");
  }
}

/* -------------------------
   QUIZ area card (longer quiz) - optional submit
------------------------- */
function renderQuizArea() {
  const area = document.getElementById("quizArea");
  if (!area) return;
  area.innerHTML = "";
  SAMPLE_QUIZ.forEach((item, idx) => {
    const block = document.createElement("div");
    block.style.padding = "8px 0";
    const q = document.createElement("div");
    q.textContent = idx + 1 + ". " + item.q;
    q.style.fontWeight = "700";
    block.appendChild(q);
    item.opts.forEach((opt, oi) => {
      const row = document.createElement("label");
      row.className = "radio";
      const r = document.createElement("input");
      r.type = "radio";
      r.name = "q" + idx;
      r.value = oi;
      row.appendChild(r);
      const span = document.createElement("span");
      span.textContent = opt;
      span.style.marginLeft = "8px";
      row.appendChild(span);
      block.appendChild(row);
    });
    area.appendChild(block);
  });
  const submit = document.createElement("button");
  submit.className = "btn";
  submit.textContent = "Submit Quiz";
  submit.onclick = submitQuiz;
  area.appendChild(submit);
}
function submitQuiz() {
  let score = 0;
  SAMPLE_QUIZ.forEach((item, idx) => {
    const sel = document.querySelector(`input[name="q${idx}"]:checked`);
    if (sel && Number(sel.value) === item.a) score++;
  });
  if (score === SAMPLE_QUIZ.length) {
    state.quizPassed = true;
    alert("Excellent! You passed the quiz.");
  } else
    alert(
      `You scored ${score} of ${SAMPLE_QUIZ.length}. Review the learning topics and try again.`
    );
}

/* -------------------------
   Helpers: confetti & misc
------------------------- */
function confettiBurst() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  const pieces = [];
  const colors = ["#ff7b7b", "#ffd166", "#86efac", "#60a5fa", "#c084fc"];
  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: Math.random() * w,
      y: Math.random() * -h,
      vx: (Math.random() - 0.5) * 6,
      vy: 2 + Math.random() * 6,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
    });
  }
  let frames = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rot += 4;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frames++;
    if (frames < 220) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, w, h);
  }
  draw();
}
function party() {
  confettiBurst();
}

/* -------------------------
   INIT
------------------------- */
(function init() {
  // initial small render calls
  renderSubjectGrid();
  renderInterestGrid();
  renderCareerGrid();
  updateProgressBar();

  // subtle: make regular buttons show brief clicked animation
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".btn");
    if (b) {
      b.classList.add("clicked");
      setTimeout(() => b.classList.remove("clicked"), 260);
    }
  });
})();
