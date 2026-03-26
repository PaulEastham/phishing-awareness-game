/* EMAIL DATA */
const emails = [
  {
    from: "info.wwypv@phc.diocesewnc.org>",
    subject: "We've received 62 complaints about your Email - ID:WKNOM",
    body: `
      <p>Your iClod storage is almost full. Once you exceed your storage limit, you will no longer be able to back up
      your photos, documents, contacts, and device data. This means your new
      photos and videos will stop uploading to iCloud, and cloud storage as well as cloud apps
      will no longer be updated accross your devices.</p><br>
      <p>We understand how important it is to keep your data safe.<br>
      Thats why we're offering you an exclusive deal. Click the button below to get 50GB of free storage!</P>
      <p><a href="#">Get 50GB Free</a></p>
    `,
    isPhish: true
  },
  {
    from: "info@outlook-support.dk",
    subject: "MS Outlook Support",
    body: `
    <img src="images/Copilot_20260326_201051.png" class="left" width="300" height="100" alt="cartoon officer">
     <br> Dear User,
      <p>All Hotmail customers have been upgraded to Outlook.com. Youre Hotmail Account services has expired.</p><br>
      <p>Due to our new system upgrade to Outlook. In order for it to remain active<br>follow the link sign in Re-activate your account to Outlook.<br>
      <a href="https://www.account.live.com"><br>
      Thanks,<br>
      The Microsoft account team</p>
    `,
    isPhish: false
  },
  {
    from: "Microsoft 365 Security <security@m1crosoft365.com>",
    subject: "Suspicious login detected",
    body: `
      <p>We detected a login from Russia. Verify now:</p>
      <p><a href="#">Review activity</a></p>
    `,
    isPhish: true
  }
];

/* STATE */
let index = 0;
let correct = 0;
let streak = 0;
let bestStreak = 0;

/* ELEMENTS */
const screens = {
  home: document.getElementById("screen-home"),
  game: document.getElementById("screen-game"),
  results: document.getElementById("screen-results")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

/* GAME LOGIC */
const elFrom = document.getElementById("from");
const elSubject = document.getElementById("subject");
const elBody = document.getElementById("body");
const elFeedback = document.getElementById("feedback");
const elNext = document.getElementById("btn-next");

function loadEmail() {
  const email = emails[index];
  elFrom.innerHTML = email.from;
  elSubject.innerHTML = email.subject;
  elBody.innerHTML = email.body;
  elFeedback.innerHTML = "";
}

/* TIPS CARD */
const tipsCard = document.getElementById("tips-card");
const tipsMessage = document.getElementById("tips-message");
const tipsClose = document.getElementById("tips-close");
const nextBtn = document.getElementById("btn-next");

function showTip(message) {
  tipsMessage.textContent = message;
  tipsCard.classList.remove("hidden");
  nextBtn.disabled = true;
}

tipsClose.addEventListener("click", () => {
  tipsCard.classList.add("hidden");
  nextBtn.disabled = false;
});

/* SAFE BUTTON */
document.getElementById("btn-safe").addEventListener("click", () => {
  const email = emails[index];
  const isCorrect = email.isPhish === false;

  showTip(
    isCorrect
      ? "Correct! Always check the sender address."
      : "Incorrect. Look for urgent or threatening language."
  );
});

/* PHISH BUTTON */
document.getElementById("btn-phish").addEventListener("click", () => {
  const email = emails[index];
  const isCorrect = email.isPhish === true;

  showTip(
    isCorrect
      ? "Correct! Hover links before clicking."
      : "Incorrect. This email used a spoofed domain."
  );
});

/* NEXT BUTTON */
document.getElementById("btn-next").onclick = () => {
  index++;
  if (index >= emails.length) {
    showResults();
  } else {
    loadEmail();
  }
};

function showResults() {
  showScreen("results");

  const accuracy = Math.round((correct / emails.length) * 100);

  document.getElementById("final-score").textContent = `${correct} / ${emails.length}`;
  document.getElementById("final-accuracy").textContent = `${accuracy}%`;
  document.getElementById("final-streak").textContent = bestStreak;
}

/* FRONT PAGE BUTTON */
document.getElementById("start-btn").onclick = () => {
  index = 0;
  correct = 0;
  streak = 0;
  bestStreak = 0;

  loadEmail();
  showScreen("game");
};

/* RESTART BUTTON */
document.getElementById("restart-btn").onclick = () => {
  index = 0;
  correct = 0;
  streak = 0;
  bestStreak = 0;

  loadEmail();
  showScreen("game");
};
/* QR CODE */
const gameUrl = "http://127.0.0.1:5500/phishing-game.html";
new QRCode(document.getElementById("qrcode"), {
    text: "http://127.0.0.1:5500/phishing-game.html",
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});