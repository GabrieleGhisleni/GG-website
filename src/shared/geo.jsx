export const Geo = {
  id: 4,
  name: "GeoSpatial analysis",
  description: (
    <p>
      Attended the UniTN course of geospatial analysis and representation.
      Course done by using Python and GeoPandas package, exploting the basic
      usage of geo dataframes and geometry (from shapely) operations. After that
      we analysed the API exposed by Open Street Map and the Pyrosm package to
      easily deal data in python from OSM, we also focused on geospatial
      statistics and metric. Moreover in the last part of the course we
      quickly see how to render a map in the web!
    </p>
  ),

  projectName: [
    "GeoSpatial Notes",
    "Open Gasoline - find the cheapest gas stations aroud you!",
  ],
  projectDescription: [
    "Colab notebooks from lectures with all the topics discussed",
    "Web application built using React and Python to create the geojson files used by the application. Every day the govern of italy publish the gas prices of all the stations, using github actions once a day run a .py scripts that update a folder in github, querying the websites it returns and display the cheapest gas stations around the municipality chosen.",
  ],
  projectGit: [
    "https://github.com/GabrieleGhisleni/Geospatial-data-analysis",
    "https://github.com/GabrieleGhisleni/GasolinePrices",
  ],
  pdf: [null],
  webpage: [
    null,
    "https://gabrieleghisleni.github.io/GasolinePrices/",
  ],
};
