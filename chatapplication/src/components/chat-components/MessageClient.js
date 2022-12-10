import Parse from "parse/dist/parse.min.js";

function GetChatSubscription(chatId) {
    const parseApplicationId ='IBqvSrnvlyfIBLTKOD9wyPdva1DVFg2uBq742IHh';
    const serverUrl ='wss://senditgroup5.b4a.io';
    const parseJsKey ='D6vNSmMupgdE0RoG1RdAABCMTygugjgxAUeC7Hjs';

    const client = new Parse.LiveQueryClient({
        applicationId: parseApplicationId,
        serverURL: serverUrl, // Example: 'wss://livequerytutorial.back4app.io'
        javascriptKey: parseJsKey
    });

    client.open();

    //show recent messages | code taken from: https://docs.parseplatform.org/js/guide/#queries and https://www.back4app.com/docs/platform/parse-server-live-query-example

    const query = new Parse.Query('Message');
    query
    .equalTo('chat', new Parse.Object('Chat', {id: chatId}))
    .includeAll()
    .ascending('createdAt');
    
    const subscription = client.subscribe(query);
    return subscription;
}

//show old messages 
async function GetChatMessages(chatID, limit) {
    const query = new Parse.Query('Message');
    query
    .includeAll()
    .ascending('createdAt')
    .equalTo('chat', new Parse.Object('Chat', {id: chatID}))
    .limit(limit); 
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
    const user = result.get('user');
    const userName = user !== undefined ? user.get('firstName') + ' ' + user.get('lastName') : 'Unknown User';
    const  date = result.get('timestamp');
    const content = result.get('content');
    return {
        messageId: id,
        userId: user?.id ?? 'Unknown ID',
        date: date,
        seen: false,
        content: content,
        userName: userName
    };
}

export {GetChatMessages, ConvertResultToMessage, GetChatSubscription}