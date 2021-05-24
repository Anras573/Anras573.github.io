import { calculatePercentage } from '../utils/Calculator';
import { skillsData } from '../data/Skills';

function calculateColor(value) {
  switch (true) {
    case value <= 100:
      return 'bg-yellow-400'

    case value <= 200:
      return 'bg-green-400'

    case value <= 300:
      return 'bg-blue-400'

    default:
      return ''
  }
}

function Skills() {
  let skillList = skillsData.map((data) =>
  {
    return (
      <div className="md:w-1/3">
        <h2 className="text-xl text-gray-900 font-bold mx-4 border-b-4 border-gray-500">{data.category}</h2>
        {data.list.map((skill) => {
          const percentage = calculatePercentage(skill.value, 300);
          const color = calculateColor(skill.value);

          return (
            <div className="mx-4">
              <label for="skill-{skill.name}">{skill.name}</label>
              <div className="h-6 relative rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div className={`h-full absolute ${color}`} style={{width: percentage + '%' }}></div>
                <span className="text-center w-full absolute">{skill.value} / 300</span>
              </div>
            </div>
          );
        })}
      </div>

    );
  });

  return (
    <article className="container mx-auto p-10 m-10 bg-white rounded shadow-lg">
      <div className="flex">
        {skillList}
      </div>
      <div className="m-4">
        <span className="text-gray-600 italic">Validated by Pluralsight: <a className="cursor-pointer underline text-indigo-600" href="https://app.pluralsight.com/profile/anras573">https://app.pluralsight.com/profile/anras573</a></span>
      </div>
    </article>
  );
}

export default Skills;
