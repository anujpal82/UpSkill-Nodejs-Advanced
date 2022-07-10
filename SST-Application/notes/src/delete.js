// import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    // const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            userId: "123", // The id of the author
            noteId: event.pathParameters.id, // The id of the note from the path
        },
    };

    await dynamoDb.delete(params);

    return `Note with NoteId: ${event.pathParameters.id} Deleted Succesfully`;
});