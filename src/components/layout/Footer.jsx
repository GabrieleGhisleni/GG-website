import {Col, Container, List, ListInlineItem, Row} from "reactstrap";

export const Footer = () => {
    return (
        <div className="footer">
            <Container >
                <Row >
                    <Col>
                        <span>@2021 Ghisleni Gabriele</span>
                    </Col>
                    <Col className="col" style={{ textAlign: "right" }}>
                        <List type="inline">
                            <ListInlineItem>
                                <a href="https://github.com/GabrieleGhisleni">
                                    <i className="fa fa-github fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/">
                                    <i className="fa fa-linkedin fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.facebook.com/gabriele.ghisleni.125">
                                    <i className="fa fa-facebook fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="https://www.instagram.com/g_gabry_/">
                                    <i className="fa fa-instagram fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="mailto:gabriele.ghisleni01@gmail.com">
                                    <i className="fa fa-envelope-o fa-lg"></i>
                                </a>
                            </ListInlineItem>
                            <ListInlineItem>
                                <a href="@">
                                    <i className="fa fa-info fa-lg"></i>
                                </a>
                            </ListInlineItem>
                        </List>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
