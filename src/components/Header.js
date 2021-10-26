import {Jumbotron, Card, CardImg} from 'reactstrap';

export const Header = ()=>{
    return(
        <div style={{border:'solid 1px black'}}>
            <Jumbotron>
                <div className='jumbotron'>
                    <div className='container'>
                    <div className='row headerImg'>
                        <div className='col-12' style={{textAlign:'center'}}>
                            <img className='myImg img-fluid' 
                            src = "./assets/images/home.jpg"
                            height='150' width='150'/>
                        </div>
                    </div>
                        <div className='row'>
                            <div className='col-md-3'></div>
                            <div className='col-12 col-md-6'>
                                <h1>Gabriele Ghisleni</h1>
                                <h3>
                                    Data Scientist and Web Developer. <br/>
                                    Based in Trento, Italy.

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
