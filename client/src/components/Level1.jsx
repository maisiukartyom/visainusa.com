import { Link } from "react-router-dom";

const Level1 = () => {
    return (
        <section>
            <h1>Level 1 page</h1>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Level1