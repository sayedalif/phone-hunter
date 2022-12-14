// searchPhone for fetching data
const searchPhone = () => {
  // input field
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  searchField.value = '';

  // clear details
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.innerHTML = '';

  // empty search result
  const empty = document.getElementById('empty-message');
  if (searchText == '') {
    empty.style.display = 'block';
    document.getElementById('no-result').style.display = 'none';
  } else {
    empty.style.display = 'none';

    // dynamic fetch
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.data));
  }
};

// toggle spinner
const ToggleSpinner = (toggle) => {
  document.getElementById('spinner').style.display = toggle;
};

const displaySearchResult = (phones) => {
  // toggle spinner
  ToggleSpinner('block');
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = '';

  if (phones.length === 0) {
    document.getElementById('no-result').style.display = 'block';
    // result <20
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
  ToggleSpinner('none');
};

// phone detail
const loadPhoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

// display phone detail
const displayPhoneDetail = (phone) => {
  console.log(phone);
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
            Released Date: ${
              phone.releaseDate == '' ? 'N/A' : phone.releaseDate
            }
            </br>
            Display Size: ${phone.mainFeatures.displaySize}
            </br>
            Memory: ${phone.mainFeatures.memory}
            </br>
            Chipset: ${phone.mainFeatures.chipSet}
            </br>
            Sensor: ${phone.mainFeatures.sensors}
            </br>
            Storage: ${phone.mainFeatures.storage}
            </br>
            other:
            </br>
            Bluetooth:${phone.others.Bluetooth},
            GPS:${phone.others.GPS},
            NFC:${phone.others.NFC},
            Radio:${phone.others.Radio},
            USB:${phone.others.USB},
            WLAN:${phone.others.WLAN}
            </p>

          </div>
        </div>
      </div>
  `;

  phoneDetail.appendChild(div);
};
