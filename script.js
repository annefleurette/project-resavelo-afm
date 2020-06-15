// DIAPORAMA
let mySlider = new Slider("slide", "chevron_left", "chevron_right", "play", "pause", 3, 5000);
mySlider.start();

// CARTE DE LOCALISATION DES VELOS
let myMap = new BikesMap("bike-booking__map", "submit", "bike-booking__data__info-station", "bike-booking__data", "https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=e4e72c38a3d668f8fb765f8ccc3c4913bfce501f");
myMap.initMap();

// FORMULAIRE DE RESERVATION
let myBooking = new Booking("continue", "submit", "bike-booking__data__confirmation", "signature", "message-countdown", "countdown", "name", "surname", "canvas");
myBooking.endBookingEvent();