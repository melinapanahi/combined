document.addEventListener('DOMContentLoaded', function () {
  
  // Feadback form
 
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    // stop page reload
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    let answerText;

    if (subject === "tickets") {
      answerText = "Ticket prices are on our Prices page — our visitor desk can help with anything else.";
    } else if (subject === "planetarium") {
      answerText = "Our planetarium team will confirm show times and seat availability for your date.";
    } else if (subject === "groups") {
      answerText = "Our education team will get back to you with availability and a group quote.";
    } else {
      answerText = "Thanks for your message — we usually answer within one business day.";
    }

    const fullText = `Hi ${name}, ${answerText} We received your message: "${message}". A confirmation has been noted for ${email}.`;

    // show text in the block #answer
    document.getElementById('answer-text').textContent = fullText;
    document.getElementById('answer').style.display = "block";

    // reset form
    form.reset();
  });

});