import ProjectCard from "../components/ProjectCard.jsx";

// List of 3 projects with each property filled in
const projects = [
  { title: "Blobbymite", image: "images/blobbymite.jpg", link_url:"https://store.steampowered.com/app/4189780/Blobbymite_Hero_Of_Power/", link_text: "Blobbymite on Steam",
    description: "Blobbymite is a bright, energetic puzzle-platforming adventure game where you play as a caped blob hero fighting the Rebelord Pirates and rescuing the Princess ", role: "Desining the levels, level editor, online systems, menus, story, shop, updates and being the publisher on steam.", outcome: "1,200 unique free demo playthroughs and 3 purchases on steam for a total revenue of 13$ - this can change later." 
  },
  { title: "DispersedEngine", image: "images/dispersedengine.png", link_url:"https://github.com/TheEliteCoder1/DispersedEngine/", link_text: "Dispersed Engine",
    description: "Dispersed Engine is a C++ game engine for windows and web with controller support.", role: "Architected and built a custom 2D game engine (Dispersed Engine) from scratch using C++ and SDL3, handling windowing, input, rendering, scripting, editing scenes and physics integration.", outcome: "Was able to make a prodigy inspired math game using the engine and host in via netlify." 
  },
  { title: "OpenWorldMath", image: "images/OpenWorldMathScreenshot.png", link_url:"https://openmathworld.netlify.app/", link_text: "OpenWorldMath Live Demo", 
    description: "Open World Math Game is a fun way to learn math by fighting creatures, drinking water, base building and more to come. This game is stil under developent.", role: "Wrote the scripts for this specific project using my DispersedEngine's header files which are accessible due to CMake and vcpkg linking. I also used C++ best principles but was able to make this game without too much complexity due to how I abstracted common game features to be in the engine to simply project scripting.", outcome: "A live hosted math game that is inspired by prodigy and can be played as a demo but the music will have to be changed to be unique in order to sell it commercially. Updates and feedback will be coming on thier way." 
  },
];

export default function Projects() {
  // places projects onto a grid with a projectcard to display the details of each project
  return (
    <section>
      <h1>Projects</h1>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}
