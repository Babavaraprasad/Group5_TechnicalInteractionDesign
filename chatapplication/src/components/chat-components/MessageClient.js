import Parse from "parse/dist/parse.min.js";

function GetChatSubscription(chatId) {
    const parseApplicationId ='MVy8szIW1fArDFhiZuo8qcwBzN4JF1vqrxSOEaTB';
    const serverUrl ='wss://nansenditgroup5.b4a.io';
    const parseJsKey ='SWeoiB6okRNA8gMrG3CbbIqlGbnqRRmoFj7BwXZa';

    const client = new Parse.LiveQueryClient({
        applicationId: parseApplicationId,
        serverURL: serverUrl, // Example: 'wss://livequerytutorial.back4app.io'
        javascriptKey: parseJsKey
    });

    client.open();

    //show recent messages | code taken from: https://docs.parseplatform.org/js/guide/#queries and https://www.back4app.com/docs/platform/parse-server-live-query-example

    const query = new Parse.Query('Message');
    query.equalTo('chat', new Parse.Object('Chat', {id: chatId})).ascending('createdAt');
    
    const subscription = client.subscribe(query);
    return subscription;
}

//show old messages 
async function GetChatMessages(chatID, limit) {
    const query = new Parse.Query('Message');
    query.ascending('createdAt').equalTo('chat', new Parse.Object('Chat', {id: chatID})).limit(limit); 
    const results = await query.find();

    const messages = [];

    for (let result of results){
        messages.push(ConvertResultToMessage(result));
    }

    return messages; 
}

//Convert back4app message to message
function ConvertResultToMessage(result) {
    const id = result.id;
    const userId = result.get('user');
    const  date = result.get('timestamp')
    const content = result.get('content')
    return {
        messageId: id,
        userId: userId.id,
        date: date,
        seen: false,
        content: content
    };
}

export {GetChatMessages, ConvertResultToMessage, GetChatSubscription}