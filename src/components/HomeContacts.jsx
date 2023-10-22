import {React} from 'react';
import {List} from 'reactstrap';

const HomeContacts = () => {
    return (
        <div className='contacts'>
            <h4 className=" title">Contacts
            </h4>
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
                        <a href="mailto:gabriele.ghisleni01@gmail.com">
                            <i className="fa fa-envelope-o fa-lg">&nbsp;Email Me</i>
                        </a>
                    </li>
                    <li>
                        <a href={process.env.PUBLIC_URL + '/assets/GabrieleGhisleni_CV.pdf'} download><i
                            className="fa fa-info fa-lg">&nbsp;Download CV</i></a>
                    </li>
                </List>
            </div>
        </div>
    );
};

export default HomeContacts;
