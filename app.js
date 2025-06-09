// app.js

let ads = JSON.parse(localStorage.getItem('adsSwipeLibrary')) || [];
let currentView = 'gallery';

const galleryView = document.getElementById('gallery-view');
const listView = document.getElementById('list-view');
const listContainer = document.getElementById('list-container');
const addAdButton = document.getElementById('add-ad-button');
const modal = document.getElementById('modal');
const saveAdButton = document.getElementById('save-ad');
const closeModalButton = document.getElementById('close-modal');

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
      <td class="p-4 text-blue-600 cursor-pointer" onclick="openEditModal(${ad.id})">Edit</td>
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

function openModal() {
  document.getElementById('ad-id').value = '';
  document.getElementById('client').value = '';
  document.getElementById('hook').value = '';
  document.getElementById('performance').value = '';
  document.getElementById('thumbnail').value = '';
  document.getElementById('tags-input').value = '';
  modal.classList.remove('hidden');
}

function openEditModal(id) {
  const ad = ads.find(a => a.id === id);
  if (!ad) return;
  document.getElementById('ad-id').value = ad.id;
  document.getElementById('client').value = ad.client;
  document.getElementById('hook').value = ad.hook;
  document.getElementById('performance').value = ad.performance;
  document.getElementById('thumbnail').value = ad.thumbnail;
  document.getElementById('tags-input').value = ad.tags.join(', ');
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function saveAd() {
  const id = document.getElementById('ad-id').value;
  const client = document.getElementById('client').value;
  const hook = document.getElementById('hook').value;
  const performance = document.getElementById('performance').value;
  const thumbnail = document.getElementById('thumbnail').value || 'https://via.placeholder.com/400x250?text=Ad';
  const tags = document.getElementById('tags-input').value.split(',').map(t => t.trim()).filter(Boolean);

  if (!client || !hook || !performance) {
    alert('Please fill in required fields.');
    return;
  }

  const adData = {
    id: id ? parseInt(id) : Date.now(),
    client,
    hook,
    performance: parseInt(performance),
    thumbnail,
    tags
  };

  const index = ads.findIndex(a => a.id === adData.id);
  if (index > -1) {
    ads[index] = adData;
  } else {
    ads.push(adData);
  }

  localStorage.setItem('adsSwipeLibrary', JSON.stringify(ads));
  closeModal();
  switchView(currentView);
}

addAdButton.addEventListener('click', openModal);
saveAdButton.addEventListener('click', saveAd);
closeModalButton.addEventListener('click', closeModal);
document.getElementById('gallery-view-btn').addEventListener('click', () => switchView('gallery'));
document.getElementById('list-view-btn').addEventListener('click', () => switchView('list'));

// Initial load
switchView('gallery');

<script src="app.js"></script>
