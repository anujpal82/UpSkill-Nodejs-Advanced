import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
            Key: {
              userId:event.pathParameters.userId,
                noteId: event.pathParameters.id, // The id of the note from the path
            },
        Item: {
            // The attributes of the item to be updated
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
           
        },
       
    };
    console.log(params);
    await dynamoDb.update(params);

    return params.Item;
});