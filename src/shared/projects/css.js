import { PROJECTS_LIST } from "./project_list";

export const CSS = {
  id: 9,
  name: "Computational Social Science",
  description: (
    <p>
      Course attended at the university of Trento, the final project was a
      Semantic Network Analysis performed on Twitter about the No-Vax movement
      in Italy. In this project we put in practice many techniques from different
      field such as network analysis, done with Networkx in Python as well with 
      Natural Language Process operation always done in Python to be able to analyse
      around 60.000 tweets collected in the end of september 2021.
    </p>
  ),

  projects: [
    PROJECTS_LIST.twitter_css
  ]

};
