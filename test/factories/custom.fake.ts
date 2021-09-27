import faker from "faker";

const randString = faker.random.alphaNumeric(10);
const fakeName = `${randString} ${randString}`;
const fakeEmail = `user${randString}@email.com`;
const fakePhone = faker.random.alphaNumeric(11);
const fakeUuid = faker.datatype.uuid();
export default {
  fakeName,
  fakeEmail,
  fakePhone,
  fakeUuid,
};
