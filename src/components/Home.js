import {List, Li} from 'reactstrap';

export const Home = () => {
    return(
        <div className='container'>
            <div className='row row-body'>
                <div className='col-12 col-md-1'></div>
                <div className='col-12 col-md-6'>
                        <h4 className='homeTitle'>About Me</h4>
                        <div className='aboutMe'>
                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.                                We take inspiration from real life's events and make them shared!
                                Our creation is up the the entire community nothing is excluded.
                        </div>
                </div>
                <div className='col-12 col-md-1'></div>
                <div className='col-12 col-md'>
                    <h4 className='homeTitle'>Contacts</h4>
                    <div className='contactList'>
                    <List type='unstyled'>
                        <li><a href='@'><i class="fa fa-github fa-lg">&nbsp;Github</i></a></li>
                        <li><a href='@'><i class="fa fa-linkedin fa-lg">&nbsp;Linkedin</i></a></li>
                        <li><a href='@'><i class="fa fa-facebook fa-lg">&nbsp;Facebook</i></a></li>
                        <li><a href='@'><i class="fa fa-instagram fa-lg">&nbsp;Instagram</i></a></li>
                        <li><a href='@'><i class="fa fa-info fa-lg">&nbsp;Download CV</i></a></li>
                    </List>
                    </div>
                </div>
            </div>
        </div>
    )
}