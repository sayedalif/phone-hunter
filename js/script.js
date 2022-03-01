const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);

  searchField.value = '';

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = '';
  phones.forEach((phone) => {
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
};

const loadPhoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

const displayPhoneDetail = (phone) => {
  console.log(phone);
  const phoneDetail = document.getElementById('phone-detail');
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
            <p class="card-text">Main Features:
            </br>
            Display Size: ${phone.mainFeatures.displaySize}
            </br>
            Memory: ${phone.mainFeatures.memory}
            </br>
            Chipset: ${phone.mainFeatures.chipSet}
            </br>
            Sensor: ${phone.mainFeatures.sensors}
            </br>
            Released Date: ${phone.mainFeatures.released}
            </p>

          </div>
        </div>
      </div>
  `;

  phoneDetail.appendChild(div);
};
