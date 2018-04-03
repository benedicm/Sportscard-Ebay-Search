function normalizeDate(oldDate) {
  const date = new Date(oldDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  if (dt < 10) {
    dt = '0' + dt;
  }

  if (month < 10) {
    month = '0' + month;
  }
  return `${year}-${month}-${dt}`;
}

function liTemplate(picture, link, title, price, date) {
  return `<li>
            <img class="card-image" src="${picture}">
            <div class="card-content">
              <a href="${link}" target="_blank"><h1 class="card-title">${title}</h1></a>
              <ul class="alist">
                <li>Date of Sale: ${date}</li>
                <li>Final Price: $${price}</li>
              </ul>
            </div>
          </li>`;
}

function render(items) {
  var html = '';
    for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    var title = item.title;
    var pic = item.galleryURL;
    var viewitem = item.viewItemURL;
    var currency = item.sellingStatus[0].currentPrice[0]['@currencyId'];
    var price = item.sellingStatus[0].currentPrice[0].__value__;
    var oldDate = item.listingInfo[0].endTime;
    var newSellingState = item.listingInfo[0].sellingState;
    var displayDate = normalizeDate(oldDate);
    if (title !== null && viewitem !== title) {
      html += liTemplate(pic, viewitem, title, price, displayDate);
    }
  }
  $('.search-results').html(html);
}

function findCompletedItems(root) {
  var items = root.findCompletedItemsResponse[0].searchResult[0].item || [];
  if (items.length === 0) {
    alert('Your search did not return any cards.');
  }
  render(items);
}

function formSubmit(event) {
  event.preventDefault();
  var term = $(this).find('input').val();

  const filter = {
    securityAppName: 'MarkBene-CardColl-PRD-b5d8a3c47-2072216b',
    findBy: 'findCompletedItems',
  };
  const url = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=${
    filter.findBy
  }&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${
    filter.securityAppName
  }&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=findCompletedItems&REST-PAYLOAD&keywords=${term}"card"&paginationInput.entriesPerPage=80`;

  s = document.createElement('script');
  s.src = url;
  document.body.appendChild(s);
}

$('.search-form input[type=reset]').click(function(event) {
  event.preventDefault();
  $('.search-results').empty();
  $('.search-form input[type=text]').val("");
});
$('.close-form').click(function(event) {
  event.preventDefault();
  $('.search-form input[type=text]').val("");
});
$('.close-icon').click(function(event) {
  event.preventDefault();
  $('.search-results').empty();
  $('.search-form input[type=text]').val("");
});
function init() {
  $('.start-search').click(function() {
    $('.intro-section').hide();
    $('.search-page').show();
    $('.search-form').submit(formSubmit);
  });
  $('.navlinks').click(function() {
    $('.search-page').hide();
    $('.intro-section').show();
  });
  $('.back-button').click(function() {
    $('.search-page').hide();
    $('.intro-section').show();
  });
  $('.fa-angle-left').click(function() {
    $('.search-page').hide();
    $('.intro-section').show();
  });
}


init();
