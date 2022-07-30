// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: "special",
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface HeaderProps {
  name: string;
}

interface CoursePartProps {
  part: CoursePart;
}

interface CoursePartsProps {
  parts: CoursePart[];
}

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>
}

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
 throw new Error(
   `Unhandled discriminated union member: ${JSON.stringify(value)}`
 );
};


const Part = (props: CoursePartProps): JSX.Element => {
  switch (props.part.type) {
    case "normal":
      return (
      <p>
        <b>{props.part.name} {props.part.exerciseCount}</b>
        <div>{props.part.description}</div>
      </p>
      )
    case "groupProject":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <div>project exercises {props.part.groupProjectCount}</div>
        </p>
        )
    case "submission":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <div>{props.part.description}</div>
          <div>submit to {props.part.exerciseSubmissionLink}</div>
        </p>
        )
    case "special":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <div>{props.part.description}</div>
          <div>required skills: {props.part.requirements.join(", ")}</div>
        </p>
        )
    default:
      return assertNever(props.part as never);
  }
}


const Content = (props: CoursePartsProps): JSX.Element => {
  return (
    <>
      {props.parts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </>
  )
}

const Total = (props: CoursePartsProps): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;