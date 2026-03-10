export default async function decorate(block) {
  const nameError = "Please enter your name";
  const nameError1="Please enter a valid name";
  const emailError2 = "Please enter a valid email address";
  const dobError3 = "Please enter your date of birth";
  block.append("");
  block.innerHTML = `
    <div class="basic-detail-container">

      <div class="form-container">
      <h2>Help us get acquainted with you.</h2>
      <form id="basic-detail-form" action="/api/sitecore/TrvFmpApi/CustomerEnquiry" method="POST" novalidate>
        <div class="form-group-container">
        <div class="form-group">
          <input type="text" id="name" class="inputfield" name="name" placeholder="Full Name*" required>
          <em id="name-error" class="error invalid-feedback">${nameError}</em>
      
      </div>
       
       <div class="form-group">
          <input type="email" id="email" name="email" class="inputfield" placeholder="Email*" required>
          <em id="email-error" class="error invalid-feedback">${emailError2}</em>
      
      </div>
      <div class="form-group">
          <input type="date" id="dob" class="inputfield datepicker" name="dob" placeholder="Date of Birth*" required>
          <em id="dob-error" class="error invalid-feedback">${dobError3}</em>
      
      </div>
      <div class="form-group checkbox-group">
          <input type="checkbox" id="terms" name="terms" required>
          <label for="terms">I Accept the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" data-wa-link="_undefined_Term of Use._undefined">Term of Use.</a> I am explicitly soliciting a call and message via whatsapp and other medium &amp; I am allowing this information to be used by Maruti Suzuki &amp; its partners to customize the loan offerings to my profile in accordance with the  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" data-wa-link="_undefined_MSIL privacy policy._undefined">MSIL privacy policy.</a> The loan process would be subject to <a href="javascript:void(0);" data-toggle="modal" data-target=".terms-condition-popup" data-wa-link="_undefined_these terms_undefined">these terms</a>.
                            <input type="checkbox" required="required" id="policyy" name="policyy" class="policyy" data-error="Please Accept the Terms of Use  Checkbox">
                            <div class="check-err"></div>
                            <span class="checkmark"></span></label>
         <span class="checkmark"></span>
      </div>
       <div id="terms-error" class="error invalid-feedback">You must agree to the terms and conditions</div>
      <div class="form-group">
          <button type="submit">Submit</button>
      </div>
      </form>
      </div>
    </div>
     `;
  const form = block.querySelector("#basic-detail-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // always prevent default first

    // Get fields
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const dob = form.querySelector("#dob");
    const terms = form.querySelector("#terms");

    const nameError = form.querySelector("#name-error");
    const emailError = form.querySelector("#email-error");
    const dobError = form.querySelector("#dob-error");
    const termsError = form.querySelector("#terms-error");

    let isValid = true;

    // Reset previous errors
    document.querySelectorAll(".invalid-feedback").forEach((el) => {
      el.style.display = "none";
    });

    name.classList.remove("input-error");
    email.classList.remove("input-error");
    dob.classList.remove("input-error");

    // =========================
    // Name Validation
    // =========================
    if (!name.value.trim()) {
      nameError.style.display = "block";
      name.classList.add("input-error");
      isValid = false;
    }

    // =========================
    // Email Validation
    // =========================
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim() || !emailPattern.test(email.value)) {
      emailError.style.display = "block";
      email.classList.add("input-error");
      isValid = false;
    }

    // =========================
    // DOB Validation
    // =========================
    if (!dob.value) {
      dobError.style.display = "block";
      dob.classList.add("input-error");
      isValid = false;
    }

    // =========================
    // Terms Checkbox Validation
    // =========================
    if (!terms.checked) {
      termsError.style.display = "block";
      isValid = false;
    }

    // Stop if invalid
    if (!isValid) return;

    // =========================
    // Submit Form Data
    // =========================
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // Success Handling
      alert("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  });
}
