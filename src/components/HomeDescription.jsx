import {Row, Container, Col} from "reactstrap";
import DevNotes from "./HomeDevNotes";
import HomeContacts from "./HomeContacts";

const HomeDescription = () => {
    return (
        <Container id='about-container'>
            <Row className='about-me text-center'>
                <Col xs='12'>
                    <h4 className='title'>
                        About Me
                        <hr/>
                    </h4>
                    <div className='description'>
                        <p>

                        I am a versatile and dynamic professional with a fervor for technology and a robust background
                        in data science and critical thinking. My educational journey includes a Bachelor's degree in
                        Philosophy and a Master's degree in Data Science. <br/><br/>

                        My career commenced as a software developer, where I honed my skills in React and Django,
                        enabling me to craft high-quality code. Currently, I am immersed in the role of a data
                        scientist, harnessing my technical prowess and
                        analytical thinking to address intricate challenges in the realm of NLP.<br/><br/>

                        In my spare time, I absolutely love playing table tennis 🏓 and going for hikes ⛰️. But that's not all
                        – I'm also quite the adventurer, enjoying rock climbing 🧗🏼, and I've got some smooth salsa 💃🏼 dance
                        moves too!
                        </p>
                    </div>
                </Col>
                <Row className='notes-contacts-row'>
                    <Col xs='12' sm='8'>
                        <DevNotes/>
                    </Col>
                    <Col xs='12' sm='4'>
                        <HomeContacts/>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default HomeDescription;
