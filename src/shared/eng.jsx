export const Engineering = {
  id: 1,
  name: "Data Engineering",
  description: (
    <p>
      Interested in Data Engineering, covered during the Big Data Technologies
      course at UniTN. During the course we studied how to handle all the data
      types: structured, semi-structured and a bit of unstructured, in batch or
      in stream process. In particular we focused on the key concept of data
      processing pipeline and its component: ingestion, storage, computation and
      serving layer.
      <br />
      <br />
      The storage part was one of the most time consuming we went trough the
      usage of relational database as MySQL as well with NoSql databases such as
      Redis and MongoDB, exploiting the basic usage and commands. After that we
      focused on the data ingestion, studying Pub/Sub system that allow to
      decouples applications, in particular we studied MQTT and Apache Kafka,
      unlikely we implemented only the mqtt while kafka for time constraints was
      studied only theoretically. About computing we saw some advanced tools for
      big data computing such as Apache Spark using the free platform of
      databricks. At the end of the course we had a brief overview of Apache
      Flink without implementing it.Lastly regarding the serving layer we spent
      times on the usage of Docker.
    </p>
  ),
  projectName: [
    "Forecasting imbalance risks for Italian power grids using renewable energy predictions.",
  ],
  projectDescription: [
    "In this projects we combined statistical method as well with big data tools, in particular we built a web application that given the forecast weather is able to predict and display the forecasted production of renewable energies and consequently imbalances on the italian grid. \n To do this we used different technologies such as Docker, MySql, Redis, MQTT and Django to creating the web-application. Since the nature of the data we mainly used non-linear models for the predictions.",
  ],
  projectGit: ["https://github.com/GabrieleGhisleni/EnergyProject"],
  pdf: [
    "https://github.com/GabrieleGhisleni/EnergyProject/blob/master/bdt2021Ghisleni_Pomella_report.pdf",
  ],
};
