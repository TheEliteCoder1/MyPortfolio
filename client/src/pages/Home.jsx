import { Link } from "react-router-dom";

export default function Home() {
  // basic information about who I am, with a Link element to the about page
  return (
    <section className="hero">
      <h1>Welcome — It's Raphael, The Elite Coder!</h1>
      <p>This site is for all of those willing to view and try my apps and games. You can take some projects as inspiration - as long as you dont copyright anything that is commercially sold.</p>
      <p className="mission">My Mission is to bring back feature rich optimized software and entertainment back to the hands of consumers.</p>
      <Link className="button" to="/about">Learn More</Link>
    </section>
  );
}
