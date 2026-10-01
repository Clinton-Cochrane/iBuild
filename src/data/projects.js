const projects = [
    {
        id: "bike-companion",
        title: "Bike Companion",
        description:
            "A bicycle tracking and maintenance application focused on rides, bikes, components, and service history. I originally built it as a Java school project when I did not have a car and was maintaining four bikes of my own. Over time, I have rebuilt much of it in Kotlin and expanded it into something I actually use. It tracks mileage, maintenance intervals, parts, rides, and service history so a bike’s real workload is easier to understand. It is still a little clunky, and that is okay. There are features I still want to add, including emergency alerts, but it already does what I originally needed: help keep a bike dependable.",
        technologies: ["Kotlin", "Android", "Room", "Java"],
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
        githubUrl: "https://github.com/Clinton-Cochrane/iBuild",
        projectUrl: "https://i-build-one.vercel.app/",
        featured: true,
        commitDetails: "9 commits",
        LastCommitDate: "Sep 2026",
    },
    {
        id: "Nova",
        title: "1974-door Nova Custom",
        description:
            "My first car started life as a modest four-door, straight-six Nova and has slowly become something completely different. Over a three-year frame-off restoration I LS-swapped it with a junkyard 6.0, Holley Mid-Mount accessories, Terminator X, a 4L60, long-tube headers, upgraded cooling and suspension, and a garage-sprayed satin Dark Hunter Green finish; today it makes about 390 horsepower at the rear wheels. It was built to be driven, broken, and improved—the next goal is less about adding power and more about making it comfortable and reliable enough for long road trips.",
        technologies: ["LS Swap", "Frame Off Restomod", "Holley"],
        image: "photos/nova.png",
        featured: true,
    },
    {
        id: "Mary",
        title: "Mary the Bike",
        description:
            "Marry is my 2014 Trek FX 7.2 Disc, bought new from a local bike shop and ridden for more miles than I can count. In college it was my only transportation, and after it was stolen from outside my office I eventually found it listed at a pawn shop in another town while searching Craigslist and got it back. Since then I have rebuilt it into a practical utility e-bike with a 48V 750W mid-drive system, a 52T chainring, an 11–32 cassette, and a rear child seat; these days it handles school runs, errands, and family adventures.",
        technologies: ["Trek", "Mid-Drive", "Family Hauler"],
        image: "photos/marry.jpg",
        featured: true,
    },
];

export default projects;