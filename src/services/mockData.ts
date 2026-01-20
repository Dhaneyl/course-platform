import type {
  Course,
  Instructor,
  Student,
  Enrollment,
  Review,
  Testimonial,
  Category,
  Level,
} from '@/types';

export const instructors: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Full-stack developer with 10+ years of experience. Former tech lead at Google.',
    coursesCount: 8,
    studentsCount: 15000,
    rating: 4.8,
  },
  {
    id: 'inst-2',
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'Data scientist and AI researcher. PhD from MIT. Author of "Machine Learning Simplified".',
    coursesCount: 6,
    studentsCount: 12000,
    rating: 4.9,
  },
  {
    id: 'inst-3',
    name: 'Emily Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    bio: 'UX designer with experience at Apple and Airbnb. Passionate about user-centered design.',
    coursesCount: 5,
    studentsCount: 8000,
    rating: 4.7,
  },
  {
    id: 'inst-4',
    name: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: 'Mobile developer specializing in React Native and Flutter. Built 50+ apps.',
    coursesCount: 6,
    studentsCount: 10000,
    rating: 4.6,
  },
  {
    id: 'inst-5',
    name: 'Jessica Taylor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    bio: 'Marketing expert and entrepreneur. Helped 100+ startups grow their audience.',
    coursesCount: 5,
    studentsCount: 9000,
    rating: 4.8,
  },
];

const categories: Category[] = [
  'web-development',
  'data-science',
  'ui-ux-design',
  'mobile-development',
  'business',
  'marketing',
];

const categoryNames: Record<Category, string> = {
  'web-development': 'Web Development',
  'data-science': 'Data Science',
  'ui-ux-design': 'UI/UX Design',
  'mobile-development': 'Mobile Development',
  business: 'Business',
  marketing: 'Marketing',
};

const levels: Level[] = ['beginner', 'intermediate', 'advanced'];

function generateModules(courseId: string, lessonsCount: number) {
  const modulesCount = Math.ceil(lessonsCount / 5);
  const modules = [];

  let lessonIndex = 1;
  for (let m = 1; m <= modulesCount; m++) {
    const lessonsInModule = Math.min(5, lessonsCount - (m - 1) * 5);
    const lessons = [];

    for (let l = 1; l <= lessonsInModule; l++) {
      lessons.push({
        id: `${courseId}-lesson-${lessonIndex}`,
        title: `Lesson ${lessonIndex}: Topic ${lessonIndex}`,
        duration: Math.floor(Math.random() * 15) + 5,
        videoUrl: `https://example.com/videos/${courseId}/lesson-${lessonIndex}.mp4`,
        isPreview: lessonIndex <= 2,
      });
      lessonIndex++;
    }

    modules.push({
      id: `${courseId}-module-${m}`,
      title: `Module ${m}: Section ${m}`,
      lessons,
    });
  }

  return modules;
}

const courseTemplates = [
  {
    title: 'Complete React Developer Course',
    description:
      'Master React 19 from scratch. Build real-world projects with hooks, context, and modern patterns.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Build powerful, fast, user-friendly and reactive web apps',
      'Understand React Hooks and functional components',
      'Manage complex state with Context API and useReducer',
      'Build reusable components and libraries',
    ],
  },
  {
    title: 'TypeScript Masterclass',
    description:
      'Deep dive into TypeScript. Learn advanced types, generics, and best practices for large-scale applications.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Master TypeScript fundamentals and advanced concepts',
      'Use generics and utility types effectively',
      'Integrate TypeScript with React and Node.js',
      'Write type-safe code that scales',
    ],
  },
  {
    title: 'Node.js API Development',
    description:
      'Build scalable REST APIs with Node.js, Express, and MongoDB. Authentication, testing, and deployment included.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Build RESTful APIs from scratch',
      'Implement JWT authentication',
      'Work with MongoDB and Mongoose',
      'Deploy to cloud platforms',
    ],
  },
  {
    title: 'Python for Data Science',
    description:
      'Learn Python programming for data analysis. Pandas, NumPy, and data visualization with real datasets.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Master Python fundamentals for data analysis',
      'Use Pandas for data manipulation',
      'Create stunning visualizations with Matplotlib',
      'Perform statistical analysis',
    ],
  },
  {
    title: 'Machine Learning A-Z',
    description:
      'Comprehensive machine learning course. Regression, classification, clustering, and neural networks.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Understand machine learning algorithms',
      'Build predictive models',
      'Work with real-world datasets',
      'Deploy ML models to production',
    ],
  },
  {
    title: 'Deep Learning with TensorFlow',
    description:
      'Master deep learning with TensorFlow and Keras. CNNs, RNNs, and transformers for real applications.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Build neural networks from scratch',
      'Implement CNNs for image recognition',
      'Create RNNs for sequence data',
      'Use transfer learning effectively',
    ],
  },
  {
    title: 'UI/UX Design Fundamentals',
    description:
      'Learn the principles of user interface and user experience design. From wireframes to prototypes.',
    category: 'ui-ux-design' as Category,
    whatYouWillLearn: [
      'Understand design principles and theory',
      'Create wireframes and prototypes',
      'Conduct user research',
      'Design accessible interfaces',
    ],
  },
  {
    title: 'Figma for Designers',
    description:
      'Master Figma from beginner to advanced. Design systems, components, and collaboration workflows.',
    category: 'ui-ux-design' as Category,
    whatYouWillLearn: [
      'Navigate Figma interface efficiently',
      'Create reusable components',
      'Build design systems',
      'Collaborate with development teams',
    ],
  },
  {
    title: 'React Native Mobile Development',
    description:
      'Build cross-platform mobile apps with React Native. One codebase for iOS and Android.',
    category: 'mobile-development' as Category,
    whatYouWillLearn: [
      'Build iOS and Android apps with one codebase',
      'Use native device features',
      'Navigate between screens',
      'Publish apps to app stores',
    ],
  },
  {
    title: 'Flutter Complete Guide',
    description:
      'Create beautiful mobile apps with Flutter and Dart. State management, animations, and Firebase.',
    category: 'mobile-development' as Category,
    whatYouWillLearn: [
      'Master Dart programming language',
      'Build responsive UIs with Flutter',
      'Manage state effectively',
      'Integrate Firebase services',
    ],
  },
  {
    title: 'iOS Development with Swift',
    description:
      'Learn iOS development from scratch. SwiftUI, UIKit, and App Store submission.',
    category: 'mobile-development' as Category,
    whatYouWillLearn: [
      'Write Swift code confidently',
      'Build UIs with SwiftUI',
      'Work with Core Data',
      'Submit apps to the App Store',
    ],
  },
  {
    title: 'Startup Business Fundamentals',
    description:
      'Everything you need to know to start a successful business. From idea validation to funding.',
    category: 'business' as Category,
    whatYouWillLearn: [
      'Validate your business idea',
      'Create a business plan',
      'Understand funding options',
      'Build a minimum viable product',
    ],
  },
  {
    title: 'Product Management Essentials',
    description:
      'Become a product manager. Learn roadmapping, prioritization, and stakeholder management.',
    category: 'business' as Category,
    whatYouWillLearn: [
      'Define product strategy',
      'Create and manage roadmaps',
      'Prioritize features effectively',
      'Work with cross-functional teams',
    ],
  },
  {
    title: 'Digital Marketing Mastery',
    description:
      'Complete digital marketing course. SEO, social media, email marketing, and analytics.',
    category: 'marketing' as Category,
    whatYouWillLearn: [
      'Create effective marketing strategies',
      'Master SEO fundamentals',
      'Run successful ad campaigns',
      'Analyze marketing metrics',
    ],
  },
  {
    title: 'Social Media Marketing',
    description:
      'Grow your brand on social media. Content strategy, engagement, and paid advertising.',
    category: 'marketing' as Category,
    whatYouWillLearn: [
      'Build a social media strategy',
      'Create engaging content',
      'Grow your audience organically',
      'Run effective paid campaigns',
    ],
  },
  {
    title: 'Next.js 14 Complete Course',
    description:
      'Build production-ready apps with Next.js. Server components, App Router, and deployment.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Master Next.js App Router',
      'Use Server and Client Components',
      'Implement authentication',
      'Deploy to Vercel',
    ],
  },
  {
    title: 'Vue.js 3 from Scratch',
    description:
      'Learn Vue.js 3 with Composition API. Build reactive applications with modern Vue.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Understand Vue.js reactivity system',
      'Use Composition API effectively',
      'Manage state with Pinia',
      'Build single-page applications',
    ],
  },
  {
    title: 'SQL & Database Design',
    description:
      'Master SQL and database design. From basic queries to complex joins and optimization.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Write complex SQL queries',
      'Design normalized databases',
      'Optimize query performance',
      'Work with multiple database systems',
    ],
  },
  {
    title: 'Data Visualization with D3.js',
    description:
      'Create interactive data visualizations with D3.js. Charts, maps, and custom graphics.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Understand D3.js fundamentals',
      'Create various chart types',
      'Build interactive visualizations',
      'Work with real-time data',
    ],
  },
  {
    title: 'User Research Methods',
    description:
      'Learn user research techniques. Interviews, surveys, usability testing, and data analysis.',
    category: 'ui-ux-design' as Category,
    whatYouWillLearn: [
      'Conduct user interviews',
      'Create effective surveys',
      'Run usability tests',
      'Synthesize research findings',
    ],
  },
  {
    title: 'Design Systems Masterclass',
    description:
      'Build scalable design systems. Component libraries, documentation, and governance.',
    category: 'ui-ux-design' as Category,
    whatYouWillLearn: [
      'Define design tokens',
      'Create component libraries',
      'Write design documentation',
      'Implement governance processes',
    ],
  },
  {
    title: 'Android Development with Kotlin',
    description:
      'Build Android apps with Kotlin. Jetpack Compose, MVVM architecture, and Google Play.',
    category: 'mobile-development' as Category,
    whatYouWillLearn: [
      'Write clean Kotlin code',
      'Build UIs with Jetpack Compose',
      'Implement MVVM architecture',
      'Publish to Google Play Store',
    ],
  },
  {
    title: 'Financial Analysis for Business',
    description:
      'Understand financial statements and analysis. Make data-driven business decisions.',
    category: 'business' as Category,
    whatYouWillLearn: [
      'Read financial statements',
      'Perform financial analysis',
      'Create financial projections',
      'Make investment decisions',
    ],
  },
  {
    title: 'Leadership & Management',
    description:
      'Develop leadership skills. Team management, communication, and conflict resolution.',
    category: 'business' as Category,
    whatYouWillLearn: [
      'Lead teams effectively',
      'Communicate with impact',
      'Resolve conflicts',
      'Drive organizational change',
    ],
  },
  {
    title: 'Content Marketing Strategy',
    description:
      'Create content that converts. Blogging, video marketing, and content distribution.',
    category: 'marketing' as Category,
    whatYouWillLearn: [
      'Develop content strategy',
      'Create compelling content',
      'Optimize for search engines',
      'Measure content performance',
    ],
  },
  {
    title: 'Email Marketing Excellence',
    description:
      'Master email marketing. List building, automation, and conversion optimization.',
    category: 'marketing' as Category,
    whatYouWillLearn: [
      'Build email lists organically',
      'Create automated sequences',
      'Write emails that convert',
      'Analyze email metrics',
    ],
  },
  {
    title: 'GraphQL API Development',
    description:
      'Build modern APIs with GraphQL. Schema design, resolvers, and Apollo Server.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Design GraphQL schemas',
      'Implement resolvers',
      'Use Apollo Server and Client',
      'Handle authentication in GraphQL',
    ],
  },
  {
    title: 'Docker & Kubernetes',
    description:
      'Containerize and orchestrate applications. Docker, Kubernetes, and DevOps practices.',
    category: 'web-development' as Category,
    whatYouWillLearn: [
      'Containerize applications with Docker',
      'Orchestrate with Kubernetes',
      'Implement CI/CD pipelines',
      'Monitor containerized apps',
    ],
  },
  {
    title: 'Statistics for Data Science',
    description:
      'Essential statistics for data scientists. Probability, hypothesis testing, and regression.',
    category: 'data-science' as Category,
    whatYouWillLearn: [
      'Understand probability theory',
      'Perform hypothesis testing',
      'Apply regression analysis',
      'Interpret statistical results',
    ],
  },
  {
    title: 'Interaction Design',
    description:
      'Create delightful interactions. Micro-interactions, animations, and motion design.',
    category: 'ui-ux-design' as Category,
    whatYouWillLearn: [
      'Design meaningful interactions',
      'Create smooth animations',
      'Use motion purposefully',
      'Prototype interactive experiences',
    ],
  },
];

export const courses: Course[] = courseTemplates.map((template, index) => {
  const instructor = instructors[index % instructors.length];
  const level = levels[index % levels.length];
  const lessonsCount = Math.floor(Math.random() * 20) + 10;
  const price = index % 3 === 0 ? 0 : Math.floor(Math.random() * 150) + 29;

  return {
    id: `course-${index + 1}`,
    title: template.title,
    slug: template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: template.description,
    thumbnail: `https://picsum.photos/seed/${index + 1}/640/360`,
    instructor,
    category: template.category,
    level,
    price,
    duration: lessonsCount * 10,
    lessonsCount,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500) + 50,
    enrolledCount: Math.floor(Math.random() * 5000) + 500,
    modules: generateModules(`course-${index + 1}`, lessonsCount),
    whatYouWillLearn: template.whatYouWillLearn,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ).toISOString(),
  };
});

export const reviews: Review[] = courses.flatMap((course) => {
  const reviewCount = Math.min(course.reviewsCount, 5);
  return Array.from({ length: reviewCount }, (_, i) => ({
    id: `review-${course.id}-${i + 1}`,
    courseId: course.id,
    studentId: `student-${Math.floor(Math.random() * 100) + 1}`,
    studentName: `Student ${Math.floor(Math.random() * 100) + 1}`,
    studentAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${Math.floor(Math.random() * 100)}`,
    rating: Math.floor(Math.random() * 2) + 4,
    comment:
      'Great course! The instructor explains concepts clearly and the projects are very practical.',
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000)
    ).toISOString(),
  }));
});

export const students: Student[] = Array.from({ length: 100 }, (_, i) => ({
  id: `student-${i + 1}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i + 1}`,
  enrollments: [],
  favorites: [],
}));

export const enrollments: Enrollment[] = Array.from({ length: 200 }, (_, i) => {
  const courseIndex = Math.floor(Math.random() * courses.length);
  const course = courses[courseIndex];
  const completedCount = Math.floor(
    Math.random() * (course.lessonsCount + 1)
  );
  const completedLessons = course.modules
    .flatMap((m) => m.lessons)
    .slice(0, completedCount)
    .map((l) => l.id);

  return {
    id: `enrollment-${i + 1}`,
    courseId: course.id,
    studentId: `student-${(i % 100) + 1}`,
    progress: Math.round((completedCount / course.lessonsCount) * 100),
    completedLessons,
    enrolledAt: new Date(
      Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000)
    ).toISOString(),
    completedAt:
      completedCount === course.lessonsCount
        ? new Date().toISOString()
        : null,
  };
});

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Alex Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Software Developer at Google',
    comment:
      'This platform helped me transition from a junior to senior developer. The courses are practical and up-to-date.',
  },
  {
    id: 'testimonial-2',
    name: 'Maria Garcia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'Data Scientist at Netflix',
    comment:
      'The data science courses are exceptional. I landed my dream job after completing the Machine Learning track.',
  },
  {
    id: 'testimonial-3',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'UX Designer at Apple',
    comment:
      'The design courses taught me industry best practices. The instructors are world-class professionals.',
  },
];

export { categoryNames, categories, levels };

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getReviewsByCourseId(courseId: string): Review[] {
  return reviews.filter((r) => r.courseId === courseId);
}

export function getEnrollmentsByStudentId(studentId: string): Enrollment[] {
  return enrollments.filter((e) => e.studentId === studentId);
}

export function filterCourses(
  search: string,
  category: string,
  level: string,
  priceFilter: string,
  minRating: number
): Course[] {
  return courses.filter((course) => {
    const matchesSearch =
      !search ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === 'all' || course.category === category;

    const matchesLevel = level === 'all' || course.level === level;

    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && course.price === 0) ||
      (priceFilter === 'paid' && course.price > 0);

    const matchesRating = course.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesPrice &&
      matchesRating
    );
  });
}
