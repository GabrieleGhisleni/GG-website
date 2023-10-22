import Typist from "react-typist";


const TypeAnimationComponent = () => {
    let typeAnim = [];
    for (let i = 0; i < 100; i++) {
        typeAnim.push(
            <span key={i}>
                <Typist.Backspace count={17} delay={3000}/>
                <span> Machine Learning Engineer </span>
                <Typist.Backspace count={27} delay={3000}/>
                <span> Web Developer </span>
                <Typist.Backspace count={17} delay={3000}/>
                <span> Data Scientist </span>
            </span>
        );
    }

    return (
        <Typist className='animation' avgTypingDelay={100}>
            <span> Data Scientist </span>
            {typeAnim}
        </Typist>
    )
}

export default TypeAnimationComponent;
