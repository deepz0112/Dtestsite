export default async function decorate(block) {
  // Guard: don't render twice
  console.log('Decorating basic detail block');
  if (block.dataset.decorated) return;
  block.dataset.decorated = 'true';

  const NAME_EMPTY = "Please enter your name";
  const NAME_INVALID = "Please enter a valid name";
  const EMAIL_INVALID = "Please enter a valid email address";
  const DOB_EMPTY = "Please enter your date of birth";
  const TERMS_ERROR = "You must agree to the terms and conditions";

  // Render markup
  block.innerHTML='';
  block.innerHTML = `
    <div class="basic-detail-container">
      <div class="form-container">
        <h2>Help us get acquainted with you.</h2>
        <form id="basic-detail-form" action="/api/sitecore/TrvFmpApi/CustomerEnquiry" method="POST" novalidate>
        <div class="form-group-container">
        <div class="form-group">
            <input type="text" id="name" class="inputfield" name="name" placeholder="Full Name*" required>
            <em id="name-error" class="error invalid-feedback">${NAME_EMPTY}</em>
          </div>

          <div class="form-group">
            <input type="email" id="email" name="email" class="inputfield" placeholder="Email*" required>
            <em id="email-error" class="error invalid-feedback">${EMAIL_INVALID}</em>
          </div>

          <div class="form-group">
            <input type="date" id="dob" class="inputfield datepicker" name="dob" required>
            <em id="dob-error" class="error invalid-feedback">${DOB_EMPTY}</em>
          </div>

          <!-- Single checkbox only -->
          <div class="form-group checkbox-group">
            <input type="checkbox" id="terms" name="terms" required>
            <label for="terms">
              I Accept the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a>.
              I am explicitly soliciting calls/messages and allowing Maruti Suzuki & partners to use this info per the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">MSIL privacy policy</a>.
              The loan process would be subject to <a href="javascript:void(0);" data-toggle="modal" data-target=".terms-condition-popup">these terms</a>.
            </label>
            <em id="terms-error" class="error invalid-feedback">${TERMS_ERROR}</em>
            <span class="checkmark"></span>
          </div>

          <div class="form-group">
            <button type="submit" id="submit-btn">Submit</button>
          </div>
          </div> 
        </form>
      </div>
    </div>
  `;

  // Basic styles (you can move to stylesheet)
  const style = document.createElement('style');
  style.textContent = `
    .invalid-feedback { display: none; color: #d9534f; font-size: 12px; margin-top:6px; }
    .input-error { border: 1px solid #d9534f !important; }
    .form-group { margin-bottom: 12px; }
    button[disabled] { opacity: 0.6; cursor: not-allowed; }
  `;
  document.head.appendChild(style);

  // Elements
  const form = block.querySelector("#basic-detail-form");
  const inputName = form.querySelector("#name");
  const inputEmail = form.querySelector("#email");
  const inputDob = form.querySelector("#dob");
  const inputTerms = form.querySelector("#terms");
  const submitBtn = form.querySelector("#submit-btn");

  const nameErrEl = form.querySelector("#name-error");
  const emailErrEl = form.querySelector("#email-error");
  const dobErrEl = form.querySelector("#dob-error");
  const termsErrEl = form.querySelector("#terms-error");

  // Helper to hide all errors
  function clearErrors() {
    [nameErrEl, emailErrEl, dobErrEl, termsErrEl].forEach(el => el.style.display = 'none');
    [inputName, inputEmail, inputDob].forEach(i => i.classList.remove('input-error'));
  }

  // Simple validators
  function validateName(value) {
    if (!value || !value.trim()) return { ok: false, message: NAME_EMPTY };
    // optional: stricter name check (letters, spaces, dots, hyphen)
    const namePattern = /^[A-Za-z.\-'\s]{2,}$/;
    if (!namePattern.test(value.trim())) return { ok: false, message: NAME_INVALID };
    return { ok: true };
  }

  function validateEmail(value) {
    if (!value || !value.trim()) return { ok: false, message: EMAIL_INVALID };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { ok: emailPattern.test(value.trim()) };
  }

  function validateDob(value) {
    if (!value) return { ok: false, message: DOB_EMPTY };
    // optional: check reasonable DOB (not future)
    const d = new Date(value);
    const now = new Date();
    if (isNaN(d.getTime()) || d > now) return { ok: false, message: DOB_EMPTY };
    return { ok: true };
  }

  // Real-time (on blur) validation to improve UX
  inputName.addEventListener('blur', () => {
    const res = validateName(inputName.value);
    if (!res.ok) {
      nameErrEl.textContent = res.message || NAME_EMPTY;
      nameErrEl.style.display = 'block';
      inputName.classList.add('input-error');
    } else {
      nameErrEl.style.display = 'none';
      inputName.classList.remove('input-error');
    }
  });

  inputEmail.addEventListener('blur', () => {
    const ok = validateEmail(inputEmail.value).ok ?? validateEmail(inputEmail.value);
    if (!ok) {
      emailErrEl.style.display = 'block';
      inputEmail.classList.add('input-error');
    } else {
      emailErrEl.style.display = 'none';
      inputEmail.classList.remove('input-error');
    }
  });

  inputDob.addEventListener('blur', () => {
    const res = validateDob(inputDob.value);
    if (!res.ok) {
      dobErrEl.style.display = 'block';
      inputDob.classList.add('input-error');
    } else {
      dobErrEl.style.display = 'none';
      inputDob.classList.remove('input-error');
    }
  });

  // Submit handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Name
    const nameValidation = validateName(inputName.value);
    if (!nameValidation.ok) {
      nameErrEl.textContent = nameValidation.message || NAME_EMPTY;
      nameErrEl.style.display = 'block';
      inputName.classList.add('input-error');
      isValid = false;
    }

    // Email
    const emailOk = validateEmail(inputEmail.value);
    if (!emailOk.ok) {
      emailErrEl.style.display = 'block';
      inputEmail.classList.add('input-error');
      isValid = false;
    }

    // DOB
    const dobValidation = validateDob(inputDob.value);
    if (!dobValidation.ok) {
      dobErrEl.textContent = dobValidation.message || DOB_EMPTY;
      dobErrEl.style.display = 'block';
      inputDob.classList.add('input-error');
      isValid = false;
    }

    // Terms
    if (!inputTerms.checked) {
      termsErrEl.style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      // focus first invalid field for accessibility
      const firstInvalid = form.querySelector('.input-error') || form.querySelector('.invalid-feedback[style*="display: block"]');
      if (firstInvalid) firstInvalid.focus?.();
      return;
    }

    // Prepare submit
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        credentials: 'same-origin',
        headers: {
          // don't set Content-Type when sending FormData
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        // try to parse error message if available
        let msg = 'Submission failed';
        try {
          const json = await response.json();
          msg = json?.message || msg;
        } catch (_err) { /* ignore */ }
        throw new Error(msg);
      }

      // success
      // try to parse success message
      let successMessage = 'Form submitted successfully!';
      try {
        const json = await response.json();
        if (json?.message) successMessage = json.message;
      } catch (_e) { /* ignore */ }

      // Replace alert with inline success if you prefer
      alert(successMessage);
      form.reset();
    } catch (err) {
      console.error(err);
      // show generic inline error under submit button (or use alert)
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}