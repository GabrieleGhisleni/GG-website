import Project from "../Project_class";

export const PROJECTS_LIST = {
  italian_grid_imbalance: new Project({
    id: 0,
    name: "Forecasting imbalance risks for Italian power grids using renewable energy predictions.",
    description: "In this projects we combined statistical method as well with big data tools, in particular we built a web application that given the forecast weather is able to predict and display the forecasted production of renewable energies and consequently imbalances on the italian grid. \n To do this we used different technologies such as Docker, MySql, Redis, MQTT and Django to creating the web-application. Since the nature of the data we mainly used non-linear models for the predictions.",
    git_url: "https://github.com/GabrieleGhisleni/EnergyProject",
    app_url: null,
    pdf_url: "https://github.com/GabrieleGhisleni/EnergyProject/blob/master/bdt2021Ghisleni_Pomella_report.pdf",
  }),


  economies: new Project({
    id: 1,
    name: "Economies - smart way to handle domestic finance!",
    description: "Web application used to handle the domestic finance with Django-React infrastructure",
    git_url: "https://github.com/GabrieleGhisleni/Economies-DjangoReact-App",
    app_url: "https://smart-economies.herokuapp.com/",
    pdf_url: null
  }),

  ml_blog: new Project({
    id: 2,
    name: "DeepLearning / ML BLOGS",
    description: "Machine Learning blog with theory and code.",
    git_url: "https://gabrieleghisleni.github.io/DeepLearning-Lab/",
    app_url: "jekyllhttps://gabrieleghisleni.github.io/DeepLearning-Lab/",
    pdf_url: null
  }),

  open_gasoline: new Project({
    id: 3,
    name: "Open Gasoline - find the cheapest gas stations aroud you!",
    description: "Web application built using React and Python to create the geojson files used by the application. Every day the govern of italy publish the gas prices of all the stations, using github actions once a day run a .py scripts that update a folder in github, querying the websites it returns and display the cheapest gas stations around the municipality chosen.",
    git_url: "https://github.com/GabrieleGhisleni/GasolinePrices",
    app_url: "https://gabrieleghisleni.github.io/GasolinePrices",
    pdf_url: null

  }),

  gg_portfolio: new Project({
    id: 4,
    name: "Web Personal Portfolio",
    description: "For practise purpose i made also this web portfolio using React.",
    git_url: "https://github.com/GabrieleGhisleni/GG-website",
    app_url: "https://gabrieleghisleni.github.io/GG-website/#/home",
    pdf_url: null
  }),

  amigurumi: new Project({
    id: 5,
    name: "Amigurumi e-commerce website",
    description: "First web application made before follow the courses. This app is made as a copy of an e-commerce without the real buy/selling part. It is a work made with my family showing the beautiful amigurumi and crochests that my mum produces in her free times. it is hosted freely on Heroku and uses Amazon S3 to host the pictures.",
    git_url: "https://github.com/GabrieleGhisleni/Django-AmigurumiLisi",
    app_url: "https://amigurumi-lisi.herokuapp.com/",
    pdf_url: null
  }),

  frontend_tutorial: new Project({
    id: 6,
    name: "Tutorials and notes from courses",
    description: "Notes from lectures and courses",
    git_url: "https://github.com/GabrieleGhisleni/FrontEnd-Tutorial",
    app_url: null,
    pdf_url: null
  }),

  mlops: new Project({
    id: 7,
    name: "MLOPS at Coursera",
    description: "Machine Learning OPS course at coursera",
    git_url: "https://github.com/GabrieleGhisleni/Tutorials/tree/master/12.%20MLOPS",
    app_url: "jekyllhttps://gabrieleghisleni.github.io/DeepLearning-Lab/introduction-to-ML-in-production/",
    pdf_url: null,
  }),

  image_retrival: new Project({
    id: 8,
    name: "Image Retrival with Convolutional Neural Network",
    description: "Extract features using convolutional neural network and compare images by similarity.",
    git_url: "https://github.com/GabrieleGhisleni/ImageRetrival-ConvNN",
    app_url: null,
    pdf_url: "https://github.com/GabrieleGhisleni/ImageRetrival-ConvNN/blob/master/Applied_Machine_Learning%20report.pdf",
  }),

  stock_prediction: new Project({
    id: 9,
    name: "Stock prediction with LSTM Neural Network",
    description: "LSTM Neural network trained to predict the fluctuation of the stock markets.",
    git_url: "https://github.com/GabrieleGhisleni/Stock-Prediction-with-Multivariate-LSTM",
    app_url: null,
    pdf_url: null,
  }),

  statistical_notes:
    new Project({
      id: 10,
      name: "Statistical Notes",
      description: "Notes from university lectures with all the topics discussed, to be uploaded yet.",
      git_url: "https://gabrieleghisleni.github.io/DeepLearning-Lab/",
      app_url: null,
      pdf_url: null,
    }),

  geo_dolomities: new Project({
    id: 11,
    name: "Geo-Dolomities",
    description: "This project presents a large-scale analyses on the Dolomities investigating, from a geospatial point of view, their morphology and the most important point of interest such as the alpine huts and the major peaks. We will perform a network analyses on all the trails that allow to visit those mountains, generating insightful description and details on the difficulties and possible route to follow, also connecting them to the street network. Lastly we will perform a spatial analyses to understand if there is some correlation in the prices of the alpine huts according to the area in which they are.",
    git_url: "https://github.com/GabrieleGhisleni/Geo-Dolomities",
    app_url: "https://gabrieleghisleni.github.io/Geo-Dolomities/",
    pdf_url: "https://github.com/GabrieleGhisleni/Geo-Dolomities/blob/master/_report.pdf",
  }),

  twitter_css: new Project({
    id: 12,
    name: "Semantic Network Analysis in Twitter of No-Vax Movement. ",
    description: "this project aimed to detect subgroups in the community and understanding the spread of them toghether with an analysis of the ecology sources used in the debate.",
    git_url: "https://github.com/GabrieleGhisleni/Twitter-Social-Analysis",
    app_url: null,
    pdf_url: "https://github.com/GabrieleGhisleni/Twitter-Social-Analysis/blob/master/Computational_Social_Science.pdf",
  }),

  data_viz: new Project({
    id: 13,
    name: "Data Viz Notes and Notebook",
    description: "Data Viz Notes and Notebook",
    git_url: "https://github.com/GabrieleGhisleni/Data-Viz",
    app_url: "jekyllhttps://gabrieleghisleni.github.io/Data-Viz/",
    pdf_url: null
  }),

  uda: new Project({
    id: 14,
    name: "Unsupervised Domain Adaptation(UDA)",
    description: "UniTN Deep Learning Project 2021-22. Build a deep learning framework on a standard setting of Unsupervised Domain Adaptation (UDA).",
    git_url: "https://github.com/GabrieleGhisleni/Unsupervised-domain-adaptation",
    app_url: null,
    pdf_url: null
  }),

  simple_bert: new Project({
    id: 15,
    name: "Fine-Tuning BERT for multi-label classification",
    description: "Simple fine-tuning of BERT Multi label classifier for Toxic comment challenge with huggingface trainer.",
    git_url: "https://github.com/GabrieleGhisleni/BERT_Multi-Label_Classification",
    app_url: null,
    pdf_url: null
  }),

  simple_distil: new Project({
    id: 16,
    name: "DistilBERT in sentiment analyses with custom training loop",
    description: "Simple fine-tuning of DistilBERT for sentiment classification, implemented with custom training loop.",
    git_url: "https://github.com/GabrieleGhisleni/DistilBERT-for-Sentiment-Classification",
    app_url: null,
    pdf_url: null
  }),

  conjoint_form: new Project({
    id: 17,
    name: "Custom Conjoint Template Form in React and analyses",
    description: "Created a custom conjoint template form using React and analyse the result obtain on Economies product.",
    git_url: "https://github.com/GabrieleGhisleni/Conjoint-Form-Template",
    app_url: "https://gabrieleghisleni.github.io/Conjoint-Form-Template/",
    pdf_url: null
  }),

}