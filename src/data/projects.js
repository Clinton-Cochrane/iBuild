const projects = [
    {
        id: "bike-companion",
        title: "Bike Companion",
        description:
            "A bicycle tracking and maintenance application focused on rides, bikes, components, and service history. I originally built it as a Java school project when I did not have a car and was maintaining four bikes of my own. Over time, I have rebuilt much of it in Kotlin and expanded it into something I actually use. It tracks mileage, maintenance intervals, parts, rides, and service history so a bike’s real workload is easier to understand. It is still a little clunky, and that is okay. There are features I still want to add, including emergency alerts, but it already does what I originally needed: help keep a bike dependable enough to get me through the work week.",
        technologies: ["Kotlin", "Android", "Room", "Java"],
        image: "/photos/bike_companion.png",
        githubUrl: "https://github.com/Clinton-Cochrane/Bike_CompanionVersion1.0",
        projectUrl: "https://github.com/Clinton-Cochrane/Bike_CompanionVersion1.0",
        commitDetails: "193 commits",
        LastCommitDate: "Sep 2026",
        featured: true,
    },

    {
        id: "bud-e",
        title: "Bud-e",
        description:
            "Bud-e started as a notebook page, became a spreadsheet, and eventually turned into a local first AI terminal application. The goal is to explore whether there is a useful relationship between product descriptions, terpene blends, purchase history, and how a particular batch actually made the user feel. Instead of rating an individual session, Bud-e records reflections at the batch level to reduce some of the day to day noise. It can ingest a menu URL, read product descriptions, compare their language against the vibe the user is looking for, and recommend three products. The recommendation process combines description language, product chemistry, purchase history, and personal preferences rather than relying on strain names alone.",
        technologies: ["Python", "SQLite", "Ollama"],
        image: "/photos/bud-e.png",
        githubUrl: "https://github.com/Clinton-Cochrane/bud-e/tree/poc",
        projectUrl: "https://github.com/Clinton-Cochrane/bud-e/tree/poc",
        commitDetails: "34 commits",
        LastCommitDate: "Aug 2026",
        featured: true,
    },

    {
        id: "portfolio",
        title: "iBuild",
        description:
            "iBuild started as an idea I saw on YouTube and wanted to experiment with: turning a personal portfolio into a small interactive world. It is essentially an interactive paper map that lets someone explore the same information found on this site in a different way. I drew the scene by hand, imported the map into Tiled, brought it into Kaplay, and added player movement, collisions, and interactive areas. The result is intentionally simple. It is less about building a full game and more about learning how game development works while creating a more personal way to present projects, hobbies, photos, and other pieces of who I am",
        technologies: ["React", "KAPLAY"],
        image: "/photos/ibuild.png",
        githubUrl: "https://github.com/Clinton-Cochrane/iBuild",
        projectUrl: "https://i-build-one.vercel.app/",
        featured: true,
        commitDetails: "9 commits",
        LastCommitDate: "Sep 2026",
    },
];

export default projects;