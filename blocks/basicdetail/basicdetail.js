export default async function decorate(block) {
 
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
          <input type="text" id="dob" class="inputfield" name="dob" placeholder="${Label3}*" required>
          <em id="dob-error" class="error invalid-feedback">${dobError3}</em>
      
      </div>
      <div class="form-group checkbox-group">
          <input type="checkbox" id="terms" name="terms" required>
          <label for="terms">I Accept the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" data-wa-link="_undefined_Term of Use._undefined">Term of Use.</a> I am explicitly soliciting a call and message via whatsapp and other medium &amp; I am allowing this information to be used by Maruti Suzuki &amp; its partners to customize the loan offerings to my profile in accordance with the  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" data-wa-link="_undefined_MSIL privacy policy._undefined">MSIL privacy policy.</a> The loan process would be subject to <a href="javascript:void(0);" data-toggle="modal" data-target=".terms-condition-popup" data-wa-link="_undefined_these terms_undefined">these terms</a>.
                            <input type="checkbox" required="required" id="policyy" name="policyy" class="policyy" data-error="Please Accept the Terms of Use  Checkbox">
                            <div class="check-err"></div>
                            <span class="checkmark"></span></label>
         
      </div>
       <div id="terms-error" class="error invalid-feedback">You must agree to the terms and conditions</div>
      <div class="form-group">
          <button type="submit">Submit</button>
      </div>
      </form>
      </div>
    </div>
     `;
}
