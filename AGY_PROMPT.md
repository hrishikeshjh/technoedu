MASTER DEVELOPMENT PROMPT: PERSONALIZED STUDENT SIGN-UP & COURSE-BASED LEARNING PLATFORM
Project Objective
Transform the existing TechnoEdu website into a personalized, student-centric learning platform inspired by the onboarding and course discovery experiences of Physics Wallah, Coursera, and Unacademy.

Build a complete user registration, onboarding interview, course-selection, and personalized dashboard experience.

The most important requirement:

Every student should see learning content, courses, study materials, recommendations, navigation sections, and dashboard information relevant ONLY to the course or examination they selected during onboarding.

For example:

• A student selecting UGC-NET should see UGC-NET-related content, resources, syllabus, preparation materials, PYQs, roadmaps, and mock tests.
• A student selecting NEET should see NEET-related content, resources, Biology, Physics, Chemistry, mock tests, and preparation materials.
• A student selecting JEE should see JEE-related content, Mathematics, Physics, Chemistry, and JEE preparation resources.

Do not display unrelated examination categories throughout the personalized student experience.

This must be a functional system connected to the existing backend and database, not just a frontend mockup.


⸻


1. FIRST: UNDERSTAND THE EXISTING PROJECT
Before modifying anything:

1. Explore the complete existing codebase.
2. Understand the frontend framework, backend architecture, database, routing, authentication system, and existing UI components.
3. Identify existing exam pages, study materials, blogs, library, dashboards, and content categories.
4. Identify whether authentication already exists.
5. Reuse existing authentication and database infrastructure wherever possible.
6. Do not create duplicate authentication systems.
7. Preserve all existing functionality.
8. Preserve the current TechnoEdu branding, typography, color palette, and design language.

Do not unnecessarily redesign the existing website.

Build the new experience as an extension of the current platform.


⸻


2. AUTHENTICATION AND SIGN-UP EXPERIENCE
Create a professional authentication experience with:

• Sign up
• Sign in
• Email verification
• OTP-based authentication or the existing secure authentication provider
• Forgot account/recovery flow where supported
• Persistent sessions
• Secure logout

Sign-up page

Create a dedicated /signup page.

The design should feel like a premium educational technology platform.

Suggested layout:

Left section:
• TechnoEdu branding
• Educational illustration or carefully selected learning-related imagery
• A short motivational message
• Brief explanation of personalized learning

Right section:
• Create account
• Full name
• Email address
• Password or OTP-based authentication, depending on the existing auth system
• Continue button
• Sign-in link

Do not ask for every student detail on the initial sign-up page.

Keep account creation simple. Collect educational preferences through a separate onboarding interview after authentication.

Create /login for existing users.


⸻


3. PERSONALIZED STUDENT ONBOARDING INTERVIEW
Immediately after the first successful registration, redirect the student to:

/onboarding

This should be a multi-step, interview-style experience.

It should feel like the platform is personally understanding the student rather than presenting a long registration form.

Use a clean, modern, interactive interface with one question per screen or a small number of related questions per step.

Include a progress indicator, Back button, Continue button, and the ability to save progress.

STEP 1 — Basic Student Information
Collect the information necessary to personalize the educational experience.

Fields:

1. Full name
2. Age or date of birth
3. Current educational level:


 • School student
• Class 10
• Class 11
• Class 12
• Undergraduate
• Postgraduate
• Graduate
• Working professional
• Other
1.
Current class, semester, or academic year, where applicable.
2. Institution or university — optional.
3. Country.
4. Preferred language:


 • English
• Hindi
• Bengali
• Other

Do not collect unnecessary sensitive personal information.

Age should be used only for relevant educational personalization and age-appropriate experiences.

If the student is under 18, use appropriate privacy safeguards and any legally required consent flow.

STEP 2 — What Are You Preparing For?
Ask:

"What is your primary learning goal?"

Display attractive selectable course/examination cards.

Initial categories should include:

Competitive examinations

• UGC-NET
• UGC-NET JRF
• NEET UG
• JEE Main
• JEE Advanced
• GATE
• UPSC
• SSC
• Banking
• CUET
• Other competitive examinations

Academic learning

• Engineering
• Computer Science
• Artificial Intelligence and Machine Learning
• Data Science
• Mathematics
• Physics
• Chemistry
• Biology
• Commerce
• Management
• Other academic subjects

Use searchable categories so the platform can accommodate future courses.

Each card should include:

• Course name
• Short description
• Relevant icon or illustration
• Selection state
• Optional difficulty/level description

Allow the student to select one primary course.

Allow additional courses only if the platform supports multiple enrollments. Do not confuse the primary course with secondary interests.

Store the primary selection as primaryCourseId.

STEP 3 — What Do You Want to Study?
Ask:

"What would you like to learn or prepare for within this course?"

The available options must dynamically depend on the course selected in Step 2.

Examples:

If the student selects UGC-NET

Display:

• Paper 1
• Teaching Aptitude
• Research Aptitude
• Communication
• Mathematical Reasoning
• Logical Reasoning
• Data Interpretation
• Information and Communication Technology
• People, Development and Environment
• Higher Education System
• Paper 2
• Computer Science
• Management
• Commerce
• Education
• Other available Paper 2 subjects

If the student selects Computer Science, show its relevant units and topics.

If the student selects NEET

Display:

• Physics
• Chemistry
• Biology
• Botany
• Zoology
• Previous Year Questions
• Mock Tests
• Chapter-wise Practice
• Revision Materials

If the student selects JEE

Display:

• Physics
• Chemistry
• Mathematics
• JEE Main preparation
• JEE Advanced preparation
• Previous Year Questions
• Mock Tests
• Chapter-wise Practice

The available subjects and learning options must be dynamically generated from the selected course's configuration.

Never show UGC-NET subjects to a NEET student or NEET subjects to a UGC-NET student.

Allow multiple subject selections within the selected course.

Store these preferences in the database.

STEP 4 — Learning Preferences
Ask:

"How do you prefer to learn?"

Allow selection of:

• Reading notes and study materials
• Watching video lectures
• Solving practice questions
• Previous year questions
• Taking mock tests
• Interactive quizzes
• Revision notes
• Structured learning roadmaps

Ask about the student's preparation level:

• Beginner
• Intermediate
• Advanced
• Already preparing, needs revision

Ask about their daily study availability:

• Less than 1 hour
• 1–2 hours
• 2–4 hours
• 4–6 hours
• More than 6 hours

Ask about their target examination year or attempt, where applicable.

Make optional questions skippable.

STEP 5 — Final Personalization Summary
Show a confirmation screen:

"Your learning space is ready!"

Display:

• Student name
• Selected course
• Selected subjects
• Learning preferences
• Preparation level
• Target examination, where applicable

Provide:

• Edit preferences
• Confirm and continue

After confirmation, save all onboarding information and redirect to the personalized dashboard.


⸻


4. THE MOST IMPORTANT FEATURE: COURSE-BASED CONTENT ISOLATION
Implement a centralized course-based personalization engine.

This is the core feature of the entire development task.
The platform must identify the logged-in user's primary course and dynamically determine which content, navigation links, resources, recommendations, and dashboard widgets should be displayed.

Example: UGC-NET student

When a user selects UGC-NET:

The personalized website should display:

• UGC-NET Dashboard
• UGC-NET Syllabus
• Paper 1
• Paper 2
• Subject-specific learning
• Study Materials
• Previous Year Questions
• Mock Tests
• Preparation Roadmaps
• Study Planner
• Progress Tracking
• Recommended Resources
• Relevant Blogs and Articles

Do not display NEET, JEE, UPSC, or unrelated examination materials in the personalized student dashboard.

Example: NEET student

When a user selects NEET:

Display:

• NEET Dashboard
• NEET Syllabus
• Physics
• Chemistry
• Biology
• Botany
• Zoology
• Study Materials
• Previous Year Questions
• Mock Tests
• Revision Resources
• Preparation Roadmaps
• Study Planner
• Progress Tracking
• Relevant Articles

Do not display UGC-NET Paper 1, Paper 2, or unrelated UGC-NET preparation content.

Example: JEE student

Display only JEE-related learning sections, subjects, resources, practice material, and preparation tools.

Strict content filtering

Implement filtering at multiple levels:

1. Frontend navigation
2. Dashboard widgets
3. Course directory
4. Study material listings
5. Search results
6. Recommended articles
7. Learning resources
8. Mock tests
9. Roadmaps
10. User notifications

Do not rely only on hiding unrelated cards using CSS or frontend conditions.

The backend/API must also enforce course-based filtering.

A student must not receive unrelated course content through API responses simply because the frontend hides it.

Public pages may still exist for visitors, but the authenticated personalized learning experience must remain scoped to the student's selected course and authorized enrollments.


⸻


5. PERSONALIZED DASHBOARD
Create a dynamic dashboard at:

/dashboard

The dashboard must change based on the student's selected course.

Dashboard layout

Welcome section

"Good morning, [Student Name]"

"Continue your [Selected Course] preparation."

Display the selected course clearly.

Continue Learning

Show:

• Last accessed subject
• Last accessed chapter
• Recently opened material
• Continue reading button

My Learning

Display:

• Enrolled course
• Selected subjects
• Study materials
• Saved resources
• Recently visited topics

Recommended For You

Display resources based on:

• Selected course
• Selected subjects
• Preparation level
• Learning preferences
• Previous activity

Study Planner

Display:

• Daily study targets
• Weekly schedule
• Upcoming study sessions
• Completed tasks

Progress Overview

Display:

• Topics completed
• Topics remaining
• Study sessions
• Mock tests attempted
• Accuracy, only when real attempt data exists

Never generate fake progress statistics.

Show empty states when a student has not started learning.


⸻


6. PERSONALIZED NAVIGATION
Modify the authenticated navbar dynamically.

For example, a UGC-NET user should see:

• Home
• My Learning
• UGC-NET
• Study Materials
• PYQs
• Mock Tests
• Library
• My Profile

A NEET user should see:

• Home
• My Learning
• NEET
• Physics
• Chemistry
• Biology
• Study Materials
• PYQs
• Mock Tests
• My Profile

A JEE user should see the corresponding JEE navigation.

Do not create a separate hardcoded navbar for every course.

Build a reusable navigation configuration system driven by the selected course.

Keep global links such as Profile, Settings, Help, and Logout accessible.


⸻


7. COURSE-SPECIFIC CONTENT MANAGEMENT SYSTEM
Create a structured content architecture.

Every learning resource must be associated with a course.

Suggested database structure:

Users

• id
• fullName
• email
• dateOfBirth or age, where necessary
• educationLevel
• currentClassOrSemester
• institution
• country
• preferredLanguage
• role
• createdAt
• updatedAt

Courses

• id
• name
• slug
• description
• category
• icon
• bannerImage
• isActive
• createdAt

UserLearningProfiles

• id
• userId
• primaryCourseId
• preparationLevel
• targetYear
• dailyStudyAvailability
• learningPreferences
• preferredLanguage
• onboardingCompleted
• createdAt
• updatedAt

UserCourseEnrollments

• id
• userId
• courseId
• enrollmentType
• isPrimary
• status
• enrolledAt

CourseSubjects

• id
• courseId
• name
• slug
• description
• displayOrder

CourseTopics

• id
• subjectId
• name
• slug
• description
• displayOrder

LearningResources

• id
• courseId
• subjectId
• topicId
• title
• description
• resourceType
• content
• fileUrl
• videoUrl
• difficulty
• visibility
• createdAt
• updatedAt

UserLearningProgress

• id
• userId
• courseId
• resourceId
• status
• progress
• lastAccessedAt
• completedAt

UserPreferences

• id
• userId
• dashboardPreferences
• notificationPreferences
• updatedAt

Adapt this schema to the existing database instead of duplicating existing tables.

Use proper relationships, foreign keys, indexes, and database constraints.


⸻


8. PERSONALIZATION ENGINE
Create a reusable service or module.

Suggested structure:

src/lib/personalization/

Possible modules:

• courseConfig.ts
• courseAccess.ts
• userLearningProfile.ts
• contentFilter.ts
• navigationConfig.ts
• recommendations.ts

Responsibilities:

1. Retrieve the authenticated user's learning profile.
2. Identify the primary course.
3. Retrieve authorized additional enrollments.
4. Determine permitted subjects and topics.
5. Filter learning resources.
6. Generate course-specific navigation.
7. Generate relevant dashboard recommendations.
8. Handle changed course preferences.
9. Enforce course access on the server.

Create reusable functions such as:

• getUserLearningProfile()
• getPrimaryCourse()
• getUserEnrollments()
• getCourseNavigation()
• getCourseResources()
• getCourseSubjects()
• getPersonalizedDashboard()
• updateLearningPreferences()

Use the project's existing architectural conventions.


⸻


9. USER PROFILE AND COURSE SETTINGS
Create:

/profile

The student should be able to view:

• Personal information
• Educational information
• Selected primary course
• Additional enrollments
• Selected subjects
• Preparation level
• Learning preferences
• Target examination year

Create:

/settings/learning

Allow students to:

• Change their primary course
• Add another course
• Remove an additional course
• Change selected subjects
• Update learning preferences
• Update preparation level

If a student changes their primary course, update the personalized dashboard and navigation immediately after saving.

Do not delete their historical progress when they switch courses.

Preserve progress separately for each course so that switching back restores the previous learning history.

Use a confirmation dialog when changing the primary course.


⸻


10. COURSE SWITCHING AND MULTIPLE ENROLLMENTS
The default experience should focus on one primary course.

However, the platform should support students who want to prepare for more than one examination.

Example:

A student may enroll in:

• Primary: UGC-NET
• Secondary: GATE

The dashboard should prioritize UGC-NET.

Provide an explicit course switcher in the user profile or dashboard.

When the student switches to GATE, load the GATE learning experience.

Do not mix the two courses' content into a single unfiltered dashboard.

Each course must retain its own:

• Subjects
• Study materials
• Progress
• Saved resources
• Roadmaps
• Mock test history
• Study plan


⸻


11. SEARCH AND RECOMMENDATIONS
Make search course-aware.

When a UGC-NET student searches for "research aptitude", return relevant UGC-NET resources.

When a NEET student searches for "human physiology", return relevant NEET resources.

Default search should search within:

• The primary course
• Authorized additional enrollments, if selected
• Relevant subjects
• Topics
• Learning resources

Never mix unrelated course results into the default personalized search.

Recommendations must use real available content and user activity.

Do not fabricate resources or claim that a student has completed something they have not.


⸻


12.
ADMINISTRATOR AND CONTENT MANAGEMENT
Create or extend the admin content management system if one exists.

Administrators should be able to:

• Create courses
• Edit courses
• Activate/deactivate courses
• Add subjects
• Add topics
• Upload study materials
• Add videos
• Add PYQs
• Create mock tests
• Add roadmaps
• Categorize blogs and articles
• Assign resources to courses
• Preview course-specific content

Every resource must have a clear course association.

Do not allow a resource to accidentally appear across all courses because its category is missing.

Add validation for required course associations.

Support a controlled all_courses visibility setting only for genuinely universal content, such as platform help or general learning guidance.


⸻


13. DESIGN AND USER EXPERIENCE
Follow the existing TechnoEdu design system.

Design goals:

• Premium educational platform
• Minimal and clean
• Modern typography
• Consistent spacing
• Responsive layout
• Clear visual hierarchy
• Accessible components
• Fast interactions
• No unnecessary animations
• No cluttered dashboards

Keep the existing light theme.

Preserve the previously implemented dark mode, if available.

The sign-up and onboarding pages should feel welcoming and interactive.

Use cards for course selection, clear selection states, and subtle transitions.

Avoid copying the exact branding or proprietary visual assets of Physics Wallah or Coursera. Use them only as product-experience references.


⸻


14. SECURITY AND DATA PRIVACY
Implement:

• Secure authentication
• Server-side session validation
• Authorization checks
• Protected dashboard routes
• Server-side course access validation
• Input validation
• Secure database queries
• Rate limiting where appropriate
• Safe file upload handling
• Privacy-conscious storage of student data

Never trust a user-supplied userId or courseId as proof of authorization.

Derive the authenticated user identity from the validated session.

Ensure one student cannot access another student's profile, learning progress, private resources, or account data.

If using Supabase, implement appropriate Row Level Security policies.

If using another database, implement equivalent server-side access controls.

Collect only information that is necessary for the educational experience.

Provide an appropriate privacy notice and account/data deletion pathway.


⸻


15. ROUTES TO IMPLEMENT
Create or adapt these routes:

/signup
/login
/onboarding
/dashboard
/profile
/settings/learning
/my-learning
/courses
/courses/[slug]
/courses/[slug]/subjects
/courses/[slug]/subjects/[subject]
/courses/[slug]/resources
/courses/[slug]/pyq
/courses/[slug]/mock-tests
Adapt the routes to the existing application structure and avoid unnecessary duplication.


⸻


16. IMPORTANT: MIGRATE EXISTING CONTENT
Do not discard the existing UGC-NET content or other course material already implemented on TechnoEdu.

Inspect existing content and assign correct course IDs, subject IDs, and topic IDs.

For example:

• Existing UGC-NET Paper 1 material → UGC-NET
• Existing UGC-NET Paper 2 material → UGC-NET
• Existing UGC-NET Computer Science material → UGC-NET / Computer Science
• Existing NEET content → NEET
• Existing JEE content → JEE

If the actual course association is uncertain, flag it for administrator review instead of guessing.

Preserve existing URLs where practical, using redirects or compatibility routes when necessary.


⸻


17. TESTING AND ACCEPTANCE CRITERIA
The implementation is not complete until the following scenarios work.

Test A — UGC-NET Student

1. Register a new user.
2. Complete the onboarding interview.
3. Select UGC-NET.
4. Select Computer Science as Paper 2.
5. Select preferred learning materials.
6. Complete onboarding.
7. Open the dashboard.

Expected result:

• Dashboard identifies UGC-NET as the primary course.
• UGC-NET sections appear.
• Paper 1 and Paper 2 are accessible.
• Computer Science topics appear.
• UGC-NET resources appear.
• NEET and JEE sections do not appear in the personalized learning experience.
• Search returns UGC-NET-relevant results.

Test B — NEET Student

1. Register another user.
2. Select NEET.
3. Select Physics, Chemistry, and Biology.
4. Complete onboarding.

Expected result:

• Dashboard identifies NEET as the primary course.
• NEET navigation appears.
• Biology, Physics, and Chemistry resources appear.
• UGC-NET Paper 1 and Paper 2 do not appear.
• Search returns NEET-relevant resources.

Test C — Course Switching

1. Log in as the UGC-NET student.
2. Add GATE as a secondary course.
3. Switch to GATE.
4. Return to UGC-NET.

Expected result:

• Each course loads its own content.
• Existing learning progress is preserved.
• No unrelated course material is mixed into the current view.

Test D — Authentication Persistence

1. Sign in.
2. Refresh the browser.
3. Close and reopen the website.
4. Sign out and sign in again.

Expected result:

• Session behaves correctly.
• Onboarding is not repeated unnecessarily.
• User returns to their personalized dashboard.
• Course preferences remain saved.

Test E — Security

1. Attempt to access another user's profile.
2. Attempt to retrieve unauthorized course resources through API requests.
3. Attempt to modify another user's learning profile.
4. Attempt to access private resources without authorization.

Expected result:

• Unauthorized access is rejected server-side.


⸻


18. FINAL IMPLEMENTATION REQUIREMENTS
Work directly inside the existing local project.

Do not push anything to GitHub.

Do not create commits or pull requests.

Do not deploy the website.

Do not replace the existing application with a new project.

Do not use hardcoded demo users as a substitute for real authentication.

Do not create fake course content or fake progress.

Implement real database persistence and server-side filtering.

After implementation:

1. Run database migrations.
2. Check environment variables.
3. Run the development server.
4. Test every onboarding step.
5. Test the UGC-NET and NEET user journeys separately.
6. Test mobile and desktop layouts.
7. Check browser console errors.
8. Check backend/API errors.
9. Verify that course-specific filtering works on the server.
10. Fix all critical bugs.

Create a short implementation report containing:

• Features implemented
• Database changes
• Routes created
• Authentication changes
• Personalization architecture
• Security measures
• Tests performed
• Known limitations
• Remaining development tasks

FINAL PRODUCT VISION
TechnoEdu should no longer feel like a generic website where every student sees every examination and every resource.

It should feel like a personal learning environment.

A student signs up, answers a few meaningful questions, selects their educational goal, and receives a learning dashboard designed around that goal.

UGC-NET students see UGC-NET. NEET students see NEET. JEE students see JEE.

The experience should be simple:

Sign up → Tell us what you want to learn → Choose your course → Get your personalized learning space → Continue learning.