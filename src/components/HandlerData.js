import React, { Component } from "react"
import { TabContent, CardHeader, CardBody, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';

class TabProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '0',
            visible: true
        }
        console.log(this.props)
        this.toggleTav = this.toggleTav.bind(this)
        this.scrollUp = this.scrollUp.bind(this)
    }


    toggleTav(val){
        if (val == this.state.activeTab){
            this.setState({activeTab : null})
        }
        else{
            this.setState({activeTab : val})
        }
    }

    scrollUp(){
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            });
    }

    render(){
        const data = this.props.data
        const navTab = data.map((prj) => {
            let activation = this.state.activeTab === (prj.id.toString())
            return(
                <NavItem>
                        <NavLink
                            className= {classnames({ active: activation })}
                            onClick={() => { this.toggleTav(prj.id.toString()) }}>
                                <span className='navTabs'> {prj.name}</span>
                            
                        </NavLink>
                </NavItem>
       
            )
        });

        const contentTab = data.map((prj) => {
            let git;

            if (prj.projectGit){
                git = [
                    (
                        <div style={{margin:'20px'}}>
                        <h7>Main Projects:</h7>
                        </div>
                    )
                ];
                for (var i=0; i < prj.projectGit.length; i++) {                
                        git.push(
                            <div style={{paddingLeft:'20px'}}>
                                <h7><a href={prj.projectGit[i]}> {prj.projectName[i]} </a></h7>
                                <p>{prj.projectDescription[i]}</p>
                            </div>
                        )
                    }
                }

            return (
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId= {prj.id.toString()}>
                        <Row>
                            <Col className='col-12 sm'>
                                <Card className='project'>
                                    <CardHeader>{prj.name}</CardHeader>
                                    <CardBody>
                                        {prj.description}
                                        {git}
                                    </CardBody>
                                    <Row style={{textAlign:'right', padding:'2px'}}>
                                        <Col className='col-12'>
                                        <Button className='btn bg-transparent' onClick={this.scrollUp} style={{borderRadius:'30px'}}>
                                            <i class="fa fa-angle-double-up" style={{color:"black"}}></i>
                                        </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>)
        })
        
        return (
            <React.Fragment>
                <Container col={10}>
                    <Row style={{borderTop: 'solid black 1px', paddingTop:"20px"}}>
                        <Col className='col-12 col-md-4'style={{paddingTop:"20px", textAlign:'center'}} >
                            <Nav vertical tabs>{navTab}</Nav>
                        </Col>
                        <Col className='col-12 col-md'>
                            {contentTab}
                        </Col>
                    </Row>
                </Container>
                
            </React.Fragment>
        )
    }
}

export default TabProject;

