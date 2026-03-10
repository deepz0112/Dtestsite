export default async function decorate(block) {
  const [heading, label1, error1, label2, error2, label3, error3, ctalabel, ctalink, termstext, termserror, termslink] = Array.from(block.children).map((el, i) =>
    i === 2 ? el?.querySelector('img')?.src || '' : el?.textContent?.trim() || ''
  );
  const head1 = heading || '';
  const Label1 = label1 || 'Full Name';
  const Error1 = error1 || 'Please enter your full name';
  const Label2 = label2 || 'Email';
  const Error2 = error2 || 'Please enter a valid email address';
  const Label3 = label3 || 'Date Of Birth';
  const Error3 = error3 || 'Please enter your date of birth';
  const CTALabel = ctalabel || 'Submit';
  const CTALink = ctalink || '#';
  const TermsText = termstext || 'I agree to the terms and conditions';
  const TermsError = termserror || 'You must agree to the terms and conditions';
  const TermsLink = termslink || '#';

console.log('head1', head1);
  block.innerHTML = `
    <div class="basic-detail-container">

      <div class="form-container">
      <h2>${head1}</h2>
      <form id="basic-detail-form" action="${CTALink}" method="POST" novalidate>
        <div class="form-group-container">
        <div class="form-group">
          <input type="text" id="label1" class="inputfield" name="name" placeholder="${Label1}" required>
          <em id="name-error" class="error invalid-feedback">${Error1}</em>
      
      </div>
       
       <div class="form-group">
          <input type="email" id="label2" name="email" class="inputfield" placeholder="${Label2}*" required>
          <em id="email-error" class="error invalid-feedback">${Error2}</em>
      
      </div>
      <div class="form-group">
          <input type="text" id="label3" class="inputfield" name="dob" placeholder="${Label3}*" required>
          <em id="dob-error" class="error invalid-feedback">${Error3}</em>
      
      </div>
      <div class="form-group checkbox-group">
          <input type="checkbox" id="terms" name="terms" required>
          <label for="terms"><a href="${TermsLink}" target="_blank">${TermsText}</a></label>
          <div id="terms-error" class="error invalid-feedback">You must agree to the terms and conditions</div>
      </div>
      <div class="form-group">
          <button type="submit">${CTALabel}</button>
      </div>
      </form>
      </div>
    </div>
     `;
}
