import {Col, Container, List, ListInlineItem, Row} from "reactstrap";

const ContactsSection = () => {
    return (
        <Container className='contacts'>
            <Row>
                <Col className='text-center'>
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
    );
};

export default ContactsSection;
