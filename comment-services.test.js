import mongoose from "mongoose";
import commentModel from "./packages/express-backend/comments-services.js";
import Comment from "./packages/express-backend/comments.js"; 

const testDataPrefix = "__test__";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/mylocaldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Comment Model Tests", () => {
    afterEach(async () => {
        await Comment.deleteMany();
    });

    test("create commment", async () => {
        const comment = { comment : "testcomment", username: "testusername" };
        const addedComment = await commentModel.createComment(comment);
        expect(addedComment.comment).toBe(comment.comment);
    }); 
})
