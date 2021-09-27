import moment from "moment";
import { v4 as uuidv4 } from "uuid";

class CONSTANTS {
  static NOW = moment().toDate(); //Date

  static UUID = () => uuidv4();
}

export default CONSTANTS;
