const backgrounds = [
  {
    url: require("../images/Ellipse 14.svg").default,
    timeOfDay: "day",
    weather: "Sunny",
    color: "rgba(0, 163, 255, 1)",
  },
  {
    url: require("../images/Ellipse 14.svg").default,
    timeOfDay: "day",
    weather: "Clear",
    color: "rgba(0, 163, 255, 1)",
  },
  {
    url: require("../images/Uniontest.svg").default,
    timeOfDay: "day",
    weather: "Partly cloudy",
    color: "rgba(0, 163, 255, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Cloudy",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Overcast",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Mist",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Haze",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Fog",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "day",
    weather: "Smoke",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 146(1).svg").default,
    timeOfDay: "day",
    weather: "Rain",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 146(1).svg").default,
    timeOfDay: "day",
    weather: "Patchy rain possible",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 147.svg").default,
    timeOfDay: "day",
    weather: "Snow",
    color: "rgba(108, 166, 199, 1)",
  },
  {
    url: require("../images/Group 145.svg").default,
    timeOfDay: "day",
    weather: "Thunderstorm",
    color: "rgba(108, 166, 199, 1)",
  },


  {
    url: require("../images/Ellipse 15.svg").default,
    timeOfDay: "night",
    weather: "Sunny",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Ellipse 15.svg").default,
    timeOfDay: "night",
    weather: "Clear",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Uniontestnight.svg").default,
    timeOfDay: "night",
    weather: "Cloudy",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Uniontestnight.svg").default,
    timeOfDay: "night",
    weather: "Overcast",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Uniontestnight.svg").default,
    timeOfDay: "night",
    weather: "Partly cloudy",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 151.svg").default,
    timeOfDay: "night",
    weather: "Mist",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 152.svg").default,
    timeOfDay: "night",
    weather: "Rain",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 153.svg").default,
    timeOfDay: "night",
    weather: "Snow",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 154.svg").default,
    timeOfDay: "night",
    weather: "Thunderstorm",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 151.svg").default,
    timeOfDay: "night",
    weather: "Haze",
    color: "rgba(40, 104, 151, 1)",
  },
  {
    url: require("../images/Group 148.svg").default,
    timeOfDay: "night",
    weather: "fog",
    color: "rgba(40, 104, 151, 1)",
  },
];

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

//we can rewrite the weather card as containers with the appropriate vector groups on the right and picking the color depending on the weather/time of day

const apiKey = "bb1a34b30e91f6493febc3872715ffc5";
const newApiKey = "30f7c7b473a0459bacc175749242208";

const baseUrl = "http://api.weatherapi.com/v1/";

const _processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export {
  apiKey,
  newApiKey,
  backgrounds,
  _processServerResponse,
  defaultClothingItems,
  baseUrl
};
