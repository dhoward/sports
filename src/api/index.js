const corsUrl = "https://cors-anywhere.herokuapp.com/";

const fetchCORS = (url) =>
  new Promise((resolve, reject) => {
    var x = new XMLHttpRequest();
    x.open("GET", `${corsUrl}${url}`);
    x.onload = () => resolve(JSON.parse(x.responseText));
    x.send();
  });

const getPopularEvents = () => fetchCORS("https://fe-api.smarkets.com/v0/events/popular/");

const getEvent = (id) => fetchCORS(`https://fe-api.smarkets.com/v0/events/id/${id}`);

const getSport = (id) => fetchCORS(`https://smarkets.com/v0/listings/slug/sport/${id}/?period=upcoming`)

export default {
  getPopularEvents,
  getEvent,
  getSport,
};
