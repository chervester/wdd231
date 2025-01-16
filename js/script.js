// Array of course objects
const courses = [
  { name: 'HTML Basics', credits: 3, category: 'WDD' },
  { name: 'CSS Essentials', credits: 3, category: 'WDD' },
  { name: 'JavaScript Fundamentals', credits: 3, category: 'CSE' },
  { name: 'Responsive Web Design', credits: 2, category: 'WDD' },
  { name: 'Python Programming', credits: 4, category: 'CSE' }
];

// Completed courses
const completedCourses = ['HTML Basics'];

// Elements
const courseCards = document.getElementById('course-cards');
const totalCreditsEl = document.getElementById('total-credits');
const allBtn = document.getElementById('all-btn');
const wddBtn = document.getElementById('wdd-btn');
const cseBtn = document.getElementById('cse-btn');

// Function to display courses dynamically
function displayCourses(category = null) {
  courseCards.innerHTML = ''; // Clear existing courses
  const filteredCourses = category
    ? courses.filter(course => course.category === category)
    : courses;

  filteredCourses.forEach(course => {
    const courseCard = document.createElement('div');
    if (completedCourses.includes(course.name)) {
      courseCard.innerHTML = `<b>${course.name} (${course.credits} credits)</b>`;
    } else {
      courseCard.textContent = `${course.name} (${course.credits} credits)`;
    }
    courseCards.appendChild(courseCard);
  });
}

// Function to calculate total credits
function calculateTotalCredits() {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsEl.textContent = totalCredits;
}

// Add event listeners to buttons
allBtn.addEventListener('click', () => displayCourses());
wddBtn.addEventListener('click', () => displayCourses('WDD'));
cseBtn.addEventListener('click', () => displayCourses('CSE'));

// Update footer year and last modified
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Initialize the page
displayCourses();
calculateTotalCredits();
