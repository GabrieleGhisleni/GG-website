import { PROJECTS_LIST } from "./project_list";


export const ML = {
  id: 0,
  name: "Machine Learning",
  description: (
    <p>
      Interested in Machine and Deep Learning. During the master degree in Data
      Science I attended several courses regarding machine learning and
      statistical models. In particular: Statistical Learning which try to cover
      theoretically the majors techniques used to analyse data. in particular we
      covered: Linear regression, Generalized linear models, K-NN, LDA, QDA,
      Gaussian Naive Bayes, Naive Bayes, Ridge and Lasso regression, Support
      Vector Machine, Decisional trees, Random Forest. Implementing all this
      models into R.
      <br />
      <br /> Then I attended the main course of Machine Learning in which we've
      done again the majors techniques implementing them into Python. Moreover
      we also covered Neural Networks, focusing on Convolutional Neural Network.
      The final exams consists was a challenge in which we have to build a CNN
      able to compare and retrive images by similarity. The following link go to
      GitHub where is hosted the code and report of that projects.
      <br />
      <br />
      I Recently follow a MLOPS course from coursera understanding the best practise
      of ML in production, the important of monitoring and pipelines. Together with 
      it I also followed a NLP course using HuggingFace Transformers.
    </p>
  ),

  // to adjust the order just swap the elements
  projects: [
    PROJECTS_LIST.ml_blog,
    PROJECTS_LIST.uda,
    PROJECTS_LIST.mlops,
    PROJECTS_LIST.italian_grid_imbalance,
    PROJECTS_LIST.image_retrival,
    PROJECTS_LIST.stock_prediction,
    PROJECTS_LIST.simple_distil,
    PROJECTS_LIST.simple_bert,
    PROJECTS_LIST.statistical_notes,
  ]
}