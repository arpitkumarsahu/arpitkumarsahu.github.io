/* Change this file to get your personal Portfolio */

// Summary And Greeting Section

import emoji from "react-easy-emoji";
import Nalco from "./assets/images/Nalco.png";

const illustration = {
  animated: true, // set to false to use static SVG
};

const greeting = {
  username: "Arpit Kumar Sahu",
  title: "Hi all, I'm Arpit",
  subTitle: emoji(
    "A passionate Full Stack Web Developer  having an experience of designing and building Web applications with HTML5, CSS3, JavaScript, React.js, Node.js, Express.js and MongoDB."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1CTVIrO6Zrdu-FQJbVob93QevwWAP6l0U/view?usp=sharing",
  displayGreeting: true, // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/arpitkumarsahu",
  linkedin: "https://www.linkedin.com/in/arpitkumar-sahu/",
  gmail: "aarpitkumarsahu99@gmail.com",
  // gitlab: "https://gitlab.com/",
  // facebook: "https://www.facebook.com/"
  // instagram: "https://www.instagram.com/arpit_kumar_sahu/",
  twitter: "https://twitter.com/AarpitKumarSahu",
  display: true, // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle:
    "CRAZY FULL STACK WEB DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    "⚡ Develope highly interactive Front-end / User Interfaces for your web and mobile applications.",
    "⚡ Deals with the internal content of the system, the server technologies - database, architecture, software logic.",
    "⚡ Progressive Web Applications Progressive Web App ( PWA ) in normal and Single page App (SPA) Stacks.",
    "⚡ Integration of third party services such as Firebase",
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "HTML5",
      fontAwesomeClassname: "fab fa-html5",
    },
    {
      skillName: "CSS3",
      fontAwesomeClassname: "fab fa-css3-alt",
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js",
    },
    {
      skillName: "React.js",
      fontAwesomeClassname: "fab fa-react",
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node",
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire",
    },
    {
      skillName: "MongoDB",
      fontAwesomeClassname: "fa fa-database",
    },
  ],
  display: true, // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "MASAI SCHOOL",
      logo: require("./assets/images/Masai.jpg"),
      subHeader: "Full Stack Web Development",
      duration: "March 2022 - December 2022",
      desc: "Learnt MERN stack and data-structure and algorithms",
    },
    {
      schoolName: "Indira Gandhi Institute Of Technology, Sarang",
      logo: require("./assets/images/IGIT.jpeg"),
      subHeader: "Bachelor in Electrical Engineering",
      duration: "August 2017 - May 2021",
      desc: " Took courses about Electrical Engineering, Electrical machines, Control Systems, Microelectronics and Microprocessors...",
    },
    {
      schoolName: "Jyoti Vihar Junior College, Burla",
      logo: require("./assets/images/JVJC-logo.jfif"),
      subHeader: "Bachelor of Science ",
      duration: "June 2016 - May 2019",
      desc: "Took stream as science ...",
    },
  ],
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "HTML/CSS3", //Insert stack or technology you have experience in
      progressPercentage: "80%",
    },
    {
      Stack: "Javascript",
      progressPercentage: "70%",
    },
    {
      Stack: "React", //Insert stack or technology you have experience in
      progressPercentage: "70%",
    },
    {
      Stack: "Data Structure & Algorithms",
      progressPercentage: "80%",
    },
    {
      Stack: "Express",
      progressPercentage: "60%",
    },
    {
      Stack: "Mongo Db",
      progressPercentage: "50%",
    },
  ],
  displayCodersrank: true, // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Electrical Work-shop Intern",
      company: "National Aluminium Company Limited (NALCO) , Damanjodi",
      companylogo: Nalco,
      date: "June 2019 – July 2019",
      desc: "National Aluminium Company (NALCO) Damanjodi, a company that was established to harness the bauxite-rich deposits of the Panchpatmali Range.",
      descBullets: [],
    },
  ],
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
  githubUserName: "arpitkumarsahu", // Change to your github username to view your profile in Contact Section.
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true, // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "SOME OF MY PROJECTS",
  projects: [
    {
      image: require("./assets/images/zoomcar.png"),
      projectName: "Zoom car-clone",
      projectDesc:
        "This is a Full-Stack Clone of car sharing platform Zoomcar , which has the functionality of booking a car in a city of your choice.",
      tech: " Tech Stack : React , Redux ,HTML, CSS, Javascript, Chakra UI , nodejs, express, mongoDB  ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://quick-car.netlify.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/arpitkumarsahu/Zoom-Car-Clone",
        },
      ],
    },
    {
      image: require("./assets/images/TheHindu.png"),
      projectName: "The Hindu-clone",
      projectDesc:
        "Inspired from thehindu.com . It is a news website that provide news from all domains of life that can be accessed on the click of a button . ",
      tech: " Tech Stack : React , Redux , Styled Component , html , Css , Javascript ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://thehindu.netlify.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/arpitkumarsahu/abashed-store-5188/tree/main/the-hindu",
        },
      ],
    },

    {
      image: require("./assets/images/EngageBay.png"),
      projectName: "EngageBay CLONE-clone",
      projectDesc:
        "Software is meant to solve problems. Complicated software only multiplies them. That is why we built EngageBay.",
      tech: " Tech Stack : React , Redux , chkra UI , Styled Component , html , Css , Javascript . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://brawny-base-7995-6r5h.vercel.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/Sakil9051/-Engagebay-clone",
        },
      ],
    },
    {
      image: require("./assets/images/Kickstarter.png"),
      projectName: "Kickstarter-clone",
      projectDesc:
        "Inspired from kickstarter.com , It's where creators share new visions for creative work with the communities that will come together to fund them.",
      tech: " Tech Stack : React , chkra UI , Styled Component , html , Css , Javascript . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://kickstarteer.netlify.app/",
        },
        {
          name: "Github Repo",
          url: "https://github.com/arpitkumarsahu/KickStarter-Clone",
        },
      ],
    },
    {
      image: require("./assets/images/Fraazo.png"),
      projectName: "Fraazo-clone",
      projectDesc:
        "It is an e-commerce website that follows a farm-to-fork model where it owns the entire back-end supply chain starting with farmers, and delivers them fresh to customers.",
      tech: " Tech Stack : html , Css , Javascript , localstorage . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://fraazoo.netlify.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/arpitkumarsahu/Fraazo.com",
        },
      ],
    },
    {
      image: require("./assets/images/Youtube.png"),
      projectName: "Youtube-clone",
      projectDesc:
        "Inspired from Youtube. You can watch what the world is watching , from the latest songs to most popular gaming videos, fashion, beauty, news, earning and many more .",
      tech: " Tech Stack : html , Css , Javascript . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://youtubee-clone.netlify.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/arpitkumarsahu/Youtube-Clone-",
        },
      ],
    },
    {
      image: require("./assets/images/Weather.png"),
      projectName: "Weather App",
      projectDesc:
        "A weather App where you can search weather of any city . Tech Stacks: html , css , javascript, weather API",
      tech: " Tech Stack : html , Css , Javascript . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://get-weather-app-clone.netlify.app/",
        },
        {
          name: "Github Repo",
          url: "https://github.com/arpitkumarsahu/Weather-App",
        },
      ],
    },

    {
      image: require("./assets/images/Outlook.png"),
      projectName: "Outlook-clone",
      projectDesc:
        "Inspired from Outlook.com, it is an news website that bring news all around the world to your finger tips ,  made with JavaScript , HTML, and CSS .",
      tech: " Tech Stack : html , Css , Javascript . ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://outlook-clone.netlify.app/",
        },
        {
          name: "GitHub Repo",
          url: "https://github.com/arpitkumarsahu/DemoOutlook",
        },
        //  you can add extra buttons here.
      ],
    },
  ],
  display: true, // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  //   title: emoji("Achievements And Certifications 🏆 "),
  //   subtitle:
  //     "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  //   achievementsCards: [
  //
  //         {
  //           name: "Award Letter",
  //           url:
  //             ""
  //         },
  //         {
  //           name: "Google Code-in Blog",
  //           url:
  //             ""
  //         }
  //       ]
  //     },
  //
  //       ]
  //     },

  //
  //   ],
  display: false, // Set false to hide this section, defaults to true
};

// // Blogs Section

const blogSection = {
  //   title: "Blogs",
  //   subtitle:
  //     "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",

  //   blogs: [
  //     {
  //       url:
  //         "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
  //       title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
  //       description:
  //         "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
  //     },
  //     {
  //       url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
  //       title: "Why REACT is The Best?",
  //       description:
  //         "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
  //     }
  //   ],
  display: false, // Set false to hide this section, defaults to true
};

// // Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(""),

  talks: [
    {
      title: "",
      subtitle: "",
      slides_url: "",
      event_url: "",
    },
  ],
  display: false, // Set false to hide this section, defaults to true
};

// // Podcast Section

const podcastSection = {
  //   title: emoji("Podcast 🎙️"),
  //   subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",
  //   // Please Provide with Your Podcast embeded Link
  //   podcast: [
  //     ""
  //   ],
  //   display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: "Contact Me ☎️",
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "9090516504",
  email_address: "aarpitkumarsahu99@gmail.com",
};

// Twitter Section

const twitterDetails = {
  //   userName: "davidrakosi_", //Replace "twitter" with your twitter username without @
  //   display: true // Set true to display this section, defaults to false
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
};
