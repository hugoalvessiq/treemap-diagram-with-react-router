import { DATASETS } from "../UseData";
import Legends from "../components/Legends";
import Treemap from "../components/Treemap";


const Videogames = () => {
  return (
    <div>
      <h1 id="title">{DATASETS.videogames.TITLE}</h1>
      <h3 id="description">{DATASETS.videogames.DESCRIPTION}</h3>
      <Legends jsonUrl={DATASETS.videogames.FILE_PATH} />
      <Treemap jsonUrl={DATASETS.videogames.FILE_PATH} />
    </div>
  );
};
export default Videogames;
