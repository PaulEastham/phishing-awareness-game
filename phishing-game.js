//---------------------------------- SHUFFLE FUNC -----------------------------------------------------------------------------------------------//
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



//------------------------------------- TIP GENERATOR ----------------------------------------------------------------------------------------//
const tips = [
  "Always check the sender’s full email address.",
  "Hover over links before clicking to reveal the real destination.",
  "Look for spelling mistakes or odd grammar — scammers often rush.",
  "Be cautious of emails that create urgency or fear.",
  "Never enter passwords after clicking a link in an email.",
  "Check for mismatched or unusual domains (e.g., micr0soft-support.com).",
  "Don’t trust attachments you weren’t expecting.",
  "Banks and government services will never ask for passwords by email.",
  "If an offer seems too good to be true, it usually is.",
  "Check for generic greetings like 'Dear Customer'.",
  "Look for inconsistencies in branding, logos, or colours.",
  "Don’t trust emails asking you to 'verify your account immediately'.",
  "Never download software from links in unsolicited emails.",
  "If unsure, contact the company using their official website — not the email link.",
  "Watch out for fake delivery notifications asking you to pay a fee.",
  "Multi‑factor authentication protects you even if your password leaks.",
  "Scammers often impersonate colleagues — double‑check unusual requests.",
  "Don’t trust emails claiming you’ve won a prize you never entered.",
  "Check the 'reply‑to' address — it may differ from the sender.",
  "Be cautious of QR codes in unexpected emails.",
  "Never approve MFA prompts you didn’t trigger yourself.",
  "When in doubt, report it — better safe than sorry."
];


//-------------------------------------- STATE -----------------------------------------------------------------------------------------------//
let index = 0;
let correct = 0;
let streak = 0;
let bestStreak = 0;
let answered = false;

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


//------------------------------- GAME LOGIC ---------------------------------------------------------------------------------------------------//
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


//---------------------------------------- TIPS CARD ----------------------------------------------------------------------------------------------//
const tipsCard = document.getElementById("tips-card");
const tipsMessage = document.getElementById("tips-message");
const tipsClose = document.getElementById("tips-close");
const nextBtn = document.getElementById("btn-next");

function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
}

tipsClose.addEventListener("click", () => {
  tipsCard.classList.add("hidden");
});


//---------------------------------------- MOVE TO NEXT EMAIL ------------------------------------------------------------------------//
document.getElementById("btn-next").addEventListener("click", () => {  
index++;

  if (index >= emails.length) {
    showResults();
  } else {
    loadEmail();
  }
});


//---------------------------------- SAFE BUTTON ----------------------------------------------------------------------------------------//
function handleGuess(guessIsPhish) {
  const email = emails[index];
  const isCorrect = email.isPhish === guessIsPhish;

  if (isCorrect) {
    correct++;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    showTip(`Correct! ${getRandomTip()}`);
  } else {
    streak = 0;
    triggerPoliceAlert();
    setTimeout(() => showTip(`Incorrect. ${getRandomTip()}`), 2000);
  }
}

document.getElementById("btn-safe").addEventListener("click", () => handleGuess(false));
document.getElementById("btn-phish").addEventListener("click", () => handleGuess(true));


//------------------  RESULTS FUNC -------------------------------------------------------------------------------------------------//
function showResults() {
  showScreen("results");
  const accuracy = Math.round((correct / emails.length) * 100);
  document.getElementById("final-score").textContent = `${correct} / ${emails.length}`;
  document.getElementById("final-accuracy").textContent = `${accuracy}%`;
  document.getElementById("final-streak").textContent = bestStreak;
}


//---------------------------------------------- FRONT PAGE BUTTON ------------------------------------------------------------------//
document.getElementById("start-btn").onclick = () => {
  index = 0;
  correct = 0;
  streak = 0;
  bestStreak = 0;

  shuffle(emails);

  loadEmail();
  showScreen("game");
};


//------------------------------------------------ EMAIL DATA -------------------------------------------------------------------------//
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
    <img src="images/outlook2.png" class="left" width="150" height="100" alt="outlook logo">
     <br> Dear User,
      <p>All Hotmail customers have been upgraded to Outlook.com. Youre Hotmail Account services has expired.</p><br>
      <p>Due to our new system upgrade to Outlook. In order for it to remain active<br>follow the link sign in Re-activate your account to Outlook.<br>
      <p><a href="#">https://www.account.live.com</a></p>
      <p>Thanks,</p>
      <p>Microsoft Support Team</p>
    `,
    isPhish: true
  },
  {
    from: "Sky sky@notifications.contact.sky",
    subject: "Your password has been changed",
    body: `
      <img src="images/sky.jpg" class="left" width="150" height="100" alt="sky logo">
      <h2>Your password has been changed</h2><br>
       <p>
    As requested, we've changed the password that you use to sign into Sky services. 
    You will no longer be able to sign in using any of your previous passwords.
  </p>
  <p>
    If you didn't ask us to change your password, 
    <a href="https://www.sky.com/help" target="_blank" rel="noopener noreferrer">
      contact us
    </a> so we can help keep your account secure.
  </p>
    `,
    isPhish: false
  },
  {
    from: "Royal Mail delivery@royalmail-fee.co.uk",
    subject: "Your parcel is waiting – unpaid fee",
    body: `
    <img src="images/rm logo.webp" class="left" width="150" height="100" alt="royal mail logo">
    <p>Your parcel is being held due to an unpaid fee of £1.99.</p>
    <p>Please pay now to release your delivery.</p>
    <p><a href="#">Pay Fee</a></p>
    `,
    isPhish: true
  },
   {
    from: "NHS Appointments noreply@nhs.net",
    subject: "Appointment Reminder",
    body: `
    <img src="images/nhs.png" class="left" width="150" height="100" alt="nhs logo">
    <p>This is a reminder for your upcoming appointment.</p>
    <p>If you need to cancel or reschedule, please use the NHS App.</p>
    `,
    isPhish: false
  },
   
  
];


//------------------------------------------------- RETURN TO START -------------------------------------------------------------------------//
document.getElementById("end-btn").onclick = () => {
  index = 0;
  correct = 0;
  streak = 0;
  bestStreak = 0;

  showScreen("home");
};
shuffle(emails);


//--------------------------------------------------- POLICE ALERT ---------------------------------------------------------------------//
function triggerPoliceAlert() {
  const alertOverlay = document.getElementById("police-alert");
  const siren = document.getElementById("siren-sound");

  
//-------------------------------------- SHOW FLASHING OVERLAY ------------------------------------------------------------------------//
  alertOverlay.style.display = "block";


//----------------------- PLAY SIREN --------------------------------------------------------------------------------------------------//
  if (siren) {
    siren.currentTime = 0;
    siren.play().catch(() => {});
  }

  
//-------------------------- AUTO STOP AFTER 1s -----------------------------------------------------------------------------------//
  setTimeout(() => {
    alertOverlay.style.display = "none";
    if (siren) siren.pause();
  }, 2000);
}
