import {Jumbotron, Card, CardImg} from 'reactstrap';

export const Header = ()=>{
    return(
        <div style={{border:'solid 1px black'}}>
            <Jumbotron>
                <div className='jumbotron'>
                    <div className='container'>
                    <div className='row'>
                        <div className='col-12' style={{textAlign:'center'}}>
                            <img className='myImg' src='/assets/images/home.jpg' height='100' width='100' style={{borderRadius:"20px"}}/>
                        </div>
                    </div>
                        <div className='row'>
                            <div className='col-md-3'></div>
                            <div class='col-12 col-md-6'>
                                <h1>Gabriele Ghisleni</h1>
                                <h3>
                                    We take inspiration from real life's events and make them shared!
                                    Our creation is up the the entire community nothing is excluded.
                                </h3>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </Jumbotron>
        </div>

    );
}
