const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);

  searchField.value = '';
  // clear details
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.innerHTML = '';
  const empty = document.getElementById('empty-message');
  if (searchText == '') {
    empty.style.display = 'block';
    document.getElementById('no-result').style.display = 'none';
  } else {
    empty.style.display = 'none';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.data));
  }
};

const displaySearchResult = (phones) => {
  console.log(phones);
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = '';

  if (phones.length === 0) {
    document.getElementById('no-result').style.display = 'block';
  } else {
    if (phones.length > 20) {
      for (let i = 0; i < 20; i++) {
        const phone = phones[i];
        document.getElementById('no-result').style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0">
          <img src="${phone.image}" class="card-img-top w-50" alt="phone" />
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-secondary"
            type="button"
            >Details</button>
          </div>
        </div>
        `;

        searchResult.appendChild(div);
      }
    } else if (phones.length < 20) {
      phones.forEach((phone) => {
        document.getElementById('no-result').style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0">
          <img src="${phone.image}" class="card-img-top w-50" alt="phone" />
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-secondary"
            type="button"
            >Details</button>
          </div>
        </div>
    `;
        searchResult.appendChild(div);
      });
    }
  }
};

const loadPhoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

const displayPhoneDetail = (phone) => {
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <div class="row g-0">
        <div class="col-md-4 mt-3 ps-2">
          <img src="${phone.image}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">
            Display Size: ${phone.mainFeatures.displaySize}
            </br>
            Memory: ${phone.mainFeatures.memory}
            </br>
            Chipset: ${phone.mainFeatures.chipSet}
            </br>
            Sensor: ${phone.mainFeatures.sensors}
            </br>
            Released Date: ${
              phone.releaseDate == '' ? 'N/A' : phone.releaseDate
            }
            </p>

          </div>
        </div>
      </div>
  `;

  phoneDetail.appendChild(div);
};
