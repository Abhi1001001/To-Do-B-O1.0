<h1>Backend ---> To-Do Application API</h1>
<p>This is the backend service for the To-Do app. It handles user authentication, password reset, logging errors, and full CRUD operations for todos. The backend is built using Node.js, Express, TypeScript, and MongoDB.</p>
<hr>
<h2>Features ---></h2>
<ul>
  <li>User Signup & Login with JWT</li>
  <li>Forgot Password & Reset Password (email support)</li>
  <li>CRUD operations for todos</li>
  <li>Toggle complete status</li>
  <li>Error logging stored in MongoDB</li>
  <li>Secure authentication middleware</li>
</ul>
<hr>
<h2>Environment Variables ---></h2>
<p>Add a <strong>.env</strong> file in the backend folder.</p>
<pre>
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
RESET_TOKEN_EXPIRES_MINUTES=60
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RESET_URL=http://localhost:5173/reset
</pre>
<hr>
<h2>Installation ---></h2>
<pre>
cd backend
npm install
</pre>
<hr>
<h2>Start the Server ---></h2>
<pre>
npm run dev
</pre>
<p>The API will start on:</p>
<p><strong>http://localhost:4000</strong></p>
<hr>
<h2>Technologies Used ---></h2>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>TypeScript</li>
  <li>MongoDB / Mongoose</li>
  <li>Nodemailer (for sending reset emails)</li>
  <li>JWT Authentication</li>
</ul>
<hr>
<h2>Notes ---></h2>
<ul>
  <li>Make sure your MongoDB URI is correct and URL-encoded.</li>
  <li>Use an App Password for Gmail SMTP.</li>
  <li>RESET_URL should match your frontend reset page route.</li>
  <li>Create an Atlas user with proper read/write access.</li>
</ul>
