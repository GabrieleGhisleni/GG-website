export default class Project {
    constructor(
        {
            name,
            description,
            git_url = null,
            pdf_url = null,
            app_url = null,
            id = null

        } = {}) {

        this.name = `${name.trim()}   `;
        this.description = description;
        this.git_url = git_url;
        this.pdf_url = pdf_url;
        this.app_url = app_url;
        this.id = id;
    }

    render_project(idx){
        return (
            <div className="gitLink" key={`section-${this.id}`}>
                <h6> 
                    <a target="_blank" rel="noreferrer" href={this.git_url}>
                        {`${idx+1}.  ${this.name}`} 
                        <i className="fa fa-github fa-lg"></i>
                    </a>
                </h6>
            <div>
                {this.description}
                {<br/>} 
                {this.render_app()}
                {this.render_pdf()}
            </div>
            <hr className="HR" />
        </div>
    
        )
    }

    render_pdf() {
        if (this.pdf_url !== null) {
            return (
                <p className="body" key={`pdf-${this.id}`}>
                    <em><br />
                        Report in pdf:
                        <a target="_blank" rel="noreferrer" href={this.pdf_url}>
                            &nbsp; <i style={{ color: "firebrick" }} className="fa fa-file-pdf-o"></i>
                        </a>
                    </em>
                </p>
            )
        }

        else return (<span></span>)
    }



    
    render_app() {
        if (this.app_url !== null) {
            let res

            if (this.app_url.includes("jekyll")){
                let url = this.app_url.split("jekyll")[1]
                res = (
                <a href={url} target="_blank" rel="noreferrer" key={`app-${this.id}`}>
                    <img style={{ display: "inline" }} src={process.env.PUBLIC_URL + "/jekyll.svg"} height={50} alt='jekyll' />
                </a>
                )
            }

            else {
                res = (
                    <a href={this.app_url} target="_blank" rel="noreferrer"  key={`app-${this.id}`}>
                        <i style={{ color: "firebrick" }} className="fa fa-rocket"></i>
                    </a>
                )
            }

            return (
                <p className="body"><br />
                    <em> Active WebPage: <br />
                        {res}
                    </em>
                </p>
            )
        }

        else return (<span></span>)
    }

    custom_render() {

    }


}