import faker from "faker";
import { User } from "../../src/models";
import { UserAttributes } from "../../src/models/user.model";
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
    radius: 200,
    address_lat: faker.datatype.number({ min: 0, max: 2 }),
    address_long: faker.datatype.number({ min: 0, max: 2 }),
    user_level: 2, //-->admin
  };
  return { ...defaultProps, ...props };
};

/**
 * Generates a wallet instance from the properties provided.
 *
 * @return {UserAttributes}       A wallet instance
 */
export = async (): Promise<UserAttributes> => await User.create(data());
