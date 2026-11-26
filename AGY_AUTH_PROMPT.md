MASTER PROMPT: COMPLETE AUTHENTICATION REPAIR + SIGN-IN-FIRST PLATFORM + CLEAN PUBLIC LANDING PAGE
You are a senior full-stack engineer, authentication/security specialist, and UI/UX designer.

Your task is to thoroughly audit and fix the existing TechnoEdu project. Do not just make the login page look functional. Make the complete authentication lifecycle work correctly, establish secure environment-variable configuration, and restructure the website so that the public landing page is clean and all educational categories, courses, study materials, and learning features are available only after authentication.

This is an existing project. Work within its current architecture.

1. INITIAL PROJECT AUDIT — DO NOT MODIFY BLINDLY
Before writing code:

1. Inspect the entire project structure.
2. Identify the frontend and backend frameworks.
3. Identify the existing authentication provider and implementation.
4. Inspect database configuration and user models.
5. Inspect middleware, route protection, session handling, API endpoints, and environment variables.
6. Identify all existing authentication bugs.
7. Identify duplicate authentication implementations.
8. Identify routes that are currently publicly accessible but should require login.
9. Inspect the existing course-based personalization system.
10. Check all existing dependencies and their versions.

Prepare a short internal implementation plan before modifying the project.

Important: Reuse the existing authentication provider if one is already configured. Do not introduce a second authentication system or replace working infrastructure unnecessarily.


⸻


2. FIX AUTHENTICATION COMPLETELY
Audit and repair the entire authentication lifecycle.

Registration

Route: /signup

Requirements:

• Register using email.
• Collect full name.
• Validate email format.
• Validate password if password-based authentication is used.
• Enforce secure password handling.
• Prevent duplicate account creation.
• Handle email verification.
• Display meaningful validation and server errors.
• Prevent duplicate form submissions.
• Provide loading and success states.
• Redirect new users to onboarding after successful registration.

If the existing provider supports passwordless email OTP, it may be used instead of passwords. Do not build insecure custom OTP handling.

Login

Route: /login

Requirements:

• Existing registered users must be able to log in.
• Validate credentials through the configured authentication provider.
• Handle invalid credentials.
• Handle unverified email accounts.
• Handle expired sessions.
• Provide forgot-password or account recovery where supported.
• Prevent repeated submission while authentication is processing.
• Redirect successfully authenticated users appropriately.

Session management

Implement and verify:

• Persistent authentication sessions.
• Secure session cookies where applicable.
• Correct session refresh.
• Session expiration.
• Logout.
• Session invalidation on logout.
• Correct handling of browser refresh.
• Correct handling of direct URL navigation.
• Correct handling of expired authentication.
• No authentication state flickering.

The user must remain logged in after refreshing the page, according to the provider's session policy.

Logout

When the user logs out:

1. Invalidate the authentication session.
2. Clear appropriate client-side session state.
3. Clear sensitive cached user data.
4. Redirect to the public landing page.
5. Prevent access to protected pages using browser back navigation.

Do not simply hide the user's avatar and pretend logout succeeded.

Authentication state

Create one centralized authentication state mechanism.

Suggested functions:

getCurrentUser()
getSession()
signUp()
signIn()
signOut()
refreshSession()
requireAuth()
Adapt names and structure to the existing project.

Do not maintain multiple conflicting authentication states in different components.


⸻


3. ENVIRONMENT VARIABLES — CREATE PLACEHOLDERS
Inspect the existing environment configuration and create or update:

.env.example
• .env.local.example, if the framework requires it
• Environment variable documentation in README.md

Create clear placeholders for every required environment variable.

Example structure — adapt it to the actual technology stack:

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Authentication Provider
NEXT_PUBLIC_AUTH_URL=YOUR_AUTH_PROVIDER_URL
NEXT_PUBLIC_AUTH_ANON_KEY=YOUR_PUBLIC_AUTH_KEY
AUTH_SECRET=YOUR_SERVER_SIDE_AUTH_SECRET

# Database
DATABASE_URL=YOUR_DATABASE_CONNECTION_STRING

# Email / OTP Provider
EMAIL_PROVIDER_API_KEY=YOUR_EMAIL_API_KEY
EMAIL_FROM=YOUR_VERIFIED_SENDER_EMAIL

# Storage
STORAGE_URL=YOUR_STORAGE_URL
STORAGE_API_KEY=YOUR_STORAGE_API_KEY
These are examples, not assumptions about the existing infrastructure.

Requirements:

1. Identify the actual variables required by the project.
2. Include all required variables in .env.example.
3. Use descriptive placeholder values.
4. Group variables by service.
5. Add comments explaining each variable.
6. Mark public variables separately from private server-side secrets.
7. Never expose private secrets through NEXT_PUBLIC_ or equivalent public prefixes.
8. Never hardcode credentials in source files.
9. Never commit actual API keys or credentials.
10. Ensure .env.local, .env, and other secret-bearing files are appropriately ignored by Git.
11. Create a startup validation mechanism for required environment variables.
12. Display helpful errors identifying missing variable names without printing secret values.

If a real credential is missing, do not invent one.

The project should clearly tell the developer which values need to be supplied.

Do not overwrite existing valid environment credentials. Do not delete the user's existing .env file.


⸻


4. SIGN-IN-FIRST WEBSITE ARCHITECTURE
The most important structural change:

The public website should be a clean landing page. All educational categories and learning features should be accessible only after signing in.

Do not expose the entire educational portal to anonymous visitors.

Public pages
Only keep these pages publicly accessible:

• / — Landing page
• /login
• /signup
• /forgot-password, if supported
• /verify-email, if required
• /privacy
• /terms
• /contact or a minimal public contact page, if needed

Do not expose the course directory, exam categories, study library, study materials, or personalized dashboard publicly.

Protected pages
Require authentication for:

/dashboard
/onboarding
/courses
/courses/[slug]
/exams
/exams/[slug]
/library
/study-materials
/blogs
/blogs/[slug]
/my-learning
/profile
/settings
/planner
/pyq
/mock-tests
• All personalized learning routes.

Adapt the route list to the actual application.

Important route behavior

If an unauthenticated user opens:

/library

Redirect to:

/login?redirect=/library

After successful login, redirect the user to their original requested destination, provided it is a valid internal route.

Never allow an arbitrary external redirect URL.

If the user has registered but not completed onboarding:

Redirect to /onboarding.

If onboarding is completed:

Redirect to /dashboard.

If a session expires while the user is browsing:

Redirect to login while preserving the intended destination where safe.

Enforce these rules server-side, not only through frontend redirects.


⸻


5. REDESIGN THE PUBLIC LANDING PAGE
Route: /

Create a clean, minimal, professional landing page for TechnoEdu.

The public landing page should communicate what the platform does without exposing all internal course categories.

Navbar

Keep the navbar minimal.

Display:

• TechnoEdu logo
• About
• Contact
• Sign In
• Get Started

Do not display:

• Exam categories
• UGC-NET
• NEET
• JEE
• Library
• Study Materials
• PYQs
• Mock Tests
• Course-specific navigation
• Personalized dashboard links

These belong inside the authenticated platform.

Hero section

Suggested headline:

"Your learning journey, your way."

Suggested supporting text:
"A personalized learning environment designed around your academic goals. Find your resources, organize your preparation, and make meaningful progress."

Primary CTA:

"Get Started"

Secondary CTA:

"Sign In"

Use the existing TechnoEdu visual identity.

Do not make the landing page excessively long or cluttered.

Supporting sections

Use only a few well-designed sections:

1. Hero
2. What TechnoEdu offers
3. Personalized learning experience
4. How it works
5. Why TechnoEdu
6. Footer

The landing page should describe the platform's capabilities without displaying the full internal course catalog.

Do not fabricate testimonials, statistics, partnerships, or educational achievements.

Landing page design rules

• Preserve existing brand colors.
• Use clean typography.
• Maintain consistent spacing.
• Keep the hero visually strong.
• Use subtle animations only when useful.
• Make mobile responsiveness excellent.
• Avoid unnecessary cards and decorative elements.
• Preserve the existing light and dark theme support, if implemented.


⸻


6. AUTHENTICATED USER EXPERIENCE
Once signed in, the student enters the actual learning platform.

The authenticated navbar should display:

• Home / Dashboard
• My Learning
• My Courses
• Study Materials
• Library
• Blogs
• Study Planner
• Profile

Course-specific navigation must be generated dynamically from the student's learning profile.

For example:

A UGC-NET student sees UGC-NET-specific sections.

A NEET student sees NEET-specific sections.

A JEE student sees JEE-specific sections.

Do not mix unrelated examination categories.

The existing course-personalization engine must remain functional.

First-time user flow

Public Landing Page
       |
       v
    Sign Up
       |
       v
Email Verification
       |
       v
  Onboarding
       |
       v
Course Selection
       |
       v
Learning Preferences
       |
       v
Personalized Dashboard
Returning user flow

Public Landing Page
       |
       v
     Sign In
       |
       v
Validate Session
       |
       v
Check Onboarding Status
       |
       v
Personalized Dashboard


⸻


7. AUTHORIZATION AND ROUTE SECURITY
Implement proper server-side authorization.

Requirements:

• Anonymous users cannot access protected routes.
• Authenticated users cannot modify other users' profiles.
• Students cannot access another student's private learning progress.
• Students cannot access unauthorized course resources.
• Admin-only functionality must require an admin role.
• Frontend visibility must never be treated as authorization.
• APIs must validate the session independently.
• Database queries must be scoped to the authenticated user where applicable.

If using Supabase, configure Row Level Security.

If using another database, implement equivalent access controls.

Do not trust userId, role, or ownership information supplied by the browser.


⸻


8. AUTHENTICATION UI STATES
Every authentication page must handle:

• Initial loading
• Submitting
• Success
• Invalid email
• Invalid credentials
• Account already exists
• Email verification required
• Network error
• Server error
• Expired session
• Missing configuration
• Password reset success or failure, if applicable

Display understandable messages.

Never show raw stack traces or internal provider errors to students.


⸻


9. TESTING — AUTHENTICATION MUST ACTUALLY WORK
Perform complete end-to-end testing.

Test 1: New registration

• Open landing page.
• Click Get Started.
• Register a new account.
• Verify email if required.
• Complete onboarding.
• Confirm dashboard opens.

Test 2: Existing user

• Log out.
• Log in using the existing account.
• Confirm the correct dashboard opens.
• Confirm previous preferences remain intact.

Test 3: Protected routes

Without signing in, attempt to open:

/dashboard
/courses
/library
/study-materials
/blogs
/exams
All must redirect appropriately.

Test 4: Session persistence

• Log in.
• Refresh the page.
• Navigate to another protected route.
• Close and reopen the browser.
• Verify session behavior.

Test 5: Logout

• Log out.
• Attempt to revisit /dashboard.
• Confirm access is denied.

Test 6: Course isolation

• Sign in as a UGC-NET user.
• Confirm UGC-NET content appears.
• Confirm NEET/JEE content does not appear in the personalized interface.

Repeat using a NEET account.

Test 7: Environment configuration

• Check .env.example.
• Check required variable validation.
• Confirm no real credentials appear in frontend bundles or source-controlled files.

Test 8: Mobile

Test login, registration, onboarding, and dashboard on mobile and desktop sizes.


⸻


10. FINAL CLEANUP
Before finishing:

• Remove duplicate authentication code.
• Remove obsolete public navigation links.
• Remove dead routes and broken login buttons.
• Fix incorrect redirects.
• Fix console errors.
• Fix backend errors.
• Remove hardcoded demo credentials.
• Remove fake authentication state.
• Verify database migrations.
• Verify environment configuration.
• Verify course personalization.
• Verify all protected APIs.

Do not remove existing educational content.

Do not break existing UGC-NET functionality or other course-specific features.


⸻


11. EXECUTION RULES
Work directly in the existing local project.

• Do not push to GitHub.
• Do not commit changes.
• Do not create a pull request.
• Do not deploy.
• Do not replace the project with a new application.
• Do not overwrite existing valid credentials.
• Do not invent external API keys.
• Do not leave fake login functionality.
• Do not claim a feature works unless it has been tested.

Run the application locally after implementation.

If external credentials are required, create the placeholders and document exactly where the developer must obtain and configure them.

FINAL ACCEPTANCE CRITERIA
The task is complete only when:

1. Sign-up works.
2. Sign-in works.
3. Logout works.
4. Sessions persist correctly.
5. Onboarding works.
6. User course preferences persist.
7. Protected routes reject anonymous visitors.
8. APIs enforce authentication and authorization.
9. The public landing page is clean and minimal.
10. All educational categories are hidden from anonymous visitors.
11. Authenticated users see only their relevant course experience.
12. .env.example contains all necessary placeholders.
13. No real secrets are exposed.
14. Existing educational features continue to work.

Final product experience:
Visitors see a beautiful, simple TechnoEdu landing page.

They sign up or sign in.

They complete onboarding if necessary.

They enter their personalized learning environment.

The full educational platform becomes available only after authentication.