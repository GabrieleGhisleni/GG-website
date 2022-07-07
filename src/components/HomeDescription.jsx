import { Row, Container, Col } from "reactstrap";
import { NavLink } from 'react-router-dom';
import HomeContacts from "./HomeContacts";

const HomeDescription = () => {
    const projectName = "See the projects"
    return (
        <Container id='homeDescription'>
            <Row className='rowAbout text-center'>
                <Col xs='12' md='8'>
                    <h4 className='title'>About Me<hr /></h4>
                    <div className='homeP'>
                    Hi! My Name is Gabriele Ghisleni and i'm a Data Scientist student at
                    the University of Trento. I work mainly in Python for all tasks in
                    the data science world such as EDA, machine learning, data
                    engineering, data visualization and others. <br/> <br/> 

                    I've learned the MLOPS best practise and standards along with many big data tools such as
                    Docker, Pub/Sub system as MQTT, a bit of DBMS (MySQL and Redis) and
                    how to create robust tests. <br/> <br/> 
                    
                    Besides data science I have learned
                    different tools for web development such as HTML, CSS, JavaScript
                    and a professional framework such React.js, I've deployed small web
                    applications. Together with them I've also a basic and general
                    knowledge on backend development using Python frameworks such as
                    Django, Django Rest API.
                    </div>
                        {/* <button className="button-home btn-lg form-control ">
                            <NavLink to='/projects' id="project-button">{projectName}</NavLink>
                        </button> */}
                    {
                        window.innerWidth < 768?
                        <button className="button-home btn-lg ">
                            <NavLink to='/projects' id="project-button">{projectName}</NavLink>
                        </button>: null
                    }
                </Col>
                <Col xs='12' md='4'>
                    <HomeContacts />
                    {
                        window.innerWidth > 768?
                        <button className="button-home btn-lg ">
                            <NavLink to='/projects' id="project-button">{projectName}</NavLink>
                        </button>: null
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default HomeDescription;