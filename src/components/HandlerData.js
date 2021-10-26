import React, { Component } from "react";
import {
  TabContent,
  CardHeader,
  CardBody,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";
import classnames from "classnames";

class TabProject extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: (window.innerWidth < 768) ? null : '0',
      visible: true,
    };

    this.toggleTav = this.toggleTav.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.scroll = this.scroll.bind(this)
  }

  toggleTav(val) {
      this.setState({ activeTab: val });
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  scroll(){
    if (window.innerWidth < 768){
    window.scrollBy({
        top: 450,
        behavior: 'smooth'
      })}
  }

  render() {
    const data = this.props.data;
    const navTab = data.map((prj) => {
      let activation = this.state.activeTab === prj.id.toString();
      return (
        <NavItem className='customItem'>
          <NavLink
            className={classnames({ active: activation })}
            onClick={() => {
              this.toggleTav(prj.id.toString());
              this.scroll();
            }}
          >
            <span className="navTabs"> {prj.name}</span>
          </NavLink>
        </NavItem>
      );
    });

    const contentTab = data.map((prj) => {
      let git = [];
      if (prj.projectGit) {
        git = [
          <div className='related'>
            <hr/>
            <h7 >Related Works</h7>
            <hr/>
          </div>,
        ];
        for (var i = 0; i < prj.projectGit.length; i++) {
          let pdf = null;
          if (prj.pdf[i]) {
            pdf = (
              <p className='body'>
                <em>Report in pdf: <a target='_blank' href={prj.pdf[i]}> &nbsp; <i style={{color:'firebrick'}} className="fa fa-file-pdf-o"></i></a> {" "} </em>
              </p>
            );
          }
          let webpage = null;
          if (prj.webpage){
              if( prj.webpage[i]){
                  webpage = (
                    <p className='body'>
                        <em>Active WebPage: <a href={prj.webpage[i]}  target='_blank'>Visit the App!</a>{" "}</em>
                    </p>
                  )

              }
          }
          git.push(
            <div className="gitLink">
              <h6>
                <a target='_blank' href={prj.projectGit[i]}>
                  {i + 1 + ". "}
                  {prj.projectName[i]}{" "}
                <i className="fa fa-github fa-lg"></i>
                </a>
              </h6>
              <p>
                {" "}
                {prj.projectDescription[i]} <br /> {pdf}{webpage}{" "}
              </p>
            </div>
          );
        }
      }

      return (
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={prj.id.toString()}>
            <Row className='text-justify myFont'>
              <Col className="col-12 sm">
                <Card className="project">
                  <CardHeader style={{textAlign:'center'}}>{prj.name}</CardHeader>
                  <CardBody>
                    <div style={{ whiteSpace: "pre-line" }}>
                      {prj.description}
                    </div>
                    {git}
                  </CardBody>
                  <Row style={{ textAlign: "right", padding: "2px" }}>
                    <Col className="col-12">
                      <Button
                        className="btn bg-transparent"
                        onClick={this.scrollUp}
                        style={{ borderRadius: "30px" }}>
                        <i
                          class="fa fa-angle-double-up"
                          style={{ color: "black" }}>
                        </i>
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      );
    });

    return (
      <React.Fragment>
        <Container col={10}>
          <Row style={{ borderTop: "solid black 1px", paddingTop: "20px" }}>
            <Col
              className="col-12 col-md-4"
              style={{ paddingTop: "20px", textAlign: "center" }}
            >
              <Nav vertical tabs>
                {navTab}
              </Nav>
            </Col>
            <Col className="col-12 col-md">{contentTab}</Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default TabProject;
