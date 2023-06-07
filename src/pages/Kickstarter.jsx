import { DATASETS } from "../UseData";

import Legends from "../components/Legends";
import Treemap from "../components/Treemap";


const Kickstarter = () => {
  return (
    <div>
      <h1 id="title">{DATASETS.kickstarter.TITLE}</h1>
      <h3 id="description">{DATASETS.kickstarter.DESCRIPTION}</h3>
      <Legends jsonUrl={DATASETS.kickstarter.FILE_PATH} />
      <Treemap jsonUrl={DATASETS.kickstarter.FILE_PATH} />
    </div>
  );
};
export default Kickstarter;
