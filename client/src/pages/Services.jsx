// Edit this list only: name, description, image
const services = [
  { name: "Fun & Simple Games", image: "images/BouncyWalls.png", description: "Make fun and simple games for a low price of 25/hr$." },
  { name: "Desktop Apps", image: "images/timerist-preview.png", description: "Make intiutive feature rich desktop apps for a medium price of 50$/hr" },
];

export default function Services() {
  // using standard cards with <article> for services
  return (
    <section>
      <h1>Services</h1>
      <div className="grid">
        {services.map((s) => (
          <article className="card" key={s.name}>
            <img src={s.image} alt={s.name} />
            <div className="card-body"><h3>{s.name}</h3><p>{s.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
