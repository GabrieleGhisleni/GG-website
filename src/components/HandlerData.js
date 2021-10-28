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
    this.myRef = React.createRef();
    this.state = {
      activeTab: window.innerWidth < 768 ? '0' : "0",
      inf: window.innerWidth < 768 ? "hidden" : "visible",
      visible: true,
    };

    this.toggleTav = this.toggleTav.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.scroll = this.scroll.bind(this);
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

  scroll() {
    this.setState({inf:"visible"})
    if (window.innerWidth < 768) {
      this.myRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }


  render() {
    const data = this.props.data;
    const navTab = data.map((prj) => {
      let activation = this.state.activeTab === prj.id.toString();
      return (
        <NavItem>
          <NavLink
            className={classnames({ active: activation }, "myItem")}
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
          <div className="related">
            <hr />
            <h7>Related Works</h7>
            <hr />
          </div>,
        ];
        for (var i = 0; i < prj.projectGit.length; i++) {
          let pdf = null;
          if (prj.pdf[i]) {
            pdf = (
              <p className="body">
                <em>
                  Report in pdf:{" "}
                  <a target="_blank" href={prj.pdf[i]}>
                    {" "}
                    &nbsp;{" "}
                    <i
                      style={{ color: "firebrick" }}
                      className="fa fa-file-pdf-o"
                    ></i>
                  </a>{" "}
                </em>
              </p>
            );
          }
          let webpage = null;
          if (prj.webpage) {
            if (prj.webpage[i]) {
              webpage = (
                <p className="body">
                  <em>
                    Active WebPage:{" "}
                    <a href={prj.webpage[i]} target="_blank">
                      {" "}
                      Visit the App!{" "}
                      <i
                        style={{ color: "firebrick" }}
                        className="fa fa-rocket"
                      ></i>
                    </a>{" "}
                  </em>
                </p>
              );
            }
          }
          git.push(
            <div className="gitLink">
              <h6>
                <a target="_blank" href={prj.projectGit[i]}>
                  {i + 1 + ". "}
                  {prj.projectName[i]} <i className="fa fa-github fa-lg"></i>
                </a>
              </h6>
              <p>
                {" "}
                {prj.projectDescription[i]} <br /> {pdf}
                {webpage}{" "}
              </p>
              <hr className="HR" />
            </div>
          );
        }
      }

      return (
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={prj.id.toString()}>
            <Row className="text-justify myFont">
              <Col className="col-12 sm myCol">
                <Card className="project">
                  <CardHeader className="cardH">{prj.name}</CardHeader>
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
                        style={{ borderRadius: "30px" }}
                      >
                        <i
                          className="fa fa-angle-double-up"
                          style={{ color: "black" }}
                        ></i>
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
        <Container>
          <div style={{ margin: "0 40px" }}>
            <Row style={{ borderTop: "solid black 1px", paddingTop: "20px" }}>
              <Col className="col-12 text-center col-md-auto leftNav">
                <Nav vertical tabs>
                  {navTab}
                </Nav>
              </Col>
              
              <Col className="col-12 col-md" style={{visibility: this.state.inf}}>
                <div ref={this.myRef}> </div>
                {contentTab}
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default TabProject;
