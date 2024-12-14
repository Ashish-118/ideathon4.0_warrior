import QA from "../images/logo/qa.png";



function header() {
    return (
        <div id="container">
            <div id="logo">
                <img src={QA} alt="" />
            </div>
            <div id="menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Solutions</a></li>
                    <li><a href="#">Books</a></li>
                    <li><a href="#"></a>Doubt</li>
                </ul>
            </div>
            <div id="login">

            </div>
        </div>
    )
}

export default header