const projectsData = [
  {
    title: 'PayByFonie',
    description: `PayByFonie is a play on the app PayByPhone, a parking app that allows you to pay for parking via your phone. PayByFonie is a similar app, but allows you to search a destination and view parking meter data near that location. Users can search a location using the MapBox API, view the price and time limit of parking meters near that location, and obtain the PayByPhone meter number to pay for that meter. The app was built using React, and Node.js.`,
    imgSrc: '/static/images/projectCards/paybyfonie.jpg',
    href: 'https://github.com/Cwarcup/free-parking-mapper',
  },
  {
    title: 'Cthulhu Teaches Typing',
    description: `TCthulhu Teaches Typing is a typing game for learning to type. Our goal was to target the keyboard enthusiast market with a minimal, yet customizable application to track and compare typing statistics. We also wanted to create a fun and engaging typing game that would help users learn to type faster and more accurately.`,
    imgSrc: '/static/images/projectCards/CTT.jpg',
    href: 'https://github.com/Cwarcup/ctt-front-end',
  },
  {
    title: 'Jungle - E-Commerce Application',
    description: `A mini e-commerce application built with Rails 6.1. This project was completed as part of the Lighthouse Labs Web Development Bootcamp. Jungle allows visitors to browse products, add them to their cart, and purchase them using Stripe. Admins can add and remove products and categories, and view sales data.`,
    imgSrc: '/static/images/projectCards/jungle.jpg',
    href: 'https://github.com/Cwarcup/jungle-rails',
  },
  {
    title: 'On Your Mental Podcast',
    description: `Website for the On Your Mental Podcast. On Your Mental focuses on mental health and wellness. The website was built using Next.js and Tailwind CSS. The website is hosted on Vercel. Content is updated automatically when new episodes are published using the RSS feed and Youtube API.`,
    imgSrc: '/static/images/projectCards/OnYourMental.jpg',
    href: 'https://github.com/Cwarcup/on-your-mental',
  },
  {
    title: 'TinyApp',
    description: `TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly). Includes features such as authentication, analytics dashboard, hashed passwords, encrypted cookies. Built with Express and EJS.`,
    imgSrc: '/static/images/projectCards/tinyApp.jpg',
    href: 'https://github.com/Cwarcup/tinyapp',
  },
  {
    title: 'lotide',
    description: `A library similar to lodash for JavaScript. This project was created and published by me as part of my learnings at Lighthouse Labs. The library provides utilities that are not built into native JavaScript such as 'flatten()' to convert nested arrays into a single array.`,
    imgSrc: '/static/images/projectCards/lotide.jpg',
    href: 'https://www.npmjs.com/package/@cwarcup/lotide',
  },
  {
    title: 'jsBooks - Interactive Notes and Code Cells',
    description: `This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.`,
    imgSrc: '/static/images/projectCards/jsBooks.jpg',
    href: 'https://github.com/Cwarcup/jbook',
  },
  {
    title: 'Youtube Search',
    description: `Created a React app to search youtube and return list of popular videos. This app served as an introduction to using Redux and Redux Thunk to manage state.`,
    imgSrc: '/static/images/projectCards/react-redux-search.jpg',
    href: 'https://yt-video-player.vercel.app/',
  },
  {
    title: 'Bar Chart Generator',
    description: `Create bar charts with custom data, labels and colors. Bars can display up to two data fields to produce a stacked bar chart. Created with vanilla HTML, CSS, JS with a touch of jQuery.`,
    imgSrc: '/static/images/projectCards/barChartApp.png',
    href: 'https://github.com/Cwarcup/stretch-project-1',
  },
  {
    title: 'CSS Toggle Theme',
    description: `Toggle theme created with pure CSS.`,
    imgSrc: '/static/images/projectCards/toggle-theme-css.png',
    href: 'https://github.com/Cwarcup/css-toggle-theme',
  },
  {
    title: 'Responsive Icon Navbar',
    description: `Small amount of JS, icons provided by Font Awesome.`,
    imgSrc: '/static/images/projectCards/icon-navbar.png',
    href: 'https://github.com/Cwarcup/responsive-icon-navbar',
  },
  {
    title: 'Search NPM Modules',
    description: `Want to search NPM for a module? Here's a quick and easy example using the NPM Registry API to search NPM modules.`,
    imgSrc: '/static/images/projectCards/searchNPM.png',
    href: 'https://cwarcup.github.io/redux-ts-react/',
  },
  {
    title: 'Infinite Scroll',
    description: `Infinite scroll website with images generated using Unsplash API.`,
    imgSrc: '/static/images/projectCards/infiniteScroll.png',
    href: 'https://cwarcup.github.io/infinite_scroll/',
  },

  {
    title: 'Wavy Website',
    description: `Some fun with CSS to create a wavy website.`,
    imgSrc: '/static/images/projectCards/wavy-website.png',
    href: 'https://cwarcup.github.io/wavy-website/',
  },
  {
    title: 'Dad Quotes',
    description: `Basic use of Dad Quote API.`,
    imgSrc: '/static/images/projectCards/dad-quotes.png',
    href: 'https://cwarcup.github.io/dad-quotes/',
  },
  {
    title: 'Node Weather App',
    description: `Uses Mapbox for geocoding and Weatherstack for weather forecast.`,
    imgSrc: '/static/images/projectCards/basic-weather-node-app.png',
    href: 'https://basic-weather-node-app.herokuapp.com/',
  },
]

export default projectsData
