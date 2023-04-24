import client from '../../db';
import { GET_MESSAGES_SINCE } from '../../GraphQL/Queries';

export default async function handler(req, res) {

    const checkSince = req.cookies['checkSince'];
    const conversationId = req.cookies['lastConversation'];

    const messages = await client.query({
        query:GET_MESSAGES_SINCE,
        variables:{
            date:checkSince,
            conversationId:conversationId
        }
    }).then(({data})=>{
        return data;
    });

    res.setHeader('set-cookie', [`checkSince=${new Date().getTime()}; path=/; samesite=lax; httponly`]);
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.write("data:");

    const msg = JSON.stringify(messages.get_messages_since.messages);
    res.write(msg + "\n\n");
    res.end("done\n");
}
  