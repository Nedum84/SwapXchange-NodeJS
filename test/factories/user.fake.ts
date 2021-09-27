import faker from "faker";
import { User, UserAttributes } from "../../src/models/user.model";
/**
 * Generate an object which container attributes needed
 * to successfully create a wallet instance.
 *
 * @param  {Object} props Properties to use for the wallet.
 *
 * @return {Object}       An object to build the wallet from.
 */
const data = (props: object = {}): any => {
  const defaultProps = {
    // user_id: faker.datatype.uuid(),
    uid: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    mobile_number: faker.phone.phoneNumber(),
  };
  return { ...defaultProps, ...props };
};

/**
 * Generates a wallet instance from the properties provided.
 *
 * @return {UserAttributes}       A wallet instance
 */
export = async (): Promise<UserAttributes> => await User.create(data());
