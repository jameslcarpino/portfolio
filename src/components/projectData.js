import resumap from "./resumap.png";
import b2p from "./b2p.png";
import gameoflife from "./gameoflife.png";
import medcabinet from "./medcabinet.png";

export const projectData = [
  {
    name: "Bridges to Prosperity",
    image: `${b2p}`,
    description:
      "A Mapbox visualization of bridge sites in Rwanda to aid in the Bridges to Prosperity mission of connecting isolated comunities to essential necessities by building bridges at remote river crossings. ",

    roles: [
      {
        role:
          "Created a mapbox map with bridge sites mapped from fetched data from the backend ",
      },
      {
        role:
          "Created an information modal to allow for searching, filtering, viewing data, and viewing all bridge sites in one modal.",
      },
      {
        role:
          "Implemented functionality to click and view one single bridge by markers from the map. Data is displayed in the sidebar modal.",
      },
      {
        role:
          "Implemented a backend route for paginating the data, as well as connecting front end ability to process the paginated data.",
      },
      {
        role: "Made a search reducer and functionality to filter through data.",
      },
    ],

    technology: {
      frontend:
        " React JS | react-mapbox-gl | Mapbox-GL API | Ant Design | LESS | Redux  ",
      backend: "Node JS | Express | Swagger-jsdoc | Jest | PostgreSQL | knex",
    },
    github:
      "https://github.com/Lambda-School-Labs/Labs25-Bridges_to_Prosperity-TeamA-be",
    website: "https://main.dvxfvrn3mdjg1.amplifyapp.com/",
  },
  {
    name: "Game of Life",
    image: `${gameoflife}`,
    description:
      'A computer generated simulation of the interaction of cells and their neighbors causing them to become "alive" or "dead".',
    roles: [
      {
        role:
          "Designed and implemented a working version of Conway's game of life.",
      },
      { role: "Wrote algorithm to create game behavior." },
      {
        role:
          "Used canvas to create a grid as well as a 2d array, implemented the 2d array in the final build",
      },
    ],

    technology: {
      frontend: "React JS | React Bootstrap",
      backend: "",
    },
    github: "https://github.com/JamesLCarpino/cs-bw-g_o_l",
    website: "https://gameoflife-ja1lxvnvd.vercel.app/",
  },
  {
    name: "Med Cabinet API",
    image: `${medcabinet}`,
    description:
      "A Marijuanna suggestion API that integrates with data scientists machine learning ",
    roles: [
      {
        role:
          "Designed backend for recommending marijuana strains based on a machine learning api that connects strains with illnesses.",
      },
      { role: "Wrote algorithm to create game behavior." },
    ],

    technology: {
      frontend: "",
      backend:
        " Node JS | Express | Jest | Heroku | knex | PostgreSQL | bcrypt | jsonwebtoken",
    },
    github: "https://github.com/bw-med-cabinet/Back-end",
    website: "https://marijuana-api.herokuapp.com/api/",
  },
  {
    name: "Resumap",
    image: `${resumap}`,
    description:
      "A mapbox visualisation of a deeper dive into me beyond a traditional resume.",
    roles: [
      {
        role:
          "Simple implementation of Mapbox to create a scroll event based map with quick descriptions of points of interest.",
      },
    ],

    technology: {
      frontend: "Front End: Mapbox-GL API | CSS | HTML",
      backend: "",
    },
    github: "https://github.com/jameslcarpino/jameslcarpino.github.io",
    website: "https://jameslcarpino.github.io",
  },
];
