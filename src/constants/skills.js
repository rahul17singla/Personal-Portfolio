import { BiLogoCPlusPlus } from "react-icons/bi";
import { DiNodejsSmall } from "react-icons/di";
import { FaGitAlt, FaJava, FaReact } from "react-icons/fa6";
import {
	SiAmazonwebservices,
	SiDocker,
	SiMongodb,
	SiMysql,
	SiSpringboot,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";

const skills = [
	{ icon: BiLogoCPlusPlus, name: "C++" },
	{ icon: FaJava, name: "Java" },
	{ icon: FaReact, name: "React" },
	{ icon: SiTypescript, name: "TypeScript" },
	{ icon: SiTailwindcss, name: "Tailwind CSS" },
	{ icon: SiDocker, name: "Docker" },
	{ icon: DiNodejsSmall, name: "Node.js" },
	{ icon: SiMongodb, name: "MongoDB" },
	{ icon: SiSpringboot, name: "Spring Boot" },
	{ icon: SiAmazonwebservices, name: "AWS Cloud" },
	{ icon: SiMysql, name: "MySQL" },
	{ icon: FaGitAlt, name: "Git" },
];

export const categorizedSkills = {
	Languages: [
		"C++",
		"Java",
		"JavaScript",
		// "TypeScript",
		// "PowerShell",
		"SQL",
	],
	"Libraries & Frameworks": [
		"React",
		"Node.js",
		"Spring Boot",
		// "Tailwind CSS",
		"Redux-Toolkit",
	],
	Databases: [
		"MySQL",
		"PostgreSQL",
		"MongoDB",
		"Amazon RDS",
		// "Amazon DynamoDB",
	],
	"Cloud & Version Control": ["Amazon Web Services (AWS)", "Git", "GitHub"],
	"CS Fundamentals": [
		"Data Structures",
		"Algorithms",
		// "Git",
		"OOPs",
		// "DBMS",
		"REST APIs",
	],
	"Tools & Platforms": [
		"Visual Studio Code",
		"IntelliJ IDEA",
		"Postman",
		"Docker",
	],
};

export default skills;
