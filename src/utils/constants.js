
  const backgrounds = [
    {url: require("../images/Ellipse 14.svg").default, timeOfDay: "day", weather: "Clear", color: "rgba(0, 163, 255, 1)"}, 
    {url: require("../images/Uniontest.svg").default, timeOfDay: "day", weather: "Clouds", color: "rgba(0, 163, 255, 1)"},
    {url: require("../images/Group 148.svg").default, timeOfDay: "day", weather: "Mist", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 148.svg").default, timeOfDay: "day", weather: "Haze", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 148.svg").default, timeOfDay: "day", weather: "Fog", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 148.svg").default, timeOfDay: "day", weather: "Smoke", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 146(1).svg").default, timeOfDay: "day", weather: "Rain", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 147.svg").default, timeOfDay: "day", weather: "Snow", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Group 145.svg").default, timeOfDay: "day", weather: "Thunderstorm", color: "rgba(108, 166, 199, 1)"},
    {url: require("../images/Ellipse 15.svg").default, timeOfDay: "night", weather: "Clear", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Uniontestnight.svg").default, timeOfDay: "night", weather: "Clouds", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 151.svg").default, timeOfDay: "night", weather: "Mist", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 152.svg").default, timeOfDay: "night", weather: "Rain", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 153.svg").default, timeOfDay: "night", weather: "Snow", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 154.svg").default, timeOfDay: "night", weather: "Thunderstorm", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 151.svg").default, timeOfDay: "night", weather: "Haze", color: "rgba(40, 104, 151, 1)"},
    {url: require("../images/Group 148.svg").default, timeOfDay: "night", weather: "fog", color: "rgba(40, 104, 151, 1)"},
];

//we can rewrite the weather card as containers with the appropriate vector groups on the right and picking the color depending on the weather/time of day

  const apiKey = "bb1a34b30e91f6493febc3872715ffc5";

  export {apiKey, backgrounds};