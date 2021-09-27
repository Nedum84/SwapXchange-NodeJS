import sequelize from "../src/models";
import { UserAttributes } from "../src/models/user.model";
import tokenService from "../src/services/token.service";
import clearTestDb from "./clear.test.db";
import FakeUser from "./factories/user.fake";

interface SignInData {
  user: UserAttributes;
  tokens: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
}
declare global {
  var signin: () => Promise<SignInData>;
}

jest.setTimeout(5000); //--> 5 secs

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  jest.clearAllMocks();

  await sequelize.sync({ force: true });
  // await clearTestDb();
});

afterAll(async () => {
  await sequelize.close();
});

global.signin = async () => {
  const user = await FakeUser();

  const tokens = await tokenService.generateAuthTokens(user);

  return { tokens, user };
};
