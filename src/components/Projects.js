import {Card, CardBody, CardImg, CardHeader} from 'reactstrap'
import { TabContent, List, TabPane, Nav, NavItem, NavLink, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Content extends Comment{
    constructor(props){
        super(props);
        this.state = {}
    }


    render(){
        return(<div></div>)
    }
}

function Projects(prj){
    const projectsRender = prj.map((project) => {
        let git;
        if (project.projectGit){
            git = [
                (
                    <div style={{margin:'20px'}}>
                    <h7>Main Projects:</h7>
                    </div>
                )
            ];
            for (var i=0; i < project.projectGit.length; i++) {                
                    git.push(
                        <div style={{paddingLeft:'20px'}}>
                            <h7><a href={project.projectGit[i]}> {project.projectName[i]} </a></h7>
                            <p>{project.projectDescription[i]}</p>
                        </div>
                    )
                }
            }
        
        return(
            // key is importante!

                <div className='container' key={project.id}>
                    <div className='row'>
                        <Card className='project'>
                            <CardHeader>{project.name}</CardHeader>
                            <CardBody>
                                {project.description}
                                {git}
                            </CardBody>
                        </Card>
                    </div>
                </div>


        )
    })

    return(
        <div>
            <div className='col-12' style={{padding:'0px', border:'solid black 0.5px'}}></div>
            {projectsRender}
        </div>

    )

} 

export default Projects;