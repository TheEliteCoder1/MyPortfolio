// List of entries for completed edjucation with dates, credential, institution
// I put my highschool and current college edjucation here
const entries = [
  { dates: "September 2025 - April 2028 (Expected)", credential: "Software Engineering Technology Advanced Diploma", place: "Centennial College, Toronto, ON" },
  { dates: "September 2021 - April 2024", credential: "High School Diploma", place: "TDSB VSS, Toronto, ON" }
];

export default function Education() {
  return (
    <section>
      <h1>Education</h1>
      <ul className="timeline">
        {entries.map((e) => (
          <li key={e.credential}>
            <span className="dates">{e.dates}</span>
            <h3>{e.credential}</h3>
            <p>{e.place}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
