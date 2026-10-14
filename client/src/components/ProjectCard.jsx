// Reusable card via parameters and formatting: title, image, description, link, my role, outcome
export default function ProjectCard({ title, image, link_url, link_text, description, role, outcome }) {
  return (
    <article className="card">
      <img src={image} alt={`Screenshot of ${title}`} />
      <div className="card-body">
        <h3>{title}</h3>
        <a href={link_url} target="_blank">{link_text}</a>
        <p>{description}</p>
        <p><strong>My role:</strong> {role}</p>
        <p><strong>Outcome:</strong> {outcome}</p>
      </div>
    </article>
  );
}
