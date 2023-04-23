import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";

export async  function create_conversation(userId:Array<String>, name): Promise<responces.conversationResponce> {
    const responce: responces.conversationResponce = {
        code: 500,
        success: false,
        message: "Internal Server Error",
        conversation: null
    }
    let conversation: types.conversationDB = {
        conversationId: uuidv4(),
        name: name,
        created: new Date(),
        modified: new Date()
    }
    try {
         await knexInstance("conversations").insert(conversation)
        for (let i = 0; i < userId.length; i++) {
            let conversationUser: types.conversationUserDB = {
                userId: userId[i],
                conversationId: conversation.conversationId,
                dateJoined: new Date()
            }
        await knexInstance("user_Conversations").insert(conversationUser)
        }
        const Rconversation: types.conversation = await knexInstance("conversations").where("conversationId", conversation.conversationId).first()
        responce.code = 200
        responce.success = true
        responce.message = "Conversation Created"
        responce.conversation = Rconversation
    }
    catch (err) {
        console.log(err)
    }
    return responce;
}

export async  function create_message(conversationId, userId, message): Promise<responces.messageResponce> {
    const responce: responces.messageResponce = {
        code: 500,
        success: false,
        messageInfo: "Internal Server Error",
        message: null
    }
    let messageDB: types.messageDB = {
        messageId: uuidv4(),
        userIdFrom: userId,
        conversationId: conversationId,
        message: message,
        timeSent: new Date()
    }
    try {
        await knexInstance("messages").insert(messageDB)
        const Rmessage: types.message = await knexInstance("messages").where("messageId", messageDB.messageId).first()
        await knexInstance("conversations").where("conversationId", conversationId).update({ modified: new Date() })
        responce.code = 200
        responce.success = true
        responce.messageInfo = "Message Created"
        responce.message = Rmessage
    }
    catch (err) {
        console.log(err)
    }
    return responce;
}
export async function edit_conversation(conversationId, name, userId): Promise<responces.conversationResponce> {
    const responce: responces.conversationResponce = {
        code: 500,
        success: false,
        message: "Internal Server Error",
        conversation: null
    }
    try {
        if (name) {
            await knexInstance("conversations").where("conversationId", conversationId).update({ name: name })
        }
        if (userId) {
            await knexInstance("user_Conversations").insert({ userId: userId, conversationId: conversationId, dateJoined: new Date() })
        }
        const Rconversation: types.conversation = await knexInstance("conversations").where("conversationId", conversationId).first()
        responce.code = 200
        responce.success = true
        responce.message = "Conversation Edited"
        responce.conversation = Rconversation
    }
    catch (err) {
        console.log(err)
    }
    return responce;
}

export async function delete_conversation(conversationId): Promise<responces.conversationResponce> {
    const responce: responces.conversationResponce = {
        code: 500,
        success: false,
        message: "Internal Server Error",
        conversation: null
    }
    try {
        await knexInstance("conversations").where("conversationId", conversationId).del()
        responce.code = 200
        responce.success = true
        responce.message = "Conversation Deleted"
    }
    catch (err) {
        console.log(err)
    }
    return responce;
}
