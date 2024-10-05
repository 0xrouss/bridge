import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const profileData = {
    name: "Pablo Vigara",
    github: "https://github.com/0xrouss",
    linkedin: "https://linkedin.com/in/pablovigara",
    twitter: "https://x.com/0xrouss",
    profileDescription: `Software developer passionate about the crypto ecosystem, which he has been following and studying for several years. Pablo loves keeping up with the latest developments and has a thorough understanding of how blockchain technologies and protocols work. He has a strong ability to work in a team and always looks for ways to collaborate and support his colleagues. He enjoys challenges and excels at solving complex problems.`,
};

const educationData = {
    institution: "IES San Vicente",
    graduationDate: "June 2021",
    degree: "Higher Technician in Multiplatform Applications Development",
    gpa: "9.0/10.0",
};

const experienceData = [
    {
        company: "NTT Data",
        role: "Software Developer",
        duration: "Nov 2023 - Present",
        image: "/nttdata.svg",
        responsibilities: [
            "Led continuous developments on an application of the Barcelona City Council, increasing client satisfaction and efficiency of the application",
            "Handling developments in different applications of two teams with different technology",
            "Development of automation tools and internal facilities",
            "Facilitated clear communication between teams and clients, ensuring successful developments",
        ],
    },
    {
        company: "Inetum",
        role: "Software Developer",
        duration: "Mar 2021 - Oct 2022",
        image: "/inetum.svg",
        responsibilities: [
            "CRM Maintenance for the Euskaltel telephony group",
            "Automated card payment verification, saving the customer thousands of dollars in expenses and losses",
            "Assisted in the transfer of internal tool tickets to Atlassian's Jira system",
        ],
    },
];

const projectsData = [
    {
        name: "DeCash",
        role: "Hacker",
        date: "Jul. 2024",
        image: "/decashLogo.png",
        achievements: [
            "Team project for the ETHGlobal Brussels 2024 Hackathon, earned four prizes",
            "Developed a SocialFi link payment application facilitating mass adoption of blockchain",
            "Learned how to use the AggLayer Bridge and documented it",
        ],
    },
    {
        name: "$GONE",
        role: "Cofounder",
        date: "Dec. 2023 - Present",
        image: "/gonelogo.png",
        achievements: [
            "Founded the memecoin with the largest community on the Polygon PoS blockchain",
            "Collaborated with different protocols and communities from the ecosystem",
            "Realized the largest airdrop to NFT communities in the ecosystem",
            "Conducting safety and risk analysis of the team and the community",
        ],
    },
    {
        name: "Mr. Pixel",
        role: "Cofounder",
        date: "Oct. 2022",
        image: "/MrPixel.png",
        achievements: [
            "NFT Collection airdropped to Mr. Crypto by RacksLabs, the largest Hispanic NFT community",
            "Created all the pixel art for the collection",
            "Community management at Mr. Crypto",
        ],
    },
];

const skillsData = [
    "HTML / CSS",
    "Tailwind",
    "TypeScript",
    "Solidity",
    "React",
    "Next.js",
    "Bun",
    "Git",
    "Vercel",
    "C#",
    "SQL / PLSQL",
    "Java",
    "Spring",
    "ASP.NET",
    "Github",
    "Photoshop",
];

const articlesData = [
    {
        title: "How to implement Stackr's Microrollup",
        link: "#",
        image: "/stackr.png",
    },
    {
        title: "How to implement the AggLayer Bridge",
        link: "https://github.com/0xrouss/agglayer-scripts",
        image: "/agglayer.png",
    },
    {
        title: "$PSYOP honeypot scam technical report",
        link: "https://rouss.substack.com/p/how-to-earn-more-than-27-eth-in-less",
        image: "/psyop.png",
    },
    {
        title: "Protect yourself from malicious transactions",
        link: "https://x.com/0xRouss/status/1657883089899585538",
        image: "/malicious.png",
    },
];

export default function Home() {
    return (
        <div className="font-sans bg-gray-50 p-8 max-w-screen-md mx-auto text-gray-700">
            <header className="mb-8">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/profilePicture.jpeg"
                            alt="Profile Picture"
                            width={80}
                            height={80}
                            className="w-20 h-20 bg-gray-300 border rounded-full"
                        />
                        <h1 className="text-7xl tracking-wide font-subscribe text-custom-brown">
                            rouss
                        </h1>
                    </div>
                    <div className="flex gap-4 mt-4 sm:mt-0 sm:mr-6 mb-4 sm:mb-0">
                        <Link
                            href={profileData.twitter}
                            className="text-gray-700 hover:bg-gray-200 p-2 border border-gray-300 transition-all rounded-full"
                        >
                            <FaXTwitter size={24} />
                        </Link>
                        <Link
                            href={profileData.github}
                            className="text-gray-700 hover:bg-gray-200 p-2 border border-gray-300 transition-all rounded-full"
                        >
                            <FaGithub size={24} />
                        </Link>
                        <Link
                            href={profileData.linkedin}
                            className="text-gray-700 hover:bg-gray-200 p-2 border border-gray-300 transition-all rounded-full"
                        >
                            <FaLinkedin size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Profile
                </h2>
                <p className="text-base leading-relaxed">
                    {profileData.profileDescription}
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Experience
                </h2>
                {experienceData.map((job, index) => (
                    <div className="mb-8" key={index}>
                        <div className="flex gap-4">
                            <div className="w-20 h-20 flex items-center justify-center">
                                {job.image && (
                                    <Image
                                        src={job.image}
                                        alt={`${job.company} Logo`}
                                        width={40}
                                        height={40}
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {job.company}
                                </h3>
                                <h4 className="mb-1">| {job.duration}</h4>
                                <ul className="list-disc ml-6 space-y-2">
                                    {job.responsibilities.map((task, i) => (
                                        <li key={i}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Projects
                </h2>
                {projectsData.map((project, index) => (
                    <div className="mb-8" key={index}>
                        <div className="flex gap-4">
                            <div className="w-20 h-20 flex  items-center justify-center">
                                {project.image && (
                                    <Image
                                        src={project.image}
                                        alt={`${project.name} Image`}
                                        width={60}
                                        height={60}
                                        className="rounded-md"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {project.name}
                                </h3>
                                <h4 className="mb-1">
                                    | {project.role} - {project.date}
                                </h4>
                                <ul className="list-disc ml-6 space-y-2">
                                    {project.achievements.map(
                                        (achievement, i) => (
                                            <li key={i}>{achievement}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Education
                </h2>
                <p className="text-base">
                    <strong>{educationData.institution}</strong>,{" "}
                    {educationData.graduationDate}
                    <br />
                    {educationData.degree} - GPA: {educationData.gpa}
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                    {skillsData.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-custom-brown-light text-white px-3 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4 border-l-4 border-custom-brown pl-3">
                    Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {articlesData.map((article, index) => (
                        <div
                            className="border border-gray-300 rounded-lg overflow-hidden"
                            key={index}
                        >
                            <div className="w-full h-48 relative">
                                {article.image && (
                                    <Image
                                        src={article.image}
                                        alt={`${article.title} Image`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {article.title}
                                </h3>
                                <Link
                                    href={article.link}
                                    className="text-blue-600 hover:underline"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
