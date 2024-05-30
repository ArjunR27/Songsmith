import mongoose from "mongoose";
import userModel from "./user-services.js";
import User from "./user.js";

beforeAll(async () => {
  // Connect to MongoDB before running tests
  await mongoose.connect("mongodb://localhost:27017/mylocaldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from MongoDB after running tests
  await mongoose.disconnect();
});

describe("User Model Tests", () => {
  afterEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
  });

  test("Add a user", async () => {
    const user = { username: "testUser", password: "password123" };
    const addedUser = await userModel.addUser(user);
    expect(addedUser.username).toBe(user.username);
  });

  test("Find a user by ID", async () => {
    const user = { username: "testUser", password: "password123" };
    const addedUser = await userModel.addUser(user);
    const foundUser = await userModel.findUserById(addedUser._id);
    expect(foundUser.username).toBe(user.username);
  });

  test("Get all users", async () => {
    const users = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
    ];
    await Promise.all(users.map(userModel.addUser));
    const allUsers = await userModel.getUsers();
    expect(allUsers.length).toBe(users.length);
  });
});
