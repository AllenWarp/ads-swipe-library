// app.js

let ads = [];
let currentView = 'gallery';
let currentTags = [];

const galleryView = document.getElementById('gallery-view');
const listView = document.getElementById('list-view');
const listContainer = document.getElementById('list-container');
const tagFilters = document.getElementById('tag-filters');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const addAdButton = document.getElementById('add-ad-button');

// Simple test ad
ads.push({
  id: 1,
  client: 'Test Client',
  hook: 'Great results in 7 days!',
  tags: ['credibility'],
  performance: 8,
  thumbnail: 'https://via.placeholder.com/400x250?text=Ad+Image'
});

function renderGallery() {
  galleryView.innerHTML = '';
  ads.forEach(ad => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded shadow p-4';
    card.innerHTML = `
      <img src="${ad.thumbnail}" alt="${ad.client}" class="rounded mb-3"/>
      <h3 class="font-bold">${ad.client}</h3>
      <p>${ad.hook}</p>
      <div class="flex flex-wrap gap-1 mt-2">
        ${ad.tags.map(tag => `<span class='text-xs bg-gray-200 px-2 py-1 rounded'>${tag}</span>`).join('')}
      </div>
    `;
    galleryView.appendChild(card);
  });
}

function renderList() {
  listContainer.innerHTML = '';
  ads.forEach(ad => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-4">${ad.hook}</td>
      <td class="p-4">${ad.client}</td>
      <td class="p-4">${ad.tags.join(', ')}</td>
      <td class="p-4">${ad.performance}/10</td>
      <td class="p-4 text-blue-600">Edit</td>
    `;
    listContainer.appendChild(row);
  });
}

function switchView(view) {
  currentView = view;
  if (view === 'gallery') {
    galleryView.classList.remove('hidden');
    listView.classList.add('hidden');
    renderGallery();
  } else {
    listView.classList.remove('hidden');
    galleryView.classList.add('hidden');
    renderList();
  }
}

// Setup event listeners
document.getElementById('gallery-view-btn').addEventListener('click', () => switchView('gallery'));
document.getElementById('list-view-btn').addEventListener('click', () => switchView('list'));

// Default load
switchView('gallery');

