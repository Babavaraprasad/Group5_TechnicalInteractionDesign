import Parse from "parse/dist/parse.min.js";


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
function GetChatSubscription(chatID){
    const query = new Parse.Query('Message');
    query.ascending('createdAt').equalTo('chat', chatID);
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

function ConvertResultToMessage(result) {
    const userId = result.get('user');
    const  date = result.get('timestamp')
    const content = result.get('content')
    return {
        userId: userId.id,
        date: date,
        seen: false,
        content: content
    };
}

export {GetChatMessages, GetChatSubscription}