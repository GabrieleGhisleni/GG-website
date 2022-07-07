import { PROJECTS_LIST } from "./project_list";

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

  projects: [
    PROJECTS_LIST.geo_dolomities,
    PROJECTS_LIST.open_gasoline,
  ]
};
