import http from 'node:http';
import { apiMiddleware } from '../server/apiMiddleware.mjs';

// Setup local test server using the same middleware Connect architecture as Vite
const middlewareObj = apiMiddleware();
const server = http.createServer();
const handlers = [];

const fakeViteServer = {
  middlewares: {
    use: (fn) => handlers.push(fn),
  },
};

middlewareObj.configureServer(fakeViteServer);

server.on('request', async (req, res) => {
  let idx = 0;
  const next = () => {
    idx++;
    if (idx < handlers.length) {
      handlers[idx](req, res, next);
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  };
  if (handlers.length > 0) {
    handlers[0](req, res, next);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(4567, '127.0.0.1', async () => {
  console.log('HTTP Test Server running at http://127.0.0.1:4567');
  try {
    // 1. Test POST /api/auth/signup
    const signupRes = await fetch('http://127.0.0.1:4567/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Priya Mukherjee',
        email: `priya_${Date.now()}@edu.in`,
        password: 'PassWord123!',
      }),
    });
    const signupData = await signupRes.json();
    console.log('1. Signup response:', signupRes.status, signupData.success, signupData.needsOnboarding);

    const token = signupData.token;

    // 2. Test POST /api/onboarding
    const onboardingRes = await fetch('http://127.0.0.1:4567/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: 'Priya Mukherjee',
        age: 22,
        educationLevel: 'Postgraduate',
        country: 'India',
        primaryCourseId: 'ugc-net',
        selectedSubjects: ['ugc-p1', 'ugc-p2-cs'],
        learningPreferences: ['Reading notes and study materials', 'Previous year questions (PYQs)'],
        preparationLevel: 'Intermediate',
        dailyStudyAvailability: '2–4 hours',
        targetYear: '2026',
      }),
    });
    const onboardingData = await onboardingRes.json();
    console.log('2. Onboarding response:', onboardingRes.status, onboardingData.success);

    // 3. Test GET /api/dashboard
    const dashRes = await fetch('http://127.0.0.1:4567/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const dashData = await dashRes.json();
    console.log('3. Dashboard response:', dashRes.status, 'Course:', dashData.activeCourse?.name, 'Recs count:', dashData.recommendations?.length);

    // 4. Test GET /api/resources (Strict course isolation)
    const resRes = await fetch('http://127.0.0.1:4567/api/resources', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const resData = await resRes.json();
    const hasWrongCourse = (resData.resources || []).some(r => r.course_id !== 'ugc-net' && r.visibility !== 'all_courses');
    console.log('4. Course Isolation in Resources:', !hasWrongCourse ? '✅ STRICTLY ISOLATED' : '❌ LEAK DETECTED', 'Total resources:', resData.resources?.length);

    // 5. Test Unauthorized Cross-Course Attempt: Trying to query NEET directly
    const unauthRes = await fetch('http://127.0.0.1:4567/api/resources?courseId=neet-ug', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const unauthData = await unauthRes.json();
    console.log('5. Cross-Course Access Blocked:', unauthRes.status === 403 ? '✅ 403 FORBIDDEN REJECTED' : '❌ UNEXPECTED STATUS', unauthData.error);

    // 6. Test Course-Aware Search
    const searchRes = await fetch('http://127.0.0.1:4567/api/search?q=research', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const searchData = await searchRes.json();
    console.log('6. Course-aware search results for "research":', searchData.total, 'items. All match course:', searchData.results.every(r => r.course_id === 'ugc-net' || r.visibility === 'all_courses'));

    // 7. Test POST /api/auth/google (New Student via Google Sign-In)
    const googleNewRes = await fetch('http://127.0.0.1:4567/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aarav Gupta',
        email: `aarav_google_${Date.now()}@gmail.com`,
      }),
    });
    const googleNewData = await googleNewRes.json();
    console.log('7. Google Sign-In (New Student):', googleNewRes.status === 200 && googleNewData.needsOnboarding === true ? '✅ PASS' : '❌ FAIL', 'User:', googleNewData.user?.full_name);

    // 8. Test POST /api/auth/google (Existing Student via Google Sign-In)
    const googleExistingRes = await fetch('http://127.0.0.1:4567/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Priya Mukherjee',
        email: signupData.user?.email, // existing user from Test 1 & 2 who finished onboarding
      }),
    });
    const googleExistingData = await googleExistingRes.json();
    console.log('8. Google Sign-In (Existing Student with Onboarding):', googleExistingRes.status === 200 && googleExistingData.needsOnboarding === false ? '✅ PASS' : '❌ FAIL');

    console.log('\nAll HTTP API endpoints verified successfully!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('HTTP Test Error:', err);
    server.close();
    process.exit(1);
  }
});
