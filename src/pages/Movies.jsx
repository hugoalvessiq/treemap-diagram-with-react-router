import { DATASETS } from "../UseData";

import Legends from "../components/Legends";
import Treemap from "../components/Treemap";


const Movies = () => {
  return (
    <div>
      <h1 id="title">{DATASETS.movies.TITLE}</h1>
      <h3 id="description">{DATASETS.movies.DESCRIPTION}</h3>
      <Legends jsonUrl={DATASETS.movies.FILE_PATH} />
      <Treemap jsonUrl={DATASETS.movies.FILE_PATH} />
    </div>
  );
};
export default Movies;
