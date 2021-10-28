import { List, Li } from "reactstrap";
import {NavLink} from 'react-router-dom';


export const Home = () => {
  return (
    <div className="container">
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-12 col-md-1"></div>
        <div className="col-12 col-md-6" style={{ marginTop: "10px" }}>
          <h4 className="homeTitle">About Me<hr/></h4>
          
          <div className='homeP' style={{ textAlign: "justify" }}>
            Hi! My Name is Gabriele Ghisleni and i'm a Data Scientist with many
            interests. I work mainly in Python for all tasks in the data science
            world such as machine learning, data visualization, data
            exploration, data engineering and others, together with R for EDA.<br/><br/>
            Besides data science I have learned different tools for web
            development such as HTML, CSS, Js and a professional framework such React.js.
            Along with this front-end skilss i've also a general knowledge on back-end development
            using frameworks such as Django and DBMS gained during my Master 
            thesis in Data Science at the University of Trento. <span><NavLink to='/projects'>Check the projects! </NavLink></span>
          </div>
        </div>
        <div className="col-12 col-md-1"></div>
        <div className="col-12 col-md align-middle " style={{ marginTop: "10px" }}>
          <h4 className="homeTitle">Contacts<hr/></h4>
          <div className="contactList ">
            <List type="unstyled">
              <li>
                <a href="https://github.com/GabrieleGhisleni">
                  <i className="fa fa-github fa-lg">&nbsp;Github</i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/">
                  <i className="fa fa-linkedin fa-lg">&nbsp;Linkedin</i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/gabriele.ghisleni.125">
                  <i className="fa fa-facebook fa-lg">&nbsp;Facebook</i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/g_gabry_/">
                  <i className="fa fa-instagram fa-lg">&nbsp;Instagram</i>
                </a>
              </li>
              <li>
                <a href="mailto:gabriele.ghisleni01@gmail.com">
                  <i className="fa fa-envelope-o fa-lg">&nbsp;Email Me</i>
                </a>
              </li>
              <li>
                <a href="@">
                  <i className="fa fa-info fa-lg">&nbsp;Download CV</i>
                </a>
              </li>
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};
