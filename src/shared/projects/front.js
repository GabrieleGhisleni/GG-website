import { PROJECTS_LIST } from "./project_list";

export const Front = {
  id: 2,
  name: "Web Dev",
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

      <br/>
      As well as with front-end developing i have the basis of back-end
      development, in particular with relational dbms and python framework such
      Django.
    </p>
  ),

  projects: [
    PROJECTS_LIST.economies,
    PROJECTS_LIST.open_gasoline,
    PROJECTS_LIST.ml_blog,
    PROJECTS_LIST.conjoint_form,
    PROJECTS_LIST.gg_portfolio,
    PROJECTS_LIST.amigurumi,
    PROJECTS_LIST.frontend_tutorial,

  ]
};
