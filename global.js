console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Step 2 code (commented out since we're now using automatic navigation)
// // Get all navigation links
// const navLinks = $$("nav a");

// // Find the link to the current page
// const currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname,
// );

// // Add the current class to the current page link
// currentLink?.classList.add('current');

// Step 3: Automatic navigation menu
let pages = [
  { url: '', title: 'Home' },
  { url: 'contact/', title: 'Contact Me' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume/CV' },
  { url: 'https://github.com/golkelj', title: 'GitHub' },
  { url: 'https://www.linkedin.com/in/jadengoelkel', title: 'LinkedIn' }
];

// Create navigation element
let nav = document.createElement('nav');
let ul = document.createElement('ul');
ul.className = 'nav-links';
nav.appendChild(ul);
document.body.prepend(nav);

// Determine base path for local vs GitHub Pages
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/";         

// Add navigation links
for (let p of pages) {
  let url = p.url;
  let title = p.title;
  
  // Adjust URL for local vs GitHub Pages
  if (!url.startsWith('http')) {
    url = BASE_PATH + url;
  }
  
  // Create link element
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  
  // Add current class if this is the current page
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
  );
  
  // Add target="_blank" for external links
  if (a.host !== location.host) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  
  // Create list item and add link
  let li = document.createElement('li');
  li.appendChild(a);
  ul.appendChild(li);
}

// Step 4: Dark mode theme switcher
// Add theme switcher HTML
document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`,
);

// Get reference to the select element
const select = document.querySelector('.color-scheme select');

// Add event listener for theme changes
select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  // Set the color-scheme property on the root element
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  // Save preference to localStorage
  localStorage.colorScheme = event.target.value;
});

// Load saved preference on page load
if ('colorScheme' in localStorage) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  select.value = localStorage.colorScheme;
}