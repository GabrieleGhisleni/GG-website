export const Front = {
  id: 2,
  name: "Front-End Web Dev",
  description: (
    <p>
      Self-taught front-end developers, since almost all data science products
      requires a serving layers i decided to focus and spent almost a year
      learning front-end web development. in particular i started following a
      complete course on Edx about{" "}
      <a href="https://www.edx.org/course/html5-and-css-fundamentals"> HTML</a>{" "}
      and
      <a href="https://www.edx.org/course/css-basics"> CSS</a>, then i moved to
      <a href="https://www.edx.org/course/javascript-introduction">
        {" "}
        JavaScript
      </a>{" "}
      learning the basics syntax.
      <br />
      <br />
      Having this basic tools i picked{" "}
      <a href="https://www.coursera.org/learn/front-end-react">React.js</a> as a
      primary framework and followed a complete course on Coursera, then i
      started to built my own application to practice, trying to including
      different aspects such as geospatial data, authentication system and
      trying to take advantages of Amazon AWS services, in particular Amazon
      RDS, Amazon S3 and Ec2. Moreover i hosted some of my applications on
      Heroku.
    </p>
  ),

  projectName: [
    "Open Gasoline - find the cheapest gas stations aroud you!",
    "Web Personal Portfolio",
    "Amigurumi e-commerce website",
    "Tutorials and notes from courses"
  ],
  projectDescription: [
    "Web application built using React and Python to create the geojson files used by the application. Every day the govern of italy publish the gas prices of all the stations, using github actions once a day run a .py scripts that update a folder in github, querying the websites it returns and display the cheapest gas stations around the municipality chosen.",
    "For practise purpose i made also this web portfolio using React.",
    "First web application made before follow the courses. This app is made as a copy of an e-commerce without the real buy/selling part. It is a work made with my family showing the beautiful amigurumi and crochests that my mum produces in her free times. it is hosted freely on Heroku and uses Amazon S3 to host the pictures.",
    "Notes from lectures and courses"
  ],
  projectGit: [
    "https://github.com/GabrieleGhisleni/GasolinePrices",
    "https://github.com/GabrieleGhisleni/GG-website",
    "https://github.com/GabrieleGhisleni/Django-AmigurumiLisi",
    "https://github.com/GabrieleGhisleni/FrontEnd-Tutorial"
  ],
  pdf: [null],
  webpage: [
    "https://gabrieleghisleni.github.io/GasolinePrices/",
    "https://gabrieleghisleni.github.io/GG-website/#/home",
    "https://amigurumi-lisi.herokuapp.com/",
  ],
};
