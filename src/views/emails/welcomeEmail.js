module.exports = (user) => `
  <html>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>👋 Welcome, ${user.name}!</h1>
        </div>
        
        <div class="email-body">
          <p>Hi <strong>${user.name}</strong>,</p>
          <p>
            Thanks for logging in to <strong>our website</strong> ✨ 
            We're excited to have you on board and can't wait for you 
            to explore everything we've built for you.
          </p>
          
          <p>
            🚀 Discover features, connect with others, and make the most of your journey with us!
          </p>

        <div class="email-footer">
          <p>Made with ❤️ by Our Team</p>
        </div>
      </div>
    </body>
  </html>
`;
