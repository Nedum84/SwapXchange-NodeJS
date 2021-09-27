import sequelize from "../src/models";
import { runAssociations } from "../src/models/associations";
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

// jest.setTimeout(5000); //--> 5 secs

async function reset() {
  await sequelize.sync({ force: true });
  runAssociations();

  // await clearTestDb();
}
beforeAll(async () => {
  await reset();
});

beforeEach(async () => {
  jest.clearAllMocks();
  // await reset();
});

afterAll(async () => {
  await sequelize.close();
});

global.signin = async () => {
  const user = await FakeUser();

  const tokens = await tokenService.generateAuthTokens(user);

  return { tokens, user };
};
