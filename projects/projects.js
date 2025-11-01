import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');
const searchInput = document.querySelector('.searchBar');
const svg = d3.select('svg');
const legend = d3.select('.legend');
const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
const colors = d3.scaleOrdinal(d3.schemeTableau10);

let selectedIndex = -1;

projectsTitle.textContent = `Projects (${projects.length})`;
renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects);

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query);
  });

  applyFilters(filteredProjects);
});

function applyFilters(filteredProjects) {
  let result = filteredProjects;
  if (selectedIndex !== -1) {
    const rolledData = d3.rollups(
      filteredProjects,
      v => v.length,
      d => d.year
    );
    const data = rolledData.map(([year, count]) => ({
      value: count,
      label: year.toString(),
    }));
    
    if (data[selectedIndex]) {
      const selectedYear = data[selectedIndex].label;
      result = filteredProjects.filter(p => p.year.toString() === selectedYear);
    } else {
      selectedIndex = -1;
    }
  }

  projectsTitle.textContent = `Projects (${result.length})`;
  renderProjects(result, projectsContainer, 'h2');


  renderPieChart(filteredProjects);
}

function renderPieChart(projectsGiven) {

  svg.selectAll('path').remove();
  legend.selectAll('li').remove();

  const rolledData = d3.rollups(
    projectsGiven,
    v => v.length,
    d => d.year
  );

  const data = rolledData.map(([year, count]) => ({
    value: count,
    label: year.toString(),
  }));

  if (data.length === 0) return; 

  const sliceGenerator = d3.pie().value(d => d.value);
  const arcsData = sliceGenerator(data);

  arcsData.forEach((d, i) => {
    svg.append('path')
      .attr('d', arcGenerator(d))
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;
        updateVisualization();
      });
  });

  data.forEach((d, idx) => {
    legend.append('li')
      .attr('style', `--color:${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
      .style('cursor', 'pointer')
      .on('click', () => {
        selectedIndex = selectedIndex === idx ? -1 : idx;
        updateVisualization();
      });
  });

  svg.selectAll('path').attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));
  legend.selectAll('li').attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));
}

function updateVisualization() {
  const searchQuery = searchInput.value.toLowerCase();
  const searchFilteredProjects = projects.filter((project) => {
    const values = Object.values(project).join('\n').toLowerCase();
    return values.includes(searchQuery);
  });
  
  applyFilters(searchFilteredProjects);
}
