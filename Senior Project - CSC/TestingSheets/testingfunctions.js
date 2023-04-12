/*const R = 6371; //Earths Radius in KM

function toRadians(degree) {
  return degree * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90 || lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    throw new Error("Invalid input, latitude must be between -90 and 90, longitude must be between -180 and 180");
  }

  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  const latitudeDifferenceRad = lat2Rad - lat1Rad;
  const longitudeDifferenceRad = lon2Rad - lon1Rad;

  const a = Math.sin(latitudeDifferenceRad / 2) * Math.sin(latitudeDifferenceRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(longitudeDifferenceRad / 2) * Math.sin(longitudeDifferenceRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  if (unit === 'KM') {
    return R * c;
  } else if (unit === 'Miles') {
    return R * c * 0.621371;
  } else {
    throw new Error("Invalid unit of distance, must be 'km' or 'miles'");
  }
}

function getClosestFestivals(userLat, userLon, unit) {
  let distances = ALLfestivals.map(festival => ({
    name: festival.name,
    distance: unit === 'KM' 
      ? calculateDistance(userLat, userLon, festival.lat, festival.lon, 'KM')
      : calculateDistance(userLat, userLon, festival.lat, festival.lon, 'Miles')
  }));
  
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => reject(error)
    );
  });
}

async function displayClosestFestivals(unit) {
  try {
    const userLocation = await getUserLocation();
    if (unit == "KM") {
      const closestFestivals = getClosestFestivals(userLocation.lat, userLocation.lon, 'KM');
      document.getElementById("distanceDisplay").innerHTML = closestFestivals.map(festival => `${festival.name}: ${festival.distance.toFixed(2)} ${festival.genres} kilometers`).join('<br>');
    }else if (unit == "Miles") {
      const closestFestivals = getClosestFestivals(userLocation.lat, userLocation.lon, 'Miles');
      document.getElementById("distanceDisplay").innerHTML = closestFestivals.map(festival => `${festival.name}: ${festival.distance.toFixed(2)} miles`).join('<br>');
    }
  } catch (error) {
    console.error(error);
  }
}

// TESTING
//const filterAndDisplayFestivals = async () => {
 // try {
  //  const userLocation = await getUserLocation();
    //const selectedGenre = document.getElementById("GenreFilter").value;
    //const selectedUnit = document.getElementById("KMorMiles").value;
    //const selectedDistance = document.getElementById("Distances").value;
    //const filteredFestivals = ALLfestivals.filter(festival => selectedGenre === "AllGenres" || festival.genres.includes(selectedGenre));
    //const closestFestivals = getClosestFestivals(userLocation.lat, userLocation.lon, selectedUnit);
    //const formattedFestivals = closestFestivals
     // .filter(festival => {
      //  const distance = festival.distance;
      // if (selectedUnit === "Miles" && distance <= selectedDistance) {
       //   return true; // Keep festivals within the selected distance in miles
        //} else if (selectedUnit === "KM" && distance <= selectedDistance) {
         // return true; // Keep festivals within the selected distance in kilometers
        //} else {
        //  return false; // Filter out festivals that are too far away
        //}
      //})
      //.map(festival => {
       // const distance = selectedUnit === "KM" ? festival.distance : festival.distance; // conversion from KM to Miles
       // return `${festival.name}: date : ${festival.date} ${distance.toFixed(2)} ${selectedUnit === "KM" ? "kilometers" : "miles"}`;
      //});
    //const displayText = filteredFestivals.length > 0 ? formattedFestivals.join('<br>') : "No festivals found";
    //document.getElementById("distanceDisplay").innerHTML = displayText;
  //} //catch (error) {
    //console.error(error);
  //}
//};



const genresDropdown = document.getElementById("GenreFilter");
const distancesDropdown = document.getElementById("Distances");
const MesDropdown = document.getElementById('KMorMiles');

const myButton = document.getElementById("SearchButton");
myButton.addEventListener("click",filterAndDisplayFestivals);
*/

const filterAndDisplayFestivals = async (userLocation) => {
  try {
    const userLocation = await getUserLocation();
    const selectedGenre = document.getElementById("GenreFilter").value;
    const selectedUnit = document.getElementById("KMorMiles").value;
    const selectedDistance = document.getElementById("Distances").value;
    const filteredFestivals = ALLfestivals.filter(festival => selectedGenre === "AllGenres" || festival.genres.includes(selectedGenre));
    const closestFestivals = genreChecker(userLocation, selectedGenre, selectedUnit);
    const formattedFestivals = closestFestivals
      .filter(festival => {
        const distance = festival.distance;
        if (selectedUnit === "Miles" && distance <= selectedDistance) {
          return true; // Keep festivals within the selected distance in miles
        } else if (selectedUnit === "KM" && distance <= selectedDistance) {
          return true; // Keep festivals within the selected distance in kilometers
        } else {
          return false; // Filter out festivals that are too far away
        }
      })
      .map(festival => {
        const distance = selectedUnit === "KM" ? festival.distance : festival.distance; // conversion from KM to Miles
        return `${festival.name}: date : ${festival.date} ${distance.toFixed(2)} ${selectedUnit === "KM" ? "kilometers" : "miles"}`;
      });
    const displayText = filteredFestivals.length > 0 ? formattedFestivals.join('<br>') : "No festivals found";
    document.getElementById("distanceDisplay").innerHTML = displayText;
  } catch (error) {
    console.error(error);
  }
};