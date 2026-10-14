export default function About() {
  // Name and short biography as well as resume
  return (
    <section>
      <h1>About</h1>
      <div className="about">
        <img className="profile" src="images/PfpGoodWithoutBlur.jpg"/>
        <div>
          <h2>Raphael Julian</h2>
          <p>I have been coding for the last 5 years. I have learned alot of things from web development, gui development, all the way to game and game engine development. These projects are available on my GitHub and showcase my skills some of which required doing teamwork with artists and other classmates from college. Some of these are hobby projects while others span more than a few months and were released to public stores like Steam and Google Play.</p>
          <a className="button" href="public/documents/raphael_julian_resume.pdf" target="_blank" rel="noreferrer">View résumé (PDF)</a>
        </div>
      </div>
    </section>
  );
}
