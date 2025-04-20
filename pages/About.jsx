
export function About() {
    return (
        <section className="about-page">
            <h2 className="about-title">
                <span className="g-red">A</span>
                <span className="g-blue">b</span>
                <span className="g-yellow">o</span>
                <span className="g-blue">u</span>
                <span className="g-green">t</span>
                &nbsp;
                <span className="g-red">U</span>
                <span className="g-yellow">s</span>
            </h2>

            <div className="team-cards">

                <div className="team-member-card tom">
                    <img className="about-img" src="assets/img/Tom-photo.jpg" alt="Tom's photo" />
                    <h3>Tom Shahar</h3>
                    <p>
                        I'm Tom, currently diving deep into frontend and backend technologies.
                        I enjoy turning ideas into functional, sleek interfaces and working on cool projects with great teammates.
                    </p>
                </div>

                <div className="team-member-card hadar">
                    <img className="about-img" src="assets/img/Hadar-photo.jpg" alt="Hadar's photo" />
                    <h3>Hadar Sabag</h3>
                    <p>
                        Hi! I'm Hadar, a fullstack student passionate about building beautiful, useful web apps.
                        I love clean code, React, and a great cup of coffee while coding ☕
                    </p>
                </div>

            </div>
        </section>
    )
}


